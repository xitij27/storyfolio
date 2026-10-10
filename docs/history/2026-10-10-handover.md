# Handover

## Existing portfolio review: direction accepted, implementation planned

On 10 October 2026 the author accepted the recommendation for a separate
existing-portfolio evaluation path, feedback before redesign, general
portfolio usefulness separate from Storyfolio suitability, and an observed
failure before adding instructions. They said: "I agree with your ideas.
And id like to know how we can turn this idea into concrete implementation
plan". This supersedes the earlier capability review's pending status for
that direction. The detailed implementation is proposed, not executed.

The design is
`docs/superpowers/specs/2026-10-10-existing-portfolio-review.md`; the plan is
`docs/superpowers/plans/2026-10-10-existing-portfolio-review.md`.
Start with a single fictional conventional portfolio that contains useful
work, an overstated/incorrectly attributed prototype result, and a contact
anchor with no matching target. Freeze its evidence and separate review
criteria, then observe one unchanged-skill review. Keep expected answers
outside the test agent's inputs. Add only failure-backed instructions,
repeat the same case, and check the existing student creation case twice.

The ordinary candidate path is four new conversations and two existing
planning judgements. Review outputs are initially assessed manually with
cited evidence, not represented as blinded model judgements. A matched
explicit-invocation diagnostic adds at most two conversations if needed
to separate skill discovery from behavior after loading. If the initial
review succeeds with the skill selected, add no redundant corrective
guidance. A good review without a skill read is still a discovery miss and
does not justify adding a review checklist. These are planned
counts; none of these conversations has been run.

The current runner always sends three planning turns and the current
rubrics judge plans. Its browser/network tools are disabled and its judge
reads material as text. The proposed small review runner reuses the Codex
process adapter while preserving all existing planning paths and evidence.
Two independent read-only planning reviews confirmed these limits and the
need to distinguish natural discovery from forced skill invocation.

Browser inspection is a later, separate milestone. It begins with actual
tool discovery and deterministic local probes, then two declared review
sessions covering working-browser and text-only conditions. Changes prompted
by those sessions need their own affected-case repeats. The author's site
is a final practical walkthrough; it is not independent evidence because
it originated the skill. Until that milestone is complete, call the first
result content review, not a validated live-site audit.

This piece of work adds only the design, plan and this handover record.
No paid evaluation, fixture, runner, skill change or site modification was
started. The pre-existing documentation-organization plan belongs
to separate work and is left untouched.

Verification passed: the skill check reports 687 main words and four
references, all 48 local tests pass with approved Git-subprocess access,
and whitespace checks pass. Independent final review clarified the discovery
gate and required preserving any edits to the copied site evidence.

## Documentation organization review

On 10 October 2026 the author asked whether the files and documentation
could be better organised "without losing any details and information".
The review and proposed migration are in
[the documentation organization plan](superpowers/plans/2026-10-10-documentation-organization.md).
Recommend a short current handover with a complete verbatim historical
archive, a documentation map, plan/status and study indexes, and a clear
division between current Codex and historical Claude instructions. Keep
all evidence paths and bytes intact, verified by an inventory; the existing
manifests and v2 source-tree checks depend on them. No reorganization has
been executed in this review, and no paid evaluation was started.

The preceding question, "wait so have we improved the skill or just the
evals?", was clarified: the direct skill changes are two storyboard
paragraphs, for opening clarity and supported closing meaning. The other
accepted work improved evaluation, supplied richer fictional evidence and
prototyped a privacy boundary. Creative guidance was not changed, and live
privacy enforcement is still unimplemented. This distinction should remain
prominent in the proposed current handover.

## Existing portfolio evaluation: capability review

On 10 October 2026 the author asked whether the skill can evaluate an
existing portfolio, giving `https://xitij27.vercel.app` as the example.
This is an exploration of that use case, not an accepted change to the
skill or a request to rebuild the site.

The current version explicitly plans a portfolio and stops at an approved
storyboard; it does not build websites yet. An existing website is already
supported as source material in `references/reading-a-profile.md`, including
asking what should become of it. There is no evaluation-only path. The
three stops still lead through fact confirmation, new concepts and a new
storyboard. Useful review criteria already exist in `references/concept.md`
and `references/storyboard.md`: personal specificity, narrative progression,
an opening question with a supported closing answer, explanatory 3D,
factual restraint, a quick visitor route and accessible fallback planning.

The supplied URL was inspected through its server-returned HTML on this
date. The web browsing tool could not access it; sandboxed curl failed DNS
resolution, and an approved network fetch succeeded. Script and style
content were stripped for reading. This was a content inspection, not a
rendered desktop/mobile review, a source-code audit or a paid evaluation
conversation. Animation, scroll timing, first-screen visibility, contrast,
keyboard behavior, performance and actual fallback behavior remain untested.
No biographical or project claim was independently verified.

Observed content and preliminary editorial assessment:

- The opening asks what it takes to move AI from proof of concept to
  production. The paper's chapters run from Abstract to Conclusion, and
  Method develops a Data, Model, System sequence. That gives the text a
  coherent argument to preserve in any review.
- Experiment descriptions explicitly identify the speech demonstration's
  synthesised audio and substitute rule, and the robot demonstration's
  substitute layout and planner. Those disclosures are useful evidence of
  distinguishing an illustration from the original project; they do not
  independently establish the accuracy of the underlying claims.
- The conclusion's answer is chiefly that the author is still learning,
  followed by a reference to the experiences covered. An editorial review
  could recommend synthesising the Data, Model, System lessons into a more
  direct answer to the opening question, using only confirmed facts.
- The HTML contains chapter links, CV and email links, a skip link and
  no-JavaScript styling. Their presence is observable; their usability and
  viewport placement have not been established by this inspection.

Recommendation, not yet accepted: support an explicit review path that
inspects the existing work, records strengths and problems with evidence,
marks untested behavior, and prioritises improvements. Clarify the intended
audience when it would change the advice. An evaluation request alone does
not authorise a redesign. Separate general portfolio usefulness from fit
with Storyfolio's particular long-scroll, one-object 3D form. A portfolio
without that form is not automatically defective.

Before adding instructions, run one focused review-only experiment against
a fictional portfolio with frozen evidence and known issues. Observe what
the current agent gets wrong, save that run in `evals/runs/`, then add only
guidance justified by an actual failure and repeat the affected case.
Review quality needs its own criteria; the existing harness disables web
search and its rubric judges plans, so its scores do not validate live
website audits. Frozen evidence can test critique, while browser inspection
would need separate capability coverage. The author's paper portfolio is
already the skill's originating example, so it is useful for a walkthrough
but weak independent evidence of generalisation. No new fixture, paid run,
skill edit or website change was made for this capability review.

