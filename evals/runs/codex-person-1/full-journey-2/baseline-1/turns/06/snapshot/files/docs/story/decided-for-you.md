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

## Spine implementation decisions — 22 October 2026

- **Build four approved beats first:** hello.intro, hello.origin, projects.migration, contact.close (5.15 desktop screens). Why: the skill's look checkpoint requires a real opening/middle/ending before the remaining chapters. How to change: after the look choice, extend content/story.ts to the approved 15-beat script; do not invent substitute chapters.
- **Reuse the engine for the chosen site's spine:** scroll timing, adaptive quality, look/URL handling, scene failures and reduced motion now use the supplied engine, rather than the custom comparison sketches. Why: lets the standard production matrix check the actual page. How to change: content/ owns Dawit's geometry and scenes; keep generic lifecycle code in components/story/.
- **Pass frame/still into custom pieces:** the core Runbook piece needs scroll-driven book opening/closing while chapter extras independently fold into the shared binding. Why: one continuous object rather than duplicate books during each transition. How to change: PieceProps carries these fields; adjust content/book.tsx instead of adding global mutable state.
- **Use no text inside the 3D:** geometry shows a catalogue/table, gateways/return path and invitation/CV; all words and exact figures stay readable in HTML. Why: avoids tiny document print on phones and changing text overlaps during transitions. How to change: add only tested short labels if a later scene requires them.
- **Use locally drawn SVG equivalents:** scripts/generate-illustrations.py generates own orthographic drawings of the same spine subjects. Why: useful visuals without JS/WebGL/downloads; generated illustrations are not actual employer documents. How to change: update the local generator with the geometry/subject.
- **Add CV, migration detail and useful 404 now:** they are supporting destinations needed by the spine's actual links; the other four project pages and chapter scenes remain after look selection. Why: review links should work. How to change: extend from the approved factual scope at the next stage.
- **Make CV facts a shared data module:** content/cv.ts feeds /cv and scripts/generate-cv.mjs for the self-contained public download. Why: printable/viewable and saved HTML should agree. How to change: edit confirmed content once, regenerate the HTML download, then verify print/download.
- **Prepare shadow/no-shadow shader variants at startup:** adaptive quality otherwise compiled large programs during scrolling in the first diagnostic. Why: avoid scroll stalls when quality drops. How to change: WarmQualityVariants in components/story/scene.tsx; keep renderer state restored after preparation.
- **Use a transparent shadow receiver:** removed the lit floor's hard colour boundary behind text while retaining matte shadows beneath geometry. Why: the line competed with the paper surface and crossed the captions. How to change: Floor in components/story/stage.tsx.
- **Reveal a chapter's static illustration on optional extra failure:** preserve the core book and other chapters, expose that chapter's HTML fallback via an error callback. Why: a failed lazy scene should still have its pictured subject. How to change: ExtraBoundary onFailure → Scene onExtraError → Story chapter data attribute; CSS controls fallback layout.
- **Darken Paper's text accent slightly to #A34326:** keeps small annotations and control text clear against linen; bookcloth geometry remains rust. Why: readable text in the material palette. How to change: content/looks.ts after actual look review.
- **Keep alternatives under /concepts:** homepage now opens the chosen spine; the original sketches remain available. Why: preserve review history without leaving the portfolio's entry as a design chooser. How to change: app/concepts/page.tsx.


## Full chapter implementation decisions — 22 October 2026

- **Paper/daylight selected by delegation:** user explicitly requested the recommended working look. Clearer rust binding and pale pop-up folds make it easier to read across screen sizes. Selection recorded in looks.md; optional Desk look remains. Change via content/looks.ts and the existing switch.
- **Complete the approved 15-beat sequence:** one continuous binding, per-chapter own pop-ups, no tiny canvas text. Why: the story remains legible on phone and each scene pictures its subject. Change story.ts, formations.ts and content/extras together; preserve factual scope.
- **Five local detail routes:** all brief work summaries expand by ordinary links, with correct return anchors, contact and CV access. Database expands only an illustrative cutaway because additional facts were not confirmed. Change content/work.ts only with confirmed facts; geometry can be refined independently.
- **Native mobile chapter disclosure and server HTML:** useful navigation and static labelled visuals without JavaScript; inert detail model controls hidden without JS. Why: the animation should not gate contact/work/CV. Change experience.tsx and detail-controls.tsx while preserving anchors.
- **Local share and icon generation:** own geometry, installed Pillow/local system font; localhost metadataBase and noindex, no public canonical invented. Why: all requested utilities can be reviewed locally. Change generate-brand.py; public URL details wait until publishing is requested.
- **Disable local Link prefetch:** dynamic homepage prefetch was being aborted during browser checks; normal click navigation still works. Why: avoid unnecessary requests while reviewing deep links. Change prefetch props if later justified.
- **Three complete wording drafts:** A plain/direct recommended, B cutover, C rollback. All include identical confirmed proof and utility text; name kicker remains accessible. Why: user asked to see important wording before settling. Change content/wording.ts and regenerate wording.md; do not treat provisional default A as approval. Opening/closing may be mixed or supplied by user.
- **No invented filler:** database has no technical narrative, Lumen only its authorized line, ferry credits original creator, team result says we, migration statistic includes its scope/window and incidents. Why: user explicitly instructed omission over guessing. Change only after confirmed additional facts.


## Finishing decisions — 22 October 2026

- **Use the selected A opening and A closing verbatim:** explicit user choice of both recommendations. The main default now refers to selectedWording, and the local comparison page records the decision. The generator preserves it. Change only following a later wording instruction; exact strings and approval are in wording.md.
- **Separate technical checks from actual review:** user explicitly leaves final phone review pending. final-review.md records this; no simulated screenshot counts as their review. Change only after recording their actual observations.
- **Bound long browser checks by beat range:** an uninterrupted full run was externally interrupted. Wide/fallback cases run in smaller fresh-build batches; reduced-motion range captures retain the complete page contract and report their bounds. An evidence summary must verify every required beat/position and stationary comparison before claiming complete matrix coverage. The original interrupted manifest stays incomplete. Change by running the normal full command on a machine/session with sufficient runtime.
- **Keep the site directly runnable:** root README and site/LOCAL-REVIEW.md point to loopback-only production startup and existing local dependencies. No new skill, download or publishing step. Change port locally if needed; share metadata uses port3000 until a future publishing decision.
