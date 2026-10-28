# What is left to complete the skill, 28 October 2026

After plan 1 of the transitions work was built and the mixer removed
([record](2026-10-27-transition-examples-request.md#28-october-later-no-mixer)),
the author asked, verbatim:

> Okay, what else is left to complete this skill?

This page is root's answer, read from the handover, the
[transitions design](../superpowers/specs/2026-10-27-transitions-gallery-design.md),
[plan 1](../superpowers/plans/2026-10-27-stitch-pieces-and-gallery.md) and
the [14 October checklist](../superpowers/plans/2026-10-14-remaining-work-to-completion.md),
whose open items it carries forward. Documentation only: no skill change,
no run, no push.

## Found while answering: `main` is already on GitHub

The handover says the question of pushing was asked again and not
answered. But `main` and `origin/main` are both at `083a24a0` ("Remove the
gallery's mixer: the agent mixes"), and the "Library on GitHub Pages"
workflow ran on that push (run 40628537713, 28 October 03:45 UTC, success).
https://xitij27.github.io/storyfolio/transitions/ answers 200 and has no
mixer. No author word to push is recorded in this repository, and plan 1's
Task 10 Step 3 (the live check in Chromium at both sizes) has not been
made. Root asks the author whether they pushed it, and records the answer.

## What is left, in order

Stage 3 of 4 is still open. The transitions work is how it now closes.

1. **Close plan 1's Task 10.** Record who pushed, and check the live
   gallery at desktop and phone size.
2. **Plan 2, the skill's second stop.** Not yet written. The skill still
   says "Three concepts" at stop 2. Plan 2 adds a palette option to
   `mountStitch` and the three worlds (so the look stop becomes colourings
   of the chosen pieces), then changes stop 2: the agent writes
   `content/person.ts` and `content/mix.ts`, shows the mix moving at
   `/preview` with a reason for each choice, points to the gallery and
   records the person's answer in `docs/story/concepts.md`. `SKILL.md` is
   at its 800-word limit, so words must come out as others go in.
3. **Fix what plan 1 left weak** before a person sees it: the dive's window
   floats over the scene instead of sitting in an element of it; small
   words on the sheet's wall on a phone; a dark map.
4. **Plan 3, the person test.** Rerun person test 2's fixture
   (`evals/builds/full-journey-3`) with the changed skill. Paid, so on the
   author's word. Tokens compared with person test 2's 1.25 million
   uncached.
5. **The author's review** of that site on desktop and a phone. This
   closes Stage 3.
6. **Comparisons and Stage 1 decisions** (14 October items 11 to 13 and
   15 to 18): the build-entry and wording candidates, the planning
   regression (six conversations), the author's judgement of the concepts
   (design test 3), a stronger-model check, a fresh closing review, and
   whether broader validation is needed. Each is run or deferred with the
   limit stated. Root's view: several were written for a skill that has
   since changed (three concepts, one object), so the author is asked
   which still matter.
7. **Stage 4, packaging** (14 October items 19 to 24): a release package
   with a file-and-hash manifest, a licence and origin review of what
   ships (the Natural Earth data, the ideas taken from React Bits and
   Aceternity UI), `.claude-plugin/plugin.json` (absent) and each install
   route tested, a clean install from the extracted package, the README
   brought up to date (its status section still describes the one-seam
   study and an author review "next"), and the author's decision to
   publish.

## Decisions asked of the author

- Did you push `main` on 28 October?
- Go ahead with plan 2?
- Which of the comparisons and Stage 1 closers in item 6 to run, and
  which to defer.
