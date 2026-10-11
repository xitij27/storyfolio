# Settled baseline judge audit

12 October 2026. Root confirmed execution-tool session `84847` closed before
this audit ran. The saved inner judge result remains valid under the frozen
validators: 15 pass, zero fail, ten unobserved. The unexplained outer-tool
exit 143 is retained separately below. It is not silently converted to zero,
and there was no retry, recovered judgement or new model call.

## Exact saved result verification

The [retained verifier](verify-judge-audit.mjs) ran once with `--save` and
exited 0. [Full verification](judge-audit-verification.json) records hashes,
usage, counts, fixed eligibility, all 48 citations, tool-call identities and
the actual judge summary/unblinding. It verified:

- [Judge process](bench-depth-2/baseline-1/judge/process.json): exit 0,
  175,536 ms, no timeout, interruption or spawn error. The actual invocation
  arguments match the frozen isolated judge helper, including the one
  enabled read-only evidence accessor and 600,000 ms deadline.
- [Result](bench-depth-2/baseline-1/judge/result.json): `complete: true`,
  one model call, and exact 14-file artifact set with every saved hash
  verified. Result SHA-256:
  `01de5f73b55870dd96638687556511b2c8526959189e38bc5eb226f95cf7e7d7`.
- The paid packet matches the successful
  [preflight](../stage-3-comparison-1/baseline-judge-preflight.md) exactly:
  unchanged input/acceptance identities, source inventory, complete logical
  prompt, bootstrap, rubric/schema, bundle and artifact descriptors.
- [Delivery ledger](bench-depth-2/baseline-1/judge/page-delivery.jsonl): all
  84 pages were delivered once, in order, with exact page/response hashes.
  There are no duplicate receipts. This proves delivery, not comprehension.
- [Raw stream](bench-depth-2/baseline-1/judge/stream.jsonl): 174 events,
  exactly 84 completed `storyfolio_evidence.read_page` calls and three agent
  messages. No shell or other tool-call type appears. The stream SHA-256 is
  `5044f1a5b27513de56732b061dcc66be68a521282bd2078efa7ebc7e03cbd96d`.
- `item_0` at line 3 and `item_85` at line 172 are commentary. The exact
  terminal `item_86` at line 173, followed by `turn.completed` at line 174,
  is parsed. Its bytes equal
  [final-message.txt](bench-depth-2/baseline-1/judge/final-message.txt).
  The aggregate reply is preserved but is not parsed as JSON.
- The final JSON passes the unchanged schema, observation-eligibility and
  evidence validators. All 48 cited excerpts are literal substrings of
  their supplied text documents, not merely whitespace-normalized matches.
  The saved judgement and counts equal that terminal object.

Usage matches raw terminal counters and both saved result wrappers:
722,479 input tokens, 617,344 cached input tokens, zero cache-write tokens,
6,132 output tokens and 259 reasoning-output tokens. Dollar cost is null,
not an estimate.

The verifier command was:

```sh
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node evals/runs/codex-bench-depth-baseline-2/verify-judge-audit.mjs --save
```

Omit `--save` for a read-only recheck. The saved audit output uses exclusive
creation and is not overwritten.

## Outer coordinator status discrepancy

There are three distinct saved status layers:

| Layer | Saved observation |
|---|---|
| Execution tool, session `84847` | [Final poll](../stage-3-comparison-1/baseline-judge-tool-poll-02.json) says `exit_code: 143` |
| Coordinator recorder's evaluator child | [Recorder result](../stage-3-comparison-1/baseline-judge-command/result.json) says `code: 0`, `signal: null`, finished `2026-10-11T23:18:40.749Z`, duration 179,355 ms |
| Evaluator's actual judge child | [Judge process](bench-depth-2/baseline-1/judge/process.json) says `code: 0`, with terminal model stream and complete validated result |

The final poll's output contains the recorder's successful child record;
after removing its printed output-directory field, that record equals the
saved recorder result exactly. Both recorder stdout/stderr hashes verify.
Its stdout contains the successful evaluator result and its stderr is empty.
The [recorder source](../stage-3-comparison-1/record-command.mjs) matches the
recorded SHA-256
`c3ab91eeb5833650ce9482accf96a5985c85471b9c714da6da820752f797a1b0`.
It records the child's close status, closes and hashes logs, saves the
result, prints it, then sets its intended own exit status from the child
code. It does not record outer-shell signals or their sender.

The final-poll artifact itself is unchanged, SHA-256
`76cc19774935194303f0ce1b7edd0567c4e4460047b33b5fae808aa49293fd5e`.
The discrepancy is therefore real in the saved coordinator observations,
not a mismatch caused by an altered log or summary. These records do not
establish which outer process received a signal, who sent one, or why the
tool reported 143. No origin is inferred.

The [candidate local-check command](../stage-3-comparison-1/candidate-local-tests/command.json)
started at `2026-10-11T23:18:39.026Z`, 1,723 ms before the recorder's finish.
That command includes preliminary validators followed by `npm test`; the
start timestamp does not separately timestamp every subcommand. The test
source includes bounded lifecycle tests which signal their own spawned
process groups. Read-only inspection found no saved signal-sender trace or
process-lineage evidence connecting those tests to this outer status.
Temporal overlap alone does not establish causality. No broader platform
debugging, process signalling, test rerun or judge retry was performed.

Conclusion: the saved inner judge evidence is complete and independently
validates, despite the unresolved outer coordinator-status anomaly. Keep
that qualified result; do not describe the entire tool invocation as an
unqualified exit-0 run or claim that the discrepancy has been explained.

## Meaning and remaining limits

The terminal judgement's scoped reasoning is consistent with the supplied
evidence: factual/attribution distinctions survive; the skill/environment
inventory was actually read; completed actor browser execution is distinct
from unobservable individual image inspection; no recommendation is required
merely to name an unavailable skill. `useful_recommendation` remains
unobserved alongside the nine fixed ineligible criteria. The text judge
does not claim early-gate timing, actual author approval or pixel quality.

Citation/schema validity does not prove every semantic inference. The judge
received no original image pixels, and its `storyboard`/`prototype_brief`
passes concern semantic and structural implementation, not the adequacy of
visual explanation. Independent original-image findings can therefore
require a candidate even though this text score has no failures. The judged
packet is baseline-labelled, exposes the rubric/protocol and automatic
outcomes, and is not arm-blinded. Its unblinding record also preserves
ambient temporary-directory names and the non-read-jail access limitation.

No physical-phone result, natural planning regression, complete-site
quality, journey completion or Stage 3 completion follows from this score.
The actual successful judgement is retained as issued; it was not rescored
or edited by this audit.
