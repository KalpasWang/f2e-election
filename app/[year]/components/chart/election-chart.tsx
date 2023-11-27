import React, { useCallback, useMemo } from "react";
import useElectionStore from "@/hooks/useElectionStore";
import { ElectionYear } from "@/types";
import { electionResult } from "@/data";
import Avatar from "./avatar";
import AmountChart from "./amount-chart";
import Info from "./info";
import CircularChart from "./circular-chart";

type Props = {
  year: ElectionYear;
};

export default function ElectionChart({ year }: Props) {
  const { currentDistrict, selectedCounty, selectedTown } = useElectionStore(
    (state) => ({
      currentDistrict: state.currentDistrict,
      selectedCounty: state.selectedCounty,
      selectedTown: state.selectedTown,
    })
  );
  const electionData = electionResult.find((item) => item.year === +year);
  if (!electionData) {
    console.error(`Election data in year: ${year} not found`);
  }
  const {
    candidates,
    voteResult,
    countyVoteResult,
    townsVoteResult,
    villagesVoteResult,
  } = electionData!;

  const candidatesArray = useMemo(
    () => Object.values(candidates),
    [candidates]
  );

  const voteDataArray = useMemo(() => {
    return candidatesArray.map((c) => ({
      percent: (voteResult[c.candidateId] / voteResult.validVotes) * 100,
      color: c.partyAlias,
    }));
  }, [candidatesArray, voteResult]);

  const getTitle = useCallback(() => {
    if (currentDistrict === "nation") return "全臺縣市總統得票";
    if (currentDistrict === "county") return selectedCounty;
    if (currentDistrict === "town") return selectedCounty + selectedTown;
    return "全臺縣市總統得票";
  }, [currentDistrict, selectedCounty, selectedTown]);

  return (
    <div className="h-full overflow-auto bg-background pl-40">
      <h3 className="pt-32 pb-12">{getTitle()}</h3>
      <div className="bg-default rounded px-16 pb-16">
        <h5 className="py-24">總統得票數</h5>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
          <div className="px-24 py-16 bg-background rounded">
            <div className="flex justify-between items-center">
              {candidatesArray.map((candidate) => (
                <Avatar
                  key={candidate.candidateId}
                  name={
                    <>
                      <span className="text-xs text-secondary">
                        {candidate.party}
                      </span>
                      <p className="text-content1">
                        {candidate.candidateName1}
                      </p>
                    </>
                  }
                  description={voteResult[candidate.candidateId]}
                  img={`/${candidate.candidateId}.jpg`}
                />
              ))}
            </div>
            <AmountChart data={voteDataArray} showLabel />
          </div>
          <div className="p-24 pt-12 bg-background rounded">
            <div className="flex items-center gap-40">
              <CircularChart />
              <div className="grid grid-cols-2 grid-rows-2 gap-16 flex-grow">
                <Info title="投票數" value={voteResult.totalVotes} />
                <Info
                  title="投票率"
                  value={voteResult.votingRate}
                  format="precent"
                />
                <Info title="有效票數" value={voteResult.validVotes} />
                <Info title="無效票數" value={voteResult.invalidVotes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
