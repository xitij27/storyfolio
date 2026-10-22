import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { createControls } from "./controls.ts";

describe("controls", () => {
  test("give back what was set, and nothing for what was not", () => {
    const controls = createControls();
    assert.equal(controls.get("noise"), null);
    controls.set("noise", 0.4);
    assert.equal(controls.get("noise"), 0.4);
  });

  test("forget a value set back to nothing", () => {
    const controls = createControls();
    controls.set("seam", 0.2);
    controls.set("seam", null);
    assert.equal(controls.get("seam"), null);
  });

  test("tell whoever is listening when a value changes, and only then", () => {
    const controls = createControls();
    let told = 0;
    const stop = controls.subscribe(() => told++);
    controls.set("noise", 0.4);
    controls.set("noise", 0.4);
    assert.equal(told, 1);
    controls.set("noise", 0.5);
    assert.equal(told, 2);
    stop();
    controls.set("noise", 0.6);
    assert.equal(told, 2);
  });
});

describe("the piece the pointer is on", () => {
  test("is none until the reader points at one, and none again when they leave it", () => {
    const controls = createControls();
    assert.equal(controls.get("piece"), null);
    controls.set("piece", 3);
    assert.equal(controls.get("piece"), 3);
    controls.set("piece", null);
    assert.equal(controls.get("piece"), null);
  });

  test("the first piece counts as one: it is number 0", () => {
    const controls = createControls();
    controls.set("piece", 0);
    assert.equal(controls.get("piece"), 0);
  });
});
