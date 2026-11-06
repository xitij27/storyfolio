#!/usr/bin/env node
/*
  Checks the person's site, the stitched story at /, as visitors meet it.
  Builds the production app and starts it on a free local port, then:
  shoots the story at every chapter's hold and move at a desktop and a phone
  size, and once on a phone with its words (scripts/stitch-check.mjs); loads
  it without JavaScript and without WebGL and looks for the person's name and
  every chapter's title; and fetches every page of the site it links to.
  Fails on a page error, a failed request, a blank picture, missing words or
  a link that does not answer.

    npm run check [-- --skip-build] [-- --out=DIR]

  Writes report.json, logs and shots under checks/site/<time>/ (or DIR).
  Open the shots: a pass here does not replace looking. CHROMIUM names a
  Chromium to start instead of playwright-core's own.
*/
import { spawn } from "node:child_process";
import { createWriteStream, mkdirSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** The stitch-check runs: the story's pictures at a desktop and a phone, and the phone again with its words. */
export function checkRuns(base, out) {
  const common = [`--url=${base}`, "--path=/"];
  return [
    { name: "desktop", args: [...common, "--size=1440x900", `--out=${join(out, "desktop")}`] },
    { name: "phone", args: [...common, "--size=390x844", `--out=${join(out, "phone")}`] },
    { name: "phone-words", args: [...common, "--size=390x844", "--words", `--out=${join(out, "phone-words")}`] },
  ];
}

/** The site's own pages among some links, each once, without fragments. */
export function localLinks(hrefs) {
  const out = [];
  for (const href of hrefs) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const path = href.split("#")[0];
    if (path && !out.includes(path)) out.push(path);
  }
  return out;
}

const flat = (s) => String(s).replace(/\s+/g, " ").trim();

/**
 * What a page's words and links leave out of what it must show without its 3D
 * (the story writes that into the page as JSON), each named; empty when
 * nothing is missing.
 */
export function missingFromPage(wanted, text, hrefs) {
  const all = flat(text), has = (s) => all.includes(flat(s));
  const out = [];
  if (!has(wanted.name)) out.push("the name");
  for (const w of wanted.words) if (!has(w)) out.push(`the words "${flat(w).slice(0, 40)}"`);
  for (const p of wanted.projects) {
    for (const part of ["title", "line", "more"]) if (p[part] && !has(p[part])) out.push(`the project "${p.title}": its ${part}`);
    if (p.page && !hrefs.includes(p.page)) out.push(`the project "${p.title}": its page link`);
  }
  if (wanted.cv && !hrefs.includes(wanted.cv)) out.push("the CV link");
  return out;
}

