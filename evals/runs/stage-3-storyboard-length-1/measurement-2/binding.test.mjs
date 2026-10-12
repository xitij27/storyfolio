import assert from "node:assert/strict";
import test from "node:test";
import { assertBindingDelta, prefix, assertSchedule } from "./binding-lib.mjs";
import { assertControlTrials } from "./verify.mjs";

test("replacement changes only the ordinary output, never source, targets or actor evidence", () => {
  const previous = { output: prefix + "concepts-1", turn: 2, targets: { path: "actual.json", sha256: "a".repeat(64) }, actorResultSha256: "b".repeat(64) };
  const current = { ...structuredClone(previous), output: prefix + "concepts-2" };
  assert.doesNotThrow(() => assertBindingDelta(previous, current));
  for (const change of [{ output: previous.output }, { turn: 4 }, { targets: {} }, { actorResultSha256: "c".repeat(64) }, { extra: "payload" }])
    assert.throws(() => assertBindingDelta(previous, { ...current, ...change }));
});
test("replacement schedule still requires every exact target and both viewports", () => {
  const targets = { alternatives: Array.from({ length: 9 }, (_, i) => ({ id: "choice-" + i })) };
  const schedule = targets.alternatives.map((item, i) => ({ id: i + 1, alternativeId: item.id, modes: ["desktop", "phone"] }));
  assert.doesNotThrow(() => assertSchedule(schedule, targets));
  assert.throws(() => assertSchedule(schedule.slice(1), targets));
  assert.throws(() => assertSchedule(schedule.map(row => ({ ...row, modes: ["phone"] })), targets));
});
function report() {
  const viewport = { width: 390, height: 844 }, point = { x: 110, y: 55, rectIndex: 0 };
  return { viewport, controls: ["pointer", "keyboard"].map(method => ({
    method, geometry: { visible: true, inView: true, hitTarget: true, actionable: true, disabled: false, focused: method === "keyboard", viewport,
      pointerPoint: point, candidates: [{ ...point, inViewport: true, rectInView: true, hitTarget: true, hit: { tagName: "a" } }],
      clientRects: [{ index: 0, x: 20, y: 40, width: 180, height: 30 }] },
    pointerActivation: method === "pointer" ? point : undefined, tabPresses: 2, activationKey: "Enter",
    activated: true, identityChanged: true, beforeImage: {}, afterImage: {}
  })) };
}
test("saved real-hit evidence binds exact pointer activation and genuine keyboard focus", () => {
  assert.doesNotThrow(() => assertControlTrials(report()));
  for (const mutate of [
    r => { r.controls[0].geometry.pointerPoint = null; },
    r => { r.controls[0].pointerActivation = { x: 111, y: 55, rectIndex: 0 }; },
    r => { r.controls[0].geometry.candidates[0].hitTarget = false; },
    r => { r.controls[0].geometry.clientRects[0].width = 0; },
    r => { r.controls[0].geometry.visible = false; },
    r => { r.controls[0].geometry.inView = false; },
    r => { r.controls[0].geometry.disabled = true; },
    r => { r.controls[0].geometry.actionable = false; },
    r => { r.controls[1].geometry.focused = false; },
    r => { r.controls[1].tabPresses = 0; },
    r => { r.controls[1].activationKey = "Escape"; },
    r => { r.controls[1].identityChanged = false; },
    r => { delete r.controls[1].afterImage; },
  ]) { const r = report(); mutate(r); assert.throws(() => assertControlTrials(r)); }
});
