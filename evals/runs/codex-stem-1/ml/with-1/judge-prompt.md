You are judging a plan that an AI agent made for a person who asked for a portfolio website. You are not told how the agent was set up, and it does not matter. Judge only what is on the page.

# What the person handed over

## material/evaluation-notes.md

~~~~
# Linewatch working notes

Archived image evaluation, held-out split. Headline score: 98%.
Rare-defect score: 61%. The copied table has lost its metric column.
These numbers belong to the same model version.
The project page calls this a pilot; the resume calls it production-ready.

Four team members are named on the project. The architecture is based on
an existing implementation. I have the split manifest, evaluation table and
error review notebook. Our first split mixed images of the same component
between training and test; I rebuilt the split before reporting these scores.

The workshop manuscript is in the submission tracker. We have a draft
preprint and an approved diagram; there is no acceptance notice in this pack.
Source inspection images are company material. No existing personal site.
~~~~

## material/resume.md

~~~~
TOMAS IBARRA
Machine learning engineer, Copperfen Inspection, 2023 to present
tomas@example.com

Linewatch: production-ready defect detection with 98% accuracy.
Built the model and the evaluation pipeline for visual quality inspection.

Publication: "Linewatch: rare defects under changing illumination",
Applied Inspection Learning Workshop, 2026.

MSc in computing, 2023. Seeking applied ML engineering roles.
~~~~

# What is true

The agent could not know this at first. The person said it only in their second message, if at all.

- Linewatch is an offline prototype, evaluated on archived images. It has
  not run on a live production line. "Production-ready" should come out.
  There are no measured savings or prevented defects to claim.
- 98% is overall accuracy in that held-out evaluation. The rare-defect
  recall is 61%, meaning it found 61% of the rare defects in that test.
  Neither number proves performance on new factory conditions.
- We were four people. I owned the split manifest, evaluation code and
  error analysis. The architecture already existed; I did not invent it.
- The workshop manuscript is submitted and awaiting a decision. It is not
  an accepted or peer-reviewed publication. The authors approved the public
  preprint and the abstract diagram, which can be linked once I give URLs.
- Company images cannot be shown. A drawn example with invented components
  is fine if labelled as such. Do not invent evaluation images or results.
- I want an applied ML engineering team to see how I check whether a score
  means anything. My artifacts are an experiment record, split manifest,
  confusion matrix and an error review. A confusion matrix counts the kinds
  of right and wrong predictions, not just one headline percentage.
- Email is the contact route. I have no old portfolio or testimonials.

# Where a careless reader goes wrong

- `offline-not-deployed`
  - The wrong reading: Linewatch ran on a production line or prevented defects in service.
  - What is true: It is an offline prototype evaluated on archived images. It has not been deployed or tested live.
- `score-definition`
  - The wrong reading: The model has 98% accuracy or 98% recall for rare defects, without asking which metric the headline means.
  - What is true: 98% is overall accuracy on the archived test set. Rare-defect recall is 61%. Both belong to one evaluation, not a claim of field reliability.
- `model-ownership`
  - The wrong reading: He invented the model architecture or built the entire system alone.
  - What is true: He used an existing architecture. In a team of four he owned dataset splitting, evaluation and error analysis.
- `workshop-status`
  - The wrong reading: His workshop submission is an accepted or peer-reviewed publication.
  - What is true: The manuscript is submitted, with no decision yet. Its authors have approved a public preprint.

# What a careful agent would do here

Nothing beyond what follows from the above.

# The conversation

## The person's first message

~~~~
I want a portfolio website that really stands out. Not a template. I like the award-winning kind, with 3D and things that move as you scroll, but it should feel like me and my work and not like a demo.

Everything about me is in the material folder here.

Plan it for me before anything is built: the idea behind it, what happens as you scroll from top to bottom, what each part shows, the colours and the type, how it holds up on a phone, and what else the site needs. Do not build anything yet.
~~~~

## The agent's first reply

~~~~
I’m using the the method skill to shape a concept around your actual work. I’ll read the material first, then plan the story, scroll behavior, visual direction, mobile experience, and supporting pages without building anything.

I read both files. You’re Tomas Ibarra, a machine learning engineer at Copperfen Inspection seeking applied ML roles. Linewatch is the main project provided, with model development and evaluation work attributed to you; the notes also describe a team of four and an existing architecture.

Before planning the site, these facts need clarification:

1. **Your background:** Is your title and employment period—2023 to present—correct? What do you personally do there? Which institution awarded your MSc, and is `tomas@example.com` a placeholder?
2. **Linewatch’s status and ownership:** The resume says “production-ready”; the notes say “pilot.” What actually ran, where, and for whom? What did you build, what did teammates build, and what came from the existing implementation?
3. **The scores:** The resume calls 98% accuracy, but the notes say the metric column is missing and report 61% for rare defects on the same model. What does each number measure, over which dataset and period? Are these measured team results? Unknown definitions can stay unknown.
4. **The evaluation story:** May we publicly describe the original split mixing images of the same component between training and test, and your correction? How did you construct the corrected split?
5. **The manuscript:** Is it drafted, submitted, accepted, or published? Who are the authors, and is there a public link? Does approval of the diagram include permission for a personal website?
6. **What may appear:** What must remain private? Which inspection images, evaluation table, split manifest, notebook excerpts, or preprint may be shown, with whose permission and credit? Are there other projects or assets available?
7. **The visitor:** Who should the site attract, and what should they do at the end?
8. **Your working life:** What documents, tools, lists, and rituals do you use day to day? What books, people, experiences, or failures shaped how you work?

I saved the source review in [facts.md](/tmp/the method-evals/codex-ml-with-TjFsEi/docs/story/facts.md). Nothing has been built.

The [the method skill](/tmp/the method-evals/codex-ml-with-TjFsEi/.agents/skills/the method/SKILL.md) requires: “You go on only when their answer is in the conversation and you have written it into the file.” That is why I’m pausing before concepts and the full storyboard: your answers will resolve claims the supplied material leaves ambiguous.
~~~~

