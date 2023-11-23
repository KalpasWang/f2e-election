import { create } from "zustand";
import { County, CountyFeature, District, Town, TownFeature } from "@/types";
import { counties } from "@/utils/districtsGeoData";

// election store state type
export type State = {
  currentDistrict?: District;
  selectedCounty: County;
  selectedTown: Town;
  selectedDistrictFeature?: CountyFeature | TownFeature;
  selectedCountyFeature?: CountyFeature;
  selectedTownFeature?: TownFeature;
  renderedTownsFeature?: TownFeature[];
};

type Actions = {
  setSelectedCounty: (county: County) => void;
  setSelectedTown: (town: Town) => void;
  reset: () => void;
};

// define the initial state
const initialState: State = {
  currentDistrict: "nation",
  selectedCounty: "全部",
  selectedTown: "全部",
};

// create store
const useElectionStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setSelectedCounty: (county: County) => {
    if (county === "全部") {
      set({
        currentDistrict: "nation",
        selectedCounty: "全部",
        selectedTown: "全部",
        selectedDistrictFeature: undefined,
        selectedCountyFeature: undefined,
        selectedTownFeature: undefined,
        renderedTownsFeature: undefined,
      });
      return;
    }

    const countyFeature = counties.features.find(
      (f) => f.properties.countyName === county
    );
    if (!countyFeature) {
      throw new Error("countyFeature not found");
    }

    set({
      currentDistrict: "county",
      selectedCounty: county,
      selectedTown: "全部",
      selectedDistrictFeature: countyFeature,
      selectedCountyFeature: countyFeature,
      selectedTownFeature: undefined,
      renderedTownsFeature: undefined,
    });
  },
  setSelectedTown: (town: Town) => {},
  reset: () => {
    set(initialState);
  },
}));

export default useElectionStore;

// addSalmon: (qty: number) => {
//   set({ salmon: get().salmon + qty });
// },
// addTuna: (qty: number) => {
//   set({ tuna: get().tuna + qty });
// },
