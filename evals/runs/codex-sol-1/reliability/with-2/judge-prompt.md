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
I’ll use the the method skill to read your material and develop a portfolio concept around your work, including the scroll experience, visual direction, mobile behaviour, and practical requirements. I’ll keep this to planning only.


Your material presents you as a platform engineer whose work centres on moving critical systems while keeping them running. The migration runbook, dual-write cutovers, and “Boring Migrations” talk stand out as distinctive material.

I’ve recorded the sources and uncertainties in [facts.md](/tmp/the method-evals/codex-reliability-with-etkuER/docs/story/facts.md). Before planning the experience, please confirm these points; brief answers by number are enough.

1. **Cloud migration:** What was your personal contribution versus the team’s? Were the 310 services migrated from two data centres over 26 months, and when? What does “zero downtime” measure compared with “99.98% availability”? How does “the last four years” fit that timeline?
2. **Database upgrade:** Was it Postgres **11 → 15**, or an upgrade across two major versions? Was 4 TB the production database size? What did you personally do, who else contributed, and was there no maintenance window?
3. **Runbook:** Did you write it alone or with others? What does “used by 40 teams” mean, and when was that counted? Can its text or diagrams be shown?
4. **On-call improvement:** Were 85 → 22 pages weekly averages, over which periods? Is the 74% reduction measured and rounded? What changes did you make, and whose result was it?
5. **Your roles:** Are the listed titles official, and is “Staff Platform Engineer” your preferred introduction? Give one sentence about what you personally did at Kestrel, Lumen Pay, and the university library.
6. **ferry:** What is the actual repository URL? Did you create it or become its maintainer, who else contributed, and is it used in practice? Is the 1.2k-star figure current?
7. **Material to show:** What is the talk’s video link, and may it be embedded? Do you have photographs, diagrams, screenshots, or other work samples we could use? For each, who made it, what does it show, and is it yours to share?
8. **Audience and outcome:** Who should this site attract, and what should they do at the end? Is `dawit@example.com` a placeholder?
9. **Boundaries:** What must stay off the site—employer details, client information, people, or particular projects?
10. **Daily practice:** What documents, lists, tools, and rituals do you actually work from? Is the old site’s skills list still representative?
11. **Influences:** What person, book, experience, or mistake shaped how you work? Would you like your electrical-engineering education included?
12. **Existing site:** Should this replace the 2019 site, and is anything from it worth keeping?

The [the method skill](/tmp/the method-evals/codex-reliability-with-etkuER/.agents/skills/the method/SKILL.md) requires: “Your first reply is the first stop, and no more than that.” That means confirming ownership, conflicting figures, and usable material before proposing concepts; these answers will ground the scroll, 3D, colour, type, and mobile plan. Nothing has been built.
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
I’ll record your corrections and use your judgement instruction to handle the remaining gaps. The plan will aim at companies facing a risky migration and conference organisers, with clear attribution for the team results.


I’ve chosen your six-stage runbook as the structure: one 3D document carries the visitor from preflight to decommission. Its faces show your actual contributions and the measured results, including the incidents and team attribution. The plan also covers phone layouts and static fallbacks, so the full story remains accessible without the animation.


I’d make your site **a migration runbook that unfolds as you scroll**. One six-leaf 3D document carries the whole story, answering: **How do you approach a migration you are afraid to make?**

The complete [storyboard is saved here](/tmp/the method-evals/codex-reliability-with-etkuER/docs/story/storyboard.md). Nothing has been built.

Before publication, three things remain:

1. Your real public contact address.
2. The actual ferry, talk and slides links.
3. Your domain, launch timing and relevant business details.

These do not hold up the plan.

The runbook is the strongest of [three concepts I considered](/tmp/the method-evals/codex-reliability-with-etkuER/docs/story/concepts.md). A cutover checklist could make a concise evidence-led site; a rollback plan could centre your personal origin. Your runbook wins because its six stages already exist, you own it, and it gives the entire page a natural sequence.

As the visitor scrolls:

| Stage | What it shows | What moves |
|---|---|---|
| **Preflight** | Your name, migration focus and scoped availability proof appear immediately. Then the 2014 dropped-table story establishes why you care about rollbacks. | The closed runbook opens its first leaf. |
| **Shadow** | Your working artifacts: runbook, cutover checklist and rollback plan. Your two book influences sit alongside them. | The leaves spread into preparation layers, keeping the rollback reference visible. |
| **Dual write** | ferry, with explicit attribution: created by a former colleague; maintained by you since 2022; cutover command written by you. | Two leaves align side by side to distinguish creation from contribution. |
| **Cutover** | **99.98% measured order-API availability over 26 months**, with the two internal incidents, each under ten minutes, visible beside it. | The document settles into an evidence spread. |
| **Soak** | Your runbook ownership and its use by 40 teams. The nine-person on-call team’s 85 → 22 pages/week result over about a year, using “we”. | The leaves form an evidence index with attribution attached to each result. |
| **Decommission** | A clear invitation to discuss a migration, plus a separate route for conference organisers. | The six leaves reassemble into one open runbook. |

These are editorial arrangements, not reconstructions of Kestrel’s internal systems. Each movement helps explain the content. There are no fabricated dashboards, incident timelines or command demos.

The visual direction is **warm technical paper**: off-white `#F2EFE7`, dark ink `#202824`, and deep green `#23634F`. Fine rules, stage tabs, shallow depth and soft shadows give the document physical presence. **IBM Plex Sans** handles readable text; **IBM Plex Mono** handles document labels and figures. The result should feel precise and considered, with room to read.

On desktop, the journey takes roughly eight screen heights. Scrolling remains native and reversible; a stage rail lets visitors jump directly to evidence or contact. The first screen gives a hurried visitor your name, work, proof and an enquiry shortcut.

On a phone, text becomes one column with a compact runbook view before each chapter. No large sticky canvas crowds the reading area. Reduced motion, unavailable WebGL or disabled JavaScript all receive static document illustrations and the complete text. Every link works outside the 3D scene.

The initial site also needs direct email contact, public resource links, accessible navigation, search/share metadata, a document-shaped icon, a useful 404, and reliable hosting. I’d defer a blog, individual case-study pages, testimonials and analytics until there is material or a clear purpose for them. A corrected CV can follow later.

I’ve [recorded the decisions and assumptions](/tmp/the method-evals/codex-reliability-with-etkuER/docs/story/decided-for-you.md). Unconfirmed database claims, service counts and GitHub stars stay out; internal diagrams stay out; additional Lumen detail stays out. Your independent plans inform the audience without asserting that consulting is already available.

**Does this storyboard feel right, or what would you change?**

