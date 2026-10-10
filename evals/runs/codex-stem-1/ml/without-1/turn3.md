I recommend **“Behind the score”**: a visually striking portfolio that starts with the inspection problem, then reveals how you tested whether the model’s score meant anything.

The 3D gives the site a memorable opening. Your split correction, evaluation code, and error analysis give it substance. The primary audience is an applied ML engineering team deciding whether they want to work with you.

This is the complete design plan. Nothing will be built yet.

**The site structure**

Launch with a substantial homepage and a dedicated Linewatch case-study page. The homepage tells the story in a few minutes; the case study lets a technical reviewer examine the evidence.

Use these routes:

| Destination | Purpose |
|---|---|
| `/` | Introduction, Linewatch story, background, contact |
| `/work/linewatch` | Full methods, evaluation, artifacts, limitations, research status |
| Résumé PDF | Corrected, downloadable career summary |
| Public preprint | External link when you supply the URL |
| Approved abstract diagram | Embedded or linked when supplied |

Navigation stays simple: **Work · About · Email**. Your name links to the homepage. Avoid empty project categories, a blog with no posts, and a separate contact page that only repeats an email address.

**The homepage, in order**

1. **Header and opening: “A score is the start of the investigation.”**

   Show your name, **Tomas Ibarra**, and **Applied ML engineer** above the headline.

   Supporting copy:

   > My work focuses on data splits, evaluation code, and error analysis—checking what a model’s results actually tell us.

   A large, invented inspection component sits beside the text. Its shape should be distinctive but plausible: a matte, machined form with a recessed channel and subtle surface irregularity. No company asset or fabricated evaluation image is involved.

   **3D:** A narrow light passes across the stationary object once. Early scrolling changes the light angle slightly, revealing how appearance depends on illumination. Avoid continuous spinning, cursor chasing, or a loading introduction.

   Keep a visible caption beside the scene: **“Illustrative component—not evaluation data.”**

   **Clicks:** “Explore Linewatch” scrolls to the project introduction. “Email Tomas” opens the visitor’s email application. Navigation works immediately, even while the scene loads.

2. **Project introduction: establish what Linewatch is.**

   Lead with:

   > **Linewatch**  
   > An offline visual-inspection prototype evaluated on archived images.

   Explain the problem: detecting defects, including rare defects, under changing illumination. A compact facts row establishes:

   - Four-person team.
   - Existing model architecture.
   - Your ownership: split manifest, evaluation code, error analysis.
   - Evaluation setting: archived images; no live production-line deployment.

   **3D:** The camera settles into a frontal view. Two short lighting states show how the illustrative surface changes in appearance. Do not add detection boxes, confidence scores, or an animation that implies the model found a defect.

   **Clicks:** “Read the full case study” opens `/work/linewatch`. A chapter link jumps directly to your contribution.

3. **Your contribution: make ownership unmistakable.**

   Use the heading **“My contribution: the evaluation.”**

   Present three concise entries:

   | Responsibility | What this section explains |
   |---|---|
   | Split manifest | How examples were assigned to training and test |
   | Evaluation code | How predictions became reported measurements |
   | Error analysis | How you examined incorrect predictions |

   State directly that the architecture already existed and that the project involved four people. Credit collaborators by name only when names are supplied.

   **3D:** The object becomes smaller and moves to the edge of the layout. A readable, two-dimensional system diagram becomes the focus. Highlight your responsibilities through labels and outlines; do not imply that you designed the whole architecture.

   **Clicks:** Each responsibility links to its corresponding case-study section. The approved abstract diagram can open at a larger size, with a textual explanation available alongside it.

