# Local prototype handover

## Authorization and factual boundary

The user asked: “Use Storyfolio and the supplied approved facts and
storyboard to build a local, five-beat prototype.” They explicitly allowed
work beyond the skill's planning-only endpoint for this evaluation, delegated
composition/implementation, requested one appearance and stopped scope at a
reviewable diagnostic. Nothing authorizes publication or another autonomous
turn. The fictional approval in `confirmations.md` establishes meanings and
facts, not approval of this new appearance. No real person or repository
author has reviewed the output.

Read `facts.md`, `confirmations.md`, `storyboard.md`, `assets.md` and
`decided-for-you.md`. Ada Mensah and Mosslink are fictional. No new employer,
dates, currents, interval, capacity, incident, firmware topology, field test,
customer outcome, original trace or qualification report has been invented.

## Implementation

All five stable beat IDs are implemented in the supplied engine's `Beat`
components: question, scheduling, bench, evidence, scope. One h1 and four
h2s accompany complete server-rendered explanations. The required focus-only
`#story-skip` anchor points to `#chapter-scope`. Five ordinary chapter anchors
support pointer and keyboard navigation.

Six custom 3D pieces form an illustrative apparatus: a fixture chassis with
feet, a generic board with contacts, two command/observation consoles and
separate projection/observed-run instruments. Canvas faces show the teaching
loop, authorship labels, evidence distinctions and scope. Lazy guarded extras
show relationship leads. They do not depict actual wiring. No external assets,
fonts, optional skills, contact action or publishing were used. Supplied SVGs
are retained unchanged; new illustration provenance is in `assets.md`.

`content/` owns story, copy, appearance, poses, faces and geometry.
`app/page.tsx` owns the accessible beat prose; `app/globals.css` adjusts layout
for desktop, phone and short height. Reduced motion cuts between still poses;
no WebGL, no JavaScript or context loss leaves the full HTML account.

Small engine changes: optional printed face aspect ratios and anisotropic
texture filtering; discrete label replacement instead of text crossfade;
optional synchronized travel (`stagger: 0` for this bundle). Defaults for
other stories remain staggered. The caption fade is disabled here. A geometry
regression checks panel clearance through adjacent transitions. The check
runner accepts optional bounded parallel execution, defaulting to sequential.
No inherited browser assertions were removed.

## Commands and actual results

- `npm ci`: attempted; registry network access blocked. `npm ci --offline`
  succeeded from the available cache, installed 392 packages and reported
  zero vulnerabilities. `npm run browsers` succeeded with available Chromium.
- `npm test`: final run passed 130 tests, zero failures. Logs:
  `checks/unit-tests-final.txt`. The added regression samples 21 synchronized
  positions per adjacent transition and verifies printed panel clearances.
- `npm run typecheck` and `npm run lint`: final runs passed.
- `npm run check -- --wait=1000 --concurrency=3`: fresh production build and
  **7/7 complete matrix cases passed** in
  `checks/2026-10-11T23-44-04-802Z/`. Desktop 1440×900, short 1280×720,
  phone 390×844, reduced motion, no WebGL, no JavaScript and context loss.
  Manifest copied to `review/production-manifest.json`.
- `node scripts/review-prototype.mjs checks/prototype-review-synchronized`:
  passed, zero page errors or horizontal overflow. Both scroll directions at
  each transition midpoint, all five beats at 1280×480 and reduced-motion
  phone captures. Skip link received visible keyboard focus and Enter reached
  the final chapter; all five chapter links worked with click and Enter.
  Report copied to `review/supplemental-report.json`.
- Original screenshot captures were opened, not treated as automatically
  accepted because the test passed. Review found label minification and
  staggered occlusion; the implementation was revised and freshly rebuilt.
  Source panels no longer crossfade lettering. See visual notes below.
- Earlier sequential checks in the 23:37, 23:39 and 23:40 directories ended
  with exit 143 before completing. They are not acceptance runs. The 23:42
  full parallel matrix passed, but preceded the synchronized-travel revision.
  Dev-server diagnostic commands could not connect across the isolated command
  environments; supplemental scripts instead start a server and browser in
  the same command. One supplemental attempt started during a build and
  failed readiness. Final successful reports supersede those attempts.
- Installed Next 16 layout/page guide was consulted. `next dev` added its
  standard local agent-rules block to AGENTS.md.

## Visual review and limits

All five beats are reviewable in normal desktop, phone and short-height
captures. Phone retains the 3D object above the prose; scheduling and evidence
panels enlarge on their respective beats. Full explanations remain readable
in no-JS/no-WebGL/context-loss captures. The scope panel bounds the answer
instead of implying whole-device ownership. No physical phone or real-device
performance was tested. Small secondary labels are still small on a phone;
the complete HTML explains them. Some lazy leads are absent in boundary and
reverse midpoint captures and arrive in settled captures; the core apparatus
and arrow/loop panels remain present. This is a remaining refinement for
review, not a claim of seamless finished behavior.

The parallel reduced-motion matrix reported stillness, but some of its
mid/end screenshots lacked visible geometry. A focused independent desktop
scheduling capture (`checks/reduced-diagnostic/`) showed the apparatus at
start, middle and end with unchanged canvas bounds. A sequential reduced
matrix diagnostic is recorded separately below. Automated stillness alone
is insufficient to establish visual acceptance for those empty captures.

## Repository / stopping point

No publication, real-person approval, six-stop completion or physical-phone
review is claimed. The local prototype is the requested stopping point.
Run `NEXT_TELEMETRY_DISABLED=1 npm run dev` from this folder to inspect it.

A commit could not be made: the supplied `.git/` is an empty read-only
placeholder, and `git status --short` returns “not a git repository.” No Git
metadata was replaced. Source, decisions, provenance, manifests and check
artifacts are retained locally in this project for continuation by a human.
