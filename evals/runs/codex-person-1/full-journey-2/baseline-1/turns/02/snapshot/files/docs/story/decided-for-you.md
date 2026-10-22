# Decisions made without asking

- Keep all work local, with no deployment, publishing, remote repository, or external profile fetching. User explicitly requested local only. Change only upon their instruction.
- Use the supplied three Markdown sources and save traceable factual notes in docs/story. No design chosen yet. Corrections go in facts.md beside the affected claim.
- Use the available Node and browser tools; no additional skill is presently needed. Enabled skill catalog and local .agents/skills both contain storyfolio only.

- After factual answers: treat unconfirmed claims as excluded, per user instruction. Build concept copy and CV only from confirmed facts; database project can be named but has no technical specifics. Change by supplying additional confirmed detail later.
- Use 2027 for “next year”, based on session date 2026-10-22. Change if launch timing changes.
- Do not download visual assets or additional skills. Reuse available offline package cache for build dependencies. No external network requests in the browser are needed.

- Scaffolded the engine into site/ because the supplied skill lives inside this workspace; scaffolding into the workspace root would overlap its own source and safely refused. Story notes remain in root docs/story. Change by moving the independent site folder later.
- Installed the site's locked build dependencies from existing /tmp/storyfolio-npm-cache with npm ci --offline. No visual assets, fonts or additional skills downloaded. Own lockfile belongs to the site.
- Concept sketches use normal HTML anchors, inline expandable details, system sans-serif for text and system monospace for document annotations. Chosen-site details and final typography remain subject to storyboard/look stages.
- Concepts omit testimonials, formal role titles, unconfirmed dates/figures and all Lumen imagery. Lumen's only permitted description is “Card payment systems.”
- Turned off Next telemetry in run commands. Site bound to 127.0.0.1. No deployment or external repository created.
