import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";

// Approved storyboard: the spine used to compare appearances before expanding all chapters.
export const story = {
  pieces: 1,
  chapters: [
    { id: "opening", number: 1, name: "Introduction", role: "opening", beats: [{ id: "opening.hello", height: 1 }, { id: "opening.library", height: 1.25 }] },
    { id: "database", number: 6, name: "Orders database", role: "what", beats: [{ id: "database.cutover", height: 3 }] },
    { id: "contact", number: 7, name: "Contact", role: "close", beats: [{ id: "contact.complete", height: 1 }] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
