import type { Pose, Vec3 } from "./formation.ts";

/** Column-major formation-to-world matrix, and an origin-facing camera on Z. */
export type ProjectionView = {
  distance: number;
  fov: number;
  aspect: number;
  fromStack: ArrayLike<number>;
};

/** Moves a point by a matrix of 16 numbers, a column at a time. */
function moved(out: Vec3, m: ArrayLike<number>, x: number, y: number, z: number): Vec3 {
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
  return out;
}

const SEEN: Vec3 = [0, 0, 0];

/**
 * Where a place in the stack is on the screen, across and up from its middle
 * as shares of half the screen: left in `SEEN`, so that nothing is made for
 * it each frame.
 */
function see(
  view: ProjectionView,
  x: number,
  y: number,
  z: number,
): void {
  moved(SEEN, view.fromStack, x, y, z);
  const depth = view.distance - SEEN[2];
  if (!(depth > 0) || !(view.aspect > 0) || !(view.fov > 0 && view.fov < 180)) {
    SEEN[0] = NaN;
    SEEN[1] = NaN;
    return;
  }
  const halfHeight = depth * Math.tan((view.fov * Math.PI) / 360);
  SEEN[0] /= halfHeight * view.aspect;
  SEEN[1] /= halfHeight;
}

/**
 * Where a piece is on the screen, for laying something of the piece's own,
 * such as a link, over it: its middle, then how far and which way half its
 * width runs, then half its height. All six numbers are shares of half the
 * screen, across and then up, so 1 is the screen's edge. `pose` is in the
 * stack's own space.
 *
 * A piece that is turned is drawn smaller at its far edge than its near one.
 * This takes the middle of each edge, which is as near as a flat shape with
 * parallel sides can lie to it.
 */
export function pieceOnScreen(
  out: number[],
  pose: Pose,
  view: ProjectionView,
): number[] {
  const [rx, ry, rz] = pose.rotation;
  const a = Math.cos(rx);
  const b = Math.sin(rx);
  const c = Math.cos(ry);
  const d = Math.sin(ry);
  const e = Math.cos(rz);
  const f = Math.sin(rz);
  // Which way the piece's width and its height run once it is turned about
  // Z, Y and X in that order: the first two columns of the matrix piece.ts
  // turns a piece by, each half as long as the piece is wide or tall.
  const acrossX = (c * e * pose.size[0]) / 2;
  const acrossY = ((a * f + b * e * d) * pose.size[0]) / 2;
  const acrossZ = ((b * f - a * e * d) * pose.size[0]) / 2;
  const upX = (-c * f * pose.size[1]) / 2;
  const upY = ((a * e - b * f * d) * pose.size[1]) / 2;
  const upZ = ((b * e + a * f * d) * pose.size[1]) / 2;
  const [x, y, z] = pose.position;

  // From the middle of the left edge to the middle of the right is the
  // width, and from the foot to the head the height.
  see(view, x - acrossX, y - acrossY, z - acrossZ);
  const leftX = SEEN[0];
  const leftY = SEEN[1];
  see(view, x + acrossX, y + acrossY, z + acrossZ);
  out[2] = (SEEN[0] - leftX) / 2;
  out[3] = (SEEN[1] - leftY) / 2;
  see(view, x - upX, y - upY, z - upZ);
  const footX = SEEN[0];
  const footY = SEEN[1];
  see(view, x + upX, y + upY, z + upZ);
  out[4] = (SEEN[0] - footX) / 2;
  out[5] = (SEEN[1] - footY) / 2;
  see(view, x, y, z);
  out[0] = SEEN[0];
  out[1] = SEEN[1];
  return out;
}

