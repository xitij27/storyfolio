import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { collectImages, renderSheets, sheetHtml } from "../builds/bench-depth-2/workspace/scripts/review-sheets.mjs";

test("neutral screenshot helper escapes labels and embeds only supplied PNG/JPEG bytes", () => {
  const html = sheetHtml([{ name: '<img src=x onerror="bad">&', bytes: Buffer.from("image"), mime: "image/png" }]);
  assert.ok(html.includes("&lt;img src=x onerror=&quot;bad&quot;&gt;&amp;"));
  assert.ok(html.includes("data:image/png;base64,aW1hZ2U="));
  assert.equal(html.includes('src=x'), true);
  assert.equal(html.includes('<img src=x'), false);
  assert.throws(() => sheetHtml([{ name: "file", bytes: Buffer.from("x"), mime: "text/html" }]), /PNG\/JPEG/);
});

test("neutral screenshot helper retains source bytes, batches originals and refuses overwrite", async () => {
  const directory = await mkdtemp(join(tmpdir(), "storyfolio-sheet-test-"));
  const input = join(directory, "input"), output = join(directory, "output");
  await mkdir(input); await mkdir(join(input, "mobile"));
  for (let index = 0; index < 13; index++) await writeFile(join(input, `image-${index}.png`), `bytes-${index}`);
  await writeFile(join(input, "mobile", "still.jpeg"), "jpeg-bytes");
  await writeFile(join(input, "report.json"), "{}");
  const before = await collectImages(input);
  let closed = false, screenshots = 0;
  const chromium = { async launch() { return { async newPage() { return {
    async setContent(html) { assert.ok(html.includes("data:image/")); },
    locator(selector) { assert.equal(selector, "img"); return { async evaluateAll() {} }; },
    async screenshot({ path }) { screenshots++; await writeFile(path, "synthetic screenshot"); },
  }; }, async close() { closed = true; } }; } };
  const files = await renderSheets(input, output, chromium);
  assert.equal(files.length, 2); assert.equal(screenshots, 2); assert.equal(closed, true);
  assert.equal(files.flatMap(file => file.originals).length, 14);
  assert.deepEqual(await collectImages(input), before);
  const manifest = JSON.parse(await readFile(join(output, "manifest.json"), "utf8"));
  assert.deepEqual(manifest.files, files);
  await assert.rejects(renderSheets(input, output, chromium), /EEXIST/);
  await symlink(input, join(directory, "linked-input"));
  await assert.rejects(collectImages(join(directory, "linked-input")), /Symlink screenshot input path/);
  await assert.rejects(collectImages(join(directory, "linked-input", "mobile")), /Symlink screenshot input path/);
  await symlink(join(input, "image-0.png"), join(input, "linked.png"));
  await assert.rejects(collectImages(input), /Symlink screenshot/);
});

test("neutral screenshot helper closes the browser on a failed screenshot", async () => {
  const directory = await mkdtemp(join(tmpdir(), "storyfolio-sheet-failure-"));
  await writeFile(join(directory, "source.png"), "source");
  let closed = false;
  const chromium = { async launch() { return { async newPage() { return {
    async setContent() {}, locator() { return { async evaluateAll() {} }; },
    async screenshot() { throw new Error("capture failure"); },
  }; }, async close() { closed = true; } }; } };
  await assert.rejects(renderSheets(directory, join(directory, "out"), chromium), /capture failure/);
  assert.equal(closed, true);
});

test("neutral helper CLI resolves the current site's CommonJS Playwright export", async () => {
  const directory = await mkdtemp(join(tmpdir(), "storyfolio-sheet-cli-"));
  const modulePath = join(directory, "node_modules", "playwright-core");
  await mkdir(modulePath, { recursive: true });
  await writeFile(join(directory, "package.json"), '{"private":true}');
  await writeFile(join(modulePath, "package.json"), '{"name":"playwright-core","main":"index.cjs"}');
  await writeFile(join(modulePath, "index.cjs"), `const fs = require('node:fs/promises');
const chromium = { launch: async () => ({ newPage: async () => ({ setContent: async () => {}, locator: () => ({ evaluateAll: async () => {} }), screenshot: async ({path}) => fs.writeFile(path, 'CLI screenshot') }), close: async () => {} }) };
module.exports = { chromium };
`);
  const input = join(directory, "input"), output = join(directory, "output");
  await mkdir(input); await writeFile(join(input, "original.png"), "original bytes");
  const script = fileURLToPath(new URL("../builds/bench-depth-2/workspace/scripts/review-sheets.mjs", import.meta.url));
  const stdout = execFileSync(process.execPath, [script, input, output], { cwd: directory, encoding: "utf8" });
  assert.match(stdout, /1 contact sheets written/);
  assert.equal(await readFile(join(output, "sheet-001.png"), "utf8"), "CLI screenshot");
  assert.equal(await readFile(join(input, "original.png"), "utf8"), "original bytes");
});
