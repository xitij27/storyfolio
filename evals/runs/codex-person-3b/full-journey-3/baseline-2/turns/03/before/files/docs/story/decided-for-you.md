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
