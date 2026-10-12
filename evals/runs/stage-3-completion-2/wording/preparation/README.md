# Prospective wording-candidate setup

Coordinator-only preparation for `codex-build-wording-candidate-1`, dated
12 October 2026. Nothing in this directory has been executed as part of
preparing it. Root owns validation, the fresh freeze and workspace,
installation, the capability proof, original-image review, readiness,
paid turns and commits. No automatic retry or model judge is added.

The [wording protocol](../protocol.md) remains the semantic contract.
[Operations](../operations.md) explains the existing runner and turn-2
gate. Its illustrative commands use the original case; for this candidate
use [case.json](case.json) instead, because it additionally freezes these
three coordinator helper files. It adds no actor-visible instruction.

## Exact preservation and declared differences

The existing `embedded-completion-1` fixture stays at its original path:
97 files, 503374 bytes. Both original prompts, expectations and rubric
remain byte-identical to the historical completion freeze. The case keeps
schema 1, `setupMode: existing-site`, stops 5 and 6, refusal turns 1 and 2,
and its exact two-turn bounds. Its sole change appends the three helpers
to `implementationFiles`. No root engine is scaffolded over the site.

[derivation.json](derivation.json) records every literal replacement and
old/new SHA-256. [derivation.patch](derivation.patch) is the complete four-file
diff. [verify-derivation.mjs](verify-derivation.mjs) prospectively verifies
those controls against the immutable entry-candidate and old completion
freezes, all 97 fixture bytes and the original prompts. It is read-only,
has no subprocesses and does not establish candidate setup readiness.

This is a fixture-and-prompt matched rerun, not a single-variable comparison.
The current skill and shared runner will be freshly frozen; the planned
schema-3 journey extension must be disclosed even though this case stays
schema 1. The current historical coordinator protocol also differs from
the old completion freeze, with both hashes recorded in the derivation.
Do not rewrite it or claim blanket protocol equality.

Use the current entry candidate's exact capabilities, not an approximation
of the older completion environment. The older completion PATH began with
`node_modules/.bin`; the entry candidate begins with the native `node/bin`
directory. The current disabled-skill inventory additionally includes
meeting-notes-and-actions. Save the full input path/hash delta and stop
for root disposition on any undeclared drift.

## Root-only preparation sequence

Only after all active actor/capture processes are settled:

1. Review and commit the supported skill, helper and runner changes after
   required local checks. Run this derivation verifier and native syntax
   checks with saved command/output records. This preparer has not run them.
   Confirm the fresh cohort does not exist; never overwrite historical runs.
2. Load the exact four `environment` values and native `node.executable`
   from
   `evals/runs/codex-bench-entry-candidate-1/inputs/capabilities.json`.
   Additionally set `TMPDIR=/var/tmp/storyfolio-entry-runtime-20261012`
   and remove `NEXT_TELEMETRY_DISABLED`. Use those settings for dry,
   prepare, install, helper and actor invocations. The actual probe children
   independently disable telemetry. Preserve the existing browser/cache
   and library paths; do not download or substitute runtimes.
3. Record a no-model `--dry` with the new case and cohort. Compare its
   entire emitted capabilities object with the entry candidate's frozen
   object before `--prepare`. Node, CLI and discovered disabled-skill
   inventory can drift despite unchanged capability source configuration.
   Root must resolve any difference without editing historical evidence.
4. Record `--prepare` with that same case, cohort and environment. Read
   the new `meta.json` workspace; do not guess its random suffix or reuse
   the entry workspace. Verify the complete fresh input delta. Preparation
   must copy exactly the 97 fixture files plus the actual frozen skill
   inventory, with empty initial workspace, `scaffolded:false`, no root
   scaffold copies and no conflicts. The helpers enforce these conditions.
