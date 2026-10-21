import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { planTurn, readTurnHistory, validateCase } from "../../../lib/build.mjs";
const run = new URL("../../codex-full-journey-timing-1/full-journey-1/baseline-1", import.meta.url).pathname;
const original = validateCase(JSON.parse(await readFile(new URL("../../codex-full-journey-timing-1/inputs/case.json", import.meta.url))));
const lifted = validateCase({ ...original, bounds: { ...original.bounds, maxTokens: Number.MAX_SAFE_INTEGER } });
const history = await readTurnHistory(run);
const gate = { afterTurn: 2, advance: true, previousTurnDigest: history[1].digest, observation: "test" };
test("unchanged planTurn still refuses to continue after the failed turn-2 result", () => {
  assert.throws(() => planTurn({ turn: 3, source: lifted, history, gate }), /Failed turn is preserved/);
});
test("capture-only acceptance counts turn 2's real time and usage, clipped to the remaining 90 minutes", () => {
  const plan = planTurn({ turn: 3, source: lifted, history: [history[0], { ...history[1], complete: true }], gate });
  assert.equal(plan.elapsedMs, 1101163); assert.equal(plan.tokens, 2071429); assert.equal(plan.uncachedTokens, 208133);
  assert.equal(plan.timeoutMs, 1800000); assert.equal(plan.sessionId, history[0].sessionId);
});
test("only the reported-token ceiling is lifted; time and uncached ceilings still stop a turn", () => {
  const spent = [history[0], { ...history[1], complete: true, durationMs: 5400000 }];
  assert.throws(() => planTurn({ turn: 3, source: lifted, history: spent, gate }), /wall budget exhausted/);
  const costly = [history[0], { ...history[1], complete: true, usage: { ...history[1].usage, cached_input_tokens: 0, input_tokens: 1500000 } }];
  assert.throws(() => planTurn({ turn: 3, source: lifted, history: costly, gate }), /uncached/);
  const reported = [history[0], { ...history[1], complete: true, usage: { ...history[1].usage, input_tokens: 13000000, cached_input_tokens: 12900000 } }];
  assert.doesNotThrow(() => planTurn({ turn: 3, source: lifted, history: reported, gate }));
  assert.throws(() => planTurn({ turn: 3, source: original, history: reported, gate }), /token ceiling/);
});
