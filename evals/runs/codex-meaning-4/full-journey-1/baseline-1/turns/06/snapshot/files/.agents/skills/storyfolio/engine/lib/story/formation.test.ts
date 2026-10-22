import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  atRest,
  blankFormation,
  lerp,
  mixFormation,
  smoothstep,
  stagger,
  swing,
} from "./formation.ts";

describe("smoothstep", () => {
  test("is 0 below the range, 1 above it and 0.5 in the middle", () => {
    assert.equal(smoothstep(-1, 0, 1), 0);
    assert.equal(smoothstep(2, 0, 1), 1);
    assert.equal(smoothstep(0.5, 0, 1), 0.5);
  });

  test("is a plain step when the range has no width", () => {
    assert.equal(smoothstep(0.2, 0.5, 0.5), 0);
    assert.equal(smoothstep(0.8, 0.5, 0.5), 1);
  });
});

describe("mixFormation", () => {
  const a = blankFormation(2);
  const b = blankFormation(2);
  b.pieces[1] = { position: [2, 4, 6], rotation: [1, 0, -1], size: [3, 5] };
  b.turn = [1, 2];
  b.anchor = [4, -2];
  b.drift = 0.5;
  b.span = 6;
  b.rise = 4;
  b.near = 10;
  b.sway = [0.2, 0.4, -1];
  b.floor = -2;
  b.over = 1;

  test("is the first formation at 0 and the second at 1", () => {
    assert.deepEqual(mixFormation(blankFormation(2), a, b, 0), a);
    assert.deepEqual(mixFormation(blankFormation(2), a, b, 1), b);
  });

  test("is halfway at 0.5", () => {
    const mid = mixFormation(blankFormation(2), a, b, 0.5);
    assert.deepEqual(mid.pieces[1], {
      position: [1, 2, 3],
      rotation: [0.5, 0, -0.5],
      size: [2, 3],
    });
    assert.deepEqual(mid.turn, [0.5, 1]);
    assert.deepEqual(mid.anchor, [2, -1]);
    assert.equal(mid.drift, 0.25);
    assert.equal(mid.span, 3);
    assert.equal(mid.rise, 2);
    assert.equal(mid.near, 5);
    assert.deepEqual(mid.sway, [0.1, 0.2, -0.5]);
    assert.equal(mid.floor, -1);
    assert.equal(mid.over, 0.5);
  });

  test("writes into the formation it is given and leaves its inputs alone", () => {
    const out = blankFormation(2);
    const before = structuredClone(b);
    assert.equal(mixFormation(out, a, b, 0.5), out);
    assert.deepEqual(b, before);
  });
});

describe("lerp", () => {
  test("blends two numbers", () => {
    assert.equal(lerp(2, 4, 0.25), 2.5);
  });
});

describe("stagger", () => {
  test("has every piece at rest at both ends of a move", () => {
    for (let i = 0; i < 9; i++) {
      assert.equal(stagger(0, i, 9, 0.45), 0);
      assert.equal(stagger(1, i, 9, 0.45), 1);
    }
  });

  test("sends the first piece off first and brings the last in last", () => {
    assert.ok(stagger(0.3, 0, 9, 0.45) > stagger(0.3, 4, 9, 0.45));
    assert.ok(stagger(0.3, 4, 9, 0.45) > stagger(0.3, 8, 9, 0.45));
    assert.equal(stagger(0.3, 8, 9, 0.45), 0);
    assert.equal(stagger(0.55, 0, 9, 0.45), 1);
  });

  test("never runs a piece backwards", () => {
    for (let i = 0; i < 9; i++) {
      let before = 0;
      for (let t = 0; t <= 1.0001; t += 0.01) {
        const now = stagger(t, i, 9, 0.45);
        assert.ok(now >= before);
        before = now;
      }
    }
  });

  test("moves the pieces as one when there is no spread, or one piece", () => {
    assert.equal(stagger(0.3, 5, 9, 0), 0.3);
    assert.equal(stagger(0.3, 0, 1, 0.45), 0.3);
  });
});

describe("mixFormation with a progress for each piece", () => {
  test("moves each piece by its own progress and the rest by the shared one", () => {
    const a = blankFormation(2);
    const b = blankFormation(2);
    b.pieces[0].position = [10, 0, 0];
    b.pieces[1].position = [10, 0, 0];
    b.span = 8;
    const mid = mixFormation(blankFormation(2), a, b, 0.5, [1, 0.2]);
    assert.equal(mid.pieces[0].position[0], 10);
    assert.equal(mid.pieces[1].position[0], 2);
    assert.equal(mid.span, 4);
  });
});

describe("swing", () => {
  const a = blankFormation(1);
  const b = blankFormation(1);
  a.sway = [0.2, 0.4, -1];
  b.sway = [0, -0.6, 2];
  const close = (actual: number[], expected: number[]) =>
    assert.ok(
      actual.every((value, k) => Math.abs(value - expected[k]) < 1e-9),
      `${actual} is not ${expected}`,
    );

  test("is nothing halfway through a beat's rest", () => {
    close(swing([9, 9, 9], a, a, 0, 0.5), [0, 0, 0]);
  });

  test("runs from minus half the sway to plus half across the rest", () => {
    close(swing([0, 0, 0], a, a, 0, 0), [-0.1, -0.2, 0.5]);
    close(swing([0, 0, 0], a, a, 0, 1), [0.1, 0.2, -0.5]);
  });

  test("arrives at the next beat where that beat's own rest begins", () => {
    close(swing([0, 0, 0], a, b, 1, 1), swing([0, 0, 0], b, b, 0, 0));
  });
});

describe("atRest", () => {
  test("moves within a beat, clamps dwell and leaves the source intact", () => {
    const rest = blankFormation(1);
    const within = blankFormation(1);
    within.pieces[0].position[0] = 8;
    const before = structuredClone({ rest, within });
    const out = blankFormation(1);
    assert.equal(atRest(out, { rest, within }, 0.25), out);
    assert.equal(out.pieces[0].position[0], 2);
    assert.deepEqual(atRest(out, { rest, within }, -1), rest);
    assert.deepEqual(atRest(out, { rest, within }, 5), within);
    assert.deepEqual(atRest(out, { rest, within }, NaN), rest);
    assert.deepEqual({ rest, within }, before);
  });
  test("holds a beat without a within formation", () => {
    const rest = blankFormation(2);
    rest.pieces[0].position[2] = 4;
    assert.deepEqual(atRest(blankFormation(2), { rest }, 0.8), rest);
  });
});
