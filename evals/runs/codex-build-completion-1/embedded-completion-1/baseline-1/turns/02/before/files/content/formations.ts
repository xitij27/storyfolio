import { blankFormation, type BeatFormation, type Formation, type Pose } from "../lib/story/formation.ts";
import { measure } from "../lib/story/layouts.ts";
import { story, type BeatId } from "./story.ts";
function formation(pieces: Pose[], turn: [number, number] = [-.08, -.16]): Formation {
  const bounds = measure(pieces);
  return { ...blankFormation(story.pieces), pieces, span: bounds.span * 1.2, rise: bounds.rise * 1.05, anchor: [.45, .02], turn, near: 5, floor: -4 };
}
function table(depth: number): Pose[] {
  return Array.from({ length: 6 }, (_, i) => ({ position: [0, (2.5-i)*.53, i*depth], rotation: [0,0,0], size: [3.65,.46] }));
}
const loop: Pose[] = Array.from({ length: 6 }, (_, i) => {
  const p = [[-1.15,1.15],[1.15,1.15],[0,-1.05]][Math.floor(i/2)];
  return { position: [p[0],p[1]-(i%2)*.48,0], rotation: [0,0,0], size: [2,.42] };
});
const responsibilities: Pose[] = Array.from({ length: 6 }, (_, i) => ({
  position: [i < 3 ? -1.25 : 1.25, (1-i%3)*.62, i < 3 ? .04 : 0],
  rotation: [0,0,0], size: [2.3,.46],
}));
const bench: Pose[] = table(.025).map((pose, i) => ({ ...pose,
  position: [0, (2.5-i)*.56, (i%2)*.06], rotation: [-.06,0,0],
}));
export const formations = {
  "scope.opening": { rest: formation(table(0)), within: formation(table(.045)) },
  "responsibilities.split": { rest: formation(responsibilities, [0,-.08]) },
  "state.table": { rest: formation(table(0), [0,0]) },
  "observation.fixture": { rest: formation(bench, [-.16,-.1]) },
  "observation.evidence": { rest: formation(table(0), [0,0]) },
  "transition.diagram": { rest: formation(loop, [0,-.08]) },
  "review.close": { rest: formation(table(.045)), within: formation(table(0)) },
} satisfies Record<BeatId, BeatFormation>;
