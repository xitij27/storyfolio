# Review Dawit's local portfolio

All 15 approved beats / seven chapters are built in selected Paper/daylight. Five work pages, printable/downloadable HTML CV, own share preview/icon and useful real 404 are complete. The user selected A opening + A closing; those exact words are applied. Final actual user review, including scrolling the finished site on a phone, remains explicitly pending. Technical finishing evidence is recorded below and in handover.md.

From site/:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Current production build exists. If the build is missing or after source changes, run `NEXT_TELEMETRY_DISABLED=1 npm run build` before start. Alternatively use `NEXT_TELEMETRY_DISABLED=1 npm run dev -- --hostname 127.0.0.1`. Run one server per port. Browser test runners stop their own server; no persistent preview server is claimed.

- Story: http://127.0.0.1:3000/
- Three complete opening/closing alternatives: http://127.0.0.1:3000/review/wording
- Whole-site draft pair previews: /?words=a, /?words=b, /?words=c
- Optional Desk look: /?look=dark
- Five work details: /work/migration, /work/database-upgrade, /work/runbook, /work/ferry, /work/talk
- Printable CV: /cv; self-contained download: /dawit-bekele-cv.html
- Share image: /share-preview.png; site mark: /icon.svg
- Missing-page example: /work/missing
- Original concept comparison: /concepts

Selected A opening + A closing, as explicitly requested on 22 October 2026. Every historical comparison includes the surrounding proof, glossary, links, labels and fixed following library beat. Exact selected text and the actual decision are in ../docs/story/wording.md, sourced from content/wording.ts. /review/wording now records the selection; query previews preserve the other alternatives.

Scroll opens one bound runbook and folds different labelled illustrative subjects from it. Ordinary navigation reaches all seven chapters without completing animation. Five summaries open standalone local pages; return links target their own beats. Migration has Forward/Return/Follow scroll controls, including reduced motion; its detail has a static controllable equivalent. Database detail expands a generic cutaway without guessed technical claims. Pause 3D exposes own static illustrations. Reduced motion stays still at rest. No-JS/WebGL retains HTML, illustrations, navigation and CV. Phone chapter disclosure is native HTML. No actual employer diagram, document, slide or command is reproduced.

CV facts share content/cv.ts. Regenerate with `node scripts/generate-cv.mjs`. Drawings: `python3 scripts/generate-illustrations.py`. Share/icons: `python3 scripts/generate-brand.py` (installed Pillow/system font; no downloads). Wording review Markdown: `node scripts/generate-wording-review.mjs` (preserves the recorded A/A choice). Print with CV button or browser Print. Downloaded CV is standalone HTML with embedded CSS, no JS/assets.

Everything stays local. No deployment, external repository, public domain/canonical, analytics, external font, visual download, additional skill installation or mail sending. Metadata stays noindex; localhost metadataBase only resolves local share assets. Publishing/legal/hosting details remain outside this task.

## Check evidence and limits

Production build, typecheck and lint pass; 129 tests pass. checks/finish-summary.json validates complete **14/14 browser matrix coverage across batches** of the unchanged application: both looks wide/short/phone/reduced/no-WebGL; no JS; context loss; look switching/Back; failed chapter loading. Wide/reduced cases include every beat's start/mid/end; reduced cases have90 stationary comparisons. Screenshots/contact sheets were visually reviewed. No overflow, duplicate IDs, late large shaders or unexpected browser errors in the counted passing reports.

This is **not one uninterrupted full acceptance run**. finish-full and the first finish-reduced-1 attempt were externally interrupted; their incomplete manifests stay incomplete. Summary counts only completed passing cases from finish-full, finish-fallbacks, finish-wide, finish-reduced-0, finish-reduced-1-retry and finish-reduced-2. Every counted batch includes a fresh production build; no --skip-build evidence is counted. Explicit beat ranges retain full-page contract checks and their combined sample coverage is verified. Revalidate the evidence with `node scripts/summarize-finish.mjs` (also checks unchanged application source fingerprint).

checks/finish-functional/report.json has **17 passing functional checks**, errors=[] and external=[]. Covers exact selected text, visible model controls/stillness/pause, five work pages and actual Back navigation, cutaway, wording record, mobile menu, keyboard skip/contact focus, narrow/short glossary, actual browser-print invocation, standalone CV download/print styles, real404, share/icons/noindex and no-JS phone/detail access. User mailto was never activated. Raw captures are in those directories; sheets are under checks/finish-visual-review. Earlier spine/chapter evidence is historical. Browser cache and system libraries used by checks are existing local resources; nothing is downloaded.

Actual user review, real-phone performance, Safari/iOS and Firefox checks remain pending. No real printer was tested. Database detail is intentionally brief because only the topic is confirmed. Example email and localhost share URLs remain as authorized; public-domain, legal and hosting decisions are outside this task. No publishing.

Actual final local/phone review stays pending by the user's explicit instruction. ../docs/story/handover.md is the full handover; ../docs/story/final-review.md records the review boundary.

The very tall no-JS phone full-page bitmap repeats near its bottom; use checks/finish-fallback-ending/no-js-projects-talk-phone.png and no-js-contact-phone.png for the actual ending view. Two focused no-JS viewport/anchor checks pass in finish-fallback-ending/report.json. This screenshot artifact is not counted as actual user review.
