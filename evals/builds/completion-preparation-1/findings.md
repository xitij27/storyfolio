# Completion preparation, 11 October 2026

The author [approved](../../../docs/history/2026-10-11-build-completion-approval.md)
one fresh continuation with at most two actor turns and one judge after
reviewing the first probe's usage. This preparation makes that approved
question executable without changing the shipped skill or engine.

The [fixture verification](fixture-verification.json) confirms 97 copied
site files, 88 recorded exclusions and all seven-beat requirements. The
expectations identity is the only change from the original contract.
[Runner findings](runner-findings.md) record existing-site preparation,
requested-stop/refusal mapping and reliable uncached-token accounting.
[Judge findings](judge-findings.md) record stop-based eligibility and the
distinction between inherited source and new actor work.

The final [repository test log](repository-tests.log) records all 242 tests
passing, including the twenty runner and fifteen judge tests. The first
full attempt passed 241/242: an immediate process-state observation raced
SIGKILL delivery. Its [raw result](repository-tests-attempt-1.log) remains
intact. The test now waits at most one second for the same gone-or-zombie
condition, still failing if a descendant survives. The final suite observed
cleanup after one millisecond. Runtime termination behavior did not change.
`node evals/check-skill.mjs` passes with 687 words and four references;
`node evals/check-people.mjs` passes all seventeen fixtures.

The [dry preparation](runner-dry.json) verifies 208 prospective frozen
files, stops 5 and 6, refusals in both prompts and the approved bounds,
without a model call or cohort write. Its first outer-sandbox invocation
failed at `spawnSync codex EPERM` while reading `codex --version`; rerunning
outside that sandbox succeeded. The fixture and focused-test records
preserve their own corresponding outer-sandbox limitations.

[Storage adjustment](storage-adjustment.json) moves only generated trusted
coordinator dependencies from the nearly full tmpfs to an ignored repository
dependency directory, leaving the original path as a symlink. Recorded
entrypoint hashes are unchanged. The earlier actor workspace and approved
engine preview are preserved. The continuation receives its own separately
installed dependencies, without shared writable inodes.

This checkpoint precedes the exact-workspace runtime probe and paid actor.
Those commands, snapshots, capability evidence and results belong to the
new `codex-build-completion-1` cohort. No actor or judge model call occurred
during this preparation. The original `codex-build-1` evidence stays intact.
