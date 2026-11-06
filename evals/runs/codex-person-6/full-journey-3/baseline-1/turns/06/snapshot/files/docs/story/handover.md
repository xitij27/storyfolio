# Dawit Bekele — local site handover

## Delivery and decisions

Working site in `site/`. One scroll through seven chapters, entirely in the sheet world. Accepted: storyboard, **Blueprint + Slide**, **version A opening and version A closing**. Wording is applied verbatim from content/wording.ts, with the fixed opening illustration note. Exact decisions are in concepts.md, looks.md and wording.md; facts and source permissions in facts.md.

Local address: **http://127.0.0.1:3000**. CV: **http://127.0.0.1:3000/cv**. No publishing, mail sending, tracking, remote fonts, new skills or asset downloads. Publishing is outside this task.

**Actual final user review is PENDING.** This includes scrolling the finished site on a physical phone. The user expressly said not to infer it. Automated tests and agent screenshots do not count as that review; see review.md. No further approval is needed to use this local build.

## Run and edit

From the workspace:

```bash
cd site
npm run build
npm run start -- --hostname 127.0.0.1
```

The latest build already exists, so the build step is only needed after edits. Stop the server with Ctrl-C. For editing use `npm run dev -- --hostname 127.0.0.1`; the production server is the verified delivery path in this environment. The loopback binding keeps access on the local machine. Do not assume a physical phone can reach 127.0.0.1 on this machine; local-network/device access would need a separate binding choice.

Node v24.14.0 and npm11.9.0 were used; engine requires Node>=22.18 with native TypeScript. Dependencies are installed. If restoring this workspace, the available local cache was used successfully with `npm ci --offline --cache /tmp/storyfolio-npm-cache`. No installation inside the skill folder.

Main editable files:

- content/person.ts: confirmed person facts, six summaries and details; CV uses these too.
- content/site.ts: selected appearance, movement, captions, CV link.
- content/wording.ts: reviewed wording versions; the main site references A directly.
- content/mix.ts: WHOLE.sheet.
- lib/cv.ts: shared escaped CV body and print/download styles.
- app/layout.tsx, public/share.png, app/icon.svg: local metadata/assets.
- components/chapter-entry.tsx: nonvisual history correction for bare home URLs.

All paths above are inside site/. Supplied stitch/ world code remains unchanged. The navigation helper gives `/` an explicit `#hello` via replaceState, preserving forward history. It fixes the final browser check's discovery that Back from #made to an empty hash did not reset the scene.

## Included behaviour

- Seven chapters; no testimonial chapter.
- Six native work dialogs, with readable HTML buttons, Escape/Close and focus return. Correct team/ferry credit; no zero-downtime claim. Drawings labelled illustration.
- Navigation to Work, Contact and CV; named chapter links and rail; Back/Forward correction on the main site.
- CV page, print action and standalone HTML download at /cv/download, filename dawit-bekele-cv.html. Shared content prevents drift; attachment has embedded CSS, no scripts or external assets. Browser menu printing works without JS.
- Original local 1200×630 share.png and folded-sheet SVG icon; OG/Twitter metadata. No production domain invented.
- Useful actual 404 response, name and Home/Work/Contact/CV links.
- Reduced-motion poses; ordinary HTML content when JS/WebGL is absent or context lost.
- /review and /wording retained as noindex design-review archives; /preview can still show alternatives. They are outside main navigation. Starter development routes remain available locally.

## Check commands and evidence

Run in site/:

```bash
npm run typecheck
npm run lint
npm test
CHROMIUM=/home/kshitij/.cache/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell \
XDG_CONFIG_HOME=/tmp/storyfolio-browser-config \
XDG_CACHE_HOME=/tmp/storyfolio-browser-cache \
npm run check
node scripts/finish-review.mjs
node scripts/details-review.mjs
```

The browser scripts use installed playwright-core/headless-shell. Paths are specific to this environment; no additional browser download is needed here. Normal Chromium had profile/socket restrictions, so the installed headless shell is used. A fresh setup with different paths would need its own browser path. Start browser and test server within the same script for reliable loopback access in this environment.

Latest final-source typecheck, lint and **187/187 tests pass**. Production `npm run check` passes with **0 problems**, report:

`site/checks/site/2026-11-06T20-17-20-381Z/report.json`

It builds, checks desktop/phone/phone-with-words holds and transitions, no-JS/no-WebGL content, links including CV, and 404 status/title. Earlier check pass before the history fix: 20-14-34. Earlier finish-review failed on the discovered Back issue; it is not counted as a successful finishing run.

The final targeted finishing and detail scripts both passed; results and final inspection evidence are below. Output folders are workspace-root `checks/finish/` and `checks/details/`, distinct from site/checks/site/. Targeted checks cover exact chosen wording/look, all seven holds on desktop/phone/short screen, forward/backward transitions, mobile scene pans, reduced-motion stationary pixels, Back/Forward, ordinary-motion travel, all dialogs, CV attachment parity/print, local assets/metadata and useful 404.

## Remaining limitations

- **Actual final user review, physical-phone scrolling and real-device performance remain pending.** Chromium headless software rendering at phone dimensions is not a real-phone test. Safari/Firefox were not checked.
- Small print in the illustrative CV sheet and the long university name in the career ribbon can be hard to read. Wide scenes pan on mobile; printed text also blends briefly during transformations. Readable captions, work details and the standalone CV carry the facts. These are disclosed visual limits of the supplied sheet world, not claims of perfect typography at every frame.
- The seven-beat storyboard budget is 13.3 screens nominally. Actual engine scroll travel uses six transitions and a final hold (6.4 units), with 1.9 viewport heights/minimum1000px per unit and one viewport added to document height. Short devices therefore differ.
- Sharing is checked locally. Production URL, social crawler fetch tests, hosting/legal details and any deployment are separate publishing work.
- Unconfirmed ferry/talk URLs, star count, library counts and official current grade remain omitted. The public email is intentionally an example address; no message was sent.
- The workspace's .git is empty, not a repository. No commit or remote backup exists; local files are the deliverable.

## Final verification addendum

Final-source `scripts/finish-review.mjs`: PASS, 92 captures at 1440×900, 390×844 and 1024×600. All seven holds, every transition forward/backward at each size, additional desktop transition positions and mobile pans checked. Exact A opening/closing and blueprint/whole-sheet configuration verified. Stationary reduced-motion canvas snapshots match. Back/Forward now pass at all three sizes. Ordinary-motion first transition and return also pass. No page errors or unexpected external requests. Report: `checks/finish/report.json`.

Final-source `scripts/details-review.mjs`: PASS, `checks/details/report.json`. All six dialogs keyboard-open/Escape/focus-return at desktop/phone; CV download text matches CV page, attachment headers and embedded CSS verified, print action and hidden print controls verified; local print PDF has two A4 pages. Useful 404 status/links and local OG/image/icon checks pass. No page errors or unexpected external requests.

Agent visually inspected all seven final holds at three sizes, transition contact sheets in both directions, mobile panning positions, and all production-suite desktop/phone/phone-with-words pictures. Evidence contact sheets under `checks/finish/`. CV screen/print, dialogs, missing-page and share-image shots were inspected during detail work; those features also passed final-source behaviour checks. Small-print/panning/transition limitations above remain explicitly disclosed.

The history fix is verified. Earlier failed finish run is superseded by the successful final run, not hidden as a pass. No source changes followed the successful final checks; subsequent edits are handover/README documentation only.

Delivery status: local implementation and agent finishing checks complete. **User's actual final review remains PENDING**, including physical-phone scrolling and performance. No publication performed or authorized.
