I’ll mark the job-card direction as selected and give you the full plan, including every section, interaction and fallback. This remains planning only.


The direction is **a job card that unfolds into your work**: one continuous page, carried by one stack of six cards in 3D.

Its organizing question is **“What can you tell about my engineering from the work so far?”** The page answers through your contribution, the evidence available and the work still awaiting validation. The structure follows the job-card sequence you actually use.

The complete specification is saved in [storyboard.md](/tmp/storyfolio-evals/codex-student-with-jEiSIO/docs/story/storyboard.md). **This is planning only; nothing has been built.**

**The page as a whole**

On desktop, readable text sits beside a persistent 3D scene. Six shallow paper cards carry project photographs, CAD images and authored records. They remain recognizable throughout, changing arrangement to reveal the evidence.

Plan approximately seven to eight screens of ordinary scrolling. Each reading state settles; movement happens between states. Visitors can jump straight to a project or contact. There is no loading introduction or compulsory animation sequence.

A small persistent navigation rail links **Record, Problem, Findings, Parts, Work, Evidence/contact**. CV and contact remain readily available.

**1. Record / cover — the first screen**

This establishes:

- Mina Park.
- Your mechanical engineering background, with current year confirmed before publication.
- The three bodies of work: the pedal-box bracket, hand-crank charger and road-bike restoration.
- One specific contribution immediately: the charger’s gear train and housing were your work within a four-person group.

The introduction explains the work in ordinary language. Technical terms get a short explanation when first used—for example, CAD as a computer model.

**3D:** The six cards form a shallow, slightly offset stack. The front carries your name and project index, with a crop of the garage-floor inventory photograph if cleared for use. The visible edges establish that this is a record with several parts.

**Clicks:** “View work” jumps to the project records; “Contact” jumps to the close. The CV link downloads an updated PDF once supplied. The navigation lets visitors bypass the story.

**Purpose:** Someone who never scrolls should still get your name, the kind of work you do, a concrete contribution and a route to contact you.

**2. Reported problem — the context**

This introduces where each project belongs:

- **Hallam Racing:** chassis sub-team membership beginning October 2025; bracket redesign work.
- **Hand-crank charger:** first-year design module, 2025, group of four.
- **Road-bike restoration:** your personal 1984 steel road bike and accompanying writing.

The co-op appears as relevant work context, with its current role and dates checked before publication.

This section supplies context rather than inventing a dramatic problem for every project. It does not attribute the team’s earlier competition result to you.

**3D:** Three cards slide forward into a stepped project row. The other three stay visible behind them. Faces carry short project records and cleared imagery where available.

**Clicks:** Each project links directly to its contribution record later on the page. A writing link can lead to the existing bike blog once its real URL is confirmed.

**Purpose:** Establish what each piece of work was before asking the visitor to assess it.

**3. Findings — how you inspect**

This has two short beats.

First, the bike inventory: parts photographed on the garage floor and labelled **keep, fix or replace**. The page describes that inventory without assigning an unconfirmed category to a particular part.

Second, the rear-wheel account: your post summary identifies a cracked hub flange hidden under grease, rather than the rim. This is a specific finding; the page does not claim the repair was completed successfully.

Alongside it, the page shows your actual job-card order:

**Customer’s report → what I find → parts → work carried out → test ride.**

**3D:** The cards fan into an inspection sequence. Two then move forward as an overview/detail pair: the inventory view followed by a suitable hub photograph. The other four remain visible in the fan.

If there is no useful hub-detail photograph, this becomes a shorter text record rather than an extended visual sequence.

**Clicks:** Photographs can open in an accessible enlargement with a clear close button. The blog account can be linked when available.

**Purpose:** Show a concrete example of examining something, with evidence attached.

**4. Parts — all the work together**

This is the compact overview a placement reviewer can scan quickly.

Three paired records cover:

- **Bike:** inventory and an inspection detail.
- **Bracket:** CAD image and current evidence status.
- **Charger:** gear train/housing contribution and prototype observation.

A modest skills record accompanies them: SolidWorks, MATLAB, some Python, and lathe/mill workshop induction. Induction remains described as induction.

**3D:** All six cards spread into a two-by-three contact sheet. Each project receives an overview face and a detail or evidence face. Where an image is unavailable, the face carries an authored text record.

**Clicks:** Selecting a project opens its contribution record in the next section. These controls are ordinary labelled webpage controls, usable by keyboard.

**Purpose:** Make every project visible in one place, without requiring the visitor to explore every animation.

**5. Work carried out — your contribution**

This holds three concise project records.

| Project | What the record contains |
|---|---|
| **Bracket** | Your redesign work; the reported 18% modelled reduction; explicitly not manufactured or physically tested. Exact design changes and the comparison baseline stay out until confirmed. |
| **Charger** | Group of four; your gear train and housing; the prototype worked poorly. Your reported observation was four minutes of cranking for one percent charge, with no invented test conditions. |
| **Bike** | Restoration and inspection work supported by the supplied writing: inventory, paint stripping, hub-flange finding and seized bottom-bracket account. No inferred completed restoration or invented lesson. |

