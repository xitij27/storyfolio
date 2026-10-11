// Inventory only. Pixel observations are manual in visual-calibration.md.
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
const accepted = "evals/runs/visual-recovery-depth-1/evidence/review";
const rejected = "evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/acceptance/result";
const images = [
  ...["opening.assembly", "power.cycle", "middle.relationship", "proof.boundaries", "close.evidence"].map(id => `${accepted}/desktop/${id}.png`),
  `${accepted}/phone/middle.relationship.png`,
  ...["movement-forward-06", "movement-forward-07", "movement-reverse-07", "movement-reverse-08"].map(id => `${accepted}/desktop/${id}.jpg`),
  `${accepted}/reduced/proof.boundaries.png`, `${accepted}/context-loss/middle.relationship.png`,
  ...["00-scope.opening", "02-state.table", "04-observation.fixture", "05-observation.evidence", "06-review.close"].map(id => `${rejected}/desktop/${id}-mid.png`),
  `${rejected}/mobile/02-state.table-mid.png`,
  `${rejected}/reduced-motion/05-observation.evidence-mid.png`,
  `${rejected}/no-webgl/04-observation.fixture-mid.png`,
];
const record = path => {
  const bytes = readFileSync(path);
  return { path, bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") };
};
console.log(JSON.stringify({ schemaVersion: 1,
  kind: "known-positive-negative-manual-calibration", imageCount: images.length,
  originalsReviewedIndividually: images.map(record),
  supportingRecords: [...new Set(images.map(path => path.slice(0, path.lastIndexOf("/")) + "/report.json")),
    `${accepted}/manifest.json`, `${accepted}/source-before.json`, `${accepted}/source-after.json`, `${rejected}/manifest.json`,
    "evals/runs/visual-recovery-depth-1/verification.json"].map(record),
  limitations: "Unblinded known examples; sampled originals, not all images or every frame. Different stories and contracts. No five-beat numeric checker was applied to the seven-beat rejected site. No new runtime or physical-phone test.",
}, null, 2));
