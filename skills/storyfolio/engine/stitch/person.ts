// The person a stitched site is about: the shape every world reads, and the
// small rules for amounts a world has a fixed number of places for.
import { CHAPTERS, type ChapterKey } from "./chapters.ts";

export type Place = { name: string; lat: number; lng: number; what: string };
export type Study = { degree: string; field: string; place: string; from: number; to: number; note?: string };
export type Work = { org: string; role: string; place: string; from: number; to: number | null; did: string; uses: string[] };
export type SkillGroup = { group: string; items: string[] };
export const PROJECT_KINDS = ["chart", "photo", "maze", "route", "bars", "list"] as const;
export type ProjectKind = (typeof PROJECT_KINDS)[number];
export type Project = { title: string; line: string; tags: string[]; place: string; year: number; kind: ProjectKind };
export type Quote = { text: string; who: string; from: string; place: string };
export type Contact = { email: string; links: string[] };
export type Person = {
  name: string;
  first: string;
  role: string;
  line: string;
  seeking: string;
  places: Place[];
  study: Study[];
  work: Work[];
  skills: SkillGroup[];
  projects: Project[];
  quotes: Quote[];
  contact: Contact;
};

/** The moment the timelines run up to, as a fractional year. */
export const NOW = 2026.8;

/** What makes a person unusable by the worlds. Empty when they can be drawn. */
export function checkPerson(p: Person): string[] {
  const errs: string[] = [];
  if (!p.name?.trim()) errs.push("The person has no name.");
  if (!p.first?.trim()) errs.push("The person has no first name.");
  if (!p.contact?.email?.trim()) errs.push("The person has no email.");
  for (const x of p.places ?? []) {
    if (!Number.isFinite(x.lat) || !Number.isFinite(x.lng)) errs.push(`The place ${x.name} has no finite lat and lng.`);
  }
  for (const x of [...(p.work ?? []), ...(p.study ?? [])]) {
    if (x.to != null && x.from > x.to) errs.push(`${"org" in x ? x.org : x.field} starts after it ends.`);
  }
  for (const x of p.projects ?? []) {
    if (!(PROJECT_KINDS as readonly string[]).includes(x.kind)) errs.push(`The project ${x.title} has the unknown kind ${x.kind}.`);
  }
  return errs;
}

const has: Record<ChapterKey, (p: Person) => boolean> = {
  hello: () => true,
  from: (p) => p.places.length > 0,
  studied: (p) => p.study.length > 0,
  worked: (p) => p.work.length > 0,
  good: (p) => p.skills.length > 0,
  made: (p) => p.projects.length > 0,
  say: (p) => p.quotes.length > 0,
  contact: () => true,
};

/** The chapters this person's site has: hello and contact always, the others when there is something to show. */
export function chaptersFor(p: Person): ChapterKey[] {
  return CHAPTERS.map((c) => c.key).filter((k) => has[k](p));
}

/** Whole years a timeline spans, from the first study or job to the year after now, at least two apart. */
export function yearRange(p: Person): [number, number] {
  const end = Math.ceil(NOW);
  const starts = [...p.study.map((s) => s.from), ...p.work.map((w) => w.from)];
  const start = starts.length ? Math.floor(Math.min(...starts)) : end - 2;
  return [Math.min(start, end - 2), end];
}

/** A fixed number of places for items: blanks as null, and how many did not fit. */
export function slots<T>(items: readonly T[], n: number): { shown: (T | null)[]; more: number } {
  const shown: (T | null)[] = items.slice(0, n);
  while (shown.length < n) shown.push(null);
  return { shown, more: Math.max(0, items.length - n) };
}

const unit = (lat: number, lng: number): [number, number, number] => {
  const la = (lat * Math.PI) / 180, lo = (lng * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
};
const angle = (a: Place, b: Place) => {
  const u = unit(a.lat, a.lng), v = unit(b.lat, b.lng);
  const d = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  return Math.acos(Math.min(1, Math.max(-1, d)));
};

/** Where a globe looks, and how near, at each place: nearer when the neighbouring places are close. */
export function placeViews(p: Person): { lat: number; lng: number; zoom: number }[] {
  const ps = p.places;
  if (ps.length === 1) return [{ lat: ps[0].lat, lng: ps[0].lng, zoom: 1 }];
  return ps.map((x, i) => {
    const near = (j: number) => (j >= 0 && j < ps.length ? angle(ps[j], x) : 0);
    const far = Math.max(near(i - 1), near(i + 1));
    return { lat: x.lat, lng: x.lng, zoom: Math.min(1.7, Math.max(1, 0.4 / Math.max(far, 0.01))) };
  });
}