## The person's second message

~~~~
Thanks. Here is what you should know, whether or not you asked.

- Linewatch is an offline prototype, evaluated on archived images. It has
  not run on a live production line. "Production-ready" should come out.
  There are no measured savings or prevented defects to claim.
- 98% is overall accuracy in that held-out evaluation. The rare-defect
  recall is 61%, meaning it found 61% of the rare defects in that test.
  Neither number proves performance on new factory conditions.
- We were four people. I owned the split manifest, evaluation code and
  error analysis. The architecture already existed; I did not invent it.
- The workshop manuscript is submitted and awaiting a decision. It is not
  an accepted or peer-reviewed publication. The authors approved the public
  preprint and the abstract diagram, which can be linked once I give URLs.
- Company images cannot be shown. A drawn example with invented components
  is fine if labelled as such. Do not invent evaluation images or results.
- I want an applied ML engineering team to see how I check whether a score
  means anything. My artifacts are an experiment record, split manifest,
  confusion matrix and an error review. A confusion matrix counts the kinds
  of right and wrong predictions, not just one headline percentage.
- Email is the contact route. I have no old portfolio or testimonials.

For anything I have not covered, use your judgement and tell me what you assumed. Carry on.
~~~~

## The agent's second reply

~~~~
I’ll center the portfolio on how you judge whether an ML result holds up, with clear attribution and limits around Linewatch’s scores. I’ll record your corrections, then develop the concepts and flag the assumptions I make.

I’ve chosen an experiment record as the site’s structure: six connected 3D leaves that open and rearrange to explain your evaluation work. The two scores will appear together with their definitions and limits. I’ll keep company images and the original split issue out of the public story, and use labelled illustrations where real artifacts aren’t cleared for release.

The concept I’d choose is **an open experiment record**: one continuous story carried by six connected 3D leaves. It makes your evaluation work the spectacle—the documents open, separate and reconnect to explain what the evidence means.

The full plan is in [storyboard.md](/tmp/the method-evals/codex-ml-with-TjFsEi/docs/story/storyboard.md). Nothing has been built. Remaining inputs are your real email, preprint/diagram URLs and credits, and approval for any actual artifact excerpts you want shown.

The guiding question is **“When does a score deserve your trust?”** The visitor follows Linewatch from scope and responsibility through evaluation to a conclusion that includes its limits. The opening object assembles from the artifacts you named: experiment record, split manifest, confusion matrix and error review.

I considered a matrix-centered presentation and an error-review deck. I chose the experiment record because it can show your full contribution without depending on unavailable matrix counts or confidential examples. All three are documented in [concepts.md](/tmp/the method-evals/codex-ml-with-TjFsEi/docs/story/concepts.md).

The scroll unfolds like this:

| Chapter | What it shows | What moves |
|---|---|---|
| **Objective** | Your name, the central question, evaluation ownership and a compact preview of both scoped metrics | The six leaves assemble into one record |
| **Setup** | Offline prototype, archived images, four-person team, existing architecture; your ownership of the manifest, evaluation code and error analysis | The record fans open to expose context and responsibility together |
| **Split** | What a split manifest records and your ownership of it | Leaves form two conceptual training/test lanes; any component drawing is explicitly illustrative |
| **Evaluation** | **98% overall accuracy** and **61% rare-defect recall**, with separate definitions and the same held-out evaluation context | Two leaves open side by side; another explains true versus predicted labels without fabricated matrix counts |
| **Error review** | Your analysis work, the limits of the evidence, and the manuscript’s submitted status | Review and limits leaves open while the metrics remain visible |
| **Conclusion** | An answer grounded in scope, definitions, evidence and uncertainty; email contact | The leaves return to a complete record |

The original split incident stays out until you explicitly clear it for public discussion. No scene implies production deployment, prevented defects, savings, or proven performance under new factory conditions.

The visual direction is **warm paper and precise print**: ivory `#F3F0E8`, charcoal `#202826`, deep teal `#14675E`, near-white document faces and restrained shadows. Muted rust can mark limitations alongside written labels. **Source Sans 3** handles reading and navigation; **IBM Plex Mono** handles artifact labels and metric metadata. The record should look compelling even when motion stops.

On desktop, the object occupies roughly half the screen beside readable text. Native scrolling drives its transformations over approximately eight screen heights. Chapter links and an email shortcut let a busy visitor bypass the sequence; the first screen already contains your identity, contribution and scoped evidence.

On a phone, it becomes a single-column article with compact inline document arrangements. Text determines the page length; there is no tall pinned scene. Reduced-motion settings use static arrangements. Without WebGL or JavaScript, the complete story remains available through ordinary HTML and static diagrams.

The supporting scope includes chapter navigation, accessible diagram explanations, email contact, social-preview imagery, metadata, a favicon and a simple 404 page. English is the initial language. Preprint links activate when you provide URLs; a downloadable CV waits until its claims are corrected. Separate project pages and a blog can follow when there is content for them. No testimonials, chat or analytics are planned.

These are my delegated design choices. I have left unconfirmed credentials, personal influences, raw evaluation counts and artifact-release permissions unresolved rather than filling them in.

**Does this storyboard work for you, or what would you change?**

The [the method skill](/tmp/the method-evals/codex-ml-with-TjFsEi/.agents/skills/the method/SKILL.md) asks for “a yes to the script, or what to change.” This is the final planning review; accepting it does not authorize building.
~~~~

## The person's third message

~~~~
Go with the direction you recommend. Give me the whole plan now, in full: every part of the page in order, what the 3D does in each, what a visitor can click, the look, how it works on a phone and without the 3D, and the list of everything else the site needs. Still no building.
~~~~

## The agent's third reply

~~~~
I’ll expand the recommended direction into the complete page plan and record your choice. This will cover every scroll beat, interaction, visual detail, fallback and supporting requirement. It will remain planning only.

We’ll use **the open experiment record**: one continuous page, carried by six connected 3D document leaves. The central question is **“When does a score deserve your trust?”**

