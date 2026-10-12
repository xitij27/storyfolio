// Read-only preservation audit for the failed first neutral environment proof.
import assert from "node:assert/strict";
import { lstat, readFile, readdir, readlink, realpath } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
assert.deepEqual(process.argv.slice(2), ["--root-confirmed-failed"]);
const started = new Date().toISOString(), directory = dirname(fileURLToPath(import.meta.url));
const cohort = resolve(directory, "../../../../codex-full-journey-baseline-1"), inputs = join(cohort, "inputs"), run = join(cohort, "full-journey-1/baseline-1"), setup = join(run, "setup");
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const json = value => JSON.stringify(value, null, 2) + "\n";
const load = async path => JSON.parse(await readFile(path));
const regular = async path => { assert.ok((await lstat(path)).isFile(), path); return readFile(path); };
async function tree(root, prefix = "") {
  const rows = {};
  for (const name of (await readdir(join(root, prefix))).sort()) {
    const path = prefix ? prefix + "/" + name : name, full = join(root, path), stat = await lstat(full);
    assert.ok(!stat.isSymbolicLink(), "Unexpected symlink: " + full);
    if (stat.isDirectory()) Object.assign(rows, await tree(root, path));
    else { assert.ok(stat.isFile(), full); const bytes = await readFile(full); rows[path] = { type: "file", hash: hash(bytes), size: bytes.length }; }
  }
  return rows;
}
const manifest = await load(join(inputs, "manifest.json")), meta = await load(join(run, "meta.json"));
assert.equal(manifest.digest, hash(json(manifest.hashes))); assert.equal(manifest.digest, meta.inputDigest);
const frozen = await tree(inputs);
assert.deepEqual(Object.keys(frozen).sort(), [...Object.keys(manifest.hashes), "manifest.json"].sort());
for (const [path, digest] of Object.entries(manifest.hashes)) assert.equal(frozen[path].hash, digest, path);
const snapshot = await load(join(setup, "snapshot/manifest.json")), prepared = await load(join(setup, "result.json"));
const expected = {};
for (const [path, digest] of Object.entries(manifest.hashes)) {
  const target = path.startsWith("fixture/") ? path.slice(8) : path.startsWith("skill/") ? ".agents/skills/storyfolio/" + path.slice(6) : null;
  if (target) expected[target] = { type: "file", hash: digest, size: frozen[path].size };
}
assert.deepEqual(snapshot.files, expected); assert.deepEqual(snapshot.excluded, []); assert.deepEqual(snapshot.unexpected, []);
assert.deepEqual(await tree(join(setup, "snapshot/files")), expected);
const live = await tree(meta.work); assert.deepEqual(live, expected);
assert.equal(prepared.complete, true); assert.equal(prepared.setupMode, "unscaffolded"); assert.equal(prepared.scaffold.scaffolded, false);
assert.deepEqual(prepared.scaffold.copied, []); assert.deepEqual(prepared.scaffold.conflicts, []); assert.deepEqual(prepared.snapshot, snapshot);
for (const name of ["source-before.json", "source-after.json"]) {
  const source = await load(join(setup, "environment-proof", name));
  assert.deepEqual(source.entries, expected); assert.deepEqual(source.excluded, []); assert.deepEqual(source.unexpected, []);
}
const command = await load(join(setup, "environment-proof/command.json")), inner = await load(join(setup, "environment-proof/process.json")), closure = await load(join(setup, "environment-proof/closure.json"));
const outerDirectory = resolve(directory, "../baseline-environment-command"), outer = await load(join(outerDirectory, "result.json")), outerCommand = await load(join(outerDirectory, "command.json"));
const tool = await load(resolve(directory, "../baseline-environment-tool-poll-1.json"));
assert.equal(tool.result.exit_code, 1); assert.equal(tool.result.session_id, undefined);
const printed = JSON.parse(tool.result.output); delete printed.output; assert.deepEqual(printed, outer);
for (const [path, digest] of Object.entries(outer.rawArtifacts)) assert.equal(hash(await regular(join(outerDirectory, path))), digest, path);
assert.equal(outer.childClosed, true); assert.equal(outer.childExited, true); assert.equal(outer.code, 1); assert.equal(outer.signal, null); assert.equal(outer.interruptedBy, null);
assert.equal(outer.status, "child-exited-unsuccessfully"); assert.equal(outer.forceAttempted, false); assert.equal(outer.signalForwarded, false);
assert.equal(outerCommand.recorderPid, 323103); assert.equal(outer.childPid, 323114); assert.equal(inner.childPid, 323163);
assert.equal(inner.code, 1); for (const key of ["signal", "externalSignal", "spawnError", "logError"]) assert.equal(inner[key], null); assert.equal(inner.timedOut, false);
assert.deepEqual(inner.events.map(row => row.type), ["spawn-request", "closed"]);
assert.equal(command.cwd, meta.work); assert.equal(command.inputDigest, manifest.digest); assert.equal(command.capabilitySha256, manifest.hashes["capabilities.json"]);
assert.equal(closure.sourceUnchanged, true); assert.equal(closure.processSucceeded, false); assert.equal(closure.copied, true); assert.equal(closure.runtimeOut, command.runtimeOut);
assert.deepEqual(await readdir(command.runtimeOut), []); assert.deepEqual(await readdir(join(setup, "environment-proof/capability")), []);
assert.deepEqual((await readdir(run)).sort(), ["meta.json", "setup"]);
const absent = ["probe.json", "original-images.json", "environment-visual-review.md", "readiness-dry"];
for (const path of absent) await assert.rejects(lstat(join(setup, path)), { code: "ENOENT" });
const stderr = (await regular(join(setup, "environment-proof/stderr.log"))).toString();
assert.match(stderr, /probe-environment\.mjs:99:79/); assert.match(stderr, /ERR_ASSERTION/);
const capabilities = await load(join(inputs, "capabilities.json"));
const actual = stderr.match(/  actual: '([^']+)',/)[1], expectedPath = capabilities.environment.PATH;
assert.ok(actual.endsWith(":" + expectedPath));
const prefixes = actual.slice(0, -expectedPath.length - 1).split(":"); assert.equal(prefixes.length, 2);
assert.equal(prefixes[0], "/home/kshitij/.codex/tmp/arg0/codex-arg0c9kfLQ");
const release = dirname(dirname(capabilities.cliExecutable)); assert.equal(prefixes[1], join(release, "codex-path"));
const pathMetadata = [];
async function metadata(path, contents = false) {
  const s = await lstat(path), row = { path, uid: s.uid, gid: s.gid, mode: (s.mode & 0o7777).toString(8), type: s.isSymbolicLink() ? "symlink" : s.isDirectory() ? "directory" : s.isFile() ? "file" : "other", bytes: s.size };
  if (s.isSymbolicLink()) row.target = await readlink(path);
  else if (s.isFile() && contents) row.sha256 = hash(await readFile(path));
  return row;
}
for (const prefix of prefixes) {
  const row = await metadata(prefix); assert.equal(row.type, "directory"); assert.equal(row.uid, process.getuid()); assert.equal(await realpath(prefix), prefix);
  row.entries = await Promise.all((await readdir(prefix)).sort().map(name => metadata(join(prefix, name), true))); pathMetadata.push(row);
}
assert.deepEqual(pathMetadata[0].entries.map(row => row.path.slice(prefixes[0].length + 1)), [".lock", "apply_patch", "applypatch", "codex-execve-wrapper", "codex-linux-sandbox"]);
for (const row of pathMetadata[0].entries.slice(1)) { assert.equal(row.type, "symlink"); assert.equal(row.target, capabilities.cliExecutable); assert.equal(row.uid, process.getuid()); }
assert.equal(pathMetadata[0].entries[0].bytes, 0); assert.equal(pathMetadata[0].entries[0].type, "file");
assert.deepEqual(pathMetadata[1].entries.map(row => row.path.slice(prefixes[1].length + 1)), ["rg"]); assert.equal(pathMetadata[1].entries[0].type, "file");
const releaseRecord = await load(join(release, "codex-package.json"));
assert.deepEqual(releaseRecord, { layoutVersion: 1, version: "0.162.1", target: "x86_64-unknown-linux-musl", variant: "codex", entrypoint: "bin/codex", resourcesDir: "codex-resources", pathDir: "codex-path" });
const cliMetadata = await metadata(capabilities.cliExecutable, true); assert.equal(cliMetadata.sha256, capabilities.cliSha256);
const ancestors = [];
for (const path of new Set(prefixes.flatMap(prefix => { const paths = []; for (let p = dirname(prefix); p !== "/"; p = dirname(p)) paths.push(p); return paths; }))) ancestors.push(await metadata(path));
const cohortFiles = await tree(cohort), outerFiles = await tree(outerDirectory);
console.log(json({ schemaVersion: 1, verified: true, started, finished: new Date().toISOString(), cohort, inputDigest: manifest.digest,
  frozenInputCount: Object.keys(manifest.hashes).length, fixtureFileCount: Object.keys(manifest.hashes).filter(path => path.startsWith("fixture/")).length,
  skillFileCount: Object.keys(manifest.hashes).filter(path => path.startsWith("skill/")).length, sourceFiles: Object.keys(expected).length,
  exactInitialSource: true, sourceUnchanged: true, initialPreparationOnly: { complete: prepared.complete, setupMode: prepared.setupMode, scaffolded: false },
  failure: { outer, inner, stderrSha256: hash(stderr), sourceLocation: "frozen probe-environment.mjs:99:79", expectedPath, actualPath: actual, prefixes,
    capabilityFiles: 0, readinessAbsent: absent, actorTurnsAbsent: true, modelCalls: 0, browserStarted: false,
    ordering: "Frozen strict PATH assertion precedes report creation, git/npm subprocesses, local HTTP server and browser. Those stages were not reached." },
  launcherProvenance: { pathMetadata, ancestors, cliMetadata, releaseRecord, releaseRecordSha256: hash(await regular(join(release, "codex-package.json"))) },
  evidence: { cohortFiles, outerFiles, outerTool: { path: "../baseline-environment-tool-poll-1.json", sha256: hash(await regular(resolve(directory, "../baseline-environment-tool-poll-1.json"))) }, selfSha256: hash(await regular(fileURLToPath(import.meta.url))) },
  limits: ["This verifies the failed proof, not readiness or a built site. No original image exists to review.", "Launcher metadata/bytes are observed after closure; no claim of a filesystem read jail or cryptographic release authenticity.", "The empty runtime output remains retained. Nothing in the frozen cohort or workspace was rewritten; no retry or model was invoked."] }));