Verification: `node evals/check-skill.mjs` passes at 687 main words and four
references, and `git diff --check` passes. The sandboxed `npm test` failed
its Git-dependent measurement test file; the approved rerun outside the
sandbox passed all 48 tests. Only this handover was changed.

## Accepted improvements implemented and evaluated

On 10 October 2026 the author said: "yes, I like your recommendations.
Let us implement them". The plan is
`docs/superpowers/plans/2026-10-10-accepted-improvements.md`.
All five workstreams are complete within that plan's scope. Two small
paragraphs in `skills/storyfolio/references/storyboard.md` clarify opening
and closing meaning; the main skill and its description are unchanged.
Each candidate was committed before its separate evaluation under the
unchanged v1 rubric. Existing runs and scores remain intact.

Opening candidate `749eee0` has completed six conversations and six judges
in `evals/runs/codex-opening-1/`, without runner failures or retries. All
six read the new instruction, pass plain-reader clarity and preserve the
factual boundaries. Both nurse and both embedded openings now explain
the work and terminology. Full bar is 3/6: one nurse misses first-turn
hospital-asset clarification, one student misses explicit padding discovery,
and the other student fails swap/backdrop. The candidate is retained for
the targeted clarity improvement, with the small-sample and differing
earlier-version limits recorded in `findings.md` and `comparison.md`.

Closing candidate `b85d014` completed six conversations and six judges in
`evals/runs/codex-closing-1/`, without failures or retries. All six read the
new guidance, specify an actual supported answer and preserve factual
boundaries. Analyst question/answer passes rise from 1/2 to 2/2;
analyst-overstate from 0/2 to 2/2; student remains 2/2. Full bar is 5/6,
with analyst repetition 2 still failing backdrop. Both overstatement cases
refuse the false claim and offer true alternatives. Both students preserve
group credit, modelling status and pending permissions. Four private-read
heuristic flags were filename inventories, as the saved manual audit of
all 35 commands shows; those CSVs were not read. This observed compliance
does not resolve the failed PhD privacy case. Retain the closing candidate
for its supported answer result, without attributing unrelated score
changes to that line or treating this small sample as a release test.

The separate privacy prototype passed twelve deterministic shell probes
using exact public-file grants. Exact private-path denial failed a real
hardlink read in an earlier preserved attempt. The copied and original
private fixtures remain present and unchanged. Evidence and the offline
verifier are in `evals/runs/codex-privacy-enforcement-1/`; the opt-in
prototype is in `evals/experiments/privacy-enforcement/`. This establishes
the tested Linux/CLI shell boundary only. Live model integration, other
read-capable tools and other platforms remain untested; the skill alone
still does not enforce privacy. Independent review found no blocker within
that limited scope. No paid model call was used for those probes.

The new `physicist-evidence` fixture is committed at `f2daa12`; the original
fixture is unchanged. The current collection has seventeen cases for
twelve fictional people, so keep explicit case lists. Its two-conversation
experiment completed with unchanged creative guidance and the opening-only
skill in `evals/runs/codex-physics-evidence-1/`. Both explain the supplied
calibration comparison and preserve its numerical and scientific limits.
Full bar is 1/2; the other run fails only concept diversity. Manual review
also finds overlapping concept structures in both runs, so creative range
remains mixed. Keep the richer fixture fixed for any later comparison.
This input experiment has no matched prior cohort and establishes no causal
effect of the evidence alone.

V2 diagnostic judging is committed at `fd8656b`; its six-case
calibration completed once without retries in
`evals/runs/codex-measurement-v2-1/`. It distinguishes asking-and-asserting,
silent avoidance and the two analyst closing meanings while preserving the
assertion failure in its full bar. Creative consistency remains unresolved:
physics now passes backdrop for attribution relationships, and four of six
criterion sets change. One analyst gains a full-bar pass under v2; the old
plan and its v1 result are unchanged. Ninety original run files and three
reports remain byte-identical. No v2 rating replaces a skill-test score.

The work used fourteen new portfolio conversations and twenty judgements,
including the six diagnostic ratings of saved conversations. Each received
one original judgement; none was rerun to seek a pass. Privacy probes used
no models. All 48 local test declarations pass with required Git-subprocess
escalation, the skill check and skill-creator validation pass, and the
seventeen fixtures validate. All five experiment verifiers pass. Original
Codex bar counts still recompute to 12/20 versus 0/20.

The remaining work is creative consistency, the author's concept review
and a later built-site proof. Live privacy integration is separate future
work after the deterministic prototype, not an implemented guarantee here.
No broad evaluation batch, deployment, publication or remote push was
performed for these accepted improvements. The outcome details and exact
verification commands are in the accepted-improvements plan and each
cohort's `findings.md`.

## Recommendations after reviewing the completed results

On 10 October 2026 the author asked: "okay so now we have the test results.
Is it possible to improve the skill in any way? give recommendations".
This is a recommendation review, not an instruction to implement the
candidates or start another paid batch. The skill, fixtures, rubric and saved
judgements remain unchanged.

The original Codex comparison passes the full bar in 12/20 skill runs
against 0/20 baselines. The separate STEM comparison passes in 3/6 against
0/6. Those results support the method, but concern earlier skill versions.
The latest premise cohort is factually clean in all four final plans and
passes the full bar in none. These differently selected cohorts must not be
pooled or treated as a trend in general success rates. The recent factual
refinements remain provisional.

Recommended improvements:

1. **Treat private-file access as an enforcement problem.** Both PhD agents
   in `evals/runs/codex-privacy-1/` read the new rule and still opened the
   participant export. Investigate an integration that controls which files
   or tools the agent can access. No specific enforcement mechanism has
   been validated. Keep the current rule for intent, but do not claim that
   another wording change establishes protection. Preserve the original
   failing benchmark; any new enforcement experiment must be labelled
   separately and check actual reads and attempted reads, not only final
   output. Removing the private fixture from the old test would not fix it.
2. **Make the opening understandable outside the profession.** The nurse
   in `codex-sol-1/nurse/with-2` leaves CNM1 and ISBAR unexplained; the
   embedded engineer in `codex-stem-1/embedded/with-1` opens with firmware,
   power-state and fixture terminology. The concept reference asks for an
   HR-readable question, but the storyboard does not explicitly require a
   plain account of the person's work across the first screen. A small
   candidate should specify that meaning and explain necessary terms from
   confirmed facts, while keeping polished captions deferred. Test nurse,
   embedded and student cases, checking both clarity and factual restraint.
3. **Specify the closing answer before final copy.** The requirement to
   answer the opening question already exists. The output format should
   distinguish the meaning of that answer and its supporting facts from
   its eventual wording. `codex-sol-2/analyst/with-1` leaves an answer
   placeholder; `with-2` supplies a supported synthesis. The later
   `codex-privacy-1/analyst/with-2` again closes on a job objective while
   deferring the narrative connection. A small storyboard clarification
   can require an answer meaning plus its factual basis without restoring
   finished captions. Test analyst and analyst-overstate, with student
   coverage, for both resolved meaning and new unsupported claims.
