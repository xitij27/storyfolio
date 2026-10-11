import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";

export const story = {
  pieces: 7,
  chapters: [
    { id: "opening", number: 1, name: "Gather", role: "opening", beats: [{ id: "opening.gather", height: 2 }, { id: "opening.repeat", height: 1 }] },
    { id: "middle", number: 2, name: "Open", role: "how", beats: [{ id: "middle.fan", height: 1 }] },
    { id: "close", number: 3, name: "Whole", role: "close", beats: [{ id: "close.whole", height: 1 }] },
  ],
} as const satisfies StoryDef;

export type BeatId = BeatIdOf<typeof story>;
