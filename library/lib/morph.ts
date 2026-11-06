/*
  The arithmetic of one line becoming another. A path is a list of points;
  everything here goes by distance along it, so two paths of any shape and
  point count can be matched point for point. Pure, so it is tested without
  a browser, and ready to move into the engine.
*/

export type P = [number, number, number];

export const smoothstep = (x: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const lerp3 = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

/** Distance from the start to each point. */
function cumulative(path: readonly P[]): number[] {
  const out = [0];
  for (let i = 1; i < path.length; i++) {
    const [a, b] = [path[i - 1], path[i]];
    out.push(out[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]));
  }
  return out;
}

/** The point a fraction `s` (0 to 1) of the way along the path, by distance. */
export function pointAt(path: readonly P[], s: number): P {
  if (path.length === 1) return path[0];
  const d = cumulative(path);
  const want = Math.min(1, Math.max(0, s)) * d[d.length - 1];
  let i = 1;
  while (i < d.length - 1 && d[i] < want) i++;
  const span = d[i] - d[i - 1];
  return lerp3(path[i - 1], path[i], span > 0 ? (want - d[i - 1]) / span : 0);
}

/** The path as `n` points evenly spaced along it, first and last kept. */
export function resample(path: readonly P[], n: number): P[] {
  return Array.from({ length: n }, (_, i) => pointAt(path, n === 1 ? 0 : i / (n - 1)));
}

/** The part of the path between fractions `from` and `to`, for a line drawn on or taken back. */
export function subPath(path: readonly P[], from: number, to: number): P[] {
  const d = cumulative(path);
  const total = d[d.length - 1];
  const [a, b] = [Math.max(0, from) * total, Math.min(1, to) * total];
  if (b <= a) return [pointAt(path, from), pointAt(path, from)];
  const inside = path.filter((_, i) => d[i] > a && d[i] < b);
  return [pointAt(path, from), ...inside, pointAt(path, to)];
}

/** Two paths of the same point count, blended point for point. */
export function blend(a: readonly P[], b: readonly P[], t: number): P[] {
  return a.map((p, i) => lerp3(p, b[i], t));
}
