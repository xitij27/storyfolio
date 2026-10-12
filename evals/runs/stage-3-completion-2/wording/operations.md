# Existing runner and setup reuse

Read-only source review, 12 October 2026. These are prospective commands
for root, not executed launches. No new runner or duplicate fixture is
needed. The hashes of the runner versions inspected here are in
[baseline-evidence.json](baseline-evidence.json); compare the actual new
freeze before relying on them.

Proposed fresh cohort: `codex-build-wording-candidate-1`. The existing case
is `evals/builds/embedded-completion-1/case.json`, `setupMode: existing-site`,
`requestedStops: [5, 6]`, `refusalTurns: [1, 2]`. Output remains under the
runner's conventional `embedded-completion-1/baseline-1` subdirectory even
though the cohort is a skill candidate. Do not resume the old cohort.

## Preparation without answer hints

1. Root commits the candidate after the required local checks. Preserve
   the 97 current fixture files and the two actor prompt hashes listed in
   the evidence record. Do not patch inherited actor notes, the case,
   storyboard, core wording, expectation file or old rubric to teach the
   desired answer. Record the historical coordinator-protocol difference
   and every other new input difference explicitly.
2. Reuse the established native Node and capability environment, with a
   fresh retained TMPDIR. Restore the exact PATH, browser-cache, library
   and language values root intends to freeze before both prepare and
   actor invocations. Do not silently inherit an install-only telemetry
   variance. The runtime must supply the same recorded Node/CLI identity
   when preparing and executing this new cohort.
3. Use the existing `--dry` and `--prepare` modes below. Existing-site mode
   copies the declared source plus the frozen skill; it does not scaffold
   over the site. The pre-scaffold inventory must be empty beforehand and
   equal the 97 fixture files plus the actual frozen skill inventory after
   copying. Do not assume the old 183-file total if the skill gained files.
4. Install from the supplied lock with the existing offline cache, saving
   full command, stdout, stderr, process closure and source-before/after
   records under the new setup. Keep dependencies separate from the trusted
   coordinator installation. Run only the separately approved local
   capability proof, using the frozen `evals/probe-build-environment.mjs`
   and actor configuration. The old completion setup driver illustrates
   the mechanics but is historical and cannot be copied over old outputs.
5. Save fresh neutral environment facts, the passing `setup/probe.json`
   bindings and evidence hashes. Facts may identify existing-site setup,
   dependency installation, native runtime, local browser capability and
   configuration limits. Do not mention whole-beat options, expected counts,
   the desired copy gate, historical answers or grading in actor-visible
   setup. Starter/probe images are not this actor's review.

The runner requires `setup/result.json.complete === true`. Before any paid
turn, `setup/probe.json` must have `schemaVersion: 1`, `passed: true`, the
exact input digest, frozen `capabilities.json` SHA-256, exact workspace path,
and a nonempty `evidence` array of existing regular files beneath setup.
The runner checks that those files exist; root's setup audit must separately
bind their bytes and validate the observations. Reuse the established
no-overwrite coordinator recording mechanism for new evidence only.

The intended command forms, after restoring the recorded environment, are:

```bash
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node evals/codex-build-run.mjs \
  --case evals/builds/embedded-completion-1/case.json \
  --cohort codex-build-wording-candidate-1 \
  --capabilities evals/builds/local-capabilities.json --dry

/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node evals/codex-build-run.mjs \
  --case evals/builds/embedded-completion-1/case.json \
  --cohort codex-build-wording-candidate-1 \
  --capabilities evals/builds/local-capabilities.json --prepare
```

`--dry` here only inspects prospective inputs. It is not a paid-agent
simulation and does not validate the later semantic choice gate. Root must
also check the new cohort name is unused and retain all generated records.

## First paid turn

Only after root's setup/freeze review and explicit launch disposition:

```bash
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node evals/codex-build-run.mjs \
  --case evals/builds/embedded-completion-1/case.json \
  --cohort codex-build-wording-candidate-1 \
  --capabilities evals/builds/local-capabilities.json --turn 1
```

This sends the unchanged `evals/prompts/build-completion-turn1.md`, not a
new hint. It explicitly selects Bench paper and requests the remaining
chapters and a copy-choice stop. Its old planning-only override remains
historical prompt wording; it is not ordinary-entry coverage. Root owns
terminal polling. No coordinator tests or builds should overlap the live
actor. The deadline is 900,000 ms, with process-group termination/grace
recorded by the existing runner; a wall limit is not a hard monetary cap.

