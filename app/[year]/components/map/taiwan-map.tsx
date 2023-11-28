"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import { Zoom } from "@visx/zoom";
import { cn } from "@nextui-org/react";
import { geoPath } from "d3-geo";
import { ProvidedZoom } from "@visx/zoom/lib/types";
import useElectionStore from "@/hooks/useElectionStore";
import { counties, compBorders, towns, electionResult } from "@/data";
import {
  filterTownFeatures,
  getTransformMatrix,
  getWinCandidateId,
} from "./helpers";
import {
  County,
  CountyFeature,
  DistrictColor,
  ElectionYear,
  PartyColor,
  TownFeature,
} from "@/types";

type Props = {
  width: number;
  height: number;
  year: ElectionYear;
};

type MapState = {
  selectedDistrictFeature?: CountyFeature | TownFeature;
  selectedCountyFeature?: CountyFeature;
  selectedTownFeature?: TownFeature;
  renderedTownsFeature?: TownFeature[];
};

type MapAction =
  | {
      type: "selectCounty";
      payload: { county: CountyFeature; towns: TownFeature[] };
    }
  | {
      type: "selectTown";
      payload: { town: TownFeature };
    }
  | { type: "reset" };

function mapReducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case "selectCounty": {
      const { county, towns } = action.payload;
      return {
        selectedDistrictFeature: county,
        selectedCountyFeature: county,
        selectedTownFeature: undefined,
        renderedTownsFeature: towns,
      };
    }
    case "selectTown": {
      const { town } = action.payload;
      return {
        ...state,
        selectedDistrictFeature: town,
        selectedTownFeature: town,
      };
    }
    case "reset": {
      return {
        selectedDistrictFeature: undefined,
        selectedCountyFeature: undefined,
        selectedTownFeature: undefined,
        renderedTownsFeature: undefined,
      };
    }
    default:
      return state;
  }
}

function TaiwanMap({ width, height, year }: Props) {
  const store = useElectionStore((state) => ({
    currentDistrict: state.currentDistrict,
    selectedCounty: state.selectedCounty,
    selectedTown: state.selectedTown,
    setSelectedCounty: state.setSelectedCounty,
    setSelectedTown: state.setSelectedTown,
  }));
  const [state, dispatch] = useReducer(mapReducer, {});
  const path = geoPath().projection(null);
  const zoomRef = useRef<ProvidedZoom<SVGSVGElement>>();
  const electionData = electionResult.find((item) => item.year === +year);
  if (!electionData) {
    console.error(`Election data in year: ${year} not found`);
  }
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

  const clickHandler = useCallback(
    (feature: CountyFeature, e?: React.MouseEvent<SVGPathElement>) => {
      e?.stopPropagation();
      const matrix = getTransformMatrix(path.bounds(feature), width, height);
      const towns = filterTownFeatures(feature);

      store.setSelectedCounty(feature.properties.countyName as County);
      dispatch({ type: "selectCounty", payload: { county: feature, towns } });
      zoomRef.current?.setTransformMatrix(matrix);
    },
    [height, path, store, width]
  );

  useEffect(() => {
    if (
      store.selectedCounty !==
        state.selectedCountyFeature?.properties.countyName ||
      store.selectedTown !== state.selectedTownFeature?.properties.townName
    ) {
      const county = counties.features.find(
        (feature) => feature.properties.countyName === store.selectedCounty
      );
      if (!county) {
        zoomRef.current?.reset();
        return;
      }
      const matrix = getTransformMatrix(path.bounds(county), width, height);
      const towns = filterTownFeatures(county);

      dispatch({ type: "selectCounty", payload: { county, towns } });
      zoomRef.current?.setTransformMatrix(matrix);
    }
  }, [state, store, width, height, clickHandler, path]);

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
                        onClick={(e) => clickHandler(feature, e)}
                      />
                      <text
                        transform={`translate(${coords})`}
                        className="shadow-label"
                        fontSize="9"
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
                {compBorders.features.map((feature, i) => (
                  <path
                    key={i}
                    d={path(feature) || ""}
                    className="stroke-1 stroke-slate-800 fill-none"
                  />
                ))}

                {/* render towns */}
                {state.renderedTownsFeature &&
                  state.renderedTownsFeature.map((feature, i) => {
                    const [[x0, y0], [x1, y1]] = path.bounds(feature);
                    const coords: [number, number] = [
                      (x0 + x1) / 2,
                      (y0 + y1) / 2,
                    ];

                    return (
                      <g key={`town-${i + 1}`}>
                        <path
                          d={path(feature) || ""}
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
                          fontSize="4"
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
              {/*             <rect
              width={width}
              height={height}
              // rx={14}
              fill="transparent"
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
              onDoubleClick={(event) => {
                const point = localPoint(event) || { x: 0, y: 0 };
                zoom.scale({ scaleX: 1.1, scaleY: 1.1, point });
              }}
            /> */}
            </svg>
          </div>
        );
      }}
    </Zoom>
  );
}

export default TaiwanMap;
