"use client";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { compBorders, counties } from "@/utils/districtsGeoData";

type Props = {
  width: number;
  height: number;
};

function TaiwanMap({ width, height }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const countyRef = useRef<SVGGElement>(null);
  const compBorderRef = useRef<SVGGElement>(null);
  const countyBorderRef = useRef<SVGGElement>(null);
  const townRef = useRef<SVGGElement>(null);
  const path = d3.geoPath().projection(null);
  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([1, 8])
    .on("zoom", function (e: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
      const svg = d3.select(this);
      svg.attr("transform", e.transform.toString());
      svg.attr("stroke-width", 1 / e.transform.k);
      // svgRef.current?.setAttribute("transform", e.transform.toString());
    });

  function clicked(event: any, d: any) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();

    // d3.select(this).transition().style("fill", "red");
    const svg = d3.select(svgRef.current);
    svg
      .transition()
      .duration(2000)
      .call(
        // @ts-ignore
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(
            Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
          )
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node())
      );
  }

  useEffect(() => {
    // @ts-ignore
    d3.select(svgRef.current).call(zoom);

    d3.select(countyRef.current)
      .selectAll("path")
      .data(counties.features)
      .join("path")
      .on("click", (event, feature) => {})
      .transition()
      .duration(2000)
      .attr("class", "stroke-primary stroke-1 fill-none")
      .attr("d", (feature) => path(feature));

    d3.select(compBorderRef.current)
      .selectAll("path")
      .data(compBorders.features)
      .join("path")
      .transition()
      .duration(2000)
      .attr("class", "fill-none stroke-2 stroke-black")
      .attr("d", (feature) => path(feature));
  }, [path, zoom]);

  return (
    <svg
      id="map-svg"
      width={width}
      height={height}
      ref={svgRef}
      viewBox="0 0 450 600"
      className="min-w-full"
    >
      <g ref={countyRef}></g>
      <g ref={compBorderRef}></g>
      <g ref={countyBorderRef}></g>
      <g ref={townRef}></g>
    </svg>
  );
}

export default React.memo(TaiwanMap);
