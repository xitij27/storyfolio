I’ll confirm The Job Card as the chosen direction and give you the complete page plan, including every scene, interaction and fallback. This remains planning only.


The direction is **The Job Card**: a portfolio organised like the document you use at the co-op, carried through the page by one packet of six 3D cards.

Its guiding question is **“How do you know a design works?”** Your projects give it a credible answer: record the problem, show your contribution, distinguish predictions from observations, and state what still needs checking. That is the story the page tells—not a claim that every project succeeded or is finished.

The design decisions below are mine, made under your instruction to use judgment. Unconfirmed facts stay unconfirmed: asset permissions, the bracket’s comparison baseline and your precise redesign role, current placement/contact details, and the restoration’s present condition.

**The page, in order**

The desktop experience has six chapters, roughly six screen-heights in total. Each chapter contains one settled arrangement of the same cards and a concise block of readable text. Scrolling connects those arrangements; it never forces a visitor to watch an animation before reaching the work.

**1. Reported problem — the opening**

The first screen establishes your name, mechanical engineering student identity, placement purpose and immediate evidence of your work.

A compact project summary identifies your gear train and housing contribution to the four-person charger project. Its weak performance is available straight away rather than concealed until the end. The opening also introduces the guiding question.

The six cards sit in a slightly angled packet. If cleared for use, the top face carries your photograph of the bike parts laid out on the garage floor. A charger tab protrudes beneath it. The object’s origin is visible immediately: your actual documentation of actual parts.

As scrolling begins, the packet opens slightly. There is no spinning entrance or loading sequence.

Visitors can click:

- **Bracket, Charger or Bike** to jump directly to that project.
- **Method** to reach your working process.
- **Contact** to skip to the close.
- **CV** to download the current document.

Someone who never scrolls still gets your name, field, a concrete contribution and a route to contact you.

**2. Findings — how you investigate**

This chapter explains your confirmed job-card sequence: what the customer reports, what you find, the parts, what you do, and the test ride. The workshop logbook appears as your other working document.

The rear-wheel blog summary supplies a specific example: the problem was a cracked hub flange under grease rather than the rim. It supports the distinction between a reported problem and an inspected finding. It does not establish that the repair is complete.

The packet fans out. Two cards move forward into separate **Report** and **Finding** positions; the other four remain visible behind them. An original field diagram carries the process. A cleared photograph of the actual hub can accompany the example.

Visitors can open the photograph at a readable size or follow the relevant full blog post once a working address is available. No real customer job cards or invented customer quotations appear.

**3. Parts — the work available to inspect**

This is the complete project index:

- **Pedal-box mounting bracket:** CAD/simulation work; manufacturing and physical testing still outstanding.
- **Hand-crank phone charger:** a functioning first-year group prototype, with your gear train and housing contribution identified.
- **1984 steel road-bike restoration:** component photographs and the documented investigations described in your writing.

The cards arrange into three pairs, one pair per project. Each pair carries a clear project identifier and either a permitted photograph/CAD view or a factual diagram. The projects remain separate; their parts never assemble into a fictional machine.

A compact tools line gives your stated skills without ratings: SolidWorks, MATLAB, some Python, and workshop induction for lathe and mill.

Visitors can open any project’s detail page. Those pages provide depth without stretching the main scroll.

**4. Work carried out — your contribution**

This chapter makes individual responsibility easy to assess.

The charger leads because your role is confirmed: **gear train and housing**, within a group of four. The bracket’s exact division of responsibility remains a content item to settle. The restoration uses your documented material without inventing particular repairs or outcomes.

The charger cards move forward into a responsibility diagram. Your contribution occupies one clearly labelled area; the group-project context occupies another. The remaining project tabs stay visible.

Visitors can select another project record or open its detail page. The selection uses normal buttons and links; the scene mirrors it. Nobody needs to click a small moving surface in 3D.

There is no invented iteration history, client brief or account of what your teammates designed.

**5. Test ride — what the evidence supports**

This is the page’s most important comparison.

Three project records align side by side:

| Project | Evidence the page can show |
|---|---|
| Charger | Your reported observation: four minutes of cranking for one percentage point of charge. It functioned, poorly. |
| Bracket | Predicted reduction in CAD/simulation; not yet manufactured or physically tested; machining planned for November. |
| Restoration | Documentation and investigations. Completion and test-ride outcome remain unspecified. |

The **18%** figure stays conditional until its comparison baseline is known. When used, the baseline and predicted status appear directly beside it. “Simulation” does not become a claim of structural validation.

“Test ride” comes from your job-card form. Here it introduces verification; it does not imply that every project has undergone a physical test.

The cards settle into a comparison row with prominent status fields. There are no animated counters, scores or celebratory completion stamps.

Visitors can read supporting context, open a project record or jump to contact. The charger observation is not extrapolated into a full-charge estimate, and its poor performance receives no invented explanation.

