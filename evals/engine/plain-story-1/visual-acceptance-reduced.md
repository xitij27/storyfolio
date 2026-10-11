# Matrix 3: reduced-motion visual review

Reviewed on 11 October 2026 after the default card's supporting-box depth
bias was applied and the unsuccessful face bias was removed. Each linked
screenshot was opened individually in the image viewer. No implementation
files changed during this review.

## Light look

| Screenshot | Visual verdict |
|---|---|
| [Opening start](matrix-3/light-reduced/00-opening.gather-start.png) | Pass. Scattered cards fit in view beside a complete, readable opening caption. |
| [Opening middle](matrix-3/light-reduced/00-opening.gather-mid.png) | Pass. Opening has cut to a complete stack by the midpoint, without an intermediate pose at this sample. |
| [Opening end](matrix-3/light-reduced/00-opening.gather-end.png) | Pass. Gathered stack and complete caption hold in place. |
| [Middle start](matrix-3/light-reduced/01-middle.fan-start.png) | Pass. Fan and accent line are present at arrival; Open is active on the rail. Entering and outgoing captions are separate. |
| [Middle middle](matrix-3/light-reduced/01-middle.fan-mid.png) | Pass. Complete middle caption fits beside the contained fan and line; outgoing text leaves through the top. |
| [Middle end](matrix-3/light-reduced/01-middle.fan-end.png) | Pass. Full current caption, fan and line remain with no outgoing text. |
| [Closing start](matrix-3/light-reduced/02-close.whole-start.png) | Pass. Closed stack and Whole rail label are present at arrival. Closing caption enters beneath outgoing text without collision. |
| [Closing middle](matrix-3/light-reduced/02-close.whole-mid.png) | Pass. Full closing caption and ordinary backlink fit beside the stack. |
| [Closing end](matrix-3/light-reduced/02-close.whole-end.png) | Pass. Contained stack, complete closing caption and backlink remain visible without outgoing text. |

## Dark look

| Screenshot | Visual verdict |
|---|---|
| [Opening start](matrix-3/dark-reduced/00-opening.gather-start.png) | Pass. Scattered cards fit beside the full opening caption. The supplied picture face retains its fixed light background. |
| [Opening middle](matrix-3/dark-reduced/00-opening.gather-mid.png) | Pass. Opening has cut to the gathered stack by the midpoint; full caption remains readable. |
| [Opening end](matrix-3/dark-reduced/00-opening.gather-end.png) | Pass. Gathered stack and complete opening caption hold. |
| [Middle start](matrix-3/dark-reduced/01-middle.fan-start.png) | Pass. Fan and accent line appear at arrival, with Open active on the rail. The light picture face is clean, and captions remain separate. |
| [Middle middle](matrix-3/dark-reduced/01-middle.fan-mid.png) | Pass. Complete current caption fits beside the clean fan and line; outgoing text leaves at the top. |
| [Middle end](matrix-3/dark-reduced/01-middle.fan-end.png) | Pass. Complete middle caption, clean picture face and accent line remain with no outgoing text. |
| [Closing start](matrix-3/dark-reduced/02-close.whole-start.png) | Pass. Stack and Whole rail label are already present. Closing caption enters below outgoing middle text without collision. |
| [Closing middle](matrix-3/dark-reduced/02-close.whole-mid.png) | Pass. Full closing caption and ordinary backlink fit beside the stack. |
| [Closing end](matrix-3/dark-reduced/02-close.whole-end.png) | Pass. Contained stack, full closing caption and backlink remain visible without outgoing text. |

## Stationary-frame checks

The [light report](matrix-3/light-reduced/report.json) records nine matching
before/after screenshot hashes at the configured 300-millisecond interval.
It reports one h1, the three expected beat IDs (`opening.gather`,
`middle.fan`, `close.whole`), one canvas, `scene: "on"`, no duplicate IDs,
no horizontal overflow, and empty warnings and problems.

The [dark report](matrix-3/dark-reduced/report.json) records the same nine
successful stationary checks and the same expected structural results,
with `look: "dark"`. Warnings and problems are empty.

| Beat and position | Light before/after hash | Dark before/after hash |
|---|---|---|
| `opening.gather`, start | Match | Match |
| `opening.gather`, middle | Match | Match |
| `opening.gather`, end | Match | Match |
| `middle.fan`, start | Match | Match |
| `middle.fan`, middle | Match | Match |
| `middle.fan`, end | Match | Match |
| `close.whole`, start | Match | Match |
| `close.whole`, middle | Match | Match |
| `close.whole`, end | Match | Match |

All 18 screenshots were inspected and all 18 stationary hash pairs match.
The reports retain the full hash strings. The sampled opening changes from
scatter at start to a complete stack at middle and end. This supports the
cut at those positions; it is not a continuous transition recording. Hash
checks establish stillness during their measured intervals, not every
possible scroll position or interaction.

## Scope

Reduced motion disables caption fades, so outgoing text stays visible until
normal document scrolling takes it out of view. At exact beat arrival,
the incoming note's last lines may still lie below the viewport; middle
and end show the complete caption. No text collisions or clipped objects
were found in the reviewed shots.

The decorative fan overlaps neighboring card words while the equivalent
HTML remains readable. This does not establish that essential evidence
placed only on card faces would remain readable. The light stack edges
remain subtle. These headless screenshots do not establish physical-phone
performance, touch comfort or the author's visual approval.