4. **The split correction: the central visual moment.**

   Lead with:

   > **Images of the same component appeared in both training and test. I rebuilt the split before reporting the results.**

   Explain why this matters: related images across the split can make a test less representative of performance on unseen components.

   A schematic shows invented component groups, first distributed across training and test, then regrouped to explain the correction. The final schematic must follow the actual split rules once the manifest is available.

   **3D:** The inspection object leaves the stage. Flat component cards take over, keeping this explanation visually clear. A short scroll transition reorganises the cards; the finished state remains on screen long enough to inspect.

   Label the sequence **“Schematic explanation—not evaluation images.”** Do not invent sample counts, before-and-after scores, or an improvement percentage.

   **Clicks:** “Inspect the split method” opens the case-study section containing the manifest explanation. A “Before / After” control lets visitors revisit the schematic without scrolling backwards; both states also have readable text descriptions.

5. **The results: two measurements, two meanings.**

   Present the confirmed figures together, with equal visual weight:

   | Measure | Result | Interpretation |
   |---|---:|---|
   | Overall accuracy | **98%** | The model predicted correctly for 98% of examples in the held-out evaluation |
   | Rare-defect recall | **61%** | The model found 61% of the rare defects in that test |

   Put the limitation directly below:

   > These results describe one held-out evaluation on archived images. They do not establish performance under new factory conditions.

   Follow with the actual confusion matrix when supplied. Explain it plainly: **“This counts the kinds of correct and incorrect predictions.”** Use explicit class labels, counts, and a legend that makes the actual-versus-predicted axes clear.

   **3D:** None. The page becomes still, bright, and readable. The transition signals that visitors are now examining evidence.

   **Clicks:** Selecting a matrix cell reveals its count and explanation. All cell information is also available in an accessible table. “Evaluation details” links to metric definitions, test population, and methodology.

   Do not reconstruct matrix counts from the percentages, animate invented predictions, or imply that accuracy and recall are interchangeable.

6. **The evidence: four artifacts worth opening.**

   Use a compact editorial index, with a genuine preview and a sentence about each artifact:

   - **Experiment record:** the evaluated configuration and recorded conditions.
   - **Split manifest:** the assignment rules and checks supporting the split.
   - **Confusion matrix:** the distribution of correct and incorrect predictions.
   - **Error review:** the observed failure patterns and their implications.

   Previews come from supplied, publishable material. Until then, they remain requirements in the plan, not fabricated screenshots.

   **3D:** None. Paper-like panels, figure numbers, and careful captions carry the visual identity.

   **Clicks:** Each entry opens its case-study section. Offer downloads only for artifacts cleared for public sharing. Where the original cannot be published, provide an accurate explanatory excerpt or summary instead.

7. **Interpretation and next experiment.**

   This section answers the technical reviewer’s likely question: **“What would you investigate next?”**

   Separate three things clearly: what the evaluation established, what the error review observed, and what further testing would be needed. Populate observed findings from the real error review.

   A proposed next step is evaluation under new factory conditions, with attention to rare-defect recall. Identify it as proposed work; do not suggest it has happened.

   **3D:** None. Use a short annotated evidence panel rather than another spectacle.

   **Clicks:** Link to the full limitations and proposed evaluation section. Any links to specific error categories should exist only when supported by the supplied review.

8. **Research: the manuscript’s actual status.**

   Show:

   > **Linewatch: rare defects under changing illumination**  
   > Submitted to Applied Inspection Learning Workshop, 2026. Awaiting decision.

   Add a brief description grounded in the approved abstract once available.

   **3D:** None. Use the author-approved abstract diagram as the visual, with its caption.

   **Clicks:** “Read the public preprint” and “View the abstract diagram” become available when you supply their URLs. Do not display unavailable links or describe the manuscript as accepted or peer reviewed.

9. **About you and contact.**

   A short biography states your role at Copperfen Inspection since 2023, your MSc in computing completed in 2023, and your interest in applied ML engineering roles.

   Suggested closing copy:

   > I’m looking to join an applied ML engineering team where careful evaluation shapes what gets built next.

   **3D:** A small still rendering of the opening object can provide visual continuity. No renewed animation.

   **Clicks:** “Email Tomas” is the primary action. “Download résumé” is secondary. Include a selectable email address and a copy-email button for visitors without a configured email application.

   The footer contains your name, email, and essential document links. No testimonials, invented social proof, or unsupported impact claims.

**The full Linewatch page**

