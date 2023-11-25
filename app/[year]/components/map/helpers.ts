import { towns } from "@/data";
import {
  CandidateId,
  CountyFeature,
  CountyVoteResult,
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

export function getTransformMatrix(
  bounds: [[number, number], [number, number]],
  width: number,
  height: number
) {
  const [[x0, y0], [x1, y1]] = bounds;
  const scale = 0.7 / Math.max((x1 - x0) / width, (y1 - y0) / height);

  const matrix = composeMatrices(
    identityMatrix(),
    translateMatrix(width / 2, height / 2),
    scaleMatrix(scale, scale),
    translateMatrix(-(x0 + x1) / 2, -(y0 + y1) / 2)
  );
  return matrix;
}

export function filterTownFeatures(county: CountyFeature): TownFeature[] {
  return towns.features.filter(
    (f) => f.properties.countyId === county.properties.countyId
  );
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

// export function getTextFill(pathFill: string) {
//   switch (pathFill) {
//     case green[800]:
//     case blue[800]:
//       return grey[200];
//     case green[600]:
//     case blue[600]:
//       return grey[50];
//     case green[400]:
//     case blue[400]:
//       return grey[900];
//     case green[200]:
//     case blue[200]:
//       return grey[900];
//     default:
//       return grey[500]; // default fill is grey 900.
//   }
// }
