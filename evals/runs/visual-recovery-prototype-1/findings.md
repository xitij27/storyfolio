# Three-beat fixture prototype

11 October 2026. Manual implementation following the author's
[authorization](../../../docs/history/2026-10-11-visual-prototype-approval.md).
The new [source](../../../prototypes/fixture-study/README.md) is a separate
working prototype. The rejected row-card site, its frozen actor snapshots,
the originating portfolio and the shipped skill/engine are preserved.

The prototype is ready for the author's visual assessment after the local
checks below. It does not have that approval yet. No CLI actor or judge was
invoked, no matched skill experiment was performed and no full-site proof
or skill improvement is claimed.

## Design question and implementation

Can one apparatus explain how Ada connects firmware decisions to bench
observations? The [design record](../../../docs/superpowers/specs/2026-10-11-fixture-prototype.md)
grounds this in the same fictional source as the rejected build, with new
coordinator design choices. A read-only source review checked those choices
before implementation. A separate implementation collaborator authored the
geometry and faces, while the coordinator authored composition, transitions,
HTML, vector fallback, interactive explanation and integration.

The opening assembles a command console, generic board, fixture cradle and
observation instrument. The middle separates those same parts into the
supported command → board → fixture → observation relationship. Arrows
follow the pieces during travel. Four HTML buttons highlight the selected
part and explain its role; keyboard operation uses the same controls. The
closing reassembles the apparatus with the observation instrument enlarged.
Its longest-run and battery-projection regions remain distinct.

Bevels, clamps, screws, standoffs, knobs, case grips and different printed
surfaces establish a physical identity. They are explicitly illustrative.
They do not reconstruct actual hardware or establish circuit topology,
measured current, signal timing, a waveform or a successful incident fix.
The apparatus is a spatial explanation, not a functional hardware simulator.
The colleague's PCB/analogue ownership and Ada's firmware/fixture ownership
remain in HTML. The 72-hour longest run, two-year projection assumptions,
six bench-tested samples, forty assembled samples, zero customer units and
unfinished qualification remain explicit.

The custom Piece, face, formation and lazy-extra hooks suffice for this
visual prototype. One local integration adaptation was necessary: the
controls provider now wraps both scene and HTML, so the same store reaches
custom Pieces through React Three Fiber. The original provider only wrapped
the HTML. The shipped engine is unchanged. This is a concrete local finding,
not a tested new instruction or a general engine change.

## Local verification and corrections

- Root skill check and seventeen-person fixture check pass. All 246 root
  tests pass with Node 22.22.1 outside the workspace sandbox. An earlier
  sandbox run failed three Git/subprocess-dependent test files, matching
  the environment limitation already recorded in the handover.
- Prototype TypeScript and ESLint pass. The inherited local test command
  passed all fourteen test-file processes in the sandbox. Production builds
  also run the complete TypeScript check.
- The first local server required approval for local socket binding.
  Turbopack initially rejected the shared dependency symlink outside its
  detected root; the prototype config now resolves its repository root.
  Dependencies are reused from the existing local cache. No new package or
  external visual asset was downloaded. The root ignore list explicitly
  excludes the prototype's dependency symlink, since a directory-only
  `node_modules/` pattern does not ignore a symlink.
- [Initial production attempt](production-checks/manifest.json) failed when
  the sandbox blocked the CSS worker's local port. The approved
  [retry](production-checks-final/manifest.json) reused that failed cache.
  Moving only the generated build cache aside produced a successful build;
  the original cache remains recoverable beneath the ignored `.next/` tree.
- The fresh [seven-case production matrix](production-checks-clean/manifest.json)
  passed phone, reduced motion, no WebGL, no JavaScript and context loss.
  Wide and short views caught a late large shader in the lazy arrows. The
  arrows now use a simpler unlit material appropriate to an explanatory
  overlay. The [focused rerun](production-checks-arrows/manifest.json)
  passes both affected conditions, with zero late large shaders. This is a focused
  rerun, not a second complete stock matrix.

Source-bound captures, control checks and continuous-scroll frame
evidence are recorded separately by [capture.mjs](capture.mjs). Its output
records source hashes before and after, viewport, emulated input, motion
preference, scroll positions, errors and image hashes. Software Chromium
does not establish physical-phone performance. Functional passes do not
constitute visual approval.

