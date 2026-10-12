// Pure synthetic records only. No model, browser, process, filesystem or timer.
import assert from "node:assert/strict";
import test from "node:test";
import { BUDGET, inspectHistory, planOperation } from "./budget.mjs";

const bindingSha256 = "a".repeat(64);
function nextRecord(history, durationMs = 1000, overrides = {}) {
  const planned = planOperation({ history, nextId: history.length, bindingSha256 });
  return { ...planned, durationMs, complete: true, code: 0, timedOut: false, externalSignal: null, signal: null, spawnError: null, logError: null, ...overrides };
}
const planned = history => planOperation({ history, nextId: history.length, bindingSha256 });
const withDurations = durations => durations.reduce((history, durationMs) => [...history, nextRecord(history, durationMs)], []);

test("setup and twelve serial batches share one cap and finish without another operation", () => {
  const history = [], first = planned(history);
  assert.deepEqual(first, { id: 0, elapsedMs: 0, remainingMs: 900000, timeoutMs: BUDGET.setupMs - 5000, graceMs: 5000, totalCapMs: BUDGET.setupMs, bindingSha256 });
  history.push(nextRecord(history, 60000));
  for (let id = 1; id <= 12; id++) {
    const plan = planned(history);
    assert.equal(plan.id, id); assert.equal(plan.elapsedMs, 60000 + (id - 1) * 50000);
    assert.equal(plan.totalCapMs, 90000); assert.equal(plan.timeoutMs, 85000);
    history.push(nextRecord(history, 50000));
  }
  assert.deepEqual(inspectHistory({ history, bindingSha256 }), { operations: 13, batchesCompleted: 12, elapsedMs: 660000, remainingMs: 240000, complete: true });
  assert.throws(() => planned(history), /already complete/);
});

test("setup lifetime counts and the final prospective cap shrinks without relaxing grace", () => {
  const history = withDurations([...Array(9).fill(90000), 20000]);
  assert.deepEqual(planned(history), { id: 10, elapsedMs: 830000, remainingMs: 70000, timeoutMs: 65000, graceMs: 5000, totalCapMs: 70000, bindingSha256 });
  history.push(nextRecord(history, 64000));
  assert.equal(planned(history).timeoutMs, 1000);
  history.push(nextRecord(history, 1000));
  assert.equal(inspectHistory({ history, bindingSha256 }).remainingMs, 5000);
  assert.throws(() => planned(history), /shutdown grace/);
});

test("exact total exhaustion is accounted, not used to schedule another batch", () => {
  const history = withDurations(Array(10).fill(90000));
  assert.equal(inspectHistory({ history, bindingSha256 }).remainingMs, 0);
  assert.equal(inspectHistory({ history, bindingSha256 }).complete, false);
  assert.throws(() => planned(history), /shutdown grace/);
});

test("duplicate, missing, out-of-order, extra and retried operations are rejected", () => {
  const setup = nextRecord([]), batch = nextRecord([setup]);
  for (const history of [[batch], [setup, setup], [setup, { ...batch, id: 2 }], [setup, batch, batch], Array(14).fill(setup)]) assert.throws(() => inspectHistory({ history, bindingSha256 }));
  for (const nextId of [-1, 1, 2, 13, 1.5, "0", undefined, NaN]) assert.throws(() => planOperation({ history: [], nextId, bindingSha256 }));
  assert.throws(() => planOperation({ history: [setup, batch], nextId: 1, bindingSha256 }));
});

test("incomplete, failed, interrupted and timed-out attempts block, including missing flags", () => {
  const valid = nextRecord([]);
  for (const change of [
    { complete: false }, { complete: undefined }, { code: 1 }, { code: null }, { timedOut: true }, { timedOut: undefined },
    { externalSignal: "SIGTERM" }, { externalSignal: undefined }, { signal: "SIGKILL" }, { signal: undefined },
    { spawnError: "ENOENT" }, { spawnError: undefined }, { logError: "write failed" }, { logError: undefined },
  ]) assert.throws(() => planned([{ ...valid, ...change }]));
});

test("changed binding and missing or unreliable durations never create allowance", () => {
  const valid = nextRecord([]);
  for (const durationMs of [-1, 0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, null, undefined, "1000"]) assert.throws(() => planned([{ ...valid, durationMs }]));
  for (const hash of ["b".repeat(64), "", undefined]) assert.throws(() => planned([{ ...valid, bindingSha256: hash }]));
  for (const hash of ["", "g".repeat(64), undefined, "a".repeat(63)]) assert.throws(() => planOperation({ history: [], nextId: 0, bindingSha256: hash }));
  assert.equal(planned([{ ...valid, durationMs: 0 }]).remainingMs, 900000);
});

test("recorded limits must match their actual prefix, and overruns are not rounded down", () => {
  const setup = nextRecord([], 10000), batch = nextRecord([setup], 90000);
  for (const change of [{ timeoutMs: 85001 }, { graceMs: 4999 }, { totalCapMs: 90001 }, { totalCapMs: undefined }, { durationMs: 90001 }]) assert.throws(() => inspectHistory({ history: [setup, { ...batch, ...change }], bindingSha256 }));
  assert.throws(() => inspectHistory({ history: [{ ...setup, durationMs: 90001 }], bindingSha256 }));
  const shortHistory = withDurations([...Array(9).fill(90000), 20000]), shortBatch = nextRecord(shortHistory, 1000);
  assert.equal(shortBatch.totalCapMs, 70000);
  assert.throws(() => inspectHistory({ history: [...shortHistory, { ...shortBatch, timeoutMs: 85000, totalCapMs: 90000 }], bindingSha256 }));
});

test("planning is deterministic and does not mutate the immutable-derived ledger", () => {
  const row = Object.freeze(nextRecord([], 17000)), history = Object.freeze([row]);
  const before = JSON.stringify(history), first = planned(history), second = planned(history);
  assert.deepEqual(first, second); assert.equal(JSON.stringify(history), before);
  assert.throws(() => inspectHistory({ history: null, bindingSha256 }));
  assert.throws(() => inspectHistory({ history: [undefined], bindingSha256 }));
});
