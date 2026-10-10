# Implementing the accepted improvement recommendations

On 10 October 2026 the author said: "yes, I like your recommendations.
Let us implement them". This accepts the five recommendations recorded at
the top of `docs/handover.md`: opening clarity, closing meaning, concrete
creative evidence, privacy enforcement investigation and better measurement.

## Skill candidates

Use the skill-creator guidance for narrow instructions backed by saved
misses. Keep the main skill and its description unchanged. Commit each
candidate before its paid runs. Existing v1 fixtures, rubric and runner
stay unchanged throughout the two skill comparisons.

1. Add a first-screen meaning requirement to the storyboard reference:
   explain the person's work and necessary unfamiliar terms in ordinary
   words, supported by confirmed facts. Final publication wording stays
   deferred. Saved misses: `codex-sol-1/nurse/with-2` and
   `codex-stem-1/embedded/with-1`.
   Run `codex-opening-1`: nurse, embedded and student twice each, Sol
   medium and independent Astra medium judges. Compare nurse to the two
   original Codex skill runs, embedded to its one STEM skill run, and
   student to the two premise runs. Report unequal repetitions and the
   intervening factual refinements; these are independent conversations,
   not an isolated causal estimate.
2. After the opening conversations have captured their committed skill,
   add the closing meaning and its supporting facts to the storyboard
   output, expressly distinct from final captions. Saved misses:
   `codex-sol-2/analyst/with-1`, `codex-privacy-1/analyst/with-2` and the
   original analyst-overstate runs. Run `codex-closing-1`: analyst,
   analyst-overstate and student twice each with the same model roles.
   Compare analyst against privacy, analyst-overstate against the original
   Codex skill cohort, and student against opening. Earlier cohorts have
   other skill differences, which must remain visible in the analysis.

Each candidate gets one declared cohort and one judge per conversation.
Do not sample repeatedly until passes appear. Inspect actual outputs and
instruction reads alongside all rubric criteria, particularly invented
claims and student attribution, simulation status and asset permissions.
Preserve and manually audit conservative private-read flags.

## Independent work

- Add a separate `physicist-evidence` fixture with one permitted, concrete
  fictional calibration example. Preserve the original fixture. Run it
  twice with the current skill and unchanged creative guidance in
  `codex-physics-evidence-1`. This tests whether a supplied example enables
  an explanatory concept; it does not by itself isolate the value of the
  added evidence from other changes since the original STEM cohort.
- Build optional v2 evaluation tools alongside v1. Record first-turn
  discovery and wrong assertion independently, and keep both in the v2
  full bar. Add judgement anchors for closing meaning and explanatory 3D
  with equivalent accessible content. Calibrate once on six saved cases:
  original hurried analyst with-1, sol-2 student with-2, both sol-2 analyst
  runs, STEM backend with-1 and STEM physicist with-1. New ratings belong
  in a separate cohort with pinned original inputs and no replaced scores.
- Investigate and, where supported here, prototype an opt-in privacy
  enforcement boundary. Use deterministic allowed/denied read probes
  before considering another paid conversation. Keep the private-file
  benchmark intact. Record exact environmental limitations and do not
  label an instruction or hidden fixture as enforcement.

The specialist plans record implementation details. The parent integrates
the work, runs required local checks, reviews the changes and commits on
main. All evidence belongs in the repository. No broad rerun, release,
publication or site implementation is part of this piece of work.

## Verification and completion

Before every commit, run `node evals/check-skill.mjs` and `npm test`.
Validate the changed skill with skill-creator's validator, check fixtures
and whitespace, and verify recorded cohort hashes against committed inputs.
Meaningful new harness tests cover v2 assertion safety and source preservation;
privacy probes must show the public file succeeds and the private file
cannot be read through direct or indirect access. Record failures as well
as successes. Update this plan and `docs/handover.md` with actual outcomes.

## Completed outcome

All five workstreams completed on 10 October 2026. The skill changes are
limited to two paragraphs in the storyboard reference. The description,
main skill, existing fixtures, v1 rubric and ordinary Codex runners are
unchanged. Creative work first tested richer permitted evidence; it did
not add an unsupported instruction.

