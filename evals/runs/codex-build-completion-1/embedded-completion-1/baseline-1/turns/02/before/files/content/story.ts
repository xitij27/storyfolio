import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";
export const story = {
  pieces: 6,
  chapters: [
    { id: "scope", number: 1, name: "Scope", role: "opening", beats: [{ id: "scope.opening", height: 1 }] },
    { id: "responsibilities", number: 2, name: "Responsibilities", role: "who", beats: [{ id: "responsibilities.split", height: 1 }] },
    { id: "state", number: 3, name: "State", role: "what", beats: [{ id: "state.table", height: 1 }] },
    { id: "transition", number: 4, name: "Transition", role: "how", beats: [{ id: "transition.diagram", height: 1.5 }] },
    { id: "observation", number: 5, name: "Observation", role: "outcomes", beats: [{ id: "observation.fixture", height: 1 }, { id: "observation.evidence", height: 1.5 }] },
    { id: "review", number: 6, name: "Review", role: "close", beats: [{ id: "review.close", height: 1 }] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
