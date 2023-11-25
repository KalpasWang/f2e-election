"use client";
import React, { useCallback, useReducer } from "react";
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
} from "@/utils/helpers";
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
  const store = useElectionStore();
  const [state, dispatch] = useReducer(mapReducer, {});
  const path = geoPath().projection(null);
  const electionData = electionResult.find((item) => item.year === +year);
  if (!electionData) {
    console.error(`Election data in year: ${year} not found`);
  }
  const { candidates, countyVoteResult, townsVoteResult } = electionData!;

  const getWinParty = useCallback(
    (
      district: { county: County; town?: string; village?: string },
      type: "county" | "town" | "village"
    ): PartyColor => {
      if (type === "county") {
        const county = countyVoteResult.find(
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
        const town = townsVoteResult.find(
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
    [candidates, countyVoteResult, townsVoteResult]
  );

  const districtColor: DistrictColor = {
    green: "fill-green-500",
    blue: "fill-blue-500",
    orange: "fill-orange-500",
    grey: "fill-slate-500",
  };

  // console.log(store);
  // console.log(state);

  const clickHandler = useCallback(
    (
      e: React.MouseEvent<SVGPathElement>,
      feature: CountyFeature,
      zoom: ProvidedZoom<SVGSVGElement>
    ) => {
      e.stopPropagation();
      const matrix = getTransformMatrix(path.bounds(feature), width, height);
      const towns = filterTownFeatures(feature);

      store.setSelectedCounty(feature.properties.countyName as County);
      dispatch({ type: "selectCounty", payload: { county: feature, towns } });
      zoom.reset();
      setTimeout(() => {
        zoom.setTransformMatrix(matrix);
      }, 0);
    },
    [height, path, store, width]
  );

  return (
    <Zoom<SVGSVGElement>
      width={width}
      height={height}
      scaleXMin={1}
      scaleXMax={100}
      scaleYMin={1}
      scaleYMax={100}
    >
      {(zoom) => (
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
                return (
                  <path
                    key={i}
                    d={path(feature) || ""}
                    className={cn(
                      "cursor-pointer stroke-1/2 stroke-slate-100",
                      districtColor[
                        getWinParty(
                          { county: feature.properties.countyName },
                          "county"
                        )
                      ]
                    )}
                    onClick={(e) => clickHandler(e, feature, zoom)}
                  />
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
                  return (
                    <path
                      key={i}
                      d={path(feature) || ""}
                      className={cn(
                        "cursor-pointer stroke-1/2 stroke-slate-100",
                        districtColor[
                          getWinParty(
                            {
                              county: feature.properties.countyName,
                              town: feature.properties.townName,
                            },
                            "town"
                          )
                        ]
                      )}
                    />
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
      )}
    </Zoom>
  );
}

export default TaiwanMap;
