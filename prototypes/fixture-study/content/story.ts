import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";

export const story = {
  pieces: 4,
  chapters: [
    { id: "opening", number: 1, name: "The question", role: "opening", beats: [{ id: "opening.assembly", height: 1.5 }] },
    { id: "power", number: 2, name: "The schedule", role: "how", beats: [{ id: "power.cycle", height: 1.65 }] },
    { id: "middle", number: 3, name: "The bench", role: "how", beats: [{ id: "middle.relationship", height: 1.8 }] },
    { id: "proof", number: 4, name: "The evidence", role: "how", beats: [{ id: "proof.boundaries", height: 1.8 }] },
    { id: "close", number: 5, name: "The scope", role: "close", beats: [{ id: "close.evidence", height: 1.65 }] },
  ],
} as const satisfies StoryDef;

export type BeatId = BeatIdOf<typeof story>;
