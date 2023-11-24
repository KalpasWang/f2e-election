import { create } from "zustand";
import { County, CountyFeature, District, Town, TownFeature } from "@/types";

// election store state type
export type State = {
  currentDistrict?: District;
  selectedCounty: County;
  selectedTown: Town;
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
      });
      return;
    }

    set({
      currentDistrict: "county",
      selectedCounty: county,
      selectedTown: "全部",
    });
  },
  setSelectedTown: (town: Town) => {
    if (town === "全部") {
      set({
        currentDistrict: "county",
        selectedTown: "全部",
      });
      return;
    }

    set({
      currentDistrict: "county",
      selectedTown: town,
    });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useElectionStore;