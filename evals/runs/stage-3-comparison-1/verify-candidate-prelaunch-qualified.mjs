// Qualified read-only audit after an explicitly dispositioned install-only variance.
// Original strict verifier and failure remain unchanged. No model or setup invocation.
import assert from 'node:assert/strict';
import { readFile, readdir, lstat, realpath, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyInputs, hash, inspectWorkspace, validateCase } from '../codex-bench-depth-baseline-2/inputs/implementation/evals/lib/build.mjs';
import { captureSource } from '../codex-bench-depth-baseline-2/inputs/implementation/evals/lib/build-capture.mjs';

const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, '../../..');
const baseline = join(root, 'evals/runs/codex-bench-depth-baseline-2');
const candidate = join(root, 'evals/runs/codex-bench-depth-candidate-1');
const runPath = 'bench-depth-2/baseline-1';
const baseRun = join(baseline, runPath), run = join(candidate, runPath);
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
const baseInputs = await verifyInputs(join(baseline, 'inputs'));
const inputs = await verifyInputs(join(candidate, 'inputs'));
assert.equal(Object.keys(inputs.hashes).length, 124);
assert.deepEqual(Object.keys(inputs.hashes), Object.keys(baseInputs.hashes));
const changedInputs = Object.keys(inputs.hashes).filter(path => inputs.hashes[path] !== baseInputs.hashes[path]);
assert.deepEqual(changedInputs, ['skill/SKILL.md']);
assert.equal(inputs.hashes['skill/SKILL.md'], 'cea93b6a009a405d4bd0497e5a8e1bdae53901259a9a7739e334008a0274cee2');
assert.equal(inputs.recorded.sourceStatus, '');
const baseMeta = await readJson(join(baseRun, 'meta.json')), meta = await readJson(join(run, 'meta.json'));
assert.equal(meta.inputDigest, inputs.digest);
assert.equal(meta.inputs, join(candidate, 'inputs'));
assert.equal(meta.cohort, 'codex-bench-depth-candidate-1');
assert.notEqual(meta.work, baseMeta.work);
assert.equal(await realpath(meta.work), meta.work);
assert.ok(meta.work.startsWith('/var/tmp/storyfolio-comparison-runtime-20261012/storyfolio-evals/build-bench-depth-2-'));
assert.deepEqual((await readdir(run)).sort(), ['meta.json', 'setup']);
const metaDifferences = Object.keys(meta).filter(key => JSON.stringify(meta[key]) !== JSON.stringify(baseMeta[key])).map(key => ({ key, baseline: baseMeta[key], candidate: meta[key] }));
assert.deepEqual(metaDifferences.map(entry => entry.key).sort(), ['cohort', 'inputDigest', 'inputs', 'preparedAt', 'work'].sort());
const source = validateCase(await readJson(join(candidate, 'inputs/case.json')));
const expected = {}, initial = {}, counts = { fixture: 0, skill: 0, scaffold: 0 };
for (const [path, digest] of Object.entries(inputs.hashes)) {
  const bytes = await readFile(join(candidate, 'inputs', path)), record = { type: 'file', hash: digest, size: bytes.length };
  if (path.startsWith('fixture/')) { const key = path.slice(8); assert.ok(!expected[key]); expected[key] = record; initial[key] = record; counts.fixture++; }
  if (path.startsWith('skill/')) { const key = `.agents/skills/storyfolio/${path.slice(6)}`; assert.ok(!expected[key]); expected[key] = record; initial[key] = record; counts.skill++; }
  if (path.startsWith('skill/engine/')) { const key = path.slice(13); assert.ok(!expected[key]); expected[key] = record; counts.scaffold++; }
  if (path.startsWith('skill/')) assert.equal(hash(await readFile(join(root, 'skills/storyfolio', path.slice(6)))), digest, path);
  if (path.startsWith('implementation/')) assert.equal(hash(await readFile(join(root, path.slice(15)))), digest, path);
}
assert.deepEqual(counts, { fixture: 9, skill: 86, scaffold: 79 });
const pre = await readJson(join(run, 'setup/pre-scaffold-inventory.json'));
const basePre = await readJson(join(baseRun, 'setup/pre-scaffold-inventory.json'));
assert.deepEqual(pre, basePre);
assert.deepEqual(pre.initialEntries, []);
assert.deepEqual([...pre.files].sort(), Object.keys(initial).sort());
assert.equal(pre.files.length, 95);
const snapshot = await readJson(join(run, 'setup/snapshot/manifest.json'));
const baseSnapshot = await readJson(join(baseRun, 'setup/snapshot/manifest.json'));
assert.deepEqual(snapshot.files, expected);
assert.deepEqual(snapshot.excluded, []);
assert.deepEqual(snapshot.unexpected, []);
assert.equal(Object.keys(snapshot.files).length, 174);
const snapshotDifferences = Object.keys(expected).filter(path => JSON.stringify(expected[path]) !== JSON.stringify(baseSnapshot.files[path])).map(path => ({ path, baseline: baseSnapshot.files[path], candidate: expected[path] }));
assert.equal(snapshotDifferences.length, 1);
assert.equal(snapshotDifferences[0].path, '.agents/skills/storyfolio/SKILL.md');
const directories = [];
async function list(directory, prefix = '', skippedTop = new Set()) {
  const files = [];
  for (const entry of await readdir(join(directory, prefix), { withFileTypes: true })) {
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert.equal(entry.isSymbolicLink(), false, path);
    if (skippedTop.has(path)) { assert.equal(entry.isDirectory(), true, path); continue; }
    if (entry.isDirectory()) { directories.push(path); files.push(...await list(directory, path, skippedTop)); }
    else { assert.equal(entry.isFile(), true, path); files.push(path); }
  }
  return files.sort();
}
assert.deepEqual(await list(join(run, 'setup/snapshot/files')), Object.keys(expected).sort());
for (const [path, record] of Object.entries(expected)) {
  const saved = await readFile(join(run, 'setup/snapshot/files', path)), live = await readFile(join(meta.work, path));
  assert.equal(hash(saved), record.hash, path);
  assert.equal(saved.length, record.size, path);
  assert.deepEqual(live, saved, path);
}
const prepared = await readJson(join(run, 'setup/result.json'));
assert.equal(prepared.complete, true);
assert.equal(prepared.modelCalls, 0);
assert.equal(prepared.networkCalls, 0);
assert.deepEqual(prepared.snapshot, snapshot);
assert.equal(prepared.scaffold.scaffolded, true);
assert.deepEqual(prepared.scaffold.conflicts, []);
const capabilities = await readJson(join(candidate, 'inputs/capabilities.json'));
const runtime = await readJson(join(run, 'setup/runtime-environment.json'));
assert.deepEqual(runtime, await readJson(join(baseRun, 'setup/runtime-environment.json')));
assert.equal(runtime.TMPDIR, '/var/tmp/storyfolio-comparison-runtime-20261012');
assert.equal(hash(await readFile(capabilities.cliExecutable)), capabilities.cliSha256);
const factualPath = 'docs/story/environment-setup.json';
const factualBytes = await readFile(join(run, 'setup/environment-setup.json'));
assert.deepEqual(await readFile(join(meta.work, factualPath)), factualBytes);
const factual = JSON.parse(factualBytes), baseFactual = await readJson(join(baseRun, 'setup/environment-setup.json'));
assert.equal(factual.inputDigest, inputs.digest);
assert.deepEqual({ ...factual, inputDigest: baseFactual.inputDigest }, baseFactual);
assert.equal(factual.actorPreflight, false);
assert.ok(!factualBytes.toString().includes(root));
assert.ok(!/(?:evals\/|prototypes\/|docs\/(?:history|superpowers)\/|portfolio-website|fixture-study|visual-recovery|codex-build-completion)/.test(factualBytes.toString()));
expected[factualPath] = { type: 'file', hash: hash(factualBytes), size: factualBytes.length };
const liveFiles = await list(meta.work, '', new Set(['node_modules', '.next', 'checks']));
const extras = liveFiles.filter(path => !expected[path]);
assert.ok(extras.every(path => ['next-env.d.ts', 'tsconfig.tsbuildinfo'].includes(path)), JSON.stringify(extras));
const inspected = await inspectWorkspace(meta.work, source.snapshot);
const currentRecords = Object.fromEntries(Object.entries(inspected.entries).map(([path, { bytes, ...record }]) => [path, record]));
assert.deepEqual(currentRecords, expected);
const captured = await captureSource(meta.work);
assert.deepEqual(captured.files.map(file => file.path).sort(), Object.keys(expected).sort());
for (const file of captured.files) assert.deepEqual({ type: 'file', hash: file.sha256, size: file.bytes }, expected[file.path]);
const unexpected = [];
for (const entry of inspected.unexpected) {
  assert.ok(['.aws', '.codex'].includes(entry.path), entry.path);
  const info = await lstat(join(meta.work, entry.path));
  assert.equal(info.isDirectory(), true);
  assert.equal(info.isSymbolicLink(), false);
  assert.equal((await readdir(join(meta.work, entry.path))).length, 0);
  unexpected.push({ ...entry, symlink: false, entries: 0, contentsOpened: false });
}
assert.deepEqual(await readdir(join(meta.work, 'checks')), ['setup-capability']);
const rawProbePath = join(meta.work, 'checks/setup-capability/probe.json');
const rawProbeBytes = await readFile(rawProbePath), rawProbe = JSON.parse(rawProbeBytes);
assert.equal(rawProbe.workspace, meta.work);
assert.equal(rawProbe.modelCalls, 0);
assert.equal(rawProbe.passed, true);
const stackPath = `${candidate}/inputs/implementation/evals/probe-build-environment.mjs:43:22`;
assert.ok(rawProbeBytes.toString().includes(stackPath), 'Generated stack-path exposure should remain recorded, not silently sanitized');
const retainedProbe = await readFile(join(run, 'setup/capability/probe.json'));
assert.deepEqual(retainedProbe, rawProbeBytes);
const capabilityProcess = await readJson(join(run, 'setup/capability-process.json'));
assert.equal(capabilityProcess.code, 0);
assert.equal(capabilityProcess.timedOut, false);
const capabilityCommand = await readJson(join(run, 'setup/capability-command.json'));
const baseCapabilityCommand = await readJson(join(baseRun, 'setup/capability-command.json'));
assert.deepEqual(capabilityCommand.environment, baseCapabilityCommand.environment);
assert.equal(capabilityCommand.executable, baseCapabilityCommand.executable);
const normalizedArgs = capabilityCommand.args.map(value => value.replaceAll(meta.work, baseMeta.work).replaceAll(candidate, baseline));
assert.deepEqual(normalizedArgs, baseCapabilityCommand.args);
const install = await readJson(join(run, 'setup/dependency-install/command.json'));
const baseInstall = await readJson(join(baseRun, 'setup/dependency-install/command.json'));
assert.equal(install.executable, baseInstall.executable);
assert.deepEqual(install.args, baseInstall.args);
// Explicit root-dispositioned install-only variance. No other field is ignored.
const installEnvironmentDifferences = [...new Set([...Object.keys(install.environment), ...Object.keys(baseInstall.environment)])]
  .filter(key => JSON.stringify(install.environment[key]) !== JSON.stringify(baseInstall.environment[key]))
  .map(key => ({ key, baseline: baseInstall.environment[key], candidate: install.environment[key] }));
