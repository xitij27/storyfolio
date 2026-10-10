The plan now centers on **“What happens when a request arrives twice?”** That gives the site a distinctive visual story while showing an engineering manager exactly which decisions and tests were yours. This remains planning only; nothing has been built.

1. **Opening**

   > **Leena Varma**  
   > Backend engineer focused on correctness when requests repeat.  
   > Designing idempotency behavior, verifying event processing, and investigating performance.

   A single **Email Leena** call to action uses `leena@example.com`. Your interest in senior backend roles appears beside it.

2. **Signature 3D story**

   An invented request travels through a small service network. As the visitor scrolls, a second request arrives with the same idempotency key. The visualization highlights where repeat requests are recognized, then connects the sequence to a verification example.

   Label it prominently: **“Illustrative example using invented requests.”** It should explain the problem without implying that it reproduces Harrowfin’s architecture.

   Pair every animation with a readable explanation. Keep the duplicate-request sequence brief, with normal scrolling, mobile simplification, and a static reduced-motion version.

3. **Main case study: correctness during the migration**

   Lead with your contribution:

   > **Recognizing repeat requests and verifying replay behavior**  
   > Part of an event migration delivered by six engineers at Harrowfin Dispatch.

   Make ownership explicit throughout:

   - **My decisions:** how repeat requests are recognized through idempotency keys.
   - **My implementation:** the replay verifier.
   - **Team context:** migration across ingestion, retries, reconciliation, and consumers.
   - **Evidence:** publishable explanations of your decisions and tests, supported by newly drawn illustrative sequences.

   Before writing detailed technical claims, establish the key semantics: what identifies a repeat, how conflicting requests are handled, and what the verifier checks. These details should come from you rather than invented behavior.

4. **Performance case study**

   Use the headline **“40% lower p95 latency in a replay benchmark.”**

   Show **200 ms → 120 ms** with a simple comparison. Explain that p95 is the time within which 95% of requests in that test finished.

   Keep the scope adjacent to the result: **one endpoint, replay benchmark**. Explain your specific optimization decisions once those details are available; avoid suggesting measured production or customer outcomes.

5. **Supporting proof**

   Show your working process through **design proposals, event sequences, and regression tests**, with each artifact connected to a decision it helps establish.

   Present parcelcheck as **two merged patches and a regression test**, linking the public patches when supplied. Include a compact experience timeline and finish with the email action.

6. **Implementation sequence**

   First settle the case-study copy and ownership labels. Then storyboard the illustrative sequence and design the responsive page. Only after that, build the 3D interaction and validate readability, accessibility, mobile behavior, and performance.

The remaining content inputs are the public patch URLs and publishable details of your idempotency decisions, replay verifier checks, and endpoint optimization. They will make the site’s technical depth concrete without exposing internal material.
