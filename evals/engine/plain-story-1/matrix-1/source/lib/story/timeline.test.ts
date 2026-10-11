import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  approach,
  dwellAt,
  gathered,
  phase,
  place,
  playhead,
  settle,
  weight,
  type BeatBox,
} from "./timeline.ts";

// Two beats on a screen 1000px tall. The first block is 1.5 screens and the
// second is 1, so the first beat rests until 500px and travels until 900px.
const SCREEN = 1000;
const BOXES: BeatBox[] = [
  { top: 0, height: 1500 },
  { top: 1500, height: 1000 },
];

const near = (actual: number, expected: number) =>
  assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} is not ${expected}`);

describe("playhead", () => {
  test("rests on the first beat at the top of the page", () => {
    assert.deepEqual(playhead(0, SCREEN, BOXES), { beat: 0, dwell: 0 });
  });

  test("dwell rises while the first block still reaches the bottom of the screen", () => {
    assert.deepEqual(playhead(250, SCREEN, BOXES), { beat: 0, dwell: 0.5 });
    assert.deepEqual(playhead(500, SCREEN, BOXES), { beat: 0, dwell: 1 });
  });

  test("travels to the next beat over 0.4 of a screen", () => {
    assert.deepEqual(playhead(700, SCREEN, BOXES), { beat: 0.5, dwell: 0 });
  });

  test("rests on the second beat once the travel is done", () => {
    assert.deepEqual(playhead(900, SCREEN, BOXES), { beat: 1, dwell: 0 });
    assert.deepEqual(playhead(1200, SCREEN, BOXES), { beat: 1, dwell: 0.5 });
    assert.deepEqual(playhead(1500, SCREEN, BOXES), { beat: 1, dwell: 1 });
  });

  test("stays on the first beat above the page and the last beat below it", () => {
    assert.deepEqual(playhead(-300, SCREEN, BOXES), { beat: 0, dwell: 0 });
    assert.deepEqual(playhead(50_000, SCREEN, BOXES), { beat: 1, dwell: 1 });
  });

  test("gives a resting first beat for input it cannot use", () => {
    const rest = { beat: 0, dwell: 0 };
    assert.deepEqual(playhead(100, SCREEN, []), rest);
    assert.deepEqual(playhead(100, 0, BOXES), rest);
    assert.deepEqual(playhead(Number.NaN, SCREEN, BOXES), rest);
  });

  test("never jumps or runs backwards as the page scrolls", () => {
    // The middle block is shorter than the screen, which is the awkward case.
    const boxes: BeatBox[] = [
      { top: 0, height: 1000 },
      { top: 1000, height: 300 },
      { top: 1300, height: 1000 },
    ];
    let previous = playhead(-200, SCREEN, boxes).beat;
    for (let scrolled = -195; scrolled <= 2000; scrolled += 5) {
      const { beat } = playhead(scrolled, SCREEN, boxes);
      assert.ok(beat >= previous, `went backwards at ${scrolled}`);
      assert.ok(beat - previous <= 5 / 400 + 1e-9, `jumped at ${scrolled}`);
      previous = beat;
    }
    assert.equal(previous, 2);
  });

  test("gives the same answer at any screen size", () => {
    const k = 0.39;
    const small = BOXES.map((b) => ({ top: b.top * k, height: b.height * k }));
    for (const scrolled of [0, 250, 700, 900, 1200]) {
      const big = playhead(scrolled, SCREEN, BOXES);
      const little = playhead(scrolled * k, SCREEN * k, small);
      near(little.beat, big.beat);
      near(little.dwell, big.dwell);
    }
  });
});

// Three beats on the same screen, the first a quarter longer than the rest.
const THREE: BeatBox[] = [
  { top: 0, height: 1250 },
  { top: 1250, height: 1000 },
  { top: 2250, height: 1000 },
];

describe("phase", () => {
  test("runs from 2i to 2i+1 while the scene rests on beat i", () => {
    assert.equal(phase({ beat: 0, dwell: 0 }), 0);
    assert.equal(phase({ beat: 3, dwell: 0.25 }), 6.25);
    assert.equal(phase({ beat: 3, dwell: 1 }), 7);
  });

  test("runs from 2i+1 to 2i+2 while the scene travels on", () => {
    assert.equal(phase({ beat: 3.5, dwell: 0 }), 7.5);
  });

  test("only grows, and never jumps, as the page is scrolled", () => {
    let before = phase(playhead(0, SCREEN, THREE));
    for (let y = 1; y <= 2400; y++) {
      const now = phase(playhead(y, SCREEN, THREE));
      assert.ok(now >= before, `fell at ${y}`);
      assert.ok(now - before < 0.02, `jumped at ${y}`);
      before = now;
    }
  });
});

describe("place", () => {
  test("undoes phase", () => {
    assert.deepEqual(place(6.25, 7), { from: 3, to: 3, t: 0, dwell: 0.25 });
    assert.deepEqual(place(7.5, 7), { from: 3, to: 4, t: 0.5, dwell: 1 });
  });

  test("agrees with the playhead it came from, all the way down the page", () => {
    for (let y = 0; y <= 2400; y += 7) {
      const head = playhead(y, SCREEN, THREE);
      const at = place(phase(head), THREE.length);
      const whole = Math.floor(head.beat);
      assert.equal(at.from, whole, `from at ${y}`);
      near(at.t, head.beat - whole);
      if (at.t > 0) {
        assert.equal(at.to, whole + 1, `to at ${y}`);
        assert.equal(at.dwell, 1, `dwell at ${y}`);
      } else {
        assert.equal(at.to, whole, `to at ${y}`);
        near(at.dwell, head.dwell);
      }
    }
  });

  test("stays inside the paper", () => {
    assert.deepEqual(place(-3, 7), { from: 0, to: 0, t: 0, dwell: 0 });
    assert.deepEqual(place(99, 7), { from: 6, to: 6, t: 0, dwell: 1 });
    assert.deepEqual(place(Number.NaN, 7), { from: 0, to: 0, t: 0, dwell: 0 });
    assert.deepEqual(place(2, 0), { from: 0, to: 0, t: 0, dwell: 0 });
  });
});

describe("weight", () => {
  test("is 1 on a beat and fades to 0 a beat away", () => {
    assert.equal(weight(2, 2), 1);
    assert.equal(weight(2.25, 2), 0.75);
    assert.equal(weight(2.25, 3), 0.25);
    assert.equal(weight(2.25, 4), 0);
  });
});

describe("dwellAt", () => {
  test("is 0 before a beat, its dwell while resting on it, 1 after", () => {
    assert.equal(dwellAt({ from: 2, dwell: 0.4 }, 3), 0);
    assert.equal(dwellAt({ from: 2, dwell: 0.4 }, 2), 0.4);
    assert.equal(dwellAt({ from: 2, dwell: 0.4 }, 1), 1);
  });

  test("is 1 for the beat being left", () => {
    assert.equal(dwellAt({ from: 2, dwell: 1 }, 2), 1);
  });
});

describe("approach", () => {
  test("lands on the target on the first frame", () => {
    assert.equal(approach(null, 3, 5, 0.016), 3);
  });

  test("moves part of the way on later frames", () => {
    near(approach(0, 1, 5, 0.1), 1 - Math.exp(-0.5));
  });

  test("does not overshoot after a long pause", () => {
    const value = approach(0, 1, 5, 30);
    assert.ok(value <= 1 && value > 0.999);
  });

  test("holds still when no time has passed", () => {
    assert.equal(approach(0.4, 1, 5, 0), 0.4);
  });

  test("recovers from a value that is not a number", () => {
    assert.equal(approach(Number.NaN, 2, 5, 0.016), 2);
  });
});

describe("settle", () => {
  test("leaves a resting scene where it is", () => {
    assert.equal(settle(6.25), 6.25);
    assert.equal(settle(7), 7);
  });

  test("puts a travelling scene on the nearer beat", () => {
    assert.equal(settle(7.25), 7);
    assert.equal(settle(7.75), 8);
  });
});

describe("gathered", () => {
  const each = (...values: number[]) => Float32Array.from(values);

  test("is whole while the scene rests on the beat", () => {
    assert.equal(gathered({ from: 4, to: 4, each: each(0, 0, 0) }, 4), 1);
  });

  test("is as far as the last page to arrive has come", () => {
    const arriving = { from: 3, to: 4, each: each(1, 0.75, 0.25) };
    assert.equal(gathered(arriving, 4), 0.25);
  });

  test("falls as soon as the first page has set off", () => {
    const leaving = { from: 4, to: 5, each: each(0.25, 0, 0) };
    assert.equal(gathered(leaving, 4), 0.75);
  });

  test("is nothing for a beat the scene is neither on, coming to nor leaving", () => {
    assert.equal(gathered({ from: 3, to: 4, each: each(1, 1, 1) }, 6), 0);
    assert.equal(gathered({ from: 5, to: 5, each: each(0, 0, 0) }, 4), 0);
  });
});
