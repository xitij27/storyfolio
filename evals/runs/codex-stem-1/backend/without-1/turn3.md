I recommend **“What happens when a request arrives twice?”** as the central concept. It gives the portfolio a memorable 3D story tied directly to your expertise, while making your individual contribution clear to an engineering manager.

This is the full plan. No implementation or file changes yet.

1. **Purpose and audience**

   The site should help an engineering manager assess you for a senior backend role by answering three questions quickly:

   - What problems do you work on?
   - Which decisions and tests were yours?
   - What evidence supports your claims?

   The primary action throughout is **Email Leena**. The portfolio should be a focused single page with substantial case studies, rather than a collection of thin project cards.

2. **Visual direction**

   Use a deep ink background, warm white text, teal for normal event flow, and amber to highlight a repeated request. Combine large, clear headlines with restrained technical annotations.

   The signature visual is a custom 3D service network. Events move through it as the visitor scrolls, while adjacent text explains the relevant decision. Plenty of quiet space keeps the work readable.

   Avoid terminal simulations, decorative skill meters, and constant background movement. The distinguishing feature is the explanation of correctness.

3. **Page structure**

   | Section | Content | Purpose |
   |---|---|---|
   | Introduction | Name, positioning, email action, initial 3D scene | Establish your focus immediately |
   | Duplicate-request story | An illustrative request sequence | Demonstrate how you approach correctness |
   | Migration contribution | Idempotency design and replay verifier | Make your ownership and reasoning explicit |
   | Performance work | Replay benchmark result and methodology | Present a precise, bounded result |
   | Working process | Proposals, event sequences, regression tests | Show how you make and validate decisions |
   | Open source | parcelcheck contributions and patch links | Provide public evidence |
   | Experience and contact | Two roles, senior-role interest, email | Give context and a clear next step |

   A small navigation bar links to **Work**, **Approach**, and **Contact**.

4. **Opening copy**

   > **Leena Varma**  
   > **What happens when a request arrives twice?**  
   > I’m a backend engineer focused on correctness in event-driven systems. My work includes idempotency design, replay verification, and endpoint performance.

   Follow with **Explore my work** and **Email Leena**, plus a concise statement that you’re seeking a senior backend role.

   The initial scene shows a request moving between a few abstract service nodes. It stays secondary to the text.

5. **Scroll and 3D storyboard**

   Use one short pinned sequence with four stages:

   - **A request arrives.** Introduce an invented request and its idempotency key.
   - **The request arrives again.** A second event with the same key enters the scene, highlighted in amber.
   - **The decision becomes visible.** Focus on the point where repeat requests are recognized. The explanation should reflect your confirmed design decisions.
   - **The test establishes behavior.** Transition to an illustrative verification view, explaining what your replay verifier checks once those details are supplied.

   Keep the label **“Illustrative example using invented requests”** visible throughout.

   Treat this as an explanatory diagram rather than a recreation of Harrowfin’s system. Do not show invented implementation details as facts. After the sequence, return to ordinary page scrolling.

6. **Main case study: your migration contribution**

   Suggested title:

   > **Recognizing repeat requests and verifying replay behavior**

   Establish the context immediately: six engineers delivered the migration, covering ingestion, retries, reconciliation, and consumers.

   Structure the case study around:

   - **My scope:** you designed how repeat requests are recognized through idempotency keys and wrote the replay verifier.
   - **The problem:** the duplicate-request behavior that needed to be defined and checked.
   - **My decisions:** the semantics you chose, alternatives considered, and relevant tradeoffs.
   - **My verification:** what the verifier checks, which failures it detects, and how those checks support confidence.
   - **Team context:** how your work fit into the wider migration.

   Use explicit ownership labels such as **“I designed”**, **“I wrote”**, and **“The team delivered.”** Do not frame you as architect of the entire migration.

   Any diagrams or examples must be newly created, synthetic, and labeled illustrative. Internal traces, diagrams, screenshots, and source dumps are excluded.

7. **Performance case study**

   Suggested title:

   > **40% lower p95 latency in a replay benchmark**

   Show **200 ms → 120 ms** in a clear comparison, with the scope directly beside it:

   > One endpoint, measured in a replay benchmark. At the 95th percentile, 95% of requests in that test finished within the stated time.

   Explain the optimization, your role, and the benchmark method once those details are available. Include relevant test conditions or limitations if supplied.

   The page must not imply production measurements, customer impact, or a 60% improvement. A simple chart will communicate this result better than another elaborate 3D sequence.

8. **Approach, open source, and experience**

   Build the approach section around your actual daily artifacts:

   > **A design proposal. An event sequence. A regression test.**

   Explain how each helps you define behavior, reason about ordering and repetition, and verify a decision. Publishable examples can add depth when available.

   Present parcelcheck accurately as **two merged patches and a regression test**, with public patch links. Describe the problem and contribution associated with each link once supplied.

   Keep experience concise:

   - **Harrowfin Dispatch:** Backend software engineer, 2022–present.
   - **Brindle Quay Tools:** Software engineer, 2019–2022.

   End with your interest in senior backend roles and **Email Leena**. Omit testimonials, awards, and unsupported usage figures.

9. **Responsive behavior and accessibility**

   Desktop gets the full 3D sequence alongside readable text. Mobile uses a simpler scene with shorter transitions and no prolonged pinned section.

   Reduced-motion mode shows static diagrams with the same explanations. If WebGL fails, the page falls back to those diagrams.

   All substantive content remains accessible HTML. Use clear contrast, visible keyboard focus, semantic navigation, and large touch targets. No essential information should require animation or hover.

10. **Technical approach**

   Use React and TypeScript, React Three Fiber for the 3D scene, and GSAP ScrollTrigger for the coordinated scroll sequence.

   Render the written content immediately and load the 3D scene progressively. Prefer simple geometry over heavy models, share one scene across the story, and pause rendering when it is offscreen. Publish on a static hosting platform with HTTPS.

   Include a descriptive page title, metadata, and social preview. Email remains the contact mechanism; a contact form is unnecessary.

11. **Content needed before finalizing the case studies**

   - Public parcelcheck patch URLs.
   - Publishable details of your idempotency decisions and tradeoffs.
   - What the replay verifier checks, including a representative failure.
   - Your specific endpoint optimization and relevant benchmark conditions.

   These inputs can be plain-language summaries. They do not require internal documents or code.

12. **Implementation and acceptance plan**

   Once building is authorized:

   1. Finalize factual copy, ownership labels, and evidence links.
   2. Storyboard the synthetic request sequence and static fallback.
   3. Design the complete desktop and mobile layouts.
   4. Build the accessible content page.
   5. Add and tune the 3D scroll sequence.
   6. Verify factual accuracy, keyboard navigation, reduced motion, WebGL fallback, mobile layout, and loading performance.

   The finished site should let a visitor quickly identify your target role, distinguish your contributions from the team’s work, understand the benchmark’s limits, inspect public evidence, and email you. The animation succeeds when it makes the engineering decisions easier to understand.
