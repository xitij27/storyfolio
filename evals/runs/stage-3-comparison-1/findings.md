# Bounded Stage 3 visual comparison

12 October 2026. The [author approved](../../../docs/history/2026-10-12-stage-3-comparison-approval.md)
the [prepared comparison](../../builds/bench-depth-2/protocol.md) after local
development at `8f1eec3`. This study records both arms without rewriting
historical results. Baseline preparation is underway. No paid model has
launched at this initial checkpoint; no candidate has been selected.

The allowance is one baseline actor and, only if supported, one candidate
actor, with at most one judge each. Limits: 15 minutes per actor, 10 minutes
per judge, no retry or continuation. These are time limits, not hard token
or dollar caps. Later Stage 3 questions are not included.

The actor receives the unchanged fixed request and new neutral fixture,
never the accepted manual implementation or the prior actor's output.
Local configuration does not establish a filesystem read jail. Each arm
requires actual access review, source-bound technical evidence and separate
original-image review. A text score cannot substitute for visual acceptance.

## Baseline preparation

The local checks pass: `check-skill.mjs` reports 687 words/four references,
`check-people.mjs` reports 17 cases, the nine-file fixture verifier passes,
and [local-tests-1](local-tests-1/result.json) retains 342/342 tests across
31 suites. No behavioral skill change preceded the baseline.

[Preparation](prepare-baseline/result.json) completed without a model call.
The new baseline input digest is
`40fea471970e15abbded1a2f4a51ca40917711e109aab189cc7fcf078257cf6a`.
The [run metadata](../codex-bench-depth-baseline-2/bench-depth-2/baseline-1/meta.json)
records the fresh external workspace and one-turn bounds. The frozen
protocol includes the new approval note; this explains its difference from
the preceding dry-preparation digest. The native runtime environment is
recorded per command. `TMPDIR` is the new task-specific
`/var/tmp/storyfolio-comparison-runtime-20261012`, not part of the runner's
four-value environment digest, and must also be retained/enforced separately.

The preparation records source HEAD `8f1eec3`. The new protocol approval note
and authorization documents were present but uncommitted during freezing;
their exact protocol bytes are frozen and will be committed before actor
launch. No earlier frozen cohort or accepted implementation was changed.

The initial staged whitespace check reports only nine inherited EOF blank
lines, copies of engine `controls.ts`, `overlay.ts` and `check-lib.mjs` in
the frozen skill and initial snapshots. These source-evidence bytes remain
unchanged. The authored changes pass the check; no frozen input is reformatted.
The offline locked installation completed with 392 packages. Its saved npm
audit summary is not a current online vulnerability assessment.
