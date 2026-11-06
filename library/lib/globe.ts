/*
  Where things are on a globe. Pure numbers, so it is tested without a
  browser. Latitude and longitude are in degrees, and a point's position
  follows three-globe's convention, so a place faces the camera when the
  globe is turned by `facing`.
*/

export type Place = { lat: number; lng: number };
export type Vec3 = [number, number, number];

/** How many dots are spread over the whole sphere; the land mask has a bit for each. */
export const DOTS = 12000;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));
const RAD = Math.PI / 180;

/** The i-th of n points spread evenly over a sphere (a Fibonacci lattice). */
export function spherePoint(i: number, n = DOTS): Place {
  const y = 1 - ((i + 0.5) * 2) / n;
  const turn = (i * GOLDEN) % (2 * Math.PI);
  return { lat: Math.asin(y) / RAD, lng: turn / RAD - 180 };
}

/** The dots that fall on land, from a base64 mask with one bit per dot. */
export function landDots(mask: string, n = DOTS): Place[] {
  const bytes = atob(mask);
  const dots: Place[] = [];
  for (let i = 0; i < n; i++) {
    if (bytes.charCodeAt(i >> 3) & (1 << (i & 7))) dots.push(spherePoint(i, n));
  }
  return dots;
}

export function toVector({ lat, lng }: Place, radius: number): Vec3 {
  const phi = (90 - lat) * RAD;
  const theta = (90 - lng) * RAD;
  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

/** How far to turn the globe so a place faces the camera: [pitch, yaw]. */
export function facing(place: Place): [number, number] {
  const [x, , z] = toVector(place, 1);
  return [place.lat * RAD, Math.atan2(-x, z)];
}

/** A great-circle arc from one place to another, lifted off the surface in the middle. */
export function arcPoints(from: Place, to: Place, radius: number, lift: number, segments = 48): Vec3[] {
  const a = toVector(from, 1);
  const b = toVector(to, 1);
  const angle = Math.acos(Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
  const points: Vec3[] = [];
  for (let s = 0; s <= segments; s++) {
    const t = s / segments;
    // Spherical interpolation; two places at the same spot give a single point.
    const wa = angle < 1e-6 ? 1 - t : Math.sin((1 - t) * angle) / Math.sin(angle);
    const wb = angle < 1e-6 ? t : Math.sin(t * angle) / Math.sin(angle);
    const r = radius * (1 + lift * Math.sin(Math.PI * t));
    points.push([
      (wa * a[0] + wb * b[0]) * r,
      (wa * a[1] + wb * b[1]) * r,
      (wa * a[2] + wb * b[2]) * r,
    ]);
  }
  return points;
}
