import { blankFormation, type BeatFormation, type Formation } from "../lib/story/formation.ts";
import type { BeatId } from "./story.ts";
function pose(turn = -.35, rise = 4.25): Formation {
  return { ...blankFormation(1), pieces: [{position:[0,0,0],rotation:[0,0,0],size:[1,1]}], span: 5.1, rise, anchor: [.51,.04], turn: [.67,turn], near: 6, floor: -2.4 };
}
export const formations = {
  "hello.intro": { rest: pose(), within: pose(-.29) },
  "hello.origin": { rest: pose(-.29), within: pose(-.25) },
  "places.route": { rest: pose(-.42), within: pose(-.22) },
  "study.degree": { rest: pose(-.2), within: pose(-.26) },
  "career.library-lumen": { rest: pose(-.29) },
  "career.kestrel": { rest: pose(-.4), within: pose(-.32) },
  "practice.documents": { rest: pose(-.32), within: pose(-.25) },
  "practice.oncall": { rest: pose(-.25), within: pose(-.35) },
  "practice.reading": { rest: pose(-.35), within: pose(-.3) },
  "projects.migration": { rest: pose(-.28), within: pose(-.38) },
  "projects.database": { rest: pose(-.38), within: pose(-.26) },
  "projects.runbook": { rest: pose(-.26), within: pose(-.32) },
  "projects.ferry": { rest: pose(-.32), within: pose(-.25) },
  "projects.talk": { rest: pose(-.25), within: pose(-.38) },
  "contact.close": { rest: pose(-.38), within: pose(-.28) },
} satisfies Record<BeatId, BeatFormation>;
