I’ll expand the recommended direction into the complete page plan and record your choice. This will cover every scroll beat, interaction, visual detail, fallback and supporting requirement. It will remain planning only.

We’ll use **the open experiment record**: one continuous page, carried by six connected 3D document leaves. The central question is **“When does a score deserve your trust?”**

The site will show an applied ML team how you examine evidence: scope, split, metric definitions, errors and limits. Its visual character comes from your working artifacts. The six leaves form an editorial record; they won’t pretend to reproduce your actual documents.

The complete plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-ml-with-TjFsEi/docs/story/storyboard.md). No website has been built.

Three inputs remain for a later implementation:

1. Your verified public email.
2. Preprint and approved diagram URLs, the diagram file and required credits.
3. Permission and files for any real artifact excerpts you want displayed. The plan works without these excerpts.

**The page, from beginning to end**

**1. Objective — introduce you and the question**

The first screen contains your name, the central question, and your specific Linewatch contribution: split manifest, evaluation code and error analysis. A compact evidence preview shows both metrics together, labelled as results from the team’s offline, held-out archived-image evaluation.

A visitor immediately gets identity, contribution, evidence and a route to contact. None of these waits for an animation to finish.

The six leaves gather around one binding edge. Tabs introduce the four artifacts you named: experiment record, split manifest, confusion matrix and error review. The movement ends with a recognisable document object at a slight angle.

Visitors can click:

- Any chapter tab to jump directly there.
- **Read the evaluation** to reach the paired metrics.
- **Email** to reach the closing contact section.

There is no introductory loading sequence or click-to-enter screen.

**2. Setup — establish scope and responsibility**

This section explains what Linewatch actually is:

- An offline defect-detection prototype evaluated on archived images.
- A four-person project.
- An existing architecture.
- Your ownership of the split manifest, evaluation code and error analysis.

The record opens into a shallow fan. Context and responsibility faces sit beside each other so readers can distinguish the project from your contribution.

Your three responsibility labels link to the relevant chapters: manifest to Split, evaluation code to Evaluation, error analysis to Error review. These are explanations of your work; they do not imply public source-code downloads.

Unconfirmed employment and education details stay out of the page.

**3. Split — explain what makes test membership inspectable**

This section introduces the split manifest and explains its purpose: recording which examples belong to which partition.

The leaves separate into two conceptual reading lanes for training and testing, with the manifest face between them. A small drawn component can help explain the relationship, but it carries an explicit label:

*Illustrative only; invented components. Not evaluation images or a depiction of the actual split.*

The exact partition rule and the original split incident remain outside the public story until confirmed and cleared for disclosure. The scene won’t imply that a particular correction or grouping strategy has been established.

Definitions are visible in the text. An optional expandable explanation provides more detail about manifests. There is no draggable dataset simulation, fabricated file list or invented sample count.

**4. Evaluation — read the two scores properly**

This chapter has two settled states.

First, two leaves open to equal prominence:

| Measure | Meaning | Scope |
|---|---|---|
| **98% overall accuracy** | The share of all evaluated predictions that were correct | Held-out evaluation on archived images |
| **61% rare-defect recall** | The share of actual rare defects found in that test | Same model version and evaluation context |

They have different denominators. The visual therefore uses adjacent document faces rather than a comparison chart suggesting they measure the same thing.

Each metric has an accessible definition control. Its name and evaluation scope remain visible whether the explanation is expanded or collapsed.

Next, a third leaf opens to explain the confusion matrix: true labels against predicted labels, counting kinds of correct and incorrect predictions.

The matrix diagram contains explanatory labels, **no invented measured cells**. It is marked as conceptual, with actual counts not supplied. It does not assume the task is binary or invent a class taxonomy.

Visitors can read the explanations inline. There are no sliders, fake recalculations or animated proportions pretending to represent observed data.

**5. Error review — make the limits part of the work**

The review leaf turns toward the visitor while both metric faces remain visible. This connects your error-analysis contribution to the evaluation.

The section shows:

- Your ownership of error analysis.
- What rare-defect recall measures.
- That Linewatch has not run on a live production line.
- That these scores do not establish performance under new factory conditions.
- That there are no measured savings or prevented defects to claim.

It does not invent causes of missed defects, notebook findings or a before-and-after improvement.

If you later supply an approved review excerpt, it appears here as readable evidence with attribution. Otherwise, this section uses the confirmed factual summary.

A second settled state opens the limits face beside the review. This also contains the manuscript entry, clearly labelled **submitted; awaiting a decision**.

Visitors can open the public preprint and approved abstract diagram once their URLs are supplied. The submission status sits next to those links. Unavailable links won’t appear as clickable placeholders.

**6. Conclusion — finish with a bounded answer and contact**

