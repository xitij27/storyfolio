# Earlier handover history — superseded by handover.md

# Handover

## Request and stage
Build working local embedded-firmware portfolio from material. One scroll-driven story carried by tangible work-derived 3D object; no paper, sheets or card collection. Publishing remains user's decision. **Current stage: stop5, all nine beats / ten screens built in chosen Workbench look; awaiting opening/closing wording choice.** Three complete openings and three complete closings are in docs/story/wording.md and runnable /wording. Main previews A/A provisionally. Supporting project/CV/download/navigation/preview/icon/404 exist. Publishing excluded. Final user review still pending. Earlier sections below retain the historical audit trail.

## Reading
Read supplied CV, lab notes, asset notes, runtime-resource metadata and external-helper catalog. No private correspondence/contact exports/participant records present in listed material; none opened. No existing portfolio per lab notes. Original SVGs remain intact.

## Tool checks performed 2026-10-22
- `node --version`: v22.22.1, meets engine >=22.18.
- Native TypeScript actually executed via dynamic import of temporary .ts file containing `const answer: number = 42`; printed 42, temporary file removed.
- `git --version`: 2.53.0. `git status --short` failed: workspace is not an initialized Git repository; no Git history assumed.
- Authored neutral local HTTP page and browser probe in `.local-checks/neutral-check.mjs`. Imported available cached playwright-core from /tmp/storyfolio-build-capability-20261011/node_modules, not a project dependency installation.
- Full cached Chromium failed: first wrong executable path, corrected; crashpad configuration then restricted process-singleton socket. Writable XDG config/cache paths supplied; switched to cached Chromium headless shell.
- Headless shell successfully launched, opened loopback HTTP page, read title and heading (`Local setup check`), and saved `.local-checks/neutral.png`. Screenshot opened and visually inspected: neutral black text on white page. No portfolio appearance established.
- Browser executable: /tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell. LD_LIBRARY_PATH uses supplied browser libraries; XDG paths set to .local-checks/config and cache. No HOME variables changed.
- Only storyfolio appears under local .agents/skills and is advertised as enabled for this session. External catalog describes remote helpers as of 2026-10-12; none installed or enabled. No missing helper judged necessary; no installation attempted.
- Runtime metadata states external package downloads unavailable; engine lockfile/cache will need actual offline installation verification at concept build stage. No application seeded or inferred from supplied paths.

## Historical next step at stop1
Receive numbered factual answers and record each alongside facts before concept work. Unanswered claims remain unresolved. Then open references/concept.md and prepare three runnable local sketches for user's concept decision. Subsequent stops: storyboard approval, runnable spine/look choice, full chapters/wording choice, finish and actual user review. Retain local-only boundary.

# Continuation — 2026-10-22, stop 2

## User answers recorded
All corrections and constraints are appended in facts.md under "User confirmation". Those supersede initial source claims. Public employer/dates and unconfirmed facts omitted. Ada: firmware, power-state scheduling, fixture; colleague: PCB/analogue front end. Two years projected, longest run72h; six bench tested/forty assembled/no customers; preliminary emissions only; radio-awake observation has no confirmed cause/fix/timing/resolution. No photo or trace supplied. Approved teaching SVGs only explanatory. Email example link, downloadable printable corrected HTML CV requested. Dedicated Mosslink page, English navigation, preview/icon/404 requested. No publishing, downloads/purchases, extra skills, legal claims, forms/blog/testimonials/chat/translation.

