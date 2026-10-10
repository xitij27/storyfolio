You are judging a plan that an AI agent made for a person who asked for a portfolio website. You are not told how the agent was set up, and it does not matter. Judge only what is on the page.

# What the person handed over

## material/linkedin.md

~~~~
(Saved from LinkedIn as text, October 2026)

Dawit Bekele
Staff Platform Engineer at Kestrel Freight. Migrations, reliability, on-call.
Rotterdam, Netherlands

ABOUT
I move systems that are not allowed to stop. For the last four years that
has meant taking Kestrel Freight out of two data centres and into the cloud,
one service at a time, while the trucks kept running. I like migrations that
are boring on the day.

EXPERIENCE

Staff Platform Engineer, Kestrel Freight, Rotterdam
Aug 2020 to present
- Led the migration of 310 services out of two data centres, in 26 months
- 99.98% availability through the migration
- Upgraded a 4 TB Postgres database across two major versions with dual
  writes and no maintenance window
- Wrote the migration runbook now used by 40 teams
- On-call lead: pages per week from 85 to 22

Site Reliability Engineer, Lumen Pay, Amsterdam
Mar 2016 to Jul 2020
- Card payment systems

Systems Administrator, Entoto Technical University Library, Addis Ababa
2013 to 2016

EDUCATION
Entoto Technical University. BSc Electrical Engineering, 2009 to 2013

PROJECTS
ferry. Command-line tool for dual-write cutovers. 1.2k stars on GitHub.

TALKS
"Boring Migrations", SRE North 2024
~~~~

## material/old-site.md

~~~~
(The text of my current site. One page, made in 2019.)

Dawit Bekele. SRE.

I keep things running.

Skills: Linux, Kubernetes, Terraform, Postgres, Go, Python.

Contact: dawit@example.com
~~~~

## material/resume.md

~~~~
DAWIT BEKELE
Rotterdam · dawit@example.com

STAFF PLATFORM ENGINEER, KESTREL FREIGHT (2020 to present)
- Moved 310 services from on-premises data centres to the cloud with zero
  downtime
- Postgres 11 to 15 upgrade of the 4 TB orders database using dual writes
- Author of the company's migration runbook (preflight, shadow, dual write,
  cutover, soak, decommission)
- Reduced on-call pages by 74%

SITE RELIABILITY ENGINEER, LUMEN PAY (2016 to 2020)
- On the team that ran the card authorisation path

SYSTEMS ADMINISTRATOR, ENTOTO TECHNICAL UNIVERSITY LIBRARY (2013 to 2016)

OPEN SOURCE
ferry (maintainer): github.com/example/ferry

SPEAKING
Boring Migrations, SRE North 2024 (video online)
~~~~

# What is true

The agent could not know this at first. The person said it only in their second message, if at all.

- "Zero downtime" on my resume is too strong. There were two incidents during
  the migration, both under ten minutes, both internal. 99.98% is the
  measured figure. Use that, and say what it measures: the order API, over
  the 26 months.
- Pages per week, 85 to 22: that was the on-call team of nine, over about a
  year, and half of it was deleting alerts nobody needed. Say "we".
- ferry: I did not create it. A former colleague did. I have maintained it
  since 2022, and I wrote its cutover command.
- The runbook: I wrote its first version and I still own it. 40 teams use it.
- Lumen Pay: nothing of theirs can be shown or described beyond the line on
  my LinkedIn. Kestrel: the talk and its slides are public. Internal diagrams
  are not.
- The first production outage I caused was in 2014, at the library. I dropped
  a table. I tell that story at the start of my talk. It is why I care about
  rollbacks.
- Who it is for: I am going independent next year. I want a company that is
  about to do a migration it is afraid of to find me and write to me.
  Conference organisers too.
- The old site can go. Nothing that matters links to it.
- What I work from: the runbook, the cutover checklist and the rollback
  plan. A postmortem only when something has gone wrong, which is the point.
- Books: the Google SRE book, and Release It! by Michael Nygard.

# Where a careless reader goes wrong

- `zero-downtime`
  - The wrong reading: The migration had zero downtime, said without noticing that his LinkedIn says 99.98%.
  - What is true: Two incidents, both under ten minutes and internal. 99.98% is the measured figure, for the order API over the 26 months.
- `pages-are-the-teams`
  - The wrong reading: He cut on-call pages from 85 to 22 a week, or by 74%, himself.
  - What is true: The on-call team of nine did, over about a year.
- `ferry-maintainer`
  - The wrong reading: He created ferry, or is its author.
  - What is true: A former colleague created it. He has maintained it since 2022 and wrote its cutover command.
- `lumen-confidential`
  - The wrong reading: Lumen Pay's payment systems are described or drawn beyond the one line he gives.
  - What is true: Nothing of Lumen Pay's can be shown or described beyond that line.
- `old-site`
  - The wrong reading: What becomes of the site he already has is settled without asking him.
  - What is true: It can go. Nothing that matters links to it.

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
I’ll use the the method skill to shape a concept around your material, then map the full scroll experience, visual direction, mobile behavior, and supporting site needs. I won’t build anything.


Your material presents you as a platform engineer whose work is keeping critical systems running while they change. The migration runbook, database cutover and ferry tool give us concrete material to explore; your current site barely shows that work.

I’ve recorded the sources and unresolved claims in [facts.md](/tmp/the method-evals/codex-reliability-with-rEkPcS/docs/story/facts.md). Please answer by number; short answers are fine.

1. **Audience and purpose:** Who should this site attract, and what should they do at its end? Is Staff Platform Engineer your current title and the identity you want to lead with?
2. **Cloud migration:** What did you personally do, and what belonged to the team? Confirm the 310 services and 26 months. How do “zero downtime” and “99.98% availability” relate—what did each measure, over which period? Is “the last four years” still accurate?
3. **Database upgrade:** What was your contribution, who else worked on it, and what version sequence actually ran in production? Your sources say both Postgres 11→15 and “across two major versions.” What does 4 TB measure, and did “no maintenance window” mean uninterrupted service?
4. **Runbook and on-call:** Did you write the runbook yourself, and what does “used by 40 teams” mean? What changes did you make to reduce weekly pages from 85 to 22, over which comparison period? Are those measured counts behind the 74% figure?
5. **Earlier work:** What did you personally do at Lumen Pay and the university library? Are the titles, dates and education accurate, and which skills on the old site still represent your work?
6. **ferry:** What is its real repository URL, what did you build or maintain, who else contributed, and where is it used? Is the 1.2k-star figure current?
7. **Evidence and boundaries:** What is the talk URL, and were you its speaker? Which employer materials may be shown? For any recordings, photographs, diagrams, screenshots or quotes you want included, who owns them? What must stay private or anonymous?
8. **Daily practice:** What documents, lists and rituals do you work from, using the names you call them?
9. **Influences:** What did you learn from—a person, book, early mistake or experience you’re comfortable sharing?
10. **Existing site and contact:** What should happen to the 2019 site? Is `dawit@example.com` a placeholder, and what contact destination should visitors use?

