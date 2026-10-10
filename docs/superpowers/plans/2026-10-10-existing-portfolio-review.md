# Implementing an existing-portfolio review path

Date: 10 October 2026.
Status updated 11 October 2026: partially explored through the
[Steve pilot](2026-10-11-steve-review-pilot.md). Its one-turn runner and
real local snapshot case are complete; the unchanged skill handled that
case successfully. The author prioritised it over the fictional-first
sequence below. The broader path, fictional control, remote acquisition
and browser-enabled test-agent evaluation remain proposed.

The author accepted a separate evaluation entry path, feedback before
redesign, separate general usefulness and Storyfolio suitability, and a
focused experiment before adding instructions. They then asked how to turn
that direction into a concrete implementation plan. This document fulfils
that request; it does not record approval of every detail below or start
paid evaluation conversations.

The proposed behavior is in
[the review design](../specs/2026-10-10-existing-portfolio-review.md).

The author subsequently clarified that users may provide a GitHub repository
URL or local checkout, preferably for a deeper review, as well as a deployed
website URL. This plan incorporates that requirement before any fixture or
run exists. The first case now uses a frozen repository snapshot. The initial
conversation count is unchanged; source inspection is evaluated together
with the original critique question.

## Outcome and first milestone

An existing-portfolio request produces a useful review with evidence,
priorities and preserved strengths, without entering the new-site concept
workflow. The review distinguishes ordinary portfolio quality from the
benefit of a Storyfolio transformation.

First establish this on one frozen fictional repository case. Later
establish that an agent can run or browse the existing site and collect and
interpret browser evidence. Report source review and observed runtime
behavior separately; passing the first does not complete the second.

## Constraints confirmed in this repository

- `skills/storyfolio/SKILL.md` currently requires the first reply to be the
  fact-confirmation stop and leads to concepts and a storyboard. This is a
  routing hypothesis to test, not an already-observed review failure.
- `evals/codex-run.mjs` always sends three messages and requires three
  completed replies. It injects owner truth in the second by default;
  `turn2: "instead"` can replace that message. Per-case overrides do not
  enable a one-turn or adaptive conversation.
- `evals/codex-judge.mjs` and both existing scoring versions judge portfolio
  plans. Their success counts must not be presented as review scores.
- `evals/lib/codex.mjs` disables network, web search, browser tools, plugins
  and apps. The existing judge loads material as UTF-8 text. It does not
  inspect screenshots merely because they were copied into a case folder.
- `evals/check-skill.mjs` caps the main body at 800 words, currently 687,
  and each reference at 1,500 words. Each reference must be linked from
  the main skill. Its description starts with `Use when` and stays about
  when to select the skill.

## 1. Freeze one review case and its judging criteria

Create `evals/reviews/service-designer/`, separate from `evals/people/` so
the ordinary planning runner does not discover it as another planning case.
Every person, organisation, project and result in it is fictional.

| Proposed file | Contents |
|---|---|
| `case.json` | Case/version ID, input kind, explicit input allowlist, one user message, source snapshot identity and evidence scope |
| `material/repo/` | Frozen small fictional repository: `index.html`, relevant CSS/JavaScript and a setup README. Clear role, a specific project decision and rationale, and ordinary navigation |
| `material/source-notes.md` | Owner-confirmed contribution and outcome limits |
| `material/inspection-scope.md` | Source snapshot only, with file hashes; no local execution or rendered-browser observations |
| `expected.md` | Judge-only defects, strengths, acceptable interpretations and unknowns |

Seed two defects that can be established without a browser:

1. The headline credits the person with reducing missed appointments by
   30%. The source notes establish a three-person prototype study with 30%
   fewer booking-task errors, not measured appointment attendance. Both
   the outcome and personal attribution need correction. Preserve the
   legitimate prototype evidence.
2. The primary contact link is `href="#contact"`, with no matching target
   in the supplied document. Report the static mismatch precisely; do not
   claim to have clicked it in a browser.

Keep real strengths: clear role, a concrete case-study decision and its
rationale, and useful project evidence. Include no 3D. The fixture should
make forced conversion to 3D visibly unnecessary, not make all ordinary
portfolios look bad.

Use a natural first request along these lines: "Evaluate my existing
portfolio for service-design hiring managers. Its local repository snapshot
is in material/repo/ and my source notes are beside it.
Tell me what works and what I should improve first. I want feedback, not
a rebuild." Do not teach the desired report structure or reveal the defects
in the request. Pin its exact wording before running.

