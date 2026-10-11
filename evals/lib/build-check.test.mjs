import test from "node:test";
import assert from "node:assert/strict";
import { artifactHashes, assessObservation, buildCases, fixedCommands, outsideWorkspace, requestFailureReason, scrollSamples, validateExpectations } from "./build-check.mjs";

const expected = {
  schemaVersion: 1, id: "test-story", route: "/",
  beats: [{ id: "start.open", heading: "Start here" }, { id: "end.close", heading: "The supported answer" }],
  requiredText: ["Only supported facts."],
  links: [{ text: "Email", href: "mailto:person@example.com" }],
  assets: ["public/cv.html"], requiredFiles: ["docs/story/assets.md"],
  modes: { desktop: "animated", mobile: "static", reducedMotion: "static", noWebGL: "static", noJavaScript: "static" },
  viewports: { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } },
};
const entry = buildCases(expected)[0];
const sample = beat => ({
  beat: beat.id, position: "end", scene: "on", visibleCanvases: 1,
  headings: [{ text: beat.heading, visible: true }], visibleText: "Only supported facts.",
  links: [{ text: "Email", href: "mailto:person@example.com", visible: true, inView: true, tabIndex: 0, hitTarget: true }],
});
const report = () => ({ beatIds: expected.beats.map(beat => beat.id), h1: 1, lang: "en", duplicateIds: [], samples: expected.beats.map(sample), errors: [] });

test("fixed expectations reject unknown versions, misspelled fields, duplicates and unsafe paths", () => {
  assert.deepEqual(validateExpectations(expected), []);
  assert.match(validateExpectations({ ...expected, schemaVersion: 2 }).join(), /schemaVersion/);
  assert.match(validateExpectations({ ...expected, approvedIds: [] }).join(), /unknown/);
  assert.match(validateExpectations({ ...expected, beats: [expected.beats[0], expected.beats[0]] }).join(), /unique/);
  assert.match(validateExpectations({ ...expected, assets: ["../secret"] }).join(), /traversal/);
  assert.match(validateExpectations({ ...expected, route: "https://elsewhere.example" }).join(), /local URL/);
  assert.match(validateExpectations({ ...expected, modes: { ...expected.modes, noJavaScript: "animated" } }).join(), /static content/);
  assert.match(validateExpectations({ ...expected, requiredText: [] }).join(), /nonempty/);
});

test("coordinator paths cannot be inside or identical to the actor root", () => {
  assert.equal(outsideWorkspace("/repo/work", "/repo/work"), false);
  assert.equal(outsideWorkspace("/repo/work", "/repo/work/check.mjs"), false);
  assert.equal(outsideWorkspace("/repo/work", "/repo/workspace/check.mjs"), true);
  assert.equal(outsideWorkspace("/repo/work", "/repo/check.mjs"), true);
});

test("artifact hashes preserve binary evidence and expose report tampering without self-hashing", () => {
  const original = [{ path: "desktop/report.json", bytes: Buffer.from('{"passed":false}') }, { path: "desktop/shot.png", bytes: Buffer.from([0, 255, 19]) }, { path: "manifest.json", bytes: Buffer.from("not recursively hashed") }];
  const result = artifactHashes(original);
  assert.deepEqual(Object.keys(result), ["desktop/report.json", "desktop/shot.png"]);
  assert.notEqual(result["desktop/shot.png"], artifactHashes([{ path: "desktop/shot.png", bytes: Buffer.from([0, 254, 19]) }])["desktop/shot.png"]);
  assert.notEqual(result["desktop/report.json"], artifactHashes([{ path: "desktop/report.json", bytes: Buffer.from('{"passed":true}') }])["desktop/report.json"]);
  assert.throws(() => artifactHashes([{ path: "../escape", bytes: Buffer.from("x") }]), /Unsafe/);
  assert.throws(() => artifactHashes([original[0], original[0]]), /Duplicate/);
});

test("fixed commands ignore a tampered actor package checker and script aliases", () => {
  const paths = { next: "/deps/next", typescript: "/deps/tsc", eslint: "/deps/eslint", typescriptConfig: "/coordinator/tsconfig.json", eslintConfig: "/coordinator/eslint.mjs", scripts: { build: "exit 0", check: "echo PASS" }, checker: "/work/scripts/check.mjs" };
  const commands = fixedCommands(paths);
  assert.deepEqual(commands.map(command => command.id), ["typegen", "typecheck", "lint", "build"]);
  assert.deepEqual(commands[3].args, ["/deps/next", "build"]);
  assert.ok(commands[2].args.includes("--no-config-lookup"));
  assert.equal(JSON.stringify(commands).includes("exit 0"), false);
  assert.equal(JSON.stringify(commands).includes("/work/scripts/check.mjs"), false);
});

