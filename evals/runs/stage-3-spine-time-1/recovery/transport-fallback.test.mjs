import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { finalCodexMessage } from "../../../lib/codex.mjs";
import { finalMessageAfterFallback } from "./transport-fallback.mjs";

const turn5 = await readFile(new URL("continuation-2/turns/05/stream.jsonl", import.meta.url), "utf8");
const lines = turn5.split("\n").filter(line => line.trim());
const reconnect = lines[2], item = JSON.stringify({ type: "item.completed", item: { id: "x", type: "command_execution", command: "true" } });

test("turn 5's leading reconnects and HTTPS fallback are set aside, and its final message is the reply", async () => {
  assert.throws(() => finalCodexMessage(turn5), /one successful completed turn/);
  const { text, transport } = finalMessageAfterFallback(turn5);
  assert.ok((await readFile(new URL("continuation-2/turns/05/reply.md", import.meta.url), "utf8")).endsWith(text + "\n"));
  assert.equal(transport.length, 5); assert.match(transport.at(-1), /^Falling back from WebSockets to HTTPS/);
});
test("a stream without transport events behaves exactly as before", () => {
  const clean = lines.filter((_, index) => index < 2 || index > 6).join("\n");
  assert.equal(finalMessageAfterFallback(clean).text, finalCodexMessage(clean));
});
test("a reconnect after the first action, or any other error, still fails", () => {
  const late = [...lines.slice(0, 2), item, reconnect, ...lines.slice(7)].join("\n");
  assert.throws(() => finalMessageAfterFallback(late), /after the agent's first action/);
  const other = [...lines.slice(0, 7), JSON.stringify({ type: "error", message: "Rate limited" }), ...lines.slice(7)].join("\n");
  assert.throws(() => finalMessageAfterFallback(other), /one successful completed turn/);
});
