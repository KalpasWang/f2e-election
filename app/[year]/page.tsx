import React, { Suspense } from "react";
import { electionDataArray } from "@/config/electionData";
import { ElectionYear } from "@/types";
// import ElectionContent from "./components/election-content";
import dynamic from "next/dynamic";
import Loading from "./loading";

const ElectionContent = dynamic(() => import("./components/election-content"));

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

export default async function ElectionPage({ params: { year } }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <ElectionContent year={year} />
    </Suspense>
  );
}
