import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";

export const story = {
  pieces: 4,
  chapters: [
    { id: "opening", number: 1, name: "The question", role: "opening", beats: [{ id: "opening.assembly", height: 1.5 }] },
    { id: "middle", number: 2, name: "The connection", role: "how", beats: [{ id: "middle.relationship", height: 1.65 }] },
    { id: "close", number: 3, name: "The evidence", role: "close", beats: [{ id: "close.evidence", height: 1.5 }] },
  ],
} as const satisfies StoryDef;

export type BeatId = BeatIdOf<typeof story>;
