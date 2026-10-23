# Local appearance preview — The live path

The approved storyboard is being built in stages. The current site has a working opening/library origin, orders-database cutover and contact ending, in three looks. Choose the look before the remaining chapters are built. Opening/closing text is provisional until the wording choice.

From this site folder:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run build
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. Appearance links:

- http://127.0.0.1:3000/?look=dark — Night operations (recommended)
- http://127.0.0.1:3000/?look=light — Day inspection
- http://127.0.0.1:3000/?look=warm — Warm console

Use the on-page appearance buttons to change looks without losing scroll position. Ordinary Work and Contact links jump through the story. The database cutover follows scrolling; five stage buttons let you inspect it directly. “Follow scroll” restores the scroll-driven mode. With reduced motion, the scene changes between settled poses. Without JavaScript or WebGL, text and original local diagrams remain.

The orders-database detail page, printable downloadable HTML CV, share preview, icon and useful 404 are implemented. The CV is a self-contained file at /dawit-bekele-cv.html and prints to two A4 pages. Five other work pages and the background/practice scenes remain for the chapters stage after look selection.

Stop with Ctrl+C. Nothing is published. No remote images, fonts, embeds or other assets are used. The only contact action is a mailto link; no email has been sent. Metadata uses an explicit localhost origin pending a future publication decision.

## Verification

- Unit tests: 130 passed. TypeScript, lint and production builds passed.
- Full current-spine browser matrix: 18/18 cases passed, covering all looks at desktop/short/phone, reduced motion, no WebGL, plus no JS, context loss and appearance switching. Evidence: checks/spine-acceptance.
- Visual review found a short-desktop heading clip; fixed and rechecked all three looks with fresh builds. Evidence: checks/spine-short-fix and checks/spine-short-final. These targeted runs supplement the full matrix.
- Stage controls, bidirectional transition captures, detail page, 404, contact, metadata/assets, CV download/print verified by scripts/check-spine-details.mjs. Evidence: checks/spine-details.
- Visual evidence reviewed through labelled contact sheets and full-size captures. A software-rendered headless browser does not establish actual phone frame performance.

Story records: docs/story. Engine usage: README.md. Comparison image: checks/look-comparison.jpg.
