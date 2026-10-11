import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";
// Stop 4: the three approved spine beats. The remaining four join after look review.
export const story = {
  pieces: 6,
  chapters: [
    { id: "scope", number: 1, name: "Scope", role: "opening", beats: [{ id: "scope.opening", height: 1 }] },
    { id: "transition", number: 4, name: "Transition", role: "how", beats: [{ id: "transition.diagram", height: 1.5 }] },
    { id: "review", number: 6, name: "Review", role: "close", beats: [{ id: "review.close", height: 1 }] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
