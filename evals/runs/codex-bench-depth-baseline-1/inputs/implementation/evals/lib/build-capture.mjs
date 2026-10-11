// Coordinator-owned prototype diagnostic measurement. Never import actor
// formations, control definitions or actor-written checking code.
import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export const digest = bytes => createHash("sha256").update(bytes).digest("hex");
const hash = value => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const excludedDirectories = ["node_modules", ".next", ".git", "checks", ".cache"];
export const SOURCE_EXCLUSIONS = Object.freeze([...excludedDirectories, "*.tsbuildinfo", "next-env.d.ts (Next-generated)"]);
export const sourcePathExcluded = path => path.split("/").some(part => excludedDirectories.includes(part) || part.endsWith(".tsbuildinfo") || part === "next-env.d.ts");

export async function captureSource(root) {
  const files = [];
  async function visit(prefix = "") {
    for (const entry of (await readdir(join(root, prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (sourcePathExcluded(path)) continue;
      if (entry.isDirectory()) await visit(path);
      else if (entry.isFile()) {
        const bytes = await readFile(join(root, path));
        files.push({ path, bytes: bytes.length, sha256: digest(bytes) });
      } else throw new Error(`Unsupported source entry: ${path}`);
    }
  }
  await visit();
  return { files, digest: digest(JSON.stringify(files)), exclusions: SOURCE_EXCLUSIONS };
}

export function diagnosticPlan(expectedIds, boxes, viewport, maxScroll, mode) {
  if (!same(boxes.map(box => box.id), expectedIds)) throw new Error("Measured beat IDs/order differ from frozen expectations");
  if (!(viewport > 0) || !(maxScroll >= 0) || boxes.some(box => !Number.isFinite(box.top) || !(box.height > 0))) throw new Error("Invalid measured story geometry");
  let arrived = boxes[0].top;
  const rests = boxes.map(box => {
    const start = mode === "animated" ? arrived : box.top;
    const end = Math.max(start, box.top + box.height - viewport);
    arrived = end + viewport * 0.4;
    return { beat: box.id, start: Math.max(0, Math.min(maxScroll, start)), end: Math.max(0, Math.min(maxScroll, end)) };
  });
  const forward = rests.slice(0, -1).map((rest, index) => ({ from: rest.beat, to: rests[index + 1].beat, start: rest.end, end: rests[index + 1].start, direction: "forward" }));
  if (mode === "animated" && forward.some(interval => interval.end <= interval.start)) throw new Error("Measured geometry has no positive travel interval");
  return { rests, intervals: [...forward, ...forward.toReversed().map(interval => ({ from: interval.to, to: interval.from, start: interval.end, end: interval.start, direction: "reverse" }))] };
}

export function assessControl(control) {
  const problems = [];
  if (!control.name?.trim()) problems.push("control has no accessible name");
  if (!Array.isArray(control.trials) || !["pointer", "keyboard"].every(method => control.trials.some(trial => trial.method === method))) problems.push(`${control.key}: missing pointer or keyboard trial`);
  for (const trial of control.trials ?? []) {
    const label = `${control.key}/${trial.method}`;
    if (!trial.activated || !trial.reached || !trial.hitTarget) problems.push(`${label}: control was not reached and activated`);
    if (trial.error) problems.push(`${label}: ${trial.error}`);
    if (!hash(trial.beforeImage) || !hash(trial.afterImage)) problems.push(`${label}: missing original control images`);
    if (trial.targets?.some(target => !target.exists)) problems.push(`${label}: missing declared control target`);
    const visualTarget = trial.targets?.some(target => target.requiresVisualReview);
    if (trial.targets?.length && !trial.targets.some(target => target.changed) && !visualTarget) problems.push(`${label}: declared control targets did not respond`);
    if (!trial.changed && !visualTarget) problems.push(`${label}: no observable control response (requires review, not a functional pass)`);
    if (visualTarget && trial.responseStatus !== "unobserved") problems.push(`${label}: canvas response must remain unobserved pending visual review`);
  }
  return problems;
}

export function assessDiagnosticCapture(expected, entry, report) {
  const problems = [];
  const ids = expected.beats.map(beat => beat.id);
  const rests = report.rests ?? [];
  if (!same(rests.map(rest => rest.beat), ids)) problems.push("missing or reordered diagnostic rest captures");
  for (const rest of rests) if (!hash(rest.sha256) || !rest.file || Math.abs(rest.actualScroll - rest.requestedScroll) > 2) problems.push(`${rest.beat}: missing image or inaccurate rest position`);
  if (entry.loseContext && (!report.contextLoss?.supported || !rests.every(rest => rest.afterContextLoss && rest.scene === "off"))) problems.push("all five post-context-loss captures are required");
  if (entry.reducedMotion) {
    if (!same((report.stationary ?? []).map(pair => pair.beat), ids)) problems.push("reduced-motion stillness was not captured at every beat");
    for (const pair of report.stationary ?? []) if (!hash(pair.before) || !hash(pair.after) || pair.before !== pair.after || !(pair.elapsedMs >= 400)) problems.push(`${pair.beat}: missing or changed reduced-motion stillness evidence`);
  }
  if (["desktop", "mobile", "short"].includes(entry.id)) {
    const wanted = [...ids.slice(0, -1).map((from, index) => ["forward", from, ids[index + 1]]), ...ids.slice(1).toReversed().map((from, index) => ["reverse", from, ids[ids.length - 2 - index]])];
    const motion = report.motion ?? [];
    if (!same(motion.map(interval => [interval.direction, interval.from, interval.to]), wanted)) problems.push("missing or reordered forward/reverse travel intervals");
    for (const interval of motion) {
      const label = `${interval.direction}/${interval.from}/${interval.to}`;
      const sign = interval.direction === "forward" ? 1 : -1;
      if (sign * (interval.end - interval.start) <= 0) problems.push(`${label}: travel direction is reversed or absent`);
      const frames = interval.frames ?? [];
      if (frames.length !== 3 || !same(frames.map(frame => frame.fraction), [0.2, 0.5, 0.8])) problems.push(`${label}: missing continuous motion samples`);
      if (!(interval.trajectory?.length >= 3) || !interval.completed) problems.push(`${label}: no completed requestAnimationFrame trajectory`);
      for (const [index, frame] of frames.entries()) {
        if (!hash(frame.sha256) || !frame.file || !frame.moving || !frame.after?.moving || ![frame.actualScroll, frame.after?.scroll].every(scroll => scroll > Math.min(interval.start, interval.end) && scroll < Math.max(interval.start, interval.end))) problems.push(`${label}: frame ${index} was not captured during travel`);
        if (index && sign * (frame.actualScroll - frames[index - 1].actualScroll) <= 0) problems.push(`${label}: frames do not move in the requested direction`);
      }
    }
  }
  if (!report.controlInventoryComplete) problems.push("interactive control inventory is incomplete");
  const inventoried = (report.controlInventory ?? []).map(control => control.key);
  const exercised = (report.controls ?? []).map(control => control.key);
  if (!Array.isArray(report.controlInventory) || new Set(inventoried).size !== inventoried.length || new Set(exercised).size !== exercised.length || !same([...inventoried].sort(), [...exercised].sort())) problems.push("control trials do not cover the complete unique inventory");
  for (const control of report.controls ?? []) problems.push(...assessControl(control));
  return [...new Set(problems)];
}

export async function captureTravel(page, interval, screenshot) {
  await page.evaluate(start => scrollTo({ top: start, behavior: "instant" }), interval.start);
  await page.waitForTimeout(300);
  await page.evaluate(({ start, end }) => {
    const state = { moving: true, completed: false, trajectory: [], progress: 0 };
    window.__storyfolioDiagnosticTravel = state;
    const began = performance.now();
    const tick = now => {
      state.progress = Math.min(1, (now - began) / 6000);
      scrollTo({ top: start + (end - start) * state.progress, behavior: "instant" });
      state.trajectory.push({ time: now, scroll: scrollY });
      if (state.progress < 1) requestAnimationFrame(tick);
      else { state.moving = false; state.completed = true; }
    };
    requestAnimationFrame(tick);
  }, interval);
  const frames = [];
  for (const fraction of [0.2, 0.5, 0.8]) {
    await page.waitForFunction(value => window.__storyfolioDiagnosticTravel.progress >= value, fraction);
    const observation = await page.evaluate(() => ({ actualScroll: scrollY, moving: window.__storyfolioDiagnosticTravel.moving, progress: window.__storyfolioDiagnosticTravel.progress, time: performance.now() }));
    const image = await screenshot(`travel-${interval.direction}-${interval.from}-${interval.to}-${fraction}`, { type: "jpeg", quality: 85 });
    const after = await page.evaluate(() => ({ scroll: scrollY, time: performance.now(), moving: window.__storyfolioDiagnosticTravel.moving }));
    frames.push({ fraction, ...observation, after, ...image });
  }
  await page.waitForFunction(() => window.__storyfolioDiagnosticTravel.completed);
  const state = await page.evaluate(() => window.__storyfolioDiagnosticTravel);
  return { ...interval, frames, completed: state.completed, trajectory: state.trajectory };
}

const controlSelector = 'button,[role=button],input:not([type=hidden]),select,textarea,[role=slider],[role=tab],summary,a[href^="#"]';
export const controlKey = control => `control-${digest(JSON.stringify([control.selector, control.tag, control.type, control.role, control.name, control.href, control.targetIds, control.beat])).slice(0, 16)}`;

// Inventory all visible controls, not named controls copied from a reference
// design. Explicit target semantics are verified when the page declares them.
export async function inventoryControls(page) {
  const controls = await page.locator(controlSelector).evaluateAll(nodes => nodes.map((node, index) => ({
    index, tag: node.tagName.toLowerCase(), type: node.getAttribute("type"), role: node.getAttribute("role"), href: node.getAttribute("href"), targetIds: node.getAttribute("aria-controls"), beat: node.closest("[data-beat]")?.getAttribute("data-beat") ?? null,
    selector: (() => { const path = []; for (let current = node; current && current !== document.documentElement; current = current.parentElement) { if (current.id) { path.unshift(`#${CSS.escape(current.id)}`); break; } const peers = [...current.parentElement.children].filter(peer => peer.tagName === current.tagName); path.unshift(`${current.tagName.toLowerCase()}:nth-of-type(${peers.indexOf(current) + 1})`); } return path.join(" > "); })(),
    name: node.getAttribute("aria-label") || (node.getAttribute("aria-labelledby") ?? "").split(/\s+/).map(id => document.getElementById(id)?.textContent ?? "").join(" ").trim() || node.labels?.[0]?.textContent || node.textContent || node.getAttribute("placeholder") || "",
    visible: node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }), disabled: node.disabled || node.getAttribute("aria-disabled") === "true",
  })).filter(node => node.visible && !node.disabled));
  return controls.map(control => ({ ...control, key: controlKey(control) }));
}

export async function exerciseControl(page, control, screenshot, reset) {
  const result = { ...control, trials: [] };
  for (const method of ["pointer", "keyboard"]) {
    const trial = { method, activated: false, reached: false, hitTarget: false, targets: [] };
    try {
      if (reset) { await reset(); trial.reset = "fresh document with the same browser condition"; }
      if (Number.isFinite(control.observedScroll)) { await page.evaluate(top => scrollTo({ top, behavior: "instant" }), control.observedScroll); await page.waitForTimeout(1800); }
      const target = page.locator(control.selector);
      if (await target.count() !== 1) throw new Error("recorded control identity no longer resolves uniquely");
      await target.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1800);
      if (!(await inventoryControls(page)).some(actual => actual.key === control.key)) throw new Error("recorded control identity changed after reset or scroll");
      // A selected tab/radio is intentionally idempotent. Select a declared
      // peer first when possible, then measure the target's actual response.
      const peer = await target.evaluate(node => {
        const active = node.getAttribute("aria-pressed") === "true" || node.getAttribute("aria-selected") === "true" || (node.type === "radio" && node.checked);
        if (!active) return null;
        const nodes = [...document.querySelectorAll('button,[role=button],input:not([type=hidden]),select,textarea,[role=slider],[role=tab],summary,a[href^="#"]')];
        return nodes.findIndex(other => other !== node && other.parentElement === node.parentElement && !other.disabled && ((node.type === "radio" && other.type === "radio" && node.name && other.name === node.name) || (node.getAttribute("aria-controls") && other.getAttribute("aria-controls") === node.getAttribute("aria-controls") && ((node.hasAttribute("aria-pressed") && other.hasAttribute("aria-pressed")) || (node.getAttribute("role") === "tab" && other.getAttribute("role") === "tab")))));
      });
      if (peer !== null && peer >= 0) { await page.locator(controlSelector).nth(peer).click(); await page.waitForTimeout(400); trial.peerPreparation = peer; }
      const inspect = () => target.evaluate(node => ({
        html: node.outerHTML, value: node.value, checked: node.checked,
        location: location.href, scroll: scrollY,
        state: { pressed: node.getAttribute("aria-pressed"), selected: node.getAttribute("aria-selected"), expanded: node.getAttribute("aria-expanded"), checked: node.getAttribute("aria-checked"), open: node.closest("details")?.open },
        targets: (node.tagName === "A" ? [decodeURIComponent((node.getAttribute("href") ?? "").slice(1))] : (node.getAttribute("aria-controls") ?? "").split(/\s+/).filter(Boolean)).map(id => { const target = id ? document.getElementById(id) : document.documentElement; const box = target?.getBoundingClientRect(); return { id, exists: !!target, html: target?.outerHTML ?? null, containsCanvas: !!target && (target.matches("canvas") || !!target.querySelector("canvas")), inView: !!box && box.top < innerHeight && box.bottom > 0 }; }),
        hitTarget: (() => { const box = node.getBoundingClientRect(); const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2); return hit === node || node.contains(hit); })(),
      }));
      if (method === "keyboard") {
        // Reach by actual sequential keyboard navigation, not element.focus().
        await page.evaluate(() => { document.activeElement?.blur(); document.body.tabIndex = -1; document.body.focus(); });
        for (let count = 0; count < 200; count++) {
          await page.keyboard.press("Tab");
          if (await target.evaluate(node => document.activeElement === node)) { trial.reached = true; break; }
        }
        if (!trial.reached) throw new Error("control cannot be reached by Tab");
      } else { trial.reached = true; await target.hover(); }
      const before = await inspect();
      trial.hitTarget = before.hitTarget;
      trial.beforeImage = (await screenshot(`${control.key}-${method}-before`)).sha256;
      if (["button", "summary", "a"].includes(control.tag) || ["button", "tab"].includes(control.role) || (control.tag === "input" && ["button", "submit", "reset", "checkbox", "radio"].includes(control.type))) {
        if (method === "pointer") await target.click();
        else await page.keyboard.press(["checkbox", "radio"].includes(control.type) ? "Space" : "Enter");
      } else if (control.tag === "select") {
        if (method === "pointer") await target.click();
        await page.keyboard.press("ArrowDown"); await page.keyboard.press("Enter");
      } else if (control.type === "range" || control.role === "slider") {
        if (method === "pointer") { const box = await target.boundingBox(); await page.mouse.click(box.x + box.width * 0.75, box.y + box.height / 2); }
        else await page.keyboard.press("ArrowRight");
      } else if (control.tag === "textarea" || (control.tag === "input" && [null, "text", "search", "email", "url", "tel", "number"].includes(control.type))) {
        if (method === "pointer") await target.click();
        await page.keyboard.type(control.type === "number" ? "1" : "diagnostic");
      } else throw new Error(`unsupported interactive control: ${control.tag}/${control.type}/${control.role}`);
      trial.activated = true;
      await page.waitForTimeout(400);
      const after = await inspect();
      trial.afterImage = (await screenshot(`${control.key}-${method}-after`)).sha256;
      trial.targets = before.targets.map((target, index) => ({ id: target.id, exists: target.exists && after.targets[index]?.exists, requiresVisualReview: control.tag !== "a" && target.containsCanvas, changed: control.tag === "a" ? after.targets[index]?.inView && (before.location !== after.location || before.scroll !== after.scroll) : target.html !== after.targets[index]?.html }));
      trial.changed = !same(before.state, after.state) || before.value !== after.value || before.checked !== after.checked || trial.targets.some(target => target.changed);
      trial.responseStatus = trial.targets.some(target => target.requiresVisualReview) ? "unobserved" : trial.changed ? "observed DOM/state response" : "no observed DOM/state response";
      trial.pixelsChanged = trial.beforeImage !== trial.afterImage;
      trial.pixelMeaning = "unobserved: hover, focus and unrelated animation can change screenshots";
      trial.before = before; trial.after = after;
    } catch (error) { trial.error = error.message; }
    result.trials.push(trial);
  }
  return result;
}
