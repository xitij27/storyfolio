I’ll record the folding dossier as your chosen direction and expand it into the full page specification, including each scroll state, clickable controls, phone behavior, fallbacks, and supporting features. This remains planning only.


The direction is **the Folding Project Dossier**: one long page, with six connected 3D panels that open into an index, bring individual projects forward, then gather again beside your contact details.

The complete specification is saved in [storyboard.md](/tmp/storyfolio-evals/codex-analyst-hurried-with-KngXp5/docs/story/storyboard.md). This is planning only; nothing has been built.

Three content dependencies stay outside the proposed public page:

1. Disputed numbers and unclear contributions, deployment status, titles and credits.
2. Employer images and the recommendation, whose permission to use is unresolved.
3. Real contact and project destinations—the supplied example addresses won’t become live links.

**The idea behind it**

The page answers **“What does Rafael’s work cover?”** Visitors first see the whole portfolio, inspect its parts, then return to the overview with a clear next action.

The dossier is a presentation designed for your portfolio. Its six panels contain:

- The index.
- Lisbon Rent Map.
- FraudShield.
- AutoPilot.
- Your listed tools.
- Background on one face, contact on the reverse.

The same object stays present throughout. Its movement shows which part of the portfolio the visitor is reading.

I’m designing for hiring managers and potential collaborators: someone should be able to understand the scope in thirty seconds, or stay longer to inspect the work.

**1. Index — the opening**

The first screen shows Rafael Costa, Lisbon, and the three project names. Visitors immediately have links to each project and a shortcut to contact.

The dossier starts partly open, with its tabs already readable. As the visitor scrolls, its six panels unfold into a shallow fan. The opening takes roughly one to one-and-a-half screen heights, including the settled overview.

The panels use original typography, fine rules and index marks. There’s no opening loader or animation visitors must wait through.

**Clickable:** each project name, the site name linking back to the opening, chapter navigation, and the contact shortcut.

This screen establishes the portfolio’s scope. A genuine project artifact would strengthen its proof later; none has been supplied yet.

**2. Context — a short background**

This section gives the undisputed education detail: BSc Economics, Universidade do Douro, 2017–2020.

The background face of the final panel turns toward the reader. The project panels fold beside it, leaving their tabs visible so the visitor retains a sense of the whole.

Background text sits in ordinary HTML alongside the scene. The section remains brief. The unresolved MSc year, founder status and role details stay out.

**Clickable:** chapter and project navigation. There is no extra interaction attached to the education text.

**3. Exhibit 01 — Lisbon Rent Map**

This is the first project because its subject is the clearest in the material: a map of room costs by Lisbon parish. That ordering is an editorial decision, not a claim that it is your earliest or most important project.

Its panel comes forward and opens flat toward the reader. The other panels remain folded at the edge. Once it settles, the visitor gets time to read without further movement.

Initially, the face carries the project title and a typographic treatment of its stated topic. I would not invent a map, rent values or heat-map data.

The record can later accommodate a genuine image, your contribution, data sources, limitations and a verified project link.

**Clickable:** back to the index, next project, and the persistent navigation. A live-site link appears only when there is a real destination. An expandable record appears only when there is additional material to read.

**4. Exhibit 02 — FraudShield**

Lisbon Rent Map folds back and FraudShield takes the same reading position. The camera, lighting and transition language stay consistent.

The current public record is deliberately short: the project name and its place in your portfolio. Its description as a real-time system needs clarification before the page makes claims about implementation, usage or your contribution.

The face uses an original title composition. It won’t display invented alerts, accuracy scores, code or a banking interface.

**Clickable:** previous project, next project, index and chapter navigation. There is no empty “View case study” button.

**5. Exhibit 03 — AutoPilot**

FraudShield folds away and AutoPilot comes forward.

This follows the same record structure. The present material supports its inclusion as a named project; deeper claims about the platform, deployment and authorship remain excluded.

Its face uses the dossier’s typography and index system. A genuine interface or artifact could replace that treatment later.

**Clickable:** previous project, continue to Toolbox, index and chapter navigation.

The three exhibits share a structure so visitors can compare them easily. Their lengths follow the available content; sparse records do not get extended scroll sequences.

**6. Toolbox — the listed skills**

This section shows SQL, Python, Tableau, Power BI, dbt and Statistics.

The toolbox panel opens beside a compact fan of the three project tabs. This brings the portfolio back toward an overview after the focused exhibits.

The skills appear as readable text. They do not receive proficiency percentages, ratings or connections to particular projects that the material hasn’t established.

