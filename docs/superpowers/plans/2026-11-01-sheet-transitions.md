# Cool transitions for the sheet: examples to judge

1 November 2026, on the author's "cool transitions mean wow. yes the sheet
version is definitely better although it still doesnt feel there yet"
([record](../../history/2026-11-01-person-test-4-review.md#the-authors-answer)).
The author judges examples rather than technical questions
([27 October](../../history/2026-10-27-transition-examples-request.md)).

## What the sheet does now

Between two chapters every point of the sheet slides in a straight line
from one shape to the next, staggered across the sheet, with a lift of
0.45 at the middle of its move; the picture cross-fades halfway; the camera
stays in front, standing back by a tenth and looking a little down. It is
smooth, but it is a blend in the middle of the screen, not a move.

## What is built

Two more ways for the sheet to move between chapters, each across the
whole story, beside the present one, chosen at `/preview?move=`:

1. **`slide`**: today's, unchanged, the baseline and still the default.
2. **`fold`**: the sheet folds up like a fan into a narrow packet, which
   turns once while folded; the picture changes inside the fold; it opens
   into the next shape. The camera pushes in on the packet and pulls back
   as it opens.
3. **`swing`**: the camera sweeps round the sheet as it changes, rising and
   swinging to one side and back (alternating sides chapter by chapter);
   the sheet rolls into the new shape as a higher wave; the new picture
   starts exactly at the wave's edge instead of fading in.

Everything else (shapes, pictures, pace, framing at the holds, the phone's
reading moves) stays as it is. Only `stitch/sheet.ts` moves differently;
`move` is passed from `/preview` through `StitchedStory` and `mountStitch`
to the worlds.

## How it is judged

Root shoots each style's moves at desktop and phone size on Dawit's facts
and looks at them, then gives the author the three addresses to scroll.
The author's choice, or what they say to change, decides which becomes the
sheet's. No paid run until then.
