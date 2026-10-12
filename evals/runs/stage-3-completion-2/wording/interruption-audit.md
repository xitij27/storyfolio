# Independent wording interruption audit

12 October 2026. Read-only lifecycle and scoped process audit after root
confirmed the outer tool session closed. No model, test, build, browser,
signal, cleanup or actor-workspace write was performed by this audit.
Root separately owns source/check preservation and wording assessment.

## Observed lifecycle

The [new recorder command](actor-turn-1/command.json) started at
04:12:14.279Z, recorder PID 198325, runner PID 198336. Its retained
[lifecycle](actor-turn-1/lifecycle.jsonl) has seven sequential events:

- Sequence 1: recorder started, 04:12:14.283Z.
- Sequence 2: runner spawned, 04:12:14.286Z.
- Sequence 3: recorder caught external SIGTERM at 04:18:44.796Z,
  390517 ms after recorder start; sender is unknown.
- Sequences 4 and 5: the recorder forwarded SIGTERM once to its owned
  runner PID at 04:18:44.797Z, delivery reported true.
- Sequence 6: runner exited code 1, no terminating signal, 04:18:45.589Z.
- Sequence 7: runner closed at 04:18:45.590Z.

The recorder's [result](actor-turn-1/result.json) is explicitly incomplete
and externally interrupted, duration 391311 ms. No force escalation was
attempted and no child error was recorded. The closed outer
[tool return](actor-turn-1-tool-poll-10.json) has exit 1 and exactly the
same final recorder result. This is successful evidence retention of an
unsuccessful interrupted actor, not an actor success.

The actor's [started record](../../codex-build-wording-candidate-1/embedded-completion-1/baseline-1/turns/01/started.json)
gave turn 1, requested stop 5, a 900000-ms deadline. Its
[process record](../../codex-build-wording-candidate-1/embedded-completion-1/baseline-1/turns/01/process.json)
reports code -1, duration 389161 ms, `timedOut:false`,
`interruptedBy:"SIGTERM"`, no spawn error and no log error. Its normal
saved [result](../../codex-build-wording-candidate-1/embedded-completion-1/baseline-1/turns/01/result.json)
is `complete:false`, with null usage and a 186-file snapshot. Null usage
means cost is unavailable, not zero. The actual external interruption
preceded the actor's owned deadline; it must not be relabeled a timeout.

## Raw closure integrity

At 04:22:15.891Z, independent native Node read-only assertions verified
all four recorder raw-artifact hashes, all 379 actor artifact hashes and
all 216 frozen inputs. The input digest remains
`f769a7bc93d45c1a2e17394809d43e2cd36c21c0992a2ffe3af31bb31c9facb0`.
The verification command exited zero, tool chunk `d37366`.

The stream has 60 valid JSONL events, 226616 bytes: one thread start,
one turn start, 28 command starts and 26 command completions, plus four
completed agent messages. There is no `turn.completed` or terminal usage.
The saved `reply.md` aggregates those four progress messages; it is not a
completed final handoff. The last stream modification was 04:18:42.167Z,
before the recorded external signal.

Two started commands lack completion events:

- `item_25`, stream line 48: `npm run check -- --jobs=3 --wait=1000`.
- `item_29`, stream line 56: reads the earlier check manifest and runs
  `scripts/check-spine.mjs` into the newer supplemental directory.

The last completed command is `item_31`, line 60, creating a local contact
sheet helper under `/tmp`; its complete source is retained in the raw
command. That event does not prove the helper was executed or its images
reviewed. Skill access is explicit at `item_1`, lines 4-5, reading the
installed `SKILL.md`; `item_2`, lines 6-7, reads `references/building.md`
and supplied story documents. This lifecycle audit is not an exhaustive
held-out-access audit or a filesystem-read-isolation claim.

`item_21` created the saved whole-beat copy choices, and progress message
`item_22` describes them. These may support a separate partial-content
assessment, but cannot replace the absent completed response, reliable
usage and eligible continuation gate. No second turn or retry follows
from this audit.

Binding SHA-256 values:

- Actor result: `d417a23e61beaecc5ca4b4d2ea67b07a0e18efd09c789bc49654ff0bd242584f`.
- Actor process: `e68c6128b9b5605a57a716f6994cf18c81407c48db156b3e6525876cedf9327b`.
- Actor stream: `1f749b35e75f86150f53a1dd19ddf2c8102f60bd348426f87248ca163f709f0b`.
- Recorder result: `60b65061bda7f498510eed663889505228e5495ad77db8cb4f48a5a2ad590501`.
- Recorder lifecycle: `0eea3fddb3cd66dc8eff76156bbbf5433c1e96071bfa17d8c9e19f2f23e2c378`.

## Limited post-closure process observation

At 04:21:37.586Z, read-only `/proc` inspection found recorder PID 198325
and runner PID 198336 absent (`ENOENT`). It inspected 77 same-UID
processes and 2041 readable descriptor links. No direct child of those
PIDs and no process cwd or descriptor tied to the exact actor workspace,
cohort run directory or recorder output directory was observed. The exact
workspace was
`/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-embedded-completion-1-kE257A`.
The inspection exited zero, tool chunk `2eca75`.

PID 372 denied cwd and several descriptor-link reads; PID 374 denied cwd
and descriptor-directory reads. No argv, environment or descriptor target
contents were opened. A detached or reparented process with a different
cwd and no scoped descriptors can evade this check. The observation is
limited process-ownership evidence, not universal process absence.

## Attribution

The newly retained signal establishes that this recorder received SIGTERM
and forwarded it. It does not identify the original sender, why the signal
was sent, or whether the runner independently received the same signal.
No common cause with earlier interruptions is established. This auditor
performed only static reads and repository documentation edits during the
live actor; no test, browser, build, process cleanup or signal was issued.
No platform-wide debugging or retry is authorized by this audit. Stage 3
and the matched wording handoff remain incomplete.