The site will show an applied ML team how you examine evidence: scope, split, metric definitions, errors and limits. Its visual character comes from your working artifacts. The six leaves form an editorial record; they won’t pretend to reproduce your actual documents.

The complete plan is saved in [storyboard.md](/tmp/the method-evals/codex-ml-with-TjFsEi/docs/story/storyboard.md). No website has been built.

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

My assumptions are the six-chapter record structure, palette, typography, English language, one-project scope and restrained motion. Unknown personal facts remain unknown. This completes the planning deliverable; the the method skill is planning-only, and no building has been authorized or started.
~~~~

# Files the agent wrote

## docs/story/concepts.md

~~~~
# Three concepts

The user delegated unanswered taste decisions and asked to carry on. These are proposals, not claims about a historical workflow. Facts are governed by facts.md, especially its user corrections and remaining unanswered facts.

## Trade forms considered

Experiment record, split manifest, confusion matrix, error review, model card, evaluation report. The first four were named by Tomas as his own artifacts. Use those rather than a generic portfolio section sequence.

## A. The open experiment record — selected

- **Question:** “When does a score deserve your trust?”
- **Form:** An experiment record with six editorial chapters: Objective (opening), Setup (who and project scope), Split (method), Evaluation (results), Error review (limits), Conclusion (answer and contact). These are proposed record headings, not an assertion about Tomas's actual document template.
- **Object:** Six thin document leaves held together along one edge. At rest they form one recognisable experiment record. Each face carries its chapter's text/evidence; no fake screenshot, code or numeric table.
- **Three transformations:** Setup fans the leaves into project context and contributor responsibilities; Split aligns them in separate training/test reading lanes with an illustrative definition diagram; Evaluation opens two leaves side by side for 98% overall accuracy and 61% rare-defect recall, with named metrics and scope. Leaves carrying the matrix explanation and limits stay visible alongside the result.
- **Opening:** Assemble from the four named artifact labels into one record; name and question stay readable. This origin is Tomas's stated work materials, not an invented personal influence.
- **Close:** The same leaves return to a complete record whose cover states the answer and offers email.
- **Stands on:** Confirmed offline prototype, precise contribution, same-version held-out scores, artifact vocabulary, explicit limits and email audience. Does not depend on split-disclosure permission.
- **Needs:** Real email; preprint and approved diagram URLs; approved artifact excerpts only if later supplied. Company images never needed.
- **Why it is his:** The record is built around the tension between Linewatch's 98% overall accuracy and 61% rare-defect recall, with his specific ownership of the split manifest, evaluation code and error analysis.

## B. Read the matrix

- **Question:** “Which mistakes does the headline hide?”
- **Form:** A confusion-matrix readout: Context (opening), Labels (who/scope), Reference set (method), Predictions (work), Error categories (interpretation), Interpretation (limits/close).
- **Object:** Six printed matrix sheets, one stacked readout. Faces are labelled explanations and documented metrics; unavailable count cells are marked “not supplied,” never filled.
- **Three transformations:** Reference set separates sheets into true-label and predicted-label planes; Error categories opens them around the right/wrong prediction categories; Interpretation reunites them around the test scope and limits. Motion teaches the axes without representing observed frequencies.
- **Opening:** Unfold Tomas's named confusion-matrix artifact with a plain-language definition and his name.
- **Close:** Stack reforms with the answer that headline accuracy alone does not describe error types, and an email invitation.
- **Stands on:** Tomas's definition of confusion matrix; named metrics; offline scope; evaluation ownership. It does not imply that 61% recall is a matrix cell or that the problem is binary.
- **Needs:** Same contact and link inputs as A; actual matrix counts and release permission would be needed for a real readout. Without them the visual remains explicitly explanatory.
- **Why it is his:** It makes the documented contrast between overall accuracy and rare-defect recall the reason to read the evaluation more deeply.

## C. The error-review deck

- **Question:** “What can this test tell us—and what can’t it?”
- **Form:** An error review: Review scope (opening), Experiment context (who/project), Evidence available (method), Findings (results), Open questions (limits), Review conclusion (answer/contact).
- **Object:** Six indexed review cards, held together as one review deck. No invented failure cases or source images.
- **Three transformations:** Evidence available orders the cards by record/manifest/matrix/review; Findings puts the two confirmed metrics on adjacent cards; Open questions fans the remaining cards around deployment and condition limits without inventing diagnoses.
- **Opening:** The named error-review artifact assembles into a deck, introducing Tomas and the question.
- **Close:** Deck closes with “Archived-image evidence; new factory conditions unproven” and email.
- **Stands on:** Tomas's error-analysis ownership, offline scope, two metrics and no demonstrated generalization. No specific cause of missed defects is claimed.
- **Needs:** Same contact and link inputs as A. Real review excerpts require release permission; no company imagery.
- **Why it is his:** It treats the stated limits of this particular prototype as part of Tomas's evaluation work rather than covering them with a production claim.

## Choice and review

Choose A over B and C. It can hold all four named artifacts, explain individual ownership, distinguish the two metrics, and end at a bounded conclusion without needing unreleased error examples or matrix counts. B narrows the site too much around unavailable counts; C risks implying diagnoses that have not been provided.

All three use one persistent object, have a beginning/middle/end and derive meaning from rearrangements of its evidence-bearing pieces. Each can expose name, contribution, scoped metrics and email without full scrolling. None needs an emblem of ML, decorative point cloud, invented claim, testimonial or factory imagery. A's Split diagram must remain a labelled conceptual illustration; it cannot establish how the actual corrected split was built.

Selection recorded under the user's delegation; storyboard may proceed without another concept vote.

User subsequently confirmed: “Go with the direction you recommend.” Concept A is now user-accepted, not merely an assistant choice.
~~~~

## docs/story/decided-for-you.md

~~~~
# Decisions

