import { ElectionData, ElectionDatum, ElectionYear } from "@/types";

export const electionData: ElectionData = {
  1996: {
    year: 2000,
    disable: true,
    data: "data2020.json",
  },
  2000: {
    year: 2000,
    disable: true,
    data: "data2020.json",
  },
  2004: {
    year: 2004,
    disable: true,
    data: "data2020.json",
  },
  2008: {
    year: 2008,
    disable: true,
    data: "data2020.json",
  },
  2012: {
    year: 2012,
    disable: true,
    data: "data2020.json",
  },
  2016: {
    year: 2016,
    disable: true,
    data: "data2020.json",
  },
  2020: {
    year: 2020,
    disable: false,
    data: "election2020.json",
  },
};

export const electionYears = Object.keys(electionData).map(
  (y) => +y
) as ElectionYear[];
export const electionDataArray = Object.values(electionData);
