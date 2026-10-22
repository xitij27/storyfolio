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

## Storyboard decisions — 22 October 2026

- **Delegated concept selection:** chose 01, The open runbook, after user explicitly asked for the recommendation to be selected. Why: bound volume and pop-up subjects read most clearly without captions at desktop and phone sizes. How to change: choose another saved sketch before approving the storyboard; alternatives are preserved.
- **15 beats, seven chapters, 16.4 desktop screens:** enough room for biography, practice and all five work items without replacing the person with one migration case study. Phone sections grow with content; fallback spacing collapses to normal document flow. How to change: reorder/trim named beats in storyboard.md before approval.
- **Project details are standalone local pages:** normal links, browser Back, keyboard access and no-JavaScript reading all work naturally. How to change: propose a different detail interaction; route-based pages are the default unless requested otherwise.
- **No additional factual questions:** the user already instructed omission for unconfirmed facts. The database click adds a larger labelled illustration; no guessed technical case study. How to change: supply confirmed details later; no answer needed now.
- **One CV content source, two delivery forms:** readable/printable /cv plus a self-contained downloadable HTML file with embedded styles. Why: meets print/download without a remote conversion service. How to change: adjust presentation after local review; keep authorized facts consistent.
- **Normal HTML navigation and local fallbacks:** seven chapter anchors, visible contact/CV shortcuts, mobile disclosure, per-project return links, static own illustrations when 3D is unavailable. Why: no one must complete an animation to find work or contact. How to change: update placement during spine review; keep all destinations accessible.
- **Two material looks for the spine:** Paper/daylight and Desk/lamplight, using local sans-serif text and local monospace document labels. Why: both fit the runbook object and offer a useful actual scrolling comparison. How to change: user picks or requests adjustments at look checkpoint.
- **Local share and utility assets:** own-geometry 1200×630 preview, locally drawn book/DB icon, useful real 404. Why: meets requested features without downloads or a fake public domain. How to change: adjust appearance with the chosen look; public URLs wait for publishing instruction.
- **No analytics or embeds in local build:** none is needed for this scope and all browser requests should remain local. How to change: explicit later request; no hypothetical approval workflow added now.
