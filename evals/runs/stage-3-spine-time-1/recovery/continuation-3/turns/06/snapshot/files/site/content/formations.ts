import { blankFormation, type BeatFormation, type Formation, type Pose } from "../lib/story/formation.ts";
import { measure } from "../lib/story/layouts.ts";
import { story, type BeatId } from "./story.ts";

function pose(x: number, y = 0, z = 0, size: [number, number] = [1, 1]): Pose {
  return { position: [x, y, z], rotation: [0, 0, 0], size };
}
function formation(pieces: Pose[], turn: [number, number] = [.48, -.4]): Formation {
  const bounds = measure(pieces);
  return { ...blankFormation(7), pieces, span: Math.max(7.2, bounds.span * 1.15), rise: Math.max(3.4, bounds.rise * 1.15),
    anchor: [.45, .24], turn, near: 6, floor: -3 };
}
const assembled = Array.from({ length: story.pieces }, (_, i) => pose((i - 3) * .98));
const separated = Array.from({ length: story.pieces }, (_, i) => pose((i - 3) * 1.06, i % 2 ? .16 : 0, Math.abs(i - 3) * .2));
const owned = assembled.map((p, i) => [0, 1, 3].includes(i) ? pose(p.position[0], .35, .7) : p);
// Three explicit relationship groups; all seven segments stay present.
const access = [pose(-2.8, .65), pose(-2.8, -.6), pose(-1.7, 0), pose(0, 0, .3, [1.25, 1.25]), pose(2, 0, .3, [1.25, 1.25]), pose(1.6, -1.5, -.4), pose(2.7, -1.5, -.4)];
const evidence = [pose(-1.96), pose(-.98), pose(0), pose(.98), pose(1.96), pose(-2.15, -1.7, .55, [1.4, 1.4]), pose(2.15, -1.7, .55, [1.4, 1.4])];
const teachingLoop = [pose(-1.8, .3), pose(0, 1.65, 0, [1.5, 1.5]), pose(1.8, .3), pose(0, -1.1), pose(0, -2.4), pose(-2.2, -2.4, -.3), pose(2.2, -2.4, -.3)];
const documents = [pose(-2.5, 1.3), pose(-2.5, 0), pose(-2.5, -1.3), pose(-.1, 0, .2, [1.2, 1.2]), pose(2, 0, .2, [1.2, 1.2]), pose(.8, -1.7, -.4), pose(2, -1.7, -.4)];
const openObservation = [pose(-2.9), pose(-1.92), pose(-.94), pose(.04), pose(2.6, .5, .65, [1.5, 1.5]), pose(-.2, -1.8, -.4), pose(.9, -1.8, -.4)];
const scope = assembled.map((p, i) => [0, 3, 4].includes(i) ? pose(p.position[0], .45, .6) : p);
export const formations = {
  "prepare.assemble": { rest: formation(separated), within: formation(assembled) },
  "prepare.responsibility": { rest: formation(owned) },
  "command.states": { rest: formation(teachingLoop, [.28, -.2]) },
  "command.documents": { rest: formation(documents, [.32, -.22]) },
  "access.relationship": { rest: formation(access, [.32, -.22]) },
  "access.mosslink": { rest: formation(owned) },
  "observe.open": { rest: formation(openObservation, [.32, -.22]) },
  "record.battery": { rest: formation(evidence, [.32, -.22]) },
  "record.scope": { rest: formation(scope) },
  "record.close": { rest: formation(assembled) },
} satisfies Record<BeatId, BeatFormation>;
