import { blankFormation, type BeatFormation, type Formation } from "../lib/story/formation.ts";
import type { BeatId } from "./story.ts";
function pose(turn = -.35): Formation {
  return { ...blankFormation(1), pieces: [{position:[0,0,0],rotation:[0,0,0],size:[1,1]}],
    span: 5.1, rise: 4.25, anchor: [.51,.04], turn: [.67,turn], near: 6, floor: -2.4 };
}
export const formations = {
  "hello.intro": { rest: pose(), within: pose(-.29) },
  "hello.origin": { rest: pose(-.29), within: pose(-.25) },
  "projects.migration": { rest: pose(-.28), within: pose(-.38) },
  "contact.close": { rest: pose(-.38), within: pose(-.28) },
} satisfies Record<BeatId, BeatFormation>;
