import test from "node:test";
import assert from "node:assert/strict";
import { assessControl, assessDiagnosticCapture, controlKey, diagnosticPlan, validateFocusOnlyControls } from "./build-capture.mjs";
import { assessObservation, buildCases, validateExpectations } from "./build-check.mjs";

const ids = ["question", "scheduling", "bench", "evidence", "scope"];
const sha = "a".repeat(64);
const expected = {
  schemaVersion: 2, taskKind: "prototype-depth", id: "tiny-depth", route: "/",
  beats: ids.map((id, index) => ({ id, headingLevel: index ? 2 : 1 })),
  requiredText: [], links: [], assets: [],
  modes: { desktop: "animated", mobile: "animated", short: "animated", reducedMotion: "animated", noWebGL: "static", noJavaScript: "static" },
  viewports: { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 }, short: { width: 1280, height: 720 } },
};
const boxes = ids.map((id, index) => ({ id, top: index * 1800, height: 1800 }));
const plan = diagnosticPlan(ids, boxes, 900, 8100, "animated");
const entry = buildCases(expected)[0];
const good = () => ({
  beatIds: ids, h1: 1, lang: "en", duplicateIds: [], errors: [],
  samples: expected.beats.map(beat => ({ beat: beat.id, position: "rest", scene: "on", visibleCanvases: 1, headings: [{ text: `Fresh words for ${beat.id}`, level: beat.headingLevel, visible: true }] })),
  rests: plan.rests.map(rest => ({ beat: rest.beat, requestedScroll: rest.end, actualScroll: rest.end, file: `${rest.beat}.png`, sha256: sha, scene: "on" })),
  motion: plan.intervals.map(interval => ({ ...interval, completed: true, trajectory: [1, 2, 3], frames: [0.2, 0.5, 0.8].map(fraction => ({ fraction, actualScroll: interval.start + fraction * (interval.end - interval.start), moving: true, after: { moving: true, scroll: interval.start + fraction * (interval.end - interval.start) }, file: `${fraction}.jpg`, sha256: sha })) })),
  controls: [], controlInventory: [], controlInventoryComplete: true,
});
const trial = method => ({ method, activated: true, reached: true, hitTarget: true, changed: true, beforeImage: sha, afterImage: sha, targets: [{ id: "output", exists: true, changed: true }] });
const control = () => ({ key: "control-0", name: "Inspect the board", trials: [trial("pointer"), trial("keyboard")] });

test("diagnostic expectations permit original wording but freeze structural headings and seven conditions", () => {
  assert.deepEqual(validateExpectations(expected), []);
  assert.deepEqual(buildCases(expected).map(entry => entry.id), ["desktop", "mobile", "short", "reduced-motion", "no-webgl", "no-javascript", "context-loss"]);
  assert.deepEqual(assessObservation(expected, entry, good()), []);
  for (const change of [ { taskKind: "stop-4" }, { beats: expected.beats.toReversed() }, { beats: [{ ...expected.beats[0], heading: "Copy this" }, ...expected.beats.slice(1)] }, { viewports: { ...expected.viewports, short: { width: 1400, height: 900 } } } ]) assert.ok(validateExpectations({ ...expected, ...change }).length);
  for (const beats of [null, {}, "invalid", [null], [1]]) assert.ok(validateExpectations({ ...expected, beats }).length);
});

test("authored but empty, hidden or incorrectly levelled diagnostic headings fail", () => {
  for (const change of [{ text: " " }, { visible: false }, { level: 4 }]) {
    const actual = good(); Object.assign(actual.samples[1].headings[0], change);
    assert.match(assessObservation(expected, entry, actual).join(), /missing visible heading/);
  }
});

test("geometry uses frozen IDs and measured boxes, not actor formations", () => {
  assert.deepEqual(plan.intervals.map(interval => interval.direction), ["forward", "forward", "forward", "forward", "reverse", "reverse", "reverse", "reverse"]);
  assert.deepEqual(plan.intervals[0], { from: "question", to: "scheduling", start: 900, end: 1260, direction: "forward" });
  assert.throws(() => diagnosticPlan(ids, boxes.slice(1), 900, 8100, "animated"), /IDs\/order/);
  assert.throws(() => diagnosticPlan(ids, boxes.toReversed(), 900, 8100, "animated"), /IDs\/order/);
  assert.throws(() => diagnosticPlan(ids, boxes, 900, 0, "animated"), /positive travel/);
});

test("missing beat or original cannot pass diagnostic rest completeness", () => {
  for (const corrupt of [report => report.rests.pop(), report => { report.rests[2].sha256 = null; }, report => { report.rests[1].actualScroll += 100; }]) {
    const actual = good(); corrupt(actual);
    assert.ok(assessDiagnosticCapture(expected, entry, actual).length);
  }
});

