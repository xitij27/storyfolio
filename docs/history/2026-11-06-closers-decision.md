# The comparisons and Stage 1 closers, 6 November 2026

Stage 3 closed earlier that day. The author asked, verbatim:

> okay what else is elft

Root answered from the [handover](../handover.md#next-steps): the
comparisons and Stage 1 closers (14 October items 11 to 13 and 15 to 18 of
the [remaining-work plan](../superpowers/plans/2026-10-14-remaining-work-to-completion.md#b-close-the-behavioural-comparisons-on-the-final-skill-text)),
then Stage 4, packaging, and the small things left from plan 2. The
author answered, verbatim:

> okay lets get this done

## Root's recommendation

| # | Item | Recommendation | Why |
|---|---|---|---|
| 11 | Build-entry candidate (`bench-entry-1`) | Drop | Written for wording since replaced. Person tests 3 to 6 built the site and waited at the look stop on the current skill |
| 12 | Wording candidate (`embedded-completion-1`) | Drop | Same. Person test 6 offered the looks and moves complete and used the person's choice |
| 13 | Planning regression (analyst, analyst-overstate, student, twice each) | Defer, limit stated | Stops 1 and 2 changed after it was prepared and have been run since only on Dawit. Six paid conversations |
| 15 | Design test 3 (the author judges three concepts) | Drop | The skill no longer makes three concepts; the author's review of a finished site took its place |
| 16 | Stronger-model check | Defer, limit stated | Never run. The README states the model the skill was tested on |
| 17 | Fresh whole-repository closing review | Run | One reviewer who has not seen the work, before packaging |
| 18 | Broader final validation | Answered by the rows above | |

## The author's answer

Asked "drop 11, 12 and 15; defer 13 and 16 with their limits stated in the
README; run 17 (a fresh closing review); then start Stage 4 packaging.
OK?", the author chose:

> Yes, as recommended (Recommended)

## The limits, as the README will state them

- **Planning on other people (item 13, deferred).** Since stop 2 became
  one mix, the planning stops have been tested on one made-up person,
  Dawit (`evals/builds/full-journey-3`). The analyst and student cases in
  `evals/runs/stage-3-completion-2/planning-regression/` are prepared and
  not run.
- **Other models (item 16, deferred).** The person tests ran one actor,
  `gpt-6.1-sol` at medium effort through Codex (`evals/lib/codex.mjs`). No
  run on another or stronger model.
