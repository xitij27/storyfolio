import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";
export const story = {
  pieces: 6,
  chapters: [
    { id: "chapter-question", number: 1, name: "The question", role: "opening", beats: [{ id: "question", height: 1.7 }] },
    { id: "chapter-scheduling", number: 2, name: "The cycle", role: "how", beats: [{ id: "scheduling", height: 1.7 }] },
    { id: "chapter-bench", number: 3, name: "The connection", role: "how", beats: [{ id: "bench", height: 1.7 }] },
    { id: "chapter-evidence", number: 4, name: "Two kinds of evidence", role: "outcomes", beats: [{ id: "evidence", height: 1.9 }] },
    { id: "chapter-scope", number: 5, name: "The answer, bounded", role: "close", beats: [{ id: "scope", height: 1.7 }] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
