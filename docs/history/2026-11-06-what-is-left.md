# What is left to complete the skill, 6 November 2026

The author asked, verbatim:

> what else is left to complete this skill?

Root's answer, read from the [handover](../handover.md#next-steps), the
[1 November review](2026-11-01-person-test-4-review.md) and the
[28 October answer](2026-10-28-what-is-left.md). Documentation only: no
skill change, no run, no push.

## Found while answering: 1 November's work is on GitHub

The handover says the sheet's moves were "not pushed". After `git fetch`,
`origin/main` is `8103e0a2` ("The person picks the sheet's move at the look
stop"), the same as local `main`. Root ran no push in this session, so the
author (or another session on their word) pushed it.

## What is left, in order

Stage 3 of 4 is open.

1. **Engine fixes from person test 4, before the next paid run.** Its
   turn 4 agent edited `stitch/` to fix faults a fresh agent would meet
   again: a study's city, the camera for "good at", a navigation bar and a
   caption band. Also the map's crowding at home. Root recommends taking
   these into the engine first, so the next run does not spend its time
   redoing them.
2. **Person test 5 (paid, on the author's word).** The person test again
   on Dawit (`evals/builds/full-journey-3`) with the sheet's moves offered
   at the look stop. Needs a protocol in `evals/runs/` written before any
   agent runs.
3. **The author's review of that site** on a desktop and a phone. This
   closes Stage 3. The bar: "cool transitions mean wow".
4. **Smaller things from plan 2** (handover step 6): `site.cv` unchecked as
   an address, the owner's CV button on `/preview?person=noa`, contrast
   below 4.5:1, framing on unusual screens, stale stitch-2 frames,
   `/plain-story` shipping unlinked, no project picture that runs (so "one
   project shown working" is not in the pieces), a long "looking for" line
   cut, three map leftovers.
5. **Comparisons and Stage 1 closers** (14 October items 11 to 13 and 15
   to 18). Still unanswered which to run and which to drop; several were
   written for a skill that has since changed.
6. **Stage 4, packaging** (14 October items 19 to 24): a release package
   with a manifest, a licence and origin review (Natural Earth, the ideas
   from React Bits and Aceternity UI), `.claude-plugin/plugin.json`, a
   clean install by each route, the README's status brought up to date,
   and the author's decision to publish.

## Decisions asked of the author

- Take person test 4's engine fixes in before the next run?
- Launch person test 5 (paid)?
- Which of the comparisons and Stage 1 closers to run, and which to drop?
