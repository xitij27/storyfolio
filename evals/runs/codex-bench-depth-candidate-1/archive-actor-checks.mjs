// Preserve existing partial actor evidence. No model, build, browser or overwrite.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { copyFile, lstat, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const cohort = dirname(fileURLToPath(import.meta.url));
const source = '/var/tmp/storyfolio-comparison-runtime-20261012/storyfolio-evals/build-bench-depth-2-r5MXXB/checks';
const destination = join(cohort, 'actor-checks');
const turn = 'bench-depth-2/baseline-1/turns/01';
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const rawStream = await readFile(join(cohort, turn, 'stream.jsonl'));
assert.equal(sha256(rawStream), '557925f03775b30d13a10cf3bed4cda208cd1c5252a81f5742c191fca1b03e5d');
const rawResult = await readFile(join(cohort, turn, 'result.json'));
assert.equal(sha256(rawResult), '8dd3a7ae4b61df512ae02ae2817aa84fb5fc78a89d229208701fa59a8fe08d50');
const result = JSON.parse(rawResult);
assert.equal(result.complete, false);
assert.equal(result.timedOut, true);
assert.equal(JSON.parse(await readFile(join(cohort, turn, 'process.json'))).code, -1);
const events = rawStream.toString('utf8').trimEnd().split('\n').map(JSON.parse);
assert.equal(events.length, 145);
assert.equal(events.some(event => event.type === 'turn.completed'), false);
const trees = [
  { path: '2026-10-11T23-37-19-007Z', events: ['item_20', 'item_24', 'item_28', 'item_35', 'item_37', 'item_39'], meaning: 'First interrupted sequential production matrix, command exit 143' },
  { path: '2026-10-11T23-39-23-471Z', events: ['item_36', 'item_40'], meaning: 'Second interrupted sequential matrix, command exit 143' },
  { path: '2026-10-11T23-40-16-221Z', events: ['item_41', 'item_46', 'item_47', 'item_48'], meaning: 'Interrupted matrix after aspect/texture changes, command exit 143' },
  { path: '2026-10-11T23-42-11-077Z', events: ['item_50', 'item_55', 'item_56'], meaning: 'First complete seven-case parallel matrix, before synchronized travel' },
  { path: '2026-10-11T23-44-04-802Z', events: ['item_59', 'item_65', 'item_66', 'item_68', 'item_73'], meaning: 'Complete seven-case matrix after synchronized travel, before final preserveDrawingBuffer edit' },
  { path: '2026-10-11T23-47-57-722Z', events: ['item_72', 'item_77'], meaning: 'Completed reduced-only skip-build diagnostic, before final edit' },
  { path: '2026-10-11T23-49-17-223Z', events: ['item_74', 'item_77'], meaning: 'Last reduced-motion build/check begun after preserveDrawingBuffer edit; no command completion before actor timeout' },
  { path: 'diagnostic-phone', events: ['item_32'], meaning: 'Empty failed connection diagnostic directory' },
  { path: 'diagnostic-wide', events: ['item_33'], meaning: 'Empty failed connection diagnostic directory' },
  { path: 'prototype-review', events: ['item_45', 'item_47', 'item_48'], meaning: 'Interrupted supplemental three-position transition review, no report' },
  { path: 'prototype-review-final', events: ['item_51'], meaning: 'Empty failed supplemental readiness directory' },
  { path: 'prototype-review-complete', events: ['item_53', 'item_55', 'item_56'], meaning: 'Completed supplemental midpoint/short-height/reduced-phone review before synchronized travel' },
  { path: 'prototype-review-synchronized', events: ['item_62', 'item_65', 'item_66', 'item_73'], meaning: 'Completed supplemental review after synchronized travel, before final edit' },
  { path: 'reduced-diagnostic', events: ['item_70'], meaning: 'Focused desktop reduced-motion scheduling viewport and canvas captures' },
  { path: 'unit-tests.txt', events: ['item_52'], meaning: 'Actor local unit-test log before added clearance regression' },
  { path: 'unit-tests-final.txt', events: ['item_61'], meaning: 'Actor local unit-test log with clearance regression, before final edit' },
];
for (const tree of trees) for (const id of tree.events) assert.ok(events.some(event => event.item?.id === id), id);
async function assertParents(path) {
  for (let current = path; current !== dirname(current); current = dirname(current)) {
    const stat = await lstat(current);
    assert.ok(stat.isDirectory() && !stat.isSymbolicLink(), current);
  }
}
await assertParents(source);
await assertParents(cohort);
const files = [], emptyDirectories = [];
async function inventory(relative) {
  const path = join(source, relative), stat = await lstat(path);
  assert.equal(stat.isSymbolicLink(), false, path);
  if (stat.isDirectory()) {
    const entries = (await readdir(path)).sort();
    if (!entries.length) emptyDirectories.push(relative);
    for (const name of entries) await inventory(join(relative, name));
  } else {
    assert.equal(stat.isFile(), true, path);
    const bytes = await readFile(path);
    files.push({ path: relative, bytes: bytes.length, sha256: sha256(bytes) });
  }
}
for (const tree of trees) await inventory(tree.path);
const bytes = files.reduce((sum, file) => sum + file.bytes, 0);
const manifest = {
  schemaVersion: 1, date: '2026-10-12', modelCalls: 0, source,
  sourceStream: `${turn}/stream.jsonl`, sourceStreamSha256: sha256(rawStream), sourceResultSha256: sha256(rawResult),
  provenance: 'Existing actor-owned diagnostics archived after root-confirmed process settlement at the actor deadline. No commands rerun; not independent acceptance or a completed actor turn.',
  actorComplete: false, actorTimedOut: true,
  exclusions: ['setup-capability, separately retained inherited coordinator setup evidence'],
  trees, fileCount: files.length, bytes, emptyDirectories, files,
  limitations: ['Hashes bind archival-time bytes; ignored originals were not included in the runner source snapshot.', 'Capture revisions differ. Complete actor matrices predate the final preserveDrawingBuffer edit.', 'The last check command has no completed stream event; files remaining in its directory do not establish completion.'],
};
if (process.argv.includes('--inventory')) {
  process.stdout.write(JSON.stringify({ fileCount: files.length, bytes, emptyDirectories, trees: trees.map(tree => ({ ...tree, files: files.filter(file => file.path === tree.path || file.path.startsWith(tree.path + '/')).length })) }, null, 2) + '\n');
} else {
  await mkdir(destination);
  for (const path of emptyDirectories) await mkdir(join(destination, path), { recursive: true });
  for (const file of files) {
    const from = join(source, file.path), to = join(destination, file.path);
    await assertParents(dirname(from));
    assert.equal((await lstat(from)).isSymbolicLink(), false);
    assert.equal(sha256(await readFile(from)), file.sha256, `Source changed: ${file.path}`);
    await mkdir(dirname(to), { recursive: true });
    await assertParents(dirname(to));
    await copyFile(from, to, constants.COPYFILE_EXCL);
    assert.equal(sha256(await readFile(to)), file.sha256, `Copied bytes differ: ${file.path}`);
  }
  await writeFile(join(destination, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
  process.stdout.write(JSON.stringify({ archived: true, destination, fileCount: files.length, bytes, emptyDirectories, modelCalls: 0, overwrites: false }, null, 2) + '\n');
}
