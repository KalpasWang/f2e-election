"use client";
import React from "react";
import { ParentSize } from "@visx/responsive";
import TaiwanMap from "./map/taiwan-map";
import { ElectionFile } from "@/types";

type Props = {
  data: ElectionFile;
};

export default function ElectionContent({ data }: Props) {
  return (
    <div className="block w-full h-full bg-background lg:flex">
      <div className="basis-3/12 min-w-[350px] min-h-[467px]">
        <ParentSize>
          {({ width, height }) => <TaiwanMap width={width} height={height} />}
        </ParentSize>
      </div>
      <div className="flex-grow">
        <div className="bg-slate-400 flex justify-center items-center">kk</div>
      </div>
    </div>
  );
}
