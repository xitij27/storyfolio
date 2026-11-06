// A mix says which world holds each chapter. Two neighbouring chapters in
// one world join by that world's own move; in two worlds, by a dive.
import { CHAPTERS, type ChapterKey } from "./chapters.ts";

export type WorldId = "sheet" | "map" | "book";
export const WORLDS: readonly WorldId[] = ["sheet", "map", "book"];
export type Mix = Record<ChapterKey, WorldId>;

const whole = (w: WorldId) => Object.fromEntries(CHAPTERS.map((c) => [c.key, w])) as Mix;
export const WHOLE: Record<WorldId, Mix> = { sheet: whole("sheet"), map: whole("map"), book: whole("book") };

/** Eight comma-separated world ids in chapter order, or null. */
export function parseMix(text: string): Mix | null {
  const ids = String(text).split(",").map((x) => x.trim());
  if (ids.length !== CHAPTERS.length) return null;
  if (!ids.every((x) => (WORLDS as readonly string[]).includes(x))) return null;
  return Object.fromEntries(CHAPTERS.map((c, i) => [c.key, ids[i]])) as Mix;
}

export const formatMix = (m: Mix): string => CHAPTERS.map((c) => m[c.key]).join(",");

export type Seam = { from: ChapterKey; to: ChapterKey; kind: "within" | "dive" };

/** The joins between the chapters a site has, in order. */
export function seams(m: Mix, keys: readonly ChapterKey[]): Seam[] {
  const out: Seam[] = [];
  for (let i = 0; i + 1 < keys.length; i++) {
    const from = keys[i], to = keys[i + 1];
    out.push({ from, to, kind: m[from] === m[to] ? "within" : "dive" });
  }
  return out;
}

/** The chapters a world holds, in order. */
export const chaptersOf = (m: Mix, keys: readonly ChapterKey[], w: WorldId): ChapterKey[] => keys.filter((k) => m[k] === w);

/** The worlds a site uses, in the order they first appear. */
export function worldsOf(m: Mix, keys: readonly ChapterKey[]): WorldId[] {
  const out: WorldId[] = [];
  for (const k of keys) if (!out.includes(m[k])) out.push(m[k]);
  return out;
}
