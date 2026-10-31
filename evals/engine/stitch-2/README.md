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

Findings 1 to 3 were fixed on 31 October, on the author's word:
[stitch-3](../stitch-3/README.md).

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

## The final review, and what it changed

After Task 9 one fresh reviewer read the whole change (12f6c5f7..659f2110)
against the plan and the design: 2 critical, 4 important and 8 minor
findings. Root confirmed each and fixed the critical and important ones in
one pass, each shown failing first:

- **Chosen words never showed in a book chapter** (the book hides the
  caption and printed lines from data). The book's left page now carries
  the person's own words for that chapter, in the body's type and whole
  (`stitch/pages.ts`, tested in `pages.test.ts`; seen on Dawit's hello and
  contact in the book).
- **On a phone, tapping a project on the sheet's wall opened another
  one:** picking re-posed the wall at the middle of the hold, which Task
  3's pan made wrong. It now picks against the pose last drawn. A browser
  check tapped the top-left plate early in the hold: "Photo colouriser"
  opened before, "Train delay forecaster" after.
- **In daylight the rail was unreadable over the book's dark desk:** the
  rail's words, its dots and the hint now carry a halo in the caption
  glass's colour (night's labels over light paper read better too). Seen in
  shots before and after; a stylesheet has no unit test.
- **A project's `more` was missing without the 3D,** and **`npm run check`
  looked only for the name and chapter titles:** the text written out for
  anyone without the 3D now carries `more`; the story writes into the page
  what it must show (`data-stitch-expect`), and the check looks for every
  chapter's words, every project's title, line, `more` and page link, and
  the CV link (`missingFromPage`, tested; it failed on Dawit's site before
  the story wrote what it must show).
- **Pages without their own title showed the placeholder "Storyfolio |
  Placeholder":** the layout now titles every page with the person's name
  and describes it by their role, in `site.lang` (English by default). The
  check now asks an address that is not there for 404 and the person's
  name in its title (`pageTitle`, tested; it failed on "Storyfolio |
  Placeholder" before).

After the pass, `npm run check` passes on Dawit's site and on the
placeholder person; 411 + 4 repository tests pass.

Left for the author (minor): `site.cv` is not checked as an address, as a
project's `page` is; `/preview?person=noa` shows the owner's CV button;
the project window's "More about" link and daylight's chapter number are
below 4.5:1 contrast at small sizes; the phone reading width is in world
units and "narrow" is an aspect below 0.9, so very small phones, portrait
tablets and landscape phones are framed less well; the frames above
predate finding 7's fix (the daylight phone frame still shows "yours to
download"); concept.md's test section still says "each concept" and "The
through-line" is not visibly scoped to a scene of one's own; when the CV is
built is said as stop 6 in `content/site.ts` and stop 5 in the skill;
`/plain-story` ships unlinked on every person's site.

## Live check, 31 October

The author pushed `main` at `b8980b51` on 28 October, and the Pages deploy
that followed (run 40663319271) published plan 2's pieces. On the author's
"yes" ([record](../../../docs/history/2026-10-31-fix-the-map.md#steps-2-and-3-then-plan-3)),
root ran the library's `scripts/gallery-check.mjs
--url=https://xitij27.github.io/storyfolio` with playwright-core from
`/var/tmp/stitch-3-site` and its Chromium headless shell 1248: both sizes,
0 problems ([report.json](live-check/report.json),
[desktop.jpg](live-check/desktop.jpg), [phone.jpg](live-check/phone.jpg)).
The index says the agent chooses pieces from all three worlds and shows
the mix moving. The book on a phone is shot mid-pan, as on 28 October. The
live gallery does not yet carry the map fix of 31 October
([stitch-3](../stitch-3/README.md)), which is not pushed.

## To make it again

```bash
node skills/storyfolio/scripts/scaffold.mjs /var/tmp/stitch-2-site
cp evals/engine/stitch-2/dawit.ts /var/tmp/stitch-2-site/content/person.ts
cp -r evals/engine/stitch-2/site/* /var/tmp/stitch-2-site/
cd /var/tmp/stitch-2-site && npm ci && npm run check
```

Here `CHROMIUM=$HOME/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`
names the installed browser.