The first [complete capture](evidence/final/manifest.json) passed all seven
functional conditions with an unchanged source digest and fifty images.
The [movement review](movement-review.md) nevertheless found a specific
transient defect: reverse scrolling overlaid two observation-face layouts.
All four pieces now retain fixed printing across beats, and the closing
emphasis comes from the observation instrument's size and placement.
The [revised capture](evidence/stable-print/manifest.json) passes the four
conditions that render the scene, including both movement directions,
phone controls, short height and reduced motion, with 38 captures and an
unchanged source digest. Only `content/faces.ts`
and its design record changed; the earlier three HTML fallback cases
remain applicable. Reviewing all 38 originals confirmed the text fix and
found a smaller issue in `desktop/movement-forward-02.jpg`: a faint arrow
crossed the observation display while the two linked parts overlapped.

The connector previously took the absolute distance between endpoints after
trimming their module edges. Overlapping parts could reverse those endpoints
and still produce a positive shaft length. It now preserves signed clearance,
hides each arrow until the available gap exceeds the arrowhead's length, and
fits both shaft and head inside that gap. This correction changes only
`content/extras/connections.tsx`. TypeScript, full ESLint and the fourteen
local test-file processes pass; the final production build succeeds.
The [final scene capture](evidence/clear-connectors/manifest.json) passes
all four repeated modes: desktop movement/controls, phone controls, short
view and reduced motion. Its 38 images were all opened individually across
the coordinator, movement and fallback reviews. The source digest stays
unchanged during capture. The final movement review finds both observed
defects resolved, with correct middle connections and selection behavior.
The unchanged HTML fallback cases retain their original capture evidence.

The [face predecessor archive](source-before-stable-print/README.md),
[connector predecessor archive](source-before-clear-connectors/README.md)
and unchanged current files reconstruct all 86 source entries of both prior
candidates. Their failed visual details and original captures are preserved,
not overwritten with the corrected result.

The [verification record](verification.json) checks that change scope,
preservation, source identity, local documentation links and capture results.
Its Git subprocess also needed approved execution outside the sandbox. The
first completed invocation found its own not-yet-created output link; the
verifier now treats that single self-output as generated by the command.
The [fallback review](fallback-review.md) distinguishes the initial stock
check's pre-loss images from the later three-beat post-loss captures.
The [composition review](visual-review.md) answers the recovery plan's
Backdrop, Depth, Swap, detail, spatial and phone/still criteria explicitly.
The staged whitespace check reports only trailing blank lines in copied
engine files and raw command logs. Those bytes are preserved; the same
check with `blank-at-eof` excluded passes.

## Visual observations and remaining gate

The first desktop review opened every image in `diagnostic-1/`. It found
substantial improvement over the prior text strips: recognizable apparatus,
inspectable surfaces, connected spatial explanation and the same object
developing across beginning, middle and ending. It also found the chapter
navigation touching the apparatus. Navigation now occupies a clear bottom
gutter. The first phone review opened every image in `diagnostic-phone-1/`.
It confirmed a live compact scene and led to a shorter middle heading, which
leaves more room for the relationship above the text.

Secondary face printing is small, especially on a phone. The large role
labels, geometry, connections, selected-part highlight and readable HTML
carry the explanation; the small printing is supplementary. The new vector
fallback depicts the same relationship rather than substituting an empty
text-only page. The original reference remains source and its supplied
preview image; this study does not claim a new live original-site comparison.

Author visual approval and actual physical-phone review remain pending.
Review all three beats, scroll both ways, try the four controls and compare
the work's specificity and visual quality with the rejected demo. Only the
author's assessment can advance the recovery plan to full-site expansion.

Stage 3's build activation, initial machine and sketch coverage, complete
wording-choice requirement, optional-skill branches, matched instruction
reruns, planning regression and non-sheet whole-site proof remain open.
The other Stage 1, privacy and packaging work is unchanged.

## Preview

The production preview uses `http://localhost:3012/`. Restart from
`prototypes/fixture-study/` with Node 22.18 or later:

```bash
npm run start -- --hostname 127.0.0.1 --port 3012
```

Use `npm ci` and `npm run build` first in a fresh checkout. This session
uses the already installed Node 22.22.1 and dependency cache documented in
the prototype README. Server lifetime depends on the local session.
