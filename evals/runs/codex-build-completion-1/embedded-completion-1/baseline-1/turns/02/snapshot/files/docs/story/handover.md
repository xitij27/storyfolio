# Local build handover

## Status and the user's decisions

The supplied six-chapter, seven-beat State by state portfolio is complete
in Bench paper. It continues the saved Scope, Transition and Review spine;
Responsibilities, State and both Observation beats are implemented. It
uses the supplied engine and the same six narrative row cards throughout.

On 11 October 2026 the current user approved the supplied fictional facts,
concept and storyboard for this evaluation, authorized continuation beyond
the unchanged Storyfolio skill's planning-only ending, and selected Bench
paper. They then said: “Use the first recommended wording you showed for
each of those sentences. Complete the finishing pass and checks, then give
me the working local site and a handover with any remaining limitations.”

Opening O1 and closing C1 are selected and appear verbatim:

- “On Mosslink, an environmental sensor, my work spans firmware,
  power-state scheduling and the bring-up fixture.”
- “Read the firmware contribution alongside the bench evidence and its
  limits.”

Their recorded copy selection is in `copy-choices.md`. These strings already
matched the provisional page, so no substitution was necessary. All seven
fixed headings and eleven exact core sentences remain in visible HTML.

**Actual final review is pending.** The user explicitly said their reply
was not confirmation that they had scrolled the finished site on a phone
and requested that this review remain pending. Automated Chromium checks
and this agent's screenshot inspection do not constitute that review or a
physical-phone performance test. Do not describe the site as user-reviewed
or physically phone-tested.

No optional skills were installed. No site was published, no external
message was sent, and no publishing action is authorized by this task.

## Run the working site locally

Start the production site at `http://127.0.0.1:3000`, with Bench paper
selected by default, from your own local terminal in this folder:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1 --port 3000
```

The finishing checks create a production build. After future source edits,
run `npm run build` before `npm run start`. For editing and automatic reload:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run dev
```

Use the address printed by Next.js if port 3000 is already occupied.
Tool-launched servers are scoped to the execution environment: a server
reported Ready on port 3000 here, but a separate command could not connect
to that loopback port. Do not rely on that session persisting or being
reachable outside its environment. Run the command above in your own
terminal for actual review. The production checks start and verify their
own local server within the same execution environment.
Instrument paper remains available at `?look=dark`, Review sheet at
`?look=review`, and Bench paper at `?look=light` or no query. The supplied
appearance switch preserves the fragment, other queries and scroll.

## Implementation and content contract

`content/story.ts` defines six chapters and these seven stable beat IDs:
`scope.opening`, `responsibilities.split`, `state.table`,
`transition.diagram`, `observation.fixture`, `observation.evidence`,
`review.close`. Desktop heights total eight screens; static modes follow
content height. No new concept, spine or engine scaffold was introduced.

`content/formations.ts` and `content/faces.ts` carry the six rows from the
opening table into attributed responsibility groups, working-document rows,
the supplied teaching loop, a shallow bench view and an evidence ledger,
then back into the table. These pieces are narrative rows, not six actual
firmware states or sample boards. The State rows explicitly say actual
firmware entries are not shown; no measured trace, timing or circuit detail
has been invented. Color is supplemented by written labels.

`content/copy.ts` and server-rendered `app/page.tsx` contain the full story.
The colleague's PCB/analogue contribution stays distinct from Ada's
firmware, scheduling and fixture work. Assembly, bench testing, customer
status, two-year projection, 72-hour run and unfinished qualification stay
explicit. The run does not validate the projection. Contact links and the
corrected downloadable HTML CV appear in the header, opening and close.
The two local SVGs have the recorded alternative text, visible explanatory
limits and ordinary expansion links. The missing-address page returns 404
and offers Home and Email Ada.

One h1 and six reachable chapter anchors remain. Each beat has a direct anchor matching its stable beat ID. The second
Observation beat has a unique h3 heading and can be reached at
`#observation.evidence`; the first Observation h2 labels the chapter.
At 767 CSS pixels or less, and with reduced motion at every width, the
scene never mounts or downloads its scene-only chunk. No JavaScript,
unavailable WebGL and renderer failure retain the seven-beat HTML,
diagrams, navigation, contact and CV. Normal desktop retains the scene.

## Check environment