5. Install exactly once in that workspace using
   `npm ci --offline --cache=/tmp/storyfolio-npm-cache`, recorded under
   its `setup/dependency-install/` with the existing
   `evals/runs/stage-3-comparison-1/record-command.mjs`. Preserve full
   command, environment, stdout, stderr and terminal result. Generated
   dependencies never become fixture source.
6. Save exclusive `setup/source-before-capability.json` using
   `inspectWorkspace(meta.work, source.snapshot)`: remove each entry's
   in-memory `bytes` field and preserve `entries`, `excluded` and
   `unexpected`. Entries must exactly equal
   `setup/snapshot/manifest.json.files`, with no unexpected paths.
   Run [run-capability-probe.mjs](run-capability-probe.mjs) once through
   the recorder, then save `source-after-capability.json` the same way.
   The inherited command-only sandbox proof has its own 420000-ms deadline
   and 2000-ms kill grace. It uses the frozen probe and actual actor
   configuration, not a model conversation. No failure is retried.
7. Root views all nine newly generated originals under
   `setup/capability/browser/light-wide/`, individually with
   `view_image` at original detail. Save `capability-visual-review.md`
   and `original-images.json`: schema 1, nine unique `images`, each
   with setup-relative `path`, `sha256`, `bytes` and
   `viewMethod:"view_image original"`. Exactly match the actual report's
   nine 1440-by-900 PNGs. Old image hashes or viewing claims cannot be reused.
8. Record [finalize-setup.mjs](finalize-setup.mjs), then
   [check-ready.mjs](check-ready.mjs). Finalization creates exclusive
   neutral environment facts and a hash-bound probe attestation only after
   actual process, source and original-image evidence passes. Readiness
   rechecks the full frozen/current inputs, its own no-model dry run,
   exact source plus neutral facts, install and probe log hashes, all three
   frozen helpers and the copied/runtime nine-image pairs. Review and
   commit the new evidence before the first paid turn.

Use the established recorder for every action. Command arguments are:

```sh
wording_node=/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node
wording_helpers=evals/runs/stage-3-completion-2/wording/preparation
wording_case=$wording_helpers/case.json
wording_cohort=codex-build-wording-candidate-1

"$wording_node" "$wording_helpers/verify-derivation.mjs"
"$wording_node" evals/codex-build-run.mjs --case "$wording_case" --cohort "$wording_cohort" --capabilities evals/builds/local-capabilities.json --dry
"$wording_node" evals/codex-build-run.mjs --case "$wording_case" --cohort "$wording_cohort" --capabilities evals/builds/local-capabilities.json --prepare
```

These are prospective command forms, not execution records. The output
subdirectory remains `embedded-completion-1/baseline-1`, the runner's
repetition name, not a claim that this candidate is a baseline.

## Paid-turn and interpretation limits

The unchanged first prompt is sent only after root records readiness.
Its maximum turn deadline is 900000 ms. A second turn requires the actual
completed first response, reliable usage, live-to-saved source identity
and a saved passing W1-W5 review. Exactly preserve the first recommended
complete opening and closing versions and their source hashes. Then the
unchanged second prompt may select them. No continuation is permitted
merely because the runner could accept a structurally valid gate.

The original total actor wall bound remains 1500000 ms; reported token and
uncached-token bounds remain 12000000 and 350000. The second deadline is
the smaller of 900000 ms and remaining total time. The schema-1 runner does
not enforce live-source equality between turns, so root must explicitly
verify it before a gate. Missing usage is not zero. A timeout, incomplete
terminal reply or failed semantic choice gate is retained, not coached.

The helper proof establishes existing-site setup capability only. It does
not establish actor preflight, wording quality, phone behavior, finished
portfolio acceptance or physical human approval. Software verifies the
reviewer's saved image attestation; it cannot infer viewing from a hash.
The sandbox configuration is not a filesystem read jail, and inherited
probe error paths still require actual-access review.

Status: source preparation complete; validation and all actual setup remain
pending root execution. No model, install, browser, build or test was
launched by this preparer.
