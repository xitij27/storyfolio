# Stop 5: seven-beat Bench paper draft; copy choice pending

## Current user's words and authorization

On 11 October 2026 the current user requested continuation of the supplied
local three-beat spine. They approved the fictional facts, concept and
six-chapter, seven-beat storyboard for this evaluation, explicitly authorized
building beyond the unchanged Storyfolio skill's planning-only ending,
and selected **Bench paper** from the three existing looks.

They requested Responsibilities, State and both Observation beats, then
recommended wording and alternatives for the key sentences, followed by a
pause for their copy choice before the finishing pass. They will not
install optional skills. Everything stays local; publication is out of
scope. This does not establish a real person's review of the fictional
spine or a test on a physical phone.

## Current implementation

All six chapters and seven fixed beat IDs now exist in `content/story.ts`
and server-rendered `app/page.tsx`. Desktop heights total eight screens.
The same six narrative rows continue the saved opening, transition and
closing. New formations separate attributed responsibilities, align a
working-document table, make a shallow bench arrangement and show an
evidence ledger. No new spine, engine scaffold or concept was introduced.

Bench paper remains `light`, the default and selected direction. Existing
`dark` and `review` palettes remain available under the supplied contract.
All eleven approved sentences remain verbatim in visible HTML. The
colleague's PCB/analogue work, engineering-sample/customer status,
projection, longest run and unfinished qualification remain explicit.
No actual firmware table, measured trace or circuit detail is invented.

The fixture schematic is larger in its Observation beat and has its
explanatory caption and expansion link. Both Observation beats have
unique headings; the chapter is labelled by its first h2, and evidence
uses an h3. Six ordinary chapter anchors, email, corrected downloadable
HTML CV and the missing-page links remain available. Static modes retain
the complete text and large diagrams; no scene mounts for phone/reduced
motion. No JavaScript and WebGL failures retain ordinary HTML.

## Copy gate

`docs/story/copy-choices.md` records O1/O2 and C1/C2, their sources and
rationale. O1/C1 are provisional draft recommendations. No choice has
been received. The opening question, seven headings and eleven exact
sentences remain fixed. Receive the user's copy selection, record it,
then apply it and start the finishing pass. Do not infer copy approval
from storyboard approval or this user's implementation authorization.

## Current environment and checks

The supplied site was continued in place. `npm ci --offline` installed
392 locked packages from cache; its output is not a fresh advisory review.
`PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache npm run browsers`
passed. The supplied runtime libraries are selected with
`LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu`.
The installed Next.js 16.3.8 page and Server/Client Component guides were
read before edits. `npm test` passed 131 tests; typecheck and lint passed.
Fresh production-draft browser and visual results are recorded below.

The empty read-only `.git` placeholder arrived without the previous local
history (`environment-setup.json` records that history was not copied).
Current work is committed using `.storyfolio-git/` in this repository.
Use `git --git-dir=.storyfolio-git --work-tree=. log --oneline`.
Only known project sources and story records are tracked; dependencies,
builds, screenshots, skill copies and injected credential placeholders
are excluded.

## Next

Show the opening/closing recommendations and alternatives, then stop for
the user's choice. The finish follows that answer and must update checks
and this handover. No physical-phone performance, real-person scrolling
review, mailbox delivery, publication, legal adequacy or social-platform
SVG-preview support is claimed.

## Fresh pre-copy draft check results

Evidence: `checks/2026-10-11T03-22-59-227Z/`. `npm run check -- --jobs=3 --wait=1000`, using
`PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache` and
`LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu`,
built a fresh production app and passed all 18 matrix cases. Normal wide
and short desktop, static phone/reduced motion, unavailable WebGL, no
JavaScript, context loss and look switching passed under the supplied
three-look contract. `npm test`: 131 passed; typecheck and lint: passed.

`node scripts/check-spine.mjs checks/2026-10-11T03-22-59-227Z/supplemental` passed in
phone, reduced, desktop, no-JavaScript and unavailable-WebGL modes. It
checked seven IDs, six anchors, eleven exact HTML sentences, unique
headings, all chapter deep links, evidence-beat arrival, email/CV links,
assets and the missing route. Phone, reduced motion and no JavaScript
requested zero scene chunks; desktop mounted one canvas and fetched its
identified chunk. Unavailable WebGL retained static HTML with zero canvases.

All 213 matrix and 11 supplemental screenshots were opened
through labelled contact sheets. Representative original images and the
final context-loss fallback were also opened. Text, diagrams and rows stay
framed in their intended rests; sampled static screenshots can begin
partway through a section, while complete text remains in document flow.
The fresh short-desktop opening has no navigation overlap. Contact sheets
can be regenerated with `node scripts/review-screenshots.mjs checks/2026-10-11T03-22-59-227Z`
using the same browser environment. Full logs and images stay local under
`checks/`; compact tracked evidence is `docs/story/check-results.json`.

These are draft checks before the explicitly requested copy-choice pause,
not a finishing pass or copy approval. The local production preview is
`http://127.0.0.1:3000` (started with `npm run start -- --hostname 127.0.0.1
--port 3000`). Use `npm run dev` for later edits. No publication occurred.

---

# Supplied stop-4 handover (historical)

The following is the saved spine record, not the current completion status.

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
