import type { Bounds } from "@/lib/story/figure";

/*
  The world's land and the borders between countries, for drawn maps, from
  Natural Earth at 1:50 million (public domain). Each line is flat
  longitude, latitude pairs, rounded to a hundredth of a degree. It is a
  megabyte, so it is fetched the first time a map is drawn, and whatever
  asked for it is drawn again when it arrives.
*/

export type Line = Bounds & { points: readonly number[] };
export type Land = { land: readonly Line[]; borders: readonly Line[] };

let land: Land | null = null;
let asked = false;
const listeners = new Set<() => void>();

function line(points: number[]): Line {
  let west = 180, east = -180, south = 90, north = -90;
  for (let i = 0; i < points.length; i += 2) {
    west = Math.min(west, points[i]); east = Math.max(east, points[i]);
    south = Math.min(south, points[i + 1]); north = Math.max(north, points[i + 1]);
  }
  return { points, west, east, south, north };
}

/** The land if it has arrived, or null, asking for it the first time. */
export function getLand(): Land | null {
  if (!asked) {
    asked = true;
    import("../../stitch/land.json")
      .then(({ default: data }) => {
        land = { land: data.land.map(line), borders: data.borders.map(line) };
        for (const listener of listeners) listener();
      })
      .catch(() => { /* No land: a map keeps its frame and its places. */ });
  }
  return land;
}

/** Calls `listener` when the land arrives. Returns how to stop. */
export function onLand(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