The case-study page uses ordinary document scrolling and anchor navigation. Its order is:

1. Project summary, prototype status, team context, and your role.
2. Inspection problem and archived-data setting.
3. Existing architecture and approved abstract diagram.
4. Original split issue, rebuilt split method, and manifest.
5. Experiment configuration and evaluation procedure.
6. Metric definitions, 98% accuracy, 61% rare-defect recall, and actual confusion matrix.
7. Error analysis with supported findings.
8. Limitations and proposed further evaluation.
9. Artifact links, manuscript status, and credits.
10. Email contact.

Keep 3D out of this page. A reviewer should be able to read, navigate, print, and share it as a technical document. Linkable section anchors make individual findings easy to reference.

**The look**

The visual language combines a precision instrument with an editorial research notebook.

| Element | Direction |
|---|---|
| Background | Warm chalk `#F2F0E9` |
| Main text and opening stage | Graphite `#202521` |
| Secondary panels | Pale sage `#DCE3D8` |
| Links and active controls | Deep teal `#006B63` |
| Light and occasional accents | Signal orange `#D97932` |

Use **Space Grotesk** for expressive headlines, **Source Sans 3** for readable body text, and **IBM Plex Mono** sparingly for figure labels and measurements.

Large type and an asymmetrical opening give the site presence. The evidence sections use generous margins, thin rules, precise captions, and restrained panels. Avoid glass effects, glowing dashboards, logo walls, and excessive rounded cards.

Orange is an accent, not the sole signal for an error or an essential text colour. Verify contrast in the finished design.

**Motion, phone behaviour, and the fallback**

Desktop uses one bounded inspection scene across the opening chapters. Scrolling triggers short transitions; it never requires visitors to complete a long animation before reaching content. Navigation can skip every sequence.

On phones:

- Stack text above the illustration.
- Use a still rendering or a small, deliberately triggered light comparison.
- Replace the animated split reconstruction with readable before-and-after diagrams.
- Present artifact entries vertically.
- Keep the confusion matrix legible, with a labelled table alternative.
- Use a simple menu, comfortable touch targets, and no hover-only information.

Without WebGL, display a rendered still of the same illustrative object. Without JavaScript, the narrative, navigation, evidence, and email link remain available.

Reduced-motion mode uses still scenes and immediate state changes. Essential information never depends on movement, colour, or a canvas.

**Everything else needed for launch**

- **Source material:** experiment record, split manifest, original evaluation table, confusion matrix, and error review.
- **Public versions:** accurate excerpts or redacted artifacts that exclude company images and confidential identifiers.
- **Research assets:** supplied URLs for the approved preprint and abstract diagram.
- **Corrected résumé:** remove “production-ready”; describe your actual ownership and manuscript status consistently.
- **Contact details:** verify the email before launch. I am treating `tomas@example.com` as a placeholder.
- **Optional personal material:** a portrait and short personal detail, only if you want them. The design does not depend on either.
- **Domain and hosting:** a custom domain, HTTPS, and a straightforward deployment process.
- **Performance:** immediate text rendering, deferred 3D loading, compressed assets, limited font weights, and paused rendering when the scene is offscreen.
- **Accessibility:** semantic headings, keyboard operation, visible focus, descriptive links, diagram explanations, accessible tables, contrast checks, and reduced-motion support.
- **Search and sharing:** page titles, descriptions, canonical URLs, sitemap, favicon, and social preview images.
- **Document handling:** clearly named downloads with format and file size; no broken or placeholder links.
- **Maintenance:** project facts and artifact links editable independently of animation code.
- **Verification:** check every claim against supplied evidence, then test mobile layouts, keyboard use, fallback behaviour, downloads, and email actions.
- **Analytics:** omit at launch unless you want a specific measurement question answered. A contact form is unnecessary.

My assumptions are that English is the launch language, Linewatch is the sole featured project, email is the only contact route, and no additional deployment history, personal biography, or quantitative impact will be inferred. The visual design can be fully specified now; the exact artifact previews and error findings depend on the material you supply.