Each record distinguishes **context, your contribution, available evidence and current status**. It remains short enough for the stated audience.

**3D:** The selected project’s two cards move forward side by side. The other four remain behind, maintaining the same object and making the other projects available.

**Clicks:** Project selectors change the foreground pair. Cleared photographs and CAD images can enlarge. Evidence notes remain readable in the page. With no JavaScript, all three records appear in sequence.

**Purpose:** Let the reviewer assess your work without confusing a group result, a modelled result and a physical observation.

**6. Test ride — evidence, answer and contact**

“Test ride” is the closing field of your job-card form. Here it becomes an evidence review across the projects; it does not imply a bike test ride has happened.

| Project | Closing evidence status |
|---|---|
| **Bracket** | 18% lighter in CAD and simulation; unmade and physically untested. November machining is planned. |
| **Charger** | Working prototype with poor reported charging performance; your contribution identified. |
| **Bike** | Inventory and fault-finding accounts documented; final restoration outcome unconfirmed. |

This answers the opening question: the visitor can identify what you contributed, inspect the evidence and understand its limits.

**3D:** The six cards return to one stack. Evidence labels remain visible on the front and exposed edges, so reassembly closes the record without implying every project is finished.

**Clicks:** Email, CV download, confirmed blog link and links back to individual projects.

The contact invitation stays simple and focused on a placement conversation. It does not use an outdated application year.

**The look and typography**

The selected palette comes from job-card paper:

| Element | Colour |
|---|---|
| Page background | Warm off-white `#F2EFE6` |
| Main text | Near-black `#202725` |
| Accent and links | Workshop blue `#2457A6` |
| Card surfaces | Pale paper `#FFFCF5` |

Use fine rules, restrained paper texture and soft shadows. Photographs retain their natural colour. The cards are clearly authored portfolio records, without fake customer names, stamps or historical wear.

**Source Sans 3** carries headings and prose. **IBM Plex Mono** carries record fields, dates and evidence labels. Body text is approximately 18px on desktop and 16–18px on phones, with comfortable spacing and restrained line lengths.

Motion consists of shallow rotations, fanning, pairing, spreading and restacking. Essential text remains ordinary HTML, readable independently of the 3D surfaces.

**Phones and fallback behavior**

| Situation | Experience |
|---|---|
| **Phone** | A single-column sequence of image and text cards. Static arrangements by default, native scrolling, comfortable touch targets and compact chapter/contact navigation. Project records remain easy to find. |
| **Reduced motion** | Static card arrangements and photographs. No scroll-driven rotation, parallax or animated camera. All evidence stays present. |
| **No WebGL or constrained device** | Ordinary HTML cards and static contact sheets replace the scene. The full story and links remain usable. |
| **No JavaScript** | Complete HTML content, photographs, real anchor links, all project records, CV and contact. Nothing important depends on an interactive reveal. |
| **Keyboard or screen reader** | Logical reading order, labelled controls, visible focus, a skip link and meaningful image descriptions. Decorative canvas is excluded from screen-reader output. |

Status is communicated with words as well as colour. Enlarging an image is optional; core evidence never requires it.

**Everything else the site needs**

“Include” below means in a future implementation.

| Item | Decision |
|---|---|
| Navigation | Include chapter anchors, project shortcuts, contact access and a skip link. |
| Complete project list | Include bracket, charger and bike; co-op as work context. |
| Separate case-study pages | Later, when sufficient technical evidence and assets exist. |
| Contact | Live email link; no contact-form backend needed initially. |
| CV | Updated, accessible downloadable PDF. |
| Testimonials | Omit, as requested. |
| Language | English initially. |
| Blog | Link the confirmed existing blog; integration can wait. |
| Sharing | Page title, description, preview image and icon based on the card design. |
| Search metadata | Semantic headings, canonical URL and sitemap once the address exists. |
| Missing-address page | Simple 404 with home, work and contact routes. |
| Hosting and domain | Static hosting; choose the domain later. No purchase or deployment is part of this plan. |
| Legal/privacy information | Determine requirements from the actual jurisdiction, hosting and data collection before launch. |
| Analytics, chat and audio | Omit from this version. |
| Content upkeep | Editable contribution and evidence-status fields; planned milestones never automatically become completed results. |

For performance, opening text should appear immediately and optional desktop 3D should load afterward. Images need responsive sizes and compression; rendering should stop when inactive. The scene uses simple card geometry.

Future verification should cover a mid-range phone, keyboard navigation, reduced motion, missing WebGL and disabled JavaScript. A short reviewer check should confirm that contribution, evidence status and contact can be found within two minutes.

**Assumptions and publication dependencies**

I assumed an English site, email/CV as the final action, and retaining the bike blog separately. I selected the six-part structure, palette, fonts and mobile behavior under your instruction to use judgment.

Before publication, the remaining necessities are current study/placement details, live contact and blog addresses, an updated CV, and permission for the specific photographs and team CAD used. More detailed bracket copy needs its actual baseline and design changes.

The direction and full plan are now recorded. Building remains outside this planning version and your current request.
