# Engine adaptation audit of the first build turn

11 October 2026. Read-only coordinator review of the saved before-turn and
after-turn source, the frozen fixture, and retained actor browser evidence.
No implementation, engine, frozen input or actor workspace was changed. No
browser, test suite or model conversation was started for this audit.

The strongest reusable finding is face texture proportions: the starter's
fixed portrait canvas does not directly support the approved wide row cards.
The actor added a small optional aspect field after observing stretched
lettering. Static phone and reduced-motion loading are deliberate fixture
choices, not failures of the engine's documented defaults. The other changes
are mostly the expected work of building a particular portfolio.

## Scope and evidence

The comparison is [before the actor turn](../embedded-1/baseline-1/turns/01/before/files/)
against [the final snapshot](../embedded-1/baseline-1/turns/01/snapshot/files/).
This avoids counting setup-generated files as actor implementation. It finds
27 changed or added files. Five are in `components/story/`: `faces.ts`,
`story.tsx`, `types.ts`, `validate.ts` and `validate.test.ts`. The actor did not
replace the scene, camera, timeline, animation, mesh, shader or layout code.

This is the three-beat stop-4 spine only: Scope, Transition and Review. The
other four approved beats remain intentionally unbuilt pending the person's
look choice. The stopped cohort cannot establish a complete seven-beat site,
later copy approval, final handover, or a different object-family proof.

The actor's [review](../embedded-1/baseline-1/turns/01/snapshot/files/docs/story/review.md)
and [compact check record](../embedded-1/baseline-1/turns/01/snapshot/files/docs/story/check-results.json)
report 131 unit tests, type checking, lint and 18 browser cases passing.
The retained [final browser manifest](../embedded-1/baseline-1/actor-evidence/turn-1/checks/2026-10-11T01-55-22-591Z/manifest.json)
is complete with 18 results, zero reported problems and three expected beat
IDs. These are actor-controlled checks, not the frozen coordinator acceptance
test and not independent certification of the complete fixture.

## Face proportions: a bounded candidate for engine improvement

The [original face allocator](../embedded-1/baseline-1/turns/01/before/files/components/story/faces.ts)
always creates a 768 by 1024 canvas, or 384 by 512 on coarse-pointer devices.
The actor's [formations](../embedded-1/baseline-1/turns/01/snapshot/files/content/formations.ts)
use 3.65 by 0.46 table rows and 2 by 0.42 transition pieces. Mapping an
uncompensated portrait drawing to those shapes stretches it. A site author
could compensate in drawing code; the starter has no explicit allocation
parameter for the physical proportions.

The actor added optional `FaceDef.aspect`, retaining 0.75 as the default,
and allocates canvas height as rounded width divided by that ratio.
[The new face definitions](../embedded-1/baseline-1/turns/01/snapshot/files/content/faces.ts)
give each beat its matching piece ratio and draw in corresponding logical
coordinates. At normal desktop resolution this yields approximately 768 by
97 for the table and 768 by 161 for the transition, instead of 768 by 1024.
[Validation](../embedded-1/baseline-1/turns/01/snapshot/files/components/story/validate.ts)
rejects non-finite values and ratios outside 1/16 to 16; the saved unit test
covers invalid examples and a valid wide ratio.

This auditor opened the retained [early opening screenshot](../embedded-1/baseline-1/actor-evidence/turn-1/checks/2026-10-11T01-47-18-805Z/light-wide/00-scope.opening-mid.png)
and [final opening screenshot](../embedded-1/baseline-1/actor-evidence/turn-1/checks/2026-10-11T01-55-22-591Z/light-wide/00-scope.opening-mid.png).
The early labels are severely stretched and cropped; the final labels have
recognizable proportions and fit their rows. This corroborates the actor's
reported problem. Several drawing and framing changes happened between the
captures, so these two images do not isolate the effect of the aspect field
alone. Final texture text also remains softer than adjacent HTML text.

Consider a generic aspect-aware face allocation API in future engine work.
Do not copy the patch as already validated for every geometry. Its range
permits a desktop height of 12,288 pixels at 1/16, so maximum texture
dimensions and pixel budgets still need consideration. The added tests check
bundle validation, not actual texture dimensions, allocation limits or visual
results across ratios. A bounded engine regression using wide and portrait
faces could establish those properties without adding an instruction to the
skill. The saved miss concerns starter flexibility, not evidence that the
agent failed to inspect or repair its own build.

## Static scene loading: correct fixture adaptation

The frozen [storyboard](../inputs/fixture/docs/story/storyboard.md) explicitly
chooses static HTML at widths of 767 CSS pixels or less and for reduced
motion, with no scene-only/WebGL chunk downloaded for those modes. It says
this overrides the starter defaults. The [frozen engine README](../inputs/skill/engine/README.md)
instead documents an adaptive phone scene and reduced-motion cuts between
poses. Those defaults are internally consistent.

The actor's [Story component](../embedded-1/baseline-1/turns/01/snapshot/files/components/story/story.tsx)
uses a subscribed media query for those two conditions. Its server snapshot
starts static, and it mounts the dynamic scene only when the query is false,
WebGL is supported and no scene failure has occurred. The associated CSS
supplies ordinary document flow and larger schematic images while the scene
is off. This is a small, understandable per-site decision, although the
breakpoint and policy are currently hardcoded in the component.

The saved [supplemental report](../embedded-1/baseline-1/actor-evidence/turn-1/checks/2026-10-11T01-55-22-591Z/supplemental/report.json)
records zero mounted canvases and no identified scene chunk requests on
phone and reduced motion, versus one canvas and a scene request on desktop.
Its [test source](../embedded-1/baseline-1/turns/01/snapshot/files/scripts/check-spine.mjs)
identifies scene chunks from generated bundle contents and checks fresh
contexts. This supports initial static loading for that saved Chromium
build. It does not cover all breakpoint changes during a session, every
possible chunking strategy, or real-phone resource use. The unchanged WebGL
support hook still probes an unattached WebGL canvas, so this is not a claim
of absolutely no WebGL context creation on static visitors.

A configurable scene policy could avoid repeated component edits if more
sites need this choice. This single case does not justify changing the
engine's default or making static mobile mandatory.

## Other adaptations and remaining limits

- Content, row formations, face artwork, three palettes, header, contact/CV,
  diagrams, fallback layout and 404 copy are routine fixture implementation.
  The actor retained the same six pieces and only three authorized spine
  beats. CSS fixes for its own header and appearance switch do not establish
  a general starter layout defect.
- The actor made the browser matrix accept explicit `staticPhone` and
  `staticReduced` choices, while preserving its original defaults. That
  matches this fixture's stated modes; it is not an arbitrary removal of
  scene checks. The independent coordinator contract stays separate.
- Optional checker batching, limited to four jobs and defaulting to one,
  responds to this environment's terminated long checks. It is a tooling
  candidate rather than an engine requirement. Concurrent software-rendered
  browser results should not become device performance claims.
- The final matrix covers rendering each of the three looks, but its saved
  switching command cycles only `light,dark`. It does not independently
  establish all transitions to or from `review`. This is a coverage limit
  of the actor's inherited checker, not an observed broken third look.
- This audit viewed only the two explicitly linked screenshots. It does not
  adopt the actor's broader claim to have reviewed all 93 matrix captures as
  this auditor's own visual review. There is no new engine fix, method
  instruction, final-site acceptance or paid rerun in this audit.
