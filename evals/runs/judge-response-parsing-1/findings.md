# Judge final-response parsing repair

11 October 2026. Local engineering work following the author's direction:
"okay I have given you full access. You can proceed with the development of
next stuff for this project according to our plan after the tests are done".

## Observed failure

The completed [five-beat judge attempt](../codex-bench-depth-baseline-1/bench-depth-1/baseline-1/judge/result.json)
received all 23 evidence pages and exited successfully. Its stream contains
three completed agent messages: two progress updates and a terminal JSON
judgement. `summariseCodex` deliberately preserves every agent message in
`reply`. The build judge tried `JSON.parse(turn.reply)`, so the leading
"I’ll read" update caused a SyntaxError. That is a coordinator parsing
failure after a completed model turn, not an actor implementation failure
or an incomplete evidence transport.

[The reproduction](reproduce.mjs) checks the SHA-256 hashes of the original
stream, process record and aggregate reply before reading them. Its
[before result](before.json) reproduces the exact SyntaxError with the
pre-repair implementation. No historical file is modified and no model is
invoked. The immutable original stream is the real regression fixture;
synthetic streams in the unit and integration tests cover negative cases.

## Repair

`finalCodexMessage` reads only a successful, identified, single completed
turn. It requires a nonempty completed agent message immediately before
the terminal `turn.completed` record. It rejects malformed JSONL, absent
session identity, unsuccessful process exits, failure records, additional
turns, trailing events and missing terminal messages. It returns the exact
terminal text without finding embedded JSON, stripping fences or trying
an earlier message when the final JSON is malformed.

The build judge retains `reply.md` with all commentary, saves the exact
terminal text separately as `final-message.txt`, then applies the existing
JSON/schema/criterion/citation validation. Timeouts, interruption and spawn
errors cannot become scores even if a response incorrectly supplies code
zero alongside a completed stream. Paged delivery verification, evidence
hash checks, no-overwrite and no-retry behavior remain in place. The shared
parser is explicitly included in the required frozen judge implementation.

The historical aggregate semantics of `summariseCodex`, actor replies,
usage and command summaries are unchanged. The older planning judge entry
points are outside this bounded change and still parse the aggregate.
They need their own scoped adoption decision if this failure is encountered
there. This patch does not change the skill, engine, frozen inputs, original
judge result or rubric.

## Verification

Before implementation, `node --test evals/lib/codex.test.mjs` failed its two
positive extraction regressions. The [retained summary](before-tests.json)
records the seven tests and qualifies a rejection test that also passed
when the helper was absent. Three focused build-judge integration tests
then failed against the old code, including the real commentary-before-JSON
trigger. [Their complete output](before-integration.tap) is retained.

After implementation:

- `node --test evals/lib/codex.test.mjs evals/lib/build-score.test.mjs`
  passes all 41 tests. [Complete output](after-tests.tap).
- `node evals/runs/judge-response-parsing-1/reproduce.mjs` verifies the
  original hashes, retains the identical aggregate parsing failure and
  extracts the exact terminal message. That message parses into schema
  version 2 with 25 criteria. [Complete output and implementation hashes](after.json).
- The integration tests preserve commentary, terminal text, original
  source/citation checks, full-delivery requirements and failed attempts.
  They reject fallback to earlier valid JSON and preserve no-retry behavior.

The [repository checkpoint](repository-verification/result.json) passes all
310 tests across 31 suites using the available native-TypeScript Node
22.22.1 binary. Skill, all seventeen people, fixture, whitespace and frozen
judge-audit checks also pass. Full stdout/stderr, exact command arguments,
source hashes and durations are retained beside that record. The initial
host-Node test failure is preserved in the reconciliation history; no source
change was needed for that documented runtime limitation.

The same checkpoint verifies all 121 frozen inputs, 384 actor artifacts and
13 raw judge artifacts. It checks that the early committed actor stream is
an exact prefix of the completed stream and that both historical archives
are byte-identical to their `b81d2b7` sources. Shipped skill/engine, accepted
prototype and frozen cohort inputs have no diff against that checkpoint.
This is not a visual-quality or completed-browser-acceptance claim.

The reproduction reports syntax extraction only. It does not silently
replace the failed historical judge record or assert that the recovered
criteria are correct. Any retrospective validation or interpretation must
remain separately labelled and bound to the saved evidence.

## Source review and limits

The captured CLI format does not label commentary and final messages with
different channels. Selection therefore follows the observed lifecycle:
the completed agent message immediately preceding the sole turn completion.
Any future CLI format that inserts other events there fails closed and
needs a new compatibility test. Older synthetic fixtures lack `turn.started`;
one is permitted but not required, while more than one is rejected.

An [independent review](../codex-bench-depth-baseline-1/judge-audit/parser-review.md)
found no blocking issue and checked all 114 historically completed streams
among 115 retained streams against the new extractor, without a rejection.
This is compatibility evidence for saved events, not every future CLI format.

The parser rejects every top-level error event, even if a future CLI could
recover from one. Tool failures represented inside completed items remain
evidence and are not treated as turn failure. This conservative behavior
prevents silently accepting a score from an ambiguously completed stream.
Future runs must freeze the repaired implementation. The old cohort cannot
be rerun with changed evaluator hashes, and no additional model call or
release is part of this repair.
