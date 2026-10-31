# Handover

## Current stop
Stop 3: storyboard. Dawit reviewed the site and gallery and chose the map. Previous site was WHOLE.sheet; switched site/content/mix.ts to WHOLE.map. Everything else retained. Concept decision recorded in concepts.md. Storyboard preparation/checks underway; script approval pending.

## Requested scope
Plan and build a working local one-scroll 3D portfolio, guiding decisions. Keep everything local; publishing is the user's decision.

## Setup checked in this session
- Node v24.14.0; native TypeScript verified with `node --experimental-strip-types -e 'const n: number = 1; console.log(n)'` (output 1). Meets engine's 22.18+ requirement.
- Git executable 2.53.0 verified. No repository mutations attempted.
- Enabled skill: storyfolio, as advertised. Local metadata includes its engine/library; those are parts of this skill, not additional enabled skills. No missing skill recommendation warranted.
- Browser tools are not exposed through the tool catalog. Local /tmp/chromium available; neutral file page launched headlessly for actual inspection. See subsequent setup result before claiming success.
- No dependencies installed in skill or workspace; no site scaffold yet (starts at stop 2).

## Next
Complete and present docs/story/storyboard.md, including all site requirements and decisions. Obtain yes or changes to the script before moving on to the look/wording stops. Respect the request to keep other existing choices unchanged and use available skills only.

## Historical first-stop browser limitation
Direct Chromium CLI stalled. Later Playwright checks succeeded with the existing /tmp/chromium; no browser download was needed.

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

## Latest continuation — map selected, storyboard ready
- User reviewed the actual sheet site and gallery. Requested the map for the whole site (sheet only if already map), retaining everything else. Previous world was sheet. Implemented WHOLE.map in site/content/mix.ts and recorded the user's words and change in concepts.md. No other runtime source file changed in this turn.
- Wrote docs/story/storyboard.md: seven chapters/beats, map continuity, source-bound wording requirements (no new captions), all six click details, thirty-second visitor, phone/reduced-motion/no-WebGL/no-JavaScript behavior, retained look/type and full build/later/never scope table. Includes printable/downloadable self-contained HTML CV, local share metadata/artwork, SVG icon and useful 404. Legal/hosting/publication later. No additional skills/assets installed/downloaded.
- Current user-requested world: map. Current retained look: night. Existing captions retained; final-wording choice is not inferred from silence. No need to ask for world again.
- Map production check: `CHROMIUM=/tmp/chromium npm --prefix site run check` passed with 0 problems. Build plus desktop, phone, phone with captions, no-JavaScript/no-WebGL content checks. Report and 39 images in site/checks/site/2026-10-31T05-23-29-779Z/. Inspected all images as three contact sheets.
- Visual/code issues explicitly documented in storyboard: education card incorrectly falls back to Rotterdam because university name is not matched to city; must place at confirmed Addis Ababa before final acceptance. Existing talk window's Rotterdam label must not claim a conference venue; retain only portfolio grouping. Small/occluded map labels and career/skills overview need phone/short-screen readability work. First screen lacks numerical proof and direct contact/CV. Do not call map final or fully correct based on automated pass.
- These are implementation requirements for the planned build; map-only runtime change preserved user's “everything else” request. Source library kept unchanged at this stop. Do not invent facts to avoid a resolver limitation.
- Next: present the script and agent decisions, ask for yes or changes per storyfolio stop 3. Stop before appearance/wording/detail finishing until actual script response is recorded. Map/location correction and other requested finish remain authorized scope after script review. Nothing published.
