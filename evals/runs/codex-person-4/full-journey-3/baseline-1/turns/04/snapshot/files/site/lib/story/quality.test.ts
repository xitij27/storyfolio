import assert from "node:assert/strict";
import { test } from "node:test";
import { createQuality } from "./quality.ts";

test("one slow frame cannot reduce quality before a complete window", () => {
  const quality = createQuality({ window: 4 });
  quality.sample(100);
  quality.sample(16);
  quality.sample(16);
  assert.deepEqual(quality.get(), { dpr: 2, shadows: true, step: 0 });
  quality.sample(16);
  assert.deepEqual(quality.get(), { dpr: 1.5, shadows: true, step: 1 });
});

test("sustained slow frames reduce DPR and then shadows, with fresh evidence each time", () => {
  const quality = createQuality({ window: 2 });
  quality.sample(40);
  quality.sample(40);
  assert.equal(quality.get().dpr, 1.5);
  quality.sample(40);
  assert.equal(quality.get().dpr, 1.5);
  quality.sample(40);
  assert.deepEqual(quality.get(), { dpr: 1, shadows: false, step: 2 });
  for (let i = 0; i < 20; i++) quality.sample(40);
  assert.deepEqual(quality.get(), { dpr: 0.75, shadows: false, step: 3 });
  for (let i = 0; i < 200; i++) quality.sample(8);
  assert.deepEqual(quality.get(), { dpr: 0.75, shadows: false, step: 3 });
});

test("the window forgets old fast frames and ignores invalid or hidden-tab pauses", () => {
  const quality = createQuality({ window: 3 });
  for (let i = 0; i < 30; i++) quality.sample(16);
  for (const frame of [NaN, Infinity, 0, -1, 2000]) quality.sample(frame);
  quality.sample(30);
  assert.equal(quality.get().step, 0);
  quality.sample(30);
  assert.equal(quality.get().step, 1);
});

test("a low initial DPR never rises and can still drop expensive shadows", () => {
  const quality = createQuality({ dpr: 0.75, window: 1 });
  assert.deepEqual(quality.sample(40), { dpr: 0.75, shadows: false, step: 1 });
  assert.deepEqual(createQuality({ dpr: NaN }).get(), { dpr: 2, shadows: true, step: 0 });
});
