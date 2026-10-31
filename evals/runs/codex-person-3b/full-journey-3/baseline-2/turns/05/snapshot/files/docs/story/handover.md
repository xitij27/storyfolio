# Handover

## Current stop
Stop 5: user selected the recommended working look, Blueprint; recorded in looks.md and applied in site.ts. User authorized building the rest, with important wording shown before settling. Build all six detail pages, original diagrams/ferry model, printable/downloadable HTML CV, navigation/share/icon/404; then show three whole-beat opening and closing versions and await actual choice. No new skills, downloads or publishing.

## User objective and boundaries
Plan and build a local scroll-driven 3D portfolio with guided decisions. Audience: engineering leaders planning a migration and conference organisers. Going independent in 2027; visitors should write to him. Keep everything local; publishing is his decision. No new skills, external assets, downloads or purchases. System fonts, original geometry, original labelled illustrations only. No photos, testimonials, forms, blog, chat or translations. English. Read facts.md for full permissions and corrections, especially Lumen restrictions.

## What exists
- `site/`: scaffolded Next.js 16 engine, dependencies installed offline from existing npm cache.
- `site/content/person.ts`: confirmed profile, places, degree, three roles, practices, precisely six work items with click-open detail, no quotes.
- `site/content/mix.ts`: accepted sheet/map/sheet/book/sheet/sheet/(omitted say)/sheet mix. Read concepts.md for rationale and tests.
- `site/content/site.ts`: temporary default night look, generated captions, no chosen wording or CV link yet.
- Name/contact header, correctly scoped programme proof, visible illustration disclosure. Text fallback spacing adjusted so header/disclosure do not overlap first text. Replaced starter contact-scene overclaim about every picture being made from the sheet.
- `README.md`: local startup and check commands. Start from workspace root with `npm run dev --prefix site -- --hostname 127.0.0.1`; open http://127.0.0.1:3000.
- Canonical story notes are at workspace root `docs/story/`; `site/docs/story/handover.md` points here.

## Setup and verification
- Checked Node v24.14.0, Git 2.53.0; native TypeScript ran successfully (typed number printed 42).
- Storyfolio is the sole advertised enabled skill. Its engine/library exist locally; this does not imply additional enabled skills. User declined more skills.
- Initial browser attempt used an incomplete /tmp package and failed. Network installation attempt was blocked. Subsequently discovered offline npm and Chromium caches; installed the scaffold dependencies with `npm ci --offline --prefix site`, with no downloads or skill installs.
- Chromium successfully opened a neutral data-URL page; title/heading checked and screenshot /tmp/dawit-neutral.png visually inspected.
- `npm test --prefix site`: 184 tests passed. Typecheck passed. Initial lint identified a home link issue; changed to Next Link; lint passed subsequently.
- First production check generated all 13 desktop hold/move screenshots, no reported desktop problems; viewed the desktop contact sheet and full opening/work-index images. Interrupted the run to correct disclosure/fallback spacing and the false starter contact sentence.
- Fresh typecheck/lint/production check started after those changes; final result to be recorded below. Output: `site/checks/site/2026-10-31T02-37-51-083Z/`.
- Git executable works, but workspace .git is not a usable repository (`git status` reports not a repository); no commit created.
- A separately started dev-server session reported ready, but cross-tool requests could not connect. The integrated production-check process starts and verifies its own local server successfully. Give the user the startup command; do not promise a cross-session browser connection.

## Remaining work after accepted concept
1. Storyboard approved and actual answer recorded in storyboard.md. No further storyboard approval needed.
2. Whole-site Night/Daylight/Blueprint variants are built; obtain actual user choice, record it, then set site.look. Current night default is provisional.
3. Build click-open detail pages and meaningful original operational illustrations from approved notes, plus printable downloadable HTML CV. Present three whole-beat wording choices at wording stop.
4. Finish ordinary navigation, share preview, icon, useful 404; remove unused starter/sample public routes before final delivery. No real ferry/video links or star counts without confirmation.
5. Finish accessibility: keyboard access and focus handling for details; review mobile readability and header/proof overlap during folds. Current preview uses ready gallery pieces and generic labelled checklist sketches; it does not yet demonstrate an operating cutover.
6. Complete checks and inspect all pictures, then obtain and record Dawit's actual final review. No deployment, legal or hosting work until user chooses publishing.

## Latest verification result
- Fresh production check finished successfully: 39 desktop/phone/phone-with-captions screenshots, zero automated problems; no-JavaScript and no-WebGL text checks passed, local home link returned 200, unknown path returned 404 with Dawit's title. Report: site/checks/site/2026-10-31T02-37-51-083Z/report.json.
- Visually inspected the complete desktop/phone/phone-caption contact sheets, no-WebGL text and migration detail window. The ready sheet intentionally pans across wide documents on phone; parts of the document are outside the viewport at each hold point. This remains a concept-preview limitation: phone framing/readability, persistent proof text over pale paper and the contact button overlapping the caption need refinement before final delivery. Automated pass is not final visual acceptance.
- Focused browser interaction check passed: click the data-centre work entry, verify detail includes the two internal incidents, press Escape to close. Screenshot: site/checks/concept-detail.png.
- 184 unit tests, typecheck and lint passed; production build/check passed. No user final review received. Concept acceptance is now recorded above.
- Final visual inspection caught no-JavaScript fallback spacing being overridden by the engine's later stylesheet. Increased the fallback selector specificity, rebuilt successfully, and ran a targeted no-JavaScript browser check: heading y=180, proof ends y=126; no overlap. Inspected `site/checks/no-javascript-final.png`. The full 39-shot report precedes this isolated CSS specificity fix; that fix has a fresh production build and targeted browser verification.

