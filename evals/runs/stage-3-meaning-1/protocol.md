# Does the scene now show what each chapter is about?

Written before any actor in this run, 22 October 2026, on the author's
direction "Fix the skill and try again"
([record](../../../docs/history/2026-10-22-fix-skill-and-rerun-direction.md)).

## The question

The author rejected the turn-6 site of `stage-3-spine-time-1` as "the same
3d asset roaming around across each scene"
([author review 1](../stage-3-spine-time-1/recovery/author-review-1.md)).
The skill was changed in commit `1cfeb9f`. With it, does a fresh agent on
the same fixture plan and build formations that show something with the
captions hidden, faces that carry work or drawn facts and are readable, and
a rail clear of the object?

## What is the same

Fixture, material, the six fixed prompts, actor model and settings,
capabilities, engine and bounds are those of `stage-3-spine-time-1`
(`case.json` differs only in its protocol path). The ten-beat exception
for this fixture still holds. Runner: `evals/codex-build-run.mjs`, cohort
`codex-meaning-1`, pinned Node and the restored browser paths, temporary
root `/var/tmp/storyfolio-entry-runtime-20261012`.

## Gates

One fresh conversation, at most six turns, each at most 30 minutes, 90
minutes in all, 1.5 million uncached tokens. Root reads each turn's final
reply and files before writing the gate for the next fixed prompt, and
records it here in `gates/`. A turn that does not reach its handoff (see
the spine-time protocol's table) is not advanced; no retry is implied.

## How it is judged

1. **Root, at the storyboard (after turn 3):** for every beat, what the
   scene says with the captions hidden. A beat whose answer is only that
   the subject changed is a failure of the change. The concept
   recommendation and its stated reason are recorded against the new
   concept line.
2. **Root, on the built site (after turn 6):** settled beats at desktop,
   phone and short screen, captions hidden where the page allows, faces
   read at size, rail position. Facts against the fact sheet.
3. **The author** scrolls it on desktop and phone. That review decides.

Disclosed scope change: the 677-image independent whole-site check of the
last run is not repeated before the author looks. The author's verdict on
meaning is what this run is for, and root's checks above are made first. If
the author accepts the site, the full technical check is run before Stage 3
closes.