4. **Ground creative improvement in one shareable piece of work.** The
   physics fixture lacks an actual procedure or schematic; the hurried
   analyst declines details. The skill already asks for diverse concepts,
   personal specificity and explanatory 3D. First review a concrete
   permitted example: what decision was made, what evidence supports it,
   and what relationship the visitor should understand. Compare that
   relationship across the proposed concepts, beyond their object names.
   The backend's repeated-request comparison is a useful saved contrast.
   Use a separately versioned physics fixture if adding evidence, holding
   that fixture fixed for any subsequent skill comparison. A plan with
   insufficient evidence stays provisional; no personal facts are invented
   to force a distinctive story. Do not ban paper objects or force variety
   in object materials. Any later creative instruction needs an observed
   failure after the evidence gap is addressed.
5. **Clarify measurement before optimising for the total score.** Use the
   saved closing-answer contrast and the backend/physics contrast to
   calibrate interpretation. Equivalent accessible HTML does not make 3D
   decorative. Asking a question and asserting the wrong premise can both
   happen in one reply, which the current single trap enum cannot express.
   Consider separate discovery and assertion fields in a versioned future
   rubric. Preserve the effective safety bar when separating them: the
   current no-first-assertion measure is report-only, so merely separating
   the fields could let an asking-and-asserting reply pass. The student's
   padding miss is deliberate under the current
   discovery bar: omission is not explicitly raising the risk. It is not
   evidence of invented testimonials. Report those outcomes separately;
   do not relabel the old failures or add padding questions solely to raise
   the score. Any rubric change needs consistent comparison judgements
   with the original results preserved. Repeated judgements of identical
   saved prompts changed criterion scores in two of four cases, without
   changing full-bar outcomes; they are not new portfolio conversations.

For the next skill edit, the opening and closing clarifications are the
smallest concrete candidates. Investigate privacy enforcement separately,
and obtain the creative example before another generic wording loop.
Evaluate each candidate against its saved misses and student coverage.
Reserve broader validation for a stable candidate; a small change does not
justify repeating every paid run now. The author's concept review and the
later built-site proof remain outstanding.

Evidence was reviewed from the current skill and references, the original
and STEM reports, the privacy and premise findings/comparisons, saved
storyboards and judgements, `evals/prompts/judge.md`, and
`evals/runs/codex-creative-review-1/findings.md`. Independent read-only
reviews checked creative/clarity failures and measurement boundaries.
No new model evaluation conversation or judgement was launched.
Local verification passed: `node evals/check-skill.mjs` (687 main words,
four references), `npm test` (all four test-file subtests) and
`git diff --check`. This piece of work changes only this handover.

## Completed ordered follow-up: privacy still fails, premise improves

On 10 October 2026 the author said: "okay then let us proceed with this
order". The accepted order is the private-file boundary, the remaining
unsupported genomics premise, then review of creative failures. The plan
is `docs/superpowers/plans/2026-10-10-ordered-refinements.md`.

Privacy candidate `8adaaa3` puts a general private-file boundary before
content reading. `evals/runs/codex-privacy-1/` now holds six complete skill
conversations and six judgements: PhD, analyst and student twice each, Sol
medium and Astra medium. Both PhD agents read the new boundary and still
opened the private export. Both analyst agents left their private files
unopened after manual review of false-positive heuristic flags. No private
values appear in final outputs. This is a failed privacy candidate, retained
only for scope clarity, not a reliable access boundary or a resolved issue.

All six final plans preserve the supplied facts; none invents personal
claims. Full bar: 1/6. Remaining failures: both PhD private reads, one analyst
closing answer, one student's first-reply padding check and the other
student's swap test. Full evidence and per-case comparisons are in
`evals/runs/codex-privacy-1/findings.md` and `comparison.md`. The verifier
checks committed skill/input hashes and unchanged original artifacts.

Premise candidate `94faf60` targets the introduction and question directly:
summarize established work, and check what the question assumes against
unanswered factual questions. `evals/runs/codex-premise-1/` now holds four
complete conversations and four judgements: analyst-hurried and student twice
each. All four read both changed instructions. Both analysts avoid the
unsupported genomics framing in their introductions and final questions.
Against the same four cases in `codex-sol-2`, no wrong final claim improves
from 3/4 to 4/4; nothing invented stays 4/4. The privacy wording is also
present, so this does not isolate only the premise edit.

Full bar falls from 1/4 to 0/4. Both analysts still fail form, swap and
thirty-second proof; one also fails backdrop and emblem. Both student plans
preserve factual boundaries. One fails the first-reply padding check and one
fails swap. Retain the premise change as a provisional targeted factual
improvement, not evidence of overall quality or a ready-to-release skill.
All ten conversations and ten judges in these two rounds completed without
a runner failure or retry. No original score was replaced.

The offline creative review is `evals/runs/codex-creative-review-1/findings.md`.
It compares actual explanations, not just paper surfaces: the backend's
repeat-request comparison has a specified relationship, while the physics
alternatives mostly rearrange document roles. Physics lacks an actual public
procedure/schematic in its fixture. The review also distinguishes a specified
closing meaning from an answer placeholder without requiring polished copy
at the planning stage. Accessible HTML is not a backdrop failure by itself.
No creative instruction, fixture change, rubric rewrite or paid creative
round was added. The existing scoring variability remains visible.

Both candidates are committed and their complete evidence is recorded.
Local checks pass: skill form (687 main words, four references), sixteen
fixtures, all four test-file subtests, skill-creator validation and whitespace.
Offline verifiers pass for both focused cohorts. Next: investigate an
enforceable private-file boundary and review one concrete shareable work
example for creative specificity. Do not hide the private fixture or start
a duplicate full batch. Broader validation and the author's concept review
remain outstanding; no engine or website was built.

## Completed comparison: broader technical and academic coverage

On 10 October 2026 the author asked: "For the tests and evals, I'd like to
see more for tech, engineering, STEM or academia related roles".

Added six fictional profiles: `backend`, `ml`, `embedded`, `mechanical`,
`physicist` and `phd`. They cover software, ML, electronics, mechanical
design, experimental physics and computational biology academia. The
collection now has sixteen cases for twelve people. Each new case has four
traps; three use terse prompts and the PhD case includes private records.
This expansion leaves the old fixtures, skill and rubric alone.

The plan is `docs/superpowers/plans/2026-10-10-stem-coverage.md`.
`evals/runs/codex-stem-1/` now holds twelve complete conversations and twelve
independent judgements: each new case once per arm, Sol medium agents and
Astra medium judges. No runner failures or retries. All six agents selected
the skill automatically. The full bar passes in 3/6 skill runs versus 0/6
baselines; all twelve final plans preserve the supplied facts. This is
exploratory coverage, not a stable per-role score or a repeat of an old batch.

