# Stage-level status clarification

12 October 2026. After receiving an answer about evaluation-tool repairs,
the author said:

> I mean it is not rocket science. Look at the stage plans and tell me where are we with respect to this skill?

This asks for the skill's position against the original stages, not another
list of testing-tool tasks. It does not authorize a new evaluation or change
the existing implementation, approval or publication gates.

## Status against the stages

Read the [original stage definitions](../superpowers/specs/2026-10-10-portfolio-skill-design.md#stages),
the [controlling stage review](../superpowers/plans/2026-10-11-stage-review.md)
and the [plan index](../superpowers/plans/README.md) together.

| Stage | Current product status |
|---|---|
| 1. Method | Planning skill implemented and evaluated: profile, fact confirmation, three concepts and approved storyboard. Closing concept review, stronger-model/validation dispositions and whole-repository review remain open. |
| 2. Engine | Complete and approved after desktop and physical-phone review. The reusable engine and scaffold ship in the repository. |
| 3. Build | Active and incomplete. Build experiments exist and the author approved a bounded manual prototype, but the shipped skill still stops at the storyboard. The evaluated reusable build workflow and approved non-sheet whole-site proof remain unfinished. |
| 4. Packaging | Not complete. Public README, license and repository exist; final package, installation/scaffold proof and build-capability documentation follow Stage 3. |

The central remaining product work is Stage 3: carry an agent from the
approved storyboard through spine, chapters and finish; cover the early
machine check, engine-backed concept sketches, look and whole-beat wording
choices, and optional-skill policy; validate any failure-backed instructions
with matched reruns and planning regression; then obtain actual approval of
a complete non-sheet site built through all six stops. This is not permission
to add instructions unsupported by saved failures or to run the old proposed
batch automatically.

The manual prototype's approval establishes a target, not reproducibility
by the skill. The latest independent build still has visual weaknesses.
Recent parser and browser-check work supports this Stage 3 question; it does
not itself complete a product stage. The skill's current planning-only exit
in [SKILL.md](../../skills/storyfolio/SKILL.md) is the clearest boundary on
what users receive today.

This checkpoint changes documentation only. No skill, engine, evaluation
result or stage requirement is changed, and no paid run or push is made.

Before committing, the available native Node 22.22.1 passes
`node evals/check-skill.mjs` (687 words, four references),
`node evals/check-people.mjs` (17 people), `npm test` (310/310 tests,
31 suites), and `git diff --check`.