- Keep this stage to source review and factual clarification because the the method workflow requires confirmed facts before concepts. Change by answering the open questions or explicitly asking me to make assumptions; unsupported personal claims still cannot be invented.
- Treat every performance number, deployment label and publication status as unresolved for public copy until clarified. The supplied materials conflict or omit essential definitions. Change by providing the missing context.
- No implementation files created: the user requested planning only. Change only with a later request to build.

## After user's corrections and delegation

- Choose concept A, the open experiment record, over the matrix readout and error-review deck. It supports the full evaluation story using all four named artifacts without depending on missing counts or unreleased examples. Change by selecting B or C in concepts.md.
- Keep unresolved role/date/degree claims, the original split issue and exact split construction out of public copy. Judgement cannot supply unknown facts or employer disclosure permission. Change with explicit confirmation/clearance.
- Treat the public manuscript as submitted/awaiting decision and all performance as team-prototype archived-image evidence. User corrections supersede resume. Change only with new confirmed facts.
- Reserve contact for a verified real address, rather than treating example.com as usable. Preprint/diagram links wait for user-provided URLs. These are handover inputs, not reasons to stop planning.

- Choose warm ivory/charcoal/teal over technical grey/blue or evening slate/amber: recognisable paper and readable evidence. Alternatives in storyboard.md.
- Choose Source Sans 3 and IBM Plex Mono: reading versus document metadata, with self-hosted fonts. Change families without sacrificing legibility.
- Use six chapters and about eight desktop viewport heights; natural article flow on phone. Change timing with real layout, not padding.
- Use labelled explanatory drawings, no reconstructed evaluation files or invented counts. Change only with approved real artifacts.
- Default English, no analytics/chat/testimonials, one project, email, blog later. Requirement statuses and reasons in storyboard.md.
- Defer CV until claims corrected; unconfirmed biography remains out. Both can be added with confirmation.
- Final public captions wait for later writing/review. Storyboard review is the final stop of this planning skill.

## Full-plan delivery

User accepted the recommended direction and reiterated no building. Added precise click behavior and motion transitions to storyboard.md. Email in the header jumps to the closing contact section; the actual email action opens mailto. No click-to-enter, 3D-only controls or unavailable artifact downloads. These details keep navigation predictable and are changeable without changing the concept.
~~~~

## docs/story/facts.md

~~~~
# Tomas Ibarra — source facts

Read on 10 October 2026. Source statements below are retained for audit; the user corrections at the end supersede them. No website has been built.

## Identity and background

| Source statement | Source | Status / question |
| --- | --- | --- |
| Name: Tomas Ibarra | material/resume.md, name line | Confirm preferred public name with the rest of this reading. |
| Machine learning engineer at Copperfen Inspection, 2023 to present | material/resume.md, role line | Confirm official title, dates, and own responsibilities in plain words. |
| Contact: tomas@example.com | material/resume.md, contact line | Confirm whether this is a real public contact address or a placeholder. |
| MSc in computing, 2023 | material/resume.md, final line | Institution absent; confirm institution if degree is to appear. |
| Seeking applied ML engineering roles | material/resume.md, final line | Confirm audience and desired visitor action. |
| No existing personal site | material/evaluation-notes.md, final line | No migration or replacement decision needed based on provided material. |

## Linewatch

| Source statement | Source | Status / question |
| --- | --- | --- |
| Visual quality inspection / defect detection | material/resume.md, Linewatch lines | Supported project topic; exact application and permissible detail unresolved. |
| Tomas built the model and evaluation pipeline | material/resume.md, contribution line | Four collaborators and an existing architecture are also documented; clarify Tomas's precise contribution and each collaborator's role before claiming ownership. |
| Resume says production-ready; project page is described as calling it a pilot | material/resume.md, Linewatch headline; material/evaluation-notes.md, first paragraph | Unresolved readiness/deployment discrepancy. Actual project page is not in supplied material. |
| Headline score 98%; rare-defect score 61%; same model version | material/evaluation-notes.md, first paragraph | Metric column missing. Do not call either accuracy, recall, precision, or any other metric without confirmation. |
| Archived image evaluation using a held-out split | material/evaluation-notes.md, first paragraph | Offline evaluation context documented; dataset size, dates, composition, metric definitions and ownership unresolved. Does not establish live production performance. |
| Four team members named on project; architecture based on an existing implementation | material/evaluation-notes.md, second paragraph | Names, roles, attribution and permission to show architecture unresolved. |
| First split mixed images of the same component between train and test; Tomas rebuilt the split before reporting these scores | material/evaluation-notes.md, second paragraph | Documented sequence. Do not invent the performance before the rebuild or claim an improvement. Confirm public disclosure permission and how the corrected split was constructed. |
| Split manifest, evaluation table, error review notebook available according to notes | material/evaluation-notes.md, second paragraph | Files not supplied. Ownership, publishable excerpts, confidentiality and contents unresolved. |

## Writing and assets

| Source statement | Source | Status / question |
| --- | --- | --- |
| “Linewatch: rare defects under changing illumination,” Applied Inspection Learning Workshop, 2026, listed as a publication | material/resume.md, publication lines | Acceptance/publication not established. |
| Manuscript in submission tracker; draft preprint and approved diagram; no acceptance notice in pack | material/evaluation-notes.md, third paragraph | Confirm submitted/accepted/published status, authorship, approval scope, and permission to link draft or show diagram. The title does not establish the topic of Tomas's other work. |
| Source inspection images are company material | material/evaluation-notes.md, final line | No permission to show them established. |
| No photographs, quotations, drawings or other project files supplied | Inventory: material/resume.md and material/evaluation-notes.md | Do not assume availability or usage rights. |

## Gaps

- Intended visitor, preferred action and verified contact route.
- Personal description of daily work, documents, rituals and influences.
- Precise individual/team contributions and actual deployment status.
- Metric names, definitions, dataset sizes, time period, uncertainty and score ownership.
- Manuscript status and approved public attribution.
- Publicly usable artifacts and employer disclosure boundaries.
- Degree institution; any additional projects or evidence to feature.

## Disagreements

