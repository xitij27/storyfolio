# Decisions for this authorized diagnostic

The user authorized composition and implementation after the fictional
storyboard approval, overriding Storyfolio's planning-only endpoint for
this prototype. No real-person approval or publication is implied.

- One pale laboratory appearance, dark green board, metal instrument cases,
  copper model lead and teal observation lead. System fonts only. Change
  `content/looks.ts` and `app/globals.css` to adjust it.
- Six engine pieces: fixture chassis, illustrative board, command console,
  observation console, projection instrument and observed-run instrument.
  This count describes the explanation, not the real sensor. Change
  `story.ts`, `formations.ts`, `apparatus.tsx` and `faces.ts` together.
- The same apparatus reconfigures: enlarge the loop for scheduling, spread
  the command/response relationship for bring-up, and separate the two
  instruments for evidence. No timings or current values are drawn.
- Flexible leads communicate relationships, not recovered wiring. Projection
  inputs and the observed-run path never connect to each other. Lazy extras
  use the supplied guarded frame hook.
- Complete factual copy stays in server-rendered HTML. The scope panel uses
  a discrete face swap to avoid superimposed words during either scroll
  direction; other panels retain their labels. There are no scene controls.
- One fixed focus-only skip link follows the evaluation contract. Five
  chapter links are ordinary anchors. No CV, contact, external asset or
  unrelated project has been added.
- Browser review found staggered travel could cover instrument labels with
  the enlarging board. This bundle now uses synchronized piece travel
  (`stagger: 0`); the engine default remains unchanged. The inherited caption
  fade is disabled for this appearance, keeping prose visible during travel.
- Face textures can declare their printed aspect ratio. This removes
  unnecessary texture minification on wide instrument panels. The scope
  panel changes discretely, never blending old and new lettering.
- The check runner accepts bounded parallel case execution; defaults remain
  sequential. Full-matrix checks use concurrency 3 to finish within the
  local command runtime. No test cases or assertions were removed.
