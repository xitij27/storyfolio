# Decisions made without asking

- Keep the project local, with no deployment, analytics or publishing setup. Reason: explicit user instruction. Change only on the user's request.
- Keep source-backed facts and unresolved claims separate. Reason: team metrics and version wording need clarification. Resolve in facts.md when answers arrive.
- Save continuity notes in docs/story. Reason: resume later without losing decisions. These are editable Markdown files.

- Put the engine in `site/`: the scaffolder rejects a destination containing its own skill source. Run it with `npm run dev --prefix site -- --hostname 127.0.0.1`; move the site later if desired.
- Install project dependencies only from the existing offline npm cache and use the existing Chromium cache. Reason: sufficient tooling exists locally and no downloads are authorized. No skills, fonts or assets installed/downloaded.
- Use approximate city coordinates for map positioning, not residence addresses. The city names and move years are confirmed; coordinate values are geographic placement, not personal claims. Edit `site/content/person.ts` to adjust.
- Use the ready sheet and map worlds for the concept, with explicitly labelled generic checklist drawings instead of simulated measurements. Detailed operational illustrations await concept/storyboard decisions.
- Use a temporary night palette and generated captions for this running concept. Neither is a chosen look or chosen wording. These are reviewed at their designated stops.
- Added a persistent name/contact header and correctly scoped programme proof so a visitor can identify and contact Dawit without completing the scroll. Adjust `site/app/page.tsx` and `site/app/globals.css`.
- Replaced a starter contact-scene sentence claiming the sheet folded into every picture: the mixed-world concept includes a map, so that statement was inaccurate. It now describes an illustrated overview.

## Storyboard proposal after concept acceptance
- Preserve seven main beats in the accepted mix, and keep extended work explanations on six local detail pages. Reason: all six need a brief scroll entry and more on a click; ordinary pages support keyboard access, direct links and no-JavaScript use. Change the proposed detail behavior in storyboard.md before implementation.
- Propose a small control-driven ferry cutover illustration on its detail page, using only the approved lag/parity-check, switch and fallback sequence. Reason: explain the command Dawit actually wrote without changing the main 3D mix. It uses no real system or invented thresholds/command syntax. Can be made static instead.
- Plan `/cv` for printing and a self-contained HTML download from the same confirmed facts. Reason: fulfill both printable and downloadable HTML requirements locally. No external generator.
- Plan named navigation/anchors and an always-available text view, own geometric share artwork/icon, and a useful named 404. Reason: ordinary links and content access are explicit requirements; no external service is necessary.
- Omit analytics, remove sample public routes, leave legal/hosting/public canonical origin for publishing. Reason: current scope and local-only boundary.
- Plan explicit correction of phone framing, proof/header collisions and contact-caption overlap, plus forward/backward review of book transitions. Reason: preview checks showed these visual limitations; an automated pass alone did not resolve them.

## Whole-site look build after storyboard approval
- Use one shared portfolio shell for home and the three appearance previews, with colours derived from the active engine palette. Reason: the choice should cover the actual site, including navigation, not only a canvas. Change in site/components/portfolio and globals.css.
- Use server-rendered /preview search parameters, with no sample-person selector. Reason: each look's actual text must work without JavaScript and belong to Dawit. Next.js 16 local page/searchParams and Link documentation were consulted.
- Preserve query values, fragment and scroll during appearance comparison; keep the default look provisional until Dawit chooses. Change in the look-switcher component.
- Fit the whole document/book into the available viewport and keep readable HTML captions, including the book chapter. Reason: the previous panning clipped names/roles on phones. Adjust framing in stitch/sheet.ts and book.ts; this changes no accepted world or chapter order.
- Provide named chapter anchors, a plain text view, and separate navigation/caption/CTA regions. The HTML fallback includes the permitted study/role/practice detail. Reason: ordinary navigation and equivalent content are accepted requirements.
- Freeze idle scene time under reduced motion. Reason: the starter removed easing but still passed an advancing clock to bobbing/yaw animation. No measured phone-performance claim.
- Disabled Next Link speculative prefetch on navigation/comparison links after browser checks observed cancelled requests. Reason: avoid unnecessary work during a local visual comparison; actual link navigation remains unchanged.
- Put appearance controls in the header on wide desktop, right-aligned below it on medium widths and centred below it on phones; increased map clearance on short wide screens. Reason: actual screenshots showed map city names behind controls/header. No chapter or world changed.
