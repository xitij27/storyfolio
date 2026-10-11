import { blankFormation, type BeatFormation, type Formation, type Pose } from "../lib/story/formation.ts";
import type { BeatId } from "./story.ts";
const pose = (position: Pose["position"], size: Pose["size"], rotation: Pose["rotation"] = [0, 0, 0]): Pose => ({ position, size, rotation });
function arrange(pieces: Pose[], turn: Formation["turn"], span: number, rise: number): Formation {
  return { ...blankFormation(4), pieces, turn, span, rise, anchor: [.40, .04], near: 4, floor: -2.7, sway: [0, 0, 0] };
}
export const formations = {
  "opening.assembly": {
    rest: arrange([
      pose([-1.25, -.7, .42], [1.35, 1.2]),
      pose([-.7, .65, .23], [1.25, 1.15]),
      pose([0, 0, -.3], [4.05, 2.8]),
      pose([1.08, .22, .68], [1.58, 1.8]),
    ], [.38, -.42], 4.5, 3.6),
    within: arrange([
      pose([-1.25, -.7, .48], [1.35, 1.2]),
      pose([-.7, .65, .45], [1.25, 1.15]),
      pose([0, 0, -.3], [4.05, 2.8]),
      pose([1.08, .22, .78], [1.58, 1.8]),
    ], [.25, -.25], 4.5, 3.6),
  },
  "power.cycle": {
    rest: arrange([
      pose([-1.05, .65, .8], [1.85, 1.65], [0, .04, .025]),
      pose([1.05, .65, .65], [1.75, 1.65], [0, -.04, -.025]),
      pose([-.25, -1.05, -.5], [3.35, 1.55]),
      pose([1.35, -1.16, .15], [1.15, 1.25]),
    ], [.18, -.22], 4.7, 3.9),
  },
  "middle.relationship": {
    rest: arrange([
      pose([-1.3, 1.2, .5], [1.5, 1.35], [0, .08, .04]),
      pose([1.25, 1.2, -.12], [1.5, 1.35], [0, -.08, -.04]),
      pose([1.25, -1.2, -.3], [1.9, 1.5]),
      pose([-1.3, -1.2, .6], [1.6, 1.5]),
    ], [.09, -.13], 5, 4.45),
  },
  "proof.boundaries": {
    rest: arrange([
      pose([-1.42, -.85, .4], [1.05, 1]),
      pose([-1.35, .78, .3], [1.05, 1]),
      pose([-.25, -.12, -.5], [3.55, 2.55]),
      pose([.77, .13, 1.05], [2.25, 2.5]),
    ], [.12, -.18], 4.7, 3.8),
  },
  "close.evidence": {
    rest: arrange([
      pose([-1.23, -.8, .42], [1.3, 1.15]),
      pose([-.75, .63, .3], [1.15, 1.05]),
      pose([0, -.1, -.3], [4.05, 2.85]),
      pose([1.02, .3, .95], [1.85, 2.1]),
    ], [.18, -.22], 4.7, 3.8),
  },
} satisfies Record<BeatId, BeatFormation>;
