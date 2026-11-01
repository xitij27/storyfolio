# sheet-moves-1: two more ways for the sheet to move, to judge

1 November 2026, [the plan](../../../docs/superpowers/plans/2026-11-01-sheet-transitions.md),
on the author's "cool transitions mean wow".

Built in `stitch/sheet.ts`, chosen at `/preview?move=`, the site's default
unchanged (`slide`):

- `fold`: the sheet folds into a fan of six pleats (`stitch/fold.ts`,
  tested: the pleats keep the paper's width), the packet turns once, the
  picture changes inside the fold, and it opens into the next shape; the
  camera pushes in and looks down on the packet
  ([frames](fold-desktop.jpg): the CV into the globe, the leaflet into the
  wall).
- `swing`: the camera sweeps round the sheet by up to 0.75 radians and rises
  as it changes, to alternating sides; the wave that carries the sheet is
  twice as high; the picture changes at the wave's edge
  ([frames](swing-desktop.jpg)).
- `slide`: today's, for comparison ([frames](slide-desktop.jpg), from
  person test 4's finished site on the sheet).

Shot on Dawit's facts (stitch-2's) at `/preview` with every chapter on the
sheet, at 1440x900 and 390x844: 0 problems. Served for the author from
`/var/tmp/stitch-3-site` on port 3121. 419 tests; `check-skill` ok.
