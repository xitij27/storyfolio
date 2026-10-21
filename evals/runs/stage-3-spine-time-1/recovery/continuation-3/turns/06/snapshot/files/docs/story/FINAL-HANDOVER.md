# Ada Mensah — local site handover

The approved portfolio uses the bring-up fixture concept, Aluminium finish, and Opening A / Closing A. The fixture connects Ada’s firmware decisions to physical observation without implying access to an unavailable photograph or current trace. One ten-beat scroll story spans five chapters and 11.5 screen-height units. Publishing is outside this task.

## Run locally

```bash
cd site
npm run local
```

Open **http://127.0.0.1:3000/**. The launcher binds to loopback and serves the production build, building if none exists. Stop it with Ctrl-C. Dependencies and the checked build are already present. After editing source, stop the preview, run `npm run build`, then restart `npm run local`. Use `npm run dev` for development.

If a dependency reinstall is needed in this environment, use `npm ci --offline --cache /tmp/storyfolio-npm-cache --no-audit --no-fund`. Node 22.18+ is required; the checked runtime is 22.22.1. No additional skill, external asset or browser download is required here.

## What is included

- `/`: the full scroll story, native chapter navigation, email link and CV download.
- `/projects/mosslink`: Mosslink’s own project page, role boundaries, labelled explanations and evidence limits.
- `/cv.html`: corrected, printable HTML CV, downloadable as `Ada-Mensah-CV.html`.
- `/icon.svg`, `/icon.png`, `/opengraph-image.png`: local icon and share art; root and project metadata include the preview.
- Unknown paths: HTTP 404 with useful recovery links.
- `/wording`, `/concepts`, `/sketch/fixture`, `/sketch/sensor`, `/sketch/loom`: local decision archives outside the main navigation. `/wording` records A + A as selected.

English, system fonts, local drawings and original explanatory geometry only. Text remains available without JavaScript or WebGL; reduced motion uses settled poses. A lost graphics context retains the readable HTML story.

## Edit and maintain

`site/content/story.ts` defines beats; `copy.ts` holds chosen words; `formations.ts` and `faces.ts` define object poses and face labels; `looks.ts` holds the selected look. `site/content/fixture/piece.tsx` defines the solid geometry. Supporting pages are in `site/app/`; the CV is `site/public/cv.html`. Update the CV separately when approved facts change. Asset provenance and teaching-diagram derivatives are documented in `site/public/assets/README.md`.

Canonical planning and decision notes are in `docs/story/`, mirrored to `site/docs/story/`. The detailed handover preserves earlier stages as history; this file describes the final delivery. The Git repository is local to `site/`, with no publication or push performed.

## Verification

Passed: fresh production build; all 129 unit tests; typecheck; lint; full seven-case browser matrix (eleven resumable jobs covering every ten-beat position required by the matrix). Cases: wide, short viewport, emulated phone, reduced motion, no WebGL, no JavaScript and graphics-context loss. Reduced motion includes stationary-pixel checks at start/mid/end. All jobs passed with zero reported problems against the same source and build.

Supplemental browser checks passed for root, Mosslink, CV, selected-wording archive and true 404; icon/share image/local drawings; exact selected headings; five chapter links; actual HTML CV download; keyboard skip link and visible focus. No external requests were observed.

Evidence: `site/checks/final-acceptance/manifest.json` (`complete: true`, `freshBuild: true`), per-job reports and screenshots, `site/checks/finish-pages/report.json`, and test/typecheck/lint logs in `site/checks/finish/`. Every final matrix capture was opened through labelled contact sheets in `site/checks/final-sheets/`, plus all seven supplemental page captures, including initial phone, project and print styles. No obscuring overlap found at settled poses; ordinary scroll-entry captures may show partially entering captions. Small geometry labels remain supplementary.

Build ID: `aLei9RNdWMe8tqzbRwWIR`. Source SHA-256: `b7618fbd30e7171108130666e98b67b4e0c842d1ae1b2267d1781af4cc50e11c`. Earlier interrupted diagnostics remain historical; this final manifest is the acceptance record.

Automated browser checks use cached Chromium and software WebGL, not a real phone. In this environment set `PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache` and `LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu` for browser scripts.

## Remaining limitations and pending review

**Actual final user review is pending.** The user explicitly said this request does not confirm that they have scrolled the finished site on a phone. Headless screenshots and mobile emulation do not establish real-device scrolling comfort or frame rate, nor cross-browser behavior on Safari/Firefox. No such user review or performance result is claimed.

The object and SVGs are labelled explanations. There is no fixture photograph or publishable current trace; the teaching state loop claims no durations or current values. Small physical labels supplement the full HTML wording. The radio-awake observation has no confirmed cause, fix, timing or later resolution.

The two-year figure is a bench-based projection with an assumed reporting cycle; the longest observed run was 72 hours. No field endurance or weather testing supports it. Six of forty engineering samples were bench tested, none went to customers. One preliminary emissions check passed; the full programme is unfinished. The site and CV preserve those limits and the colleague’s PCB/analogue contribution. Employer and employment dates are omitted.

`ada@example.com` is the user-approved example mailto link; no message was sent or delivery tested. The CV is HTML, not an invented PDF. Share metadata and image availability are checked locally; public crawler behavior, domain, hosting, legal and jurisdiction details await an explicit publishing decision. No publication or legal-compliance claim is made.
