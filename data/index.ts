import * as topojson from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import {
  ElectionResult,
  CompBorderProperty,
  CountyProperty,
  TownProperty,
} from "@/types";
import election from "./election.json";
import taiwanMap from "./towns-mercator-10t.json";

const districtsTopology = taiwanMap as unknown as Topology;

export const electionResult = election as ElectionResult;

export const counties = topojson.feature<CountyProperty>(
  districtsTopology,
  districtsTopology.objects.counties as GeometryCollection<CountyProperty>
);

export const compBorders = topojson.feature<CompBorderProperty>(
  districtsTopology,
  districtsTopology.objects
    .compBorders as GeometryCollection<CompBorderProperty>
);

export const towns = topojson.feature<TownProperty>(
  districtsTopology,
  districtsTopology.objects.towns as GeometryCollection<TownProperty>
);