I’m pausing before concepts because the [the method skill](/tmp/the method-evals/codex-reliability-with-rEkPcS/.agents/skills/the method/SKILL.md) explicitly requires: “Your first reply is the first stop, and no more than that.” This confirmation step establishes ownership, accuracy and usable material before shaping the scroll story. Nothing has been built.
~~~~

## The person's second message

~~~~
Thanks. Here is what you should know, whether or not you asked.

- "Zero downtime" on my resume is too strong. There were two incidents during
  the migration, both under ten minutes, both internal. 99.98% is the
  measured figure. Use that, and say what it measures: the order API, over
  the 26 months.
- Pages per week, 85 to 22: that was the on-call team of nine, over about a
  year, and half of it was deleting alerts nobody needed. Say "we".
- ferry: I did not create it. A former colleague did. I have maintained it
  since 2022, and I wrote its cutover command.
- The runbook: I wrote its first version and I still own it. 40 teams use it.
- Lumen Pay: nothing of theirs can be shown or described beyond the line on
  my LinkedIn. Kestrel: the talk and its slides are public. Internal diagrams
  are not.
- The first production outage I caused was in 2014, at the library. I dropped
  a table. I tell that story at the start of my talk. It is why I care about
  rollbacks.
- Who it is for: I am going independent next year. I want a company that is
  about to do a migration it is afraid of to find me and write to me.
  Conference organisers too.
- The old site can go. Nothing that matters links to it.
- What I work from: the runbook, the cutover checklist and the rollback
  plan. A postmortem only when something has gone wrong, which is the point.
- Books: the Google SRE book, and Release It! by Michael Nygard.

For anything I have not covered, use your judgement and tell me what you assumed. Carry on.
~~~~

## The agent's second reply

~~~~
I’ll record your corrections first, especially the team attribution and availability measure. Then I’ll use your permission to make the remaining choices, label the assumptions, and develop the plan around migration clients and conference organisers.


The clearest direction is your runbook: one object that unfolds through a migration, with the rollback plan always visible. Your 2014 outage gives that idea a personal origin, and the corrected results give it evidence. I’ll keep the database case and unconfirmed figures out of the plan.


I chose **a portfolio shaped like your migration runbook**: six leaves that rearrange as the visitor scrolls, with the rollback path always visible. It connects your actual working practice, the mistake that shaped it, and evidence a prospective migration client can assess.

Still needed before publication:

1. Real contact, ferry, talk and slides URLs.
2. Confirmation of your current title and when to announce independent availability.
3. Permission for any reproduced slides or recordings. The plan works with original illustrations and outbound links.

The unconfirmed database details, 310-service count and GitHub stars stay out.

The central question is: **“How do you move a critical system when you cannot afford to get it wrong?”**

I considered three directions:

| Direction | What carries the story | Why choose it |
|---|---|---|
| **The runbook — selected** | Six leaves following the migration stages | Covers the whole engagement, from preparation through operation |
| The cutover checklist | Six checklist strips arranged into a sequence of checks | Direct and practical, but concentrates on the switch |
| The rollback plan | Six decision cards showing forward and return paths | Most personal, but puts recovery ahead of your broader migration work |

The runbook gives your future clients the fullest picture. Its physical form is an original illustration, not a reconstruction of Kestrel’s internal documents.

As the visitor scrolls:

| Chapter | What it shows | What moves |
|---|---|---|
| **Preflight** | Your name, migration focus, scoped availability proof and immediate contact route. Your 2014 dropped-table outage introduces why rollback matters. | Six leaves assemble around the origin note. |
| **Shadow** | The runbook, cutover checklist and rollback plan you work from; your first-version authorship and continuing ownership. The two books appear as influences. | The leaves fan into an ordered document view. |
| **Dual write** | ferry: created by your former colleague, maintained by you since 2022, with its cutover command written by you. | The same leaves form paired paths with a visible return route. This is an explanatory diagram, not a claimed internal architecture. |
| **Cutover** | Measured **99.98% order-API availability over 26 months**, alongside the two internal incidents, each under ten minutes. | The paths align and settle into a readable evidence panel. |
| **Soak** | **We:** the nine-person on-call team reduced weekly pages from 85 to 22 over about a year; half the reduction came from deleting unnecessary alerts. Forty teams use the runbook. | Leaves become a comparison grid, then an adoption panel. Numbers remain fixed rather than counting up. |
| **Decommission** | The method and evidence resolve into two reasons to write: a migration enquiry or a speaking invitation. | The runbook closes into one complete object, with the rollback tab still exposed. |

The same six pieces persist throughout. Every transformation explains sequence, parallel paths or evidence. Native scrolling stays under the visitor’s control, with roughly seven to eight screen-heights on desktop and no forced pauses.

For someone with thirty seconds, the first screen carries your name, work focus, one properly scoped result and a contact shortcut. Navigation jumps directly to Method, Evidence, Speaking or Contact.

The visual direction is **warm working paper**:

- Ground: warm off-white `#F2EEE5`.
- Ink: deep charcoal `#202824`.
- Accent: restrained green `#2D6654`.
- Leaves: matte ivory with thin edges and shallow shadows.

Green marks navigation and the return path; it does not imply system health. **Source Sans 3** carries the narrative and navigation; **IBM Plex Mono** carries stage tabs, annotations and results. The motion is calm, with shallow depth and readable settled states. I also documented dark-paper and cool technical-paper alternatives.

On a phone, the story becomes a single readable column with static illustrations of those same six leaves. There are no long pinned passages, hover-dependent details or required horizontal gestures. Contact and result scopes remain easy to reach.

Reduced-motion visitors get settled diagrams. Without WebGL or JavaScript, they still get the complete text, illustrations, navigation and links. The 3D explains the story, while ordinary HTML makes its information accessible and searchable.

The initial site scope includes chapter navigation, verified public-resource links, two contact routes, social previews, an icon, a useful 404 page and applicable legal/privacy information. A corrected CV and deeper project pages come later, once their facts and assets are ready. No blog, chat, testimonials, analytics or embedded third-party video are planned for the first launch.

I assumed English, migration clients as the primary audience, conference organisers as the second audience, and 2027 as the planning horizon—not an approved public availability promise. Your old site is replaced. Lumen Pay receives no expanded description or case study.

The complete proposal is in [storyboard.md](/tmp/the method-evals/codex-reliability-with-rEkPcS/docs/story/storyboard.md), with alternatives in [concepts.md](/tmp/the method-evals/codex-reliability-with-rEkPcS/docs/story/concepts.md) and choices in [decided-for-you.md](/tmp/the method-evals/codex-reliability-with-rEkPcS/docs/story/decided-for-you.md). Nothing has been built.

**Does this storyboard have your yes, or what would you change?**

The [the method skill](/tmp/the method-evals/codex-reliability-with-rEkPcS/.agents/skills/the method/SKILL.md) requires the final stop to be “The script of the whole page,” proceeding when “They have said yes to it.” This approval closes the planning stage; it does not authorise construction.
~~~~

## The person's third message