| Workstream | Saved evidence | Result and decision |
|---|---|---|
| Opening, committed at `749eee0` | `evals/runs/codex-opening-1/` | 6/6 plain-reader passes, no invented facts, 3/6 full bar. Retain the clarification; discovery and creative misses remain. |
| Closing, committed at `b85d014` | `evals/runs/codex-closing-1/` | 6/6 supported question/answer passes, no invented facts, 5/6 full bar. Retain the clarification; one backdrop miss remains. |
| Concrete physics fixture, committed at `f2daa12` | `evals/runs/codex-physics-evidence-1/` | Both plans explain the calibration and preserve its limits; 1/2 full bar. Diversity is mixed. Freeze the new fixture for later comparisons; keep the old fixture intact. |
| V2 measurement, committed at `fd8656b` | `evals/runs/codex-measurement-v2-1/` | Six diagnostic ratings completed. Discovery/assertion and closing distinctions work; creative interpretation remains unsettled. Keep v2 optional and separate, with original scores preserved. |
| Privacy investigation and prototype | `evals/runs/codex-privacy-enforcement-1/` | Broad workspace access plus exact-path denial fails a hardlink read. Exact public-file grants pass 12/12 deterministic probes. Keep the limited opt-in prototype; live runner integration is not implemented. |

The physics conversations recorded different commits (`f2daa12` and
`fd8656b`) with identical opening-only skill bytes. Both precede the closing
addition. The privacy and v2 implementation and complete results were
committed with the closing candidate at `b85d014`. The final evidence commit
records the physics and closing outcomes and this completion review.

The declared cost scope was respected: fourteen new portfolio conversations,
fourteen original v1 judgements and six diagnostic v2 judgements, with no
failed model runs, retries or favourable rejudging. Deterministic privacy
attempts and the offline physics report failure were preserved with their
fixes. The latter needed a cohort-local verifier that supports no previous
group; it did not require another model call or an edit to an old verifier.

Independent review covered v2 source preservation and assertion gating,
privacy mechanism and scope, physics factual/creative outcomes, and closing
factual/creative outcomes, instruction reads and private-file flags. The
closing audit corrected four
filename-listing false positives with original metadata evidence retained.
Historical artifacts are hash-checked and unchanged. No v2 result replaces
an original judgement or changes a skill-test pass rate.

Small independent cohorts support the targeted opening and closing changes.
Earlier comparator versions include other changes, and the physics input
experiment has no matched baseline. Neither total-pass differences nor the
v2 full-bar flip establish a general improvement rate. Remaining questions
are creative consistency, author concept review, built-site proof and
separate future integration of the tested privacy boundary.

## Completed verification

- `node evals/check-skill.mjs`: passes, 687 main words and four references.
- `npm test`: all 48 local test declarations pass. The Git-subprocess tests
  need approved escalation in this outer workspace sandbox; an initial
  sandbox EPERM is not a test assertion failure.
- Skill-creator's `quick_validate.py` passes for `skills/storyfolio` after
  the final clarification. Fixture validation passes for seventeen cases
  representing twelve fictional people.
- `node evals/runs/codex-privacy-1/verify.mjs evals/runs/codex-opening-1`
  and the same command for `codex-closing-1` pass with Git-subprocess
  escalation, checking the pinned original artifacts and committed inputs.
- `node evals/runs/codex-physics-evidence-1/verify.mjs` passes with the same
  escalation and correctly records that no matched previous group exists.
- `node evals/runs/codex-measurement-v2-1/verify.mjs` and
  `node evals/runs/codex-privacy-enforcement-1/verify.mjs` pass offline.
- Instruction-read and manual-review hashes were checked. `git diff --check`
  passes. Required local checks ran before each commit.

All plans, implementation details, conversations, ratings, unsuccessful
attempts and conclusions are saved in this repository. Work was committed
on main; no push, release or publication was performed for this task.
