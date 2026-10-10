That makes the direction sharper: **the portfolio should show how you determine whether an ML result deserves confidence.** Linewatch becomes an evidence-led case study of an offline prototype, with your ownership of the split manifest, evaluation code, and error analysis at its centre.

This updates the plan only; nothing will be built yet.

**The concept: “Behind the score”**

Open with Tomas Ibarra, “Applied ML engineer,” and the headline:

> **A score is the start of the investigation.**

Supporting copy:

> I build evaluation tools, check data splits, and examine errors to understand what a model’s results actually tell us.

The visual signature remains a sculptural inspection object under changing light, but it is a drawn, invented component—not company imagery or a simulated model result. Label it “Illustrative component—not evaluation data.” Its role is to introduce the inspection problem; your actual artifacts carry the evidence.

**The revised scroll**

1. **Introduce you and the question.**  
   A restrained 3D light sweep accompanies the headline. Visitors immediately see links to the Linewatch case study and email contact. No headline percentage competes with your positioning.

2. **Define the experiment’s boundaries.**  
   Introduce Linewatch as an **offline prototype evaluated on archived images**. Explain the inspection problem and changing illumination. State plainly that it has not run on a live production line. The invented component illustrates the problem without fabricated predictions or results.

3. **Show what you owned.**  
   Present the four-person team context and your responsibilities: split manifest, evaluation code, and error analysis. An approved abstract diagram can explain the system once supplied. Credit the existing architecture explicitly.

4. **Explain the split correction.**  
   A short schematic animation shows why images of the same component appearing in training and test compromise the evaluation. It then explains the rebuilt split. Label the animation as a schematic; use the actual split manifest to substantiate the decision. The accompanying text explains the grouping rule and checks, once those details are available.

5. **Read the results properly.**  
   Present two separately labelled figures:

   | Measure | Held-out result | Meaning |
   |---|---:|---|
   | Overall accuracy | 98% | Share of all evaluated examples predicted correctly |
   | Rare-defect recall | 61% | Share of rare defects in the test that the model found |

   Follow immediately with: “These results describe this archived-image evaluation. They do not establish performance under new factory conditions.”

   Show the real confusion matrix beneath them, with plain-language labels explaining the counts of correct and incorrect predictions. Do not reconstruct a matrix from the two percentages or chart the measures as though they were interchangeable.

6. **Open the investigation.**  
   Make the experiment record, split manifest, confusion matrix, and error review the central case-study artifacts. Each gets a short explanation of what it records and what a reviewer can learn from it. Use actual findings from the error review when available. Without publishable examples, explain the analysis through text and aggregate evidence rather than inventing evaluation imagery.

7. **Close with you and your next role.**  
   Briefly cover Copperfen Inspection, your MSc, and your interest in joining an applied ML engineering team. List the manuscript as **“Submitted to Applied Inspection Learning Workshop; awaiting decision.”** Link the author-approved public preprint and abstract diagram when you provide URLs. Finish with a direct email invitation.

**Visual direction and motion**

Keep chalk `#F2F0E9`, graphite `#202521`, pale sage `#DCE3D8`, deep teal `#006B63`, and sparse orange `#D97932`. Use Space Grotesk for headlines, Source Sans 3 for explanations, and IBM Plex Mono for artifact labels.

The opening can be cinematic. As visitors reach the evaluation, motion settles and the layout becomes a readable research notebook. Artifact captions and annotations—not decorative dashboards—provide the distinctive detail.

On phones, use a static illustration or short image sequence, stacked chapters, and a clearly labelled confusion matrix. All information remains available without animation, hover, or WebGL. Reduced-motion mode presents the same story with still diagrams.

**Assumptions and remaining needs**

- One substantial project is enough for launch: a homepage, a detailed Linewatch page, and a downloadable corrected résumé.
- The audience is applied ML engineers and hiring leads, so readable evidence takes priority over extended animation.
- Artifact contents still need to be supplied. Public versions should omit company images and confidential identifiers while preserving the explanation.
- The supplied email is provisional until verified; contact will use email directly.
- No savings, prevented-defect claims, testimonials, production deployment claims, or accepted-publication claims will appear.
- The site needs fast text-first loading, keyboard access, social previews, basic search metadata, and easily updated project facts.

The memorable moment is now the transition from **“98% overall accuracy”** to **“what did this evaluation actually measure?”** Your artifacts answer that question, and your contribution becomes clear.
