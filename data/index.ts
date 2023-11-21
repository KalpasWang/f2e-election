import { TownVoteResult, VoteResult } from "@/types";
import candidates from "./candidates2020.json";
import townsVote from "./townsVoteResult2020.json";
import countysVote from "./voteResult2020.json";
import towns_10t from "@/data/towns-mercator-10t.json";
import { Topology } from "topojson-specification";

export const townsVoteResult2020 = townsVote as TownVoteResult[];
export const voteResult2020 = countysVote as VoteResult;
export const districtsTopology = towns_10t as unknown as Topology;
export const candidates2020 = candidates;
