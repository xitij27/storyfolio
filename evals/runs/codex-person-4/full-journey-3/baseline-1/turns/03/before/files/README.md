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

A single sheet folds through Dawit's introduction, places, education, career, methods, six work items and contact. Work cards open explanations. On narrow screens, scrolling pans across each wide sheet during its chapter. This is the concept review, with the engine's provisional night appearance.

Confirmed sources and answers: `docs/story/facts.md`.
Concept reasoning and pending choice: `docs/story/concepts.md`.
Current state and checks: `docs/story/handover.md`.

Next decisions are the world, whole-page storyboard, look and wording. Requested printable/downloadable HTML CV, share preview, site icon and useful missing-page design remain in the build scope. They are not represented as finished in this concept preview.

## Checks

From `site/`: `npm test`, `npm run typecheck`, `npm run lint`, `npm run check`.

In this workspace, use `CHROMIUM=/tmp/chromium npm run check` to reuse the existing browser without downloading one. The production check owns its local server and writes reports and screenshots under `site/checks/site/`. No browser or external asset was downloaded for this site.
