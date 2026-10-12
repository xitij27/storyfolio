// Read-only derivation audit. No subprocesses, setup, writes or model calls.
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hash, json, regularBytes, validateCase, verifyInputs } from "../../../../lib/build.mjs";

assert.equal(process.argv.length, 2, "No alternate inputs or output supported");
const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../../../..");
const readJson = async (directory, path) => JSON.parse(await regularBytes(directory, path));
const record = await readJson(study, "derivation.json");
assert.equal(record.schemaVersion, 1);
assert.equal(record.candidateCohort, "codex-build-wording-candidate-1");
assert.equal(record.baselineCohort, "codex-build-completion-1");
assert.equal(record.controlsCohort, "codex-bench-entry-candidate-1");
const freezes = new Map();
for (const [cohort, digest] of [[record.baselineCohort, record.baselineInputDigest], [record.controlsCohort, record.controlsInputDigest]]) {
  const directory = join(root, "evals/runs", cohort, "inputs");
  const manifest = await verifyInputs(directory);
  assert.equal(manifest.digest, digest);
  freezes.set(cohort, { directory, manifest });
}
assert.equal(record.derivations.length, 4);
assert.equal(new Set(record.derivations.map(row => row.target)).size, 4);
for (const row of record.derivations) {
  const original = await regularBytes(root, row.source), candidate = await regularBytes(root, row.target);
  assert.equal(original.length, row.sourceBytes);
  assert.equal(candidate.length, row.targetBytes);
  assert.equal(hash(original), row.sourceSha256, `Historical source changed: ${row.source}`);
  assert.equal(hash(candidate), row.targetSha256, `Candidate derivative changed: ${row.target}`);
  const frozen = freezes.get(row.sourceFrozenCohort);
  assert.ok(frozen, "Unknown source freeze");
  assert.equal(frozen.manifest.hashes[row.sourceFrozenPath], row.sourceSha256);
  assert.deepEqual(original, await regularBytes(frozen.directory, row.sourceFrozenPath));
  let expected = original.toString("utf8");
  for (const { from, to, count } of row.replacements) {
    assert.ok(from.length > 0);
    assert.equal(expected.split(from).length - 1, count, `Replacement occurrence count: ${row.target}`);
    expected = expected.replaceAll(from, to);
  }
  assert.equal(candidate.toString("utf8"), expected, `Undeclared change: ${row.target}`);
}
const baseline = freezes.get(record.baselineCohort);
const source = await readJson(baseline.directory, "case.json"), candidate = await readJson(study, "case.json");
validateCase(candidate);
const helpers = ["check-ready.mjs", "finalize-setup.mjs", "run-capability-probe.mjs"];
const expectedCase = structuredClone(source);
expectedCase.implementationFiles.push(...helpers.map(name => `evals/runs/stage-3-completion-2/wording/preparation/${name}`));
assert.deepEqual(candidate, expectedCase, "Only the three coordinator helper paths may be appended");
for (const row of record.coordinatorContractBindings) {
  const current = await regularBytes(root, row.current), historical = await regularBytes(root, row.frozen);
  assert.equal(current.length, row.currentRecord.bytes);
  assert.equal(hash(current), row.currentRecord.sha256);
  assert.equal(historical.length, row.frozenRecord.bytes);
  assert.equal(hash(historical), row.frozenRecord.sha256);
  assert.equal(current.equals(historical), row.equal, `Input equality changed: ${row.current}`);
}
assert.equal(record.coordinatorContractBindings.filter(row => !row.equal).length, 1);
assert.equal(record.coordinatorContractBindings.find(row => !row.equal).current, candidate.protocol);
assert.equal(hash(await regularBytes(root, record.fixture.sourceManifestPath)), record.fixture.sourceManifestSha256);
const filesAt = async (directory, prefix = "") => {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${item.name}` : item.name;
    assert.ok(!item.isSymbolicLink(), `Fixture symlink: ${path}`);
    if (item.isDirectory()) files.push(...await filesAt(join(directory, item.name), path));
    else { assert.ok(item.isFile(), `Fixture non-file: ${path}`); files.push(path); }
  }
  return files.sort();
};
const workspace = join(root, candidate.workspaceRoot), actualPaths = await filesAt(workspace);
assert.deepEqual(actualPaths, [...candidate.files].sort());
assert.equal(actualPaths.length, record.fixture.files);
let fixtureBytes = 0;
for (const path of actualPaths) {
  const bytes = await regularBytes(workspace, path);
  fixtureBytes += bytes.length;
  assert.deepEqual(bytes, await regularBytes(baseline.directory, `fixture/${path}`), `Actor-visible fixture changed: ${path}`);
}
assert.equal(fixtureBytes, record.fixture.bytes);
for (const [index, path] of candidate.prompts.entries()) assert.deepEqual(await regularBytes(root, path), await regularBytes(baseline.directory, `prompts/turn${index + 1}.md`));
for (const [path, frozen] of [[candidate.expectations, "expectations.json"], [candidate.rubric, "rubric.md"]]) assert.deepEqual(await regularBytes(root, path), await regularBytes(baseline.directory, frozen));
console.log(json({ schemaVersion: 1, verified: true, checked: new Date().toISOString(),
  baselineInputDigest: baseline.manifest.digest, controlsInputDigest: freezes.get(record.controlsCohort).manifest.digest,
  fixtureFiles: actualPaths.length, fixtureBytes, sharedPromptsFixtureExpectationsRubricUnchanged: true,
  coordinatorProtocolDifferenceDeclared: true, mechanicalDerivatives: record.derivations.length,
  derivationSha256: hash(await regularBytes(study, "derivation.json")), verifierSha256: hash(await regularBytes(study, "verify-derivation.mjs")),
  targets: Object.fromEntries(record.derivations.map(row => [row.target, row.targetSha256])),
  candidateFrozen: false, candidateSetupVerified: false, modelCalls: 0, subprocesses: 0, writes: false,
  limits: ["Control derivation only, not whole-freeze equality or candidate readiness", "Root must review the current skill, harness, capabilities and protocol differences before freeze and retain fresh setup/probe/source/original-image evidence"] }));
