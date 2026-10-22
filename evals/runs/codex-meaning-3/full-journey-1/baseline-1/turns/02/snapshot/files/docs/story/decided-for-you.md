# Decisions made without asking

- Keep all work in this workspace; no publishing or remote assets. Requested by user. Change only on explicit request.
- Preserve supplied drawings; treat them as illustrations, never evidence. Source: material/asset-notes.md. Derivatives must be documented.
- Record disputed claims as questions before designing. Their distinctions change the technical story; update after Ada answers.
- Use available storyfolio engine and local browser tooling; no additional skill installation needed at this stage. Only storyfolio is advertised and locally found as a skill.
- Public copy and CV omit Reedglass and dates per explicit user instruction. Use confirmed contribution descriptions instead of unconfirmed title.
- No extra skills; user declined installation. No remote assets. Use local system fonts.
- Dedicated Mosslink page, printable downloadable HTML CV, navigation, local share image/icon and missing-page route are required final deliverables. Defer legal and hosting details until publication.
- Scaffolded engine into `site/`, keeping existing material and public SVG sources intact. Run from site with npm run dev; changing folder later requires updating documentation only.
- Local sketches use one provisional dark system-font appearance to isolate concept choice. Final look will be offered after storyboard approval.
- Added a local-only Node fetch guard to the dev launcher after discovering Next's unsolicited registry version check; telemetry disabled. No extra skills or assets downloaded. Change scripts/local-only.cjs if publication eventually changes network requirements.
- Copied supplied SVGs unchanged into site/public/assets for eventual labelled explanations. No derivative SVG or texture made at this stage. MIT/source provenance remains in material/asset-notes.md and facts.md; no photograph, measured trace or actual wiring represented.
