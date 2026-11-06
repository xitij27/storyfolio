#!/usr/bin/env node
/*
  Renders a page of the locally running site in headless Chromium, saves
  screenshots, and checks a few facts about it. A local tool for looking at
  visual work; nothing in the build depends on it.

  Install the engine's pinned development dependencies and Chromium with
  npm ci and npm run browsers. PLAYWRIGHT_CORE optionally overrides the
  engine's own playwright-core install:

    PLAYWRIGHT_CORE=/home/me/.npm/_npx/<hash>/node_modules/playwright-core \
      node scripts/shoot.mjs --url=http://localhost:3000/ --out=/tmp/home --beats

  Options
    --url=URL              page to open (required)
    --out=DIR              where the screenshots go (required)
    --size=WxH             viewport, default 1440x900
    --scale=N              device pixel ratio, default 1
    --beats                one screenshot per [data-beat] block, taken at the
                           end of that beat's rest
    --reduced-motion       emulate prefers-reduced-motion
    --touch                emulate a touch device, whose pointer is coarse:
                           the scene then takes its lighter path
    --no-webgl             start Chromium with 3D disabled
    --no-js                load the page with JavaScript switched off
    --ignore=REGEX         failed requests to overlook; default: none
    --expect-beats=N       fail unless the page has N [data-beat] blocks
    --expect-scene=on|off  fail unless .story has that data-scene value
    --expect-selector=CSS  fail unless something matches the selector
    --hidden=CSS           fail if anything matching the selector is displayed
    --at=X,Y               without --beats: a point on the screen, in percent
    --expect-at=CSS        with --at: fail unless what is under that point
                           matches the selector, which is how a drag on the
                           scene is checked to reach what should take it
    --block=REGEX          fail requests whose address matches, as if they
                           never arrived; they are left out of the failed-
                           request check
    --inside=CSS           with --beats: fail if anything matching the selector
                           is showing but runs off the side of the screen
    --scroll=PX            without --beats: scroll this far down before the
                           click and the screenshot
    --wait=MS              how long to let the page settle after each scroll,
                           default 2200. A jump straight to a later chapter
                           needs longer: what that chapter loads on demand
                           arrives slowly when the 3D is drawn in software
    --click=CSS            without --beats: click the first match, then fail
                           if what was being read has moved on the screen,
                           which is how switching the look is checked to keep
                           the reader's place
    --late-shaders=CHARS   fail if a shader program longer than this many
                           characters is built after the page has first
                           settled. three.js builds a program the first time
                           something is drawn with it and the page stops
                           until it is built, so the large ones should all
                           be asked for at the start
    --positions=LIST      with --beats: start,mid,end; default end
    --expect-ids=LIST      comma-separated beat IDs, in their expected order
    --expect-look=ID       fail unless the root has this data-look value
    --assert-still=MS      compare canvas screenshots after this interval
    --lose-context        lose the WebGL context and require text fallback
    --keyboard=CSS        tab to this selector and require a visible focus box
    --keyboard-at=BEAT    first scroll to this beat for the keyboard probe
    --block-late-chunks    after the opening settles, abort later JS chunks;
                           require at least one blocked chunk and a live scene
    --look-cycle=IDs       click the second look, then exercise browser Back;
                           preserve position, hash and unrelated parameters
    --report=FILE         also write the JSON report to this path

  It always fails on a page error, a console error, a failed request, more
  or fewer than one h1, duplicate ids, or a page that scrolls sideways.
  Console warnings are recorded but do not fail the run.
*/
import { mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import path from "node:path";
import { beatRestSamples, expectedRequestReason, optionalPattern, requestProblem } from "./check-lib.mjs";

const options = {};
for (const arg of process.argv.slice(2)) {
  const body = arg.replace(/^--/, "");
  const cut = body.indexOf("=");
  if (cut === -1) options[body] = true;
  else options[body.slice(0, cut)] = body.slice(cut + 1);
}

function usage(message) {
  console.error(`${message}\nSee the comment at the top of scripts/shoot.mjs.`);
  process.exit(2);
}

if (!options.url || !options.out) usage("--url and --out are required.");
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_CORE || "playwright-core");
const [width, height] = String(options.size ?? "1440x900").split("x").map(Number);
if (![width, height].every(n => Number.isFinite(n) && n > 0)) usage("--size must be positive WxH");
const ignore = optionalPattern(options.ignore);
const settle = Number(options.wait ?? 2200);
const positions = String(options.positions ?? "end").split(",");
if (!positions.every(value => ["start", "mid", "end"].includes(value))) usage("--positions must contain start,mid,end");
const out = path.resolve(String(options.out));
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  args: options["no-webgl"]
    ? ["--no-sandbox", "--disable-3d-apis"]
    : [
        "--no-sandbox",
        "--use-angle=swiftshader",
        "--enable-unsafe-swiftshader",
        "--ignore-gpu-blocklist",
      ],
});
const context = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: Number(options.scale ?? 1),
  reducedMotion: options["reduced-motion"] ? "reduce" : "no-preference",
  ...(options.touch ? { hasTouch: true, isMobile: true } : {}),
  javaScriptEnabled: !options["no-js"],
});
if (options["late-shaders"]) {
  // Note every shader program as it is linked: how long its longer shader
  // is, when, and the switches that tell one variant from another.
  await context.addInitScript(() => {
    const built = (window.__shaders = []);
    const sources = new WeakMap();
    const attached = new WeakMap();
    for (const proto of [window.WebGL2RenderingContext?.prototype, window.WebGLRenderingContext?.prototype].filter(Boolean)) {
      const { shaderSource, attachShader, linkProgram } = proto;
      proto.shaderSource = function (shader, source) {
        sources.set(shader, source);
        return shaderSource.call(this, shader, source);
      };
      proto.attachShader = function (program, shader) {
        attached.set(program, [...(attached.get(program) ?? []), shader]);
        return attachShader.call(this, program, shader);
      };
      proto.linkProgram = function (program) {
        const texts = (attached.get(program) ?? []).map((shader) => sources.get(shader) ?? "");
        const longest = texts.reduce((a, b) => (b.length > a.length ? b : a), "");
        const switches = longest.matchAll(/^#define ((?:USE|DOUBLE|FLIP|TONE|OPAQUE)\w*)/gm);
        built.push({
          size: longest.length,
          at: performance.now(),
          what: [...switches].map((match) => match[1]).join(" "),
        });
        return linkProgram.call(this, program);
      };
    }
  });
}

const page = await context.newPage();
const block = optionalPattern(options.block);
const lateChunks = /\/_next\/static\/chunks\/.*\.js(?:\?|$)/;
let lateBlocking = false;
const blocked = { test: url => Boolean(block?.test(url) || (lateBlocking && lateChunks.test(url))) };
if (block) {
  await page.route(block, (route) => route.abort());
}
const problems = [];
const warnings = [];
const requests = [];
const expectedErrors = [];
const expectedChunkError = text => lateBlocking && /(?:load(?:ing)? chunk|ChunkLoadError)/i.test(text);
page.on("pageerror", (error) => {
  if (expectedChunkError(String(error))) { expectedErrors.push(String(error).slice(0, 300)); return; }
  problems.push(`page error: ${String(error).slice(0, 300)}`);
});
page.on("console", (message) => {
  if (message.type() === "warning") {
    warnings.push(message.text().slice(0, 300));
  }
  // A failed request also logs a console error with no address in it. The
  // response listener below reports those, with the address.
  if (message.type() !== "error") return;
  if (message.text().startsWith("Failed to load resource")) return;
  if (expectedChunkError(message.text())) { expectedErrors.push(message.text().slice(0, 300)); return; }
  problems.push(`console error: ${message.text().slice(0, 300)}`);
});
page.on("response", (response) => {
  const problem = requestProblem({ url: response.url(), status: response.status() }, { block: blocked, ignore });
  if (problem) problems.push(problem);
});
page.on("requestfailed", request => {
  const record = { url: request.url(), resourceType: request.resourceType(), failure: request.failure()?.errorText ?? "unknown" };
  const exceptions = { block: blocked, ignore, noJavaScript: Boolean(options["no-js"]), pageUrl: String(options.url) };
  record.reason = expectedRequestReason(record, exceptions);
  record.expected = record.reason !== null;
  requests.push(record);
  const problem = requestProblem(record, exceptions);
  if (problem) problems.push(problem);
});

await page.goto(String(options.url), { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
const settledAt = await page.evaluate(() => performance.now()).catch(() => 0);
if (options["block-late-chunks"]) {
  lateBlocking = true;
  await page.route(lateChunks, route => route.abort());
}

const shots = [];
const scroll = { before: null, after: null };
const under = { what: null };
const motion = [];
const samples = [];
const keyboard = { reached: false };
if (options.beats) {
  const count = await page.locator("[data-beat]").count();
  for (let i = 0; i < count; i++) {
    for (const position of positions) {
    const geometry = await page.evaluate(() => {
      const root = document.querySelector(".story");
      const origin = root.getBoundingClientRect().top;
      return { origin: scrollY + origin, viewport: innerHeight, boxes: [...root.querySelectorAll("[data-beat]")].map(block => {
        const rect = block.getBoundingClientRect();
        return { id: block.getAttribute("data-beat"), top: rect.top - origin, height: rect.height };
      }) };
    });
    const target = beatRestSamples(geometry.boxes, geometry.viewport, [position])[i][0];
    const id = geometry.boxes[i].id;
    await page.evaluate(top => {
      window.scrollTo({
        top,
        behavior: "instant",
      });
    }, geometry.origin + target.top);
    await page.waitForTimeout(settle);
    samples.push({ beat: id, position, requestedScroll: geometry.origin + target.top, actualScroll: await page.evaluate(() => scrollY) });
    if (options.inside) {
      const cut = await page.evaluate((inside) => {
        return [...document.querySelectorAll(inside)].filter((node) => {
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          const showing = !["hidden", "collapse"].includes(style.visibility) && style.display !== "none" && Number(style.opacity) > 0.5 && rect.width > 0 && rect.height > 0;
          return showing && (rect.left < 0 || rect.right > window.innerWidth);
        }).length;
      }, String(options.inside));
      if (cut > 0) problems.push(`${id}: ${cut} of ${options.inside} run off the screen`);
    }
    const safeId = String(id).replace(/[^a-zA-Z0-9._-]/g, "_");
    const file = path.join(out, `${String(i).padStart(2, "0")}-${safeId}${positions.length > 1 ? `-${position}` : ""}.png`);
    await page.screenshot({ path: file, timeout: 90_000 });
    shots.push(file);
    if (options["assert-still"]) {
      const canvas = page.locator("canvas").first();
      if (await canvas.count()) {
        const before = await canvas.screenshot({ timeout: 90_000 });
        await page.waitForTimeout(Number(options["assert-still"]));
        const after = await canvas.screenshot({ timeout: 90_000 });
        const hash = bytes => createHash("sha256").update(bytes).digest("hex");
        const record = { beat: id, position, before: hash(before), after: hash(after) };
        motion.push(record);
        if (record.before !== record.after) problems.push(`${id}: scene moved during a stationary reduced-motion sample`);
      } else problems.push(`${id}: no canvas for temporal check`);
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (overflow) problems.push(`${id} (${position}): the page scrolls sideways`);
    }
  }
} else {
  if (options.scroll) {
    await page.evaluate((top) => {
      window.scrollTo({ top: Number(top), behavior: "instant" });
    }, options.scroll);
    await page.waitForTimeout(settle);
  }
  if (options.at) {
    const [x, y] = String(options.at).split(",").map(Number);
    under.what = await page.evaluate(
      ([px, py, expected]) => {
        const node = document.elementFromPoint(
          (window.innerWidth * px) / 100,
          (window.innerHeight * py) / 100,
        );
        if (!node) return { name: "nothing", matches: false };
        const name = `${node.tagName.toLowerCase()}.${[...node.classList].slice(0, 2).join(".")}`;
        return { name, matches: expected ? node.matches(expected) : true };
      },
      [x, y, options["expect-at"] ? String(options["expect-at"]) : null],
    );
    if (!under.what.matches) {
      problems.push(
        `under ${options.at} is ${under.what.name}, not ${options["expect-at"]}`,
      );
    }
  }
  if (options.click) {
    // Where the block being read sits on the screen. Not the scroll offset:
    // the site header changes height as the page scrolls, and the browser
    // then adjusts the offset to keep the content where it was.
    const reading = () =>
      page.evaluate(() => {
        const middle = window.innerHeight / 2;
        const block = [...document.querySelectorAll("[data-beat]")].find((node) => {
          const rect = node.getBoundingClientRect();
          return rect.top <= middle && rect.bottom >= middle;
        });
        return block ? Math.round(block.getBoundingClientRect().top) : window.scrollY;
      });
    scroll.before = await reading();
    await page.locator(String(options.click)).first().click();
    await page.waitForTimeout(1500);
    scroll.after = await reading();
    if (Math.abs(scroll.after - scroll.before) > 2) {
      problems.push(`clicking ${options.click} moved what was being read`);
    }
  }
  const file = path.join(out, "top.png");
  await page.screenshot({ path: file, timeout: 90_000 });
  shots.push(file);
}

let lookCycle = null;
if (options["look-cycle"]) {
  const [initialLook, nextLook] = String(options["look-cycle"]).split(",");
  const observe = () => page.evaluate(() => {
    const url = new URL(location.href);
    const middle = innerHeight / 2;
    const block = [...document.querySelectorAll("[data-beat]")].find(node => {
      const rect = node.getBoundingClientRect();
      return rect.top <= middle && rect.bottom >= middle;
    });
    const parameters = [...url.searchParams.entries()].filter(([key]) => key !== "look");
    return { look: document.querySelector(".story").getAttribute("data-look"), url: url.href, hash: url.hash, parameters, scroll: scrollY, beat: block?.getAttribute("data-beat"), top: block ? block.getBoundingClientRect().top : scrollY };
  });
  // A same-document entry makes Back test popstate without visiting an
  // unrelated page. Look selection itself is allowed to replace history.
  await page.evaluate(() => {
    const url = new URL(location.href);
    url.searchParams.set("story-check-preserve", "yes");
    url.hash = "story-check-preserve";
    history.replaceState(history.state, "", url);
    history.pushState(history.state, "", url);
  });
  lookCycle = { before: await observe() };
  if (lookCycle.before.look !== initialLook) problems.push(`look switch starts on ${lookCycle.before.look}, expected ${initialLook}`);
  await page.locator('.story-look-switch button[aria-pressed="false"]').first().click();
  await page.waitForTimeout(settle);
  lookCycle.changed = await observe();
  if (lookCycle.changed.look !== nextLook) problems.push(`look switch chose ${lookCycle.changed.look}, expected ${nextLook}`);
  const file = path.join(out, "look-changed.png");
  await page.screenshot({ path: file, timeout: 90_000 });
  shots.push(file);
  await page.goBack({ waitUntil: "domcontentloaded", timeout: 15_000 });
  await page.waitForTimeout(settle);
  lookCycle.back = await observe();
  if (lookCycle.back.look !== initialLook) problems.push(`browser Back restored ${lookCycle.back.look}, expected ${initialLook}`);
  for (const [label, result] of [["look switch", lookCycle.changed], ["browser Back", lookCycle.back]]) {
    if (result.hash !== lookCycle.before.hash || JSON.stringify(result.parameters) !== JSON.stringify(lookCycle.before.parameters)) problems.push(`${label} changed the hash or unrelated query parameters`);
    if (result.beat !== lookCycle.before.beat || Math.abs(result.top - lookCycle.before.top) > 2 || Math.abs(result.scroll - lookCycle.before.scroll) > 2) problems.push(`${label} moved the reader's position`);
  }
  const backFile = path.join(out, "look-back.png");
  await page.screenshot({ path: backFile, timeout: 90_000 });
  shots.push(backFile);
}

if (options.keyboard) {
  if (options["keyboard-at"]) {
    const found = await page.evaluate(id => {
      const node = [...document.querySelectorAll("[data-beat]")].find(node => node.getAttribute("data-beat") === id);
      if (!node) return false;
      window.scrollTo({ top: scrollY + node.getBoundingClientRect().bottom - innerHeight, behavior: "instant" });
      return true;
    }, String(options["keyboard-at"]));
    if (!found) problems.push(`keyboard probe beat ${options["keyboard-at"]} is missing`);
    await page.waitForTimeout(settle);
  }
  const initial = await page.evaluate(selector => {
    const node = document.querySelector(selector);
    if (!node) return null;
    const box = node.getBoundingClientRect();
    return { visible: node.checkVisibility() && box.width > 0 && box.height > 0, tabIndex: node.tabIndex };
  }, String(options.keyboard));
  keyboard.initial = initial;
  if (!initial?.visible || initial.tabIndex < 0) problems.push(`overlay ${options.keyboard} is not visible and focusable at its beat`);
  // Start at the document's last preceding focusable control, without
  // moving the scroll away from the overlay's own beat.
  await page.evaluate(selector => {
    const target = document.querySelector(selector);
    const nodes = [...document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]')].filter(node => node.tabIndex >= 0 && node.checkVisibility());
    const previous = nodes[nodes.indexOf(target) - 1];
    if (previous) previous.focus({ preventScroll: true });
  }, String(options.keyboard));
  for (let attempt = 0; attempt < 80; attempt++) {
    await page.keyboard.press("Tab");
    const reached = await page.evaluate(selector => {
      const node = document.activeElement;
      if (!node?.matches(selector)) return null;
      const box = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      return { visible: node.checkVisibility() && box.width > 0 && box.height > 0, inView: box.top >= 0 && box.bottom <= innerHeight, tag: node.tagName, href: node.getAttribute("href"), outline: style.outlineStyle, outlineWidth: style.outlineWidth };
    }, String(options.keyboard));
    if (reached) { Object.assign(keyboard, { reached: true }, reached); break; }
  }
  if (!keyboard.reached || !keyboard.visible || !keyboard.inView) problems.push(`keyboard cannot reach visible ${options.keyboard}`);
  else if (keyboard.outline === "none" || Number.parseFloat(keyboard.outlineWidth) === 0) problems.push(`${options.keyboard} has no visible keyboard focus outline`);
  const file = path.join(out, "keyboard.png");
  await page.screenshot({ path: file, timeout: 90_000 });
  shots.push(file);
}

let contextLoss = null;
if (options["lose-context"]) {
  contextLoss = await page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    const context = canvas?.getContext("webgl2") || canvas?.getContext("webgl");
    const extension = context?.getExtension("WEBGL_lose_context");
    if (!extension) return { supported: false };
    extension.loseContext();
    return { supported: true };
  });
  await page.waitForTimeout(settle);
  contextLoss.scene = await page.locator(".story").getAttribute("data-scene");
  if (!contextLoss.supported || contextLoss.scene !== "off") problems.push("WebGL context loss did not leave the scene-off fallback");
  const file = path.join(out, "context-lost.png");
  await page.screenshot({ path: file, timeout: 90_000 });
  shots.push(file);
}

const selector = options["expect-selector"] ? String(options["expect-selector"]) : null;
const hidden = options.hidden ? String(options.hidden) : null;
const facts = await page.evaluate(([expected, unwanted]) => {
  const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
  const root = document.documentElement;
  return {
    h1: document.querySelectorAll("h1").length,
    beats: document.querySelectorAll("[data-beat]").length,
    beatIds: [...document.querySelectorAll("[data-beat]")].map(node => node.getAttribute("data-beat")),
    scene: document.querySelector(".story")?.getAttribute("data-scene") ?? null,
    look: document.querySelector(".story")?.getAttribute("data-look") ?? null,
    canvases: document.querySelectorAll("canvas").length,
    overflowX: root.scrollWidth > root.clientWidth,
    duplicateIds: [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))],
    pageHeight: root.scrollHeight,
    lang: root.lang,
    selectorFound: expected ? document.querySelector(expected) !== null : null,
    displayed: unwanted
      ? [...document.querySelectorAll(unwanted)].filter((node) => node.checkVisibility())
          .length
      : 0,
    shaders: window.__shaders ?? null,
  };
}, [selector, hidden]);
await browser.close();

