import { isAbsolute, relative, resolve, sep } from "node:path";
import { createHash } from "node:crypto";
import { assessDiagnosticCapture, validateFocusOnlyControls } from "./build-capture.mjs";

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

export function verifyNextRuntime(workspace, local, trusted) {
  const problems = [];
  for (const [label, record] of [["workspace", local], ["trusted", trusted]]) {
    if (!object(record) || record.name !== "next" || !nonempty(record.version) ||
      !nonempty(record.entrypoint) || !isAbsolute(record.entrypoint) ||
      !nonempty(record.packageJson) || !isAbsolute(record.packageJson) ||
      typeof record.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(record.sha256)) problems.push(`${label} Next identity is invalid`);
  }
  if (!problems.length) {
    if (!outsideWorkspace(workspace, trusted.entrypoint) || !outsideWorkspace(workspace, trusted.packageJson)) problems.push("trusted Next must resolve outside the actor workspace");
    if (local.version !== trusted.version) problems.push("workspace Next version differs from the trusted copy");
    if (local.sha256 !== trusted.sha256) problems.push("workspace Next entrypoint differs from the trusted copy");
  }
  return { passed: problems.length === 0, entrypoint: problems.length ? null : local.entrypoint, local, trusted, problems, scope: "Package name/version and CLI entrypoint bytes only; transitive dependency integrity is not established." };
}

export function linkTextMatches(actualText, expectedLink) {
  const label = normalizeText(expectedLink.text);
  const actual = normalizeText(actualText);
  if (!label || !actual.startsWith(label)) return false;
  const suffix = actual.slice(label.length);
  if (/^[\s↗↘↙↖←→↑↓›»]*$/u.test(suffix)) return true;
  // A format label must be visibly separated and agree with the URL's file
  // extension. Arbitrary appended prose, negation and substring matches fail.
  if (!/^\s/.test(suffix)) return false;
  const formats = { html: "HTML", htm: "HTML", pdf: "PDF", svg: "SVG" };
  let url;
  try { url = new URL(expectedLink.href, "https://fixture.invalid/"); }
  catch { return false; }
  if (!["http:", "https:"].includes(url.protocol)) return false;
  const extension = /\.([a-z0-9]+)$/i.exec(url.pathname)?.[1].toLowerCase();
  const format = formats[extension];
  if (!format) return false;
  const tail = suffix.replace(/[\s↗↘↙↖←→↑↓›»]+$/u, "").trim();
  return [format, `(${format})`, `[${format}]`].includes(tail.toUpperCase());
}

export function artifactHashes(entries) {
  const artifacts = {};
  for (const { path, bytes } of [...entries].sort((a, b) => a.path.localeCompare(b.path))) {
    if (!localPath(path) || path.includes("\\")) throw new Error(`Unsafe artifact path: ${path}`);
    if (path === "manifest.json") continue;
    if (Object.hasOwn(artifacts, path)) throw new Error(`Duplicate artifact path: ${path}`);
    artifacts[path] = createHash("sha256").update(bytes).digest("hex");
  }
  return artifacts;
}

