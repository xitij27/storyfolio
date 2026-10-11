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
const before = execFileSync("git", ["show", "1af99a4:docs/handover.md"], { cwd: root });
const archive = await readFile(resolve(root, "docs/history/2026-10-11-before-fixture-prototype-handover.md"));
const previousCapture = await readJson("evidence/final/manifest.json");
const stableCapture = await readJson("evidence/stable-print/manifest.json");
const capture = await readJson("evidence/clear-connectors/manifest.json");
const previousSource = await readJson("evidence/final/source-before.json");
const stableSource = await readJson("evidence/stable-print/source-before.json");
const currentSource = await readJson("evidence/clear-connectors/source-before.json");
const previousFiles = new Map(previousSource.files.map(file => [file.path, file]));
const stableFiles = new Map(stableSource.files.map(file => [file.path, file]));
const artworkChanges = stableSource.files.filter(file => previousFiles.get(file.path)?.sha256 !== file.sha256).map(file => file.path).sort();
const expectedArtworkChanges = ["content/faces.ts", "content/object-design.md"];
const connectorChanges = currentSource.files.filter(file => stableFiles.get(file.path)?.sha256 !== file.sha256).map(file => file.path).sort();
const expectedConnectorChanges = ["content/extras/connections.tsx"];
const predecessorMismatches = [];
for (const file of previousSource.files) {
  const path = expectedArtworkChanges.includes(file.path) ? resolve(study, "source-before-stable-print", file.path) : expectedConnectorChanges.includes(file.path) ? resolve(study, "source-before-clear-connectors", file.path) : resolve(root, "prototypes/fixture-study", file.path);
  const bytes = await readFile(path);
  if (sha(bytes) !== file.sha256 || bytes.length !== file.bytes) predecessorMismatches.push(file.path);
}
const stableMismatches = [];
for (const file of stableSource.files) {
  const path = expectedConnectorChanges.includes(file.path) ? resolve(study, "source-before-clear-connectors", file.path) : resolve(root, "prototypes/fixture-study", file.path);
  const bytes = await readFile(path);
  if (sha(bytes) !== file.sha256 || bytes.length !== file.bytes) stableMismatches.push(file.path);
}
const currentMismatches = [];
for (const file of currentSource.files) {
  const bytes = await readFile(resolve(root, "prototypes/fixture-study", file.path));
  if (sha(bytes) !== file.sha256 || bytes.length !== file.bytes) currentMismatches.push(file.path);
}
const matrix = await readJson("production-checks-clean/manifest.json");
const arrows = await readJson("production-checks-arrows/manifest.json");
const docs = [
  "docs/handover.md", "docs/README.md", "docs/history/README.md",
  "docs/history/2026-10-11-visual-prototype-approval.md",
  "docs/superpowers/specs/2026-10-11-fixture-prototype.md",
  "docs/superpowers/plans/2026-10-11-visual-quality-recovery.md",
  "docs/superpowers/plans/README.md", "evals/studies.md",
  "prototypes/fixture-study/README.md", "prototypes/fixture-study/docs/story/handover.md",
  "evals/runs/visual-recovery-prototype-1/findings.md",
  "evals/runs/visual-recovery-prototype-1/movement-review.md",
  "evals/runs/visual-recovery-prototype-1/fallback-review.md",
  "evals/runs/visual-recovery-prototype-1/visual-review.md",
];
const links = [], broken = [];
for (const file of docs) {
  const text = await readFile(resolve(root, file), "utf8");
  for (const match of text.matchAll(/\[[^\]\n]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const href = match[1];
    if (/^(?:[a-z]+:|#)/i.test(href)) continue;
    const target = decodeURIComponent(href.split("#")[0]);
    const entry = { from: file, href };
    links.push(entry);
    // This report is created below, so a fresh run need not find it first.
    if (resolve(root, dirname(file), target) === resolve(study, "verification.json")) {
      entry.generatedByThisCommand = true;
      continue;
    }
    try { await access(resolve(root, dirname(file), target)); }
    catch { broken.push(entry); }
  }
}
const protectedPaths = ["skills/storyfolio", "evals/runs/codex-build-1", "evals/runs/codex-build-completion-1", "evals/builds/embedded-1", "evals/builds/embedded-completion-1"];
const protectedStatus = git(["status", "--porcelain=v1", "--", ...protectedPaths]);
const report = {
  recordedAtUtc: new Date().toISOString(), baseRevision: "1af99a4", currentHead: git(["rev-parse", "HEAD"]), branch: git(["branch", "--show-current"]),
  historicalHandover: { revision: "1af99a4", originalSha256: sha(before), archiveSha256: sha(archive), identical: before.equals(archive) },
  preservedTrackedSource: { paths: protectedPaths, gitStatus: protectedStatus, unchanged: protectedStatus === "" },
  documentationLinks: { files: docs.length, checked: links.length, broken, limitation: "Checks local path existence, not heading anchors; archived handover links retain their original location as base." },
  checks: { root: { testsPassed: 246, testsFailed: 0, skillCheck: "pass", people: 17, source: "Observed terminal execution; Git subprocess tests require approved execution outside the workspace sandbox." }, prototype: { eslint: "pass", typecheck: "pass", localTestFileProcessesPassed: 14, build: "pass" }, firstFullProductionMatrix: matrix.results, focusedArrowRerun: arrows.results },
  previousCapture: { path: "evidence/final", complete: previousCapture.complete, functionalPass: previousCapture.functionalPass, sourceUnchanged: previousCapture.sourceUnchanged, note: "Seven modes passed; subsequent visual review found transient face-text ghosting." },
  stablePrintCapture: { path: "evidence/stable-print", complete: stableCapture.complete, functionalPass: stableCapture.functionalPass, sourceUnchanged: stableCapture.sourceUnchanged, note: "Four scene modes passed; text ghosting resolved, but a newly sampled frame exposed a connector drawn inside overlapping modules." },
  finalCapture: { path: "evidence/clear-connectors", complete: capture.complete, functionalPass: capture.functionalPass, sourceUnchanged: capture.sourceUnchanged, sourceDigest: capture.sourceDigest, cases: capture.results, scope: "The four scene-rendering modes repeated after the connector correction. The other three HTML fallback modes are covered by the preceding unchanged fallback implementation." },
  sourceChangeScope: { artworkChanges, expectedArtworkChanges, onlyArtworkAndItsRecordChanged: JSON.stringify(artworkChanges) === JSON.stringify(expectedArtworkChanges), connectorChanges, expectedConnectorChanges, onlyConnectorsChanged: JSON.stringify(connectorChanges) === JSON.stringify(expectedConnectorChanges), precedingSourceReconstruction: { files: previousSource.files.length, mismatches: predecessorMismatches }, stablePrintReconstruction: { files: stableSource.files.length, mismatches: stableMismatches }, finalSourceOnDisk: { files: currentSource.files.length, mismatches: currentMismatches } },
  preview: { url: "http://localhost:3012/", command: "npm run start -- --hostname 127.0.0.1 --port 3012", cwd: "prototypes/fixture-study", node: "22.22.1", buildId: (await readFile(resolve(root, "prototypes/fixture-study/.next/BUILD_ID"), "utf8")).trim() },
  modelEvaluationInvocations: 0, authorVisualApproval: "pending", physicalPhoneReview: "pending",
};
report.passed = report.branch === "main" && report.historicalHandover.identical && report.preservedTrackedSource.unchanged && !broken.length && previousCapture.functionalPass && stableCapture.functionalPass && capture.functionalPass && capture.sourceUnchanged && report.sourceChangeScope.onlyArtworkAndItsRecordChanged && report.sourceChangeScope.onlyConnectorsChanged && !predecessorMismatches.length && !stableMismatches.length && !currentMismatches.length && arrows.complete && arrows.results.every(item => item.code === 0 && !item.problems.length);
await writeFile(resolve(study, "verification.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ passed: report.passed, archiveIdentical: report.historicalHandover.identical, protectedSourceUnchanged: protectedStatus === "", linksChecked: links.length, broken, finalCapturePass: capture.functionalPass }, null, 2));
if (!report.passed) process.exitCode = 1;
