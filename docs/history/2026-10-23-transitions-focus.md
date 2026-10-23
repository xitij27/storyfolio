# Transitions, not components, 23 October 2026

After the component library went live
([record](2026-10-23-component-library.md)), the author wrote, verbatim:

> I don't want to focus on the components. I want to focus on the transitions. How do we transition from one section to another? How one 3D component morphs into another?

## What root found

- **The engine moves between sections in two ways.** Shared pieces travel
  from one beat's formation to the next (`formation.ts`, `timeline.ts`),
  which is the V3 approach the author rejected on 22 October as the same
  asset roaming. And each chapter's own scene is shown by
  `chapterPresence` (`lib/story/story.ts`), 0 to 1 over the travel from the
  chapter before: the scene decides what to do with that number, and
  agents scale or fade it.
- **Person test 2 used the second.** Its storyboard planned real
  carry-overs ("Restore path stretches into a geographic route", "SD record
  path becomes a library catalogue store"), but the built site shows one
  picture shrinking while the next grows at the same place
  ([final review](../../evals/runs/stage-3-person-2/final-review/README.md):
  "a cross-handover, not one shape morphing into the next").
- **The cause is in the engine, not only the agent.** A chapter's scene is a
  separate component that knows only its own presence. Nothing lets a line
  or object of one scene become a line or object of the next, so the only
  easy transition is to swap them.

Root answered with the ways one picture can become another and proposed a
transitions study before any engine or skill change. The library stays
published as it is; no further work on components.
