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
