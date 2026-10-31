# Handover

## Current stop
Stop 2: running concept preview, awaiting Dawit's concept choice. Stop 1 answers have been recorded in facts.md; the confirmation section supersedes unresolved/conflicting source statements. No concept, storyboard, look or final wording accepted yet. Do not advance to storyboard until the concept answer is recorded.

## User objective and boundaries
Plan and build a local scroll-driven 3D portfolio with guided decisions. Audience: engineering leaders planning a migration and conference organisers. Going independent in 2027; visitors should write to him. Keep everything local; publishing is his decision. No new skills, external assets, downloads or purchases. System fonts, original geometry, original labelled illustrations only. No photos, testimonials, forms, blog, chat or translations. English. Read facts.md for full permissions and corrections, especially Lumen restrictions.

## What exists
- `site/`: scaffolded Next.js 16 engine, dependencies installed offline from existing npm cache.
- `site/content/person.ts`: confirmed profile, places, degree, three roles, practices, precisely six work items with click-open detail, no quotes.
- `site/content/mix.ts`: proposed sheet/map/sheet/sheet/sheet/sheet/(omitted say)/sheet mix. Read concepts.md for rationale and tests.
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

## Remaining work after concept choice
1. Read storyboard.md reference; propose entire script, get actual answer, record it.
2. Present whole-site look variants, get choice; current night palette is provisional.
3. Build click-open detail pages and meaningful original operational illustrations from approved notes, plus printable downloadable HTML CV. Present three whole-beat wording choices at wording stop.
4. Finish ordinary navigation, share preview, icon, useful 404; remove unused starter/sample public routes before final delivery. No real ferry/video links or star counts without confirmation.
5. Finish accessibility: keyboard access and focus handling for details; review mobile readability and header/proof overlap during folds. Current preview uses ready gallery pieces and generic labelled checklist sketches; it does not yet demonstrate an operating cutover.
6. Complete checks and inspect all pictures, then obtain and record Dawit's actual final review. No deployment, legal or hosting work until user chooses publishing.

## Latest verification result
- Fresh production check finished successfully: 39 desktop/phone/phone-with-captions screenshots, zero automated problems; no-JavaScript and no-WebGL text checks passed, local home link returned 200, unknown path returned 404 with Dawit's title. Report: site/checks/site/2026-10-31T02-37-51-083Z/report.json.
- Visually inspected the complete desktop/phone/phone-caption contact sheets, no-WebGL text and migration detail window. The ready sheet intentionally pans across wide documents on phone; parts of the document are outside the viewport at each hold point. This remains a concept-preview limitation: phone framing/readability, persistent proof text over pale paper and the contact button overlapping the caption need refinement before final delivery. Automated pass is not final visual acceptance.
- Focused browser interaction check passed: click the data-centre work entry, verify detail includes the two internal incidents, press Escape to close. Screenshot: site/checks/concept-detail.png.
- 184 unit tests, typecheck and lint passed; production build/check passed. No user final review or concept acceptance received.
- Final visual inspection caught no-JavaScript fallback spacing being overridden by the engine's later stylesheet. Increased the fallback selector specificity, rebuilt successfully, and ran a targeted no-JavaScript browser check: heading y=180, proof ends y=126; no overlap. Inspected `site/checks/no-javascript-final.png`. The full 39-shot report precedes this isolated CSS specificity fix; that fix has a fresh production build and targeted browser verification.
