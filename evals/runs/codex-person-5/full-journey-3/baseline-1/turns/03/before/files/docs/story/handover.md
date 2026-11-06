# Handover — stop 1, facts

User requests plan plus working local 3D scroll story, with guided decisions; no publishing. Read all four profile files in material; no other material filenames existed. No private correspondence or participant files encountered.

Read storyfolio SKILL.md, references/reading-a-profile.md, engine/README.md. Only storyfolio advertised as enabled and installed in local skill directory. No additional skill recommendation needed.

Setup verified 2026-11-06: Node v24.14.0, npm 11.9.0, git 2.53.0. Native TypeScript actually ran checks/setup/native.ts. Git executable works, but git status fails: supplied .git is empty/read-only and workspace is not a repository. No Git initialisation attempted.

Neutral local page checks/setup/index.html successfully opened in cached Chromium headless shell via explicit /tmp/dawit-setup-shell user-data-dir; DOM inspected, screenshot checks/setup/browser.png captured and visually inspected. Full Chromium failed user-data-directory/crashpad setup. Cached playwright package stub could not resolve; attempted local setup install of playwright-core was blocked by registry.npmjs.org allowlist. No packages installed. Headless shell path: /tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell. Engine build dependencies not yet installed or verified; cached npm packages may help at stop 2. No portfolio app scaffolded at this stop.

facts.md contains sourced claims, disagreements and outstanding confirmation. User answers pending. Next: receive and record answers first; then read concept.md and diagrams.md and build a running concept under stop 2. Do not advance concept, storyboard or look before the corresponding user decision.

## Stop 2 progress — confirmed facts, running concept
All user answers recorded in facts.md before concept work. No remaining unconfirmed claims may be used. User declines additional skills; no asset downloads. Required features for eventual finish recorded in facts.md.

Read concept.md and diagrams.md and engine/AGENTS.md. Scaffold into site/ (workspace root rejected because it contains engine). Dependencies successfully installed offline from /tmp/storyfolio-npm-cache (392 packages); prior registry limitation bypassed without network. Do not download Chromium: cached headless shell works.

Replaced content/person.ts with Dawit only; six requested work pieces and click-through paragraphs, no quotes. WHOLE.sheet proposed; provisional night/swing only. Content/site.ts contains fact-safe draft captions, English; CV pending stop 5. No stitch/ or main story page changes. Concepts.md records rationale, chapter pictures, tests and known illustration limitations. Top-level docs/story/ is canonical, not site/docs/story/.

186 tests pass; typecheck and lint pass. Production build succeeds; desktop/phone/fallback check running. Dev process at 127.0.0.1:3000 (session 26159); production check uses own temporary port. Need ensure local preview still serves after build, and inspect all resulting screenshots. Pending user concept response before storyboard. Future: storyboard, look variants, words+click pages/CV, then share preview/icon/useful 404 and final checks/review. No publishing authorised.

Production concept validation complete: npm run check passed, 0 problems. Report: site/checks/site/2026-11-06T18-28-48-131Z/report.json. All 39 screenshots visually inspected via desktop/phone/phone-with-words contact sheets under workspace checks/setup/. Narrow sheet panning is intentional gallery behaviour (sheet.ts lines 485–516), not missing work: project buttons expose all six pieces regardless of framing.

Preview environment limit: server commands can run and browser checks can reach them within the same sandbox command, but separate exec invocations cannot reach their loopback port (ERR_CONNECTION_REFUSED); do not promise a persistent preview server across calls. User can run `cd site && npm run dev -- --hostname 127.0.0.1` and open http://127.0.0.1:3000 locally. Production build/check verified the running page. No deployment/external server.
Additional interaction check passed against a running production server: all six work buttons opened the correct dialog and Escape closed each; contact href verified as mailto:dawit@example.com. No mail sent. Concept acceptance still pending; no storyboard/look/wording decision inferred from 'carry on'.
