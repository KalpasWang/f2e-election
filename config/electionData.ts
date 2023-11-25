import {
  ElectionData,
  ElectionDatum,
  ElectionYear,
  ElectionYearString,
} from "@/types";

export const electionData: ElectionData = {
  1996: {
    year: 2000,
    disable: true,
  },
  2000: {
    year: 2000,
    disable: true,
  },
  2004: {
    year: 2004,
    disable: true,
  },
  2008: {
    year: 2008,
    disable: true,
  },
  2012: {
    year: 2012,
    disable: true,
  },
  2016: {
    year: 2016,
    disable: false,
  },
  2020: {
    year: 2020,
    disable: false,
  },
};

export const electionYears = Object.keys(electionData) as ElectionYearString[];
export const electionDataArray = Object.values(electionData);