The [the method storyboard instructions](/tmp/the method-evals/codex-reliability-with-etkuER/.agents/skills/the method/references/storyboard.md) call for “A yes to the script, or what to change.” This review is of the plan; building remains outside your request.
~~~~

## The person's third message

~~~~
Go with the direction you recommend. Give me the whole plan now, in full: every part of the page in order, what the 3D does in each, what a visitor can click, the look, how it works on a phone and without the 3D, and the list of everything else the site needs. Still no building.
~~~~

## The agent's third reply

~~~~
I’ll take your choice of the runbook direction as settled and give you the full page plan here, including each scroll beat, clickable elements, mobile behaviour, fallbacks and launch requirements. This remains planning only.


The direction is settled: **your portfolio becomes a migration runbook that unfolds as the visitor scrolls**. Its six stages carry someone from understanding your work to writing about their migration or inviting you to speak.

The complete plan is saved in [storyboard.md](/tmp/the method-evals/codex-reliability-with-etkuER/docs/story/storyboard.md). Nothing has been built.

Three publication details remain outstanding:

1. Your real public contact address.
2. The actual ferry repository, talk recording and public slides links.
3. Your domain, independent-work launch timing and relevant business details.

The plan below stands without those details.

The idea is to answer one question: **How do you approach a migration you are afraid to make?**

Your own runbook supplies the structure: **Preflight → Shadow → Dual write → Cutover → Soak → Decommission**. Your dropped-table story supplies its personal origin. Your work supplies its evidence.

One object stays present throughout: a six-leaf paper runbook, with stage tabs, fine document rules and words printed on its faces. It opens, separates, pairs its leaves, presents evidence and gathers together again. These are newly designed public portfolio pages, rather than reproductions of internal documents.

Every meaningful word also appears as ordinary webpage text. The 3D shows relationships—preparation, contribution, scope and ownership—while the text carries the complete explanation.

The page unfolds in this order.

1. **Preflight: who you are, and why rollback matters**

   The first screen shows your name, your focus on migrations and reliability, and one piece of scoped proof: **99.98% measured order-API availability over 26 months**. It also presents the page’s central question and a clear route to contact.

   The runbook begins as a recognisable closed stack with six visible tabs. Its first leaf opens slightly as the visitor starts scrolling. There is no loading sequence before the visitor can read or act.

   A second settled state introduces the library story: in 2014, you caused your first production outage by dropping a table; that is why you care about rollbacks. The first leaf opens fully, with the remaining five still visible beneath it. Its face carries the library, year and rollback reference.

   This establishes a personal reason for your method without inventing the outage’s duration, recovery or consequences.

   **A visitor can click:** any stage in the navigation, “Discuss a migration” to jump to contact, the speaking shortcut, or the control that switches the scene to its static version.

   **Desktop length:** approximately two screen heights.

2. **Shadow: the documents you work from**

   This chapter introduces your three working artifacts: the runbook, cutover checklist and rollback plan. It also names the Google SRE book and *Release It!* by Michael Nygard as influences.

   The leaves move into a stepped preparation spread. The current document comes forward, while the rollback reference remains visible behind it. The arrangement makes preparation and a route back legible.

   Faces carry the artifact names and short labels. Book references appear as text, without borrowed cover images or quotations.

   This is an editorial view of your practice. It does not claim to depict your internal architecture, checklist contents or a particular rehearsal procedure.

   **A visitor can click:** the stage navigation and a short influences disclosure if the final text needs additional space. Core information remains visible.

   **Desktop length:** approximately one screen height.

3. **Dual write: your contribution to ferry**

   This chapter presents ferry with clear attribution: a former colleague created it; you have maintained it since 2022; you wrote its cutover command.

   Two leaves align side by side. One carries the project’s origin; the other carries your maintenance and command contribution. The other four remain visible behind them, preserving the same object.

   The arrangement gives authorship space rather than compressing everything into a project badge. The adjacent text explains your contribution.

   There is no simulated terminal session until the real repository has been examined. No unconfirmed star count or claim about production adoption appears.

   **A visitor can click:** the real repository link, once supplied, and the usual navigation/contact shortcuts.

   **Desktop length:** approximately one screen height.

4. **Cutover: measured migration evidence**

   The paired leaves settle into one evidence spread. Its main face carries **99.98%**, with **Order API** and **26 months** immediately beside it.

   The text states that this is the measured availability during the migration. The next short scroll beat brings another leaf into alignment with the result, carrying the incident context: **two internal incidents, each under ten minutes**.

   Those qualifications remain visible. They are not hidden behind a tooltip or an expandable panel.

   The scene stops moving at each readable state. There is no fabricated uptime chart, incident timeline or counter animation: the material supports an aggregate measurement.

   **A visitor can click:** the public *Boring Migrations* recording when its URL is supplied. An optional detail disclosure can repeat the fuller measurement context, but the scope and incident caveat stay outside it.

   **Desktop length:** approximately one and a half screen heights.

5. **Soak: what continued beyond the change**

   The first beat presents your runbook: you wrote its first version, still own it, and 40 teams use it.

   The six leaves form an aligned evidence index, with the runbook leaf slightly forward. Its labels distinguish authorship, current ownership and adoption.

   A second leaf then advances alongside it to present the on-call result: **85 → 22 pages per week**, for the **team of nine**, over **about a year**. The text uses “we” and explains that half of the work was deleting alerts nobody needed.

   Personal ownership and team outcomes remain visibly distinct. This chapter shows both kinds of contribution without turning the team’s result into a solo achievement.

   **A visitor can click:** the public slides when their link is supplied, plus navigation and contact. Attribution remains visible rather than expandable.

   **Desktop length:** approximately one and a half screen heights.

6. **Decommission: the next conversation**

   The six leaves gather back into one open runbook. Its final spread faces the visitor and holds two actions: a migration enquiry and a speaking invitation.

   The ending answers the opening question through the evidence already shown: preparation, a route back, explicit responsibility and measured results. Final wording will be developed from those facts; it will not promise an incident-free migration.

   The migration enquiry suggests the useful information to include: the system, intended change and timing. The speaking enquiry suggests event, date and format.

   **A visitor can click:** separate email actions with different subject lines, public resources, and “Back to top”. Your email address is also visible and selectable for visitors without a configured mail application.

   **Desktop length:** approximately one screen height.

The footer follows the final spread and contains public resource links, applicable legal/privacy links, copyright and a return-to-top link.

The six stage names organise the portfolio. They do not imply that ferry, on-call work or particular incidents happened at those exact stages of Kestrel’s migration.

The desktop journey should occupy roughly **eight screen heights**, with space governed by reading rather than empty animation stretches. Scrolling stays native and reversible. The document moves between settled arrangements; it does not orbit continuously.

