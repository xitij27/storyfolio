// Archive existing actor diagnostics exclusively. No model, build, browser or signals.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { copyFile, lstat, mkdir, readFile, readdir, readlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const study = dirname(fileURLToPath(import.meta.url));
const repo = resolve(study, '../../..');
const cohort = join(repo, 'evals/runs/codex-bench-entry-baseline-1');
const work = '/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-bench-entry-1-sa1yxh';
const source = join(work, 'checks'), destination = join(cohort, 'actor-checks');
const turn = 'bench-entry-1/baseline-1/turns/01';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const json = async path => JSON.parse(await readFile(path, 'utf8'));
const auditBytes = await readFile(join(study, 'actor-audit-result.json'));
const audit = JSON.parse(auditBytes);
assert.equal(audit.complete, false); assert.equal(audit.timedOut, true);
assert.equal(audit.terminalToolExit, 1); assert.deepEqual(audit.processAudit.matches, []);
assert.equal(sha(await readFile(join(cohort, turn, 'stream.jsonl'))), '88ec8ac7f6bdaa0318dccb451404047d2086a98472d60168b8923bfc45fbf4b2');
assert.equal(sha(await readFile(join(cohort, turn, 'result.json'))), 'd758c277d2af1700d5a3c62913501917bee457f4df9da3b13d32266f9de6a291');
const inputs = join(cohort, 'inputs'), inputManifest = await json(join(inputs, 'manifest.json'));
assert.equal(inputManifest.digest, '504064164d5410a3d8cba07e7c877989924a3a4b15b67d76af92ec28e920238a');
assert.equal(sha(JSON.stringify(inputManifest.hashes, null, 2) + '\n'), inputManifest.digest);
const caseFile = await json(join(inputs, 'case.json'));
for (const [path, digest] of Object.entries(inputManifest.hashes)) {
  const bytes = await readFile(join(inputs, path)); assert.equal(sha(bytes), digest, path);
  let current;
  if (path === 'case.json') current = inputManifest.casePath;
  else if (path === 'expectations.json') current = caseFile.expectations;
  else if (path === 'rubric.md') current = caseFile.rubric;
  else if (path === 'protocol.md') current = caseFile.protocol;
  else if (path === 'prompts/turn1.md') current = caseFile.prompts[0];
  else if (path.startsWith('fixture/')) current = `${caseFile.workspaceRoot}/${path.slice(8)}`;
  else if (path.startsWith('skill/')) current = `skills/storyfolio/${path.slice(6)}`;
  else if (path.startsWith('implementation/')) current = path.slice(15);
  else assert.equal(path, 'capabilities.json');
  if (current) assert.equal(sha(await readFile(join(repo, current))), digest, current);
}
const trees = [
  { path: '2026-10-12T02-26-04-370Z', events: ['item_15', 'item_20'], meaning: 'Initial build failed at type error, no images.' },
  { path: '2026-10-12T02-26-34-213Z', events: ['item_19', 'item_21', 'item_22', 'item_25', 'item_26', 'item_27', 'item_32', 'item_48'], meaning: 'Earlier matrix completed exit 1, actor later invalidated overlapping rebuild evidence.' },
  { path: 'final', events: ['item_30', 'item_32', 'item_36', 'item_51'], meaning: 'Earlier matrix completed exit 1, actor later invalidated overlapping rebuild evidence.' },
  { path: 'accepted', events: ['item_37', 'item_40', 'item_43', 'item_47', 'item_56'], meaning: 'No matching command completion in stream; directory name is not an acceptance result.' },
  { path: 'release', events: ['item_44', 'item_49', 'item_50', 'item_51'], meaning: 'Interrupted matrix with actor command exit 143.' },
  { path: 'verified', events: ['item_54', 'item_56', 'item_58'], meaning: 'Last matrix started after last application edit, no matching command completion before timeout.' },
  { path: 'interaction-review', events: ['item_33', 'item_35', 'item_36', 'item_41', 'item_45', 'item_48'], meaning: 'Actor supplemental attempts reused this directory. Later command exit 0 and actor-authored report, not independent acceptance.' },
  { path: 'interaction-sheets', events: ['item_45', 'item_49'], meaning: 'Four actor-generated derivative contact sheets, not originals.' },
  { path: 'accepted-sheets', events: ['item_47', 'item_51'], meaning: 'Three actor-generated derivative contact sheets from incomplete matrix.' },
  { path: 'verified-interactions', events: ['item_57'], meaning: 'Final supplemental screenshots, no report or matching command completion before timeout.' },
  { path: 'final-tests.log', events: ['item_34'], meaning: 'Actor unit-test log before final source revisions.' },
  { path: 'review-server.log', events: ['item_35', 'item_41'], meaning: 'Same path overwritten by actor commands; only surviving bytes can be archived.' },
  { path: 'review-final-server.log', events: ['item_57'], meaning: 'Server log for unfinished final supplemental review.' },
];
for (const tree of trees) for (const event of tree.events) assert.ok(audit.commands.some(command => command.id === event), event);
assert.deepEqual((await readdir(source)).sort(), [...trees.map(tree => tree.path), 'setup-capability'].sort());
async function parents(path) {
  for (let cursor = path; cursor !== dirname(cursor); cursor = dirname(cursor)) {
    const stat = await lstat(cursor); assert.ok(stat.isDirectory() && !stat.isSymbolicLink(), cursor);
  }
}
await parents(source); await parents(cohort);
const processVisibility = { observedAt: new Date().toISOString(), matches: [], unavailable: [] };
for (const pid of (await readdir('/proc')).filter(value => /^\d+$/.test(value))) {
  let stat; try { stat = await lstat(`/proc/${pid}`); } catch (error) { if (error.code === 'ENOENT') continue; throw error; }
  if (stat.uid !== process.getuid()) continue;
  for (const operation of ['cwd', 'fd']) try {
    const links = operation === 'cwd' ? [`/proc/${pid}/cwd`] : (await readdir(`/proc/${pid}/fd`)).map(fd => `/proc/${pid}/fd/${fd}`);
    for (const link of links) {
      let path; try { path = await readlink(link); } catch (error) { if (error.code === 'ENOENT') continue; throw error; }
      if (path === work || path.startsWith(work + '/')) processVisibility.matches.push({ pid: +pid, operation, path });
    }
  } catch (error) { if (error.code !== 'ENOENT') processVisibility.unavailable.push({ pid: +pid, operation, code: error.code }); }
}
assert.deepEqual(processVisibility.matches, [], 'A visible workspace process or file descriptor remains');
const files = [], emptyDirectories = [];
async function inventory(relative, output) {
  const path = join(source, relative), stat = await lstat(path);
  assert.equal(stat.isSymbolicLink(), false, relative);
  if (stat.isDirectory()) {
    const names = (await readdir(path)).sort(); if (!names.length && output === files) emptyDirectories.push(relative);
    for (const name of names) await inventory(`${relative}/${name}`, output);
  } else {
    assert.equal(stat.isFile(), true, relative); const bytes = await readFile(path);
    output.push({ path: relative, bytes: bytes.length, sha256: sha(bytes), mtime: stat.mtime.toISOString() });
  }
}
for (const tree of trees) await inventory(tree.path, files);
const bytes = files.reduce((sum, file) => sum + file.bytes, 0);
const contactSheets = files.filter(file => /^(?:interaction-sheets|accepted-sheets)\/.*\.png$/.test(file.path)).length;
const pngCount = files.filter(file => file.path.endsWith('.png')).length;
const manifest = {
  schemaVersion: 1, observedAt: new Date().toISOString(), modelCalls: 0, source,
  actorAudit: '../stage-3-natural-entry-1/actor-audit-result.json', actorAuditSha256: sha(auditBytes),
  sourceStream: `${turn}/stream.jsonl`, sourceStreamSha256: audit.streamSha256, sourceResultSha256: audit.resultSha256,
  frozenInputsVerified: Object.keys(inputManifest.hashes).length, frozenInputDigest: inputManifest.digest, currentImplementationAndSkillMatchFrozen: true,
  provenance: 'Existing actor-owned diagnostics archived after closed timeout and limited process checks. No commands rerun. Not independent acceptance.',
  actorComplete: false, actorTimedOut: true, processVisibility, trees, fileCount: files.length, bytes,
  pngCount, originalPngCount: pngCount - contactSheets, contactSheetPngCount: contactSheets,
  coordinatorOriginalImageReview: 'Not performed for these actor-owned images; all remain unreviewed by this audit.',
  exclusions: ['setup-capability, separately retained inherited coordinator setup evidence', 'All source, credentials, Git metadata, dependencies and generated build trees outside the thirteen named actor check paths'],
  emptyDirectories, files,
  limitations: ['Hashes bind surviving archival-time bytes, not every historical overwritten revision.', 'Actor capture revisions differ; earlier overlapping matrices were explicitly disclaimed by the actor.', 'Missing terminal events and absent final reports are not repaired by archiving remaining files.', 'Limited /proc visibility is recorded, not a claim of a read jail or proof about inaccessible detached processes.', 'No independent visual acceptance, final-source pass or complete actor turn is inferred.']
};
if (process.argv.includes('--inventory')) {
  await writeFile(join(study, 'actor-checks-inventory.json'), JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
} else {
  const earlier = await json(join(study, 'actor-checks-inventory.json'));
  assert.deepEqual(files, earlier.files, 'Checks changed after inventory');
  await mkdir(destination);
  for (const path of emptyDirectories) await mkdir(join(destination, path), { recursive: true });
  for (const file of files) {
    const from = join(source, file.path), to = join(destination, file.path);
    await parents(dirname(from)); assert.equal((await lstat(from)).isSymbolicLink(), false);
    assert.equal(sha(await readFile(from)), file.sha256, file.path);
    await mkdir(dirname(to), { recursive: true }); await parents(dirname(to));
    await copyFile(from, to, constants.COPYFILE_EXCL);
    assert.equal(sha(await readFile(to)), file.sha256, file.path);
  }
  const after = []; for (const tree of trees) await inventory(tree.path, after);
  assert.deepEqual(after, files, 'Checks changed during archival');
  await writeFile(join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
}
console.log(JSON.stringify({ inventoryOnly: process.argv.includes('--inventory'), destination, fileCount: files.length, bytes, pngCount, originalPngCount: pngCount - contactSheets, contactSheetPngCount: contactSheets, processVisibility, frozenInputsVerified: manifest.frozenInputsVerified, modelCalls: 0, overwrites: false }, null, 2));
