import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, open, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { Readable, Writable } from "node:stream";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { MAX_MESSAGES, MAX_READ_REQUESTS, MAX_REQUEST_BYTES, serveJudgeEvidence } from "../judge-evidence-server.mjs";
import { MAX_JUDGE_EVIDENCE_BYTES, MAX_PAGE_RESULT_BYTES, MAX_PAGE_RESPONSE_BYTES, createPagedEvidence, pageResponse, verifyPageCoverage } from "./judge-transport.mjs";

const server = resolve(dirname(fileURLToPath(import.meta.url)), "../judge-evidence-server.mjs");
const sha256 = value => createHash("sha256").update(value).digest("hex");
const request = (id, method, params) => ({ jsonrpc: "2.0", id, method, ...(params === undefined ? {} : { params }) });
const initialization = request(1, "initialize", { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "local-fake-client", version: "1" } });
const readPage = (id, pageId, extra = {}) => request(id, "tools/call", { name: "read_page", arguments: { page_id: pageId, ...extra } });
const lines = messages => messages.map(message => typeof message === "string" ? message : JSON.stringify(message)).join("\n") + "\n";

async function fixture(t, prompt = "One complete immutable packet.\n") {
  const root = await mkdtemp(join(tmpdir(), "storyfolio-judge-evidence-"));
  t.after(() => rm(root, { force: true, recursive: true }));
  const bundle = createPagedEvidence(prompt);
  const bundlePath = join(root, "bundle.json"), ledgerPath = join(root, "ledger.jsonl");
  await writeFile(bundlePath, JSON.stringify(bundle));
  return { root, bundle, bundlePath, ledgerPath, argv: ["--bundle", bundlePath, "--ledger", ledgerPath] };
}

function client(t, argv) {
  const child = spawn(process.execPath, [server, ...argv], { stdio: ["pipe", "pipe", "pipe"] });
  const responses = [], waiting = new Map();
  let stdout = "", pending = "", stderr = "";
  const timer = setTimeout(() => child.kill("SIGKILL"), 20000);
  t.after(() => { clearTimeout(timer); if (child.exitCode === null) child.kill("SIGKILL"); });
  child.stdin.on("error", () => {});
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", text => { stderr += text; });
  child.stdout.on("data", text => {
    stdout += text; pending += text;
    while (pending.includes("\n")) {
      const newline = pending.indexOf("\n");
      const response = JSON.parse(pending.slice(0, newline));
      pending = pending.slice(newline + 1);
      responses.push(response);
      waiting.get(response.id)?.resolve(response);
      waiting.delete(response.id);
    }
  });
  const finished = new Promise((done, failed) => {
    child.on("error", failed);
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      for (const deferred of waiting.values()) deferred.reject(new Error(stderr || `Server closed: ${code}/${signal}`));
      done({ code, signal, responses, stdout, stderr, pending });
    });
  });
  return {
    child,
    ask(message) {
      const answer = new Promise((resolve, reject) => waiting.set(message.id, { resolve, reject }));
      child.stdin.write(JSON.stringify(message) + "\n");
      return answer;
    },
    end(input = "") { child.stdin.end(input); return finished; },
  };
}

test("real MCP client reads every immutable page and reconstructs the exact packet", async t => {
  const prompt = 'Complete commands and source: 漢😀é\\\"\n'.repeat(3000);
  const fixtureValue = await fixture(t, prompt);
  const { bundle, argv, ledgerPath } = fixtureValue;
  const connection = client(t, argv);
  const initialized = await connection.ask(initialization);
  assert.equal(initialized.result.protocolVersion, "2025-03-26");
  connection.child.stdin.write(lines([{ jsonrpc: "2.0", method: "notifications/initialized" }]));
  const listing = await connection.ask(request(2, "tools/list"));
  assert.equal(listing.result.tools.length, 1);
  const [tool] = listing.result.tools;
  assert.equal(tool.name, "read_page");
  assert.equal(tool.inputSchema.additionalProperties, false);
  assert.deepEqual(tool.inputSchema.required, ["page_id"]);
  assert.equal(tool.annotations.readOnlyHint, true);
  assert.equal(tool.annotations.openWorldHint, false);
  const pieces = [];
  for (const [index, page] of bundle.pages.entries()) {
    const reply = await connection.ask(readPage(index + 3, page.id));
    assert.deepEqual(reply.result, pageResponse(bundle, page.id));
    assert.ok(Buffer.byteLength(JSON.stringify(reply.result)) <= MAX_PAGE_RESPONSE_BYTES);
    const content = reply.result.content[0].text;
    assert.ok(content.endsWith(page.text));
    pieces.push(content.slice(content.length - page.text.length));
  }
  const done = await connection.end();
  assert.equal(done.code, 0, done.stderr);
  assert.equal(done.pending, "");
  assert.equal(pieces.join(""), prompt);
  assert.equal(sha256(pieces.join("")), bundle.prompt.sha256);
  const ledger = await readFile(ledgerPath, "utf8");
  assert.deepEqual(verifyPageCoverage(bundle, ledger), { complete: true, count: bundle.pages.length, receiptCount: bundle.pages.length, sha256: sha256(ledger) });
  const receipts = ledger.trimEnd().split("\n").map(JSON.parse);
  assert.ok(receipts.every(receipt => receipt.bundleDigest === bundle.digest));
});

