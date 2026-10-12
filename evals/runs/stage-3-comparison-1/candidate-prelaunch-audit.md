# Candidate matched-input and setup audit

12 October 2026. Qualified material audit passed before the candidate actor
launch. All frozen inputs and source match the intended skill-only change.
One install-only environment difference was detected, preserved and explicitly
dispositioned by root after read-only impact evidence. Exact whole-install
environment identity did not pass and is not claimed.

No actor, judge, browser, package lifecycle, installation or capability probe
was launched or rerun by this audit. No candidate cohort/run-root file,
frozen input or old baseline was changed. All new audit records are here in
the comparison study. Root owns final readiness, commit and paid launch.

## Frozen inputs and fresh material

The [qualified result](candidate-prelaunch-qualified-audit.json) verifies
exactly 124 frozen files in each arm, with one changed input:
`skill/SKILL.md`. The other 123 files match byte-for-byte. This includes the
nine-file fixture, task, rubric, protocol, expectations, capabilities,
79-file engine, dependency lock, four references, neutral screenshot helper,
scaffold and every frozen evaluator/transport/source-scope implementation.

- Baseline input digest:
  `40fea471970e15abbded1a2f4a51ca40917711e109aab189cc7fcf078257cf6a`.
- Candidate input digest:
  `a127640464a9ba08a2beb62cdfa65941b2692c4d183ed71e9c397b7e34445353`.
- Candidate main skill SHA-256:
  `cea93b6a009a405d4bd0497e5a8e1bdae53901259a9a7739e334008a0274cee2`.
  It grows from 4,087 to 4,790 bytes through the approved conditional
  section. The [candidate decision](candidate-decision.md) and
  [independent scope review](candidate-review.md) bind its exact content.
- Candidate preparation records committed source
  `e7a7230e65e995ff5bf7d13508bec396a67b3859` and empty declared-source status.
  Baseline freezing records `8f1eec32d10b5974a83fcf5e81c23e1468849f32`;
  its later prelaunch commit is separately recorded in the baseline history.

The new workspace is:

`/var/tmp/storyfolio-comparison-runtime-20261012/storyfolio-evals/build-bench-depth-2-r5MXXB`

Its 95-file pre-scaffold inventory exactly matches baseline filenames and
structure: nine fixture files plus 86 installed skill files, with an empty
initial directory. Scaffolding adds 79 files, giving 174 source files. The
only baseline/candidate setup snapshot difference is the installed main
skill's hash and 703-byte size increase. Every saved and live file matches
its frozen origin. The final factual environment record brings the source
to exactly 175 files. Its only content difference from baseline is
`inputDigest`; the remaining setup facts are identical and contain no
held-out repository path.

Both the frozen source helper and a separate recursive source traversal
agree with that complete 175-file set. No prior prototype, actor source,
rubric or reference screenshot was copied into the source-bound workspace.
Only recognized generated Next declarations/build info are additional
regular files outside the three separately excluded top-level generated
trees. The candidate run root contains only `meta.json` and `setup`; the
audit created nothing there.

The qualified result records all exact metadata differences. The only run
metadata fields that differ are cohort, input digest, input path, prepared
timestamp and fresh workspace path. The frozen environment's four values
and the separate task-specific `TMPDIR` match. The capability invocation
matches after substituting only the cohort and workspace paths. Its
26 setup proof files and two coordinator-helper hashes verify. Offline
installation and the independent capability probe both completed with exit
0. The acceptance agent's nine original starter-image reviews are recorded
in [candidate setup review](candidate-setup-review.md); this audit did not
claim to repeat that pixel review.

## Preserved strict failure and explicit qualification

The [original verifier](verify-candidate-prelaunch.mjs) was not changed.
Its initial `--save` invocation exited 1 at the exact install-environment
comparison. The [failure interpretation](candidate-prelaunch-audit-failure.json)
and [complete original tool return](candidate-prelaunch-audit-failure-tool.json)
retain the command, assertion, actual/expected values and full output. No
successful output replaced that failure.

The sole recorded install-environment difference is:

| Field | Baseline initial install | Candidate initial install |
|---|---|---|
| `NEXT_TELEMETRY_DISABLED` | `"1"` | `null`, unset |

