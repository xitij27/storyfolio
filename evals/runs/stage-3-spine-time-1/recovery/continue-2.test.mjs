import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { hash, planTurn, readTurnHistory, validateCase } from "../../../lib/build.mjs";
const run = new URL("../../codex-full-journey-timing-1/full-journey-1/baseline-1", import.meta.url).pathname;
const original = validateCase(JSON.parse(await readFile(new URL("../../codex-full-journey-timing-1/inputs/case.json", import.meta.url))));
// The first continuation's bounds: only the reported-token ceiling lifted.
const firstContinuation = validateCase({ ...original, bounds: { ...original.bounds, maxTokens: Number.MAX_SAFE_INTEGER } });
const lifted = validateCase({ ...original, bounds: { ...original.bounds, maxTokens: Number.MAX_SAFE_INTEGER, maxUncachedTokens: Number.MAX_SAFE_INTEGER } });
const [first, second] = await readTurnHistory(run);
const continued = await Promise.all([3, 4].map(async turn => { const raw = await readFile(new URL(`continuation/turns/0${turn}/result.json`, import.meta.url)); return { ...JSON.parse(raw), complete: true, digest: hash(raw) }; }));
const history = [first, { ...second, complete: true }, ...continued];
const gate = { afterTurn: 4, advance: true, previousTurnDigest: history[3].digest, observation: "test" };
test("turns 1 to 4 count with their real time and usage under the lifted ceilings", () => {
  const plan = planTurn({ turn: 5, source: lifted, history, gate });
  assert.equal(plan.elapsedMs, 2327479); assert.equal(plan.uncachedTokens, 912200); assert.equal(plan.timeoutMs, 1800000);
  assert.equal(plan.sessionId, first.sessionId);
});
test("the uncached ceiling no longer stops a turn; the first continuation's bounds still would, and time still does", () => {
  const costly = [...history.slice(0, 3), { ...history[3], usage: { ...history[3].usage, cached_input_tokens: 0 } }];
  assert.throws(() => planTurn({ turn: 5, source: firstContinuation, history: costly, gate }), /uncached/);
  assert.doesNotThrow(() => planTurn({ turn: 5, source: lifted, history: costly, gate }));
  const spent = [...history.slice(0, 3), { ...history[3], durationMs: 5400000 }];
  assert.throws(() => planTurn({ turn: 5, source: lifted, history: spent, gate }), /wall budget exhausted/);
});
test("the time left for turn 5 is clipped by the 90-minute total", () => {
  const late = [...history.slice(0, 3), { ...history[3], durationMs: 4000000 }];
  assert.equal(planTurn({ turn: 5, source: lifted, history: late, gate }).timeoutMs, 5400000 - (160089 + 941074 + 172874 + 4000000));
});
