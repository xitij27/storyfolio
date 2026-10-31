# Handover

## Current stop
Stop 1: read. Four material markdown files read. facts.md records sources, gaps, conflicts and pending questions. No concept, storyboard, look or public wording selected. Await Dawit's fact answers; write them beside facts before proceeding to stop 2.

## Requested scope
Plan and build a working local one-scroll 3D portfolio, guiding decisions. Keep everything local; publishing is the user's decision.

## Setup checked in this session
- Node v24.14.0; native TypeScript verified with `node --experimental-strip-types -e 'const n: number = 1; console.log(n)'` (output 1). Meets engine's 22.18+ requirement.
- Git executable 2.53.0 verified. No repository mutations attempted.
- Enabled skill: storyfolio, as advertised. Local metadata includes its engine/library; those are parts of this skill, not additional enabled skills. No missing skill recommendation warranted.
- Browser tools are not exposed through the tool catalog. Local /tmp/chromium available; neutral file page launched headlessly for actual inspection. See subsequent setup result before claiming success.
- No dependencies installed in skill or workspace; no site scaffold yet (starts at stop 2).

## Next
Obtain fact answers and update facts.md. Then read concept.md and diagrams.md and prepare the running concept. Follow the skill's decision stops; do not jump to look or wording.
- Browser limitation: two actual Chromium attempts on the neutral local HTML page did not produce a DOM or screenshot; the bounded second attempt timed out. NETLINK permission error appeared. Browser inspection is not verified; do not report it as passed. Retry browser setup at build time using the copied project's browser tooling. No completed site or visual checks yet.

## Continuation: confirmed facts and concept preparation
- Dawit answered extensively; exact substance recorded in facts.md under “Dawit's answers”. Remaining uncertain claims must be omitted, not asked again or guessed. No additional skills or external assets authorized.
- Scaffolded independent engine copy in `site/`. Root scaffold rejected because source is nested within root. Installed runtime/build dependencies with npm ci (392 packages); no assets or browser downloaded.
- Replaced sample person with confirmed Dawit content. WHOLE.sheet proposed, site look remains provisional engine night. Six project windows populated; no quotes. No changes to stitch library or page surrounding it.
- Concept rationale, chapter pictures, alternatives and required four tests in concepts.md. User acceptance pending; stop 2 remains current.
- `npm test`: 184 passed. `npm run typecheck`: passed. `npm run lint`: passed.
- Dev server command: `cd site && npm run dev -- --hostname 127.0.0.1`, reported http://127.0.0.1:3000. A separate tool process could not connect (sandbox network isolation); full check owns its own server.
- Existing /tmp/chromium launches successfully through Playwright (unlike prior direct CLI). Production browser matrix underway with `CHROMIUM=/tmp/chromium npm run check`. Record outcome and inspect images before handing over concept.
- Pending later requested features: approved storyboard, look comparisons, word choices, printable/downloadable HTML CV, navigation/accessibility polish, share preview, icon, missing-page page, final checks and actual user review. No publishing.
- First production matrix passed with 0 problems (desktop, phone, phone with captions, no JavaScript, no WebGL). Images inspected as contact sheets. On phones the library deliberately pans across wide pages during each hold; single midpoint shots show only part of the page. Do not describe this as a fitting fix or alter stitch without a user request.
- Visual review found overly long education and book labels; shortened the education note, move labels and Release It! entry in person.ts. Facts and complete context remain in facts.md and project windows. Re-running production check on the final concept content.
- Git executable works, but `git status --short`/`git rev-parse` report this workspace is not a Git repository. No commit created; decision files and site are saved locally.
- Second production browser matrix also passed with 0 problems after shortening scene labels; reports in `site/checks/site/2026-10-31T05-16-47-695Z/`.
- Final factual audit removed unconfirmed formal Staff/Systems Administrator titles from public headings, using descriptions of the confirmed work. Rebuilt successfully. Targeted desktop/phone visual checks on these final headings underway with `scripts/concept-review.mjs` (temporary local helper), including beginning/end of narrow-screen pans.
- Final-content targeted check completed visually: desktop and phone beginning/middle/end of opening hold, degree, work timeline pan endpoints, skills, project wall pan endpoints and contact (20 screenshots under `site/checks/concept-final/`). Inspected both contact sheets. Wide pages are intentionally read in parts on phones; at midpoint some text lies outside the viewport, and title/card content can cross the edge during the pan. Treat this as a concept characteristic for user review, not polished final framing.
- The first screenshot of final public content is `site/checks/concept-final/desktop/0.png`. The degree and long skill labels now stay within their printed surfaces on desktop. Caption text and ordinary HTML preserve the facts on phones.
- Next required action: ask whether to keep the continuous-sheet world or change it. Do not proceed to storyboard/look selection before recording Dawit's answer in concepts.md. CV/download, metadata artwork/icon and missing-page finish remain authorized future scope.
- Removed the temporary hardcoded local screenshot helper after use; saved screenshots remain. Both final targeted viewport runs reported no page errors. Use the engine's existing check scripts for future checks.
