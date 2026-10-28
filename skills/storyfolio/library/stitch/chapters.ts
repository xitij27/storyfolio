// The eight chapters of every site, in their fixed order, and the short
// words under each one, written from the person's data.
import type { Person, Work, Study } from "./person.ts";

export type ChapterKey = "hello" | "from" | "studied" | "worked" | "good" | "made" | "say" | "contact";

export const CHAPTERS: readonly { key: ChapterKey; title: string }[] = [
  { key: "hello", title: "Hello" },
  { key: "from", title: "Where from" },
  { key: "studied", title: "What I studied" },
  { key: "worked", title: "Where I've worked" },
  { key: "good", title: "What I'm good at" },
  { key: "made", title: "What I've made" },
  { key: "say", title: "What others say" },
  { key: "contact", title: "Get in touch" },
];

export const titleOf = (key: ChapterKey): string => CHAPTERS.find((c) => c.key === key)!.title;

/** "2020" when a job starts and ends in one year, "2021 to 2023", "2023 to now". */
export function yearText(w: Pick<Work, "from" | "to">): string {
  const a = Math.floor(w.from);
  const b = w.to == null ? "now" : Math.floor(w.to);
  return a === b ? String(a) : `${a} to ${b}`;
}

const studyText = (s: Study) => `${s.degree} in ${s.field}, ${s.place}, ${s.from} to ${s.to}`;

/** The words under each chapter asked for. Chapters not asked for are left out. */
export function captions(p: Person, keys: readonly ChapterKey[]): Partial<Record<ChapterKey, string>> {
  const write: Record<ChapterKey, () => string> = {
    hello: () => `${p.role}. ${p.line}`,
    from: () => p.places.map((x) => `${x.name} (${x.what})`).join(", then "),
    studied: () => p.study.map(studyText).join(". ") + ".",
    worked: () => p.work.map((w) => `${w.org}, ${yearText(w)}`).join(". ") + ".",
    good: () => p.skills.map((g) => g.group).join(", ") + ".",
    made: () => `${p.projects.length} ${p.projects.length === 1 ? "project" : "projects"}. Click one to open it.`,
    say: () => `From ${p.quotes.map((q) => q.who).join(", ")}.`,
    contact: () => `${p.contact.email}. ${p.seeking}.`,
  };
  const out: Partial<Record<ChapterKey, string>> = {};
  for (const k of keys) out[k] = write[k]();
  return out;
}
