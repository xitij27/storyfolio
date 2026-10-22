# Ada Mensah — local embedded firmware portfolio

Current stage: Workbench selected by user delegation. All nine approved beats (ten screen heights) are built, with Mosslink page, corrected HTML CV/download, navigation, local share preview/icon and404. Opening/closing wording awaits user choice; main page previews A/A provisionally. This is not final user acceptance.

## Run locally

Node22.18+ with native TypeScript support. Dependencies were installed offline from supplied cache; no additional skills, assets or fonts downloaded.

```bash
cd site
NEXT_TELEMETRY_DISABLED=1 npm run build
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

- Light workbench: http://127.0.0.1:3000/?look=light
- Dark instrument bench: http://127.0.0.1:3000/?look=dark
- Complete wording review: http://127.0.0.1:3000/wording
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

Evidence: `../checks/chapters-final-matrix/` for the full nine-beat matrix; `../checks/chapters/` for full-story transitions and exact whole-beat wording checks; earlier `../checks/spine/` retains supporting-page/download/print/keyboard evidence. A PDF may exist there solely as internal browser-print verification output; it is never offered as a CV download. Review results and limitations are recorded in handover. Real-phone performance and final user review are not inferred from headless software rendering.

Next: select one opening and one closing from `/wording` (or provide replacement wording). Apply selected complete beats word for word, run final acceptance as appropriate, and record actual user review. Publishing remains outside this task.
