# Dark look screenshot review, matrix 1

Reviewed on 11 October 2026 by opening each of the 15 PNGs below with
`view_image`, at its saved resolution. The three automated reports have
empty problem lists. This is a separate visual inspection of the frozen
matrix 1 output, before the `approach()` endpoint snap fix.

The settled captions are readable in all three sizes, the formations fit
the viewport, and the phone layout keeps the object above the caption.
The wide boundary screenshots need a fresh check: the middle line is
absent at its first exact arrival, and incoming captions are dim and
partly below the screen while the rail still names the previous chapter.
The line's known arrival defect is addressed by the subsequent pure
`approach()` fix, but this matrix cannot prove that fix visually.

One further concern appears on the phone's fanned white picture face:
small dark speckles and dotted streaks are visible on the otherwise plain
surface. They are not evident on the equivalent wide and short images.
The cause is unverified. Inspect this surface in the next phone capture;
do not treat passing geometry and console checks as proof that the
artifact has gone.

## Wide, 1440 by 900

| Screenshot | Visual verdict |
| --- | --- |
| [Opening start](matrix-1/dark-wide/00-opening.gather-start.png) | Pass. Scattered cards stay inside the viewport and clear the caption. Heading, body, note and look switch are readable. The white picture face remains distinct from the six dark faces. |
| [Opening middle](matrix-1/dark-wide/00-opening.gather-mid.png) | Pass. The gathering cards enlarge without clipping or covering the caption; text remains readable. Overlap within the card group is part of the formation. |
| [Opening end](matrix-1/dark-wide/00-opening.gather-end.png) | Pass. The gathered stack stays framed beside the complete caption and below the look switch. |
| [Middle start](matrix-1/dark-wide/01-middle.fan-start.png) | Needs post-fix recheck. Fan is visible and framed, but the promised line is absent. Incoming caption is very faint, its final note runs below the bottom, and the rail still highlights Gather. Record this exact boundary separately from the settled images. |
| [Middle middle](matrix-1/dark-wide/01-middle.fan-mid.png) | Pass. All seven card tops are visible, the line appears below the fan, the complete caption is readable, and the rail highlights Open. |
| [Middle end](matrix-1/dark-wide/01-middle.fan-end.png) | Pass. Fan, line, readable caption and correct chapter highlight remain in place. |
| [Closing start](matrix-1/dark-wide/02-close.whole-start.png) | Needs boundary recheck. Stack is framed, but the incoming caption remains very faint and extends below the screen; the rail still highlights Open. The text link is outside the captured viewport. A screenshot cannot establish the invisible piece-link hit area's enabled state. |
| [Closing middle](matrix-1/dark-wide/02-close.whole-mid.png) | Pass. Stack and complete closing text fit; the Gather again text link is visible and the rail highlights Whole. |
| [Closing end](matrix-1/dark-wide/02-close.whole-end.png) | Pass. Complete closing text and fallback link remain visible beside the stack. |

## Short, 1280 by 720

| Screenshot | Visual verdict |
| --- | --- |
| [Opening](matrix-1/dark-short/00-opening.gather.png) | Pass. Stack, heading, body and note fit with separation between object and caption. |
| [Middle](matrix-1/dark-short/01-middle.fan.png) | Pass. Fan and line stay within the viewport; caption and rail remain readable and unobstructed. |
| [Closing](matrix-1/dark-short/02-close.whole.png) | Pass. Stack clears the text; the full closing note and Gather again link remain visible above the bottom edge. |

## Phone, 390 by 844

| Screenshot | Visual verdict |
| --- | --- |
| [Opening](matrix-1/dark-phone/00-opening.gather.png) | Pass. Stack fits between the look switch and caption. All caption text fits; no horizontal clipping is visible. |
| [Middle](matrix-1/dark-phone/01-middle.fan.png) | Framing and text pass; surface needs recheck. Fan and line fit above the complete caption, but the white picture face shows small dark speckles and dotted streaks. Card print is small, while the DOM caption stays readable. |
| [Closing](matrix-1/dark-phone/02-close.whole.png) | Pass. Stack fits above the complete caption, and Gather again remains visible near the bottom with a margin. |

The pale picture face in dark mode is an intentional fixture difference,
not a missing dark canvas face. These screenshots show appearance at the
saved positions. They do not establish touch interaction, keyboard focus,
animation smoothness or author approval. No code or scaffold files were
changed during this inspection.
