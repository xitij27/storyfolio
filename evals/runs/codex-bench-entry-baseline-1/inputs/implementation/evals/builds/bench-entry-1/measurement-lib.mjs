import { createHash } from "node:crypto";
export const sha = bytes => createHash("sha256").update(bytes).digest("hex");
export const json = value => JSON.stringify(value, null, 2) + "\n";
export const ENVELOPE = Object.freeze({ timeoutMs: 895000, graceMs: 5000, totalCapMs: 900000 });
export function localRoute(route) {
  if (typeof route !== "string" || !route.startsWith("/") || route.startsWith("//") || route.includes("\\")) return false;
  try { return new URL(route, "http://127.0.0.1").origin === "http://127.0.0.1"; } catch { return false; }
}
export function validateTargets(targets, expected) {
  const problems = [];
  if (targets.schemaVersion !== 1 || targets.measurement !== "natural-entry-spine") problems.push("wrong observed-target schema");
  if (!/^[a-f0-9]{64}$/.test(targets.sourceDigest ?? "")) problems.push("missing source digest");
  if (!/^[a-f0-9]{64}$/.test(targets.actorResultSha256 ?? "")) problems.push("missing actor result binding");
  if (!targets.discovery?.allAdvertisedLooksRecorded || !targets.discovery?.reviewer || !Array.isArray(targets.discovery?.sources) || !targets.discovery.sources.length) problems.push("missing exhaustive public-source discovery attestation");
  for (const record of Array.isArray(targets.discovery?.sources) ? targets.discovery.sources : []) if (typeof record.path !== "string" || record.path.startsWith("/") || record.path.split(/[\\/]/).includes("..") || !/^[a-f0-9]{64}$/.test(record.sha256 ?? "")) problems.push("invalid discovery source binding");
  if (!["implemented-output", "refusal-no-output", "planning-only", "unchanged-starter", "no-runnable-output", "genuine-unresolved-question"].includes(targets.eligibility?.disposition)) problems.push("missing declared eligibility disposition");
  if (!targets.eligibility?.rationale) problems.push("eligibility rationale required");
  if (targets.eligibility?.authoredApplication !== (targets.eligibility?.disposition === "implemented-output")) problems.push("authored applications must attempt measurement; skip requires explicit no-implementation attestation");
  if (!Array.isArray(targets.looks)) problems.push("observed looks must be an array");
  const ids = new Set();
  for (const look of Array.isArray(targets.looks) ? targets.looks : []) {
    if (typeof look.id !== "string" || !look.id.trim() || ids.has(look.id)) problems.push("duplicate or empty observed look identity"); ids.add(look.id);
    if (!localRoute(look.route)) problems.push("look route must be local");
    if (typeof look.advertised !== "boolean") problems.push("look must distinguish advertised choice from default-only observation");
    if (look.control !== null && (typeof look.control?.selector !== "string" || !look.control.selector || typeof look.control?.name !== "string" || !look.control.name)) problems.push("invalid observed control");
    if (look.control && !localRoute(look.control.fromRoute)) problems.push("control origin route must be local");
    if (look.control?.prepareControl && (!look.control.prepareControl.selector || !look.control.prepareControl.name || look.control.prepareControl.selector === look.control.selector)) problems.push("alternate preparation must name a different real control");
  }
  if (targets.eligibility?.disposition === "implemented-output" && !targets.looks?.length) problems.push("implemented output needs at least default route observation");
  for (const role of ["opening", "middle", "ending"]) if (targets.beats?.[role] !== null && typeof targets.beats?.[role] !== "string") problems.push(`invalid ${role} DOM observation`);
  const beats = Object.values(targets.beats ?? {}).filter(value => value !== null);
  if (new Set(beats).size !== beats.length) problems.push("spine positions must be distinct observed beats");
  if (!expected.approvedMiddleMeanings.includes(targets.middleMeaning) && targets.middleMeaning !== null) problems.push("middle meaning outside frozen approval");
  return [...new Set(problems)];
}
export function eligibility(targets) {
  return { captureUseful: targets.eligibility.disposition === "implemented-output", disposition: targets.eligibility.disposition, rationale: targets.eligibility.rationale, success: false, note: "Eligibility is a source/conversation observation, never a runnable or look-gate pass." };
}
export function observationProblems(targets, expected) {
  const problems = [];
  const choices = targets.looks.filter(look => look.advertised).length;
  if (choices < expected.lookChoiceCount.min || choices > expected.lookChoiceCount.max) problems.push(`advertised look count ${choices}, expected two or three`);
  for (const role of ["opening", "middle", "ending"]) if (!targets.beats[role]) problems.push(`missing implemented ${role} target`);
  if (!targets.middleMeaning) problems.push("approved middle meaning not established");
  return problems;
}
// Uses the existing engine's [data-beat] boxes, not a new actor DOM contract.
export function restPosition(box, viewport, maxScroll) {
  return Math.max(0, Math.min(maxScroll, box.top + Math.max(0, box.height - viewport) / 2));
}
export const activationKey = ({ type, role }) => ["checkbox", "radio"].includes(type) || ["checkbox", "radio", "switch"].includes(role) ? "Space" : "Enter";