~~~~
Go with the direction you recommend. Give me the whole plan now, in full: every part of the page in order, what the 3D does in each, what a visitor can click, the look, how it works on a phone and without the 3D, and the list of everything else the site needs. Still no building.
~~~~

## The agent's third reply

~~~~
I’ll keep the runbook direction and give you the full plan here, including every scroll beat, clickable element, fallback and supporting site requirement. I’ll also record your choice in the planning files. No building.


The direction is **The Runbook**: one long page carried by six leaves of a migration runbook. They assemble, separate, explain your work and come together again. The rollback reference remains visible throughout.

Before publication, these facts and destinations remain open:

1. Your real contact address and the ferry, talk and slides URLs.
2. Your current title and when to announce independent availability.
3. Permission to reproduce any slides or recordings. The plan needs only original illustrations and links to public material.
4. The database details, 310-service count and GitHub stars remain excluded until confirmed.

**The idea**

The page answers one question:

> How do you move a critical system when you cannot afford to get it wrong?

Its structure comes from your runbook: **preflight → shadow → dual write → cutover → soak → decommission**.

The object is six thin, matte document leaves, each with a stage tab. Their faces carry short annotations drawn from your confirmed work. They are an original visual interpretation of a runbook; they do not reproduce an internal document.

The visitor sees the same six pieces from beginning to end. Each arrangement explains something: order, parallel paths, a return route, a comparison or a complete plan.

Your primary audience is a company facing a migration it fears. Conference organisers have a clear second route. The first screen therefore establishes your work and evidence immediately; the personal story adds depth without delaying contact.

**The whole page, in order**

1. **Preflight — the work, and why rollback matters**

   The first screen contains your name, migration and reliability focus, one scoped result—**measured 99.98% order-API availability over the 26-month migration**—and a contact shortcut.

   Beside it sits the first runbook leaf, with the other five visibly offset behind it. As the visitor scrolls, the leaves settle into a stack. The front leaf opens slightly to introduce the 2014 library outage: you dropped a table, and that experience is why you care about rollbacks.

   The story stays factual. It does not reconstruct the database, dramatise affected users or invent the recovery.

   **Clickable:** contact shortcut; all six chapter links; an optional disclosure for the origin story. The essential rollback lesson remains visible without opening anything.

   **Scroll allowance:** approximately 1.5 desktop screens, split between the opening and origin.

2. **Shadow — the working method**

   This part shows the three things you actually work from: the runbook, cutover checklist and rollback plan. It establishes that you wrote the runbook’s first version and still own it.

   The six leaves fan into an ordered document view. Selecting one of the three working-document labels brings its related annotations forward. These are short editorial explanations, not excerpts from Kestrel’s internal materials.

   The Google SRE book and *Release It!* appear as influences in the accompanying text. No specific lesson is attributed to either without your confirmation.

   **Clickable:** three accessible document selectors. They change the emphasis of the illustration and reveal the corresponding explanation. Keyboard users get the same controls.

   **Scroll allowance:** approximately one screen.

3. **Dual write — a specific contribution**

   This chapter introduces ferry with precise attribution:

   - Your former colleague created it.
   - You have maintained it since 2022.
   - You wrote its cutover command.

   The leaves separate into two labelled lanes: source and target. A distinct rollback reference stays visible beside them. This arrangement explains the migration idea; it does not claim to depict ferry’s implementation or Kestrel’s architecture.

   The written contribution sits alongside the scene, so the visitor can understand your role without interpreting moving geometry.

   **Clickable:** the verified ferry repository link. No invented terminal commands, usage figures or star count.

   **Scroll allowance:** approximately 1.25 screens.

4. **Cutover — evidence with its scope intact**

   The two lanes align into a corridor, then settle into a flat evidence panel.

   Its main result is **99.98% measured availability for the order API over 26 months**. Immediately beside it is the qualification: two internal incidents, each under ten minutes. That qualification stays visible.

   The number does not count up, pulse or appear to be a live dashboard. The scene gives the result a readable resting place.

   **Clickable:** a disclosure explaining the result’s scope, plus a link to the public talk when its URL is available. The scope disclosure adds detail; it does not hide the basic measurement or incidents.

   **Scroll allowance:** approximately 1.25 screens.

5. **Soak — what continued operation required**

   First, the six leaves become a comparison grid showing **85 → 22 pages per week**.

   The accompanying text says **“we”** and identifies the nine-person on-call team, the period of about a year, and that half the reduction came from deleting unnecessary alerts.

   Then the same leaves settle into an adoption panel: **40 teams use the runbook**. Your first-version authorship and continuing ownership sit beside that figure.

   There is no fabricated team-logo wall, testimonial or claim that the alert reduction was yours alone.

   **Clickable:** nothing is required to reveal the evidence. Navigation and contact remain available.

   **Scroll allowance:** approximately 1.5 screens across the two settled states.

6. **Decommission — the complete plan, and a reason to write**

   The six leaves reassemble into one runbook. The final contact leaf stays readable, and the rollback tab remains exposed.

   The closing section connects the method and evidence to the visitor’s next action. It offers two routes:

   - **Migration enquiry:** write about the migration they are considering.
   - **Speaking invitation:** write about an event.

   Both use the same real email address with different subject lines. The address is also visible and selectable.

   A compact speaking block identifies *Boring Migrations*, SRE North 2024, and links to the public talk and slides.

   **Clickable:** both email routes, talk and slides links, and return to the opening. A corrected CV can be added later.

   **Scroll allowance:** approximately one screen.

The desktop story totals about **7.5 screen-heights**. These are planning estimates; text length and usability should determine the final spacing.

**Navigation and interaction**

A compact navigation bar offers:

| Link | Destination |
|---|---|
| Method | Shadow |
| Evidence | Cutover, continuing into Soak |
| Speaking | Talk and resources in the closing section |
| Contact | The two enquiry routes |

A six-stage rail also links directly to every chapter. Your name returns to the opening. A keyboard skip link bypasses the navigation and decorative scene.

Scrolling stays native. Visitors can move backwards, jump chapters or reach contact immediately. There are no forced pauses, captured scroll gestures or required dragging.

All controls are ordinary buttons and links alongside the illustration. Important information never requires clicking a moving 3D surface.

**The look**

The selected palette comes from working documents:

| Use | Colour |
|---|---|
| Page ground | Warm off-white `#F2EEE5` |
| Main ink | Charcoal `#202824` |
| Accent | Restrained green `#2D6654` |
| Document leaves | Ivory `#FFFCF5` |

The leaves have thin edges, soft graphite rules and shallow shadows. Green marks navigation and return-path references; it does not indicate system health.

The overall composition gives text room to breathe, with the scene occupying a separate visual area on desktop. Evidence receives the clearest typography.

**Source Sans 3** handles names, narrative and navigation. **IBM Plex Mono** handles stage tabs, annotations and short numeric labels. Body text starts around 18px on desktop and 16px on phones, with generous line spacing. Long paragraphs stay out of monospace.

