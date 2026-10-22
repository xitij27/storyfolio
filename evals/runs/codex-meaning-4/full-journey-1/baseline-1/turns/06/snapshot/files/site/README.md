# Ada Mensah — local embedded firmware portfolio

Current stage: local build and finishing checks complete. The selected Workbench look and all nine approved beats are built, with Mosslink page, corrected HTML CV/download, navigation, local share preview/icon and 404. Opening A and closing A are approved and applied unchanged. Actual final user review, including physical-phone scrolling, remains explicitly pending. Publishing is outside this task.

## Run locally

Node22.18+ with native TypeScript support. Dependencies were installed offline from supplied cache; no additional skills, assets or fonts downloaded.

```bash
cd site
NEXT_TELEMETRY_DISABLED=1 npm run build
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

- Light workbench: http://127.0.0.1:3000/?look=light
- Dark instrument bench: http://127.0.0.1:3000/?look=dark
- Wording decision history: http://127.0.0.1:3000/wording
- Project: http://127.0.0.1:3000/projects/mosslink
- View/print CV: http://127.0.0.1:3000/cv
- Download standalone HTML: http://127.0.0.1:3000/downloads/ada-mensah-cv.html
- Original alternatives: /concepts and /sketch/fixture, /sketch/sensor, /sketch/harness

The appearance switch preserves scroll, fragment and unrelated URL parameters. System fonts and local explanatory geometry/drawings only. No publishing, email sending, analytics, external asset services or contact backend. Metadata uses a loopback origin and noindex/nofollow for this unpublished version; public-domain metadata waits for a separate publication decision. Local metadata/image checks do not establish live social-platform preview fetching.

## Sources and implementation

Fact sheet, selected concept, approved storyboard, decisions, asset provenance and handover are in `../docs/story/`. Public claims follow the user's confirmation section of facts.md. Employer/dates and unconfirmed outcomes are omitted from pages and CV.

The main scene is eight solid fixture bars, with five socket motifs per bar. Nested physical frames open into8×5 rows with exactly six filled centers and return to the same assembly. Geometry is explanatory, not the actual fixture or its capacity. All claims remain ordinary HTML, with static figures when the scene is unavailable.

`content/profile.ts` provides shared CV/project evidence text. `content/cv-document.ts` produces the standalone HTML download with embedded print CSS. The browser CV and download offer HTML, not a PDF. Private materials are outside the app public directory. The two supplied SVGs are unchanged; asset provenance/terms/accessibility descriptions are recorded in assets.md.

## Checks

```bash
npm test
npm run typecheck
npm run lint
npm run check
```

The check command builds a fresh production app and starts/stops its own local server. In this environment use the supplied browser cache/library paths (see handover); no browser installation is required. Current story contract is all nine approved beats across five chapters, totaling ten viewport heights. The old starter overlay/lazy-extra probes have been removed because this site uses ordinary HTML links and one fixture object.

Evidence: `../checks/finish-matrix/manifest.json` records a fresh complete production build and full **13/13 passing browser matrix**, including both looks, desktop/phone viewports, reduced motion and fallbacks. Final screenshot contact sheets were visually inspected. `../checks/finish-support/` records project/CV/404, HTML download, metadata/assets, exact approved wording and keyboard checks. All 129 automated tests, typecheck and lint passed. `npm run check -- --jobs=3` optionally runs independent browser cases with bounded concurrency.

See `../docs/story/handover.md` for runtime browser paths, evidence, editing locations and limitations. A PDF in checks is internal print verification only; the CV download is standalone printable HTML. Real-phone performance and actual final user review are not inferred from automated viewport checks. Public metadata origin, hosting and legal decisions remain outside this local task. Prior handover history is preserved in `../docs/story/history.md`.
