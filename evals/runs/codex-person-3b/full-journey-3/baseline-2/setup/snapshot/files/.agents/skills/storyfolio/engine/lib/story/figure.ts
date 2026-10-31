/*
  Where things go in a drawn figure. The canvas draws; these place, so they
  are tested without one.
*/

export type Point = readonly [number, number];
export type Box = { x: number; y: number; w: number; h: number };
/** Degrees of longitude and latitude. */
export type Bounds = { west: number; east: number; south: number; north: number };

const RADIANS = Math.PI / 180;

/**
 * The bounds around places given as [latitude, longitude], widened on every
 * side by `margin` of their extent, which is at least `least` degrees.
 */
export function boundsAround(places: readonly Point[], margin = 0.25, least = 2): Bounds {
  const lats = places.map(([lat]) => lat);
  const lngs = places.map(([, lng]) => lng);
  const south = Math.min(...lats), north = Math.max(...lats);
  const west = Math.min(...lngs), east = Math.max(...lngs);
  // A short extent is first widened to `least`, evenly on both sides.
  const pad = (extent: number) => Math.max(extent, least) * margin + Math.max(0, least - extent) / 2;
  const padLat = pad(north - south), padLng = pad(east - west);
  return { west: west - padLng, east: east + padLng, south: south - padLat, north: north + padLat };
}

/**
 * A map of `bounds` fitted into `box` and centred, with the land in its true
 * proportions: longitude is narrowed by the cosine of the middle latitude,
 * as it is on a globe there. `at` gives the point for a latitude and
 * longitude; `shows` is what the whole box shows, which is at least `bounds`.
 */
export function mapProjection(bounds: Bounds, box: Box): { at: (lat: number, lng: number) => Point; shows: Bounds } {
  const squeeze = Math.cos(((bounds.north + bounds.south) / 2) * RADIANS);
  const wide = (bounds.east - bounds.west) * squeeze;
  const tall = bounds.north - bounds.south;
  const scale = Math.min(box.w / wide, box.h / tall);
  const left = box.x + (box.w - wide * scale) / 2;
  const top = box.y + (box.h - tall * scale) / 2;
  const across = squeeze * scale;
  return {
    at: (lat, lng) => [left + (lng - bounds.west) * across, top + (bounds.north - lat) * scale],
    shows: {
      west: bounds.west - (left - box.x) / across,
      east: bounds.west + (box.x + box.w - left) / across,
      north: bounds.north + (top - box.y) / scale,
      south: bounds.north - (box.y + box.h - top) / scale,
    },
  };
}

/**
 * Points along a curve from `a` to `b` that bows to its left by `bend` of
 * the distance between them: a route between two places.
 */
export function arc(a: Point, b: Point, bend = 0.2, steps = 32): Point[] {
  const [ax, ay] = a, [bx, by] = b;
  const cx = (ax + bx) / 2 + (by - ay) * bend;
  const cy = (ay + by) / 2 - (bx - ax) * bend;
  return Array.from({ length: steps + 1 }, (_, i): Point => {
    const t = i / steps, s = 1 - t;
    return [s * s * ax + 2 * s * t * cx + t * t * bx, s * s * ay + 2 * s * t * cy + t * t * by];
  });
}

/** The first `t`, from 0 to 1, of a line through `points`, by its length. */
export function along(points: readonly Point[], t: number): Point[] {
  if (points.length < 2 || t >= 1) return [...points];
  if (t <= 0) return points.length ? [points[0]] : [];
  const lengths = points.slice(1).map((point, i) => Math.hypot(point[0] - points[i][0], point[1] - points[i][1]));
  let left = lengths.reduce((sum, length) => sum + length, 0) * t;
  const result: Point[] = [points[0]];
  for (let i = 0; i < lengths.length; i++) {
    const [ax, ay] = points[i], [bx, by] = points[i + 1];
    if (left >= lengths[i]) { result.push(points[i + 1]); left -= lengths[i]; continue; }
    const share = lengths[i] ? left / lengths[i] : 0;
    result.push([ax + (bx - ax) * share, ay + (by - ay) * share]);
    break;
  }
  return result;
}

/** How far `value` is from `from` to `to`, kept between 0 and 1: one step's share of a scroll. */
export function share(value: number, from: number, to: number): number {
  return Math.min(1, Math.max(0, (value - from) / (to - from)));
}
