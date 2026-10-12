import { blankFormation, type BeatFormation, type Formation, type Pose } from "../lib/story/formation.ts";
import { measure } from "../lib/story/layouts.ts";
import type { BeatId } from "./story.ts";
const p = (x: number, y: number, z: number, w: number, h: number): Pose => ({ position: [x,y,z], rotation: [0,0,0], size:[w,h] });
function f(pieces: Pose[], turn: [number,number] = [-0.12,-0.18]): Formation {
 const b = measure(pieces);
 return {...blankFormation(6), pieces, span:b.span*1.08, rise:b.rise*1.08, anchor:[0.48,0.12], turn, near:5, floor:-4, sway:[0,0,0]};
}
const assembled = [p(0,-1.65,0,6.1,0.85), p(0,-0.05,0.2,2.25,2.1), p(-2.05,0,0.05,1.5,1.45), p(2.05,0,0.05,1.5,1.45), p(-1.55,1.95,-0.05,2.5,1.15), p(1.55,1.95,-0.05,2.5,1.15)];
export const formations = {
 question: {rest:f(assembled,[-0.18,-0.25])},
 scheduling: {rest:f([p(0,-1.9,0,5.8,0.65),p(0,0.15,0.5,3.7,3.2),p(-2.65,-1,0,1.2,1.2),p(2.65,-1,0,1.2,1.2),p(-1.55,2.55,-0.3,2.4,0.85),p(1.55,2.55,-0.3,2.4,0.85)],[0,-0.08])},
 bench: {rest:f([p(0,-1.65,0,6.7,0.9),p(0,0.05,0.35,2.15,2.1),p(-2.5,0.05,0.25,1.7,1.6),p(2.5,0.05,0.25,1.7,1.6),p(-1.65,2.05,-0.2,2.6,1),p(1.65,2.05,-0.2,2.6,1)],[0,-0.12])},
 evidence: {rest:f([p(0,-2.1,0,6.2,0.7),p(0,-0.85,0.1,1.5,1.3),p(-2.15,-0.85,0.1,1.5,1.3),p(2.15,-0.85,0.1,1.5,1.3),p(-1.9,1.4,0.5,3.15,2.3),p(1.9,1.4,0.5,3.15,2.3)],[0,-0.08])},
 scope: {rest:f(assembled,[-0.12,-0.18])},
} satisfies Record<BeatId,BeatFormation>;
