import { Candidate, CandidateId, PartyColor } from "@/types";
import React from "react";
import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  data: {
    candidate1: number;
    candidate2: number;
    candidate3: number;
    validVotes: number;
    invalidVotes: number;
    totalVotes: number;
    totalElectors: number;
    votingRate: number;
  }[];
  candidates: {
    [c in CandidateId]: Candidate;
  };
};

const fill: { [key in PartyColor]: string } = {
  orange: "#F4A76F",
  blue: "#8082FF",
  green: "#57D2A9",
  grey: "#C4C4C4",
};

const AmountChart = React.memo(function ({ data, candidates }: Props) {
  return (
    <ResponsiveContainer width="100%" height="50">
      <BarChart
        width={500}
        height={50}
        data={data}
        layout="vertical"
        margin={{
          top: 12,
        }}
      >
        <Tooltip />
        <Bar
          dataKey="candidate1"
          stackId="a"
          fill={fill[candidates.candidate1.partyAlias]}
          label
        />
        <Bar
          dataKey="candidate2"
          stackId="a"
          fill={fill[candidates.candidate2.partyAlias]}
          label
        />
        <Bar
          dataKey="candidate3"
          stackId="a"
          fill={fill[candidates.candidate3.partyAlias]}
          label
        />
      </BarChart>
    </ResponsiveContainer>
  );
});

AmountChart.displayName = "AmountChart";
export default AmountChart;
