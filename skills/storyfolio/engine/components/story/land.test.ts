import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The data is checked where it lies, so a swapped latitude and longitude cannot pass.
const data: { land: number[][]; borders: number[][] } = JSON.parse(readFileSync(new URL("../../stitch/land.json", import.meta.url), "utf8"));

function inside(lng: number, lat: number, ring: number[]): boolean {
  let within = false;
  for (let i = 0, j = ring.length - 2; i < ring.length; j = i, i += 2) {
    const [xi, yi, xj, yj] = [ring[i], ring[i + 1], ring[j], ring[j + 1]];
    if ((yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) within = !within;
  }
  return within;
}
const onLand = (lat: number, lng: number) => data.land.filter((ring) => inside(lng, lat, ring)).length % 2 === 1;

test("cities are on land and seas are not", () => {
  for (const [lat, lng] of [[9.03, 38.74], [52.37, 4.9], [39.74, -104.99], [40.42, -3.7]]) assert.ok(onLand(lat, lng), `${lat}, ${lng}`);
  for (const [lat, lng] of [[54.5, 3], [0, -30], [35, 18]]) assert.ok(!onLand(lat, lng), `${lat}, ${lng}`);
});

test("every line is longitude, latitude pairs within the world", () => {
  for (const line of [...data.land, ...data.borders]) {
    assert.equal(line.length % 2, 0);
    for (let i = 0; i < line.length; i += 2) assert.ok(Math.abs(line[i]) <= 180 && Math.abs(line[i + 1]) <= 90);
  }
});
