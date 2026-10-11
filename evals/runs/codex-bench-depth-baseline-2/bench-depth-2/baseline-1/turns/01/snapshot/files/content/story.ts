import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";
export const story = {
  pieces: 7,
  chapters: [
    { id: "chapter-question", number: 1, name: "Code → physical check", role: "opening", beats: [{ id: "question", height: 1.6 }] },
    { id: "chapter-scheduling", number: 2, name: "Organize a cycle", role: "how", beats: [{ id: "scheduling", height: 1.6 }] },
    { id: "chapter-bench", number: 3, name: "Open the bench", role: "how", beats: [{ id: "bench", height: 1.6 }] },
    { id: "chapter-evidence", number: 4, name: "Read the evidence", role: "outcomes", beats: [{ id: "evidence", height: 1.8 }] },
    { id: "chapter-scope", number: 5, name: "Bound the answer", role: "close", beats: [{ id: "scope", height: 1.6 }] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