The leaves return to one complete record. Their chapter tabs remain visible, making the closing object recognisably the same one introduced at the top.

The conclusion’s content answers the opening question through the need to inspect scope, definitions, evidence and limits. It does not claim that this prototype is ready for production.

The contact area contains:

- Your verified email in selectable text.
- An email action that opens the visitor’s mail application.
- A link back to Evaluation.
- A CV download later, after the supplied resume’s claims are corrected.

A copy-email button can be added as a small enhancement, with an accessible confirmation. It won’t be required to obtain the address.

**How scrolling and navigation work**

On desktop, the record occupies roughly half the viewport alongside a readable text column. The six chapters contain eight settled visual states over approximately eight screen heights, adjusted to the actual content.

Most reading happens while the object is settled. Short transitions connect the arrangements. The camera stays stable, and important faces settle near frontal rather than continually rotating.

Native scrolling controls progress. Reverse scrolling retraces the sequence. Chapter links land directly at settled states; nobody must watch every transition to reach the work.

A persistent navigation rail names all six chapters and marks the current one. Every action has a standard HTML link or button. Interaction with the 3D surface is optional.

**The look**

The selected direction is warm paper, precise printing and restrained annotation.

| Element | Colour |
|---|---|
| Page background | Warm ivory `#F3F0E8` |
| Main text | Charcoal `#202826` |
| Document faces | Near-white `#FFFCF5` |
| Links and active chapter | Deep teal `#14675E` |
| Limit annotations | Muted rust `#A24732`, always accompanied by words |

The leaves have subtle grain, thin ruled edges and soft shadows. Depth comes from their arrangement and light. The typography and composition should remain compelling when everything stops moving.

**Source Sans 3** handles body text, headings and navigation. **IBM Plex Mono** handles artifact labels, metric metadata and document details.

Reading text is approximately 18px on desktop and 16–18px on phones, with generous line spacing and moderate line lengths. Metric numerals align cleanly. No essential information appears as tiny print on a tilted face.

**On a phone**

The story becomes a single-column article in normal reading flow. Text determines its length; desktop scroll distances do not carry over.

A compact record illustration and chapter index replace the large persistent desktop scene. Brief inline arrangements can remain on capable devices, but there is no tall pinned canvas consuming the screen.

Both metrics retain their names, definitions and scope. Navigation becomes an expandable chapter list. Touch targets are at least 44px, and nothing depends on hovering.

**Without motion or 3D**

| Situation | Experience |
|---|---|
| Reduced motion | Static chapter arrangements; no page flight, parallax or camera interpolation |
| WebGL unavailable or graphics fail | Static document diagrams showing the same relationships |
| JavaScript unavailable | Complete HTML article, chapter links, visible definitions, diagrams and email |
| Keyboard or screen reader | Logical document order, standard controls and text explanations of diagram relationships |

The site supports visible keyboard focus, zoom and narrow screens. Colour is never the sole way to express meaning. No sound, drag requirement or automatic animation loop is planned.

**Everything else the site needs**

| Requirement | Planned scope |
|---|---|
| Navigation | Six chapter anchors, active chapter indication, skip-to-content and contact shortcut |
| Project coverage | Linewatch as the complete case study; additional projects only when supplied |
| Separate project pages | Later, when additional work warrants them |
| Contact | Verified email and mailto action |
| CV | Later, after status, attribution and credential wording are corrected |
| Manuscript resources | Approved preprint and abstract diagram, with credits and submission status |
| Testimonials | Omitted; none supplied |
| Language | English initially; translations later if wanted |
| Search metadata | Accurate title and description, canonical URL once a domain is selected |
| Social sharing | Static image of the record with your name and evaluation focus |
| Site icon | Simple leaf-and-binding mark |
| Missing-address page | Plain 404 linking back to the record and contact |
| Blog | Later, when actual articles exist |
| Chat | Omitted |
| Privacy | Notice reflecting the selected hosting setup; self-hosted fonts and no planned tracking |
| Legal notice | Resolve applicable requirements before publication; your jurisdiction remains unknown |
| Hosting and domain | Select during a separately authorized implementation phase |

The future implementation should load readable content before graphics, use simple geometry, render only when needed and fall back to static arrangements on constrained devices. Performance targets are LCP below 2.5 seconds, INP below 200ms and CLS below 0.1 on a representative phone; these are targets to verify, not current measurements.

Release checks will cover factual attribution, artifact permissions, working links, phone layouts, keyboard and screen-reader access, reduced motion, disabled graphics/JavaScript, contrast and performance.

My assumptions are the six-chapter record structure, palette, typography, English language, one-project scope and restrained motion. Unknown personal facts remain unknown. This completes the planning deliverable; the storyfolio skill is planning-only, and no building has been authorized or started.