test("motion intervals cannot be omitted, reordered, reversed or replaced with settled frames", () => {
  for (const corrupt of [report => report.motion.pop(), report => report.motion.reverse(), report => { report.motion[0].end = 0; }, report => report.motion[0].frames.pop(), report => { report.motion[0].frames[1].actualScroll = report.motion[0].frames[0].actualScroll; }, report => { report.motion[0].frames[0].moving = false; }, report => { report.motion[0].completed = false; }]) {
    const actual = good(); corrupt(actual);
    assert.ok(assessDiagnosticCapture(expected, entry, actual).length);
  }
});

test("every post-context-loss beat must have a real fallback capture", () => {
  const loss = buildCases(expected).find(entry => entry.loseContext);
  const actual = good(); actual.contextLoss = { supported: true };
  for (const rest of actual.rests) Object.assign(rest, { afterContextLoss: true, scene: "off" });
  assert.deepEqual(assessDiagnosticCapture(expected, loss, actual), []);
  actual.rests[3].afterContextLoss = false;
  assert.match(assessDiagnosticCapture(expected, loss, actual).join(), /post-context-loss/);
  actual.rests.pop();
  assert.match(assessDiagnosticCapture(expected, loss, actual).join(), /rest captures/);
});

test("reduced-motion stillness requires five timed, unchanged pairs even for static fallback", () => {
  for (const mode of ["animated", "static"]) {
    const reduced = { id: "reduced-motion", reducedMotion: true, mode };
    const actual = good();
    assert.match(assessDiagnosticCapture(expected, reduced, actual).join(), /every beat/);
    actual.stationary = ids.map(beat => ({ beat, before: sha, after: sha, elapsedMs: 400 }));
    assert.deepEqual(assessDiagnosticCapture(expected, reduced, actual), []);
    actual.stationary[2].after = "b".repeat(64);
    assert.match(assessDiagnosticCapture(expected, reduced, actual).join(), /changed reduced-motion/);
  }
});

test("every discovered control needs actual pointer and keyboard evidence", () => {
  assert.deepEqual(assessControl(control()), []);
  for (const change of [{ reached: false }, { activated: false }, { hitTarget: false }, { beforeImage: null }, { changed: false }]) {
    const actual = control(); Object.assign(actual.trials[0], change);
    assert.ok(assessControl(actual).length);
  }
  const actual = control(); actual.trials.pop();
  assert.match(assessControl(actual).join(), /missing pointer or keyboard/);
});

test("wrong or non-responding declared control targets fail even when the button changes", () => {
  for (const change of [{ exists: false }, { changed: false }]) {
    const actual = control(); Object.assign(actual.trials[0].targets[0], change);
    assert.match(assessControl(actual).join(), /control target/);
  }
});

test("canvas target meaning remains unobserved rather than inferred from hover or pixel changes", () => {
  const actual = control();
  for (const trial of actual.trials) Object.assign(trial, { changed: false, pixelsChanged: true, responseStatus: "unobserved", targets: [{ id: "canvas", exists: true, changed: false, requiresVisualReview: true }] });
  assert.deepEqual(assessControl(actual), []);
  actual.trials[0].responseStatus = "pass";
  assert.match(assessControl(actual).join(), /must remain unobserved/);
});

test("no implemented controls is allowed only after a complete inventory", () => {
  const actual = good(); actual.controlInventoryComplete = false;
  assert.match(assessDiagnosticCapture(expected, entry, actual).join(), /inventory is incomplete/);
  actual.controlInventoryComplete = true;
  actual.controlInventory = [{ key: "omitted-control" }];
  assert.match(assessDiagnosticCapture(expected, entry, actual).join(), /complete unique inventory/);
});

test("reused selector indices cannot hide controls replaced between beats", () => {
  const first = { index: 0, selector: "main > button", tag: "button", name: "Inspect command", targetIds: "command", beat: "question" };
  assert.notEqual(controlKey(first), controlKey({ ...first, name: "Inspect board", targetIds: "board", beat: "bench" }));
  assert.equal(controlKey(first), controlKey({ ...first, index: 9, observedScroll: 800 }));
});

const skipDeclaration = { selector: "#skip", name: "Skip to answer", href: "#answer", reason: "Reviewed bypass link revealed by keyboard focus" };
const geometry = () => ({ geometry: { x: 8, y: 8, width: 140, height: 40 }, viewport: { width: 390, height: 844 }, visible: true, inView: true, intersectsViewport: true, hitTarget: true, focused: true, disabled: false });
const skip = () => ({
  key: "skip-key", tag: "a", selector: skipDeclaration.selector, name: skipDeclaration.name, href: skipDeclaration.href,
  trials: [
    { method: "pointer", applicability: "not-applicable", activated: false, reached: false, hitTarget: false, declaration: { ...skipDeclaration }, unfocused: { ...geometry(), geometry: { x: 8, y: -90, width: 140, height: 40 }, inView: false, intersectsViewport: false, hitTarget: false, focused: false }, unfocusedImage: sha },
    { ...trial("keyboard"), tabPresses: 1, before: geometry(), after: { targets: [{ id: "answer", exists: true, inView: true, visible: true }] }, targets: [{ id: "answer", exists: true, changed: true }] },
  ],
});

