// Recovered stop-2 derivative: app cwd, declared chooser source-route activation,
// import paths and explicit lineage differ. Original criteria and trials remain.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, readFile, readdir, realpath, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { captureSource } from "../../../../lib/build-capture.mjs";
import { outsideWorkspace, verifyNextRuntime, requestFailureReason } from "../../../../lib/build-check.mjs";
import { sha, json, validateTargets, observationProblems, restPosition, activationKey, assessGateReport } from "../../full-journey-measurement/measurement-lib.mjs";
import { resolveApplication } from "./app-root.mjs";
import { activateChoice } from "./choice-activation.mjs";

const { values: o } = parseArgs({ options: Object.fromEntries(["workspace", "targets", "expectations", "out", "dependencies", "application-root"].map(key => [key, { type: "string" }])) });
for (const key of ["workspace", "targets", "expectations", "out", "dependencies", "application-root"]) assert.ok(o[key], `Missing --${key}`);
const workspace = await realpath(o.workspace), output = resolve(o.out), dependencies = await realpath(o.dependencies);
const application = await resolveApplication(workspace, o["application-root"], await captureSource(workspace));
for (const path of [dependencies, await realpath(o.targets), await realpath(o.expectations)]) assert.ok(outsideWorkspace(workspace, path));
await mkdir(output); assert.ok(outsideWorkspace(workspace, await realpath(output)));
const expected = JSON.parse(await readFile(o.expectations)), targets = JSON.parse(await readFile(o.targets));
assert.equal(targets.stage, 2, "Recovery worker supports only the completed stop-2 concept handoff");
assert.deepEqual(validateTargets(targets, expected), []);
assert.equal(dependencies, expected.trustedDependencies.root);
const manifest = { schemaVersion: 1, measurement: "full-journey", stage: targets.stage, unit: targets.stage === 2 ? "concepts" : "looks", started: new Date().toISOString(), workspace, applicationRoot: o["application-root"], application, measurementBaseline: "post-closure recovered source, not original closure-time identity", complete: false, semanticPass: "unobserved: requires source, reply and original-image review", expected, targets, problems: observationProblems(targets, expected), commands: [], results: [], sourceBefore: await captureSource(workspace), artifacts: {} };
assert.equal(manifest.sourceBefore.digest, targets.sourceDigest);
const save = () => writeFile(join(output, "manifest.json"), json(manifest));
await save();
const children = new Set(); let browser, interrupted = null;
function stop(child, signal = "SIGTERM") { if (child?.pid && child.exitCode === null && child.signalCode === null) { try { process.kill(-child.pid, signal); } catch (error) { if (error.code !== "ESRCH") throw error; } } }
for (const signal of ["SIGTERM", "SIGINT"]) process.on(signal, () => { interrupted ??= { signal, at: new Date().toISOString(), sender: "unknown" }; for (const child of children) stop(child, signal); void browser?.close().catch(() => {}); });
function start(args) {
  const child = spawn(process.execPath, args, { cwd: application, env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" }, detached: true, stdio: ["ignore", "pipe", "pipe"] });
  children.add(child);
  const record = { executable: process.execPath, args, pid: child.pid ?? null, started: new Date().toISOString(), stdout: "", stderr: "" }; manifest.commands.push(record);
  child.stdout.on("data", bytes => { record.stdout += bytes; }); child.stderr.on("data", bytes => { record.stderr += bytes; });
  child.on("error", error => { record.error = String(error); });
  const done = new Promise(ok => child.once("close", (code, signal) => { Object.assign(record, { code, signal, finished: new Date().toISOString() }); children.delete(child); ok(record); }));
  return { child, done };
}
async function nextIdentity(root) { const req = createRequire(join(root, "package.json")), entrypoint = await realpath(req.resolve("next/dist/bin/next")), packageJson = await realpath(req.resolve("next/package.json")), pkg = JSON.parse(await readFile(packageJson)); return { name: pkg.name, version: pkg.version, entrypoint, packageJson, sha256: sha(await readFile(entrypoint)) }; }
async function files(prefix = "") { const result = []; for (const entry of await readdir(join(output, prefix), { withFileTypes: true })) { const path = prefix ? `${prefix}/${entry.name}` : entry.name; if (entry.isDirectory()) result.push(...await files(path)); else { assert.ok(entry.isFile()); if (path !== "manifest.json") result.push([path, sha(await readFile(join(output, path)))]); } } return result; }
function observe() {
  const story = document.querySelector(".story"), style = story && getComputedStyle(story);
  return { url: location.href, scroll: scrollY, scene: story?.getAttribute("data-scene") ?? null, look: story?.getAttribute("data-look") ?? null, palette: style && ["--story-ground", "--story-ink", "--story-accent"].map(key => [key, style.getPropertyValue(key)]), overflowX: document.documentElement.scrollWidth > innerWidth, text: document.body.innerText, canvases: [...document.querySelectorAll("canvas")].map(node => { const r = node.getBoundingClientRect(); return { visible: node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }), x: r.x, y: r.y, width: r.width, height: r.height }; }), controls: [...document.querySelectorAll("button,a[href],[role=button],[role=tab]")].map(node => ({ name: node.getAttribute("aria-label") || node.textContent?.trim(), href: node.getAttribute("href"), pressed: node.getAttribute("aria-pressed"), selected: node.getAttribute("aria-selected") })) };
}
async function captureLook(base, look, index, mode, viewport) {
  const directory = `${String(index + 1).padStart(2, "0")}-${mode}`, folder = join(output, directory); await mkdir(folder);
  const report = { alternative: look, mode, viewport, rests: [], controls: [], requests: [], responses: [], errors: [], images: [], complete: false };
  const context = await browser.newContext({ viewport, reducedMotion: "no-preference", serviceWorkers: "block", ...(mode === "phone" ? { hasTouch: true, isMobile: true } : {}) });
  const page = await context.newPage(); page.setDefaultTimeout(10000);
  const shot = async name => { const path = `${directory}/${name}.png`, bytes = await page.screenshot({ path: join(output, path), timeout: 30000 }); const record = { path, sha256: sha(bytes), bytes: bytes.length }; report.images.push(record); return record; };
  const go = async route => { const response = await page.goto(new URL(route, base).href, { waitUntil: "networkidle", timeout: 30000 }); assert.ok(response?.ok(), `HTTP ${response?.status()}`); await page.waitForTimeout(1800); };
  await page.route("**/*", route => { const url = new URL(route.request().url()); if ([new URL(base).origin, "null"].includes(url.origin)) return route.continue(); report.errors.push(`Blocked external request ${url.href}`); return route.abort("blockedbyclient"); });
  page.on("requestfailed", request => {
    const record = { url: request.url(), resourceType: request.resourceType(), failure: request.failure()?.errorText ?? "unknown", navigation: request.isNavigationRequest() };
    record.expectedReason = requestFailureReason(record, { id: mode }, page.url());
    record.classification = record.failure === "net::ERR_ABORTED" && record.navigation ? "navigation aborted, retained for manual timing review, not waived" : record.expectedReason ? "expected" : "unexpected";
    report.requests.push(record); if (!record.expectedReason) report.errors.push(`${record.classification}: ${record.failure}: ${record.url}`);
  });
  page.on("response", response => { if (response.status() >= 400) { const record = { url: response.url(), status: response.status() }; report.responses.push(record); report.errors.push(`HTTP ${record.status}: ${record.url}`); } });
  page.on("pageerror", error => report.errors.push(error.message));
  try {
    await go(look.route); report.entry = await page.evaluate(observe); report.entryImage = await shot("entry");
    // The entry image observes the destination; activation starts at the actual
    // declared chooser route. State-only choices may share the same route.
    if (look.control) {
      try { const activation = await activateChoice({ page, go, control: look.control, observe }); report.initialActivation = activation; report.lookActivation = activation.observation; }
      catch (error) { report.lookActivationError = String(error); }
    }
    report.beatInventory = await page.locator("[data-beat]").evaluateAll(nodes => nodes.map(node => ({ id: node.getAttribute("data-beat"), text: node.textContent })));
    for (const role of ["opening", "middle", "ending"]) {
      const id = look.beats[role], rest = { role, id }; report.rests.push(rest);
      const boxes = await page.locator("[data-beat]").evaluateAll((nodes, id) => nodes.filter(node => node.getAttribute("data-beat") === id).map(node => { const r = node.getBoundingClientRect(); return { top: r.top + scrollY, height: r.height }; }), id);
      if (!id || boxes.length !== 1) { rest.error = "Missing or ambiguous observed beat"; continue; }
      const max = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - innerHeight));
      await page.evaluate(top => scrollTo({ top, behavior: "instant" }), restPosition(boxes[0], viewport.height, max)); await page.waitForTimeout(1800);
      rest.observation = await page.evaluate(observe); rest.image = await shot(role);
    }
    if (!look.control) report.controlStatus = "unobserved: no public switch recorded; routes and handover still require review";
    else for (const method of ["pointer", "keyboard"]) {
      const trial = { method, activated: false }; report.controls.push(trial);
      try {
        await go(look.control.fromRoute);
        if (look.control.prepareControl) { const prior = page.locator(look.control.prepareControl.selector); assert.equal(await prior.count(), 1); assert.equal(await prior.evaluate(node => node.getAttribute("aria-label") || node.textContent?.trim()), look.control.prepareControl.name); await prior.click(); await page.waitForTimeout(1800); trial.preparation = { ...look.control.prepareControl, observation: await page.evaluate(observe) }; }
        const control = page.locator(look.control.selector);
        assert.equal(await control.count(), 1, "Observed switch is not unique");
        assert.equal(await control.evaluate(node => node.getAttribute("aria-label") || node.textContent?.trim()), look.control.name, "Observed switch name changed");
        await control.scrollIntoViewIfNeeded();
        if (method === "keyboard") {
          await page.evaluate(() => { document.activeElement?.blur(); document.body.tabIndex = -1; document.body.focus(); });
          for (let i = 0; i < 200; i++) { await page.keyboard.press("Tab"); if (await control.evaluate(node => document.activeElement === node)) { trial.tabPresses = i + 1; break; } }
          assert.ok(trial.tabPresses, "Switch is not reachable by Tab");
        }
        trial.geometry = await control.evaluate(node => { const r = node.getBoundingClientRect(), hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { x: r.x, y: r.y, width: r.width, height: r.height, inView: r.width > 0 && r.height > 0 && r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight, visible: node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }), hitTarget: hit === node || node.contains(hit), focused: document.activeElement === node, disabled: !!node.disabled || node.getAttribute("aria-disabled") === "true" }; });
        trial.before = await page.evaluate(observe); trial.beforeImage = await shot(`${method}-before`);
        assert.ok(trial.geometry.visible && trial.geometry.inView && trial.geometry.hitTarget && !trial.geometry.disabled, "Switch is hidden, covered, out of view or disabled");
        if (method === "pointer") await control.click(); else { trial.activationKey = activationKey(await control.evaluate(node => ({ type: node.type, role: node.getAttribute("role") }))); await page.keyboard.press(trial.activationKey); } trial.activated = true;
        await page.waitForTimeout(1800); trial.after = await page.evaluate(observe); trial.afterImage = await shot(`${method}-after`);
        trial.identityChanged = trial.before.look !== trial.after.look || trial.before.url !== trial.after.url || json(trial.before.palette) !== json(trial.after.palette);
        trial.responseStatus = trial.identityChanged ? "observed alternative/route response; material appearance requires review" : "unobserved switch response: inspect originals; selected/idempotent trials are not passes";
        trial.meaning = "Manual review required: response and pixels do not alone prove the intended material alternative";
      } catch (error) { trial.error = String(error); }
    }
    report.complete = true;
  } catch (error) { report.error = String(error); }
  finally { report.problems = assessGateReport(report); await writeFile(join(folder, "report.json"), json(report)); manifest.results.push({ directory, complete: report.complete, error: report.error ?? null, problems: report.problems }); await save(); await context.close().catch(() => {}); }
}
try {
  manifest.nextRuntime = verifyNextRuntime(application, await nextIdentity(application), await nextIdentity(dependencies)); assert.equal(manifest.nextRuntime.passed, true, manifest.nextRuntime.problems.join("; "));
  assert.equal(manifest.nextRuntime.trusted.version, expected.trustedDependencies.nextVersion); assert.equal(manifest.nextRuntime.trusted.sha256, expected.trustedDependencies.nextCliSha256);
  const dependencyRequire = createRequire(join(dependencies, "package.json")); manifest.playwrightEntrypoint = await realpath(dependencyRequire.resolve("playwright-core")); manifest.playwrightEntrypointSha256 = sha(await readFile(manifest.playwrightEntrypoint)); assert.equal(manifest.playwrightEntrypointSha256, expected.trustedDependencies.playwrightEntrypointSha256);
  const build = start([manifest.nextRuntime.entrypoint, "build"]); await save(); assert.equal((await build.done).code, 0, "Production build failed"); assert.ok(!interrupted);
  const socket = createServer(); await new Promise((ok, fail) => { socket.once("error", fail); socket.listen(0, "127.0.0.1", ok); }); const port = socket.address().port; await new Promise(ok => socket.close(ok));
  const server = start([manifest.nextRuntime.entrypoint, "start", "--hostname", "127.0.0.1", "--port", String(port)]), base = `http://127.0.0.1:${port}`;
  let ready = false; for (let i = 0; i < 180 && !interrupted; i++) { try { await fetch(base, { signal: AbortSignal.timeout(1000) }); ready = true; break; } catch {} if (server.child.exitCode !== null) break; await new Promise(ok => setTimeout(ok, 250)); } assert.ok(ready, "Preview did not listen");
  const { chromium } = dependencyRequire("playwright-core"); browser = await chromium.launch({ args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  for (const [index, look] of targets.alternatives.entries()) for (const [mode, viewport] of Object.entries(expected.viewports).filter(([mode]) => ["desktop", "phone"].includes(mode))) { assert.ok(!interrupted); await captureLook(base, look, index, mode, viewport); }
  manifest.complete = !interrupted && manifest.results.every(result => result.complete);
} catch (error) { manifest.error = String(error); }
finally {
  await browser?.close().catch(() => {}); for (const child of children) stop(child);
  await new Promise(ok => setTimeout(ok, 200)); for (const child of children) stop(child, "SIGKILL");
  manifest.interrupted = interrupted; manifest.sourceAfter = await captureSource(workspace); manifest.sourceUnchanged = json(manifest.sourceBefore) === json(manifest.sourceAfter); manifest.finished = new Date().toISOString(); manifest.artifacts = Object.fromEntries(await files()); await save();
  console.log(json({ complete: manifest.complete, sourceUnchanged: manifest.sourceUnchanged, error: manifest.error ?? null, manifest: join(output, "manifest.json") }));
  manifest.passed = manifest.complete && manifest.sourceUnchanged && !manifest.problems.length && manifest.results.every(result => !result.problems.length);
  await save();
  process.exitCode = manifest.passed ? 0 : 1;
}
