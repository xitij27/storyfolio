# Local five-beat prototype handover

## Authorization and factual boundary

The user asked to “Use Storyfolio and the supplied approved facts and storyboard
to build a local, five-beat prototype” and explicitly allowed continuing beyond
the skill’s planning-only endpoint for this evaluation. They authorized one
appearance using the supplied engine and an illustrative physical apparatus.
They said this is a prototype diagnostic, not completion of the six-stop
journey or permission to publish, and to stop with the reviewable prototype.

Ada Mensah and Mosslink remain fictional evaluation subjects. The unchanged
corrected `facts.md` and fictional `confirmations.md` are the factual boundary.
There is no real-person testimony or visual/wording acceptance. The current
implementation is new. No earlier visual design or external assets were used.

## Implementation

All five stable beat IDs are implemented in order: `question`, `scheduling`,
`bench`, `evidence`, `scope`. One `h1` and four `h2`s sit in corresponding `Beat`
components. The fixed focus-only `#story-skip` says “Skip to the answer” and
links to the actual `#chapter-scope` section. All claims and limits are HTML.

- `content/story.ts`: five chapters and seven engine pieces.
- `content/copy.ts`, `app/page.tsx`: new headings, complete explanations,
  contribution attribution, projection/observation distinction and scope.
- `content/apparatus.tsx`: solid tray, board, observation instrument, three
  teaching-state towers and contact bridge, modeled with local primitives.
- `content/formations.ts`: assembled → teaching cycle → opened fixture access
  → separated evidence paths → returned assembly. Spatial proportions have
  no measured meaning. Scroll uses the supplied engine; it is not a circuit
  or wiring simulation.
- `content/faces.ts`: locally generated explanatory labels. “72 h” is labeled
  observed; “2 years” projected; current measured; interval assumed. These
  labels are not actual instrument readings. HTML visibly states this.
- `content/looks.ts`, `app/globals.css`: one grey/teal/ochre/rust appearance,
  system fonts, phone framing and compact short-height text/navigation.
- Supplied SVGs remain unchanged and appear as teaching fallbacks for
  scheduling and bench. No original measurement, trace, firmware, spreadsheet,
  run notebook or actual apparatus image is supplied or fabricated.
- The supplied engine is retained; customizations live in content and page/CSS.
  No optional extras, simulated controls or overlay links are used.

Design rationale and revision paths are in `decided-for-you.md`; concept
selection is in `concepts.md`; asset provenance is in `assets.md`. The approved
meaning-level storyboard is retained with an implementation note.

## Validation

Actor checks, distinct from coordinator setup:

- `npm ci`: initial registry request was blocked by the evaluation network.
  `npm ci --offline --cache=/tmp/storyfolio-npm-cache` then passed: 392 packages,
  zero audit vulnerabilities. The supplied lockfile was used unchanged.
- `npm run browsers`: passed using existing Chromium resources.
- `npm test`: 129 tests passed, zero failures.
- `npm run typecheck`: passed after correcting a face-generator parenthesis.
- `npm run lint`: passed, including the new diagnostic script.
- First `npm run check` failed on that syntax error. The corrected implementation
  passed all seven production-browser matrix cases in
  `checks/2026-10-11T22-51-19-710Z/`.
- Visual inspection found an active rail label crossing the instrument at
  1280×480. Short wide navigation now uses a compact top row with full labels
  retained in the accessibility tree. The fresh final `npm run check` passed all seven cases in
  `checks/2026-10-11T22-55-05-707Z/`: successful production build and no
  browser report problems.
- `node scripts/prototype-review.mjs`: passed after correcting its rest-sample
  array access and launching its server in the same isolated tool process.
  Final `checks/prototype-review/report.json` has no problems. It verifies
  visible skip focus and Enter navigation, rail pointer/keyboard navigation,
  five short480 captures, and all beats/headings plus key factual limits in
  no-JavaScript and no-WebGL modes.

The matrix covers 1440×900, 1280×720, 390×844 touch emulation, reduced motion,
no WebGL, no JavaScript and context loss. Reduced-motion canvas comparisons
verify stationary stillness. It checks shader errors after a delay and captures
start/middle/end of the wide and reduced-motion beats. Real phones were not
used; software-rendered viewport emulation does not establish phone performance.

## Review and remaining limits

All five beats are reviewable in the 3D story and in complete HTML fallbacks.
The apparatus is the same recognizable assembly across the scroll. Small canvas
labels are supplementary, especially on phone; the HTML carries every meaning.
At the start of a later beat, copy below the viewport becomes readable as the
visitor continues into that beat’s rest. Fallbacks are an ordinary flowing
page, so a viewport capture can contain adjoining beats.

All 56 original captures from the final matrix were opened, along with all
six final supplementary captures. Earlier contact sheets were navigation aids;
the final originals were also inspected individually. Scene poses and complete
beat text are reviewable without model/text clipping at their resting positions.

Known prototype polish limits: the short480 initial masthead’s right label
shares space with the top navigation row; the 720-high evidence rail label can
cross the instrument’s upper edge, without obscuring the “72 h / observed”
label. The fallback’s initial masthead sits close to the opening kicker and its
separator intersects the title’s upper whitespace. These are recorded for review; there is no claim of final-site polish,
real-device testing, hiring-manager comprehension testing or author acceptance.
The geometry deliberately explains relationships instead of depicting actual
Mosslink circuitry. No public debugging incident or whole-product ownership
is asserted. No publication, contact action or additional journey stop occurred.

## Local continuation and version history

Run `npm run dev` for local review, or `npm run start` after the successful build.
The diagnostic script starts and stops its own local production server on port
3100; the normal check command chooses a free port and stops its server.

The environment’s `.git` is an empty read-only placeholder, and normal Git
commands cannot discover a repository. The local source/context snapshot is
committed using `.prototype-git/` metadata instead. Inspect with:

```
git --git-dir=.prototype-git --work-tree=. log --oneline
git --git-dir=.prototype-git --work-tree=. status
```

No remote exists. The final matrix and supplementary review records, logs and all screenshots
are committed under
`docs/story/review/`; the original generated outputs also remain in ignored `checks/`.
`docs/story/review/provenance.json` records source/copy paths and SHA-256 hashes.
The final source and context snapshot commit includes the supplied starter
engine, because no existing Git history is available in the mounted placeholder.
The user’s requested stopping point is this local prototype review. Further
copy/appearance changes or real-device review remain future work, not an
unattended continuation.
