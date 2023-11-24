import * as topojson from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import { CompBorderProperty, CountyProperty, TownProperty } from "@/types";

function getDistrictsGeoData(districtsTopology: Topology) {
  const counties = topojson.feature<CountyProperty>(
    districtsTopology,
    districtsTopology.objects.counties as GeometryCollection<CountyProperty>
  );

  const compBorders = topojson.feature<CompBorderProperty>(
    districtsTopology,
    districtsTopology.objects
      .compBorders as GeometryCollection<CompBorderProperty>
  );

  const towns = topojson.feature<TownProperty>(
    districtsTopology,
    districtsTopology.objects.towns as GeometryCollection<TownProperty>
  );

  return { counties, compBorders, towns };
}

export default getDistrictsGeoData;
