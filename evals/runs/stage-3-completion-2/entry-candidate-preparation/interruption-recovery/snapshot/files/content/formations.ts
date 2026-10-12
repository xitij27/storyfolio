import { blankFormation, type BeatFormation, type Formation, type Pose } from "../lib/story/formation.ts";
import { story, type BeatId } from "./story.ts";
function pose(x: number, y: number, z: number, width: number, height: number): Pose {
  return { position: [x, y, z], rotation: [0, 0, 0], size: [width, height] };
}
function apparatus(exploded: boolean, ending = false): Formation {
  return {
    ...blankFormation(story.pieces),
    pieces: [
      pose(0, -0.15, -0.45, 4.6, 3.6), // fixture chassis
      pose(exploded ? 0.65 : 0.3, exploded ? 0.65 : 0.2, exploded ? 1.05 : -0.04, 2.5, 1.85), // board
      pose(-1.45, exploded ? 1.9 : 0.1, exploded ? 0.9 : 0.22, 1.2, 0.95), // command instrument
      pose(1.28, exploded ? -1.8 : -1.28, exploded ? 0.8 : -0.02, 1.65, 0.75), // observation instrument
    ],
    span: exploded ? 6.4 : 5.6, rise: exploded ? 5.6 : 4.6,
    anchor: [0.49, 0.13], turn: ending ? [0.28, -0.18] : [0.42, -0.3],
    near: 6, floor: -3.4, sway: [0.04, 0.1, 0], drift: 0,
  };
}
export const formations = {
  "question.apparatus": { rest: apparatus(false) },
  "bench.inspect": { rest: apparatus(true) },
  "scope.answer": { rest: apparatus(false, true) },
} satisfies Record<BeatId, BeatFormation>;
