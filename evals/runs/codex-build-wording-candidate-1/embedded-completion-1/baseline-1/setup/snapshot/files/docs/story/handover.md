# Stop 4: local spine for appearance review

## Person's words and current gate

On 11 October 2026 the user said yes to the derivative `storyboard.md` and
fictional `confirmations.md`, explicitly authorized building beyond the
Storyfolio skill's planning-only ending, and asked: “First build the spine:
the opening, a representative middle chapter and the ending, in two or
three looks for the same approved object. Let me scroll the working result
and choose a look before completing the rest.” Everything stays local.

No concept selection was restarted. The selected State by state object is
six matte narrative row cards. These are neither six firmware states nor
six physical boards. The skill was read; the user's explicit continuation
supersedes its planning-only ending. No look choice or later copy approval
has been fabricated.

## Implemented

The plain starter has been replaced with three stable spine beats:
`scope.opening`, `transition.diagram`, `review.close`. Original chapter
numbers 1, 4 and 6 remain visible. Six persistent rows gain shallow depth,
separate into three labelled teaching-loop pairs, then reassemble. All
three looks use the same geometry, words and scroll progression.

Bench paper is the default (`?look=light` or no query). Instrument paper
uses `?look=dark`; Review sheet uses `?look=review`. The switch preserves
scroll, fragment and other query parameters. The palette lives in
`content/looks.ts`; formations and face drawings live beside it.

Server-rendered English text contains the approved opening definition,
Ada's contribution, diagram limits and closing answer with projection,
72-hour run and unfinished qualification limits. The two local explanatory
SVGs are shown and linked, with their recorded alternative text. Email and
downloadable corrected HTML CV are available in the header, opening and
close. A local missing-page view has Home and Email Ada links.

Static modes use readable single-column text and large diagrams. At
767 CSS pixels or less, and with reduced motion at every width, the dynamic
scene never mounts. No JavaScript, no WebGL or renderer failure keeps the
spine text, diagrams and links. The current spine has three beats; the
complete seven-beat static contract becomes applicable when stop 5 is built.

Engine changes are limited to the static-mode gate, optional bounded face
aspect ratios for legible wide row textures, and explicit check-matrix
static-mode declarations. Optional starter extras and piece-overlay links
are not used by this spine. Existing engine defaults remain for other
bundles. System sans-serif and monospace fonts require no external service.

## Environment and validation

Actual inspection found a supplied Next.js 16.3.8 starter and locked
packages, not a prior user portfolio. Node is v22.22.1. `npm ci` hit a
blocked registry request; `npm ci --offline` successfully installed all
392 locked packages from the available cache. This is not a fresh advisory
review. `PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache npm run
browsers` passed. Browser runtime libraries were supplied locally via
`LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu`.

Read the installed Next.js 16 documentation for dynamic client loading,
metadata, missing routes and Link. The share SVG remains a local source
asset: social-platform acceptance of SVG previews has not been tested.
Metadata currently resolves against localhost; an actual publication URL
and legal details are prepublication work.

`npm test`: 131 tests passed. `npm run typecheck` and `npm run lint`: passed.
The final fresh production browser run is under
`checks/2026-10-11T01-55-22-591Z/`; all 18 browser cases passed after a fresh build using `--jobs=3 --wait=1000`.
Visual review is recorded in `review.md`, and compact results are committed
in `check-results.json`. Earlier interrupted runs are diagnostic only.
Screenshot review corrected stretched/blurred row lettering, static
header overlap and the shorter-desktop appearance-switch position.

`scripts/check-spine.mjs` additionally checks actual scene chunk requests,
static phone/reduced modes, desktop deep-link and chapter-navigation state,
keyboard reachability, email/CV attributes, all supplied assets and the
missing-route response and links. It writes its results and extra screenshots
under the final run's `supplemental/` folder.

## Local use and repository history

Run `NEXT_TELEMETRY_DISABLED=1 npm run dev` from this project and open the
printed local address. Scroll each appearance before choosing one. No site
has been published and no email has been sent.

This sandbox exposes an empty read-only `.git` placeholder, so ordinary
git cannot create repository history there. Local history is stored in
`.storyfolio-git/` inside this project instead. Use
`git --git-dir=.storyfolio-git --work-tree=. status` (and the same prefix for
log/diff/commit). It is ignored as a working-tree path. Only known project
sources and story records are included; injected credential placeholders,
dependencies, builds and screenshots are excluded.

## Next

Wait for the person's scroll-based choice among Bench paper, Instrument
paper and Review sheet. Then implement Responsibilities, State and both
Observation beats from the approved storyboard, preserving all seven IDs,
six chapter anchors and eleven exact confirmed sentences. Offer opening
and closing surrounding-copy choices at stop 5. Do not infer those choices
from approval of the storyboard or facts. Finish checks only after that
review. Automated Chromium checks and fictional confirmations are not
real-phone performance evidence or a real repository author's review.
