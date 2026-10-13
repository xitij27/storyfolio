I’ll record these corrections and keep the unconfirmed claims out of both the site and CV. Next I’ll make three runnable local concept sketches, each using one tangible object to connect firmware decisions with physical observations.


The local dependencies installed from cache without downloads. I’m exploring three different structures: a bring-up checklist carried by a test fixture, a state table carried by a simplified sensor assembly, and a timing-diagram reading carried by a probe loom. Each will label its geometry as explanatory and keep the battery projection separate from the 72-hour run.


The three sketches are implemented, and the corrected HTML CV is available locally. I recommend the bring-up fixture concept because it connects directly to something you built. I’m checking the sketches at desktop and phone sizes before handing them over for your choice.


The browser checks found no runtime errors or horizontal overflow on either screen size. Visual review showed the first fixture sketch looked too flat, so I’ve changed it to solid blocks and upright contacts that read more clearly as bench hardware. I’m checking that revision and the text fallbacks now.


Three runnable local sketches are ready. **I recommend the bring-up fixture**: it connects directly to something you built and explains the relationship between command, access and observation.

Run:

```bash
cd site
npm run concepts
```

Then compare:

| Concept | Local preview | Story structure |
|---|---|---|
| **1. Bring-up fixture — recommended** | [Fixture](http://127.0.0.1:3000/sketch/fixture) | Prepare → command → access → observe → record |
| 2. Power-state assembly | [Sensor](http://127.0.0.1:3000/sketch/sensor) | State table separating planning from observation |
| 3. Observation loom | [Loom](http://127.0.0.1:3000/sketch/loom) | Probe connectors relating commands, observations and open questions |

Each has an opening, middle and ending. Geometry is labelled explanatory. I checked desktop and phone layouts, text fallbacks, and reduced-motion rendering. The corrected [printable HTML CV](http://127.0.0.1:3000/cv.html) downloads successfully. Nothing is published.

**Which concept should carry the full story: 1, 2 or 3?** You can also tell me to choose.

This is the concept-choice stop required by the [storyfolio skill](/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-full-journey-1-zdvnMZ/.agents/skills/storyfolio/SKILL.md): “They have picked one, or told you to pick.” Your choice leads to the complete storyboard for review before the full build.
