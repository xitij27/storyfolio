import { test } from "node:test";
import assert from "node:assert/strict";
import { equirect, mapFrame, pageFrame, fillDistance } from "./frame.ts";
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
