# Handover

## Request and current stop

Build a working local embedded-firmware portfolio for Ada Mensah, guided decisions, one scroll story and a tangible 3D work object. No paper, sheets or card collection. Publishing is not authorized.

Current stop: **3, storyboard proposed; awaiting user approval or changes.** Facts are confirmed/excluded, and user explicitly delegated the recommended concept on 21 October 2026. Concept 1 (bring-up fixture) selected and recorded with reasons in concepts.md. Full story and site scope in storyboard.md. Next: record user's storyboard response; only after approval build opening/middle/ending spine in two looks. No new app implementation in this planning turn.

## Sources and tooling checks — 13 October 2026

- Listed material files with rg --files, then read CV, lab notes, asset notes and environment resource/catalog metadata. No correspondence, contact exports or participant records found or opened.
- Read storyfolio/SKILL.md, references/reading-a-profile.md and engine/README.md.
- Node --version: v22.22.1, satisfies engine minimum 22.18. Created /tmp/storyfolio-runtime-probe.ts with an actual number type annotation and executed it with node: output `native TypeScript: 22`.
- Supplied alternate Node executable also reports v22.22.1. Not treated as a check until executed.
- git --version: 2.53.0. git status --short reports this workspace is not a Git repository. No initialization performed.
- Created neutral /tmp/storyfolio-neutral.html; opened using cached Chromium headless shell with supplied LD_LIBRARY_PATH, --dump-dom and --screenshot. Exit 0, expected rendered DOM and screenshot /tmp/storyfolio-neutral.png. Opened screenshot with view_image and visually confirmed readable heading/body. Browser emitted environment D-Bus/udev/GPU warnings but rendered successfully. This is a neutral browser probe, not a portfolio or WebGL performance check.
- Only storyfolio is advertised for this session; local .agents/skills contains storyfolio only. External-helper catalog dated 12 October 2026 is remote source metadata, not installation/activation. No helper installed/enabled or recommended as necessary at this stage.
- Resource notes say downloads unavailable and proxy loopback only. No external downloads attempted. Dependency installation/build feasibility remains to be checked when scaffolding is authorized by selected concept.

## Persistent files

facts.md contains source facts, limits, disagreements, questions and pending answers. decided-for-you.md records local-only and tooling decisions. Concepts/storyboard files should be created when those stages begin, without implying selection or approval.

## Update after factual answers

User has answered/corrected facts; answers recorded in facts.md. Omit all other facts. Stop 2 underway: three runnable concepts needed, not yet selected. Extra deliverables: project page, downloadable printable HTML CV, nav, share preview, icon, 404. User declined helper skills and external assets.

## Concept handoff — stop 2 complete, awaiting selection

- Local app at site/. Scaffolded 79 engine files to user-owned folder, installed 392 dependencies with npm ci --offline --cache /tmp/storyfolio-npm-cache --no-audit --no-fund. No skill-directory dependencies or external downloads.
- Three production-build sketches: /sketch/fixture, /sketch/sensor, /sketch/loom; root is local concept chooser. Each has opening/middle/ending, seven persistent solid pieces, HTML claims and labelled illustrative geometry/fallbacks. Recommendation: fixture. No user selection yet.
- Corrected printable HTML CV at site/public/cv.html, download filename Ada-Mensah-CV.html. Actual browser download tested; print-media screenshot inspected. Mailto link only; no email sent or delivery claimed.
- Run from site/: npm run concepts. Builds locally if .next-concepts/BUILD_ID absent, otherwise serves checked production build at 127.0.0.1:3000. Normal development command remains npm run dev.
- A dev server in an isolated tool process could not be reached from another tool's network namespace. Initial browser probe failed with connection refused; corrected by launching server and browser together in the probe script. Separate production build avoids dev-lock interference. This is an environment limitation, not a passing check of the original server.
- Checks: engine npm test passed 129 tests; native TS typecheck passed; lint passed after adding generated .next-concepts ignore and using Next Link for internal routes; fresh production build passed after geometry revision. No final full-story acceptance claim.
- Browser script site/scripts/sketch-check.mjs: all three at 1440x960 and 390x844, screenshots of opening/middle/ending, HTTP 200, scene on, no page errors, no horizontal overflow, no external requests. Further probes of every concept in no-JS/no-WebGL/reduced-motion contexts retained name, evidence and contact, one h1, no page errors. Reduced-motion presence checked, not a real phone performance or stationary pixel-equality measurement.
- Opened all 18 normal screenshots through desktop/phone contact sheets and all 9 fallback/reduced-motion screenshots through per-concept sheets. Revised fixture from flat-looking tall blocks to solid bases/upright contacts; enlarged geometry depth/turn for other concepts. Rebuilt/rechecked revision. No observed clipping/overlap obscuring HTML. Small labels on geometry remain supplementary; facts are readable HTML. Final visual direction and polish still pending.
- Results under site/checks/concepts/: report.json, build.log, lint.log, captures/contact sheets, downloaded-cv.html and cv-print.png. Supplied SVG copies unchanged, provenance recorded in site/public/assets/README.md.
- Requirements still to build after concept/storyboard decisions: selected full story; visual-look choice; remaining chapters and wording choice; own Mosslink project page, final ordinary navigation, share preview, icon, useful 404; final acceptance/review. No legal/hosting claims, no publication.
- Next user decision: choose fixture/sensor/loom or delegate selection. Record it in concepts.md, then read references/storyboard.md and draft the whole-page script; do not implement chosen full story before storyboard approval.

Canonical decision notes are in workspace docs/story/. site/docs/story/ is a mirrored handoff so local site instructions can find context; update both on continuation.

## Storyboard handoff — 21 October 2026

User instruction: “Go with the concept you recommend from the alternatives you just showed. Record which one you chose and why, then work out the story and the rest of what the site needs.” User again declines additional skills and requires local work only.

Selection recorded first: concept 1, bring-up fixture. It follows Ada's fixture contribution and connects firmware to observation without unavailable/private assets. Earlier concept-selection-pending notes above are historical, superseded by this selection.

Read references/storyboard.md and references/building.md. Created full docs/story/storyboard.md: five checklist chapters, ten beats, 11.5 screen heights. Proposed shorter-range exception explicitly needs script approval; no filler facts invented. No final captions written. Includes fact anchors, persistent geometry labels/poses, opening's plain-language meaning, close's supported answer, 30-second route, phone/reduced-motion/no-WebGL/no-JS behavior, two later look candidates and system type families, all auxiliary site requirements with build/later/never and decision owner.

Planned routes: / main story; /projects/mosslink one project page; existing /cv.html; stable chapter anchors; useful real 404; local preview/icon; archived sketches outside final main navigation. Public origin/legal/hosting deferred. No extra skills, external assets or publishing. New stage decisions in decided-for-you.md. Canonical docs mirrored to site/docs/story/.

No application files modified and no runtime checks rerun: this turn changes planning/decision documents only. Prior concept checks remain prior evidence, not final full-site acceptance. Current remaining decision: yes to full storyboard including shorter 10-beat scope, or requested changes. Then spine and look choice, remaining chapters and whole-beat wording choice, final checks and actual review.
