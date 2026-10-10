# Steve repository review pilot: unchanged skill succeeds in this case

Completed 11 October 2026, Europe/Berlin. One natural source-only review
selected and read Storyfolio, then supplied useful feedback without forcing
its new-portfolio workflow. The saved output passes all nine frozen review
criteria in a manual assessment. No observed failure warrants a new skill
instruction. The pilot stops here with the skill unchanged.

## Question and inputs

The author explicitly asked to improve the skill by evaluating
`\\wsl.localhost\Ubuntu\home\kshitij\projects\portfolio-website-steve`.
This real repository case took priority over the earlier fictional-first
proposal. The [pilot plan](../../../docs/superpowers/plans/2026-10-11-steve-review-pilot.md)
bounds the experiment and conditional follow-ups.

The source HEAD is `9a5603d51463eb2564f8b5a117b2242678c660b1`.
Thirteen allowlisted source/assets files preserve the dirty checkout's
bytes, including its modified lockfile, with a separate context file.
`Profile.pdf`, Git metadata, node_modules and the inactive earlier design
output were not copied into the actor's material. The PDF was not opened.
Real source is outside the fictional `evals/people/` collection and requires
review before any public release.

Preparation commit: `1787ede6804f294e63ea1e09bdfe602f38d1c94f`.
The frozen case, request, criteria, skill, harness and capabilities are in
`inputs/`, with digest
`0760678f75f4bb0f8b7d9f4297af96c60911585e540c53407871bc6e79401b7e`.
The criteria were fixed before the run. No independent source/runtime
findings or expected answers were supplied to the actor.

## Execution and observed result

```sh
node evals/review-run.mjs --case evals/reviews/steve-source/case.json --cohort codex-steve-review-before-1 --invocation natural --rep 1
```

This was one `gpt-6.1-sol`, medium, single-turn conversation using the
existing Codex adapter. There were no failed model attempts, forced
invocations, candidate conversations or paid judge subprocesses. Network,
web/browser tools, apps, plugins and memory were disabled. The copied-file
allowlist is not an enforced shell-read boundary, a known harness limit.

The [review](steve-source/natural-1/files/docs/story/review.md) puts the
empty project destination first, then opening specificity, attributable
contributions, illustration copy/controls and contact purpose. It supplies
source references, preservation advice, concrete next steps and completion
checks. It records unverified claims and unavailable runtime evidence.
It does not require a 3D redesign, confirmation gate or concept selection.

The [manual assessment](manual-assessment.md) records a pass for scope,
evidence, priorities, preservation, actionability, factual restraint,
inspection honesty, format independence and provenance. This is a
second-reader collaborating-agent assessment, not a blinded rating. The
reviewer had seen the source and the coordinator's preliminary conclusion.
There is no pooled score or claim of independent judge reliability.

The raw transcript confirms successful reads of the skill and its profile
reference. Only `docs/story/review.md` was added to the workspace; no source
material changed. A Git-status command failed because the workspace is a
snapshot, and the actor correctly used the supplied revision context. A
filename search under `/tmp` found browser-related paths but did not launch
a browser or read the coordinator's findings. See `command-audit.json`,
`turn1.jsonl` under the run, and the assessment's detailed audit.

## Separate product observations

The [combined portfolio review](../codex-steve-review-observations-1/review.md)
adds independent local-browser evidence. A production build passed in an
isolated copy. The five sampled widths had no horizontal overflow; sampled
keyboard menu, reduced-motion and JavaScript-off behavior worked. Mobile
stage labels, pause size and automatic advancement after manual selection
are concrete usability improvements. The suspected intermediate-width
navigation issue was not reproduced. Nineteen screenshots, scripts, logs,
environment versions and measurements are saved with that review.

Those observations were never inputs or hidden requirements for this
source-only actor. They are not evidence that the review harness or skill
can independently acquire and interpret a running website.

## Verification and decision

`verify.mjs` checks all frozen hashes against the preparation commit, case
provenance, saved output hashes, completion and lack of material edits.
Run it offline with `node evals/runs/codex-steve-review-before-1/verify.mjs`.
The original reviewed-file hashes, HEAD and dirty status are preserved in
the observation cohort's `source-preservation.json`.

There is no instruction-to-failure mapping because this pilot found no
failure to correct. The plan's forced diagnostic, candidate rerun and
student regression conversations are conditional and were not needed.
Local harness tests do not count as model conversations. The new runner
has six invariant tests; the repository suite passes 54 tests and the
skill check passes at 687 main words and four references.

This is one real case with no no-skill comparison, repeated sample or
blinded judge. It establishes a useful source review in this invocation,
not the skill's causal contribution or general reliability. The fictional
control, dedicated skill routing, GitHub/deployed acquisition and browser
review evaluation remain open. A future instruction requires a future
observed failure. Do not repeat this successful case only to manufacture
a reason to add instructions.
