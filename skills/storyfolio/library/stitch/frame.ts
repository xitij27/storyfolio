// Where places fall on the worlds' flat things: a whole-world picture, the
// map's ground and the book's page. Pure, so it is tested without a browser.
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
