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

The full plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-reliability-with-rEkPcS/docs/story/storyboard.md), with the factual record and decisions alongside it. Only planning documents have changed; no website has been built.
