# Does the skill now introduce the person?

Written before any actor, 22 October 2026, on the author's "okay then let
us test it" ([record](../../../docs/history/2026-10-22-a-portfolio-introduces-the-person.md)).
Skill and engine as of the commit that adds this file: the structure change
(`f107a2e`) and the deleted examples (`4cd05a0`).

**Question.** Given a person with a whole history, does a fresh agent plan
and build a site that introduces him (places, education, roles, field,
work), with each chapter's scene a picture of it at the bar of the author's
own site, and at least one piece of work running?

**Fixture.** `evals/builds/full-journey-2` (Dawit Bekele); see its README.
Actor, settings, capabilities and runner as in `stage-3-meaning-4`. Cohort
`codex-person-1`.

**Bounds.** Six turns, 30 minutes each, 90 minutes in all, 1.5 million
uncached tokens. The reported-token ceiling is set out of reach
(1,000,000,000): it counts cached re-reads, and the author removed it for
the last two runs as no measure of cost. The uncached ceiling is the cost
bound; it is checked between turns, so one turn can pass it.

**Gates, to save cost when it fails.** Root reads each turn before sending
the next fixed prompt.
- After turn 2: the recommended concept must pass the concept reference's
  Person, Backdrop and Working tests in its sketches, with no scene a
  rearrangement. Otherwise the run stops and root reports to the author.
- After turn 3: every chapter in the storyboard must name a picture with
  the captions hidden. Otherwise the run stops.
- After turn 6: root serves the site and checks it against
  [the criteria](../../builds/full-journey-2/criteria.md); the author's
  review decides.

A browser-check folder left by the agent outside the snapshot roots is
moved out intact, hashed, as in `stage-3-meaning-3` and `-4`.
