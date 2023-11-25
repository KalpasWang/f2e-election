import { Feature, FeatureCollection, Geometry } from "geojson";
import voteResult from "@/data/voteResult2020.json";

// election years
export type ElectionYear = 1996 | 2000 | 2004 | 2008 | 2012 | 2016 | 2020;
export type ElectionYearString =
  | "1996"
  | "2000"
  | "2004"
  | "2008"
  | "2012"
  | "2016"
  | "2020";

// district type
export type County =
  | "台北市"
  | "新北市"
  | "台中市"
  | "桃園市"
  | "台南市"
  | "高雄市"
  | "新竹縣"
  | "苗栗縣"
  | "彰化縣"
  | "南投縣"
  | "雲林縣"
  | "嘉義縣"
  | "屏東縣"
  | "宜蘭縣"
  | "花蓮縣"
  | "台東縣"
  | "澎湖縣"
  | "基隆市"
  | "新竹市"
  | "嘉義市"
  | "金門縣"
  | "連江縣"
  | "全部";

export type Town = string;

export type PartyColor = "blue" | "green" | "orange" | "grey";
export type DistrictColor = {
  [color in PartyColor]: string;
};

// candidate
export type CandidateId = "candidate1" | "candidate2" | "candidate3";
export type Candidate = {
  candidateId: CandidateId;
  number: number;
  candidateName1: string;
  candidateName2: string;
  party: "國民黨" | "民進黨" | "親民黨" | "無黨籍";
  partyAlias: PartyColor;
};

export type ElectionResult = {
  year: ElectionYear;
  candidates: {
    [c in CandidateId]: Candidate;
  };
  voteResult: VoteResult;
  countyVoteResult: CountyVoteResult[];
  townsVoteResult: TownVoteResult[];
}[];

// election data unit
export type ElectionDatum = {
  year: ElectionYear;
  disable: boolean;
};

export type ElectionData = {
  [year in ElectionYearString]: ElectionDatum;
};

// districts type
export type District = "nation" | "county" | "town";

// election data type
export type VoteResult = {
  electionRegion: string;
  candidate1: number;
  candidate2: number;
  candidate3: number;
  validVotes: number;
  invalidVotes: number;
  totalVotes: number;
  totalElectors: number;
  votingRate: number;
};

export type CountyVoteResult = {
  countyName: County;
  candidate1: number;
  candidate2: number;
  candidate3: number;
  validVotes: number;
  invalidVotes: number;
  totalVotes: number;
  totalElectors: number;
  votingRate: number;
};

export type TownVoteResult = {
  countyName: County;
  townName: string;
  candidate1: number;
  candidate2: number;
  candidate3: number;
  validVotes: number;
  invalidVotes: number;
  totalVotes: number;
  totalElectors: number;
  votingRate: number;
};

export type VillageVoteResult = {
  countyName: County;
  townName: string;
  villageName: string;
  candidate1: number;
  candidate2: number;
  candidate3: number;
  validVotes: number;
  invalidVotes: number;
  totalVotes: number;
  totalElectors: number;
  votingRate: number;
};

// Map type
export type CountyProperty = {
  countyId: string;
  countyName: County;
  countyCode: string;
  countyEng: string;
};

export type CompBorderProperty = {
  borderLevel: "county" | "town";
  name: string;
  id: string;
  code: string;
  eng: string;
};

export type TownProperty = {
  townId: string;
  townCode: string;
  countyName: County;
  townName: string;
  townEng: string;
  countyId: string;
  countyCode: string;
};

export type CountyFeatures = FeatureCollection<Geometry, CountyProperty>;
export type TownFeatures = FeatureCollection<Geometry, TownProperty>;
export type CountyFeature = Feature<Geometry, CountyProperty>;
export type TownFeature = Feature<Geometry, TownProperty>;