## What exists
- Independent Next16 app scaffolded into site/ using supplied engine. `npm ci --offline --cache /tmp/storyfolio-npm-cache --no-audit --no-fund` actually succeeded:392 packages installed. No external download.
- Three real scroll-driven custom-geometry sketches: /sketch/fixture, /sketch/sensor, /sketch/harness, with index comparison at /. Three poses each: opening, middle, close. Source: site/content/sketches/concepts.tsx. Single provisional appearance shared by all three, not selected visual direction.
- Original geometry: eight five-socket fixture bars (forty sockets; six bright in middle), six thick simplified sensor segments/sample symbols, six probe connector heads. All labelled conceptual; no actual hardware/wiring/trace inferred.
- docs/story/concepts.md describes each question, five-chapter trade form, transformations, premises, requirements, tests and recommendation. Recommends fixture based on count visible without captions.
- site/README.md gives run commands and scope. No full portfolio pages or CV yet: they follow approved concept and storyboard.

## Checks and environment
- Node/nativeTS and neutral-browser checks recorded above were run in first turn; .local-checks artifacts no longer present on continuation. New durable artifacts use checks/concepts/.
- `npm test`:129 passed,0 failed. `npm run typecheck`:passed. Initial lint flagged ordinary internal anchors; changed to Next Link with prefetch=false following installed Next16 link docs; lint passed. Production build succeeded.
- First dev build triggered blocked tooling network requests (telemetry.nextjs.org, registry.npmjs.org); no asset/download authorized or obtained. Telemetry disabled through env. Use production build/start for inspection to avoid development update tooling.
- Loopback server from one exec session was unreachable from another execution context. Reliable probe starts server and browser in same shell/session; no need for user permission. Existing dev server session was stopped. Repeated server starts initially met Next's existing-dev lock; corrected by stopping that owned process.
- Production Chromium-headless-shell checks: all3 sketches at1440×1000 and390×844; one canvas each; no page errors or horizontal overflow.18 screenshots saved. Opening/middle/ending inspected via contact sheets. Visual inspection caught stretched socket textures; fixed radii for long bars, then rebuilt/rechecked. Fixture opening improved from aligned bars to nested frames so silhouette changes meaningfully into the sample-count rows.
- Focused fallback checks across3 sketches: noJS, forced noWebGL and reduced-motion; each retained one h1,3 body paragraphs,2 mail links, no horizontal overflow. No email sent or delivery tested. Reduced motion mode loaded scene; full stationary-pose comparison and phone performance are not claimed.
- Full engine `npm run check` final acceptance matrix not run at concept stage because it targets home-page story contract, which is now concept index. Final content/check contract and full acceptance remain for approved full site.
- Installed site AGENTS.md read; installed Next16 page/Link docs consulted. Workspace root is not a Git repository; no commit claimed.

## Pending user decision
Choose fixture, sensor or harness (or explicitly delegate choice). No choice inferred from "Carry on". Record choice in concepts.md and any delegated decision in decided-for-you.md. Then open storyboard reference and submit complete page script for approval before full build. Keep full build requirements above. Do not ask again about omitted facts or additional skills.

Final concept recheck: after nested-frame geometry change, production rebuilt successfully; lint passed again; all six viewport cases and nine fallback/motion cases rerun successfully. Final fixture opening/middle/ending desktop+phone contact sheet opened and inspected; sensor/harness unchanged from their inspected screenshots. Candidate decision also presented through async choice tool. User answer still pending at handoff.

# Continuation — stop3, storyboard ready

## User decision
User said: "Go with the concept you recommend from the alternatives you just showed. Record which one you chose and why, then work out the story and the rest of what the site needs." Reiterated no extra skills and local-only work. Recorded concept1 (bring-up fixture) selected before storyboard work in concepts.md and decided-for-you.md. Reason: six-of-forty evidence boundary visible without captions; chosen over the sensor's more verbal evidence banks and harness's less specific sequence.

## Deliverable
Read references/storyboard.md. Created docs/story/storyboard.md: five bring-up-checklist chapters; nine beats totaling ten viewport heights, explicitly proposed as a shorter-than-usual exception because only one project and limited verified evidence exist. No final captions written. Each beat defines pose, face content, extras, anchors, caption facts and what is visible without captions. End answer is decided: match claims to observation/assumptions; no inferred fix/full test coverage/endurance/qualification.

