// Scoped read-only metadata audit after root-confirmed terminal closure.
// No argv/environment/fd-content reads, subprocess, runtime or signals.
import assert from "node:assert/strict";
import { lstat, readFile, readdir, readlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
assert.deepEqual(process.argv.slice(2), ["--root-confirmed-closed"]);
const directory = dirname(fileURLToPath(import.meta.url));
const load = async path => JSON.parse(await readFile(join(directory, path)));
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const started = new Date().toISOString();
const rawTool = await load("../baseline-environment-tool-poll-1.json"), terminal = rawTool.result ?? rawTool;
const outer = await load("../baseline-environment-command/result.json");
const run = "../../../../codex-full-journey-baseline-1/full-journey-1/baseline-1";
const inner = await load(run + "/setup/environment-proof/process.json");
const command = await load(run + "/setup/environment-proof/command.json");
assert.equal(terminal.session_id, undefined); assert.equal(terminal.exit_code, 1);
assert.equal(outer.childClosed, true); assert.equal(outer.childExited, true); assert.equal(outer.childPid, 323114);
assert.equal(outer.interruptedBy, null); assert.equal(outer.signal, null); assert.equal(inner.externalSignal, null); assert.equal(inner.timedOut, false);
const uid = process.getuid(), scopes = [command.cwd, command.runtimeDirectory, join(directory, "../baseline-environment-command"), join(directory, run, "setup/environment-proof")];
const known = [outer.recorderPid, outer.childPid, inner.childPid];
const rows = [], inaccessible = [], ties = []; let fdLinks = 0;
const within = target => scopes.some(scope => target === scope || target.startsWith(scope + "/"));
for (const name of await readdir("/proc")) {
  if (!/^\d+$/.test(name)) continue;
  const pid = Number(name), base = "/proc/" + name;
  try {
    if ((await lstat(base)).uid !== uid) continue;
    const raw = await readFile(base + "/stat", "utf8"), end = raw.lastIndexOf(")"), fields = raw.slice(end + 1).trim().split(/\s+/);
    rows.push({ pid, comm: raw.slice(raw.indexOf("(") + 1, end), state: fields[0], ppid: Number(fields[1]), processGroupId: Number(fields[2]), sessionId: Number(fields[3]), startTimeTicks: fields[19] });
  } catch (error) { if (!["ENOENT", "ESRCH"].includes(error.code)) inaccessible.push({ pid, type: "stat", code: error.code }); }
}
const related = new Set(known); let grew;
do { grew = false; for (const row of rows) if (related.has(row.ppid) && !related.has(row.pid)) { related.add(row.pid); grew = true; } } while (grew);
for (const row of rows) {
  if (related.has(row.pid)) ties.push({ type: known.includes(row.pid) ? "known-pid-present" : "known-descendant", ...row });
  try { const target = await readlink(`/proc/${row.pid}/cwd`); if (within(target)) ties.push({ type: "cwd", target, ...row }); }
  catch (error) { if (!["ENOENT", "ESRCH"].includes(error.code)) inaccessible.push({ pid: row.pid, type: "cwd", code: error.code }); }
  try {
    let denied = 0;
    for (const fd of await readdir(`/proc/${row.pid}/fd`)) {
      try { const target = await readlink(`/proc/${row.pid}/fd/${fd}`); fdLinks++; if (within(target.replace(/ \(deleted\)$/, ""))) ties.push({ type: "fd", fd, target, ...row }); }
      catch (error) { if (!["ENOENT", "ESRCH"].includes(error.code)) denied++; }
    }
    if (denied) inaccessible.push({ pid: row.pid, type: "fd-links", count: denied });
  } catch (error) { if (!["ENOENT", "ESRCH"].includes(error.code)) inaccessible.push({ pid: row.pid, type: "fd-directory", code: error.code }); }
}
const knownPidStatus = [];
for (const pid of known) {
  try { await lstat("/proc/" + pid); knownPidStatus.push({ pid, present: true }); }
  catch (error) { assert.equal(error.code, "ENOENT"); knownPidStatus.push({ pid, present: false }); }
}
console.log(JSON.stringify({ schemaVersion: 1, started, finished: new Date().toISOString(), uid, inspectorPid: process.pid,
  scopes, sameUidProcesses: rows.length, readableFdLinks: fdLinks, knownPidStatus, ties, inaccessible,
  closure: { outerFinished: outer.finished, outerDurationMs: outer.durationMs, outerCode: outer.code, innerFinished: inner.finished, innerDurationMs: inner.durationMs, innerCode: inner.code, timedOut: inner.timedOut, externalSignal: inner.externalSignal },
  hashes: Object.fromEntries(await Promise.all(["../baseline-environment-tool-poll-1.json", "../baseline-environment-command/result.json", run + "/setup/environment-proof/process.json", "process-audit.mjs"].map(async path => [path, hash(await readFile(join(directory, path)))]))),
  signals: 0, subprocesses: 0, writes: false,
  limits: "Exact known PIDs, observable descendant PPIDs and scoped cwd/fd metadata only. No broad repository-cwd absence claim. Detached/reparented processes with different cwd and no readable scoped fd may evade this observation; inaccessible metadata remains explicit. No cleanup was performed."
}, null, 2));
