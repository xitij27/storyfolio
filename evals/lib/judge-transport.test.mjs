import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  MAX_JUDGE_EVIDENCE_BYTES, MAX_JUDGE_EVIDENCE_PAGES, PAGE_TEXT_BYTES,
  MAX_PAGE_RESPONSE_BYTES, MAX_PAGE_RESULT_BYTES, createPagedEvidence, verifyPagedEvidence,
  pageResponse, createPageReader, verifyPageCoverage,
} from "./judge-transport.mjs";

const sha256 = value => createHash("sha256").update(value).digest("hex");
const clone = value => structuredClone(value);
const receipt = (bundle, page) => ({ bundleDigest: bundle.digest, pageId: page.id, pageSha256: page.sha256, responseSha256: sha256(JSON.stringify(pageResponse(bundle, page.id))) });
const ledger = (bundle, pages = bundle.pages) => pages.map(page => JSON.stringify(receipt(bundle, page))).join("\n") + "\n";

test("paged v1 restores every prompt byte without normalizing whitespace or duplicate bodies", () => {
  const repeated = "same source body\r\n\t  ";
  const prompt = `Frozen template\n\n${repeated}${repeated}\nJSON: {\"a\":true}\n\n`;
  const bundle = createPagedEvidence(prompt);
  assert.equal(bundle.schemaVersion, 1);
  assert.equal(bundle.transport, "paged-v1");
  assert.equal(verifyPagedEvidence(bundle).prompt, prompt);
  assert.equal(bundle.prompt.sha256, sha256(Buffer.from(prompt)));
  assert.equal(bundle.prompt.bytes, Buffer.byteLength(prompt));
  assert.equal(bundle.prompt.codeUnits, prompt.length);
  assert.deepEqual(bundle, createPagedEvidence(prompt));
  assert.deepEqual(bundle.pages.map(page => page.id), ["page-0001"]);
  assert.equal(Buffer.concat(bundle.pages.map(page => Buffer.from(page.text))).toString(), prompt);
  const { digest, ...unsigned } = bundle;
  assert.equal(digest, sha256(JSON.stringify(unsigned)));
});

test("empty prompt has one explicit empty page and complete coverage requires reading it", () => {
  const bundle = createPagedEvidence("");
  assert.deepEqual(bundle.pages, [{ id: "page-0001", startByte: 0, endByte: 0, sha256: sha256(""), text: "" }]);
  assert.equal(verifyPagedEvidence(bundle).prompt, "");
  assert.throws(() => verifyPageCoverage(bundle, ""), /incomplete page coverage/);
  assert.equal(verifyPageCoverage(bundle, ledger(bundle)).count, 1);
});

test("document inventory keeps original and selected text hashes distinct and retains duplicate bodies by path", () => {
  const original = "  selected text\r\nunused tail\n";
  const selected = "selected text";
  const descriptor = { path: "input/first.txt", sha256: sha256(original), bytes: Buffer.byteLength(original), selection: { end: 15, start: 2 }, selectedTextSha256: sha256(selected), selectedTextBytes: Buffer.byteLength(selected) };
  const bundle = createPagedEvidence(`${selected}\n${selected}`, { documents: [descriptor, { ...descriptor, path: "input/second.txt" }] });
  assert.equal(bundle.documents.length, 2);
  assert.notEqual(bundle.documents[0].sha256, bundle.documents[0].selectedTextSha256);
  assert.deepEqual(bundle.documents.map(document => document.path), ["input/first.txt", "input/second.txt"]);
  assert.deepEqual(bundle.documents.map(document => document.sha256), [sha256(original), sha256(original)]);
  assert.equal(verifyPagedEvidence(bundle).prompt, `${selected}\n${selected}`);
  const reordered = createPagedEvidence(`${selected}\n${selected}`, { documents: [{ ...descriptor, selection: { start: 2, end: 15 } }, { ...descriptor, path: "input/second.txt", selection: { start: 2, end: 15 } }] });
  assert.equal(bundle.digest, reordered.digest);
});

test("UTF-8 page boundaries preserve astral, combining and multibyte text exactly", () => {
  const prompt = "a".repeat(PAGE_TEXT_BYTES - 1) + "🧪e\u0301漢字".repeat(12000) + "\r\n";
  const bundle = createPagedEvidence(prompt);
  assert.ok(bundle.pages.length > 3);
  assert.equal(bundle.pages[0].endByte, PAGE_TEXT_BYTES - 1);
  assert.equal(bundle.pages[1].text.startsWith("🧪"), true);
  assert.equal(verifyPagedEvidence(bundle).prompt, prompt);
  let end = 0;
  for (const page of bundle.pages) {
    assert.equal(page.startByte, end);
    assert.equal(page.endByte - page.startByte, Buffer.byteLength(page.text));
    assert.ok(page.text.isWellFormed());
    end = page.endByte;
  }
});

