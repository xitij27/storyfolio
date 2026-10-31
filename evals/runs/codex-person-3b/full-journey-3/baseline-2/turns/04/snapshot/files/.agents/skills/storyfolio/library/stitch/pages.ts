// The words a book page carries for one chapter. Pure.
import { yearText, type ChapterKey } from "./chapters.ts";
import { slots, type Person, type Project } from "./person.ts";

/** The words of one chapter as lines for a page: the person's chosen words when they chose some, else written from their data. */
export function pageLines(P: Person, k: ChapterKey, chosen?: string): string[] {
  const own = chosen?.trim();
  if (own) return [own];
  const more = (n: number) => (n ? [`And ${n} more.`] : []);
  switch (k) {
    case "hello": return [P.name, P.role, P.line, P.seeking + "."];
    case "from": return P.places.slice(0, 6).map((p) => `${p.name}, where ${P.first} ${p.what}.`).concat(more(Math.max(0, P.places.length - 6)));
    case "studied": return P.study.slice(0, 2).flatMap((s) => [`${s.degree} in ${s.field}.`, `${s.place}, ${s.from} to ${s.to}.`, ...(s.note ? [s.note + "."] : [])]).concat(more(Math.max(0, P.study.length - 2)));
    case "worked": return P.work.slice(0, 5).map((w) => `${w.org}, ${w.place}, ${yearText(w)}. ${w.role}: ${w.did.charAt(0).toLowerCase()}${w.did.slice(1)}.`).concat(more(Math.max(0, P.work.length - 5)));
    case "good": return P.skills.slice(0, 6).map((g) => `${g.group}: ${g.items.join(", ")}.`).concat(more(Math.max(0, P.skills.length - 6)));
    case "made": {
      const s = slots(P.projects, 6);
      return [`${P.projects.length} ${P.projects.length === 1 ? "project" : "projects"}. Open any card on the right to read about it.`,
        ...s.shown.filter((p): p is Project => !!p).map((p) => p.title), ...more(s.more)];
    }
    case "say": {
      const s = slots(P.quotes, 3);
      return [...s.shown.filter((q) => !!q).map((q) => `${q!.who}, ${q!.from}.`), ...more(s.more)];
    }
    case "contact": return [P.contact.email, P.seeking + ".", P.contact.links.join(", ") + "."];
  }
}
