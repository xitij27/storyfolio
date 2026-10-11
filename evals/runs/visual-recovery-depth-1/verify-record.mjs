import { readFile, writeFile, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const study = dirname(fileURLToPath(import.meta.url));
const root = resolve(study, "../../..");
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const git = args => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const readJson = async path => JSON.parse(await readFile(resolve(study, path), "utf8"));
const full = await readJson("evidence/review/manifest.json");
const controls = await readJson("evidence/control-rerun/manifest.json");
const source = await readJson("evidence/review/source-before.json");
const sourceMismatches = [];
for (const file of source.files) {
  const bytes = await readFile(resolve(root, "prototypes/fixture-study", file.path));
  if (sha(bytes) !== file.sha256 || bytes.length !== file.bytes) sourceMismatches.push(file.path);
}
const artifacts = [], artifactMismatches = [];
const reports = {};
for (const [directory, manifest] of [["review", full], ["control-rerun", controls]]) {
  for (const result of manifest.results) {
    const report = await readJson(`evidence/${directory}/${result.report}`);
    reports[`${directory}/${result.name}`] = report;
    for (const capture of report.captures) {
      const path = `evidence/${directory}/${capture.file}`;
      const bytes = await readFile(resolve(study, path));
      artifacts.push(path);
      if (sha(bytes) !== capture.sha256 || bytes.length !== capture.bytes) artifactMismatches.push(path);
    }
  }
}
const protectedPaths = ["skills/storyfolio", "evals/runs/visual-recovery-prototype-1", "evals/runs/codex-build-1", "evals/runs/codex-build-completion-1", "evals/builds/embedded-1", "evals/builds/embedded-completion-1", "prototypes/fixture-study/content/piece.tsx"];
const protectedDiff = git(["diff", "--name-only", "71ae3ea", "--", ...protectedPaths]);
const currentFaces = await readFile(resolve(root, "prototypes/fixture-study/content/faces.ts"), "utf8");
const oldFaces = git(["show", "71ae3ea:prototypes/fixture-study/content/faces.ts"]);
const painters = text => text.slice(text.indexOf("const panels"), text.indexOf("export const faces"));
const samePainters = painters(oldFaces) === painters(currentFaces);
const originalScript = await readFile(resolve(study, "capture-before-board-assertion.mjs"));
const currentScript = await readFile(resolve(study, "capture.mjs"));
const docs = ["docs/handover.md", "docs/README.md", "docs/history/README.md", "docs/history/2026-10-11-prototype-depth-feedback.md", "docs/superpowers/specs/2026-10-11-fixture-story-depth.md", "docs/superpowers/plans/2026-10-11-visual-quality-recovery.md", "evals/studies.md", "prototypes/fixture-study/README.md", "prototypes/fixture-study/docs/story/handover.md", "evals/runs/visual-recovery-depth-1/findings.md", "evals/runs/visual-recovery-depth-1/movement-review.md", "evals/runs/visual-recovery-depth-1/layout-review.md", "evals/runs/visual-recovery-depth-1/fallback-review.md", "evals/runs/visual-recovery-depth-1/phone-review.md"];
const broken = []; let links = 0;
docs.push("docs/superpowers/plans/README.md");
for (const file of docs) {
  const text = await readFile(resolve(root, file), "utf8");
  for (const match of text.matchAll(/\[[^\]\n]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const href = match[1];
    if (/^(?:[a-z]+:|#)/i.test(href)) continue;
    const path = resolve(root, dirname(file), decodeURIComponent(href.split("#")[0]));
    links++;
    if (path === resolve(study, "verification.json")) continue;
    try { await access(path); } catch { broken.push({ file, href }); }
  }
}
const onlyKnownMatcherFailures = full.results.length === 7 && full.results.every(result => JSON.stringify(result.problems) === JSON.stringify(["desktop", "phone"].includes(result.name) ? ["Incorrect accessible description for control 2"] : []));
const desktop = reports["review/desktop"];
const movementCovered = desktop.continuous?.length === 2 && desktop.continuous.every(direction => direction.transitionSamples.length === 4 && direction.transitionSamples.every(sample => sample.files.length > 0));
const focusedScopeMatches = controls.complete && controls.results.length === 2 && controls.results.map(result => result.name).sort().join(",") === "desktop,phone" && controls.results.every(result => result.completed && result.captures === 10 && result.problems.length === 0) && controls.movementRequested === false && controls.movementIncluded === false;
const report = {
  recordedAtUtc: new Date().toISOString(), baseRevision: "71ae3ea", currentHead: git(["rev-parse", "HEAD"]), branch: git(["branch", "--show-current"]),
  preserved: { paths: protectedPaths, changed: protectedDiff, unchanged: protectedDiff === "", fixedSurfacePaintersUnchanged: samePainters },
  checks: { root: { testsPassed: 246, failed: 0, skillWords: 687, references: 4, people: 17 }, prototype: { typecheck: "pass", eslint: "pass", testFileProcessesPassed: 14, build: "pass" }, provenance: "Observed terminal commands in this manual development session; repository Git subprocess tests and production build required approved execution outside the sandbox." },
  fullMatrix: { path: "evidence/review", complete: full.complete, functionalPass: full.functionalPass, sourceUnchanged: full.sourceUnchanged, onlyKnownMatcherFailures, results: full.results },
  matcherCorrection: { originalScriptSha256: sha(originalScript), initialManifestMatch: sha(originalScript) === full.captureScriptSha256, currentScriptSha256: sha(currentScript), rerunManifestMatch: sha(currentScript) === controls.captureScriptSha256, reason: "The old Board sentence matcher rejected new copy that still explicitly credits the colleague's PCB. It now matches that fact across the new wording; no page change was made to satisfy the old sentence." },
  focusedControls: { path: "evidence/control-rerun", complete: controls.complete, functionalPass: controls.functionalPass, sourceUnchanged: controls.sourceUnchanged, results: controls.results, scope: "Desktop and phone repeated all five settled beats and four controls, with movement disabled explicitly. Full four-transition evidence remains in the first unchanged-source capture." },
  source: { files: source.files.length, digest: full.sourceDigest, sameAcrossRuns: full.sourceDigest === controls.sourceDigest, mismatches: sourceMismatches },
  movement: { directions: desktop.continuous?.map(direction => ({ direction: direction.direction, frames: direction.frames.length, transitions: direction.transitionSamples })), allFourTransitionsBothDirections: movementCovered },
  artifactIntegrity: { images: artifacts.length, mismatches: artifactMismatches },
  documentationLinks: { files: docs.length, checked: links, broken, limitation: "Local target existence only; this generated report's own link is resolved by writing it below. Heading anchors are not checked." },
  preview: { url: "http://localhost:3012/", buildId: (await readFile(resolve(root, "prototypes/fixture-study/.next/BUILD_ID"), "utf8")).trim() },
  paidEvaluationInvocations: 0, authorVerdict: "First version looks better, but needs more story depth. Revised five-beat verdict pending.", physicalPhoneReview: "Not confirmed",
  whitespace: { defaultStagedCheck: "Only a new blank line at EOF in capture-before-board-assertion.mjs and capture.mjs; byte-exact evidence is preserved.", boundedCheck: "git -c core.whitespace=-blank-at-eof diff --cached --check", boundedResult: "pass" },
};
report.focusedControls.scopeMatches = focusedScopeMatches;
report.passed = report.branch === "main" && report.preserved.unchanged && samePainters && full.complete && full.sourceUnchanged && onlyKnownMatcherFailures && controls.functionalPass && controls.sourceUnchanged && focusedScopeMatches && report.source.sameAcrossRuns && !sourceMismatches.length && movementCovered && artifacts.length === 96 && !artifactMismatches.length && !broken.length && report.matcherCorrection.initialManifestMatch && report.matcherCorrection.rerunManifestMatch;
await writeFile(resolve(study, "verification.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ passed: report.passed, preserved: report.preserved.unchanged, sourceMismatches, imagesVerified: artifacts.length, artifactMismatches, linksChecked: links, broken, movementCovered, focusedControlsPass: controls.functionalPass }, null, 2));
if (!report.passed) process.exitCode = 1;
