# Final checker smoke: desktop and fallback images

All fifteen images listed below were opened individually from the final
attempt 7 output and inspected on 11 October 2026. They were copied without
modification to [attempt-7](attempt-7/manifest.json), whose artifact hashes
were verified after copying. This review concerns the unchanged plain
engine and the new coordinator capture path, not the embedded fixture.

The keyboard probe runs before scrolling. In fallback captures it leaves
the skip link focused and visible with a strong outline. That is a tested
keyboard state, not evidence that the default page permanently displays
a floating skip button. It covers a small portion of the preceding text
near the top of the closing samples; the current closing content and link
remain fully readable. No new engine change is called for by this state.

| Image | Individual observation |
|---|---|
| [Desktop opening, middle](attempt-7/desktop/00-opening.gather-mid.png) | Scattered cards occupy the right side while the opening heading, explanation and supporting note remain clear at left. Appearance control and chapter rail fit. |
| [Desktop opening, end](attempt-7/desktop/00-opening.gather-end.png) | Cards have gathered into the front stack. Opening text remains readable and separate from the object; no horizontal clipping. |
| [Desktop fan, middle](attempt-7/desktop/01-middle.fan-mid.png) | Seven-card fan and chapter-specific line are visible beside the caption. Interior face words overlap as in the accepted plain engine; the HTML still describes the scene. |
| [Desktop fan, end](attempt-7/desktop/01-middle.fan-end.png) | Final fan framing and line fit. Heading, body and explanatory note stay readable; active rail chapter is Open. |
| [Desktop close, middle](attempt-7/desktop/02-close.whole-mid.png) | Stack returns, Whole is active, and closing heading, body, note and Gather again text link are visible. |
| [Desktop close, end](attempt-7/desktop/02-close.whole-end.png) | Closing content and link remain fully readable. Stack depth is subtle in the pale material, an inherited plain-engine limitation. |
| [No WebGL opening](attempt-7/no-webgl/00-opening.gather-mid.png) | Opening and next chapter text remain in normal document flow. No blank canvas replaces them. Focused skip link remains legible above the content. |
| [No WebGL fan](attempt-7/no-webgl/01-middle.fan-mid.png) | Full flat fan illustration, chapter heading, body and explanatory note are readable; the closing section begins below. |
| [No WebGL close](attempt-7/no-webgl/02-close.whole-mid.png) | Closing heading, body, supporting note and Gather again link are visible. Part of the preceding paragraph naturally remains above the current section. |
| [No JavaScript opening](attempt-7/no-javascript/00-opening.gather-mid.png) | Narrow static layout keeps both opening and middle text readable and the flat fan within the viewport width. Appearance controls are absent, as expected without JavaScript. |
| [No JavaScript fan](attempt-7/no-javascript/01-middle.fan-mid.png) | The fan schematic fits without sideways clipping. Middle and closing headings are readable; the following closing link continues below this sample and is visible in the closing image. |
| [No JavaScript close](attempt-7/no-javascript/02-close.whole-mid.png) | Narrow closing heading, explanation, note and Gather again link fit. Focused skip link overlaps only the preceding section at the top edge. |
| [Context loss opening](attempt-7/context-loss/00-opening.gather-mid.png) | After a real WebGL context-loss trigger, the opening and subsequent text appear in the same readable static flow as the no-WebGL case. |
| [Context loss fan](attempt-7/context-loss/01-middle.fan-mid.png) | The flat fan illustration and its text survive the context loss. The next section follows normally with no empty canvas region. |
| [Context loss close](attempt-7/context-loss/02-close.whole-mid.png) | Closing text and ordinary link remain visible after the failure. The focused skip state is retained and has a visible focus outline. |

No new blocking visual defect was found in this set. It does not establish
physical-phone performance, embedded content quality, all appearance
variants or general custom-object support. The automated observations add
actual scene state, context-loss support, link visibility and request/error
evidence; screenshots alone cannot prove those runtime facts.
