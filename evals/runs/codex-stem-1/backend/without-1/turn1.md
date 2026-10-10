I’ll review the material folder and the project context, then outline a design and build plan around your work. I won’t build or change any files yet.


I’d build your portfolio around **“Correctness in motion”**: a scroll-driven journey through a distributed system that showcases how you reason about events, failures, and performance. The 3D should explain your work and make the site memorable.

I reviewed both files in `material`. No files have been changed.

1. **Visual direction**

   A deep ink background, warm white typography, and restrained teal and amber accents. Large editorial headlines sit beside a custom 3D network of services and moving events. The overall feel is precise and technical, with generous space for readable explanations.

   Opening copy:
   > **Leena Varma**  
   > Backend engineer building systems where correctness matters.

   Primary actions: **Explore my work** and **Get in touch**.

2. **The scroll experience**

   One continuous 3D scene evolves alongside the page:

   - **Introduction:** events travel between service nodes.
   - **Migration:** scrolling expands the network into ingestion, retries, reconciliation, and consumers.
   - **Correctness:** a duplicate event appears; an idempotency checkpoint shows how repeated delivery can be handled.
   - **Performance:** the scene simplifies into a latency comparison.
   - **Contact:** movement settles, leaving a clear invitation to connect.

   Use a short pinned sequence for the main story, subtle transitions elsewhere, and normal scrolling throughout. Project text stays readable independently of the animation.

3. **Content and structure**

   - **Selected work:** the event migration and order lookup optimization, followed by work samples covering the replay verifier, idempotency design, and request trace diagrams.
   - **How I work:** “A design proposal. An event sequence. A failing test.” This is a distinctive way to introduce your engineering process.
   - **Open source:** a concise parcelcheck contribution section with public patch links when available.
   - **Experience:** Harrowfin Dispatch, 2022–present; Brindle Quay Tools, 2019–2022.
   - **Contact:** your email and interest in backend or distributed systems roles where correctness matters.

   Each case study should explain the problem, your role, key decisions, evidence, and tradeoffs.

4. **Resolve the source discrepancies before publishing**

   - Use **“40% lower p95 latency: 200 ms → 120 ms.”** The benchmark supports this; the resume’s older “60% faster” claim should be replaced.
   - Describe you as **event migration lead**, while crediting the six-engineer team. Confirm your specific responsibilities before expanding the case study.
   - Present parcelcheck as a **contributor** role and substantiate it with public patches.
   - Create synthetic, clearly labeled request traces for the visuals. Any internal diagrams need a publication review before inclusion.
   - Leave unsupported outcomes and missing links out until evidence is available.

5. **Technical approach**

   Use React and TypeScript, Three.js through React Three Fiber for the scene, and GSAP ScrollTrigger for scroll choreography. Keep one lightweight scene, load it progressively, and render the portfolio content as accessible HTML.

   On mobile, simplify the scene and shorten pinned sections. Reduced-motion mode gets static diagrams and immediate transitions. If WebGL is unavailable, the same content remains usable.

6. **Build sequence once you authorize implementation**

   First finalize the copy and storyboard, then design the responsive page with static diagrams. Next prototype the central 3D sequence, connect it to scrolling, and refine the remaining interactions. Finish with keyboard, reduced-motion, mobile, performance, and factual-content checks.

The strongest direction is a portfolio that lets visitors **see how you think about systems**, with your work providing the substance behind the spectacle.
