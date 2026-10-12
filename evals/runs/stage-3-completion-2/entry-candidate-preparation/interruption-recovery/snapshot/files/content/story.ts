import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";

// The runnable spine. Scheduling and evidence follow the visual-look choice.
export const story = {
  pieces: 4,
  chapters: [
    { id: "chapter-question", number: 1, name: "Code meets matter", role: "opening", beats: [{ id: "question.apparatus", height: 1.5 }] },
    { id: "chapter-bench", number: 3, name: "A physical check", role: "how", beats: [{ id: "bench.inspect", height: 1.5 }] },
    { id: "chapter-scope", number: 5, name: "The answer, bounded", role: "close", beats: [{ id: "scope.answer", height: 1.5 }] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
