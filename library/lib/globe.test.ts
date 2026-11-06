import assert from "node:assert/strict";
import { test } from "node:test";

import { LAND } from "../content/land.ts";
import { DOTS, arcPoints, facing, landDots, spherePoint, toVector, type Place } from "./globe.ts";

const nearest = (place: Place) => {
  const [x, y, z] = toVector(place, 1);
  let best = 0;
  let score = -Infinity;
  for (let i = 0; i < DOTS; i++) {
    const [a, b, c] = toVector(spherePoint(i), 1);
    if (a * x + b * y + c * z > score) [best, score] = [i, a * x + b * y + c * z];
  }
  return best;
};
const isLand = (i: number) => (atob(LAND).charCodeAt(i >> 3) & (1 << (i & 7))) !== 0;

test("dots cover the sphere and stay in range", () => {
  for (let i = 0; i < DOTS; i += 97) {
    const { lat, lng } = spherePoint(i);
    assert.ok(lat > -90 && lat < 90 && lng >= -180 && lng < 180);
  }
});

test("the land mask puts land where land is", () => {
  const land = landDots(LAND);
  assert.ok(land.length > DOTS * 0.2 && land.length < DOTS * 0.35, `${land.length} land dots`);
  assert.ok(isLand(nearest({ lat: 23, lng: 13 })), "the Sahara");
  assert.ok(isLand(nearest({ lat: 60, lng: 100 })), "Siberia");
  assert.ok(!isLand(nearest({ lat: 0, lng: -150 })), "the middle of the Pacific");
  assert.ok(!isLand(nearest({ lat: -30, lng: 80 })), "the Indian Ocean");
});

test("facing turns a place to the front", () => {
  const place = { lat: 40, lng: -74 };
  const [pitch, yaw] = facing(place);
  let [x, y, z] = toVector(place, 1);
  // Yaw about y, then pitch about x, as the scenes nest their groups.
  [x, z] = [x * Math.cos(yaw) + z * Math.sin(yaw), -x * Math.sin(yaw) + z * Math.cos(yaw)];
  [y, z] = [y * Math.cos(pitch) - z * Math.sin(pitch), y * Math.sin(pitch) + z * Math.cos(pitch)];
  assert.ok(Math.abs(x) < 1e-9 && Math.abs(y) < 1e-9 && z > 0.999);
});

test("an arc starts and ends on its places and lifts in the middle", () => {
  const from = { lat: 51.5, lng: -0.1 };
  const to = { lat: 35.7, lng: 139.7 };
  const points = arcPoints(from, to, 100, 0.3, 20);
  const close = (a: number[], b: number[]) => a.every((v, i) => Math.abs(v - b[i]) < 1e-6);
  assert.ok(close(points[0], toVector(from, 100)));
  assert.ok(close(points[20], toVector(to, 100)));
  assert.ok(Math.abs(Math.hypot(...points[10]) - 130) < 1e-6);
  assert.equal(arcPoints(from, from, 100, 0.3, 4).length, 5);
});
