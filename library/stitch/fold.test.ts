import { test } from "node:test";
import assert from "node:assert/strict";
import { fan } from "./fold.ts";

test("fan folds the sheet into a packet without stretching its paper", () => {
  const w = 3, h = 4, panels = 8, width = 0.5;
  for (let i = 0; i < panels; i++) {
    const a = fan(i / panels + 1e-9, 0.5, w, h, panels, width), b = fan((i + 1) / panels - 1e-9, 0.5, w, h, panels, width);
    assert.ok(Math.abs(Math.hypot(b[0] - a[0], b[2] - a[2]) - w / panels) < 1e-6, `panel ${i}`);
  }
  const xs = [0, 0.37, 1].map((U) => fan(U, 0.2, w, h, panels, width)[0]);
  assert.ok(Math.abs(xs[2] - xs[0] - width) < 1e-6, "the packet is `width` across");
  assert.equal(fan(0.3, 1, w, h)[1] - fan(0.3, 0, w, h)[1], h, "the packet keeps the sheet's height");
});
