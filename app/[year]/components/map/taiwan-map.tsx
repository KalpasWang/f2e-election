"use client";
import d3 from "d3";
import React, { useEffect, useRef } from "react";

type Props = {
  width: number;
  height: number;
};

function TaiwanMap({ width, height }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const countyGroupRef = useRef<SVGGElement>(null);
  const townGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const path = d3.geoPath(null);
  }, []);

  return (
    <svg
      id="map-svg"
      width={width}
      height={height}
      ref={svgRef}
      viewBox="0 0 450 600"
      className="min-w-full"
    >
      <g ref={countyGroupRef}></g>
      <g ref={townGroupRef}></g>
    </svg>
  );
}

export default React.memo(TaiwanMap);
