import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";

// A placeholder that tests the engine. It has no design in it: replace all of content/.
export const story = {
  pieces: 1,
  chapters: [
    { id: "opening", number: 1, name: "First", role: "opening", beats: [{ id: "opening.one", height: 1 }] },
    { id: "middle", number: 2, name: "Middle", role: "how", beats: [{ id: "middle.one", height: 1 }] },
    { id: "close", number: 3, name: "Last", role: "close", beats: [{ id: "close.one", height: 1 }] },
  ],
} as const satisfies StoryDef;

export type BeatId = BeatIdOf<typeof story>;
