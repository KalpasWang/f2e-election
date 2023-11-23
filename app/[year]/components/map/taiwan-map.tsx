"use client";
import React, { useCallback } from "react";
import {
  Zoom,
  composeMatrices,
  createMatrix,
  identityMatrix,
} from "@visx/zoom";
import { localPoint } from "@visx/event";
import { cn } from "@nextui-org/react";
import { compBorders, counties } from "@/utils/districtsGeoData";
import { geoPath } from "d3-geo";
import useElectionStore from "@/hooks/useElectionStore";
import { County, CountyFeature } from "@/types";
import { ProvidedZoom } from "@visx/zoom/lib/types";

type Props = {
  width: number;
  height: number;
};

function TaiwanMap({ width, height }: Props) {
  const store = useElectionStore();
  const path = geoPath().projection(null);

  console.log(store.selectedCounty);

  const clickHandler = useCallback(
    (
      e: React.MouseEvent<SVGPathElement>,
      feature: CountyFeature,
      zoom: ProvidedZoom<SVGSVGElement>
    ) => {
      e.stopPropagation();
      const [[x0, y0], [x1, y1]] = path.bounds(feature);
      const scale = Math.min(
        8,
        0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
      );
      store.setSelectedCounty(feature.properties.countyName as County);

      const matrix = composeMatrices(
        identityMatrix(),
        createMatrix({ translateX: width / 2, translateY: height / 2 }),
        createMatrix({ scaleX: scale, scaleY: scale }),
        createMatrix({
          translateX: -(x0 + x1) / 2.1,
          translateY: -(y0 + y1) / 2,
        })
      );
      zoom.setTransformMatrix(matrix);
    },
    [height, path, store, width]
  );

  return (
    <Zoom<SVGSVGElement>
      width={width}
      height={height}
      scaleXMin={1}
      scaleXMax={10}
      scaleYMin={1}
      scaleYMax={10}
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
              {counties.features.map((feature, i) => {
                return (
                  <path
                    key={i}
                    d={path(feature) || ""}
                    className="cursor-pointer stroke-1 stroke-black fill-slate-300"
                    onClick={(e) => clickHandler(e, feature, zoom)}
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
