# Handover

## Current state — 2026-11-06

Current stop: **3, storyboard proposed; awaiting user's yes or requested changes**. World choice is complete: user scrolled the local prototype and gallery, then explicitly chose the sheet for the entire site. Exact answer recorded in concepts.md; content/mix.ts is already WHOLE.sheet. No additional skills and everything remains local.

Read facts.md authoritative answers before source inventory. User corrections override resume/LinkedIn. Storyboard is docs/story/storyboard.md, with seven chapter/beat rows, nominal 13.3-screen budget, six detail dialogs, fallback/accessibility behaviour, first-screen meaning/proof, look options and full build/later/never requirements. Decisions and reasons in decided-for-you.md. No final captions written this turn. No site implementation changed this turn; current look/night, move/swing and opening/closing words remain provisional.

Next: record actual storyboard acceptance/change before advancing. Then read building.md/engine README and show the whole person's site in local night/daylight/blueprint looks and fold/swing/slide moves, ask user choice. After that build final details/CV/metadata/icon/404 and present three complete opening and closing wording options. Final user review must be recorded. Never publish without separate explicit instruction.

## User scope and constraints

Audience: engineering leaders planning migrations and conference organisers. Intended independence in 2027. Public example contact dawit@example.com; mailto only, never send. Six items only: data-centre exit, orders database, runbook, on-call, ferry, Boring Migrations talk. Approved descriptions in project-notes.md may be illustrated; all illustrations labelled. No internal images/screens, photos, downloads, slides or testimonials. Lumen Pay disclosure restricted to role/place/dates and “Card payment systems.” Local fonts and own geometry. Printable HTML CV with HTML download; ordinary English navigation, local share preview/icon, useful 404. No blog/chat/translations/form. Legal/hosting wait for publication.

Factual essentials: 99.98% measured Order API availability over 26 months; no zero-downtime claim. On-call 85→22/week over about a year belongs to nine-person team, “we”. ferry originally created by former colleague, maintained by Dawit since 2022, cutover command his. Runbook first version his, still owns, 40 teams. No unconfirmed stars/URLs/library counts/current official grade. Prototype talk item uses Rotterdam as a label, but venue city is not confirmed: correct to event name at detail work.

## What exists

Standalone Next.js site under site/; source copied from skill engine without stitch/ edits. All person data replaced; six project summaries/details open native dialogs. Seven chapter story; no quotes. Existing required additions still to build: printable/downloadable CV, share preview image/metadata, site icon, useful custom 404. Prototype's first-screen caption needs readable runbook proof added at wording stop. Root README gives run commands. docs/story holds continuing decisions.

## Environment checks and local workflow

Node v24.14.0, npm 11.9.0; native TypeScript verified by typed .ts import printing 7. Git 2.53.0 exists, but workspace .git is empty and git status fails (not a repository); no commits possible without initialising. Only storyfolio skill advertised and locally listed; user declines any additional skills.

npm ci --offline --cache /tmp/storyfolio-npm-cache succeeded (392 packages). No dependency/asset downloads needed. Earlier isolated npm install hit registry allowlist block. Production build works offline. A dev browser attempt hit blocked registry access, so use production for review.

Chromium normal browser launch failed (profile/crashpad/socket restrictions). Installed headless shell works with Playwright from site/node_modules and writable XDG dirs:

- CHROMIUM=/home/kshitij/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell
- XDG_CONFIG_HOME=/tmp/storyfolio-browser-config
- XDG_CACHE_HOME=/tmp/storyfolio-browser-cache

Run browser and server within same exec-command child process when needed; separately started tool processes did not reliably share loopback. site/scripts/concept-review.mjs starts production server and captures seven holds at desktop/phone. Local production server started previous turn on http://127.0.0.1:3000 (session 11929); may need restart. `cd site && npm run start -- --hostname 127.0.0.1`; build before start after changes.

## Verification already completed (previous turn)

Passed npm run typecheck, npm run lint, npm test (187/187), npm run build. Concept browser review at 1440x900 and 390x844: scene on, correct name title, no page errors. All seven holds visually inspected via checks/concept/desktop-review.jpg and phone-review.jpg. Wide scenes pan on mobile; long map labels can crop and timeline names need final legibility review. Generic checklist images are illustrations, not simulations.

Full npm run check: **0 problems**, report site/checks/site/2026-11-06T19-54-55-831Z/report.json. Desktop/phone/phone-with-words shooting, no-JavaScript/no-WebGL, expected text, links and missing-page status/title passed. Full acceptance screenshots not all individually inspected; final visual review still required. No tests rerun for this documentation-only storyboard step. No final user review or publishing approval exists.
