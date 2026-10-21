// The author's 21 October rule for turns 5 and 6: a turn whose only errors are the client's WebSocket reconnects and its
// HTTPS fallback, all before the agent's first action, followed by one normal completed turn, counts as completed.
import assert from "node:assert/strict";
import { finalCodexMessage } from "../../../lib/codex.mjs";

const reconnect = /^Reconnecting\.\.\. \d+\/\d+ \(stream disconnected before completion: websocket closed by server before response\.completed\)$/;
const fallback = /^Falling back from WebSockets to HTTPS transport\. /;
const isTransport = event => (event.type === "error" && reconnect.test(event.message ?? "")) || (event.type === "item.completed" && event.item?.type === "error" && fallback.test(event.item.message ?? ""));

/** The final message of the stream with those leading transport events set aside; every other rule of finalCodexMessage holds. */
export function finalMessageAfterFallback(stdout, code = 0) {
  const lines = stdout.split("\n").filter(line => line.trim()), events = lines.map(line => JSON.parse(line));
  const firstWork = events.findIndex(event => !["thread.started", "turn.started"].includes(event.type) && !isTransport(event));
  const transport = events.flatMap((event, index) => isTransport(event) ? [index] : []);
  assert.ok(firstWork >= 0 && transport.every(index => index < firstWork), "Transport fallback after the agent's first action is not covered");
  const text = finalCodexMessage(lines.filter((_, index) => !transport.includes(index)).join("\n"), code);
  return { text, transport: transport.map(index => events[index].message ?? events[index].item.message) };
}