**Clickable:** project links and continue to contact. Skill names themselves are selectable text.

**7. Next step — the close**

All six panels gather into the indexed fold again. The contact face turns toward the reader, while the three project names remain accessible.

The ending presents the complete portfolio scope and a direct contact action. It also lets visitors return to a project immediately.

**Clickable:** a real email or professional-profile link, the three project links, and return to index. A small Copy email control could be added as a convenience, with accessible confirmation.

The footer contains your name, useful navigation, actual contact and any required legal link.

**Navigation and scroll behavior**

Desktop gets a compact chapter rail with the current chapter identified by text and colour. The main navigation provides Work, project choices and Contact.

Every navigation control is an ordinary HTML link. Selecting a distant chapter takes the scene directly to that chapter’s settled arrangement; it doesn’t replay every intervening fold.

Scrolling uses the browser’s normal behavior. Scrolling backward reverses the same transitions. Deep links, browser back and scroll restoration remain usable.

The desktop sequence should occupy approximately seven to eight viewport heights, adjusted to actual text length. Most of that space is for reading.

**The look**

The selected palette is warm paper, dark ink and vermilion:

| Element | Colour |
|---|---|
| Background | `#F2EEE5` |
| Main text | `#202724` |
| Accent | `#BC3F2E` |

Panels have matte off-white faces, thin graphite rules, small corner numbers and soft shadows. The accent marks selected tabs, links and focus states.

**Source Sans 3** handles headings and body text. **IBM Plex Mono** handles short labels, panel numbers and metadata. Paragraphs stay in the sans serif face.

On desktop, your name is approximately 72–112px; body text is 18–20px with comfortable spacing and moderate line lengths.

The scene occupies roughly half the viewport beside a readable text column. Perspective is shallow, and the active panel faces the reader. Motion uses one controlled folding language throughout.

**On a phone**

The seven chapters become a normal vertical page.

Each chapter has a compact dossier illustration above its text. Project records fill the available width. There is no long pinned scene, mandatory dragging or text squeezed into a small 3D surface.

Navigation tabs wrap, controls have at least 44px tap targets, and body text stays at least 16px. The name reduces to roughly 40–56px.

Short inline transitions can remain where performance allows. The reading experience works independently of them.

**Without the 3D**

| Situation | What visitors get |
|---|---|
| Reduced motion | Static panel arrangements; ordinary anchor navigation. |
| No WebGL | SVG or HTML dossier illustrations with the same labels and index. |
| No JavaScript | Every section and link in static or server-rendered HTML. |
| Slow connection | Readable content and simple illustration first; 3D loads afterward. |
| Keyboard or screen reader | Semantic headings, skip link, visible focus and logical reading order. |

All meaningful text and controls exist in HTML. The canvas duplicates that presentation and is hidden from assistive technology. Browser zoom, text selection and natural scrolling remain available.

**Everything else the site needs**

| Feature | Planned scope |
|---|---|
| Chapter navigation | Include anchors, current-section indicator and contact shortcut. |
| Project inventory | Include all three projects on the main page. |
| Separate project pages | Add later when substantive case-study material exists. |
| Contact | Include a direct link once a real destination is available. |
| CV download | Add after factual discrepancies are resolved and a public version is prepared. |
| Testimonials | Add only with permission and accurate attribution. |
| Languages | English initially; Portuguese can follow. |
| Sharing | Page title, description, canonical URL and an original dossier social-preview image. |
| Site icon | A simple folded-tab mark derived from the object. |
| 404 page | A short page linking back to the index and contact. |
| Accessibility | Target WCAG 2.2 AA, including keyboard, contrast and fallback behavior. |
| Performance | Load readable content first; defer the lightweight scene and pause unnecessary rendering. |
| Hosting and domain | Choose during a future implementation phase. |
| Legal/privacy information | Determine what applies to the operator, hosting and actual features before publication. |
| Blog, chat and analytics | Outside the initial scope. |
| Contact form | Outside the initial scope; use direct contact. |

A future build would use one shared lightweight 3D scene with six simple panel meshes. Before release, it would need checks on small phones, keyboard navigation, reduced motion, missing JavaScript/WebGL, deep links, actual contact destinations and mobile performance.

The full plan, content boundaries and interaction details are recorded in the [storyboard](/tmp/storyfolio-evals/codex-analyst-hurried-with-KngXp5/docs/story/storyboard.md); the reasoning behind the choices is in [decided-for-you.md](/tmp/storyfolio-evals/codex-analyst-hurried-with-KngXp5/docs/story/decided-for-you.md).
