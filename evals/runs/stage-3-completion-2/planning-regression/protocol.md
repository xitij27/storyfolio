# Planning-only regression, prospective protocol

12 October 2026. Execute only after the final Stage 3 behavioral skill change
is committed. This is the original task-13 regression, not a full build or
a new discovery baseline. Root owns every paid invocation, terminal poll,
semantic/privacy review and commit. No regression has been launched.

## Fixed comparison

Use only analyst, analyst-overstate and student, with the skill, twice each.
The six independent conversations compare with `codex-closing-1`; preserve
its original five-of-six full-bar result and analyst repetition 2 backdrop
failure. Do not rerate that cohort or pool its observations with this one.

Actor: `gpt-6.1-sol`, medium. Judge: `gpt-6-astra`, medium.
Preserve the original three planning messages and per-person truth synthesis
exactly, including the deliberate overstatement request and the explicit
no-building instructions. Preserve person/material/truth bytes, original
`judge.md`, `JUDGEMENT_SCHEMA` and `score.mjs` semantics. No v2 rubric,
build rubric, extra expected counts, coaching or post-outcome threshold.

The paid candidate cohort will be `codex-stage-3-planning-regression-1`.
It is not prepared or frozen until the final skill behavior is settled.
Freeze all actual source, model/config/environment and harness identities
at that time. Disclose differences from historical tooling and installed
skill contents; this is not a single-line causal comparison.

## Finite paid envelope and usage gates

There are at most six conversations, three actor turns each, and one fresh
judge only after each completed conversation. Each actor turn has at most
900000 ms; each judge at most 600000 ms. Total paid work allowance is
18 times 15 minutes plus six times 10 minutes: 330 minutes. A bounded
5000-ms shutdown grace per process and recording/source verification
overhead are reported separately. No retries, correction turns, automatic
resumes of incomplete work, substitute repetitions or favorable rerating.

Root approved these between-turn actor limits before adapter implementation:

- Sum reported `input_tokens + output_tokens` below 2000000 per conversation.
- Sum reported `input_tokens - cached_input_tokens + output_tokens` below
  350000 per conversation.
- Every counter and duration is a nonnegative safe integer; cached input
  is present and no greater than input. Missing or unreliable usage blocks
  continuation and judging, never becoming zero.
- Check the completed actor totals before every next actor turn and before
  its judge. Equality at either threshold stops further paid work for it.
- These are prospective spending stops, not quality thresholds. Counters
  reported on resume may overlap; sum them conservatively and retain raw
  usage. A running turn can exceed a threshold before returning. Neither
  wall deadlines nor between-turn counters are a hard cost or in-flight
  token cap. No dollar estimate is inferred.

The six historical closing conversations summed to 454855 through 831862
reported actor tokens and 104438 through 170167 uncached-input-plus-output
tokens under that same conservative arithmetic. The limits provide roughly
2.4 and 2.1 times the observed maxima, respectively. Historical judge
reported totals were 24845 through 29915 tokens. These observations are
reference points, not forecasts for the longer current skill.

Process serial units in the fixed order analyst repetitions 1 and 2,
analyst-overstate repetitions 1 and 2, then student repetitions 1 and 2.
For each: actor turns 1, 2, 3, then its one judge. A lifecycle, integrity,
missing-usage, structured-output or other execution failure halts later
units and remains saved. A valid lower rubric score is an outcome, not an
invocation failure; retain the remaining declared cases when useful.
The adapter never picks another judge to improve that score.

## Why a local adapter is necessary

`evals/codex-run.mjs` supports person, arm, iteration, repetition and model,
but no per-turn timeout flag. It calls the shared `invokeCodex` default:
25 minutes with a soft SIGTERM, not the approved 15-minute bound. It also
archives an existing failed output on re-invocation. The batch runner
automatically queues conversations and has no usage gate.

`evals/codex-judge.mjs` supports iteration, people and model, but no exact
repetition or timeout selector. It may run three judges concurrently and
overwrite failed judge artifacts on re-invocation. Its aggregate-reply JSON
parse also retains the already-documented commentary/final parsing hazard.
A shell timeout around a whole conversation cannot enforce three separate
per-turn deadlines or a single chosen judge.

The approved adapter stays under this study directory and changes no shared
runner or historical bytes. It reuses exact planning `codexArgs`, not
`buildCodexArgs`: no enabled project instructions, app/build permissions or
new tools. It preserves the original prompt and blind judge-packet assembly.
It adds exclusive artifacts, an immutable input freeze, one unit per
invocation, strict source/session/usage checks and bounded owned-process
shutdown. Unlike the old unrestricted final file walk, its declared source
inventory stops on unknown nonempty top-level source; report this as an
apparatus difference, not a skill-quality failure. Streamed lifecycle events
and synchronous raw writes do not depend on an asynchronous log-end callback.
If the child never closes by the shutdown bound, forced record settlement
remains a failed unit and does not prove all descendants exited. The actual
outer process-supervision recorder is also part of the frozen identity.
Judge JSON uses the existing validated terminal-message extractor,
never commentary concatenation, substring scanning or an earlier valid JSON
message. Preserve the full stream and aggregate reply separately.

## Required review and interpretation

Completed execution is not a passing planning result. Review all original
replies and produced plans for factual honesty, refusal of overstatement,
private material handling, opening/closing meaning and actual no-building
compliance. Keep the original rubric result and a separate source-based
regression interpretation. Do not silently broaden its old reported-only
criteria or turn 5/6 historical success into a newly invented score threshold.

Inspect every raw command and output for actual private content reads,
cross-run or repository input reads and skill/reference access. Filename
listings alone are not private-content reads. Preserve the heuristic flags
and any separately justified manual correction. The sandbox is not a
filesystem read jail.

The judge receives the original blinded packet structure, with private
files omitted as before. It is independent of coordinator conclusions and
is allowed once only after three completed, source-bound, usage-accounted
turns. Root must preserve invalid judgement bytes as an execution failure;
no repair or second judge is included.

This protocol and its bounded adapter must be reviewed and deterministically
tested after active actors/captures close. Any later behavioral skill change
reopens affected regression coverage; do not launch this suite prematurely.