test("server snapshot cannot change when the bundle file changes after initialization", async t => {
  const value = await fixture(t, "Original evidence stays bound to the manifest.");
  const connection = client(t, value.argv);
  await connection.ask(initialization);
  await writeFile(value.bundlePath, JSON.stringify(createPagedEvidence("Replacement evidence is not served.")));
  const result = await connection.ask(readPage(2, "page-0001"));
  assert.deepEqual(result.result, pageResponse(value.bundle, "page-0001"));
  assert.equal((await connection.end()).code, 0);
  assert.equal(verifyPageCoverage(value.bundle, await readFile(value.ledgerPath, "utf8")).complete, true);
});

test("invalid JSON, unknown fields, methods and page IDs never earn a receipt", async t => {
  const value = await fixture(t);
  const attempts = [
    readPage(2, "../bundle.json"), readPage(3, "page-0001", { path: value.bundlePath }),
    readPage(4, "page-0001", { start: 0, end: 2 }), readPage(5, "page-0000"), readPage(6, "page-9999"),
    request(7, "tools/call", { name: "execute", arguments: { command: "pwd" } }),
    request(8, "tools/call", { name: "read_page", arguments: { page_id: 1 } }),
    request(9, "tools/call", { name: "read_page", arguments: { page_id: "page-0001" }, extra: true }),
    request(10, "resources/read", { uri: value.bundlePath }), request(11, "tools/list", { cursor: "arbitrary" }),
    { ...readPage(12, "page-0001"), extra: true }, readPage(null, "page-0001"),
    { jsonrpc: "2.0", method: "tools/call", params: { name: "read_page", arguments: { page_id: "page-0001" } } },
    "{malformed", [],
  ];
  const result = await client(t, value.argv).end(lines([initialization, ...attempts, request(13, "ping")]));
  assert.equal(result.code, 0, result.stderr);
  assert.equal(result.responses.filter(response => response.error).length, attempts.length - 1);
  assert.ok(result.responses.some(response => response.error?.code === -32700));
  assert.deepEqual(result.responses.at(-1), { jsonrpc: "2.0", id: 13, result: {} });
  assert.equal(await readFile(value.ledgerPath, "utf8"), "");
});

test("evidence requires initialization and duplicate initialization is rejected", async t => {
  const value = await fixture(t);
  const result = await client(t, value.argv).end(lines([readPage(3, "page-0001"), initialization, { ...initialization, id: 4 }, request(5, "ping")]));
  assert.equal(result.code, 0, result.stderr);
  assert.equal(result.responses[0].error.code, -32000);
  assert.equal(result.responses[2].error.code, -32602);
  assert.equal(await readFile(value.ledgerPath, "utf8"), "");
});

test("reserved MCP parameter metadata is inert while tool arguments stay closed-world", async t => {
  const value = await fixture(t);
  const metadata = { progressToken: "local-progress", harmless: { path: "never-opened", command: "never-executed" } };
  const read = readPage(4, "page-0001");
  read.params._meta = metadata;
  const result = await client(t, value.argv).end(lines([
    { ...initialization, params: { ...initialization.params, _meta: metadata } },
    request(2, "ping", { _meta: metadata }), request(3, "tools/list", { _meta: metadata }), read,
    readPage(5, "page-0001", { _meta: metadata }),
  ]));
  assert.equal(result.code, 0, result.stderr);
  assert.ok(result.responses.slice(0, 4).every(response => !response.error));
  assert.equal(result.responses[4].error.code, -32602);
  assert.equal(verifyPageCoverage(value.bundle, await readFile(value.ledgerPath, "utf8")).receiptCount, 1);
});