const { shaders, ...rest } = facts;
const large = (shaders ?? []).filter((shader) => shader.size > Number(options["late-shaders"]));
const late = large.filter((shader) => shader.at > settledAt);
if (late.length > 0) {
  problems.push(`${late.length} large shader programs were built after the page had settled`);
}

if (facts.h1 !== 1) problems.push(`expected one h1, found ${facts.h1}`);
if (facts.overflowX) problems.push("the page scrolls sideways");
if (facts.duplicateIds.length > 0) {
  problems.push(`duplicate ids: ${facts.duplicateIds.join(", ")}`);
}
if (options["expect-beats"] && facts.beats !== Number(options["expect-beats"])) {
  problems.push(`expected ${options["expect-beats"]} beats, found ${facts.beats}`);
}
if (options["expect-scene"] && facts.scene !== options["expect-scene"]) {
  problems.push(`expected data-scene="${options["expect-scene"]}", found "${facts.scene}"`);
}
if (options["expect-ids"] && JSON.stringify(facts.beatIds) !== JSON.stringify(String(options["expect-ids"]).split(","))) problems.push("rendered beat IDs differ from the story contract");
if (options["expect-look"] && facts.look !== options["expect-look"]) problems.push(`expected look ${options["expect-look"]}, found ${facts.look}`);
if (options["no-js"] && facts.canvases !== 0) problems.push(`expected no canvas without JavaScript, found ${facts.canvases}`);
if (options["block-late-chunks"] && (!requests.some(request => request.expected && lateChunks.test(request.url)) || facts.scene !== "on")) problems.push("lazy-extra failure was not exercised while retaining the main scene");
if (selector && !facts.selectorFound) {
  problems.push(`nothing matches ${selector}`);
}
if (facts.displayed > 0) {
  problems.push(`${facts.displayed} of ${hidden} are displayed`);
}

const report = {
      ...rest,
      ...(shaders
        ? {
            shaders: {
              built: shaders.length,
              largeAtStart: large.length - late.length,
              largeLater: late.map((shader) => `${shader.size}: ${shader.what}`),
            },
          }
        : {}),
      ...(options.click ? { readingBefore: scroll.before, readingAfter: scroll.after } : {}),
      ...(under.what ? { under: under.what.name } : {}),
      shots,
      samples,
      ...(lookCycle ? { lookCycle } : {}),
      requests,
      ...(expectedErrors.length ? { expectedErrors: [...new Set(expectedErrors)] } : {}),
      ...(motion.length ? { motion } : {}),
      ...(options.keyboard ? { keyboard } : {}),
      ...(contextLoss ? { contextLoss } : {}),
      warnings: [...new Set(warnings)],
      problems,
    };
const json = JSON.stringify(report, null, 2) + "\n";
if (options.report) {
  mkdirSync(path.dirname(path.resolve(String(options.report))), { recursive: true });
  writeFileSync(String(options.report), json);
}
console.log(json);
process.exit(problems.length > 0 ? 1 : 0);
