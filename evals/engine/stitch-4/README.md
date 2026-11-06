# stitch-4: person test 4's engine fixes, taken into the engine

6 November 2026, on the author's "yes update the documentation and continue
with the recommendations"
([record](../../../docs/history/2026-11-06-what-is-left.md#the-authors-answer)).

In person test 4's turn 4 the agent edited `stitch/` to fix faults a fresh
agent would meet again, and to add the ordinary navigation Dawit asked for
([its diff](../../runs/stage-3-person-4/evidence/turn-4-engine-edits.diff),
[root's review](../../runs/stage-3-person-4/final-review/README.md)). Root
took what holds for any person into the engine, so the next run does not
spend its time on them. Left out: the lines written for Dawit alone (his
numbers in the hello and "good at" captions, his studies and jobs written
again under chapters), and a "Read text" switch (the words are already in
the page for screen readers and without the 3D).

## What changed

| Fault in person test 4 | In the engine now |
|---|---|
| The diploma stood at home: Dawit's study `place` was his school, not one of his places | `Study.city` names the place a school stands in (`studyLocation` in `stitch/person.ts`, tested first). `checkPerson` now says when a study's city, or its place without one, is not among the places, and `app/page.tsx` stops the build with that message (shown: a school's name as `place` fails `next build` with "name its city with `city`") |
| "Good at" looked at the middle of every job, which for places far apart is empty map | The camera holds on the roof of the latest job that lists what it used. Root tried a flight from roof to roof first: it crossed empty map between Addis Ababa and Amsterdam, and Lumen Pay's roof has nothing on it |
| Long names cut on the map's cards | The sign's role, the diploma's school and a building's company and role wrap |
| No navigation | A top bar: the person's name (back to hello), Work (to "made"), Contact, and the CV when there is one. Each is a link to `#chapter`: with the 3D it flies there, without it goes to the words; `/#contact` opens there, and back and forward follow |
| Captions covered the scene | The 3D sits between the top bar and a band of the chapter's words. Every caption stands in the band's one cell, so it is as tall as the tallest and the view never changes size between chapters. A story wholly in the book (whose pages carry the words) keeps the band's buttons over the scene's foot instead |
| Projects opened only by clicking the 3D | "What I've made" lists a button for each project in its caption; "Get in touch" holds the email and CV buttons, which replace the floating ones |
| The project window kept no focus | It is a native `dialog`: the page behind cannot be reached, Escape closes it, and focus goes back to the button that opened it |
| The view sized only with the window | `stitch/stage.ts` follows the canvas's own size (`ResizeObserver`), and a view 720 pixels wide or less is framed as narrow |
| A lost drawing context left a dead canvas | It gives way to the words, as no WebGL does |
| Crowding at home on the map (in "made" and "contact", the cards, buildings and sign over one another) | The projects stand in their own row in front of what stands at the place; on a phone "made" frames one card at a time |

Also from plan 2's smaller things: the project window's place and year
(`#80500b`) and "More about" link (`#4f5862`) now pass 4.5:1 on its paper.

The library's gallery passes `topbar={false}`, since it has its own bar,
and `piece-shots.mjs` hides the band.

## Checked

- Repository: 420 tests, `check-skill` ok.
- Person test 4's finished site (Dawit, on the sheet), with only `stitch/`
  replaced by the engine's (and its own `/preview` replaced by the engine's,
  which the agent had cut down): typecheck, lint, `npm run check` 0
  problems. Frames with the words: [sheet, desktop](sheet-desktop.jpg),
  [sheet, phone](sheet-phone.jpg); the same site on the map:
  [desktop](map-desktop.jpg), [phone](map-phone.jpg).
- A browser driven at both sizes ([nav-check.mjs](nav-check.mjs)): Work
  flies to "What I've made" and the address reads `#made`; a project button
  opens the window ([phone](project-window-phone.jpg)); Escape closes it
  and focus returns to the button; back returns to hello; `/#contact` opens
  at "Get in touch"; no sideways scroll; no page errors.
- Noa and Amara in each world at both sizes with the words: 0 problems
  ([Amara's book, phone](book-phone-amara.jpg)).
- A fresh scaffold: typecheck, lint, 186 tests, `npm run check` 0 problems.
- The library, built with `BASE_PATH=/storyfolio`: 53 tests,
  `gallery-check.mjs` 0 problems at both sizes.

## Left for the author's review

- The band is as tall as the longest caption, so a short one leaves empty
  room under it (most on a phone, where "made"'s six project buttons set
  its height).
- On a desktop the chapter rail still stands over the right of the scene,
  over the map's sixth card in "made".
- "Good at" on the map shows the latest job's tools only.

## To make it again

```bash
cp -a /var/tmp/p4-final-sheet /var/tmp/stitch-4-site   # person test 4's finished site
rm -rf /var/tmp/stitch-4-site/stitch && cp -a skills/storyfolio/engine/stitch /var/tmp/stitch-4-site/
cp skills/storyfolio/engine/app/preview/preview.tsx /var/tmp/stitch-4-site/app/preview/
cp skills/storyfolio/engine/scripts/{stitch-check,site-check,check}.mjs /var/tmp/stitch-4-site/scripts/
cd /var/tmp/stitch-4-site && npm run check
```

`/var/tmp/p4-final-sheet` is root's copy of person test 4's site with
`content/mix.ts` set to `WHOLE.sheet`; the run's workspace is named in
[its README](../../runs/stage-3-person-4/README.md). On this machine the
browser is playwright-core's own Chromium 1248 (`npm run browsers`; no
`CHROMIUM` needed), with `LD_LIBRARY_PATH` naming
`/var/tmp/chromium-libs`.
