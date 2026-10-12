// Read-only mechanical derivation audit. No subprocesses, setup or model calls.
import assert from "node:assert/strict";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hash, json, regularBytes, validateCase, verifyInputs } from "../../../lib/build.mjs";

assert.equal(process.argv.length, 2, "No alternate inputs or output supported");
const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../../..");
const readJson = async (directory, path) => JSON.parse(await regularBytes(directory, path));
const derivation = await readJson(study, "derivation.json");
assert.equal(derivation.schemaVersion, 1);
assert.equal(derivation.baselineCohort, "codex-bench-entry-baseline-1");
assert.equal(derivation.candidateCohort, "codex-bench-entry-candidate-1");
const inputs = join(root, "evals/runs", derivation.baselineCohort, "inputs");
const manifest = await verifyInputs(inputs);
assert.equal(manifest.digest, derivation.baselineInputDigest);
assert.equal(derivation.derivations.length, 4);
assert.equal(new Set(derivation.derivations.map(row => row.target)).size, 4);
for (const row of derivation.derivations) {
  const original = await regularBytes(root, row.source), candidate = await regularBytes(root, row.target);
  assert.equal(hash(original), row.sourceSha256, `Historical source changed: ${row.source}`);
  assert.equal(hash(candidate), row.targetSha256, `Candidate derivative changed: ${row.target}`);
  assert.equal(manifest.hashes[row.baselineFrozenPath], row.sourceSha256);
  assert.deepEqual(original, await regularBytes(inputs, row.baselineFrozenPath));
  let expected = original.toString("utf8");
  for (const { from, to, count } of row.replacements) {
    assert.equal(expected.split(from).length - 1, count, `Replacement occurrence count: ${row.target}`);
    expected = expected.replaceAll(from, to);
  }
  assert.equal(candidate.toString("utf8"), expected, `Nonmechanical change: ${row.target}`);
}
const baselineCase = await readJson(inputs, "case.json"), candidateCase = await readJson(study, "case.json");
validateCase(candidateCase);
const helpers = ["check-ready.mjs", "finalize-setup.mjs", "run-capability-probe.mjs"];
const expectedCase = structuredClone(baselineCase);
expectedCase.implementationFiles = expectedCase.implementationFiles.map(path => path.replace("evals/runs/stage-3-natural-entry-1/", "evals/runs/stage-3-completion-2/entry-candidate-preparation/"));
assert.deepEqual(candidateCase, expectedCase, "Only coordinator helper references may change in this case");
for (const name of helpers) assert.ok(candidateCase.implementationFiles.includes(`evals/runs/stage-3-completion-2/entry-candidate-preparation/${name}`));
for (const path of [candidateCase.expectations, candidateCase.rubric, candidateCase.protocol, ...candidateCase.prompts]) {
  const frozenPath = path === candidateCase.expectations ? "expectations.json" : path === candidateCase.rubric ? "rubric.md" : path === candidateCase.protocol ? "protocol.md" : `prompts/${path.split("/").at(-1)}`;
  assert.deepEqual(await regularBytes(root, path), await regularBytes(inputs, frozenPath), `Shared evaluation input changed: ${path}`);
}
for (const path of candidateCase.files) assert.deepEqual(await regularBytes(join(root, candidateCase.workspaceRoot), path), await regularBytes(inputs, `fixture/${path}`), `Actor-visible fixture changed: ${path}`);
console.log(json({ schemaVersion: 1, verified: true, checked: new Date().toISOString(), baselineInputDigest: manifest.digest,
  historicalFrozenFiles: Object.keys(manifest.hashes).length, mechanicalDerivatives: derivation.derivations.length, fixtureFiles: candidateCase.files.length,
  sharedPromptFixtureExpectationsRubricProtocolUnchanged: true,
  derivationSha256: hash(await regularBytes(study, "derivation.json")), verifierSha256: hash(await regularBytes(study, "verify-derivation.mjs")),
  targets: Object.fromEntries(derivation.derivations.map(row => [row.target, row.targetSha256])),
  candidateFrozen: false, candidateSetupVerified: false, modelCalls: 0, subprocesses: 0, writes: false,
  limits: ["Coordinator-control derivation only, not whole-freeze equality or candidate readiness", "Fresh candidate freeze, skill delta, exact capabilities, source guards and nine original image reviews still require their own saved evidence"] }));