Storyboard includes first-viewport/30-second route, normal nav on all sizes, phone/reduced-motion/noWebGL/noJS behavior, two unselected fixture-material looks and local sans/monospace typography. Complete build/later/never inventory: own Mosslink page, corrected printable/downloadable standalone HTML CV, email link, English nav, preview/icon/404; legal/hosting/public domain later on publication decision; no excluded features or external assets. Facts-only source mapping F1–F11 references user's confirmation section. No source data fabricated to animate the fixture. Original two SVGs remain unchanged and are planned as labelled teaching explanations.

## Verification/scope
Manually reviewed plan against user confirmations. Removed unconfirmed environmental speciality from proposed project introduction rather than carry it forward from CV. Nine screen heights sum to ten; no look selected; no implementation changes in this turn. Browser tests from prior concept turn still apply only to those sketches, not to the proposed full story. Full acceptance remains at finish stage. No additional skills installed/enabled, no purchases/downloads and no publishing.

## Next required decision
User's yes to storyboard (or requested changes), including nine-beat/ten-screen exception. Skill explicitly requires storyboard approval before building. Do not infer approval from earlier generic "continue". Record actual answer before next action. After approval open references/building.md and engine/README.md; build runnable opening/middle/ending in two looks for next choice. All original site/CV/project requirements persist. Final words chosen later via three whole-beat alternatives; actual final user review still required.

## Stop3 approved —2026-10-22
User explicitly approved docs/story/storyboard.md and requested build. Approval recorded in storyboard.md before implementation. Proceed to stop4: runnable opening/sample-count middle/ending in both candidate looks. Build supporting project/CV/navigation/preview/icon/404 alongside that spine; remaining main-story chapters wait for look choice per building.md. No new skills or publishing.

# Stop4 — working spine and supporting pages

## Implemented
- Home `/` now contains approved spine beats `setup.scope` (1.25screens), `record.samples` (1.25), `handover.answer` (1), with eight fixture bars throughout. New fixture component has solid body, local socket rings and metal rims; no paper/cards or face lettering. Nested frames open into eight rows/five sockets each, exactly six filled centers, then return. Opening gathers gently as scroll advances. Looks in content/looks.ts: light Workbench and dark Instrument bench, chosen with URL or appearance switch; neither selected yet.
- CSS system sans/monospace, meaningful HTML caption text, focus/skip link, ordinary header/project/CV/email links and chapter anchors. Full-beat prose is provisional until later whole-beat wording choice. Look-study label makes three-of-nine scope clear. Static labelled SVG fallback remains for no scene.
- `/projects/mosslink`: contribution split, two unmodified explanatory SVGs, radio observation and its limits, sample/run/projection/preliminary qualification facts; no employer/dates or invented project.
- `/cv`: corrected printable HTML view. `/downloads/ada-mensah-cv.html`: genuine standalone HTML with embedded print CSS and attachment filename/content type. Both use confirmed shared profile content; no PDF offered. No external resources in download. Example mailto link only.
- Local1200×630 share-preview.png, SVG site icon, page-specific title/description/OG/Twitter metadata, loopback metadataBase and noindex/nofollow, useful404 with recovery links and real404 status. Metadata origin and social scraping/public URL remain publication-time tasks; no publication performed.
- Original concepts index archived at `/concepts`; individual sketches remain. Some archived sketches still link their "Compare concepts" to `/` (now working spine); harmless reference navigation, can correct in later implementation batch if useful.
- Asset ledger docs/story/assets.md records provenance, original copies/unchanged status, terms, derivative/original geometry purpose and alt descriptions. Source SVG bytes verified identical. site/README.md updated with scope and run commands.

