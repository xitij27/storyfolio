The site should present you as the person a company contacts when a migration feels risky. Its distinction comes from making your judgment visible: the sequence, the checks, the cutover, and the way back.

**The direction is “A way forward. A way back.”** A restrained 3D infrastructure model explains that approach as visitors scroll. Your work, measurements, and personal story give it substance.

I recommend one complete homepage, plus a dedicated speaking page. The homepage should contain enough evidence to support an enquiry without requiring visitors to open additional case studies.

1. **Navigation and first impression**

   A compact header contains **Dawit Bekele**, **Work**, **Approach**, **Speaking**, and **Contact**. Your name returns to the top; Work, Approach, and Contact link to sections; Speaking opens the speaking page.

   Keep the header visible as visitors scroll, with a solid background once it passes the opening. Include a keyboard-accessible “Skip to content” link.

   On mobile, use a simple menu button with clearly labelled destinations. Opening and closing it should require no animation to understand.

2. **Opening: the promise**

   Suggested headline:

   > **Move the system.  
   > Keep a way back.**

   Supporting copy:

   > I’m Dawit Bekele, a Staff Platform Engineer in Rotterdam. I work on migrations, cutovers, and the reliability of systems that need to keep running.

   Add a concise availability line describing the move to independent work next year. Its exact wording depends on when the site launches; it should distinguish future availability from your current employment.

   Two visible actions:

   - **Tell me about your migration** → the contact section.
   - **See the migration work** → the flagship project.

   **The 3D:** A matte, architectural model sits beside the headline. It shows an existing environment, a destination, and a return route. Small signals establish that this is a working system. Labels make the routes understandable.

   On the first scroll, the camera shifts slightly to reveal both environments. Visitors do not need to drag, rotate, or manipulate the model. The scene is explanatory, and navigation works immediately.

   **Phone and fallback:** Headline, introduction, buttons, then a compact static diagram. The opening should fit comfortably into roughly the first two screens on a phone.

3. **Recognition: the migration they are worried about**

   This short section connects your experience to the visitor’s situation:

   > A live service needs to move. A database needs an upgrade. The cutover has a date, but the team needs a clearer answer to “Are we ready?” and “What if we have to go back?”

   Follow with:

   > My work starts with the runbook, the cutover checklist, and the rollback plan.

   This introduces your approach without inventing consulting packages or promising outcomes.

   **The 3D:** Both environments remain visible. The return route becomes easier to see, preparing visitors for the method section.

   **Click:** **See how I plan the move** → Approach.

   **Phone and fallback:** Text plus a small diagram labelled “Current,” “Destination,” and “Return route.”

4. **Flagship work: moving Kestrel Freight**

   Introduce the operational problem before the metrics:

   > At Kestrel Freight, I led the migration of 310 services out of two data centres over 26 months, while freight operations continued.

   Display the principal measurement with its scope attached:

   > **99.98% order API availability**  
   > Measured over the 26-month migration.

   Include the qualification in the same section:

   > There were two internal incidents during the migration, each lasting under ten minutes.

   Do not describe the work as “zero downtime” or suggest that the two incidents account for all measured unavailability.

   The written story should cover:

   - The operating constraint: systems supporting ongoing freight operations.
   - Your responsibility: leading the migration.
   - The scale and duration.
   - The migration approach, using only confirmed details and public material.
   - The measured result and the incidents.

   **The 3D:** Service groups progressively move from the existing environment to the destination. Keep the count in text rather than rendering 310 individual objects. Brief annotations explain what changes.

   Label the scene **“Illustrative migration model.”** It should not resemble a published internal topology or claim to reproduce the migration’s chronology.

   **Clicks:** **Explore the approach** → the next section; **Watch “Boring Migrations”** → the verified public recording. Give this section a shareable `#migration` link.

   **Phone and fallback:** A simple before-and-after diagram, followed by the full written account and measurements.