A compact navigation rail lists the six stages with plain-language descriptions. Each is an ordinary anchor link, so visitors can share a chapter, use browser back and skip directly to the evidence they need. Your name returns to the top. Contact remains easy to reach throughout.

Someone spending thirty seconds gets your name, your work, one scoped result and a contact route on the first screen. Completing the story never unlocks essential information.

The visual direction is **warm technical paper**.

| Element | Treatment |
|---|---|
| Background | Warm off-white, `#F2EFE7` |
| Main text | Dark ink, `#202824` |
| Links and active navigation | Deep green, `#23634F` |
| Runbook leaves | Pale paper, subtle grain, fine rules and stage tabs |
| Lighting | Soft directional light and restrained contact shadows |
| Camera | Almost orthographic, keeping the object recognisable as a document |

Green identifies actions and navigation; it does not suggest that every system remained incident-free. Stage selection also uses shape or text, so colour is never the only signal.

**IBM Plex Sans** handles body text, navigation and headings. **IBM Plex Mono** handles document labels, stage tabs and figures. Fonts are self-hosted with system fallbacks. Body text starts around 18px on desktop and 16–18px on phones, with comfortable line lengths.

The look comes from the documents you work with: careful alignment, readable annotation and restrained physical detail. The scene should feel tangible without making text difficult to read.

On a phone, the same story becomes a single column. A compact runbook view precedes each chapter, followed by its text and actions. There is no large sticky canvas consuming most of the screen. The leaves use small movements and short transitions only where performance allows.

Navigation becomes a compact stage menu with comfortable tap targets. Contact remains prominent. Nothing requires hovering, dragging, horizontal swiping or tapping a moving object. Chapter height follows the content, especially when text is enlarged.

The complete experience also works without the scene.

| Situation | What the visitor receives |
|---|---|
| Reduced motion | Static chapter illustrations; no scroll-linked camera motion, page travel or parallax |
| Visitor chooses static mode | The same text, links and illustrated arrangements |
| WebGL unavailable or lost | Static vector illustrations replacing the canvas |
| JavaScript disabled | Complete HTML page, static illustrations, native stage links and email actions |
| Slow connection | Readable content and the static illustration first; optional 3D arrives afterward |

The static illustrations preserve the same visual relationships: origin, preparation, attribution, scoped evidence and the final document. They are part of the design from the outset.

Keyboard navigation, visible focus, logical headings, readable contrast and usable zoom are required. The canvas is hidden from assistive technology because its information already exists in the page text. Short screens or enlarged text must release any sticky layout before it causes overlap.

Everything else belongs in this scope:

| Requirement | Decision |
|---|---|
| Page navigation | Include stage anchors, contact shortcuts, skip links and back to top |
| Work coverage | Include runbook, ferry and confirmed migration/on-call evidence |
| Individual project pages | Later, when enough approved material supports them |
| Contact | Include visible email and separate migration/speaking actions |
| Contact form | Omit initially; direct email meets the intended action |
| CV | Later, after correcting outdated or overly strong claims |
| Public talk and slides | Link once actual URLs are available |
| Testimonials | Later, only with genuine attributed quotes and permission |
| Languages | English initially; no assumptions about other languages |
| Search metadata | Accurate title, description, canonical URL and sitemap |
| Shared-link preview | Your name, migration focus and a runbook illustration |
| Site icon | A simple document mark derived from the six tabs |
| Missing-page experience | Plain 404 with home and contact links |
| Blog | Later, if you want an ongoing public-writing practice |
| Chat | Omit from this scope |
| Analytics | Defer until there is a defined question worth measuring |
| Legal/privacy information | Include what actual business status and data handling require |
| Hosting and domain | Reliable HTTPS, cacheable assets and fast static delivery |
| Existing-site replacement | Replace it at launch; account for known old URLs |
| Asset maintenance | Keep resource links and availability wording current |

For a future implementation, I recommend a static-first page with optional Three.js enhancement using six simple leaf meshes. Content and a static illustration load before the scene. Rendering pauses when unnecessary, mobile resolution is capped, and expensive textures are avoided.

Performance targets are approximately **250 KB compressed for the initial page** before optional 3D and **500 KB for the optional scene and engine**. Those are budgets to verify during implementation. Smoothness and readability should be checked on a mid-range phone.

Before launch, verification should cover keyboard use, zoom, reduced motion, JavaScript disabled, WebGL failure, shared chapter links, browser back, contact actions and actual mobile loading. A final content audit checks every claim against your confirmed facts.

My assumptions are recorded in [decided-for-you.md](/tmp/the method-evals/codex-reliability-with-etkuER/docs/story/decided-for-you.md): English, direct email, the paper palette, the two typefaces, a focused six-stage page and deferred extras. “Next year” informs planning for 2027 without asserting a launch date or present consulting availability.

Unconfirmed database details, the 310-services headline and GitHub stars remain excluded. Lumen stays within your stated boundary. Internal diagrams are excluded. The plan needs no photographs or employer screenshots to feel complete.

This is the full planning deliverable. Building and publication remain outside the current scope.
~~~~

# Files the agent wrote

## docs/story/concepts.md

~~~~
# Three concepts for Dawit Bekele

## Dependencies that remain

1. A real public contact address is needed before launch; the supplied example address is not treated as publishable.
2. Actual ferry and talk/slides URLs are needed for outbound links.
3. Database-upgrade claims, migration service count and additional employer detail remain excluded unless confirmed.

These do not block a text-and-3D plan. No photographs or internal diagrams are required.

## Reasoning

Trade forms considered: migration runbook, cutover checklist, rollback plan, change request, on-call handover, postmortem. Dawit explicitly works from the first three (U10); the postmortem is an exception rather than his everyday method. Each concept below uses one of those three, with one persistent object made of six similar pieces. Proposed checklist/rollback chapter names are editorial structures, not claims about the contents of Dawit's real documents.

## A — The migration runbook — selected

