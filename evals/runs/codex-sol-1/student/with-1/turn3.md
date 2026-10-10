I’ll finalize the job-card direction and give you the full page plan, including each scroll state, clickable elements, mobile behavior and supporting requirements. This remains planning only.


The direction is **The Open Job Card**: a short portfolio built around how you record mechanical work. One six-leaf 3D packet opens, separates into evidence displays, and comes together at the end.

The page answers one question: **How does Mina approach a mechanical problem?** It gives a placement reviewer a quick view of your contributions, supported by photographs and clearly stated project status.

The complete saved plan is in [storyboard.md](/tmp/storyfolio-evals/codex-student-with-quhhde/docs/story/storyboard.md). Nothing has been built.

Three things remain unresolved for eventual public use:

1. Current study year, institution name, placement dates and real contact/CV/blog links.
2. Authorship and permission for the selected photographs and CAD images.
3. The bracket’s weight-comparison baseline, if the 18% figure is included.

Those are factual gaps, rather than assumptions I can safely make.

**The object and the scrolling**

The object is an authored digital job-card packet, made from six thin rectangular leaves. It doesn’t pretend to be a real customer record. Its faces carry approved images, project names, contributions and status fields.

The same six leaves stay present throughout. Their arrangements explain relationships between evidence; there’s no unrelated effect in each section. Text sits in ordinary HTML beside the scene and stays steady while the leaves move.

The desktop page occupies approximately six screens. Native scrolling controls the transitions, with no scroll capture, timed pauses or opening loading sequence.

**1. Job received — the opening**

The first screen establishes your name, mechanical engineering focus and placement purpose. Your current study year and target dates are inserted after confirmation.

It also presents one concrete contribution immediately: the gear train and housing for the group charger. A visitor shouldn’t need to scroll to discover what you personally made.

The packet rests at a shallow angle, with its first leaf lifted enough to reveal the garage-floor inventory photograph. This connects the object to your real restoration work from the outset.

A visitor can click:

- **Projects**, jumping directly to the three project records.
- **Contact**, jumping to the closing section.
- **CV**, downloading the current file once supplied.

These links remain available independently of the animation.

**2. Reported fault — the restoration context**

This section introduces the bike restoration through a specific problem in your supplied writing: the rear wheel that wouldn’t stay true.

It pairs the reported symptom with the blog description of the cracked hub flange. It doesn’t invent the customer, the repair steps or a successful outcome.

Two leaves open into a report-and-evidence spread. One holds the short problem record; the other holds an approved wheel or hub photograph, if available.

A visitor can open the photograph at a larger size and follow the relevant Slow Miles post once its real URL is known. If the image doesn’t clearly show the fault, its description won’t claim that it does.

**3. Findings — how you record work**

This section shows the sequence you described:

**What the customer says → what you find → parts → what you did → test ride.**

The bike example makes the distinction between reported symptom and finding concrete. The workshop logbook is also named as a document you work from.

The leaves separate into a short sequence, with fine connecting lines showing the relationship between report and finding. This is a diagram of records, rather than a simulated mechanism.

A visitor can select or enlarge supporting evidence. Every explanation remains visible without interaction; clicks reveal detail, rather than essential information.

No customer job cards, names or private repair records are included by default.

**4. Parts — the complete work index**

This is the main destination for a reviewer who clicks Projects.

The six leaves form three paired records:

| Project | What the record establishes |
|---|---|
| Bike restoration | Your own restoration and writing, with approved inventory and detail photographs |
| Pedal-box mounting bracket | A Hallam Racing design that has not yet been manufactured or physically tested |
| Hand-crank charger | A four-person module project; your contribution was the gear train and housing |

Each pair separates **your contribution** from **the project’s status**. Images sit beside those fields so a reviewer can understand the work quickly.

A visitor can jump directly to a project’s detail in the next section. If there’s no usable charger image, its record uses factual text instead of invented imagery.

The team’s July 2025 ranking is omitted.

**5. Work carried out — contributions in detail**

The bracket pair comes forward first. It shows the available CAD evidence and identifies the work as a design awaiting manufacture and physical testing.

The percentage stays out until its baseline is clarified. November machining can be described as scheduled work if the timing is still current; it won’t become a claim that machining happened.

The charger pair then comes forward. It states that the project involved four people and that your part was the gear train and housing.

Your account of its behavior—four minutes of cranking for one percent of charge—can appear as a prototype observation. It won’t be presented as a standardized performance result or generalized beyond that prototype.

The remaining leaves stay visible, maintaining the connection to the overall packet.

A visitor can enlarge CAD or project images and expand concise evidence notes. Controls work with a keyboard and can be dismissed easily.