Write `evals/prompts/review-criteria.md` before seeing model output. Judge
behavior and meaning, not particular headings or exact replacement prose:

| Criterion | Required evidence |
|---|---|
| Review scope | Useful critique without unsolicited concepts, storyboard or site edits |
| Defect discovery | Both seeded defects identified with correct source locations |
| Factual restraint | Team, prototype and measured-outcome limits preserved |
| Preservation | Concrete supported strengths identified, not generic praise |
| Priorities | The claim and contact problems come before cosmetic preferences |
| Actionability | Priority findings explain an improvement and how to verify it |
| Inspection honesty | No invented browser, mobile, performance or accessibility results |
| Source attribution | Findings cite relevant files/lines and distinguish inspected source from an unobserved deployed site |
| Format independence | Lack of 3D is not a defect; suitability is assessed separately |

Do not require an exact ranking between the two defects. A short, reasoned
recommendation to retain the current form can satisfy format independence.
Additional findings are welcome when supported. They do not excuse missing
the known material defects. Mark a reviewer criterion pass, fail or unclear
with evidence; an unclear result is unresolved, not a pass. Untested website
behavior stays untested, not failed. Do not pool these results with v1/v2
planning scores.

Deliverable: a committed case and criteria, with an offline check proving
the contact mismatch and source discrepancy are present. No skill changes.

Label the case `repo-snapshot`: its fixture commit and file hashes identify
the content. Do not invent a standalone repository HEAD for a directory
inside this repository. This case tests source interpretation, not GitHub
authentication, cloning or browser setup. Preserve URL-only support in the
input design without adding a paid duplicate of the same critique case.

## 2. Add the smallest isolated review runner, then observe the current skill

Add `evals/review-run.mjs`, reusing `invokeCodex`, `summariseCodex` and the
existing model/effort constants. Use one turn for this case. Do not send
the creation harness's truth or storyboard requests. Keep the existing
planning runner, judge, fixtures and rubrics unchanged.

The new runner takes an explicit case, cohort, repetition and invocation
mode. Provide a prepare/dry path that validates and freezes inputs without
launching a model. A small `evals/lib/review.mjs` owns case loading and
manifest verification; `evals/lib/review.test.mjs` covers the meaningful
invariants. Document the actual CLI in `evals/README.md` when implemented;
this plan does not claim those commands already exist.

Before a paid call, save under `evals/runs/codex-review-before-1/`:

- Exact allowed evidence bytes and hashes, case ID and original request.
- Skill bytes/hash/commit, runner and criteria versions, CLI version,
  model, reasoning effort and available tool settings.
- Judge-only expectations outside the agent's copied material.
- After execution, raw events, replies, written artifacts, attempted site
  writes, completion/error state, usage and command evidence of skill reads.

Give the review input loader explicit source kinds: deployed URL, GitHub
repository/ref, local checkout and frozen repo snapshot. For real source
reviews record the resolved commit plus relevant working-tree edits and
untracked files, with hashes of the inspected content. Keep deployed URL,
source revision and local runtime identity separate in the manifest.
Do not automatically update, clean, reset or checkout another revision in
the user's existing working tree. A remote clone belongs in a separate
review workspace. Missing remote access is an acquisition limit, not a
critique failure.

Use offline acquisition tests with a disposable local Git repository to
verify revision recording, dirty-file snapshotting and preservation of the
original checkout. Test WSL path conversion separately: only resolve a UNC
path into the current distribution's Linux path after checking that the
distribution and directory match. A GitHub URL's live access remains a
separate setup check; an offline test does not establish authentication.

Copy only allowlisted material and the current skill into the isolated
agent workspace. Use the established external-workspace isolation pattern;
persist all inputs, outputs and findings in the repository. No task context
may remain only in that disposable workspace. Do not copy this plan,
expected answers or the repository's agent instructions to the test agent.

Test that completed runs are preserved, mismatched input hashes cannot
resume as the same run, failures retain their streams, and expectations
are not part of the agent payload. Preserve binary artifacts as bytes if
encountered; do not silently interpret them as text. Browser/image support
is not a claim of this initial runner.

Compare every copied material path against its frozen hash after the run.
Preserve changed bytes and deletion records. The ordinary runner excludes
`material/` when collecting generated files, so reusing that loop unchanged
would lose evidence of unauthorised edits to the reviewed site. A meaningful
local test must prove that the review runner records such edits.

