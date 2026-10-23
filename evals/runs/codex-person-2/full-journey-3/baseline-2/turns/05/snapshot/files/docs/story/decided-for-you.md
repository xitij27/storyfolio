# Decisions made without asking

- Keep all work local; no deployment, publishing or external messages. Requested explicitly. Can change only on the user's instruction.
- Store sourced facts and outstanding decisions in docs/story so work can continue between sessions. Concept selection is now recorded below; storyboard approval is pending.
- Verify setup with a neutral page independent of portfolio content; no personal material used in the setup page. Checks are under checks/setup.

- Scaffolded the skill engine into `site/` because the scaffold prohibits placing a copy in an ancestor of its installed source. Change by moving the complete site folder; no installed skill dependency remains.
- Concept sketches use a shared client scene with original Three.js geometry and real HTML text/navigation/details. All sketches keep geometry mounted and scale it through the transitions. Scene colour is provisional until the later appearance choice.
- Omit unsupported resume-only catalogue/borrower counts, six-person platform team, unverified repository/video URLs and the star count. Retain confirmed project-notes detail. Can add a claim later only after confirmation.
- Omit end-of-support rationale and LinkedIn’s ambiguous database-version wording; use confirmed Postgres 11 → 15 and migration method.
- Production preview is the reliable local route here: Next dev checks the npm registry for version status, which this sandbox blocks. Production build and start do not need that request. Next telemetry is disabled when running checks.
- No full final-site acceptance claim at concept stop: the supplied engine’s generic beat matrix still belongs to its placeholder content contract. Run the full acceptance matrix after the approved story replaces that contract. Current checks target the three concept routes, plus unit tests, lint, types and production build.


## Delegated concept choice and storyboard decisions — 2026-10-23

- **Chosen: The live path (`paths`).** Dawit explicitly delegated the concept choice after reviewing alternatives. Chosen over The cutover bench and The recovery line because split writes, two stores, comparison links and visible fallback explain the operation most clearly without captions. To change: name another concept or request a revision before storyboard approval.
- **Pacing: seven chapters, sixteen beats, 17.5 screen heights.** Keeps origins, education, work history and practice alongside all six required work items. Longer technical explanations move off the scroll. To change: revise chapter/beat rows in storyboard.md; avoid inventing material to fill space.
- **Six standalone work pages.** Chosen over modals for direct URLs, browser history, keyboard and no-JS use. To change: replace the detail mechanism while retaining ordinary fallback links and complete HTML.
- **CV: view page and standalone HTML download.** Matches the user's printable HTML request and avoids a PDF dependency. Include only confirmed content and scoped/team-attributed results. To change: edit the approved CV content/print CSS; no format change required now.
- **Fallback diagrams and accessible navigation.** Static original SVGs preserve chapter meaning without WebGL/JS; labels remain in HTML, compact phone navigation stays keyboard-operable. To change: revise the fallback diagram specification alongside the corresponding scene.
- **Three provisional looks, no look selected.** Night operations, Day inspection and Warm console will be compared on a runnable spine. Two system font stacks avoid downloads. To change: choose a look at the spine stop or amend the candidate palette.
- **Share card/icon:** generate original local geometry-based art; include text metadata without inventing a public origin. To change: edit local resources; choose real public origin only when publishing is requested.
- **No analytics, external embeds or unavailable repo/video destinations.** Not needed for the local brief; avoids nonfunctional links and remote requests. To change: user can request these later with actual destinations.

Storyboard is proposed, not approved. Exact captions wait until the wording stop. Local-only, no additional skills, and all source/permission restrictions remain in force.


## Spine implementation — 2026-10-23

- Engine-powered four-beat spine before remaining chapters, as required by the skill's look stop. The database beat gets three screens for the five-step demonstration. Full storyboard content remains unchanged. Change pacing via content/story.ts after look choice.
- Persistent ReturnPath is the shared piece; library, database and complete-system geometry is owned by lazy chapter extras, framed by the engine and guarded by useExtraFrame. No downloaded model assets. Change shapes in content/extras and framing in content/formations.ts.
- Night operations is the initial preview, not a chosen final look. User can compare all three by URL or on-page controls. No delegated appearance selection has been inferred from earlier concept delegation.
- Cutover uses five direct stage buttons plus Follow scroll instead of timed autoplay; this works with keyboard and reduced motion. Change controls in content/cutover-control.tsx while preserving an equivalent accessible user-driven demonstration.
- On narrow screens, engine frames the scene above the current caption to keep all text clear; this adapts the storyboard's below/alongside suggestion to the available viewport. Can revise the framing after the appearance review. At 720px desktop height, compact typography now prevents heading clipping.
- CV and supporting assets built during spine so Contact and Work link to real results for review. CV is self-contained HTML; print verification produces two A4 pages. Check PDF is stored only under checks, not offered as a new product download format.
- Metadata origin is localhost pending any future publication decision. No invented production domain or unavailable external project/video link. Change origin only if the user later authorizes publishing.
- Static SVG illustrations keep labels outside drawn paths. Original local share artwork and icon generated with local tooling; generator is in scripts/generate-spine-assets.py. No new skill or external assets used.


## Delegated look choice — 2026-10-23

- Dawit asked to choose the recommended look from the working alternatives and build the rest. Selected **Night operations (`dark`)** over Day inspection and Warm console for clear forward/fallback separation, matte surfaces and readable contrast. No additional skills or publication. Wording must be shown before settling it; do not infer wording approval.
- Use the selected look alone on the main portfolio; alternatives remain archived in source/history. Remove the appearance-study notice and use normal navigation. Can restore alternatives from the recorded look definitions if requested.
- Approved storyboard beat 06 allocated 0.75 screens, below the engine's validated minimum of 1. Allocate 1 screen to that text-only Lumen stop; full story becomes **17.75 screens** across the same sixteen beats. No extra claim or scene added.


## Remaining chapters and wording — 2026-10-23

- Added sixteen-beat full story in Night operations, all six project pages and original static fallback diagrams; reusable scene primitives carry the approved data operations, not employer screenshots. Change content in content/beat-copy.ts/projects.ts and scene modules in content/extras.
- Use one selected runtime appearance; exact earlier alternatives archived in look-alternatives.md. No appearance-switch decision remains.
- Group project details under /work/[slug] with shared layout and individual metadata. Public work consists of exactly the six user-named items. Background degree/library scenes do not become extra client projects.
- Use plain sticky header/chapter navigation and native phone disclosure; no scroll hijacking or modal requirement. Measure sticky header in viewport coordinates to handle resizing partway down the story. Meaningful kickers stay accessible.
- Keep a transparent return-path port material alive in the persistent scene, preventing a large graphics program from being released and rebuilt between chapters. Ports are part of the visible return route. Verify with late-shader browser probes.
- Opening/closing options A/B/C share fixed proof/contact/CV words, all visible on /wording and in wording.md. Recommend A for both but use it only provisionally in the draft. User asked to see wording before settling; no choice inferred. To change, choose either beat independently or supply edits.
- No production domain, hosting, legal setup, analytics or publication. README and LOCAL-PREVIEW document this boundary and pending final review.
