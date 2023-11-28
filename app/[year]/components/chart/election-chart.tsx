import React, { Key, useCallback, useMemo } from "react";
import useElectionStore from "@/hooks/useElectionStore";
import { ElectionYear } from "@/types";
import { electionResult } from "@/data";
import Avatar from "./avatar";
import AmountChart from "./amount-chart";
import Info from "./info";
import CircularChart from "./circular-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  getKeyValue,
} from "@nextui-org/react";
import { getWinnerName } from "./helpers";

type Props = {
  year: ElectionYear;
};

const columns = [
  {
    key: "region",
    label: "地區",
  },
  {
    key: "vote",
    label: "得票率",
  },
  {
    key: "winner",
    label: "當選人",
  },
  {
    key: "amount",
    label: "投票數",
  },
  {
    key: "rate",
    label: "投票率",
  },
];

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

  const currentVoteResult = useMemo(() => {
    if (currentDistrict === "nation") return voteResult;
    if (currentDistrict === "county") {
      return countyVoteResult;
    }
    if (currentDistrict === "town") return townsVoteResult;
    return voteResult;
  }, [currentDistrict, voteResult, countyVoteResult, townsVoteResult]);

  const rows = useMemo(() => {
    return countyVoteResult.map((region) => ({
      key: region.countyName,
      region: region.countyName,
      vote: candidatesArray.map((c) => ({
        percent: (region[c.candidateId] / region.validVotes) * 100,
        color: c.partyAlias,
      })),
      winner: getWinnerName(region, candidates),
      amount: region.validVotes,
      rate: region.votingRate,
    }));
  }, [countyVoteResult, candidates, candidatesArray]);

  const bigTitle = useMemo(() => {
    if (currentDistrict === "nation") return "全臺縣市總統得票";
    if (currentDistrict === "county") return selectedCounty;
    if (currentDistrict === "town") return selectedCounty + selectedTown;
    return "全臺縣市總統得票";
  }, [currentDistrict, selectedCounty, selectedTown]);

  const subRegionTitle = useMemo(() => {
    if (currentDistrict === "nation") return "各縣市投票總覽";
    else return "各區域投票總覽";
  }, [currentDistrict]);

  const renderCell = useCallback((item: any, columnKey: Key) => {
    const cellValue = item[columnKey as string];

    switch (columnKey) {
      case "region":
        return <h6 className="font-bold">{cellValue}</h6>;
      case "vote": {
        return (
          <div className="w-full flex justify-center">
            <div className="w-[300px]">
              <AmountChart data={cellValue} showLabel />
            </div>
          </div>
        );
      }
      case "winner":
        return (
          <User
            name={cellValue.name}
            avatarProps={{
              src: cellValue.img,
              className: "rounded-none w-32 h-32 mr-8",
            }}
          />
        );
      case "amount":
        return (
          <div className="text-right pr-16">
            {Intl.NumberFormat("en-US").format(cellValue)}
          </div>
        );
      case "rate":
        return cellValue.toFixed(2) + "%";
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="lg:h-[calc(100vh-64.8px)] overflow-auto bg-background">
      <div className="container">
        {/* title */}
        <h3 className="pt-32 pb-12">{bigTitle}</h3>
        {/* 總統得票數, 其他統計數字 */}
        <div className="bg-default rounded px-16 pb-16">
          <h5 className="py-24">總統得票數</h5>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
            <div className="px-24 py-16 bg-background rounded">
              <div className="flex justify-between items-center pb-12">
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
                <CircularChart label="投票率" percent={voteResult.votingRate} />
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
        {/* 下屬區域總覽 */}
        <div className="py-40">
          <h5 className="pb-8">{subRegionTitle}</h5>
          <Table removeWrapper aria-label={subRegionTitle}>
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key} className="text-center">
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <footer className="py-16 text-center bg-default">
        版權所有 &copy; 2023 台灣歷年總統 都幾?
      </footer>
    </div>
  );
}
