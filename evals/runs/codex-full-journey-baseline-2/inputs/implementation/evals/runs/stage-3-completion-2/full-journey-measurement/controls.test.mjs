// Deterministic injected clocks/DOM adapters only, no actual browser or sleeps.
import test from "node:test";
import assert from "node:assert/strict";
import { controlKey, assessControl } from "../../../lib/build-capture.mjs";
import { CONTROL_SETTLEMENT, observeSettlement, settlementMatches, exerciseSettledControl, findDeclaredPeer } from "./controls-lib.mjs";
const hash = "a".repeat(64);
function clockFor(position) {
  let time = 0;
  return { observe: async () => position(time), pause: async ms => { time += ms; }, now: () => time };
}
test("stationary scroll retains samples and the minimum observation interval", async () => {
  const result = await observeSettlement(clockFor(() => ({ x: 0, y: 100 })));
  assert.equal(result.settled, true); assert.equal(result.elapsedMs, 400); assert.ok(result.stableForMs >= 150); assert.equal(result.trajectory.length, 9);
});
test("long smooth movement is observed until a genuine stable destination", async () => {
  const result = await observeSettlement(clockFor(time => ({ x: 0, y: Math.min(600, time) })));
  assert.equal(result.settled, true); assert.equal(result.elapsedMs, 750); assert.equal(result.stableForMs, 150); assert.equal(result.trajectory.at(-1).y, 600);
});
test("ongoing motion reaches the bound and stays failed, including horizontal motion", async () => {
  for (const position of [time => ({ x: 0, y: time }), time => ({ x: time, y: 0 })]) { const result = await observeSettlement(clockFor(position)); assert.equal(result.settled, false); assert.equal(result.elapsedMs, 3000); assert.match(result.error, /bound/); }
});
test("slow drift cannot accumulate inside successive small per-sample tolerances", async () => {
  const result = await observeSettlement(clockFor(time => ({ x: 0, y: time * 0.008 })));
  assert.equal(result.settled, false);
});
test("invalid observation and late observation cannot become settlement", async () => {
  assert.equal((await observeSettlement(clockFor(() => ({ x: 0, y: NaN })))).settled, false);
  let now = 0; const result = await observeSettlement({ now: () => now, observe: async () => { now = 3001; return { x: 0, y: 0 }; }, pause: async ms => { now += ms; } }); assert.equal(result.settled, false);
});
const settled = y => ({ settled: true, elapsedMs: 400, stableForMs: 150, trajectory: [{ elapsedMs: 0, x: 0, y }, { elapsedMs: 400, x: 0, y }], policy: CONTROL_SETTLEMENT, error: null });
test("movement during an original screenshot invalidates its settled observation", () => {
  assert.equal(settlementMatches(settled(100), [{ scrollX: 0, scroll: 100 }, { scrollX: 0, scroll: 100 }]), true);
  assert.equal(settlementMatches(settled(100), [{ scrollX: 0, scroll: 100 }, { scrollX: 0, scroll: 101 }]), false);
  assert.equal(settlementMatches({ ...settled(100), settled: false }, [{ scrollX: 0, scroll: 100 }]), false);
  assert.equal(settlementMatches(settled(100), []), false);
});
function fixture({ preFails = false, postFails = false, imageDrift = false, noResponse = false, peerMode = null } = {}) {
  const events = [], resetFocusOptions = []; let activated = false, scroll = 100, focused = false, selected = !!peerMode, peerSelected = false;
  const control = { selector: "#go", tag: "button", type: null, role: "button", name: "Inspect", href: null, targetIds: "panel", beat: "middle", visible: true, disabled: false }; control.key = controlKey(control);
  const inspect = () => { events.push(activated ? "inspect-after" : "inspect-before"); return { html: "button", value: undefined, checked: undefined, location: "http://local/", scroll, scrollX: 0, state: { pressed: peerMode ? String(selected) : activated && !noResponse ? "true" : "false" }, targets: [{ id: "panel", exists: true, html: activated && !noResponse ? "new" : "old", containsCanvas: false, visible: true, inView: true }], hitTarget: true }; };
  const activate = async () => { events.push("activate"); activated = true; if (!noResponse) { scroll = 200; selected = true; } };
  const target = { count: async () => 1, scrollIntoViewIfNeeded: async () => {}, hover: async () => { events.push("hover"); }, click: activate,
    evaluate: async operation => { const code = operation.toString(); if (code.includes("html: node.outerHTML")) return inspect(); if (operation === findDeclaredPeer) return peerMode ? { index: 1, attribute: "aria-pressed", relationship: "same declared pressed-button group" } : null; if (code.includes('attribute === "checked"')) return String(selected); if (code.includes("document.activeElement === node")) return focused; throw new Error("Unexpected fake target observation"); } };
  const peerTarget = { click: async () => { events.push("prepare-peer"); peerSelected = true; if (peerMode !== "ineffective") selected = false; }, evaluate: async () => String(peerSelected) };
  const page = { locator: selector => selector === control.selector ? target : { evaluateAll: async () => [control], nth: () => peerTarget }, waitForTimeout: async () => {}, evaluate: async operation => {
    const original = globalThis.document;
    try { globalThis.document = { activeElement: { blur: () => { focused = false; } }, body: { focus: options => { events.push("focus-body"); resetFocusOptions.push(options); } } }; return operation(); }
    finally { if (original === undefined) delete globalThis.document; else globalThis.document = original; }
  }, keyboard: { press: async key => { if (key === "Tab") { events.push("Tab"); focused = true; } else await activate(); } } };
  const reset = async () => { events.push("reset"); activated = false; focused = false; scroll = 100; selected = !!peerMode; peerSelected = false; };
  const settle = async () => { events.push(activated ? "settle-after" : "settle-before"); return { ...settled(scroll), settled: activated ? !postFails : !preFails }; };
  const screenshot = async name => { events.push(name.endsWith("-after") ? "image-after" : "image-before"); if (imageDrift && name.endsWith("-after")) scroll += 5; return { sha256: hash }; };
  return { events, resetFocusOptions, run: () => exerciseSettledControl(page, control, screenshot, reset, [], { settle }) };
}
test("both modalities settle after focus/hover and activation, then retain post-image observations", async () => {
  const f = fixture(), result = await f.run(); assert.equal(result.trials.length, 2); assert.deepEqual(assessControl(result), []);
  for (const trial of result.trials) { assert.equal(trial.preActivationSettlement.settled, true); assert.equal(trial.postActivationSettlement.settled, true); assert.equal(trial.scrollSettled, true); assert.ok(trial.beforeImageObservation); assert.ok(trial.afterImageObservation); }
  const keyboardStart = f.events.lastIndexOf("reset"), keyboard = f.events.slice(keyboardStart); assert.ok(keyboard.indexOf("Tab") < keyboard.indexOf("settle-before")); assert.ok(keyboard.indexOf("settle-before") < keyboard.indexOf("image-before")); assert.ok(keyboard.indexOf("activate") < keyboard.indexOf("settle-after")); assert.ok(keyboard.indexOf("settle-after") < keyboard.indexOf("image-after")); assert.equal(keyboard.at(-1), "inspect-after");
});
test("artificial body-focus reset prevents scroll but target is still reached by actual Tab", async () => {
  const f = fixture(), result = await f.run(); assert.deepEqual(f.resetFocusOptions, [{ preventScroll: true }]);
  assert.equal(result.trials[1].tabPresses, 1); assert.ok(f.events.indexOf("focus-body") < f.events.indexOf("Tab")); assert.deepEqual(assessControl(result), []);
});
test("an unstable pre-activation baseline is retained but never activated", async () => {
  const f = fixture({ preFails: true }), result = await f.run(); assert.equal(f.events.includes("activate"), false); for (const trial of result.trials) { assert.equal(trial.activated, false); assert.ok(trial.beforeImage); assert.match(trial.error, /activation withheld/); } assert.ok(assessControl(result).length);
});
test("ongoing post-action motion retains original evidence but fails target response", async () => {
  const result = await fixture({ postFails: true }).run(); for (const trial of result.trials) { assert.ok(trial.afterImage && trial.afterImageObservation); assert.equal(trial.scrollSettled, false); assert.equal(trial.changed, false); assert.equal(trial.responseStatus, "unobserved"); assert.ok(trial.error); } assert.ok(assessControl(result).length);
});
test("screenshot-time drift and unchanged state remain failures", async () => {
  const drift = await fixture({ imageDrift: true }).run(); assert.ok(drift.trials.every(trial => !trial.scrollSettled && trial.error));
  const same = await fixture({ noResponse: true }).run(); assert.ok(same.trials.every(trial => trial.scrollSettled && !trial.changed)); assert.ok(assessControl(same).some(problem => problem.includes("no observable control response")));
});

