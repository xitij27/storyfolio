// Read-only preserved-data audit, not the successful-capture verifier.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
const root = process.cwd();
const base = "evals/runs/stage-3-completion-2/full-journey-recovery/candidate-2";
const unit = `${base}/concepts-1/units/concepts`, review = `${unit}/review`;
const hashes = {};
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
function bytes(file) {
  const full = path.resolve(root, file);
  assert.equal(fs.realpathSync(full), full, file);
  assert(fs.lstatSync(full).isFile(), file);
  const data = fs.readFileSync(full); hashes[file] = sha(data); return data;
}
function json(file) { return JSON.parse(bytes(file)); }
function check(file, expected) { assert.equal(sha(bytes(file)), expected, file); }
function files(directory) {
  const out = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name); assert(!entry.isSymbolicLink(), file);
    if (entry.isDirectory()) out.push(...files(file));
    else { assert(entry.isFile(), file); out.push(file); }
  }
  return out.sort();
}
const a = json(`${base}/amendment.json`), b = json(`${base}/binding.json`);
check(`${base}/amendment.json`, "17ec3ed49281be699d525513d075c46ebc37706bf020281ca528e23f4e4f8180");
check(`${base}/binding.json`, "088469b9438b0649a106bae89feb88dd8aa4b7045041cf9a1a079aaa9ad090b8");
for (const map of Object.values(a.helperHashes)) for (const [file, digest] of Object.entries(map)) check(file, digest);
check(`${a.original.run}/meta.json`, a.original.metaSha256);
const inputs = "evals/runs/codex-full-journey-candidate-2/inputs", frozen = json(`${inputs}/manifest.json`);
assert.equal(Object.keys(frozen.hashes).length, 149);
assert.equal(frozen.digest, a.original.inputDigest);
assert.equal(sha(JSON.stringify(frozen.hashes, null, 2) + "\n"), frozen.digest);
for (const [file, digest] of Object.entries(frozen.hashes)) check(`${inputs}/${file}`, digest);
let originalArtifacts = 0;
for (const t of a.original.turns) {
  for (const ref of [t.result, t.snapshot, t.processRecord, t.terminalTool]) check(ref.path, ref.sha256);
  const actor = json(t.result.path), dir = path.dirname(t.result.path);
  assert.equal(Object.keys(actor.artifacts).length, t.turn === 1 ? 199 : 204);
  assert.equal(actor.sessionId, a.original.sessionId); assert.equal(actor.complete, true);
  for (const [file, digest] of Object.entries(actor.artifacts)) { check(`${dir}/${file}`, digest); originalArtifacts++; }
  assert.deepEqual(files(dir), [...Object.keys(actor.artifacts).map(file => `${dir}/${file}`), t.result.path].sort());
  const outer = json(t.processRecord.path);
  for (const [file, digest] of Object.entries(outer.rawArtifacts)) check(`${path.dirname(t.processRecord.path)}/${file}`, digest);
}
for (const ref of [a.runtime, a.recovery.record, a.recovery.sourceManifest, a.authority.approval, a.authority.recoveryDecision, b.targets]) check(ref.path, ref.sha256);
const outer = json(`${base}/concepts-command/result.json`), outerEvents = bytes(`${base}/concepts-command/lifecycle.jsonl`).toString().trim().split("\n").map(JSON.parse);
for (const [file, digest] of Object.entries(outer.rawArtifacts)) check(`${base}/concepts-command/${file}`, digest);
assert.equal(outer.code, 1); assert.equal(outer.complete, false); assert.equal(outer.status, "externally-interrupted");
assert.equal(outer.interruptedBy, "SIGTERM"); assert.equal(outer.signalSender, "unknown"); assert.equal(outer.childClosed, true);
const tool = json(`${base}/concepts-tool-poll-3.json`); assert.equal(tool.result.exit_code, 1); assert.equal(tool.result.session_id, undefined);
const { output, ...printed } = JSON.parse(tool.result.output); assert.equal(output, path.resolve(base, "concepts-command")); assert.deepEqual(printed, outer);
const processRecord = json(`${review}/process.json`), command = json(`${review}/command.json`), closure = json(`${review}/closure.json`);
for (const [file, key] of [["stdout.log", "stdoutSha256"], ["stderr.log", "stderrSha256"], ["lifecycle.jsonl", "lifecycleSha256"]]) check(`${review}/${file}`, processRecord[key]);
assert.equal(processRecord.stdout, bytes(`${review}/stdout.log`).toString()); assert.equal(processRecord.stderr, bytes(`${review}/stderr.log`).toString());
assert.equal(processRecord.code, 1); assert.equal(processRecord.timedOut, false); assert.equal(processRecord.externalSignal, "SIGTERM"); assert.equal(processRecord.logError, null);
assert.deepEqual(command.helperHashes, a.helperHashes.measurement); assert.equal(command.timeoutMs, 895000); assert.equal(command.totalCapMs, 900000);
assert.equal(command.inputDigest, frozen.digest); assert.equal(command.amendmentSha256, b.amendment.sha256);
const manifest = json(`${unit}/artifacts/manifest.json`), inventory = json(`${review}/artifact-inventory.json`);
check(`${unit}/artifacts/manifest.json`, closure.manifestSha256);
assert.equal(manifest.complete, false); assert.equal(manifest.passed, false); assert.equal(manifest.sourceUnchanged, true);
assert.equal(closure.captureComplete, false); assert.equal(closure.sourceUnchanged, true); assert.equal(closure.originalPreserved, true); assert.equal(closure.artifactBinding, true); assert.deepEqual(closure.errors, []);
assert.equal(closure.bindingSha256, sha(bytes(`${base}/binding.json`))); assert.equal(closure.amendmentSha256, sha(bytes(`${base}/amendment.json`)));
assert.deepEqual(manifest.targets, json(b.targets.path)); assert.deepEqual(manifest.targets, json(`${base}/concepts-1/setup/targets.json`));
assert.deepEqual(manifest.expected, json(`${inputs}/expectations.json`));
assert.deepEqual(files(`${unit}/artifacts`), inventory.map(row => `${unit}/artifacts/${row.path}`).sort());
for (const row of inventory) { const data = bytes(`${unit}/artifacts/${row.path}`); assert.equal(data.length, row.bytes); assert.equal(sha(data), row.sha256); }
assert.deepEqual(Object.keys(manifest.artifacts).sort(), inventory.map(row => row.path).filter(file => file !== "manifest.json").sort());
for (const [file, digest] of Object.entries(manifest.artifacts)) check(`${unit}/artifacts/${file}`, digest);
const source = json(a.recovery.sourceManifest.path), before = json(`${review}/source-before.json`), after = json(`${review}/source-after.json`);
assert.deepEqual(before, source); assert.deepEqual(after, source); assert.deepEqual(manifest.sourceBefore, source); assert.deepEqual(manifest.sourceAfter, source);
assert.equal(source.files.length, 182); assert.equal(source.digest, sha(JSON.stringify(source.files)));
for (const row of source.files) for (const directory of [a.recovery.filesRoot, a.original.workspace, manifest.workspace]) {
  const data = bytes(path.join(directory, row.path)); assert.equal(data.length, row.bytes); assert.equal(sha(data), row.sha256);
}
const installDir = `${base}/concepts-1/setup/dependency-install`, install = json(`${installDir}/result.json`);
check(`${installDir}/result.json`, command.installResultSha256);
assert.equal(install.code, 0); check(`${installDir}/stdout.log`, install.stdoutSha256); check(`${installDir}/stderr.log`, install.stderrSha256);
const reports = manifest.results.map(summary => {
  const report = json(`${unit}/artifacts/${summary.directory}/report.json`);
  assert.equal(summary.complete, report.complete); assert.deepEqual(summary.problems, report.problems);
  return { directory: summary.directory, completeFlag: report.complete, problems: report.problems.map(item => item.split("\n")[0]), images: inventory.filter(row => row.path.startsWith(summary.directory + "/") && row.path.endsWith(".png")).length };
});
const knownPids = [outer.recorderPid, outer.childPid, processRecord.childPid, ...manifest.commands.map(item => item.pid), 661972];
const knownPidObservations = [...new Set(knownPids)].map(pid => {
  try { const raw = fs.readFileSync(`/proc/${pid}/stat`, "utf8"), fields = raw.slice(raw.lastIndexOf(")") + 2).split(" "); return { pid, present: true, state: fields[0], parentPid: Number(fields[1]), pgid: Number(fields[2]), session: Number(fields[3]), startTicks: fields[19] }; }
  catch (error) { if (error.code === "ENOENT") return { pid, present: false }; throw error; }
});
console.log(JSON.stringify({ schemaVersion: 1, verifiedPreservedData: true, observedAt: new Date().toISOString(),
  frozenInputs: 149, helperFiles: 42, originalArtifacts, sourceRows: 182, declaredSourceRowsMatchArchiveOriginalAndReconstruction: true,
  artifactFiles: inventory.length, originalImages: inventory.filter(row => row.path.endsWith(".png")).length,
  reportCount: reports.length, declaredAlternativeViewportCases: manifest.targets.alternatives.length * 2, reports,
  firstRecorderSignal: outerEvents.find(event => event.type === "external_signal"), outerFinished: outer.finished, outerDurationMs: outer.durationMs,
  innerFinished: processRecord.finished, innerDurationMs: processRecord.durationMs, timedOut: false, unknownSender: true,
  commands: manifest.commands.map(item => ({ pid: item.pid, started: item.started, finished: item.finished, code: item.code, signal: item.signal })), knownPidObservations,
  bindingSha256: sha(bytes(`${base}/binding.json`)), amendmentSha256: sha(bytes(`${base}/amendment.json`)), manifestSha256: closure.manifestSha256,
  auditSourceSha256: sha(fs.readFileSync(new URL(import.meta.url))),
  limits: "Preserved-data integrity, not a successful capture verifier or semantic gate. Declared source rows were read; saved before/after inventories were compared, without a fresh generated-tree enumeration. Known PID absence is observation-time metadata only, not a whole-host, descendant or historical writer-closure proof. Original app identity remains a post-closure recovery. No visual review, source repair, signal, runtime, browser, test, model or retry was performed." }, null, 2));
