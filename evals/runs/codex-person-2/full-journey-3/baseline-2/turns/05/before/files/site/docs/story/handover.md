# Handover

## Current state — 2026-10-23, stop 4 ready for look choice

Dawit explicitly delegated the concept choice: “Go with the concept you recommend from the alternatives you just showed. Record which one you chose and why, then work out the story and the rest of what the site needs.” Selected **The live path (`paths`)**, recorded in concepts.md and decided-for-you.md, because its split writes, two databases, checksum links and visible return route most clearly explain cutover. No additional skills; keep everything local, reaffirmed.

Read references/storyboard.md and asking.md. Created docs/story/storyboard.md: seven chapters, sixteen beats, 17.5 screens; complete chapter scenes/transitions, factual ingredients (no final captions), all six work pages, Lumen boundary, CV plan, navigation, phone/reduced-motion/no-WebGL/no-JS behaviour, three provisional looks, fonts, metadata/share/icon/404, exclusions, deferred hosting/legal and validation plan. Counts verified against the beat table. Facts include user's corrections; do not revert to unqualified resume claims.

**Storyboard approval received:** “Yes to the storyboard in docs/story/storyboard.md. Please build it.” User reaffirms no additional skills and excludes publishing. Approval recorded before implementation. Read building.md, engine README and site/AGENTS.md. Built the opening/library origin, orders-database middle and contact ending in Night operations, Day inspection and Warm console. No look selected. Recommendation: Night operations for clear separation of forward and fallback routes. Next decision: user look choice, before remaining chapters. No final-site completion claim.

The following sections are historical records of earlier stops; current state above governs.

## State

Stop 1: read. Awaiting factual answers; no design, concept, storyboard or portfolio build yet. User requests planning and a working local scroll-driven 3D story, with decisions guided. User explicitly reserves publishing.

Read all four material files after listing names. No private correspondence or participant files appeared in that list. Facts, ambiguities and missing context recorded in facts.md. First questions will be numbered in the conversation. Record answers beside relevant facts before moving to stop 2; unanswered items remain unresolved.

## Setup verified 2026-10-23

- Node v22.22.1 satisfies engine requirement >=22.18. Actually imported engine/lib/story/rand.ts using native Node TypeScript; import passed. Node printed module-type warning, no import failure.
- Git 2.53.0 available.
- Enabled session skill catalog lists storyfolio only. Local .agents metadata contains its references, scaffold and engine; no extra enabled skill was inferred from other folders. No additional skill recommendation needed at this stage.
- No browser connector advertised in available tools. Inspected available cached Chromium executables directly.
- Full Chromium failed to create default profile, then failed crashpad initialization with explicit profile. Headless shell succeeded with explicit local profile and LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu.
- Executable: /tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell. Flags --no-sandbox --disable-gpu --user-data-dir=<workspace>/checks/setup/shell-profile --screenshot=<workspace>/checks/setup/neutral.png --dump-dom file://<workspace>/checks/setup/neutral.html.
- Opened neutral local HTML in browser, verified DOM output, captured screenshot and actually inspected it with view_image: heading and paragraph readable with no overlap. Browser emitted DBus/udev/network-monitor warnings but exited 0. This establishes basic local browser capability, not WebGL or performance acceptance.
- No dependencies installed or site scaffolded. Build phase must follow applicable engine AGENTS.md when copying engine.

## Next

Get first factual answers, record them, read references/concept.md, then prepare three runnable concepts. Follow the remaining skill stops; do not infer approval from silence. Keep everything local.

## Stop 2 update

First answers were received and recorded in facts.md before concept work. User confirms P, permits original labelled illustrations and forbids any internal diagrams, downloaded images/slides, testimonials, additional skills or publication. Audience: migration engineering leaders and conference organisers. Requested six brief work accounts opening more on click, downloadable printable HTML CV, normal navigation, English, icon, share preview, useful 404; no blog/chat/forms/translation. Contact is intentional example email, link only. Old site can go. Unconfirmed facts must be omitted.

Three concepts are documented in concepts.md, with chapter candidates, rejected alternatives, transitions, working projects, source basis and tests. No concept has been picked. Recommendation: The live path for visible dual writes/checksum links/rollback loop. Concept choice pending; next read storyboard reference and write full script only after recording choice.

### Local implementation

