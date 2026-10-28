# Handover

Current state as of 21 October 2026. Start with this page and
[the repository rules](../AGENTS.md). The [documentation map](README.md)
links the design, plans, operating instructions and evidence.

Latest, 28 October: **plan 1 of 3 is built; publishing the gallery waits for the author's word to push.** On the author's "continue with the development" ([record](history/2026-10-27-transition-examples-request.md#28-october-plan-1-goes-ahead)), root executed [the plan](superpowers/plans/2026-10-27-stitch-pieces-and-gallery.md) Tasks 1 to 9 ([study](../evals/engine/stitch-1/README.md)). The three examples (sheet, map, book) are worlds in `skills/storyfolio/engine/stitch/`, each able to hold any chapter and drawn only from the person's data; a site is a mix, one world per chapter (`content/person.ts`, `content/mix.ts`), shown at `/preview`. Two chapters in one world join by its own move, in two worlds by a dive: a window showing the next world fades in, then the camera flies into it. The sheet and map gained the book's finish (lamp shadows, grain, die-cut cards, a camera that leans in). The library carries a byte-checked copy (`scripts/sync-stitch.mjs`) and a gallery at `/transitions/`: the whole examples, a mixer whose copyable line is what a person sends the agent, and every chapter's pieces. `scripts/stitch-check.mjs` passes for every whole world, an all-dive mix, a mixed site and an edge person, both people, desktop and phone; the library's `scripts/gallery-check.mjs` passes on the export. 395 tests, `check-skill` ok. Still weak: the dive's window floats over the scene rather than sitting in an element of it; small words on the sheet's wall on a phone; a dark map. No skill text changed and no run. Next: ask the author to push so the gallery goes live (Task 10), then Plan 2, the skill's second stop. Environment here: Chromium 1234 at `~/.cache/ms-playwright/chromium-1234/` (playwright-core 1.64 wants 1248), named with `CHROMIUM`; check production builds, since `next dev`'s live-reload socket fails here; never `pkill -f` a pattern that is in the running shell command, which kills the shell.

Earlier, 27 October (later): **the design for transitions is approved by the author ("Yes, this is right."); [plan 1 of 3](superpowers/plans/2026-10-27-stitch-pieces-and-gallery.md) is written and waits for the author's review** ([design](superpowers/specs/2026-10-27-transitions-gallery-design.md)). In conversation the author decided: a gallery of every transition on the Pages site; the agent recommends one mix of pieces from different examples, suited to the profile, and shows it moving before building; then invites the person to swap pieces from the gallery, customize, suggest new components or bring their own design; examples used as they are, with only the words and places changed; moves at round 2's slower pace ([record](history/2026-10-27-transition-examples-request.md)). Nothing built from it yet; no push and no run.

Earlier, 27 October: **the transitions work continues with examples for the author to judge.** Taken up on the second machine, fast-forwarded to `e5eb639e`. The author does not want technical questions: "come up with those stuff and then I can provide my opinion", and each example must be realistic enough to go into a portfolio with only the text changed ([record](history/2026-10-27-transition-examples-request.md)). Root's reading: ready-made transitions for each seam of the fixed eight chapters, working for any person. Root built [three examples through all eight chapters](../evals/engine/transitions-2/README.md) (one sheet that bends into each picture, one map the camera flies over, a pop-up book), each drawn from a person's data with a switch between two made-up people, and showed them in the brainstorming companion. The author liked all three, found the book crude and the moves too fast; root slowed all three and remade the book, and showed them again. Waiting for the author's opinion; no engine or skill change and no run until then. Here Node 24.14 runs the tests: 373 of 373 pass.

Earlier, 26 October (README): on the author's request, the README now opens with status, workflow, licence, Node, agent and last-commit badges and has a "Project status" section showing the four stages, replacing the paragraph that called the skill planning-only ([record](history/2026-10-26-readme-status-and-badges.md)). No test badge, since no workflow runs the tests on GitHub. Documentation only; the transitions study below still waits on the author. Environment: the `/tmp` Node named below is gone; the system Node 22.22.1 here cannot load `.ts`, so 20 test files fail under it. `npm i --no-save node@22.18.0` in a scratch folder gives the official build, and with its `bin` first on `PATH`, `npm test` passes 373 of 373.

Earlier, 23 October (transitions): **the author moved the focus from components to transitions: how one section, and one 3D picture, becomes the next** ([record](history/2026-10-23-transitions-focus.md)). Today the engine only swaps chapter scenes by `chapterPresence`, so person test 2 shrank one picture while the next grew in its place, though its storyboard planned real carry-overs. On the author's "okay go ahead", root built the [transitions study](../evals/engine/transitions-1/README.md): one seam (a data pipeline becoming a route on a map) joined four ways, today's swap, line morph, hand-off and camera dive, each scrubbed by scroll, at https://xitij27.github.io/storyfolio/transitions/. Waiting on the author to try them and choose; no engine or skill change and no run until then.

Earlier, 23 October (component library): **a library of portfolio components is built and ready for GitHub Pages; it is live at https://xitij27.github.io/storyfolio/.** The author said to push and turn Pages on; Pages was enabled with source GitHub Actions, `main` pushed to `cdb9c36a` (carrying the other session's `c298b336` and `e924ad1c`), and workflow run 39897341550 built and deployed it. The same Chromium check against the live address: all 28 pages load with no errors. On the author's [direction](history/2026-10-23-component-library.md) (a library of pretty components, ideas from React Bits and Aceternity UI, the author's own portfolio pieces as templates, then "I want to have this component as GitHub pages"), `skills/storyfolio/library/` is a static Next.js app of 26 pieces by chapter, each running on its own page with a made-up person, plus a whole V2 template page ([spec](superpowers/specs/2026-10-23-component-library.md), [README](../skills/storyfolio/library/README.md)). No provider code is copied: their licences forbid it, so 8 pieces are written here from the idea and name the original with its install command. `.github/workflows/library-pages.yml` deploys it to https://xitij27.github.io/storyfolio/; going live needs a push and Pages set to "GitHub Actions" in the repository settings. One untested paragraph in `references/building.md` offers the library at the look stop; no run for it until the author says. Checked: `check-skill`, 369 repository tests, the library's typecheck, tests and build from its lockfile, and every page served under `/storyfolio/` in Chromium with no errors, no sideways scroll on a phone, and the project window, search and look switch driven once. Environment: `/usr/bin/node` here has no TypeScript support, so every `.ts` test fails under it; use `/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node`. `/tmp` is a 7.1 GB memory filesystem and filled up during the install; build copies go in `/var/tmp` (this one: `/var/tmp/storyfolio-library-build`).

Earlier, 23 October (later): **the diagram reference and the engine's drawing kit are built and shown; a rerun waits for the author.** The author found person test 2's diagrams crude and asked about a library of diagrams; root proposed a reference of diagram kinds chosen by question, craft rules from V3 and an engine drawing kit, and the author said "yes" ([record](history/2026-10-23-crude-diagrams.md#roots-proposal-and-the-authors-answer)). Built ([drawing-kit-1](../evals/engine/drawing-kit-1/README.md)): `references/diagrams.md` (named at stop 2, pointed to from concept and building); in the engine a pen for flat figures, a `Figure` sheet for extras, and Natural Earth land and borders (public domain, 1 MB, loaded only when a map is drawn). A sketch draws five of Dawit's diagrams from his facts: a route on a real map with the Netherlands at a larger scale, a timeline, the runbook's gates, the orders-database cutover worked by scroll, 85 and 22 pages a week at true scale; [captures](../evals/engine/drawing-kit-1/shots/dark-scroll.jpg). Words in a figure must be about 40 of the pen's 1000 units to read on a phone. Engine check 15/15, 362 tests, skill check ok (SKILL.md now at its 800-word limit). Next, with the author's word: rerun person test 2 on full-journey-3 with the changed skill.

Earlier, 23 October: **person test 2 is finished; the author's review is next.** After the author asked for a technical theme, smooth transitions, scenes from the person's own account and a fuller technical profile, the skill and engine changed (`81052c4`, `0e8f362`, `d8d6382`) and a new fixture was made (`evals/builds/full-journey-3`). Repetition 1 failed on model capacity; repetition 2 ran all six turns (62 minutes, about 1.25 million uncached tokens). Root's check ([final review](../evals/runs/stage-3-person-2/final-review/README.md)): one technical schematic world built from Dawit's notes, a working database cutover, six work pages, traps held, scenes that hand over by growing and shrinking in place. Served at http://127.0.0.1:3000/ from `person-2-review-site`.

Earlier, 22 October (night, last): **the person test is finished; the author's review is next.** Turn 6 ran on the first machine; the whole run used 84 of 90 minutes and about 1.48 million uncached tokens. Root's check ([final review](../evals/runs/stage-3-person-1/final-review/README.md)): the site introduces the whole person, every beat is a picture of its subject, one work runs, every work opens its own page, all five traps hold. It is still short of the author's V3 bar: props set on one book at one angle, pages that never become the picture. Served at http://127.0.0.1:3000/ from `person-1-review-site`.

Earlier, 22 October (night, later): **the person test is ready for turn 6, which must be sent from the machine the run was made on.** Taken up in a second clone (pulled from GitHub at `543c51a`), root rebuilt the turn-5 site from its saved snapshot and viewed all 15 beats with the captions hidden: each shows its own subject on the runbook, except that Kestrel Freight and the working documents show the same three documents, the Lumen Pay beat is a blank book by design, and the camera never moves ([turn-5 disposition](../evals/runs/stage-3-person-1/turn-5-disposition.md)). The [turn-6 gate](../evals/runs/stage-3-person-1/gates/after-5.json) is written. The agent's conversation, workspace, Codex and pinned tools are only on the first machine, so turn 6 runs there ([how to continue](../evals/runs/stage-3-person-1/README.md)).

Earlier, 22 October (night): **the person test is paused after turn 5 of 6, to continue in another session.** The skill now builds a site that introduces the person; its first test, on Dawit Bekele, has passed the concept and storyboard gates and built all 15 beats. [How to continue](../evals/runs/stage-3-person-1/README.md): view the turn-5 chapters, write the turn-6 gate, run turn 6, serve the site for the author's review. Nothing pushed (the commits to `543c51a` were later found on GitHub). To continue on another device, carry `/var/tmp/storyfolio-transfer/` and follow [TRANSFER.md](../evals/runs/stage-3-person-1/TRANSFER.md). [Summary of the whole 22 October session](history/2026-10-22-session-summary.md).

Earlier, 22 October (late): **in discussion with the author, the portfolio structure is settled** ([spec](superpowers/specs/2026-10-22-portfolio-structure.md)): the site introduces the whole person in eight chapters (hello, where from, studied, worked, good at, made, others say, contact), brief on the scroll with detail on a click, a through-line held to the bar of the author's own V3 scenes. The author approved it ("yes this looks right") and it is now in the skill: the eight chapters in order, background asked for at the first stop, a through-line object that can become each chapter's picture with V3's scenes as the bar, three candidate pictures per chapter, one project shown working, detail on a click. Untested; no run until the author says.

Earlier, 22 October (evening): **the author rejected meaning rerun 4** and the approach behind all four reruns ([record](history/2026-10-22-author-rejects-rerun-4.md)): each scene must picture its section (the person, their work, their field), not rearrange one set of pieces. No paid run until the author agrees the design change. The author then said "yes change it please" ([record](history/2026-10-22-change-the-design-direction.md)); the [design amendment](superpowers/specs/2026-10-22-scenes-picture-their-section.md) and the skill now say each chapter's scene pictures its section from the person's world, illustration of their field is allowed when labelled, and the one-object and drawn-quantity rules are gone. Not yet tested by a run; a run needs the author's word.

Earlier, 22 October: **the author rejected the turn-6 site at review**:
"It is just the same 3d asset roaming around across each scene. Is this
how you tell a story?" ([record](history/2026-10-22-author-review-first-reaction.md)).
The formations show nothing a chapter is about; Stage 3 does not close on
this site. Root traced the cause in [author review 1](../evals/runs/stage-3-spine-time-1/recovery/author-review-1.md); the author then said "Fix the skill and try again" ([record](history/2026-10-22-fix-skill-and-rerun-direction.md)). The skill now asks what each beat shows with the captions hidden, lets confirmed facts be drawn, chooses the concept that shows the most, and keeps faces readable and chrome off the object. A fresh six-turn journey on the same fixture tests it.

Earlier checkpoint, 22 October: **the whole-site check is complete; the author's desktop and phone review is next.**
The author answered "Claude implements now" and dropped the 12 million
reported-token ceiling for turns 3 to 6, keeping the time and uncached
ceilings ([decision record](history/2026-10-21-claude-implementation-and-ceiling-decision.md)).
A host restart had wiped `/tmp`; the pinned Node, npm cache, Chromium,
OS libraries and trusted dependency tree were rebuilt at their exact
paths, proven identical where hashes exist ([restore record](../evals/runs/stage-3-spine-time-1/environment-restore-1.md)).
An additive [recovery binder](../evals/runs/stage-3-spine-time-1/recovery/README.md)
measured the concepts from the post-closure archive. Unit 1 stopped at
startup on a missed tooling path; unit 2 hit a 0.078-px checker false
negative; after the author chose a checker-only fix, [unit 3 passes the
stop-2 gate](../evals/runs/stage-3-spine-time-1/recovery/concepts-3-disposition.md)
with all 48 originals reviewed. The generated `site/.next-concepts` cache
was moved out of the live workspace intact, and fixed turn 3 (storyboard)
launched at 05:56 UTC through [continue.mjs](../evals/runs/stage-3-spine-time-1/recovery/continue.mjs).
Turn 3 closed normally and [stop 3 passes](../evals/runs/stage-3-spine-time-1/recovery/turn-3-disposition.md):
a ten-beat, 11.5-screen storyboard for the bring-up fixture, proposed
explicitly and accepted under the ten-beat exception, with every checklist
row disposed and no invented fact. Repetition and face-word legibility are
carried forward. After turn 3: 21.2 of 90 minutes and 469,319 of 1.5
million uncached tokens used. Turn 3 alone used 261,186 uncached tokens in
under three minutes, so root projects that the uncached ceiling, not time,
may bind in turns 4 to 6. [gate-after-3.json](../evals/runs/stage-3-spine-time-1/recovery/gate-after-3.json)
passes a dry run, and fixed turn 4 ran at 12:02 UTC. [Turn 4 completed
natively but its capture failed](../evals/runs/stage-3-spine-time-1/recovery/turn-4-capture-disposition.md)
on the regenerated `site/.next-concepts` cache, as turn 2 did. The agent
offered two looks and waited for a choice. After turn 4: 51.2 minutes and
587,800 uncached tokens left. The author [chose the turn-2 recovery path and
dropped the uncached ceiling for turns 5 and 6](history/2026-10-21-turn-4-recovery-and-uncached-ceiling-decision.md).
Root archived turn 4's 205 files, extended the recovery binder to turn 4,
and measured both looks: [stop 4 passes](../evals/runs/stage-3-spine-time-1/recovery/looks-1-disposition.md)
with all 32 originals reviewed. Recorded against the criteria: supporting
pages were built before the look choice (a candidate skill finding for
after this run). Unreadable face words, the rail over the opening geometry
and faint caption-column rectangles are carried forward. Turns 5 and 6 run
through [continue-2.mjs](../evals/runs/stage-3-spine-time-1/recovery/continue-2.mjs),
whose capture skips exactly `site/.next-concepts` and which lifts the
uncached ceiling; [gate-after-4.json](../evals/runs/stage-3-spine-time-1/recovery/gate-after-4.json)
passes a dry run, and turn 5 ran at 12:52 UTC. [Turn 5 completed
natively after a transport fallback](../evals/runs/stage-3-spine-time-1/recovery/turn-5-transport-disposition.md):
the agent built the remaining chapters, showed three whole versions of the
opening and closing with a recommendation, and waited; the exact capture
worked. The runner rejected the turn because the stream holds WebSocket
reconnect errors from before any work. 36.0 minutes of actor time remain.
The author chose to [count it under a narrow transport rule](history/2026-10-21-turn-5-transport-fallback-decision.md):
reconnect and HTTPS-fallback errors only, all before the agent's first
action, then one normal completed turn. Under that rule [stop 5
passes](../evals/runs/stage-3-spine-time-1/recovery/turn-5-disposition.md)
on source and reply review; the new chapters are not yet browser-checked.
Turn 6 runs through [continue-3.mjs](../evals/runs/stage-3-spine-time-1/recovery/continue-3.mjs);
[gate-after-5.json](../evals/runs/stage-3-spine-time-1/recovery/gate-after-5.json)
passes a dry run. Cumulative uncached tokens after turn 5: 1,697,614
(ceiling lifted). [Turn 6 completed](../evals/runs/stage-3-spine-time-1/recovery/turn-6-disposition.md)
with Opening A and Closing A applied word for word and an honest final
handover; root's transport rule had matched only turn 5's wording, was
widened after seeing turn 6 (disclosed), and now covers it. The agent made
`.next-concepts` the site's default build directory, which the final
check must account for; after a corrected question the author chose [to build into `.next`
through the agent's own `STORYFOLIO_DIST_DIR` during the final check](history/2026-10-21-final-check-build-folder-decision.md). All nine
units then ran ([interim record](../evals/runs/stage-3-spine-time-1/recovery/final-1-interim.md)):
build and seven browser modes pass with their audits; the extra pages all
pass, but the unit failed a frozen cache rule that never covered route
handlers, and the author [accepted it on root's diagnosis](history/2026-10-21-final-check-cache-and-review-decisions.md).
Root viewed all 677 originals (535 whole, 142 byte-identical) and the
coverage verifier passes. [Verdict](../evals/runs/stage-3-spine-time-1/recovery/final-1-disposition.md):
technical, factual and workflow checks pass; visually the site fails
Detail and hierarchy (unreadable words on the pieces, the rail over the
geometry, faint bands behind captions) and is weak on Spatial at two
beats. Three candidate skill findings are recorded for after the author's
review. Total actor time 67.5 of 90 minutes. The runner pins turn 3's exact `PATH`, so launch with the one recorded in
`turn-3-command/command.json`. `/tmp` tooling must be checked before any
run after a restart. Local commits only; no push.

Latest summary: [what is left to complete the skill](superpowers/plans/2026-10-14-remaining-work-to-completion.md),
answering the author's [14 October request](history/2026-10-14-remaining-work-request.md).
One ordered checklist of 24 items to a releasable skill; three are done.
Still Stage 3: the timing proof passed stop 1 and its agent built stop 2,
whose concepts await recovery binding and an independent check. New
projection, not an observed failure: the proof's reported-token and
cumulative time ceilings may run out before turn 6, so the author is
asked to settle that policy before turn 4. Documentation only; no run,
skill change or push. Earlier checkpoints below retain their chronology.

Latest status question: [where are we after the local commits?](history/2026-10-13-stage-status-after-local-commits.md)
Still Stage 3, currently awaiting independent verification of the fresh
journey's concepts. No product or test state changed in this status answer.

Latest local checkpoint: [the full post-closure authored source is archived](../evals/runs/stage-3-spine-time-1/source-recovery-disposition.md),
189 files including the actual app, fact ledger and current concept notes.
The original failed capture is preserved, not promoted. The
[measurement adapters](../evals/runs/stage-3-spine-time-1/measurement/preparation-disposition.md)
pass preparation checks but have not run. Next: additive recovery binders
and same-session continuation accounting, concrete source/target checks,
then independent concept measurement before fixed turn 3. Stage 3 is open.
All work is organized as documented local-main commits, without a push.
Archive integrity, skill/people checks and all 351 repository tests pass
in local-tests-7. Adapter preparation separately passed 71 focused checks
and all 351 repository tests in local-tests-5. No browser pass is inferred.

Current result: [timing-proof turn 2 completed natively but its source capture failed](../evals/runs/stage-3-spine-time-1/turn-2-capture-disposition.md).
The recorder included the actor's custom `.next-concepts` build cache and
hit its snapshot byte bound after normal model completion. No SIGTERM,
timeout or paid retry occurred. All 149 inputs and 105 retained artifacts
verify, but no complete source snapshot or independent concept pass exists.
Next: additive, explicitly post-closure source recovery, then real concept
verification before any fixed turn 3. Four original turns remain in the
same session and cumulative budget. No skill change or Stage 3 completion.
The author [requests coherent commits with detailed documentation on local main](history/2026-10-13-local-commit-direction.md).
No push is authorized. Earlier checkpoints below retain their chronology.

Latest timing-proof result: [turn 1 completed normally and passes fact/preflight review](../evals/runs/stage-3-spine-time-1/turn-1-disposition.md).
The independent review and root agree; native same-session screenshot
delivery is corroborated. All 149 inputs and 97 source files verify;
all 351 tests pass in local-tests-3. After committing the actual gate,
send only unchanged fixed turn 2. No concept or site acceptance yet.

Current readiness: the [fresh timing proof is ready for its sole start](../evals/runs/stage-3-spine-time-1/launch-disposition.md).
All 149 inputs, exact declared deltas and 94 unchanged initial files verify;
root viewed the neutral original and every setup command closed normally.
All 351 tests pass in local-tests-2. After committing readiness, launch only
turn 1 and assess its actual factual/preflight handoff before continuing.
No site or behavioral pass is inferred from preparation.

Latest implementation result: [candidate-3 turn 4 hit its local deadline](../evals/runs/stage-3-storyboard-length-1/turn-4-timeout-disposition.md).
Three looks and supporting features were built; a look question appeared in
progress, but no completed terminal turn/usage or updated handover exists.
Its own 18-case pass predates a final CSS change. All 201 saved/live source
files verify. The failed cohort stays closed and no skill wording changes.
Under the current completion direction, root prepares [one fresh timing proof](../evals/runs/stage-3-spine-time-1/README.md)
with 30-minute per-turn, unchanged 90-minute cumulative and token ceilings,
and the prospective same-fixture ten-beat exception. This is a disclosed
measurement/scope variance, not a retroactive or same-budget pass. Stage 3
still needs the complete journey, comparisons, regression and actual review.

Current implementation direction: [follow the recommended sequence until Stage 3 is complete](history/2026-10-13-stage-3-implementation-direction.md).
This accepts the recommended ten-beat exception for the current fixture,
recorded prospectively while preserving the normal-range miss. Resume the
existing candidate at fixed turn 4 after original integrity/readiness
checks and commit. Three original gated turns remain, followed by the
finite comparisons, regression, whole-site checks and actual author review.
The [continuation record](../evals/runs/stage-3-storyboard-length-1/implementation-continuation.md)
tracks this work. No new permission question is needed for ordinary steps
already within the plan. Stage 3 remains open; no push or publication.

Current planning checkpoint: the author asks for stage status and a next
implementation plan. Start with the [13 October consolidated plan](superpowers/plans/2026-10-13-stage-status-and-next-implementation.md)
and [exact request](history/2026-10-13-next-implementation-request.md).
Stage 1 is implemented with closure decisions open; Stage 2 is complete;
Stage 3 has build guidance and a candidate at storyboard approval, not an
accepted full site; Stage 4 packaging follows that acceptance. Next visible
work is a three-beat spine in reviewable looks, conditional on the author's
still-pending ten-beat scope decision. The plan recommends that exception
for this fixture only, without passing normal-range coverage. No new run,
skill change or tracing installation occurred. Earlier checkpoints below
retain their chronology; this plan is the current next-work summary.

Latest question: [can SIGTERM origin and reason be determined?](history/2026-10-13-sigterm-attribution-question.md)
Read-only checks confirm the known receive/forward path, not the initial
sender. Narrow journal queries had no entries; sender-aware tracing was not
installed or enabled. Future tracing could identify the sending process;
its reason needs correlated sender/service logs. No attribution to the
author, new run, helper change or shorter-storyboard approval follows.

Newest result: [candidate-3 turn 3 completed normally](../evals/runs/stage-3-storyboard-length-1/turn-3-disposition.md)
and explicitly proposes ten meaningful beats across twelve screen heights,
asking approval for the shorter structure. Total length and explicit
exception-request behavior improved; the fixed 12-to-22 requirement remains
unmet and no shorter exception is approved. Root [asks for that scope decision](history/2026-10-13-stage-3-short-storyboard-decision-request.md).
No turn-4 gate or paid continuation is authorized until it is settled.
Integrity verifies all 149 inputs, 380 new artifacts and full 186-file
live/saved source; all 87 app files are unchanged. All 47 focused checks and
351 repository tests pass. No other storyboard blocker was found. Stage 3
is still open; no new skill instruction, push or publication occurred.

Latest result: [all seven resumed browser batches passed](../evals/runs/stage-3-storyboard-length-1/concept-continuation-disposition.md),
with normal closure and no further SIGTERM. Complete coverage is 18 reports
and 144 individually viewed originals, unchanged 185-file source and 536342
ms of the original 900000-ms execution cap. The old operation-02 interruption
remains explicitly reconciled, not normalised. Stop 2 passes only for choosing
among three provisional concepts; visual limitations remain recorded. All
47 focused and 351 repository tests pass. After committing the gate, root
may resume only the existing candidate-3 fixed turn 3 under its earlier
six-turn approval. The storyboard correction and Stage 3 are not yet proved.

Newest direction: [the author approved the narrow browser continuation](history/2026-10-13-stage-3-browser-continuation-approval.md),
saying "yes start again. I did not give any sigterms". Continue only the seven
unstarted batches within the original remaining 766134 ms, no model calls
or reruns. Preserve and explicitly reconcile the exact reviewed operation-02
outer interruption; never rewrite it as normal success. Later operations
still need normal closure. The author denies sending SIGTERMs; the technical
sender remains unknown, not attributed to them. No new push permission.
The [separately bound continuation is ready](../evals/runs/stage-3-storyboard-length-1/concept-continuation-launch-disposition.md),
with independent source review, concrete unchanged-source preflight, 47
focused tests and all 351 repository tests passing. After committing this
readiness, root may launch batch 03, without another setup or model call.

Latest result: the approved replacement observed successful phone pointer
and keyboard navigation with the fragment-aware fix. Its browser worker
closed normally, but the outer recorder then received external SIGTERM at
21:16:23.969 UTC, sender unknown. The [root interruption disposition](../evals/runs/stage-3-storyboard-length-1/replacement-interruption-disposition.md)
preserves four complete reports, all 32 reviewed originals and unchanged
185-file source without passing the interrupted outer gate. Seven batches
remain unstarted; no turn 3 or further retry. All 37 focused tests and 351
repository tests pass. Root [asks to resume only those seven batches](history/2026-10-12-stage-3-browser-continuation-request.md)
using verified completed captures within the original remaining 766134 ms,
with no model calls or reruns. No new answer or exception is recorded yet.
Stage 3 and the storyboard-length behavior remain unproved.

Newest direction: the author answered, "you can retry", approving the
[single browser-only replacement](history/2026-10-12-stage-3-wrapped-link-verifier-approval.md).
Root is correcting only the wrapped-inline hit-test apparatus, with new
separately labelled helpers/evidence and the same 15-minute summed execution
cap, no model calls and no further retry. Do not ask for this approval again.
Old failure and skill bytes remain unchanged. No concept pass is implied.

The replacement [launch disposition](../evals/runs/stage-3-storyboard-length-1/concept-replacement-launch-disposition.md)
now has passing independent source review, 37 focused checks, all 351 tests
and concrete binding preflight. The new helper records actual link-fragment
hit points and activates the selected real point without force. Original
coverage/visibility/focus requirements remain. All old inputs/evidence verify.
After this readiness is committed, root may run the single bounded replacement.

Latest checkpoint: candidate-3 concept measurement stopped at operation 02,
normal exit 1 at 19:53:10.264 UTC, with unchanged 185-file source. The
[failure disposition](../evals/runs/stage-3-storyboard-length-1/concept-failure-disposition.md)
retains four reports and all 30 reviewed originals. The phone enclosure
link was visible, focused and initially clicked successfully; the formal
trials failed a union-center hit test on its wrapped inline text. A checker
false negative is strongly supported, not a proven new skill defect.
Missing formal responses and seven remaining batches do not pass. No
turn 3 or retry occurred. All 351 repository tests and 24 focused tests
pass in `local-tests-5`. Root [asks for one browser-only replacement](history/2026-10-12-stage-3-wrapped-link-verifier-request.md),
same 15-minute summed execution limit, no model calls or further retry.
No answer is recorded yet. Existing no-retry authority is exhausted for
this measurement. The paid conversation remains intact with four gated
turns remaining; Stage 3 and the length correction remain unproved.
The chronology below preserves the preceding checkpoints.

Newest direction: the author [approved the storyboard correction and one
fresh matched journey](history/2026-10-12-stage-3-storyboard-correction-approval.md).
The [new study](../evals/runs/stage-3-storyboard-length-1/README.md) records the
single length paragraph and candidate-3 preparation. Same model/prompts,
up to six gated 15-minute turns, existing browser limits, no judge or retry.
Do not ask for this approval again. Candidate 2's failed storyboard stays
closed; source capture is corrected prospectively before the new run.
The one-paragraph correction is independently source-reviewed and passes
skill validation, skill/people checks and all 351 repository tests in the
new study's `local-tests-1`. Behavioral improvement remains unproved until
the fresh matched journey; no new paid actor has launched at this point.
Candidate 3 now has a [passing fresh readiness and launch disposition](../evals/runs/stage-3-storyboard-length-1/launch-disposition.md):
149 frozen inputs, 94 unchanged initial files, one reviewed neutral image
and all 18 proof bindings verified. Only the declared paragraph, snapshot
policy and five setup derivatives differ. All twelve focused tests and 351
repository tests pass. After committing readiness, root may launch its
single paid turn 1 under the approved finite bounds. No behavior pass or
Stage 3 completion is inferred from setup.

Candidate 3 turn 1 has now closed normally at 19:16:35.596 UTC. Its
[factual-stop decision](../evals/runs/stage-3-storyboard-length-1/turn-1-disposition.md)
passes fact questions and actual actor preflight without a baseline exception.
The audit verifies 149 inputs, 199 artifacts and 97 complete saved/live files;
native-session evidence corroborates screenshot viewing. No-current-helper
is accepted conditionally, not as observed recommendation/refusal success.
All 351 tests and skill/people checks pass in `local-tests-3`. After this
checkpoint is committed, root may send the unchanged fixed turn-2 truth
reply. No concept, storyboard improvement or Stage 3 completion is claimed.

Candidate 3 turn 2 then completed normally at 19:31:03.249 UTC and genuinely
waits for a concept choice. Its prospective snapshot captures all 185 files,
including 87 nested app files. Facts, recommendation and wait are supported;
independent browser usability remains unobserved. Root reviewed all 21
retained actor images and recorded small-label/spatial limits. The
[concept launch disposition](../evals/runs/stage-3-storyboard-length-1/concept-launch-disposition.md)
permits one fresh nine-target measurement after concrete-binding preflight
and commit, with one 15-minute summed execution cap, no model call or retry.
All 24 focused tests and 351 repository tests pass in `local-tests-4`.
No turn 3 has launched. The corrected storyboard-length behavior remains
unobserved, and actual author desktop/phone review is still required.

Latest completed checkpoint: the browser replacement passed and original
candidate-2 turn 3 then completed normally at 18:15:06.499 UTC. Its
storyboard fails the fixed scope: eight beats, nine screens calculated in
review, with no stated total, versus the required 12 to 22 and no approved
shorter exception. Facts, checklist and genuine approval wait remain
positive evidence. The [root disposition](../evals/runs/stage-3-completion-2/full-journey-recovery/candidate-2/turn-3-disposition.md)
blocks fixed turn 4. Integrity verifies 149 inputs, 403 old artifacts,
378 new artifacts and the full 184-file saved/live source. All 351 repository
tests and 36 continuation tests pass in `local-tests-25`, with skill/people
checks. The storyboard reference omits the design's whole-story length
guidance. Root [asked for one narrow correction and fresh matched journey](history/2026-10-12-stage-3-storyboard-correction-request.md)
because the present allowance permits no further attempt. No answer,
skill edit, new journey or turn 4 is recorded yet. Stage 3 remains open.

Latest direction: [finish Stage 3, using paid agents where needed](history/2026-10-12-stage-3-completion-authority.md).
The author said, "its okay to use a paid agent if you want but please finish
stage 3". Follow the [execution plan](superpowers/plans/2026-10-12-stage-3-completion-execution.md)
and [new work record](../evals/runs/stage-3-completion-2/findings.md): saved-source
verification, supported workflow corrections, matched tests and the full
journey. Earlier per-test restrictions below are historical, not a reason
to ask again for ordinary needed work. Real author desktop/phone acceptance,
immutable old evidence and no-push remain. Stage 3 is not complete.

Newest direction: the author answered "Approve one fresh same-model attempt".
The [exact approval](history/2026-10-12-stage-3-capacity-retry-approval.md)
permits a separately labelled `codex-full-journey-candidate-2`, with the
same skill/model/prompts and up to six gated 15-minute turns, no judge or
further retry. Root is preparing its own readiness under the
[prospective decision](../evals/runs/stage-3-completion-2/full-journey/preparation/candidate-2-preparation-decision.md).
Candidate 1 remains immutable. Candidate 2 now has passing fresh readiness:
149 frozen inputs, 94 unchanged source files, one reviewed neutral original
and an independent audit of all 18 proof bindings. Only the three declared
helper/test/document bytes differ from candidate 1; skill/model/prompts
remain exact. All 351 tests pass. The
[launch disposition](../evals/runs/stage-3-completion-2/full-journey/preparation/candidate-2-launch-disposition.md)
permitted its one paid attempt after commit. Turn 1 has now completed
normally: factual questions and real actor preflight pass. The integrity
audit verifies 149 inputs, 199 artifacts and 97 live/saved files. Native
session evidence corroborates its screenshot viewing, which the CLI stream
omitted. Its deliberate no-current-helper decision is accepted conditionally,
not scored as recommendation/refusal success; those branches remain
unobserved. The [stop-1 decision](../evals/runs/stage-3-completion-2/full-journey/preparation/candidate-2-stop-1-disposition.md)
permits the unchanged truth reply without a baseline exception. All 351
tests pass in `local-tests-18` at that checkpoint.

Turn 2 has since completed normally at 15:30:17.216 UTC. It built three
distinct local concept sketches and genuinely asks which to select. All
149 inputs and both turns' artifacts verify. The original snapshot captured
98 files but omitted the 84 application files under `site/`, so frozen
measurement and turn 3 are blocked, not passed. Root separately preserved
the 182-file live source and 19 actor-check images after closure, then
reviewed all originals. Small object labels and weak explanatory connections
remain visual limitations; no independent browser capture or author
acceptance is claimed. The
[recovery decision](../evals/runs/stage-3-completion-2/full-journey/preparation/candidate-2-source-recovery-decision.md)
authorizes only narrow study-local apparatus preparation and tests at this
checkpoint. A separately frozen amendment may permit one concept capture
and, only after a real passing gate, the same session's four remaining fixed
turns. No additional paid attempt, retry, judge or reset budget is allowed.
The original cohort and incomplete snapshot stay immutable. No turn 3 has
launched; Stage 3 remains incomplete.
The independent recovery audit verifies the 182-file later checkpoint and
all original artifacts/images. `local-tests-19` passes all 351 repository
tests and skill/people checks; amendment implementation still needs its
own focused tests and review before any amended capture.

The amendment is now separately bound and ready for its final launch check.
Its actual-data preflight verifies 149 original inputs, 403 actor artifacts,
182 recovered files and 42 frozen helper identities. All 52 focused recovery
tests and all 351 repository tests pass in `local-tests-20`, with skill and
people checks. Root and independent source review preserve the original
criteria and evidence. The [bounded capture disposition](../evals/runs/stage-3-completion-2/full-journey-recovery/candidate-2/concepts-launch-disposition.md)
permits one recovered-source concept measurement after commit and final
concrete-binding review. It does not pass the concepts or authorize turn 3.
No new paid attempt or budget reset is allowed.

The single amended browser capture then received external SIGTERM before
its deadline. First signal: 16:23:31.845 UTC; outer closure: 16:23:33.934,
code 1 after 175023 ms. The sender remains unknown. Source, original
artifacts and all 61 partial capture artifacts verify. Root reviewed all
53 originals: six primary concept/viewport reports have no technical
problems, but navigation/appearance coverage is interrupted or absent and
visual limitations remain. The strict verifier rejects the incomplete
capture. No owned process match was found in scoped checks; no cleanup,
paid turn 3 or retry occurred. Read the
[interruption disposition](../evals/runs/stage-3-completion-2/full-journey-recovery/candidate-2/concepts-interruption-disposition.md).
Root has [asked for one browser-only replacement](history/2026-10-12-stage-3-browser-replacement-request.md),
split into short batches with a 15-minute total execution cap, no model calls
and no further retry. No answer is recorded at this checkpoint. The paid
conversation itself is intact, with four gated turns remaining. Stage 3
is still incomplete; the missing gate is not silently passed.
All 351 repository tests plus skill/people and auditor syntax checks pass
in `local-tests-21` after the interruption. No new skill change was made.

The author subsequently answered "Approve one browser-only replacement".
The [exact approval](history/2026-10-12-stage-3-browser-replacement-approval.md)
permits one separately labelled short-batch verification with a 15-minute
total execution cap, no model calls and no further retry. Root is preparing
the narrow batch/counting adapter; old helpers, source, criteria and failed
capture remain immutable. Do not ask for this same approval again.
The [replacement launch disposition](../evals/runs/stage-3-completion-2/full-journey-recovery/candidate-2/batched-launch-disposition.md)
now binds nine additive helpers and the unchanged twelve targets. All 16
focused tests and all 351 repository tests pass on the final source in
`local-tests-23`, with skill/people checks. Actual-data preflight passes.
Setup and all twelve individually reviewed batches share 900000 ms of
whole-invocation execution, including coordinator overhead. No browser or
paid model has launched at this preparation checkpoint; any interrupted
batch stops the replacement without retry.

The approved replacement has now completed with no model calls or retries:
all 24 desktop/phone cases and all 192 individually reviewed originals are
accounted for, with unchanged source and preserved original evidence.
Whole execution was 710524 ms of the shared 900000 ms cap. The strict
verifier passed at 18:00:48.077 UTC; scoped checks found no remaining capture
process match. The [root concept disposition](../evals/runs/stage-3-completion-2/full-journey-recovery/candidate-2/batched-concepts-disposition.md)
passes only the provisional concept-selection gate. Small surface labels,
weak Light contrast and weak spatial explanation remain, not final visual
passes. All 351 repository tests and 16 focused tests pass in
`local-tests-24`, with skill/people checks. After commit and read-only
readiness, the original same-session turn 3 may proceed under the existing
six-turn approval, with no new attempt, retry, judge or prompt change.
The replacement allowance is consumed. No paid continuation has launched
at this checkpoint. Stage 3 and actual author acceptance remain open.

Earlier checkpoint: the matched candidate invocation was rejected by the
model service for capacity before any agent reply or command. It closed
normally, not by timeout/interruption, with usage unavailable. All 149
inputs, 196 artifacts and 94 unchanged source files verify. The
[capacity disposition](../evals/runs/stage-3-completion-2/full-journey/preparation/candidate-capacity-disposition.md)
preserves this as an execution failure with no skill behavior result.
All 351 tests still pass. The correction is committed but remains unproved;
Stage 3 is incomplete. The current no-retry bound is exhausted, so root
asked for [one separately bounded same-model attempt](history/2026-10-12-stage-3-capacity-retry-request.md).
No answer is recorded at this checkpoint; no retry/model switch/push was
made. A user answer must be preserved verbatim before any new launch.

Earlier checkpoint: the fresh matched candidate is ready for its first paid
turn. Exactly three skill files differ from baseline-2 among 149 inputs;
all other input/capability/measurement bytes match. Its own neutral proof,
original review and independent readiness audit pass, with 94 unchanged
unscaffolded source files. The
[launch disposition](../evals/runs/stage-3-completion-2/full-journey/preparation/candidate-launch-disposition.md)
keeps the original finite bounds and requires every real gate, without the
baseline-only exception. All 351 tests pass in `local-tests-14`. No paid
candidate result or Stage 3 completion is claimed yet.

Earlier checkpoint: the demonstrated early-workflow correction is now
implemented in three skill files, with independent source review and all
351 repository tests passing in `local-tests-13`. It adds build-only
preflight/helper advice and three runnable concept sketches while preserving
planning-only work and the successful factual/choice gates. The entrypoint
is 765 words; the concept reference is 1499. The
[instruction binding](../evals/runs/stage-3-completion-2/written-against.md)
links each change to the closed baseline. Behavior remains unproved until
the one fresh matched candidate journey; its setup is next.

Earlier checkpoint: baseline-2 is closed after two normally completed turns.
It preserved facts and offered three written concepts with a real choice
handoff, but built no runnable concept previews. The
[baseline disposition](../evals/runs/stage-3-completion-2/full-journey/preparation/baseline-2-disposition.md)
blocks turn 3 and browser measurement; no fictional selection is sent.
All inputs, both turns' 403 artifacts and 98 source files verify. Root now
makes only the demonstrated preflight/helper and runnable-concept
corrections before the one planned fresh matched journey. All 351 tests
pass in `local-tests-11`; no skill change has yet been applied.

Earlier checkpoint: the first paid journey turn completed normally. Its
factual handoff passes, but actor preflight and relevant optional-helper
recommendations were omitted. The
[root disposition](../evals/runs/stage-3-completion-2/full-journey/preparation/baseline-2-stop-1-disposition.md)
permits unchanged turn 2 under the predeclared baseline-only exception.
This baseline cannot serve as whole-site proof. Integrity, lifecycle,
session and usage pass; all 351 repository tests pass in `local-tests-10`.
The skill remains unchanged pending completed baseline discovery.

Earlier checkpoint: baseline-2 is ready for paid turn 1. Its single neutral
proof passed normally, root reviewed the new original, final readiness
passed, and an independent byte/source/evidence audit verified all 149
inputs and 94 unscaffolded source files. The
[readiness audit](../evals/runs/stage-3-completion-2/full-journey/preparation/baseline-2-readiness-audit.json)
records the exact scope. Only five measurement-helper/documentation files
differ from failed setup 1; skill, prompts and capabilities are identical.
All 351 repository tests pass in `local-tests-9`. The actual paid journey
still awaits launch and its six observed gates; setup is not site proof.

Earlier checkpoint: the first full-journey neutral setup proof failed
normally before browser or model activity because Codex prepended two
launcher directories to PATH. All 149 frozen inputs and 94 source files
are independently verified unchanged. The narrow, independently reviewed
[prospective correction](../evals/runs/stage-3-completion-2/full-journey/preparation/environment-path-correction.md)
checks those exact launcher contents while preserving the complete outer
environment. Twelve focused tests and all 351 repository tests pass in
`local-tests-8`. The failed baseline-1 stays immutable; a new baseline-2
setup gets one neutral proof before the first paid baseline. No skill,
capability or prompt changed, and no full-journey actor has launched.

Earlier checkpoint: the third desktop calibration completed normally, with
all 102 originals reviewed and source/build/artifact/lifecycle integrity
independently verified. Twelve technical diagnostics and the five-beat
scope finding remain failures. The apparatus faithfully records them;
another calibration is not needed to force the manual prototype to pass.
The [root disposition](../evals/runs/stage-3-completion-2/full-journey/calibration-3/disposition.md)
permits fresh full-journey setup and its own neutral environment/readiness
proof before paid turn 1. All 351 repository tests pass. Prior interruptions
remain unexplained, and no full-journey actor has launched at this checkpoint.

Latest runtime checkpoint: the second desktop calibration stopped with
outer exit 143 before its deadline. All 75 available originals were
reviewed, and the unchanged source/build plus archived launch helpers
were independently verified. A surviving owned server was reverified and
stopped; the subsequent scoped scan found no owned ties. The missing
terminal report remains missing. Read the
[interruption audit](../evals/runs/stage-3-completion-2/full-journey/calibration-2/interruption-audit.md)
and [partial visual review](../evals/runs/stage-3-completion-2/full-journey/calibration-2/desktop-visual-review.md).
Before another paid launch, root is checking neutral command longevity and
preparing prospective live logging, artificial-focus reset and scope-based
capture deadlines. These changes do not identify the interruption sender
or turn partial evidence into a pass. See the
[bounded no-model diagnostic decision](../evals/runs/stage-3-completion-2/process-supervision/longevity-1/launch-decision.md).
The checkpoints below preserve the sequence leading here.

Both neutral longevity probes have since completed their full 11 minutes,
with journals/tool output verified and their exact PIDs absent afterward.
Polling-cadence deviations and causal limits are retained. The
[root disposition](../evals/runs/stage-3-completion-2/process-supervision/longevity-1/disposition.md)
selects unchanged pipe transport and permits one new desktop apparatus
calibration with durable logging. The
[remaining-proof sequence](../evals/runs/stage-3-completion-2/full-journey/preparation/final-proof-sequence.md)
puts the full journey before renewed matched entry/wording candidates so
those checks use the final skill revision. No product-proof gate is waived.

Current measurement checkpoint: the unchanged manual prototype's new
full-journey calibration completed normally, with source/artifact integrity
verified and all eight gate plus 102 desktop originals reviewed. It exposed
two apparatus issues, scroll-response timing and Next response-cache
identity. Original failed results and helper bytes are preserved; narrow
study-local corrections are in preparation. See the
[calibration review](../evals/runs/stage-3-completion-2/full-journey/calibration-1/desktop-review.md).
The planning-regression adapter has 13 passing focused tests, and all 351
repository tests still pass. No full-journey actor or final regression has
launched at this checkpoint.

The two measurement corrections are now implemented and independently
source-reviewed. All 51 focused measurement checks and 351 repository tests
pass. The [new-labelled second calibration](../evals/runs/stage-3-completion-2/full-journey/calibration-2/protocol.md)
is prepared with 23 preserved helper files and the same unchanged prototype
source/build. It still awaits its single desktop capture at this checkpoint.

Latest implementation checkpoint: the saved entry source has now passed a
fresh independent narrow capture. All 32 originals were reviewed; both
looks render and switch on desktop and phone. Small 3D labels remain a
phone legibility limitation. The original timeout and missing choice gate
remain failures, not erased by this measurement. See the
[source-bound review](../evals/runs/stage-3-completion-2/entry-replay/visual-review.md).
The candidate skill now includes the supported look and whole-beat wording
stops, with [line-level reasons](../evals/runs/stage-3-completion-2/written-against.md).
These changes are pending fresh matched tests, full-journey proof and final
planning regression. No new paid actor has run at this checkpoint.

Candidate entry setup is ready: skill commit `692b11b`, 133 frozen inputs,
177 initial source files plus one neutral environment record, a successful
offline install and actual capability probe, nine reviewed starter originals
and passing strict readiness. The sole capability difference from baseline
is an additional unrelated skill being disabled, explicitly recorded before
freeze. The fresh ordinary-entry actor subsequently launched once, then
stopped with outer exit 143 before a final reply or normal closure record.
Root preserved its 179 source files and 80 workspace-check files separately,
without inventing a result. No owned processes remained at recovery checks.
Its partial three-beat spine is positive evidence, but the choice gate is
unproved and strict measurement cannot proceed. See the
[interruption disposition](../evals/runs/stage-3-completion-2/entry-candidate-preparation/interruption-disposition.md).
The matched wording and full journey are in preparation; Stage 3 remains
incomplete.

Wording setup is now ready: 216 frozen inputs, unchanged 97-file site and
two prompts, successful fresh install/capability proof, nine reviewed
originals and strict readiness. A separately tested recorder retains
future process IDs and signals without claiming the previous cause is
fixed. See the [next launch](../evals/runs/stage-3-completion-2/wording/preparation/launch-disposition.md).
The full-journey runner passes the now 351 repository tests; actual whole
journey behavior and final acceptance remain unproved.

The wording actor then launched once and was externally interrupted before
its deadline. This time genuine incomplete result and snapshot records were
retained. Its draft contains three opening and three closing versions, but
the final choice handoff and usage are absent, so turn 2 cannot run. All
186 source files match; 379 actor artifact hashes verify. The
[wording disposition](../evals/runs/stage-3-completion-2/wording/interruption-disposition.md)
preserves this as inconclusive, not a pass or an instruction defect. The
new recorder captured SIGTERM but its sender remains unknown. Full-journey
preparation continues separately; there is no hidden retry.

Stage-level position: **Stage 3, the build, is active and incomplete.**
Stage 1's planning method is implemented with closing review decisions open;
Stage 2's engine is complete and approved. The candidate skill now routes
requested builds beyond the approved storyboard, with the build workflow
still under test. The approved manual prototype demonstrates the
quality target, not a proven reusable build workflow. Stage 4 packaging
follows the complete-site proof. The author's request for this framing and
the remaining product work are in the
[12 October stage checkpoint](history/2026-10-12-stage-status-clarification.md).

The author has now [directed implementation to finish Stage 3 first](history/2026-10-12-stage-3-development.md).
The [completion work record](superpowers/plans/2026-10-12-stage-3-completion.md)
tracks the supported build workflow and full-site proof as the product
milestones. Local measurement repairs and the controlled comparison fixture
are implemented and verified with 342 passing repository tests. The
[development findings](../evals/runs/stage-3-integration-1/findings.md)
record browser evidence, independent review and the two unapplied visual
instruction drafts. The author subsequently [approved the bounded comparison](history/2026-10-12-stage-3-comparison-approval.md)
with "Approve this bounded comparison". The fresh baseline completed its
single turn in 645.672 seconds. All seven technical modes pass and all
253 original images are reviewed, but both targeted visual gaps remain.
Two supported conditional build-review paragraphs were tested and are
[retained provisionally](../evals/runs/stage-3-comparison-1/candidate-disposition.md).
The [actual outcomes](../evals/runs/stage-3-comparison-1/findings.md)
keep technical, text and visual results separate, including the judge's
outer-status discrepancy and a disclosed install-only setup variance. The
candidate's single paid turn hit its 15-minute deadline after commit
`a32813e`, without a final reply. Its 184-file partial source is saved.
Independent type, lint, build, desktop and phone checks pass, but browser
capture was then externally interrupted; short-height and four later modes
remain incomplete or unobserved. The complete-packet gate blocks a candidate
judge, so none ran. Available images show narrower visual improvements,
not a full acceptance result. No retry or continuation is allowed. All 342
repository tests still pass. Stage 3 remains
incomplete and normal skill use still ends at the approved storyboard.

The author then [approved one verification-only capture](history/2026-10-12-candidate-verification-approval.md)
with "yes let us try to complete stage 3". The new
[verification study](../evals/runs/stage-3-candidate-verification-1/findings.md)
keeps the candidate source unchanged, preserves the interrupted attempt,
and enforces a 15-minute process limit with no new actor, judge or retry.
Preparation was committed as `f12fc9b`. The single capture subsequently
received external SIGTERM after 624,633 ms, before its own deadline, and
closed after 624,926 ms. The source is unchanged. Desktop, phone and
short-height pass; reduced-motion coverage is partial, and no-WebGL,
no-JavaScript and context-loss remain unobserved. All 203 retained originals
are reviewed and their source/artifact integrity verifier passes. The
unknown interruption is preserved separately from
the first attempt. No retry or Stage 3 completion is inferred. The
[next proposed ordinary-entry test](superpowers/plans/2026-10-12-stage-3-natural-entry-proposal.md)
has a [separate approval question](history/2026-10-12-natural-entry-request.md),
unanswered at that checkpoint. The author has now
[approved that single build-entry test](history/2026-10-12-natural-entry-approval.md)
with "Approve this single build-entry test". The
[new baseline work](../evals/runs/stage-3-natural-entry-1/findings.md)
was prepared and locally verified: one unchanged-skill agent turn and one relevant browser
verification, each at most 15 minutes, no judge, retry or continuation.
No correction or matched rerun is authorized.
Preparation commit `bf72be9` and the study retain 132 frozen inputs, the fresh
workspace, successful offline installation and sandbox capability proof,
nine reviewed starter originals and a passing independent readiness gate.
Setup was committed as `066d283`. The sole actor then timed out after
900,071 ms with no terminal reply and unavailable usage. Ordinary build
entry worked: it implemented the five story chapters, but proceeded after
an unanswered look question. Two source-defined looks exist; their rendered
reviewability is not independently verified. The saved handover honestly
records a provisional, unapproved default and invalidated check attempts.
The frozen browser launcher was not started: all 180 saved source files
match, but 18 extra `.git-local` metadata files fail its exact-inventory
precondition. No metadata was removed or exclusion weakened. The
[source observation](../evals/runs/stage-3-natural-entry-1/source-observation.md)
and [binding blocker](../evals/runs/stage-3-natural-entry-1/source-binding-blocker.md)
separate actor behavior from measurement failure. A measurement-only repair
and unchanged-source verification need a separate decision and new
measurement-baseline label. No extra actor, judge, skill edit or push was made.
Stage 3 remains incomplete.

The [pre-development handover](history/2026-10-12-before-stage-3-development-handover.md)
preserves `784eb1e` verbatim before this checkpoint's current-state updates.

The [pre-engine handover](history/2026-10-11-before-engine-handover.md)
preserves this day's earlier current-state wording verbatim.

The [pre-prototype handover](history/2026-10-11-before-fixture-prototype-handover.md)
preserves the state before the author authorized visual recovery implementation.

The [pre-depth-approval handover](history/2026-10-11-before-depth-approval-handover.md)
preserves `fd03055` verbatim before recording acceptance of the revised story.

The [pre-preparation handover](history/2026-10-11-before-build-preparation-handover.md)
preserves `75d1f35` verbatim before implementing the local diagnostic tooling.

The [pre-controls-fix handover](history/2026-10-11-before-shared-controls-handover.md)
preserves `39ceeb7` verbatim before the authorized shared-controls correction.

The [pre-transport handover](history/2026-10-11-before-judge-transport-handover.md)
preserves `3e23cc9` verbatim before the authorized local judge-delivery repair.

The [pre-freeze handover](history/2026-10-11-before-build-freeze-handover.md)
preserves `6d419ea` verbatim before the authorized final local preparation.

The [pre-reconciliation handover](history/2026-10-11-before-baseline-reconciliation-handover.md)
preserves `b81d2b7` verbatim, including the premature incomplete-actor report
corrected in [the reconciliation record](history/2026-10-11-baseline-reconciliation-and-development.md).

The complete previous handover, including every author statement, command,
result and caveat, is preserved [verbatim in the archive](history/2026-10-10-handover.md).
[The archive index](history/README.md) maps its sections and records the
preservation checks. Historical instructions describe their original moment;
use this page and the current runbook for work now.

## What exists now

[Storyfolio](../skills/storyfolio/SKILL.md) takes a person's profile through
fact confirmation, three concepts and an approved storyboard for one long
scroll carried by one 3D object from their work. It plans a site and stops
before building it. The method is implemented and has multiple completed
evaluations. Stage 1 still has closing review and validation decisions;
the reusable engine is implemented, locally verified and approved after
the author's desktop and physical-phone review. Stage 2 is complete and
Stage 3 implemented the fictional seven-beat row-card site across a spine
study and a bounded continuation, but **the author rejected its visual
quality**. The [comparison with the originating portfolio](../evals/runs/codex-visual-quality-review-1/findings.md)
finds a substantial loss of authored detail, spatial storytelling and useful
exhibits. The constrained fixture and our acceptance criteria caused this
to be presented too favorably. Six functional browser conditions pass and
49 images were reviewed for narrower concerns; those are not a visual pass.
The [recovery plan](superpowers/plans/2026-10-11-visual-quality-recovery.md)
puts a convincing three-beat prototype before another full build.
The author then said, "yes lets proceed with it". The new manual
[fixture prototype](../prototypes/fixture-study/README.md) implements those
three beats using an illustrative bench assembly, connected observation
relationship and distinct observed/projected evidence. Its
[specification](superpowers/specs/2026-10-11-fixture-prototype.md) records the
new design choices. At that checkpoint, actual author visual approval was
still pending. It is not an unchanged-agent rerun or
a completed Stage 3 proof. Local evidence and final verification are in
[the prototype findings](../evals/runs/visual-recovery-prototype-1/findings.md).
The author subsequently said it looks better, but clarified that
"The story needs more depth". The [feedback record](history/2026-10-11-prototype-depth-feedback.md)
and [five-beat revision](superpowers/specs/2026-10-11-fixture-story-depth.md)
keep that distinction explicit. The revised prototype adds scheduling and
evidence-provenance sections, develops inspection explanations, and promotes
sample scope into the ending. The physical object is not enlarged or
decorated in response to this clarification. Its new
[depth study](../evals/runs/visual-recovery-depth-1/findings.md) remains manual
development. Asked whether its depth was closer to their intent, the author
said, "yes this is good". The [approval record](history/2026-10-11-story-depth-approval.md)
accepts the revised story's depth and direction at `fd03055`. The author then
said, "yeah it works fine on phone". That [phone confirmation](history/2026-10-11-fixture-phone-approval.md)
closes this bounded prototype's author-review gate. Full Stage 3 acceptance
remains separate. The first source
is preserved at `71ae3ea`, and its evidence is unchanged.
The depth study's build, lint, type checks and local tests pass. All 96
original images were inspected across the seven-mode capture and a focused
desktop/phone checker rerun. The original capture retains its stale Board
sentence assertion failures; the corrected expectation passes on unchanged
page source. The [audit](../evals/runs/visual-recovery-depth-1/verification.json)
verifies source, image and harness hashes. This remains bounded software
browser evidence, not physical-phone approval or a visual acceptance score.
The completion judge was rejected by the CLI input limit before its model turn, so no
behavioral score exists for that study. The shipped skill still plans only;
the non-sheet whole-site proof and final packaging remain open.

The author then said, "okay then let us proceed", after the proposal to
plan how the skill can reproduce this quality. The
[planning authorization](history/2026-10-11-build-workflow-planning.md) and
[reproduction plan](superpowers/plans/2026-10-11-build-workflow-reproduction.md)
define the next preparation: a five-beat, one-appearance diagnostic with
unchanged skill instructions and the accepted implementation held out.
The author then approved no-model preparation with "yes", recorded in
[the preparation authorization](history/2026-10-11-build-preparation-approval.md).
Versioned diagnostic runner/judge support, the new fictional derivative and
independent measurement tooling are now implemented. The
[preparation findings](../evals/runs/build-workflow-preparation-1/findings.md)
record verification and known-example calibration. Final freeze is deferred:
the shared scene-controls defect is reproduced, and complete historical
evidence still exceeds the judge's transport limits. A separately reviewed
engine correction and transport decision are needed before the actual
actor-workspace proof. The proposed one-turn actor and optional single judge
remain unapproved. No paid call, shipped skill/engine change or push was made.

The author then answered "yes" to fixing the shared-controls bug next.
The [authorization](history/2026-10-11-shared-controls-approval.md) is limited
to that engine repair and local verification. The shipped Story now places
its existing controls provider above both Canvas and HTML, sharing one stable
store per Story. The [new engineering study](../evals/engine/shared-controls-1/findings.md)
preserves the failing baseline and passing regression evidence separately.
The accepted prototype and earlier studies remain unchanged. Behavioral skill
instructions, judge transport, final diagnostic freeze and paid execution
are not changed by this repair. No push is authorized.

The author next said, "yes lets get the next thing done", approving the
[judge-evidence transport repair with local testing only](history/2026-10-11-judge-transport-approval.md).
The explicit, frozen `paged-v1` option now preserves the complete logical
judge prompt through bounded read-only pages. Inline delivery and its limits
remain the default. The [new local study](../evals/runs/judge-transport-1/findings.md)
reconstructs both historical packets byte for byte, including all 154
document bodies in the oversized completion packet. All 305 repository
tests pass, and the installed CLI accepts the isolated configuration.
This is local server/configuration evidence, not a live model tool loop,
proof of comprehension or a new score. The pending diagnostic selects this
transport without changing actor inputs, rubric or expectations. Final
input freeze and actual actor-workspace proof still need their own step;
the reserved cohort is unprepared. No paid call, old retry, behavioral skill
change or push was authorized or made.

The author then answered "yes" to completing the
[final local input freeze and actor-workspace preparation](history/2026-10-11-build-freeze-approval.md).
The [new freeze study](../evals/runs/build-workflow-freeze-1/findings.md)
supersedes the deferred-freeze status above. The cohort
`codex-bench-depth-baseline-1` now contains 121 frozen inputs from `6d419ea`,
with digest
`57b8614b2334d19a387829598e9978f7d5ecc0412bfd364448c1cb5643b77f7e`.
The initial external workspace contains only the seven fixture files and
86 unchanged skill files before scaffolding, then 172 source-bound files.
Locked offline installation adds 392 packages. The exact frozen Codex
sandbox passes loopback access, an explicit external-request proxy 403,
production build and the starter's `light-wide` browser check. Nine original
images were inspected. These are coordinator capability observations, not
actor preflight, an implemented five-beat prototype or new visual approval.

The external runtime uses `/var/tmp/storyfolio-freeze-runtime-20261011`
after explicit storage approval because `/tmp` had only 71 MB available.
No existing data was deleted. `TMPDIR` is not included in the runner's
input digest, so it is retained in a separate setup record and enforced by
the final read-only audit alongside the exact Node and four frozen
environment values. The study retains factual actor setup information,
source-change checks and the commands for rechecking the prepared workspace.
No actor or judge turn, skill/engine edit, historical retry or push was made.
The author subsequently approved the proposed paid envelope, recorded in the
[launch authorization](history/2026-10-11-build-baseline-launch-approval.md).
It permits exactly one fresh actor turn and at most one validated text judge,
with no retry or continuation. Results, including a failure to launch or
complete, must be retained in the frozen cohort before any new decision.
The same actor turn completed in 766.005 seconds, after recovering from the
blocked registry request with the offline cache. The assistant's earlier
incomplete report was premature, not a second actor attempt. The
[corrected findings](../evals/runs/codex-bench-depth-baseline-1/findings.md)
retain the final source, raw events, actor-owned checks and separate
coordinator assessment. The one authorized judge received all 23 evidence
pages, but the runner failed while parsing concatenated progress messages
and final JSON. Its raw failed result is unchanged; a separate audit
validates the terminal JSON against the frozen evidence and rules. Neither
text assessment nor technical checks establish visual acceptance.

The independent browser check completed all seven conditions with unchanged
source. Its frozen verdict fails in every condition on the same intentionally
focus-only skip-link pointer trial, while keyboard activation works. The
separate modality review attributes that checker mismatch without rewriting
the results. Original-image review also finds genuine visual weaknesses:
the bench relationship is mostly in prose beside disconnected labels, and
console wording overlaps during sampled transitions. This is not a visual
pass or approval to advance to the full-site gate. The first interrupted
capture and a caught signal in the completed second attempt remain recorded.

The author then authorized continued development after the tests, with
[full local access](history/2026-10-11-baseline-reconciliation-and-development.md).
The demonstrated judge-response parsing defect is now repaired, with
deterministic regression evidence in the
[parsing study](../evals/runs/judge-response-parsing-1/findings.md).
The subsequent [local measurement checkpoint](../evals/runs/stage-3-integration-1/findings.md)
implements focus-only skip-link applicability and source-inventory alignment,
as required by the [post-baseline plan](superpowers/plans/2026-10-11-post-baseline-attribution.md).
The shipped skill and engine remain unchanged. New behavioral instructions
still require a supported miss and a separately decided matched rerun;
there is no new paid allowance or push authorization.

The current candidate adds only two conditional build-review paragraphs:
compare settled scene meaning with the storyboard, and inspect changing
face words during forward/reverse travel. Its saved fresh baseline misses,
exact selection, placement and matched conditions are in the
[candidate decision](../evals/runs/stage-3-comparison-1/candidate-decision.md).
The main skill is 799 words with four references and preserves its
planning-only endpoints. Structural checks and 342 local tests pass;
behavioral improvement and planning regression are not yet established.

Earlier direct planning changes are two paragraphs in
[the storyboard reference](../skills/storyfolio/references/storyboard.md):

- Explain the person's work and unfamiliar terms in ordinary language at
  the opening. The focused cohort passes clarity in 6/6 plans and the full
  rubric in 3/6. [Opening findings](../evals/runs/codex-opening-1/findings.md).
- Specify the closing answer and its supporting facts before polishing
  captions. The focused cohort supplies supported answers in 6/6 plans and
  passes the full rubric in 5/6. [Closing findings](../evals/runs/codex-closing-1/findings.md).

These are small independent cohorts, with earlier skill-version differences.
They support targeted improvements and do not establish a general success
rate. Earlier factual refinements and their evidence remain in the
[study catalogue](../evals/studies.md).

The root [README](../README.md) now provides public-facing installation and
usage guidance for the planning-only skill. Following the author's report
that the repository is public, it now has a paper-object concept illustration,
examples from the concept reference, the three approval points, installation
guidance for capable agents and the five planning files users receive.
Codex and Claude Code are concrete installation examples; file-reading agents
have a prompt-based path. The README restores the originating portfolio
credit and links current official client documentation. [LICENSE](../LICENSE)
adds the MIT license selected in the original design record; `package.json`
declares the same SPDX identifier. The [publication and README record](history/2026-10-11-readme-and-publication.md)
preserves author wording, earlier status statements, review and verification.

The other accepted work added a richer physics fixture, optional diagnostic
v2 judging and a privacy prototype. It did not change creative guidance.
Both physics plans explain the supplied calibration, but diversity remains
mixed. V2 preserves original scores and does not validate skill improvement.
Exact public-file grants pass twelve deterministic privacy probes, but are
not integrated into the live runner. The skill alone does not enforce
privacy; the failed PhD reads remain evidence. See the
[completed improvement plan](superpowers/plans/2026-10-10-accepted-improvements.md#completed-outcome)
and its linked findings.

## Current directions and open work

The author asked to improve the skill by evaluating the supplied
`portfolio-website-steve` checkout. The bounded
[Steve review pilot](superpowers/plans/2026-10-11-steve-review-pilot.md)
ran one natural source-only review with the unchanged skill. The agent
selected and read the skill, then produced useful evidence-backed feedback
without entering concept selection or requiring 3D. No observed miss called
for a skill instruction, so there is no candidate edit or paid rerun.
[Review findings](../evals/runs/codex-steve-review-before-1/findings.md).

Independent local browser checks accompany the
[portfolio review](../evals/runs/codex-steve-review-observations-1/review.md).
The main issue is a primary work link leading to a project placeholder;
mobile figure controls also need attention. These browser observations
were not supplied to the source-only test agent. The new one-turn runner,
frozen source case and review criteria establish a repeatable local case,
not general review support or a success rate.

The source HEAD is `9a5603d51463eb2564f8b5a117b2242678c660b1`.
Thirteen allowlisted real source/assets files and source context are saved
under `evals/reviews/steve-source/`, outside fictional people. The original
checkout and its modified lockfile are preserved; `Profile.pdf` remains
unopened. The earlier source-review note is preserved verbatim in the
[publication and README record](history/2026-10-11-readme-and-publication.md#earlier-publication-guidance).
The author now reports that Storyfolio is public. This README change does
not establish whether the earlier publication review was completed.

1. The author accepted a separate existing-portfolio review direction,
   with feedback before redesign and general usefulness distinguished
   from Storyfolio's particular form. The [design](superpowers/specs/2026-10-10-existing-portfolio-review.md)
   and [implementation plan](superpowers/plans/2026-10-10-existing-portfolio-review.md)
   remain the broader proposal. A minimal review runner and the real Steve
   pilot are complete. A dedicated skill entry path, fictional control,
   GitHub/deployed acquisition and browser-enabled review evaluation remain
   unimplemented. The real case took priority at the author's request.
   Independent local browser inspection here does not establish that a test
   agent can acquire and interpret browser evidence. The author's own site
   remains a walkthrough rather than independent generalisation evidence.
2. Creative consistency and the author's assessment of which concepts are
   worth building remain open. The richer physics example provides a
   concrete diversity miss for any future instruction; do not prescribe
   object materials or invent work details to force variety.
3. Live privacy enforcement is separate future integration work. Keep the
   original failed benchmark and distinguish actual file access from
   private information appearing in final output.
4. Stage 1 closure still needs the fresh whole-repository review, the
   completed stronger-model check and an explicit decision about broader
   final validation after the latest changes. Earlier cohorts concern
   earlier versions. Do not repeat a paid full batch without a question
   it needs to answer. Engine and built-site work now have a plan, corrected by the
   [stage coherence review](superpowers/plans/2026-10-11-stage-review.md).
5. On 11 October 2026 the author asked whether the skill is well written.
   The review and seven drafted rewrites are in
   [the wording review](superpowers/plans/2026-10-11-skill-wording-review.md);
   none is applied and no run was made. It found that `asking.md` names the
   answer to the analyst fixtures' scored `fraudshield-not-real-time` trap.
   The author's subsequent request to validate that review is recorded in
   [the independent assessment](superpowers/plans/2026-10-11-skill-wording-review.md#independent-assessment-11-october-2026).
   It confirms the example overlap and an inconsistent first-reply list,
   but qualifies the style claims and the proposed experiment. Historical
   runs remain useful regression evidence; the old eight-case cohort does
   not isolate today's rewrites. A renewed unsupported claim must still be
   recorded as a failure, and the cited privacy target did not pass. The
   assessment recommends prioritizing the example replacement in any future
   change, with a specific evaluation question first. No rewrite or model
   evaluation was made; local checks passed, including all 54 tests after
   approved execution outside the sandbox.
   [The response](superpowers/plans/2026-10-11-skill-wording-review.md#response-to-the-assessment-11-october-2026)
   accepts those corrections and narrows two findings from saved runs. The
   example was first printed after the first reply in 17 of 18 logged
   analyst conversations, and could have cued only the six analyst-hurried
   final plans. Every first reply that left a private file unopened names
   it, so draft 7 is withdrawn. Current proposal, waiting on the author:
   draft 2 alone, with analyst-hurried run twice as regression coverage for
   that case; draft 1 optional; drafts 3 to 6 not proposed.
   The [follow-up recommendation](superpowers/plans/2026-10-11-skill-wording-review.md#follow-up-recommendation-11-october-2026)
   supports that narrow proposal after checking the saved counts and notices.
   It retains the limits on causal attribution and two-run conclusions.
   The recommendation itself applies no skill change and starts no runs.
   The reviewer then recommended stopping, and the author gave no contrary
   instruction: **the skill stays unchanged and draft 2's runs are not
   made.** Asked what else is wrong,
   [a rescoring of every saved Codex skill judgement](superpowers/plans/2026-10-11-skill-wording-review.md#decision-and-what-else-the-saved-judgements-show-11-october-2026)
   finds no new text defect that a run shows. analyst-hurried is 4 of the 38
   runs after codex-sol-1 and 22 of their 46 failed criteria, partly
   because its addresses are placeholders, and 4 of 10 student runs fail
   only on the wording of the padding trap. What remains is creative
   consistency and PhD private-file access, as item 2 and item 3 say.
6. **The engine is approved; the completed fictional site is visually rejected.**
   Stage 2 closed after the author's desktop and physical-phone review.
   The [approval](history/2026-10-11-engine-approval.md) and
   [189-test, fifteen-case, 73-image engine proof](../evals/engine/plain-story-1/findings.md)
   remain intact. Its preview is `http://localhost:3010/`.

   The [first baseline](../evals/runs/codex-build-1/findings.md) reached
   the three-beat spine and stopped at its token threshold. Its original
   judgement, one confirmed handover defect, image-observability correction
   and checker calibration remain separate from the later work.

   The author [approved](history/2026-10-11-build-completion-approval.md)
   a fresh bounded continuation. [Completion findings](../evals/runs/codex-build-completion-1/findings.md)
   now record both finished actor turns, the actual copy-choice gate,
   all six chapters/seven beats and eleven fixed sentences, a corrected
   direct evidence anchor, and independent acceptance passing all six
   conditions with unchanged source. All 49 originals were reviewed.
   The actor separately reports 131 site tests and eighteen browser cases.
   The completed local preview is `http://localhost:3011/`; its
   [verification and restart command](../evals/runs/codex-build-completion-1/audits/preview-verified.json)
   are saved. The author subsequently rejected this preview and requested
   comparison with the originating portfolio. The
   [exact feedback](history/2026-10-11-visual-quality-rejection.md),
   [source and browser comparison](../evals/runs/codex-visual-quality-review-1/findings.md)
   and [process audit](../evals/runs/codex-visual-quality-review-1/process-review.md)
   now supersede any implication of product acceptance. The original was
   inspected through source and its repository-supplied screenshot; fresh
   original runtime setup was blocked by absent offline dependencies.

   Five of seven beats use table variants, every face has the same simple
   label treatment, chapter extras are empty, and the phone scene is
   deliberately disabled. The coordinator prescribed the narrow row-card
   fixture and scripted the look choice. The engine already offers richer
   geometry, face and extra hooks, which this build did not use. Other
   bespoke V3 effects were deliberately outside the stock extraction; their
   absence does not justify calling a generic scaffold an equivalent visual
   experience. The previous report overstated readiness by focusing on two
   smaller omissions rather than the missing visual story.

   The controlling development priority is the
   [visual recovery plan](superpowers/plans/2026-10-11-visual-quality-recovery.md):
   three authored beats that demonstrate object identity, a useful spatial
   explanation and a resolving ending, with actual movement and phone review
   before full-site expansion. No new paid evaluation or implementation
   change was made by that comparison. The author subsequently
   [authorized the prototype](history/2026-10-11-visual-prototype-approval.md).
   The manual implementation is now in `prototypes/fixture-study/`, using
   the custom Piece, face, formation and extra hooks. Its local engine
   adaptation shares the HTML controls provider with the scene, allowing
   inspection buttons to highlight the corresponding 3D part. Its authored
   vector fallback preserves the explanation without WebGL or JavaScript.
   Review the preview on port 3012 and the
   [saved findings](../evals/runs/visual-recovery-prototype-1/findings.md).
   The author subsequently accepted the five-beat story's depth and direction
   in the [approval record](history/2026-10-11-story-depth-approval.md).
   The subsequent [phone confirmation](history/2026-10-11-fixture-phone-approval.md)
   closes the bounded prototype review gate. Neither reply requests new
   implementation or authorizes a paid run. No new actor/judge
   cohort was invoked. The original and frozen outputs
   remain intact. The [preceding handover](history/2026-10-11-before-visual-quality-review-handover.md)
   preserves the earlier acceptance wording verbatim.

   The actors took 16 minutes 59 seconds. Their reported counters sum to
   9,508,014 input-plus-output tokens, including 9,129,216 cached input;
   uncached input plus output sums to 378,798. Resumed counters may overlap.
   The final turn crossed the 350,000 between-turn threshold while running;
   no later turn was sent. No dollar charge is available.

   Judge preparation exceeded the original two-MiB packet limit. The
   author [approved three MiB for the single unused judge](history/2026-10-11-build-judge-size-approval.md),
   but the CLI rejected its 2,556,184-character input against a separate
   1,048,576-character ceiling before a model turn. There is no judgement
   or usage report, and no retry. A tested local character guard now catches
   that limit before invocation; complete evidence delivery needs a future
   correction. The failed invocation and all frozen evidence remain intact.

   Two additional concrete omissions remain: the design requires three wording
   versions shown as full beats, while this rubric/run supplied two short
   choices; static State copy refers to rows that are not displayed.
   The [remaining-stage audit](../evals/runs/codex-build-completion-1/audits/remaining-stages.md)
   records the first gap, and the visual reviews record the second.
   Neither has been silently repaired in the saved actor output.

   No optional skill was installed, and no relevant recommendation miss
   has been established. The [governing review](superpowers/plans/2026-10-11-stage-review.md)
   preserves all ten candidates and the early machine check.
   `other-skills.md` remains unwritten. Source/install verification and an
   actual recommendation-then-refusal branch remain unobserved.

   Those earlier studies left shipped skill instructions unchanged. The
   [shared-controls repair](../evals/engine/shared-controls-1/findings.md)
   changes only the engine's Story provider scope, not the accepted prototype.
   Stage 3 still needs its supported build entry point, before-stop-1 and
   concept-sketch coverage, any failure-backed instruction with matched
   reruns, planning regression, and the non-sheet whole-site proof with
   real author approval. The paid continuation allowance is consumed;
   any further question needs its own concrete protocol and cost decision.
   Stage 4 follows the [packaging plan](superpowers/plans/2026-10-11-packaging.md).
   The complete previous status is preserved in the
   [pre-results handover](history/2026-10-11-before-completion-results-handover.md).

The [plan index](superpowers/plans/README.md) identifies completed work,
proposals and historical instructions. The completed documentation migration
is recorded in [its plan](superpowers/plans/2026-10-10-documentation-organization.md).
No portfolio evaluation, skill change or paid run is part of that migration.

The [pre-completion handover](history/2026-10-11-before-build-completion-handover.md)
preserves the state before this continuation approval verbatim.

## Author directions and decision record

Directions below were recorded on 10 October 2026 unless dated otherwise.
On 11 October, the author approved proceeding with the three-beat visual
prototype. Their exact words and the preceding recommendation are in
[the authorization record](history/2026-10-11-visual-prototype-approval.md).
They later reported visual improvement but requested a deeper story, not
more physical detail. Their [exact feedback and clarification](history/2026-10-11-prototype-depth-feedback.md)
govern the five-beat revision. They then [accepted the revised story](history/2026-10-11-story-depth-approval.md)
with "yes this is good"; this is not full-site or physical-phone approval.
Their subsequent ["yeah it works fine on phone"](history/2026-10-11-fixture-phone-approval.md)
confirms the phone check, without approving a full site or starting new work.
After being offered planning for a reproducible build workflow, they said
["okay then let us proceed"](history/2026-10-11-build-workflow-planning.md).
The plan is written and local preparation is now authorized and implemented
up to its engine/transport gates. Paid execution and new skill instructions
remain gated. The [exact preparation reply](history/2026-10-11-build-preparation-approval.md)
and test evidence are preserved separately.
The next "yes" [authorizes the shared-controls correction](history/2026-10-11-shared-controls-approval.md)
and its local checks, not transport implementation or paid execution.
The subsequent "yes lets get the next thing done"
[authorizes the local transport correction](history/2026-10-11-judge-transport-approval.md),
not a final cohort freeze, paid execution, historical retry or push.
The latest "yes" [authorizes the final local freeze and capability proof](history/2026-10-11-build-freeze-approval.md).
The subsequent [explicit paid-run approval](history/2026-10-11-build-baseline-launch-approval.md)
authorizes one actor and a conditionally eligible judge only. It does not
authorize retry, continuation, instruction change or push. The preceding
approval boundaries remain historical records.
The author's subsequent full-access direction authorizes continuing local
development after test assessment under the existing plan, recorded
[verbatim here](history/2026-10-11-baseline-reconciliation-and-development.md).
It is not approval of the new prototype's appearance or physical-phone
behavior, and does not reopen the consumed actor/judge allowance.
On 12 October, the author explicitly [approved the new bounded comparison](history/2026-10-12-stage-3-comparison-approval.md),
one fresh baseline and one supported matched candidate, each with at most
one judge and no retries. That separate allowance does not include natural
entry, planning regression, full-journey runs or push permission.
Exact historical wording and context remain linked, including earlier
pauses and reversals.

| Direction | Current interpretation and full record |
|---|---|
| Keep every project detail in this repository | Record and commit decisions, plans and evidence here; use linked verbatim history when shortening current documentation. [Original decisions](history/2026-10-10-handover.md#what-the-author-has-said) and [repository rules](../AGENTS.md). |
| Method plus starter engine, separate repository, code-built 3D | These design choices stand; the engine is now implemented and approved. Naming, MIT licence and origin-credit defaults are recorded, with packaging still pending. [Original decisions](history/2026-10-10-handover.md#what-the-author-has-said) and [engine approval](history/2026-10-11-engine-approval.md). |
| "please dont use claude code" | Use Codex for new evaluations, with Sol agents and Astra judges at medium reasoning. [Model-role decision](history/2026-10-10-handover.md#current-direction-codex-only). |
| More technical, engineering, STEM and academic coverage | The collection has seventeen cases for twelve fictional people. [Coverage record](history/2026-10-10-handover.md#completed-comparison-broader-technical-and-academic-coverage). |
| "yes, I like your recommendations. Let us implement them" | Five workstreams completed within scope; only two storyboard paragraphs were the latest direct skill changes. [Completion record](history/2026-10-10-handover.md#accepted-improvements-implemented-and-evaluated). |
| Existing-portfolio review direction accepted | The broader path remains proposed; the first real repository pilot is complete. [Accepted direction](history/2026-10-10-handover.md#existing-portfolio-review-direction-accepted-implementation-planned) and [pilot findings](../evals/runs/codex-steve-review-before-1/findings.md). |
| 11 October: "make this skill better by evaluating" the Steve checkout | Evaluate the supplied real example now, before the fictional case. Improve instructions only if the run needs it. This pilot found no such miss; retain the skill and preserve its evidence. [Pilot plan](superpowers/plans/2026-10-11-steve-review-pilot.md). |
| 11 October: "frame a professional README.md describing how people can install and use this skill. Add all necessary information and license too" | README documents installation, activation, scope, usage and contribution. MIT is declared in `LICENSE` and package metadata. Its earlier private-access wording is preserved in the [publication and README record](history/2026-10-11-readme-and-publication.md). |
| 11 October: "Why just codex, this skillshould be able to work with claude too" | README now gives Claude Code equal first-class guidance: install under `.claude/skills/storyfolio`, start a new session and invoke `/storyfolio`. No Claude-specific instruction is needed because the Agent Skills directory and its references are already portable. |
| 11 October: "or rather any AI agent" | README now leads with agent-neutral installation. It distinguishes portable skill-capable agents from interfaces that must receive the directory as instructions, and does not promise compatibility with agents unable to read files or attachments. |
| 11 October: "okay I have made it public. Now make the readme feel more illustrative and inviting" | Author reports public GitHub visibility. README now has a concept illustration, examples, a three-step walkthrough, starter prompts and output-file preview. Agent portability and the planning scope remain explicit. [Full record](history/2026-10-11-readme-and-publication.md). |
| 11 October: "Id want the end goal of my skill to be able to build stuff right? so we need to have these things in the skill as well." | Building is the end goal, as the approved design already says. Stages 2 and 3 are planned in [the stage 2 and 3 plan](superpowers/plans/2026-10-11-stage-2-engine-stage-3-build.md). |
| 11 October: rejection of the demo's richness, detail and 3D presence; request to compare the originating portfolio | This site fails the author's visual bar. Compare source and actual visuals, correct acceptance claims, and prove a convincing three-beat experience before further expansion. [Exact feedback](history/2026-10-11-visual-quality-rejection.md) and [recovery plan](superpowers/plans/2026-10-11-visual-quality-recovery.md). |
| 11 October, answers to two questions: "Plan stage 2 now" and "Recommend; person installs" | Plan the engine now; stage 1's closing items stay open and may run alongside. Other UI, 3D and frontend skills are named at each stop with how to install them, the person installs, and none is required (design lines 498 to 506). |
| 11 October: "You just come up with the implementation plan. Codex will implement it."; then "No commit this plan somewhere so that codex can implement it. NO IMPLEMENTATION FROM YOU" | Claude committed the plan only. Codex implements it. |
| Repository input for deeper portfolio evaluation | Accept GitHub repository URLs and local checkouts alongside deployed URLs. Source, local runtime and deployed evidence have separate provenance. Exact examples and planning update are recorded below. |
| Better organization "without losing any details and information"; then "yes lets get it done" | Implement the documentation proposal with verbatim archives and evidence preservation. [Migration plan](superpowers/plans/2026-10-10-documentation-organization.md). |
| Commit on main; push only on the author's word | Preserve the exact date-scoped push direction in [AGENTS.md](../AGENTS.md). This documentation migration does not need a push or publication. |

### Repository input clarification

On 10 October 2026 the author said: "To evaluate existing portfolio websites,
the user can provide a link but a better evaluation would be to provide the
github repo link or the cloned repo locally." They supplied these examples:

| Supplied WSL path | Linux path in this environment |
|---|---|
| `\\wsl.localhost\Ubuntu\home\kshitij\projects\portfolio-website` | `/home/kshitij/projects/portfolio-website` |
| `\\wsl.localhost\Ubuntu\home\kshitij\projects\portfolio-website-steve` | `/home/kshitij/projects/portfolio-website-steve` |

Both Linux directories and their Git metadata entries exist. At that point,
only existence checks were performed; no project contents, Git history,
source quality or deployment relationship were examined. The later Steve
request authorised evaluation of that checkout. On 11 October the author
also explicitly requested comparison with the original `portfolio-website`,
recorded in the [visual rejection](history/2026-10-11-visual-quality-rejection.md).

The review design and plan now include source file/line evidence, source
revision and working-tree provenance, and running an existing app locally
when feasible. Repository plus observed runtime is the richest input;
source alone does not establish deployed behavior or verify personal claims.
At that planning stage the first case became a frozen fictional repository
snapshot with the same two defects and unchanged initial paid run count.
Offline acquisition checks cover source capture and working-tree preservation;
GitHub access and browser execution remain distinct capabilities to verify.
No skill change, evaluation run, clone, dependency installation or example
repository change was made for this planning amendment.

## Start the next session

For current next work, use the [13 October stage and implementation plan](superpowers/plans/2026-10-13-stage-status-and-next-implementation.md)
and the top checkpoint. The older launch sequence below is historical;
do not use its former pending states as fresh instructions or allowances.

Read [AGENTS.md](../AGENTS.md), this page and the
[corrected baseline findings](../evals/runs/codex-bench-depth-baseline-1/findings.md).
The five-beat test is spent: one completed actor and one delivered judge
response whose original runner failed JSON parsing. Its complete evidence,
separate final-message audit, usage, cross-run tooling caveat and independent
technical/visual assessment are retained. Do not resume, retry or overwrite
the cohort, or ask for the already granted launch approval again.

The [Stage 3 development checkpoint](../evals/runs/stage-3-integration-1/findings.md)
implements the later control-modality and source-inventory repairs, with
342 passing repository tests. Seven valid browser conditions pass and all
15 faulty variants fail; 112 originals were individually reviewed. The
historical 202/390 source mismatch is preserved while both prospective
inventories match on 201 unchanged source files. The
[new fixture](../evals/builds/bench-depth-2/README.md) makes the reviewed
neutral helper, environment facts and skip-navigation contract explicit.
Its verifier, real-browser helper smoke and read-only runner preparation
pass. Those were preparation-only findings. The later
[approved comparison](../evals/runs/stage-3-comparison-1/findings.md) now
records the fresh baseline's completed actor, passing seven-mode technical
check, all 253 reviewed originals and both remaining visual misses. Its
text judge has a valid complete inner result, with an explicitly retained
outer-tool exit-status anomaly. Do not relaunch either spent baseline call.

Follow the [completion plan](superpowers/plans/2026-10-12-stage-3-completion.md)
for the product milestones. The [separate paid question](history/2026-10-12-stage-3-development.md#separate-paid-comparison-question)
was approved with [the exact answer recorded here](history/2026-10-12-stage-3-comparison-approval.md):
one fresh baseline and one matched candidate if needed,
at most one judge each, 15 minutes per build and 10 per judge, no retries.
These deadlines are not a hard token-cost cap. Do not ask for this same
approval again, reopen the spent old cohort or exceed the new envelope.
The two supported visual paragraphs were committed as a conditional skill
candidate at `e7a7230`, after the baseline review. The main skill is 799
words and still planning-only in ordinary use. Fresh candidate setup is
verified with the explicitly recorded installer variance, and its single
actor turn timed out at 900,055 ms without a final reply. Its last source
edit followed its earlier passing checks. Independent checks of the saved
184-file source pass type/lint/build and desktop/phone, but their browser
capture was externally interrupted after 361,175 ms, with unknown signal
origin. Short-height coverage is partial and four later modes are unobserved.
No candidate judge ran because the complete-packet gate was not met.
Use comparison findings and cohort artifacts for exact visual observations
and limits. Do not retry, continue the actor or infer completion from
narrower technical or visual successes. Terminal token usage is unknown.
All 118 retained originals were individually reviewed. The two paragraphs
remain provisional, with planning regression and normal build entry still
untested. The next evidence gap is final-source browser coverage. Another
verification attempt requires explicit new scope under the no-retry rule;
it must preserve this interrupted capture and the actor timeout. No further
paid allowance is inferred, and the candidate judge slot was not used.

The subsequent [verification approval](history/2026-10-12-candidate-verification-approval.md)
now grants that one explicitly scoped capture. Follow its separate study,
not the old complete-only wrapper, and do not ask for the same approval
again. It has now closed at 624,926 ms after another external SIGTERM at
624,633 ms, before its own deadline. Three animated modes pass; reduced-motion is
partial and the three failure modes were not reached. Both interruptions,
all 203 new originals and unchanged source are preserved. No new actor or
judge ran, and the one verification allowance is spent. Use the separate
ordinary-entry proposal and pending specific question for the next product
test; do not relaunch either capture.

Follow the baseline findings' quality attribution before choosing the next
behavioral experiment. Source-level passes do not establish a convincing
visual explanation or justify advancing to early-journey support. Do not
add skill prose for behavior that already passes, or treat environment and
measurement failures as actor instruction defects. New paid work requires
the plan's specific question, scope and cost decision. No additional paid
allowance or push is inferred from full filesystem access.

The accepted manual five-beat prototype at `fd03055`, preview port 3012,
remains the narrative/visual reference with its
[physical-phone confirmation](history/2026-10-11-fixture-phone-approval.md).
That approval does not transfer to the new actor output. Its
[depth findings](../evals/runs/visual-recovery-depth-1/findings.md),
[first prototype findings](../evals/runs/visual-recovery-prototype-1/findings.md)
and [setup](../prototypes/fixture-study/README.md) retain the reviewed
printing, connector, movement, phone and fallback observations. No device
details or measured frame rate were supplied by the author.

Keep the old frozen engine, fixture, request and evaluator intact. The
parser repair changes future evaluator identity; any common retrospective
analysis or new measurement baseline must be explicitly labelled, not
passed off as an unchanged skill-only comparison. Configuration isolation
is not a filesystem read jail. Every new actor record needs its own access
audit and every judge packet its own complete-delivery preflight.
Supported build activation, before-stop-1 capability and three-concept
coverage, two or three implemented looks, three whole-beat wording options,
relevant optional-skill recommendation/refusal, planning regression, the
non-sheet full journey and packaging remain open. Earlier summaries saying
three looks do not supersede the approved design's two-or-three requirement.

On 11 October the author asked about token consumption for reviewing and
building portfolios. The [saved usage audit](../evals/runs/codex-token-usage-audit-1/findings.md)
records Steve's source-only actor at 319,691 input tokens (277,376 cached)
and 3,972 output, or 323,663 input plus output. It excludes the surrounding
coordinator/subagent development and browser-review work. Six current-skill
planning runs have final counters around 249,000 to 439,000 total, with
resume-counter interpretation explicitly provisional. There is no measured
full-build budget. No new portfolio run, pricing claim or skill edit was needed.

Read this handover, [AGENTS.md](../AGENTS.md), the relevant
[plan](superpowers/plans/README.md), and the linked study's actual findings.
Inspect `git status` before editing: another session may have work in the
same checkout. Use [the current evaluation runbook](../evals/README.md) for
commands and [the study catalogue](../evals/studies.md) to locate evidence.

Local prerequisites are Node 22.18 or later with native TypeScript support and, for paid evaluation work,
the Codex CLI signed in to the intended account. Run local checks from the
repository root:

```bash
node evals/check-skill.mjs
node evals/check-people.mjs
npm test
```

The historical completion checkpoint passes all 246 repository tests, including
the new judge character-limit regressions. The earlier engine checkpoint
passed 189 tests; these are different checkpoints.
The newer [no-model preparation verification](../evals/runs/build-workflow-preparation-1/verification.json)
passes 266 tests across 31 suites, plus the fixture and skill checks. Its
synthetic browser calibration passes seven good conditions and catches five
deliberately bad variants, with final source/image hashes verified. This is
measurement testing, not an actor build, new author approval or final freeze.
The later shared-controls checkpoint again passes all 266 repository tests
and adds six dedicated React-context regressions. The study keeps baseline
failures, browser verification and source review separate from those counts.
The later [judge-transport verification](../evals/runs/judge-transport-1/verification.json)
passes all 305 repository tests across 31 suites, the skill and people checks,
and the diagnostic fixture verifier. Local real-process calibration serves
the old spine and completion prompts in 26 and 79 pages respectively,
preserving every byte and checking complete delivery receipts. The actual
accessor descendant terminates on the judge deadline. No model was invoked.
The later [final-freeze study](../evals/runs/build-workflow-freeze-1/findings.md)
again passes all 305 repository tests across 31 suites, the 687-word,
four-reference skill check, all seventeen fictional people and the fixture
verifier. The actual prepared sandbox passes local HTTP, blocked external
HTTPS, production build and starter-browser checks. Its nine inspected
images establish setup capability only. The final source/environment audit
and retained proof are linked from that study; no paid execution is implied.
The subsequent [parser-repair checkpoint](../evals/runs/judge-response-parsing-1/repository-verification/result.json)
passes 310 tests across 31 suites, the skill, people and fixture checks,
and frozen actor/judge artifact verification. It retains the initial host
Node TypeScript-loading failure separately and uses the existing native
Node binary for the successful full suite. Historical skill/engine,
accepted prototype and frozen input bytes are unchanged. These engineering
tests do not establish visual acceptance of the new five-beat output.
The current [Stage 3 development verification](../evals/runs/stage-3-integration-1/verification-1/result.json)
passes all 342 tests across 31 suites, the skill/people/fixture checks,
source-scope reproduction and historical judge audit. Its source hashes
bind the tested changes. The separate local browser and helper evidence
is in the [integration findings](../evals/runs/stage-3-integration-1/findings.md).
No new model evaluation, shipped skill instruction or full-site acceptance
is established by this checkpoint.
The visual-quality review repeated the required checks: all 246 tests,
the skill check and the people check pass. Its
[preservation record](../evals/runs/codex-visual-quality-review-1/verification.json)
confirms unchanged original, shipped skill and frozen/demo source.
The host Node 22 binary lacks TypeScript support; engine checks use a
standard Node 22.22.1 installed in an isolated temporary verification folder. In this environment its Git
subprocess tests need approved execution outside the outer workspace sandbox.
Local checks do not start model conversations. New paid runs need a specific
question, explicit case lists and a new cohort name. Commit the skill before
its runs, preserve originals and record manual corrections with their evidence.
The current models are `gpt-6.1-sol` agents and `gpt-6-astra` judges, both at
medium reasoning; use the runbook rather than historical Claude commands.

## Publication status

On 11 October 2026 the author said, "okay I have made it public. Now make the
readme feel more illustrative and inviting". Current guidance reflects that
reported change; older private-status statements in archived records describe
their original moment. The original pre-publication guidance is preserved
[verbatim](history/2026-10-11-readme-and-publication.md#earlier-publication-guidance),
with the [full earlier record](history/2026-10-10-handover.md#what-this-is)
still available. This README work did not perform the earlier publication
review or change remote visibility, remove artifacts or push commits.