## Checks actually run
- `npm test`:129 passed/0 failed. `npm run typecheck`:passed. `npm run lint`:passed with no warnings after documenting direct local SVG use. Earlier build surfaced obsolete starter links referring to removed copy; replaced unused link/extras exports with empty lists. Final production build through npm run check succeeded.
- **Fresh full spine matrix `npm run check -- --wait=1100 --out=../checks/spine-matrix`:13/13 passed.** It tests this three-beat contract, not the future nine beats. Both looks at1440×900,1280×720,390×844; reduced-motion stationary canvas; noWebGL; noJS; context loss; look switch/browser Back preserving location. All screenshot contact sheets opened/inspected, plus full-size representative phone/short/wide views. Counts visible and framing/legibility checked.
- First custom preview caught look switch covering top socket row; moved formation anchor down. Tightened Record/Handover headings to remove orphan words. Rebuilt before fresh matrix above. Actual ring geometry replaces blurry stretched ring artwork; count remains in HTML as well.
- Bidirectional transition probe in checks/spine/transitions.mjs: both looks,24 total forward/reverse intermediate captures. No script errors. All contact sheets inspected; no face text changes or unreadable mixed labels. Pieces pass through each other during explanatory assembly; not a physical mechanism simulation.
- Support probe checks/spine/support-check.mjs: project/CV/404 with and without JS at390×844; expected200/404; oneh1, no horizontal overflow/page errors; supplied SVGs load; page-specific OG titles; actual browser CV download with correct filename/HTML facts and no scripts/images/external URLs/employer/dates; correct attachment/content-type; keyboard skip works; icon/share/count/supplied assets return200. Final probe passed. An initial probe reporting failure used Node Response.status as a function; corrected probe only and reran; no app fault.
- Standalone downloaded HTML rendered under print media and browser PDF output written only under checks for internal inspection. `standalone-cv-print.png` opened; text clear and unclipped in print media. Browser generated PDF; no installed PDF raster tool available, so no separate PDF-page raster inspection claimed. User-facing CV remains HTML only.
- Preview image opened/inspected; project/CV/404 screen captures inspected. No email sent or delivery tested. No real-phone FPS or live-social-fetch claim. Contrast palettes remain proposed; no legal/accessibility-compliance claim.
- Browser reused supplied local cache/libs. No skills installed or external assets/packages downloaded. Existing workspace not a Git repository; no commit claimed.

## Next decision and continuation
Present two actual local look URLs (light Workbench and dark Instrument bench), recommend Workbench for legibility and fixture/material clarity. Wait for user choice or explicit delegated choice, record in decided-for-you.md/handover before implementing remaining six main-story beats. Reference building.md explicitly requires this stop; storyboard approval does not choose the look.

Then complete Command/Observe and Record/endurance/emissions, update story contract to nine beats/ten heights, retain all support routes. Show three whole opening and three whole closing wording alternatives, including fixed surrounding text, recommend one; wait for wording choice and use chosen words exactly. After final acceptance, obtain and record actual user review. No publishing.

Look choice presented through async UI: Workbench (recommended) or Instrument bench; URLs supplied. No answer yet at handoff. Explanation linked storyfolio SKILL.md's explicit look-choice stop. User-facing local production server started for preview; if session ends, restart with site/README.md production command. Rendering checks are complete for this spine; do not broaden/repeat until further changes justify it.

# Stop4 choice received —2026-10-22
User explicitly delegated choice of recommended look and requested remaining build plus important wording review. Chose Workbench, recorded before edits in decided-for-you.md. Proceed to nine-beat/ten-screen implementation, then show three whole opening beats and three whole closing beats including surrounding text. No additional skills or publishing.

# Stop5 — full chapters and wording review

