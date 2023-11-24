"use client";
import React from "react";
import { ParentSize } from "@visx/responsive";
import TaiwanMap from "./map/taiwan-map";
import { Topology } from "topojson-specification";
import { ElectionYear } from "@/types";
import ElectionChart from "./chart/election-chart";

type Props = {
  map: Topology;
  year: ElectionYear;
};

export default function ElectionContent({ map, year }: Props) {
  return (
    <div className="w-full h-full bg-background lg:flex">
      <div className="w-full h-[600px] lg:w-auto lg:h-auto lg:basis-4/12">
        <ParentSize>
          {({ width, height }) => (
            <TaiwanMap width={width} height={height} map={map} year={year} />
          )}
        </ParentSize>
      </div>
      <div className="flex-grow">
        <div className="bg-slate-400 flex justify-center items-center">
          <ElectionChart />
        </div>
      </div>
    </div>
  );
}
