# Decisions made without asking

- Keep all work local; no publishing, hosting or external asset services. Reason: user's instruction. Change only on explicit request.
- Use available storyfolio guidance and browser tooling; no helper skill installation. Reason: bundled engine and existing browser permit this build; remote helper catalog is source metadata, not installed/enabled capabilities. Change by user enabling a suitable helper later.
- Preserve supplied SVG sources and their explanatory status. Reason: license/provenance instructions. Record any later derivatives.

- Use site/ as the self-contained Next.js project; preserve source materials and story records at workspace root. Change by moving the folder and retaining docs.
- Reuse local npm cache only. npm ci --offline succeeded; no dependency download or new skill installation.
- Use six explanatory modules for each sketch, not a literal number of device components or samples. Reason: tangible repeatable object with clear transformations; change in formation/Piece definitions after concept selection.
- Give sketches a common neutral system-font appearance, so concept selection compares object/story structure; final appearance is a later skill stop.
- Disable Next telemetry for local checks/start commands after default dev process attempted blocked telemetry. All preview requests remain loopback.
- Preserve original local SVGs unchanged in site/public/assets. No derivative yet. MIT supplied terms, coordinator authorship/date and accessible descriptions are retained from asset-notes.md.
- Hide the Next development indicator because its default bottom-left position covered email/ending links on phone sketches. Set devIndicators false; restore in next.config.ts for debugging if needed.
- Preload a local-only fetch guard in dev script to stop automatic version checks; use .env.local to disable telemetry and lockfile registry patching. These prevent development tooling from fetching external URLs; no legal/security guarantee is implied. Remove only if user authorizes network services.

## Storyboard decisions — 13 October 2026

- Selected the bring-up fixture under the user's instruction to choose our recommendation. Reason: Ada built the fixture; code/access/observation/evidence limits are direct to her work. Change before storyboard approval by choosing another concept.
- Proposed a 10-beat, 12-screen story across six checklist chapters. Reason: one project and limited available evidence do not justify 12–22 beats; shorter structure requires storyboard approval. Change screen heights/count in storyboard before implementation.
- Proposed system-ui page type and ui-monospace labels, ordinary chapter/site links, one standalone project route and matched readable/downloadable printable HTML CV. Reason: local availability, access without scene and user's scope. Paths and type are adjustable without altering facts.
- Proposed own static fixture SVG, local share-preview PNG and icon, with accurate explanatory labels/provenance. Reason: no actual photo or trace is available. Change assets only within user's local-asset authorization.
- Appearance studies will be Warm bench, Instrument dark and Clean lab; none is selected. Final wording waits for its later user choice.
