import { isAbsolute, relative, resolve, sep } from "node:path";

// Text nodes split by inline emphasis can introduce a separator before punctuation.
export const normalizeText = value => String(value ?? "").replace(/\s+/g, " ").replace(/\s+([.,;:!?])/g, "$1").trim();

export function outsideWorkspace(workspace, candidate) {
  const rel = relative(resolve(workspace), resolve(candidate));
  return rel === ".." || rel.startsWith(`..${sep}`) || isAbsolute(rel);
}

const object = value => value !== null && typeof value === "object" && !Array.isArray(value);
const nonempty = value => typeof value === "string" && value.trim().length > 0;
const localPath = value => nonempty(value) && !isAbsolute(value) && !value.split(/[\\/]/).includes("..") && !value.includes("\0");
const unique = values => new Set(values).size === values.length;

export function validateExpectations(value) {
  const problems = [];
  if (!object(value)) return ["expectations must be an object"];
  const keys = ["schemaVersion", "id", "route", "beats", "requiredText", "links", "assets", "requiredFiles", "modes", "viewports", "chapters", "checklist", "contentConstraints", "provenance"];
  for (const key of Object.keys(value)) if (!keys.includes(key)) problems.push(`unknown expectations key: ${key}`);
  if (value.schemaVersion !== 1) problems.push("unsupported expectations schemaVersion");
  if (!nonempty(value.id)) problems.push("id must be nonempty");
  if (!nonempty(value.route) || !value.route.startsWith("/") || value.route.startsWith("//") || /[\\\0]/.test(value.route)) problems.push("route must be an absolute local URL path");
  if (!Array.isArray(value.beats) || !value.beats.length || !value.beats.every(beat => object(beat) && nonempty(beat.id) && nonempty(beat.heading))) problems.push("beats must contain fixed IDs and headings");
  else if (!unique(value.beats.map(beat => beat.id))) problems.push("beat IDs must be unique");
  if (!Array.isArray(value.requiredText) || !value.requiredText.length || !value.requiredText.every(nonempty)) problems.push("requiredText must contain fixed nonempty strings");
  if (!Array.isArray(value.links) || !value.links.length || !value.links.every(link => object(link) && nonempty(link.text) && nonempty(link.href) && /^(?:https?:|mailto:|\/|#)/.test(link.href) && !link.href.startsWith("//") && !/[\\\0]/.test(link.href) && (link.keyboardOnly === undefined || typeof link.keyboardOnly === "boolean"))) problems.push("links must contain text, an allowed href and optional keyboardOnly");
  for (const key of ["assets", "requiredFiles"]) if ((key === "assets" || value[key] !== undefined) && (!Array.isArray(value[key]) || !value[key].every(localPath))) problems.push(`${key} must contain workspace-relative paths without traversal`);
  const modeKeys = ["desktop", "mobile", "reducedMotion", "noWebGL", "noJavaScript"];
  if (!object(value.modes) || Object.keys(value.modes).some(key => !modeKeys.includes(key)) || !modeKeys.every(key => ["animated", "static"].includes(value.modes[key]))) problems.push("modes must declare desktop, mobile, reducedMotion, noWebGL and noJavaScript");
  else if (value.modes.noWebGL !== "static" || value.modes.noJavaScript !== "static") problems.push("noWebGL and noJavaScript must require static content");
  if (!object(value.viewports) || !["desktop", "mobile"].every(key => object(value.viewports[key]) && ["width", "height"].every(axis => Number.isInteger(value.viewports[key][axis]) && value.viewports[key][axis] > 0))) problems.push("desktop and mobile viewports must have positive integer dimensions");
  return problems;
}

export function buildCases(expected) {
  const problems = validateExpectations(expected);
  if (problems.length) throw new Error(problems.join("; "));
  return [
    { id: "desktop", viewport: expected.viewports.desktop, mode: expected.modes.desktop },
    { id: "mobile", viewport: expected.viewports.mobile, mode: expected.modes.mobile, touch: true },
    { id: "reduced-motion", viewport: expected.viewports.desktop, mode: expected.modes.reducedMotion, reducedMotion: true },
    { id: "no-webgl", viewport: expected.viewports.desktop, mode: "static", noWebGL: true },
    { id: "no-javascript", viewport: expected.viewports.mobile, mode: "static", noJavaScript: true, touch: true },
    ...(expected.modes.desktop === "animated" ? [{ id: "context-loss", viewport: expected.viewports.desktop, mode: "static", loseContext: true }] : []),
  ];
}

// Only coordinator-selected dependency entrypoints are executable commands.
// package.json scripts and workspace checker files do not participate.
export function fixedCommands(paths) {
  return [
    { id: "typegen", args: [paths.next, "typegen"] },
    { id: "typecheck", args: [paths.typescript, "--project", paths.typescriptConfig, "--noEmit", "--incremental", "false"] },
    { id: "lint", args: [paths.eslint, "--no-config-lookup", "--config", paths.eslintConfig, "."] },
    { id: "build", args: [paths.next, "build"] },
  ];
}

// Frozen engine timeline contract. This does not import the mutable actor's
// timeline or checker. Geometry is observed, while the 0.4 travel share is
// the independently fixed engine behavior being exercised.
export function scrollSamples(boxes, viewport, mode) {
  let arrived = boxes[0]?.top ?? 0;
  return boxes.map(box => {
    const start = mode === "animated" ? arrived : box.top;
    const end = Math.max(start, box.top + box.height - viewport);
    arrived = end + viewport * 0.4;
    return { id: box.id, start, mid: (start + end) / 2, end };
  });
}

export function assessObservation(expected, entry, report) {
  const problems = [];
  const expectedIds = expected.beats.map(beat => beat.id);
  if (JSON.stringify(report.beatIds) !== JSON.stringify(expectedIds)) problems.push(`beat IDs/order differ: expected ${expectedIds.join(", ")}; found ${(report.beatIds ?? []).join(", ")}`);
  if (report.h1 !== 1) problems.push(`expected one h1, found ${report.h1}`);
  if (!report.lang) problems.push("document language is missing");
  if (report.duplicateIds?.length) problems.push(`duplicate HTML IDs: ${report.duplicateIds.join(", ")}`);
  const samples = report.samples ?? [];
  if (!samples.length) problems.push("no page samples were collected");
  for (const beat of expected.beats) {
    const actual = samples.filter(sample => sample.beat === beat.id);
    if (!actual.length) problems.push(`no sample for ${beat.id}`);
    if (!actual.some(sample => sample.headings?.some(heading => normalizeText(heading.text) === normalizeText(beat.heading) && heading.visible))) problems.push(`missing visible heading for ${beat.id}: ${beat.heading}`);
  }
  for (const sample of samples) {
    const scene = entry.mode === "animated" ? "on" : "off";
    if (sample.scene !== scene) problems.push(`${sample.beat ?? "top"}/${sample.position}: expected scene ${scene}, found ${sample.scene}`);
    if (!Number.isInteger(sample.visibleCanvases) || sample.visibleCanvases < 0) problems.push(`${sample.beat ?? "top"}/${sample.position}: missing canvas observation`);
    if (entry.mode === "animated" && !(sample.visibleCanvases >= 1)) problems.push(`${sample.beat ?? "top"}/${sample.position}: animated scene has no visible canvas`);
    if (entry.mode === "static" && sample.visibleCanvases > 0) problems.push(`${sample.beat ?? "top"}/${sample.position}: static mode still shows a canvas`);
    if (sample.overflowX) problems.push(`${sample.beat ?? "top"}/${sample.position}: horizontal overflow`);
  }
  for (const text of expected.requiredText) if (!samples.some(sample => normalizeText(sample.visibleText).includes(normalizeText(text)))) problems.push(`required wording never visibly observed: ${text}`);
  for (const link of expected.links) {
    const observations = link.keyboardOnly ? report.keyboardLinks ?? [] : samples.flatMap(sample => sample.links ?? []);
    if (!observations.some(actual => normalizeText(actual.text) === normalizeText(link.text) && actual.href === link.href && actual.visible && actual.inView && actual.tabIndex >= 0 && actual.hitTarget && (!link.keyboardOnly || actual.focused))) problems.push(`link never usable${link.keyboardOnly ? " by keyboard" : ""}: ${link.text} (${link.href})`);
  }
  if (entry.loseContext && !report.contextLoss?.supported) problems.push("WebGL context loss was not exercised");
  for (const pair of report.stationary ?? []) if (pair.before !== pair.after) problems.push(`${pair.beat}: reduced-motion canvas changed while stationary`);
  problems.push(...(report.errors ?? []));
  return [...new Set(problems)];
}

export function requestFailureReason(record, entry, pageUrl) {
  if (!entry.noJavaScript || !["net::ERR_BLOCKED_BY_CSP", "csp"].includes(record.failure) || record.resourceType !== "script") return null;
  const url = new URL(record.url);
  const page = new URL(pageUrl);
  return url.origin === page.origin && /^\/_next\/static\/chunks\/[^?#]+\.js$/.test(url.pathname)
    ? "Chromium blocks Next script preloads with JavaScript disabled" : null;
}
