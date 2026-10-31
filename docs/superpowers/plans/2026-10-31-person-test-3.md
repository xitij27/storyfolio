# Person test 3: person test 2's fixture, from the pieces: plan

> Steps use checkbox (`- [ ]`) syntax for tracking. Executed by root, turn by turn, with a gate between turns.

**Goal:** See whether a fresh agent, given person test 2's Dawit and the skill as it now is, recommends one mix of gallery pieces, shows it running with a reason for each piece, points to the gallery, takes a swap, and finishes the site from the pieces through stops 3 to 6. Its site is what the author reviews to close Stage 3.

**Question:** With the changed second stop, does the agent build Dawit's site from the pieces (not scene code of its own), with only confirmed facts in it, at no more cost than person test 2 (62 minutes, about 1.25 million uncached tokens)?

**Approved:** the author's "yes" on 31 October to "launch plan 3, the paid person test" ([record](../../history/2026-10-31-fix-the-map.md#steps-2-and-3-then-plan-3)), after the map fix ([stitch-3](../../../evals/engine/stitch-3/README.md)) and the two wording fixes.

**Built on:** [person test 2](../../../evals/runs/stage-3-person-2/protocol.md) (same fixture, actor, runner and bounds), [plan 2](2026-10-28-the-site-from-the-pieces.md#after-this-plan) and the [transitions design](../specs/2026-10-27-transitions-gallery-design.md#how-it-is-judged).

Plan 3 of 3.

## Root's calls, for the author to check

1. **The swap at turn 3.** The fixed answer must be written before the run, without knowing the agent's mix. It keeps the agent's mix with one change: "Where I've worked" told by the pop-up book's piece, or by the map's if the book already tells it. Either way one piece changes world, so a new dive is made and the record of the change is tested. The book's "worked" is a skyline with a building per job, which Dawit's three jobs fill.
2. **Only turn 3 changes.** Turns 1, 2, 4, 5 and 6 are person test 2's, byte for byte. Turn 4 ("Yes to the storyboard ... Please build it") still fits: the site runs from stop 2, and building it means finishing the storyboard's chapters. Turn 5 still chooses the recommended look and asks for the wording; turn 6 the recommended wording.
3. **"Looks like my field."** Turn 2 asks for a site that looks like Dawit's field; the pieces are a sheet, a map and a book in three looks. The skill now says the agent shows what each piece leaves out and that the person can suggest a new component or describe a design of their own. So the gate after turn 2 records how the agent answers the ask (which look or piece it names for it, what it says the pieces cannot show, whether it offers a component of its own) but does not stop the run on it. Criterion 8 (Field) is judged at the end as written, and the author's review decides it.
4. **The environment** follows person test 2's, rebuilt on this machine where it was lost: Node 24.14.0 (person test 2 used 22.22.1, which this machine's Ubuntu build cannot run for `.ts`), the npm cache and Playwright's browsers under `/tmp` (the actor may write only its workspace and `/tmp`), the three browser libraries, `TMPDIR` under `/var/tmp`. Recorded in the run's setup evidence. A model is not called to test it.
5. **Cost** is compared, not bounded tighter: the bounds stay person test 2's (six turns, 30 minutes each, 90 in all, 1.5 million uncached tokens).

## Global Constraints

- The run is paid. One repetition. A second only if the first fails for a reason outside the agent (a capacity or tooling failure), recorded first.
- Nothing in the skill changes during the run. The skill under test is `main` at the commit that adds the protocol.
- No push. Publishing and pushes need the author's word.
- Root reads each turn's reply and files before writing its gate. A gate stops the run when its stop condition holds; root then records why and asks the author.
- The people are made up. No em dashes.

## Tasks

### Task 1: The case and the protocol

**Files:** `evals/runs/stage-3-person-3/protocol.md`, `case.json`, `prompts/turn3.md`.

- [ ] Write the protocol before any actor runs: question, fixture, what changes from person test 2, environment, gates and their stop conditions, cost comparison.
- [ ] `case.json`: person test 2's case with `protocol` pointing at the new protocol and turn 3 at `prompts/turn3.md`; everything else unchanged.
- [ ] `node evals/codex-build-run.mjs --case evals/runs/stage-3-person-3/case.json --cohort codex-person-3 --capabilities evals/builds/local-capabilities.json --dry` succeeds with no writes and no model calls.
- [ ] `npm test` and `node evals/check-skill.mjs` pass; commit.

### Task 2: The environment, and preparation

**Files:** `evals/runs/stage-3-person-3/environment.mjs`; the runner writes `evals/runs/codex-person-3/`.

- [ ] Fill `/tmp/storyfolio-npm-cache` (an online `npm ci --cache` from the engine's lock, then `npm ci --offline` in a fresh copy adds every package) and `/tmp/storyfolio-browser-cache` (Chromium 1248 and its headless shell).
- [ ] `--prepare` with the run's environment: `PATH` with Node 24.14.0 first, `npm_config_cache`, `PLAYWRIGHT_BROWSERS_PATH`, `LD_LIBRARY_PATH`, `LANG=C.UTF-8`, `TMPDIR=/var/tmp/storyfolio-person-3`.
- [ ] `environment.mjs` writes `setup/environment.json` (Node, npm, Codex, git, browsers, libraries, no root app, the skill's commit) and `setup/probe.json` with its hashed evidence, as the runner's next steps say. No model call.
- [ ] Commit the prepared inputs and setup.

### Task 3: Six turns, each gated

Each turn: run it with the environment above, logging to `evals/runs/stage-3-person-3/turn-N.log`; read the reply and the workspace; write `gates/after-N.json` (`previousTurnDigest` = SHA-256 of that turn's `result.json`); commit.

- [ ] **Turn 1 (stop 1).** Stop if the reply gives a concept, mix or design, or publishes anything.
- [ ] **Turn 2 (stop 2).** Pass when: `content/person.ts` holds only confirmed facts (none of the five traps); `content/mix.ts` holds one mix; the agent says it ran it at desktop and phone size; the reply gives a reason for each chapter's piece from the fact sheet, what each shows and leaves out, the gallery's address and the invitation (swap, changes, a new component, a design of their own); `docs/story/concepts.md` records the mix and reasons. Root serves the workspace's site and looks at it at both sizes. Stop if the mix is not running (words only), a trap is in the facts, or scene code of its own replaces the pieces unasked. Record how the field ask is answered.
- [ ] **Turn 3 (swap, then stop 3).** Pass when `content/mix.ts` has the swap, `docs/story/concepts.md` records it, and the storyboard is written. Stop if the swap is not made.
- [ ] **Turn 4 (stop 4).** Record whether two or three looks are shown, each running.
- [ ] **Turn 5 (stop 5).** Record what opens on a click (project windows or pages, the CV) and the three whole-beat wording versions.
- [ ] **Turn 6 (stop 6).** The run ends.

### Task 4: Root's check, and the author's review

- [ ] Copy the finished site to `/var/tmp`, build and serve it; run `npm run check`; shoot every hold and move at both sizes.
- [ ] Judge it against [full-journey-3's criteria](../../../evals/builds/full-journey-3/criteria.md), one line each, in `evals/runs/stage-3-person-3/final-review/README.md`, with the cost against person test 2.
- [ ] Ask the author to scroll it on a desktop and a phone; their verdict goes verbatim into `docs/history/`. This closes Stage 3.

### Task 5: Records

- [ ] The handover's step 4 and step 5, its history, and `docs/README.md` if a new folder needs a line.
- [ ] Anything learned only in the run (environment, failures) written into the run's README.