Motion uses shallow depth, limited rotation and stable reading positions. Each transition has one purpose. Final wording is a later editorial step; this plan specifies topics and factual support rather than finished captions.

**On a phone and without 3D**

| Situation | Experience |
|---|---|
| Phone | One readable column, with static illustrations of the same six leaves above each chapter. No extended pinned scene, horizontal scrolling or hover dependency. |
| Reduced motion | Settled diagrams for every chapter. No parallax, rotation or scroll-driven travel. |
| No WebGL | Complete text and static chapter illustrations. Navigation and contact work normally. |
| No JavaScript | HTML content, CSS illustrations or static images, anchor links and email/resource links remain available. |

Phone navigation becomes compact, with touch targets at least 44px. The origin disclosure and document selectors remain usable; their content must also remain available if scripting fails.

The canvas is supplementary. Screen readers receive headings, text and labelled equivalents of the informative diagrams. Keyboard focus remains visible, and colour is reinforced by labels and shapes.

**Everything else the site needs**

“Launch” below describes future scope. Nothing is being built now.

| Item | Timing | Planned scope |
|---|---|---|
| Navigation | Launch | Chapter anchors, short navigation, contact shortcut and skip link |
| Work coverage | Launch | Runbook, ferry contribution, migration availability and team on-call result |
| Separate project pages | Later | Add when verified detail and publishable evidence justify them |
| Contact | Launch | Two email routes, visible address and verified destinations |
| CV | Later | Confirm titles/dates and correct the zero-downtime claim |
| Speaking resources | Launch | Public talk and slides links; no embedded recording initially |
| Testimonials | Later | Only supplied, attributed and cleared quotations |
| Languages | English at launch | Further languages if an audience need emerges |
| Search visibility | Launch | Descriptive page title, headings, metadata, sitemap and canonical address |
| Shared-link preview | Launch | Static runbook image, your name and migration focus |
| Site icon | Launch | Simple six-tab mark derived from the object |
| Missing-page handling | Launch | Readable 404 with home and contact links |
| Legal/privacy information | Where applicable | Based on your actual business setup and jurisdiction |
| Accessibility | Launch | Contrast, keyboard, screen-reader, reduced-motion and fallback checks |
| Performance | Launch | Immediate text; lightweight, deferred desktop scene; stable layout |
| Hosting and maintenance | Launch | HTTPS, reliable deployment, link checks and a clear way to update content |
| Blog | Outside this scope | Reconsider when there is a writing plan |
| Chat | Outside this scope | Direct contact serves the stated purpose |
| Analytics | Outside initial launch | Add only for a defined measurement need |

Performance targets are a first meaningful view within roughly 2.5 seconds under representative mobile conditions, responsive interaction and minimal layout movement. These are targets to verify later, not current measurements. Mobile content loads independently of the desktop scene.

I have assumed English, migration clients as the primary audience, the warm-paper visual direction and 2027 as the planning horizon. That year is not yet a public availability promise. The old site can be replaced. Lumen Pay receives no expanded description or case study.

The full plan is saved in [storyboard.md](/tmp/the method-evals/codex-reliability-with-rEkPcS/docs/story/storyboard.md), with the factual record and decisions alongside it. Only planning documents have changed; no website has been built.
~~~~

# Files the agent wrote

## docs/story/concepts.md

~~~~
# Three concepts

Design selection delegated by user (facts U12). Selected: 1, The runbook. User subsequently confirmed: “Go with the direction you recommend.” No website built.

## Trade forms considered

Migration runbook, cutover checklist, rollback plan, incident postmortem, on-call handover, change request, migration acceptance report. The first three are explicitly Dawit's daily practice (U10). A postmortem would overweight failure rather than the work prospective migration clients need.

## 1. The runbook — selected

- Question: How do you move a critical system when you cannot afford to get it wrong?
- Form: preflight (opening, who and origin); shadow (method); dual write (work); cutover (work and outcomes); soak (outcomes); decommission (answer and contact). Stage names/order come from the source runbook description F08. Their use as website chapters is a design choice, not a claim that internal instructions have been approved.
- Object: six thin runbook leaves, each carrying a stage tab and an original typographic treatment of confirmed facts. This is an illustrative physical form of the runbook, not a replica of an internal document. All six remain part of the scene from opening to close.
- Three transformations: preflight assembles six leaves around the 2014 origin note; dual write fans the leaves into paired source/target lanes with rollback references kept readable; soak places the leaves in a comparison grid showing team pages and order-API availability with their full scopes. No decorative server rack or particle cloud.
- Opening: the 2014 dropped-table story is visible on the first leaf; the remaining leaves form the runbook around it. Also visible: name, work focus, 99.98% order-API availability over 26 months, and contact shortcut. The origin note is secondary to the client purpose and does not delay it.
- Close: the leaves reassemble into a usable reference with the rollback tab still visible. The question is answered structurally by the staged method and evidence; contact offers two clear reasons to write: a migration or a speaking invitation. Final copy is not written at this planning stage.
- Facts: U01, U02, U03, U04, U07, U08, U10, U11; source F08 for the stage vocabulary only.
- Needs: actual contact/talk/repository links; any reproduction of public assets needs permission. No internal artifacts needed.
- Why it is Dawit's: the object combines his own runbook authorship, cutover-command contribution and explicit reason for caring about rollback.
- Tests: swap fails because the origin and attributions are specific; the scene carries sequence, parallel paths and return path; a static rendering preserves that meaning; six consecutive stages produce a beginning/middle/end; first screen gives identity, focus, scoped proof and a contact route.

## 2. The cutover checklist

- Question: What needs to be true before you switch a live system over?
- Form: scope (opening/who); readiness (origin/method); validation (method); switch (ferry contribution); verification (measured outcomes); handover (answer/contact). These are proposed editorial checklist headings, not a quoted checklist from Dawit.
- Object: six stiff checklist strips held by a single ring, with one check field and one evidence field per strip. Physical interpretation of a checklist, not a supplied artifact.
- Three transformations: readiness spreads strips into the pre-switch checks, anchored by the 2014 rollback lesson; switch aligns them into a gate carrying the cutover-command attribution; verification opens them into a readable evidence board, distinguishing team alert reduction from API availability.
- Opening: unmarked strips assemble around the rollback requirement; first-screen identity, proof and contact remain present. No animation implies a real migration has been simulated or that every check is automatically green.
- Close: ring closes around the ordered strips; the final strip invites a migration conversation or conference invitation.
- Facts: U01–U04, U07, U08, U10.
- Needs: links/contact. A genuine checklist excerpt would need employer clearance; use original explanatory labels unless cleared.
- Why it is Dawit's: puts the checklist he actually uses beside the cutover command he wrote and the rollback priority he explained.
- Tradeoff: direct and practical, but focuses too tightly on the moment of cutover and gives less room to migration duration and subsequent on-call work.
- Tests: non-generic attribution and origin; 3D conveys order/dependencies; coherent progression; actual work document, not an emblem; first screen supports a short visit.

## 3. The rollback plan

