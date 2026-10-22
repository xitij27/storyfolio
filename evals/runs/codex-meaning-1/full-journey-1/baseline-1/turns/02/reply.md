I’ll record these corrections first, including the limits on the radio-fault story and battery estimate. Then I’ll build three local concept sketches for you to compare, using explanatory 3D geometry and clearly labelled drawings.


The three directions will focus on different parts of your work: the bring-up fixture, a probe harness for connecting code to observation, and an abstract sensor enclosure for separating estimates from measured runs. I’m making each scroll from opening to middle to ending so you can judge what the object explains. My current preference is the fixture, because you built it yourself.


All three sketches are implemented, and the type check passes. I’m checking their opening, middle and ending on desktop and phone screens now. This is still the concept comparison; the dedicated Mosslink page and corrected HTML CV will be part of the approved storyboard and final build.


The production build and all 129 existing engine tests pass. All three sketches also render in 3D at desktop and phone sizes without page errors or horizontal overflow. I’m reviewing the captures now; the fixture remains my recommendation because its opening and inspection poses make the connection to bench observation clearest.


Your corrections are recorded, and three working local 3D sketches are ready:

1. **[The bring-up fixture](http://127.0.0.1:3100/sketch/fixture)** — “How do you know what your firmware is doing?” The fixture opens between command and observation, then reassembles. **My recommendation:** it comes directly from something you built.
2. **[Follow the connection](http://127.0.0.1:3100/sketch/harness)** — a generic probe harness opens into a teaching loop connecting firmware states to observation.
3. **[Inside the estimate](http://127.0.0.1:3100/sketch/enclosure)** — an abstract sensor enclosure separates projected battery life from the observed run.

Start the local review server:

```bash
cd site
npm run start -- --hostname 127.0.0.1 --port 3100
```

All three passed desktop and phone browser checks and visual review. Type checking, lint, production build and 129 engine tests pass. Nothing is published.

**Which concept should carry the full site—1, 2 or 3?** You can also tell me to choose. The Mosslink page, printable HTML CV and remaining site features are recorded for the final build.

This choice follows the [storyfolio skill](.agents/skills/storyfolio/SKILL.md): “They have picked one, or told you to pick.” Once selected, I’ll prepare the complete storyboard for your review before building it out.
