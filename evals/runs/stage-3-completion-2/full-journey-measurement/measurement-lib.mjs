import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { assessDiagnosticCapture, validateFocusOnlyControls } from "../../../lib/build-capture.mjs";
import { normalizeText, linkTextMatches } from "../../../lib/build-check.mjs";
export const sha = bytes => createHash("sha256").update(bytes).digest("hex");
export const json = value => JSON.stringify(value, null, 2) + "\n";
const hex = value => typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
const text = value => typeof value === "string" && value.trim().length > 0;
const unique = values => new Set(values).size === values.length;
export const localRoute = route => typeof route === "string" && route.startsWith("/") && !route.startsWith("//") && !/[\\\0]/.test(route) && new URL(route, "http://127.0.0.1").origin === "http://127.0.0.1";
const pathSafe = path => text(path) && !path.startsWith("/") && !path.split(/[\\/]/).some(part => ["", ".", ".."].includes(part)) && !path.includes("\0");
export const MODE_IDS = Object.freeze(["desktop", "mobile", "short", "reduced-motion", "no-webgl", "no-javascript", "context-loss"]);
export function modeCases(policy) {
  return [
    { id: "desktop", viewport: policy.viewports.desktop, mode: "animated" },
    { id: "mobile", viewport: policy.viewports.phone, mode: "animated", touch: true },
    { id: "short", viewport: policy.viewports.short, mode: "animated" },
    { id: "reduced-motion", viewport: policy.viewports.desktop, mode: "animated", reducedMotion: true },
    { id: "no-webgl", viewport: policy.viewports.desktop, mode: "static", noWebGL: true },
    { id: "no-javascript", viewport: policy.viewports.phone, mode: "static", noJavaScript: true, touch: true },
    { id: "context-loss", viewport: policy.viewports.desktop, mode: "static", loseContext: true }
  ];
}
export function units(stage) {
  assert.ok([2, 4, 6].includes(stage)); return stage === 2 ? ["concepts"] : stage === 4 ? ["looks"] : ["build", ...MODE_IDS, "auxiliary"];
}
export function bounds(unit, policy) {
  assert.ok(["concepts", "looks", "build", "auxiliary", ...MODE_IDS].includes(unit));
  const totalCapMs = policy.boundsMs[MODE_IDS.includes(unit) ? "mode" : unit];
  assert.ok(Number.isSafeInteger(totalCapMs) && totalCapMs > policy.shutdownGraceMs);
  return { timeoutMs: totalCapMs - policy.shutdownGraceMs, graceMs: policy.shutdownGraceMs, totalCapMs };
}
export function gateDisposition(state) {
  const reasons = [];
  if (state.actorSettled !== true || state.actorComplete !== true) reasons.push("actor missing, nonterminal or incomplete");
  if (state.hasSavedSnapshot !== true) reasons.push("no complete saved source snapshot");
  if (state.authoredApplication !== true) reasons.push("no authored runnable implementation, starter is not output");
  if (state.sourceIdentity !== true) reasons.push("source identity unproved or blocked");
  if (state.unresolvedGate !== false) reasons.push("unresolved conversation/selection gate");
  return { eligible: reasons.length === 0, passed: false, status: reasons.length ? "blocked-unobserved" : "eligible-unobserved", reasons, browserStarted: false };
}
export const imageName = (name, extension = "png") => `${encodeURIComponent(name)}.${extension}`;
export const wholeText = value => value.replace(/\s+/g, " ").trim();
export function reserveImage(names, file) { assert.ok(!names.has(file), `Duplicate original image name: ${file}`); names.add(file); return file; }
// Serialized directly into Chromium, also exercised with a deterministic DOM
// fixture. Preserve inline whitespace, block boundaries and explicit BRs.
export function observeWording({ beat, position, versions, approvedBeats }) {
  if (!beat) return [];
  const blocks = [...document.querySelectorAll("[data-beat]")].filter(node => node.getAttribute("data-beat") === beat);
  if (blocks.length !== 1) return [];
  const chars = [], walker = document.createTreeWalker(blocks[0], NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT); let previousBlock = null;
  const append = (value, visible) => { if (/\s/.test(value)) { if (chars.length && chars.at(-1).value !== " ") chars.push({ value: " ", visible: true }); } else chars.push({ value, visible }); };
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.nodeType === 1) { if (node.tagName === "BR") append(" ", true); continue; }
    const element = node.parentElement;
    if (!element || element.closest("script,style,noscript")) continue;
    let block = element; while (block.parentElement && ["inline", "contents"].includes(getComputedStyle(block).display)) block = block.parentElement;
    if (previousBlock && block !== previousBlock) append(" ", true); previousBlock = block;
    let opacity = 1; for (let current = element; current; current = current.parentElement) opacity *= Number(getComputedStyle(current).opacity);
    for (const word of node.textContent.matchAll(/\s+|\S+/g)) {
      const range = document.createRange(); range.setStart(node, word.index); range.setEnd(node, word.index + word[0].length);
      const rects = [...range.getClientRects()], visible = opacity > 0.5 && element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && rects.length > 0 && rects.every(rect => rect.top >= 0 && rect.bottom <= innerHeight && rect.left >= 0 && rect.right <= innerWidth);
      for (let index = 0; index < word[0].length; index++) append(word[0][index], visible);
    }
  }
  const text = chars.map(char => char.value).join("");
  return versions.flatMap((version, versionIndex) => {
    if (approvedBeats.find(item => item.meaning === version.meaning)?.actualId !== beat) return [];
    const wanted = version.text.replace(/\s+/g, " ").trim(), matches = [], visibleRanges = [];
    for (let start = text.indexOf(wanted); start >= 0; start = text.indexOf(wanted, start + 1)) if ((start === 0 || text[start - 1] === " ") && (start + wanted.length === text.length || text[start + wanted.length] === " ")) matches.push(start);
    const start = matches[0] ?? -1, occurrences = matches.length;
    if (occurrences === 1) for (let i = 0; i < wanted.length; i++) if (chars[start + i].visible) { const previous = visibleRanges.at(-1); if (previous?.[1] === i) previous[1]++; else visibleRanges.push([i, i + 1]); }
    return [{ versionIndex, beat, position, scroll: scrollY, characters: wanted.length, completeTextMatched: start >= 0, occurrences, visibleRanges }];
  });
}
export function validateTargets(targets) {
  const problems = [];
  if (targets?.schemaVersion !== 1 || targets.measurement !== "full-journey" || ![2, 4, 6].includes(targets.stage)) return ["wrong journey targets schema or stage"];
  if (!hex(targets.sourceDigest) || !hex(targets.actorResultSha256)) problems.push("missing source/result binding");
  if (!targets.discovery?.reviewer || targets.discovery.exhaustive !== true || !Array.isArray(targets.discovery.sources) || !targets.discovery.sources.length) problems.push("missing exhaustive public-source discovery");
  for (const source of Array.isArray(targets.discovery?.sources) ? targets.discovery.sources : []) if (!pathSafe(source?.path) || !hex(source?.sha256)) problems.push("unsafe or unhashed discovery source");
  if (targets.eligibility?.disposition !== "implemented-output" || targets.eligibility.authoredApplication !== true || !text(targets.eligibility.rationale)) problems.push("browser requires declared authored implementation; record no-output gates separately");
  const controls = control => {
    if (control === null) return;
    if (!text(control?.selector) || !text(control?.name) || !localRoute(control?.fromRoute)) problems.push("invalid observed chooser or switch");
    if (control?.prepareControl && (!text(control.prepareControl.selector) || !text(control.prepareControl.name) || control.prepareControl.selector === control.selector)) problems.push("invalid real alternate control");
  };
  if (targets.stage !== 6) {
    if (!Array.isArray(targets.alternatives) || !targets.alternatives.length) return [...problems, "all actual alternatives or a default route observation required"];
    const ids = [];
    for (const alternative of targets.alternatives ?? []) {
      if (!alternative || typeof alternative !== "object") { problems.push("invalid alternative"); continue; }
      ids.push(alternative.id);
      if (!text(alternative.id) || !localRoute(alternative.route) || typeof alternative.advertised !== "boolean") problems.push("invalid alternative identity or route");
      controls(alternative.control);
      const beats = alternative.beats;
      if (!beats || !["opening", "middle", "ending"].every(role => beats[role] === null || text(beats[role]))) problems.push("three actual beat roles required, null for missing");
      else if (!unique(Object.values(beats).filter(value => value !== null))) problems.push("duplicate three-point beat identity");
      if (!text(alternative.meaning)) problems.push("source-semantic alternative explanation required");
    }
    if (!unique(ids)) problems.push("duplicate alternative identity");
  } else {
    if (!["beats", "approvedBeats", "requiredText", "links", "assets", "requiredFiles", "auxiliaryPages"].every(key => Array.isArray(targets[key]))) return [...problems, "missing final coverage arrays"];
    if (!localRoute(targets.route) || !targets.beats.length || !targets.beats.every(beat => text(beat?.id) && [1, 2, 3, 4, 5, 6].includes(beat.headingLevel) && text(beat.meaning)) || !unique(targets.beats.map(beat => beat?.id))) problems.push("complete actual final beat inventory required");
    if (!targets.approvedBeats.length || !targets.approvedBeats.every(beat => text(beat?.meaning) && (beat.actualId === null || text(beat.actualId)))) problems.push("approved storyboard-to-actual mapping required");
    if (!unique(targets.approvedBeats.map(beat => beat?.meaning))) problems.push("duplicate approved meaning");
    for (const key of ["requiredText", "links", "assets", "requiredFiles", "auxiliaryPages"]) if (!Array.isArray(targets[key])) problems.push(`missing ${key}`);
    if (!(targets.requiredText ?? []).every(text)) problems.push("invalid selected wording");
    const wording = targets.selectedWording;
    if (!pathSafe(wording?.record?.path) || !wording.record.path.startsWith("evals/runs/") || !hex(wording.record.sha256) || !Array.isArray(wording.versions) || !wording.versions.length || !wording.versions.every(version => text(version?.meaning) && text(version.version) && text(version.text)) || json(targets.requiredText) !== json(wording.versions.map(version => version.text))) problems.push("requiredText must retain every selected whole version with coordinator selection record, not source-extracted snippets");
    else if (!unique(wording.versions.map(version => version.meaning)) || wording.versions.some(version => !targets.approvedBeats.some(beat => beat?.meaning === version.meaning))) problems.push("whole versions need unique approved-meaning mapping");
    if (!(targets.links ?? []).every(link => text(link?.text) && text(link.href) && /^(?:https?:|mailto:|\/|#)/.test(link.href) && !link.href.startsWith("//") && !/[\\\0]/.test(link.href))) problems.push("invalid required link");
    if (![...(targets.assets ?? []), ...(targets.requiredFiles ?? [])].every(pathSafe)) problems.push("unsafe required asset/file");
    if (!(targets.auxiliaryPages ?? []).every(page => text(page?.id) && localRoute(page.route) && [200, 404].includes(page.status) && text(page.purpose) && (page.kind === undefined || ["page", "download"].includes(page.kind))) || !unique((targets.auxiliaryPages ?? []).map(page => page?.id))) problems.push("invalid auxiliary page observations");
    problems.push(...validateFocusOnlyControls(targets.focusOnlyControls));
    if ((targets.focusOnlyControls?.length ?? 0) > 1) problems.push("at most one document-start focus-only skip allowed");
    if (targets.focusOnlyControls?.length && (targets.focusOnlyAttestation?.purpose !== "document-start-to-main-story" || !targets.focusOnlyAttestation.reviewedByRoot || !text(targets.focusOnlyAttestation.sourcePath))) problems.push("focus-only skip needs explicit source-first root review");
  }
  return [...new Set(problems)];
}
export function observationProblems(targets, policy) {
  if (targets.stage !== 6) {
    const count = targets.alternatives.filter(item => item.advertised).length, limits = targets.stage === 2 ? { min: policy.conceptCount, max: policy.conceptCount } : policy.lookCount;
    return [...(count < limits.min || count > limits.max ? [`advertised alternative count ${count}, required ${limits.min} to ${limits.max}`] : []), ...targets.alternatives.flatMap(item => Object.entries(item.beats).filter(([, id]) => !id).map(([role]) => `${item.id}: missing ${role}`))];
  }
  return [...(targets.beats.length < policy.finalBeatCount.min || targets.beats.length > policy.finalBeatCount.max ? [`final beat count ${targets.beats.length}, normal scope ${policy.finalBeatCount.min} to ${policy.finalBeatCount.max}`] : []), ...targets.approvedBeats.filter(beat => !targets.beats.some(actual => actual.id === beat.actualId)).map(beat => `approved meaning not mapped to actual beat: ${beat.meaning}`)];
}
export function assessMode(expected, entry, report) {
  const problems = [];
  if (json(report.beatIds) !== json(expected.beats.map(beat => beat.id))) problems.push("actual beat order differs from full observed target inventory");
  if (report.h1 !== 1 || !report.lang || report.duplicateIds?.length) problems.push("document heading/language/ID structure failed");
  for (const beat of expected.beats) if (!(report.samples ?? []).some(sample => sample.beat === beat.id && sample.headings?.some(heading => heading.level === beat.headingLevel && heading.visible && normalizeText(heading.text)))) problems.push(`${beat.id}: missing visible structural heading`);
  for (const sample of report.samples ?? []) {
    if (sample.overflowX) problems.push(`${sample.beat}: horizontal overflow`);
    if (sample.scene !== (entry.mode === "animated" ? "on" : "off")) problems.push(`${sample.beat}: unexpected scene state`);
    if (entry.mode === "animated" ? !(sample.visibleCanvases >= 1) : sample.visibleCanvases !== 0) problems.push(`${sample.beat}: visible canvas contract failed`);
  }
  problems.push(...assessWording(expected, report.wording ?? []));
  for (const link of expected.links) if (!(link.keyboardOnly ? report.keyboardLinks ?? [] : (report.samples ?? []).flatMap(sample => sample.links ?? [])).some(actual => linkTextMatches(actual.text, link) && actual.href === link.href && actual.visible && actual.inView && actual.tabIndex >= 0 && actual.hitTarget && (!link.keyboardOnly || actual.focused))) problems.push(`required link not usable: ${link.text} (${link.href})`);
  problems.push(...assessDiagnosticCapture(expected, entry, report).map(problem => problem.replace("all five post-context-loss", "all final-beat post-context-loss")), ...(report.errors ?? []));
  if (!Array.isArray(report.rawControlCensus) || json(report.rawControlCensus.map(row => row.beat)) !== json(expected.beats.map(beat => beat.id))) problems.push("raw hidden/disabled control census missing at some final beats");
  return [...new Set(problems)];
}
export function assessWording(expected, observations) {
  return expected.selectedWording.versions.flatMap((version, versionIndex) => {
    const characters = wholeText(version.text).length, covered = new Set(), beat = expected.approvedBeats.find(item => item.meaning === version.meaning)?.actualId;
    for (const sample of observations.filter(item => item.versionIndex === versionIndex && item.beat === beat && item.completeTextMatched === true && item.occurrences === 1 && item.characters === characters)) {
      for (const [start, end] of sample.visibleRanges ?? []) if (Number.isInteger(start) && Number.isInteger(end) && start >= 0 && end <= characters && end > start) for (let i = start; i < end; i++) covered.add(i);
    }
    return covered.size === characters ? [] : [`selected whole version ${versionIndex}: ${characters - covered.size}/${characters} characters not visibly observed in its approved beat`];
  });
}
export function assessGateReport(report) {
  const problems = [...(report.errors ?? []), ...(report.error ? [report.error] : []), ...(report.lookActivationError ? [report.lookActivationError] : [])];
  for (const role of ["opening", "middle", "ending"]) {
    const rest = report.rests.find(item => item.role === role);
    if (!rest?.image || rest.error) problems.push(`${role}: missing three-point capture`);
    if (rest?.observation?.overflowX) problems.push(`${role}: horizontal overflow`);
  }
  if (report.alternative.control && json(report.controls.map(trial => trial.method).sort()) !== json(["keyboard", "pointer"])) problems.push("missing declared pointer/keyboard switch trials");
  for (const trial of report.controls) {
    if (!trial.activated || trial.error || !trial.beforeImage || !trial.afterImage) problems.push(`${trial.method}: switch not exercised: ${trial.error ?? "missing evidence"}`);
    if (trial.identityChanged !== true) problems.push(`${trial.method}: alternative response unobserved, unchanged/idempotent trial is not a pass`);
  }
  return [...new Set(problems)];
}
export function assertUnitCoverage(unit, targets, manifest, reports) {
  const image = record => { assert.ok(record?.file && hex(record.sha256)); assert.equal(manifest.artifacts[`${unit}/${record.file}`], record.sha256); };
  const gateImage = record => { assert.ok(record?.path && hex(record.sha256)); assert.equal(manifest.artifacts[record.path], record.sha256); };
  if (unit === "build") { assert.ok(manifest.commands.some(command => command.name === "build")); return; }
  if (["concepts", "looks"].includes(unit)) {
    assert.deepEqual(reports.map(report => [report.alternative.id, report.mode]), targets.alternatives.flatMap(alternative => [[alternative.id, "desktop"], [alternative.id, "phone"]]));
    for (const report of reports) {
      assert.equal(report.complete, true); assert.deepEqual(report.alternative, targets.alternatives.find(item => item.id === report.alternative.id)); gateImage(report.entryImage);
      assert.deepEqual(report.rests.map(rest => rest.role), ["opening", "middle", "ending"]);
      for (const rest of report.rests) { assert.equal(rest.id, report.alternative.beats[rest.role]); gateImage(rest.image); }
      assert.deepEqual(report.controls.map(trial => trial.method).sort(), report.alternative.control ? ["keyboard", "pointer"] : []);
      for (const trial of report.controls) { gateImage(trial.beforeImage); gateImage(trial.afterImage); }
    }
    return;
  }
  const report = reports[0]; assert.equal(reports.length, 1);
  if (unit === "auxiliary") { assert.equal(report.complete, true); assert.deepEqual(report.pages.map(page => [page.target.id, page.mode]), targets.auxiliaryPages.flatMap(page => [[page.id, "desktop"], [page.id, "phone"]])); for (const page of report.pages) image(page.target.kind === "download" ? page : page.original); return; }
  const ids = targets.beats.map(beat => beat.id); assert.deepEqual(report.rests.map(rest => rest.beat), ids); for (const rest of report.rests) image(rest);
  assert.ok(Array.isArray(report.wording), "Whole-version visibility evidence is missing");
  assert.deepEqual(report.rawControlCensus.map(row => row.beat), ids); for (const row of report.rawControlCensus) assert.ok(Array.isArray(row.controls));
  if (["desktop", "mobile", "short"].includes(unit)) {
    const intervals = [...ids.slice(0, -1).map((from, i) => ["forward", from, ids[i + 1]]), ...ids.slice(1).toReversed().map((from, i) => ["reverse", from, ids[ids.length - 2 - i]])];
    assert.deepEqual(report.motion.map(row => [row.direction, row.from, row.to]), intervals);
    for (const row of report.motion) { assert.equal(row.frames.length, 3); for (const frame of row.frames) image(frame); }
  }
  if (unit === "reduced-motion") { assert.deepEqual(report.stationary.map(row => row.beat), ids); for (const row of report.stationary) { assert.equal(manifest.artifacts[`${unit}/${row.files[0]}`], row.before); assert.equal(manifest.artifacts[`${unit}/${row.files[1]}`], row.after); } }
  assert.equal(report.controlInventoryComplete, true); assert.ok(unique(report.controlInventory.map(row => row.key))); assert.deepEqual(report.controls.map(row => row.key).sort(), report.controlInventory.map(row => row.key).sort());
  for (const control of report.controls) {
    assert.deepEqual(control.trials.map(trial => trial.method).sort(), ["keyboard", "pointer"]);
    for (const trial of control.trials) {
      if (trial.applicability === "not-applicable") image({ file: imageName(`${control.key}-${trial.method}-unfocused`), sha256: trial.unfocusedImage });
      else for (const when of ["before", "after"]) image({ file: imageName(`${control.key}-${trial.method}-${when}`), sha256: trial[`${when}Image`] });
    }
  }
}
export const restPosition = (box, viewport, maxScroll) => Math.max(0, Math.min(maxScroll, box.top + Math.max(0, box.height - viewport) / 2));
export const activationKey = ({ type, role }) => ["checkbox", "radio"].includes(type) || ["checkbox", "radio", "switch"].includes(role) ? "Space" : "Enter";
export async function buildInventory(workspace, policy) {
  const files = [];
  async function visit(prefix = "") {
    for (const entry of (await readdir(join(workspace, ".next", prefix), { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (!prefix && policy.immutableBuildExclusions.includes(entry.name)) continue;
      assert.ok(!entry.isSymbolicLink(), `Build symlink: ${path}`);
      if (entry.isDirectory()) await visit(path);
      else { assert.ok(entry.isFile()); const bytes = await readFile(join(workspace, ".next", path)); files.push({ path, bytes: bytes.length, sha256: sha(bytes) }); }
    }
  }
  await visit(); assert.ok(files.some(file => file.path === "BUILD_ID"), "Production BUILD_ID is missing");
  return { files, digest: sha(JSON.stringify(files)), exclusions: policy.immutableBuildExclusions };
}
export function assertCoverage(stage, reports, originals, reviewed) {
  assert.deepEqual(reports.map(report => report.unit).sort(), units(stage).sort(), "Missing, duplicate or extra measurement unit");
  for (const report of reports) { assert.equal(report.complete, true); assert.equal(report.sourceUnchanged, true); }
  assert.equal(new Set(originals.map(item => item.path)).size, originals.length);
  assert.equal(new Set(reviewed.map(item => item.path)).size, reviewed.length);
  assert.deepEqual([...reviewed].map(({ path, sha256, bytes, viewMethod }) => { assert.equal(viewMethod, "view_image original"); return { path, sha256, bytes }; }).sort((a, b) => a.path.localeCompare(b.path)), [...originals].sort((a, b) => a.path.localeCompare(b.path)));
}
