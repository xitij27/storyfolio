// Read-only terminal probe audit. Run only on root's explicit both-closed signal.
// No subprocess, model, browser, timer, signal or filesystem write.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstat, readFile, readdir, readlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
assert.deepEqual(process.argv.slice(2), ["--root-confirmed-both-closed"]);
const directory = dirname(fileURLToPath(import.meta.url));
const sha = data => createHash("sha256").update(data).digest("hex");
const load = async path => JSON.parse(await readFile(join(directory, path)));
const helperSha256 = sha(await readFile(join(directory, "heartbeat.mjs")));
assert.equal(helperSha256, "22aaa0e37f8f5d030c969065c2ee41bf6aeef5355902109ab6e9f5aa43ad07e7");
const observedFrom = new Date().toISOString(), reports = [];
const names = await readdir(directory);
for (const transport of ["pipe", "pty"]) {
  const base = transport + "-1", command = await load(base + "/command.json"), result = await load(base + "/result.json");
  assert.equal(command.helperSha256, helperSha256); assert.equal(command.transport, transport);
  assert.equal(command.durationMs, 660000); assert.equal(command.heartbeatMs, 30000);
  assert.equal(command.stdio.stdoutIsTTY, transport === "pty");
  assert.equal(result.transport, transport); assert.deepEqual(result.stdio, command.stdio);
  assert.equal(result.requestedDurationMs, 660000); assert.equal(result.heartbeatIntervalMs, 30000);
  assert.deepEqual(Object.keys(result.rawArtifacts).sort(), ["command.json", "journal.jsonl"]);
  for (const [path, digest] of Object.entries(result.rawArtifacts)) assert.equal(sha(await readFile(join(directory, base, path))), digest);
  const journalBytes = await readFile(join(directory, base, "journal.jsonl")); assert.ok(journalBytes.toString().endsWith("\n"));
  const events = journalBytes.toString().trim().split("\n").map(JSON.parse);
  assert.deepEqual(events.map(row => row.sequence), events.map((_, i) => i + 1)); assert.equal(events[0].type, "started");
  for (const [index, event] of events.entries()) {
    assert.ok(Number.isSafeInteger(event.elapsedMs) && event.elapsedMs >= 0);
    if (index) assert.ok(event.elapsedMs >= events[index - 1].elapsedMs);
    for (const field of ["pid", "processGroupId", "sessionId", "startTimeTicks", "ttyNr"]) assert.equal(event[field], command.process[field]);
  }
  const heartbeats = events.filter(event => event.type === "heartbeat");
  assert.deepEqual(heartbeats.map(row => row.heartbeat), heartbeats.map((_, i) => i + 1)); assert.equal(heartbeats.length, result.heartbeats);
  assert.ok(heartbeats.every(row => row.elapsedMs >= row.heartbeat * 30000));
  if (result.complete) {
    assert.equal(result.status, "completed-full-duration"); assert.equal(result.interruptedBy, null); assert.equal(result.error, null);
    assert.ok(result.durationMs >= 660000); assert.equal(events.at(-1).type, "duration-reached"); assert.ok(events.at(-1).elapsedMs >= 660000);
  } else assert.notEqual(result.status, "completed-full-duration", "Incomplete result cannot claim successful full duration");
  for (const field of ["modelCalls", "browserCalls", "networkCalls", "childProcesses"]) assert.equal(result[field], 0);
  const pattern = new RegExp("^" + transport + "-tool-(?:launch|poll-\\d+|finish)\\.json$");
  const order = path => path.includes("launch") ? 0 : path.includes("finish") ? Number.MAX_SAFE_INTEGER : Number(/poll-(\d+)/.exec(path)[1]);
  const toolFiles = names.filter(path => pattern.test(path)).sort((a, b) => order(a) - order(b));
  assert.ok(toolFiles[0]?.endsWith("launch.json"));
  const toolRows = [], outputEvents = [];
  for (const path of toolFiles) {
    const bytes = await readFile(join(directory, path)), record = JSON.parse(bytes), tool = record.result ?? record;
    assert.equal(typeof tool.output, "string");
    for (const line of tool.output.split(/\r?\n/).filter(line => line.trim())) outputEvents.push(JSON.parse(line));
    toolRows.push({ path, sha256: sha(bytes), recordedAt: record.recordedAt ?? null, sessionId: tool.session_id ?? null, exitCode: tool.exit_code ?? null, outputBytes: Buffer.byteLength(tool.output), wallTimeSeconds: tool.wall_time_seconds });
  }
  assert.deepEqual(outputEvents, events, "Retained tool stream and journal differ");
  assert.equal(toolRows.at(-1).sessionId, null); assert.ok(Number.isInteger(toolRows.at(-1).exitCode));
  assert.equal(toolRows.at(-1).exitCode, result.complete ? 0 : 1);
  const timestamps = toolRows.map(row => ({ ...row, milliseconds: row.recordedAt ? Date.parse(row.recordedAt.replace(" UTC", "Z").replace(" ", "T")) : NaN })).filter(row => Number.isFinite(row.milliseconds));
  const gaps = timestamps.slice(1).map((row, i) => ({ from: timestamps[i].path, to: row.path, observedGapMs: row.milliseconds - timestamps[i].milliseconds }));
  reports.push({ transport, command, result, events, helperSha256, resultSha256: sha(await readFile(join(directory, base, "result.json"))), toolRows,
    polling: { recordedObservationGaps: gaps, gapsOver40Seconds: gaps.filter(row => row.observedGapMs > 40000), limitation: "Saved return timestamps, not exact request timestamps. Missing timestamps cannot establish a complete cadence history." },
    heartbeatIntervalsMs: heartbeats.map((row, i) => row.elapsedMs - (i ? heartbeats[i - 1].elapsedMs : 0)) });
}
assert.equal(reports[0].command.executable, reports[1].command.executable); assert.equal(reports[0].command.nodeVersion, reports[1].command.nodeVersion); assert.equal(reports[0].command.cwd, reports[1].command.cwd);
const uid = process.getuid(), processRows = [], inaccessible = [], ties = [];
let fdLinks = 0;
for (const name of await readdir("/proc")) {
  if (!/^\d+$/.test(name)) continue;
  const pid = Number(name), base = "/proc/" + name;
  try {
    if ((await lstat(base)).uid !== uid) continue;
    const raw = await readFile(base + "/stat", "utf8"), fields = raw.slice(raw.lastIndexOf(")") + 1).trim().split(/\s+/);
    processRows.push({ pid, state: fields[0], ppid: Number(fields[1]), processGroupId: Number(fields[2]), sessionId: Number(fields[3]), startTimeTicks: fields[19] });
  } catch (error) { if (error.code !== "ENOENT" && error.code !== "ESRCH") inaccessible.push({ pid, type: "stat", code: error.code }); }
}
const scopes = reports.map(row => join(directory, row.transport + "-1"));
const matches = value => scopes.some(scope => value === scope || value.startsWith(scope + "/"));
const ownedPids = reports.map(row => row.command.process.pid);
for (const row of processRows) {
  if (ownedPids.includes(row.pid)) ties.push({ type: "known-pid-still-present", ...row, expectedStartTimeTicks: reports.find(report => report.command.process.pid === row.pid).command.process.startTimeTicks });
  try { const target = await readlink(`/proc/${row.pid}/cwd`); if (matches(target)) ties.push({ pid: row.pid, type: "cwd", target }); }
  catch (error) { if (!["ENOENT", "ESRCH"].includes(error.code)) inaccessible.push({ pid: row.pid, type: "cwd", code: error.code }); }
  try {
    let denied = 0;
    for (const fd of await readdir(`/proc/${row.pid}/fd`)) {
      try { const target = await readlink(`/proc/${row.pid}/fd/${fd}`); fdLinks++; if (matches(target.replace(/ \(deleted\)$/, ""))) ties.push({ pid: row.pid, type: "fd", fd, target }); }
      catch (error) { if (!["ENOENT", "ESRCH"].includes(error.code)) denied++; }
    }
    if (denied) inaccessible.push({ pid: row.pid, type: "fd-links", count: denied });
  } catch (error) { if (!["ENOENT", "ESRCH"].includes(error.code)) inaccessible.push({ pid: row.pid, type: "fd-directory", code: error.code }); }
}
const knownPidStatus = [];
for (const report of reports) {
  const pid = report.command.process.pid;
  try { await lstat("/proc/" + pid); knownPidStatus.push({ transport: report.transport, pid, present: true }); }
  catch (error) { assert.equal(error.code, "ENOENT"); knownPidStatus.push({ transport: report.transport, pid, present: false }); }
}
console.log(JSON.stringify({ schemaVersion: 1, integrityVerified: true, observedFrom, observedUntil: new Date().toISOString(), writes: false, signals: 0, subprocesses: 0,
  reports, processObservation: { uid, scopes, sameUidProcesses: processRows.length, readableFdLinks: fdLinks, knownPidStatus, ties, inaccessible },
  interpretation: "Two neutral observed workloads only. Concurrent launches and any documented polling/local-check deviations preclude strict causal matching; successful monotonic survival does not prove future browser/actor safety or signal origin.",
  limitations: "Environment equality depends on root's retained launcher provenance, not an environment dump. Metadata-only same-UID checks cannot exclude reparented/detached unknown processes with no matching cwd or readable output fd. No broad argv, environment or fd contents were read."
}, null, 2));
