import {
  Candidate,
  CandidateId,
  CountyVoteResult,
  TownVoteResult,
  VillageVoteResult,
  VoteResult,
} from "@/types";

export function getWinnerName(
  district: VoteResult | CountyVoteResult | TownVoteResult | VillageVoteResult,
  candidates: { [c in CandidateId]: Candidate }
) {
  const num = Math.max(
    district.candidate1,
    district.candidate2,
    district.candidate3
  );
  if (num === district.candidate1)
    return {
      name: candidates.candidate1.candidateName1,
      img: "/candidate1.jpg",
    };
  else if (num === district.candidate2)
    return {
      name: candidates.candidate2.candidateName1,
      img: "/candidate2.jpg",
    };
  else
    return {
      name: candidates.candidate3.candidateName1,
      img: "/candidate3.jpg",
    };
}
