// Synthetic binding and command contracts. No model, browser or subprocess.
import assert from "node:assert/strict";
import test from "node:test";
import { resolve } from "node:path";
import { assertCandidateBinding, assertSchedule, measurementRecordPath, prefix, root } from "./binding-lib.mjs";
import { applicationPath, assertInstall } from "../../stage-3-completion-2/full-journey-recovery/measurement/app-root.mjs";

function fixture() {
  const restored = { digest: "7104be428d5e26c867e8dbcc3f650a467931135346a54209ec8f3e137a45ceb9",
    files: Array.from({ length: 185 }, (_, index) => ({ path: index < 87 ? `site/file-${index}` : `material/file-${index}` })) };
  return { meta: { cohort: "codex-full-journey-candidate-3", rep: 1 },
    record: { turn: 2, actorResultSha256: "290c39f7aca8ae6e8254e78a6423292f4bf34af233ca2c94f34d09189615fbfe" },
    actor: { turn: 2, complete: true },
    frozen: { digest: "68c2bfd15305eb9b9fcb8114dbe64dd511d9a227627c8865833aad281f95ebeb", hashes: Object.fromEntries(Array.from({ length: 149 }, (_, i) => [`input-${i}`, "a".repeat(64)])) },
    restored, originalSource: structuredClone(restored), extras: [], targets: { stage: 2 } };
}

test("only the actual complete candidate-3 ordinary input/result/full-source checkpoint qualifies", () => {
  assert.doesNotThrow(() => assertCandidateBinding(fixture()));
  for (const mutate of [
    value => { value.meta.cohort = "codex-full-journey-candidate-2"; },
    value => { value.meta.rep = 2; },
    value => { value.record.turn = 4; },
    value => { value.actor.turn = 1; },
    value => { value.actor.complete = false; },
    value => { value.frozen.digest = "b".repeat(64); },
    value => { delete value.frozen.hashes["input-0"]; },
    value => { value.record.actorResultSha256 = "c".repeat(64); },
    value => { value.restored.digest = "d".repeat(64); },
    value => { value.restored.files.pop(); },
    value => { value.restored.files[0].path = "outside-site/file-0"; },
    value => { value.originalSource.files.push({ path: "unknown/payload" }); },
    value => { value.extras.push({ path: "site/omitted.tsx" }); },
    value => { value.targets.stage = 4; },
    value => { value.targets.draft = true; },
  ]) { const value = fixture(); mutate(value); assert.throws(() => assertCandidateBinding(value)); }
});

test("the schedule is the full exact ordered discovery, with both viewports once", () => {
  for (const count of [3, 9, 12]) {
    const targets = { alternatives: Array.from({ length: count }, (_, i) => ({ id: `actual-${i}` })) };
    const schedule = targets.alternatives.map((item, index) => ({ id: index + 1, alternativeId: item.id, modes: ["desktop", "phone"] }));
    assert.doesNotThrow(() => assertSchedule(schedule, targets));
    for (const change of [
      rows => rows.slice(1), rows => [...rows].reverse(), rows => [...rows, rows[0]],
      rows => rows.map((row, i) => i ? row : { ...row, id: 0 }),
      rows => rows.map((row, i) => i ? row : { ...row, alternativeId: "invented" }),
      rows => rows.map((row, i) => i ? row : { ...row, modes: ["desktop"] }),
      rows => rows.map((row, i) => i ? row : { ...row, modes: ["phone", "desktop"] }),
    ]) assert.throws(() => assertSchedule(change(schedule), targets));
    assert.throws(() => assertSchedule(schedule, { alternatives: [targets.alternatives[0]] }));
  }
  assert.throws(() => assertSchedule([], { alternatives: [] }));
  assert.throws(() => assertSchedule([], { alternatives: [{ id: "same" }, { id: "same" }] }));
});

test("existing nested-app guard keeps containment and exact offline-install cwd", () => {
  assert.equal(applicationPath("site"), "site");
  for (const path of ["../site", "/site", "site/../app", "site\\app", "site//app", ""]) assert.throws(() => applicationPath(path));
  const contract = { executable: "npm", args: ["ci", "--offline", "--cache=/tmp/storyfolio-npm-cache"], environment: { PATH: "/native", NEXT_TELEMETRY_DISABLED: null } };
  const command = { ...structuredClone(contract), cwd: "/whole/source/site" };
  assert.doesNotThrow(() => assertInstall(command, "/whole/source/site", contract));
  for (const change of [{ cwd: "/whole/source" }, { executable: "npx" }, { args: ["install"] }, { environment: { PATH: "/unbound" } }]) assert.throws(() => assertInstall({ ...command, ...change }, "/whole/source/site", contract));
});

test("actual study record path is admitted without a doubled separator, escapes are rejected", () => {
  const actual = resolve(root, prefix, "concept-measurement.json");
  assert.equal(measurementRecordPath(actual), actual);
  for (const path of [resolve(root, prefix), resolve(root, prefix, "../outside.json"), resolve(root, prefix.slice(0, -1) + "-other/record.json"), "/tmp/record.json", undefined]) assert.throws(() => measurementRecordPath(path));
});