## Implemented after delegated look choice
- Workbench chosen and recorded before remaining implementation. Home now has all9 approved beats /5 chapters /10 screen heights. `content/story.ts` is authoritative contract. Same8 fixture bars throughout: assembly, access rails, three teaching-state pairs with two supports, bring-up channel, open observation window,40/6 sample grid, two equal evidence banks, raised qualification bridge, assembly return.
- Sleep/Measure/Transmit moved to readable ordered HTML instead of tiny labels on socket faces; pairs carry order in3D. No time/current scale, actual trace, circuit or result invented. Source SVGs remain unchanged as project explanations/static fallbacks.
- Main labels now say local wording review, linking to `/wording`. Opening and closing remain A/A previews, explicitly not final selections.
- `content/wording.ts` stores three openings and three closings plus fixed text. `components/site/beat-words.tsx` renders the same whole beats on main and review pages. `/wording` has six complete options, fixed credit/evidence/actions/notes included; allows opening/closing selection independently or user-authored replacement. docs/story/wording.md records the complete exact texts.
- Recommend openingA and closingA for plain firmware definition, precise contribution, and physical-observation/estimate-versus-run ending. OptionsB/C vary emphasis without new facts. Their review is not authorization to choose.
- Existing project, printable/downloadable HTML CV, nav/preview/icon/404 retained. Project observation heading tightened to “The radio was awake.” so no duration is implied. Archived concept links now point back to /concepts.

## Checks so far in this turn
- Confirmed story count9/screen total10 programmatically.129 automated tests passed; typecheck passed. Lint initially flagged newly introduced root anchor tags; converted to Next Link with prefetch=false; lint then passed. Fresh builds succeeded.
- Initial nine-beat browser probe at1440×900,390×844,1280×720:9 beats, no page errors/horizontal overflow. Wording page with and withoutJS:6 options,1h1, no overflow.
- Exact whole-beat review probe: all6 option titles/bodies/fixed credit/evidence/notes and link labels present in rendered review, with and withoutJS; no errors/overflow; main A/A preview matches content source; employer/dates absent. Screenshots of all6 options opened/inspected.
- Forward/reverse probe:32 intermediate captures per viewport at desktop and phone,64 total, no page errors. Captures need visual review before handoff.
- First fresh full nine-beat matrix was intentionally interrupted during dark cases after visual review found raised qualification bar underneath appearance switch at short size. Increased that beat's framing span/rise and lowered its anchor. Restarted a fresh full matrix at checks/chapters-final-matrix; original checks/chapters-matrix is an incomplete audit, not accepted final evidence.
- Workbench secondary headings tightened to reduce orphan words. The raised bridge's framing correction is a representation change, not a factual or wording change.
- No additional skills, asset purchases/downloads, mail sending or publishing. System fonts and supplied cache reused.

## Pending before handoff
Finish new matrix, inspect its screenshots and transitions, record results here. Local review server may need restart after final build. User choice of opening and closing still pending; async questions contain /wording#openings and #closings links. User can mix versions or provide their own wording. Do not treat elapsed time/preselected options as an answer. After actual choice, record it and use selected full beats word for word; then final checks/user review (not publishing).

Additional visual finding: entry screenshot with WebGL disabled showed pre-existing overlay layout putting look controls over main navigation and the review label over h1. Added CSS scoped exclusively to `[data-scene="off"]`: remove top story padding and place review label in a normal separate row. This does not affect3D poses or enabled-scene layout. Current full matrix uses prior build; after it completes, rebuild and rerun the four affected fallback/context cases plus initial-entry screenshots. Record both scopes accurately; automatic passes alone do not establish visual acceptance.

Runtime note: the full nine-beat matrix process ended with SIGTERM/exit143 before completing (manifest incomplete, no failed case recorded); do not claim a successful full default run. Using scoped check batches to keep individual runs bounded. Light wide/short/phone/reduced cases passed after bridge framing correction, before a CSS-only static-fallback fix. Dark four-case batch started with fresh build. Five remaining fallback/context/look-switch cases will run with a fresh build after the dark batch, covering the changed fallback layout. All13 conditions may be covered across these batches, but this is not a completed single full default acceptance run. Final wording and actual user review remain pending regardless.

Added stable `id` attributes to every Beat wrapper so all nine approved beat anchors work independently of the five chapter anchors; existing data-beat contract and chapter headings remain unchanged.

