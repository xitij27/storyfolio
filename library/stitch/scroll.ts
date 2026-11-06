// The scroll. Chapter k owns [k, k + 1) of it: it holds for the first HOLD
// of that, then moves to chapter k + 1. The last chapter only holds.

/** The share of a chapter's scrolling that holds still before the move. */
export const HOLD = 0.4;
/** However fast the reader scrolls, the story moves at most this many chapters a second. */
export const MAX_RATE = 0.55;
/** A chapter takes this many screens of scrolling, and never less than MIN_UNIT_PX. */
export const UNIT_SCREENS = 1.9;
export const MIN_UNIT_PX = 1000;

export const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const smooth = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Where the story stands, in chapter indices: from, to, the eased move t, its raw share, and how far into the hold. */
export type ScrollState = { s: number; from: number; to: number; t: number; raw: number; local: number };

export function stateAt(s: number, n: number): ScrollState {
  s = clamp(s, 0, n - 1 + HOLD);
  const k = Math.min(Math.floor(s), n - 1);
  const f = s - k;
  if (k === n - 1 || f < HOLD) return { s, from: k, to: k, t: 0, raw: 0, local: clamp(f / HOLD) };
  const raw = (f - HOLD) / (1 - HOLD);
  return { s, from: k, to: k + 1, t: ease(raw), raw, local: 1 };
}

/** One frame of the shown story easing behind the scroll, no faster than MAX_RATE; exact under reduced motion. */
export function follow(shown: number, target: number, dt: number, reduce: boolean): number {
  if (reduce) return target;
  const want = (target - shown) * Math.min(1, dt * 4);
  const next = shown + Math.sign(want) * Math.min(Math.abs(want), MAX_RATE * dt);
  return Math.abs(target - next) < 1e-4 ? target : next;
}

/** Chapters of scrolling for n chapters: every move, then the last hold. */
export const totalUnits = (n: number) => n - 1 + HOLD;

/** Pixels of scrolling per chapter for a window this high. */
export const unitPx = (innerHeight: number) => Math.max(innerHeight * UNIT_SCREENS, MIN_UNIT_PX);
