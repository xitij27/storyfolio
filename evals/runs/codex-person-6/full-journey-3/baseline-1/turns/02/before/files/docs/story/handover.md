# Handover

## Current stop

Stop 1: source reading complete; factual questions awaiting user answers. No concept, storyboard or site built. User wants a working local scroll-driven 3D portfolio and guidance through decisions; publishing reserved to user.

Read all four material Markdown files, after listing names; no private files identified or read. Source facts, discrepancies and open questions recorded in facts.md. User answers must be recorded beside facts before advancing. Next: resolve factual questions, then read concept.md and diagrams.md and build a running concept for stop 2.

## Setup checks actually run

- Node v24.14.0, npm 11.9.0: satisfy engine requirement Node >=22.18. Native TypeScript verified by writing/importing temporary typed .ts module; printed 7.
- Git 2.53.0 installed. `git status --short` fails: this workspace's .git is an empty directory, not a repository. No history exists here.
- Only storyfolio is advertised enabled and listed under .agents/skills. No other skill recommended.
- No browser tools advertised. No resolvable Playwright/Puppeteer in workspace. Existing /tmp Playwright directory lacks index.mjs; attempted import failed. Do not treat another setup's artifacts as verification.
- Attempted isolated playwright-core installation in /tmp; registry.npmjs.org blocked by environment allowlist. Dependencies have not been installed.
- Created checks/setup/neutral.html. Attempted to open using installed Chromium 1248 headless with dump-dom/screenshot. First launch could not create default data directory; explicit /tmp profile hit crashpad config; explicit writable XDG config/cache got socket() Operation not permitted in browser process singleton. Browser did not open. No screenshot or visual inspection completed. Must report limit and retry with suitable available tooling if environment changes. Do not claim successful browser/site checks.
- All material/site work remains local. Temporary tooling install attempt requested only package code; no personal material uploaded.
