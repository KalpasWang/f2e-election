"use client";
import React, { useEffect } from "react";
import { ParentSize } from "@visx/responsive";
import useElectionStore from "@/hooks/useElectionStore";
import TaiwanMap from "./map/taiwan-map";
import ElectionChart from "./chart/election-chart";
import { ElectionYear } from "@/types";

type Props = {
  year: ElectionYear;
};

export default function ElectionContent({ year }: Props) {
  const setIsLoaded = useElectionStore((state) => state.setIsLoaded);

  useEffect(() => {
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full bg-background lg:flex">
      <div className="w-full h-[600px] lg:w-4/12 lg:h-auto lg:basis-4/12">
        <ParentSize>
          {({ width, height }) => (
            <TaiwanMap width={width} height={height} year={year} />
          )}
        </ParentSize>
      </div>
      <div className="flex-grow overflow-auto">
        <ElectionChart year={year} />
      </div>
    </div>
  );
}
