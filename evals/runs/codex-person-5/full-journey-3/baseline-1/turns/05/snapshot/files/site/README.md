# Dawit Bekele — local portfolio

One continuous 3D sheet introduces Dawit's migration work in seven scroll chapters. Six work buttons open native detail dialogs. The complete story remains available as ordinary HTML without JavaScript or WebGL.

## Run locally

Dependencies are already installed. From this directory:

```bash
npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. To serve the production build:

```bash
npm run build
npm run start -- --hostname 127.0.0.1
```

Nothing is deployed. No email is sent by the site; its contact links open a mail application.

## Pages

- `/` — the sheet story, retained Night look and Swing movement.
- `/cv` — printable CV with a browser Print / Save as PDF instruction.
- `/cv/download` — self-contained downloadable HTML CV, using the same confirmed content as the page.
- `/review/words` — six whole-beat wording candidates for review. They are not applied to the live story until chosen.
- `/preview?look=daylight&move=swing` — whole-site look/movement previews. Looks: `night`, `daylight`, `blueprint`. Moves: `swing`, `fold`, `slide`.
- Any missing address — custom 404 with links back to the work and contact.

System fonts and original local geometry only. Share cards, their alt text and the icon live in `app/`; no external visual assets are used. Metadata has a localhost origin for this local build. No production domain or hosting choice has been made.

## Content and decisions

`content/person.ts` contains the story facts and six work pieces. `content/site.ts` selects the world appearance, captions and CV route. `content/cv.ts` is shared by the printable page and standalone download. `content/wording.ts` contains the unselected opening/closing candidates.

The canonical source-backed facts, approvals, storyboard, remaining decisions and handover live in the workspace's `../docs/story/` directory.

## Validation

```bash
npm test
npm run typecheck
npm run lint
```

`npm run check` builds and checks desktop/phone scenes, no-JS/no-WebGL text and local page links. In this workspace, use the already cached browser without downloading one:

```bash
CHROMIUM=/tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell npm run check
```

From the workspace root, `node scripts/check-cv.mjs` checks the downloaded CV against the page, no-JS access, printing and the wording review. `node scripts/review-looks.mjs` captures the whole story in all three looks, tests movement in both directions and verifies share assets/icon/404. Both use the production build and the cached browser; reports/screenshots are in workspace `checks/`.

Wording can also be reviewed in the actual sheet story, for example `/preview?opening=A&closing=A`. Choose A/B/C independently for each; add `#contact` to start at the closing beat. These query parameters preview text only and do not alter the live draft. From the workspace root, `node scripts/check-review.mjs` checks the exact candidate text, short screens and keyboard access to all six dialogs.
