# stitch-5: person test 5's weak points

6 November 2026, on the author's "okay fix the weak stuff"
([record](../../../docs/history/2026-11-06-person-test-5-review.md)), after
[person test 5](../../runs/stage-3-person-5/final-review/README.md).

| Weak point | What was done |
|---|---|
| No piece of work runs | A project's window now plays its picture: `miniPicture` (`stitch/paint.ts`) takes `run`, 0 to 1, and draws its kind that far through its work (the route travelled, the list checked off, the bars measured, the line drawn and forecast, the before and after compared, the maze solved). The window plays four seconds of work and one at rest, round again; under reduced motion it shows the result, still. Without `run` every picture is drawn as before, so the worlds' textures do not change. The length-based line the route and maze use is `polyline` in `stitch/frame.ts`, tested first. [Frames of each of Dawit's six windows at 0.6, 1.6 and 3.2 s](project-windows-playing.jpg) |
| On a phone "worked" cut at the edges, "made" showing part of its wall | Not a fault. Shots through each hold ([phone](phone-pan-worked-made.jpg), 3.0 to 3.6 and 5.0 to 5.6 chapters) show the camera panning across the whole timeline, 2009 to 2027, and the whole wall of six. The check shoots the hold's middle, mid-pan, as found with the book on 28 October |
| The looks and moves not offered at stop 4 | Root's turn 3 prompt said "keep everything else as it is", which the agent took to cover the look and move. No skill fault is shown, so the skill is unchanged; the next person test's turn 3 must not say it ([run README](../../runs/stage-3-person-5/README.md#for-the-next-run)) |
| The agent's one engine line | Taken in: under reduced motion `stitch/stage.ts` stills the idle sway too |

## Checked

Person test 5's finished site with only `stitch/` replaced
(`/var/tmp/p5-fixed-site`, port 3171): typecheck, lint, `npm run check` 0
problems; every project window opened on a phone with no page error and
filmed ([play-check.mjs](play-check.mjs)); with reduced motion two frames
1.2 s apart are identical. Repository: 421 tests, `check-skill` ok.