5. **Approach: the documents and decisions**

   This is the interactive centerpiece. On desktop, a short sticky diagram sits beside six steps in ordinary page flow. Scrolling changes the diagram’s state.

   | Step | What the section explains | What the 3D does |
   |---|---|---|
   | **Preflight** | Establish readiness, responsibilities, and the conditions for proceeding. | Identifies source, destination, and routes. |
   | **Shadow** | Explain how the destination can be checked before taking responsibility for live traffic, using confirmed details. | Reveals a secondary path into the destination. |
   | **Dual write** | Show the purpose of writing to both environments and checking their behavior. | Two labelled write paths appear. |
   | **Cutover** | The checklist supports a deliberate go/no-go decision. | The primary route changes destination. The return route stays visible. |
   | **Soak** | Observe the new state before retiring the old one. | Holds the destination active while the old environment remains available. |
   | **Decommission** | Retire the old environment after the necessary checks. | The old geometry recedes and its routes disappear. |

   Present the three working documents alongside the sequence:

   - **Runbook:** the order of operations and ownership. State: “I wrote the first version and still own it. Forty teams use it.”
   - **Cutover checklist:** the evidence needed to proceed and the conditions for stopping.
   - **Rollback plan:** the route back and the decisions that trigger it.

   Include a visible **Show the rollback route** control at the cutover stage. It switches the diagram to an illustrative return sequence, with an equivalent written explanation. A **Return to the migration sequence** control restores the forward view.

   This interaction illustrates a principle. It must not imply that it reconstructs either Kestrel incident.

   Excerpts should come from public talk material or be clearly labelled illustrative examples approved by you. Do not publish internal working documents.

   **Phone and fallback:** Six stacked diagrams and their explanations. The rollback example expands inline as a static diagram and text. No sticky scene or horizontal scrolling is necessary.

6. **A closer example: the database upgrade**

   A focused block demonstrates the same method at a smaller scale:

   > **A 4 TB Postgres upgrade, without a maintenance window.**  
   > Dual writes supported the transition.

   Explain the constraint, your role, the confirmed approach, and the outcome. Leave out version numbers until the conflict in the source material is resolved.

   **The 3D:** A short close-up shows two database destinations and labelled write paths. Avoid decorative code streams or fictional monitoring readouts.

   **Click:** A text link returns visitors to the dual-write step if they want to understand the method.

   **Phone and fallback:** One clear dual-write diagram. The explanation remains complete without animation.

7. **Operational improvement: fewer pages**

   Use shared attribution:

   > Over about a year, our nine-person on-call team reduced pages from 85 to 22 per week. About half of that reduction came from deleting alerts nobody needed.

   Display **85 → 22 pages per week** in a simple, labelled graphic. Keep the team size and approximate measurement period nearby.

   Further detail should explain the work only where you can substantiate it. Do not equate pages with outages or attribute the entire reduction to you.

   **The 3D:** It ends here. The transition to a quieter, typography-led layout gives visitors room to read.

   **Clicks:** No interaction is necessary. This is evidence, not a dashboard.

   **Phone and fallback:** The same copy and graphic, stacked vertically.

8. **Open source: ferry**

   Introduce it accurately:

   > **ferry — a command-line tool for dual-write cutovers**  
   > Maintainer since 2022; author of the cutover command. Created by a former colleague.

   Explain what the cutover command does once its behavior is verified. A real, short command example can provide a useful preview. Do not invent syntax.

   **Clicks:** **View repository** and **Read cutover documentation**, using verified destinations.

   **Visual:** A restrained terminal-style panel with readable text. It does not type automatically or execute anything.

   **Phone and fallback:** The same panel, with long lines handled without breaking the page. Any copy button should announce success accessibly.

   Omit the star count unless checked at publication; it is less useful than explaining your contribution.

9. **The person, the rollback story, and speaking**

   Use your library experience to explain the origin of your approach:

   > In 2014, at the university library, I caused my first production outage by dropping a table. It is why I care about rollbacks.

   Keep the account brief. Do not add recovery details that have not been supplied.

   Follow with a compact career thread:

   - Systems administration at Entoto Technical University Library, Addis Ababa.
   - Site Reliability Engineer at Lumen Pay, on the team running card payment systems.
   - Staff Platform Engineer at Kestrel Freight, Rotterdam.

   Lumen Pay gets no additional technical account, diagram, or case study.

   Introduce **“Boring Migrations,” SRE North 2024**, with a short verified description.

   **Clicks:** **Speaking details** → the speaking page; **Watch the talk** → recording; **View slides** → public slides; **Download résumé** → an updated, accessible PDF.

   A small reading note can list the **Google SRE book** and **Release It! by Michael Nygard**. Add personal commentary only if you provide it.

   **Visual:** Editorial typography and generous space. A portrait is optional. No 3D is needed.