test("one-screen animated beats sample their actual rest rather than three copies of arrival", () => {
  const boxes = [{ id: "opening", top: 80, height: 1800 }, { id: "middle", top: 1880, height: 900 }];
  assert.deepEqual(scrollSamples(boxes, 900, "animated"), [
    { id: "opening", start: 80, mid: 530, end: 980 },
    { id: "middle", start: 1340, mid: 1610, end: 1880 },
  ]);
  assert.deepEqual(scrollSamples(boxes, 900, "static")[1], { id: "middle", start: 1880, mid: 1880, end: 1880 });
});

test("missing or reordered beat cannot pass through actor-derived expectations", () => {
  assert.deepEqual(assessObservation(expected, entry, report()), []);
  const missing = report(); missing.beatIds.pop(); missing.samples.pop();
  assert.match(assessObservation(expected, entry, missing).join(), /beat IDs\/order differ/);
  assert.match(assessObservation(expected, entry, missing).join(), /no sample for end.close/);
  const reordered = report(); reordered.beatIds.reverse();
  assert.match(assessObservation(expected, entry, reordered).join(), /beat IDs\/order differ/);
});

test("hidden, offscreen, occluded and unfocusable links all fail", () => {
  for (const [key, value] of [["visible", false], ["inView", false], ["hitTarget", false], ["tabIndex", -1]]) {
    const actual = report();
    for (const item of actual.samples) item.links[0][key] = value;
    assert.match(assessObservation(expected, entry, actual).join(), /link never usable/);
  }
});

test("keyboard-only links require actual focused, visible observations", () => {
  const keyboard = { ...expected, links: [{ ...expected.links[0], keyboardOnly: true }] };
  const actual = report();
  assert.match(assessObservation(keyboard, entry, actual).join(), /by keyboard/);
  actual.keyboardLinks = [{ ...actual.samples[0].links[0], focused: true }];
  assert.deepEqual(assessObservation(keyboard, entry, actual), []);
});

test("static mobile expectations fail a still-running visible canvas", () => {
  const mobile = buildCases(expected).find(item => item.id === "mobile");
  assert.equal(mobile.mode, "static");
  assert.match(assessObservation(expected, mobile, report()).join(), /expected scene off/);
  const staticReport = report();
  for (const item of staticReport.samples) { item.scene = "off"; item.visibleCanvases = 0; }
  assert.deepEqual(assessObservation(expected, mobile, staticReport), []);
});

test("wording in hidden DOM or screenshot-only text is not accepted as visible HTML", () => {
  const actual = report();
  for (const item of actual.samples) { item.visibleText = "Other words"; item.headings[0].visible = false; }
  const problems = assessObservation(expected, entry, actual).join();
  assert.match(problems, /required wording never visibly observed/);
  assert.match(problems, /missing visible heading/);
});

test("inline emphasis separators do not turn matching approved words into a miss", () => {
  const actual = report();
  for (const item of actual.samples) item.visibleText = "Only  supported\n facts .";
  assert.deepEqual(assessObservation(expected, entry, actual), []);
});

test("fallback probes and browser failures cannot silently pass", () => {
  const loss = buildCases(expected).find(item => item.loseContext);
  const actual = report();
  actual.contextLoss = { supported: false };
  actual.errors = ["request failed: missing image"];
  actual.stationary = [{ beat: "start.open", before: "a", after: "b" }];
  const problems = assessObservation(expected, loss, actual).join();
  assert.match(problems, /context loss was not exercised/);
  assert.match(problems, /request failed/);
  assert.match(problems, /changed while stationary/);
});

test("only the precise no-JavaScript preload CSP case is expected", () => {
  const record = { url: "http://127.0.0.1:3000/_next/static/chunks/main.js", resourceType: "script", failure: "net::ERR_BLOCKED_BY_CSP" };
  const url = "http://127.0.0.1:3000/";
  assert.ok(requestFailureReason(record, { noJavaScript: true }, url));
  assert.ok(requestFailureReason({ ...record, failure: "csp" }, { noJavaScript: true }, url));
  assert.equal(requestFailureReason(record, {}, url), null);
  assert.equal(requestFailureReason({ ...record, failure: "net::ERR_FAILED" }, { noJavaScript: true }, url), null);
  assert.equal(requestFailureReason({ ...record, url: "https://external.example/_next/static/chunks/main.js" }, { noJavaScript: true }, url), null);
  assert.equal(requestFailureReason({ ...record, url: "http://127.0.0.1:3000/image.svg", resourceType: "image" }, { noJavaScript: true }, url), null);
});
