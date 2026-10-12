// Read-only retained-evidence audit. No subprocess, browser, model or writes.
import assert from "node:assert/strict";
import { readFile, lstat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { captureSource } from "../../../../lib/build-capture.mjs";
import { assertUnitCoverage, buildInventory } from "../../full-journey-measurement/measurement-lib.mjs";

const directory = dirname(fileURLToPath(import.meta.url));
const root = resolve(directory, "../../../../..");
const read = async path => JSON.parse(await readFile(path, "utf8"));
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const hashed = async path => hash(await readFile(path));
const manifest = await read(join(directory, "desktop/artifacts/manifest.json"));
const result = await read(join(directory, "desktop/review/result.json"));
const command = await read(join(directory, "desktop/review/command.json"));
const outer = await read(join(directory, "desktop-command/result.json"));
const tool = await read(join(directory, "desktop-tool-poll-14.json"));
const report = await read(join(directory, "desktop/artifacts/desktop/report.json"));
const targets = await read(join(directory, "final-targets.json"));
const policy = manifest.policy;
const source = await read(join(directory, "source.json"));
const build = await read(join(directory, "build/artifacts/manifest.json"));
const originalImplementation = await read(join(directory, "implementation-before.json"));
for (const [path, digest] of Object.entries(originalImplementation)) assert.equal(await hashed(join(root, path)), digest, "Current implementation changed: " + path);
for (const [path, digest] of Object.entries(manifest.artifacts)) {
  assert.ok(!path.startsWith("/") && !path.split("/").includes(".."));
  assert.ok((await lstat(join(directory, "desktop/artifacts", path))).isFile());
  assert.equal(await hashed(join(directory, "desktop/artifacts", path)), digest, path);
}
assert.equal(await hashed(join(directory, "desktop-command/stdout.log")), outer.stdoutSha256);
assert.equal(await hashed(join(directory, "desktop-command/stderr.log")), outer.stderrSha256);
const { output, ...returned } = JSON.parse(tool.output);
assert.equal(output, join(directory, "desktop-command")); assert.deepEqual(returned, outer); assert.equal(tool.exit_code, 1);
assert.equal(await readFile(join(directory, "desktop/review/stdout.log"), "utf8"), result.stdout);
assert.equal(await readFile(join(directory, "desktop/review/stderr.log"), "utf8"), result.stderr);
assert.equal(result.code, 1); assert.equal(result.timedOut, false); assert.equal(result.externalSignal, null);
const events = (await readFile(join(directory, "desktop/review/lifecycle.jsonl"), "utf8")).trim().split("\n").map(JSON.parse);
assert.deepEqual(events.map(event => event.type), ["spawn-request", "spawned", "exit", "closed"]);
for (const current of [manifest.sourceBefore, manifest.sourceAfter, result.sourceAfter, command.sourceBefore, build.sourceAfter, await captureSource(manifest.workspace)]) assert.deepEqual(current, source);
assert.equal(await hashed(join(directory, "snapshot.json")), command.snapshotSha256);
assert.equal(await hashed(join(directory, "final-targets.json")), command.targetsSha256);
assert.deepEqual(manifest.buildIdentity, build.buildIdentity);
const liveBuild = await buildInventory(manifest.workspace, policy); assert.deepEqual(liveBuild, manifest.buildAfter);
const before = new Map(manifest.buildIdentity.files.map(file => [file.path, file]));
const after = new Map(manifest.buildAfter.files.map(file => [file.path, file]));
const added = [...after].filter(([path]) => !before.has(path)).map(([, file]) => file);
const removed = [...before.keys()].filter(path => !after.has(path));
const changed = [...before].filter(([path, file]) => after.has(path) && JSON.stringify(after.get(path)) !== JSON.stringify(file)).map(([path]) => path);
assert.deepEqual(removed, []); assert.deepEqual(changed, []); assert.equal(added.length, 6);
assertUnitCoverage("desktop", targets, manifest, [report]);
const images = Object.keys(manifest.artifacts).filter(path => /\.(png|jpg)$/.test(path));
assert.deepEqual(images.sort(), report.screenshots.map(path => "desktop/" + path).sort());
assert.equal(new Set(images).size, images.length);
const cachePattern = /^server\/route-cache\/APP_PAGE\/([a-f0-9]{64})\/\$\/(index(?:\.(?:html|meta|rsc)|\.segments\/(?:__PAGE__|_full|_tree)\.segment\.rsc))$/;
const cache = [];
for (const file of added) {
  const match = file.path.match(cachePattern); assert.ok(match, file.path);
  const seeded = "server/app/" + match[2], generated = join(manifest.workspace, ".next", file.path), seed = join(manifest.workspace, ".next", seeded);
  const generatedBytes = await readFile(generated), seedBytes = await readFile(seed);
  const row = { ...file, seed: seeded, seedSha256: hash(seedBytes), sameBytesAsSeed: generatedBytes.equals(seedBytes) };
  if (file.path.endsWith(".meta")) {
    const generatedMeta = JSON.parse(generatedBytes), seedMeta = JSON.parse(seedBytes);
    const { routeCacheLastModified, ...rest } = generatedMeta;
    assert.deepEqual(rest, seedMeta); assert.equal(typeof routeCacheLastModified, "number");
    assert.equal(match[1], hash(seedMeta.routeCache.owner.sourceRoute));
    row.metadataOnlyAddition = { routeCacheLastModified }; row.seedOwner = seedMeta.routeCache.owner; row.seedKey = seedMeta.routeCache.key;
  } else assert.equal(row.sameBytesAsSeed, true, file.path);
  cache.push(row);
}
const nextRoot = join(manifest.workspace, "node_modules/next");
const trustedRoot = join(policy.trustedDependencies.root, "node_modules/next");
const nextFiles = ["package.json", "dist/server/lib/route-cache-key.js", "dist/server/lib/incremental-cache/file-system-cache.js", "dist/lib/constants.js"];
const nextProvenance = [];
for (const path of nextFiles) {
  const bytes = await readFile(join(nextRoot, path)), trusted = await readFile(join(trustedRoot, path));
  assert.equal(hash(bytes), hash(trusted), "Installed source differs from trusted dependency: " + path);
  nextProvenance.push({ path, bytes: bytes.length, sha256: hash(bytes), sameAsTrustedDependency: true });
}
const lock = await read(join(manifest.workspace, "package-lock.json"));
const pids = {};
for (const pid of [result.wrapperPid, result.childPid]) { try { await lstat("/proc/" + pid); pids[pid] = "present"; } catch (error) { pids[pid] = error.code; } }
console.log(JSON.stringify({ verified: true, at: new Date().toISOString(), modelCalls: 0, writes: false,
  outcomePreserved: { code: result.code, complete: manifest.complete, passed: manifest.passed, sourceUnchanged: manifest.sourceUnchanged, buildUnchanged: manifest.buildUnchanged, observationProblems: manifest.observationProblems, desktopProblems: report.problems, error: manifest.error },
  lifecycle: { started: result.started, finished: result.finished, durationMs: result.durationMs, outer, pids },
  source: { files: source.files.length, digest: source.digest }, artifacts: Object.keys(manifest.artifacts).length,
  coverage: { originals: images.length, midEnd: 10, rests: report.rests.length, transitions: report.motion.length, travelFrames: report.motion.reduce((n, row) => n + row.frames.length, 0), controls: report.controls.length, trials: report.controls.reduce((n, row) => n + row.trials.length, 0), notApplicable: report.controls.flatMap(row => row.trials).filter(row => row.applicability === "not-applicable").length, controlOriginals: images.filter(path => path.startsWith("desktop/control-")).length, samples: report.samples.length, wording: report.wording.length, requests: report.requests.length, warnings: report.warnings.length, errors: report.errors.length },
  build: { beforeFiles: before.size, afterFiles: after.size, beforeDigest: manifest.buildIdentity.digest, afterDigest: manifest.buildAfter.digest, added: cache, removed, changed },
  next: { packageVersion: (await read(join(nextRoot, "package.json"))).version, lock: lock.packages["node_modules/next"], inspectedSource: nextProvenance },
  hashes: Object.fromEntries(await Promise.all(["desktop/artifacts/manifest.json", "desktop/artifacts/desktop/report.json", "desktop/review/result.json", "desktop/review/lifecycle.jsonl", "desktop-command/result.json"].map(async path => [path, await hashed(join(directory, path))])))
}, null, 2));
