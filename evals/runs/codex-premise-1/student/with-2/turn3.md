I’ll carry the recommended job-card direction through the full plan, including every scroll state, interaction, fallback and site requirement. This remains a planning handover; no code or prototype will be built.


The site will be **a job card brought to life**: one continuous page that lets a placement reader examine your work through the sequence you actually use—what was reported, what you found, the parts, what you did, and the check afterwards.

Its ambition comes from the presentation and the clarity of the evidence. It should feel like an engineering student’s real working record, with unfinished work and imperfect results shown honestly.

This is the complete planning handover. Nothing has been built.

**The idea and the 3D object**

The page asks: **What did you find, what did you change, and how do you know it worked?**

One object carries that question from beginning to end: a slim sleeve containing six paper leaves. This is a portfolio document designed around your job-card process, rather than a reproduction of a customer’s record.

The same six leaves remain throughout. They open, pair up, spread into exhibits and align into an evidence ledger. Their faces carry project information and, once permissions are confirmed, your photographs and CAD stills.

The 3D has a job in every chapter: reveal a contribution, connect a finding to evidence, or distinguish a demonstration from a simulation. It never assembles into a supposedly finished bike or manufactured bracket.

The experience uses ordinary scrolling, approximately six desktop screenfuls, with optional project details. There is no compulsory introduction or scroll trapping.

**1. Intake — the first screen**

The first screen gives a hurried reader four things immediately:

- Your name.
- Mechanical engineering project context.
- A concrete contribution: the gear train and housing you made for the group charger.
- Direct access to work, evidence, contact and your CV.

Your current study year and placement dates stay out of the opening until confirmed. The exact opening wording remains a later copy decision.

**3D:** The packet rests at a shallow angle. Its top leaf exposes the charger contribution. As scrolling begins, the sleeve opens and the other leaves become visible. Job-card field names establish where the visual idea comes from.

**Clicks:** “View work,” “View evidence,” “Contact,” and “CV.” These are ordinary links or page anchors and work immediately.

The first screen should make sense before any animation runs.

**2. Reported fault — problem versus observation**

This introduces the bike restoration through the distinction between a symptom and a finding. The documented cracked hub flange gives this section something specific to show.

The page will identify the restoration and the observation described in your writing. It will not invent a customer complaint, claim the repair succeeded, or extrapolate a personal philosophy from one post.

**3D:** Two leaves move into a side-by-side arrangement: context on one, the finding on the other. The remaining four stay visibly connected behind them.

A cleared photograph of the relevant wheel or hub can support the finding. A general bike photo will not be passed off as evidence of that particular defect.

**Clicks:** Expand the restoration record and, once the real address is supplied, open the relevant Slow Miles post. Essential facts remain visible without opening either.

**3. Findings — how you record work**

This explains the process you confirmed:

1. What the customer says is wrong.
2. What you find.
3. The parts.
4. What you did.
5. The test ride.

Your workshop logbook appears alongside it as another working record.

This section represents your process. It does not fabricate a completed job card or expose customer information.

**3D:** Five leaves fan into the five fields, joined by restrained connecting marks. The sixth becomes the logbook record. The arrangement lets a visitor see the separation between reported information, observation, action and checking.

**Clicks:** Select a field to focus its explanation. Keyboard users receive the same controls and content. There are no invented example repairs hiding behind the fields.

**4. Parts — the complete project board**

All three projects appear together:

| Project | What the record shows |
|---|---|
| **Steel road-bike restoration** | The photographed parts inventory and documented observations. Completion is not asserted. |
| **Hand-crank charger** | A four-person project; your contribution was the gear train and housing. |
| **Pedal-box bracket** | CAD and simulation stage; not yet manufactured or physically tested. Precise attribution remains to be confirmed. |

**3D:** The six leaves spread into three pairs, one pair per project. Each pair connects the project with its contribution and evidence.

Possible images are the garage-floor parts photograph, a charger photograph and a bracket CAD still. Their inclusion depends on ownership and display permission. Until then, the plan works with factual text and simple document layouts; it does not require invented component geometry.

**Clicks:** Each project opens an inline detail record containing its context, your role, available evidence, collaborators and current status. Cleared images can open at a larger size.

These details stay in the normal page flow, so opening them never traps the visitor in the 3D scene.

**5. Work carried out — your contribution**

The charger receives the clearest contribution breakdown because you have confirmed both your work and the group context.

One record shows your gear train and housing. The paired record shows the group prototype and its outcome. This prevents the entire project from being presented as yours.

The bike and bracket can be selected too, but their records will contain only supported contributions. Specific bracket design decisions will wait for clarification.

**3D:** The charger pair moves forward into an exhibit position. The other four leaves remain visible behind it. Selecting another project changes which pair comes forward.

**Clicks:** Switch projects, expand contribution details and inspect cleared images. Controls have text labels; no one needs to discover a drag gesture or click an unlabelled 3D surface.

**6. Test ride / handover — evidence, limits and contact**

The ending answers the page’s question by distinguishing what is known from what remains unproven.

| Project | Outcome presented |
|---|---|
| **Charger** | It worked poorly: your reported demonstration required four minutes of cranking for one percent charge. This is not presented as a controlled benchmark. |
| **Bracket** | Lighter in CAD and simulation; no physical manufacture or testing yet. The 18% figure waits for its comparison baseline before becoming a headline claim. |
| **Bike** | A documented restoration with parts and observations. No claim of completed restoration or successful final test ride. |