assert.deepEqual(installEnvironmentDifferences, [{ key: 'NEXT_TELEMETRY_DISABLED', baseline: '1', candidate: null }]);
const impactBytes = await readFile(join(study, 'candidate-install-lifecycle/stdout.log'));
const impactResult = await readJson(join(study, 'candidate-install-lifecycle/result.json'));
assert.equal(impactResult.code, 0);
assert.equal(hash(impactBytes), impactResult.stdoutSha256);
assert.equal(hash(impactBytes), '1e258f2cb47b7559b8602423b4ad81fd121dd12f4cbaa1f164601281b511da18');
const impact = JSON.parse(impactBytes);
assert.equal(impact.readOnly, true);
assert.equal(impact.modelCalls, 0);
assert.equal(impact.inputDigest, inputs.digest);
assert.equal(impact.installedPackages, 392);
assert.equal(impact.lockSha256, inputs.hashes['skill/engine/package-lock.json']);
assert.deepEqual(impact.packages.find(entry => entry.path === '.').hooks, {});
const runLines = impact.executedLifecycleEvidence.selectedLines.filter(entry => / info run /.test(entry.text));
assert.equal(runLines.length, 2);
assert.ok(runLines.every(entry => entry.text.includes('unrs-resolver@1.12.2 postinstall')));
assert.ok(runLines.some(entry => entry.text.includes('code: 0')));
const dependencyBytes = await readFile(join(study, 'candidate-dependency-inventory.json'));
const dependencyInventory = JSON.parse(dependencyBytes);
assert.equal(dependencyInventory.exactMetadataAndBytesMatch, true);
assert.deepEqual(dependencyInventory.differences, []);
assert.equal(dependencyInventory.baseline.digest, '2964d62cdcedb14dfb1ba85b8cad2d909671f641eac0116e3070ae44bc3a7ca3');
assert.equal(dependencyInventory.candidate.digest, dependencyInventory.baseline.digest);
assert.equal(dependencyInventory.baseline.files, 24083);
assert.equal(dependencyInventory.candidate.files, 24083);
const originalVerifierSha256 = hash(await readFile(join(study, 'verify-candidate-prelaunch.mjs')));
const installed = await readJson(join(run, 'setup/dependency-install/result.json'));
assert.equal(installed.code, 0);
assert.equal(installed.signal, null);
const gate = await readJson(join(run, 'setup/probe.json'));
assert.equal(gate.passed, true);
assert.equal(gate.inputDigest, inputs.digest);
assert.equal(gate.work, meta.work);
for (const [path, record] of Object.entries(gate.evidenceHashes)) {
  const bytes = await readFile(join(run, 'setup', path));
  assert.equal(hash(bytes), record.sha256, path);
  assert.equal(bytes.length, record.bytes, path);
}
for (const [path, digest] of Object.entries(gate.coordinatorHelpers)) assert.equal(hash(await readFile(join(root, path))), digest, path);
const observation = {
  schemaVersion: 1, date: new Date().toISOString(), modelCalls: 0, browserCalls: 0, valid: true,
  baselineInputDigest: baseInputs.digest, candidateInputDigest: inputs.digest, frozenInputsPerArm: 124,
  changedInputs: changedInputs.map(path => ({ path, baseline: baseInputs.hashes[path], candidate: inputs.hashes[path] })),
  equalInputPaths: Object.keys(inputs.hashes).filter(path => !changedInputs.includes(path)),
  baselineRecorded: baseInputs.recorded, candidateRecorded: inputs.recorded, metaDifferences,
  counts, preScaffoldFiles: 95, scaffoldFiles: 174, actorSourceFilesWithFactualSetup: 175,
  preScaffoldInventoriesEqual: true, snapshotDifferences, liveAndSavedSourceMatchesFrozenOrigins: true,
  frozenSourceHelperAndIndependentWalkAgree: true, currentSourceDigest: captured.digest,
  currentGeneratedExtras: extras, emptyUnexpectedDirectories: unexpected,
  workspace: meta.work, runEntries: (await readdir(run)).sort(),
  factualSetupDifference: 'Only inputDigest differs; all other fields equal baseline and exact candidate live/saved bytes agree. No repository/held-out path in factual record.',
  matchedCapabilityEnvironment: capabilityCommand.environment, capabilityArgumentsEqualAfterMechanicalPathMapping: true,
  sameOfflineInstallCommand: true, wholeInstallEnvironmentEqual: false, dependencyExitCode: installed.code,
  qualified: true, originalStrictAuditPassed: false, originalVerifierSha256, installEnvironmentDifferences,
  impactEvidence: { lifecycleOutputSha256: hash(impactBytes), dependencyInventorySha256: hash(dependencyBytes), currentDependencyDigest: dependencyInventory.candidate.digest },
  disposition: 'Root accepted this exact non-material install-only provenance deviation after read-only impact evidence, not exact whole-install environment identity. Original records and failed strict audit remain unchanged. Baseline current dependency inventory follows its actor reinstall and is not a historical first-install inventory.',
  setupProofFilesVerified: Object.keys(gate.evidenceHashes).length, setupHelperHashes: gate.coordinatorHelpers,
  rawProbe: { sha256: hash(rawProbeBytes), bytes: rawProbeBytes.length, exposedStackPath: stackPath, contentsChangedOrSanitized: false },
  limitations: ['Generated dependency and Next build trees are not exhaustively content-audited.', 'Raw capability probe reveals current cohort evaluator path, as in the baseline; no held-out solution content is thereby established.', 'Configuration isolation is not a read jail or blinding. Actual actor access still requires its own completed-stream audit.', 'Fresh timestamps, random workspace path, input digest/source commit, independent probe timings and generated diagnostic bytes are per-run setup differences, not additional coaching.', 'This read-only material audit is not the coordinator final readiness gate or paid launch.'],
};
if (process.argv.includes('--save')) await writeFile(join(study, 'candidate-prelaunch-qualified-audit.json'), JSON.stringify(observation, null, 2) + '\n', { flag: 'wx' });
process.stdout.write(JSON.stringify({ valid: true, qualified: true, wholeInstallEnvironmentEqual: false, originalStrictAuditPassed: false, candidateInputDigest: inputs.digest, changedInputs, sourceFiles: captured.files.length, workspace: meta.work, setupProofFilesVerified: observation.setupProofFilesVerified, modelCalls: 0, browserCalls: 0 }, null, 2) + '\n');
