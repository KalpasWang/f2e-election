import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { electionDataArray } from "@/config/electionData";
import { ElectionYear } from "@/types";
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

export default function ElectionPage({ params: { year } }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <ElectionContent year={year} />
    </Suspense>
  );
}
