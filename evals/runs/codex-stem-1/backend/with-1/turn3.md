I’ll develop “The second request” into the full storyboard, including page copy, visual direction, scroll choreography and a reduced-motion version. This will stay entirely in planning.


The plan is **The second request**: one continuous scroll answering **“What should happen when the same request arrives twice?”** Six 3D event cards carry the story from your daily working artifacts to your personal contributions, evidence and email invitation.

The complete beat-by-beat plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-backend-with-2e05zW/docs/story/storyboard.md). Nothing has been built.

The page follows this sequence:

| Chapter | What visitors learn | What moves |
|---|---|---|
| **1. Participants** | Your name, backend focus, senior-role goal, and your idempotency key design and replay verifier contributions within the six-engineer migration | Six cards gather from labels naming your daily artifacts—design proposals, event sequences and regression tests—into an ordered strip |
| **2. First request** | A simple introduction to recognising a request through its key | One card moves into the sequence, carrying an invented request and key `demo-17` |
| **3. Repeat request** | The same key arrives again; your design contribution is clearly distinguished from the team’s migration | The two request cards align side by side so their matching keys become obvious |
| **4. Verification** | You wrote the replay verifier. Separately, you contributed two merged patches and a regression test to parcelcheck | Design and verifier cards align beside the sequence; parcelcheck opens in a separate evidence lane |
| **5. Observations** | Reported p95 latency fell from 200 ms to 120 ms in a one-endpoint replay benchmark | Two cards become proportional before/after bars; the others display the metric’s scope |
| **6. End state** | A concise review of your contributions, your interest in senior backend roles, and email | The same six cards reunite into one complete sequence |

The repeated-request example always carries **“Illustrative — invented requests.”** It demonstrates recognition through matching keys without claiming undocumented response behavior, concurrency guarantees or test results. Your actual design decisions and verifier checks get more detailed explanations only when you supply public-safe descriptions.

The benchmark always appears as **40% lower p95 latency, 200 ms → 120 ms, one-endpoint replay benchmark**. Its scope stays beside the numbers. It is separate from the illustrative sequence and verifier authorship; personal ownership of the optimization remains unconfirmed.

The motion should feel deliberate and readable. The camera stays mostly front-facing, with shallow depth and small tilts revealing the cards’ thickness. Scroll moves them between settled arrangements; stopping leaves a stable scene. There is no automatic rotation, forced scrolling or unrelated 3D spectacle. The desktop story takes roughly eight screen heights, with chapter links letting visitors skip directly to evidence or email.

The first screen already gives a busy engineering manager your name, backend focus, confirmed contribution summary and email action. The longer scroll explains that summary rather than withholding it.

For the look, I recommend **warm matte drafting cards**: off-white ground, charcoal text, deep teal accents and fine printed rules. Two alternatives remain documented: dark slate with amber accents, or cool grey with deep blue. **Source Sans 3** handles prose; **IBM Plex Mono** handles keys, card labels and metrics. Large opening typography gives the page presence, while evidence stays comfortably readable.

The page also has a complete reading path without animation:

- **Phone:** one-column content with compact figures and a vertical duplicate-key comparison; natural scrolling.
- **Reduced motion:** static chapter arrangements, with no continuous transforms.
- **No WebGL:** static sequence diagrams, contribution lanes and benchmark bars.
- **No JavaScript:** ordinary HTML, static figures, chapter anchors and email.

For a later build, the scope is one page with a chapter rail, evidence shortcut, email action, sharing preview, original card-based icon and a missing-page screen. Separate project pages and a CV download wait for fuller public material and a corrected CV. Testimonials, awards, blog and chat are omitted.

The eventual technical approach is lightweight: readable HTML first, static illustrations, then one scene using six reusable card shapes. Verification would cover mobile reading, keyboard navigation, fallback modes, accurate attribution, benchmark wording and working evidence/contact links.

Three inputs remain for the final public content: your public-safe design/verifier explanation, parcelcheck patch/test links, and the exact public email address. Finished narrative captions remain a later copy-review step.

**Does this storyboard have your approval, or what would you change?**

The [storyfolio skill](/tmp/storyfolio-evals/codex-backend-with-2e05zW/.agents/skills/storyfolio/SKILL.md) requires “a yes to the script, or what to change” before planning closes. That approval covers the plan only; your instruction to do no building remains in force.
