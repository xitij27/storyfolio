# Dawit Bekele — local portfolio

One scroll-driven 3D map introduces Dawit's places, education, career, methods and six work items. Night appearance and the existing wording are retained. Everything stays local; nothing has been published.

## Run locally

```sh
cd site
npm run dev -- --hostname 127.0.0.1
```

Dependencies are already installed. On a fresh copy, run `npm ci` inside `site/` first. Open http://127.0.0.1:3000.

For a production preview, run `npm run build`, then `npm start -- --hostname 127.0.0.1` inside `site/`.

## Pages

- `/`: the complete map story, ordinary navigation, six clickable work windows, keyboard controls and a Read text option.
- `/cv`: printable HTML CV. Use the print button or your browser's Print command; the browser can save a PDF.
- `/downloads/dawit-bekele-cv.html`: downloadable self-contained HTML CV, including print styles, usable without the site or a server.
- `/wording`: optional comparisons of three complete opening/closing beats, with links to scroll their previews. No recommendation is silently applied.
- Any missing address: a real 404 with useful links.

The map's images are illustrations drawn locally. No employer screenshots, photos, slides, testimonials, form, chat, blog, analytics or external font service are included in the requested story. The public example contact is `dawit@example.com`; the site only links to it.

## Decisions and handover

- `docs/story/facts.md`: sources and Dawit's confirmations.
- `docs/story/concepts.md`: original proposal and recorded map selection.
- `docs/story/storyboard.md`: approved script and feature scope.
- `docs/story/words.md`: current wording and optional alternatives.
- `docs/story/decided-for-you.md`: implementation choices and how to change them.
- `docs/story/handover.md`: current status, checks and next review.

## Checks

Inside `site/`:

```sh
npm test
npm run typecheck
npm run lint
CHROMIUM=/tmp/chromium npm run check
CHROMIUM=/tmp/chromium npm run check:portfolio
```

`check` creates a fresh production build and checks desktop/phone rendering and no-JavaScript/no-WebGL content. `check:portfolio` uses that production build and checks keyboard dialogs, navigation, phone/short-screen transitions, context loss, wording previews, CV print/download/offline use, share metadata and 404 behavior. Both own their local test servers. Reports/screenshots are under `site/checks/`.

The existing `/tmp/chromium` is used in this workspace; no browser download was needed. The share PNG was generated locally with already installed system fonts, and the icon is original SVG geometry/text.

Publishing, hosting, legal details and the final public metadata base/canonical URL remain outside this task. Share image and metadata are implemented and locally inspectable; an external social service cannot crawl a local-only site.
