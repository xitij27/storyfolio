// Deterministic DOM-shaped fixtures only. No browser, timers, process or network.
import assert from "node:assert/strict";
import test from "node:test";
import { inspectControlHit } from "./hit-target.mjs";

const rect = (x, y, width, height) => ({ x, y, width, height, left: x, top: y, right: x + width, bottom: y + height });
const inside = (box, x, y) => x >= box.left && x < box.right && y >= box.top && y < box.bottom;

function fixture({ union = rect(20, 40, 180, 30), fragments = [union], visible = true, disabled = false, ariaDisabled = null, focused = false, covered = false, descendant = false } = {}) {
  const calls = [], attributes = { id: "actual-choice", class: "concept-choice", href: "/sketch/enclosure", "aria-disabled": ariaDisabled };
  const overlay = { tagName: "DIV", textContent: "Covering overlay", getAttribute: name => name === "id" ? "overlay" : null };
  const child = { tagName: "SPAN", textContent: "Real child text", getAttribute: name => name === "class" ? "link-text" : null };
  const node = { tagName: "A", textContent: "Inside the power cycle ↗", disabled,
    getAttribute: name => attributes[name] ?? null,
    getBoundingClientRect: () => ({ ...union }), getClientRects: () => fragments.map(box => ({ ...box })),
    checkVisibility: options => { calls.push({ visibility: options }); return visible; },
    contains: element => element === child };
  const doc = { defaultView: { innerWidth: 390, innerHeight: 844 }, activeElement: focused ? node : null,
    elementFromPoint: (x, y) => { calls.push({ x, y }); return covered ? overlay : fragments.some(box => box.width > 0 && box.height > 0 && inside(box, x, y)) ? descendant ? child : node : overlay; } };
  node.ownerDocument = doc;
  return { node, doc, calls, overlay, child };
}

test("wrapped inline union-center gap selects a genuine fragment point", () => {
  const union = rect(52.796875, 482.875, 302.4375, 63);
  const fragments = [rect(union.x, union.y, union.width, 24), rect(union.x, union.y + 39, 25, 24)];
  const { node } = fixture({ union, fragments });
  const result = inspectControlHit(node);
  assert.equal(result.unionCenter.hitTarget, false); assert.equal(result.unionCenter.hit.id, "overlay");
  assert.equal(result.inView, true); assert.equal(result.visible, true); assert.equal(result.disabled, false);
  assert.equal(result.hitTarget, true); assert.equal(result.actionable, true);
  assert.deepEqual(result.pointerPoint, { x: 204.015625, y: 494.875, rectIndex: 0 });
  assert.equal(result.clientRects.length, 2); assert.equal(result.candidates.length, 2);
  assert.equal(result.candidates[0].hit.id, "actual-choice");
  assert.ok(inside(fragments[0], result.pointerPoint.x, result.pointerPoint.y));
  assert.equal(node.ownerDocument.elementFromPoint(result.pointerPoint.x, result.pointerPoint.y), node);
});

test("ordinary single-line control keeps its center and exact visibility flags", () => {
  const { node, calls } = fixture(); const result = inspectControlHit(node);
  assert.deepEqual(result.pointerPoint, { x: 110, y: 55, rectIndex: 0 });
  assert.equal(result.unionCenter.hitTarget, true); assert.equal(result.focused, false);
  assert.equal(result.actionable, true);
  assert.deepEqual(calls.find(call => call.visibility).visibility, { checkOpacity: true, checkVisibilityCSS: true });
});

test("descendant hit is valid and its identity is recorded", () => {
  const { node } = fixture({ descendant: true }); const result = inspectControlHit(node);
  assert.equal(result.actionable, true); assert.equal(result.candidates[0].hit.tagName, "span");
  assert.equal(result.candidates[0].hit.className, "link-text");
});

test("real overlay over every fragment remains rejected", () => {
  const { node } = fixture({ covered: true }); const result = inspectControlHit(node);
  assert.equal(result.inView, true); assert.equal(result.visible, true);
  assert.equal(result.hitTarget, false); assert.equal(result.actionable, false); assert.equal(result.pointerPoint, null);
  assert.ok(result.candidates.every(candidate => candidate.hit.id === "overlay" && !candidate.hitTarget));
});

test("offscreen and clipped union boxes remain rejected even with a visible fragment", () => {
  for (const union of [rect(-1, 40, 180, 30), rect(20, -1, 180, 30), rect(300, 40, 100, 30), rect(20, 830, 180, 30), rect(20, 900, 180, 30)]) {
    const { node } = fixture({ union }); const result = inspectControlHit(node);
    assert.equal(result.inView, false); assert.equal(result.actionable, false); assert.equal(result.pointerPoint, null);
  }
  const { node } = fixture({ union: rect(20, 820, 180, 60), fragments: [rect(20, 820, 180, 20), rect(20, 860, 50, 20)] });
  const result = inspectControlHit(node);
  assert.equal(result.hitTarget, true); assert.equal(result.inView, false);
  assert.equal(result.actionable, false); assert.equal(result.pointerPoint, null);
});

test("hidden, disabled and aria-disabled controls never expose a pointer point", () => {
  for (const options of [{ visible: false }, { disabled: true }, { ariaDisabled: "true" }]) {
    const { node } = fixture(options); const result = inspectControlHit(node);
    assert.equal(result.actionable, false); assert.equal(result.pointerPoint, null);
  }
});

test("empty, zero-area and unreliable rectangles cannot manufacture a hit", () => {
  for (const fragments of [[], [rect(20, 40, 0, 30)], [rect(20, 40, 180, 0)], [rect(NaN, 40, 180, 30)]]) {
    const { node } = fixture({ fragments }); const result = inspectControlHit(node);
    assert.equal(result.clientRects.length, 0); assert.equal(result.hitTarget, false);
    assert.equal(result.actionable, false); assert.equal(result.pointerPoint, null);
  }
});

test("first covered fragment does not hide a later genuine fragment", () => {
  const union = rect(20, 40, 180, 60), fragments = [rect(20, 40, 180, 20), rect(20, 80, 50, 20)];
  const { node, doc, overlay } = fixture({ union, fragments });
  doc.elementFromPoint = (x, y) => inside(fragments[1], x, y) ? node : overlay;
  const result = inspectControlHit(node);
  assert.equal(result.candidates[0].hitTarget, false); assert.equal(result.candidates[1].hitTarget, true);
  assert.deepEqual(result.pointerPoint, { x: 45, y: 90, rectIndex: 1 });
});

test("focus remains an independent observation and the inspector mutates nothing", () => {
  const { node, doc } = fixture({ focused: true });
  const result = inspectControlHit(node);
  assert.equal(result.focused, true); assert.equal(doc.activeElement, node);
  doc.activeElement = null; assert.equal(inspectControlHit(node).focused, false);
  assert.equal(typeof node.click, "undefined"); assert.equal(typeof node.focus, "undefined");
});

test("serialized function executes without imports or outer helper closures", () => {
  const serialized = Function(`"use strict"; return (${inspectControlHit.toString()});`)();
  const { node } = fixture(); assert.deepEqual(serialized(node), inspectControlHit(node));
});
