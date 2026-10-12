// Pure accounting only. Caller reads EVERY exclusive attempt/process/closure
// record, verifies their hashes and binding, and never filters out failures.
// This module performs no I/O, launch, retry, sleep or mutable-budget writes.
import assert from "node:assert/strict";

export const BUDGET = Object.freeze({ totalMs: 900000, batchMs: 90000, setupMs: 90000, graceMs: 5000, batches: 12 });
const digest = value => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
const duration = value => Number.isSafeInteger(value) && value >= 0;

function operationLimits(id, elapsedMs) {
  assert.ok(Number.isSafeInteger(id) && id >= 0 && id <= BUDGET.batches, "Operation id must be 0 setup or 1..12 batches");
  assert.ok(duration(elapsedMs) && elapsedMs <= BUDGET.totalMs, "Unreliable or exhausted cumulative duration");
  const remainingMs = BUDGET.totalMs - elapsedMs;
  const totalCapMs = Math.min(id === 0 ? BUDGET.setupMs : BUDGET.batchMs, remainingMs);
  assert.ok(totalCapMs > BUDGET.graceMs, "No execution time remains beyond the required shutdown grace");
  return { id, elapsedMs, remainingMs, timeoutMs: totalCapMs - BUDGET.graceMs, graceMs: BUDGET.graceMs, totalCapMs };
}

/** Actual supervised lifetimes include setup, initialization and shutdown.
 * Each row must be derived from its immutable attempt/process/closure, with
 * complete meaning normal closure plus complete source/artifact-bound work.
 * elapsed wall time between root's serial invocations is not execution time.
 */
export function inspectHistory({ history, bindingSha256 }) {
  assert.ok(Array.isArray(history), "Operation history must be an array");
  assert.ok(digest(bindingSha256), "A frozen input binding hash is required");
  assert.ok(history.length <= BUDGET.batches + 1, "No operations beyond setup and twelve batches are allowed");
  let elapsedMs = 0;
  for (const [index, row] of history.entries()) {
    assert.ok(row && typeof row === "object" && !Array.isArray(row), "Missing operation record");
    assert.equal(row.id, index, "Operation history must be the exact contiguous prefix 0..12, without duplicates or retries");
    assert.equal(row.bindingSha256, bindingSha256, "Operation input binding changed");
    assert.equal(row.complete, true, "An incomplete operation blocks all further operations");
    assert.equal(row.code, 0, "A failed operation blocks all further operations");
    assert.equal(row.timedOut, false, "Timed-out or unrecorded operation blocks further work");
    for (const key of ["externalSignal", "signal", "spawnError", "logError"]) assert.equal(row[key], null, `${key} must record normal error-free closure`);
    assert.ok(duration(row.durationMs), "Operation duration must be a nonnegative safe integer");
    const planned = operationLimits(index, elapsedMs);
    for (const key of ["timeoutMs", "graceMs", "totalCapMs"]) assert.equal(row[key], planned[key], `Recorded ${key} differs from the prospective cumulative plan`);
    assert.ok(row.durationMs <= planned.totalCapMs, "Operation exceeded its total execution cap");
    elapsedMs += row.durationMs;
    assert.ok(Number.isSafeInteger(elapsedMs) && elapsedMs <= BUDGET.totalMs, "Cumulative execution cap exceeded");
  }
  return { operations: history.length, batchesCompleted: Math.max(0, history.length - 1), elapsedMs, remainingMs: BUDGET.totalMs - elapsedMs, complete: history.length === BUDGET.batches + 1 };
}

/** One deterministic next operation. No optional retry or alternate sequence. */
export function planOperation({ history, nextId, bindingSha256 }) {
  const previous = inspectHistory({ history, bindingSha256 });
  assert.equal(nextId, history.length, "Next operation must immediately follow every retained attempt");
  assert.equal(previous.complete, false, "The single replacement capture is already complete");
  return { ...operationLimits(nextId, previous.elapsedMs), bindingSha256 };
}
