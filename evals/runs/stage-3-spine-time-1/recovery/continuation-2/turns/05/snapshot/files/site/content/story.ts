import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";

// Approved full story: ten beats, eleven and a half viewport-height units.
export const story = {
  pieces: 7,
  chapters: [
    { id: "prepare", number: 1, name: "Prepare", role: "opening", beats: [
      { id: "prepare.assemble", height: 1.25 },
      { id: "prepare.responsibility", height: 1 },
    ] },
    { id: "command", number: 2, name: "Command", role: "how", beats: [
      { id: "command.states", height: 1.25 },
      { id: "command.documents", height: 1 },
    ] },
    { id: "access", number: 3, name: "Access", role: "what", beats: [
      { id: "access.relationship", height: 1.25 },
      { id: "access.mosslink", height: 1 },
    ] },
    { id: "observe", number: 4, name: "Observe", role: "how", beats: [
      { id: "observe.open", height: 1.25 },
    ] },
    { id: "record", number: 5, name: "Record", role: "close", beats: [
      { id: "record.battery", height: 1.25 },
      { id: "record.scope", height: 1 },
      { id: "record.close", height: 1.25 },
    ] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
