# Prospective matched entry-candidate preparation

These are coordinator-only setup helpers for `codex-bench-entry-candidate-1`.
They do not launch the paid actor or judge. Root owns every setup and paid
launch, terminal poll, original-image review and commit. Do not prepare or
freeze the cohort until the supported candidate skill and these controls
are committed on main. The [new authority](../../../../docs/history/2026-10-12-stage-3-completion-authority.md)
and [execution plan](../../../../docs/superpowers/plans/2026-10-12-stage-3-completion-execution.md)
authorize one fresh matched entry turn, not a continuation of the timed-out
baseline. No automatic retry or paid judge is part of this comparison.

## Exact scope and differences

[derivation.json](derivation.json) binds historical and prospective SHA-256
hashes and every literal replacement. [derivation.patch](derivation.patch)
shows the complete four-file difference. [verify-derivation.mjs](verify-derivation.mjs)
checks those bytes against the 132-file frozen baseline and verifies the
unchanged actor fixture, prompt, expectations, rubric and protocol.

The three helpers preserve the baseline assertions and behavior. Only the
cohort identity, deeper import/root paths, helper identity paths, comments
and candidate-specific error label change. [case.json](case.json) changes
only the three coordinator `implementationFiles` paths. It retains the
`bench-entry-1` ID, all 11 fixture files, the exact ordinary task, schema 1,
`requestedStops:[4]`, no refusal turns, and the original 900000-ms one-turn
bounds. The repetition directory remains `baseline-1`; this is the runner's
repetition naming, not the cohort's treatment assignment.

The full freeze is therefore not byte-identical. After preparation, retain
an exact baseline/candidate path-and-hash diff: case bytes, replaced helper
paths and the actual supported skill changes. Do not claim that only one
skill file changed. All other implementation, engine, lockfile, fixture,
prompt, expectations, rubric and protocol bytes must match or be explicitly
stopped for root disposition. Preserve actual source counts, not the old
176/177 counts: adding a skill reference changes the initial inventory.
The old protocol's baseline-only spending language records its historical
allowance; the new authority and plan govern this candidate without changing
its observations or supplying new actor instructions.

## Environment and root command sequence

Load `evals/runs/codex-bench-entry-baseline-1/inputs/capabilities.json` and
pass its four `environment` values verbatim to each command. Use its native
`node.executable`, not host Node or a reconstructed PATH. Additionally set
`TMPDIR=/var/tmp/storyfolio-entry-runtime-20261012` and explicitly remove
`NEXT_TELEMETRY_DISABLED` from the wrapper/install/actor environment. The
probe's measured build/browser children force telemetry off themselves.
Retain every command, stdout, stderr, terminal code and outer tool/session
poll response. The command recorder below is reused unchanged and is not
a deadline or spending cap.

From the repository root, after root supplies that exact environment:

```sh
entry_node=/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node
entry_helpers=evals/runs/stage-3-completion-2/entry-candidate-preparation
entry_case=$entry_helpers/case.json
entry_cohort=codex-bench-entry-candidate-1
entry_record=evals/runs/stage-3-comparison-1/record-command.mjs
```

1. Confirm the skill/control commit, no declared dirty inputs, no existing
   candidate cohort and no live actor/build/browser. Run the read-only
   derivation check and a recorded runner `--dry`. Compare the entire emitted
   capabilities object with the baseline frozen object before preparation.
   Dynamic CLI, Node or disabled-skill discovery can drift even when the
   capability source file is unchanged. Stop on drift, never edit the old
   object or silently qualify an unmatched environment.

   ```sh
   "$entry_node" "$entry_record" "$entry_helpers/pre-freeze-dry" "$PWD" "$entry_node" evals/codex-build-run.mjs --case "$entry_case" --cohort "$entry_cohort" --capabilities evals/builds/local-capabilities.json --dry
   "$entry_node" "$entry_record" "$entry_helpers/prepare" "$PWD" "$entry_node" evals/codex-build-run.mjs --case "$entry_case" --cohort "$entry_cohort" --capabilities evals/builds/local-capabilities.json --prepare
   ```

2. Read the fresh `meta.json`, do not guess or reuse a workspace. Set
   `entry_work` to its exact canonical `work`; set `entry_setup` to
   `evals/runs/codex-bench-entry-candidate-1/bench-entry-1/baseline-1/setup`.
   Audit the complete frozen-input delta before installing. The capability
   file must equal the baseline's, including all four environment values.
   Install exactly once from the unchanged lockfile and existing cache:

   ```sh
   "$entry_node" "$entry_record" "$entry_setup/dependency-install" "$entry_work" npm ci --offline --cache=/tmp/storyfolio-npm-cache
   ```