## Latest turn — concept accepted / storyboard ready
- User kept the mix and changed only employment history. Prior piece was sheet; implemented worked: book, so the conditional map alternative was not used. Recorded actual answer in concepts.md and reflected acceptance in facts.md.
- Read storyboard.md and building.md references. Wrote full storyboard: seven chapters/beats, nominal 13.3-screen allocation plus exact engine scroll length, joins, fact basis, six detail-page plans, working ferry illustration on detail page, thirty-second path, phone/reduced-motion/no-WebGL/no-JS behavior, three later look options, all ancillary scope and decisions made for the user. No final captions written, no look selected.
- Remaining build requirements include meaningful phone framing and text equivalence; the pop-up book's page text is cropped at some phone holds, and existing caption/CTA overlaps remain known preview limits. The proposed script explicitly requires correction before final delivery.
- All work local. No new skills, packages, downloads, assets or publishing actions.
- Updated mix verification: typecheck/lint passed; fresh production build and browser matrix passed with 39 shots and zero automated problems, plus no-JavaScript/no-WebGL text and 404 checks. Report: site/checks/site/2026-10-31T02-45-46-610Z/report.json. Desktop, phone and captioned-phone shots inspected via contact sheets, including both new book joins. This verifies the mix change, not final phone visual acceptance or the unbuilt storyboard features.

## Storyboard approved / whole-site looks built
- Actual user answer recorded in storyboard.md before edits: “Yes to the storyboard in docs/story/storyboard.md. Please build it.” Publishing excluded and additional skills declined again.
- Current stop is 4. Three complete seven-chapter looks are running at `/preview?look=night`, `?look=daylight`, `?look=blueprint`. Shared shell is `site/components/portfolio/index.tsx`; comparison control is look-switcher.tsx. Default `site/content/site.ts` still uses provisional night: no look chosen.
- `/preview` now awaits Next.js 16 searchParams on the server (local bundled documentation consulted); no client-only blank without JavaScript, no sample-person selector. Appearance switch preserves query/hash/scroll.
- Header/proof/labels follow active palette; proof only at opening. Named chapter links, skip link, text-view option and readable book caption added. Full roles/study/practices present in HTML, with restricted Lumen line preserved.
- Framing in sheet.ts/book.ts changed to show entire subjects on phones and reserve space for header/caption. The accepted worlds/mix remain unchanged. Reduced-motion stage clocks now freeze idle animation too.
- Added `scripts/looks-check.mjs`: all three looks at desktop/phone, short-screen book joins in both directions, position-preserving switching, named nav and no-JavaScript preview. Run after production build; reports in checks/looks.
- 184 unit tests passed; typecheck passed. Removed unused framing variables and final lint passed.
- First new production matrix found only cancelled Next Link background prefetch requests (ERR_ABORTED), not blank/error scenes. Disabled unnecessary prefetch on shell/comparison links instead of weakening checks. A simultaneous first look-check process was interrupted; no pass claimed for it. Runs now serialized.
- Fresh production matrix and look matrix running from session 36977; report paths/results to be appended when complete. Do not use the earlier failed reports as acceptance.
- Sent an asynchronous choice request with three local preview links; recommendation Blueprint. Await actual user reply; elapsed time or the preselected option is not a choice. Building.md explicitly says show the whole site in 2–3 looks and “stop for their answer before building on.” Project pages/CV, ferry model and wording options remain at stop 5, after that answer.
- After disabling unnecessary prefetch, fresh full production check passed: `site/checks/site/2026-10-31T03-01-26-640Z/report.json` — 39 screenshots, zero automated problems, no-JavaScript/no-WebGL text and local links/404 passed. Complete desktop/phone/caption sheets and fallback text visually inspected. Book caption and contact CTA were also inspected at full phone size. Look-specific matrix continues serially after this run.
- Look-specific matrix passed: `site/checks/looks/2026-10-31T03-03-50-827Z/report.json`, 78 appearance shots plus 13 short join shots, switching/query/hash/scroll checks, ordinary Work/Contact nav, no CTA/caption overlap on short screen and no-JavaScript preview. All palette/short pictures inspected.
- Visual review caught wide preview controls covering a map label; moved controls inside the header above 1100px. Rebuilt and checked 18 targeted shots: `checks/looks/header-final/report.json`, zero automated problems. Wide opening/map/book/close views inspected.
- A 1000×600 map screenshot then showed city labels behind its header/secondary control row. Added 1.7× map camera distance only for wide viewports below 750px height; normal desktop/phone unchanged. Final targeted build/lint/check pending; actual short-map report path is `site/checks/looks/short-map-final/`. Append final result, do not assume it passed.
- Final short-map correction passed after fresh build: `site/checks/looks/short-map-final/report.json`, 3 palettes at 1000×600, zero runtime problems. Moved medium-width comparison bar right as well as increasing camera clearance; visually verified all city labels clear. Checked phone comparison views remain clear. Latest lint/build/TypeScript passed. No further code changes after these checks.
- All three complete looks are now ready for the user's choice. Still no actual look answer. Do not set Blueprint merely because it was recommended/preselected, and do not advance to step 5 before recording their answer.
