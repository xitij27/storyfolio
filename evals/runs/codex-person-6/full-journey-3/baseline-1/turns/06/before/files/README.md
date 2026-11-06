# Dawit Bekele — local portfolio

Concept prototype: one continuous 3D sheet, seven chapters, six work-item dialogs. Nothing is published.

## Run locally

From this workspace:

```bash
cd site
npm run start -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. For editing, stop that server and run `npm run dev -- --hostname 127.0.0.1`. Rebuild with `npm run build` before starting the production server after changes.

Dependencies are already installed from the local npm cache. No external fonts, photographs, screenshots or downloaded slides are used.

## Decisions and remaining work

Source facts and corrections: docs/story/facts.md. Proposed concept: docs/story/concepts.md. Current state and checks: docs/story/handover.md.

World and storyboard accepted. Blueprint + Slide selected. Six work dialogs, printable/downloadable HTML CV, local share image/metadata, SVG icon and useful custom 404 are built. Opening/closing words await choice at /wording. Long scene labels and mobile timeline framing remain part of final review.

## Choose appearance and movement

Open http://127.0.0.1:3000/review for the local comparison. Every combination opens the full seven-chapter sheet story. Night, Daylight and Blueprint are available with Slide, Fold or Swing. Blueprint + Slide has been selected and applied. Opening/closing alternatives are at /wording; choosing a preview does not settle the words.

## Review and documents

- /wording — three whole opening and closing beat alternatives, with links to scroll each. A is recommended for both; awaiting the user’s actual wording choice.
- /cv — printable HTML CV; Print CV opens browser printing. Download HTML CV returns a standalone document with embedded CSS and no JavaScript/assets.
- /share.png and /icon.svg — locally created sharing image and site icon. Social metadata currently resolves to a local address; a real domain is a publishing decision.
- Unknown paths return a useful 404 with links to Home, Work, Contact and CV.

No mail is sent by this app. The contact action is a mailto link. No publishing, trackers, remote fonts, asset downloads or additional skills.
