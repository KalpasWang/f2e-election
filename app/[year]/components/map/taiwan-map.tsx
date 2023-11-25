"use client";
import React, { useCallback, useReducer } from "react";
import { Zoom } from "@visx/zoom";
import { cn } from "@nextui-org/react";
import { geoPath } from "d3-geo";
import { ProvidedZoom } from "@visx/zoom/lib/types";
import useElectionStore from "@/hooks/useElectionStore";
import { counties, compBorders, towns, electionResult } from "@/data";
import { filterTownFeatures, getTransformMatrix } from "@/utils/helpers";
import { County, CountyFeature, ElectionYear, TownFeature } from "@/types";

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
    return;
  }
  const { candidates, voteResult, countyVoteResult, townsVoteResult } =
    electionData;

  // console.log(store);
  // console.log(state);

  // eslint-disable-next-line react-hooks/rules-of-hooks
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
                    className="cursor-pointer stroke-1/2 stroke-slate-500 fill-slate-300"
                    onClick={(e) => clickHandler(e, feature, zoom)}
                  />
                );
              })}

              {/* render towns */}
              {state.renderedTownsFeature &&
                state.renderedTownsFeature.map((feature, i) => {
                  return (
                    <path
                      key={i}
                      d={path(feature) || ""}
                      className="cursor-pointer stroke-1/2 stroke-slate-500 fill-slate-300"
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
