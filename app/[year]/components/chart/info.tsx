import React from "react";

type Props = {
  title: string;
  value: number;
  format?: "precent" | "normal";
};

const Info = React.memo(function ({ title, value, format = "normal" }: Props) {
  return (
    <div>
      <span className="text-body2 text-secondary">{title}</span>
      <h6 className="text-content1">
        {format === "normal" && Intl.NumberFormat("en-US").format(value)}
        {format === "precent" && value.toFixed(2) + "%"}
      </h6>
    </div>
  );
});

Info.displayName = "Info";
export default Info;
