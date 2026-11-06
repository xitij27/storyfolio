/*
  A pose is where one piece is. A formation is a pose for every piece plus how
  the whole stack is turned and placed. The scene at rest on a beat is one
  formation; moving between beats is a blend of two.
*/

export type Vec3 = [number, number, number];

export type Pose = {
  position: Vec3;
  /** Euler angles in radians, applied in X, Y, Z order. */
  rotation: Vec3;
  /** Width and height. */
  size: [number, number];
};

export type Formation = {
  pieces: Pose[];
  /** How the whole stack is turned, about X then Y, in radians. */
  turn: [number, number];
  /**
   * Where the stack sits on a wide screen, as a share of half the screen:
   * 0.5 across is halfway from the middle to the right edge. Narrow screens
   * centre it.
   */
  anchor: [number, number];
  /** How much the pieces drift while idle, 0 to 1. */
  drift: number;
  /** How wide the formation is, so the camera can stand back far enough. */
  span: number;
  /** How tall it is, for the same reason. */
  rise: number;
  /** The closest the camera comes to the formation. */
  near: number;
  /**
   * How the view changes while the beat is scrolled through: the turn about
   * X, the turn about Y, and the distance, each centred on the formation's
   * own.
   */
  sway: Vec3;
  /** The height of the floor under the formation. */
  floor: number;
  /**
   * 1 when the formation stands over the caption's column on a wide screen,
   * and not beside the caption, so that it has to be fitted above the text
   * on a screen shorter than the one it was framed on. See camera.ts.
   */
  over: number;
};

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** 0 below `a`, 1 above `b`, and a smooth S-curve in between. */
export function smoothstep(x: number, a: number, b: number): number {
  if (a === b) return x < a ? 0 : 1;
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));

/** The share of a move over which the pieces set off, one after another. */
export const SPREAD = 0.45;

/**
 * One piece's own progress through a move that is `t` of the way along. The
 * first piece sets off at once and the last when `spread` of the move has
 * gone; each then takes the time that is left. With no spread they move as
 * one.
 */
export function stagger(t: number, i: number, count: number, spread: number): number {
  if (!(spread > 0) || count <= 1) return clamp01(t);
  const share = Math.min(spread, 0.95);
  const start = (share * i) / (count - 1);
  return clamp01((t - start) / (1 - share));
}

/** A formation with every piece at the origin, to be written into. */
export function blankFormation(count: number): Formation {
  return {
    pieces: Array.from(
      { length: count },
      (): Pose => ({ position: [0, 0, 0], rotation: [0, 0, 0], size: [1, 1] }),
    ),
    turn: [0, 0],
    anchor: [0, 0],
    drift: 0,
    span: 0,
    rise: 0,
    near: 0,
    sway: [0, 0, 0],
    floor: 0,
    over: 0,
  };
}

/**
 * Writes the blend of `a` and `b` into `out` and returns it. It allocates
 * nothing, so it can run every frame. `a` and `b` must have at least as many
 * pieces as `out`.
 *
 * `each`, when given, is every piece's own progress, so the pieces can move
 * one after another. What belongs to the whole stack always moves by `t`.
 */
export function mixFormation(
  out: Formation,
  a: Formation,
  b: Formation,
  t: number,
  each?: ArrayLike<number>,
): Formation {
  for (let i = 0; i < out.pieces.length; i++) {
    const piece = out.pieces[i];
    const from = a.pieces[i];
    const to = b.pieces[i];
    const own = each ? each[i] : t;
    for (let k = 0; k < 3; k++) {
      piece.position[k] = lerp(from.position[k], to.position[k], own);
      piece.rotation[k] = lerp(from.rotation[k], to.rotation[k], own);
    }
    piece.size[0] = lerp(from.size[0], to.size[0], own);
    piece.size[1] = lerp(from.size[1], to.size[1], own);
  }
  out.turn[0] = lerp(a.turn[0], b.turn[0], t);
  out.turn[1] = lerp(a.turn[1], b.turn[1], t);
  out.anchor[0] = lerp(a.anchor[0], b.anchor[0], t);
  out.anchor[1] = lerp(a.anchor[1], b.anchor[1], t);
  out.drift = lerp(a.drift, b.drift, t);
  out.span = lerp(a.span, b.span, t);
  out.rise = lerp(a.rise, b.rise, t);
  out.near = lerp(a.near, b.near, t);
  for (let k = 0; k < 3; k++) out.sway[k] = lerp(a.sway[k], b.sway[k], t);
  out.floor = lerp(a.floor, b.floor, t);
  out.over = lerp(a.over, b.over, t);
  return out;
}

/**
 * How far the view has swung from where the formations put it: about X,
 * about Y, and in distance. `dwell` is how far through its rest `a` is; `b`
 * has not begun its own.
 */
export function swing(
  out: Vec3,
  a: Formation,
  b: Formation,
  t: number,
  dwell: number,
): Vec3 {
  for (let k = 0; k < 3; k++) {
    out[k] = lerp(a.sway[k] * (dwell - 0.5), b.sway[k] * -0.5, t);
  }
  return out;
}

/** A beat may keep moving while it rests, driven only by its scroll dwell. */
export type BeatFormation = { rest: Formation; within?: Formation };

/** Writes a beat's current resting pose without changing its source data. */
export function atRest(out: Formation, beat: BeatFormation, dwell: number): Formation {
  const progress = Number.isFinite(dwell) ? Math.min(1, Math.max(0, dwell)) : 0;
  return mixFormation(out, beat.rest, beat.within ?? beat.rest, progress);
}