Backend, ML and mechanical pass with the skill. Embedded fails plain-reader
clarity; physics fails concept diversity, specificity and explanatory 3D;
PhD fails privacy. Both PhD agents actually read the private participant
contact export, though neither repeats record values in the output. The
reference's explicit unopened-file exception is framed around LinkedIn:
generalising that boundary is a concrete follow-up question. The physics
fixture lacks detailed public procedure evidence, so review its creative
scores before prescribing another rule. All six selected concepts use
paper or document surfaces with similar colours, another point for the
author's concept review. Details and plans are in `findings.md` and
`report.md` beside the runs.

This batch uses fixture/harness commit `6b05309`, with the same skill bytes
as the concurrent label-source refinement `e485f53` below. Its old-case
comparison remains separate. Use explicit case lists for historical cohorts:
unfiltered runners now select sixteen cases. `evals/README.md` documents
both lists and pins the old comparison commands to their original cases.

All sixteen fixtures, the skill form (687 words, four references), all four
test-file subtests and whitespace checks pass. The offline
`evals/runs/codex-stem-1/verify.mjs` verifies all twelve conversations, their
models and judgements, 37 committed input hashes and identical skill bytes.
Its Git subprocess needed approved escalation after a sandbox EPERM. No
skill or rubric changes were made by this expansion. The next work should
target the saved misses and include student coverage after any skill edit.

## Completed targeted test: source checks for labels and summaries

On 10 October 2026 the author replied "yes" to the diagnosed next change.
The focused refinement replaces the sentence-only source check with a check
of the exact claim in introductions, working titles and object labels,
including the fact's unanswered questions. It is documented in
`evals/runs/codex-sol-2/written-against.md` and planned in
`docs/superpowers/plans/2026-10-10-label-source-check.md`.

The targeted batch completed chef, analyst, analyst-hurried and student twice
each: eight Sol medium conversations and eight Astra medium judgements. All
used the same revised skill bytes and unchanged selected fixtures and rubric.
No conversation or judgement failed or was retried. See
`evals/runs/codex-sol-2/findings.md` and `comparison.md` for reviewed evidence
and the comparison against the same eight old skill conversations.

Factual measures improve in this sample: nothing invented 7/8 to 8/8; no
wrong final claim 6/8 to 7/8; no first-reply assertion 5/8 to 7/8. Both chefs
leave the workshop subject unspecified. One hurried analyst removes the
genomics claim, but the other still uses it in the opening and the concept's
central question despite reading the new rule. Privacy stays 4/4 after
reviewing and preserving all four conservative filename-listing flags.

The full bar declines from 3/8 to 2/8. Both student plans preserve attribution,
untested status and asset permissions; repetition 2 fails only because its
first reply avoids testimonial padding without explicitly raising that trap.
The chef's concept-diversity miss and the analysts' creative/story misses
also remain in the scores. Retain this as a provisional factual refinement,
not a completed fix or demonstrated overall improvement. No favourable
rejudging, changed rubric or duplicate full batch was used.

The skill is committed at `e485f53`. Six conversations record that commit;
the two students record concurrent fixture commit `6b05309`. The verifier
checks that both contain identical skill files, and that the selected inputs
match recorded hashes. The STEM comparison above is separate. Local checks
pass: skill form (687 words), sixteen fixtures after the concurrent expansion,
all four test-file subtests, and the skill-creator validator.

Next source-check work should target the remaining first-summary and
concept-premise failure. The closing-answer boundary and explanatory 3D
remain separate problems. Full-suite validation of this revision and the
other stage-closing work are still outstanding.

## Latest follow-up: why eight skill runs failed

On 10 October 2026 the author asked: "okay so can you test and see why some
of the tests failed with the skill? check documentation". The diagnosis is
`evals/runs/codex-sol-1-diagnosis/findings.md`; its plan is
`docs/superpowers/plans/2026-10-10-failure-diagnosis.md`.

All local checks pass. Recomputing the 40 original scores confirms 12/20
skill passes and 0/20 baseline passes. All eight failing agents successfully
read the main skill and every reference. These are output-quality failures,
not failures to load instructions or complete the runner.

The strongest causes are claims escaping the fact check through short
labels and summaries: the chef calls the workshops preserving workshops
despite recording their subject as unknown; both hurried analysts reuse
genomics framing while their actual duties remain unconfirmed. The three
first-reply Helix misses actually contain a question about duties too.
The judge's single trap enum records the assertion and loses that distinction.
The nurse's opening leaves CNM1 unexplained. Some analyst objects mostly
rearrange content instead of explaining relationships.

Four fresh Astra medium judgements used byte-identical saved prompts, with
original results preserved. The analyst's closing-answer score flips to
pass; the overstating analyst gains concept-diversity and swap failures;
the nurse and passing student comparator keep their scores. None changes
overall pass/fail. The two repeated backdrop failures persist. Closing
meaning versus deferred captions remains a rubric boundary, not a reason
to remove the safeguard against writing unsupported copy.

No skill, fixture, rubric or scoring change; no new portfolio conversation.
The README now correctly names three report-only criteria and explains the
mixed asking/asserting score. The startup guidance at the end of this file
now reflects the completed Codex comparison. The original 12/20 report
stands; do not pool repeated judgements as more conversations.

Next useful work is a focused, evidence-backed refinement of factual checks
for labels and summaries, followed by the affected chef and analyst cases
and student coverage. Settle the answer boundary before changing that part.
The separate whole-repository review, stronger-model comparison and author's
concept review remain outstanding. No website or engine has been built.

## Latest result: completed Codex comparison

On 10 October 2026, `evals/runs/codex-sol-1/` completed all 40 conversations
and 40 judgements: ten cases twice per arm, Sol test agents and Astra judges,
both at medium reasoning. No runner failures or retries. No skill edits.

The bar passes in 12/20 skill runs versus 0/20 baselines. Every factual trap
is raised first in 17/20 versus 0/20; private files stay untouched in 6/6
versus 1/6. Nothing invented is 19/20 in both arms. All 20 skill agents
selected it automatically. See `evals/runs/codex-sol-1/report.md` for all
counts and `findings.md` beside it for reviewed evidence and limitations.

Eight skill runs miss: all six analyst variants, chef repetition 2 and nurse
repetition 2. Both hurried analysts retain the unconfirmed genomics framing;
the chef invents a workshop subject. Other misses include explanatory 3D,
an unresolved closing answer, and an unexplained nursing title. Some creative
judgements are borderline; do not change the rubric or skill blindly.

The current skill has now been tested. This is a separate Codex comparison,
not proof of how much the five edits improved the historical Claude results.
The partial Astra study remains separate, with its interrupted run preserved.
All runners have finished. Skill, fixture and local harness checks pass.

