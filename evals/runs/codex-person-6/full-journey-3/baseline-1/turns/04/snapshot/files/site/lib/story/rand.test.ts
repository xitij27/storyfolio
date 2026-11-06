import assert from "node:assert/strict";
import { test } from "node:test";
import { rand } from "./rand.ts";

test("random placements repeat for an index and salt, within zero and one", () => {
  const values = Array.from({ length: 100 }, (_, index) => rand(index, 7));
  assert.deepEqual(values, Array.from({ length: 100 }, (_, index) => rand(index, 7)));
  assert.ok(values.every((value) => value >= 0 && value < 1));
  assert.equal(new Set(values).size, values.length);
  assert.notDeepEqual(values, Array.from({ length: 100 }, (_, index) => rand(index, 8)));
});