Tools appear alongside relevant work: SolidWorks, MATLAB and some Python. Lathe and mill experience is described as workshop induction, without implying independent machining proficiency.

**6. Test ride / handover — outcomes and contact**

The final section brings the records together and makes their limits easy to see:

- The charger operated, with the poor performance you reported.
- The bracket remains a design awaiting physical verification.
- The restoration’s completion status is unspecified.

“Test ride / handover” is the final job-card field name. It does not imply that the bike restoration has passed a test ride.

The packet reassembles, leaving the status leaves slightly offset and readable. The ending answers the page’s question through the documented sequence of report, finding, contribution and verification, without inventing a personal lesson.

A visitor can email you, download the CV, return to the project index or follow the verified blog link. No contact form or scheduling account is needed.

**The look**

Use warm workshop paper as the main direction:

| Element | Choice |
|---|---|
| Background | Warm off-white `#F3F0E8` |
| Main text | Charcoal `#222821` |
| Accent | Technical blue `#245A81` |
| Document leaves | Pale paper, fine grey rules, restrained shadows |
| Photography | Documentary images retaining real wear, grease and workshop detail |

The document character comes from spacing, rules and labels. Avoid distressed-paper filters, invented handwriting, metallic glow or decorative CAD measurements.

Use **Source Sans 3** for headings and body text, and **IBM Plex Mono** for short field labels and status information. Keep monospace out of long paragraphs.

Body text should be around 18px on desktop and at least 16px on phones. Headings stay compact enough to leave useful evidence visible on the first screen.

**Navigation and interaction**

A small desktop rail links to the six chapters. Projects and Contact receive especially direct access.

Chapter links jump to the requested content without forcing the visitor through intervening animation. Image expansion is optional. Nothing depends on hover, dragging or a custom cursor.

The first screen supplies identity, focus, a contribution and contact access. Someone with thirty seconds can use that opening and the project index; someone with two minutes can inspect the bracket and charger before reaching contact.

**Phones and fallback behavior**

| Situation | Experience |
|---|---|
| Phone | One column of document cards, with photographs and notes together. Compact chapter menu, prominent Projects and Contact links. No full-screen pinned canvas. |
| Reduced motion | Fixed arrangements and instant chapter jumps. No rotation, parallax or animated assembly. |
| No WebGL or graphics failure | Static HTML cards with the same images, contributions and statuses. Content remains usable. |
| No JavaScript | All chapters, evidence and contact links are present. Images link to full-size files instead of opening a scripted viewer. |
| Keyboard or screen reader | Semantic headings, sensible focus order, descriptive image text and accessible controls. Essential wording never exists only on a 3D face. |

The mobile version has its own readable composition. It doesn’t shrink the desktop scene into a tiny object.

**Everything else the site needs**

“Include” below describes a future build’s scope; it does not authorize building now.

| Item | Plan |
|---|---|
| Chapter navigation | Include anchors, Projects and Contact shortcuts |
| All projects | Include the restoration, bracket and charger |
| Separate project pages | Later, when deeper evidence justifies them |
| Contact | Include a verified public email |
| CV | Include a current, accessible downloadable PDF |
| Testimonials | Omit; none exist |
| Languages | English initially |
| Slow Miles | Link to the verified blog; don’t recreate posts from the index |
| Shared-link preview | Name, truthful description and an approved image or typographic alternative |
| Site icon | Simple MP document-style mark |
| Missing-address page | Plain links back to projects and contact |
| Chat | Omit |
| Analytics | Defer unless there’s a useful question to answer |
| Privacy notice | Match any actual data collection and applicable requirements |
| Legal notice | Establish deployment jurisdiction and include one where required |
| Hosting and domain | Decide in a later implementation/deployment task |
| Existing site | Don’t replace it without knowing what exists and what you want done |
| Performance | Render content first, defer 3D, compress images, limit graphics resolution and pause offscreen work |
| Accessibility checks | Verify keyboard use, contrast, screen readers, reduced motion and fallback modes |
| Device checks | Test real phones, slow connections and graphics failure |
| Content review | Check every public factual sentence against the recorded sources and your corrections |
| Asset review | Clear each photograph and CAD image before release |

A static or server-rendered page with a small Three.js enhancement is sufficient. There’s no need for a backend.

I chose the concept, warm-paper palette, typography, page order, English, and email/CV closing action under your instruction to use judgment. I have not assumed publication rights, a finished restoration, a new placement year or a proven bracket. All decisions and unresolved facts are preserved in [the planning documents](/tmp/storyfolio-evals/codex-student-with-quhhde/docs/story/handover.md).
