import React from "react";
import { electionDataArray } from "@/config/electionData";
import { ElectionYear } from "@/types";
import ElectionContent from "./components/election-content";
import { Topology } from "topojson-specification";

type Props = {
  params: {
    year: ElectionYear;
  };
};

export async function generateStaticParams() {
  const elections = electionDataArray.filter((e) => e.disable === false);
  return elections.map((election) => ({
    year: election.year.toString(),
  }));
}

async function getMapFile() {
  const res = await fetch(
    "https://github.com/KalpasWang/fileRepo/raw/main/towns-mercator-10t.json"
  );

  if (!res.ok) {
    throw new Error("無法取得地圖資料");
  }
  return res.json() as unknown as Topology;
}

export default async function ElectionPage({ params: { year } }: Props) {
  const districtsTopology = await getMapFile();

  return <ElectionContent map={districtsTopology} year={year} />;
}
