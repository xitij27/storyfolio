# Explicit candidate-2 continuation adapter

Source-only preparation. Nothing here grants a gate, launches on import of
the execution core, or creates another attempt. Root must review and commit
the amendment, helper identities and focused tests before any execution.
The shared runner, case, skill, engine, original 149 inputs and original
turns 1 and 2 remain unchanged.

This adapter permits only turns 3 to 6 of the same candidate-2 session.
It imports both original completed results by their real hashes, retains
their artifacts and budgets, and appends new turn directories only in the
amendment's separate continuation output. Turn 3 alone uses the explicitly
labelled 182-file post-closure recovery checkpoint. Later turns require
their genuine immediate predecessor's full source snapshot. Recovery does
not prove the missing application identity at the original closure instant.

The additive capture policy is exactly the original defaults plus `site`.
All old limits and exclusions stay unchanged. Unknown nonempty roots,
symlinks, source drift and incomplete captures block. A failed or partial
new turn remains recorded and cannot be retried. No original artifact is
rewritten or copied into a newly invented historical result.

## Interface and frozen identities

Root supplies the source-bound amendment through the common measurement
`loadAmendment` validator. The CLI additionally verifies the actual native
Node, CLI executable/version/hash, four frozen environment fields, exact
TMPDIR, unset telemetry, disabled skills, original base argv, setup proof,
current original inputs and implementation hashes. New helper identities
and the original input digest stay separate.

The continuation declaration is:

```text
continuation.output: repository-relative, under full-journey-recovery/
continuation.allowedTurns: [3, 4, 5, 6]
continuation.recoveryAfterTurn: 2
continuation.snapshotPolicy: original DEFAULT_SNAPSHOT with site appended
```

Freeze `cli.mjs`, `execution-core.mjs`, this README and
`execution-core.test.mjs` in `helperHashes.runner`. Also bind all common
validator/app-root imports in the amendment's helper maps. All original
transitive helper bytes remain checked against the original input freeze.
There is no generic source-override hook in the shared runner.

Each gate must include the original `planTurn` fields `afterTurn`,
`advance: true`, `previousTurnDigest` and an actual `observation`, plus
`reviewedByRoot: true`, `amendmentSha256`, the complete prior `sourceDigest`
and a nonempty array of `evidence: [{path, sha256}]`. The prior result digest
for turn 3 is the original turn-2 result, not a synthetic recovery result.
Evidence references are verified but their semantic assessment remains
root's responsibility. No gate is supplied by this adapter.

The inner command interface, using the recorded native Node and exact
capability environment through the existing durable recorder, is:

```text
node evals/runs/stage-3-completion-2/full-journey-recovery/runner/cli.mjs
  --amendment <repository-relative amendment.json>
  --amendment-sha256 <root-reviewed hash>
  --gate <repository-relative gate.json>
  --gate-sha256 <root-reviewed hash>
  --turn <3|4|5|6> [--dry]
```

Both JSON paths must be under this recovery study. `--dry` runs read-only
identity/source/eligibility checks, including CLI version discovery, but
performs no model call or writes. Without `--dry`, one invocation performs
at most one paid turn using unchanged `invokeBuildCodex`, `buildCodexArgs`,
fixed prompt bytes and `planTurn`. There is no autonomous next unit.
The original per-turn/cumulative/token limits remain, including the actual
usage of both original turns. A real gate and root launch are still required.

## Checks and deliberate limits

The fake-invocation suite reproduces the old nested-root rejection, then
exercises four exact same-session turns, original artifact invariance,
strict snapshot continuity, unknown files/symlinks, input/recovery/gate
tampering, missing usage, exhausted budgets, invocation failures, partial
outputs and retry rejection. It does not call a model, browser or application
build. Root should run it with the native Node after source review:

```text
node --test evals/runs/stage-3-completion-2/full-journey-recovery/runner/execution-core.test.mjs
```

Tests are synthetic adapter checks, not evidence of a successful actual
continuation. The original process transport is reused unchanged; prior
interruption risks are not claimed fixed. Configuration isolation is not
a filesystem read jail. Environment/source equality and genuine terminal
closure require the normal independent audits. All later behavioral and
visual gates, including actual author desktop/phone approval, remain.
