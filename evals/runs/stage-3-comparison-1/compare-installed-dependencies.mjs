// Metadata and byte-hash comparison only. Do not run packages or follow symlinks.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readFile, readdir, lstat, readlink, realpath, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, '../../..');
const hash = value => createHash('sha256').update(value).digest('hex');
const cohorts = ['codex-bench-depth-baseline-2', 'codex-bench-depth-candidate-1'];
const inventories = [];
for (const cohort of cohorts) {
  const meta = JSON.parse(await readFile(join(root, 'evals/runs', cohort, 'bench-depth-2/baseline-1/meta.json')));
  const directory = join(meta.work, 'node_modules');
  assert.equal(await realpath(directory), directory);
  const records = [];
  async function visit(prefix = '') {
    for (const entry of (await readdir(join(directory, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name, location = join(directory, path);
      const before = await lstat(location), mode = before.mode & 0o777;
      if (entry.isSymbolicLink()) records.push({ path, type: 'symlink', mode, target: await readlink(location) });
      else if (entry.isDirectory()) { records.push({ path, type: 'directory', mode }); await visit(path); }
      else {
        assert.ok(entry.isFile(), `Unsupported dependency entry: ${location}`);
        const digest = createHash('sha256');
        for await (const chunk of createReadStream(location)) digest.update(chunk);
        const after = await lstat(location);
        assert.equal(after.isFile(), true);
        assert.equal(after.ino, before.ino);
        assert.equal(after.size, before.size);
        assert.equal(after.mtimeMs, before.mtimeMs, `Concurrent mutation: ${location}`);
        records.push({ path, type: 'file', mode, bytes: before.size, sha256: digest.digest('hex') });
      }
    }
  }
  await visit();
  records.sort((a, b) => a.path.localeCompare(b.path));
  inventories.push({ cohort, root: directory, recordCount: records.length,
    files: records.filter(entry => entry.type === 'file').length,
    directories: records.filter(entry => entry.type === 'directory').length,
    symlinks: records.filter(entry => entry.type === 'symlink').length,
    bytes: records.reduce((sum, entry) => sum + (entry.bytes ?? 0), 0),
    digest: hash(JSON.stringify(records)), records });
}
const [baseline, candidate] = inventories;
const index = value => new Map(value.records.map(entry => [entry.path, entry]));
const first = index(baseline), second = index(candidate);
const differences = [...new Set([...first.keys(), ...second.keys()])].sort().filter(path => JSON.stringify(first.get(path)) !== JSON.stringify(second.get(path))).map(path => ({ path, baseline: first.get(path) ?? null, candidate: second.get(path) ?? null }));
const result = {
  schemaVersion: 1, date: new Date().toISOString(), modelCalls: 0, browserCalls: 0, packageExecutions: 0,
  baseline: { ...baseline, records: undefined }, candidate: { ...candidate, records: undefined },
  exactMetadataAndBytesMatch: differences.length === 0, differences,
  baselineRecords: baseline.records,
  reconstruction: 'Candidate records are baselineRecords with the listed exact differences applied; null removes an entry. Both full sorted inventories were independently read and hashed.',
  limitations: ['This compares the current retained dependency trees. The baseline actor subsequently reinstalled dependencies; this is not a preserved hash inventory of the initial baseline install.', 'It compares regular-file bytes, names, permissions and symlink targets without following links. Ownership, timestamps, allocation and inode numbers are not cross-arm equality criteria.', 'Equal current package bytes do not establish that every historical install side effect or environmental value was identical. No installs, package lifecycle scripts, model calls or runtime checks were rerun.'],
};
await writeFile(join(study, 'candidate-dependency-inventory.json'), JSON.stringify(result, null, 2) + '\n', { flag: 'wx' });
process.stdout.write(JSON.stringify({ exactMetadataAndBytesMatch: result.exactMetadataAndBytesMatch, baseline: result.baseline, candidate: result.candidate, differenceCount: differences.length, differences: differences.slice(0, 15) }, null, 2) + '\n');
