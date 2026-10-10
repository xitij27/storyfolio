I’ll treat that as approval of the job-card direction and expand it into the full page plan, including each 3D state, click target, fallback and site requirement. This remains planning only.


The direction is **a job card brought to life**: one continuous page, carried by six 3D cards that organise your work as the visitor scrolls.

Its central question is **“How does Mina approach a repair or a design task?”** The answer comes through your actual co-op process, your contributions to the projects, and a clear account of what has worked and what still needs testing.

The complete plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-student-with-Aq4Dnp/docs/story/storyboard.md). Nothing has been built.

## The overall experience

On a desktop, readable text sits beside a persistent 3D scene. The same six shallow, paper-like cards remain present throughout:

1. Bike parts inventory.
2. Bike detail photograph.
3. Bracket CAD view.
4. Bracket evidence and testing status.
5. Charger gear train.
6. Charger housing and evidence.

These are evidence surfaces, with actual images where available and permitted. Missing imagery gets a clear text record rather than an invented render.

The page takes roughly seven desktop screen heights, with the final length governed by the content. The essential reading should fit your visitor’s two minutes; optional details allow a closer look.

Scrolling is normal. There is no introductory gate or animation the visitor must finish. A section rail and direct project links let them skip ahead immediately.

## Every part, in order

### 1. Customer report — the first screen

**What it shows**

Your name, mechanical engineering study subject, and a short description of the work represented here: the bracket redesign, charger gear train and housing, and bike restoration.

The garage-floor inventory photograph provides immediate evidence. The opening explains unfamiliar terms plainly: CAD is a computer model; the bracket mounts the pedal box.

The current study year and placement dates stay out until confirmed.

**What the 3D does**

The six cards begin as one shallow packet, with the bike inventory on top. As the visitor starts scrolling, they separate slightly to reveal the project index underneath.

The object is already legible on arrival. Its appearance does not depend on an assembly animation finishing.

**What the visitor can click**

- **Work**, jumping to the evidence inventory.
- Direct links to the bracket and charger records.
- **CV**, opening the current document.
- **Contact**, jumping to the final section.

This screen gives a hurried reader your name, work, one piece of evidence and a contact route.

### 2. Inspection — how you work

**What it shows**

The job-card sequence you supplied:

- What the customer says is wrong.
- What you find.
- The parts.
- What you did.
- The test ride.

This is explicitly presented as your co-op working process. It does not claim that every design project followed this sequence.

The bike inventory image sits alongside it as a separate example of documenting parts.

**What the 3D does**

The packet opens into a fan. Process labels appear across the same six cards, while the image faces remain visible.

The arrangement makes the sequence easy to follow without introducing an unrelated effect.

**What the visitor can click**

- Enlarge the permitted inventory photograph.
- Open a relevant Slow Miles post, once its real address is confirmed.

There are no fabricated customer complaints or reproduced customer job cards.

### 3. Parts — the evidence inventory

**What it shows**

Three compact project entries:

| Project | Evidence presented |
|---|---|
| **Pedal-box bracket** | CAD views, redesign contribution, simulation-stage status |
| **Hand-crank charger** | Your gear-train and housing contribution, group attribution, reported performance |
| **Steel road bike** | Parts inventory, selected detail photographs, supplied writing subjects |

Each entry identifies your contribution and what kind of evidence exists.

**What the 3D does**

The fan spreads into three pairs of cards. Each pair belongs to a project, creating an overview of the work.

**What the visitor can click**

- Jump directly to any project’s record.
- Enlarge available evidence images.

Essential information appears beside the scene as normal text. Clicking a tiny moving card is never necessary.

### 4. Work carried out — the project records

This is the longest section, with three records in sequence.

**The bracket**

Show the CAD views and describe the redesign. State clearly that it has not been manufactured or physically tested, with machining planned for November.

The **18%** figure remains out of public copy until its comparison baseline is identified. If used later, it must retain its CAD/simulation qualification and unresolved physical testing status.

**The charger**

Show your gear train and housing, crediting the group of four. Present the reported outcome honestly: four minutes of cranking for one percent of charge.

That observation gives the project substance without presenting it as a successful product or a controlled efficiency benchmark. Device and test conditions are not yet supplied.

**The bike**

Show the inventory and selected photographs, with links to the supplied writing subjects: the seized bottom-bracket cup, cracked hub flange and paint stripping.

No completed repair, successful test ride or lesson is inferred from those short summaries.

A small supporting skills note can retain the supplied levels: SolidWorks, MATLAB, some Python, and lathe/mill workshop induction. No proficiency scores.

**What the 3D does**

The cards form a row. Each project pair moves forward as its record comes into view; the other four remain visible along the edge.

The focus changes from bracket to charger to bike. The same evidence set carries the whole section.

**What the visitor can click**

- Enlarge CAD views and photographs.
- Open optional contribution or test notes through simple disclosures.
- Follow verified blog links.

Your contribution, group attribution and limitations remain visible without opening anything.

### 5. Test ride — what the evidence supports

