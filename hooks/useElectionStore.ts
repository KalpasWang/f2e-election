import { create } from "zustand";
import { County, CountyFeature, District, Town, TownFeature } from "@/types";
import { counties, towns } from "@/data";

// election store state type
export type State = {
  isLoaded: boolean;
  currentDistrict?: District;
  selectedCounty: County;
  selectedTown: Town;
  selectedCountyFeature?: CountyFeature;
  filteredTownFeatures?: TownFeature[];
  selectedTownFeature?: TownFeature;
};

type Actions = {
  setIsLoaded: (loaded: boolean) => void;
  back: () => void;
  setSelectedCounty: (county: County, feature?: CountyFeature) => void;
  setSelectedTown: (town: Town, feature?: TownFeature) => void;
  reset: () => void;
};

function filterTownFeatures(county: CountyFeature): TownFeature[] {
  return towns.features.filter(
    (f) => f.properties.countyId === county.properties.countyId
  );
}

// define the initial state
const initialState: State = {
  isLoaded: false,
  currentDistrict: "nation",
  selectedCounty: "全部",
  selectedTown: "全部",
  selectedCountyFeature: undefined,
  filteredTownFeatures: undefined,
  selectedTownFeature: undefined,
};

// create store
const useElectionStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  back: () => {
    if (get().currentDistrict === "nation") {
      return;
    }
    if (get().currentDistrict === "county") {
      set({
        currentDistrict: "nation",
        selectedCounty: "全部",
        selectedCountyFeature: undefined,
      });
      return;
    }
    if (get().currentDistrict === "town") {
      set({
        currentDistrict: "county",
        selectedTown: "全部",
        selectedTownFeature: undefined,
      });
    }
  },
  setSelectedCounty: (county: County, feature?: CountyFeature) => {
    if (county === "全部") {
      set({
        currentDistrict: "nation",
        selectedCounty: "全部",
        selectedTown: "全部",
        selectedCountyFeature: undefined,
        selectedTownFeature: undefined,
        filteredTownFeatures: undefined,
      });
      return;
    }

    const found = feature
      ? feature
      : counties.features.find((c) => c.properties.countyName === county);
    const towns = found ? filterTownFeatures(found) : undefined;

    set({
      currentDistrict: "county",
      selectedCounty: county,
      selectedTown: "全部",
      selectedCountyFeature: found,
      filteredTownFeatures: towns,
      selectedTownFeature: undefined,
    });
  },
  setSelectedTown: (town: Town, feature?: TownFeature) => {
    if (town === "全部") {
      set({
        currentDistrict: "county",
        selectedTown: "全部",
        selectedTownFeature: undefined,
      });
      return;
    }

    const found = feature
      ? feature
      : towns.features.find(
          (t) =>
            t.properties.countyName === get().selectedCounty &&
            t.properties.townName === town
        );

    set({
      currentDistrict: "town",
      selectedTown: town,
      selectedTownFeature: found,
    });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useElectionStore;
