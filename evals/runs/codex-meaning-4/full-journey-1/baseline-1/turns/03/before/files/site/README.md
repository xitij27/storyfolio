# Ada Mensah — local portfolio concept studies

This is a runnable concept comparison, not the finished portfolio. Facts and decision records live in `../docs/story/`. The user has not selected a concept or approved a storyboard yet.

## Run locally

Node 22.18+ with native TypeScript support is required. Dependencies are installed from the supplied local npm cache; no additional skills or external assets were installed.

```bash
cd site
NEXT_TELEMETRY_DISABLED=1 npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000 for the comparison, then:

- http://127.0.0.1:3000/sketch/fixture
- http://127.0.0.1:3000/sketch/sensor
- http://127.0.0.1:3000/sketch/harness

A production build has also been checked. To serve that build without the development tooling:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Build anew with `NEXT_TELEMETRY_DISABLED=1 npm run build` after edits. All fonts and geometry are local. No publishing or mail sending is configured. Email links use the explicitly approved example address.

## Scope and next decision

Each sketch contains three scroll poses and complete HTML captions, plus no-JavaScript/no-WebGL fallback text. The provisional appearance is shared so the choice concerns the story/object. The original engine's home-page acceptance matrix targets its old fixture content and is not the concept-sketch acceptance report. Focused sketch browser probes and captures are in `../checks/concepts/`; full final-site acceptance comes after the approved build.

Still to build after concept and storyboard decisions: full chapters, selected looks and wording, Mosslink project page, downloadable printable corrected HTML CV, navigation, local share-preview image and metadata, site icon, and useful 404. No second project, testimonials, blog, forms, chat, translation, employer/dates or invented measured results.

The two supplied SVG originals remain at `../public/assets/` and have not been modified or used as actual evidence. Concept geometry is authored in `content/sketches/concepts.tsx` and is expressly explanatory, not recovered hardware, wiring, firmware or data. Engine and supplied drawings are MIT licensed; see engine provenance in the skill and original asset notes in `../material/asset-notes.md`.
