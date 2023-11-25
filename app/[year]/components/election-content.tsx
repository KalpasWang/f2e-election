"use client";
import React from "react";
import { ParentSize } from "@visx/responsive";
import { Topology } from "topojson-specification";
import TaiwanMap from "./map/taiwan-map";
import { ElectionYear } from "@/types";
import ElectionChart from "./chart/election-chart";

type Props = {
  year: ElectionYear;
};

export default function ElectionContent({ year }: Props) {
  return (
    <div className="w-full h-full bg-background lg:flex">
      <div className="w-full h-[600px] lg:w-auto lg:h-auto lg:basis-4/12">
        <ParentSize>
          {({ width, height }) => (
            <TaiwanMap width={width} height={height} year={year} />
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