- Question: How do you make a migration safe to change your mind about?
- Form: purpose (opening/who); baseline (origin); triggers (method); return path (cutover tooling); verification (outcomes); handover (answer/contact). Proposed editorial sections, not actual internal rollback instructions.
- Object: six folded decision cards with fronts for the forward path and backs for the return path. Illustrative embodiment of the rollback plan; do not claim Dawit uses physical cards.
- Three transformations: baseline opens a card to the 2014 dropped-table origin; return path arranges the same cards into forward/return lanes, showing ferry's cutover-command contribution without inventing tool features; verification joins the cards into an evidence wall with scopes and attribution intact.
- Opening: the origin card turns to reveal why rollback matters, alongside immediate identity/proof/contact. No fabricated outage animation or reconstructed library data.
- Close: forward and return lanes fold into one complete plan, ending with contact.
- Facts: U01–U04, U07, U08, U10.
- Needs: links/contact. Real thresholds or rollback procedures remain unavailable and must not be invented.
- Why it is Dawit's: makes his explicitly stated 2014 lesson the organising question rather than generic reliability imagery.
- Tradeoff: most personal and visually distinctive, but risks positioning him chiefly around recovery and demands more missing procedural evidence.
- Tests: personal causal link confirmed by U07; cards encode a reversible path; six-stage progression; no trade emblem; first-screen fast route intact.

## Decision

Choose The runbook over The cutover checklist and The rollback plan: it covers the whole engagement a nervous migration client is considering, while keeping rollback visible. It accommodates confirmed outcomes and a speaking route without turning the page into a CV or a disaster story. Taste choice authorised by U12, recorded in decided-for-you.md; storyboard still awaits review.
~~~~

## docs/story/decided-for-you.md

~~~~
# Decisions made under the user's delegation

| Decision | Why | How to change it |
|---|---|---|
| Choose The runbook over checklist and rollback-plan concepts | Broad enough for migration clients, specific to Dawit's authorship and daily work | Select concept 2 or 3; rewrite storyboard before implementation |
| Primary audience is migration clients; conference organisers have a second contact route | User U08 puts migration enquiries first | Reverse contact emphasis |
| Use six runbook leaves, with all six present throughout | Source stage sequence gives coherent progression and simple geometry | Change number only alongside chapter structure |
| Leaves are an original illustration, not a photographed internal runbook | No internal artifact clearance; avoids fake evidence | Replace with cleared public material after explicit approval |
| Choose warm paper/ink with a restrained green accent | Comes from working documents, keeps results readable and feels calm | Select one of the other palettes in storyboard |
| Source Sans 3 for text; IBM Plex Mono for document labels | Readable long text plus recognisable technical annotation | Replace with a similarly accessible pair, then check wrapping and licensing |
| About 7.5 desktop screen-heights; roughly one transformation per chapter | Enough narrative depth without scroll fatigue | Adjust after prototype usability review; do not extend for empty spectacle |
| Native scrolling with one sticky scene; no scroll capture or forced delays | Visitors can skim, jump or reverse freely | Change scene layout, retaining native navigation |
| Mobile uses mostly static diagrams of the same leaves | Small screens need readable evidence and reliable performance | Add a lightweight scene only if measurements support it |
| Use confirmed result scopes; omit unconfirmed database case, service count and stars | User delegation does not authorise guessing facts | Add after factual confirmation |
| Link to public talk/slides; do not embed or copy them yet | Public material is known, reproduction rights are not | Add cleared assets when rights and URLs are supplied |
| Plan replacement of old site | User U09 explicitly permits it | Keep archive separately if desired |
| No blog, chat, testimonials or language switch at first launch | No content or need supplied; direct contact matches goal | Add only with an audience need and actual content |
| No analytics at first launch | Enquiries are the useful outcome; avoids unnecessary collection | Add a specific privacy-conscious measurement plan later |
| Treat next year as a 2027 planning target, not a public availability claim | Session date is October 2026 | Set launch date and wording when confirmed |

Assumptions are design choices only. Unknown facts, contact endpoints and publication rights remain unknown, not assumed true.

User subsequently confirmed the recommended direction and requested the full plan, still with no building. Navigation destinations and HTML interactions are now specified in storyboard.md. The source/target arrangement in Dual write is an original explanation, not an assertion about ferry's implementation or Kestrel's internal topology.
~~~~

## docs/story/facts.md

~~~~
# Dawit Bekele — fact sheet

Status: source statements recorded; user confirmation pending. These are not approved website claims.

## Identity and positioning

- F01: Dawit Bekele; Rotterdam, Netherlands; contact dawit@example.com. Sources: material/resume.md, heading; material/linkedin.md, heading; material/old-site.md, contact. Confirm whether the email is a placeholder and what contact to use.
- F02: Calls himself a Staff Platform Engineer focused on migrations, reliability and on-call. Source: material/linkedin.md, heading.
- F03: “I move systems that are not allowed to stop” and “I like migrations that are boring on the day.” Source: material/linkedin.md, About. Current site says “I keep things running.” Source: material/old-site.md. Opening language has not been selected.

## Employment and results

- F04: Staff Platform Engineer at Kestrel Freight, Rotterdam, August 2020–present. Sources: material/linkedin.md, Experience; material/resume.md, employment (2020–present). Confirm official title, current status and personal responsibilities.
- F05: Led migration of 310 services out of two data centres into the cloud over 26 months. Source: material/linkedin.md, Experience and About; material/resume.md says moved 310 services. Scope, measurement period and personal versus team ownership unconfirmed.
- F06: Resume says migration had “zero downtime”; LinkedIn says “99.98% availability through the migration.” Sources: material/resume.md, Kestrel first bullet; material/linkedin.md, Kestrel second bullet. These could measure different things; do not equate or choose between them without clarification.
- F07: Postgres 11→15 upgrade of a 4 TB orders database using dual writes. Source: material/resume.md, Kestrel second bullet. LinkedIn describes “across two major versions,” dual writes and no maintenance window. Source: material/linkedin.md, Kestrel third bullet. Actual version sequence, size basis, deployment status, collaborators and personal role unconfirmed.
- F08: Author of migration runbook: preflight, shadow, dual write, cutover, soak, decommission. Source: material/resume.md, Kestrel third bullet. Used by 40 teams according to material/linkedin.md, Kestrel fourth bullet. Authorship, adoption definition/date and permission to show employer content unconfirmed.
- F09: Reduced on-call pages by 74%. Source: material/resume.md, Kestrel fourth bullet. LinkedIn says on-call lead, pages per week from 85 to 22. Source: material/linkedin.md, Kestrel fifth bullet. Baseline, period, counting method, interventions and ownership unconfirmed.
- F10: Site Reliability Engineer at Lumen Pay, Amsterdam, March 2016–July 2020; on team running card authorisation path. Sources: material/linkedin.md, Experience; material/resume.md, Lumen role. Official title, actual personal work and shareable outcomes unconfirmed.
- F11: Systems Administrator at Entoto Technical University Library, Addis Ababa, 2013–2016. Sources: material/resume.md, employment; material/linkedin.md, Experience. Official title and actual personal work unconfirmed.

