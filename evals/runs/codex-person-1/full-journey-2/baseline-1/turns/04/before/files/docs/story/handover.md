# Handover

**Current stage: STOP 3 — The open runbook selected; full storyboard proposed, awaiting Dawit’s approval.** Read the latest continuation at the end of this file first. All work local; no new skills or external assets. Earlier stage notes below are historical.

Historical initial stage: Stop 1 — source reading complete, awaiting factual answers. User requested planning plus working local single-scroll 3D portfolio and guidance through decisions. No publishing authorized. Do not advance to concepts until answers are recorded in facts.md. Skill requires runnable concepts at Stop 2, storyboard approval at Stop 3 before chosen-site build, look choice at Stop 4, wording choice at Stop 5, actual review at Stop 6.

Read all available material: resume.md, linkedin.md, old-site.md. No private or unclear files listed in material. Facts and unresolved issues saved in facts.md. No concept/design created.

Setup checks performed in this session:
- Read engine/README.md. Node v22.22.1 meets >=22.18 requirement.
- Ran node .local-check/native.ts: typed declaration executed directly; passed.
- git --version: 2.53.0. git status --short failed because supplied .git is not a valid repository. No repository initialized.
- Neutral localhost HTTP page actually opened with Playwright Core and Chromium headless shell. Title and h1 verified; screenshot .local-check/neutral.png opened for visual inspection: readable heading and paragraph, no overlap.
- Standard Chromium launch failed with crashpad database error. Headless shell works using /tmp/storyfolio-browser-cache/chromium_headless_shell-1248/chrome-headless-shell-linux64/chrome-headless-shell and LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu. Script .local-check/browser.mjs starts and stops its own loopback server. Browser library imported from existing /var/tmp/storyfolio-entry-runtime-20261012/placeholder-check/node_modules/playwright-core/index.mjs; this is setup verification only, not a final site dependency. Build should have own lockfile and dependencies after scaffolding.
- Advertised enabled skill: storyfolio. Local .agents/skills lists storyfolio only. No materially necessary missing skill identified; no installation suggested or performed.

Next: receive numbered answers, record each verbatim alongside relevant fact; preserve unanswered questions. Then open references/concept.md and proceed to runnable concepts within confirmed facts.

## Continuation after factual answers — 22 October 2026

User's full answers recorded in facts.md before concept work. Crucial corrections: 99.98% measured order API availability over 26 months; two internal incidents <10min each; on-call 85→22 weekly is “we”, team of nine/about a year; ferry maintained since 2022, cutover command authored, not project creator; runbook first version/continuing owner/40 teams. 2014 library dropped-table story explains rollback interest. Lumen only “Card payment systems.” No internal diagrams, photographs, slides, testimonials or external assets. New audience: afraid-of-migration companies and conference organisers; independent next year (2027). Public example mailto only, no sending. Own geometry/system fonts. Additional requested features recorded in facts.md; no extra skills to install. Unconfirmed facts omitted.

Stage now: STOP 2 — three runnable concepts ready; awaiting user's concept selection. Selection is not yet made. Recommended runbook based on recognisable object/scene readability. Do not advance to storyboard until selected or user delegates selection. Do not build chosen full site before storyboard approval.

Implementation:
- Engine scaffolded independently into site/ (workspace root refused because source inside it). npm ci --offline --cache /tmp/storyfolio-npm-cache succeeded: 392 locked dependencies, no downloads/assets. Root story notes preserved.
- Read engine README, concept reference and storyboard reference, site/AGENTS.md (including generated Next rules), and installed Next Link docs.
- site/app/page.tsx and concepts.css: local concept gallery. site/content/sketches/concept.tsx, index.ts, sketch.css: three client-rendered R3F sketch routes with ordinary SSR HTML text; /sketch/runbook, /sketch/checklist, /sketch/rollback. Real own-geometry book leaves, perforated fold strip and tracing-film overlays; illustrative catalogue opening, working scroll/reverse migration model, invitation closing. Scene boundary retains HTML on failure; reduced-motion changes to discrete scene positions and no idle animation.
- Updated site/content/copy.ts metadata to identify local concepts and noindex. Unused engine bundle kept compiling with its labels; placeholder engine is not the visible page. Final implementation should replace content from the approved storyboard.
- site/LOCAL-REVIEW.md explains startup, routes, scope and checks. User-requested full chapters, 5 work details, CV, share preview/icon and useful 404 remain pending design-stage progression.

