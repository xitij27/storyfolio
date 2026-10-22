import type { Metadata } from "next";
// Working spine copy; final opening/closing versions are a later user choice.
export const copy = {
  lang: "en", railLabel: "Story chapters", lookLabel: "Choose the material look", fpsLabel: "Frames per second",
  metadata: {
    title: "Dawit Bekele — Migration work",
    description: "Migration work, runbooks and rollback plans. Dawit Bekele is planning to go independent in 2027.",
    robots: { index: false, follow: false },
  } satisfies Metadata,
  beats: {
    "hello.intro": { title: "Dawit Bekele.", body: "I work on migrations: moving and changing systems. I work from a runbook, a cutover checklist and a rollback plan.", note: "Planning to go independent in 2027." },
    "hello.origin": { title: "A table, dropped.", body: "My first production outage was in 2014, at the university library. I dropped a table. It is why I care about rollbacks.", note: "A rollback is a way to return to an earlier state." },
    "projects.migration": { title: "A migration, measured.", body: "99.98% measured availability of the order API over the 26-month migration.", note: "Illustration of moving between systems; not Kestrel Freight’s architecture or migration method." },
    "contact.close": { title: "The next conversation.", body: "I’m planning to go independent in 2027. If your company has a migration it is afraid of, write to me. Conference organisers are welcome too.", note: "Addis Ababa → Amsterdam, 2016 → Rotterdam, 2020." },
  },
};
