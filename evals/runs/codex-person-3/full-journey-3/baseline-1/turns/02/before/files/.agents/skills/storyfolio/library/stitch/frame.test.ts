import { test } from "node:test";
import assert from "node:assert/strict";
import { equirect, mapFrame, pageFrame, fillDistance, fitDistance, spots, rise } from "./frame.ts";
import { SAMPLE_PEOPLE } from "./people.ts";

test("mapFrame and pageFrame stay finite for one place", () => {
  const one = [SAMPLE_PEOPLE.noa.places[0]];
  assert.ok(mapFrame(one).at(one[0].lat, one[0].lng).every(Number.isFinite));
  assert.ok(pageFrame(one, 3)(one[0].lat, one[0].lng).every(Number.isFinite));
});

test("mapFrame and pageFrame stay finite for no places at all", () => {
  assert.ok(mapFrame([]).at(10, 10).every(Number.isFinite));
  assert.ok(pageFrame([], 3)(10, 10).every(Number.isFinite));
});

test("mapFrame centres the places and spans at least 8 degrees", () => {
  const f = mapFrame(SAMPLE_PEOPLE.amara.places);
  const xs = SAMPLE_PEOPLE.amara.places.map((p) => f.at(p.lat, p.lng)[0]);
  assert.ok(Math.abs(Math.min(...xs) + Math.max(...xs)) < 1e-9);
  const near = mapFrame([{ name: "a", lat: 50, lng: 8, what: "" }, { name: "b", lat: 50.1, lng: 8.1, what: "" }]);
  assert.equal(near.k, 13 / 8);
});

test("fillDistance fills a 35 degree view with a plane one unit high", () => {
  assert.ok(Math.abs(fillDistance(35, 1) - 0.5 / Math.tan((17.5 * Math.PI) / 180)) < 1e-9);
});

test("equirect puts 0,0 in the middle", () => assert.deepEqual(equirect(0, 0, 200, 100), [100, 50]));

// Person test 2's Dawit: two places 57 km apart, and one 43 degrees south of them.
const DAWIT = [
  { name: "Addis Ababa", lat: 9.03, lng: 38.74, what: "" },
  { name: "Amsterdam", lat: 52.37, lng: 4.9, what: "" },
  { name: "Rotterdam", lat: 51.92, lng: 4.48, what: "" },
];

/** Where a point falls in the view of a camera looking at the origin from `pitch` above the ground: -1 to 1 is on screen. */
function onScreen([x, y, z]: number[], dist: number, pitch: number, fovDeg: number, aspect: number) {
  const cam = [0, Math.sin(pitch) * dist, Math.cos(pitch) * dist];
  const f = cam.map((c) => -c / dist), right = [1, 0, 0];
  const up = [right[1] * f[2] - right[2] * f[1], right[2] * f[0] - right[0] * f[2], right[0] * f[1] - right[1] * f[0]];
  const v = [x - cam[0], y - cam[1], z - cam[2]], dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const tanV = Math.tan(((fovDeg / 2) * Math.PI) / 180), depth = dot(v, f);
  return [dot(v, right) / (depth * tanV * aspect), dot(v, up) / (depth * tanV)];
}

test("fitDistance puts every point inside the view, at desktop and phone shape", () => {
  const f = mapFrame(DAWIT);
  const pts = DAWIT.flatMap((p) => { const [x, z] = f.at(p.lat, p.lng); return [[x, 0, z], [x - 1.4, 1.2, z], [x + 1.4, 1.2, z]]; });
  for (const aspect of [1440 / 900, 390 / 844]) {
    const d = fitDistance(pts, 0.95, 38, aspect, 0.85);
    const seen = pts.map((p) => onScreen(p, d, 0.95, 38, aspect));
    assert.ok(seen.every(([sx, sy]) => Math.abs(sx) <= 0.85 + 1e-9 && Math.abs(sy) <= 0.85 + 1e-9), `${aspect}: ${JSON.stringify(seen)}`);
    assert.ok(seen.some(([sx, sy]) => Math.max(Math.abs(sx), Math.abs(sy)) > 0.85 - 1e-6), "no further back than it needs");
  }
});

test("spots puts close places on one spot and leaves the rest alone", () => {
  const ground = (ps: typeof DAWIT) => { const f = mapFrame(ps); return ps.map((p) => f.at(p.lat, p.lng)); };
  assert.deepEqual(spots(ground(DAWIT), 1), [0, 1, 1]);
  for (const who of ["noa", "amara"] as const) {
    const ps = SAMPLE_PEOPLE[who].places;
    assert.deepEqual(spots(ground(ps), 1), ps.map((_, i) => i), who);
  }
  // A chain: each close to the next, so all three share one spot.
  assert.deepEqual(spots([[0, 0], [0.8, 0], [1.6, 0], [5, 0]], 1), [0, 0, 0, 3]);
});

test("rise is 0.32 a year, and the longest job stands no taller than 1.65", () => {
  assert.ok(Math.abs(rise(2, 2) - (0.35 + 2 * 0.32)) < 1e-9);
  assert.ok(Math.abs(rise(6.4, 6.4) - 1.65) < 1e-9);
  assert.ok(Math.abs((rise(3, 6.4) - 0.35) / (rise(6.4, 6.4) - 0.35) - 3 / 6.4) < 1e-9, "heights keep to the years");
});