test("focus-only declaration is optional, strictly typed, unique and schema-2-only", () => {
  assert.deepEqual(validateFocusOnlyControls(undefined), []);
  assert.deepEqual(validateExpectations({ ...expected, focusOnlyControls: [skipDeclaration] }), []);
  for (const value of [null, {}, [null], [{ ...skipDeclaration, keyboardOnly: true }], [{ ...skipDeclaration, reason: "" }], [{ ...skipDeclaration, href: "https://example.test/" }], [{ ...skipDeclaration, href: "#" }], [{ ...skipDeclaration, href: "#%xx" }], [skipDeclaration, skipDeclaration]]) assert.ok(validateFocusOnlyControls(value).length, JSON.stringify(value));
  assert.match(validateExpectations({ ...expected, schemaVersion: 1, focusOnlyControls: [] }).join(), /unknown expectations key: focusOnlyControls/);
});

test("only independent authority and actual focus/target evidence allow a not-applicable pointer route", () => {
  assert.deepEqual(assessControl(skip(), [skipDeclaration]), []);
  assert.match(assessControl(skip()).join(), /invalid focus-only pointer applicability/);
  for (const change of [{ selector: "#different" }, { name: "Different link" }, { href: "#wrong" }, { tag: "button" }]) {
    assert.match(assessControl({ ...skip(), ...change }, [skipDeclaration]).join(), /invalid focus-only pointer applicability/);
  }
});

test("pointer exemption needs original unfocused geometry and cannot waive a covered visible control", () => {
  for (const mutate of [
    control => { delete control.trials[0].unfocusedImage; },
    control => { delete control.trials[0].unfocused.geometry; },
    control => { control.trials[0].unfocused.geometry.x = NaN; },
    control => { control.trials[0].unfocused.focused = true; },
    control => { control.trials[0].unfocused.disabled = true; },
    control => { control.trials[0].unfocused.intersectsViewport = true; },
    control => { control.trials[0].activated = true; },
    control => { control.trials[0].hitTarget = true; },
    control => { control.trials[0].changed = true; },
    control => { control.trials[0].declaration.reason = "Actor wrote this"; },
  ]) {
    const actual = skip(); mutate(actual);
    assert.match(assessControl(actual, [skipDeclaration]).join(), /invalid focus-only pointer applicability/);
  }
});

test("focus-only keyboard trial cannot omit visibility, Tab, screenshots or actual fragment response", () => {
  for (const mutate of [
    control => { delete control.trials[1].before; },
    control => { control.trials[1].before.visible = false; },
    control => { control.trials[1].before.inView = false; },
    control => { control.trials[1].before.hitTarget = false; },
    control => { control.trials[1].before.focused = false; },
    control => { control.trials[1].before.disabled = true; },
    control => { control.trials[1].tabPresses = 0; },
    control => { delete control.trials[1].afterImage; },
    control => { control.trials[1].targets[0].exists = false; },
    control => { control.trials[1].targets[0].changed = false; },
    control => { control.trials[1].targets[0].id = "wrong"; },
    control => { control.trials[1].after.targets[0].inView = false; },
    control => { control.trials[1].after.targets[0].visible = false; },
    control => { delete control.trials[1].targets; },
  ]) {
    const actual = skip(); mutate(actual);
    assert.ok(assessControl(actual, [skipDeclaration]).length);
  }
});

test("missing, duplicate and unknown trial records fail for ordinary and focus-only controls", () => {
  for (const create of [control, skip]) for (const mutate of [actual => actual.trials.pop(), actual => actual.trials.push(actual.trials[0]), actual => { actual.trials[0].method = "touch"; }]) {
    const actual = create(); mutate(actual);
    assert.match(assessControl(actual, [skipDeclaration]).join(), /missing pointer or keyboard trial/);
  }
});

test("focus-only declarations cannot hide missing or duplicated inventory controls", () => {
  const capture = good(); capture.controlInventory = [skip()]; capture.controls = [skip()];
  const declared = { ...expected, focusOnlyControls: [skipDeclaration] };
  assert.deepEqual(assessDiagnosticCapture(declared, entry, capture), []);
  for (const mutate of [actual => { actual.controlInventory = []; actual.controls = []; }, actual => actual.controlInventory.push(skip()), actual => actual.controls.push(skip())]) {
    const actual = structuredClone(capture); mutate(actual);
    assert.ok(assessDiagnosticCapture(declared, entry, actual).length);
  }
});