test("a long single line is split, never omitted or summarized", () => {
  const prompt = "single-line:" + "x".repeat(PAGE_TEXT_BYTES * 4 + 100);
  const bundle = createPagedEvidence(prompt);
  assert.equal(bundle.pages.length, 5);
  assert.equal(bundle.pages[0].text.length, PAGE_TEXT_BYTES);
  assert.equal(verifyPagedEvidence(bundle).prompt, prompt);
});

test("full serialized MCP responses fit the byte cap even for maximally escaped text", () => {
  const prompt = "\u0000\u0001\u0002\t\n\r\\\"🧪".repeat(6000);
  const bundle = createPagedEvidence(prompt);
  assert.ok(bundle.pages.some(page => Buffer.byteLength(page.text) < PAGE_TEXT_BYTES && page.endByte < bundle.prompt.bytes));
  assert.equal(verifyPagedEvidence(bundle).prompt, prompt);
  for (const page of bundle.pages) {
    const response = pageResponse(bundle, page.id);
    assert.ok(Buffer.byteLength(JSON.stringify(response)) <= MAX_PAGE_RESULT_BYTES);
    const wire = JSON.stringify({ jsonrpc: "2.0", id: "\u0000".repeat(128), result: response }) + "\n";
    assert.ok(Buffer.byteLength(wire) <= MAX_PAGE_RESPONSE_BYTES);
    assert.deepEqual(Object.keys(response), ["content", "isError"]);
    assert.equal(response.isError, false);
    assert.equal(response.content[0].type, "text");
    assert.ok(response.content[0].text.includes(`Evidence page: ${page.id}\n`));
    assert.ok(response.content[0].text.includes(`Page SHA-256: ${page.sha256}\n`));
    assert.ok(response.content[0].text.includes(`UTF-8 byte range: ${page.startByte}..${page.endByte} (end exclusive)\n`));
    assert.ok(response.content[0].text.endsWith(page.text));
  }
});

test("prompt byte and page-count bounds reject instead of truncating", () => {
  assert.equal(MAX_JUDGE_EVIDENCE_BYTES, 8 * 1024 * 1024);
  assert.equal(MAX_JUDGE_EVIDENCE_PAGES, 512);
  const exact = createPagedEvidence("x".repeat(MAX_JUDGE_EVIDENCE_BYTES));
  assert.equal(exact.prompt.bytes, MAX_JUDGE_EVIDENCE_BYTES);
  assert.equal(exact.pages.length, MAX_JUDGE_EVIDENCE_BYTES / PAGE_TEXT_BYTES);
  assert.throws(() => createPagedEvidence("x".repeat(MAX_JUDGE_EVIDENCE_BYTES + 1)), /exceeds .* bytes/);
  assert.throws(() => createPagedEvidence("🧪".repeat(MAX_JUDGE_EVIDENCE_BYTES / 4 + 1)), /exceeds .* bytes/);
  assert.throws(() => createPagedEvidence("\u0000".repeat(MAX_JUDGE_EVIDENCE_BYTES)), /exceeds 512 bounded pages/);
});

test("lone UTF-16 surrogates are rejected instead of replaced with different UTF-8 bytes", () => {
  for (const prompt of ["\ud800", "prefix\udfff", "\ud800x\udc00"]) assert.throws(() => createPagedEvidence(prompt), /well-formed Unicode/);
  const invalid = createPagedEvidence("valid");
  invalid.pages[0].text = "\ud800";
  assert.throws(() => verifyPagedEvidence(invalid), /invalid-Unicode/);
});

test("strict verification rejects missing, reordered, duplicate, malformed and tampered bundle data", () => {
  const bundle = createPagedEvidence("a".repeat(PAGE_TEXT_BYTES * 2 + 1));
  const mutations = [
    value => { delete value.prompt; },
    value => { value.extra = "unhashed"; },
    value => { value.schemaVersion = 2; },
    value => { value.transport = "summary-v1"; },
    value => { value.digest = "0".repeat(64); },
    value => { value.prompt.bytes--; },
    value => { value.prompt.codeUnits++; },
    value => { value.prompt.sha256 = "0".repeat(64); },
    value => { value.pages.pop(); },
    value => { value.pages.reverse(); },
    value => { value.pages[1] = value.pages[0]; },
    value => { value.pages[0].text = "b" + value.pages[0].text.slice(1); },
    value => { value.pages[0].endByte--; },
    value => { value.pages[1].startByte--; },
    value => { value.pages[0].sha256 = "0".repeat(64); },
    value => { value.pages[0].otherText = "unexpected"; },
    value => { value.pages[0] = null; },
    value => { value.pages = []; },
    value => { value.documents = [null]; },
  ];
  for (const mutate of mutations) {
    const value = clone(bundle);
    mutate(value);
    assert.throws(() => verifyPagedEvidence(value), /Invalid paged judge evidence/);
  }
  assert.throws(() => pageResponse(bundle, "page-9999"), /unknown page ID/);
});