- **Question:** How do you approach a migration you are afraid to make?
- **Form:** the runbook, using the six supplied stage names in order: Preflight (opening, identity, origin), Shadow (how: preparation and a route back), Dual write (what: ferry and the cutover command), Cutover (work evidence: measured migration availability), Soak (outcomes: runbook adoption and team on-call work), Decommission (close: leaving the old site and starting a conversation).
- **Object:** one six-leaf runbook, modeled as six paper sheets with consistent registration marks and stage tabs. Faces carry source-backed stage names, roles and figures. The document layout is newly designed for the portfolio, not a replica of an internal runbook.
- **Three transformations:** Preflight opens the sheets from a single stack around the 2014 lesson; Dual write puts two leaves side by side to distinguish original project creator from maintained contribution; Soak aligns the six leaves into an evidence index whose faces hold 99.98%, 40 teams, and 85→22 with their scope and ownership.
- **Opening:** the first leaf opens on the library outage and why rollback matters (U07). Name, migration focus, order-API proof and contact shortcut are visible immediately; no cinematic loading gate.
- **Close:** all six leaves settle into one open runbook with an action area for migration enquiries and speaking invitations. The editorial answer is preparation with a route back and clear evidence; this is a site thesis, not a guarantee of incident-free work.
- **Stands on:** F09 stage names; U01 availability; U02 on-call attribution; U03 ferry role; U04 runbook ownership/adoption; U07 origin; U08 audience; U09 replacement; U10 practice; U11 influences.
- **Needs:** public contact and real resource links before launch. No internal screenshots, reproduction rights or commissioned 3D assets are required.
- **Why his:** its spine is his six-stage runbook, its opening is his dropped table, and its evidence distinguishes his cutover command from team outcomes.

## B — The cutover checklist

- **Question:** What should be checked before you move a live system?
- **Form:** a proposed public cutover checklist: Scope (opening and audience), Ownership (who did what), Preconditions (method and library lesson), Rehearsal (ferry contribution), Decision (migration evidence), Follow-through (adoption, team outcomes and contact). Names are proposed editorial labels; Dawit's actual checklist has not been supplied.
- **Object:** six index cards held together by one small clip. Each holds a public evidence category rather than an invented operational instruction.
- **Three transformations:** Ownership separates the creator/maintainer/contributor cards; Rehearsal presents ferry's confirmed cutover command contribution on a single card beside its attribution; Follow-through aligns the cards into a completed evidence register, leaving enquiry fields visibly open rather than pretending every operational check passed.
- **Opening:** the clipped cards fan out to reveal why rollback planning matters, anchored in the 2014 story. Name, work, proof and enquiry shortcut remain visible.
- **Close:** the cards rejoin under the clip, with space for the visitor's migration problem and a separate speaking link.
- **Stands on:** U01–U04, U07–U08, U10. No claim that these checklist headings or marks belong to an actual production document.
- **Needs:** contact/resource links; if actual checklist content is later desired, an approved public extract.
- **Why his:** the evidence checks follow his exact authorship distinctions and measured order-API result rather than a generic checklist of capabilities.
- **Tradeoff:** more concise and useful for anxious buyers, but its proposed sequence is less grounded than the supplied runbook's actual stages.

## C — The rollback plan

- **Question:** What makes it possible to go back when a change goes wrong?
- **Form:** a proposed public rollback-plan narrative: Reason (opening: library outage), Baseline (identity and practice), Paths (runbook and cutover checklist), Decision point (ferry contribution), Verification (measured migration and team evidence), Handover (contact and speaking). These are portfolio headings, not Dawit's real rollback procedure.
- **Object:** six folded plan panels joined at their edges. Each is the same paper unit; folds expose paired faces for a planned change and its evidence, without asserting an actual production recovery sequence.
- **Three transformations:** Reason unfolds the first panel on the 2014 event; Paths places the plan panels into an outward and returning route, explicitly an editorial diagram; Verification flattens them into an evidence spread with honest ownership and scope.
- **Opening:** a folded plan unfolds around the dropped-table lesson, with the thirty-second essentials alongside it.
- **Close:** the panels fold together into one plan, ending with the visitor's migration enquiry rather than an assertion that every change can be reversed.
- **Stands on:** U01–U04, U07–U08, U10–U11.
- **Needs:** contact/resource links; no internal recovery plans. An actual technical walkthrough would need further facts and disclosure review.
- **Why his:** it starts at the event he identifies as the reason he cares about rollbacks, then shows the work he actually owns.
- **Tradeoff:** strong personal origin, but a whole site about reversing changes underrepresents his migration work and could make the outage dominate.

## Selection and tests

Selected A under U12's instruction to use judgement and carry on. The user subsequently confirmed: “Go with the direction you recommend,” and requested the complete plan in the conversation, still with no building. It has a verified beginning-to-end structure, naturally carries six chapters, and makes the visitor's migration question central. B and C remain complete alternatives, not additional visual effects inside A.

All three keep the same object throughout, make faces carry evidence, provide a coherent opening/ending, avoid server-rack or particle-field emblems, and provide name/work/proof/contact without requiring a full scroll. A wins the honesty and specificity tests because its chapter order is in the supplied material rather than proposed. Removing its 3D removes the visual relationships between preparation, attribution and evidence; the equivalent relationships remain in accessible HTML.
~~~~

## docs/story/decided-for-you.md

~~~~
# Planning decisions

- Read all three material text files locally. Why: they are the supplied sources. Change: add or correct source material.
- Keep extracted claims as unconfirmed source statements with traceable references. Why: ownership, metrics and disclosure rights are not established. Change: answer the questions in facts.md.
- Do not build the website. Why: the user explicitly requested planning before implementation. Change: a later explicit build request.
- Do not fetch the example GitHub link or assume it is real. Why: the supplied URL appears to be an example and requires confirmation. Change: supply the actual project URL.

## Decisions after the user's answers

- Chose the six-stage migration runbook over a cutover checklist and rollback plan. Why: its order is supplied, it is a document Dawit owns and uses, and it holds the whole visitor journey. Change: choose B or C in concepts.md and revise the storyboard.
- Chose warm technical paper, green accent, IBM Plex Sans/Mono. Why: these come from the physical document and support clear reading. Change: use either documented alternative or request a different direction.
- Chose newly designed public document leaves, not internal screenshots. Why: internal diagrams are explicitly off limits and no visual assets were supplied. Change: add only approved public material with verified provenance.
- Treat “next year” as 2027 in planning, not as a confirmed consulting launch date. Why: session date is October 2026. Change: supply actual timing before final availability copy.
- Exclude unanswered database claims, 310-services headline, star count and additional Lumen detail. Why: delegated judgement does not confirm facts. Change: confirm them, except Lumen remains restricted unless the user's boundary changes.
- Use honest aggregate metrics, no reconstructed uptime chart, runtime CLI demo or migration topology. Why: the necessary observations/code are unavailable. Change: provide approved evidence before proposing those additions.
- Start with direct email, English, no chat, no blog, no analytics, no testimonials. Why: the requested visitor action is to write, and no source material supports these extras. Change: add each only with a concrete purpose and the necessary material.
- Use ordinary HTML plus optional six-leaf 3D; simplify on phones and substitute static illustrations for reduced motion/failure. Why: the story must remain usable regardless of hardware or motion preference. Change: adjust scene detail, not access to content.
- Keep final opening/closing copy for a later writing step. Why: the storyboard specifies facts and beats without turning provisional narrative into publication claims. Change: approve this script and develop copy within the confirmed facts.
~~~~