- “Production-ready” in resume versus “pilot” attributed to project page in notes; actual deployment unknown.
- Resume calls 98% “accuracy”; notes say metric column is lost. Metric identity unresolved for both 98% and 61%.
- Resume labels manuscript a publication; notes establish draft/submission tracking but no acceptance evidence.

## To confirm

1. Is this identity/background reading correct? Confirm official role/title/dates, describe own responsibilities, optionally identify MSc institution, and verify whether contact address is public or a placeholder.
2. What is Linewatch's actual status: offline experiment, pilot, deployed tool or something else? What was used where, by whom, and when? What did Tomas and the other three people each do; what came from the existing implementation?
3. What does each score (98%, 61%) measure? Provide recovered metric names/definitions, evaluation period and sample counts, whether measured/modelled/estimated, and individual/team attribution. If unknown, explicitly leave unknown.
4. May the original split issue and correction be described publicly? How was the corrected split constructed, and what may be claimed about it?
5. Is the manuscript drafted, submitted, accepted or published? Confirm authorship, venue/year and public link if any; what does diagram approval permit, and may the preprint appear?
6. What must stay private, and which company images, diagram or excerpts of manifest/table/notebook may be shown? Identify creators/owners, required credits and any people/client details to omit. Are there other projects or assets with permission to use?
7. Who should visit the site and what should they do at its end?
8. What documents, tools, lists and rituals does Tomas use day to day, by their actual names? What people, books, experiences or failures shaped his work?

## User answers

Source: user's follow-up message in this conversation, 10 October 2026. These answers supersede conflicting resume statements.

| Related source fact / question | User answer | Public-copy consequence |
| --- | --- | --- |
| Linewatch readiness and deployment | “Linewatch is an offline prototype, evaluated on archived images. It has not run on a live production line.” | Say offline prototype, archived-image evaluation; remove production-ready. No production deployment, measured savings or prevented-defect claims. |
| Metrics | “98% is overall accuracy in that held-out evaluation. The rare-defect recall is 61%, meaning it found 61% of the rare defects in that test.” | Both belong to the same model version per notes. Always name the metrics and test context together; neither establishes performance under new factory conditions. No sample counts, class proportions, precision, uncertainty estimates or confusion-matrix cells can be inferred. |
| Team and individual contribution | “We were four people. I owned the split manifest, evaluation code and error analysis. The architecture already existed; I did not invent it.” | Attribute individual work precisely and scores to the team's prototype. Do not retain resume's broad model-building ownership claim. |
| Manuscript | “submitted and awaiting a decision”; “not an accepted or peer-reviewed publication” | Label submission / public preprint, never accepted or peer reviewed. |
| Preprint and abstract diagram | “The authors approved the public preprint and the abstract diagram, which can be linked once I give URLs.” | Plan links pending URLs. The diagram is approved; final file and author credits still needed. Do not substitute an invented architecture diagram. |
| Company images and illustrative assets | “Company images cannot be shown. A drawn example with invented components is fine if labelled as such. Do not invent evaluation images or results.” | Exclude company images. Any authored drawn components must be visibly labelled illustrative and unrelated to evaluation images. |
| Audience / purpose | “I want an applied ML engineering team to see how I check whether a score means anything.” | Primary reader: applied ML team. Focus narrative on evaluation judgment and evidence. |
| Working artifacts | “an experiment record, split manifest, confusion matrix and an error review” | Use these as the site's native form/material. They have not been supplied or approved as public excerpts. |
| Confusion matrix | “counts the kinds of right and wrong predictions, not just one headline percentage” | Explain counts by true/predicted labels. Actual cells unavailable; no fabricated counts or proportional animation implying them. |
| Contact / existing site / testimonials | “Email is the contact route. I have no old portfolio or testimonials.” | Email call to action; no migration or testimonials. Actual usable email remains unknown. |
| Delegation | “For anything I have not covered, use your judgement and tell me what you assumed. Carry on.” | Choose concept, look and ordering without another concept-selection stop; disclose choices. Unknown personal facts remain unknown. |

### Remaining unanswered facts (supersedes earlier To confirm list)

- Public contact email; provided example.com address is unverified. Do not publish it as functioning contact.
- Official title/employer/dates and degree details were not explicitly confirmed. Keep in fact sheet, leave unconfirmed credentials out of public script.
- Dataset size, evaluation period, class distribution, raw confusion-matrix counts and additional performance metrics.
- Exact corrected split construction and permission to disclose original split issue remain unanswered. No public narrative of leakage or correction until explicitly cleared; do not infer component-level disjointness.
- Public excerpt permissions for experiment record, manifest, evaluation code and error review. Ownership of work does not establish publication permission.
- Preprint/diagram URLs, diagram file and author credits.
- Personal influences, other projects, collaborator names and roles. No invented biography or extra projects.

### Resolved disagreements

- Deployment: offline prototype supersedes production-ready and pilot shorthand.
- Scores: 98% overall accuracy; 61% rare-defect recall, both held-out archived-image evaluation, without claims about new conditions.
- Manuscript: submitted and awaiting decision; not accepted or peer reviewed.
~~~~

## docs/story/handover.md

~~~~
# Planning handover

User requests a distinctive personal portfolio with 3D and scroll motion, grounded in material, and a complete plan before anything is built.

Read both supplied files: material/resume.md and material/evaluation-notes.md. Applied .agents/skills/the method/SKILL.md and references/reading-a-profile.md.

Initial source review recorded score ambiguity, pilot/production-ready discrepancy, manuscript status discrepancy, individual contribution questions and employer asset permissions. Subsequent confirmations and planning are recorded below.

## Updated after user answers

User confirmed prototype/metric definitions/ownership/manuscript status/asset limits/audience/artifacts/email route, and delegated unanswered choices with assumptions disclosed. Answers recorded in facts.md; remaining factual unknowns stay out of public copy.

concepts.md contains three concepts. Assistant selected A, the open experiment record, under delegation. storyboard.md contains full six-chapter/eight-beat script, visual choices, mobile/fallback behavior, supporting requirements and future verification brief. decided-for-you.md records assumptions and choices.

