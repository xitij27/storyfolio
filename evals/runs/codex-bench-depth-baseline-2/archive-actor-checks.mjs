// Archive existing actor diagnostics only. No model, build, browser or overwrite.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { copyFile, lstat, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const cohort = dirname(fileURLToPath(import.meta.url));
const source = '/var/tmp/storyfolio-comparison-runtime-20261012/storyfolio-evals/build-bench-depth-2-tpXd60/checks';
const destination = join(cohort, 'actor-checks');
const turn = 'bench-depth-2/baseline-1/turns/01';
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const rawStream = await readFile(join(cohort, turn, 'stream.jsonl'));
assert.equal(sha256(rawStream), '80e8bba144092ac653bb10b4dc2ade0f6573880132f3ec0e76c023d7ab2e013c');
const rawResult = await readFile(join(cohort, turn, 'result.json'));
assert.equal(sha256(rawResult), '4a17ae79418f4d40a1055635921bd201dfa4defafb220a79a394a4d7da129107');
assert.equal(JSON.parse(rawResult).complete, true);
assert.equal(JSON.parse(await readFile(join(cohort, turn, 'process.json'))).code, 0);
const events = rawStream.toString('utf8').trimEnd().split('\n').map(JSON.parse);
assert.equal(events.at(-1).type, 'turn.completed');
const commands = events.filter(event => event.type === 'item.completed' && event.item?.type === 'command_execution').map(event => event.item);
const trees = [
  { path: '2026-10-11T22-51-04-894Z', events: ['item_17', 'item_23'], meaning: 'Initial production syntax/build failure' },
  { path: '2026-10-11T22-51-19-710Z', events: ['item_21', 'item_24', 'item_26', 'item_32', 'item_35'], meaning: 'First complete seven-case actor matrix' },
  { path: '2026-10-11T22-55-05-707Z', events: ['item_39', 'item_44', 'item_45', 'item_48', 'item_49', 'item_50', 'item_52', 'item_53'], meaning: 'Final complete seven-case actor matrix; copied by actor into docs/story/review/production' },
  { path: 'prototype-review', events: ['item_29', 'item_31', 'item_33', 'item_36', 'item_43', 'item_46', 'item_53'], meaning: 'Latest retained supplemental keyboard/short viewport images and report; actor overwrote earlier same-path bytes on rerun' },
  { path: 'review-main', events: ['item_32'], meaning: 'Four contact sheets created while first matrix was still accumulating' },
  { path: 'review-complete', events: ['item_35'], meaning: 'Five contact sheets of the first complete matrix' },
  { path: 'review-extra', events: ['item_36'], meaning: 'Contact sheet from earlier supplemental captures, before item_43 overwrote prototype-review originals' },
];
for (const tree of trees) for (const id of tree.events) assert.ok(commands.some(command => command.id === id), id);
async function assertParents(path) {
  let current = path;
  while (current !== dirname(current)) {
    const info = await lstat(current);
    assert.ok(info.isDirectory() && !info.isSymbolicLink(), `Non-directory or symlink: ${current}`);
    current = dirname(current);
  }
}
await assertParents(source);
await assertParents(cohort);
const files = [];
async function inventory(relative) {
  const path = join(source, relative), info = await lstat(path);
  assert.equal(info.isSymbolicLink(), false, `Symlink: ${path}`);
  if (info.isDirectory()) {
    for (const entry of (await readdir(path)).sort()) await inventory(join(relative, entry));
  } else {
    assert.ok(info.isFile(), `Non-regular file: ${path}`);
    const bytes = await readFile(path);
    files.push({ path: relative, bytes: bytes.length, sha256: sha256(bytes) });
  }
}
for (const tree of trees) await inventory(tree.path);
const bytes = files.reduce((sum, file) => sum + file.bytes, 0);
const manifest = {
  schemaVersion: 1, date: '2026-10-12', modelCalls: 0, source, sourceStream: `${turn}/stream.jsonl`,
  sourceStreamSha256: sha256(rawStream), sourceResultSha256: sha256(rawResult),
  provenance: 'Existing actor-owned diagnostics archived after the completed turn and root-confirmed settled process. No commands were rerun; this is not independent acceptance.',
  exclusions: ['setup-capability, separately retained inherited coordinator setup evidence'],
  trees, fileCount: files.length, bytes, files,
  limitations: ['Hashes bind bytes at archival time; most ignored files were not hashed by the original post-turn snapshot.', 'Referenced source revisions vary across capture trees.', 'The actor reused prototype-review paths; only the remaining latest bytes can be archived. Earlier review-extra sheet retains an earlier derived view, not recoverable originals.'],
};
if (process.argv.includes('--inventory')) {
  process.stdout.write(JSON.stringify({ fileCount: files.length, bytes, trees: trees.map(tree => ({ ...tree, files: files.filter(file => file.path.startsWith(tree.path + '/')).length })) }, null, 2) + '\n');
} else {
  await mkdir(destination); // Existing archive is an error; never overwrite it.
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
  process.stdout.write(JSON.stringify({ archived: true, destination, fileCount: files.length, bytes, modelCalls: 0, overwrites: false }, null, 2) + '\n');
}
