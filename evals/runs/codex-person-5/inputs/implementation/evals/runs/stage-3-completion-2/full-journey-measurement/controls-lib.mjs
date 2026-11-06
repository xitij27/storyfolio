// Prospective study-only derivative of evals/lib/build-capture.mjs exerciseControl.
// Shared checker remains unchanged. The first calibration and its bytes are
// preserved; root must approve integration into a new measurement baseline.
import assert from "node:assert/strict";
import { inventoryControls, validateFocusOnlyControls } from "../../../lib/build-capture.mjs";
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const controlSelector = 'button,[role=button],input:not([type=hidden]),select,textarea,[role=slider],[role=tab],summary,a[href^="#"]';
const focusDeclaration = (control, declarations) => declarations.find(declaration => control.tag === "a" && control.selector === declaration.selector && control.name?.trim() === declaration.name.trim() && control.href === declaration.href);
export const CONTROL_SETTLEMENT = Object.freeze({ maxMs: 3000, stableMs: 150, minimumMs: 400, intervalMs: 50, tolerancePx: 0.5 });

// Injected observers/clocks permit deterministic tests with no browser or sleep.
export async function observeSettlement({ observe, pause = ms => new Promise(done => setTimeout(done, ms)), now = () => performance.now(), policy = CONTROL_SETTLEMENT }) {
  assert.ok([policy.maxMs, policy.stableMs, policy.minimumMs, policy.intervalMs].every(value => Number.isSafeInteger(value) && value > 0));
  assert.ok(policy.maxMs >= policy.minimumMs && policy.minimumMs >= policy.stableMs && policy.tolerancePx >= 0);
  const started = now(), trajectory = []; let anchor, stableSince = started, error = null;
  const bounded = async operation => {
    const remaining = Math.max(0, policy.maxMs - (now() - started)); let timer;
    try { return await Promise.race([Promise.resolve().then(operation), new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("Scroll observation deadline")), remaining); })]); }
    finally { clearTimeout(timer); }
  };
  try {
    while (now() - started <= policy.maxMs) {
      const position = await bounded(observe), elapsedMs = now() - started;
      assert.ok(Number.isFinite(position.x) && Number.isFinite(position.y), "Invalid observed scroll position");
      trajectory.push({ elapsedMs, x: position.x, y: position.y });
      if (!anchor || Math.abs(position.x - anchor.x) > policy.tolerancePx || Math.abs(position.y - anchor.y) > policy.tolerancePx) { anchor = position; stableSince = now(); }
      const stableForMs = now() - stableSince;
      if (elapsedMs <= policy.maxMs && elapsedMs >= policy.minimumMs && stableForMs >= policy.stableMs) return { settled: true, elapsedMs, stableForMs, trajectory, policy, error: null };
      if (elapsedMs >= policy.maxMs) break;
      await bounded(() => pause(Math.min(policy.intervalMs, policy.maxMs - elapsedMs)));
    }
  } catch (failure) { error = String(failure); }
  return { settled: false, elapsedMs: now() - started, stableForMs: now() - stableSince, trajectory, policy, error: error ?? "Scroll did not become stable within the bound" };
}
export const settlePageScroll = page => observeSettlement({ observe: () => page.evaluate(() => ({ x: scrollX, y: scrollY })), pause: ms => page.waitForTimeout(ms) });
export function settlementMatches(settlement, observations) {
  const last = settlement?.trajectory?.at(-1), tolerance = settlement?.policy?.tolerancePx;
  return settlement?.settled === true && !!last && Number.isFinite(tolerance) && Array.isArray(observations) && observations.length > 0 && observations.every(observation => Number.isFinite(observation?.scroll) && Number.isFinite(observation?.scrollX) && Math.abs(last.y - observation.scroll) <= tolerance && Math.abs(last.x - observation.scrollX) <= tolerance);
}

