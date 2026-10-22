# Handover

## Current stop
Stop 1: material read, factual confirmation pending. No concept or portfolio design chosen. User requests planning and working local build with a tangible work-derived 3D object, one scroll, no paper/sheets/card collection. Publishing remains user's decision.

## Read
All five files listed in material: CV, asset notes, lab notes, helper catalog and runtime-resource metadata. No private correspondence or participant records appeared in the material listing. Supplied public SVG filenames located. Facts and unresolved claims recorded in facts.md.

## Setup observations, 2026-10-22
- Read storyfolio SKILL.md, reading-a-profile.md and engine/README.md.
- `node --version`: v22.22.1; meets engine >=22.18.
- Executed `/tmp/storyfolio-setup/probe.ts` using native `node`; typed number printed 42 successfully.
- `git --version`: 2.53.0. No repository mutation performed.
- Actual neutral local HTML opened using cached Chromium headless shell, with supplied library path and explicit /tmp user profile. DOM printed, screenshot saved and visually opened: correct heading and paragraph.
- Full Chromium failed on profile/crashpad setup; headless shell succeeded. Nonfatal DBus/udev warnings. This neutral check establishes no application or WebGL behavior yet.
- Browser executable: /tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell. LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu.
- Only local SKILL.md found: .agents/skills/storyfolio/SKILL.md. Advertised enabled catalog also lists only storyfolio. Remote helper catalog does not establish installation or activation. No additional skill needed at this stage; nothing installed or fetched.
- Supplied runtime metadata says external downloads unavailable. Dependency cache has not yet been tested. No app scaffold yet, appropriately before factual/concept decisions.

## Next
Collect factual answers; write them beside each fact before concept work. Then read concept reference and make three runnable concept sketches for user selection, followed by storyboard approval and build stops.

## Factual review received and incorporated
User explicitly corrected scope, attribution, public naming, evidence and rights. facts.md rewritten with all corrections before concept work. User declines additional skills; no recommendation or installation needed. Unconfirmed facts must be omitted. Employer and dates omitted from all site/CV content. Future build must include Mosslink's own project page, corrected printable downloadable HTML CV (no invented PDF), email link only, English ordinary navigation, local share preview/icon, useful 404. No legal claims or publishing.

## Current implementation / stop 2
Three concept sketches in site/ using supplied engine, six chunky custom 3D pieces per sketch. Original explanatory contact modules, sample-board carrier, terminal assembly. Not paper/cards or actual circuit replicas. Same provisional palette; user has not chosen a look. All sketches have opening/middle/ending. Root is concept selector, not final portfolio. Complete proposed forms and six tests per concept are in concepts.md. Recommended: fixture. Await concept selection before storyboard; no final script approval yet.

## Checks
- npm ci --offline --cache /tmp/storyfolio-npm-cache succeeded (392 locked packages). No skill/asset installed. Existing cached Chromium used; no browser download.
- Typecheck and lint passed; 129 engine tests passed.
- Production build succeeded with three statically generated sketch routes.
- Focused browser: 18 captures across three sketches, three beats, desktop 1440×1000 and phone 390×844. WebGL scene on; no page errors or horizontal overflow. Opened desktop and phone screenshot contact sheets covering all 18 images. Geometry/text separated without clipping. Label texture proportions subsequently enlarged for phone readability; latest captures require review before handoff.
- Browser script: site/scripts/check-concepts.mjs. Results: site/checks/concepts/results.json. Not final full acceptance matrix. Reduced motion, no-WebGL/no-JS and final auxiliary pages still need build-stage checks.
- Dev mode's default update check attempted registry.npmjs.org and was blocked by environment. Use local production preview (`npm start -- --hostname 127.0.0.1`), which has no update check. Telemetry disabled in build/dev scripts. Failed dev attempts are not successful site inspection.
- Tool command invocations have separate loopback contexts: browser script spawns its own production server to inspect. For user review start server in user's terminal using LOCAL-REVIEW.md.
- App guide: site/LOCAL-REVIEW.md. All story records remain in root docs/story.

## Next decision
User chooses fixture, samples or terminal (or asks agent to choose). Record answer in concepts.md, read storyboard reference, write full page script including project page/CV integration for approval. Later: look, wording, final actual review. No publishing.

## Final concept handoff verification
Latest production build and focused 18-capture run passed after label rendering correction. Opened latest desktop/phone contact sheets covering all captures plus full-size middle views. Labels now readable, objects within frame, text and objects separated. No page errors or horizontal overflow in all 18 results. Lint rerun passed after texture edit. Existing header/chapter rail arrangement is provisional and needs integration at full build. Full acceptance not claimed. User-facing local addresses are available after starting the production server from site; browser check stops its own server.
