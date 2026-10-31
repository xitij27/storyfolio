# stitch-3: the map fixed for Dawit's places

31 October 2026. Step 1 of the [next steps](../../../docs/handover.md#next-steps),
on the author's "yes fix the map before the paid run."
([record](../../../docs/history/2026-10-31-fix-the-map.md)). The no-model
dry run in [stitch-2](../stitch-2/README.md#what-the-pieces-get-wrong-or-cannot-show-for-the-author)
found three things the map gets wrong with person test 2's Dawit. Plan 3
reruns on Dawit, so they are fixed before the paid run. No model was called.

## What was wrong, and why

| Problem | Done when | Cause in `stitch/map.ts` |
|---|---|---|
| "Where from" frames Europe only; Addis Ababa is never in view | every place in the chapter is in the frame, at desktop and phone size | The camera looked at the average of the places, and two of Dawit's three are in Europe, so it pointed north. It stood a fixed distance back (0.95 times the span, plus 4), whatever the screen's shape, and 1.7 times that on a phone. |
| Amsterdam and Rotterdam (57 km apart) print their names on top of each other; Lumen Pay's building hides behind Kestrel Freight's | every label reads and every building shows | Names and buildings stood by place name. The two places are 0.17 units apart on the map, so both names, and each city's first building, stood in the same spot. |
| Kestrel Freight's six years make a building taller than the frame | the tallest building and its name stay in the frame | A building was 0.35 plus 0.32 a year, with no limit. |

Found while checking: the sample people had the first problem too. Before
this change, Noa's "where from" never showed Montreal and Amara's never
showed Enugu, each one's first place
([before and after](frames/samples-from-desktop-before-after.jpg)).

## What changed

Three pure helpers in `stitch/frame.ts`, each with a test written first and
seen failing (the exports did not exist):

- `fitDistance(points, pitch, fov, aspect, margin)`: how far back a camera
  stands so every point falls within `margin` of the middle of its view.
  The test checks it against a separate projection at 1440x900 and
  390x844.
- `spots(points, gap)`: places closer than `gap` on the ground share a
  spot (in chains too). Dawit's Amsterdam and Rotterdam share one; every
  sample person's places keep their own.
- `rise(years, longest)`: 0.32 a year, as before, but the longest job
  stands no taller than 1.65. Shorter careers are unchanged (neither sample
  person's longest job reaches the limit) and heights keep to the years.

In `stitch/map.ts`:

- **"Where from"** looks at the middle of the places' span and stands back
  as far as `fitDistance` says for every pin and name, on this screen's
  shape. It drifts in over the hold but never nearer than the fit, once the
  lean in (to 0.92) is counted. A narrow screen takes it as it is (no 1.7).
- **Close places** share a spot (gap: one map unit). Their names stack on
  screen, the southernmost lowest. What stands there (buildings, project
  cards, quotes) stands in one row, and in "worked" the camera looks at the
  building of the job being told.
- **Buildings** use `rise`.

Three more changes, each because the shots after the first ones showed a
new fault:

- **The ground fades wholly at its edges.** With the camera further back,
  a phone saw a hard line where the map's ground ends.
- **Names keep their size on screen at any distance.** They stopped
  growing at five times their size, which only binds beyond 20 units, so
  on the phone overview Dawit's names were about 10px. The map always
  scales the places to 13 units across, so no overview goes beyond about
  80 units back. (Ten times was tried first. Noa's phone overview stands 66
  units back, where her names shrank again.)
- **On a narrow screen, names keep to its width** (their size times the
  aspect over 0.9). Sized to the screen's height, a name on a phone was as
  tall as on a desktop, and once stacked, "Amsterdam" covered Lumen Pay's
  years. Before this change the large names covered cards in every close
  shot on a phone (Noa's and Amara's "worked" and "contact").

And one in `scripts/stitch-check.mjs`, which `npm run check` runs on a
person's site: **a shot is blank under 0.5 per cent drawn, not 1.** The
check counts sampled pixels that differ clearly from the corner pixel. The
map's dim ground does not count, so a phone's overview of places far apart
is mostly names and pins: Noa's measured 0.71 per cent (the move from
"hello"), 1.03 ("where from") and 1.45 (the move after), all drawn. A
failed draw is near 0. Without this, a person like Noa would fail `npm run
check` on a good picture.

## Checks

- `npm test` in the repository: 418 pass (415 and the three new).
  `node evals/check-skill.mjs`: ok. The library's copy is synced
  (`scripts/sync-stitch.mjs`).
- Dawit's site, made again as below: `npm run typecheck` passes;
  `npm run lint` shows the 2 errors already in stitch-2's hand-written
  pages (`app/cv/page.tsx` and the data-centre exit page link to `/` with
  `<a>`), none in the engine; `npm run check` passes with 0 problems
  ([report](site-check-report.json)).
- `stitch-check` of `/preview` for Noa and for Amara with every chapter on
  the map (`--mix map,map,map,map,map,map,map,map`), at both sizes: 0
  problems. Amara's default mix in all three looks on a phone, with
  `--points`: 0 problems. Dawit in daylight and blueprint on a phone: 0
  problems.
- The old engine (`main` at `9141fdb0`) was built beside it and shot the
  same way, for the before and after frames.

Root looked at the holds and moves of "where from" and "worked" for Dawit
at both sizes, every map chapter's hold for Noa and Amara at both sizes,
and the frames below.

## Frames

- Dawit, before and after: [desktop](frames/dawit-desktop-before-after.jpg)
  ("where from" and "worked"), [phone](frames/dawit-phone-before-after.jpg),
  [phone in daylight and blueprint](frames/dawit-phone-looks.jpg).
- The sample people: ["where from" on a desktop](frames/samples-from-desktop-before-after.jpg),
  every map chapter on a phone for [Noa](frames/noa-phone-every-map-chapter-before-after.jpg)
  and [Amara](frames/amara-phone-every-map-chapter-before-after.jpg)
  (top row before, bottom after), and [Noa's sparse phone frames](frames/noa-phone-sparse-frames.jpg)
  that the blank check had flagged.

## Left for the author's review

- **The hello sign covers the home's name in "where from"** when hello is
  on the map (Noa's Montreal, Amara's Berlin). It did before this change.
  Dawit's hello is on the sheet.
- **A phone's overview of places far apart is small.** Noa's span from
  Montreal to Gothenburg fills the width of a portrait screen with a strip
  of map, and leaves the top and bottom empty. Her three European names,
  1.3 units apart (more than the one-unit gap), touch there but each reads.
- **Names on a phone are about half their desktop size** (13px text in
  the overview), chosen so they no longer cover cards.

## To make it again

```bash
node skills/storyfolio/scripts/scaffold.mjs /var/tmp/stitch-3-site
cp evals/engine/stitch-2/dawit.ts /var/tmp/stitch-3-site/content/person.ts
cp -r evals/engine/stitch-2/site/* /var/tmp/stitch-3-site/
cd /var/tmp/stitch-3-site && npm ci && npm run browsers && npm run check
```

On the WSL machine this needs Node 24 first on `PATH`
(`~/.local/opt/node-v24.14.0-linux-x64/bin`) and, for Chromium, the three
libraries unpacked without root in `/var/tmp/chromium-libs` named by
`LD_LIBRARY_PATH` (see the [handover's notes](../../../docs/handover.md#for-the-next-session)).