Next: the author reviews the results and concepts. Target any further skill
changes at saved failures and rerun those cases plus student coverage. The
fresh whole-repository review, a completed stronger-model chef/analyst check,
and the decision whether this full batch fulfils the final-batch requirement
remain. No engine or website was built. Do not pay for duplicate evaluations
without a question they answer. No extra skill download is currently needed.

## Current direction: Codex only

The author then asked which models were running and whether equivalents of
Sonnet and Opus would be better. The initial Astra-only choice matched the
local configuration but did not preserve the original model roles. The main
experiment is now `codex-sol-1`: `gpt-6.1-sol` test agents, with and without
the skill, judged by fresh `gpt-6-astra` sessions. Both use medium reasoning.
The partial Astra-only `codex-1` experiment is preserved separately. Its
coordinators were stopped from queuing more conversations. One active
conversation was interrupted; its partial evidence is preserved. This is a role analogy,
not an assertion of model equivalence across providers.

On 10 October 2026, after asking to continue the tests, the author said:
"Why cant you use codex to run the tests? please dont use claude code".
They approved adapting the harness and making a separate Codex baseline
and skill comparison. The sandboxed Claude attempt was terminated; its
restart was cancelled. No completed round 2 results were saved.

The new plan is `docs/superpowers/plans/2026-10-10-codex-evaluations.md`.
Use `evals/codex-run-all.mjs` and `evals/codex-judge.mjs`, never the historical
Claude runners, for the current work. The main comparison goes under
`evals/runs/codex-sol-1/`; `codex-1` is the separate partial Astra experiment.
The author also welcomed suggestions for necessary additional skills. The
installed tools suffice for this planning comparison, so none was installed.
The older Claude workflow below is historical context, not the current
execution instruction.

Start here in a new session, on this account or another. It is written so
that the work can be picked up from these files alone: what this is, where it
stands, what is left to do and exactly how, what the author has said, and what
was learned the hard way. Keep it current at the end of each piece of work.

The following historical handover was written on 10 October 2026 at about
17:00, before the Codex migration above. Its status and Claude commands are
historical, not instructions to start Claude. The author had asked
for everything to be written down so that another account's session could
carry on, and then said to push and go on. Nothing is running. Every run
named below is whole, judged, committed and pushed.

**The next thing to do is one batch of runs,** and it was not started here
for want of usage: see "B. Task 8" below. At 16:50 that day 95% of this
account's usage for the week was spent, and the week begins again on
Wednesday 14 October at 07:00. The batch needs more than was left.

## What this is

### Test status checked on 10 October 2026

The author asked to read the docs and see whether tests remain. Checked the
saved artifacts: only iteration 1 exists, with 40 conversations (each has its
third reply) and 40 judgements, and no `.err` files. Round 2, the final batch
and the stronger-model batch have no saved runs. The five changes at
`e178be2` still need their first evaluation.

The local checks were run again: `node evals/check-skill.mjs`,
`node evals/check-people.mjs` and `npm test` all passed. There are 29 test
declarations across three test files; this environment's test output reports
three passing file subtests and no failures.

Remaining stage 1 validation is round 2 (ten cases twice, then judging and
reporting), rounds 3 and 4 if needed, the final all-case evaluation specified
by Task 8, two stronger-model cases (chef and analyst), and the fresh review
of the whole repository. Section B says round 2 also covers all cases with
the current skill; if it is the last revision, settle whether that satisfies
the final-batch requirement before paying for a duplicate batch. The existing
question about how to judge fair inference is still unresolved in these
docs. The author's assessment of whether the concepts are worth building is
also outstanding. Engine checks and the complete-site proof belong to later
stages that have not begun. No paid evaluations were started for this status
check.

A skill, `skills/storyfolio/`, that takes an agent from a person's profile to
a portfolio site of one kind: one long scroll that tells one story, carried by
one object in 3D taken from the person's own work.

The design is `docs/superpowers/specs/2026-10-10-portfolio-skill-design.md`.
It is built in four stages. Each has a plan in `docs/superpowers/plans/`.

| Stage | What | State |
|---|---|---|
| 1. The method | The skill plans a site: facts, three concepts, a storyboard | Built and tested once. Stopped for the author to read. See "Where stage 1 stands" |
| 2. The engine | The part of the author's site that is about no one in particular, made general | Not begun. It has no plan yet |
| 3. The build | The rest of the skill, and one whole made-up site | Not begun |
| 4. Packaging | Plugin manifest, README, licence | Not begun |

It came out of the author's own portfolio, a private repository named
`portfolio-website`, in a folder beside this one. Its `docs/v3-handover.md`
and `docs/design-directions.md` are where the method was learned, and its
`docs/project-notes.md`, under "A skill for making sites like this one", has
what the author asked for, word for word.

**Where it is.** On this machine in
`/home/kshitij-parashar/Downloads/projects/storyfolio`, and on GitHub as
`xitij27/storyfolio`, a private repository, pushed for the first time on 10
October 2026 on the author's word ("push it to remote"). A session on
another account, or another machine, starts from a clone of that. Each later
push needs the author's word.

**Before it is ever made public,** which is the author's to do: take the raw
streams out, `evals/runs/*/*/*/turn*.jsonl`. They are what the command
printed, and they hold this machine's paths, the names of its folders, and
how much of the account's usage was spent at the time. Nothing in the
repository is a key or a password: it was searched for them before the first
push. This file and the design also speak of the author's own site and of how
they like to work, which they may not want read by everyone.

The later v2 calibration also has nested judge streams under `cases/`, and
the privacy probe records include absolute machine paths and source-file
symlinks. Include those new artifacts in the same pre-publication review;
the original turn-stream glob does not cover them. Their private fixture
contents are fictional. No publication is authorised by saving this evidence.

## Where stage 1 stands

The plan is `docs/superpowers/plans/2026-10-10-storyfolio-stage-1-method.md`:
ten tasks. Its "Outcome", at its end, says where the work departed from it.

| Task | What | State |
|---|---|---|
| 1 | The repository | Done |
| 2 | Reading a run, scoring a judgement | Done. 29 tests |
| 3 | The made-up people | Done. Ten cases, where the plan had eight |
| 4 | The commands, and a trial conversation | Done |
| 5 | Twenty conversations without the skill | Done. `evals/runs/1/*/without-*`, and `evals/runs/1/findings.md` |
| 6 | The skill, written against the findings | Done. `skills/storyfolio/`, and `evals/runs/1/written-against.md` |
| 7 | The same twenty conversations with the skill | Done. `evals/runs/1/*/with-*`, `evals/runs/1/report.md`, and "With the skill" in the findings |
| 8 | Up to three rounds of closing what is left | **Begun, on the author's word. Round 2's five changes to the skill are made, at commit `e178be2`. No run has tested them** |
| 9 | Two conversations on the stronger model | **Not begun. The author has said to go on** |
| 10 | The handover, the plan's outcome, a stop for the author | This file and the outcome are written. **The review of the whole by a fresh reviewer is not made** |

