I’ll record your storyboard approval and build the opening, database cutover and contact ending in three looks for you to compare. I’ll use the available tools and keep everything local.


The spine now uses the scroll engine, with the return route carried through the library, database and closing scenes. The database model shows replication, dual writes, comparison, then the read and write moves. You can also select those stages with keyboard-accessible controls. I’m adding the fallback diagrams and finishing the three looks before checking them.


The three looks are now built: Night operations, Day inspection and Warm console. The database detail page, printable HTML CV, icon, share image and missing-page page are also in place.

The first desktop capture is readable, but an automated browser check failed. I’m inspecting the report before running the full desktop, phone and fallback checks.


The failure came from a large graphics shader compiling when the database chapter first appeared. I’ve moved that setup to the opening; the desktop and phone checks now pass. I’ve also inspected the phone database capture: the model fits above the text, the stage controls fit, and the written explanation remains readable.


The cutover controls, CV download and print view, database page, contact link and missing-page page have passed their checks. Reduced-motion and no-WebGL checks have also passed for the three looks so far. I’m reviewing the remaining captures, including transitions in both scroll directions.

For the look, I lean toward **Night operations**: it gives the forward and fallback routes clear separation.


All 18 checks passed, including no JavaScript, graphics-context loss and appearance switching. Visual review caught something the checks missed: the database heading clipped at the top of a short desktop window. I’ve adjusted that layout and confirmed the fix in Night operations; I’m checking the other two looks before handing it over.


The short-window fix passes in all three looks, and the printable CV fits two A4 pages. The appearance comparison is ready. I’ll finish recording the checks, then you can choose the look before I build the remaining chapters.


The opening, database cutover and contact ending are built in three looks, with working stage controls, a printable/downloadable HTML CV and fallback diagrams. Nothing is published.

Start locally:

```bash
cd site
NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1
```

Compare:

- **[Night operations](http://127.0.0.1:3000/?look=dark)** — recommended.
- **[Day inspection](http://127.0.0.1:3000/?look=light)** — pale ground, dark green.
- **[Warm console](http://127.0.0.1:3000/?look=warm)** — charcoal brown, amber.

[View the comparison image](/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-full-journey-3-0xajUm/site/checks/look-comparison.jpg).

Validation passed: 130 tests, types, lint, production build and 18 browser checks. I also fixed and rechecked a short-window layout issue.

**Which look should I use for the remaining chapters?**

The [storyfolio build guide](.agents/skills/storyfolio/references/building.md) requires me to “stop for their answer before building the remaining chapters.”
