# Handover

## Current stop
Stop 2: three runnable concept sketches complete; await user's choice or instruction to choose. No concept selected yet. Read concepts.md and facts.md before continuation. After choice, record it and read references/storyboard.md; get storyboard approval before building final site.

## User scope and decisions
User requests local working portfolio for firmware hiring managers with one scroll-driven story and tangible work-derived 3D, no paper/sheets/card collection. Additional required routes/assets: dedicated Mosslink project page, corrected printable/downloadable HTML CV, ordinary navigation, English, share preview, icon, useful 404. Email link only. Publishing solely user's decision. No extra skills, external assets, private circuit diagram or employer/dates. See facts.md for complete corrections and limits; all answers recorded, unconfirmed claims omitted.

## Implementation
- Self-contained Next.js engine copy in site/; 392 packages installed offline using /tmp/storyfolio-npm-cache. npm ci completed with zero reported vulnerabilities.
- Landing page compares /sketch/fixture, /sketch/harness and /sketch/enclosure. Each has actual scroll-driven R3F 3D and opening/middle/ending, single fixed family of six solid modules, ordinary HTML text/contact, local SVG static fallback.
- Fixture recommended; all geometry labelled illustrative, no original circuit/trace inferred. Supplied SVGs copied unchanged; source MIT permission and description in facts.md and material/asset-notes.md.
- Final project/CV/preview/icon/custom-404 routes NOT implemented yet; explicitly held for approved storyboard. Engine test-story content files remain unused by landing/sketches; replace after approval.
- Next telemetry disabled in site/.env.local. First dev start attempted blocked telemetry; restarted disabled. Dev browser session encountered a blocked registry request (no external package was authorized/downloaded); production build/start used successfully for review.

## Checks actually run, 22 October 2026
- node v22.22.1 and git 2.53.0. Native TypeScript import executed typed number and printed 42.
- Initial workspace not a Git working repository; site given its own repository for lasting work.
- Neutral local HTML opened in cached Chromium headless-shell via installed Playwright, screenshot visually inspected. Full Chromium failed crashpad database setup; headless-shell works with supplied library path.
- Only storyfolio advertised enabled and locally installed. Catalog describes external remote skills, not installed/enabled ones; user declined additions.
- npm run typecheck, npm run lint: pass. npm test: 129 pass. npm run build: pass, all sketch routes generated.
- Production browser probe: three concepts at 1440x1000 and 390x844; scene on, no page errors, no horizontal overflow. Captured opening/middle/close for all six cases. Visually inspected all 18 captures via six review contact sheets; scene/copy fit. Fine printed 3D labels are small and should be improved in selected build; HTML carries all meaning.
- Captures/report and rerunnable scripts in workspace checks/concepts and checks/setup. These are concept checks, not full final-site acceptance. npm run check matrix is pending final content contract; reduced motion/no-WebGL/no-JS checks still required for final build.
- Headless software rendering is not a phone performance measurement.

## Local run
From site/: `NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1 --port 3100` after current successful build, or npm run dev for editing. Open http://127.0.0.1:3100/ and sketch paths. Production review server was stopped after screenshots; user can start with this command. All work remains local.
