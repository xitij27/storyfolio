import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";
export const story = {
  pieces: 6,
  chapters: [
    { id: "chapter-question", number: 1, name: "Code → check", role: "opening", beats: [{ id: "question", height: 1.4 }] },
    { id: "chapter-scheduling", number: 2, name: "Schedule", role: "how", beats: [{ id: "scheduling", height: 1.4 }] },
    { id: "chapter-bench", number: 3, name: "Bring-up", role: "how", beats: [{ id: "bench", height: 1.4 }] },
    { id: "chapter-evidence", number: 4, name: "Evidence", role: "how", beats: [{ id: "evidence", height: 1.5 }] },
    { id: "chapter-scope", number: 5, name: "What this supports", role: "close", beats: [{ id: "scope", height: 1.4 }] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
