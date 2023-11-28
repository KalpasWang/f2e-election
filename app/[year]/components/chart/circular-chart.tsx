import { CircularProgress } from "@nextui-org/react";
import React from "react";

type Props = {
  label: string;
  percent: number;
};

const CircularChart = React.memo(function ({ percent, label }: Props) {
  return (
    <CircularProgress
      classNames={{
        label: "text-content1 text-body2 leading-none",
        svg: "w-100 h-100 drop-shadow-md",
        indicator: "stroke-primary",
        track: "stroke-slate-200",
        value: "text-xl font-bold text-primary",
      }}
      label={label}
      value={percent}
      strokeWidth={4}
      showValueLabel={true}
    />
  );
});

CircularChart.displayName = "CircularChart";
export default CircularChart;
