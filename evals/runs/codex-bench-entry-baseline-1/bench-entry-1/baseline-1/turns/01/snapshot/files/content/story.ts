import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";
export const story = {
  pieces: 5,
  chapters: [
    { id: "chapter-question", number: 1, name: "Code → physical check", role: "opening", beats: [{ id: "question.inspect", height: 1.5 }] },
    { id: "chapter-scheduling", number: 2, name: "Organize the cycle", role: "how", beats: [{ id: "scheduling.loop", height: 1.5 }] },
    { id: "chapter-bench", number: 3, name: "Make it observable", role: "how", beats: [{ id: "bench.connect", height: 1.5 }] },
    { id: "chapter-evidence", number: 4, name: "Read the evidence", role: "outcomes", beats: [{ id: "evidence.paths", height: 1.5 }] },
    { id: "chapter-scope", number: 5, name: "The answer & its limits", role: "close", beats: [{ id: "scope.answer", height: 1.5 }] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
