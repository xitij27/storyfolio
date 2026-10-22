# Chapter presence: scenes grow in instead of popping

22 October 2026, after the author: "suddenly a new one pops at the next
station. That's not how it's supposed to be"
([record](../../../docs/history/2026-10-22-theme-and-transitions.md)).

Each chapter's scene (an extra) was mounted half a beat before its chapter
and shown or hidden by the agent's own switch, so it appeared at once. The
engine now gives `chapterPresence(story, chapter, beat)` in
`lib/story/story.ts`, 0 to 1 over the travel into a chapter and back to 0
over the travel out (unit-tested in `story.test.ts`), and mounts a scene as
soon as the travel toward it starts (`REACH` in `components/story/scene.tsx`),
while its presence is still near 0, so its code still loads late. The
placeholder's middle line now grows and fades with it, and the README
teaches that instead of a visibility switch.

Proof, on a scaffolded copy installed offline: typecheck, lint, 130 engine
tests, and 15/15 browser checks (the first try, mounting a full beat early,
failed the lazy-loading probe: the scene's code loaded during the opening;
`REACH = 0.99` fixed it). [travel-sheet.png](travel-sheet.png), made with
[travel.cjs](travel.cjs) at 20, 30, 42 and 55 per cent of the scroll, shows
the line at full length inside its chapter and shorter and fainter as the
reader scrolls out of it.
