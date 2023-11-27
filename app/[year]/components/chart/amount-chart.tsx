import React, { useEffect, useState } from "react";
import { PartyColor } from "@/types";

type Props = {
  data: {
    percent: number;
    color: PartyColor;
  }[];
  showLabel?: boolean;
};

const fillColor: { [key in PartyColor]: string } = {
  orange: "#F4A76F",
  blue: "#8082FF",
  green: "#57D2A9",
  grey: "#C4C4C4",
};

const AmountChart = React.memo(function ({ data, showLabel = false }: Props) {
  const [widths, setWidths] = useState(data.map(() => "0"));

  useEffect(() => {
    requestAnimationFrame(() => {
      setWidths(
        data.map((item) => {
          return item.percent + "%";
        })
      );
    });
  }, [data]);

  return (
    <div className="flex h-16 mx-4 mt-12 rounded-2xl overflow-hidden">
      {data.map((item, i) => {
        return (
          <div
            key={i}
            style={{
              width: widths[i],
              backgroundColor: fillColor[item.color],
            }}
            className="transition-all duration-2000 flex justify-center"
          >
            {showLabel && (
              <span className="text-content1 text-body-small">
                {item.percent.toFixed(0) + "%"}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
});

AmountChart.displayName = "AmountChart";
export default AmountChart;
