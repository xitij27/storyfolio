import type { SiteChoices } from "@/stitch/site";

// Accepted: whole sheet, Night/Swing, opening A and closing A verbatim.
export const site: SiteChoices = {
  look: "night",
  move: "swing",
  words: {
    hello: "I plan migrations of running software systems, with checks before the switch and a route back if something fails. At Kestrel Freight, I wrote the plan and sequenced the move of 310 services out of two data centres. All drawings are illustrations.",
    studied: "Electrical Engineering, Entoto Technical University, 2009–2013. My final-year logger sampled the campus substation’s feeder load every second to an SD card. Illustration; no original project or degree document is reproduced.",
    worked: "Library systems in Addis Ababa, 2013–2016. Lumen Pay: Site Reliability Engineer, March 2016–July 2020; card payment systems. Kestrel Freight, Rotterdam, since August 2020: migration planning and the runbook. Illustration.",
    good: "The runbook, cutover checklist and rollback plan. I learned from the Google SRE book, Release It! by Michael Nygard, and the table I dropped in 2014. Illustration.",
    made: "Six pieces of work. Select one to read my contribution and the result. All drawings are illustrations, not internal diagrams or measured traces.",
    contact: "Planning a migration, or putting together a conference programme? Write to me at dawit@example.com. My CV is available to read, print or download as HTML.",
  },
  cv: "/cv",
  lang: "en",
};
