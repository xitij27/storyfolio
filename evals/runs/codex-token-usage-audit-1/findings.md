# Portfolio token usage from saved runs

On 11 October 2026 the author asked whether token consumption can be known
for evaluating a portfolio and building a new one. This is an offline
usage audit of existing records. No new portfolio conversation, judge or
full build was launched to answer it. No account-wide session logs were
read. The skill and original evaluation artifacts remain unchanged.

## Steve source review: measured usage

The final `turn.completed` event and `meta.turn.usage` agree in
`../codex-steve-review-before-1/steve-source/natural-1/`:

| Category | Tokens |
|---|---:|
| Input, including cached input | 319,691 |
| Cached input, a subset of input | 277,376 |
| Uncached input, input minus cached | 42,315 |
| Output | 3,972 |
| Reasoning output, a subset of output | 207 |
| Cache-write input, as recorded | 0 |
| Input plus output | 323,663 |

Model: `gpt-6.1-sol`, medium reasoning, Codex CLI 0.162.1. This is one
source-only task with several tool/model exchanges, not a 319,691-token
user prompt or unique source document. The input count includes context
processed again during those exchanges. About 86.8% of input was cached.
Do not add the cached or reasoning fields again when calculating the total.

This measures only the frozen review actor. It excludes the coordinator's
conversation, collaborating agents, harness development, independent source
and browser interpretation, and documentation work. The separate browser
checks started no paid harness conversation, but that does not make the
agents' surrounding work token-free. No complete combined total for that
larger task is captured in this repository.

## New portfolio: planning records, no full-build measurement

The skill currently ends at a storyboard, before implementation. The six
completed three-turn plans in `codex-closing-1` used the same skill bytes
as the Steve pilot, Sol medium and CLI 0.162.1. Their last saved usage
counters give the following descriptive statistics:

| Final counter | Minimum | Median | Maximum |
|---|---:|---:|---:|
| Input, including cached input | 235,136 | 256,532 | 422,349 |
| Cached input | 186,752 | 204,096 | 388,352 |
| Uncached input | 33,997 | 36,833.5 | 69,370 |
| Output | 13,515 | 16,085.5 | 18,046 |
| Input plus output | 248,651 | 273,927.5 | 439,223 |

Each row's median is calculated independently; medians need not add up.
The six plans cover three fictional cases, twice each. They are not a
representative estimate for arbitrary portfolios. Separate judge usage
and all surrounding development work are excluded.

**Accounting limitation:** the runner resumes the same session for the
three messages and copies each final CLI usage object unchanged. The
saved counters increase in every selected conversation, consistent with
cumulative accounting. We retain the last counter once and do not sum the
three readings. The official pages checked document usage fields but do
not establish the exact reset behavior of this CLI version on resume.
Therefore these are verified final-counter statistics, with provisional
interpretation as whole-conversation consumption. They are not an exact
budget, a billing total or a full-build estimate.

No measured implementation, asset-generation, browser QA or revision budget
for a complete new portfolio exists in the Storyfolio studies inspected.
Building the reviewed app locally to inspect it is not generating a new
portfolio. An honest full-build estimate needs a completed instrumented
build at a defined scope and quality target.

## Accounting for future work

Keep raw usage next to each run and group work into source review, planning,
implementation, assets, QA and revisions. Track model, reasoning setting,
run/session identity, outcome, input, cached input, cache-write input,
output, reasoning output and elapsed time. Capture failed attempts and
subagent work too. Establish counter scope before summing: use independent
per-request/turn counts or differences of verified cumulative counters.
Do not count both raw streams and duplicate metadata.

Use a small summary per portfolio with these phases and a combined total.
Before treating it as a price estimate, apply the appropriate model/account
rates to the separate token categories and include any other charged tools.
No dollar price or subscription-allowance conversion was calculated here;
the existing harness records `costUsd: null`.

The current harness already saves raw usage. This audit proposes the
reporting boundaries above; it does not implement a new live meter or start
a build. It is reproducible from `audit.json`:

```sh
node evals/runs/codex-token-usage-audit-1/verify.mjs
```

## Sources and verification

Local evidence: the review's `turn1.jsonl` and `meta.json`, each selected
planning run's `turn1.jsonl` through `turn3.jsonl` and metadata, and
`evals/lib/codex.mjs:54` plus `evals/codex-run.mjs:48`. The audit records
source hashes and individual counters without altering those sources.

Official OpenAI documentation checked on 11 October 2026:

- [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
  documents JSONL output and the final usage event.
- [Observability and usage](https://developers.openai.com/api/docs/guides/agents-api/observability)
  explains that cached input is included in input and reasoning in output,
  that repeated calls and subagents contribute usage, and that recorded
  usage is not a final bill. Its Agents API fields do not by themselves
  validate Codex CLI resume accounting.
- [Counting tokens](https://developers.openai.com/api/docs/guides/token-counting)
  explains why output counts include more than visible answer text.

This audit and the required repository checks make no model calls.
The offline verifier passed, all 54 repository tests passed, the skill
check passed at 687 words and four references, and whitespace checks passed.
