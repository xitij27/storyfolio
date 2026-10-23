import { blankFormation, type BeatFormation, type Formation } from "../lib/story/formation.ts";
import { type BeatId } from "./story.ts";
function formation(turn: number): Formation {
  return { ...blankFormation(1),
    pieces: [{position:[0,0,0],rotation:[0,0,0],size:[1,1]}],
    span:7.7, rise:5.2, anchor:[.5,.05], turn:[.22,turn], near:8,
    floor:-3, drift:0, sway:[0,0,0],
  };
}
export const formations = {
  "opening.hello": {rest:formation(-.12)},
  "opening.library": {rest:formation(-.12),within:formation(.06)},
  "database.cutover": {rest:formation(-.08),within:formation(.12)},
  "contact.complete": {rest:formation(.05)},
} satisfies Record<BeatId, BeatFormation>;
