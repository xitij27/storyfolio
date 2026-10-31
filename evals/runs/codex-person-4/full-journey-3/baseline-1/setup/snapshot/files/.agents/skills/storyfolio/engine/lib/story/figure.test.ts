import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { along, arc, boundsAround, mapProjection, share, type Point } from "./figure.ts";

const close = (actual: readonly number[], expected: readonly number[]) =>
  actual.forEach((value, i) => assert.ok(Math.abs(value - expected[i]) < 1e-9, `${actual} is not ${expected}`));

describe("boundsAround", () => {
  test("widens the places' extent by the margin on every side", () => {
    assert.deepEqual(boundsAround([[10, 0], [50, 20]], 0.25), { west: -5, east: 25, south: 0, north: 60 });
  });
  test("gives one place a least extent, centred on it", () => {
    assert.deepEqual(boundsAround([[52, 5]], 0, 2), { west: 4, east: 6, south: 51, north: 53 });
  });
});

describe("mapProjection", () => {
  const box = { x: 100, y: 50, w: 400, h: 400 };
  test("puts the bounds' corners in the box, centred, keeping proportions", () => {
    // On the equator a degree is as wide as it is tall, so 20 by 10 degrees fills the width.
    const { at } = mapProjection({ west: 0, east: 20, south: -5, north: 5 }, box);
    close(at(5, 0), [100, 150]);
    close(at(-5, 20), [500, 350]);
  });
  test("narrows longitude by the cosine of the middle latitude", () => {
    const { at } = mapProjection({ west: 0, east: 10, south: 59, north: 61 }, box);
    const [x0] = at(60, 0), [x1] = at(60, 10), [, y0] = at(61, 0), [, y1] = at(59, 0);
    assert.ok(Math.abs((x1 - x0) / (y1 - y0) - 5 * Math.cos(Math.PI / 3)) < 1e-9);
  });
  test("says what the whole box shows", () => {
    const { at, shows } = mapProjection({ west: 0, east: 20, south: -5, north: 5 }, box);
    close(at(shows.north, shows.west), [100, 50]);
    close(at(shows.south, shows.east), [500, 450]);
  });
});

describe("arc", () => {
  test("runs from one point to the other, bowing to the left", () => {
    const points = arc([0, 0], [100, 0], 0.2, 4);
    assert.deepEqual(points[0], [0, 0]);
    close(points[4], [100, 0]);
    assert.ok(points[2][1] < 0, "a canvas's left of rightward travel is up");
  });
});

describe("along", () => {
  const line: Point[] = [[0, 0], [10, 0], [10, 30]];
  test("gives the start, a share by length, or the whole", () => {
    assert.deepEqual(along(line, 0), [[0, 0]]);
    assert.deepEqual(along(line, 0.5), [[0, 0], [10, 0], [10, 10]]);
    assert.deepEqual(along(line, 1), line);
  });
});

describe("share", () => {
  test("is a step's share of a value, kept between 0 and 1", () => {
    assert.equal(share(0.25, 0, 0.5), 0.5);
    assert.equal(share(-1, 0, 0.5), 0);
    assert.equal(share(0.9, 0, 0.5), 1);
  });
});