10. **Contact and footer**

   Suggested closing:

   > **Planning a migration you’re worried about?**  
   > Tell me what is moving, what must keep working, and when you need to make the change.

   **Email Dawit** opens a pre-addressed email with a simple migration enquiry subject. Display the email address as selectable text too.

   Below it:

   > For conference invitations, include the event, date, audience, and format.

   Provide a separate **Invite me to speak** email link.

   Repeat accurate availability information here. Do not promise response times or offer a booking calendar unless you want to operate one.

   The footer contains your name, Rotterdam, verified professional links, and any necessary privacy information.

   **Visual:** A spacious closing panel. Motion has stopped; contacting you is the clear next action.

**The look**

Use warm ivory `#F3F0E8`, deep charcoal `#202724`, deep teal `#176B63`, and burnt copper `#A54B2A`. Teal identifies active routes and links; copper marks decision points. Labels and line styles distinguish states independently of colour. Check all actual text combinations for contrast.

Use **Instrument Sans** for headlines and body text, with **IBM Plex Mono** for measurements, step labels, and diagram annotations. Headlines can be large and expressive; long-form text should have a comfortable line length and generous spacing.

The geometry should feel like a physical architectural model: matte surfaces, simple volumes, thin routes, and soft shadows. Avoid glossy sci-fi styling. The personality comes from precise language, honest evidence, and the visible return path.

**Motion, mobile, and the version without 3D**

Keep native scrolling. Use one shared 3D scene through the opening, flagship migration, and method, with a brief database close-up. Avoid loading separate canvases for every section.

The written page must load and work before the scene does. Graphics should never contain the only copy of a metric, label, or explanation.

On phones, use the static diagram sequence as the default. Preserve the same section order, links, evidence, and rollback example. Use comfortable tap targets and no hover-dependent content.

For reduced motion, failed WebGL, or a device that cannot run the scene well, display prepared diagrams in the same locations. Provide a **Reduce motion** preference and respect the operating system setting. Pause rendering when the scene is off-screen or the browser tab is hidden.

**Everything else the site needs**

- **Speaking page:** talk title and abstract, verified recording and slides, short organiser biography, optional approved headshot, and a speaking enquiry link. It should be useful when shared directly.
- **Confirmed content:** your availability wording, real contact address, repository and documentation URLs, talk links, Postgres version details if included, and sufficient public evidence for the deeper migration explanation.
- **Publication boundaries:** no internal diagrams or documents; no expanded Lumen Pay account; approved use of employer names and metrics; illustrative diagrams labelled clearly.
- **Updated résumé:** remove “zero downtime,” clarify availability scope, correct `ferry` attribution, and describe the page reduction as team work.
- **Accessibility:** semantic headings, keyboard operation, visible focus, diagram descriptions, accessible controls, contrast checks, and complete reduced-motion behavior.
- **Performance:** compressed assets, self-hosted licensed fonts, lightweight diagrams, deferred 3D loading, and verification on ordinary phones and connections.
- **Search and sharing:** descriptive page titles, summaries, canonical URLs, social preview images, sitemap, and accurate person metadata.
- **Site operations:** domain, hosting, HTTPS, useful 404 page, working email links, and a straightforward way to update content and dependencies.
- **Privacy:** launch without a contact form or analytics unless there is a clear need. Reassess the privacy requirements if either is added.
- **Launch checks:** factual review, confidentiality review, link checks, mobile layout, keyboard access, fallback rendering, motion preferences, and browser compatibility.

My assumptions are that migration enquiries are the primary goal, conference invitations are secondary, direct email is sufficient, and the old site can be replaced without carrying over its structure. Exact consulting availability remains a publication detail. The public talk and slides have not been reviewed here, so their contents must be verified before becoming website excerpts or diagrams.

**This is the complete recommended plan. Nothing has been built.**
