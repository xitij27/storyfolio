// Read-only actor artifact/access/process audit. No model, browser, build or signals.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { lstat, readdir, readFile, readlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const study = dirname(fileURLToPath(import.meta.url));
const repo = resolve(study, '../../..');
const cohort = join(repo, 'evals/runs/codex-bench-entry-baseline-1');
const run = join(cohort, 'bench-entry-1/baseline-1');
const turn = join(run, 'turns/01');
const work = '/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-bench-entry-1-sa1yxh';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const json = async p => JSON.parse(await readFile(p, 'utf8'));
const result = await json(join(turn, 'result.json'));
const processResult = await json(join(turn, 'process.json'));
const outer = await json(join(study, 'actor-command/result.json'));
const tool = await json(join(study, 'actor-tool-poll-13.json'));
assert.equal(result.complete, false); assert.equal(result.timedOut, true);
assert.equal(result.usage, null); assert.equal(processResult.code, -1);
assert.equal(outer.code, 1); assert.equal(tool.exit_code, 1);
const raw = await readFile(join(turn, 'stream.jsonl'));
const events = raw.toString('utf8').trimEnd().split('\n').map(JSON.parse);
const commands = events.flatMap((event, index) => event.type === 'item.started' && event.item?.type === 'command_execution' ? [{ id: event.item.id, startLine: index + 1, command: event.item.command }] : []);
for (const command of commands) {
  const end = events.findIndex(event => event.type === 'item.completed' && event.item?.id === command.id);
  command.completedLine = end < 0 ? null : end + 1;
  command.exitCode = end < 0 ? null : events[end].item.exit_code;
}
let artifactsVerified = 0;
for (const [path, hash] of Object.entries(result.artifacts)) {
  const stat = await lstat(join(turn, path));
  assert.ok(stat.isFile() && !stat.isSymbolicLink(), path);
  assert.equal(sha(await readFile(join(turn, path))), hash, path); artifactsVerified++;
}
const snapshot = result.snapshot.files;
const source = [];
for (const [path, info] of Object.entries(snapshot)) {
  const stat = await lstat(join(work, path)); assert.ok(stat.isFile() && !stat.isSymbolicLink(), path);
  const bytes = await readFile(join(work, path)); assert.equal(bytes.length, info.size, path); assert.equal(sha(bytes), info.hash, path);
  const beforePath = join(turn, 'before/files', path);
  let before = null;
  try { before = sha(await readFile(beforePath)); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (before !== info.hash) source.push({ path, change: before ? 'modified' : 'added', before, after: info.hash });
}
const metadata = [];
async function inspect(relative) {
  const stat = await lstat(join(work, relative));
  const entry = { path: relative, type: stat.isSymbolicLink() ? 'symlink' : stat.isDirectory() ? 'directory' : stat.isFile() ? 'file' : 'other', bytes: stat.size, mtime: stat.mtime.toISOString() };
  metadata.push(entry);
  assert.equal(stat.isSymbolicLink(), false, relative);
  if (stat.isDirectory()) {
    const names = (await readdir(join(work, relative))).sort(); entry.entryCount = names.length;
    // Never open potential credential directories or any of their children.
    if (relative === '.aws' || relative === '.codex') { assert.equal(names.length, 0, `${relative}: nonempty, stop without opening contents`); return; }
    for (const name of names) await inspect(`${relative}/${name}`);
  }
}
for (const path of ['.aws', '.codex', '.git-local']) await inspect(path);
const config = await readFile(join(work, '.git-local/config'), 'utf8');
// Report only the expected nonsecret core.bare field, never arbitrary config text.
const bare = config.match(/^\s*bare\s*=\s*(\w+)\s*$/m)?.[1];
assert.equal(bare, 'false');
const processes = [], unavailable = [];
const currentUid = process.getuid();
for (const pid of (await readdir('/proc')).filter(name => /^\d+$/.test(name)).sort((a,b) => +a - +b)) {
  let stat;
  try { stat = await lstat(`/proc/${pid}`); } catch (error) { if (error.code === 'ENOENT') continue; throw error; }
  if (stat.uid !== currentUid) continue;
  let cwd;
  try { cwd = await readlink(`/proc/${pid}/cwd`); } catch (error) { if (error.code !== 'ENOENT') unavailable.push({ pid: +pid, operation: 'cwd', code: error.code }); }
  const matches = [];
  try {
    for (const fd of await readdir(`/proc/${pid}/fd`)) {
      let path; try { path = await readlink(`/proc/${pid}/fd/${fd}`); } catch (error) { if (error.code === 'ENOENT') continue; throw error; }
      if (path === work || path.startsWith(work + '/')) matches.push({ fd: +fd, path });
    }
  } catch (error) { if (error.code !== 'ENOENT') unavailable.push({ pid: +pid, operation: 'fd', code: error.code }); }
  if (cwd === work || cwd?.startsWith(work + '/') || matches.length) processes.push({ pid: +pid, cwd, comm: (await readFile(`/proc/${pid}/comm`, 'utf8')).trim(), descriptors: matches });
}
const output = {
  schemaVersion: 1, observedAt: new Date().toISOString(), command: 'node evals/runs/stage-3-natural-entry-1/audit-actor.mjs', modelCalls: 0,
  work, resultSha256: sha(await readFile(join(turn, 'result.json'))), streamSha256: sha(raw),
  complete: result.complete, timedOut: result.timedOut, durationMs: result.durationMs, usage: result.usage,
  interruptedBy: result.interruptedBy, processCode: processResult.code, outer, terminalToolExit: tool.exit_code,
  eventCount: events.length, eventTypes: Object.fromEntries([...new Set(events.map(e => e.type))].map(type => [type, events.filter(e => e.type === type).length])),
  itemTypes: [...new Set(events.flatMap(e => e.item ? [e.item.type] : []))],
  turnCompletedEvents: events.filter(e => e.type === 'turn.completed').length,
  completedCommandCount: commands.filter(c => c.completedLine !== null).length, commands,
  agentMessages: events.flatMap((e,i) => e.type === 'item.completed' && e.item?.type === 'agent_message' ? [{ line: i + 1, id: e.item.id, text: e.item.text }] : []),
  artifactsVerified, liveSnapshotFilesVerified: Object.keys(snapshot).length, changesAgainstTurnBefore: source,
  unexpected: result.snapshot.unexpected, safeDirectoryMetadata: metadata, generatedGitCoreBare: bare,
  processAudit: { uid: currentUid, matches: processes, unavailable, method: 'Same-UID /proc cwd and file-descriptor symlink targets only. No argv, environment, credential contents or signals.', limitation: 'Point-in-time limited visibility, not proof that an inaccessible or detached process can never write later.' },
  limitations: ['Null usage means unknown token cost, not zero.', 'The stream contains only command_execution and agent_message items. Image-view tool visibility is not established by this stream.', 'The 180-file actor snapshot omits 18 generated nonbare .git-local files, which remain inside the frozen capture source boundary. This audit does not relax equality.', 'Empty credential directories were inspected by metadata and entry count only.']
};
await writeFile(join(study, 'actor-audit-result.json'), JSON.stringify(output, null, 2) + '\n', { flag: 'wx' });
console.log(JSON.stringify({ saved: 'actor-audit-result.json', observedAt: output.observedAt, artifactsVerified, liveSnapshotFilesVerified: output.liveSnapshotFilesVerified, commandCount: commands.length, completedCommandCount: output.completedCommandCount, unmatchedCommands: commands.filter(c => c.completedLine === null).map(c => c.id), metadataFiles: metadata.filter(e => e.type === 'file').length, generatedGitCoreBare: bare, processAudit: output.processAudit, resultSha256: output.resultSha256, streamSha256: output.streamSha256 }, null, 2));