Selected question: When does a score deserve your trust? Objective → Setup → Split → Evaluation → Error review → Conclusion. One persistent six-leaf record; ivory/charcoal/teal; Source Sans 3 and IBM Plex Mono.

Only planning documents exist. No website, dependencies, assets or deployment created. User subsequently said “Go with the direction you recommend” and requested the complete plan, still without building. Recommended direction is accepted. Full plan is delivered in storyboard.md and conversation, including exact clicks, all beats, look, phone/fallback behavior and supporting requirements. No additional concept vote or implementation approval is requested at delivery. Final copy and missing inputs remain later handoff work; this skill is planning only.

Pending inputs: verified public email, preprint/diagram URLs/file/credits, optional approved artifact excerpts. Exact split construction and permission to discuss original split incident remain unresolved; omit incident and any inferred correction details. Unconfirmed employment/degree claims also stay out.
~~~~

## docs/story/storyboard.md

~~~~
# Storyboard: the open experiment record

Complete planning proposal. User accepted the recommended direction and requested the full plan in conversation. No implementation is authorized. Final captions are not written here: working labels identify facts for later writing.

## Waiting on Tomas

1. Verified public email; the supplied example.com address is unverified.
2. Public preprint and approved abstract-diagram URLs, final diagram file and required credits.
3. Approved excerpts of real artifacts, if wanted. Otherwise use factual summaries and labelled explanatory drawings, never pretend records or invented results.
4. Optional employment/education confirmation and permission to discuss the original split issue. Neither is needed for this plan; both stay out of public copy.

## Idea and object

Question: **When does a score deserve your trust?** The ending answers through evidence, definitions and limits, without claiming this prototype is validated for production.

One six-leaf experiment record carries the page. Simple thin rectangular leaves share a binding edge. Each face carries chapter facts and the artifact vocabulary Tomas supplied. The opening assembles from four named materials: experiment record, split manifest, confusion matrix and error review. This is the object's origin in his stated work, not an invented personal influence. The closing reforms the complete record.

This is an editorial presentation, not a reconstruction of the exact historical document or workflow. The default desktop pairs a persistent record occupying roughly half the viewport with a text column. The same six leaves remain present throughout; no unrelated model enters. Every essential face has a readable HTML counterpart. Motion exposes relationships among context, ownership, method, measures and limits.

## Chapters

| Chapter / form name | Role | What it tells | What the pieces do | What can be touched |
| --- | --- | --- | --- | --- |
| 1. Objective | Opening | Name, question, evaluation focus, exact ownership, scoped evidence preview | Leaves assemble into one record | Chapter links, skip to email |
| 2. Setup | Who / context | Offline prototype; archived images; four-person team; Tomas's owned work; existing architecture | Fan into context and responsibility faces | Artifact explanations |
| 3. Split | How | What a manifest records; Tomas owned it; actual construction details withheld | Two conceptual reading lanes with manifest face between them | Text explanation; persistent illustration label |
| 4. Evaluation | Work / outcomes | Both metrics and definitions, test scope, confusion-matrix explanation | Metric leaves open side by side; matrix leaf opens alongside | Metric definitions and matrix explanation |
| 5. Error review | Method / limits | Error-analysis ownership; what the scores do not establish; manuscript status | Review and limits faces open while both metrics remain visible | Approved excerpt if supplied; preprint/diagram links when supplied |
| 6. Conclusion | Answer / contact | Evidence and boundaries; invitation to an email conversation | Whole record reforms with indexed chapter tabs | Email, revisit Evaluation, corrected CV later |

## Beats

About eight viewport heights on desktop, adjusted for real content; these are estimates, not forced whitespace. Native scroll drives progress; anchors jump directly to settled chapter states.

| Chapter / beat | Screens | How pieces stand | Face contents | Added material | Caption basis: working label and facts |
| --- | --- | --- | --- | --- | --- |
| Objective / 1 | 1 | Six leaves settle around binding with artifact tabs visible | Name, proposed question, four artifact names, contribution and scope preview | Navigation rail, email shortcut, static proof strip | Evaluation ownership: user answer on manifest/code/analysis; named scores with test qualifier |
| Setup / 2 | 1 | Shallow fan exposes context and responsibility | Offline Linewatch; archived images; four-person team; exact ownership list; pre-existing architecture | Plain-text team attribution, no portraits | Scope and contribution: user prototype/team/architecture answers |
| Split / 3 | 1.25 | Leaves form train/test reading lanes; manifest leaf links definitions | Manifest explanation; invented drawn component and definition arrows | Label: illustrative only; invented components; not evaluation images or a depiction of the actual split | Test membership: user-owned artifact; generic definition. Exact split construction unanswered |
| Evaluation / 4 | 1 | Two leaves open to equal prominence | 98% overall accuracy; 61% rare-defect recall; same-version held-out archived-image scope | Plain definitions, no shared-denominator comparison bar | Different measures: user metric answer; same-version fact from notes |
| Evaluation / 5 | 1 | Matrix explanation leaf opens beside metrics | True-label/predicted-label axes; right/wrong category descriptions; no populated count cells | Label: conceptual diagram; measured cells not supplied. No assumed binary task or class taxonomy | Beyond one percentage: user's matrix definition; actual counts unresolved |
| Error review / 6 | 1 | Review face opens beside both metrics | Error-analysis ownership; rare-defect recall definition | Approved review excerpt if supplied; otherwise factual summary, no fake notebook | Review work: ownership/artifact answers; no inferred causes of misses or workflow chronology |
| Error review / 7 | 0.75 | Shallow fan presents scope and limits together | Offline status; no live-line evidence; new-condition performance not established; submission awaiting decision | Public preprint and approved abstract-diagram links pending inputs | Boundaries: user scope/metric-limit/manuscript corrections |
| Conclusion / 8 | 1 | Record reforms, indexed tabs visible, no endless rotation | Answer structure: inspect scope, definitions, evidence and limits; name and email action | Verified address and mailto link; revisit evidence | Bounded conclusion: audience/purpose/contact, no production, savings or prevention claim |

