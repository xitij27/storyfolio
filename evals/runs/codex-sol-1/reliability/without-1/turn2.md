That changes the centre of the site: **a migration people are afraid of, made manageable through preparation and a credible way back.** The audience is now clear—companies considering a difficult migration, with a second path for conference organisers.

I’d keep the 3D ambition, but build the visual world around your actual working tools: **the runbook, the cutover checklist, and the rollback plan.** Nothing has been built.

**The revised concept**

Suggested headline:

> **Move the system. Keep a way back.**

Supporting copy:

> I’m Dawit Bekele, a staff platform engineer in Rotterdam. I help teams plan migrations, prepare cutovers, and work out how to reverse them. Going independent in 2027.

The central visual is an abstract system with a forward route and a visible return route. Three document-like planes anchor it: runbook, checklist, rollback plan. As visitors scroll, they see how preparation changes the system’s state.

These are original explanatory illustrations. They should draw on what you can discuss publicly, without resembling confidential infrastructure or presenting invented documents as your actual working materials.

**The revised journey**

1. **Start with the visitor’s problem.**

   Your name, headline, independence date, and two immediate links: **“Discuss a migration”** and **“Speaking.”**

   A restrained 3D model shows a system approaching a crossing, with its return route already visible. No introductory loading sequence. The words and contact options are usable immediately.

2. **Show the work and its limits together.**

   Lead with the Kestrel migration:

   > 310 services moved out of two data centres over 26 months.  
   > **99.98% measured availability for the order API over those 26 months.**

   Nearby, in ordinary readable text:

   > There were two internal incidents during the migration, each under ten minutes.

   The diagram shows staged transfers and checkpoints. It must not imply a flawless migration or pretend to reconstruct either incident. The factual account carries that nuance.

3. **Open the working method.**

   The three documents become the organising structure:

   | Working tool | What this part explains | Visual behaviour |
   |---|---|---|
   | **Runbook** | The sequence: preflight, shadow, dual write, cutover, soak, decommission. You wrote its first version, still own it, and 40 teams use it. | A system moves through clearly labelled stages. |
   | **Cutover checklist** | What must be checked before changing the active path, and who makes the decision. Specific examples come from public material or approved content. | The view tightens around the change point; checks appear beside the diagram. |
   | **Rollback plan** | What makes reversal possible, when it remains possible, and what would trigger it. Explain the constraints rather than suggesting every change is easily reversible. | The return route gains emphasis. Forward and reverse states can be compared with an accessible control. |

   This is the site’s signature sequence. It makes your judgment visible through a concrete process.

4. **Explain one difficult piece of engineering.**

   Feature the **4 TB orders database upgrade from Postgres 11 to 15**, using dual writes and no maintenance window.

   Show an original, simplified diagram of the write paths. The accompanying case study should explain the constraint, your contribution, the checks, and the available rollback options. Technical specifics must come from the public talk and slides or material you approve for publication.

   Don’t add “zero downtime” to this story.

5. **Show what changed for the team.**

   Suggested copy:

   > **We reduced weekly pages from 85 to 22 over about a year, across an on-call team of nine. Half of that reduction came from deleting alerts nobody needed.**

   A simple before-and-after graphic is enough. The shift to a quieter, more spacious composition gives the result visual weight. Avoid making it look like an individual achievement or hiding the deletion work behind a claim about automation.

6. **Make rollback personal.**

   Suggested introduction:

   > In 2014, working at the university library, I dropped a table and caused my first production outage. That is why I care about rollbacks.

   Keep this short and in your voice. Link to the talk for the fuller story. Don’t invent the recovery, consequences, or dialogue, and don’t turn it into an animated disaster scene.

   A compact career line can sit here. Lumen Pay gets only the permitted LinkedIn description: **SRE, card payment systems, 2016–2020**.

7. **Offer things people can watch and use.**

   Give the talk and ferry separate, substantial entries:

   - **“Boring Migrations,” SRE North 2024:** video and public slides, with a short description of what the audience will learn.
   - **ferry:** “Created by a former colleague. Maintained by me since 2022; I wrote the cutover command.” Link to the repository and relevant documentation.

   The Google SRE book and *Release It!* by Michael Nygard can appear as a small “Books I work from” note. They belong in your intellectual background, rather than as decorative objects in the hero.

8. **End with a specific invitation.**

   Suggested closing:

   > **What are you moving, and what makes it difficult?**  
   > Tell me what runs today, what needs to change, and what you’re worried about.

   Use a direct email link. Beside it, give organisers a distinct **“Invite me to speak”** link leading to the talk, a short biography, and contact details.

   Until you confirm an earlier start date, say **“Independent from 2027”**, rather than implying you are already taking consulting engagements.

**Colours, type, and motion**

Keep the warm paper and ink direction: `#F2F0E9` backgrounds, `#172124` text, deep teal `#102C30` for selected visual scenes. Muted teal marks active paths; amber marks a decision or checkpoint. Labels and line styles carry meaning alongside colour.

Use **Geist Sans** for readable prose and large, direct headlines, with **IBM Plex Mono** for diagram annotations. Avoid terminal-themed body copy. Your voice should sound like an experienced colleague explaining a consequential change.

The distinctive moment is the visible return path. Use matte objects, precise lines, and measured camera movement. Keep normal scrolling, avoid cursor effects, and let visitors pause motion. Reduced-motion mode shows the same sequence as static illustrations.

**On a phone**

Use text followed by compact 2D diagrams. Preserve the forward and return routes, stage labels, and evidence; remove the desktop camera choreography.

The three working tools become stacked sections. No prolonged pinned scrolling, horizontal navigation, or hover-dependent explanations. Contact stays easy to reach. The experience should remain complete without WebGL.

**What the site needs around the homepage**

Plan for a homepage, a Kestrel migration case study, a database case study, and a speaking page. Include an accessible résumé and PDF, verified links, useful search descriptions, and share images.

The case studies need enough detail for a prospective client to assess your judgment: constraints, your role, decisions, validation, rollback limits, incidents where relevant, and outcomes. Public talk material is the starting source. Postmortems belong only where something went wrong and where the account can be published.

A direct email link is sufficient for launch. A blog, contact form, and analytics can wait until there is a clear purpose for them.

**Assumptions I’m making**

- Prospective migration clients are the primary audience; speaking is the secondary path.
- Your public talk and slides can inform new explanatory diagrams, with attribution where appropriate.
- We won’t publish internal documents, screenshots, diagrams, or Lumen Pay case studies.
- The current email and repository URLs remain placeholders until verified.
- The old site needs no content preservation. Its domain can host the replacement.
- There is no established personal brand or photography to carry forward, so typography, your words, and original diagrams establish the identity.

The result should leave a prospective client with a specific impression: **Dawit has done difficult migrations, is candid about what happened, and prepares for the moment when a change needs to be reversed.**
