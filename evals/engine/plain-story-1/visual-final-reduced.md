# Matrix 2: reduced-motion visual review

Reviewed on 11 October 2026 against `matrix-2`, after the ordinary three-beat
story was restored. Each linked screenshot was opened individually in the
image viewer. No implementation files changed during this review.

The overall matrix run was later interrupted with exit 143 during its
keyboard case. Both reduced-motion cases had already completed. These
results are retained as diagnostic evidence, not a claim that matrix 2
completed or that the engine has final acceptance.

## Light look

The [light report](matrix-2/light-reduced/report.json) records nine stationary
samples, one for each beat at start, middle and end. All nine before/after
hash pairs match at the configured 300-millisecond interval. It reports
the three expected beat IDs, one h1, one canvas, `scene: "on"`, no duplicate
IDs, no horizontal overflow, and empty warnings and problems.

| Screenshot | Visual verdict |
|---|---|
| [Opening start](matrix-2/light-reduced/00-opening.gather-start.png) | Pass. Scattered cards are contained and the complete caption is readable. |
| [Opening middle](matrix-2/light-reduced/00-opening.gather-mid.png) | Pass. Opening has cut to the fully gathered stack at the midpoint; no intermediate pose appears at this sample. |
| [Opening end](matrix-2/light-reduced/00-opening.gather-end.png) | Pass. Gathered stack holds with the complete opening caption. |
| [Middle start](matrix-2/light-reduced/01-middle.fan-start.png) | Pass. Fan and accent line are present at arrival, and the rail already labels Open. Outgoing caption scrolls above the entering middle caption without collision. |
| [Middle middle](matrix-2/light-reduced/01-middle.fan-mid.png) | Pass. Full current caption fits beside the settled fan and line. Outgoing text leaves at the top. |
| [Middle end](matrix-2/light-reduced/01-middle.fan-end.png) | Pass. Complete current caption, fan and line remain visible without outgoing text. |
| [Closing start](matrix-2/light-reduced/02-close.whole-start.png) | Pass. Closed stack and Whole rail label are already present. Caption enters below the outgoing middle text. |
| [Closing middle](matrix-2/light-reduced/02-close.whole-mid.png) | Pass. Complete closing text and ordinary backlink fit; outgoing text leaves at the top. |
| [Closing end](matrix-2/light-reduced/02-close.whole-end.png) | Pass. Contained stack and complete closing caption hold without outgoing text. |

## Dark look

The [dark report](matrix-2/dark-reduced/report.json) records nine stationary
samples. All nine before/after hash pairs match at the configured
300-millisecond interval. It reports the three expected beat IDs, one h1,
one canvas, `scene: "on"`, no duplicate IDs, no horizontal overflow, and
empty warnings and problems.

| Screenshot | Visual verdict |
|---|---|
| [Opening start](matrix-2/dark-reduced/00-opening.gather-start.png) | Pass. Scattered cards fit above their shadows; complete opening caption is readable. The supplied picture face retains its fixed light background. |
| [Opening middle](matrix-2/dark-reduced/00-opening.gather-mid.png) | Pass. Opening has cut to the gathered stack, with the full caption still visible. |
| [Opening end](matrix-2/dark-reduced/00-opening.gather-end.png) | Pass. Gathered stack and complete opening caption hold in place. |
| [Middle start](matrix-2/dark-reduced/01-middle.fan-start.png) | Pass. Fan and accent line are present at arrival, with Open already active on the rail. Entering and outgoing captions remain separate. |
| [Middle middle](matrix-2/dark-reduced/01-middle.fan-mid.png) | Pass. Complete middle caption fits beside the fan and line; outgoing text leaves through the top of the viewport. |
| [Middle end](matrix-2/dark-reduced/01-middle.fan-end.png) | Pass. Full current caption, contained fan and line remain with no outgoing text. |
| [Closing start](matrix-2/dark-reduced/02-close.whole-start.png) | Pass. Stack and Whole rail label are present at arrival. Closing caption enters beneath outgoing middle text without collision. |
| [Closing middle](matrix-2/dark-reduced/02-close.whole-mid.png) | Pass. Full closing caption and ordinary backlink fit beside the stack. |
| [Closing end](matrix-2/dark-reduced/02-close.whole-end.png) | Pass. Stack, complete closing caption and backlink remain visible without outgoing text. |

## Scope and remaining limits

All 18 screenshots were inspected, and all 18 stationary hash pairs match:
nine light and nine dark. The sampled opening changes from scatter at start
to a complete stack at middle and end. This supports the reduced-motion cut
at those sampled positions; it is not a continuous recording of the
transition. The hash checks support stillness over the measured intervals,
not every possible scroll position or interaction.

Reduced motion disables caption fades, so the outgoing caption remains
visible until ordinary document scrolling takes it away. At exact beat
arrival, the final lines of the incoming note can still be below the
viewport; middle and end show the complete caption. No caption collision
or object clipping was found in these shots.

The decorative fan still overlaps neighboring card words; the fixture's
equivalent HTML remains readable. This review does not establish that
essential evidence placed only on card faces would be readable. Fine card
edges show ordinary raster aliasing, and the light stack edges remain
subtle. Physical-phone performance, touch comfort and the author's visual
approval remain separate acceptance work.