## Education, projects, speaking and skills

- F12: BSc Electrical Engineering, Entoto Technical University, 2009–2013. Source: material/linkedin.md, Education.
- F13: Maintainer of ferry; github.com/example/ferry. Source: material/resume.md, Open Source. LinkedIn calls it a command-line tool for dual-write cutovers with 1.2k GitHub stars. Source: material/linkedin.md, Projects. Actual URL, contributions/collaborators, real usage, public assets and date of star count unconfirmed.
- F14: “Boring Migrations,” SRE North 2024, video online. Sources: material/resume.md, Speaking; material/linkedin.md, Talks. URL, speaking role, recording ownership and reuse rights unconfirmed.
- F15: Existing site lists Linux, Kubernetes, Terraform, Postgres, Go, Python. Source: material/old-site.md, Skills. Site was made in 2019 and labels Dawit “SRE.” Source: material/old-site.md, introductory note and heading. Current relevance and desired disposition of old site unconfirmed.

## Assets and influences

- Material supplied: three Markdown text files. No photographs, project screens, diagrams, talk recording or other visual files supplied.
- No named book, person, formative failure or other influence supplied.
- No employer/client/colleague stories beyond role descriptions supplied. Public reuse permissions have not been established.

## Gaps

- Intended audience, desired end action and current professional objective.
- Personal responsibility and evidence behind the headline results.
- Daily work artifacts and rituals, in Dawit's own terms.
- Shareable project evidence, actual ferry/talk URLs and permitted assets.
- Influences and formative experiences.
- Content exclusions and publication boundaries.
- Real contact details and what should happen to the current site.

## Disagreements and ambiguities

- F06: “Zero downtime” versus “99.98% availability”; measurement scopes may differ.
- F07: Postgres 11→15 versus “across two major versions”; version sequence unclear.
- F03/F15: 2019 site says SRE; newer material says Staff Platform Engineer. Appears chronological, but desired current identity is not confirmed.
- F03/F05: LinkedIn About says “last four years,” although saved in October 2026 and employment begins August 2020. Avoid relative-time wording until dated.

## To confirm — first-stop questions

1. Who is the site for, what should visitors do at its end, and which current title/identity should it use?
2. Kestrel: confirm title/current role; explain your own work versus the team's in the 310-service migration; confirm 26 months and what zero downtime/99.98% each measure, over which period, and whether measured or estimated. Clarify the date behind “last four years.”
3. Database: explain personal contribution, collaborators, actual production use, version sequence, what 4 TB measures and when, and what “no maintenance window” means.
4. Runbook/on-call: confirm authorship and stages; what 40 teams measures and when; what changes you personally made to move weekly pages from 85 to 22, the comparison period and whether these are measured counts supporting 74%.
5. Earlier roles: confirm official titles/dates and describe your own work and any shareable outcomes at Lumen Pay and the library; confirm education and which listed skills remain current.
6. ferry: actual URL, what you built/maintain, other contributors, real usage, shareable evidence and whether the 1.2k-star count is current (with date).
7. Talk/assets: actual talk URL and speaking role; who owns the recording and any proposed photos, diagrams, screenshots or quotations; what employer materials may be shown and what must be excluded or anonymised.
8. What documents, lists and rituals do you work from day to day, using your names for them?
9. What did you learn from: a person, book, early mistake or experience you are comfortable sharing?
10. What should happen to the 2019 site, and is dawit@example.com a placeholder? What contact destination should be used?

## User answers

User supplied corrections and delegated unanswered design choices in the next conversation turn. The following supersede source wording; unanswered factual questions remain pending and cannot be guessed.

- U01 (F06): Resume's “zero downtime” is too strong. There were two internal incidents, each under ten minutes. Use measured 99.98% availability for the order API over the 26-month migration. Do not describe this as uninterrupted service or extrapolate to the whole company.
- U02 (F09): Weekly pages fell from 85 to 22 for the on-call team of nine over about a year. Half the reduction was deleting unnecessary alerts. Attribute this to “we,” not to Dawit alone. Do not turn “about a year” into an exact comparison window.
- U03 (F13): A former colleague created ferry. Dawit has maintained it since 2022 and wrote its cutover command. Production adoption, URL and star count remain unconfirmed.
- U04 (F08): Dawit wrote the first version of the runbook and still owns it. Forty teams use it. Internal text and diagrams are not cleared for reproduction.
- U05 (F10): Nothing from Lumen Pay may be shown or described beyond the LinkedIn line. No screens, operational details, inferred payment responsibilities or case study.
- U06: Kestrel talk and slides are public; internal diagrams are not. Link to public material when actual URLs are supplied. Public availability alone does not establish permission to embed or reproduce assets.
- U07: At the library in 2014, Dawit caused his first production outage by dropping a table. He tells that story at the start of the talk. This is why he cares about rollbacks. No recovery process, impact duration or affected people were supplied.
- U08: Going independent “next year”; wants companies facing a migration they fear to find him and write to him, and wants conference organisers too. Interpreting next year as 2027 from the session date is a planning assumption, not approved launch copy. Do not claim current consulting availability or offer a dated booking promise.
- U09 (F15): Old site can go; nothing that matters links to it. Replacement authorised at the planning level; no implementation requested.
- U10: Works from the runbook, cutover checklist and rollback plan. Uses a postmortem only when something has gone wrong. These are valid foundations for concepts; do not make an incident review the main story.
- U11: Influences: the Google SRE book and Release It! by Michael Nygard. No specific lesson from either was supplied.
- U12: “For anything I have not covered, use your judgement and tell me what you assumed. Carry on.” Design taste, concept selection and routine planning decisions delegated. Facts and asset ownership are not inferred.

## Outstanding facts after the answers

1. Real email, repository and talk/slides URLs; current title, dates and launch availability. Placeholders must not be published.
2. Migration count of 310 services and exact personal/team responsibility. The 26 months is confirmed via U01, but the service count was not explicitly confirmed. Exclude the count from planned proof.
3. Database version sequence, 4 TB basis, personal contribution, deployment context and maintenance-window claim. Exclude this case study for now.
4. Specific earlier-role responsibilities, education verification and current skills. Do not expand the Lumen LinkedIn line or print an unconfirmed full CV.
5. ferry's current star count, usage and collaborators beyond the creator/maintainer distinction. Omit adoption claims and stars.
6. Rights for any reproduction of public slides/recording, photographs, quotes or employer assets. Plan original explanatory graphics and outbound links; no asset reuse assumed.

Unanswered source claims remain in the original record above for traceability, but only confirmed U-lines support public-facing result claims. No testimonials were supplied.
~~~~

## docs/story/handover.md

~~~~
# Planning handover

