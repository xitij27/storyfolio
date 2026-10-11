// Lossless judge transport. Pages are byte slices of the complete logical
// prompt, not summaries or a second selection of the original evidence.
import { createHash } from "node:crypto";

export const MAX_JUDGE_EVIDENCE_BYTES = 8 * 1024 * 1024;
export const MAX_JUDGE_EVIDENCE_PAGES = 512;
export const PAGE_TEXT_BYTES = 32768;
export const MAX_PAGE_RESPONSE_BYTES = 65536;
// Reserve room for the JSON-RPC envelope, a maximally escaped 128-character
// request ID, and its final newline. The server also measures the actual wire.
export const MAX_PAGE_RESULT_BYTES = MAX_PAGE_RESPONSE_BYTES - 1024;

const sha256 = value => createHash("sha256").update(value).digest("hex");
const isHash = value => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
const fail = message => { throw new Error(`Invalid paged judge evidence: ${message}`); };
const integer = (value, maximum = Number.MAX_SAFE_INTEGER) => Number.isSafeInteger(value) && value >= 0 && value <= maximum;
const object = value => value !== null && typeof value === "object" && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
const wellFormed = value => typeof value === "string" && value.isWellFormed();
const dense = value => Array.isArray(value) && Object.keys(value).length === value.length && Array.from({ length: value.length }, (_, index) => Object.hasOwn(value, index)).every(Boolean);

function keys(value, required, optional = []) {
  if (!object(value) || required.some(key => !Object.hasOwn(value, key)) || Object.keys(value).some(key => !required.includes(key) && !optional.includes(key))) fail("unexpected or missing fields");
}

// Selection describes the existing extraction only. Original artifact hashes
// and selected-text hashes remain separate, even when two paths have identical
// content. Sorting metadata keys makes serialization independent of insertion.
function jsonMetadata(value, seen = new Set()) {
  if (value === null || typeof value === "boolean") return value;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (wellFormed(value)) return value;
  if ((!object(value) && !Array.isArray(value)) || seen.has(value)) fail("selection must be finite, well-formed JSON metadata");
  seen.add(value);
  let result;
  if (Array.isArray(value)) {
    if (!dense(value)) fail("selection arrays must be dense");
    result = value.map(item => jsonMetadata(item, seen));
  } else {
    result = Object.fromEntries(Object.keys(value).sort().map(key => {
      if (!wellFormed(key)) fail("selection key has invalid Unicode");
      return [key, jsonMetadata(value[key], seen)];
    }));
  }
  seen.delete(value);
  return result;
}

function documentInventory(documents) {
  if (!dense(documents)) fail("documents must be a dense array");
  return documents.map(document => {
    keys(document, ["path", "sha256", "bytes", "selectedTextSha256", "selectedTextBytes"], ["selection"]);
    if (!wellFormed(document.path) || !document.path || !isHash(document.sha256) || !integer(document.bytes) || !isHash(document.selectedTextSha256) || !integer(document.selectedTextBytes)) fail("invalid document descriptor");
    return {
      path: document.path, sha256: document.sha256, bytes: document.bytes,
      ...(Object.hasOwn(document, "selection") ? { selection: jsonMetadata(document.selection) } : {}),
      selectedTextSha256: document.selectedTextSha256, selectedTextBytes: document.selectedTextBytes,
    };
  });
}

function responseFor(prompt, page) {
  const header = `Evidence page: ${page.id}\nPage SHA-256: ${page.sha256}\nUTF-8 byte range: ${page.startByte}..${page.endByte} (end exclusive)\nFull prompt SHA-256: ${prompt.sha256}\nFull prompt UTF-8 bytes: ${prompt.bytes}\n\n`;
  return { content: [{ type: "text", text: header + page.text }], isError: false };
}

const responseBytes = (prompt, page) => Buffer.byteLength(JSON.stringify(responseFor(prompt, page)), "utf8");
const pageId = index => `page-${String(index + 1).padStart(4, "0")}`;
const pageFor = (bytes, startByte, endByte, index) => {
  const slice = bytes.subarray(startByte, endByte);
  return { id: pageId(index), startByte, endByte, sha256: sha256(slice), text: slice.toString("utf8") };
};

function boundary(bytes, end) {
  while (end > 0 && end < bytes.length && (bytes[end] & 0xc0) === 0x80) end--;
  return end;
}

export function createPagedEvidence(prompt, { documents = [] } = {}) {
  if (!wellFormed(prompt)) fail("prompt must be well-formed Unicode text");
  const bytes = Buffer.from(prompt, "utf8");
  if (bytes.length > MAX_JUDGE_EVIDENCE_BYTES) fail(`prompt exceeds ${MAX_JUDGE_EVIDENCE_BYTES} bytes`);
  const promptInfo = { sha256: sha256(bytes), bytes: bytes.length, codeUnits: prompt.length };
  const pages = [];
  let start = 0;
  do {
    if (pages.length === MAX_JUDGE_EVIDENCE_PAGES) fail(`prompt exceeds ${MAX_JUDGE_EVIDENCE_PAGES} bounded pages`);
    let end = boundary(bytes, Math.min(start + PAGE_TEXT_BYTES, bytes.length));
    let page = pageFor(bytes, start, end, pages.length);
    // JSON escapes can make even a 32 KiB text page exceed the transport cap.
    // Shrink only at UTF-8 boundaries, never by altering any text or whitespace.
    if (responseBytes(promptInfo, page) > MAX_PAGE_RESULT_BYTES) {
      let low = start;
      let high = end;
      while (low < high) {
        const middle = Math.ceil((low + high) / 2);
        const candidateEnd = boundary(bytes, middle);
        const candidate = pageFor(bytes, start, candidateEnd, pages.length);
        if (responseBytes(promptInfo, candidate) <= MAX_PAGE_RESULT_BYTES) low = middle;
        else high = middle - 1;
      }
      end = boundary(bytes, low);
      page = pageFor(bytes, start, end, pages.length);
    }
    if (bytes.length && end <= start) fail("a Unicode character cannot fit in one response");
    pages.push(page);
    start = end;
  } while (start < bytes.length);
  const bundle = { schemaVersion: 1, transport: "paged-v1", prompt: promptInfo, documents: documentInventory(documents), pages };
  return { ...bundle, digest: sha256(JSON.stringify(bundle)) };
}

