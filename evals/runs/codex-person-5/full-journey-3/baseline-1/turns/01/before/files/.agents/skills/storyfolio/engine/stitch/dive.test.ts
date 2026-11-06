import { test } from "node:test";
import assert from "node:assert/strict";
import { diveSteps, fillPose, fitCard } from "./dive.ts";
import { fillDistance } from "./frame.ts";

test("the dive fades in the window, then flies", () => {
  assert.deepEqual(diveSteps(0), { fade: 0, fly: 0 });
  assert.equal(diveSteps(0.35).fade, 1); assert.equal(diveSteps(0.35).fly, 0);
  assert.equal(diveSteps(1).fly, 1);
  const mid = diveSteps(0.6);
  assert.equal(mid.fade, 1); assert.ok(mid.fly > 0 && mid.fly < 1);
});

test("the dive's steps only ever grow as the move goes on", () => {
  let last = diveSteps(0);
  for (let i = 1; i <= 100; i++) {
    const s = diveSteps(i / 100);
    assert.ok(s.fade >= last.fade && s.fly >= last.fly, `at ${i / 100}`);
    last = s;
  }
});

test("the fill pose stands on the anchor's normal at the fill distance", () => {
  const p = fillPose({ position: [1, 2, 3], normal: [0, 0, 1] }, 35, 1);
  assert.deepEqual(p.slice(0, 2), [1, 2]); assert.ok(Math.abs(p[2] - (3 + fillDistance(35, 1))) < 1e-9);
  const up = fillPose({ position: [0, 0, 0], normal: [0, 2, 0] }, 35, 1);
  assert.ok(Math.abs(up[1] - fillDistance(35, 1)) < 1e-9, "the normal is made unit length");
});

test("the window's picture is half float only where the GPU can draw into it", async () => {
  const { windowType } = await import("./dive.ts");
  assert.equal(windowType((x) => x === "EXT_color_buffer_float"), "half");
  assert.equal(windowType((x) => x === "EXT_color_buffer_half_float"), "half");
  assert.equal(windowType(() => false), "byte");
});

test("fitCard fits a wide picture to a tall element by its width", () => {
  const c = fitCard({ w: 2, h: 3 }, 16 / 9);
  assert.ok(c.w <= 0.8 * 2 + 1e-9 && c.h <= 0.8 * 3 + 1e-9);
  assert.ok(Math.abs(c.picture.w / c.picture.h - 16 / 9) < 1e-9);
  assert.ok(Math.abs(c.w - 0.8 * 2) < 1e-9);
});

test("fitCard fits a tall picture to a wide element by its height, with an even border", () => {
  const c = fitCard({ w: 4, h: 1 }, 390 / 844);
  assert.ok(Math.abs(c.h - 0.8) < 1e-9);
  assert.ok(Math.abs((c.h - c.picture.h) / 2 - 0.06 * c.h) < 1e-9);
  assert.ok(Math.abs((c.w - c.picture.w) / 2 - 0.06 * c.h) < 1e-9);
});