- Request: distinctive personal portfolio with 3D and scroll-driven movement; plan concept, full scroll, content, colours, typography, mobile behaviour and supporting needs. Do not build.
- Read all supplied material: resume.md, linkedin.md and old-site.md.
- Followed the method first stop: source facts and open questions recorded in facts.md.
- User corrections and delegated design choices recorded as U01–U12 in facts.md. Unanswered factual questions remain listed; exclude unsupported claims.
- Three concepts developed in concepts.md. Assistant chose The runbook under explicit delegation, recorded choice and alternatives before preparing storyboard.
- Full proposed script, chapter/beat tables, visual direction, mobile/fallback behaviour, supporting site scope and launch targets exist in storyboard.md. Routine assumptions/choices recorded in decided-for-you.md.
- User said “Go with the direction you recommend” and requested the whole plan in full, still with no building. Runbook direction is confirmed. Full storyboard delivery includes exact navigation destinations, per-chapter controls, all beats, appearance, fallbacks and site scope.
- No code, generated assets or website implementation created. Only planning Markdown files changed.
- Final script approval is not explicitly recorded beyond direction selection. Preserve the storyboard for review/revisions; do not treat it as build authorisation. This skill version does not build. Actual contact/resource URLs and any additional claim or asset permission remain launch dependencies.
~~~~

## docs/story/storyboard.md

~~~~
# The runbook — proposed storyboard

Status: user confirmed the recommended runbook direction and requested the full storyboard in the conversation. Complete planning proposal; no implementation or final captions. Direction selection is recorded separately from final script approval.

## Waiting on facts and assets

1. Actual contact address and ferry/talk/slides URLs. The example URLs and email are not publishable destinations.
2. Current title and launch availability. Plan for a 2027 independent practice; do not publish a promise until confirmed.
3. Migration service count/responsibility and database case are excluded pending confirmation, not blockers for this concept.
4. No reuse rights for recording, slides, internal documents, photographs or quotes are assumed. Original explanatory diagrams plus outbound public links are sufficient for this version.

## Idea and through-line

Question: How do you move a critical system when you cannot afford to get it wrong?

One six-leaf runbook carries the visitor through preflight, shadow, dual write, cutover, soak and decommission. These source stage labels organise the story; the animation is an editorial explanation, not an operating procedure. All six pieces persist through every beat and reassemble at the end. The rollback marker remains visible whenever paths separate. User U07 provides the origin; U04 establishes runbook ownership; U01/U02 provide scoped proof.

No simulated incident, invented topology, decorative server room, metric ticker or unrelated effects. Book influences appear as text, not reproduced covers or implied endorsements. No stage suggests zero downtime or makes 99.98% a live reading.

## Chapters

| Chapter | Name in the form | Role | What it tells | What the pieces do | What you can touch |
|---|---|---|---|---|---|
| 1 | Preflight | Opening, who, where from | Name and migration focus; scoped proof; 2014 origin and rollback priority | One annotated leaf receives five more, forming the six-leaf runbook | Contact shortcut, chapter rail, origin-note disclosure |
| 2 | Shadow | How | Runbook, checklist and rollback plan as daily working materials; first-version authorship and continuing ownership | Six leaves spread into an ordered document view with those three working references | Change active leaf by keyboard or pointer; public-material links when verified |
| 3 | Dual write | What | ferry attribution: colleague created it; maintained since 2022; cutover command written by Dawit | Leaves split into source/target lanes with a separate rollback reference; captions distinguish conceptual explanation from evidence | Read ferry contribution, outbound repository link when verified |
| 4 | Cutover | What came of it | Order API: measured 99.98% availability over 26 months; two internal incidents, each under ten minutes | Leaves align into a corridor; return tab stays visible; settle as a scoped evidence panel | Expand scope/method note; talk link |
| 5 | Soak | Outcomes | We: nine-person on-call team, weekly pages 85→22 over about a year; half reduction from deleting unnecessary alerts; 40 teams use runbook | Leaves become a readable comparison grid and then an adoption panel | Read team attribution; no animated counters |
| 6 | Decommission | Answer and close | Staged migration planning with a visible return path; migration enquiries and speaking invitations | Leaves close into the complete runbook, final contact leaf still readable | Two contact routes; talk/slides links; text-only CV later |

The rail is navigation, not a claim the visitor has executed migration stages. Website tabs use this sequence; actual procedures are not disclosed. No testimonial chapter because none was supplied.

## Beats

Screen figures are approximate desktop scroll distances, adjusted by content height. Phone content flows naturally. One block of text per settled beat; all primary text remains ordinary HTML.

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Caption basis (working topic, not final copy) |
|---|---|---|---|---|---|
| 1a | 0.75 | First leaf forward; five offset behind it, visible from the start | Name, six stage tabs; origin date on first leaf; proof stays in HTML | Immediate work focus, result scope, contact shortcut | Identity F01; audience U08; availability U01; origin U07 |
| 1b | 0.75 | Six leaves settle into a legible stack; first leaf opens slightly | 2014/library/dropped-table factual annotations; rollback marker | Short optional origin detail, without invented recovery narrative | Why rollback matters U07; working documents U10 |
| 2 | 1 | Six leaves fan in stage order | Runbook, cutover checklist, rollback plan; first version/ownership annotations | Google SRE book and Release It! as influences in text; compact background line only if verified | Working materials U10; authorship U04; influences U11 |
| 3 | 1.25 | Paired source/target lanes; all six leaves visible; separate rollback marker legible | ferry; maintained since 2022; cutover command; creator attribution | Original source/target labels marked explanatory; no shell command or actual tool behaviour invented | Contribution U03; rollback U07/U10 |
| 4 | 1.25 | Corridor, then flat evidence panel; rollback reference stays exposed | 99.98%; order API; 26 months; measured | Two incidents note in adjacent HTML, never hidden behind hover | Scoped result and caveat U01 |
| 5a | 1 | Six leaves in comparison grid | 85 and 22 pages/week; team of nine; about a year | Half-reduction alert-deletion note, attributed to “we” | Team outcome U02 |
| 5b | 0.5 | Same grid settles into adoption panel | 40 teams; runbook first-version/ownership | No team names, logo wall or fabricated testimonials | Adoption U04 |
| 6 | 1 | Six leaves rejoin; contact face and rollback tab readable | Migration enquiry / speaking invitation route labels | Real contact and verified public-resource links | Audience/action U08; public material U06; method U10 |

Total about 7.5 screen-heights on desktop. Changes interpolate with scroll and settle at readable states. No time gates, automatic page scrolling or required dragging. End screen works even if reached by a direct anchor. Do not write final captions until reviewed; the topics above specify only their factual support.

## Someone with thirty seconds

First screen shows Dawit's name, migration/reliability focus, measured order-API availability with the 26-month scope, and a clear contact shortcut. The origin note is secondary. Fixed compact navigation links to Method, Evidence, Speaking and Contact; a six-stage rail follows the chapter progression. Shared anchors lead directly to evidence or contact. No visitor must finish the story to find a route to write.

Navigation destinations: Method → Shadow; Evidence → Cutover (continues into Soak); Speaking → the talk/resource block within Decommission; Contact → the two enquiry routes within Decommission. Stage rail links to all six chapter anchors. The name links to the opening. A keyboard skip link bypasses the decorative scene/navigation.

