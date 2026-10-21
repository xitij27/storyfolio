import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";

// Stage 4 spine: only the approved opening, Access middle and Record ending.
// Command and Observe chapters follow after the person's look choice.
export const story = {
  pieces: 7,
  chapters: [
    { id: "prepare", number: 1, name: "Prepare", role: "opening", beats: [
      { id: "prepare.assemble", height: 1.25 },
      { id: "prepare.responsibility", height: 1 },
    ] },
    { id: "access", number: 3, name: "Access", role: "what", beats: [
      { id: "access.relationship", height: 1.25 },
      { id: "access.mosslink", height: 1 },
    ] },
    { id: "record", number: 5, name: "Record", role: "close", beats: [
      { id: "record.battery", height: 1.25 },
      { id: "record.scope", height: 1 },
      { id: "record.close", height: 1.25 },
    ] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
