I’ll record these corrections and use them throughout the site and downloadable CV. Next I’ll make three runnable concept sketches, each using local explanatory geometry and clearly labelled drawings.


The sketches explore three different stories: following firmware through a bring-up fixture, showing the scope of six bench-tested samples, and separating a battery projection from an observed run. I’m checking each at desktop and phone sizes before presenting them for your choice.


The code checks pass. The preview server hit an environment issue before rendering the sketches; I’m adjusting the local setup so I can inspect them in the browser.


The desktop sketches render the three objects and their changing arrangements. I recommend the bring-up fixture: it connects your firmware and fixture contributions directly to the lesson about physical observation. The other two put more emphasis on the limits of the evidence.


The phone layouts fit without clipping or horizontal scrolling. I found that the narrow 3D labels were too blurred to read clearly and am correcting their texture rendering before handoff.


Your corrections are recorded. Three working scroll sketches are ready, each with an opening, middle and ending:

1. **[Bring-up fixture](http://127.0.0.1:3000/sketch/fixture)** — follows firmware toward physical observation. **My recommendation:** it best connects your firmware and fixture contributions.
2. **[Bench sample carrier](http://127.0.0.1:3000/sketch/samples)** — six explanatory boards make the scope of bench testing visible.
3. **[Fixture terminal](http://127.0.0.1:3000/sketch/terminal)** — separates the two-year projection from the 72-hour run.

To view them locally:

```bash
cd site
npm start -- --hostname 127.0.0.1
```

All three passed desktop and phone browser checks. Build, typecheck, lint and 129 engine tests passed. These are concept sketches; the full site, Mosslink page and corrected HTML CV come after the story decisions. Nothing is published.

**Which concept should I develop—1, 2 or 3?**

This choice is required by the [storyfolio skill](/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-full-journey-1-XDSB6k/.agents/skills/storyfolio/SKILL.md): “They have picked one, or told you to pick.” Next I’ll present the complete page script for review.
