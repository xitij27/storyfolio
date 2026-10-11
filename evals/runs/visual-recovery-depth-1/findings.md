# A deeper fixture story

11 October 2026. Manual revision following the author's
[specific clarification](../../../docs/history/2026-10-11-prototype-depth-feedback.md):
"The story needs more depth". The [design](../../../docs/superpowers/specs/2026-10-11-fixture-story-depth.md)
sets a five-beat scope. The first prototype's source is preserved at
`71ae3ea`; its entire evidence directory stays unchanged.

## Changes and source discipline

The same apparatus now carries question, scheduling, bench relationship,
evidence provenance and scope. The new scheduling scene foregrounds command
and board. The evidence scene foregrounds observation. Face IDs and arrow
activation derive from the story rather than three fixed indices. The
four surface painters, physical geometry and existing three formations
are unchanged. The signed-clearance connector fix remains in place.

The new HTML adds an expressly illustrative teaching loop, richer inspection
descriptions, two separate evidence paths and a forty-cell sample diagram.
Six highlighted cells identify the bench-tested subset, not passes versus
failures. The footer quotes the supplied fictional lab note and says the
underlying spreadsheet and numeric inputs are not supplied. The two new
SVG fallbacks preserve the added explanations without a live scene.

Measured sleep/transmit current and the assumed reporting interval come
from the source notes. The loop is teaching material, not recovered firmware.
The projection is not inferred from the 72-hour run. Colleague circuit
ownership, zero customer units and unfinished qualification stay explicit.
The radio-awake incident remains omitted under the confirmed source scope.
No current value, timing, battery capacity, diagnosis or fix is fabricated.

## Verification

TypeScript and full ESLint pass before the first production capture.
The [capture script](capture.mjs) checks five declared sections and samples
all four travel intervals forward and backward. It retains the seven
browser modes and adds checks for the teaching-loop caveat and projection
inputs. A captured canvas, image count or functional pass is not a visual
assessment or physical-phone performance measurement.

The full [seven-condition capture](evidence/review/manifest.json) produced
76 originals with unchanged source. Short, reduced-motion, no-WebGL,
no-JavaScript and context-loss conditions passed. Desktop and phone each
reported one stale assertion: `Incorrect accessible description for control 2`.
The Board copy still credits the colleague's PCB and analogue front end,
but no longer uses the old sentence matched by the checker.

The exact first harness is preserved as
[capture-before-board-assertion.mjs](capture-before-board-assertion.mjs).
Only that wording assertion was calibrated to `/colleague[^.]*PCB/`;
`--no-movement` was added for a bounded repeat. The separately saved
[desktop and phone rerun](evidence/control-rerun/manifest.json) passes on the
same source, producing twenty further originals: the initial view, all five
settled beats and all four controls at each viewport. It explicitly skips
movement. This is combined coverage from an original full matrix plus a
focused checker rerun, not a fresh passing seven-mode run. No page source
was changed to satisfy the old assertion, and no original result was erased.

The original desktop series contains thirteen forward and thirteen reverse
movement frames. Every one of the four transitions has intermediate samples
in both directions. All five reduced-motion rest comparisons stayed still.
All five context-loss beats were captured after the scene entered fallback.
The reports record no browser errors or blocked external requests. Software
Chromium, including its touch viewport, is not a physical-device result.

Local checks completed:

- Prototype: `npm run lint`, `npm run typecheck`, `npm run build` and all
  fourteen `npm test` test-file processes pass.
- Repository: `node evals/check-skill.mjs` passes with 687 words and four
  references; `node evals/check-people.mjs` passes all seventeen cases;
  `npm test` passes 246 tests with zero failures across 31 suites.
- The initial `git diff --check` passes for tracked edits. After staging,
  the full check reports only an extra blank line at EOF in each of the two
  captured harness scripts. Their exact bytes are retained to preserve the
  hashes recorded during capture. `git -c core.whitespace=-blank-at-eof diff
  --cached --check` passes; no other whitespace error is waived. The shipped
  skill, original prototype evidence, frozen build studies and physical
  geometry have no changes since `71ae3ea`.

The production preview uses Node 22.22.1 and the existing ignored dependency
symlink. Browser work uses the existing local Chromium and library cache.
No dependency or asset download was needed. Approved execution outside the
sandbox was needed for the build, local preview/browser and Git-subprocess
checks. The Node typeless-package warning during capture is recorded in the
terminal result and is not a functional failure.

The [verification record](verification.json), generated by
[verify-record.mjs](verify-record.mjs), checks current source against all 87
captured file hashes, both harness identities, all 96 original image hashes,
the unchanged protected paths and local documentation targets. It passes:
zero source or image mismatches, all four transitions covered both ways,
and all local link targets across fifteen documents exist. Heading
anchors are not checked. No CLI actor
or judge was invoked. The author's revised-story assessment remains pending.

## Visual and factual review

All 76 original full-matrix images and twenty focused-rerun originals were
opened individually. The reviews are manual development checks, including
reviewers who helped implement the candidate, not independent paid cohorts:

- [Desktop and movement](movement-review.md): distinct command/board and
  observation emphasis, four correct selection highlights and no new
  connector or face-ghosting blocker. Solid parts temporarily obscure one
  another during regrouping; sparse transition states are not a smoothness
  or every-frame guarantee.
- [Phone-sized layouts](phone-review.md): added teaching loop, evidence paths
  and sample scope remain readable. Denser copy leaves a smaller object,
  especially at the end. Fine face printing stays supplementary to HTML.
- [Short and reduced-motion layouts](layout-review.md): twelve originals show
  no clipped current-beat text or caption/model collision. The short power
  pose has tight but separate navigation clearance.
- [Fallback and source review](fallback-review.md): eighteen originals retain
  the explanations, provenance and qualification limits. Repeated HTML/SVG
  material is less compact but keeps meaning available. The supplied notes
  support the claims; the teaching loop is not original firmware.

The story now explains scheduling, observation and the limits of evidence
instead of relying on three summary sections. This does not supply the
missing original engineering records or authorize an invented incident
account. It remains for the author to judge whether this amount of depth
satisfies the request, with physical-phone assessment still unconfirmed.

## Preview and continuation

The local preview remains `http://localhost:3012/`. Setup is in the
[prototype README](../../../prototypes/fixture-study/README.md).
This addresses the request for narrative depth, not the separate evaluated
build-workflow, full-site or release requirements. Commit locally on main;
no push is authorized by this feedback.
