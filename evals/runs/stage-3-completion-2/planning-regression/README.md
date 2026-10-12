# Final planning regression controls

Prospective study-local adapter, 12 October 2026. No regression model call,
test or adapter command has been executed by this preparer. Root owns
validation, final input freeze, every paid invocation, raw-access review
and commits. Execute only after the last behavioral skill change and after
the unexplained process interruptions have a recorded launch disposition.
Preparation here does not claim those interruptions are fixed.

[protocol.md](protocol.md) fixes the question, six conversations, unchanged
planning inputs, models, scoring and spending bounds. The cohort is exactly
`codex-stage-3-planning-regression-1`. No full-journey or browser acceptance
is measured here. The old `codex-closing-1` remains immutable.

## Preserved inputs and changed apparatus

[contracts.mjs](contracts.mjs) reproduces original prompt synthesis and the
blind judge packet. It calls the shared planning `codexArgs` directly:
`gpt-6.1-sol` actors, `gpt-6-astra` judges, medium effort, no network,
no project instructions and the original actor/judge tool settings.
The judge retains the original schema and rubric. Aggregate actor replies
stay in its packet; a strict terminal-message extractor separately parses
the judge's exact JSON. No repair or second judge is allowed.

[historical-sources.json](historical-sources.json) binds the original input
and historical packet files used by this preparation and its parity tests.
[historical-usage.json](historical-usage.json) retains the raw counters and
conservative arithmetic supporting the prospectively approved usage gates.
The six original synthesized conversations and judge packets must remain
byte-identical in [contracts.test.mjs](contracts.test.mjs).

[runner.mjs](runner.mjs) adds an exclusive, immutable input freeze and one
declared paid unit per invocation. [process.mjs](process.mjs) adds owned
process-group deadlines and immediately streams external SIGTERM/SIGINT
events to an exclusive lifecycle log. Its synchronous raw-log writes do
not wait for an asynchronous log-end callback. If close never arrives by
the shutdown bound, it settles records as an explicit failure, not proof
that detached or escaped descendants exited. The seven prospective fake
transport tests in [process.test.mjs](process.test.mjs) cover that boundary
without launching a subprocess or sending a real signal.
These apparatus changes, the current CLI/environment/disabled-skill list
and the actual final skill must be disclosed against historical runs.
Do not claim a single-variable causal comparison.

## Root-only sequence

1. Settle all active actors/captures. Review these files and run the native
   syntax checks and contract tests, saving actual commands and outputs.
   Run the repository-required checks before committing the final skill
   and controls. No tests or paid work run automatically from this README.
2. Use native Node
   `/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node` and the
   same recorded four environment values from the current build capability
   freeze. Set `TMPDIR=/var/tmp/storyfolio-entry-runtime-20261012` and unset
   `NEXT_TELEMETRY_DISABLED`. Planning does not enable build capabilities;
   the adapter independently freezes its exact planning arguments and six
   environment values, including PATH and TMPDIR. Review any actual drift.
3. Record `--dry`, then `--prepare` once. Dry has no model call or write.
   Preparation requires clean committed selected inputs and a nonexistent
   cohort. It creates six separate outside-repository workspaces containing
   only each person's original material and the frozen skill, plus initial
   source snapshots in the repository. There is no app scaffold, package
   install, browser or actor preflight in this setup.
4. Inspect the freeze, source inventories and actual runtime/configuration,
   then commit readiness before paid work. Each later invocation recomputes
   and compares the full input identity and checks all previous unit hashes,
   reliable usage, same-session continuity and exact current source against
   the saved snapshot. Source unknown to the declared snapshot policy blocks
   continuation instead of being silently omitted from judging.
5. Launch exactly one selected actor or judge through the frozen
   [process-supervision recorder](../process-supervision/recorder.mjs).
   Root owns terminal polling, process closure and review.
   Do not run local tests/builds/captures concurrently. Inspect its exclusive
   `units/UNIT/result.json`, raw stream, terminal response, process events,
   usage and snapshot before requesting the next unit. A partial unit
   directory, failed result, missing usage, changed input or changed source
   blocks subsequent calls. Preserve it; never delete or archive it to retry.
6. Follow the fixed order below. Judge only after that conversation's three
   completed turns, acceptable usage totals and source/access review. A
   valid low score is not an invocation failure and does not automatically
   cancel the remaining declared coverage. There is no favorable rerating.
7. Save the unchanged rubric outcome and a separate manual regression
   interpretation. Inspect all raw commands/outputs for private content,
   repository or other-run access, actual skill reading and no-building
   compliance. Keep heuristic flags unchanged; explain any manual correction
   separately. Do not run an old report command that overwrites old results.

| Order | Person | Repetition | Units, in order |
| --- | --- | --- | --- |
| 1 | analyst | 1 | actor 1, actor 2, actor 3, judge |
| 2 | analyst | 2 | actor 1, actor 2, actor 3, judge |
| 3 | analyst-overstate | 1 | actor 1, actor 2, actor 3, judge |
| 4 | analyst-overstate | 2 | actor 1, actor 2, actor 3, judge |
| 5 | student | 1 | actor 1, actor 2, actor 3, judge |
| 6 | student | 2 | actor 1, actor 2, actor 3, judge |

These are supported command forms, not launch records or an automatic loop:

```sh
planning_node=/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node
planning_runner=evals/runs/stage-3-completion-2/planning-regression/runner.mjs

"$planning_node" --test evals/runs/stage-3-completion-2/planning-regression/contracts.test.mjs evals/runs/stage-3-completion-2/planning-regression/process.test.mjs
"$planning_node" "$planning_runner" --dry
"$planning_node" "$planning_runner" --prepare
"$planning_node" "$planning_runner" --person analyst --rep 1 --turn 1
"$planning_node" "$planning_runner" --person analyst --rep 1 --turn 2
"$planning_node" "$planning_runner" --person analyst --rep 1 --turn 3
"$planning_node" "$planning_runner" --person analyst --rep 1 --judge
```

The recorder arguments wrap each command separately. Preserve the recorded
command, stdout, stderr and terminal result outside the adapter's own
exclusive unit directory. Do not invoke the unbounded legacy batch runner
or batch judge as a shortcut.

## Bounds and authority of records

Each actor has 900000 ms of work, each judge 600000 ms, with at most
5000 ms for shutdown. Before continuing or judging, the conversation's
summed reported input-plus-output must be below 2000000, its
input-minus-cached-plus-output below 350000, and its summed actor duration
below 2700000 ms. Equality or missing/unreliable counters stops paid work.
Reported resumed counters may overlap and are summed conservatively.
The maximum declared paid work is 330 minutes across 24 units; shutdown
and recording overhead are separate. These are not hard dollar or
in-flight token caps.

`units/UNIT/result.json` is the authoritative execution gate. Compatibility
`meta.json` and flat conversation files exist for the old packet and score;
they cannot override a failed unit or missing final artifact record.
Recognized actor source is snapshotted before and after each unit. Shared
generated-tree and verified bare-Git exclusions remain unchanged and are
reported. Unknown nonempty paths or non-regular source stop the adapter.
Read-only judging must not change actor source. A source-bound, completed
conversation is still not a passing rubric result, full build, taste
selection or actual author approval. Configuration isolation is not a
filesystem read jail.

Status: source preparation only. Root must save the actual validation and
launch disposition. Any later behavioral skill edit reopens the necessary
final regression coverage; do not launch this cohort prematurely.
