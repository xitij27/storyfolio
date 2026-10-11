import { blankFormation, type BeatFormation, type Formation, type Pose } from "../lib/story/formation.ts";
import { fan, measure, scatter, stack } from "../lib/story/layouts.ts";
import { story, type BeatId } from "./story.ts";

function formation(pieces: Pose[]): Formation {
  const bounds = measure(pieces);
  return {
    ...blankFormation(story.pieces), pieces,
    span: bounds.span * 1.15, rise: bounds.rise * 1.15,
    anchor: [0.42, 0.16], turn: [0.12, -0.12], near: 5,
    floor: -3.5,
  };
}

const size: [number, number] = [1.4, 1.9];
export const formations = {
  "opening.repeat": { rest: formation(stack(story.pieces, size)) },
  "opening.gather": {
    rest: formation(scatter(story.pieces, size)),
    within: formation(stack(story.pieces, size, { offset: [0.018, 0.012, -0.07] })),
  },
  "middle.fan": { rest: formation(fan(story.pieces, size)) },
  "close.whole": { rest: formation(stack(story.pieces, size, { offset: [0.018, 0.012, -0.07] })) },
} satisfies Record<BeatId, BeatFormation>;