## docs/story/facts.md

~~~~
# Dawit Bekele — source facts

Status: read all three supplied material files. Source statements below retain their original wording for traceability; the user corrections and publication decisions below take precedence. No website has been built.

## Identity and positioning

- F01: Dawit Bekele; Rotterdam; dawit@example.com. Sources: material/resume.md, heading; material/linkedin.md, heading and location; material/old-site.md, contact. Confirm whether the email is a real public contact or a placeholder.
- F02: Staff Platform Engineer at Kestrel Freight; focus on migrations, reliability, on-call. Source: material/linkedin.md, heading.
- F03: Self-description: “I move systems that are not allowed to stop” and “I like migrations that are boring on the day.” Source: material/linkedin.md, About.
- F04: Existing site describes him as an SRE: “I keep things running.” Source: material/old-site.md. The supplied file says it is a one-page site made in 2019.

## Employment and results

- F05: Kestrel Freight, Staff Platform Engineer, Rotterdam, Aug 2020–present. Sources: material/linkedin.md, Experience; material/resume.md gives 2020–present. Confirm official title and personal responsibilities.
- F06: Resume says “Moved 310 services from on-premises data centres to the cloud with zero downtime.” LinkedIn says “Led the migration of 310 services out of two data centres, in 26 months” and reports “99.98% availability through the migration.” Sources: respective Kestrel entries. Confirm personal versus team ownership, dates, service count, availability scope and measurement, and what zero downtime means.
- F07: LinkedIn About describes the migration as work over “the last four years.” Source: material/linkedin.md, About (saved October 2026). Relationship to the 26-month migration and employment dates is unconfirmed.
- F08: Resume says Postgres 11 to 15 upgrade of a 4 TB orders database using dual writes. LinkedIn says a 4 TB Postgres upgrade “across two major versions” with dual writes and no maintenance window. Sources: Kestrel entries. Confirm versions, database size basis, production status, personal role, collaborators, and no-maintenance-window claim.
- F09: Author of company migration runbook; steps: preflight, shadow, dual write, cutover, soak, decommission. Source: material/resume.md, Kestrel entry. LinkedIn says it is now used by 40 teams. Source: material/linkedin.md, Kestrel entry. Confirm authorship/collaboration, current adoption count and definition, and permitted disclosures.
- F10: Resume says reduced on-call pages by 74%. LinkedIn identifies an on-call lead role and pages per week decreasing from 85 to 22. Sources: Kestrel entries. Confirm measurement windows, whether counts are averages, team attribution, personal contribution, and rounding (85 to 22 is approximately a 74% decrease).
- F11: Lumen Pay, Site Reliability Engineer, Amsterdam, Mar 2016–Jul 2020; on the team that ran the card authorisation path. Sources: material/linkedin.md, Experience; material/resume.md, Lumen entry. Confirm official title and actual personal work; no personal outcome is supplied.
- F12: Entoto Technical University Library, Systems Administrator, Addis Ababa, 2013–2016. Sources: material/linkedin.md, Experience; material/resume.md, library entry. Confirm title, responsibilities and any useful work example.

## Education, projects, speaking, skills

- F13: Entoto Technical University, BSc Electrical Engineering, 2009–2013. Source: material/linkedin.md, Education.
- F14: ferry: maintainer; command-line tool for dual-write cutovers; supplied link github.com/example/ferry; LinkedIn reports 1.2k GitHub stars. Sources: material/resume.md, Open Source; material/linkedin.md, Projects. Repository not fetched; link may be a placeholder. Confirm role, collaborators, actual use, public URL, and star count/date before using.
- F15: “Boring Migrations”, SRE North 2024; resume says video online. Sources: material/resume.md, Speaking; material/linkedin.md, Talks. URL, recording ownership, embed permission and exact speaker contribution are not supplied.
- F16: Linux, Kubernetes, Terraform, Postgres, Go, Python listed on old site. Source: material/old-site.md, Skills. Currency and present emphasis are unconfirmed.

## Assets and other people's material

- Only three text files were supplied. No photographs, diagrams, screenshots, 3D models, video files or testimonials are present.
- Runbook details and employer outcomes are described, but permission to show employer artifacts or detailed operational stories is unconfirmed.
- Talk recording is mentioned, but no usable link or rights information is provided.
- No specific patient, client or colleague story is supplied. No testimonial is supplied.

## Gaps

- Intended audience and desired visitor action.
- Personal role and collaborators for major results; measurement definitions and dates.
- Current daily working artifacts and rituals, in Dawit's own terminology.
- Influences or formative lessons.
- Public project and talk URLs; public contact confirmation.
- Approved visual evidence for work; disclosure and asset rights boundaries.
- Whether old-site skills and education should feature in the new site.
- What should happen to the existing site.

## Disagreements and ambiguities

- D01: Resume “zero downtime” versus LinkedIn “99.98% availability”; these may describe different measures but must not be equated without confirmation (F06).
- D02: Postgres 11→15 versus “across two major versions” (F08).
- D03: “last four years” versus 26-month migration and Aug 2020–present employment (F05–F07).
- D04: 74% versus 85→22 pages/week is compatible with rounding, but scope and time windows remain unknown (F10).
- D05: Current Staff Platform Engineer versus old site's SRE may reflect progression; current preferred identity and official titles need confirmation (F02, F04–F05).

## To confirm

Original question register, retained for traceability. Answer status is recorded below; silence does not confirm claims or rights.

1. Migration: personal role and collaborators; 310-service count, two data centres, 26-month dates; measured availability scope; meaning of zero downtime; relationship to “last four years” (F06–F07, D01, D03).
2. Database: correct versions, meaning of 4 TB, production status, personal contribution/collaborators, and no maintenance window (F08, D02).
3. Runbook: authorship, what 40 teams means/as of when, and what can be described or shown (F09).
4. On-call: measured or estimated result, measurement periods, averages or totals, personal/team attribution, work that caused the reduction (F10, D04).
5. Roles: official titles, preferred current description, and a personal-work sentence for each employer (F02, F04–F05, F11–F12, D05).
6. ferry: real URL, maintainership versus original authorship, collaborators, real-world use, star count/date (F14).
7. Talk and visuals: actual video URL, rights to link/embed, available images/diagrams/screens and who made them/what they show; employer permission and any people who appear (F15, Assets).
8. Audience and end-of-site action; confirm public contact address (F01).
9. What must not be shown, including employer/client details or people.
10. Daily documents, tools, lists and rituals in Dawit's own words; currency of the old skills list (F16).
11. Formative influence or lesson; whether to include education (F13).
12. What should happen to the old site (F04).

## User answers — 10 October 2026

Source for U01–U12: user's second message in this conversation.

