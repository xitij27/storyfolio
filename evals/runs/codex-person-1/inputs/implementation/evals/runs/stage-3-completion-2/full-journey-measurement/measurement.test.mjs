// No browser, build, installer, model, subprocess or actor workspace access.
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateTargets, observationProblems, gateDisposition, units, bounds, modeCases, imageName, wholeText, reserveImage, observeWording, assertCoverage, assertUnitCoverage, assessGateReport, assessWording, activationKey, openCaptureLogs } from "./measurement-lib.mjs";
import { assertExtras, assertSnapshot, assertSupervisor, hash, metadataPath } from "./binding-lib.mjs";
const policy = JSON.parse(await readFile(new URL("policy.json", import.meta.url)));
const digest = "a".repeat(64), other = "b".repeat(64), copy = value => structuredClone(value);
const base = stage => ({ schemaVersion: 1, measurement: "full-journey", stage, sourceDigest: digest, actorResultSha256: other, discovery: { reviewer: "coordinator", exhaustive: true, sources: [{ path: "app/page.tsx", sha256: digest }] }, eligibility: { disposition: "implemented-output", authoredApplication: true, rationale: "Authored source exists, no runtime claim" } });
function gates(stage = 2, count = stage === 2 ? 3 : 2) {
  return { ...base(stage), alternatives: Array.from({ length: count }, (_, i) => ({ id: `choice-${i}`, advertised: true, route: `/concept-${i}`, control: { selector: `#choice-${i}`, name: `Choice ${i}`, fromRoute: "/" }, beats: { opening: `a-${i}`, middle: `b-${i}`, ending: `c-${i}` }, meaning: `Distinct observed source concept ${i}` })) };
}
function final(count = 12) {
  return { ...base(6), route: "/", beats: Array.from({ length: count }, (_, i) => ({ id: `actual-${i}`, headingLevel: i ? 2 : 1, meaning: `Meaning ${i}` })), approvedBeats: Array.from({ length: count }, (_, i) => ({ meaning: `Approved ${i}`, actualId: `actual-${i}` })),
    requiredText: ["Complete first paragraph. Complete second paragraph."], selectedWording: { record: { path: "evals/runs/journey/selection.json", sha256: digest }, versions: [{ meaning: "Approved 0", version: "B", text: "Complete first paragraph. Complete second paragraph." }] }, links: [], assets: [], requiredFiles: [], auxiliaryPages: [] };
}
test("three concepts retain per-concept IDs, actual routes and choosers", () => { assert.deepEqual(validateTargets(gates()), []); assert.notEqual(gates().alternatives[0].beats.middle, gates().alternatives[1].beats.middle); });
test("all looks remain valid observed inputs, wrong counts become failures rather than omissions", () => {
  for (const [stage, count] of [[2, 2], [2, 4], [4, 1], [4, 4]]) { const target = gates(stage, count); assert.deepEqual(validateTargets(target), []); assert.equal(target.alternatives.length, count); assert.match(observationProblems(target, policy)[0], /alternative count/); }
});
test("missing three-point content remains observable and cannot pass", () => { const target = gates(); target.alternatives[0].beats.middle = null; assert.deepEqual(validateTargets(target), []); assert.match(observationProblems(target, policy)[0], /missing middle/); });
test("12 to 22 arbitrary final beats, never five fixed IDs", () => { for (const count of [12, 22]) { assert.deepEqual(validateTargets(final(count)), []); assert.deepEqual(observationProblems(final(count), policy), []); } const excess = final(23); assert.deepEqual(validateTargets(excess), []); assert.match(observationProblems(excess, policy)[0], /23/); });
test("missing approved story meaning is not hidden by complete actual inventory", () => { const target = final(); target.approvedBeats.push({ meaning: "Omitted conclusion", actualId: null }); assert.match(observationProblems(target, policy)[0], /Omitted conclusion/); });
test("required wording must equal the selected whole versions, not snippets extracted from output", () => { const target = final(); target.requiredText = ["Complete first paragraph."]; assert.match(validateTargets(target).join(" "), /selected whole version/); delete target.selectedWording; assert.ok(validateTargets(target).length); });
test("whole-version viewport coverage keeps exact positional identity across samples", () => {
  const target = final(), characters = wholeText(target.requiredText[0]).length, half = Math.floor(characters / 2), observed = { versionIndex: 0, beat: "actual-0", completeTextMatched: true, occurrences: 1, characters };
  const samples = [{ ...observed, visibleRanges: [[0, half]] }, { ...observed, visibleRanges: [[half, characters]] }]; assert.deepEqual(assessWording(target, samples), []);
  assert.ok(assessWording(target, samples.slice(0, 1)).length); assert.ok(assessWording(target, samples.map(sample => ({ ...sample, beat: "other" }))).length); assert.ok(assessWording(target, samples.map(sample => ({ ...sample, completeTextMatched: false }))).length); assert.ok(assessWording(target, samples.map(sample => ({ ...sample, occurrences: 2 }))).length);
  assert.ok(assessWording(target, [{ ...observed, visibleRanges: [[-1, characters + 1]] }]).length);
});
test("whole wording preserves word boundaries while normalizing whitespace", () => { assert.equal(wholeText("power\n states"), "power states"); assert.notEqual(wholeText("power states"), wholeText("powerstates")); });
function observeMock(parts, wanted, { clipped = false } = {}) {
  const block = { getAttribute: () => "opening", parentElement: null, display: "block", checkVisibility: () => true, closest: () => null }, inline = { ...block, display: "inline", parentElement: block };
  const nodes = parts.map(part => part === null ? { nodeType: 1, tagName: "BR" } : { nodeType: 3, textContent: typeof part === "string" ? part : part.text, parentElement: typeof part === "string" ? block : inline });
  const replacements = { innerHeight: 100, innerWidth: 100, scrollY: 0, NodeFilter: { SHOW_TEXT: 4, SHOW_ELEMENT: 1 }, getComputedStyle: node => ({ display: node.display, opacity: "1" }), document: {
    querySelectorAll: () => [block], createTreeWalker: (_, flags) => { assert.equal(flags, 5); let i = 0; return { currentNode: null, nextNode() { this.currentNode = nodes[i++]; return !!this.currentNode; } }; },
    createRange: () => ({ setStart() {}, setEnd() {}, getClientRects: () => [{ top: 0, bottom: 20, left: 0, right: 40 }, ...(clipped ? [{ top: 90, bottom: 110, left: 0, right: 40 }] : [])] })
  } };
  const saved = Object.fromEntries(Object.keys(replacements).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  try { Object.assign(globalThis, replacements); return observeWording({ beat: "opening", position: "test", versions: [{ meaning: "opening", text: wanted }], approvedBeats: [{ meaning: "opening", actualId: "opening" }] })[0]; }
  finally { for (const [key, descriptor] of Object.entries(saved)) if (descriptor) Object.defineProperty(globalThis, key, descriptor); else delete globalThis[key]; }
}
test("actual browser observer handles prototype BR and inline emphasis without joining words", () => {
  const words = "Between code and the bench.", observed = observeMock(["Between code", null, "and ", { text: "the bench." }], words);
  assert.equal(observed.completeTextMatched, true); assert.deepEqual(observed.visibleRanges, [[0, words.length]]);
  assert.equal(observeMock(["powerstates"], "power states").completeTextMatched, false);
  assert.equal(observeMock(["power", { text: "states" }], "power states").completeTextMatched, false);
  assert.equal(observeMock(["NonFirmware is code."], "Firmware is code.").completeTextMatched, false);
  assert.equal(observeMock(["Firmware is code.extra"], "Firmware is code.").completeTextMatched, false);
});
test("actual browser observer cannot claim a clipped wrapped word fully visible", () => { const observed = observeMock(["extraordinary"], "extraordinary", { clipped: true }); assert.equal(observed.completeTextMatched, true); assert.deepEqual(observed.visibleRanges, []); });
test("duplicate screenshot names fail before overwriting any original", () => { const names = new Set(); assert.equal(reserveImage(names, "travel-a-b-c.jpg"), "travel-a-b-c.jpg"); assert.throws(() => reserveImage(names, "travel-a-b-c.jpg"), /Duplicate original/); assert.equal(names.size, 1); });
test("source discovery, routes, controls and duplicate IDs fail closed", () => {
  for (const mutate of [t => { t.sourceDigest = "bad"; }, t => { t.discovery.exhaustive = false; }, t => { t.discovery.sources[0].path = "../answer"; }, t => { t.alternatives[0].route = "//external.test"; }, t => { t.alternatives[0].control = {}; }, t => { t.alternatives[1].id = t.alternatives[0].id; }, t => { t.alternatives[0] = null; }]) { const target = gates(); mutate(target); assert.ok(validateTargets(target).length); }
  for (const key of ["beats", "approvedBeats", "links", "auxiliaryPages"]) { const target = final(); target[key] = [null]; assert.ok(validateTargets(target).length); }
});
test("focus-only exception requires explicit narrow source-first authority", () => {
  const target = final(); target.focusOnlyControls = [{ selector: "#skip", name: "Skip", href: "#story", reason: "Document-start skip" }]; assert.ok(validateTargets(target).length);
  target.focusOnlyAttestation = { purpose: "document-start-to-main-story", reviewedByRoot: true, sourcePath: "app/page.tsx" }; assert.deepEqual(validateTargets(target), []);
  target.focusOnlyControls.push({ ...target.focusOnlyControls[0], selector: "#hidden-button" }); assert.ok(validateTargets(target).length);
});
test("no source, nonterminal actor, unresolved gate and starter are explicit non-passes", () => {
  const state = { actorSettled: true, actorComplete: true, hasSavedSnapshot: true, authoredApplication: true, sourceIdentity: true, unresolvedGate: false };
  assert.deepEqual(gateDisposition(state), { eligible: true, passed: false, status: "eligible-unobserved", reasons: [], browserStarted: false });
  for (const key of Object.keys(state)) { const result = gateDisposition({ ...state, [key]: !state[key] }); assert.equal(result.eligible, false); assert.equal(result.passed, false); assert.equal(result.browserStarted, false); assert.equal(result.status, "blocked-unobserved"); }
});
test("finite unit schedule and shutdown-inclusive caps are frozen", () => {
  assert.deepEqual(units(2), ["concepts"]); assert.deepEqual(units(4), ["looks"]); assert.equal(units(6).length, 9);
  for (const unit of [...units(2), ...units(4), ...units(6)]) { const actual = bounds(unit, policy); assert.equal(actual.timeoutMs + actual.graceMs, actual.totalCapMs); assert.equal(actual.graceMs, 5000); assert.ok(actual.totalCapMs <= 1500000); }
  for (const unit of ["desktop", "mobile", "short"]) assert.deepEqual(bounds(unit, policy), { timeoutMs: 1495000, graceMs: 5000, totalCapMs: 1500000 });
  for (const unit of ["concepts", "looks", "reduced-motion", "no-webgl", "no-javascript", "context-loss"]) assert.deepEqual(bounds(unit, policy), { timeoutMs: 895000, graceMs: 5000, totalCapMs: 900000 });
  for (const unit of ["build", "auxiliary"]) assert.deepEqual(bounds(unit, policy), { timeoutMs: 295000, graceMs: 5000, totalCapMs: 300000 });
  assert.equal(units(6).reduce((sum, unit) => sum + bounds(unit, policy).totalCapMs, 0), 8700000); assert.throws(() => bounds("retry", policy));
  assert.throws(() => bounds("desktop", { ...policy, boundsMs: { ...policy.boundsMs, animatedMode: undefined, mode: 480000 } }));
  assert.throws(() => bounds("desktop", { ...policy, shutdownGraceMs: 0 }));
  assert.deepEqual(modeCases(policy).map(entry => entry.id), units(6).slice(1, -1)); assert.equal(modeCases(policy).at(-1).loseContext, true);
});
function logIO({ shortWrite = false, failOpen = false, failWrite = false, failClose = false } = {}) {
  const events = [], files = new Map(); let next = 0;
  return { events, files, io: {
    open(path, flag) { events.push(["open", path, flag]); if (failOpen && next === 1) throw new Error("existing stream"); const fd = ++next; files.set(fd, Buffer.alloc(0)); return fd; },
    write(fd, bytes, offset, length, position) { events.push(["write", fd, position]); if (failWrite) throw new Error("storage unavailable"); const count = shortWrite ? Math.min(1, length) : length; files.set(fd, Buffer.concat([files.get(fd), bytes.subarray(offset, offset + count)])); return count; },
    close(fd) { events.push(["close", fd]); if (failClose) throw new Error("close failure"); },
  } };
}
test("capture logs are exclusive, synchronous and retain every callback byte before close", () => {
  const f = logIO({ shortWrite: true }), logs = openCaptureLogs("/fictional/review", f.io);
  assert.deepEqual(f.events, [["open", "/fictional/review/lifecycle.jsonl", "wx"], ["open", "/fictional/review/stdout.log", "wx"], ["open", "/fictional/review/stderr.log", "wx"]]);
  logs.write("lifecycle", '{"type":"spawned"}\n'); logs.write("stdout", "é"); logs.write("stdout", Buffer.from(" work\n")); logs.write("stderr", "warning\n");
  assert.equal(f.files.get(1).toString(), '{"type":"spawned"}\n'); assert.equal(f.files.get(2).toString(), "é work\n"); assert.equal(f.files.get(3).toString(), "warning\n");
  assert.equal(f.events.some(event => event[0] === "close"), false); assert.deepEqual(logs.close(), []); assert.equal(f.events.filter(event => event[0] === "close").length, 3);
  assert.throws(() => logs.write("stdout", "later"), /closed/); assert.deepEqual(logs.close(), []);
});
test("capture log open failures abort before spawn and close previously opened descriptors", () => {
  const f = logIO({ failOpen: true }); assert.throws(() => openCaptureLogs("/fictional/review", f.io), /existing stream/); assert.deepEqual(f.events.at(-1), ["close", 1]);
});
test("capture log write failures and zero-byte writes are explicit, and all closes are attempted", () => {
  const f = logIO({ failWrite: true, failClose: true }), logs = openCaptureLogs("/fictional/review", f.io); assert.throws(() => logs.write("lifecycle", "event"), /storage unavailable/); assert.equal(logs.close().length, 3);
  const zero = logIO(), stopped = openCaptureLogs("/fictional/review", { ...zero.io, write: () => 0 }); assert.throws(() => stopped.write("stdout", "data"), /Incomplete/); stopped.close();
});
test("actual HTML beat IDs cannot escape image paths or collide by lossy replacement", () => { assert.equal(imageName("../rest/a"), "..%2Frest%2Fa.png"); assert.notEqual(imageName("a/b"), imageName("a_b")); assert.equal(activationKey({ role: "switch" }), "Space"); assert.equal(activationKey({ role: "button" }), "Enter"); });
function gateEvidence(target = gates()) {
  const manifest = { artifacts: {} }, reports = [];
  const shot = path => { manifest.artifacts[path] = digest; return { path, sha256: digest, bytes: 1 }; };
  for (const alternative of target.alternatives) for (const mode of ["desktop", "phone"]) {
    const prefix = `${alternative.id}-${mode}`, report = { alternative: copy(alternative), mode, complete: true, errors: [], rests: [], controls: [], entryImage: shot(`${prefix}/entry.png`) };
    for (const role of ["opening", "middle", "ending"]) report.rests.push({ role, id: alternative.beats[role], image: shot(`${prefix}/${role}.png`) });
    if (alternative.control) for (const method of ["pointer", "keyboard"]) report.controls.push({ method, activated: true, identityChanged: true, beforeImage: shot(`${prefix}/${method}-before.png`), afterImage: shot(`${prefix}/${method}-after.png`) });
    reports.push(report);
  }
  return { manifest, reports };
}
test("gate coverage binds every alternative, entry, three rests and both control methods", () => { const target = gates(), { manifest, reports } = gateEvidence(target); assertUnitCoverage("concepts", target, manifest, reports); assert.deepEqual(assessGateReport(reports[0]), []); });
test("gate omitted alternative, entry, control method or control original fails", () => {
  for (const mutate of [e => e.reports.pop(), e => delete e.reports[0].entryImage, e => e.reports[0].controls.pop(), e => { e.reports[0].controls = []; }, e => delete e.manifest.artifacts[e.reports[0].controls[0].afterImage.path], e => { e.reports[0].rests[0].id = "different"; }]) { const target = gates(), evidence = gateEvidence(target); mutate(evidence); assert.throws(() => assertUnitCoverage("concepts", target, evidence.manifest, evidence.reports)); }
});
test("idempotent switch and raw request errors cannot be technical passes", () => { const { reports } = gateEvidence(); reports[0].controls[0].identityChanged = false; assert.match(assessGateReport(reports[0]).join(" "), /idempotent/); reports[0].errors.push("HTTP 404: missing image"); assert.match(assessGateReport(reports[0]).join(" "), /HTTP 404/); reports[0].controls = []; assert.match(assessGateReport(reports[0]).join(" "), /missing declared/); });
function finalEvidence(unit = "desktop", target = final()) {
  const manifest = { artifacts: {} }, shot = file => { manifest.artifacts[`${unit}/${file}`] = digest; return { file, sha256: digest, bytes: 1 }; }, ids = target.beats.map(beat => beat.id);
  const report = { rests: ids.map(beat => ({ beat, ...shot(`rest-${beat}.png`) })), wording: [], rawControlCensus: ids.map(beat => ({ beat, controls: [] })), motion: [], stationary: [], controlInventoryComplete: true, controlInventory: [{ key: "control-0" }], controls: [{ key: "control-0", trials: [] }] };
  for (const method of ["pointer", "keyboard"]) { const trial = { method }; for (const when of ["before", "after"]) trial[`${when}Image`] = shot(`control-0-${method}-${when}.png`).sha256; report.controls[0].trials.push(trial); }
  const intervals = [...ids.slice(0, -1).map((from, i) => ["forward", from, ids[i + 1]]), ...ids.slice(1).toReversed().map((from, i) => ["reverse", from, ids[ids.length - 2 - i]])];
  report.motion = intervals.map(([direction, from, to], i) => ({ direction, from, to, frames: [0.2, 0.5, 0.8].map(fraction => ({ fraction, ...shot(`travel-${i}-${fraction}.jpg`) })) }));
  report.stationary = ids.map(beat => ({ beat, before: shot(`still-${beat}-before.png`).sha256, after: shot(`still-${beat}-after.png`).sha256, files: [`still-${beat}-before.png`, `still-${beat}-after.png`] }));
  return { manifest, report };
}
test("all 12 final rests and both directions of all 11 transitions are required", () => { const { manifest, report } = finalEvidence(); assert.equal(report.motion.length, 22); assertUnitCoverage("desktop", final(), manifest, [report]); });
test("omitted reverse, forward, moving sample, control trial, census or original fails coverage", () => {
  const mutations = [e => e.report.rests.pop(), e => e.report.motion.pop(), e => e.report.motion.shift(), e => e.report.motion[0].frames.pop(), e => delete e.manifest.artifacts[`desktop/${e.report.motion[0].frames[0].file}`], e => e.report.rawControlCensus.pop(), e => delete e.report.rawControlCensus[0].controls, e => e.report.controls.pop(), e => e.report.controls[0].trials.pop(), e => delete e.manifest.artifacts["desktop/control-0-keyboard-after.png"], e => { e.report.controlInventoryComplete = false; }, e => e.report.controlInventory.push({ key: "control-0" })];
  for (const mutate of mutations) { const evidence = finalEvidence(); mutate(evidence); assert.throws(() => assertUnitCoverage("desktop", final(), evidence.manifest, [evidence.report])); }
});
test("reduced-motion requires a bound still pair at every actual beat", () => { const evidence = finalEvidence("reduced-motion"); assertUnitCoverage("reduced-motion", final(), evidence.manifest, [evidence.report]); delete evidence.manifest.artifacts["reduced-motion/still-actual-11-after.png"]; assert.throws(() => assertUnitCoverage("reduced-motion", final(), evidence.manifest, [evidence.report])); });
test("exact originals review rejects missing, duplicate, added, modified and non-original views", () => {
  const reports = units(6).map(unit => ({ unit, complete: true, sourceUnchanged: true })), originals = [{ path: "mode/rest.png", sha256: digest, bytes: 3 }], reviewed = originals.map(image => ({ ...image, viewMethod: "view_image original" })); assertCoverage(6, reports, originals, reviewed);
  for (const altered of [[], [...reviewed, ...reviewed], [{ ...reviewed[0], sha256: other }], [{ ...reviewed[0], bytes: 2 }], [{ ...reviewed[0], viewMethod: "thumbnail" }]]) assert.throws(() => assertCoverage(6, reports, originals, altered));
  assert.throws(() => assertCoverage(6, reports.slice(1), originals, reviewed)); reports[1].complete = false; assert.throws(() => assertCoverage(6, reports, originals, reviewed));
});
test("source exactness is a whole-set assertion, not subset agreement", () => { const files = [{ path: "app/page.tsx", bytes: 1, sha256: digest }], source = { files, digest: hash(JSON.stringify(files)) }, snapshot = { "app/page.tsx": { type: "file", hash: digest, size: 1 } }; assertSnapshot(source, snapshot); assert.throws(() => assertSnapshot(source, { ...snapshot, "app/omitted.tsx": snapshot["app/page.tsx"] })); assert.throws(() => assertSnapshot({ ...source, digest: other }, snapshot)); });
test("only exact root-reviewed identified Git metadata, never omitted app or credentials", () => {
  const extras = [{ path: ".git-local/HEAD", sha256: digest, bytes: 1 }], unexpected = [{ path: ".git-local", type: "directory" }], disposition = { reviewedByRoot: true, rationale: "Inspected identified metadata", extraFiles: extras.map(file => ({ ...file, classification: "git-metadata", rationale: "Git HEAD" })), unexpected: unexpected.map(entry => ({ ...entry, classification: "identified-git-metadata", rationale: "Checked Git markers" })) };
  assertExtras(extras, unexpected, disposition); assert.equal(metadataPath(".git-local/hooks/pre-commit"), false); assert.equal(metadataPath(".aws/credentials"), false); assert.equal(metadataPath("app/omitted.tsx"), false); disposition.reviewedByRoot = false; assert.throws(() => assertExtras(extras, unexpected, disposition));
});
function supervisor() {
  const record = { schemaVersion: 1, complete: true, status: "child-exited-successfully", childSpawned: true, childExited: true, childClosed: true, interruptedBy: null, childError: null, signalSender: null, signal: null, signalForwarded: false, forceAttempted: false, code: 0, recorderPid: 1, childPid: 2, shutdownGraceMs: 5000, rawArtifacts: Object.fromEntries(["command.json", "lifecycle.jsonl", "stdout.log", "stderr.log"].map(path => [path, digest])) };
  const terminal = { exit_code: 0, output: JSON.stringify({ output: "/evidence", ...record }) }, command = { schemaVersion: 1, recorderPid: 1, shutdownGraceMs: 5000 }, events = ["recorder_started", "child_spawned", "child_exit", "child_close"].map((type, i) => ({ type, sequence: i + 1, ...(i ? { childPid: 2 } : {}), ...(i > 1 ? { code: 0, signal: null } : {}) })); return { record, terminal, command, events };
}
test("new supervisor requires full clean terminal lifecycle, never legacy missing-result fallback", () => { const e = supervisor(); assert.equal(assertSupervisor(e.record, e.terminal, e.command, e.events), "/evidence");
  for (const mutate of [e => { e.record.complete = false; }, e => { e.record.childClosed = false; }, e => { e.record.interruptedBy = "SIGTERM"; }, e => { e.record.forceAttempted = true; }, e => { e.record.code = 1; }, e => { e.terminal.session_id = 7; }, e => e.events.pop(), e => { delete e.record.rawArtifacts; }]) { const altered = supervisor(); mutate(altered); assert.throws(() => assertSupervisor(altered.record, altered.terminal, altered.command, altered.events)); }
});
