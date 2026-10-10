import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readJson } from "../../lib/files.mjs";
import { readSavedJudgement, verifyCohort } from "../../lib/measurement-v2.mjs";

const dir = dirname(fileURLToPath(import.meta.url));
const manifest = await verifyCohort(dir);
assert.equal(manifest.sources.length, 6);
for (const id of manifest.sources) {
  const caseDir = join(dir, "cases", id);
  const person = await readJson(join(caseDir, "person.json"));
  assert.ok(await readSavedJudgement(caseDir, id, person), `${id}: missing judgement`);
  const attempts = await readdir(join(caseDir, "attempts"));
  assert.equal(attempts.length, 1, `${id}: expected exactly one calibration attempt`);
  const result = await readJson(join(caseDir, "attempts", attempts[0], "process.json"));
  assert.equal(result.code, 0, `${id}: failed judge process`);
}
console.log("Verified six v2 judgements, one successful attempt each, frozen inputs and unchanged original run files/reports; no model calls");
