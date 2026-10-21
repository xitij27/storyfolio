import assert from "node:assert/strict";
import { test } from "node:test";
import { fan, grid, measure, ring, row, scatter, stack } from "./layouts.ts";

test("every layout returns independent poses for the requested pieces", () => {
  for (const layout of [stack, fan, ring, grid, row, scatter]) {
    assert.deepEqual(layout(0, [2, 3]), []);
    for (const count of [1, 2, 7]) {
      const poses = layout(count, [2, 3]);
      assert.equal(poses.length, count);
      assert.ok(poses.every((pose) => [...pose.position, ...pose.rotation, ...pose.size].every(Number.isFinite)));
      assert.ok(poses.every((pose) => pose.size[0] === 2 && pose.size[1] === 3));
      if (count > 1) {
        poses[0].size[0] = 100;
        assert.equal(poses[1].size[0], 2);
      }
    }
    assert.throws(() => layout(-1, [2, 3]), /count/);
    assert.throws(() => layout(1, [NaN, 3]), /size/);
  }
});

test("rows and grids account for piece dimensions and centre an incomplete final row", () => {
  assert.deepEqual(row(3, [2, 3], { gap: 1 }).map((pose) => pose.position[0]), [-3, 0, 3]);
  const poses = grid(5, [2, 3], { columns: 3, gap: 1 });
  assert.deepEqual(poses.slice(3).map((pose) => pose.position[0]), [-1.5, 1.5]);
  assert.deepEqual(measure(poses), { span: 8, rise: 7 });
});

test("scatter is repeatable from its seed and changes with another seed", () => {
  assert.deepEqual(scatter(7, [2, 3], { seed: 42 }), scatter(7, [2, 3], { seed: 42 }));
  assert.notDeepEqual(scatter(7, [2, 3], { seed: 42 }), scatter(7, [2, 3], { seed: 43 }));
});

test("measure includes turned corners instead of unrotated sizes", () => {
  const poses = stack(1, [2, 4]);
  poses[0].rotation[2] = Math.PI / 2;
  let bounds = measure(poses);
  assert.ok(Math.abs(bounds.span - 4) < 1e-9);
  assert.ok(Math.abs(bounds.rise - 2) < 1e-9);
  poses[0].rotation = [0, Math.PI / 3, 0];
  bounds = measure(poses);
  assert.ok(Math.abs(bounds.span - 1) < 1e-9);
  assert.equal(bounds.rise, 4);
  assert.deepEqual(measure([]), { span: 0, rise: 0 });
});

test("measure uses all corners of a compound XYZ rotation", () => {
  const poses = stack(1, [2, 4]);
  poses[0].rotation = [Math.PI / 4, Math.PI / 4, Math.PI / 4];
  const bounds = measure(poses);
  assert.ok(Math.abs(bounds.span - 3) < 1e-9);
  const expectedRise = 2 * (0.5 + Math.SQRT1_2 / 2) + 4 * (0.5 - Math.SQRT1_2 / 2);
  assert.ok(Math.abs(bounds.rise - expectedRise) < 1e-9);
});

test("measure frames an offset piece around the origin the camera aims at", () => {
  const poses = stack(1, [2, 4]);
  poses[0].position = [4, -3, 0];
  assert.deepEqual(measure(poses), { span: 10, rise: 10 });
  poses[0].position = [-4, 3, 0];
  assert.deepEqual(measure(poses), { span: 10, rise: 10 });
});
