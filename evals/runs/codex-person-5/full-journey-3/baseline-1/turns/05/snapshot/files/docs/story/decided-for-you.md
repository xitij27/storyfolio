# Decisions made without asking

- Keep all project work local and do not publish, per the user's instruction. Change only on explicit request.
- Store source-backed claims and unresolved questions in docs/story/facts.md so later copy can be checked. Edit as answers arrive.
- Use system fonts initially; no missing skill materially requires installation. Only storyfolio is advertised/enabled and present under .agents/skills.
- Do not use placeholder contact/GitHub URLs as working destinations until confirmed. Change by supplying real links.
- Follow latest user confirmations over source shorthand: use scoped 99.98% Order API availability, collective on-call attribution, ferry maintenance credit. Omit unconfirmed counts/links. Change only when user confirms details.
- No asset downloads, additional skills or publishing. Dependency packages are build tooling, not visual assets; use available local caches where possible.
- Place the app in site/ because the scaffold rejects a destination containing its own engine source. Run from site/; story records stay at workspace docs/story/.
- Install build dependencies entirely from /tmp/storyfolio-npm-cache using npm ci --offline. All 392 packages installed without network or asset downloads. Use cached headless Chromium rather than downloading a browser.
- Use the sheet gallery world for concept review because the user named working documents as their tools. Night/swing remain provisional engine defaults until look review. World choice remains the user's next decision.

## Storyboard planning — 2026-11-06
- Retain seven chapter beats and no testimonials. Each is one existing sheet-world chapter; this avoids padding with invented work. Change by requesting a different emphasis/order.
- Keep current gallery implementation, look and movement while reviewing the script, as requested. Sheet world explicitly accepted and recorded in concepts.md.
- Reuse six native detail dialogs instead of building duplicate project routes. They already meet brief-plus-more-on-click and retain full server-rendered text. Change if shareable individual project pages are wanted.
- Plan printable /cv plus standalone downloadable HTML, sharing confirmed content. This satisfies the requested format without assuming PDF generation.
- Plan local generated share artwork and icon; no public canonical URL or legal/hosting details until the user decides to publish.
- Keep 2014 outage within learning and talk detail, rather than introducing a seventh project. Omit all remaining unconfirmed facts/URLs.

## Build, look review — 2026-11-06
- Added original folded-sheet icon and share-card artwork using installed system fonts/own geometry; no external images, fonts, skills or packages installed. Artwork generator is scripts/draw-share.py. Change by editing/regenerating it.
- Added useful 404 page with normal Home/Work/Contact/email links and future conditional CV link. Styling is scoped to utility pages; sheet scene and main layout unchanged.
- Configured localhost-only metadata origin for local share preview; no public domain/canonical URL or publication. Set the actual origin only when publishing is authorised.
- Recommend keeping Night/Swing, because those are the existing settings and user asked to preserve the site. Show other supplied looks/moves for their actual choice; do not infer a new selection.
- Honour user's existing “Keep everything else as it is” as retaining Night/Swing. This supersedes the proposed repeat look question: no new appearance chosen, and no redundant permission requested. Other supplied previews remain available.
- CV uses confirmed functional descriptions at Kestrel and the library rather than adding unconfirmed formal titles; keeps Lumen at its permitted one-line description. Page and attachment share content/cv.ts; no original resume file or internal asset is exposed.
- Supply wording review at /review/words with three complete opening and closing beats. Recommend A/A, but preserve live draft until user picks or supplies text. This review route is not linked from the public story navigation.
- Share artwork foregrounds the three named working documents rather than unscoped programme numbers; local system fonts and geometry only.
- Added query-only opening/closing wording previews to the existing /preview route so the user can read all candidates on the actual sheet story before choosing. Only fixed candidate IDs are accepted; main site content is unchanged. Review page links to each beat and recommended A/A pair.
- Completed short-screen and keyboard-dialog checks before asking for wording choice; no extra site features or external assets introduced.
