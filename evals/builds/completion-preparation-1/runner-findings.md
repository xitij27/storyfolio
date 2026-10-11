# Runner preparation for bounded completion

Recorded 11 October 2026, after the author authorized the bounded
continuation described in the [completion proposal](../../../docs/superpowers/plans/2026-10-11-build-completion-proposal.md).
These changes affect the evaluation runner only. No skill, engine,
completed cohort input or prior result was changed by this work.

## Case contract

- `setupMode` defaults to `scaffold`. Explicit `existing-site` copies the
  frozen fixture and unchanged installed skill but skips engine
  scaffolding. Supplied source, assets and lockfile bytes are retained.
  Setup inventories and results record the mode and whether scaffolding
  happened. No generated `next-env.d.ts` is required before setup.
- `requestedStops` has one entry per prompt, in increasing order, without
  duplicates, chosen from 4, 5 and 6. The default is `[4,5,6]` truncated to
  the prompt count. The continuation uses `[5,6]`. Every turn's
  `started.json` and `result.json` record its `requestedStop`.
- `refusalTurns` lists increasing, unique turn numbers within the prompt
  list. It may be empty. The legacy default is `[2,3]`, filtered to the
  prompt count; the continuation uses `[1,2]`. These are declared prompt
  roles for judging, not evidence that the actor satisfied any criterion.
- Optional `bounds.maxUncachedTokens` is a positive safe integer. Before
  another actor turn, the runner sums reported input minus cached input
  plus output across saved actor turns. The continuation uses 350,000.
  The existing input-plus-output ceiling and wall limit also remain in
  force. Reaching either token threshold exactly prevents another turn.

Input, output and duration must be nonnegative safe integers. When the
uncached bound is configured, every earlier turn must also report
nonnegative integral `cached_input_tokens`, no greater than its input.
Missing or invalid accounting stops continuation. An invalid supplied
cached count is rejected even for a legacy total-only case; an absent
cached count remains allowed there and the derived uncached total is
reported as unknown. Aggregate arithmetic must remain within safe integer
range. Cached, input, output and derived totals remain separate in the
next turn's saved planning metadata.

These are between-turn actor thresholds. They neither cap an in-flight
call nor include judge use, establish a dollar charge, or remove the
existing caveat that resumed counters may overlap. Each later invocation
still needs a coordinator gate identifying the observed previous turn.

## Local verification

The [runner test log](runner-tests.log) records 20 passed tests, no failures,
using Node 22.22.1 outside the outer workspace sandbox, before the cleanup
test timing correction described below:

```sh
PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH \
  node evals/lib/build.test.mjs
```

The tests exercise legacy setup, byte-preserving existing-site setup,
explicit stop/refusal validation, exact token boundaries, cumulative
arithmetic, missing/invalid cached accounting, overflow rejection, turn
metadata, gates, snapshots and process cleanup. They make no model calls.
The Codex CLI checks invoke only `--help`; actor invocations in tests are
mocked or replaced by local Node subprocesses.

Two earlier attempts inside the outer sandbox passed 18 of 20 tests and
failed only the existing real-subprocess termination tests. Both are
preserved: [host Node attempt](runner-tests-host-node.log) and
[Node 22.22.1 sandbox attempt](runner-tests-outer-sandbox.log). The same
source passed all 20 outside that sandbox. No source edits occurred
during these test processes.

`node --check evals/codex-build-run.mjs` and the scoped `git diff --check`
also passed. The [original source hashes](runner-source-hashes-before-cleanup-wait.json)
identify that focused-test revision.

## Cleanup timing found by the full suite

The first [full-suite attempt](repository-tests-attempt-1.log) passed 241
tests and failed one: the descendant-cleanup test saw a live process state
on its single immediate `/proc` read. The runner sends process-group
`SIGKILL` in the parent close handler, but sending a signal does not wait
for the descendant to reach its stopped state. The earlier focused run
passed with the same runner source. This supports a test observation race;
it does not justify accepting a surviving descendant.

The test now polls for at most one second, still requiring the descendant
to be gone or a zombie awaiting reaping. A live state at the deadline still
fails, with its last observed state in the assertion. Diagnostic output
records the actual observation latency and state. The runner's cleanup
behavior is unchanged. [Current source hashes](runner-source-hashes.json)
identify this test revision; the coordinator's subsequent full suite is
the required verification. No duplicate focused run was launched.

The coordinator owns full-suite verification, the checkpoint, input
freezing, environment preparation and any paid continuation.

The coordinator's final [whole-repository suite](repository-tests.log) now
passes all 242 tests on the final source, including all twenty runner
cases. The descendant reached zombie state after one millisecond in that
run. The earlier pending marker in the source-hash record describes the
moment it was written.