export function validateExpectations(value) {
  const problems = [];
  if (!object(value)) return ["expectations must be an object"];
  const diagnostic = value.schemaVersion === 2;
  const keys = ["schemaVersion", "id", "route", "beats", "requiredText", "links", "assets", "requiredFiles", "modes", "viewports", "chapters", "checklist", "contentConstraints", "provenance", ...(diagnostic ? ["taskKind", "focusOnlyControls"] : [])];
  for (const key of Object.keys(value)) if (!keys.includes(key)) problems.push(`unknown expectations key: ${key}`);
  if (value.schemaVersion !== 1 && !(diagnostic && value.taskKind === "prototype-depth")) problems.push("unsupported expectations schemaVersion or taskKind");
  if (!nonempty(value.id)) problems.push("id must be nonempty");
  if (!nonempty(value.route) || !value.route.startsWith("/") || value.route.startsWith("//") || /[\\\0]/.test(value.route)) problems.push("route must be an absolute local URL path");
  if (!Array.isArray(value.beats) || !value.beats.length || !value.beats.every(beat => object(beat) && nonempty(beat.id) && (diagnostic ? [1, 2].includes(beat.headingLevel) && beat.heading === undefined : nonempty(beat.heading)))) problems.push(diagnostic ? "beats must contain fixed IDs and structural headingLevel, not fixed headings" : "beats must contain fixed IDs and headings");
  else if (!unique(value.beats.map(beat => beat.id))) problems.push("beat IDs must be unique");
  if (diagnostic && (!Array.isArray(value.beats) || JSON.stringify(value.beats.map(beat => [beat?.id, beat?.headingLevel])) !== JSON.stringify(["question", "scheduling", "bench", "evidence", "scope"].map((id, index) => [id, index ? 2 : 1])))) problems.push("prototype-depth requires five ordered structural beat headings");
  if (!Array.isArray(value.requiredText) || (!diagnostic && !value.requiredText.length) || !value.requiredText.every(nonempty)) problems.push("requiredText must contain fixed nonempty strings (an empty array is permitted for diagnostic semantic review)");
  if (!Array.isArray(value.links) || (!diagnostic && !value.links.length) || !value.links.every(link => object(link) && nonempty(link.text) && nonempty(link.href) && /^(?:https?:|mailto:|\/|#)/.test(link.href) && !link.href.startsWith("//") && !/[\\\0]/.test(link.href) && (link.keyboardOnly === undefined || typeof link.keyboardOnly === "boolean"))) problems.push("links must contain text, an allowed href and optional keyboardOnly");
  for (const key of ["assets", "requiredFiles"]) if ((key === "assets" || value[key] !== undefined) && (!Array.isArray(value[key]) || !value[key].every(localPath))) problems.push(`${key} must contain workspace-relative paths without traversal`);
  const modeKeys = ["desktop", "mobile", "reducedMotion", "noWebGL", "noJavaScript", ...(diagnostic ? ["short"] : [])];
  if (!object(value.modes) || Object.keys(value.modes).some(key => !modeKeys.includes(key)) || !modeKeys.every(key => ["animated", "static"].includes(value.modes[key]))) problems.push("modes must declare desktop, mobile, reducedMotion, noWebGL and noJavaScript");
  else if (value.modes.noWebGL !== "static" || value.modes.noJavaScript !== "static") problems.push("noWebGL and noJavaScript must require static content");
  if (!object(value.viewports) || !["desktop", "mobile"].every(key => object(value.viewports[key]) && ["width", "height"].every(axis => Number.isInteger(value.viewports[key][axis]) && value.viewports[key][axis] > 0))) problems.push("desktop and mobile viewports must have positive integer dimensions");
  if (diagnostic) {
    problems.push(...validateFocusOnlyControls(value.focusOnlyControls));
    for (const [name, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844], ["short", 1280, 720]]) {
      if (value.viewports?.[name]?.width !== width || value.viewports?.[name]?.height !== height) problems.push(`prototype-depth ${name} viewport must be ${width} by ${height}`);
      if (value.modes?.[name] !== "animated") problems.push(`prototype-depth ${name} must retain the animated object`);
    }
  }
  return problems;
}

export function buildCases(expected) {
  const problems = validateExpectations(expected);
  if (problems.length) throw new Error(problems.join("; "));
  return [
    { id: "desktop", viewport: expected.viewports.desktop, mode: expected.modes.desktop },
    { id: "mobile", viewport: expected.viewports.mobile, mode: expected.modes.mobile, touch: true },
    ...(expected.schemaVersion === 2 ? [{ id: "short", viewport: expected.viewports.short, mode: expected.modes.short }] : []),
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
    if (!actual.some(sample => sample.headings?.some(heading => (expected.schemaVersion === 2 ? heading.level === beat.headingLevel && normalizeText(heading.text).length > 0 : normalizeText(heading.text) === normalizeText(beat.heading)) && heading.visible))) problems.push(`missing visible heading for ${beat.id}: ${expected.schemaVersion === 2 ? `level ${beat.headingLevel}` : beat.heading}`);
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
    if (!observations.some(actual => linkTextMatches(actual.text, link) && actual.href === link.href && actual.visible && actual.inView && actual.tabIndex >= 0 && actual.hitTarget && (!link.keyboardOnly || actual.focused))) problems.push(`link never usable${link.keyboardOnly ? " by keyboard" : ""}: ${link.text} (${link.href})`);
  }
  if (entry.loseContext && !report.contextLoss?.supported) problems.push("WebGL context loss was not exercised");
  for (const pair of report.stationary ?? []) if (pair.before !== pair.after) problems.push(`${pair.beat}: reduced-motion canvas changed while stationary`);
  if (expected.schemaVersion === 2) problems.push(...assessDiagnosticCapture(expected, entry, report));
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
