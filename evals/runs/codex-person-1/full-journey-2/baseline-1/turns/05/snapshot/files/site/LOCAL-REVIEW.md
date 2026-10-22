# Review Dawit's local portfolio

All 15 approved beats / seven chapters are built in selected Paper/daylight. Five work pages, printable/downloadable HTML CV, own share preview/icon and useful real 404 are complete. Opening/closing wording is provisional: three complete alternatives await the user's choice. Final user review and full Finish acceptance remain pending.

From site/:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Current production build exists. After source changes, run `NEXT_TELEMETRY_DISABLED=1 npm run build` before start. Alternatively use `NEXT_TELEMETRY_DISABLED=1 npm run dev -- --hostname 127.0.0.1`. Run one server per port. Browser test runners stop their own server; no persistent preview server is claimed.

- Story: http://127.0.0.1:3000/
- Three complete opening/closing alternatives: http://127.0.0.1:3000/review/wording
- Whole-site draft pair previews: /?words=a, /?words=b, /?words=c
- Optional Desk look: /?look=dark
- Five work details: /work/migration, /work/database-upgrade, /work/runbook, /work/ferry, /work/talk
- Printable CV: /cv; self-contained download: /dawit-bekele-cv.html
- Share image: /share-preview.png; site mark: /icon.svg
- Missing-page example: /work/missing
- Original concept comparison: /concepts

Recommend A opening + A closing; choose independently, mix, or supply your own words. Every comparison includes the surrounding proof, glossary, links, labels and fixed following library beat. Exact drafts and pending decision are in ../docs/story/wording.md, sourced from content/wording.ts. No choice has been inferred from the provisional A default.

Scroll opens one bound runbook and folds different labelled illustrative subjects from it. Ordinary navigation reaches all seven chapters without completing animation. Five summaries open standalone local pages; return links target their own beats. Migration has Forward/Return/Follow scroll controls, including reduced motion; its detail has a static controllable equivalent. Database detail expands a generic cutaway without guessed technical claims. Pause 3D exposes own static illustrations. Reduced motion stays still at rest. No-JS/WebGL retains HTML, illustrations, navigation and CV. Phone chapter disclosure is native HTML. No actual employer diagram, document, slide or command is reproduced.

CV facts share content/cv.ts. Regenerate with `node scripts/generate-cv.mjs`. Drawings: `python3 scripts/generate-illustrations.py`. Share/icons: `python3 scripts/generate-brand.py` (installed Pillow/system font; no downloads). Wording review Markdown: `node scripts/generate-wording-review.mjs` (currently writes pending decision; preserve actual future choice before regeneration). Print with CV button or browser Print. Downloaded CV is standalone HTML with embedded CSS, no JS/assets.

Everything stays local. No deployment, external repository, public domain/canonical, analytics, external font, visual download, additional skill installation or mail sending. Metadata stays noindex; localhost metadataBase only resolves local share assets. Publishing/legal/hosting details remain outside this task.

## Check evidence and limits

Production build, typecheck and lint pass; 129 tests pass. checks/chapters-final/manifest.json records SIX SELECTED passing browser cases: light-wide, light-short, light-phone, light-no-webgl, no-js, failed-extra. They cover all 15 beats with no overflow, duplicate IDs, late shaders, browser errors or external requests. This is not a completed full-matrix acceptance run.

checks/chapters-functional/report.json records 15 passing checks after the last source change: controls visibly work, reduced-motion stillness, pause/static, all five work routes/images/return navigation, database cutaway, exact three draft pairs, comparison desktop/phone, mobile navigation, standalone CV/print, real404, share/icons/noindex and no-JS phone/detail access. errors=[] and external=[].

Transition captures cover all 14 transitions both directions: chapters-transitions captured every forward and reverse10–13 before tool interruption; chapters-transitions-back-early completed reverse0–9. Do not claim the interrupted program completed. Contact sheets in checks/chapter-review were visually inspected, alongside settled states, work pages, share image and wording comparison. Software Chromium does not establish real-phone frame rate.

Next: record actual wording choice, apply verbatim, complete Finish checks with accurate scope, then record the user's actual local review. Root ../docs/story/handover.md carries current continuation; earlier spine evidence is historical.
