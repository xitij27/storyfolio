I’ll take your choice of the runbook direction as settled and give you the full page plan here, including each scroll beat, clickable elements, mobile behaviour, fallbacks and launch requirements. This remains planning only.


The direction is settled: **your portfolio becomes a migration runbook that unfolds as the visitor scrolls**. Its six stages carry someone from understanding your work to writing about their migration or inviting you to speak.

The complete plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-reliability-with-etkuER/docs/story/storyboard.md). Nothing has been built.

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

My assumptions are recorded in [decided-for-you.md](/tmp/storyfolio-evals/codex-reliability-with-etkuER/docs/story/decided-for-you.md): English, direct email, the paper palette, the two typefaces, a focused six-stage page and deferred extras. “Next year” informs planning for 2027 without asserting a launch date or present consulting availability.

Unconfirmed database details, the 310-services headline and GitHub stars remain excluded. Lumen stays within your stated boundary. Internal diagrams are excluded. The plan needs no photographs or employer screenshots to feel complete.

This is the full planning deliverable. Building and publication remain outside the current scope.
