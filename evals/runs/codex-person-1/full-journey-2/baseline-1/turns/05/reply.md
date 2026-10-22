I’m choosing **Paper / daylight** for its clearer binding and paper folds. I’ll record that choice, build the remaining chapters and supporting pages, then show you three complete versions of the opening and closing wording before settling them.


The full chapter sequence is taking shape: the paper route, reading stand, career scenes, working documents, alert bell, and five distinct work miniatures. Lumen Pay will keep its permitted text line only. The database detail will add a larger illustration without guessing technical facts.

I’m also making a local wording-review page so you can compare complete openings and endings, with the surrounding text and links included.


All seven chapters, five work details, the CV, icon, share image, and wording-review page are built. I’m checking layouts and interactions now.

The first checks caught an unnecessary background request to the homepage. I’m turning off that prefetch so the checks stay quiet and navigation remains ordinary links.


The phone, short-screen, static-fallback, and failed-chapter checks now pass. The functional checks also pass for all five work pages, the CV download, icons, share metadata, mobile chapter menu, and all three wording previews. The browser made no external requests.

I recommend **A for both opening and closing**. It introduces your name and work plainly, then lets the library mistake explain your interest in rollbacks.


Which opening and closing should I keep? The three complete versions—including proof, definitions, contact and CV links—are ready at http://127.0.0.1:3000/review/wording and in docs/story/wording.md. A is plain and direct (“Dawit Bekele.” / “The next conversation.”); B starts with cutover (“Before the cutover.” / “Planning a migration?”); C leads with rollback (“A plan for the way back.” / “Let’s talk about the move.”). I recommend A for both. You can also enter a mixed pair or your own wording.
- A opening + A closing (recommended)
- B opening + B closing
- C opening + C closing

The complete drafts are ready on the [local wording-review page](http://127.0.0.1:3000/review/wording) and in [wording.md](/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-full-journey-2-fs9yQ7/docs/story/wording.md). You can choose the opening and closing independently.

The [building instructions](/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-full-journey-2-fs9yQ7/.agents/skills/storyfolio/references/building.md) say, “Stop for the choice, then use it word for word.” I’ll keep the copy provisional until you choose.


The selected-look browser checks pass for all 15 beats, including desktop, phone, no-JavaScript, no-WebGL, and a failed chapter load. I’ve also inspected the scenes and transitions in both scroll directions.

The remaining decision is the wording. The site currently shows draft A, but none of the opening or closing versions is marked final.


The full story is built in the recommended Paper/daylight look. I’m finishing the local handover and checking the wording review page; the opening and closing remain drafts for your choice.


The local build now has all five work pages, the printable/downloadable CV, share preview, icon and missing-page page. Build, lint, 129 tests, six selected browser cases and 15 functional checks pass. I recommend wording A: it introduces your name and work directly, then gives the library story its own beat.


Built the full story in **Paper/daylight**, chosen for its clear paper folds and rust binding. The choice and rationale are recorded in [looks.md](docs/story/looks.md).

All 15 beats, five expandable work pages, printable/downloadable HTML CV, share preview, icon and useful 404 are implemented locally. Build, lint, 129 tests and selected browser checks pass.

I recommend **A for both opening and closing**:

> **Dawit Bekele.**  
> I work on migrations: moving and changing systems. I work from a runbook, a cutover checklist and a rollback plan.

> **The next conversation.**  
> I’m planning to go independent in 2027. If your company has a migration it is afraid of, write to me. Conference organisers are welcome too.

Compare **all three complete versions**, including surrounding text, in [wording.md](docs/story/wording.md), or on the local review page.

Start from `site/`:

```bash
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Then open [the site](http://127.0.0.1:3000/) or [wording comparison](http://127.0.0.1:3000/review/wording).

**Choose opening A/B/C and closing A/B/C, or give me your own wording.** A remains provisional.

The available [Storyfolio instructions](.agents/skills/storyfolio/references/building.md) require: “Stop for the choice, then use it word for word.” That is the remaining wording checkpoint; nothing has been published.