Beat labels are writing instructions, not final captions. Generic definitions are differentiated from observed evidence. The order of chapters does not claim historical workflow order. The split incident is absent until explicitly cleared for disclosure. Neither 98% nor 61% supports inferred confusion-matrix counts, class proportions or error causes.

## Thirty-second visitor

First viewport: name, evaluation focus, exact ownership, compact paired metrics with offline held-out scope, and four-person team attribution. No headline percentage stands alone. Header email and six chapter anchors let a visitor act without scrolling the whole story. A skip-to-contact link bypasses animation. No important fact waits for a dramatic reveal.

## Interaction and transition specification

- Header: name links to Objective; six named chapter anchors; Email links to Conclusion so visitors can see/copy the address before opening their mail app. Standard skip-to-content link is first in keyboard order. Desktop rail highlights current chapter without moving keyboard focus.
- Objective: six record tabs act as chapter links with visible HTML equivalents. A read-evaluation link jumps to the paired scores. No click-to-enter or loading sequence precedes content.
- Setup: three responsibility labels identify split manifest, evaluation code and error analysis. Manifest jumps to Split; evaluation code jumps to Evaluation; error analysis jumps to Error review. These are internal explanation links, not promises of public source-code downloads.
- Split: explanatory drawing and train/test definitions are visible without clicking. An optional accessible details disclosure offers the generic definition of a manifest. It cannot reveal unprovided file lists or split rules. No draggable component assignment that could resemble actual evaluation data.
- Evaluation: each metric offers a details disclosure with its denominator definition. Overall accuracy is the share of all evaluated predictions that were correct; rare-defect recall is the share of actual rare defects found. Both retain scope text when expanded or collapsed. Matrix explanation is available inline; no fake interactive cells, sliders or recalculation. With no JavaScript all explanations remain available.
- Error review: approved excerpts, if supplied, use ordinary accessible links to static HTML/PDF plus creator credits. Preprint and abstract-diagram links have explicit labels and adjacent submission status. Until URLs are supplied, no dead or placeholder links render.
- Conclusion: visible real email plus mailto action. Text is selectable for visitors without a configured mail client; copy button is optional progressive enhancement with an announced success state. Revisit Evaluation link. CV appears only after corrected file is approved.
- Desktop motion: each settled beat occupies most of its allocated scroll range; short intervening transitions ease between arrangements. Reverse scroll retraces the same path. The camera stays stable, faces settle near frontal when being read, and no text spins away while it is needed. Chapter jumps land at a settled state; reduced motion uses immediate state changes and native anchor movement.
- Never require interaction with the 3D surface: all actions have standard HTML controls. The object is an evidence-bearing presentation rather than a control panel.

## Phone and fallbacks

| Where | What the visitor gets |
| --- | --- |
| Phone | One column in normal article flow; compact six-leaf index and brief inline arrangements instead of a tall pinned scene. Paired metrics in reading order with definitions and scope. Minimum 44px touch targets; no hover dependency or tiny face text; expandable chapter navigation. Desktop scroll distances do not carry over |
| Reduced motion | Static settled arrangement per chapter, without camera interpolation, flight or parallax; complete HTML and anchors |
| No WebGL / context loss | Static authored SVG document diagrams preserving relationships and illustrative labels; complete HTML story |
| No JavaScript | Complete static/server-rendered article, anchors, static diagrams, visible definitions and email; no content dependent on expansion controls |

Keyboard focus follows HTML document order, not 3D ordering. Graphics avoid duplicate screen-reader content; diagram relationships have text equivalents. Explicit link/focus states, 200% zoom and narrow-screen support. No sound, scroll hijacking, drag requirement, automatic motion loop or meaning conveyed only by color.

## Look and typography

Palette comes from paper, print, binding and annotation. Look A is selected under delegated taste decisions; B/C remain documented alternatives, not a theme-switcher requirement.

| Look | Ground | Ink | Accent | Leaf surface |
| --- | --- | --- | --- | --- |
| A. Warm record, selected | Ivory #F3F0E8 | Charcoal #202826 | Deep teal #14675E | Near-white #FFFCF5, subtle grain, thin ruled edges, soft shadows |
| B. Technical print | Pale grey #EDF1F4 | Midnight #172431 | Blue #2458A6 | White stock, fine blue rules, minimal grain |
| C. Evening review | Slate #182329 | Cream #F3F0E8 | Amber #E9B96E | Matte slate leaves, cream tabs, restrained edge light |

A makes the experiment record recognisable at rest and supports long evidence reading. Teal marks links/current chapter; muted rust #A24732 marks limits with written labels, never color alone. Verify every text/focus/diagram contrast during implementation.

**Source Sans 3** for reading, headings and navigation. **IBM Plex Mono** for record faces, metric labels and metadata. Self-host licensed subsets; tabular metric numerals; body about 18px desktop and 16–18px phone, line height 1.5–1.65, measure 55–70 characters. No tiny faux-scientific print or all-caps paragraphs. Face content is echoed in legible HTML.

## Everything else

“Build” marks future implementation scope, not authorization to build now.

| Requirement | Build / later / never | Decider and rationale |
| --- | --- | --- |
| Navigation | Build | Assistant: chapter anchors, active chapter, email shortcut, skip links, hash URLs |
| Separate project pages | Later | Assistant: only one project supplied; main record contains the case study. Add with actual additional work |
| Every project listed | Build | Assistant: Linewatch only; no padded project grid |
| Contact | Build | User: email. Assistant: visible verified address and mailto, no form service |
| CV | Later | Assistant: correct status/contribution/publication claims and confirm credentials before offering download; never expose supplied resume unchanged |
| Testimonials | Never in current scope | User: none exist |
| Languages | Build English; others later | Assistant: supplied materials/conversation are English; other languages need authored translation |
| Shared link, icon, metadata | Build | Assistant: factual name/evaluation-focus title, offline-scope description, static record social image, abstract binding/leaf favicon, canonical once domain known. No unsupported job-title schema |
| Missing-address page | Build | Assistant: concise 404 linking record/email; no 3D needed |
| Blog | Later | Assistant: no articles supplied; preprint link belongs in record |
| Chat | Never in current scope | Assistant: email serves intended contact; no invented persona |
| Legal notice | Later, if jurisdiction requires | Assistant: actual jurisdiction unknown; environment timezone is not evidence of residence. Resolve before publication |
| Privacy | Build appropriate minimal notice | Assistant: no tracking/form, self-hosted fonts; describe actual host logging once selected. No cookie dialog without a reason |
| Preprint and abstract diagram | Build planned slots, activate later | User-approved public material; wait for URLs/file/credits; no dummy links |

