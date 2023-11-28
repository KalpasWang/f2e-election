import { counties, towns } from "@/data";
import {
  CandidateId,
  County,
  CountyFeature,
  CountyVoteResult,
  District,
  TownFeature,
  TownVoteResult,
  VillageVoteResult,
} from "@/types";
import {
  composeMatrices,
  identityMatrix,
  scaleMatrix,
  translateMatrix,
} from "@visx/zoom";
import { geoPath } from "d3-geo";

type GetInitialMatrixProps = {
  currentDistrict?: District;
  county?: County;
  town?: string;
  width: number;
  height: number;
};

export function getInitialMatrix({
  currentDistrict,
  county,
  town,
  width,
  height,
}: GetInitialMatrixProps) {
  const path = geoPath().projection(null);

  if (currentDistrict === "nation") {
    return identityMatrix();
  }
  if (currentDistrict === "county") {
    const found = counties.features.find(
      (f) => f.properties.countyName === county
    );
    if (!found) return identityMatrix();
    return getTransformMatrix(path.bounds(found), width, height);
  }
  if (currentDistrict === "town") {
    const found = towns.features.find(
      (f) =>
        f.properties.countyName === county && f.properties.townName === town
    );
    if (!found) return identityMatrix();
    return getTransformMatrix(path.bounds(found), width, height);
  }
  return identityMatrix();
}

export function getTransformMatrix(
  bounds: [[number, number], [number, number]],
  width: number,
  height: number
) {
  const [[x0, y0], [x1, y1]] = bounds;
  const scale = 0.9 * Math.min(width / (x1 - x0), height / (y1 - y0));
  const matrix = composeMatrices(
    identityMatrix(),
    translateMatrix(width / 2, height / 2),
    scaleMatrix(scale, scale),
    translateMatrix(-((x0 + x1) / 2), -((y0 + y1) / 2))
  );
  return matrix;
}

export function getWinCandidateId(
  district: CountyVoteResult | TownVoteResult | VillageVoteResult
): CandidateId {
  const num = Math.max(
    district.candidate1,
    district.candidate2,
    district.candidate3
  );
  if (num === district.candidate1) return "candidate1";
  else if (num === district.candidate2) return "candidate2";
  else return "candidate3";
}
