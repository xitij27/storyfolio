# Local site handover — 22 October 2026

The requested local build and finishing checks are complete. **Actual final user review remains pending**, explicitly including scrolling the finished site on a physical phone. This is not final user acceptance. Publishing is outside this task.

## What was chosen and built

The selected fixture concept carries one continuous scroll story: eight solid explanatory fixture bars change arrangement across nine beats in five chapters. It connects firmware, observation and the limits of a claim. The chosen Workbench look uses a warm light ground, charcoal type and matte green geometry; the optional Instrument bench look remains available. The concept and look decisions and reasons are in concepts.md and decided-for-you.md.

The user approved the storyboard and then delegated the recommended wording: **opening A and closing A**. Both complete beats are applied word for word. The provisional review label has been removed. wording.md records the exact choices; /wording retains the alternatives as local decision history.

Included: the complete story, Mosslink project page, printable CV page, standalone downloadable HTML CV, ordinary navigation, keyboard skip link and beat anchors, local share image and icon, and useful 404. No-JavaScript and no-WebGL versions retain the story in HTML and labelled explanatory figures. Reduced motion uses stationary poses. System fonts, supplied local drawings and original explanatory geometry only.

## Run and use

From the workspace root, with Node 22.18 or newer:

```bash
cd site
NEXT_TELEMETRY_DISABLED=1 npm run build
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

The production build already exists. The final command alone restarts it until source changes require rebuilding. Keep its terminal running; Ctrl+C stops that server.

- Story: http://127.0.0.1:3000/
- Project: http://127.0.0.1:3000/projects/mosslink
- View / print CV: http://127.0.0.1:3000/cv
- Download HTML CV: http://127.0.0.1:3000/downloads/ada-mensah-cv.html
- Optional appearance: /?look=dark (default is Workbench)

Use the browser Print command on the CV or downloaded HTML. No public PDF is offered. The example email link is mailto:ada@example.com; no mail was sent.

## Final verification

- 129 automated tests passed; typecheck and lint passed.
- Fresh production build and **full 13/13 browser matrix passed**, exit 0. This is a completed full run, superseding earlier interrupted/scoped runs. checks/finish-matrix/manifest.json records scope, settings and results. Optional --jobs=3 bounded independent browser cases; no cases were omitted.
- Matrix: both looks at 1440×900, 1280×720 and 390×844; reduced motion; no WebGL; no JavaScript; WebGL context loss; appearance switch and browser Back preserving reading position, hash and unrelated parameters. All nine beats checked. Wide/reduced cases include start/middle/end captures. Final screenshot contact sheets were opened and inspected for overlap, clipping, framing and legibility; no unresolved defect was found in these captures.
- checks/finish-support/support-results.json and check.mjs record supporting checks: project/CV/404 with and without JavaScript, page metadata and assets, browser HTML download and attachment headers, approved wording in rendered HTML, stable anchors, keyboard skip and clear navigation at phone/desktop widths. Passed. Supporting-page and print screenshots were inspected.
- A browser-generated PDF in checks/finish-support is internal print-test output only. The print-media screenshot was visually inspected; PDF pages were not independently raster-audited.

Repeat the standard checks from site with npm test, npm run typecheck, npm run lint and npm run check. For this runtime's supplied browser installation, use:

```bash
PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache \
LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu \
NEXT_TELEMETRY_DISABLED=1 npm run check -- --jobs=3
```

The check builds and starts/stops its own local server. No browser or skill installation is needed in this runtime. The README documents basic operation; earlier verification history is preserved in history.md and older checks directories.

## Remaining limitations and review

**Actual final review is pending at the user's explicit request.** Automated phone viewport checks and software-rendered headless browser captures do not establish physical-phone scrolling comfort, GPU behaviour, frame rate or performance. No real-device performance claim is made.

Public facts follow facts.md's User confirmation section. Employer and employment dates are omitted from the site and CV. The two-year battery figure is a projection from bench currents and an assumed reporting cycle; the longest run is 72 hours. Six of forty assembled samples were bench tested; none went to customers. The emissions result is one preliminary check with qualification unfinished. The radio-awake observation has no confirmed cause, fix, timing or resolution.

The fixture photograph, actual current trace, original hardware model and underlying measurement records are unavailable. The fixture geometry and two supplied drawings are labelled explanations, not photographs, actual wiring, firmware or measured results. Sleep → Measure → Transmit is a teaching sequence without claimed durations or current values. These are user-confirmed facts, not independently verified lab evidence. The colleague's circuit drawing is excluded.

ada@example.com is a public example address. The mailto destination was checked structurally; delivery was not tested. Metadata uses a loopback origin and noindex/nofollow. The share image and markup work locally; an external social platform cannot fetch this loopback site. Public domain/canonical URLs, hosting, legal and jurisdiction details await a separate publishing decision. No legal-compliance claim is made.

No publishing, deployment, external asset purchase/download, analytics, email sending or contact backend was performed. No further user decisions are needed to run this local version. Final user review and any future publishing decision remain separate outstanding steps.

## Where to edit

- site/content/wording.ts: approved opening/closing copy.
- site/app/page.tsx: full story; site/content/profile.ts: shared project/CV evidence.
- site/content/cv-document.ts: standalone printable HTML download.
- site/content/experience.tsx and site/components/story/: scene and scroll engine.
- site/app/globals.css: appearance and responsive layout.
- docs/story/facts.md, assets.md, storyboard.md and decided-for-you.md: factual boundaries, provenance, script and decisions.

Keep the factual qualifications beside their claims when editing. material/ is private source material and is not served by the app.
