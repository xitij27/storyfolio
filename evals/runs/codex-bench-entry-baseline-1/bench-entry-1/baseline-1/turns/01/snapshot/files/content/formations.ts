import { blankFormation, type BeatFormation, type Formation, type Pose } from "../lib/story/formation.ts";
import { measure } from "../lib/story/layouts.ts";
import { story, type BeatId } from "./story.ts";
const pose = (x: number, y: number, z: number, w: number, h: number): Pose => ({ position: [x,y,z], rotation: [0,0,0], size: [w,h] });
function form(pieces: Pose[], turn: [number, number] = [-0.16,-0.18]): Formation {
  const bounds = measure(pieces);
  return { ...blankFormation(story.pieces), pieces, span: bounds.span * 1.08, rise: bounds.rise * 1.12, anchor: [0.46,0.12], turn, near: 4, floor: -4 };
}
const assembled = form([
  pose(0,-1.8,-0.35,4.2,0.9), pose(0,0,0,2.6,1.5), pose(-2.05,0,0,1.15,1.5),
  pose(1.95,0.68,0,1.25,1.15), pose(1.95,-0.75,0,1.25,1.15),
]);
export const formations = {
  "question.inspect": { rest: assembled },
  "scheduling.loop": { rest: form([
    pose(0,-1.45,-0.4,4.2,0.8), pose(0,0.1,0.65,3.7,2.1), pose(-2.55,0,0,0.85,1.2),
    pose(2.55,0.8,0,0.9,0.9), pose(2.55,-0.7,0,0.9,0.9),
  ],[-0.08,-0.08]) },
  "bench.connect": { rest: form([
    pose(0,-1.65,-0.1,3.4,0.9), pose(0,0,0.35,2.4,1.45), pose(-2.5,0,0,1.4,1.8),
    pose(2.55,0.95,0,1.55,1.4), pose(2.55,-0.95,0,1.55,1.4),
  ]) },
  "evidence.paths": { rest: form([
    pose(-1.45,-1.8,-0.2,2.6,0.7), pose(-1.45,-0.15,0,2.2,1.4), pose(-1.45,1.5,0,1.5,1.2),
    pose(1.75,1.0,0.2,2.5,1.8), pose(1.75,-1.1,0.2,2.5,1.8),
  ],[-0.06,-0.08]) },
  "scope.answer": { rest: assembled },
} satisfies Record<BeatId, BeatFormation>;
