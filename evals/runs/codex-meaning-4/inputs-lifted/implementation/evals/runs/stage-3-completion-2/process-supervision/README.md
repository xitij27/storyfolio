# Prospective process supervision

Root approved this separate recorder after the entry candidate's outer
execution closed with code 143 but neither historical recorder nor actor
wrote a terminal result. The [independent audit](../entry-candidate-preparation/interruption-audit.md)
preserves that evidence. No cause or sender was established. The old
recorder, frozen cohorts and missing result files are unchanged.

## Intended improvement

`recorder.mjs` launches exactly one absolute executable with the supplied
arguments/environment. It exclusively creates a fresh evidence directory
under `evals/runs`, writes recorder/parent PIDs and emits a child PID as soon
as spawning succeeds. Synchronous append-only lifecycle writes retain
observed signals, forwarding attempts, child exit/close and any force step.
Raw stdout/stderr go directly to exclusive files. There is no retry,
application modification, model call of its own or broad process cleanup.
The child command may itself be a paid runner, only under root's separate
authority and frozen bounds.

The first caught SIGINT or SIGTERM is forwarded once, unchanged, to the
owned runner PID only. The runner remains responsible for its actor process
group. Repeated signals are recorded without repeat forwarding. If the
runner has not exited after the explicit 5000-ms default shutdown grace,
the recorder logs and attempts SIGKILL against only that owned PID. It does
not signal unrelated groups or infer that detached descendants are gone.
An observed child exit cancels force escalation, avoiding a later signal
against a reused PID. Separate post-run process evidence remains required.

This recorder imposes no work deadline and cannot override or enlarge the
actor's/capture's authorized limit. External interruption and child timeout
are separate: a caught external signal makes recorder completion false
even if a cooperative child exits zero. A child timeout must be read from
the child's own preserved result. Spawn failure and nonzero exit remain
distinct. Process-group descendants, uncatchable SIGKILL, container loss,
filesystem failure or termination before handlers are installed can still
leave incomplete evidence. Signal handlers identify no sender and do not
prove that this change prevents a recurrence.

## Launch requirements

Root must review and test this recorder before use, retain its exact hash
with the new command/freeze, and pass the complete frozen environment.
Launch native Node directly, without an extra native-Node `spawnSync`
wrapper. Keep every outer tool response and poll a live session at most
40 seconds apart. Polling is observability, not a demonstrated cure for the
previous interruption. Do not infer completion from an idle stream.

Example shape only, not a paid launch command or approval:

```text
<native-node> evals/runs/stage-3-completion-2/process-supervision/recorder.mjs <fresh-repository-evidence-directory> <cwd> <absolute-child-executable> <fixed-child-arguments...>
```

The library form permits a declared evidence root and shorter shutdown
grace for no-model tests. The CLI fixes the repository evidence root and
uses the 5000-ms grace. No environment variables are silently changed;
the same six provenance fields as the prior recorder are recorded, without
dumping arbitrary environment contents. Tests must cover real caught
signals, orderly forwarding, forced shutdown, repeated signals, spawn
failure, ordinary success/nonzero exit, exact argument/environment passing,
no overwrite and retained artifact hashes. Root confirmed the wording
capability process closed at `04:05:11.866Z` and explicitly cleared the
no-model subprocess tests before their launch.

## Retained local test result

The seven focused tests passed, zero failed/skipped, at
`2026-10-12T04:07:53.635Z`, recorder code 0 after 492 ms. Full native command,
stdout, stderr and terminal result are in [tests-1](tests-1/); the complete
outer tool return is [tests-1-tool.json](tests-1-tool.json). Tests included
an actual recorder receiving SIGTERM, an orderly child returning zero while
recorder completion remains false, repeated-signal one-forward behavior,
owned-PID force after grace, spawn failure, nonzero exit and exclusive
evidence paths. They launched only local dummy Node children, not a model,
build or browser. The one real signal was sent to the test's own recorder;
short-grace force targeted only its own dummy child. No live evaluated
actor/capture overlapped these tests.

Root review and command/freeze binding are still required before first
operational use. A passed local test does not establish the unknown cause
of any historical interruption or guarantee future availability.
