import assert from "node:assert/strict";
import test from "node:test";
import { assertContinuationRecord, assertContinuationId, continuationPaths, prefix } from "./binding-lib.mjs";
const fixture = () => ({ schemaVersion: 1, kind: "concepts-seven-batch-continuation", reviewedByRoot: true,
  previous: { path: prefix + "concept-measurement-2.json", sha256: "148b837d090f105d3e06804e7318dc03249ccdfb267b2ec0b1c87182290e5577" },
  approval: { path: "docs/history/2026-10-13-stage-3-browser-continuation-approval.md" }, inventory: { path: prefix + "concept-continuation-inventory.json" },
  allowedIds: [3,4,5,6,7,8,9], reconciledId: 2, spentMs: 133866, remainingMs: 766134, totalCapMs: 900000, retries: 0, modelCalls: 0, setupRuns: 0,
  helperHashes: Object.fromEntries(continuationPaths.map(path => [path, "a".repeat(64)])) });
test("only seven unstarted integer ids are eligible", () => {
  for (const id of [3,4,5,6,7,8,9]) assert.doesNotThrow(() => assertContinuationId(id));
  for (const id of [-1,0,1,2,10,NaN,3.5,"3",undefined]) assert.throws(() => assertContinuationId(id));
});
test("exact approval scope preserves spent budget and original identity", () => {
  assert.doesNotThrow(() => assertContinuationRecord(fixture()));
  for (const [key,value] of Object.entries({ spentMs: 0, remainingMs: 900000, totalCapMs: 1800000, retries: 1, modelCalls: 1, setupRuns: 1, reconciledId: 3, allowedIds: [0,1,2,3,4,5,6,7,8,9], reviewedByRoot: false })) {
    const record = fixture(); record[key] = value; assert.throws(() => assertContinuationRecord(record), key);
  }
  const other = fixture(); other.previous.sha256 = "b".repeat(64); assert.throws(() => assertContinuationRecord(other));
  const missing = fixture(); delete missing.helperHashes[continuationPaths[0]]; assert.throws(() => assertContinuationRecord(missing));
});
