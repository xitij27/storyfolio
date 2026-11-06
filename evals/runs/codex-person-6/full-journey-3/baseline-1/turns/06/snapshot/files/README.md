# Dawit Bekele — local portfolio

Working local portfolio: one continuous 3D sheet, seven chapters and six work-item dialogs. Blueprint + Slide, with the selected version A opening and closing. Nothing is published.

## Run locally

From this workspace:

```bash
cd site
npm run start -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. For editing, stop that server and run `npm run dev -- --hostname 127.0.0.1`. Rebuild with `npm run build` before starting the production server after changes.

Dependencies are already installed from the local npm cache. No external fonts, photographs, screenshots or downloaded slides are used.

## Decisions and remaining work

Source facts and corrections: docs/story/facts.md. Accepted world: docs/story/concepts.md. Current state and checks: docs/story/handover.md.

World and storyboard accepted. Blueprint + Slide selected. Six work dialogs, printable/downloadable HTML CV, local share image/metadata, SVG icon and useful custom 404 are built. Version A opening and closing are applied. Actual final user review, including scrolling on a phone, is explicitly pending; see docs/story/review.md for limitations.

## Choose appearance and movement

Open http://127.0.0.1:3000/review for the local comparison. Every combination opens the full seven-chapter sheet story. Night, Daylight and Blueprint are available with Slide, Fold or Swing. Blueprint + Slide has been selected and applied. Opening/closing alternatives are retained at /wording as an archive; version A is selected for both.

## Review and documents

- /wording — three whole opening and closing beat alternatives, with links to scroll each. A is selected for both; alternatives are archived for reference.
- /cv — printable HTML CV; Print CV opens browser printing. Download HTML CV returns a standalone document with embedded CSS and no JavaScript/assets.
- /share.png and /icon.svg — locally created sharing image and site icon. Social metadata currently resolves to a local address; a real domain is a publishing decision.
- Unknown paths return a useful 404 with links to Home, Work, Contact and CV.

No mail is sent by this app. The contact action is a mailto link. No publishing, trackers, remote fonts, asset downloads or additional skills.

## Finishing checks

Run from site/: `npm run typecheck`, `npm run lint`, `npm test`, `npm run check`. Browser tooling in this environment needs the installed headless-shell path; exact commands and final report paths are in docs/story/handover.md. `scripts/finish-review.mjs` checks the final wording and navigation plus desktop/phone/short-screen story poses; `scripts/details-review.mjs` checks dialogs, CV download/print and local metadata/assets.

Actual user review remains pending. Software-rendered phone-sized checks do not establish performance or acceptance on a real phone. Publication and external social-card crawler testing are outside this task.

Final verification: typecheck/lint pass, 187 tests pass, production browser matrix 0 problems. Finishing review captured 92 story poses at desktop/phone/short sizes; selected wording, reduced-motion stillness and Back/Forward pass. CV/dialog/metadata/404 checks pass. Final reports and limitations: docs/story/handover.md; actual user review remains pending in docs/story/review.md.