export function verifyPagedEvidence(bundle) {
  keys(bundle, ["schemaVersion", "transport", "prompt", "documents", "pages", "digest"]);
  if (bundle.schemaVersion !== 1 || bundle.transport !== "paged-v1" || !isHash(bundle.digest)) fail("unsupported schema, transport or digest");
  keys(bundle.prompt, ["sha256", "bytes", "codeUnits"]);
  if (!isHash(bundle.prompt.sha256) || !integer(bundle.prompt.bytes, MAX_JUDGE_EVIDENCE_BYTES) || !integer(bundle.prompt.codeUnits, MAX_JUDGE_EVIDENCE_BYTES)) fail("invalid prompt metadata");
  const documents = documentInventory(bundle.documents);
  if (!Array.isArray(bundle.pages) || bundle.pages.length < 1 || bundle.pages.length > MAX_JUDGE_EVIDENCE_PAGES) fail("invalid page count");
  let next = 0;
  const texts = [];
  for (const [index, page] of bundle.pages.entries()) {
    keys(page, ["id", "startByte", "endByte", "sha256", "text"]);
    if (page.id !== pageId(index) || !integer(page.startByte) || page.startByte !== next || !integer(page.endByte, bundle.prompt.bytes) || page.endByte < page.startByte || !isHash(page.sha256) || !wellFormed(page.text)) fail("missing, reordered, malformed or invalid-Unicode page");
    const bytes = Buffer.from(page.text, "utf8");
    if (bytes.length > PAGE_TEXT_BYTES || bytes.length !== page.endByte - page.startByte || sha256(bytes) !== page.sha256 || (!bytes.length && (bundle.pages.length !== 1 || bundle.prompt.bytes !== 0))) fail("page byte range or hash mismatch");
    if (responseBytes(bundle.prompt, page) > MAX_PAGE_RESULT_BYTES) fail("page response exceeds serialized byte limit");
    next = page.endByte;
    texts.push(page.text);
  }
  const prompt = texts.join("");
  if (next !== bundle.prompt.bytes || prompt.length !== bundle.prompt.codeUnits || sha256(prompt) !== bundle.prompt.sha256) fail("full prompt length or hash mismatch");
  const expected = createPagedEvidence(prompt, { documents });
  // Re-creation checks deterministic page boundaries as well as the canonical
  // digest. A rehashed but differently split or enriched packet is not v1.
  if (JSON.stringify(expected) !== JSON.stringify({ schemaVersion: bundle.schemaVersion, transport: bundle.transport, prompt: { sha256: bundle.prompt.sha256, bytes: bundle.prompt.bytes, codeUnits: bundle.prompt.codeUnits }, documents, pages: bundle.pages.map(page => ({ id: page.id, startByte: page.startByte, endByte: page.endByte, sha256: page.sha256, text: page.text })), digest: bundle.digest })) fail("noncanonical page layout or bundle digest mismatch");
  return { prompt, digest: bundle.digest, pageCount: bundle.pages.length, bytes: bundle.prompt.bytes, codeUnits: bundle.prompt.codeUnits };
}

export function pageResponse(bundle, id) {
  verifyPagedEvidence(bundle);
  const page = bundle.pages.find(page => page.id === id);
  if (!page) fail(`unknown page ID: ${String(id)}`);
  return responseFor(bundle.prompt, page);
}

export function createPageReader(bundle) {
  verifyPagedEvidence(bundle);
  // Cache only serialized verified responses, not mutable references to the
  // caller's bundle or previously returned objects. A server checks the whole
  // bundle once and serves exact pages without quadratic re-verification.
  const responses = new Map(bundle.pages.map(page => [page.id, JSON.stringify(responseFor(bundle.prompt, page))]));
  return Object.freeze({ get(id) {
    const serialized = responses.get(id);
    if (serialized === undefined) fail(`unknown page ID: ${String(id)}`);
    return JSON.parse(serialized);
  } });
}

export function verifyPageCoverage(bundle, ledgerText) {
  verifyPagedEvidence(bundle);
  if (!wellFormed(ledgerText) || (ledgerText && !ledgerText.endsWith("\n"))) fail("receipt ledger must contain complete UTF-8 JSONL records");
  const lines = ledgerText ? ledgerText.slice(0, -1).split("\n") : [];
  const seen = new Set();
  for (const line of lines) {
    let receipt;
    try { receipt = JSON.parse(line); } catch { fail("malformed receipt JSONL"); }
    keys(receipt, ["bundleDigest", "pageId", "pageSha256", "responseSha256"]);
    const page = bundle.pages.find(page => page.id === receipt.pageId);
    if (!page || receipt.bundleDigest !== bundle.digest || receipt.pageSha256 !== page.sha256 || receipt.responseSha256 !== sha256(JSON.stringify(responseFor(bundle.prompt, page)))) fail("receipt does not match the exact bundle page response");
    seen.add(page.id);
  }
  if (seen.size !== bundle.pages.length) fail(`incomplete page coverage: ${seen.size}/${bundle.pages.length}`);
  return { complete: true, count: seen.size, receiptCount: lines.length, sha256: sha256(ledgerText) };
}
