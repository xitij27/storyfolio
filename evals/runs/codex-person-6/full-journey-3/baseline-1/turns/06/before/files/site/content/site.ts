import type { SiteChoices } from "@/stitch/site";
// Blueprint + Slide accepted by user. Opening and closing words await wording choice.
export const site: SiteChoices = {
  look: "blueprint", move: "slide", lang: "en", cv: "/cv",
  words: {
    hello: "Dawit Bekele. Platform engineer. Migration plans, cutover checklists and a way back. For engineering leaders planning a migration, and conference organisers. Original scene graphics are illustrations.",
    from: "Addis Ababa: studied 2009–2013, then ran the university library’s systems until 2016. I moved to Amsterdam in 2016 for Lumen Pay, and Rotterdam in 2020 for Kestrel Freight. Illustration.",
    worked: "Library systems, 2013–2016. Lumen Pay, March 2016–July 2020: card payment systems. Kestrel Freight, since August 2020: migration planning and runbook ownership. Illustration.",
    studied: "BSc Electrical Engineering, Entoto Technical University, Addis Ababa, 2009–2013. A feeder-load logger sampled every second to an SD card. It taught me that data you cannot lose needs a second copy. Illustration.",
    good: "My working documents: the runbook, the cutover checklist and the rollback plan. A postmortem when something has gone wrong. Cutover is the switch between systems; rollback is the prepared way back. Illustration.",
    made: "Six pieces of work. Open one for the approach, result and credit. Graphics are illustrations.",
    contact: "Planning a migration? Write to dawit@example.com. Conference enquiries welcome. I am going independent in 2027.",
  },
};