The same recorder source records its inherited environment and passes it
to the installer. Thus the saved origin is the separate coordinator
installer invocation, not a changed fixture, lockfile, skill or evaluator.
Both preparation invocations record the value unset. The actual baseline
actor launcher also records it unset. No candidate actor had run at this
audit; its later launcher must retain and record the same actor environment.
No claim about an unrecorded complete child environment is inferred from
the shorter frozen capability-environment map.

Root's explicit disposition was: "a disclosed non-material install-only
provenance deviation, not exact whole-install environment equality."
The disposition relies on the following retained read-only observations:

- Both installers used `npm ci --offline --cache=/tmp/storyfolio-npm-cache`,
  installed 392 packages and exited 0. Their stdout differs in elapsed time
  only, 12 seconds versus 11. Their stderr is the same 137-byte ESLint
  deprecation warning, not empty.
- The [lifecycle audit](candidate-install-lifecycle-audit.mjs) and its
  [saved output](candidate-install-lifecycle/stdout.log) inventory the root
  plus 392 installed package manifests, all relevant hook declarations,
  actual npm hook-log excerpts, inspected implementation and source hashes.
  The root has no install lifecycle hook. The recorded executed hook is
  `unrs-resolver@1.12.2 postinstall`, exiting 0. Its inspected path neither
  reads this variable nor invokes Next. Declared but unexecuted hooks are
  not confused with actual execution.
- The frozen capability-probe code explicitly forces the variable to `"1"`
  for both its production-build and browser child commands. The unchanged
  engine check command likewise forces `"1"`. Measured build/browser
  behavior therefore does not inherit this installer-only difference.
- The [independent dependency inventory](candidate-dependency-inventory.json),
  produced by [this read-only script](compare-installed-dependencies.mjs),
  matches both current trees exactly: 24,083 regular files totaling
  617,616,341 bytes, 2,355 directories and 24 symlinks. Names, file hashes,
  permission bits and symlink targets match with zero differences. Inventory
  digest: `2964d62cdcedb14dfb1ba85b8cad2d909671f641eac0116e3070ae44bc3a7ca3`.

Important limit: the baseline actor subsequently reinstalled dependencies.
That complete byte comparison is of the current retained trees, not a
historical first-install inventory or proof that all past side effects were
identical. It follows no symlinks and executes no packages. No install or
probe rerun was used to manufacture a matching record.

The [separate qualified verifier](verify-candidate-prelaunch-qualified.mjs)
requires exactly this one variance, including the exact baseline/candidate
values, and binds the saved lifecycle-output hash and complete dependency
inventory. It still enforces all other input, environment, source, proof,
helper and directory checks. It does not ignore arbitrary environment keys
or alter a frozen evaluator. Its saved result explicitly says
`qualified: true`, `wholeInstallEnvironmentEqual: false` and
`originalStrictAuditPassed: false`.

Clarification of its retained limitation wording: the standalone prelaunch
source traversal skips generated dependency and Next trees. The separate
inventory does hash every current dependency file and is bound by the
qualified verifier; it is not a semantic audit of every dependency or a
historical first-install snapshot. Generated Next output is not exhaustively
audited. The tested verifier and result are preserved without retrospective
wording edits.

## Exposure and remaining boundaries

The raw generated capability probe contains the same kind of coordinator
error-stack exposure as baseline, now naming:

`/home/kshitij/projects/storyfolio/evals/runs/codex-bench-depth-candidate-1/inputs/implementation/evals/probe-build-environment.mjs:43:22`

The probe was neither sanitized nor removed. It reveals the current
cohort/evaluator location, not held-out solution contents. The concise
actor-facing factual setup is separately checked to contain no held-out
path. Configuration isolation is not a filesystem read jail or arm blinding;
the completed candidate stream still needs its own actual-access audit.

This qualified material check is not behavioral improvement, visual
acceptance, author approval or Stage 3 completion. Both tested paragraphs
change together, so this pair cannot isolate their individual effect.
Mechanical per-run timestamps, paths, source commit, input digest and
independent generated probe output remain recorded, alongside the explicit
install-only deviation. Root retains the final launch decision.

The final read-only verification command exited 0:

```sh
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node evals/runs/stage-3-comparison-1/verify-candidate-prelaunch-qualified.mjs --save
```

This created only the new qualified audit output in the study. It did not
retry the installation, capability probe or any model turn.
