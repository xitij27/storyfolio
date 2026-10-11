# Why the completed row-card demo missed the visual goal

11 October 2026. Read-only review after the author rejected the completed
demo's visual quality against the originating portfolio. This review traces
the approved design, coordinator-authored fixture, frozen build prompts and
rubric, actual final source, checker and saved images. It changes no frozen
input, result, skill, engine or actor source and starts no paid run.

The result is a substantial product-quality miss. The demo is a functioning,
factually careful page with repeated text strips. It does not establish the
design's intended object-led visual story. The coordinator narrowed the
exercise before the actor began, the actor made a minimal visual realization
within that scope, and our review process accepted technical correctness and
readability without establishing expressive quality. The author did not
choose these fictional constraints. A higher screenshot or test count would
not correct that mismatch.

## What the approved design actually asks for

The [design][design], lines 206 to 209, explicitly rejects a new coat of
paint on the same sections, 3D as a backdrop behind text, and one scene
however good. Lines 249 to 260 ask the same pieces to become forms that show
the chapters' meaning, including a diagram or work exhibit, and an opening
that shows the object's origin. Its tests at lines 271 to 279 include
Backdrop, Depth and Swap, alongside honesty and comprehension.

These are stronger requirements than matching chapter IDs, showing a
canvas and placing correct text on it. The distinction matters here: a
relationship drawn by the scene, a work artifact carried on its faces, and
a chapter label printed on a rectangle are not equivalent implementations.

The design also keeps the person's eye in the process. Lines 594 to 606
require author assessment and a whole-site proof with a non-sheet object.
Lines 632 to 635 say the engine raises the floor and does not replace that
eye. This is a reason to retain an actual visual gate, not an explanation
that makes the rejected result acceptable. The approved Stage 2 engine
preview and its phone review did not approve this fictional site's art
direction.

## Where the direction narrowed

| Decision | Saved evidence | Responsibility and effect |
|---|---|---|
| Select six matte row cards | Frozen [concept context][concepts], lines 27 to 38; [confirmations][confirmations], lines 22 to 23 | The historical fictional plan supplied the paper-like idea. The coordinator retained it for a deliberately narrow card-engine regression. It is not evidence of the real author's preference. |
| Constrain most chapters to tables or shallow table variants | Frozen [storyboard][storyboard], lines 29 to 37 | Opening gains shallow depth, State is a ruled table, Observation is a shallow bench review/evidence ledger, and Review returns to a table. Only Responsibilities and Transition clearly demand a different arrangement. This already limits the visual range. |
| Use restrained, almost stationary presentation | Storyboard, lines 54 to 69 | The coordinator supplied three paper palettes, short translations and rotations, and a mostly steady camera. Restraint does not require generic labels, but it makes a claim of broad visual exploration untenable. |
| Replace missing photo with an explanatory SVG | Confirmations, lines 24 to 33 | Honest fixture preparation removed the unsupplied photograph. The supplied SVGs were expressly allowed on faces, so their absence from the 3D is not a permission limitation. No invented circuit or measured waveform is needed to make their existing relationships visible. |
| Make phone and reduced motion entirely static | Confirmations, lines 40 to 43; storyboard, lines 73 to 78 | This was a coordinator-selected policy, explicitly overriding the engine defaults. The actor implemented it. Passing phone checks therefore means the requested static document worked, not that the 3D experience translated to a phone. |
| Prevent reconsidering the concept | Frozen [first build prompt][first-prompt], lines 5 to 8; [completion prompt][completion-prompt], lines 7 to 10 | Both runs were told not to restart concept selection. The completion also inherited the built spine. Blaming the completion actor for not proposing a different object would ignore its instructions. |
| Select Bench paper without a real visual choice | Completion prompt, lines 12 to 21 | The coordinator selected the look in a scripted fictional reply, which explicitly disclaimed real-person review. The gate tested continuation behavior, not whether the author found the result worth finishing. |

The historical concept was richer than its final realization. It proposed
faces containing diagram excerpts and the permitted fixture image, a
connected diagram, and a bench review around the artifact. Its alternative
objects were also close relatives: timing strips folded into a sheet and
checklist leaves. This is a concrete limitation of the saved concept set,
but these build cohorts never revisited or fairly tested concept selection.
The [stage review][stage-review] already identified this fixture as weak
non-sheet evidence. That caveat did not prevent subsequent completion
language from making the narrow result sound more convincing than it was.

