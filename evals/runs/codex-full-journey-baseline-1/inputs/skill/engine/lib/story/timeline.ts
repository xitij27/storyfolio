/*
  The story's scroll timeline, as pure functions.

  The page is a column of blocks, one per beat. The scene rests on a beat
  while that beat's block still reaches the bottom of the screen, then
  travels to the next beat as the next block comes in. Everything here takes
  measured pixels and gives plain numbers, so it is tested without a browser.
*/

/** One beat's block: pixels from the top of the story, and its height. */
export type BeatBox = { top: number; height: number };

export type Playhead = {
  /** The beat the scene is on. 2 is beat 2 at rest; 2.5 is halfway to beat 3. */
  beat: number;
  /** How far through its rest the beat is, 0 to 1. Always 0 while travelling. */
  dwell: number;
};

/** The share of one screen of scrolling spent travelling between two beats. */
export const TRAVEL = 0.4;

const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));

/**
 * Where the scene should be for a scroll position. `scrolled` is how far the
 * top of the story has moved above the top of the screen, in pixels.
 */
export function playhead(
  scrolled: number,
  viewport: number,
  boxes: readonly BeatBox[],
  travel: number = TRAVEL,
): Playhead {
  if (boxes.length === 0 || !(viewport > 0) || !Number.isFinite(scrolled)) {
    return { beat: 0, dwell: 0 };
  }
  const span = Math.max(1, travel * viewport);
  let arrived = 0;
  for (let i = 0; i < boxes.length; i++) {
    // The rest ends when the block's bottom edge meets the bottom of the
    // screen, which is the moment the next block starts to show. A block
    // too short for the scene to have arrived yet rests for no time at all.
    const leaves = Math.max(arrived, boxes[i].top + boxes[i].height - viewport);
    if (i === boxes.length - 1 || scrolled <= leaves) {
      const rest = leaves - arrived;
      const dwell =
        rest > 0 ? clamp01((scrolled - arrived) / rest) : scrolled >= leaves ? 1 : 0;
      return { beat: i, dwell };
    }
    if (scrolled < leaves + span) {
      return { beat: i + (scrolled - leaves) / span, dwell: 0 };
    }
    arrived = leaves + span;
  }
  return { beat: boxes.length - 1, dwell: 1 };
}

/**
 * The playhead as one number that only grows as the page is scrolled down:
 * 2i to 2i+1 while the scene rests on beat i, 2i+1 to 2i+2 while it travels
 * on to the next. Easing this one number eases the rest and the travel alike.
 */
export function phase(head: Playhead): number {
  if (!Number.isFinite(head.beat)) return 0;
  const whole = Math.floor(head.beat);
  const along = head.beat - whole;
  return along > 0 ? 2 * whole + 1 + along : 2 * whole + clamp01(head.dwell);
}

export type Place = {
  from: number;
  to: number;
  /** Progress from `from` to `to`. 0 at rest, when `to` is `from`. */
  t: number;
  /** How far through its rest `from` is. 1 once the scene has left it. */
  dwell: number;
};

/** A phase read back as the two beats it lies between. */
export function place(u: number, count: number): Place {
  if (count <= 0 || !Number.isFinite(u)) return { from: 0, to: 0, t: 0, dwell: 0 };
  const last = count - 1;
  const clamped = Math.min(Math.max(u, 0), 2 * last + 1);
  const i = Math.min(Math.floor(clamped / 2), last);
  const r = clamped - 2 * i;
  if (r <= 1 || i === last) return { from: i, to: i, t: 0, dwell: Math.min(1, r) };
  return { from: i, to: i + 1, t: r - 1, dwell: 1 };
}

/** With reduced motion the scene never travels: it cuts to the nearer beat. */
export function settle(u: number): number {
  const i = Math.floor(u / 2);
  const r = u - 2 * i;
  if (r <= 1) return u;
  return r < 1.5 ? 2 * i + 1 : 2 * i + 2;
}

/** How much of beat `index` is showing: 1 at rest on it, 0 a beat or more away. */
export function weight(beat: number, index: number): number {
  return Math.max(0, 1 - Math.abs(beat - index));
}

/**
 * One beat's own progress: 0 before the scene reaches it, its dwell while the
 * scene rests on it, 1 once the scene has moved on.
 */
export function dwellAt(at: Pick<Place, "from" | "dwell">, index: number): number {
  if (index < at.from) return 1;
  if (index > at.from) return 0;
  return at.dwell;
}

/**
 * How gathered the pieces are in beat `index`'s formation, going by the piece
 * furthest from it: 1 while the scene rests on the beat, less as soon as the
 * first piece has set off for the next, and not 1 again until the last has
 * arrived. `each` is every piece's own progress from `from` to `to`. What
 * stands on the pieces goes by this, so that it does not stand on air.
 */
export function gathered(
  at: Pick<Place, "from" | "to"> & { each: ArrayLike<number> },
  index: number,
): number {
  if (at.from === index && at.to === index) return 1;
  if (at.from !== index && at.to !== index) return 0;
  let least = 1;
  let most = 0;
  for (let i = 0; i < at.each.length; i++) {
    least = Math.min(least, at.each[i]);
    most = Math.max(most, at.each[i]);
  }
  return at.to === index ? least : 1 - most;
}

/**
 * Moves `current` towards `target`, `rate` being how quickly per second, the
 * same at any frame rate. The first frame, when `current` is null, lands on
 * the target: a page opened halfway down starts there instead of flying there.
 * Snap the final small distance so a stationary scroll reaches its exact
 * beat and enables content that appears only once the scene is at rest.
 */
export function approach(
  current: number | null,
  target: number,
  rate: number,
  delta: number,
): number {
  if (current === null || !Number.isFinite(current)) return target;
  if (!(delta > 0)) return current;
  const next = current + (target - current) * (1 - Math.exp(-rate * delta));
  return Math.abs(target - next) <= 1e-4 ? target : next;
}
