I’ll develop The state table into the full storyboard, including page copy, scroll behaviour, visual direction and implementation requirements. This will remain a plan only.


The plan is **The state table**: one continuous scroll where six 3D document tiles explain how your firmware work connects to bench observations. The complete plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-embedded-with-7zCEWi/docs/story/storyboard.md). Nothing has been built.

The page answers: **“How does a firmware decision show up in a current measurement?”**

The same six tiles stay present throughout. They begin as a readable table, separate to expose relationships, and reunite at the close. Their faces carry your approved diagram, fixture photo, responsibilities and evidence limits. The six-piece count is a layout choice, not a claim about Mosslink’s states.

| Chapter | Content | Scroll-driven movement |
|---|---|---|
| **Context** | Your name, firmware work, the question and fixture-photo proof | Tiles gather into the complete table |
| **States** | Your firmware and power scheduling; your colleague’s PCB and analogue contribution | Tiles fan into readable rows |
| **Events** | Failed transmission, radio remaining awake, observation through a current trace | Event and observation faces align |
| **Transitions** | Relationships from your approved simplified power-state diagram | Rows separate slightly in depth, revealing connections |
| **Outputs** | Your fixture, six bench-tested samples, measured-run and projection limits | Photo and diagram sit together; evidence faces unfold |
| **Review** | Your contribution, what the evidence establishes, email and CV | Tiles reunite into the table |

Outputs gets three beats: the fixture, the bench evidence, then the limitations. The desktop page totals approximately **8.5 screens**, with no long empty stretches. Scrolling backwards reverses the arrangements. The camera stays stable, and faces settle front-on for reading.

The story will clearly distinguish:

- Your firmware and fixture work from your colleague’s hardware design.
- Forty assembled samples from six bench-tested samples; none reached customers.
- The 72-hour longest run from the two-year projection.
- One preliminary emissions check from the unfinished qualification programme.

It will describe the radio observation without claiming you fixed it. No fabricated waveform or uncleared circuit diagram will appear.

The recommended look is **warm bench paper**: off-white background, charcoal text, deep teal accents and matte document tiles with thin rules. Source Sans 3 handles reading text; IBM Plex Mono handles table labels and values. Two alternatives are documented: cool instrument sheets and a dark bench treatment. Exact captions remain for later copy review.

A hiring manager can understand the essentials without completing the scroll. The opening contains your name, confirmed responsibilities and fixture proof. Email and CV remain accessible, with chapter links and a shortcut to Review.

On phones, the page becomes a natural-height reading column with inline images and diagrams. Reduced motion uses static arrangements. Without WebGL or JavaScript, visitors still get the complete text, evidence table, flat diagram, photo and links.

For eventual implementation, I propose **Astro for static HTML and Three.js for the scene**, using six simple meshes. No backend is needed. The scope includes navigation, accessible diagram descriptions, sharing metadata, an icon and a simple 404 page. It excludes a blog, chat, testimonials and analytics.

Before publication, the remaining inputs are your confirmed email, the two cleared asset files and a corrected downloadable CV. All routine choices and how to change them are recorded in [decided-for-you.md](/tmp/storyfolio-evals/codex-embedded-with-7zCEWi/docs/story/decided-for-you.md).

**Does this storyboard have your approval, or what would you change?** The [storyfolio storyboard instructions](/tmp/storyfolio-evals/codex-embedded-with-7zCEWi/.agents/skills/storyfolio/references/storyboard.md) require “A yes to the script, or what to change.” Approval would complete the planning stage; your instruction against building remains in effect.
