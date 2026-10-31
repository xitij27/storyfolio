import test from "node:test";
import assert from "node:assert/strict";
import { guardExtraCallback } from "./guard-extra-callback.ts";

test("passes each frame's arguments unchanged to a healthy extra", () => {
  const state = { frame: 1 };
  const received: unknown[][] = [];
  const errors: unknown[] = [];
  const callback = guardExtraCallback((...args: [typeof state, number]) => received.push(args), error => errors.push(error));
  callback(state, 0.016);
  callback(state, 0.024);
  assert.deepEqual(received, [[state, 0.016], [state, 0.024]]);
  assert.equal(received[0][0], state);
  assert.deepEqual(errors, []);
});

test("reports a synchronous frame exception once and disables that callback", () => {
  const failure = new Error("optional line failed");
  let calls = 0;
  const errors: unknown[] = [];
  const callback = guardExtraCallback(() => { calls++; throw failure; }, error => errors.push(error));
  assert.doesNotThrow(callback);
  assert.doesNotThrow(callback);
  assert.equal(calls, 1);
  assert.deepEqual(errors, [failure]);
});

test("a failed extra does not stop subsequent core or independent extra callbacks", () => {
  const frames: string[] = [];
  const broken = guardExtraCallback(() => { frames.push("broken"); throw new Error("fault"); }, () => frames.push("reported"));
  const healthy = guardExtraCallback(() => frames.push("healthy"), () => assert.fail("healthy extra should not fail"));
  const core = () => frames.push("core");
  for (let i = 0; i < 2; i++) { broken(); healthy(); core(); }
  assert.deepEqual(frames, ["broken", "reported", "healthy", "core", "healthy", "core"]);
});