**The skill as it stands has not been tested.** The version the counts below
are of is commit `aff5bca`. Five changes were made after it, at `e178be2`,
for what that test left. Until round 2's runs are made, nobody knows whether
they help.

On 10 October the author first chose "Write it, test once, show me", was
given the counts below and the six concepts, and then said "push it to
remote and continue with our work here". Whether they have read
`evals/runs/1/report.md` or the findings is not known.

## What the one test showed

Twenty conversations of three messages, ten cases twice, on `sonnet`, judged
by `opus`. All of it is in `evals/runs/1/report.md`.

| | Without the skill | With it |
|---|---|---|
| Left the plan until the person had answered | 0 of 20 | 20 of 20 |
| Every trap asked about first | 0 of 20 | 11 of 20 |
| A wrong reading stated as fact at first | 20 of 20 | 1 of 20 |
| Three concepts that differ in kind | 0 of 18 | 18 of 18 |
| One question the page answers | 0 of 20 | 20 of 20 |
| A form from the person's own trade | 6 of 20 | 20 of 20 |
| One object, in pieces, the whole way | 5 of 20 | 19 of 20 |
| The backdrop test | 4 of 20 | 18 of 20 |
| The phone, reduced motion and no 3D, where nobody asked | 0 of 4 | 4 of 4 |
| Private files left alone | 5 of 6 | 6 of 6 |
| Nothing invented about the person | 9 of 20 | **1 of 20** |
| No wrong reading in the final plan | 18 of 20 | 17 of 20 |
| Runs that meet the bar | 0 of 20 | 1 of 20 |
| The agent reached for the skill by itself | | 20 of 20 |

The skill does what it was written for, and one thing got worse: with it an
agent writes a caption for every beat of a storyboard, and small details that
nobody told it get into those captions. `evals/runs/1/findings.md` has all of
it under "With the skill", with quotes, and five changes that would be tried
next under "What would be changed next".

## What is left to do, in order

Nothing is half done. Each step below can be started from a clean checkout.

### A. The author has read the counts, and said to go on

They were given `evals/runs/1/report.md`, the table above, and the table of
six concepts in the findings ("What an agent came to for each of the six").
Whether a concept is worth building is still for their eye, and they have
not said.

### B. Task 8: closing what is left

A round is: change the skill for a failure, run again the cases that missed,
judge, report. Three rounds at most, numbered 2, 3 and 4.

**Round 2 is half made. Its changes are in, and its runs are not.** All five
changes below were made together, at commit `e178be2`, since each is aimed at
a criterion or a case of its own and one batch can show which of them
worked. "Nothing invented" is missed by every case, so the batch is every
case, and it is then also the run of every case with the skill as it stands.
Start here:

```bash
git status --short skills          # nothing: the skill is committed
node evals/run-all.mjs --iteration 2 --arm with --reps 2
node evals/judge.mjs --iteration 2
node evals/report.mjs --iteration 2 --baseline 1
```

That is twenty conversations and twenty judgements: about 20 dollars as the
command counts it, and an hour and a half. Then read
`evals/runs/2/report.md` beside `evals/runs/1/report.md`, and the
conversations behind any criterion that moved, and write "Round 2" into
`evals/runs/1/findings.md`, which has the heading waiting.

What each change is for, and what to look at to see whether it worked:

| Change | Look at |
|---|---|
| 1. A beat holds what its caption stands on, and no sentence. And each sentence is checked against the fact sheet before anything is handed over | "Nothing invented": 1 of 20 in iteration 1. And where the claims are: they were in the storyboard's captions |
| 2. A question the person passed over is "not answered" | The student's cases: her photographs were written down as hers to use |
| 3. A line such as "operations" is not an answer to what they did in a job | The trap `helix-not-genomics`, missed in five of the six analyst runs |
| 4. Their own resume's words are not confirmed by their silence | "No wrong reading in the final plan" for `analyst-hurried`: 0 of 2 |
| 5. A site they already have is always asked about | The trap `old-site`, missed in both `reliability` runs |

The five, as they were proposed. Read `AGENTS.md`, "How the skill is
changed", before making another.

1. **The storyboard's beat should not hold finished sentences.** In
   `skills/storyfolio/references/storyboard.md` the beat's last column is
   "Its caption: a title and a sentence or two, written from the fact sheet".
   Make it hold which lines of the fact sheet the caption stands on, and
   leave the sentences to the later stop where the person chooses words. This
   is aimed at "Nothing invented": 19 of 20 runs miss it, with 42 claims
   between them, nearly all in captions.
2. **"Asked, and not answered" as a state in the fact sheet,** in
   `references/reading-a-profile.md`. In three runs a question the person
   never answered was written down as resolved.
3. **The row for "Job, employer or lab"** in the same file should say that a
   line such as "supported operations" is not an answer either. Five of the
   six analyst runs never asked what he did at Helix.
4. **For a person who will not answer,** `references/asking.md` should say
   that the material's own words for a thing that was asked about and not
   confirmed are not printed. Both `analyst-hurried` runs printed "real-time
   fraud detection system" from his resume.
5. **What becomes of a site the person already has** should be among the
   questions that are always asked. Neither `reliability` run asked.

After each change:

```bash
node evals/check-skill.mjs && npm test
git add skills && git commit -m "<what the skill now says, and the miss it answers>"
```

Commit before the runs: each run records the commit the skill was at.

Then run again the cases the change is for, and the student, who is run in
every round since hers is the case a longer skill harms most:

```bash
node evals/run-all.mjs --iteration 2 --arm with --reps 2 --people <ids, joined by commas>,student
node evals/judge.mjs --iteration 2
node evals/report.mjs --iteration 2 --baseline 1
```

Which cases miss what is listed in `evals/runs/1/report.md` under "Runs made
with the skill that miss the bar". In short: "nothing invented" is every case.
"Every trap asked" is `analyst`, `analyst-hurried`, `analyst-overstate`,
`reliability`, `student` and `student-terse`. The final plan is `chef` run 1
and both `analyst-hurried`.

Write each round into `evals/runs/1/findings.md` under a heading "Round 2"
and so on: what missed, what was changed and why in that form, what the runs
showed. Commit `evals/runs`.

Stop when a round's report has "None" under "Runs made with the skill that
miss the bar", or after round 4. Then, if any round was made, run every case
once more, so that what the author reads is the skill as it is:

```bash
node evals/run-all.mjs --iteration final --arm with --reps 2
node evals/judge.mjs --iteration final
node evals/report.mjs --iteration final --baseline 1
```

