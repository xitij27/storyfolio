#!/usr/bin/env node
// Neutral local screenshot tooling, supplied identically in both comparison arms.
import { createHash } from "node:crypto";
import { lstat, mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { basename, dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const escape = value => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
export function sheetHtml(images) {
  return `<style>body{margin:0;background:#ddd;font:12px monospace}main{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;padding:8px}figure{margin:0;background:white;padding:4px}img{width:100%;height:235px;object-fit:contain}figcaption{padding:5px;overflow-wrap:anywhere}</style><main>${images.map(({ name, bytes, mime }) => {
    if (!["image/png", "image/jpeg"].includes(mime) || !Buffer.isBuffer(bytes)) throw new Error("Only local PNG/JPEG bytes are supported");
    return `<figure><img src="data:${mime};base64,${bytes.toString("base64")}"><figcaption>${escape(name)}</figcaption></figure>`;
  }).join("")}</main>`;
}

export async function collectImages(directory) {
  let current = resolve(directory);
  while (true) {
    if ((await lstat(current)).isSymbolicLink()) throw new Error("Symlink screenshot input path is not supported");
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  const images = [];
  async function visit(prefix = "", depth = 0) {
    for (const entry of (await readdir(join(directory, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const name = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isSymbolicLink()) throw new Error(`Symlink screenshot entry is not supported: ${name}`);
      if (entry.isDirectory() && depth === 0) await visit(name, 1);
      else if (entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name)) {
        const bytes = await readFile(join(directory, name));
        images.push({ name, bytes, mime: /\.png$/i.test(entry.name) ? "image/png" : "image/jpeg", sha256: createHash("sha256").update(bytes).digest("hex") });
      }
    }
  }
  await visit();
  return images;
}

export async function renderSheets(input, output, chromium) {
  const images = await collectImages(input);
  if (!images.length) throw new Error("No original PNG/JPEG images found");
  // Refuse to replace earlier review artifacts.
  await mkdir(output);
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const files = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
    for (let offset = 0; offset < images.length; offset += 12) {
      const selected = images.slice(offset, offset + 12);
      await page.setContent(sheetHtml(selected));
      await page.locator("img").evaluateAll(nodes => Promise.all(nodes.map(node => node.decode())));
      const file = `sheet-${String(files.length + 1).padStart(3, "0")}.png`;
      await page.screenshot({ path: join(output, file), fullPage: true });
      files.push({ file, originals: selected.map(({ name, sha256 }) => ({ name, sha256 })) });
    }
    await writeFile(join(output, "manifest.json"), JSON.stringify({ schemaVersion: 1, source: basename(input), files, limitation: "Contact sheets are navigation aids, not a replacement for inspecting original screenshots or evidence of visual acceptance." }, null, 2) + "\n", { flag: "wx" });
  } finally { await browser.close(); }
  return files;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (process.argv.length !== 4) throw new Error("Usage: node scripts/review-sheets.mjs INPUT_DIRECTORY NEW_OUTPUT_DIRECTORY");
  const require = createRequire(join(process.cwd(), "package.json"));
  const { chromium } = await import(pathToFileURL(require.resolve("playwright-core")).href);
  const files = await renderSheets(resolve(process.argv[2]), resolve(process.argv[3]), chromium);
  console.log(`${files.length} contact sheets written; originals are unchanged.`);
}
