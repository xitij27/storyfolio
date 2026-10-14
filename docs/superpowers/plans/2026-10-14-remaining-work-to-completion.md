# Remaining work to complete Storyfolio

14 October 2026. Reviewed at `5b43aec`, in answer to the
[author's request](../../history/2026-10-14-remaining-work-request.md):
where are we, what is left and how much. This consolidates the existing
plans into one ordered checklist. It is documentation only. It does not
change the skill, start a run, add evaluation authority or approve
anything on the author's behalf. Where it differs from an earlier plan,
the earlier plan's requirements still hold; this page only orders them.

Sources read: [design](../specs/2026-10-10-portfolio-skill-design.md),
[stage review](2026-10-11-stage-review.md),
[13 October stage plan](2026-10-13-stage-status-and-next-implementation.md),
[Stage 3 completion work](2026-10-12-stage-3-completion.md),
[remaining-proof sequence](../../../evals/runs/stage-3-completion-2/full-journey/preparation/final-proof-sequence.md),
[packaging plan](2026-10-11-packaging.md),
[current timing proof](../../../evals/runs/stage-3-spine-time-1/README.md)
and its dispositions, the [skill](../../../skills/storyfolio/SKILL.md)
and its five references, and the runner's budget code in
[`evals/lib/build.mjs`](../../../evals/lib/build.mjs).

## The short answer

**We are in Stage 3 of 4.** The method (Stage 1) works but has four
closing decisions open. The engine (Stage 2) is finished and approved.
The build (Stage 3) is the work in progress. Packaging (Stage 4) has not
started beyond the README, licence and public repository.

**The concrete position today.** One fresh test conversation,
`codex-full-journey-timing-1`, is taking a fictional person through the
six stops. Stop 1 (facts and machine check) has passed. The agent finished
stop 2 and built three concepts, but our recorder failed to save its
source, so the concepts have not yet been independently checked. The full
source has since been archived. The next action is local wiring, with no
model call, so that the archived source can be measured and the same
conversation continued.

**How much is left.** Between today and a releasable skill there are 24
checklist items below. Three are done. Of the remaining 21:

- 7 finish the current six-stop proof: local wiring, four paid agent
  turns and the independent checks around them;
- 3 are separate behavioural comparisons on the final skill text;
- 1 is the author's own review of the finished site on desktop and phone,
  which is what closes Stage 3;
- 4 are Stage 1 closing decisions, which can run alongside;
- 6 are Stage 4 packaging, ending with the author's publication decision.

At the pace observed from 10 to 13 October, and if every gate passes the
first time, that is roughly five to seven working sessions of agent work
(a session being about a day's work, as on 12 October), plus the author's
review time. Each failure that needs a skill correction
adds a fresh matched conversation from stop 1, about one or two more
sessions each. Stops 5 and 6 have never been completed with the current
skill text, so at least one such cycle is a realistic expectation. This
is an estimate from commit history, not a measurement.

## What "complete" means

The approved design defines it. Nothing is called done before the five
tests in its [Testing section](../specs/2026-10-10-portfolio-skill-design.md#testing),
and the four stages each have exit evidence in the
[stage review](2026-10-11-stage-review.md#sequence-and-current-gaps).

| Design test | Status |
|---|---|
| 1. Without the skill first | Done. Baselines for the fictional people, several cohorts |
| 2. With the skill, judged blind | Done for planning. 12 of 20 skill plans against 0 of 20 baselines met the bar in [codex-sol-1](../../../evals/runs/codex-sol-1/findings.md); later focused cohorts refined it |
| 3. The author reads both and prefers the skill's plans | **Open.** The author's concept-quality assessment has not been made |
| 4. The engine passes its checks | Done. 189 tests, 15 browser cases, 73 reviewed images, [author approval](../../history/2026-10-11-engine-approval.md) on desktop and a physical phone |
| 5. The proof: a fresh agent builds a whole non-sheet site, every beat is looked at, the author scrolls it | **Open.** This is the current work |

Stage 4 adds its own [release gates](2026-10-11-packaging.md#exit-and-release-gates):
a hash-identified package, a licence and origin review, clean installation
and scaffold from the extracted package, and accurate public guidance.
Publishing remains the author's action.

## Where each stage stands

| Stage | Done and evidenced | Left |
|---|---|---|
| 1. Method | Planning skill, twelve fictional people in seventeen cases, Codex runner and judge, before/after comparisons, focused refinements to facts, opening and closing | Author's concept-quality assessment; stronger-model check (never run); fresh whole-repository closing review; decision on broader final validation |
| 2. Engine | Reusable scroll/3D engine, scaffold, locked dependencies, fallbacks, browser checker, shared-controls repair; author approved desktop and physical phone | Nothing. Do not reopen it because a later site failed visual review |
| 3. Build | Six-stop routing in `SKILL.md`; `building.md` with look, wording and scene review guidance; build preflight and runnable concepts; measurement, capture and gate tooling; 351 repository tests pass | Finished agent-built site, matched entry and wording comparisons, planning regression, full technical and visual review, author's real review |
| 4. Packaging | Public README, MIT licence at root and in the engine, public GitHub repository | Release artifact, rights and origin review, plugin manifest and install-route tests, clean extracted-package proof, README updated to the proven scope |

## What the skill has actually shown, stop by stop

This is the most useful picture of how far the build workflow is. It uses
the best saved evidence across all runs. Candidate 3 and the timing proof
use the current skill text; earlier runs used earlier revisions, as noted.

| Stop | Best saved evidence | Status |
|---|---|---|
| Before stop 1: machine check | Candidate 3 and the timing proof both ran Node, TypeScript, Git and a real browser page before the first reply | Shown twice |
| 1. Read | Both runs passed the factual gate: traps asked, facts saved with their limits, no concept chosen, then waited | Shown twice |
| 2. Concept | Candidate 3: three runnable non-sheet concepts passed the narrow selection check on desktop and phone (18 reports, 144 originals). Timing proof: built, not yet checked | Shown once. Small face labels, weak geometric explanation, repeated closing poses and dark contrast remain concerns |
| 3. Storyboard | Candidate 3: ten beats over twelve screens with an explicit request for a shorter story. Candidate 2 failed with eight beats and no total length | Shown with the author's ten-beat exception for this fixture. The normal 12 to 22 range is unproved |
| 4. Spine and look | Candidate 3 built three looks plus project, CV, share, icon and missing-page features, asked a look question mid-turn, then hit its 15-minute deadline with no completed handoff. An earlier natural-entry baseline, before the choice-stop wording was added, skipped the unanswered look question | **Not yet shown** |
| 5. Chapters and wording | Not reached in a complete turn. An interrupted wording candidate on 12 October had drafted three opening and three closing versions before an external SIGTERM, with no choice handoff | **Not yet shown** |
| 6. Finish | Not reached with the current skill. The older row-card site, built under an earlier revision, passed six technical conditions but the author rejected its visual quality | **Not yet shown** |
| Optional-skill recommend, then refusal | No run has made a relevant recommendation, so the refusal branch is unobserved | **Unobserved** |

## The ordered checklist

Each item ends in a documented local-main commit, as the author directed
on 13 October. No push without the author's word.

### A. Finish the current six-stop proof

The proof is `codex-full-journey-timing-1`, described in
[its README](../../../evals/runs/stage-3-spine-time-1/README.md). Same
fixture, model, prompts and criteria as before; up to 30 minutes per turn.

| # | Item | Kind | Status |
|---|---|---|---|
| 1 | Stop 1, facts and machine check | Paid turn 1 | **Done.** [Passed](../../../evals/runs/stage-3-spine-time-1/turn-1-disposition.md) on 13 October |
| 2 | Stop 2, agent builds three concepts | Paid turn 2 | **Done.** [Completed natively](../../../evals/runs/stage-3-spine-time-1/turn-2-capture-disposition.md), but the original source capture failed on a custom `.next-concepts` build cache |
| 3 | Archive the full authored source after closure | Local | **Done.** [189 files](../../../evals/runs/stage-3-spine-time-1/source-recovery-disposition.md), original failure preserved |
| 4 | Bind the archive to the measurement adapters and continuation accounting; verify a reconstructed copy, one offline install and the concrete targets; commit readiness | Local, no model | **Next** |
| 5 | Independent concept check on desktop and phone, review every original image, gate decision | Browser, no model | Open |
| 6 | Turn 3, storyboard: 12 to 22 beats, or a coherent explicit ten-beat proposal under the fixture exception | Paid turn | Open |
| 7 | Turn 4, spine: opening, middle and ending in two or three reviewable looks, then a real stop for the look choice; independent look check | Paid turn and browser | Open. Candidate 3 timed out here |
| 8 | Turn 5, remaining chapters and three whole-beat versions each for opening and closing, with a recommendation and room for custom words; stop for the choice | Paid turn | Open. Never completed |
| 9 | Turn 6, apply the chosen words exactly, finish chapter navigation, project page, printable CV and HTML download, email links, share image, icon, missing-page page, fallbacks and `docs/story/` records | Paid turn | Open. Never completed |
| 10 | Independent whole-site matrix: desktop, phone, short height, reduced motion, no WebGL, no JavaScript, context loss; both scroll directions and transitions; every original image; fact, asset, checklist and handover audit | Browser and review, no model | Open |

The visual bar for items 5, 7 and 10 is the design's: the object explains
the person's work in space, specific to them, with depth from beginning
to end. Technical passes and screenshot counts do not meet it on their
own; that lesson is in the [visual rejection](../../history/2026-10-11-visual-quality-rejection.md).

### B. Close the behavioural comparisons on the final skill text

Run these only after the last skill correction, following the
[remaining-proof sequence](../../../evals/runs/stage-3-completion-2/full-journey/preparation/final-proof-sequence.md).
Saved baselines are reused; no new baseline actor or paid judge is needed
for 11 and 12.

| # | Item | Bound | Status |
|---|---|---|---|
| 11 | Fresh matched build-entry candidate (`bench-entry-1`): builds a runnable spine and waits at the real look choice | One turn, at most 15 minutes | Open. The earlier candidate was interrupted |
| 12 | Fresh matched wording candidate (`embedded-completion-1`): offers complete versions and uses the actual choice | At most two gated 15-minute turns | Open. The earlier candidate was interrupted |
| 13 | Planning regression: analyst, analyst-overstate and student, twice each | Six conversations, at most one judge each | Open. [Prepared](../../../evals/runs/stage-3-completion-2/planning-regression/README.md), not run |

### C. Stage 3 acceptance

| # | Item | Status |
|---|---|---|
| 14 | The author scrolls the actual finished site from item 9 on desktop and on their own phone, and says yes. A scripted test reply cannot stand in for this | Open. **This closes Stage 3** |

### D. Stage 1 closing decisions

These can run alongside A to C. Each needs a recorded disposition:
completed, deferred with the limitation disclosed, or blocking a claim.

| # | Item | Status |
|---|---|---|
| 15 | The author reads before and after plans and judges whether the skill's concepts are worth building (design test 3) | Open |
| 16 | Stronger-model check: two planning conversations (chef and analyst) on a stronger model, or an explicit deferral | Open. Never run |
| 17 | A fresh whole-repository closing review by a reviewer who has not seen the work | Open |
| 18 | Decide whether broader final validation is needed after the latest changes | Open |

### E. Stage 4 packaging

From the [packaging plan](2026-10-11-packaging.md), after item 14.

| # | Item | Status |
|---|---|---|
| 19 | Allowlisted release artifact with a file-and-hash manifest under `evals/packaging/release-candidate-1/` | Open |
| 20 | Licence, origin and public-artifact review of the distributed bytes | Open |
| 21 | `.claude-plugin/plugin.json` (absent today) checked against current official documentation; each install route tested in a disposable destination | Open |
| 22 | Extract the package outside this checkout, scaffold a fresh site, prove notes survive and conflicts write nothing, run the full checks | Open |
| 23 | Update the README to the proven six-stop scope and its tested clients and limits | Open |
| 24 | The author's decision to publish, release or push | Theirs |

## Risks that could stretch the estimate

### 1. The current proof's budget may run out before turn 6

The proof keeps the earlier conversation-wide ceilings: 5400000 ms of
actor time, 12000000 reported tokens and 1500000 uncached input plus
output. The runner checks them only before a turn starts, and clips each
turn's 30-minute deadline to the actor time that remains
([`planTurn`](../../../evals/lib/build.mjs)).

| After turn 2 | Used | Ceiling | Left for turns 3 to 6 |
|---|---|---|---|
| Actor time | 1101163 ms | 5400000 ms | 4298837 ms, about 72 minutes |
| Reported tokens | 2071429 | 12000000 | 9928571 |
| Uncached input plus output | 208133 | 1500000 | 1291867 |

Earlier runs suggest both of the first two could bind. Candidate 3's
storyboard turn alone reported 2586627 tokens in 213 seconds, and its
spine turn passed 15 minutes without finishing. The earlier two-turn
row-card build reported 9508014 input plus output tokens in 17 minutes
(resumed counters may overlap). If turns 4 and 5 each take 20 to 30
minutes and several million reported tokens, turn 6 could be refused at
the token check or cut short by the clipped deadline. The uncached
ceiling, the closer measure of cost, looks unlikely to bind.

This is root's projection, not an observed failure. Changing a ceiling
is a protocol variance and is the author's call. **Recommendation: settle
the ceiling policy before turn 4,** for example by keeping the uncached
and time ceilings and deciding in advance what happens if the reported
token ceiling is reached. Otherwise this proof could end the way the
last two did, with the site partly built and no finished turn.

### 2. Stops 5 and 6 are the least tested

They have never been completed with the current skill text. By the
repository rule, `building.md` holds only what saved runs needed: four
short paragraphs. The design's further references (`engine.md`,
`look-and-type.md`, `rules.md`, `checks.md`, `other-skills.md`,
`finishing.md`) are not written, correctly, because no run has needed
them yet. The first real observations of these stops may surface needs.
Each one means: preserve the failure, attribute it, add the narrowest
instruction, commit, then a fresh matched conversation from stop 1.

### 3. Apparatus interruptions

Unexplained external interruptions ended at least six captures or actor
attempts on 12 October: the comparison capture, the candidate
verification, the entry and wording candidates, candidate 2's concept
capture and candidate 3's replacement supervisor. The sender is unknown
and the author has said they sent none. Each cost a preservation and
approval cycle. Bounded [SIGTERM tracing](../../history/2026-10-13-sigterm-attribution-question.md)
is optional and not a Stage 3 requirement, but it would help attribute
the next one.

### 4. The author's visual bar

A site that passed six technical conditions was rejected on 11 October
for its visual quality. The concept limitations noted at stop 2 (small
face labels, weak geometric explanation, repeated closing poses, dark
contrast) are the kind of thing item 14 can still fail on.

## Decisions the author will be asked for

| When | Decision | Recommendation |
|---|---|---|
| Before turn 4 | Ceiling policy for the current proof (risk 1) | Decide now, in advance, rather than after a stop |
| Any time | Items 15 to 18: concept assessment, stronger-model check, broader validation | Concept assessment is needed for the design's test 3. The other two can be explicitly deferred with the limitation disclosed |
| Any time | Optional SIGTERM tracing | Worth it if interruptions return |
| After item 10 | Desktop and phone review of the finished site (item 14) | Required. Only the author can give it |
| Before Stage 4 claims | Whether side workstreams count for this release | Leave existing-portfolio review, live privacy enforcement and creative consistency out of the release claim and say so in the README, as the packaging plan already requires |
| End | Publication, release and push (item 24) | The author's |

## Out of scope for completion

Recorded so that it is not mistaken for missing work: deployment of any
person's site; an engine rewrite; a blanket set of new references;
themes; the bending sheet, a globe or a map; a blog, chat or second
language; global installation of optional skills; live privacy-runner
integration; general portfolio acquisition. These come from the design's
"Not in this work" section and the 13 October plan's boundaries.

## Known documentation lag

- The [README](../../../README.md) still says the shipped skill is
  planning-only and tells file-reading agents to load "all four reference
  files". The skill now routes builds through six stops and has five
  references. The 13 October plan says to correct the development-status
  wording when implementation resumes and to keep build-support claims
  for after acceptance.
- The handover's "What exists now" section opens by saying the skill
  "plans a site and stops before building it", which predates the
  six-stop routing.
- The design's `docs/story/assets.md` is not in `SKILL.md`'s list of kept
  files. Item 10's asset audit should check whether agents keep asset
  sources anyway. Add an instruction only if that audit shows it missing.
- The design's Node 20.9 prerequisite is superseded by Node 22.18, as its
  [11 October addendum](../specs/2026-10-10-portfolio-skill-design.md#11-october-engine-implementation-decisions)
  records.

## Checks on this checkpoint

Documentation only. No skill, engine, runner, evaluation artifact or
acceptance gate changed. Verification results are recorded with the
[request history](../../history/2026-10-14-remaining-work-request.md).
