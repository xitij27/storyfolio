# Reduced motion: visual inspection of matrix 1

Inspected on 11 October 2026. All eighteen saved images, nine per look,
were opened individually with the image viewer. No runtime source changed
as part of this review.

## Result and limits

Both looks show a scattered opening at the start and the fully gathered
stack at the midpoint and end. There is no intermediate formation at the
sampled midpoint, unlike the normal-motion opening. The remaining beats
show their settled fan and stack formations. All cards fit the viewport.

The [light report](matrix-1/light-reduced/report.json) and
[dark report](matrix-1/dark-reduced/report.json) each contain nine stationary
samples, one for each beat at start, middle and end. Every sample has
identical before and after image hashes: **9/9 light and 9/9 dark, 18/18
total**. The configured interval is 300 milliseconds, after the ordinary
settling wait. Both reports have empty problems and warnings, one canvas,
the three expected beat ids and no horizontal overflow.

The sampled images and hash checks support the absence of idle animation
at these positions. They are not a continuous recording of the transition
at the midpoint and do not establish behavior at every scroll position.

Reduced motion removes the caption fade. Outgoing text remains visible as
it scrolls out at the top, while the incoming caption rises at the bottom.
At start samples its final lines can still lie below the viewport; at middle
and end the complete current caption is readable. Text blocks do not collide.

The fan's accent line is present at exact arrival in both reduced runs.
This differs from the missing line at the normal light-wide arrival and
supports the easing-boundary explanation in [the light review](visual-light.md).

The dark look makes card silhouettes clearer. Its seventh card is still
light because that card uses the supplied picture face, whose source has a
light background. That is consistent with the fixture's separate image
face; switching looks does not recolor an imported picture.

## Per-image record

Paths are relative to this file's folder. Each row records an individually
viewed screenshot. A pass covers scene containment and readable current
content once it has entered, not author approval of the styling.

| Screenshot | Visual verdict |
|---|---|
| [Light opening start](matrix-1/light-reduced/00-opening.gather-start.png) | Pass. Scattered cards are fully contained, full opening caption is opaque and readable. |
| [Light opening middle](matrix-1/light-reduced/00-opening.gather-mid.png) | Pass. Fully closed stack at the midpoint, with no intermediate gathered layout. Caption remains readable. |
| [Light opening end](matrix-1/light-reduced/00-opening.gather-end.png) | Pass. Same gathered formation as the midpoint, with the full caption. |
| [Light middle start](matrix-1/light-reduced/01-middle.fan-start.png) | Pass. Fan and accent line are present at arrival. Outgoing opening text remains above the entering middle caption; its final note lines have not entered yet. |
| [Light middle middle](matrix-1/light-reduced/01-middle.fan-mid.png) | Pass. Fan and line hold. The current caption is complete, with the tail of the outgoing opening text at the top. |
| [Light middle end](matrix-1/light-reduced/01-middle.fan-end.png) | Pass. Only the current middle caption remains; fan and line are unchanged. |
| [Light closing start](matrix-1/light-reduced/02-close.whole-start.png) | Pass. Closed stack has arrived. Outgoing middle caption remains above the incoming closing caption; its last lines are still below the viewport. |
| [Light closing middle](matrix-1/light-reduced/02-close.whole-mid.png) | Pass. Full closing caption and backlink are visible; outgoing middle text is leaving at the top. |
| [Light closing end](matrix-1/light-reduced/02-close.whole-end.png) | Pass. Full closing caption and backlink remain with the contained stack, without outgoing text. |
| [Dark opening start](matrix-1/dark-reduced/00-opening.gather-start.png) | Pass. Seven scattered cards are contained, including the light picture face. Caption and controls are readable. |
| [Dark opening middle](matrix-1/dark-reduced/00-opening.gather-mid.png) | Pass. Fully gathered dark stack at midpoint; complete opening caption is readable. |
| [Dark opening end](matrix-1/dark-reduced/00-opening.gather-end.png) | Pass. Stack matches midpoint, with no continued gathering visible. |
| [Dark middle start](matrix-1/dark-reduced/01-middle.fan-start.png) | Pass. Fan and accent line are already present at arrival; incoming and outgoing captions occupy separate vertical areas. |
| [Dark middle middle](matrix-1/dark-reduced/01-middle.fan-mid.png) | Pass. Complete current caption is readable; outgoing text exits at top. Fan and line hold their positions. |
| [Dark middle end](matrix-1/dark-reduced/01-middle.fan-end.png) | Pass. Settled fan, line and complete current caption are visible with no outgoing text. |
| [Dark closing start](matrix-1/dark-reduced/02-close.whole-start.png) | Pass. Closed stack is contained, with middle text leaving and closing text arriving. |
| [Dark closing middle](matrix-1/dark-reduced/02-close.whole-mid.png) | Pass. Full closing text and backlink are readable; prior text leaves at top without colliding. |
| [Dark closing end](matrix-1/dark-reduced/02-close.whole-end.png) | Pass. Full closing caption and backlink remain beside the contained stack. |

The fan still covers portions of the individual words on neighboring cards.
As in the normal-motion review, the fixture's ordinary text supplies the
meaning. These images do not prove readability of essential evidence placed
only on a card face, or physical-device performance and scroll comfort.
