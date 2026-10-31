import type { ChapterKey } from "@/stitch/chapters";
export const wording: Record<string, Partial<Record<ChapterKey, string>>> = {
  "1": {
    hello: "I plan migrations with checks at every stage and a rehearsed way back.",
    contact: "Planning a migration? Write to me. Going independent in 2027; conference organisers are welcome too.",
  },
  "2": {
    hello: "I move live services and databases using runbooks, cutover checks and rollback plans.",
    contact: "Write to me about your migration, or invite me to speak. I’m going independent in 2027.",
  },
  "3": {
    hello: "A migration starts with the plan, the checklist and the way back. Those are the documents I work from.",
    contact: "Migration ahead? Let’s talk about the plan and the way back. Available for independent work from 2027, and for conference talks.",
  },
};
