import test from "node:test";
import assert from "node:assert/strict";
import { artifactHashes, assessObservation, buildCases, fixedCommands, linkTextMatches, outsideWorkspace, requestFailureReason, scrollSamples, validateExpectations, verifyNextRuntime } from "./build-check.mjs";

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

const nextIdentity = root => ({ name: "next", version: "16.3.8", entrypoint: `${root}/node_modules/next/dist/bin/next`, packageJson: `${root}/node_modules/next/package.json`, sha256: "a".repeat(64) });

test("identical Next copies select the workspace runtime for typegen and build", () => {
  const local = nextIdentity("/actor");
  const trusted = nextIdentity("/coordinator");
  const verified = verifyNextRuntime("/actor", local, trusted);
  assert.equal(verified.passed, true);
  assert.equal(verified.entrypoint, local.entrypoint);
  assert.notEqual(verified.entrypoint, trusted.entrypoint);
  const commands = fixedCommands({ next: verified.entrypoint, typescript: "/coordinator/tsc", eslint: "/coordinator/eslint", typescriptConfig: "/evidence/tsconfig.json", eslintConfig: "/evidence/eslint.mjs" });
  assert.deepEqual(commands.filter(command => ["typegen", "build"].includes(command.id)).map(command => command.args[0]), [local.entrypoint, local.entrypoint]);
  assert.equal(commands[1].args[0], "/coordinator/tsc");
  assert.equal(commands[2].args[0], "/coordinator/eslint");
  assert.match(verified.scope, /transitive dependency integrity is not established/);
});

test("changed Next version or CLI bytes cannot produce an executable entrypoint", () => {
  const local = nextIdentity("/actor");
  const trusted = nextIdentity("/coordinator");
  for (const [change, message] of [[{ version: "16.3.9" }, /version differs/], [{ sha256: "b".repeat(64) }, /entrypoint differs/]]) {
    const result = verifyNextRuntime("/actor", { ...local, ...change }, trusted);
    assert.equal(result.passed, false);
    assert.equal(result.entrypoint, null);
    assert.match(result.problems.join(), message);
  }
});

test("Next verification rejects actor-owned trust and malformed identities", () => {
  const local = nextIdentity("/actor");
  const trusted = nextIdentity("/coordinator");
  for (const untrusted of [local, { ...trusted, packageJson: local.packageJson }]) {
    const result = verifyNextRuntime("/actor", local, untrusted);
    assert.equal(result.entrypoint, null);
    assert.match(result.problems.join(), /outside the actor workspace/);
  }
  for (const invalid of [null, { ...local, name: "pretend-next" }, { ...local, entrypoint: 5 }, { ...local, packageJson: "relative.json" }, { ...local, sha256: ["a".repeat(64)] }]) {
    const result = verifyNextRuntime("/actor", invalid, trusted);
    assert.equal(result.passed, false);
    assert.equal(result.entrypoint, null);
    assert.match(result.problems.join(), /identity is invalid/);
  }
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

test("observed arrow and accurate file-format suffixes preserve the approved link label", () => {
  const cases = [
    ["Email Ada ↗", { text: "Email Ada", href: "mailto:ada@example.com" }],
    ["Download CV HTML ↓", { text: "Download CV", href: "/ada-mensah-cv.html" }],
    ["View power-state schematic ↗", { text: "View power-state schematic", href: "/assets/power-states.svg" }],
    ["View fixture schematic ↗", { text: "View fixture schematic", href: "/assets/bring-up-fixture.svg" }],
    ["Download CV (PDF) ↓", { text: "Download CV", href: "/cv.pdf?download=true" }],
  ];
  for (const [text, link] of cases) assert.equal(linkTextMatches(text, link), true, text);
  const labelled = { ...expected, links: cases.map(([, link]) => link) };
  const actual = report();
  for (const item of actual.samples) item.links = cases.map(([text, link]) => ({ text, href: link.href, visible: true, inView: true, tabIndex: 0, hitTarget: true }));
  assert.deepEqual(assessObservation(labelled, entry, actual), []);
});

test("link suffix matching rejects misleading text and retains destination and usability checks", () => {
  const link = { text: "Download CV", href: "/ada-mensah-cv.html" };
  for (const text of ["Do not Download CV", "Download CV is unavailable", "Download CV for someone else", "Download CVHTML", "Download CV PDF ↓", "Download CV HTML elsewhere", "Download CVs"]) {
    assert.equal(linkTextMatches(text, link), false, text);
  }
  assert.equal(linkTextMatches("Email HTML", expected.links[0]), false);
  for (const [key, value] of [["href", "/someone-else.html"], ["visible", false], ["inView", false], ["hitTarget", false], ["tabIndex", -1]]) {
    const actual = report();
    for (const item of actual.samples) item.links = [{ text: "Download CV HTML ↓", href: link.href, visible: true, inView: true, tabIndex: 0, hitTarget: true, [key]: value }];
    assert.match(assessObservation({ ...expected, links: [link] }, entry, actual).join(), /link never usable/, key);
  }
});

test("keyboard-only links require actual focused, visible observations", () => {
  const keyboard = { ...expected, links: [{ ...expected.links[0], keyboardOnly: true }] };
  const actual = report();
  assert.match(assessObservation(keyboard, entry, actual).join(), /by keyboard/);
  actual.keyboardLinks = [{ ...actual.samples[0].links[0], focused: true }];
  assert.deepEqual(assessObservation(keyboard, entry, actual), []);
  actual.keyboardLinks[0].text += " ↗";
  assert.deepEqual(assessObservation(keyboard, entry, actual), []);
  actual.keyboardLinks[0].focused = false;
  assert.match(assessObservation(keyboard, entry, actual).join(), /by keyboard/);
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