- U01 / F06–F07: “Zero downtime” is too strong. Two incidents during the migration, each under ten minutes, both internal. Use measured 99.98% availability of the order API over the 26 months. Do not print zero downtime. Dates, personal migration leadership, 310 count and four-year phrasing remain unanswered and are omitted from planned claims.
- U02 / F10: 85→22 pages per week was the on-call team of nine, over about a year; half of it was deleting unnecessary alerts. User explicitly says to use “we”. Prefer the direct before/after count with attribution over a standalone 74% claim. Averaging method remains unspecified; do not call these weekly averages.
- U03 / F14: ferry was created by a former colleague. Dawit has maintained it since 2022 and wrote its cutover command. Do not claim original authorship. Actual repository URL, use in production and star count remain unconfirmed and are not planned as public claims.
- U04 / F09: Dawit wrote the runbook's first version and still owns it; 40 teams use it. Source material gives its six stage names. No internal document reproduction is authorized by this answer.
- U05 / F11: Nothing from Lumen Pay can be shown or described beyond the LinkedIn line. Restrict any mention to the existing SRE/card-payment-systems entry; no case study, screens or reconstructed operational detail.
- U06 / Assets: Kestrel talk and slides are public. Internal diagrams are not. Public status is not assumed to establish rights to reproduce or embed slides/video. Plan links when actual URLs are supplied; no internal diagrams.
- U07 / F12: First production outage Dawit caused was at the library in 2014: he dropped a table. He tells this story at the start of the talk. It is why he cares about rollbacks. Do not invent duration, impact, recovery procedure or affected people.
- U08 / Audience: Going independent next year; wants companies about to undertake a migration they fear to find him and write to him; conference organisers too. With the conversation dated 2026, next year means 2027 for planning, but no launch date or present consulting availability is asserted.
- U09 / F04: Old site can go; nothing that matters links to it. New site may replace it. Its URL is still unknown.
- U10 / Practice: Works from the runbook, cutover checklist and rollback plan. A postmortem only when something has gone wrong, “which is the point”. Do not make an incident-review form the main story.
- U11 / Influences: Google SRE book and Release It! by Michael Nygard. Textual mentions only; no book-cover assets needed.
- U12 / Delegation: “For anything I have not covered, use your judgement and tell me what you assumed. Carry on.” Authorizes choosing concept, look and routine planning decisions; does not turn unanswered factual questions into confirmed claims.

## Current answer status and remaining dependencies

- Answered or substantially answered: questions 1 (availability), 3 (runbook authorship/adoption), 4 (team attribution and timeframe), 6 (ferry role), 7 (disclosure boundaries), 8 (audience), 9 (employer boundaries), 10 (daily artifacts), 11 (influences), 12 (replacement).
- Unanswered and excluded from planned claims: question 2 (database versions/size/role), question 5 (title confirmation and extra job detail), migration service count/leadership/dates, precise GitHub star count, project production adoption, currency of skills list, education preference. Source-listed name and current role remain context; public role wording will use confirmed maintenance/runbook work rather than introduce an unconfirmed official title.
- Required before live publication: real public contact; actual ferry and talk/slides URLs if linked; actual domain/old URL for replacement; relevant legal business details when independent. No planning blocker.
- No photos, screenshots or employer artifacts are required by the selected concept. Any later addition needs provenance and permission.
~~~~

## docs/story/handover.md

~~~~
# Planning handover

## Latest state — user's third message takes precedence

- User confirmed “Go with the direction you recommend” and requested the complete plan in the conversation, still with no building.
- Runbook concept is confirmed in concepts.md. No further concept choice is needed.
- Full storyboard and click behaviour are delivered without withholding any part behind another approval request.
- No site code, paid service, publication or outreach has been created. All current work is planning documentation.
- The historical sections below record the previous stages; any statements that the concept is unselected or questions entirely unanswered are superseded by this state and the corrected fact sheet.
- Before publication: real contact; actual ferry/talk/slides links; domain, launch and business/legal details. These do not block planning.
- Next: handle requested revisions, or record a final yes to the full script if offered. No additional confirmation is required to receive the plan. Building is outside this skill version and remains explicitly excluded by the user.

## Original state

- User requested a distinctive personal portfolio plan: concept, full scroll journey, section content, colour, type, mobile behaviour and other site needs. Explicitly no building yet.
- Applied the method skill; read its main instructions and references/reading-a-profile.md.
- Read material/resume.md, material/linkedin.md and material/old-site.md in full.
- facts.md records sourced claims, missing information, disagreements and unanswered confirmation questions.
- decided-for-you.md records routine decisions.
- No concept, storyboard or site implementation has been created.

## User decisions

- Planning only is authorized.
- User has not yet answered the fact-confirmation questions or selected a concept.

## Next

1. Record each user answer beside the relevant fact; retain unanswered questions explicitly.
2. Read references/concept.md and prepare three grounded concepts with a recommendation. Record selection in concepts.md before proceeding.
3. Read references/storyboard.md and write the whole-page script with the requested visual, motion, mobile and practical details; seek storyboard confirmation.
4. Update this handover after confirmation. Building is outside this skill version and outside the current user request.

If the user declines questions or delegates all decisions, read references/asking.md before continuing.

## Current state after user's second message

- User supplied corrections, attribution, employer disclosure boundaries, personal origin, influences, audience and replacement instructions. All are recorded as U01–U12 in facts.md before concept/storyboard work.
- User delegated remaining judgement and said to carry on. Read asking.md, concept.md and storyboard.md.
- concepts.md contains three complete directions. Selected the actual six-stage runbook under delegated authority and recorded why in decided-for-you.md.
- storyboard.md contains the complete planning script: six chapters, beats, source references, persistent six-leaf object, thirty-second access, colours/type, phone/static fallbacks, other site requirements and implementation acceptance targets.
- No site code, live copy, paid service, publication or outreach exists.
- Required before publication: real contact and resource links, domain/launch/legal details. Unconfirmed facts are excluded rather than guessed.
- Next: user's yes to the storyboard or requested revisions. Keep this stop pending; no repeat fact questionnaire is needed to review the plan.
- After storyboard yes: update this handover to confirmed and explain that building is outside this skill version. User still explicitly requested planning only.
~~~~

## docs/story/storyboard.md

~~~~
# Storyboard — Dawit's migration runbook

Planning only. Dawit confirmed the recommended runbook direction and requested the full plan in the conversation, still with no building. This is a structural script with working titles and fact references, not final website copy.

## Waiting before publication

1. Confirm a real public contact address; the example email will not go live.
2. Supply real ferry and public talk/slides links if those resources are to be linked.
3. Establish domain, launch timing and any business/legal details for independent work. Do not state present consulting availability or a specific start date yet.

