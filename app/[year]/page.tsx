import React from "react";
import { electionData, electionDataArray } from "@/config/electionData";
import { ElectionYear, ElectionFile } from "@/types";
import ElectionContent from "./components/election-content";

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

async function getElectionFile(filename: string) {
  const res = await fetch(
    `https://github.com/KalpasWang/fileRepo/raw/main/${filename}`
  );

  if (!res.ok) {
    throw new Error("無法取得選舉資料");
  }
  return res.json();
}

export default async function ElectionPage({ params: { year } }: Props) {
  const filename = electionData[year].data;
  const electionFile = (await getElectionFile(filename)) as ElectionFile;

  return <ElectionContent data={electionFile} />;
}
