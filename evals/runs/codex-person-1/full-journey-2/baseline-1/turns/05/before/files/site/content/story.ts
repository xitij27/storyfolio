import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";
// Approved-storyboard spine. The remaining chapters follow the look choice.
export const story = {
  pieces: 1,
  chapters: [
    { id: "hello", number: 1, name: "Hello", role: "opening", beats: [{ id: "hello.intro", height: 1.15 }, { id: "hello.origin", height: 1 }] },
    { id: "projects", number: 6, name: "Migration", role: "what", beats: [{ id: "projects.migration", height: 1.75 }] },
    { id: "contact", number: 7, name: "Contact", role: "close", beats: [{ id: "contact.close", height: 1.25 }] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
