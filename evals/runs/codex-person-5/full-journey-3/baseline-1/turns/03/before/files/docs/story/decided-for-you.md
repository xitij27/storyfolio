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
