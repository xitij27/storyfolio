// Local real-process MCP calibration. No Codex process or model is invoked.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createPagedEvidence, createPageReader, MAX_PAGE_RESPONSE_BYTES, verifyPageCoverage } from "../../lib/judge-transport.mjs";
import { pagedJudgePrompt } from "../../codex-build-judge.mjs";
import { MAX_JUDGE_PROMPT_BYTES, MAX_JUDGE_PROMPT_CHARACTERS } from "../../lib/build-score.mjs";

const study = dirname(fileURLToPath(import.meta.url)), root = resolve(study, "../../..");
const capture = process.argv[2] ?? "capture-1";
assert.match(capture, /^[a-z0-9-]+$/);
const output = join(study, capture), runtime = join(study, "runtime", capture);
await mkdir(output); // Never overwrite an old calibration.
await mkdir(runtime, { recursive: true });
const hash = text => createHash("sha256").update(text).digest("hex");
const inputs = [
  ["spine", "evals/runs/codex-build-1/embedded-1/baseline-1/judge/prompt.md"],
  ["completion", "evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/judge/prompt.md"],
];
const results = [];
for (const [name, path] of inputs) {
  const original = await readFile(join(root, path)), prompt = new TextDecoder("utf-8", { fatal: true }).decode(original);
  const start = prompt.indexOf('\n{\n  "schemaVersion"');
  assert.ok(start > 0);
  const packet = JSON.parse(prompt.slice(start + 1));
  const documents = packet.documents.map(({ path, sha256, bytes, selection, text }) => ({ path, sha256, bytes,
    ...(selection === undefined ? {} : { selection }), selectedTextSha256: hash(text), selectedTextBytes: Buffer.byteLength(text) }));
  const bundle = createPagedEvidence(prompt, { documents }), reader = createPageReader(bundle);
  const bundlePath = join(runtime, `${name}-bundle.json`), ledgerPath = join(output, `${name}-delivery.jsonl`);
  await writeFile(bundlePath, JSON.stringify(bundle), { flag: "wx" });
  const child = spawn(process.execPath, [join(root, "evals/judge-evidence-server.mjs"), "--bundle", bundlePath, "--ledger", ledgerPath], { stdio: ["pipe", "pipe", "pipe"] });
  const waiting = new Map();
  let pending = "", stderr = "", maxWireBytes = 0, calls = 0;
  const begun = performance.now();
  const timer = setTimeout(() => child.kill("SIGKILL"), 60000);
  child.stdout.setEncoding("utf8"); child.stderr.setEncoding("utf8");
  child.stdin.on("error", () => {});
  child.stderr.on("data", chunk => { stderr += chunk; });
  child.stdout.on("data", chunk => {
    pending += chunk;
    while (pending.includes("\n")) {
      const end = pending.indexOf("\n"), line = pending.slice(0, end + 1);
      maxWireBytes = Math.max(maxWireBytes, Buffer.byteLength(line));
      pending = pending.slice(end + 1);
      const response = JSON.parse(line);
      waiting.get(response.id)?.resolve(response);
      waiting.delete(response.id);
    }
  });
  const finished = new Promise((done, failed) => {
    child.on("error", failed);
    child.on("close", code => {
      clearTimeout(timer);
      for (const deferred of waiting.values()) deferred.reject(new Error(`Accessor stopped: ${code}`));
      done(code);
    });
  });
  const ask = (method, params) => {
    const id = ++calls, answer = new Promise((resolve, reject) => waiting.set(id, { resolve, reject }));
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, ...(params === undefined ? {} : { params }) }) + "\n");
    return answer;
  };
  const served = [];
  try {
    const initialized = await ask("initialize", { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "local-transport-calibration", version: "1" } });
    assert.ok(initialized.result);
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");
    const listing = await ask("tools/list", { _meta: { progressToken: "local-list" } });
    assert.deepEqual(listing.result.tools.map(tool => tool.name), ["read_page"]);
    for (const page of bundle.pages) {
      const response = await ask("tools/call", { name: "read_page", arguments: { page_id: page.id }, _meta: { progressToken: page.id } });
      assert.deepEqual(response.result, reader.get(page.id));
      const text = response.result.content[0].text;
      served.push(text.slice(text.indexOf("\n\n") + 2));
    }
    child.stdin.end();
    assert.equal(await finished, 0);
    assert.equal(stderr, ""); assert.equal(pending, "");
    assert.ok(maxWireBytes <= MAX_PAGE_RESPONSE_BYTES);
    const reconstructed = Buffer.from(served.join(""));
    assert.deepEqual(reconstructed, original);
    const coverage = verifyPageCoverage(bundle, await readFile(ledgerPath, "utf8"));
    const entryPrompt = pagedJudgePrompt(bundle);
    assert.ok(Buffer.byteLength(entryPrompt) < MAX_JUDGE_PROMPT_BYTES && entryPrompt.length < MAX_JUDGE_PROMPT_CHARACTERS);
    results.push({ name, path, originalSha256: hash(original), originalBytes: original.length, originalCodeUnits: prompt.length,
      fitsOldInline: original.length <= MAX_JUDGE_PROMPT_BYTES && prompt.length <= MAX_JUDGE_PROMPT_CHARACTERS,
      documentCount: documents.length, everyOriginalDocumentPreserved: true, bundleDigest: bundle.digest,
      pages: bundle.pages.length, bootstrapBytes: Buffer.byteLength(entryPrompt), maximumActualWireBytes: maxWireBytes,
      exactReconstruction: true, reconstructedSha256: hash(reconstructed), coverage, localMilliseconds: Math.round(performance.now() - begun),
      ledger: `${capture}/${name}-delivery.jsonl` });
    await writeFile(join(output, `${name}-stderr.log`), stderr, { flag: "wx" });
  } finally {
    clearTimeout(timer);
    if (child.exitCode === null) child.kill("SIGKILL");
  }
}
const sourceFiles = ["evals/codex-build-judge.mjs", "evals/lib/build-score.mjs", "evals/lib/judge-transport.mjs", "evals/judge-evidence-server.mjs", "evals/runs/judge-transport-1/calibrate.mjs"];
const sourceHashes = Object.fromEntries(await Promise.all(sourceFiles.map(async path => [path, hash(await readFile(join(root, path)))])));
const report = { schemaVersion: 1, kind: "no-model-lossless-real-process-transport-calibration", node: process.version,
  results, sourceHashes, modelCalls: 0, originalStudiesModified: false,
  limitations: "Real local MCP server and synthetic client, not a live Codex/model tool loop. Historical packet selection is preserved exactly, not upgraded to newer acceptance evidence. This proves lossless bounded serving, not model-history retention, comprehension, token cost, deadline feasibility or a future actual packet fitting the bound." };
await writeFile(join(output, "result.json"), JSON.stringify(report, null, 2) + "\n", { flag: "wx" });
console.log(JSON.stringify(report, null, 2));
