"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { Zoom } from "@visx/zoom";
import { Button, cn } from "@nextui-org/react";
import { geoPath } from "d3-geo";
import { ProvidedZoom } from "@visx/zoom/lib/types";
import useElectionStore from "@/hooks/useElectionStore";
import { counties, compBorders, electionResult } from "@/data";
import { clamp, getTransformMatrix, getWinCandidateId } from "./helpers";
import {
  County,
  CountyFeature,
  DistrictColor,
  ElectionYear,
  PartyColor,
  TownFeature,
} from "@/types";
import ArrowLeft from "../icons/arrow-left";

type Props = {
  width: number;
  height: number;
  year: ElectionYear;
};

// 行政區文字標註位置的位移量
const coordOffsets: Record<string, [number, number]> = {
  "Taitung County": [-20, -20],
};

/**
 * These districts are too small to have text labels
 * some of them will be labeled by compborder
 */
const ignoredDistricts = [
  "Penghu County",
  "Kinmen County",
  "Lienchiang County",
  "Wuqiu Township",
];

function TaiwanMap({ width, height, year }: Props) {
  const store = useElectionStore((state) => ({
    currentDistrict: state.currentDistrict,
    back: state.back,
    selectedCounty: state.selectedCounty,
    selectedTown: state.selectedTown,
    selectedCountyFeature: state.selectedCountyFeature,
    filteredTownFeatures: state.filteredTownFeatures,
    selectedTownFeature: state.selectedTownFeature,
    setSelectedCounty: state.setSelectedCounty,
    setSelectedTown: state.setSelectedTown,
  }));
  const path = geoPath().projection(null);
  const zoomRef = useRef<ProvidedZoom<SVGSVGElement>>();
  const countyRef = useRef(store.selectedCounty);
  const townRef = useRef(store.selectedTown);

  const electionData = useMemo(() => {
    const found = electionResult.find((item) => item.year === +year);
    if (!found) {
      console.error(`Election data in year: ${year} not found`);
    }
    return found;
  }, [year]);

  const { candidates, countysVoteResult, townsVoteResult } = electionData!;

  const getWinnerParty = useCallback(
    (
      district: { county: County; town?: string; village?: string },
      type: "county" | "town" | "village"
    ): PartyColor => {
      if (type === "county") {
        const county = countysVoteResult.find(
          (item) => item.countyName === district.county
        );
        if (!county) {
          return "grey";
        }
        const id = getWinCandidateId(county);
        const color = candidates[id].partyAlias;
        return color;
      }
      if (type === "town") {
        const town = townsVoteResult?.find(
          (item) =>
            item.countyName === district.county &&
            item.townName === district.town
        );
        if (!town) {
          return "grey";
        }
        const id = getWinCandidateId(town);
        const color = candidates[id].partyAlias;
        return color;
      }
      return "grey";
    },
    [candidates, countysVoteResult, townsVoteResult]
  );

  const districtColor: DistrictColor = {
    green: "fill-greenParty",
    blue: "fill-blueParty",
    orange: "fill-orangeParty",
    grey: "fill-slate-400",
  };

  // console.log(store);
  // console.log(state);

  const countyClickHandler = useCallback(
    (feature: CountyFeature, e?: React.MouseEvent<SVGPathElement>) => {
      e?.stopPropagation();
      const matrix = getTransformMatrix(path.bounds(feature), width, height);

      store.setSelectedCounty(feature.properties.countyName as County, feature);
      countyRef.current = feature.properties.countyName;
      zoomRef.current?.setTransformMatrix(matrix);
    },
    [height, path, store, width]
  );

  const townClickHandler = useCallback(
    (feature: TownFeature, e?: React.MouseEvent<SVGPathElement>) => {
      e?.stopPropagation();
      const matrix = getTransformMatrix(path.bounds(feature), width, height);

      store.setSelectedTown(feature.properties.townName, feature);
      townRef.current = feature.properties.townName;
      zoomRef.current?.setTransformMatrix(matrix);
    },
    [height, path, store, width]
  );

  useEffect(() => {
    if (store.selectedCounty !== countyRef.current) {
      if (store.selectedCounty === "全部") {
        zoomRef.current?.reset();
      } else {
        const matrix = getTransformMatrix(
          // @ts-expect-error
          path.bounds(store.selectedCountyFeature),
          width,
          height
        );
        zoomRef.current?.setTransformMatrix(matrix);
      }
    }

    if (store.selectedTown !== townRef.current) {
      if (store.selectedTown === "全部") {
        const matrix = getTransformMatrix(
          // @ts-expect-error
          path.bounds(store.selectedCountyFeature),
          width,
          height
        );
        zoomRef.current?.setTransformMatrix(matrix);
      } else {
        const matrix = getTransformMatrix(
          // @ts-expect-error
          path.bounds(store.selectedTownFeature),
          width,
          height
        );
        zoomRef.current?.setTransformMatrix(matrix);
      }
    }

    countyRef.current = store.selectedCounty;
    townRef.current = store.selectedTown;
  }, [store, width, height, path]);

  return (
    <Zoom<SVGSVGElement>
      width={width}
      height={height}
      scaleXMin={1}
      scaleXMax={100}
      scaleYMin={1}
      scaleYMax={100}
    >
      {(zoom) => {
        zoomRef.current = zoom;
        return (
          <div className="relative">
            <svg
              id="map-svg"
              width={width}
              height={height}
              viewBox="0 0 450 600"
              className={cn(
                "min-w-full bg-[#e4faff] touch-none",
                zoom.isDragging && "cursor-grabbing"
              )}
              ref={zoom.containerRef}
            >
              <g id="map-transform" transform={zoom.toString()}>
                {/* render countys */}
                {counties.features.map((feature, i) => {
                  const [[x0, y0], [x1, y1]] = path.bounds(feature);
                  const coords: [number, number] = [
                    (x0 + x1) / 2,
                    (y0 + y1) / 2,
                  ];

                  const offset = coordOffsets[feature.properties.countyEng];
                  if (offset) {
                    coords[0] += offset[0];
                    coords[1] += offset[1];
                  }

                  if (ignoredDistricts.includes(feature.properties.countyEng)) {
                    return (
                      <g key={`county-${i + 1}`}>
                        <path
                          d={path(feature) || ""}
                          className={cn(
                            "cursor-pointer stroke-1/10 stroke-slate-100",
                            districtColor[
                              getWinnerParty(
                                { county: feature.properties.countyName },
                                "county"
                              )
                            ]
                          )}
                          onClick={(e) => countyClickHandler(feature, e)}
                        />
                      </g>
                    );
                  }

                  return (
                    <g key={`county-${i + 1}`}>
                      <path
                        d={path(feature) || ""}
                        className={cn(
                          "cursor-pointer stroke-1/10 stroke-slate-100",
                          districtColor[
                            getWinnerParty(
                              { county: feature.properties.countyName },
                              "county"
                            )
                          ]
                        )}
                        onClick={(e) => countyClickHandler(feature, e)}
                      />
                      <text
                        transform={`translate(${coords})`}
                        className="shadow-label"
                        fontSize={clamp((x1 - x0) / 5, 6, 10)}
                        fill="#fff"
                        cursor="default"
                        textAnchor="middle"
                      >
                        {feature.properties.countyName}
                      </text>
                    </g>
                  );
                })}

                {/* render compBorders */}
                {compBorders.features.map((feature, i) => {
                  const [[x0, y0], [x1, y1]] = path.bounds(feature);
                  const coords: [number, number] = [(x0 + x1) / 2, y1 + 12];
                  return (
                    <g key={i}>
                      <path
                        d={path(feature) || ""}
                        className="stroke-1 stroke-slate-800 fill-none"
                      />
                      <text
                        transform={`translate(${coords})`}
                        className="shadow-label"
                        fontSize="12"
                        fill="#1r293b"
                        cursor="default"
                        textAnchor="middle"
                      >
                        {feature.properties.name}
                      </text>
                    </g>
                  );
                })}

                {/* render towns */}
                {store.filteredTownFeatures &&
                  store.filteredTownFeatures.map((feature, i) => {
                    const [[x0, y0], [x1, y1]] = path.bounds(feature);
                    const coords: [number, number] = [
                      (x0 + x1) / 2,
                      (y0 + y1) / 2,
                    ];

                    return (
                      <g key={`town-${i + 1}`}>
                        <path
                          d={path(feature) || ""}
                          onClick={(e) => townClickHandler(feature, e)}
                          className={cn(
                            "cursor-pointer stroke-1/4 stroke-slate-100",
                            districtColor[
                              getWinnerParty(
                                {
                                  county: feature.properties.countyName,
                                  town: feature.properties.townName,
                                },
                                "town"
                              )
                            ]
                          )}
                        />
                        <text
                          transform={`translate(${coords})`}
                          className="shadow-label"
                          fontSize={clamp((x1 - x0) / 5, 1, 5)}
                          fill="#fff"
                          cursor="default"
                          textAnchor="middle"
                        >
                          {feature.properties.townName}
                        </text>
                      </g>
                    );
                  })}
              </g>
            </svg>
            <div className="absolute top-24 left-24">
              {store.currentDistrict !== "nation" && (
                <Button
                  radius="full"
                  color="default"
                  startContent={<ArrowLeft />}
                  size="sm"
                  onClick={() => store.back()}
                >
                  返回
                </Button>
              )}
            </div>
          </div>
        );
      }}
    </Zoom>
  );
}

export default TaiwanMap;