3. Save `source-before-capability.json` inside the new setup directory using
   the existing `inspectWorkspace(meta.work, source.snapshot)`. Record
   `entries` with each in-memory `bytes` field removed, plus `excluded` and
   `unexpected`; compare `entries` exactly with `setup/snapshot/manifest.json`
   `.files`. Preserve a fresh exclusive file and its command/tool record.
   This is not `captureSource`'s different manifest shape. Do not write source.
   Run the single command-only setup probe, then save the corresponding
   `source-after-capability.json` by the same method:

   ```sh
   "$entry_node" "$entry_record" "$entry_helpers/capability-launch" "$PWD" "$entry_node" "$entry_helpers/run-capability-probe.mjs"
   ```

   The probe retains the inherited 420000-ms work deadline plus 2000-ms kill
   grace for its own sandbox process group. It is neutral starter setup,
   not the later 15-minute evaluated actor or browser allowance. No retry is
   automatic. Failures stay saved and block readiness. It creates the actual
   `setup/runtime-environment.json` and copies raw capability output.

4. Root individually opens all nine newly emitted original 1440x900 PNGs
   under `setup/capability/browser/light-wide/` with `view_image` at original
   detail. Save `capability-visual-review.md` with actual observations and
   limits, and `original-images.json` with `schemaVersion:1` and nine unique
   `images` records: `path` relative to setup, `sha256`, `bytes`, and
   `viewMethod:"view_image original"`. Use the exact `report.json` shot set.
   Do not reuse old image hashes, viewing claims or contact sheets.

5. Finalize only after successful process, source and image evidence.
   Finalization writes factual environment setup in the new setup and actor
   workspace, then a hash-bound `probe.json`. It permits no overwrite and no
   additional actor-facing content. Run the separate readiness gate:

   ```sh
   "$entry_node" "$entry_record" "$entry_helpers/finalization" "$PWD" "$entry_node" "$entry_helpers/finalize-setup.mjs"
   "$entry_node" "$entry_record" "$entry_helpers/readiness" "$PWD" "$entry_node" "$entry_helpers/check-ready.mjs"
   ```

   Readiness checks current/frozen inputs, a new no-model runner dry check,
   exact source equality except neutral setup facts and generated exclusions,
   install environment/log hashes, three frozen helper hashes and the exact
   nine copied/runtime original pairs. An independent audit must bind the
   final frozen-input delta and setup evidence before root commits readiness.
   Software verifies the saved viewing attestation, not that a human viewed it.

6. Root alone may then record and launch the one `--turn 1` command using
   the same case/cohort/capability arguments and environment. The case bounds
   it to one 900000-ms actor turn; retain actual duration and shutdown/snapshot
   overhead. A timeout has no continuation or retry, and no terminal handoff
   may be invented. These helpers never start that turn. Subsequent source
   discovery and one separately bounded measurement use the same approved
   clean saved-source method as the baseline; they are not setup readiness
   or a claim of complete Stage 3 acceptance.

## Unchanged limitations

Command-only sandbox setup inherits user configuration; actor execution
separately ignores it. Configuration isolation is not a filesystem read jail.
The raw external-request error can expose the frozen implementation path;
preserve it and audit actual actor access. Factual actor setup contains only
neutral environment observations, no repository or held-out paths. A passing
starter build and nine reviewed originals establish setup capability only,
not a final portfolio, phone review, genuine look gate or physical acceptance.

At helper preparation time no candidate cohort, setup or actor was launched.
Only recorded native syntax and read-only mechanical derivation checks may
be run by this preparer; root owns subsequent setup and image review.

## Preparation checks

At `2026-10-12T03:38:05.126Z`, all four native Node syntax checks and the
read-only derivation verifier passed, exit 0. The verifier rechecked all 132
historical frozen inputs, four mechanical derivatives, all 11 actor fixture
files and the unchanged prompt/expectations/rubric/protocol bytes. Full
command, stdout, stderr and result are in [local-checks](local-checks/);
the complete outer return is [local-checks-tool.json](local-checks-tool.json).
No candidate setup helper was executed, and no build, browser, model,
candidate workspace or freeze was started by these checks.

The independent `audit_actor` reviewer read all three helper diffs and the
case diff before these checks. It found no blocker or behavior change beyond
the recorded identities, path depths, hash-binding references and comments.
Its diff commands returned 1 for expected differences, not runtime failures.
It did not execute setup or inspect this later README at that checkpoint.
Root separately read the same four prospective controls before freezing.
