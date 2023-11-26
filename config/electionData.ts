import {
  ElectionData,
  ElectionDatum,
  ElectionYear,
  ElectionYearString,
} from "@/types";
export const countyNames = [
  "全部",
  "台北市",
  "新北市",
  "台中市",
  "桃園市",
  "台南市",
  "高雄市",
  "新竹縣",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "台東縣",
  "澎湖縣",
  "基隆市",
  "新竹市",
  "嘉義市",
  "金門縣",
  "連江縣",
] as const;

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
