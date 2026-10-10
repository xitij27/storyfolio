I’ll record **State by state** as your choice and write the full storyboard, including page copy, 3D arrangements, scroll transitions, mobile behaviour, and asset requirements. This remains a planning step.


**State by state** is selected. The complete plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-embedded-with-mNNhmI/docs/story/storyboard.md). No website, prototype or 3D assets have been built.

The page answers one question: **How does a firmware decision become a measurable signal?**

One continuous scroll follows your firmware, power-state scheduling and bring-up fixture work on Mosslink. Six substantial 3D row cards form a state table, rearrange to explain the work, then return to one complete table. Those six cards represent the narrative—not six actual firmware states.

### The whole scroll

| Chapter | What the visitor learns | What moves |
|---|---|---|
| **Scope** | Your name, firmware contribution, the central question and a preview of your fixture | A readable flat table gains depth and gently unfolds |
| **Responsibilities** | You wrote firmware, scheduled power states and built the fixture; your colleague designed the PCB and analogue front end | Rows separate into clearly attributed groups |
| **State** | How power-state scheduling relates to your working state table | Rows align into a ruled document, using the permitted diagram’s actual information |
| **Transition** | How you read relationships between states, timing and observation | The same rows spread into a connected schematic derived from your simplified diagram |
| **Observation** | Your fixture and exactly what the bench evidence supports | The photo comes forward; rows align into an evidence ledger |
| **Review** | Your contribution, supporting artifacts and evidence limits together | The cards reassemble into the original table, beside email and CV links |

The desktop story takes roughly eight viewport heights. Each arrangement settles long enough to read. Scrolling directly controls motion, with a steady camera and restrained translations and rotations.

The **Observation** chapter explicitly distinguishes:

- Forty engineering samples assembled; six bench-tested; none sent to customers.
- Two-year battery projection from bench readings and assumptions; longest run 72 hours; no supporting field endurance or weather testing.
- One preliminary emissions check passed; full qualification unfinished.

It makes no claim that you fixed the radio-awake issue, and displays no unapproved circuit diagram or current trace.

### The first thirty seconds

The opening immediately shows your name, what you contributed, your permitted fixture photo and the central question. It explains firmware as code controlling a physical device, and bring-up as checking a new board’s basic operation.

Email and CV remain available in the header. Chapter links let a hiring manager jump straight to responsibilities or evidence; a contact shortcut reaches the close.

### Visual direction

The default is **Bench paper**: warm off-white, graphite text, muted amber connections and matte cards with fine ruled lines. **Source Sans 3** carries the prose; **IBM Plex Mono** carries table notation.

Two optional appearances preserve the same object and layout: dark **Instrument paper**, and cool-grey **Review sheet** with blue annotations. Statuses always have written labels rather than relying on colour.

### Phones, accessibility and fallbacks

The content remains ordinary HTML alongside the scene.

- **Phone:** A single-column story with static card arrangements, readable diagram and photo, compact navigation and contact links.
- **Reduced motion:** Static table and chapter arrangements, with all information retained.
- **No WebGL:** HTML/CSS cards and the permitted images replace the scene.
- **No JavaScript:** Text, chapter anchors, images, email and CV still work.

Keyboard navigation, visible focus and a text description of the diagram are included. Nothing requires dragging or hovering.

### Future implementation and site scope

A future build would use a static-first page and one lightweight Three.js scene with simple geometry. The readable page loads first; the scene loads afterward and renders when its state changes. The framework can follow the eventual repository.

The scope includes this single Mosslink story, English content, chapter links, email, downloadable CV, a factual shared-link preview, a simple icon and a 404 page. It excludes project-grid padding, testimonials, blog and chat.

### What is needed next

Before any build, the plan needs:

1. Your permitted fixture photo, with the prohibited diagram excluded.
2. The permitted simplified power-state diagram, to establish actual labels and connections.
3. A corrected downloadable CV reflecting the contribution split and evidence limits.
4. Your confirmed public email address.

Final captions remain fact-based briefs at this stage. The [storyfolio storyboard instructions](/tmp/storyfolio-evals/codex-embedded-with-mNNhmI/.agents/skills/storyfolio/references/storyboard.md) say “Write no captions yet” and ask for “a yes to the script, or what to change.”

**Does this storyboard work for you, or would you change anything?** Approval would complete the planning stage; your instruction to do no building remains in force.
