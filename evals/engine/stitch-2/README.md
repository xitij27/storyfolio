# stitch-2: person test 2's facts made into a site from the pieces

28 October 2026. Task 8 of [plan 2](../../../docs/superpowers/plans/2026-10-28-the-site-from-the-pieces.md),
executed on the author's "okay what next"
([record](../../../docs/history/2026-10-28-what-is-left.md#plan-2-goes-ahead)).
Root did stops 2 to 6 by hand, as the changed skill says, on the made-up
person of person test 2 (`evals/builds/full-journey-3`), to try the new
engine and skill text before any paid run. No model was called.

## What was made

- **The facts:** [dawit.ts](dawit.ts), written as a site's
  `content/person.ts` from the fixture's `workspace/material/` and
  `prompts/turn2.md` only. `checkPerson` returns no problems. Dawit has no
  quotes, so his site has seven chapters.
- **Stop 2, as `references/concept.md` now says:** the site scaffolded with
  `scripts/scaffold.mjs` to `/var/tmp/stitch-2-site`, the facts copied in,
  and this mix ([site/content/mix.ts](site/content/mix.ts)):

  | Chapter | Piece | Why, from the fact sheet |
  |---|---|---|
  | Hello | Sheet | His CV page shows his name, role and every line of his career in one picture |
  | Where from | Map | Three places on two continents (Addis Ababa, Amsterdam, Rotterdam): a route on a real map |
  | What I studied | Map | One degree, in Addis Ababa: the diploma stands where he studied, without leaving the map |
  | Where I've worked | Map | Three jobs in three cities over 13 years: each stands at its place, as tall as its years |
  | What I'm good at | Sheet | Four groups of tools: the sheet folds into a leaflet of them |
  | What I've made | Sheet | Six pieces of work: the wall shows all six at once, each opening its window |
  | Get in touch | Sheet | The CV page again, now his contact page, with the CV |

  The book is not used: its hello draws a figure of a person, and Dawit
  has no picture of himself.
- **Stops 4 to 6, briefly** ([site/](site/)): the blueprint look, his own
  words for the opening and the close, a printable `/cv` page, a page for
  the data-centre exit (`page`) and a paragraph for the orders database
  (`more`), all from his confirmed facts.

## Checks

- `npm run check` passes ([report](site-check-report.json)): 13 shots at
  1440x900 and at 390x844, and 13 with the words on the phone, 0 problems;
  without JavaScript and without WebGL the name and all seven chapter
  titles are shown; `/cv` and `/projects/data-centre-exit` answer 200.
- `stitch-check` of `/preview` in each of the three looks at both sizes,
  with `--points`: 0 problems. Root looked at every hold and dive.
- Frames: [blueprint, desktop](frames/holds-blueprint-desktop.jpg),
  [blueprint, phone](frames/holds-blueprint-phone.jpg),
  [daylight, phone](frames/holds-daylight-phone.jpg),
  [night, desktop](frames/holds-night-desktop.jpg),
  [the two dives](frames/dives-blueprint-desktop.jpg) (sheet into map, map
  into sheet), and [the map's "where from" and "worked" through their
  holds](frames/map-from-and-worked-through-holds.jpg).

## What each piece shows of Dawit, with the words hidden

- **Hello (sheet):** his CV: name, role, places, study, three jobs, skills,
  projects. On a phone it is read in two parts as the camera crosses it.
- **Where from (map):** Europe, a pin and label at Rotterdam, and a route
  running off the bottom of the screen. Addis Ababa is never in view.
- **What I studied (map):** the diploma standing at Addis Ababa beside the
  library's building.
- **Where I've worked (map):** the library's building at Addis Ababa; then
  Kestrel Freight's building at Rotterdam, with Lumen Pay's behind it.
- **What I'm good at (sheet):** a leaflet of four panels: languages,
  platform, data, reliability. Readable on a phone.
- **What I've made (sheet):** six plates with their titles and lines;
  on a phone one column at a time, readable.
- **Get in touch (sheet):** "Write to Dawit", his email, why to write, his
  links. The CV button shows because his CV exists.

Both dives grow a card from the last world (on his CV sheet; standing on
the map's ground) and land on the next world's hold. All three looks read.

## What the pieces get wrong or cannot show, for the author

1. **The map's "where from" does not fit his places.** It frames Europe;
   Addis Ababa, 43 degrees of latitude south of Rotterdam, never comes into
   view, so the chapter's first place is missing from its own picture.
2. **Close places collide on the map.** Amsterdam and Rotterdam are 57 km
   apart: their labels lie on top of each other in "where from" and
   "worked", and in "worked" Lumen Pay's building stands behind Kestrel
   Freight's, hidden.
3. **A long job runs off the screen.** In "worked" a building is as tall as
   its years; Kestrel Freight's six years reach past the top of the frame,
   cutting off its name.
4. **Every project must have a place.** The map stands each where it was
   made. The talk has no known city (only "SRE North"), so it falls back
   to the home place, Rotterdam.
5. **Project pictures are six generic kinds** (chart, photo, maze, route,
   bars, list): none is a talk or a command-line tool, three of Dawit's are
   the same list, and none runs. "One project shown working", from the
   portfolio structure, is not in the pieces; a person would have to ask
   for it as a component of their own.
6. **A long "looking for" line is cut** after two lines on the sheet's
   contact page ("...and for conference...").
7. **Fixed while building:** the sheet's contact page said on every site
   that the CV "is yours to download", whether or not one exists. It now
   ends "It folded into every picture above."

Root's recommendation: fix 1 to 3 in the map before plan 3's paid run,
since the rerun is on Dawit; 4 to 6 can wait for the author's review.

## Decisions made while building plan 2

Where the plan was silent or wrong, root decided and went on. Each line
says what was decided, why, and what it costs if wrong.

- Setup: no worktree, work on `main` (AGENTS.md: "Commit on main"); cost if wrong: none, commits are local and unpushed.
- Setup: every decision below is copied here from the git-ignored ledger, so it stays in the repository; cost if wrong: none.
- Tasks 5 and 6: Task 5 added `check:plain` and left `check` as the old check (now aimed at `/plain-story`) until Task 6 pointed it at `site-check.mjs`, so `npm run check` never pointed at a missing file; cost if wrong: none.
- Task 1: `uiColours` also returns `muted` (rail and hint) and `onText` (words on the second contact button, whose background is the UI text colour); without them night's rail changes and daylight's second button is dark on dark; cost if wrong: two extra fields.
- Task 1: `groundTones(p)` derives the backdrop and the map's ground from the look's ground by fixed shifts, so night's stay byte for byte as before; the plan named only the palette; cost if wrong: one more function.
- Task 1: the first check run hit an older server from plan 1 still holding port 3100 (`/var/tmp/stitch-site`) and showed no looks; later checks used port 3117. Not a code change.
- Task 2: `Anchor` is `{ position, quaternion, size, rest? }`; `rest` stands the card on the element's lower edge (the map's ground) instead of centring it; cost if wrong: one optional field.
- Task 2: the book's card stands upright on the right page's front edge, turned to the reader; lying on the page it was covered by the pop-ups and the banner was still on screen at the switch; cost if wrong: the book's dive swoops down to the card rather than onto the page.
- Task 2: the card's paper glows at 0.45 of its colour; under the sheet's dim lamp it read as grey; cost if wrong: it glows slightly in bright worlds.
- Task 3: no fading of the other quote cards; at the phone's reading width the view holds one card at a time, which the fade was for; cost if wrong: a neighbour's edge shows during the pan.
- Task 5: `check:plain` was verified (15 of 15) with the scratch copy's `shoot.mjs` launching `CHROMIUM` (Chromium 1234), since playwright-core 1.64 wants headless shell 1248, not installed here; the repository's `shoot.mjs` is unchanged; cost if wrong: none, an environment variance.
- Task 8: the sheet's "yours to download" clause removed (finding 7), though it failed no check, against the plan's "fix only what fails a check": it is a claim the skill's first rule forbids; no unit test covers words drawn on a canvas, so it was checked in the shots; cost if wrong: the sheet's close loses a clause.

## To make it again

```bash
node skills/storyfolio/scripts/scaffold.mjs /var/tmp/stitch-2-site
cp evals/engine/stitch-2/dawit.ts /var/tmp/stitch-2-site/content/person.ts
cp -r evals/engine/stitch-2/site/* /var/tmp/stitch-2-site/
cd /var/tmp/stitch-2-site && npm ci && npm run check
```

Here `CHROMIUM=$HOME/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`
names the installed browser.