No database-upgrade story, 310-services headline, GitHub star count or extra Lumen detail is included. No internal diagrams or employer screens are needed.

## Idea and object

The visitor's question is **How do you approach a migration you are afraid to make?** The page follows the actual six stage names in the supplied runbook. The ending answers through preparation, a route back, and evidence of the work, then invites a migration enquiry or speaking invitation.

One six-leaf paper runbook stays visible from the opening to the close. It opens, separates, pairs its leaves, displays evidence and closes into one usable document. It is built from simple thin rectangular meshes with stage tabs, not a server-room model. Its public faces are designed anew; they do not reproduce internal documents. No particle cloud, floating technology logos, or separate set-piece scenes.

All meaningful words, figures and attribution also appear in HTML beside the scene. 3D faces are visual counterparts, never the only place a visitor can read proof or use a link. Scroll controls position continuously and reversibly; no scroll hijacking or auto-advancing story.

## Chapters

| Chapter | Name in the form | Role | Content | What the same six leaves do | Interaction |
|---|---|---|---|---|---|
| 1 | Preflight | Opening, who, origin | Name; migration focus; library outage and rollback lesson; immediate proof | Begin as a closed stack; first leaf opens and remaining tabs become visible | Jump rail, skip to enquiry, scene pause |
| 2 | Shadow | How | Runbook, cutover checklist, rollback plan; two influences | Open into a stepped preparation spread, with the return path remaining visible | Read text details; jump to next stage |
| 3 | Dual write | What | ferry maintainer since 2022; author of cutover command; original creator credited by role | Two leaves align side by side; other leaves stay attached behind them | Open repository once real URL exists |
| 4 | Cutover | Work and result | Measured order-API availability over 26 months; two internal incidents | Pair closes into a single evidence spread; a lower inset leaf holds incident context | Expand measurement context; link public talk |
| 5 | Soak | Outcomes and responsibility | Runbook first version/current ownership; 40 teams; nine-person on-call result | Leaves spread into an aligned evidence index with attribution adjacent | Open public slides when URL exists; read on-call detail |
| 6 | Decommission | Answer, next step | Preparation and rollback thesis; migration enquiries and speaking | All leaves reassemble into one open runbook with contact on the final spread | Email enquiry, speaking enquiry, back to top |

These are public portfolio interpretations of the runbook stages. They do not imply that ferry, on-call work, or any particular incident occurred at a specific phase of the Kestrel migration.

## Beats

Screen counts are approximate viewport heights on desktop, including reading space. Target about eight viewports total; extend naturally for larger text. On mobile each beat takes the height its content needs. No artificially long empty scroll stretches.

### 1. Preflight

| Beat | Screens | Arrangement | Faces | Addition | Working title and fact basis |
|---|---|---|---|---|---|
| 1A | 1 | Stack, slight opening; scene already recognisable at rest | Dawit Bekele; Preflight tab; six stage names | HTML name, migration focus, 99.98% proof with scope, question, enquiry shortcut | Introduction: F01, U01, U08, U10; no unconfirmed official title |
| 1B | 1 | First leaf lies open, remaining five visible as the bound stack | Library; 2014; rollback plan | Plain-text origin; no dramatized outage animation | Dropped-table lesson: U07; no invented recovery or impact |

### 2. Shadow

| Beat | Screens | Arrangement | Faces | Addition | Working title and fact basis |
|---|---|---|---|---|---|
| 2A | 1 | Stepped spread; the rollback leaf remains visible behind the current leaf | Runbook; cutover checklist; rollback plan; text-only book references | HTML explanation of his stated working artifacts; short influences detail | Working method: U10–U11; no fabricated actual checklist items or book quotations |

The layout shows preparation and the ability to look back. It is an editorial diagram, not an internal system topology. Do not infer a particular rehearsal method from the Shadow stage name.

### 3. Dual write

| Beat | Screens | Arrangement | Faces | Addition | Working title and fact basis |
|---|---|---|---|---|---|
| 3A | 1 | Two leaves side by side with shared alignment marks; four remain visible behind | ferry; Maintainer since 2022; Cutover command; Original creator: former colleague | HTML contribution/credit block and eventual repository link | Maintained work: U03; no invented CLI syntax or claims of production adoption |

The pairing exposes who created the tool and what Dawit contributed. It does not pretend to visualize ferry's actual runtime behaviour. A command demo can be planned later only after the real repository has been read.

### 4. Cutover

| Beat | Screens | Arrangement | Faces | Addition | Working title and fact basis |
|---|---|---|---|---|---|
| 4A | 1 | Single open evidence spread, other leaves visible below | 99.98%; Order API; 26 months | Measured scope in persistent HTML | Migration evidence: U01 |
| 4B | 0.5 | Lower leaf slides into alignment with the result rather than disappearing behind it | Two internal incidents; each under ten minutes | Always-visible incident summary; optional additional explanation disclosure | Honest incident context: U01; never a zero-downtime claim |

No fake live counter, uptime graph, or incident timeline. The material supplies an aggregate metric, not the observations needed to plot one.

### 5. Soak

| Beat | Screens | Arrangement | Faces | Addition | Working title and fact basis |
|---|---|---|---|---|---|
| 5A | 1 | Six leaves form a readable index, one forward for the runbook | First version; Current owner; 40 teams | HTML distinguishes document ownership from adoption | Runbook ownership: U04; six headings from F09 |
| 5B | 0.5 | A second leaf advances beside the first; ownership labels stay in place | 85→22 pages/week; Team of nine; About a year | Team attribution; alert-deletion detail; planned copy must use “we” | On-call team result: U02; not a solo outcome |

No testimonial carousel: none has been supplied. No company logos that imply endorsement.

### 6. Decommission

| Beat | Screens | Arrangement | Faces | Addition | Working title and fact basis |
|---|---|---|---|---|---|
| 6A | 1 | Leaves return to one open runbook, the final leaf facing the reader | Migration enquiry; Speaking invitation; rollback-plan reference | Accessible contact links; public talk/resources when supplied | Next conversation: U07–U10; no guarantee, pricing or invented service package |

The concluding answer is an editorial synthesis of the evidence. Final opening and closing sentences will be written after storyboard review. The library story is an origin, not the final sales pitch. The old portfolio can be replaced (U09); no theatrical deletion of actual user data occurs.

## For someone with thirty seconds

The first screen shows Dawit's name, migration work, and measured 99.98% order-API availability over 26 months. It includes an enquiry shortcut. A small desktop rail lists all six stages and makes each an ordinary anchor link. Each stage link also has a short plain-language description, so visitors need not know migration terminology. Public work and speaking links are accessible through the rail/contact area, not unlocked by finishing the animation.