**What it shows**

A concise comparison:

| Project | Current evidence |
|---|---|
| **Charger** | Worked, with poor reported charging performance; test conditions unspecified |
| **Bracket** | CAD/simulation evidence; manufacture and physical testing pending |
| **Bike** | Restoration documentation; no final outcome supplied |

“Test ride” comes from your co-op process. The section makes clear that it is reviewing outcomes, rather than claiming road tests for the design projects.

**What the 3D does**

The six cards align into evidence-and-status columns. Images sit alongside their qualifications, making the distinction between observed, simulated and pending work visible.

**What the visitor can click**

- Expand factual test notes, if available.
- Return directly to the corresponding project.

The team’s July 2025 placing and the guessed bike count are omitted.

### 6. Handover — the close

**What it shows**

A brief index of your contributions and their evidence states, followed by the placement contact route.

This closes the page’s question through the work already shown: your process, what you contributed, and how you distinguish results from work still awaiting validation.

**What the 3D does**

The cards gather back into the original packet. Its front face becomes the project index.

The ending leaves the work collected and easy to revisit.

**What the visitor can click**

- Email you.
- Open the current CV.
- Return to any project.
- Visit Slow Miles, once its address is verified.

## The look

The chosen palette comes from the paper job card:

| Use | Colour |
|---|---|
| Page background | Warm off-white `#F3EFE6` |
| Main text | Dark ink `#202824` |
| Accent and links | Deep green `#285B49` |
| Card surfaces | Pale stock `#FFFCF5` |

The cards have fine printed rules, restrained edge shadows and subtle depth. Photographs and CAD supply the visual detail. Green is a design choice, not an assumed bike or team colour.

**Source Sans 3** handles body text, navigation and headings. **IBM Plex Mono** handles short printed fields and evidence labels. Body text starts around 18px on desktop and 17px on phones, with comfortable line spacing.

Motion consists of controlled spreading, small rotations and changes in depth. Reading text stays flat. There is no continuous spinning or movement competing with it.

## Phones and fallback behaviour

| Situation | Experience |
|---|---|
| **Phone** | A single-column page with the same six sections, full-size evidence images and static card arrangements by default |
| **Reduced motion** | Static packet, fan and evidence layouts; no rotation, parallax or scroll animation |
| **No WebGL** | Ordinary image-and-text evidence cards replace the scene |
| **No JavaScript** | The complete document remains readable, with anchor navigation, images, native disclosures, CV and contact links |

On phones, a compact section menu replaces the desktop rail. Work, CV and Contact remain easy to find. There are no hover-only controls or large pinned scenes squeezing the content.

Every meaningful image, claim and link exists outside the canvas. An enhanced image viewer can support close, Escape and keyboard navigation; without it, the image remains a normal linked resource.

## Everything else the site needs

“Include” means part of a future implementation. No implementation is being started now.

| Requirement | Decision |
|---|---|
| **Navigation** | Include section anchors, project shortcuts, contact shortcut and direct project links |
| **All projects** | Include bracket, charger and bike; use co-op practice as context |
| **Separate project pages** | Later, when there is enough additional evidence for longer case studies |
| **Contact** | Include a verified email link; a contact form is unnecessary initially |
| **CV** | Include a current, accessible downloadable document |
| **Testimonials** | Omit; none exist |
| **Language** | English initially |
| **Blog** | Keep Slow Miles separate by default; link after verifying the address |
| **Chat** | Omit |
| **Shared-link preview** | Include a static packet/index image with your name and verified work description |
| **Site icon** | Include a simple card-outline mark |
| **Search metadata** | Include accurate page title, description and indexing information |
| **Missing-page handling** | Include a useful 404 with home, work and contact links |
| **Accessibility** | Include semantic headings, keyboard access, visible focus, image descriptions, sufficient contrast and motion fallbacks |
| **Performance** | Load content first; compress images, defer the scene and stop rendering when inactive |
| **Analytics** | Leave out initially; reconsider if you want measurement |
| **Legal/privacy information** | Assess before launch against the actual hosting, data handling and applicable requirements |
| **Domain and hosting** | Choose when implementation is requested |
| **Maintenance** | Keep project status, placement details, CV and links current—especially after bracket manufacture/testing |

Before a future launch, verification should cover phone readability, keyboard navigation, enlarged text, direct links, missing WebGL, disabled JavaScript and reduced motion.

## Assumptions and material still needed

I’ve chosen the job-card structure, six-card object, palette, fonts, English language, one-page project records and separate-blog approach.

I have not assumed photo ownership, permission to show team CAD, current study year, placement dates, public contact details or completed testing. The plan reserves space for those assets without treating permission as settled.

The remaining preparation is:

1. Select permitted bike photographs and bracket CAD views.
2. Supply the current CV, public contact and placement wording.
3. Identify the bracket percentage baseline and any shared contribution.
4. Add charger evidence and test context if available.
5. Verify Slow Miles links and any fuller stories you want included.

The planning handover is complete. **No website code, deployment or paid services have been created.**
