// No writes or model calls. Checks this preparation's retained boundaries.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
const git = (...args) => execFileSync("git", args, { encoding: "utf8" });
const sourceCommit = "75d1f35288b951ca2f301aec1a4b3e90bf6af7ab";
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const protectedPaths = [
  "skills/storyfolio", "prototypes/fixture-study", "evals/builds/embedded-1",
  "evals/builds/embedded-completion-1", "evals/runs/codex-build-1",
  "evals/runs/codex-build-completion-1", "evals/runs/visual-recovery-prototype-1",
  "evals/runs/visual-recovery-depth-1",
];
const preserved = protectedPaths.map(path => {
  const changed = git("diff", "--name-only", sourceCommit, "--", path).trim();
  const extra = git("ls-files", "--others", "--exclude-standard", "--", path).trim();
  assert.equal(changed, "", `Protected files changed: ${path}`);
  assert.equal(extra, "", `New files in protected evidence: ${path}`);
  return { path, unchangedFrom: sourceCommit, gitTree: git("rev-parse", `${sourceCommit}:${path}`).trim() };
});
const archive = "docs/history/2026-10-11-before-build-preparation-handover.md";
const prior = git("show", `${sourceCommit}:docs/handover.md`);
assert.equal(readFileSync(archive, "utf8"), prior);
const files = [...new Set([...git("diff", "--name-only", sourceCommit).trim().split("\n"), ...git("ls-files", "--others", "--exclude-standard").trim().split("\n")])].filter(Boolean);
let links = 0;
const missing = [];
for (const file of files.filter(path => /\.(?:mjs|md|json|svg)$/.test(path))) {
  const source = readFileSync(file, "utf8");
  if (file !== archive) assert(!source.includes("\u2014"), `Em dash: ${file}`);
  // Verbatim archived documents keep their original relative links by rule.
  if (!file.endsWith(".md") || file === archive) continue;
  for (const match of source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0];
    if (!target || /^[a-z]+:/i.test(target) || target.startsWith("/")) continue;
    links++;
    if (!existsSync(resolve(dirname(file), target))) missing.push({ file, target });
  }
}
assert.deepEqual(missing, [], "Missing local documentation targets");
const reserved = "evals/runs/codex-bench-depth-baseline-1";
assert(!existsSync(reserved), "Reserved baseline must remain unprepared at this checkpoint");
console.log(JSON.stringify({ schemaVersion: 1, sourceCommit, preserved,
  handoverArchive: { path: archive, sha256: sha(prior), exactBytesPreserved: true },
  localLinksChecked: links, missingTargets: missing, changedTextWithoutEmDashes: true,
  reservedBaseline: { path: reserved, exists: false },
  limitations: "Checks file preservation and link target existence, not heading anchors, image quality, actor isolation or launch readiness. Ignored/generated files are not covered by Git preservation checks.",
}, null, 2));
