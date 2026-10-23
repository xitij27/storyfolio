# Local portfolio preview — The live path

Selected look: **Night operations**, chosen from the working alternatives following Dawit's explicit delegation. Sixteen beats / seven chapters / 17.75 screen heights. All six selected work items have their own detail page. Approved wording: A opening and A closing, verbatim.

From this folder:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run build
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. `/wording` archives the six complete wording alternatives and records A / A as selected. Query parameters do not change the finished story.

Chapter links and ordinary header navigation jump through the page; the phone chapter menu works without JavaScript. The database model follows scrolling or five direct stage buttons. Follow scroll restores scroll-driven operation. Reduced motion steps between settled states. No-JS/no-WebGL views use complete HTML and original local diagrams. Canvas takes no pointer input.

All six work pages, `/cv`, the self-contained printable `/dawit-bekele-cv.html`, share preview, icon and useful 404 are available. The CV prints to two A4 pages. Metadata's localhost origin is intentional; there is no production domain or publication.

Nothing is published and no extra skill or asset is installed/downloaded. Contact is a mailto link only. Stop the preview with Ctrl+C.

## Final checks and review

130 unit tests, TypeScript, lint and production build passed. All eight browser cases passed across batches; aggregate evidence is `checks/finish-summary.json`. Supporting-page checks passed. Final evidence and remaining limitations are recorded in `../docs/story/handover.md` and mirrored in `docs/story/handover.md`. Automated phone screenshots are not Dawit's actual phone scroll review. That review remains pending by explicit instruction.

To repeat the checks with a locally available Chromium:

```bash
npm test
npm run typecheck
npm run lint
NEXT_TELEMETRY_DISABLED=1 npm run check -- --jobs=2
```

The full matrix builds once, then checks desktop, short screens, phone, reduced motion, no WebGL, no JavaScript, context loss and failed lazy loading. `scripts/check-chapters.mjs` checks the supporting pages and downloads against a production build. This environment's cached browser requires the paths documented in the handover; no browser or skill download was performed during the finishing pass.