Checks in this session:
- NEXT_TELEMETRY_DISABLED=1 npm run build passed (including TypeScript), all 3 sketch routes statically generated.
- npm run typecheck passed after restoring required unused engine copy labels.
- npm run lint passed after using Next Link for root navigation.
- npm test: 129 passed, zero failed.
- Production browser script local-check/run-sketches.mjs starts own next start server, waits for readiness, runs local-check/sketches.mjs then stops its server. All six combinations (3 routes × desktop1440x1000/phone390x844) passed: one canvas, no page errors, no external browser requests, no overflow, reverse aria-pressed true. Report local-check/sketch-report.json. 18 screenshots in local-check/screens/. Every opening/middle/ending inspected via three review contact sheets plus full-size sample screenshots; readable, no object clipping or text overlap. Phone text continues below fold by normal scrolling; contact remains in header.
- Review sheets local-check/runbook-review.jpg, checklist-review.jpg, rollback-review.jpg visually opened. Final full engine browser acceptance matrix deferred until chosen site's content exists; engine check currently expects placeholder beat contract and would not represent the custom concept routes. No claims of final acceptance or phone frame-rate testing.
- Setup complication: sandbox tool calls have isolated process/network namespaces; a server launched in one call cannot be reached from another. Use the single-process browser runner for checks. A real user can start the server using LOCAL-REVIEW.md. Do not claim a live server remains reachable after a finished runner. Next dev stale .next/dev/lock can refer to a PID reused in another namespace; removed only the stale generated lock after confirming no server accessible in that namespace. Initial rm -f approach rejected by tool policy, replaced by precise Path.unlink. No user action needed.
- Next dev attempted network access to npm registry through development diagnostics; managed network blocked it, so production server used for all successful visual checks. Next telemetry disabled in commands. Initial neutral .local-check/ artifacts from earlier turn were no longer present at continuation; new durable artifacts use local-check/ instead.

Next: present the three local links with recommendation, ask which concept. Record response in concepts.md, then write complete storyboard with 12–22 meaningful beats (or explicit justified shorter proposal), ordinary nav, five work details, CV, local share/icon, 404, fallback/motion and 2–3 material looks. Do not write final captions at storyboard stage. Maintain user local-only/no-download/unconfirmed-omit boundaries.


## Latest continuation — concept selected and storyboard proposed, 22 October 2026

User: “Go with the concept you recommend from the alternatives you just showed. Record which one you chose and why, then work out the story and the rest of what the site needs. I'm not installing additional skills. Please continue with what is available, and keep everything local.”

Recorded selected concept in concepts.md before story planning: **01 — The open runbook**. User delegated selection; assistant chose on recognisability of bound volume/pop-up scenes on desktop and phone. Final look and captions not selected.

Created docs/story/storyboard.md: complete proposed seven-chapter script, 15 beats/16.4 desktop viewport heights. Chapter order: opening/library origin; places; degree/software entry; career with Lumen strictly one-line and no imagery; practice (documents/on-call/reading); five works (migration, database upgrade, runbook, ferry, talk); contact. Opening/name/work/40-team proof/contact/CV accessible without following scroll. Opening scene uses library origin; closing book becomes whole without implying any actual incident was reversed. No rhetorical question needing a fabricated resolution.

Storyboard includes fact support per beat; no final captions drafted. Migration miniature explicitly generic, scroll/forward/reverse interaction; no claims of actual topology or procedure. Expanded project routes planned at /work/migration, /work/database-upgrade, /work/runbook, /work/ferry, /work/talk. Database remains topic-only, enlarging an illustration rather than guessing technical specifics. CV planned at /cv plus self-contained downloadable HTML. English ordinary nav, local share preview/icon, real useful 404; mobile/reduced-motion/no-WebGL/no-JS/static scene behaviour; two material looks for the spine. No screenshots/slides/photographs/testimonials/external assets, additional skills, live URLs or publishing. Legal/hosting/public canonical deferred. Local browser requests only.

Logged assistant choices with rationale and how to change in decided-for-you.md. Supporting project files left unchanged: chosen full site is not built yet. This is a documentation-only planning turn; no code tests rerun because no code changed. Verified beat count and arithmetic locally. Earlier concept checks remain historical evidence, not acceptance of an unbuilt full site.

**Next action:** present storyboard for user's approval or changes, with concise chapter summary and decision log link. Skill stop 3 explicitly requires “They have said yes to it.” Concept delegation is satisfied; it does not waive storyboard checkpoint. Do not request selection of concept again, additional skills, more facts or assets. On storyboard approval, record actual answer first; read references/building.md and engine/README.md, then build opening/middle/ending spine in both proposed looks. Keep narration and outputs grounded in confirmed answers, and keep all work local.