**6. Handover — the close**

The final screen brings together the evidence and outstanding checks. The closing answer will be developed from those facts: knowing what works requires a recorded observation and clarity about what remains unverified.

The six cards gather into their original packet. Project tabs and status fields remain visible, so the object closes without suggesting that unfinished work is complete.

Beside it sit the practical next steps:

- Email you.
- Download your CV.
- Return to a project.
- Visit Slow Miles, once its live address is confirmed.

There is no testimonial section or claim of readiness beyond what the work supports.

**The look**

The chosen palette comes from the job-card material:

| Element | Colour |
|---|---|
| Page ground | Warm paper `#F1EDE4` |
| Main text | Graphite `#252925` |
| Accent and links | Workshop blue `#275F78` |
| Card faces | Matte off-white `#FAF7EF` |

The cards have slight thickness, fine field rules and restrained shadows. Photographs and CAD supply the visual detail. The design does not invent handwriting, grease marks or distressed workshop textures.

**Source Sans 3** handles headings and prose. **IBM Plex Mono** handles project identifiers, card fields and status labels. Body text is around 18–20px, with comfortable spacing and a readable line length. Large headings establish hierarchy; oversized slogan typography does not crowd out evidence.

Desktop composition places the scene beside the text. Project identifiers and the chapter rail remain consistent throughout.

**How motion behaves**

The browser keeps its normal scrolling. Chapter text determines the reading pace; the cards move between stable arrangements alongside it.

The same six pieces remain identifiable throughout. Camera changes are small and preserve legibility. There are no long orbits, looping movement, sound or cursor replacement.

Every essential interaction lives in ordinary HTML. Buttons and links have visible keyboard focus. Clicking a chapter link goes directly to its content and settled scene state.

**On a phone, and without 3D**

| Situation | Experience |
|---|---|
| **Phone** | One column, natural section heights, readable text and full-width evidence images. A small static packet image opens the page; subsequent cards sit beside their related text. Compact project/contact navigation and generous tap targets. No pinned canvas or hover-only controls. |
| **Reduced motion** | Static chapter arrangements or ordinary evidence cards. No parallax, scroll interpolation or automatic movement. |
| **No WebGL** | The same project images, contribution fields and status information rendered as HTML cards. No error screen between the visitor and the work. |
| **No JavaScript** | The complete story and static project pages remain readable. Native links, email and CV download work. No project evidence is trapped inside an interactive selector. |

The 3D organises evidence; it does not become its only container. Canvas text has readable HTML equivalents, and images have useful alternative text.

**Everything else the site needs**

| Item | Planned scope |
|---|---|
| **Navigation** | Chapter/project links, contact shortcut, skip-to-content link and direct anchors that can be shared. |
| **Three project pages** | Bracket, charger and restoration. Each shows confirmed context, your role, permitted artefacts, outcome/status and outstanding checks. Missing evidence does not get padded with invented case-study prose. |
| **Complete project listing** | All three projects on the main page. The co-op supplies working context, without an invented repair case study. |
| **Updated CV** | Correct placement target; remove the misattributed team placing and guessed bike count. Provide an accessible download. |
| **Contact** | Verified public email. No contact form initially. |
| **Blog** | Link to the existing Slow Miles site once verified. No new CMS or migration in this plan. |
| **Shared-link previews** | Your name, factual description and a static packet image or original diagram. Individual project pages get their own previews. |
| **Site icon** | A simple card-tab motif derived from the page object. |
| **Search visibility** | Descriptive titles, crawlable pages, sensible metadata, canonical addresses and sitemap. |
| **404 page** | A brief missing-page message with home, project and contact links. |
| **Language** | English initially. |
| **Testimonials and chat** | Omitted. |
| **Analytics and embeds** | Omitted initially; no unnecessary tracking or third-party widgets. |
| **Legal information** | Determine applicable notice/privacy requirements before publication, based on the actual publisher and hosting arrangement. |
| **Performance** | Compressed images, simple card geometry, bounded texture sizes and optional scene loading after useful content. Pause rendering when idle or offscreen. |
| **Accessibility and checks** | Keyboard navigation, focus order, contrast, image descriptions, mobile reading, reduced motion, fallbacks, direct links and factual review. |

The asset list is a cleared garage-floor overview, selected bike/component photographs, permitted bracket CAD views, a charger photograph or permissible schematic, and your current CV/contact details. Until assets are cleared, the design can use original process diagrams without pretending they reproduce unseen geometry.

The complete plan is saved in [storyboard.md](/tmp/storyfolio-evals/codex-student-with-uxlrRb/docs/story/storyboard.md), with the reasoning and assumptions in [decided-for-you.md](/tmp/storyfolio-evals/codex-student-with-uxlrRb/docs/story/decided-for-you.md). The Job Card direction is recorded as confirmed. **No website has been built.**
