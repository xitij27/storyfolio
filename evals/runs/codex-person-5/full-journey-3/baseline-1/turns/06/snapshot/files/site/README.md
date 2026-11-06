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
- `/review/words` — selected opening A and closing A, with B/C alternatives retained for comparison.
- `/preview?look=daylight&move=swing` — whole-site look/movement previews. Looks: `night`, `daylight`, `blueprint`. Moves: `swing`, `fold`, `slide`.
- Any missing address — custom 404 with links back to the work and contact.

System fonts and original local geometry only. Share cards, their alt text and the icon live in `app/`; no external visual assets are used. Metadata has a localhost origin for this local build. No production domain or hosting choice has been made.

## Content and decisions

`content/person.ts` contains the story facts and six work pieces. `content/site.ts` holds the selected whole-sheet appearance, exact approved opening/closing text and CV route. `content/cv.ts` is shared by the printable page and standalone download. `content/wording.ts` preserves A/A and the comparison alternatives.

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

Wording can also be compared in the actual sheet story, for example `/preview?opening=A&closing=A`. Set A/B/C independently for each; add `#contact` to start at the closing beat. These query parameters preview text only and do not alter the selected live wording. From the workspace root, `node scripts/check-review.mjs` checks the exact approved text, alternatives, short screens and keyboard access to all six dialogs.

The engineering checks are recorded in `../docs/story/handover.md`. The owner's actual final review on a phone remains explicitly pending; browser emulation is not a real-device performance measurement. Publishing is outside this task.

The local stage has one small accessibility correction: reduced motion freezes idle animation as well as eased transitions. `node scripts/check-finish.mjs` (from the workspace root) verifies normal-motion transitions in both directions, reduced-motion stillness, share/icon assets and HTML recovery after a lost WebGL context.
