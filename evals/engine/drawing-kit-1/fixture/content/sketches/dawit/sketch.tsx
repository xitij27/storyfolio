"use client";

import { Story } from "@/components/story/story";
import { Beat, Body, Chapter, Kicker, Note, Title } from "@/components/story/chapter";
import type { StoryBundle } from "@/components/story/types";
import { formations, looks, story } from "./story";

const load = (name: "Where" | "When" | "Runbook" | "Database" | "Oncall") => () => import("./extras").then((module) => ({ default: module[name] }));

const bundle = {
  story, formations, looks, defaultLook: "dark",
  // The board has no picture of its own: the sheets carry the figures.
  faces: story.chapters.map((chapter) => ({ id: chapter.id, beat: `${chapter.id}.one`, piece: 0, draw: () => {} })),
  copy: { railLabel: "Chapters", lookLabel: "Appearance" },
  extras: [
    { chapter: "where", load: load("Where") },
    { chapter: "when", load: load("When") },
    { chapter: "runbook", load: load("Runbook") },
    { chapter: "database", load: load("Database") },
    { chapter: "oncall", load: load("Oncall") },
  ],
} satisfies StoryBundle;

// Captions from Dawit Bekele's confirmed facts (evals/builds/full-journey-3).
const words: Record<string, { title: string; body: string; note: string }> = {
  where: {
    title: "Addis Ababa, Amsterdam, Rotterdam.",
    body: "Studied in Addis Ababa from 2009 and ran the university library's systems there until 2016. Moved to Amsterdam in 2016 for Lumen Pay, and to Rotterdam in 2020 for Kestrel Freight.",
    note: "Map drawn from Natural Earth's coastlines and borders.",
  },
  when: {
    title: "A degree, then three roles.",
    body: "BSc Electrical Engineering at Entoto Technical University, 2009 to 2013. Systems administrator of its library, 2013 to 2016. Site reliability engineer at Lumen Pay, March 2016 to July 2020. Staff platform engineer at Kestrel Freight since August 2020.",
    note: "The current role is in the accent.",
  },
  runbook: {
    title: "Six stages. A check at every gate.",
    body: "Dawit wrote the first version of Kestrel Freight's migration runbook and still owns it; 40 teams use it. A service cannot enter a stage until the last one's check has passed.",
    note: "Scroll to move a service through the stages.",
  },
  database: {
    title: "Two databases, one handover.",
    body: "The 4 TB orders database moved from Postgres 11 to 15: logical replication, dual writes through ferry, hourly checksums for three weeks, then reads, then writes. The old cluster stayed warm as the way back for a month. No maintenance window; Dawit led it with one database engineer.",
    note: "Scroll to step through the cutover.",
  },
  oncall: {
    title: "85 to 22 pages a week.",
    body: "The nine on the platform rota went through every alert, deleted the ones nobody acted on, and moved the services that mattered to SLO burn-rate alerts. About a year later the rota was paged 22 times a week.",
    note: "One dot is one page in a week.",
  },
};

export function DawitFigures() {
  return <main><Story bundle={bundle}>
    {story.chapters.map((chapter, index) => <Chapter key={chapter.id} id={chapter.id}>
      <Beat story={story} id={`${chapter.id}.one`}>
        <Kicker number={chapter.number}>{chapter.name}</Kicker>
        <Title id={`${chapter.id}-title`} as={index === 0 ? "h1" : "h2"}>{words[chapter.id].title}</Title>
        <Body>{words[chapter.id].body}</Body>
        <Note>{words[chapter.id].note}</Note>
      </Beat>
    </Chapter>)}
  </Story></main>;
}