“Test ride” belongs to your job-card sequence. Other projects use their actual evaluation methods.

**3D:** The leaves align into an evidence ledger, with written status labels. They then gather back into the sleeve. This closes the portfolio record without implying that all its projects are finished.

**Clicks:** Contact about a placement, download the CV, return to a project, or visit Slow Miles once its address is confirmed.

Contact remains ordinary HTML outside the canvas, visible and usable even if the scene fails.

**The look and typography**

The chosen look is **warm workshop paper**:

| Element | Direction |
|---|---|
| Background | Warm ivory, `#F3F0E8` |
| Main text | Graphite, `#202725` |
| Links and emphasis | Cobalt, `#254BD6` |
| Leaves | Cream paper with subtle thickness, light grain and soft shadows |
| Main type | Source Sans 3 |
| Document fields and status | IBM Plex Mono |

Body text should be comfortable to read: approximately 18px on desktop and 16–18px on phones, with generous spacing and a restrained line length. Mono type is for short fields, not whole paragraphs. Status always uses words as well as colour.

The scene uses shallow depth and little camera travel. Movement is primarily the leaves changing arrangement. Photographs provide the material character of your work; floating gears and metallic spectacle are unnecessary.

Two alternative looks are preserved in the plan: pale green logbook paper with rust accents, and crisp drawing-sheet grey with deep blue. Warm paper is the selected default.

**The two-minute route**

A persistent, compact navigation rail offers **Work · Evidence · Contact · CV**.

A visitor can:

- Understand your contribution from the first screen.
- Jump directly to the three-project board.
- Check project status and outcomes.
- Reach contact without completing the scroll story.

No loading sequence blocks these actions. The narrative rewards attention, but the application reader controls how much time to spend.

**Phone and fallback behavior**

| Situation | Experience |
|---|---|
| **Phone** | A single column of static job-card leaves. Project pairs stack vertically, with compact anchor navigation. No pinned canvas occupying the screen, sideways scrolling, hover dependence or forced landscape. |
| **Reduced motion** | Static settled arrangements. No camera travel, rotation, scroll-scrubbed animation or animated anchor movement. |
| **No WebGL or lost graphics context** | HTML evidence cards and cleared images replace the scene. All content and links continue working. |
| **No JavaScript** | A complete static document with anchor navigation, native expandable details, contact and CV links. |
| **Keyboard or screen reader** | Semantic headings, readable project records, labelled controls and visible focus. The canvas contains no exclusive information. |

Phone visitors receive the same evidence in the same order. Small transitions can be considered later if device testing supports them; they are not required for the design.

**Everything else the site needs**

“Included” below describes a future implementation scope, not work being built now.

| Requirement | Plan |
|---|---|
| Navigation | Real anchors, direct contact/CV links and a visible current chapter on desktop. |
| Project records | All three projects, with contribution, collaborators, evidence and status. |
| Separate project pages | Later, when the available evidence warrants more space. Inline records initially. |
| Contact | Direct email or another confirmed contact route. No placeholder address published. |
| CV | Accessible downloadable PDF. Correct the race-result attribution and remove the guessed repair count. |
| Blog | Keep Slow Miles separate provisionally. Link after its real address is supplied; do not fabricate full articles from summaries. |
| Testimonials | None. No invented quotations or endorsements. |
| Languages | English initially. |
| Share previews | Name, portfolio description and a simple job-card image using cleared material. |
| Site icon | A small, legible job-card motif. |
| Search basics | Descriptive title and metadata, readable HTML, canonical address, sitemap and robots configuration. |
| Missing-page handling | A useful 404 with links back to the portfolio and contact. |
| Accessibility | Semantic structure, keyboard access, focus visibility, contrast checks, alt text and reduced-motion support. |
| Performance | HTML first; deferred 3D, compressed responsive images, limited texture sizes, restrained rendering resolution and paused offscreen rendering. |
| Content maintenance | Project status stored alongside each record. Update the bracket only when actual manufacturing or test results are supplied. |
| Domain and hosting | Choose later. No purchases or publishing in this task. |
| Legal requirements | Check before launch against the actual publication jurisdiction and data handling. |
| Analytics and contact form | Add only if a concrete need emerges. Neither is necessary initially. |
| Chat | Excluded from the initial scope. |
| Validation | Check fast-reader routes, narrow phones, keyboard and screen-reader use, all fallback modes, image permissions, CV links and real-device performance. |

**Assumptions and outstanding facts**

I have chosen the concept, palette, type, order and interaction defaults under your delegation. I’ve assumed the main action is contacting you about a placement, English is sufficient, and Slow Miles should remain separate initially.

I have not assumed photo rights, current study year, current placement dates, a working public email, the bracket’s comparison baseline or its precise division of work. Those remain content gates before publication.

The complete plan is saved in the [storyboard](/tmp/storyfolio-evals/codex-student-with-IqSvX4/docs/story/storyboard.md), with the [concept decision](/tmp/storyfolio-evals/codex-student-with-IqSvX4/docs/story/concepts.md), [facts](/tmp/storyfolio-evals/codex-student-with-IqSvX4/docs/story/facts.md), [assumptions](/tmp/storyfolio-evals/codex-student-with-IqSvX4/docs/story/decided-for-you.md) and [handover](/tmp/storyfolio-evals/codex-student-with-IqSvX4/docs/story/handover.md). The storyfolio workflow ends at this planning handover; building is outside this version and your request.
