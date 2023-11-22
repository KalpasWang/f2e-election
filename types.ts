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

// candidate
export type Candidate = {
  candidateId: string;
  number: number;
  candidateName1: string;
  candidateName2: string;
};
const counties = voteResult.counties.map((county) => county.countyName);
console.log(counties);
export type County = (typeof counties)[number];

export type ElectionFile = {
  year: ElectionYear;
  candidates: Candidate[];
  voteResult: VoteResult;
  countyVoteResult: CountyVoteResult[];
  townsVoteResult: TownVoteResult[];
};

// election data unit
export type ElectionDatum = {
  year: ElectionYear;
  disable: boolean;
  data: string;
};

export type ElectionData = {
  [year in ElectionYear]: ElectionDatum;
};

// districts type
export type District = "county" | "town";

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
  countyName: string;
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
  countyName: string;
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

// Map type
export type CountyProperty = {
  countyId: string;
  countyName: string;
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
  countyName: string;
  townName: string;
  townEng: string;
  countyId: string;
  countyCode: string;
};

export type CountyFeatures = FeatureCollection<Geometry, CountyProperty>;
export type TownFeatures = FeatureCollection<Geometry, TownProperty>;
export type CountyFeature = Feature<Geometry, CountyProperty>;
export type TownFeature = Feature<Geometry, TownProperty>;

// map reducer type
export type MapState = {
  currentLevel: 0 | 1 | 2 | 3;
  currentDistrict?: District;
  selectedDistrict?: CountyFeature | TownFeature;
  selectedCounty?: CountyFeature;
  selectedTown?: TownFeature;
  renderedTowns?: TownFeature[];
};

export type MapAction =
  | {
      type: "goto";
      payload:
        | { type: "county"; feature: CountyFeature }
        | { type: "town"; feature: TownFeature };
    }
  | {
      type: "up";
    };

export type TooltipDataType = string;
