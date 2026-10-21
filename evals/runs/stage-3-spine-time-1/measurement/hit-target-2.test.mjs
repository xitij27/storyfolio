import assert from "node:assert/strict";
import test from "node:test";
import { inspectControlHit } from "./hit-target-2.mjs";
// Minimal fake page: one 1024-wide card in a 1440 x 900 viewport; elementFromPoint returns the card inside its box.
function card(top, bottom) {
  const rect = { x: 208, y: top, width: 1024, height: bottom - top, left: 208, top, right: 1232, bottom };
  const node = { tagName: "A", textContent: "card", getBoundingClientRect: () => rect, getClientRects: () => [rect], checkVisibility: () => true, disabled: false, getAttribute: () => null, contains: other => other === node };
  node.ownerDocument = { defaultView: { innerWidth: 1440, innerHeight: 900 }, activeElement: null, elementFromPoint: (x, y) => (y >= top && y <= bottom ? node : null) };
  return node;
}
test("a card overrunning the bottom edge by 0.078 px is actionable", () => {
  const result = inspectControlHit(card(683.297, 900.078));
  assert.equal(result.inView, true); assert.equal(result.actionable, true); assert.ok(result.pointerPoint.y < 900);
});
test("a card overrunning by more than 1 px is still out of view", () => {
  const result = inspectControlHit(card(700, 902));
  assert.equal(result.inView, false); assert.equal(result.actionable, false); assert.equal(result.pointerPoint, null);
});