- site/ contains independent scaffold and npm-ci installed dependencies. Read site/AGENTS.md (including Next's generated additions) for further work.
- Read installed Next 16 page documentation before editing routes. Three routes use the existing async sketch registry: /sketch/paths, /sketch/bench, /sketch/logs. / compares them.
- Each is an actual 3D Canvas with scroll-driven original geometry, HTML opening/middle/ending, email and expandable approach. Desktop and phone layouts differ. Original library restore and logger opening geometry grows into the project model; ending retains the whole system. All geometry labelled illustration.
- These are concept samples, not a completed portfolio. Remaining chapters, all six work accounts, CV, icon, share image and custom 404 follow storyboard approval.
- Production build, TypeScript, lint passed. 130 unit tests passed. Browser script scripts/check-concepts.mjs checks three routes at 1440×960 and 390×844, captures opening/middle/ending, tests details opening, overflow, canvas and page errors. Six initial cases passed; screenshots under site/checks/concepts. Final screenshots are regenerated after opening/marker refinements.
- Next dev automatic version fetch was blocked by sandbox registry policy. Use production mode for review: `cd site`, `NEXT_TELEMETRY_DISABLED=1 npm run build`, `NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1`. Open http://127.0.0.1:3000. Server process started inside a tool sandbox is not guaranteed to be reachable/persist in another invocation; user can start it locally with these commands. Never claim an inaccessible preview is permanently running.
- Git executable exists but provided .git is a nonfunctional stub (“not a git repository”). No commit made; do not initialize over supplied metadata merely to force a commit.

### Final concept verification

Final production build passed after origin-geometry and runbook-marker refinement. All six browser cases passed again: canvas present, approach opens, no horizontal overflow, no page errors. Captured 18 screenshots (opening/middle/ending × three concepts × desktop/phone). Actually opened and inspected all 18 through three labelled contact sheets, plus full-size path phone middle and all three desktop middles. No text/geometry overlap seen; phone scene remains below copy. Phone absolute-page-end capture naturally has contact heading above viewport; Contact anchor reaches the full contact beat. No phone performance claim from headless software rendering.

Comparison sheets: site/checks/concepts/paths-review.jpg, bench-review.jpg, logs-review.jpg. Production build/typecheck, lint and 130 unit tests passed. No full final-site acceptance or completion claimed. Next decision: Dawit chooses paths, bench or logs (or authorizes selection); then record it before storyboard work.


## Stop 4 implementation and verification

- Root `/` is now a real engine-powered spine, four beats: opening.hello (1 screen), opening.library (1.25), database.cutover (3), contact.complete (1). Approved full storyboard remains sixteen beats; these four are the appearance comparison subset. Opening and closing wording is provisional, to be offered as three whole-beat versions at stop 5.
- Content contract, formations, look definitions, custom persistent ReturnPath piece, no placeholder faces, lazy library/database/complete extras all replaced. Extras use useExtraFrame and chapterPresence. Shared return path persists through scenes. Scroll controls replication → dual write → comparison → reads → writes, with old-target fallback retained. Five real HTML buttons can set stage; Follow scroll restores scroll control. Reduced motion quantizes poses, no idle animation. Contact always uses complete system regardless of earlier control selection.
- Three look IDs: dark=Night operations, light=Day inspection, warm=Warm console. On-page switch preserves scroll/query/hash via existing engine. Local URLs `/?look=dark`, `/?look=light`, `/?look=warm`. Default dark is a preview default, not user selection.
- Ordinary header Work/Contact/CV links, skip-to-contact, labelled illustrations, complete server HTML, static local SVG fallback diagrams. Uses engine's narrow-screen framing (scene in the available band above caption) to prevent text overlap; geometry labels live in HTML.
- Supporting implementation: /work/orders-database, self-contained printable/downloadable /dawit-bekele-cv.html, custom not-found page, public icon.svg and share-preview.png with metadata. CV printed to two A4 pages; example mailto link only, no mail sent. All six work accounts represented in confirmed CV; five remaining work-detail pages await chapters stage. Share card uses own geometry and local system font, no downloaded asset. metadataBase explicitly localhost pending any future publication decision.
- Read installed Next docs for page, metadata and not-found before using those APIs. No additional skills installed or enabled; no deployment or external publication.

### Tests

- 130 unit tests passed; types passed; final lint passed; fresh production builds passed.
- Initial wide check found a late 75k graphics shader compilation. Database materials now include their transparent variant in the opening; no late shader errors in final full matrix.
- Full current-spine acceptance `checks/spine-acceptance`: **18/18 passed** (three looks × wide/short/phone/reduced/no-WebGL, plus no-JS, context loss, appearance switching). Complete manifest and all reports available.
- Actually opened all full-matrix screenshots through 18 labelled sheets and full-size desktop/phone/transition examples. Visual review caught short-desktop database heading clipping although automated checks passed. Expanded compact-height styles to 760px; fresh targeted checks passed for dark-short (`checks/spine-short-fix`, 1/1) and light-short/warm-short (`checks/spine-short-final`, 2/2). All twelve resulting captures inspected via sheets; heading now fits. These targeted runs supplement the full matrix after the specific fix; do not describe them as a second full matrix.
- Supplementary script `scripts/check-spine-details.mjs` passed: all five stage buttons and return to scroll, four forward/reverse transition captures, orders page, 404 status/navigation, email href, local icon/share/diagram resources and OG metadata, HTML CV download, no-JS CV and print output. Saved evidence under checks/spine-details, including downloaded-cv.html and cv-print-check.pdf (verification artefact only). Repeated once after static diagram label refinement; passed. A prior attempt during a production build could not connect and is not acceptance evidence.
- Inspected orders-detail capture, print-mode CV screenshot, original share card, all control/transition captures. Refined static SVG labels to avoid crossing paths; final browser-rendered SVG inspected in checks/spine-details/fallback-final.png. Asset generator saved in scripts/generate-spine-assets.py; no dependency on installed skill.
- Software headless graphics does not measure actual phone frame performance. User's final review is still pending. No final acceptance/finish claim.

### Next action

Ask Dawit which appearance to use, with live local addresses and comparison image `site/checks/look-comparison.jpg`. Provide local start command from site/LOCAL-PREVIEW.md; sandbox-started server is not guaranteed persistent/reachable. Record actual choice before remaining chapter implementation. Then complete approved sixteen-beat story, remaining five work pages, full navigation and all chapter-specific scenes; offer three complete opening/closing wording versions per building.md. Preserve all user factual/permission boundaries. Check storyboard beat 06's planned 0.75-screen height against engine minimum 1 when expanding; resolve as a documented small pacing adjustment rather than disabling engine validation.