## Phone and fallbacks

Interaction details: native stage anchors support shared links and browser back; the name returns to the top. A global enquiry shortcut jumps to the final spread. The scene has a visible static-mode control and requires no dragging or hotspots. Resource links are included only once real URLs are supplied. Metric qualifications and team attribution remain visible, even if optional native detail disclosures are used. Final contact actions use separate migration/speaking mailto subjects, plus a selectable visible address for people without a configured mail client. Suggested enquiry topics are system/change/timing for migrations and event/date/format for speaking. The footer holds public resource links, back to top, and applicable legal/privacy links.

| Situation | Experience |
|---|---|
| Phone | Single-column text. A compact view of the same runbook precedes each chapter; no split-screen sticky scene taking most of the viewport. Small rotations and short transitions only when performance allows. Tap-sized stage navigation in a compact menu; enquiry stays easy to find. No hover-only interactions or required horizontal swiping. |
| Reduced motion | No scroll-linked camera movement, page travel or parallax. Six static chapter illustrations show the equivalent arrangements. All text and links remain identical. A visible pause control also lets anyone choose the static version. |
| No WebGL / context loss | Static vector illustrations of the six-leaf runbook replace the scene; HTML remains readable and retains every evidence relationship and attribution. |
| No JavaScript | Complete server-rendered/static HTML document, native anchors, contact links and static illustrations. A navigation label such as “Stages” remains visible without custom controls. |

Keyboard users can navigate everything without interacting with the canvas. Decorative canvas is hidden from assistive technology. Use proper heading order, visible focus, meaningful link labels, sufficient contrast, responsive text and usable zoom. The sticky layout must release before overlap at short viewport heights or enlarged text.

## Colour, material and type

Three paper-based looks were considered. Choose the first for the plan; changing the look does not change the structure. Do not build a theme picker just to resolve taste.

| Look | Ground | Ink | Accent | Runbook surface |
|---|---|---|---|---|
| Selected: warm technical paper | #F2EFE7 | #202824 | Deep green #23634F | Off-white leaves, subtle fibre, fine registration rules and soft contact shadows |
| Alternative: cool drafting paper | #EDF1F3 | #182B38 | Blue #205CC0 | Pale blue-grey leaves, precise rules, minimal grain |
| Alternative: night desk | #17201E | #F2EFE7 | Pale amber #E8BB71 | Warm pale leaves under restrained desk-like lighting; labels on leaves use dark ink |

Warm paper suits the artifacts Dawit uses and supports long reading. Deep green is a navigation/action accent, never a signal that all systems stayed incident-free. Do not use colour alone to indicate current stage or ownership. Validate text/control contrast during implementation.

Use **IBM Plex Sans** for body, navigation and restrained editorial headings; **IBM Plex Mono** for stage tabs, document labels and figures on the leaves. Self-host licensed font files, with system sans/monospace fallbacks. Body text starts around 18px on desktop and 16–18px on phones; line length around 60–70 characters. No huge all-caps manifesto, tiny terminal text, or decorative code dump.

The scene uses soft directional light, shallow depth and an almost orthographic camera so the object remains a document. Any paper grain is optional and very light. Text is never blurred, mirrored or dependent on the canvas for legibility. Animation slows into settled, readable arrangements rather than continuously orbiting.

## Everything else

“Build” means include in a future implementation scope, not build now. All rows below are decisions delegated to the assistant under U12, unless otherwise stated.

| Need | Build, later or never | Decision and purpose |
|---|---|---|
| Navigation | Build | Six-stage anchor rail/menu, skip links, enquiry shortcut, back to top; assistant |
| Individual project pages | Later | Only if ferry or an approved migration case has enough verifiable material to justify a deep link; assistant |
| Every project listed | Build | Include all publication-ready work supplied: runbook and ferry; no invented projects or unconfirmed database case; assistant |
| Contact and CV | Build contact; later CV | Real email links with separate migration/speaking subjects. Optional accessible CV after outdated claims are corrected; assistant |
| Testimonials | Later | Only genuine, attributed, permissioned quotes; no filler; assistant |
| Languages | Build English; later others | Material is English; no assumptions about languages Dawit speaks; assistant |
| Share preview and icon | Build | Name, migration focus, runbook illustration; accurate title/description, canonical URL and social preview. Simple six-tab document icon; assistant |
| Missing-address page | Build | Plain 404 with home and contact links; assistant |
| Blog | Later | Public migration notes only if Dawit wants to sustain them; assistant |
| Chat | Never for this scope | Direct contact matches the requested action and avoids an unnecessary system; assistant |
| Legal notice | Build if required at launch | Confirm requirements from actual business status/jurisdiction; plan privacy disclosure appropriate to any collected data. No invented business registration details; assistant |
| Analytics | Later | Start with no tracking; add only to answer a defined question about enquiries; assistant |
| Existing site replacement | Build at launch | User U09 approves replacing it; map known old URLs when domain details arrive |
| Hosting, domain, HTTPS | Build at implementation | Fast static-first delivery, reliable HTTPS and cacheable assets; paid choices remain outside current authorization |
| Forms | Never for initial scope | Use direct email first; no form backend or personal-data store required; assistant |

## Technical direction and acceptance checks for a future build

- Use a static-first site with HTML content and an optional Three.js scene using the six shared leaf meshes. No physics engine, photogrammetry model, video introduction or heavy 3D asset pipeline is needed.
- Load HTML, fonts and the static runbook illustration before optional 3D. If loading fails, the visitor keeps the complete site. Render only when scene state changes; pause off-screen and cap mobile pixel density. A motion preference change must take effect without a reload.
- Target an initial page transfer below roughly 250 KB compressed before optional 3D, with the optional scene/engine budget around 500 KB compressed. These are implementation targets, not measured performance claims. Avoid custom texture atlases and per-face high-resolution images where simple text/vector surfaces suffice.
- During implementation check phone readability, keyboard flow, reduced motion, disabled JavaScript, WebGL failure/context loss, browser back and anchor links, zoom, and contact link accuracy. Measure loading and scroll smoothness on a mid-range phone, then reduce scene work if needed.
- Audit every personal claim against facts.md; keep U01 scope adjacent to 99.98%, U02 team ownership adjacent to 85→22, and U03 authorship next to ferry. Verify links and exclude placeholder contacts before launch.
- No publishing, paid services, client outreach or implementation is authorized by this planning document.

## Review

The recommended concept is confirmed. This full script is delivered for review without withholding any part behind another approval request. Concept, paper direction, two typefaces, shortened desktop journey, phone layout, fallbacks, navigation and deferred extras were selected under delegated judgement. Planning does not authorize building or publication; requested revisions should update this document and the decision log.
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