## What the actor actually built

The final immutable source is [turn 2's snapshot][source]. The following
observations are source-based and corroborated by the saved desktop images.

- [Formations][formations], lines 8 to 29: five of seven beats use the same
  vertical table or a shallow variant. State and Evidence have exactly the
  same formation definition. Opening and Review change depth by only
  `i * .045`; Fixture changes row spacing, alternates depth by `.06`, and
  tilts the cards slightly. Responsibilities is two columns of three strips.
  Transition is three separated pairs at triangular positions. Returning to
  the opening at the close is intentional; the problem is how little else
  happens between those bookends.
- The same helper fixes the horizontal anchor at `.45`, with similar
  framing throughout. The inherited defaults leave `drift`, `sway` and
  `over` at zero. Only Opening and Review have a `within` formation. The
  source supports transitions between poses, so still screenshots do not
  prove an absence of all animation. They do show very limited authored
  scenes, and the source explains why.
- [Faces][faces], lines 13 to 28: every face is the same fill, two ruled
  lines, row number and small system-font label. There are no image `src`
  faces and no drawn diagrams. Transition's arrows are characters in labels
  such as `→ Measure`, not connectors between the pieces. Fixture repeats
  the schematic's nouns as six rows while the actual schematic remains in
  HTML. This is a consequential loss from the concept's proposed use of
  artifacts and relationships on the object.
- [Extras][extras] is an empty array. The [bundle][bundle] supplies no
  custom `Piece`, so [Pieces][pieces], lines 19 to 21 and 118, uses the
  starter Card: a box with depth `.045` and a face plane. Neither emptiness
  nor the default geometry is automatically wrong. In this result they help
  explain why there is no connected diagram, work exhibit or other scene
  content beyond flat labels.
- All three [looks][looks] share roughness, lights, no floor and the same
  geometry/layout. They are color variations. The fixture asked for looks
  of the same approved object, so this is not a failed three-concept test;
  it also is not evidence of three substantially explored visual directions.
- [Page markup][page], lines 6 to 13 and 25 to 27, places the schematics in
  separate HTML figures. The static modes retain those figures and all the
  narrative facts. On desktop the dominant scene often adds another list
  of the same facts, rather than making a relationship easier to see.

This reviewer reopened four exact final desktop originals individually:
[Opening][opening-image], [Transition][transition-image],
[Fixture][fixture-image] and [Evidence][evidence-image]. Their SHA-256
identities are in the existing [desktop audit][desktop-audit]. Opening is
dominated by an oversized contents list; Transition shows three disconnected
label pairs with a small separate loop diagram; Fixture gives most of the
scene area to six noun labels while the relationship drawing remains below
the prose; Evidence repeats the prose as another six-row list. The saved
images support that assessment, not a claim about every intermediate frame.

The complete HTML fallback is desirable. The design's Backdrop test should
not be met by hiding essential facts from accessible HTML. The missing
quality is a useful visual explanation of structure, sequence or evidence
that makes the primary experience more intelligible and specific, while a
fallback communicates that meaning in another way.

## The engine did not force this ceiling

The frozen [engine contract][engine-readme], lines 42 to 57 and 69 to 98,
already provides image or drawn faces, arbitrary piece position/rotation/
size, stack/fan/ring/grid/row/scatter helpers, custom Piece geometry, lazy
chapter extras and HTML controls. Its [bundle types][engine-types], lines
9 to 29, expose those mechanisms. Its [formation type][engine-formation]
includes camera framing, whole-formation turn, anchor, drift, sway and
within-beat poses. The README, lines 134 to 138, documents adaptive phone
rendering and reduced-motion cuts. The actor's hardcoded static media query
in [Story][story-component], lines 20 to 44, overrides those defaults for
this fixture.

Availability does not prove all richer uses are visually successful or
that this engine equals the bespoke original portfolio. It does establish
that no new engine feature was necessary merely to put a supplied diagram
on a face, draw its connections as an extra, arrange pieces with meaningful
depth, or author a stronger composition. Conversely, requiring every site
to use extras, a custom Piece or a minimum number of effects would reward
feature counting rather than explanation.

There is one concrete earlier engine limitation: the fixed portrait face
canvas distorted wide labels, leading to the actor's per-site aspect-ratio
patch. The [saved adaptation audit][adaptation] links early/final images and
explains allocation-budget limitations. That supports a bounded face
allocation improvement question. It does not explain the repeated table
concept, unused diagrams or mandatory static phone policy.

The design explicitly excludes shipping the original bending sheet, globe
and map as built-ins, at lines 645 to 652. Their absence must not be recast
as a forgotten implementation requirement. The missing proof is that the
general mechanisms can support a convincing different story, not that all
of the original site's bespoke scenes were copied.

## Why the checks and 49 reviewed images did not prevent this

1. **246 is a repository regression-test count.** The [test command][package]
   runs engine calculations/components, scaffolding and evaluation tooling.
   The [final log][test-log] proves those tests passed. It does not score
   this portfolio's concept, composition, narrative transformations or
   visual quality against the original. It is unrelated to the number of
   useful scenes the actor authored.
2. **The independent browser checker measures a narrower contract.** Its
   frozen [assessment function][checker], lines 122 to 152, checks beat
   IDs/order, headings, language, duplicate IDs, required visible wording,
   canvas presence/absence, overflow, usable links and errors. An animated
   condition passes its scene requirement when a visible canvas and the
   expected scene marker exist. It does not measure what the canvas shows,
   whether the object explains anything, or whether motion is compelling.
   The [expectations][expectations] explicitly require static phone and
   reduced-motion modes, so this tradeoff is accepted by construction.
3. **The screenshot count is mode coverage, not 49 different scenes.** It
   comprises 14 desktop files and seven each for phone, reduced motion,
   no WebGL, no JavaScript and context loss. The [desktop audit][desktop-audit]
   records six byte-identical middle/end pairs. The [capture code][capture],
   lines 210 to 229, saves settled positions rather than a continuous
   transition review. Repeated bytes and static fallback copies do not
   create additional evidence of motion quality.
4. **Human inspection asked too little.** The [desktop audit][desktop-audit],
   [phone/reduced audit][mobile-audit] and [fallback audit][fallback-audit]
   examine clipping, overlapping controls, legibility, factual content and
   mode behavior. Those observations remain useful, but “no blocking
   layout or readability defect” leaves the main design question unanswered.
   We opened the images and still accepted a weak visual story. This is a
   review-criteria failure, not simply a lack of screenshot access.
5. **The text judge could not fill that gap.** The frozen [rubric][rubric],
   lines 3 to 7 and 77 to 82, limits this to the row-card regression and
   explicitly excludes pixel-based visual conclusions. Its [judge prompt][judge]
   supplies no images. In this completion cohort the invocation was rejected
   before a model turn anyway, as [findings][completion-findings] records.
   There is no completed behavioral judgement to cite for it, much less an
   independent visual-quality pass.

These limitations were partly documented, but the overall reporting did not
give them enough weight. Calling the fictional site “complete and checked”
without leading with the absence of visual approval made implementation
completion sound like product acceptance. The substantial visual miss is
not adequately described by the earlier two smaller gaps concerning copy
alternatives and the static State sentence.

## Saved failures that can support the next question

| Concrete saved observation | What it supports | What it does not establish |
|---|---|---|
| Concept promises artifact-bearing faces and a connected diagram; final faces are labels and Transition has no actual connectors | A targeted question about whether the build preserves the concept's visual meaning, assessed from source and actual scene evidence | That the actor should violate the frozen object choice or invent missing private artifacts |
| Five of seven beats are table variants, with State/Evidence identical | A question about meaningful chapter transformations and whether the resulting story passes Backdrop and Depth in practice | An arbitrary rule requiring seven unrelated shapes or continuous motion |
| Large scene regions repeat lists while the explanatory drawings remain small separate figures | A question about composition and whether the work itself carries the scene | That all HTML fallback facts should be removed or all sites require photographs |
| Static phone mode was fixed by coordinator input | Correcting fixture scope and separating fallback coverage from a mobile visual-story proof | An actor failure to follow the requested phone policy, or a missing adaptive-phone engine capability |
| Review accepted readable repeated strips; the author then rejected the visual result | A real visual acceptance gate tied to the design's questions before completing the rest of a site | A general success/failure rate from this one case, or authority to start another paid run automatically |
| Earlier stretched labels required an aspect-ratio repair | A bounded engine allocation regression and visual comparison using wide and portrait faces | A blanket engine rewrite or proof that the current allocation patch is safe at every ratio |

First correct the acceptance claim and agree on what a convincing spine
must show: an opening with a reason for the object, a middle where it
explains or exhibits the work, and an ending that resolves the story.
Evaluate those with actual pixels and movement, alongside the original
portfolio's standard of authorship, before using a scripted look choice to
advance. Keep factual honesty, accessible fallbacks and the technical checks.
They are necessary and do not substitute for that review.

Any later skill instruction still needs a precisely attributed saved miss
and a matched rerun. This study can support narrowly framed build-quality
questions, but cannot isolate the effect of an instruction from the
coordinator's constrained fixture. The non-sheet full-journey proof remains
open. No implementation, instruction or paid rerun is authorized or made
by this audit.

[design]: ../../../docs/superpowers/specs/2026-10-10-portfolio-skill-design.md
[stage-review]: ../../../docs/superpowers/plans/2026-10-11-stage-review.md
[concepts]: ../codex-build-completion-1/inputs/fixture/docs/story/concepts.md
[confirmations]: ../codex-build-completion-1/inputs/fixture/docs/story/confirmations.md
[storyboard]: ../codex-build-completion-1/inputs/fixture/docs/story/storyboard.md
[first-prompt]: ../codex-build-1/inputs/prompts/turn1.md
[completion-prompt]: ../codex-build-completion-1/inputs/prompts/turn1.md
[source]: ../codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/
[formations]: ../codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/formations.ts
[faces]: ../codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/faces.ts
[extras]: ../codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/extras.ts
[bundle]: ../codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/index.ts
[pieces]: ../codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/components/story/pieces.tsx
[looks]: ../codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/looks.ts
[page]: ../codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/app/page.tsx
[story-component]: ../codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/components/story/story.tsx
[opening-image]: ../codex-build-completion-1/embedded-completion-1/baseline-1/acceptance/result/desktop/00-scope.opening-mid.png
[transition-image]: ../codex-build-completion-1/embedded-completion-1/baseline-1/acceptance/result/desktop/03-transition.diagram-mid.png
[fixture-image]: ../codex-build-completion-1/embedded-completion-1/baseline-1/acceptance/result/desktop/04-observation.fixture-mid.png
[evidence-image]: ../codex-build-completion-1/embedded-completion-1/baseline-1/acceptance/result/desktop/05-observation.evidence-mid.png
[desktop-audit]: ../codex-build-completion-1/embedded-completion-1/baseline-1/audits/visual-desktop.md
[mobile-audit]: ../codex-build-completion-1/audits/visual-mobile-reduced.md
[fallback-audit]: ../codex-build-completion-1/embedded-completion-1/baseline-1/audits/visual-fallbacks.md
[engine-readme]: ../codex-build-completion-1/inputs/skill/engine/README.md
[engine-types]: ../codex-build-completion-1/inputs/skill/engine/components/story/types.ts
[engine-formation]: ../codex-build-completion-1/inputs/skill/engine/lib/story/formation.ts
[adaptation]: ../codex-build-1/audits/engine-adaptation.md
[package]: ../../../package.json
[test-log]: ../codex-build-completion-1/audits/repository-tests-final.log
[checker]: ../codex-build-completion-1/inputs/implementation/evals/lib/build-check.mjs
[capture]: ../codex-build-completion-1/inputs/implementation/evals/check-build.mjs
[expectations]: ../codex-build-completion-1/inputs/expectations.json
[rubric]: ../codex-build-completion-1/inputs/rubric.md
[judge]: ../codex-build-completion-1/inputs/implementation/evals/prompts/judge-build.md
[completion-findings]: ../codex-build-completion-1/findings.md