Node v22.22.1 and Next.js 16.3.8 are supplied. Locked dependencies were
installed with `npm ci --offline` (392 packages) in this continuation.
This cached output is not a fresh advisory review. Chromium installation
passed with `PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache npm run
browsers`. The supplied browser runtime libraries require:

```bash
export PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache
export LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu
```

Read the installed Next.js page and Server/Client Component guides before
implementation; no unfamiliar Next.js API was introduced in the finish.

## Remaining limitations and future review

- The actual user's final scrolling review and physical-phone performance
  review are pending. Headless software rendering supplies neither.
- Ada, Mosslink and their facts are fictional evaluation content. The
  approved core sentences are not real-world measurements or testimony.
- The drawings are explanatory SVGs, not photographs, private circuitry,
  measured traces, actual firmware topology or qualification records.
- `ada@example.com` is the approved example-domain contact. Link behavior
  is checked; mailbox delivery is not. The CV is HTML, not a PDF.
- The share card remains the supplied SVG. Social-platform acceptance is
  untested. Metadata resolves to localhost; a real publication URL, hosting
  jurisdiction and legal details would be future prepublication decisions.
- Publishing is outside this task. No hosting, deployment, legal-compliance
  or external preview validation is claimed.

## Repository and source records

Facts, confirmations, storyboard, assets and decision records remain in
`docs/story/`. The pre-copy records are preserved as
`chapter-build-handover.md`, `chapter-build-review.md` and
`chapter-build-check-results.json`. The historical spine review/results are
`spine-review.md` and `spine-check-results.json`; they are inherited work.
`environment-setup.json` describes coordinator preparation, not agent tests.

The supplied `.git` placeholder is empty and read-only; prior history was
not copied. Local history is stored in `.storyfolio-git/`:

```bash
git --git-dir=.storyfolio-git --work-tree=. log --oneline
git --git-dir=.storyfolio-git --work-tree=. status --short --untracked-files=no
```

Known project sources and story records are committed. Dependencies,
builds, screenshots, skill copies and injected credential placeholders are
excluded. Logs/screenshots stay local under `checks/`; compact results are
tracked in `check-results.json`. The only remaining user gate is their
actual final review; no copy choice or technical task remains after the
successful finishing checks recorded below.

## Final automated checks and agent visual inspection

Final fresh production evidence: `checks/2026-10-11T03-34-34-670Z/`.

| Check | Result |
|---|---|
| `npm test` | 131 passed, 0 failed |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed |
| `npm run check -- --jobs=3 --wait=1000` | Fresh build and production server; 18/18 full-matrix cases passed |
| `node scripts/check-spine.mjs checks/2026-10-11T03-34-34-670Z/supplemental` | All five modes passed, including Tab traversal/focus and direct evidence arrival |
| Agent visual inspection | All 213 matrix and 16 supplemental screenshots opened; representative originals inspected |

Browser commands use the cache/library variables recorded above. The matrix
covers all three looks, wide/short desktop, static phone, reduced motion,
unavailable WebGL, no JavaScript, context loss and appearance switching.
The supplemental checks cover selected O1/C1 wording, eleven exact factual
sentences, seven IDs/headings, six chapter anchors, language/title, keyboard
reachability and visible focus, chapter deep links, direct second Observation
arrival, contact/CV attributes, all assets and missing-route behavior.

Phone, reduced motion and no-JavaScript modes requested zero identified
scene chunks and mounted zero canvases. Normal desktop mounted one canvas;
the direct evidence anchor settled with Observation active. Unavailable
WebGL retained static HTML. Normal desktop rows and text stay framed;
static illustrations and text remain readable in ordinary document flow.
Some sampled static screenshots start partway through a section; scrolling
still reaches the complete content. No new visual correction was needed
following the direct-anchor fix.

Use `node scripts/review-screenshots.mjs checks/2026-10-11T03-34-34-670Z` with the same
browser variables to regenerate contact sheets. Logs and screenshots remain
local under `checks/`; compact results are `docs/story/check-results.json`.
The earlier heading-anchor supplemental failure is diagnostic evidence;
this fresh corrected run supplies final technical verification.

**Implementation and finishing checks are complete. Actual user final
scrolling review and physical-phone performance review remain pending.**
Nothing was published. No optional skill or external service is required
to run the supplied local build.