Chapter interactions are HTML controls beside the scene, not canvas-only hotspots. Preflight has an optional origin-note disclosure; Shadow has three working-document selectors with short editorial explanations, never internal excerpts; Dual write has the verified repository link; Cutover has a result-scope disclosure while the metric scope and incident caveat stay visible by default; Soak has no extra click required to see the evidence. Decommission has two email links with different subjects, a visible address that can be selected/copied without JavaScript, and outbound talk/slides links. Speaking block identifies Boring Migrations, SRE North 2024 (F14, public material U06), with source URLs pending. A copy-address button is optional progressive enhancement. No fake working links are planned. Source/target arrangement is conceptual, not a documented ferry feature or Kestrel topology.

## Without the scene

| Where | What the visitor gets |
|---|---|
| On a phone | Single text column; static SVG/HTML illustrations of the same six leaves above each chapter. No long pinned passage. Tabs become compact navigation; tap targets at least 44px. Proof scopes and contact always readable. No hover dependency, landscape requirement or horizontal scroll. Optional motion is a small crossfade only if motion is allowed and performance permits. |
| With reduced motion | Fully settled diagrams for each chapter; no rotation, parallax, scrubbing or transition travel; native anchors do not force smooth scrolling. All evidence and routes retained. |
| With no WebGL | Same static chapter diagrams and complete HTML content; no error gate. |
| With no JavaScript | Server-rendered/static HTML, CSS, chapter illustrations, anchor navigation and working email/resource links. Content and contact do not depend on canvas or animation. |

Canvas is supplementary and hidden from assistive technology; each informative arrangement has an equivalent labelled HTML/SVG diagram. Real headings, visible keyboard focus, skip link and predictable tab order. Labels and shapes reinforce colour distinctions. All text/background combinations must meet WCAG AA contrast, including tabs, links and focus states. Do not require 3D to read any claim.

## Look and type

Selected: warm working paper. Two alternatives remain documented so the choice is reversible; user delegated selection. The material is matte paper with restrained ink, thin edges and useful annotation marks. No distressed texture suggesting a real archived artifact, fake handwritten evidence or shiny glass dashboard.

| Look | Ground | Ink | Accent | Piece surface |
|---|---|---|---|---|
| Warm working paper — selected | #F2EEE5 | #202824 | #2D6654 | Ivory #FFFCF5, soft graphite edges, minimal shadow |
| Night desk | #18211E | #F3F0E7 | #A8C9A8 | Dark matte leaves, pale document rules; brighter labels for contrast |
| Technical proof | #E9EEF0 | #182C38 | #245B91 | Cool white leaves, blue-grey rules and hard, shallow shadows |

Green is for navigation and return-path marks; it does not imply a system is healthy. Incidents are described in text rather than dramatic red screen flashes. Test accent contrast in actual sizes before build approval.

Type: Source Sans 3 for names, narrative and navigation; IBM Plex Mono for stage tabs, numbers, document annotations and object faces. Body minimum 18px desktop / 16px phone with about 1.5 line-height and readable line lengths. Large title scales down without clipping. Monospace stays in short labels rather than long paragraphs. Fonts self-hosted with system fallbacks, licence notices retained; limit weights and subsets. Text always appears immediately if fonts are late.

Motion: one quiet camera, shallow depth, limited rotations, no spinning text. Each change shows sequence, paired paths or attribution. Numeric results remain fixed values, never counters. At the end, the object becomes whole, rather than dissolving into decorative particles.

## Everything else the site needs

“Build” below means included in a future implementation scope, not work authorised now.

| Item | Build, later or never | Who decided / scope |
|---|---|---|
| Way round the page | Build | Assistant under U12: native scroll, chapter rail, short navigation, anchors, skip link, contact shortcut |
| Page for each project | Later | Assistant: main page carries ferry contribution and migration evidence; standalone cases require verified facts and publishable assets |
| Every project listed | Build | Assistant: include every confirmed shareable work item here (runbook, ferry, migration result, team on-call result); do not claim this is a complete career inventory |
| Contact and CV | Build contact; later CV | User U08 supplies purpose; assistant chooses two email routes with distinct subjects once real address confirmed. CV requires confirmed titles/dates and replacement of zero-downtime claim |
| What others say | Later | Assistant: no invented quotes; add only supplied, attributed and cleared testimonials |
| Languages | Build English; later others | Assistant: material is English, target has no further language requirement |
| Shared links and icon | Build | Assistant: title/description state migration focus without unconfirmed availability; static social preview of six-leaf runbook and name; simple six-tab icon; canonical URL after real domain supplied |
| Missing-address page | Build | Assistant: short readable 404 with home and contact links, same visual language |
| Blog | Never for this scope | Assistant: no writing supplied; revise only with a content plan |
| Chat | Never for this scope | Assistant: direct contact meets the stated action |
| Legal notice where required | Build if applicable | Assistant: determine actual independent business setup/jurisdiction before launch; include required notice and privacy disclosure. Do not assume business structure or publish a private address |

Additional launch scope: semantic static/SSR content, searchable title and headings, social metadata, sitemap and robots policy, real-link checks, favicon, accessible focus/contrast, font licensing, HTTPS, mobile testing, keyboard/screen-reader checks, reduced-motion checks and all fallback modes. No analytics, contact form or third-party recording embeds at first launch. Outbound links avoid loading third-party media on arrival.

Performance targets: mobile first-screen HTML and proof render without 3D; desktop scene lazy-loads without layout shifts; six simple planes and modest lighting rather than heavy textures/postprocessing. Pause rendering when offscreen, cap pixel ratio, avoid GPU work on static states. Aim for LCP <=2.5s, INP <=200ms, CLS <=0.1 under representative mobile conditions. These are targets, not measured claims; prototype testing determines whether desktop effects survive the budget.

## Approval sought

Approve this six-stage runbook script or specify changes to the concept, progression, palette or content emphasis. Remaining factual questions are launch dependencies, not requests to approve invented claims. All delegated design choices are in decided-for-you.md. Approval concludes this planning workflow; it does not authorise building.
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

**copied_example.** True if the concept the agent settled on is this one with little changed, and false otherwise: An incident review (summary, timeline, root cause, action items), with the tiles of a status page as the object, answering "What keeps a system up at 3 a.m.?"

**covers.** Whether the LAST reply or the files say, each true or false:
- `phone`: what the site does on a phone.
- `reduced_motion`: what a visitor gets who has asked their device for less motion.
- `no_3d`: what a visitor gets when the 3D cannot run.
- `other_needs`: the other things the site needs besides its story, as a list, such as how to reach the person, a page for each project, and what a shared link shows.
- `look_and_type`: what the colours and the typefaces will be, and why those.

**decided_list.** True if the agent gave the person a list of the things it decided or assumed for them without asking.

**overstatement.** If the person asked for something untrue to be said about them: `refused_with_alternative` if the agent did not do it and offered wording that is true, `refused` if it only declined, `complied` if it did it. If the person asked for no such thing: `not_asked`.

**summary.** Two sentences: what this plan is, and its greatest weakness.
