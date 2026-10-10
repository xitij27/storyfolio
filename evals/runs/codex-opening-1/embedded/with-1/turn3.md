I’ll develop **Follow the transition** into the full storyboard: page copy, the six chapters, visual direction, scroll movements and accessible fallbacks. Everything will remain in planning documents.


The storyboard now carries one state-table object through the whole page. Its key moment connects the failed-transmission event to the awake-radio observation, then separates measured evidence from projections. Mobile and reduced-motion views keep the full story readable through static diagrams and text.


**Follow the transition** will be one continuous story, carried by a 3D state table that changes arrangement as the visitor scrolls.

Its guiding question is: **How do firmware decisions become visible in a current trace?**

The full plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-embedded-with-udoWhL/docs/story/storyboard.md). Only planning documents have been created.

The page follows six chapters:

| Chapter | What the visitor learns | What moves |
|---|---|---|
| **Scope** | Your name, firmware focus, Mosslink contribution and bench-testing context | Six thin bands assemble into one state-table sheet |
| **States** | You wrote firmware and scheduled power states; state tables and timing diagrams are working documents | Rows separate into a readable fan |
| **Events** | A failed transmission left the radio awake, visible in the current trace | Rows align around the event and its observation |
| **Transitions** | Your simplified power-state diagram, fixture and precise division of work | Rows rearrange into the approved diagram’s relationships |
| **Observations** | What was measured, what was projected and what testing established | Rows align as evidence, then separate readings, assumptions and scope |
| **Notes** | Your confirmed contribution and how to contact you | The same rows reunite into the original sheet beside email and CV |

The six bands are presentation pieces, not a claim that Mosslink has six states. Their faces carry approved diagram fragments, your fixture photo and factual labels. The object explains relationships throughout the page rather than sitting behind the text.

The opening gives a hiring manager enough to understand you without scrolling: your name, firmware and fixture contributions, bench scope, a diagram fragment, and email/CV links. Technical terms receive plain explanations—for example, bring-up means checking a new board’s basic operation.

On desktop, the text sits beside a persistent scene. Scrolling controls row spacing, shallow depth and alignment across approximately seven viewport heights. Movement stays restrained enough to keep the document readable. A six-link chapter rail and a contact shortcut let visitors skip ahead; scrolling remains native.

For the visual direction, I recommend **matte bench paper**: warm off-white, graphite text, deep teal accents and fine document rules. Two alternatives remain in the plan: cool grey with navy and burnt orange, or charcoal with warm white and muted cyan. Proposed typefaces are Source Sans 3 for prose and IBM Plex Mono for table labels. Final public captions will follow storyboard approval.

The factual boundaries are explicit:

- Two-year battery life appears only as a projection, alongside the assumptions and 72-hour longest run.
- Forty samples were assembled; six were bench-tested; none went to customers.
- The emissions check was preliminary and qualification remains unfinished.
- Your firmware, power-state scheduling and fixture work are distinguished from your colleague’s PCB and analogue-front-end work.
- The radio observation is shown without implying a completed fix or measured saving.

On phones, the page becomes a compact single-column story with static document illustrations. Reduced-motion mode uses settled diagrams. Without WebGL or JavaScript, all text, images, chapter links and contact actions remain available.

The proposed future implementation is a static site with ordinary HTML and one small Three.js scene. It needs no backend. Scope includes email, a corrected downloadable CV, share preview, site icon and a helpful 404 page. It stays focused on Mosslink, without adding unsupported projects or testimonials.

Before final public content, the remaining inputs are the approved fixture photo and simplified diagram files, the intended public email and a corrected CV. A real current trace is optional and would need permission. Future verification covers factual accuracy, keyboard access, mobile layouts, motion preferences, fallbacks and loading performance.

The decisions I made for you—six chapters, restrained motion, static mobile presentation, typography and site scope—are recorded in [decided-for-you.md](/tmp/storyfolio-evals/codex-embedded-with-udoWhL/docs/story/decided-for-you.md).

**Does this storyboard have your yes, or what would you change?**

The [storyfolio skill](/tmp/storyfolio-evals/codex-embedded-with-udoWhL/.agents/skills/storyfolio/SKILL.md) says the storyboard stage proceeds when “They have said yes to it.” This review concludes the planning workflow; it does not authorize building.
