# Person test 2: technical world, scenes from the work, no popping

Written before any actor, 23 October 2026. Skill and engine as of the
commit that adds this file: the technical world, scenes from the person's
answers, transitions and chapter presence (`81052c4`), picture questions in
working terms (`0e8f362`), technical depth at the first stop (`d8d6382`).

**Question.** With a technical profile, does a fresh agent build a site
that introduces the person in a world that looks like his field, with each
scene drawn from his own account of the work, growing out of the last?

**Fixture.** `evals/builds/full-journey-3`; see its README. Actor, settings,
capabilities, runner and bounds as in `stage-3-person-1` (six turns, 30
minutes each, 90 in all, 1.5 million uncached tokens; the reported-token
ceiling out of reach). Cohort `codex-person-2`.

**Gates.** Root reads each turn before the next fixed prompt.
- After turn 2: the recommended concept passes Person, Backdrop, Working,
  Field and Seams in its sketches, and its scenes come from the project
  notes, not labels. Otherwise the run stops.
- After turn 3: every chapter names a picture with captions hidden and how
  it grows out of the last. Otherwise the run stops.
- After turn 6: root serves the site, checks it against
  [the criteria](../../builds/full-journey-3/criteria.md), including frames
  between chapters, and the author's review decides.

A check folder the agent leaves outside the snapshot roots is moved out
intact with its hashes, as in `stage-3-person-1`.
