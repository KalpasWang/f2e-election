import * as topojson from "topojson-client";
import type { GeometryCollection } from "topojson-specification";
import { districtsTopology } from "@/data";
import { CompBorderProperty, CountyProperty, TownProperty } from "@/types";

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