test("existing ledger is preserved and no evidence response is sent", async t => {
  const value = await fixture(t);
  await writeFile(value.ledgerPath, "existing audit\n");
  const result = await client(t, value.argv).end(lines([initialization, readPage(2, "page-0001")]));
  assert.equal(result.code, 1);
  assert.match(result.stderr, /EEXIST/);
  assert.equal(result.stdout, "");
  assert.equal(await readFile(value.ledgerPath, "utf8"), "existing audit\n");
});

test("tampered bundles fail before creating a ledger or responding", async t => {
  const value = await fixture(t);
  value.bundle.pages[0].text += "hidden change";
  await writeFile(value.bundlePath, JSON.stringify(value.bundle));
  const result = await client(t, value.argv).end(lines([initialization]));
  assert.equal(result.code, 1);
  assert.match(result.stderr, /Invalid paged judge evidence/);
  assert.equal(result.stdout, "");
  await assert.rejects(readFile(value.ledgerPath), { code: "ENOENT" });
});

test("non-file, oversized and malformed UTF-8 bundles are rejected before ledger creation", async t => {
  const directory = await fixture(t);
  const nonFile = await client(t, ["--bundle", directory.root, "--ledger", directory.ledgerPath]).end();
  assert.equal(nonFile.code, 1);
  assert.match(nonFile.stderr, /bounded regular file/);
  await assert.rejects(readFile(directory.ledgerPath), { code: "ENOENT" });
  const large = await fixture(t);
  const file = await open(large.bundlePath, "r+");
  try { await file.truncate(MAX_JUDGE_EVIDENCE_BYTES * 6 + 1024 * 1024 + 1); }
  finally { await file.close(); }
  const oversized = await client(t, large.argv).end();
  assert.equal(oversized.code, 1);
  assert.match(oversized.stderr, /bounded regular file/);
  await assert.rejects(readFile(large.ledgerPath), { code: "ENOENT" });
  const malformed = await fixture(t);
  await writeFile(malformed.bundlePath, Buffer.from([0xff]));
  const badUtf8 = await client(t, malformed.argv).end();
  assert.equal(badUtf8.code, 1);
  assert.match(badUtf8.stderr, /encoded data/);
  await assert.rejects(readFile(malformed.ledgerPath), { code: "ENOENT" });
});

test("bundle symlinks and symlinked parent directories are rejected", async t => {
  const value = await fixture(t);
  const link = join(value.root, "linked.json");
  await symlink(value.bundlePath, link);
  const direct = await client(t, ["--bundle", link, "--ledger", value.ledgerPath]).end(lines([initialization]));
  assert.equal(direct.code, 1);
  assert.match(direct.stderr, /symlinks/);
  const parent = join(value.root, "linked-parent");
  await symlink(value.root, parent);
  const nested = await client(t, ["--bundle", value.bundlePath, "--ledger", join(parent, "ledger.jsonl")]).end(lines([initialization]));
  assert.equal(nested.code, 1);
  assert.match(nested.stderr, /symlinks/);
  await assert.rejects(readFile(value.ledgerPath), { code: "ENOENT" });
});

test("only normalized absolute bundle and ledger paths are accepted", async t => {
  const value = await fixture(t);
  for (const argv of [[], ["--bundle", "relative.json", "--ledger", value.ledgerPath], ["--bundle", value.bundlePath, "--other", value.ledgerPath], ["--bundle", value.bundlePath, "--bundle", value.ledgerPath], ["--bundle", value.bundlePath, "--ledger", value.bundlePath]]) {
    const result = await client(t, argv).end();
    assert.equal(result.code, 1, JSON.stringify(argv));
    assert.equal(result.stdout, "");
  }
  await assert.rejects(readFile(value.ledgerPath), { code: "ENOENT" });
});

test("escaped pages and maximal escaped request IDs stay within the full wire limit", async t => {
  const value = await fixture(t, "\u0000\u0001\u0002\\\"\n".repeat(14000));
  const result = await client(t, value.argv).end(lines([initialization, ...value.bundle.pages.map((page, index) => readPage(String(index).padStart(128, "\u0000"), page.id))]));
  assert.equal(result.code, 0, result.stderr);
  assert.equal(result.responses.length, value.bundle.pages.length + 1);
  assert.ok(result.responses.slice(1).every(response => Buffer.byteLength(JSON.stringify(response.result)) <= MAX_PAGE_RESULT_BYTES));
  assert.ok(result.stdout.trimEnd().split("\n").every(line => Buffer.byteLength(line + "\n") <= MAX_PAGE_RESPONSE_BYTES));
  assert.equal(verifyPageCoverage(value.bundle, await readFile(value.ledgerPath, "utf8")).complete, true);
});

