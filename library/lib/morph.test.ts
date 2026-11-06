import assert from "node:assert/strict";
import { test } from "node:test";

import { blend, pointAt, resample, smoothstep, subPath, type P } from "./morph.ts";

const close = (a: number[], b: number[]) => a.every((v, i) => Math.abs(v - b[i]) < 1e-9);
// An L: 3 along x, then 1 up y. Total length 4.
const L: P[] = [[0, 0, 0], [3, 0, 0], [3, 1, 0]];

test("a point along a path goes by distance, not by point index", () => {
  assert.ok(close(pointAt(L, 0.5), [2, 0, 0]));
  assert.ok(close(pointAt(L, 0.875), [3, 0.5, 0]));
  assert.ok(close(pointAt(L, -1), [0, 0, 0]));
  assert.ok(close(pointAt(L, 2), [3, 1, 0]));
});

test("resampling keeps the ends and spaces the points evenly", () => {
  const r = resample(L, 5);
  assert.equal(r.length, 5);
  assert.ok(close(r[0], L[0]) && close(r[4], L[2]));
  assert.ok(close(r[2], [2, 0, 0]));
  assert.ok(close(r[3], [3, 0, 0]));
});

test("part of a path starts and ends where asked, with the corners between", () => {
  const part = subPath(L, 0.25, 0.875);
  assert.ok(close(part[0], [1, 0, 0]));
  assert.ok(close(part[1], [3, 0, 0]));
  assert.ok(close(part[part.length - 1], [3, 0.5, 0]));
  assert.equal(subPath(L, 0.5, 0.5).length, 2);
});

test("blending two paths runs from the first to the second", () => {
  const a = resample(L, 4);
  const b = resample([[0, 2, 0], [4, 2, 0]], 4);
  assert.deepEqual(blend(a, b, 0), a);
  assert.ok(blend(a, b, 1).every((p, i) => close(p, b[i])));
  assert.equal(smoothstep(0.5, 0, 1), 0.5);
  assert.equal(smoothstep(-1, 0, 1), 0);
});