## Exact turn-2 gate, including what the runner does not check

The reviewed `planTurn` in `evals/lib/build.mjs`, lines 236-268, requires:

- Exactly one previous turn and no failed/incomplete previous result.
- Safe nonnegative integer `durationMs`, `input_tokens`, `output_tokens`
  and `cached_input_tokens`, with cached input no greater than input.
- Elapsed actor time strictly below 1,500,000 ms.
- Reported input plus output strictly below 12,000,000 tokens.
- Input minus cached input plus output strictly below 350,000 tokens.
- A previous resumable session ID.
- `gate.afterTurn === 1`, `gate.advance === true`,
  `gate.previousTurnDigest === SHA256(exact turns/01/result.json bytes)`
  and a nonblank string `gate.observation`.

Reaching a threshold exactly blocks advancement. The effective second-turn
deadline is `min(900000, 1500000 - turn1.durationMs)`. Usage is conservatively
summed from reported counters, which can overlap on resume; thresholds are
between-turn checks and can be exceeded during an already authorized turn.
Null or unreliable usage cannot be treated as zero to open the gate.

`readTurnHistory` rechecks saved artifact hashes and requires the original
stream, reply and process artifacts. `executeBuildTurn` verifies frozen
inputs and case identity and saves the actual gate, prompt and before/after
snapshot. It does **not** automatically compare current workspace source
with turn 1's final source before resuming, nor judge whether the displayed
options are complete or factual. Root must do both checks separately.

Before making an advance gate, root must:

1. Retain settled outer/inner process records, a successful final event and
   the exact turn-1 result/artifact hashes. Reconcile any status discrepancy.
2. Verify all retained snapshot file hashes/sizes against live source, check
   complete applicable source inventory and investigate unexpected paths.
   Do not delete Git metadata or silently ignore a mismatch to permit
   continuation. Preserve a separate source-binding failure if needed.
3. Complete the coordinator-only W1-W5 review from `protocol.md` and retain
   the exact first-recommended whole-beat selections and their source hashes.
   The fixed second prompt must apply without coaching or interpretation
   that invents a missing option.
4. Calculate the exact remaining budgets from the actual result, not the
   old baseline or an estimated zero cost. Save the checks beside the gate.

Illustrative gate structure only, not a ready-to-use approval file:

```json
{
  "afterTurn": 1,
  "advance": true,
  "previousTurnDigest": "SHA256_OF_ACTUAL_NEW_TURN_1_RESULT_BYTES",
  "observation": "Actual reviewed option labels and first recommendations, complete-beat/factuality/stop evidence, source identity and budget findings.",
  "usageBeforeAdvancement": {
    "durationMs": "ACTUAL_INTEGER",
    "inputPlusOutput": "ACTUAL_INTEGER",
    "uncachedInputPlusOutput": "ACTUAL_INTEGER"
  }
}
```

The three usage fields above are helpful review data but are not the
runner's authority: it recalculates usage from prior results. Additional
review/source hash fields may be recorded; they do not replace manual
verification. A failed W1-W5 review means no advance, even if the runner's
structural gate could otherwise be satisfied. Save that disposition without
invoking turn 2. Do not copy the historical successful gate digest.

After a real passing gate is saved as
`evals/runs/codex-build-wording-candidate-1/embedded-completion-1/baseline-1/gate-after-turn-1.json`:

```bash
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node evals/codex-build-run.mjs \
  --case evals/builds/embedded-completion-1/case.json \
  --cohort codex-build-wording-candidate-1 \
  --capabilities evals/builds/local-capabilities.json --turn 2 \
  --gate evals/runs/codex-build-wording-candidate-1/embedded-completion-1/baseline-1/gate-after-turn-1.json
```

That sends unchanged `evals/prompts/build-turn3.md`, resumes the same actor
session and selects its actual first recommendations. The actor can finish
the local site, but cannot infer real-person phone approval. After terminal
closure, root repeats artifact/source/access checks and reviews W6/W7
against the saved pre-advance selection map. No second-turn failure can be
repaired with an extra turn under this plan. No model judge, fixture clone,
new runtime framework or paid retry is needed for this narrow comparison.
