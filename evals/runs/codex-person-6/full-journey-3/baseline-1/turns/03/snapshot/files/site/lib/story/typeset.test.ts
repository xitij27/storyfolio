import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  fitLine,
  fitSize,
  intoColumns,
  intoRows,
  primaryFamily,
  wrapText,
} from "./typeset.ts";

/** Every character ten units wide: a typeface that is easy to reason about. */
const measure = (text: string) => text.length * 10;

describe("wrapText", () => {
  test("breaks between words so no line is wider than the measure", () => {
    assert.deepEqual(wrapText("one two three four", 90, measure), [
      "one two",
      "three",
      "four",
    ]);
  });

  test("gives a word too long for the measure a line of its own", () => {
    assert.deepEqual(wrapText("a Forschungsfrage b", 60, measure), [
      "a",
      "Forschungsfrage",
      "b",
    ]);
  });

  test("ignores runs of space and gives nothing for no text", () => {
    assert.deepEqual(wrapText("  one   two ", 200, measure), ["one two"]);
    assert.deepEqual(wrapText("", 200, measure), []);
  });
});

describe("intoColumns", () => {
  test("fills one column, then the next", () => {
    assert.deepEqual(intoColumns(["a", "b", "c", "d", "e"], 2, 3), [
      ["a", "b", "c"],
      ["d", "e"],
    ]);
  });

  test("drops what does not fit, and leaves short text in the first column", () => {
    assert.deepEqual(intoColumns(["a", "b", "c", "d", "e"], 2, 2), [
      ["a", "b"],
      ["c", "d"],
    ]);
    assert.deepEqual(intoColumns(["a"], 2, 3), [["a"], []]);
  });
});

describe("fitSize", () => {
  const measureAt = (size: number) => (text: string) => text.length * size;

  test("takes the largest size at which the text fits the lines it has", () => {
    // At size 20 every pair of words is too wide; at 10 two pairs fit two lines.
    assert.equal(fitSize("aaaa bbbb cccc dddd", 100, 2, [20, 10, 5], measureAt), 10);
  });

  test("settles for the smallest size when nothing fits", () => {
    assert.equal(fitSize("aaaa bbbb cccc dddd", 20, 1, [20, 10, 5], measureAt), 5);
  });
});

describe("fitLine", () => {
  // Every character is as wide as half the size it is set at.
  const at = (size: number) => (text: string) => text.length * size * 0.5;

  test("takes the largest size at which the text is no wider than the line", () => {
    assert.equal(fitLine("50%", 300, [200, 150, 100], at), 200);
    assert.equal(fitLine("Organising", 800, [200, 150, 100], at), 150);
  });

  test("shrinks a single long word, which wrapping would leave as it is", () => {
    assert.equal(fitSize("Organising", 800, 1, [200, 150, 100], at), 200);
    assert.equal(fitLine("Organising", 800, [200, 150, 100], at), 150);
  });

  test("falls back to the smallest size when none fits", () => {
    assert.equal(fitLine("a very long line of words", 100, [200, 150, 100], at), 100);
  });
});

describe("primaryFamily", () => {
  test("keeps the first family and drops the fallback next/font adds", () => {
    assert.equal(
      primaryFamily('"STIX Two Text", "STIX Two Text Fallback"', "serif"),
      '"STIX Two Text", serif',
    );
  });

  test("is the generic family alone when the variable is not set", () => {
    assert.equal(primaryFamily("", "sans-serif"), "sans-serif");
    assert.equal(primaryFamily("   ", "sans-serif"), "sans-serif");
  });
});

describe("intoRows", () => {
  // Every letter is 10 wide.
  const measure = (text: string) => text.length * 10;

  test("keeps every item whole and in order", () => {
    const rows = intoRows(["Ada", "Grace", "Alan", "Claude"], 120, 20, measure);
    assert.deepEqual(rows.flat(), ["Ada", "Grace", "Alan", "Claude"]);
  });

  test("starts a new row when the next item and its gap would not fit", () => {
    // "Ada" 30 + gap 20 + "Grace" 50 = 100 fits; "Alan" would make it 160.
    assert.deepEqual(intoRows(["Ada", "Grace", "Alan"], 120, 20, measure), [
      ["Ada", "Grace"],
      ["Alan"],
    ]);
  });

  test("counts the gap between items and not after the last", () => {
    // 30 + 20 + 50 is exactly the width.
    assert.deepEqual(intoRows(["Ada", "Grace"], 100, 20, measure), [["Ada", "Grace"]]);
    assert.deepEqual(intoRows(["Ada", "Grace"], 99, 20, measure), [["Ada"], ["Grace"]]);
  });

  test("gives an item wider than the row a row to itself", () => {
    assert.deepEqual(intoRows(["Ada", "Wolfeschlegelstein", "Al"], 100, 20, measure), [
      ["Ada"],
      ["Wolfeschlegelstein"],
      ["Al"],
    ]);
  });

  test("makes no rows of nothing", () => {
    assert.deepEqual(intoRows([], 100, 20, measure), []);
  });
});
