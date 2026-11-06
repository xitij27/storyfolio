# Handover

## Current stop

Stop 1: source reading complete; factual questions awaiting user answers. No concept, storyboard or site built. User wants a working local scroll-driven 3D portfolio and guidance through decisions; publishing reserved to user.

Read all four material Markdown files, after listing names; no private files identified or read. Source facts, discrepancies and open questions recorded in facts.md. User answers must be recorded beside facts before advancing. Next: resolve factual questions, then read concept.md and diagrams.md and build a running concept for stop 2.

## Setup checks actually run

- Node v24.14.0, npm 11.9.0: satisfy engine requirement Node >=22.18. Native TypeScript verified by writing/importing temporary typed .ts module; printed 7.
- Git 2.53.0 installed. `git status --short` fails: this workspace's .git is an empty directory, not a repository. No history exists here.
- Only storyfolio is advertised enabled and listed under .agents/skills. No other skill recommended.
- No browser tools advertised. No resolvable Playwright/Puppeteer in workspace. Existing /tmp Playwright directory lacks index.mjs; attempted import failed. Do not treat another setup's artifacts as verification.
- Attempted isolated playwright-core installation in /tmp; registry.npmjs.org blocked by environment allowlist. Dependencies have not been installed.
- Created checks/setup/neutral.html. Attempted to open using installed Chromium 1248 headless with dump-dom/screenshot. First launch could not create default data directory; explicit /tmp profile hit crashpad config; explicit writable XDG config/cache got socket() Operation not permitted in browser process singleton. Browser did not open. No screenshot or visual inspection completed. Must report limit and retry with suitable available tooling if environment changes. Do not claim successful browser/site checks.
- All material/site work remains local. Temporary tooling install attempt requested only package code; no personal material uploaded.

## Continuation after user's factual answers

All user corrections/permissions recorded under authoritative answers in facts.md. No new skills, asset downloads or mail authorized. Intended independent work in 2027, contact example address, six work items, printable/downloadable HTML CV and local metadata requirements recorded.

Current stop: 2, concept proposed, awaiting acceptance/change. Site scaffolded in site/ (root overlaps skill engine, so cannot scaffold there). Person populated entirely, mix whole sheet, provisional night/swing and factual captions. Six clickable project descriptions exist. No testimonials. CV/share/icon enhancements wait for later stops. No full storyboard yet.

Setup improvements: npm ci --offline --cache /tmp/storyfolio-npm-cache succeeded, 392 packages, no registry downloads. Native Chromium headless-shell 1248 with writable XDG dirs works with installed playwright-core. Concept review script starts production server within same command as browser because separately started tool processes did not share working loopback access. A dev-mode attempt hit blocked registry access; production build succeeds offline.

Passed: npm run typecheck, npm run lint, npm test (187/187), npm run build. Browser concept review at 1440x900 and 390x844: scene on, correct title, no page errors. All seven chapter holds captured under checks/concept and inspected via desktop-review.jpg / phone-review.jpg. The wide timeline and multi-column chapters pan through content on mobile; opening still shows a full sheet. Globe place labels can crop when long; generic checklist thumbnail diagrams are illustrative rather than operational models. These are concept-stage visual limitations, not final acceptance. Core stitch/ remains unchanged per skill.

Full npm run check started with CHROMIUM pointing to headless-shell and writable XDG dirs; result pending at this write. Start local server after checks finish: cd site && npm run start -- --hostname 127.0.0.1 (build first if needed). No publishing performed.

Local production server started successfully on http://127.0.0.1:3000 (tool session 11929). Browser review evidence under checks/concept/ includes both full-size shots and contact sheets. Workspace README gives restart commands. Full check still running through desktop/phone shooting; do not claim completed until report.json is read.

Full npm run check completed successfully: 0 problems. Report: site/checks/site/2026-11-06T19-54-55-831Z/report.json. Desktop, phone and phone-with-words shooting passed; no-JavaScript/no-WebGL content and link/missing-page checks passed. Separate concept screenshots were visually inspected; full acceptance screenshots have not all been individually inspected, so this is not final visual approval. Local production server remains session 11929.
