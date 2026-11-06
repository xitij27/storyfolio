// Where places fall on the worlds' flat things (a whole-world picture, the
// map's ground and the book's page) and how far a camera stands to see them.
// Pure, so it is tested without a browser.
import type { Place } from "./person.ts";

/** A whole-world picture w wide and h high: longitude across, latitude down. */
export const equirect = (lng: number, lat: number, w: number, h: number): [number, number] =>
  [((lng + 180) / 360) * w, ((90 - lat) / 180) * h];

function middle(places: readonly Place[]) {
  if (!places.length) return { lat0: 0, lng0: 0, cosL: 1, spanX: 0, spanZ: 0 };
  const lats = places.map((p) => p.lat), lngs = places.map((p) => p.lng);
  const lat0 = (Math.min(...lats) + Math.max(...lats)) / 2, lng0 = (Math.min(...lngs) + Math.max(...lngs)) / 2;
  const cosL = Math.cos((lat0 * Math.PI) / 180);
  return { lat0, lng0, cosL, spanX: (Math.max(...lngs) - Math.min(...lngs)) * cosL, spanZ: Math.max(...lats) - Math.min(...lats) };
}

export type MapFrame = {
  lat0: number; lng0: number; cosL: number; k: number;
  /** The places' spread in degrees, east to west (scaled by cosL) and north to south. */
  spanX: number; spanZ: number;
  /** A place on the ground: [x east, z south] in world units, the middle of the places at 0, 0. */
  at(lat: number, lng: number): [number, number];
};

/** The map's ground: the places' spread fills `span` units, and never less than 8 degrees of the world. */
export function mapFrame(places: readonly Place[], span = 13): MapFrame {
  const m = middle(places);
  const k = span / Math.max(m.spanX, m.spanZ, 8);
  return { ...m, k, at: (lat, lng) => [(lng - m.lng0) * m.cosL * k, -(lat - m.lat0) * k] };
}

/** The book's right page, pw wide: a place's distance from the spine and down the page. */
export function pageFrame(places: readonly Place[], pw: number): (lat: number, lng: number) => [number, number] {
  const m = middle(places);
  const k = Math.min(1.9 / (m.spanX || 1), 2.3 / (m.spanZ || 1));
  return (lat, lng) => [pw / 2 + (lng - m.lng0) * m.cosL * k, -(lat - m.lat0) * k + 0.25];
}

/** How far a camera with this vertical field of view stands from a plane this high to fill its view. */
export const fillDistance = (fovDeg: number, height: number): number => height / 2 / Math.tan(((fovDeg / 2) * Math.PI) / 180);

/**
 * How far back a camera looking at the origin from `pitch` radians above the
 * ground stands so every point ([x east, y up, z south]) falls within
 * `margin` of the middle of its view (1 is the view's edge).
 */
export function fitDistance(points: readonly (readonly number[])[], pitch: number, fovDeg: number, aspect: number, margin: number): number {
  const tanV = Math.tan(((fovDeg / 2) * Math.PI) / 180) * margin, tanH = tanV * aspect;
  const sin = Math.sin(pitch), cos = Math.cos(pitch);
  let d = 0;
  for (const [x, y, z] of points) {
    const near = y * sin + z * cos, up = y * cos - z * sin;
    d = Math.max(d, near + Math.abs(x) / tanH, near + Math.abs(up) / tanV);
  }
  return d;
}

/** Places on the ground closer than `gap` share a spot: each one's spot is the first place of its group. */
export function spots(points: readonly (readonly number[])[], gap: number): number[] {
  const spot = points.map((_, i) => i);
  points.forEach(([x, z], i) => points.slice(0, i).forEach(([x2, z2], j) => {
    if (Math.hypot(x - x2, z - z2) >= gap) return;
    const from = Math.max(spot[i], spot[j]), to = Math.min(spot[i], spot[j]);
    spot.forEach((s, k) => { if (s === from) spot[k] = to; });
  }));
  return spot;
}

/** How tall a job of `years` stands on the map: 0.32 a year, the longest job (`longest` years) no taller than 1.65. */
export const rise = (years: number, longest: number): number => 0.35 + years * Math.min(0.32, 1.3 / Math.max(longest, 1e-9));
