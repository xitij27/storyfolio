// Read-only no-model transport calibration with complete historical packets.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { renderBuildJudgePrompt, MAX_JUDGE_PROMPT_BYTES, MAX_JUDGE_PROMPT_CHARACTERS } from "../../lib/build-score.mjs";

const sha = value => createHash("sha256").update(value).digest("hex");
const cases = [
  "evals/runs/codex-build-1/embedded-1/baseline-1/judge/prompt.md",
  "evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/judge/prompt.md",
];
const results = cases.map(path => {
  const text = readFileSync(path, "utf8");
  const start = text.indexOf('\n{\n  "schemaVersion"');
  assert.ok(start > 0, `Complete evidence JSON missing in ${path}`);
  const packet = JSON.parse(text.slice(start + 1));
  const prefix = text.slice(0, start + 1);
  // Preserve every original byte, instruction and document. Empty rubric is
  // already part of the preserved prefix, not removal of its original rubric.
  const template = prefix + "{{rubric}}{{evidence}}";
  const reconstructed = prefix + JSON.stringify(packet, null, 2);
  assert.equal(reconstructed.trimEnd(), text.trimEnd());
  let error = null;
  try { renderBuildJudgePrompt(template, "", packet); } catch (cause) { error = cause.message; }
  return { path, sha256: sha(text), originalBytes: Buffer.byteLength(text), originalCodeUnits: text.length,
    documents: packet.documents.length, documentTextBytes: packet.documents.reduce((n, doc) => n + Buffer.byteLength(doc.text), 0),
    completeHistoricalPacket: true, allOriginalDocumentBodiesPreserved: true,
    fitsCurrentByteBound: Buffer.byteLength(reconstructed) <= MAX_JUDGE_PROMPT_BYTES,
    fitsCurrentCharacterBound: reconstructed.length <= MAX_JUDGE_PROMPT_CHARACTERS,
    currentGuardError: error };
});
assert.equal(results[0].currentGuardError, null);
assert.equal(results[1].fitsCurrentCharacterBound, false);
assert.ok(results[1].currentGuardError);
console.log(JSON.stringify({ schemaVersion: 1, kind: "no-model-complete-packet-calibration",
  limits: { utf8Bytes: MAX_JUDGE_PROMPT_BYTES, utf16CodeUnits: MAX_JUDGE_PROMPT_CHARACTERS }, results,
  conclusion: "A complete historical spine packet fits; a complete historical completion packet cannot be delivered. No evidence was truncated and no model was invoked. Engine and transport decisions block final diagnostic freeze.",
  limitations: "Historical examples retain their original evidence selection, which omitted acceptance logs and rendered HTML bodies. New schema-2 delivery includes those textual artifacts too. The fitting historical packet is not proof of current diagnostic readiness, a size forecast or an actual five-beat actor packet. The future actual complete packet still needs its own dry validation. This script neither retries old judges nor implements a new transport.",
}, null, 2));