// Browser-serialized, source-declared relationships only. A role=group does
// not itself prove exclusivity: the caller must observe actual deselection.
export function findDeclaredPeer(node) {
  const value = (element, attribute) => attribute === "checked" ? String(!!element.checked) : element.getAttribute(attribute);
  const attribute = node.type === "radio" && node.checked ? "checked" : node.getAttribute("aria-pressed") === "true" ? "aria-pressed" : node.getAttribute("aria-selected") === "true" ? "aria-selected" : null;
  if (!attribute) return null;
  const nodes = [...document.querySelectorAll('button,[role=button],input:not([type=hidden]),select,textarea,[role=slider],[role=tab],summary,a[href^="#"]')];
  for (const [index, other] of nodes.entries()) {
    if (other === node || other.disabled || other.getAttribute("aria-disabled") === "true" || value(other, attribute) !== "false" || !other.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue;
    const group = node.closest('[role="group"],[role="tablist"]');
    let relationship = null;
    if (node.type === "radio" && other.type === "radio" && node.name && other.name === node.name && other.form === node.form && other.parentElement === node.parentElement) relationship = "same named native radio group";
    else if (group && other.closest('[role="group"],[role="tablist"]') === group && node.getAttribute("role") === "tab" && other.getAttribute("role") === "tab" && group.getAttribute("role") === "tablist") relationship = "same declared tablist";
    else if (group && other.parentElement === node.parentElement && other.closest('[role="group"],[role="tablist"]') === group && group.getAttribute("role") === "group" && attribute === "aria-pressed" && other.hasAttribute("aria-pressed")) relationship = "same declared pressed-button group";
    else if (other.parentElement === node.parentElement && node.getAttribute("aria-controls") && other.getAttribute("aria-controls") === node.getAttribute("aria-controls") && ((node.hasAttribute("aria-pressed") && other.hasAttribute("aria-pressed")) || (node.getAttribute("role") === "tab" && other.getAttribute("role") === "tab"))) relationship = "same declared controlled target";
    if (relationship) return { index, attribute, relationship, targetValue: value(node, attribute), peerValue: value(other, attribute), peerLabel: other.getAttribute("aria-label") ?? other.textContent?.trim(), groupRole: group?.getAttribute("role") ?? null, groupLabel: group?.getAttribute("aria-label") ?? null };
  }
  return null;
}

export async function exerciseSettledControl(page, control, screenshot, reset, declarations = [], { settle = settlePageScroll } = {}) {
  const invalid = validateFocusOnlyControls(declarations);
  if (invalid.length) throw new Error(invalid.join("; "));
  const declaration = focusDeclaration(control, declarations);
  const result = { ...control, trials: [] };
  for (const method of ["pointer", "keyboard"]) {
    const trial = { method, activated: false, reached: false, hitTarget: false, targets: [] };
    try {
      if (reset) { await reset(); trial.reset = "fresh document with the same browser condition"; }
      if (Number.isFinite(control.observedScroll)) { await page.evaluate(top => scrollTo({ top, behavior: "instant" }), control.observedScroll); await page.waitForTimeout(1800); }
      const target = page.locator(control.selector);
      if (await target.count() !== 1) throw new Error("recorded control identity no longer resolves uniquely");
      if (!declaration) await target.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1800);
      if (!(await inventoryControls(page, declarations)).some(actual => actual.key === control.key)) throw new Error("recorded control identity changed after reset or scroll");
      // A selected tab/radio is intentionally idempotent. Select a declared
      // peer first when possible, then measure the target's actual response.
      const peer = await target.evaluate(findDeclaredPeer);
      if (peer) {
        const peerTarget = page.locator(controlSelector).nth(peer.index);
        trial.peerPreparation = { ...peer };
        await peerTarget.click();
        trial.peerPreparation.settlement = await settle(page);
        const state = (node, attribute) => attribute === "checked" ? String(!!node.checked) : node.getAttribute(attribute);
        trial.peerPreparation.targetAfter = await target.evaluate(state, peer.attribute);
        trial.peerPreparation.peerAfter = await peerTarget.evaluate(state, peer.attribute);
        trial.peerPreparation.verified = trial.peerPreparation.settlement.settled && trial.peerPreparation.targetAfter === "false" && trial.peerPreparation.peerAfter === "true";
        if (!trial.peerPreparation.verified) throw new Error("Declared peer did not visibly settle and deselect the target; no response exemption applied");
      }
      const inspect = () => target.evaluate(node => ({
        html: node.outerHTML, value: node.value, checked: node.checked,
        location: location.href, scroll: scrollY, scrollX,
        state: { pressed: node.getAttribute("aria-pressed"), selected: node.getAttribute("aria-selected"), expanded: node.getAttribute("aria-expanded"), checked: node.getAttribute("aria-checked"), open: node.closest("details")?.open },
        targets: (node.tagName === "A" ? [decodeURIComponent((node.getAttribute("href") ?? "").slice(1))] : (node.getAttribute("aria-controls") ?? "").split(/\s+/).filter(Boolean)).map(id => {
          const matches = id ? [...document.querySelectorAll("[id]")].filter(target => target.id === id) : [document.documentElement];
          const target = matches[0], box = target?.getBoundingClientRect();
          return { id, exists: matches.length === 1, html: target?.outerHTML ?? null, containsCanvas: !!target && (target.matches("canvas") || !!target.querySelector("canvas")), visible: !!target && target.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }), inView: !!box && box.width > 0 && box.height > 0 && box.left < innerWidth && box.right > 0 && box.top < innerHeight && box.bottom > 0 };
        }),
        geometry: (() => { const box = node.getBoundingClientRect(); return { x: box.x, y: box.y, width: box.width, height: box.height }; })(),
        viewport: { width: innerWidth, height: innerHeight },
        visible: node.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }),
        inView: (() => { const box = node.getBoundingClientRect(); return box.width > 0 && box.height > 0 && box.left >= 0 && box.top >= 0 && box.right <= innerWidth && box.bottom <= innerHeight; })(),
        intersectsViewport: (() => { const box = node.getBoundingClientRect(); return box.width > 0 && box.height > 0 && box.left < innerWidth && box.top < innerHeight && box.right > 0 && box.bottom > 0; })(),
        focused: document.activeElement === node,
        disabled: !!node.disabled || node.getAttribute("aria-disabled") === "true",
        hitTarget: (() => { const box = node.getBoundingClientRect(); const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2); return hit === node || node.contains(hit); })(),
      }));
      if (declaration && method === "pointer") {
        trial.unfocused = await inspect();
        trial.unfocusedImage = (await screenshot(`${control.key}-pointer-unfocused`)).sha256;
        trial.applicability = "not-applicable";
        trial.declaration = { ...declaration };
        result.trials.push(trial);
        continue;
      }
      trial.applicability = "applicable";
      if (method === "keyboard") {
        // Reach by actual sequential keyboard navigation, not element.focus().
        await page.evaluate(() => { document.activeElement?.blur(); document.body.tabIndex = -1; document.body.focus({ preventScroll: true }); });
        for (let count = 0; count < 200; count++) {
          await page.keyboard.press("Tab");
          if (await target.evaluate(node => document.activeElement === node)) { trial.reached = true; trial.tabPresses = count + 1; break; }
        }
        if (!trial.reached) throw new Error("control cannot be reached by Tab");
      } else { trial.reached = true; await target.hover(); }
      trial.preActivationSettlement = await settle(page);
      const before = await inspect();
      trial.before = before;
      trial.hitTarget = before.hitTarget;
      trial.beforeImage = (await screenshot(`${control.key}-${method}-before`)).sha256;
      trial.beforeImageObservation = await inspect();
      if (!settlementMatches(trial.preActivationSettlement, [before, trial.beforeImageObservation])) throw new Error("Pre-activation scroll did not remain settled through the baseline original; activation withheld");
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
      trial.postActivationSettlement = await settle(page);
      const after = await inspect();
      trial.afterImage = (await screenshot(`${control.key}-${method}-after`)).sha256;
      trial.afterImageObservation = await inspect();
      trial.scrollSettled = settlementMatches(trial.postActivationSettlement, [after, trial.afterImageObservation]);
      if (!trial.scrollSettled) trial.error = "Post-activation scroll did not remain settled through the response original";
      trial.targets = before.targets.map((target, index) => ({ id: target.id, exists: target.exists && after.targets[index]?.exists, requiresVisualReview: control.tag !== "a" && target.containsCanvas, changed: trial.scrollSettled && (control.tag === "a" ? after.targets[index]?.inView && after.targets[index]?.visible && (before.location !== after.location || before.scroll !== after.scroll) : target.html !== after.targets[index]?.html) }));
      trial.changed = trial.scrollSettled && (!same(before.state, after.state) || before.value !== after.value || before.checked !== after.checked || trial.targets.some(target => target.changed));
      trial.responseStatus = !trial.scrollSettled || trial.targets.some(target => target.requiresVisualReview) ? "unobserved" : trial.changed ? "observed DOM/state response" : "no observed DOM/state response";
      trial.pixelsChanged = trial.beforeImage !== trial.afterImage;
      trial.pixelMeaning = "unobserved: hover, focus and unrelated animation can change screenshots";
      trial.before = before; trial.after = after;
    } catch (error) { trial.error = error.message; }
    result.trials.push(trial);
  }
  return result;
}