function peerFixture({ groupRole = "group", sameGroup = true, otherValue = "false", disabled = false, visible = true, controls = null } = {}) {
  const group = { getAttribute: name => ({ role: groupRole, "aria-label": "Actual source group" })[name] ?? null }, parent = {};
  const make = (pressed, target) => ({ type: "button", disabled: target ? false : disabled, parentElement: parent, textContent: target ? "Command" : "Board", checkVisibility: () => target || visible,
    getAttribute: name => ({ "aria-pressed": pressed, "aria-controls": controls })[name] ?? null, hasAttribute: name => name === "aria-pressed" || name === "aria-controls" && !!controls,
    closest: () => groupRole && (target || sameGroup) ? group : null });
  const target = make("true", true), peer = make(otherValue, false); return { target, peer };
}
function observedPeer(options) {
  const { target, peer } = peerFixture(options), original = globalThis.document;
  try { globalThis.document = { querySelectorAll: () => [target, peer] }; return findDeclaredPeer(target); }
  finally { if (original === undefined) delete globalThis.document; else globalThis.document = original; }
}
test("selected pressed control can prepare an inactive peer in its actual declared group without aria-controls", () => {
  const peer = observedPeer(); assert.equal(peer.index, 1); assert.equal(peer.relationship, "same declared pressed-button group"); assert.equal(peer.peerLabel, "Board"); assert.equal(peer.attribute, "aria-pressed");
});
test("unrelated, already selected, disabled and hidden siblings are never guessed as preparatory peers", () => {
  for (const options of [{ groupRole: null }, { sameGroup: false }, { otherValue: "true" }, { disabled: true }, { visible: false }]) assert.equal(observedPeer(options), null);
  assert.equal(observedPeer({ groupRole: null, controls: "panel" }).relationship, "same declared controlled target");
});
test("declared peer preparation must actually deselect the target, then the target still has to respond", async () => {
  const good = await fixture({ peerMode: "effective" }).run(); assert.deepEqual(assessControl(good), []); assert.ok(good.trials.every(trial => trial.peerPreparation.verified && trial.before.state.pressed === "false" && trial.after.state.pressed === "true"));
  const ineffective = fixture({ peerMode: "ineffective" }), failed = await ineffective.run(); assert.equal(ineffective.events.includes("activate"), false); assert.ok(failed.trials.every(trial => !trial.peerPreparation.verified && trial.error));
  const unchanged = await fixture({ peerMode: "effective", noResponse: true }).run(); assert.ok(unchanged.trials.every(trial => trial.peerPreparation.verified && !trial.changed)); assert.ok(assessControl(unchanged).length);
});
