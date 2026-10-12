// Root-authorized one-PID cleanup after interrupted calibration-2, no escalation.
// Fails closed on changed PID identity. No runtime, browser or model launch.
import assert from "node:assert/strict";
import fs from "node:fs";
const pid = 258380;
const expected = { uid: 1000, pid, pgrp: pid, session: pid, startTicks: "91563927", cwd: "/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/journey-calibration-5yt94U" };
function inspect() {
  const text = fs.readFileSync(`/proc/${pid}/stat`, "utf8"), end = text.lastIndexOf(")"), fields = text.slice(end + 2).split(" ");
  const record = { uid: fs.statSync(`/proc/${pid}`).uid, pid, comm: text.slice(text.indexOf("(") + 1, end), state: fields[0], ppid: Number(fields[1]), pgrp: Number(fields[2]), session: Number(fields[3]), startTicks: fields[19] };
  try { record.cwd = fs.readlinkSync(`/proc/${pid}/cwd`); } catch (error) { record.cwdError = error.code; }
  return record;
}
const record = { started: new Date().toISOString(), authority: "Root explicitly authorized one reverified PID SIGTERM, at most five seconds observation, no SIGKILL", expected, signals: [] };
record.before = inspect();
for (const [key, value] of Object.entries(expected)) assert.equal(record.before[key], value, "Owned process identity changed: " + key);
assert.equal(process.getuid(), expected.uid); assert.notEqual(record.before.state, "Z");
const confirmation = inspect();
for (const [key, value] of Object.entries(expected)) assert.equal(confirmation[key], value, "Process identity changed immediately before SIGTERM: " + key);
process.kill(pid, "SIGTERM"); record.signals.push({ at: new Date().toISOString(), pid, signal: "SIGTERM", target: "single PID, not process group or parent" });
const started = performance.now();
while (performance.now() - started < 5000) {
  try { record.after = inspect(); if (record.after.state === "Z" || record.after.startTicks !== expected.startTicks) break; }
  catch (error) { record.after = { pid, error: error.code }; if (error.code === "ENOENT") break; throw error; }
  await new Promise(done => setTimeout(done, Math.min(100, Math.max(0, 5000 - (performance.now() - started)))));
}
record.observedMs = performance.now() - started; record.finished = new Date().toISOString();
record.disposition = record.after?.error === "ENOENT" ? "PID absent" : record.after?.state === "Z" ? "original process is a zombie, not reaped" : record.after?.startTicks !== expected.startTicks ? "original PID identity replaced; no further action" : "original process remains present; report to root, no escalation";
console.log(JSON.stringify(record, null, 2));
