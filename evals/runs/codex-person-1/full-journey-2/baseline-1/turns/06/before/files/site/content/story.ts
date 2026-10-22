import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";
export const story = {
  pieces: 1,
  chapters: [
    { id: "hello", number: 1, name: "Hello", role: "opening", beats: [{ id: "hello.intro", height: 1.15 }, { id: "hello.origin", height: 1 }] },
    { id: "places", number: 2, name: "Places", role: "where", beats: [{ id: "places.route", height: 1.25 }] },
    { id: "study", number: 3, name: "Study", role: "who", beats: [{ id: "study.degree", height: 1 }] },
    { id: "career", number: 4, name: "Career", role: "who", beats: [{ id: "career.library-lumen", height: 1 }, { id: "career.kestrel", height: 1 }] },
    { id: "practice", number: 5, name: "Practice", role: "how", beats: [{ id: "practice.documents", height: 1 }, { id: "practice.oncall", height: 1 }, { id: "practice.reading", height: 1 }] },
    { id: "projects", number: 6, name: "Work", role: "what", beats: [{ id: "projects.migration", height: 1.75 }, { id: "projects.database", height: 1 }, { id: "projects.runbook", height: 1 }, { id: "projects.ferry", height: 1 }, { id: "projects.talk", height: 1 }] },
    { id: "contact", number: 7, name: "Contact", role: "close", beats: [{ id: "contact.close", height: 1.25 }] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
export const beatIds = story.chapters.flatMap(chapter => chapter.beats.map(beat => beat.id));
export const indexOf = (id: BeatId) => beatIds.indexOf(id);
