import { blankFormation, type BeatFormation, type Formation, type Pose } from "../lib/story/formation.ts";
import type { BeatId } from "./story.ts";
const pose = (x:number,y:number,z:number,w:number,h:number,rx=0): Pose => ({ position:[x,y,z], rotation:[rx,0,0],size:[w,h] });
function rig(mode: "whole" | "schedule" | "bench" | "evidence"): Formation {
  const split = mode === "bench";
  const evidence = mode === "evidence";
  return { ...blankFormation(6),
    pieces: [
      pose(0,-1.1,0,4.6,.3),
      pose(0,split ? .3 : -.4,split ? .65 : .2,1.5,.85,-.15),
      pose(0,split ? 1.05 : .05,-.35,2.05,1.55),
      pose(-1.55, mode === "schedule" ? .65 : -.25,.1,1.05,1.25),
      pose(evidence ? -1.25 : 1.45,evidence ? 1.1 : .35,0,.95,.8),
      pose(evidence ? 1.25 : 1.45,evidence ? -.05 : -.55,.2,.95,.65),
    ],
    span: 5.5, rise: 3.5, anchor:[.5,.1], turn:[.14,-.22], near: 5,
    floor:-1.4, drift:0, sway:[0,.08,0],
  };
}
export const formations = {
  question: { rest:rig("whole") }, scheduling: { rest:rig("schedule") },
  bench: { rest:rig("bench") }, evidence: { rest:rig("evidence") }, scope: { rest:rig("whole") },
} satisfies Record<BeatId, BeatFormation>;