test("even rehashed noncanonical page boundaries cannot masquerade as paged v1", () => {
  const bundle = createPagedEvidence("x".repeat(PAGE_TEXT_BYTES + 2));
  const first = bundle.pages[0];
  const second = bundle.pages[1];
  first.text = first.text.slice(0, -1);
  first.endByte--;
  first.sha256 = sha256(first.text);
  second.text = "x" + second.text;
  second.startByte--;
  second.sha256 = sha256(second.text);
  const { digest, ...unsigned } = bundle;
  bundle.digest = sha256(JSON.stringify(unsigned));
  assert.throws(() => verifyPagedEvidence(bundle), /noncanonical page layout/);
});

test("invalid original/selected document descriptors and selection metadata fail closed", () => {
  const document = { path: "source.txt", sha256: sha256("raw"), bytes: 3, selectedTextSha256: sha256("selected"), selectedTextBytes: 8 };
  const cyclic = {}; cyclic.self = cyclic;
  for (const change of [{ path: "" }, { path: "\ud800" }, { sha256: "bad" }, { bytes: -1 }, { selectedTextSha256: "bad" }, { selectedTextBytes: 0.5 }, { selection: undefined }, { selection: Infinity }, { selection: [undefined] }, { selection: new Array(1) }, { selection: cyclic }, { selection: { bad: "\ud800" } }, { unexpected: true }]) assert.throws(() => createPagedEvidence("prompt", { documents: [{ ...document, ...change }] }), /Invalid paged judge evidence/);
  assert.throws(() => createPagedEvidence("prompt", { documents: new Array(1) }), /dense array/);
  const bundle = createPagedEvidence("prompt", { documents: [document] });
  bundle.documents[0].path = "substituted.txt";
  assert.throws(() => verifyPagedEvidence(bundle), /bundle digest mismatch/);
});

test("verified page readers isolate responses from later bundle or returned-response mutation", () => {
  const bundle = createPagedEvidence("first\n" + "x".repeat(PAGE_TEXT_BYTES));
  const expected = pageResponse(bundle, "page-0001");
  const reader = createPageReader(bundle);
  assert.ok(Object.isFrozen(reader));
  const response = reader.get("page-0001");
  response.content[0].text = "altered return";
  response.content.push({ type: "text", text: "injected" });
  bundle.pages[0].text = "altered input";
  bundle.prompt.sha256 = "0".repeat(64);
  bundle.pages.pop();
  assert.deepEqual(reader.get("page-0001"), expected);
  assert.notEqual(reader.get("page-0001"), reader.get("page-0001"));
  assert.throws(() => reader.get("page-9999"), /unknown page ID/);
  assert.throws(() => createPageReader(bundle), /Invalid paged judge evidence/);
});

test("coverage accepts repeated and out-of-order exact reads but counts each page once", () => {
  const bundle = createPagedEvidence("x".repeat(PAGE_TEXT_BYTES * 2 + 1));
  const text = ledger(bundle, [bundle.pages[2], bundle.pages[0], bundle.pages[0], bundle.pages[1]]);
  assert.deepEqual(verifyPageCoverage(bundle, text), { complete: true, count: 3, receiptCount: 4, sha256: sha256(text) });
});

test("coverage rejects incomplete, malformed, forged and partially written receipts", () => {
  const bundle = createPagedEvidence("x".repeat(PAGE_TEXT_BYTES + 1));
  assert.throws(() => verifyPageCoverage(bundle, ""), /incomplete page coverage/);
  assert.throws(() => verifyPageCoverage(bundle, ledger(bundle, [bundle.pages[0], bundle.pages[0]])), /incomplete page coverage: 1\/2/);
  const complete = ledger(bundle);
  for (const text of [complete.trimEnd(), complete + "\n", complete + "broken\n", complete + "null\n", "[]\n", complete + "{"]) assert.throws(() => verifyPageCoverage(bundle, text), /Invalid paged judge evidence/);
  for (const change of [{ bundleDigest: "0".repeat(64) }, { pageId: "page-9999" }, { pageSha256: "0".repeat(64) }, { responseSha256: "0".repeat(64) }, { extra: "untrusted" }]) {
    const forged = { ...receipt(bundle, bundle.pages[0]), ...change };
    assert.throws(() => verifyPageCoverage(bundle, complete + JSON.stringify(forged) + "\n"), /Invalid paged judge evidence/);
  }
  const first = receipt(bundle, bundle.pages[0]);
  delete first.responseSha256;
  assert.throws(() => verifyPageCoverage(bundle, complete + JSON.stringify(first) + "\n"), /missing fields/);
});