Final visual review of look-switch captures revealed a temporary white-face flash at the last beat: the72-face paint queue filled opening/offscreen faces first after look remount, while the active closing faces used a white placeholder. Corrected engine placeholder to the look's surface colour and prioritized visible/target faces before offscreen faces. No story facts, shaders or formation values changed. Run focused look-switch/reduced-motion checks on fresh build after this correction; previous checks remain scoped evidence, not final acceptance.

Final wording handoff preparation:
- Workbench all9 beats built; pending choice only for opening/closing text, not for additional biography/skills/assets.
- Light four enabled-scene cases passed in chapters-final-matrix (manifest incomplete because process ended during next case); dark four enabled-scene cases passed4/4 in chapters-dark-check; five fallback/context/look-switch cases passed5/5 in chapters-fallback-check after fresh build and CSS fallback fix. All case screenshot contact sheets opened/inspected. Do not call this a completed single full default acceptance run.
- Entry fallback probe at390 and1440 asserts all9 stable beat IDs exist, each header link is the actual hit target at its center, and review label is above h1; passed. Initial screenshots opened: nav/title now clear.
-64 bidirectional intermediate captures opened/inspected. After bridge framing adjustment, additional16 captures across the two affected transitions at desktop/phone passed without page errors; inspect those final contact sheets before handoff.
- Whole-beat review page exact-text checks passed with/withoutJS; six complete beat screenshots opened. User can choose independently. Main A/A is a preview, not a selection. Async questions sent; no answer recorded yet.
- New engine face-paint fix has targeted checks running in chapters-paint-check (fresh build; light-reduced and look-switch). After these, no further broad reruns needed this turn without another issue/change. Final wording choice and actual user review remain outstanding.
- When removing the provisional review label after wording choice, preserve the static fallback's separate row/clearance below header and appearance controls; otherwise its phone h1 could overlap the look switch again. Keep approved factual limitations and ordinary nav.

## Stop5 check results at handoff
- Targeted post-paint correction fresh build: light-reduced and look-switch passed2/2 in chapters-paint-check. Opened all screenshot contact sheets; last-beat switch/Back now shows matte green faces immediately rather than white, while preserving reading position. Reduced-motion stationary checks passed for all9 beats.
- Latest129 automated tests passed; lint passed. Latest production build passed TypeScript. OpeningC sentence punctuation was simplified into clear sentences (same facts) before final review; source and wording.md updated together; exact whole-beat review probe rerun against fresh build and passed with/withoutJS. No wording selected.
- Final16 refined transition captures opened/inspected; raised bar clears controls and transitions return to intact assembly without word-on-face overlap. All earlier64 captures were inspected; only the two changed transitions needed repetition.
- Scoped browser coverage summary: four light enabled-scene cases passed, four dark enabled-scene cases passed, five fallback/context/look-switch cases passed, plus two focused paint/motion repeats passed. Complete default nine-beat run was interrupted, so do not report a single fresh13/13 run; final acceptance still waits for wording selection and actual user review. No unresolved script errors or known layout defects from inspected cases.
- No new facts, external skills/assets/packages, email sending, hosting, publishing or legal claims. Local-only boundary persists.

## Exact next step
Obtain explicit openingA/B/C and closingA/B/C choices (may differ), or user-supplied wording/delegation. Three full versions of each are in docs/story/wording.md and /wording using shared components. Recommend A/A. Current main page is only previewA/A. Record answer before editing settled copy; use selected full beats word for word. Then remove provisional wording label while preserving no-scene header/control clearance, run appropriate final acceptance, present full local site and record actual user review. Publishing remains outside task.

Latest local production server restarted from fresh build for review. OpeningC complete screenshot re-opened after sentence-clarity adjustment; full beat remains readable. All requested main-story implementation is present; opening/closing final wording, removal of provisional review UI with fallback clearance preserved, final acceptance scope and actual user review remain the continuation tasks. Do not repeat factual or skill-install questions. No user wording answer received at handoff.