test("maximum-size ASCII packet is served and receipted without repeated full verification", async t => {
  const value = await fixture(t, "x".repeat(8 * 1024 * 1024));
  assert.equal(value.bundle.pages.length, 256);
  const result = await client(t, value.argv).end(lines([initialization, ...value.bundle.pages.map((page, index) => readPage(index + 2, page.id))]));
  assert.equal(result.code, 0, result.stderr);
  assert.equal(result.responses.length, 257);
  assert.ok(result.responses.slice(1).every(response => !response.error));
  assert.equal(verifyPageCoverage(value.bundle, await readFile(value.ledgerPath, "utf8")).receiptCount, 256);
});

test("oversized JSON lines and read request floods stop without receipts", async t => {
  const tooLong = await fixture(t);
  const oversized = await client(t, tooLong.argv).end("x".repeat(MAX_REQUEST_BYTES + 1));
  assert.equal(oversized.code, 1);
  assert.match(oversized.stderr, /request exceeds its byte bound/);
  assert.equal(await readFile(tooLong.ledgerPath, "utf8"), "");
  const flood = await fixture(t);
  const flooded = await client(t, flood.argv).end(lines([initialization, ...Array.from({ length: MAX_READ_REQUESTS + 1 }, (_, index) => readPage(index + 2, "page-9999"))]));
  assert.equal(flooded.code, 1);
  assert.match(flooded.stderr, /read request count exceeds its bound/);
  assert.equal(flooded.responses.length, MAX_READ_REQUESTS + 1);
  assert.equal(await readFile(flood.ledgerPath, "utf8"), "");
});

test("notification floods are bounded too", async t => {
  const value = await fixture(t);
  const result = await client(t, value.argv).end(lines(Array.from({ length: MAX_MESSAGES + 1 }, () => ({ jsonrpc: "2.0", method: "notifications/initialized" }))));
  assert.equal(result.code, 1);
  assert.match(result.stderr, /message count exceeds its bound/);
  assert.equal(result.stdout, "");
  assert.equal(await readFile(value.ledgerPath, "utf8"), "");
});

test("clean EOF, final line without LF and malformed final JSON terminate gracefully", async t => {
  for (const [input, count, error] of [["", 0, false], [JSON.stringify(initialization), 1, false], ["{", 1, true]]) {
    const value = await fixture(t);
    const result = await client(t, value.argv).end(input);
    assert.equal(result.code, 0, result.stderr);
    assert.equal(result.responses.length, count);
    assert.equal(Boolean(result.responses[0]?.error), error);
    assert.equal(await readFile(value.ledgerPath, "utf8"), "");
  }
});

test("a failed response flush cannot append a delivery receipt", async t => {
  const value = await fixture(t);
  const output = new Writable({
    write(chunk, encoding, done) {
      const message = JSON.parse(chunk.toString());
      if (message.id === 2) done(new Error("simulated closed stdout"));
      else done();
    },
  });
  output.on("error", () => {});
  const input = Readable.from([Buffer.from(lines([initialization, readPage(2, "page-0001")]))]);
  await assert.rejects(serveJudgeEvidence({ argv: value.argv, input, output }), /simulated closed stdout/);
  assert.equal(await readFile(value.ledgerPath, "utf8"), "");
});

test("a delivery receipt is appended only after the page response callback succeeds", async t => {
  const value = await fixture(t);
  let beginFlush, finishFlush;
  const flushing = new Promise(resolve => { beginFlush = resolve; });
  const output = new Writable({
    write(chunk, encoding, done) {
      if (JSON.parse(chunk.toString()).id === 2) { finishFlush = done; beginFlush(); }
      else done();
    },
  });
  const input = Readable.from([Buffer.from(lines([initialization, readPage(2, "page-0001")]))]);
  const served = serveJudgeEvidence({ argv: value.argv, input, output });
  await flushing;
  assert.equal(await readFile(value.ledgerPath, "utf8"), "");
  finishFlush();
  await served;
  assert.equal(verifyPageCoverage(value.bundle, await readFile(value.ledgerPath, "utf8")).receiptCount, 1);
});