Run one natural review request with the unchanged skill available. Inspect
the actual commands and output; skill-read heuristics alone are insufficient.
Grade the saved response against the frozen criteria in `findings.md`, with
quoted evidence and source locations. Record that this is manual assessment
by the implementing agent, not an independent blinded model judgement.

If the skill was not selected, record a discovery miss. One additional,
explicitly invoked current-skill run may then isolate behavior after loading.
Keep it labelled separately; a forced invocation cannot demonstrate automatic
discovery. No no-skill comparison is required to answer this first capability
question, and no improvement over an unassisted agent will be claimed.

Decision gate: if natural discovery succeeds and loaded-skill behavior meets
the review criteria, record that and add no corrective instructions. A good
review without a skill read is still a discovery miss. If explicit invocation
then succeeds, the discovery evidence supports only a trigger change, followed
by a repeat of the natural request. If loaded-skill behavior fails, create
`written-against.md` mapping each proposed instruction to its exact saved
failure. An unselected skill does not establish that a new review checklist
is needed. Diagnose capability/tool failure separately from instruction failure.

## 3. Make only the needed change and repeat the test

Candidate changes are conditional on the preceding evidence:

| Observed failure | Smallest candidate |
|---|---|
| Review request enters creation stops | A review branch before those stops; scope them to creation |
| Natural review request does not select the skill | A trigger-only description update |
| Claims behavior was tested without evidence | The missing evidence-boundary guidance |
| Treats conventional form or lack of 3D as defective | Distinguish usefulness from Storyfolio suitability |
| Gives vague advice or loses strengths | The specific missing output requirement |

Create `references/reviewing-a-portfolio.md` only if substantial guidance is
needed. Do not copy the entire design or rubric into it. Keep shared factual
safeguards intact and creation instructions reachable. Update the introductory
scope and first-reply wording only as needed to make the demonstrated review
branch consistent. Stay within the skill check's existing length limits.

Run required local checks and skill-creator validation, then commit the
candidate before evaluating it. Freeze it under
`evals/runs/codex-review-after-1/`. Repeat the exact natural request, evidence,
criteria, model and tool settings. If the before study needed an explicit
invocation diagnostic, repeat that separately for a matched behavior check.
Manually assess with the same criteria, preserving both outputs and every
failure. Report discovery, loaded-skill behavior and critique quality separately.

Then run `student` twice through the existing creation harness, with the
unchanged v1 judge once per conversation, under a separate explicit cohort
such as `codex-review-planning-1`. Check that the review branch does not
replace the original first stop, concept choice or storyboard decision,
and preserves group credit, untested status and pending permissions.
Compare with the saved closing cohort only after verifying its skill bytes
match the pre-change skill. If they do not, report unmatched historical
context rather than claiming a controlled regression comparison.

Success for this narrow milestone: the candidate addresses every targeted
miss in its saved repeat, meets the frozen review criteria, and has no new
creation-path or factual regression in student. Report every original rubric
failure too. One review pair is exploratory evidence, not a stable success
rate. A new failure is recorded and diagnosed; do not keep sampling for a
pass. If more instruction work is needed, define another failure-backed
candidate rather than quietly expanding this experiment.

Cost scope: one current review, one candidate review if warranted, and two
student conversations after a skill change. That is four conversations and
two existing planning judgements on the ordinary candidate path. A matched
explicit-invocation diagnostic adds at most two review conversations. Stop
after the first review if no change is needed. Manual review assessment uses
no separate judge subprocess. Add automated review judging only when repeated
studies justify it, with a separate calibrated rubric and preserved scores.

## 4. Validate local and deployed runtime inspection

The frozen-source milestone can deliver content and implementation feedback.
To complete runtime review, first inventory browser tools available in the target
environment. Do not enable network or browser tools globally in the existing
planning runner. Choose an explicit browser-capable review configuration and
record it. No browser package or integration is assumed installed by this plan.

For repository input, inspect project guidance and setup scripts, resolve the
documented package manager and lockfile, and run the existing app in an
isolated review copy when feasible. Capture install/build/start/check results
only for commands actually executed; choose checks relevant to the findings.
Do not read secrets to make the app start. If required access or dependencies
are unavailable, complete the supported source review and record the runtime
limit. Local preview behavior and deployed behavior have separate provenance.

Extend a versioned fictional local site with an independently observable
mobile layout defect and a harmless interactive/3D example explaining a
specific relationship. Use deterministic browser probes to confirm expected
behavior before spending a model run on inspection. Record the viewport,
browser/version, URL, actions, states and capture hashes.

