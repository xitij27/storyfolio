import { rand } from "./rand.ts";

/*
  The Method chapter's data beat: points scattered over the desk of pages
  that gather into three clusters as the beat is scrolled through. The
  coordinates are in the plane of the desk (see "method.data" in
  formations.ts).
*/

export const POINT_COUNT = 120;

/** The centre of each cluster: x, y. */
export const CLUSTERS: readonly [number, number][] = [
  [-1.7, 0.95],
  [1.5, 0.45],
  [-0.15, -1.1],
];

export const CLUSTER_RADIUS = 0.45;

/** Half the desk's width and height. */
export const DESK: [number, number] = [2.7, 1.9];

export const clusterOf = (i: number): number => i % CLUSTERS.length;

/** Where a point starts: anywhere on the desk. */
export function scattered(i: number): [number, number] {
  return [(rand(i, 11) * 2 - 1) * DESK[0], (rand(i, 12) * 2 - 1) * DESK[1]];
}

/** Where it ends: near its cluster's centre, denser towards the middle. */
export function clustered(i: number): [number, number] {
  const [cx, cy] = CLUSTERS[clusterOf(i)];
  const angle = rand(i, 13) * Math.PI * 2;
  const radius = rand(i, 14) * CLUSTER_RADIUS;
  return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
}
