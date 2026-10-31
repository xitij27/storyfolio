# Dawit Bekele — local portfolio

The running concept is in `site/`. It uses local system fonts and original rendered geometry. Nothing has been published.

## Run locally

```sh
cd site
npm ci
npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. Dependencies are already installed in this workspace; `npm ci` is only needed for a new checkout. For a production preview, use `npm run build`, then `npm start -- --hostname 127.0.0.1`.

## Current review

Dawit chose the map after reviewing the sheet and gallery. One map tells his introduction, places, education, career, methods, six work items and contact. Work cards open explanations. The camera travels between the places and work cards as the reader scrolls. The storyboard is ready for review, with the existing night appearance retained. See its map-placement correctness notes before treating this preview as finished.

Confirmed sources and answers: `docs/story/facts.md`.
Concept reasoning and pending choice: `docs/story/concepts.md`.
Current state and checks: `docs/story/handover.md`.

The world is selected. Next is the whole-page storyboard review, followed by remaining appearance/wording decisions. Requested printable/downloadable HTML CV, share preview, site icon and useful missing-page design remain in the build scope. They are not represented as finished in this concept preview.

## Checks

From `site/`: `npm test`, `npm run typecheck`, `npm run lint`, `npm run check`.

In this workspace, use `CHROMIUM=/tmp/chromium npm run check` to reuse the existing browser without downloading one. The production check owns its local server and writes reports and screenshots under `site/checks/site/`. No browser or external asset was downloaded for this site.
