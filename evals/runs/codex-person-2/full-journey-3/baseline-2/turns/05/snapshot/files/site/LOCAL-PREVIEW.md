# Local portfolio preview — The live path

Selected look: **Night operations**, chosen from the working alternatives following Dawit's explicit delegation. Sixteen beats / seven chapters / 17.75 screen heights. All six selected work items have their own detail page. Opening and closing wording is provisional pending the requested choice.

From this folder:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run build
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000. Open http://127.0.0.1:3000/wording to compare all six complete opening/closing beats, including surrounding text. `/?words=a`, `/?words=b`, `/?words=c` preview each pair in the actual story. You can choose an opening and a closing independently. Version A is a provisional preview default, not an approved wording decision.

Chapter links and ordinary header navigation jump through the page; the phone chapter menu works without JavaScript. The database model follows scrolling or five direct stage buttons. Follow scroll restores scroll-driven operation. Reduced motion steps between settled states. No-JS/no-WebGL views use complete HTML and original local diagrams. Canvas takes no pointer input.

All six work pages, `/cv`, the self-contained printable `/dawit-bekele-cv.html`, share preview, icon and useful 404 are available. The CV prints to two A4 pages. Metadata's localhost origin is intentional; there is no production domain or publication.

Nothing is published and no extra skill or asset is installed/downloaded. Contact is a mailto link only. Stop the preview with Ctrl+C.

## Current chapter-stage checks

- Unit tests: 130 passed. TypeScript, lint and fresh production builds passed.
- Initial full expanded-story matrix recorded passing phone, reduced-motion, no-WebGL, no-JS and context-loss cases. The long process was terminated before its final failed-extra case completed; its manifest is incomplete and is not a clean full acceptance run. It also found late shader compilation on wide/short screens.
- Fixed the late shader lifetime issue with persistent return-path ports. A fresh targeted run of wide, short and failed-extra passed 3/3, with no late large programs and intact HTML/core scene under intentionally blocked chapter chunks. Evidence: checks/chapters-final-graphics.
- Combined evidence covers all eight matrix capabilities, across runs. This is not represented as a single clean final acceptance run; run final acceptance again after the wording is chosen.
- scripts/check-chapters.mjs passed all six project pages/metadata/diagrams, six complete wording beats, three story wording previews, sixteen story beats, scoped/attributed copy, stage controls, bidirectional transition captures, resize near Contact, CV download/print, 404 and no-JS phone navigation. Evidence: checks/chapters-details.
- Captures inspected through contact sheets and full-size examples. Original scene words stay in HTML to remain legible. Persistent chapter links have an opaque ground so scrolling text cannot overlap them.
- Headless software rendering does not measure real phone frame performance. User's final review remains outstanding.

Read docs/story/handover.md before continuing. Main source record is mirrored from ../docs/story. Root README.md gives a concise project overview; the engine content contract is in this folder's README.md.