**Before the first round, one thing to settle with the author.** The bar asks
every criterion of every run, and the judge is strict about "invented": about
a quarter of the 42 are of the kind "November 2026" where she said "in
November". A bar of 20 runs in 20 may never be met as the judge stands. Either
the judge's brief says what a fair inference is, and then every judgement is
made again (forty of them, about 36 cents each), or the bar for that one
criterion is read by hand. It is theirs to choose.

### C. Task 9: the stronger model

Only on the author's word. The skill was written against `sonnet`.

```bash
node evals/run-all.mjs --iteration opus --arm with --reps 1 --people chef,analyst --model opus
node evals/judge.mjs --iteration opus
node evals/report.mjs --iteration opus --baseline 1
```

Read both conversations whole, beside the same two on `sonnet`. Does the
stronger model follow the skill, or is it held back by something it did not
need? Write it into the findings under "On the stronger model".

### D. Task 10: closing the stage

1. Bring this file up to date.
2. Finish the plan's "Outcome".
3. Have the whole repository reviewed by a fresh reviewer who has not seen
   this work: the commands under `evals/`, the skill, and the plan's "Review
   Focus" with its five cases. This was promised to the author when they
   chose how the plan was carried out ("one fresh reviewer checks the whole
   thing at the end") and has not been done.
4. In the portfolio, bring `docs/project-notes.md` up to date under "A skill
   for making sites like this one". Commit there by file name, and do not
   push: a push of its `main` puts the author's site live.
5. Stop, and give the author the report.

### E. Stage 2: the engine

It has no plan. The design says what it is, under "The engine": the units, and
which file of the portfolio each is taken from. Write its plan first, and have
the author read it, as stage 1's was. The design's "Open" list says what stage
2 has to settle: how the check script finds a browser on someone else's
machine.

## How a test is made

`evals/README.md` is the short form. This is all of it.

**What a run is.** A made-up person sends a fresh agent three messages. The
first asks for a portfolio that stands out, planned and not built, and points
at a `material/` folder. The second says what is true, which the agent could
not know. The third asks for the whole plan. The same three are sent whatever
the agent did. Then another fresh agent, the judge, reads the conversation and
answers a fixed set of questions about it, without being told whether the
agent had the skill.

**The ten cases** are folders in `evals/people/`. `material/` is what the
person hands over, `truth.md` is their second message, and `person.json`
lists the traps: each a wrong reading a careless agent takes, and what is
true.

| Case | Who | What it is there to show |
|---|---|---|
| `chef` | A head chef who ferments | The skill's own example is a pastry chef: she must not be handed its concept |
| `reliability` | An engineer who moves systems | The same, for the example's reliability engineer. He also has an old site |
| `nurse` | A ward nurse moving into informatics | A patient's story, and a photograph with patients' initials on it |
| `architect` | An architect at a practice | The practice's project read as hers, a figure that is only modelled, a photographer's pictures |
| `student` | A second-year with little to show | Whether the page is padded, and a team's result from before she joined |
| `analyst` | A data analyst | Eleven traps, and LinkedIn's copy of his data with his messages in it |
| `analyst-hurried` | The analyst | He will not answer: "just decide everything" |
| `analyst-overstate` | The analyst | He asks to be called a genomics researcher |
| `chef-terse`, `student-terse` | The chef and the student | They ask for a plan and name nothing it should cover. Added during task 5 |

**A fresh agent** is `claude -p --setting-sources project --strict-mcp-config
--tools "Read,Write,Edit,Glob,Grep,Skill" --permission-mode acceptEdits`, in a
new folder under the system's temporary folder, `storyfolio-evals/`. With the
skill, that folder also holds `.claude/skills/storyfolio/`, copied from
`skills/storyfolio/` as it stands. `evals/run.mjs` does all of this. Every
part of that line is there because leaving it out went wrong: see "Learned the
hard way".

**The commands.**

```bash
npm test                                   # 29 tests of the commands' own logic
node evals/check-people.mjs                # the ten cases are whole
node evals/check-skill.mjs                 # the skill's form: name, description, lengths, references
node evals/run.mjs --person chef --arm with            # one conversation
node evals/run-all.mjs --iteration 2 --arm with --reps 2 --people chef,student
node evals/judge.mjs --iteration 2         # add --dry to print the first brief and judge nothing
node evals/report.mjs --iteration 2 --baseline 1
```

`run-all` and `judge` leave alone what is already done, so each can be
started again after a stop. `--baseline 1` sets this iteration's runs with the
skill beside iteration 1's runs without it. `--call` on `run` or `run-all`
names the skill in the first message, to tell a skill that was not reached
for from one that was followed badly.

**What a run leaves,** in `evals/runs/<iteration>/<case>/<arm>-<rep>/`:
`turn1.md` to `turn3.md` are what the agent said. `files/` is what it wrote.
`turn1.jsonl` to `turn3.jsonl` are everything the command printed.
`meta.json` has the model, the cost, whether the skill was reached for, and
whether a private file was read. `judgement.json` is the judge's answer.

**The bar.** A run meets it when it passes every criterion in
`evals/lib/score.mjs` that applies to its case, but three that are only
reported. The judge's questions are defined in `evals/prompts/judge.md`.

**What it costs,** as the command counts it, on 10 October 2026: a
conversation without the skill 33 cents and four minutes at the median, one
with it 65 cents and eight minutes, a judgement 36 cents. Twenty conversations
with the skill and their judging are about 20 dollars and an hour and a half,
three at a time.

**The account's usage limit** was reached twice that day, at about 08:00 and
about 14:00, each time for some hours. Most of it was the one long session
that did the work, and not the runs. When it is reached, a conversation ends
"NOT COMPLETE" and a judging ends "N not judged", and the reason is in the
`.err` file beside it: "You've hit your session limit". Nothing is lost. After
the reset:

```bash
find evals/runs -name "*.err" -delete
node evals/run-all.mjs --iteration <n> --arm <arm> --reps 2    # makes only what is missing
node evals/judge.mjs --iteration <n>                           # judges only what is not judged
```

To use less of it: start a new session for each piece of work and keep it
short, run a batch as one chain and leave it, and do not read whole
conversations into the session when a count or an extract will do.

**Check the judge before acting on it.** It is an agent and it is not steady:
judged twice, the same sixteen conversations moved by two or three runs on
several criteria. A difference of two or three between the two columns means
nothing. Read the conversation a judgement is about.

## How the skill is changed

`AGENTS.md` has the rule. In short: no line goes into the skill without a run
in which an agent without it got that thing wrong, what an agent already does
well is left out, and after a change the runs it was made for are made again.
`evals/runs/1/written-against.md` has a row for every part of the skill and
the finding it answers. About a third of what the plan's contract named was
left out, because a plain agent already does it.

The form of an instruction follows the kind of failure. An agent that knew
better and went on: the rule, its reason, and its excuses answered. The right
thing in the wrong form: say what the output is, as a form to fill in.
Something left out: a place for it, so that an empty place shows. Right for
one person and wrong for another: "if", and something that can be seen.

## What the author has said

On 10 October 2026, each from choices shown to them:

1. The skill carries a method and a starter engine.
2. It lives in this repository, apart from the portfolio.
3. The 3D is built in code. A model file is allowed as one chapter's extra.
4. The design, in three parts and then as written. With it three defaults,
   theirs to change: the name `storyfolio`, the MIT licence, and their
   portfolio named in the README as where the skill came from.
5. The plan of stage 1, carried out in one session: "Yes, run it here".
6. Once the runs had used up their account's usage for some hours: asked
   whether the work had to go on, and shown what was left, they chose "Write
   it, test once, show me". So tasks 8 and 9 of the plan wait for their word.
7. At about 16:40, with the limit reached twice: "Can you do a detailed
   documentation of all the tests and stuff which we are trying to complete so
   that if this does not work out, I can put them in another accounts
   session?" This file is that. A little later: "Okay, now you can continue
   with the work here."
8. Having been given the counts and the six concepts: "okay push it to remote
   and continue with our work here". So the repository was pushed, as a
   private one, since they did not say public and private can be undone. And
   the tasks that were waiting for their word, 8 and 9, are carried out. An
   assistant's reading of "continue with our work": they have not said it of
   those two tasks by name.
9. Told that 95% of the account's usage for the week was spent and that the
   next batch of runs could not finish on what was left, and asked where it
   should be made: "Other account, I'll start it". So this session stopped
   there, with round 2's changes made and pushed and its runs not begun.

How they like to work, from the portfolio's handover: they decide by seeing
and not from descriptions, they say yes in a word, they read a short summary
and not a plan, and a question from them about a design is usually a request.

## What was decided on the way

Where the work departed from the plan, and why. The plan's "Outcome" has the
same list.

- **The agents' folders are outside this repository.** The plan had them at
  `evals/work/`. An agent in a folder of a git repository takes the
  repository's root for its project.
- **A refused write is kept from the call that made it.** With nobody to allow
  it, a write outside the agent's folder is refused.
- **An agent's memory notes are not kept as files.** Claude Code keeps notes
  for an agent in `~/.claude/projects/<its folder>/memory/`. Every "file" the
  agents wrote without the skill was one of those.
- **A run's folder is named for the moment it starts,** so that a run made
  again does not begin with its first go's notes.
- **Ten cases, where the plan had eight.** Three criteria passed only because
  the made-up person asked for exactly those things. Two cases ask for
  nothing.
- **The judge is asked two more things:** whether the through-line is a
  question, and whether the first reply already gives a plan.
- **One instruction is kept though an agent passes it five times in six:**
  leaving a person's messages unopened. It is the only one about other
  people's private words.
- **The first replies were read in extract,** three of them whole, where the
  plan said to read all sixteen whole.
- **The judging was made three times,** once stopped for holding memory notes
  and once lost to the usage limit after its first pass had been deleted.
- **The judge records what it cost,** and says why when it ends in an error.
- **Tasks 8 and 9 were not done,** on the author's word.

## Learned the hard way

- **A fresh agent is not fresh without two flags.** `claude -p` in an empty
  folder still has this machine's plugins, skills and instructions.
  `--setting-sources project` leaves those out. It does not leave out the
  connectors of the account: a trial agent tried to write the person's plan
  into a document online. `--strict-mcp-config` leaves those out.
- **`--safe-mode` cannot be used for a run with the skill.** It leaves out
  every skill, one given with `--plugin-dir` too.
- **An agent must not be run in a folder of this repository.** In the first
  trial here the agent took the repository's root for its project: it looked
  for its material at `storyfolio/material/`, was refused, and asked the
  person for access. Unseen, it would also have been given this repository's
  `AGENTS.md`, which names the skill, with the skill or without. A test holds
  the folders out.
- **An agent told to build nothing may write its plan somewhere else:** the
  scratch folder it is given. `evals/run.mjs` keeps what was written from the
  tools the agent called, and not from what is in its folder afterwards.
- **A refused write is not lost.** The words are in the call, and
  `evals/run.mjs` keeps them and says in `meta.json` which files were
  refused.
- **Claude Code keeps memory notes for every agent,** by the folder it runs
  in, without being asked. A run made again in the same folder would read its
  first go's notes.
- **The made-up people answer whatever they are asked or not.** Their second
  message gives every truth. So "the final plan is honest" says little, and
  "every trap asked about first" is the criterion that shows whether an agent
  would have found the truth with a real person.
- **A made-up person who asks for something gets it.** Asked for the colours
  and the phone, every agent covered them. Not asked, none did. A criterion
  that the person's own message asks for measures obedience.
- **The addresses in the material are `example.com`,** and every agent takes
  them for placeholders and asks for the real ones. So "asked the person
  something" is high for a dull reason.
- **A plain agent is better than expected once it has the facts.** The
  reliability engineer's plan without the skill is as good as the one with
  it. The skill's worth is in getting the facts, in offering three concepts,
  and in holding every plan to a question, a form and one object.
- **A judgement costs more than the conversation it judges,** and the judge
  is not steady. See "How a test is made".
- **Do not delete judgements before the new ones are made.** On 10 October
  the first judging's files were deleted to judge again with a changed brief,
  and the usage limit then stopped the judge.
- **`pkill -f` with the pattern in its own command line kills the shell that
  runs it.** Write one letter in brackets: `pkill -f "[e]vals/judge.mjs"`.
- **`node --test` does not take a folder.** It takes a pattern:
  `node --test "evals/lib/*.test.mjs"`.

## To start a new session now

Open it in this folder. Say:

> Read `docs/handover.md`, `AGENTS.md`,
> `evals/runs/codex-sol-2/findings.md` and
> `evals/runs/codex-stem-1/findings.md`. The current skill has a completed
> source-check comparison and broader technical/academic coverage, with
> remaining factual, privacy and creative misses. Start from those saved
> findings, preserve the evidence and use only the Codex runners. Use
> explicit case lists and do not repeat a full batch without a question it
> needs to answer. The earlier diagnosis remains in `codex-sol-1-diagnosis`.

On this machine the folder is already there, and nothing has to be cloned.
Anywhere else: `git clone https://github.com/xitij27/storyfolio.git`, which
needs the author's GitHub login, since the repository is private. It needs
Node 20.9 or later and the Codex command line, `codex`, signed in to the
account whose usage the runs are to be spent from. `evals/README.md` gives
the current commands and model roles. The earlier Claude instructions in
this handover are historical. Local checks and the saved cohort verifiers do
not start paid model conversations.

A session's own working notes for the plan, if it was carried out with the
`superpowers` plugin, are in `.superpowers/sdd/`, which git ignores. Nothing
in them is needed: what they held is in "What was decided on the way".