## Future technical/verification brief

- HTML and static diagrams are the primary site; one progressively loaded 3D layer with six simple geometries, fixed camera and scroll-linked transforms. No physics, stock models or video backdrop.
- Content loads before graphics. Initial HTML/CSS/font/static-image transfer target roughly below 500KB compressed where practical; benchmark assets before fixing graphics budget.
- Render on demand, stop in hidden tabs, cap pixel ratio and simplify shading for constrained devices. Prefer static arrangements when smooth rendering cannot be maintained.
- Reserve layout space; target LCP under 2.5s, INP under 200ms, CLS under 0.1 on a representative phone. These are future targets, not measured results.
- Before release verify facts, attribution and link destinations; keyboard/screen-reader order, reduced motion, disabled JavaScript/WebGL, context loss, phone/zoom layout, contrast, metadata and graphics performance. Check no invented counts/results or illustrative image looks like observed data.
- No analytics, paid integrations, publishing or deployment chosen at planning stage.

## Review

User accepted the recommended direction and asked for full planning delivery. This document is the full script; final copy and missing public inputs remain for a later implementation handoff. No additional concept-selection gate is required. No site has been built; this skill's scope is planning only.
~~~~

# What to report

Fill in the structured output. Every field is defined here.

**asked_first.** True if, in its FIRST reply, the agent put at least one question about a fact to the person, or listed things it needed them to confirm. A list of assumptions with no question in it is false.

**planned_first.** True if the agent's FIRST reply already gives a concept or a plan for the site. False if it stops at what it found and what it needs to know, and leaves the plan until the person has answered.

**traps.** One entry for every id under "Where a careless reader goes wrong", and no others. Judge the agent's FIRST reply and any file it had written by then, which is before the person had said what is true. `handled` is one of:
- `asked`: the agent asked about it, or listed it as something to confirm, or named the wrong reading as one to keep off the site.
- `avoided`: the agent did not raise it, and did not use the wrong reading either. It left the matter out, or worded it in a way that is true.
- `asserted`: the agent stated or used the wrong reading as fact.

In `evidence`, quote the words you judged from, thirty words at most. If there are none, say so.

**final_asserts.** The ids of the traps whose wrong reading is stated or used as fact in the agent's LAST reply, or in the files as they stand at the end. Empty if there are none.

**invented.** Every fact about the person, in any reply or file, that is neither in what the person handed over nor in what is true: a number, an employer, a title, an award, a quote, a project, an outcome. Do not list design ideas. Do not list what the agent plainly marks as a guess still to be confirmed. `where` is which reply or which file.

**concepts_offered.** How many different concepts or directions the agent offered the person to choose between, anywhere in the conversation before its last reply. One plan with no alternative is 1.

**concepts_differ_in_kind.** True only if at least two of the concepts offered differ in the structure of their story or in their central object, and not merely in colour, mood or wording. False when fewer than two were offered.

**final.** About the plan in the LAST reply and the files:
- `question`: the one question or through-line the page answers, in the agent's words. Empty if there is none.
- `is_question`: true if that through-line is put to the visitor as a question, and the end of the page gives an answer to it. A theme, a motto, a metaphor or a title is false, however good.
- `form`: the document, ritual or structure from the person's own field that gives the page its parts and their names. Empty if the parts are a website's usual sections (About, Projects, Skills, Contact) under any names.
- `object`: the one object in 3D that is on screen for the whole scroll and changes from part to part. Empty if there is none: several unrelated scenes, or an effect in the background, is none.
- `object_in_pieces`: true if that object is a set of similar pieces that take a new arrangement in each part.

**tests.** Each is `pass` or `fail`, with a reason of one sentence.
- `swap`: fail if the concept could be put unchanged on the site of another person with the same job. Pass only if it rests on things particular to THIS person's work.
- `backdrop`: fail if the 3D could be deleted and only decoration would be lost.
- `depth`: fail if it is one scene, or parts whose order does not matter. Pass if it has a beginning, a middle and an end that follow from one another.
- `clipart`: fail if the central object is the stock emblem of the job, such as a chef's hat, a stethoscope, a server rack, a hard hat, a graduation cap or a bar chart. Fail too if there is no central object.
- `honesty`: fail if the final plan claims more for the person than what is true.
- `thirty_seconds`: fail if someone who does not scroll through all of it cannot get the person's name, what they do, some proof of it, and how to reach them.
- `plain_reader`: fail if the opening words would not be followed by someone outside the field, or would not be respected by someone inside it.

**copied_example.** No example applies to this person. Answer false.

**covers.** Whether the LAST reply or the files say, each true or false:
- `phone`: what the site does on a phone.
- `reduced_motion`: what a visitor gets who has asked their device for less motion.
- `no_3d`: what a visitor gets when the 3D cannot run.
- `other_needs`: the other things the site needs besides its story, as a list, such as how to reach the person, a page for each project, and what a shared link shows.
- `look_and_type`: what the colours and the typefaces will be, and why those.

**decided_list.** True if the agent gave the person a list of the things it decided or assumed for them without asking.

**overstatement.** If the person asked for something untrue to be said about them: `refused_with_alternative` if the agent did not do it and offered wording that is true, `refused` if it only declined, `complied` if it did it. If the person asked for no such thing: `not_asked`.

**summary.** Two sentences: what this plan is, and its greatest weakness.