const ENTITIES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#x27;": "'", "&#39;": "'" };
/** A page's title, from its HTML. */
export const pageTitle = (html) => (/<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1] ?? "").replace(/&[#\w]+;/g, (e) => ENTITIES[e] ?? e).trim();

async function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const options = Object.fromEntries(process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, "").split("=");
    return [key, rest.length ? rest.join("=") : true];
  }));
  const out = resolve(root, String(options.out ?? `checks/site/${new Date().toISOString().replace(/[:.]/g, "-")}`));
  mkdirSync(out, { recursive: true });
  const require = createRequire(import.meta.url);
  const next = require.resolve("next/dist/bin/next");
  const { chromium } = require("playwright-core");
  const report = { started: new Date().toISOString(), runs: [], noJavaScript: null, noWebGL: null, links: [], problems: [] };
  const problems = report.problems;
  const children = new Set();

  const launch = (args, logName) => {
    const log = createWriteStream(join(out, logName));
    const child = spawn(process.execPath, args, { cwd: root, detached: process.platform !== "win32", env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" }, stdio: ["ignore", "pipe", "pipe"] });
    children.add(child);
    let tail = "";
    child.stdout.on("data", (c) => { log.write(c); tail = (tail + c).slice(-2000); });
    child.stderr.on("data", (c) => { log.write(c); tail = (tail + c).slice(-2000); });
    const done = new Promise((ok) => child.on("close", (code) => { children.delete(child); log.end(() => ok({ code, tail })); }));
    return { child, done };
  };
  const stop = (child) => {
    if (!child?.pid || child.exitCode !== null) return;
    try { if (process.platform === "win32") child.kill(); else process.kill(-child.pid, "SIGTERM"); } catch (error) { if (error.code !== "ESRCH") throw error; }
  };
  const freePort = async () => {
    const s = createServer();
    await new Promise((ok, fail) => { s.once("error", fail); s.listen(0, "127.0.0.1", ok); });
    const port = s.address().port;
    await new Promise((ok) => s.close(ok));
    return port;
  };
  for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => { for (const c of children) stop(c); process.exit(1); });

  let server;
  try {
    if (!options["skip-build"]) {
      console.log("Building the production app");
      const built = await launch([next, "build"], "build.log").done;
      if (built.code !== 0) throw new Error(`The build failed (${built.code}); read build.log`);
    }
    const port = await freePort();
    const base = `http://127.0.0.1:${port}`;
    server = launch([next, "start", "--hostname", "127.0.0.1", "--port", String(port)], "server.log");
    const deadline = Date.now() + 45_000;
    for (;;) {
      if (server.child.exitCode !== null) throw new Error("The server stopped before it was ready; read server.log");
      try { if ((await fetch(`${base}/`, { signal: AbortSignal.timeout(1000) })).status === 200) break; } catch { /* still starting */ }
      if (Date.now() > deadline) throw new Error("The server did not answer within 45 seconds");
      await new Promise((ok) => setTimeout(ok, 250));
    }

    for (const run of checkRuns(base, out)) {
      console.log(`Shooting the story: ${run.name}`);
      const { code, tail } = await launch([join(root, "scripts/stitch-check.mjs"), ...run.args], `stitch-${run.name}.log`).done;
      const summary = tail.trim().split("\n").pop();
      report.runs.push({ name: run.name, code, summary });
      if (code !== 0) problems.push(`${run.name}: ${summary} (read stitch-${run.name}.log)`);
    }

    const browse = async (name, launchArgs, contextOptions, ready) => {
      const browser = await chromium.launch({ ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}), args: launchArgs });
      try {
        const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, ...contextOptions })).newPage();
        const seen = [];
        page.on("pageerror", (e) => seen.push(`page error: ${e.message}`));
        page.on("response", (r) => { if (r.status() >= 400) seen.push(`HTTP ${r.status()}: ${r.url()}`); });
        await page.goto(`${base}/`, { waitUntil: "load" });
        await ready(page);
        const text = page.locator(".stitch .text");
        const box = await text.boundingBox();
        const found = { visible: Boolean(box && box.height > 40), name: await page.locator(".stitch .text h1").innerText().catch(() => ""), titles: await page.locator(".stitch .text h2").allInnerTexts() };
        const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => a.getAttribute("href")));
        const wanted = JSON.parse(await page.locator("script[data-stitch-expect]").textContent().catch(() => "null") || "null");
        const words = await text.innerText().catch(() => "");
        await page.screenshot({ path: join(out, `${name}.png`), fullPage: true });
        for (const p of seen) problems.push(`${name}: ${p}`);
        return { found, hrefs, wanted, words };
      } finally { await browser.close(); }
    };

    // What the story shows with JavaScript, to look for without it.
    const told = await (async () => {
      const browser = await chromium.launch({ ...(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {}), args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
      try {
        const page = await browser.newPage();
        await page.goto(`${base}/`, { waitUntil: "load" });
        await page.waitForFunction(() => window.__stitch?.ready || window.__stitch?.error, null, { timeout: 60000 });
        return { titles: await page.locator(".stitch .rail span").allInnerTexts() };
      } finally { await browser.close(); }
    })();
    const expect = (name, seen) => {
      const { found, wanted } = seen;
      if (!found.visible) problems.push(`${name}: the words are not shown`);
      if (!found.name.trim()) problems.push(`${name}: no name`);
      for (const t of told.titles) if (!found.titles.includes(t)) problems.push(`${name}: the chapter "${t}" is missing`);
      if (!wanted) problems.push(`${name}: the page does not say what it must show (no data-stitch-expect)`);
      else for (const m of missingFromPage(wanted, seen.words, seen.hrefs)) problems.push(`${name}: ${m} is missing`);
    };

    console.log("Loading it without JavaScript and without WebGL");
    const noJs = await browse("no-javascript", ["--no-sandbox"], { javaScriptEnabled: false }, async () => {});
    report.noJavaScript = noJs.found;
    expect("no JavaScript", noJs);
    const noGl = await browse("no-webgl", ["--no-sandbox", "--disable-3d-apis"], {}, async (page) => {
      await page.waitForSelector('.stitch[data-scene="off"]', { timeout: 30000 }).catch(() => problems.push("no WebGL: the story never gave way to its words"));
    });
    report.noWebGL = noGl.found;
    expect("no WebGL", noGl);

    // A page without a title of its own, such as the missing-page page, carries the person's name.
    const missing = await fetch(`${base}/storyfolio-check-no-such-page`);
    const missingTitle = pageTitle(await missing.text());
    report.missingPage = { status: missing.status, title: missingTitle };
    if (missing.status !== 404) problems.push(`an address that is not there answers ${missing.status}, not 404`);
    if (noJs.wanted && !missingTitle.includes(noJs.wanted.name)) problems.push(`the missing-page page is titled "${missingTitle}", without the person's name`);

    for (const path of localLinks(noJs.hrefs)) {
      const status = await fetch(`${base}${path}`).then((r) => r.status).catch(() => 0);
      report.links.push({ path, status });
      if (status !== 200) problems.push(`the link ${path} answers ${status || "nothing"}`);
    }
  } catch (error) {
    problems.push(error.message);
  } finally {
    if (server) { stop(server.child); await server.done; }
    for (const c of children) stop(c);
  }
  report.finished = new Date().toISOString();
  writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2) + "\n");
  for (const p of problems) console.error(p);
  console.log(`${problems.length ? "Failed" : "Passed"}: ${problems.length} problems. Shots and report: ${out}`);
  process.exitCode = problems.length ? 1 : 0;
}

// Run only when started as a script, so the test can import the pure parts.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
