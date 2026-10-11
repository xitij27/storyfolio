import { blankFormation, type BeatFormation, type Formation, type Pose } from "../lib/story/formation.ts";
import { story, type BeatId } from "./story.ts";
const p = (x: number, y: number, z: number, w: number, h: number, rx = 0): Pose => ({ position: [x,y,z], rotation: [rx,0,0], size: [w,h] });
function f(pieces: Pose[], span = 7, rise = 4.8, turn: [number,number] = [0.17,-0.28]): Formation {
  return { ...blankFormation(story.pieces), pieces, span, rise, turn, anchor: [0.48,0.17], near: 8, floor: -3, sway: [0.06,0.12,0] };
}
const assembled = [p(0,-1.45,0,5.6,.35), p(-.7,-.65,.4,2.8,1.6,-.65), p(1.7,.1,-.4,1.65,1.9), p(-1.7,.75,-.45,.65,1), p(-.7,.75,-.45,.65,1), p(.3,.75,-.45,.65,1), p(-.7,-.2,.7,2.8,.6)];
export const formations = {
 question: { rest: f(assembled) },
 scheduling: { rest: f([assembled[0],p(-.5,-.75,.3,2.4,1.2,-.65),p(2,-.25,-.3,1.3,1.5),p(-1.8,1,.1,.8,1.4),p(-.5,1,.1,.8,1.4),p(.8,1,.1,.8,1.4),p(-.5,-.3,.6,2.4,.6)]) },
 bench: { rest: f([p(0,-1.75,0,5.6,.35),p(-1.5,.25,.5,2.6,1.6,-.25),p(1.8,.6,-.2,1.65,1.9),p(-1.7,1.8,-.5,.6,.8),p(-.7,1.8,-.5,.6,.8),p(.3,1.8,-.5,.6,.8),p(-1.5,-.95,.7,2.6,.6)],7.5,5.5,[.1,-.2]) },
 evidence: { rest: f([p(0,-1.85,0,6.2,.35),p(1.7,-.8,.4,2.1,1.3,-.4),p(1.7,.85,-.1,2,1.7),p(-2,1.3,0,.85,1),p(-.8,1.3,0,.85,1),p(-1.4,-.05,.1,1.4,1.1),p(1.7,-1.25,.8,2.1,.5)],8,5.2,[.12,-.15]) },
 scope: { rest: f(assembled,7,4.8,[.18,.18]) },
} satisfies Record<BeatId, BeatFormation>;
