import { blankFormation, type BeatFormation, type Formation } from "../lib/story/formation.ts";
import { measure, stack } from "../lib/story/layouts.ts";
import { story, type BeatId } from "./story.ts";

// One sheet that stays where it is; its picture changes with the chapter.
function formation(): Formation {
  const pieces = stack(story.pieces, [1.4, 1.9]), bounds = measure(pieces);
  return {
    ...blankFormation(story.pieces), pieces,
    span: bounds.span * 1.15, rise: bounds.rise * 1.15,
    anchor: [0.42, 0.16], turn: [0.12, -0.12], near: 5,
    floor: -3.5,
  };
}

export const formations = {
  "opening.one": { rest: formation() },
  "middle.one": { rest: formation() },
  "close.one": { rest: formation() },
} satisfies Record<BeatId, BeatFormation>;