Reserve two fresh review sessions for the browser experiment: one with the
working browser and one with text-only evidence and no browser. Manually
assess whether the first collects evidence and finds the known rendered
defect, and the second accurately limits its claims. Both should distinguish
general usability from the demonstrated 3D relationship. Freeze this new
protocol before calling models. It has different capabilities and input from
the first study, so keep its results separate.

Only after an observed inspection failure should browser-specific skill
guidance be added. Repeat the affected browser case after that change and
repeat student coverage if shared routing or instructions changed. Those
conditional calls require a newly recorded bounded study, not automatic
retries within the two-session experiment.

Finally walk through the author's supplied examples using available source
and runtime evidence, saving the actual review and evidence in this repository.
The WSL paths supplied are recorded in the current handover and resolve here
to `/home/kshitij/projects/portfolio-website` and
`/home/kshitij/projects/portfolio-website-steve`. Both directories and Git
metadata entries were confirmed present on 10 October 2026; their contents
have not been inspected for this planning amendment. Select one repository
for the first walkthrough; the second is an available follow-up example,
not an automatic extra paid cohort. Do not infer its ownership, design or
relationship to the first from its directory name. If the original deployed
URL is used alongside source, verify the version relationship or mark it
unknown. Inspect opening,
representative middle content and conclusion on desktop and mobile, the
visitor's route to proof/contact, keyboard navigation, reduced motion, and
fallbacks where tools can exercise them. Mark anything not exercised as
untested. Do not submit contact forms or modify the live site. Quantitative
performance claims require recorded measurements and conditions.

Live-review completion requires observed browser evidence, correct limitation
reporting in the unavailable-browser case, and a useful author-site report.
The author walkthrough demonstrates practical usefulness, not independent
generalisation. If browser access remains unavailable, ship/report only the
source/content-review milestone and leave runtime review explicitly incomplete.

## Verification, review and handover

Before each commit, run `node evals/check-skill.mjs` and `npm test`; use
approved escalation if Git-subprocess tests hit the known sandbox restriction.
For skill edits, run the skill-creator validator. Check fixtures, manifests,
whitespace and immutable before/after evidence. New harness tests should
exercise isolation, input drift and preservation of completed work, not exact
assistant phrasing or report headings.

Have an independent reviewer examine the completed candidate and evidence
against the frozen criteria, including forced-redesign and unsupported-browser
claims. Preserve disagreements rather than replacing scores. Record all
actual run counts, failed attempts, decisions and limitations in the cohort
findings and `docs/handover.md`. Commit on main; remote publication is not a
requirement of this implementation.

The first implementation unit is the fixture, fixed criteria and minimal
runner, followed by one unchanged-skill review. This makes the first skill
edit answer evidence rather than the plan's guesses.

## Planning outcome

Only this plan, its design and the handover update were prepared in this
piece of work. Independent read-only reviews checked the harness constraints
and test design. They confirmed that screenshot evidence needs explicit tool
support, forced invocation cannot validate discovery, and the ordinary
planning rubric cannot grade reviews. No new evaluation conversation,
fixture, runner, skill instruction or website change was made.

Their final review also corrected the description of the existing optional
turn-two replacement, clarified the discovery decision gate, and required
preserving modifications and deletions inside copied review material. Those
corrections are incorporated above. Skill-creator guidance informed the
conditional routing/reference design; repository evidence requirements
remain the gate for every instruction change.

Planning verification passed: `node evals/check-skill.mjs` reports 687 main
words and four references; `npm test` passes all 48 tests with approved
Git-subprocess access; `git diff --check` passes. The new design and plan
contain no em dashes. The separate documentation-organization plan was
present before this task and is not part of this change.

### Repository input amendment

The author added GitHub URLs and local clones as richer review inputs after
the original plan was committed. The unexecuted first case is now a frozen
repository snapshot, retaining the two seeded defects and original run
counts. Source capture/acquisition checks are offline; browser tests cover
local previews as well as deployed pages. An independent read-only review
confirmed this keeps the experiment small while separating source evidence
from runtime and deployment claims.

The exact two supplied WSL paths and their Linux equivalents are recorded
in `docs/handover.md`. Both directories and Git metadata entries exist; no
example source was opened or modified. This amendment updates only the
design, implementation plan, plan index and handover. No clone, install,
new fixture, skill edit or paid evaluation was performed.

Amendment verification: `node evals/check-skill.mjs` passes at 687 main
words and four references, `npm test` passes all 48 tests with approved
Git-subprocess access, and `git diff --check` passes.
