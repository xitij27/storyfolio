I’ll read the material folder first, then shape a site concept around your work and personality, with a full scroll narrative and a practical plan for mobile. I won’t build anything.


The strongest idea in your material is **moving systems that cannot stop**. Your site should make that visible: a live system changes beneath the visitor while its traffic keeps flowing.

That gives you a distinctive visual world rooted in your work—310 services migrated, a 4 TB database upgraded, quieter on-call, and a runbook adopted by 40 teams. The spectacle comes from continuity under change.

**The concept: “The work moves. The service stays live.”**

An architectural 3D diagram runs through the homepage. Two groups of structures represent the old data centres; a new structure represents the destination. A continuous stream of light represents traffic. As visitors scroll, services move across in deliberate stages. The stream stays connected.

This should feel like a carefully drawn engineering model: precise, tactile, and restrained. Avoid floating technology logos, space scenes, and a fictional command centre. The model is an illustration of your approach, not a claim to reproduce Kestrel’s actual infrastructure.

Your voice provides the personality. Keep the plainspoken confidence already in your material: **“I like migrations that are boring on the day.”**

**The scroll, from top to bottom**

| Part | What visitors see and learn | What moves |
|---|---|---|
| **1. A system already running** | “Dawit Bekele” and “Staff Platform Engineer · Rotterdam.” Suggested headline: **“I move systems that aren’t allowed to stop.”** Below: migrations, reliability, and on-call at Kestrel Freight. Immediate links to selected work and contact. | The complete model is visible from the start, with traffic moving gently through it. A small camera adjustment introduces depth without making visitors wait for the content. |
| **2. The migration** | The flagship story: **310 services. Two data centres. 26 months.** Explain the constraint in human terms: the trucks had to keep running. Show **99.98% availability through the migration**, using that precise wording. | As the section scrolls, groups of services transfer to the destination. Traffic remains connected. Labels and a short explanation make the visual understandable without specialist knowledge. |
| **3. How you make it boring** | Your runbook becomes the narrative: **preflight → shadow → dual write → cutover → soak → decommission**. Each stage gets a concise description and, once supplied, one concrete decision or check from your practice. Mention adoption by **40 teams**. | The camera settles into a closer view. Each stage changes the model meaningfully: a shadow path appears, writes reach both sides, the active route switches, and old capacity is retired only at the end. |
| **4. The database beneath it** | A focused story about the **4 TB orders database**, upgraded from **Postgres 11 to 15** using dual writes and no maintenance window. Give visitors a clear path into a fuller case study. | The wider model resolves into a simpler diagram of two database states and their write paths. This is the most detailed visual moment, because it explains a specific piece of work. |
| **5. Making on-call quieter** | Shift from infrastructure to its effect on people: **85 pages per week → 22**. Describe what changed once those details are available. The numerical result is already strong enough to lead. | The composition becomes calmer and less dense. A direct before-and-after graphic replaces the complex model; no fake alerts or flashing incident screens. |
| **6. Work others can use** | Two substantial features: **ferry**, your command-line tool for dual-write cutovers, and **“Boring Migrations,” SRE North 2024**. Explain what each helps someone do. Include the documented 1.2k GitHub stars only after checking the current figure. | The migration path becomes a simple connecting line between the tool and the talk. Small hover or focus responses are enough here. |
| **7. The person behind the work** | A compact career thread: university library systems in Addis Ababa → card authorisation at Lumen Pay in Amsterdam → platform engineering at Kestrel Freight in Rotterdam. Add a short first-person introduction grounded in your own words. | The 3D scene recedes. Typography and the career thread take over, giving the visitor room to read. |
| **8. A direct invitation** | Suggested closing: **“Have a system that needs to move?”** A visible email address, résumé download, and verified professional links. | The destination remains active, with the old structures gone. The final image shows the result of the entire journey: a simpler system still serving traffic. |

Keep the homepage readable in roughly three minutes. Someone scanning for 20 seconds should still find your role, strongest results, and contact details. Use a small persistent navigation: **Work / Approach / About / Contact**, with normal anchor links.

**The visual direction**

Use an **ink-and-paper palette**, with a warm light background for most reading:

- Warm paper: `#F2F0E9`
- Near-black ink: `#172124`
- Deep teal for selected diagram scenes: `#102C30`
- Muted teal for active routes: `#287F78`
- Amber for the current migration stage: `#C58A35`

The light page and darker diagram scenes create rhythm. Amber is a small accent, not body text. Verify contrast in the actual design; status must also be communicated through words and shapes.

Use **a clear grotesk sans serif**, such as Geist Sans, for headlines and prose, and **IBM Plex Mono** for stage labels, dates, and diagram annotations. Large headlines, generous margins, fine diagram lines, and a few oversized numbers will give it presence. Avoid terminal styling across the whole site: your work deserves more than a wall of commands.

The 3D objects should have matte surfaces, subtle shadows, and legible silhouettes. Motion should feel measured. No elastic bouncing, cursor-following camera, custom cursor, or background particles.

**How the movement behaves**

Build the experience around one evolving scene rather than loading a new effect in every section. On desktop, that scene can stay beside the narrative for the migration chapters, with bounded scroll-driven changes.

Normal browser scrolling remains intact. No forced pauses or scroll capture. Every chapter retains its explanation even if animation fails to load. Important numbers appear as readable text immediately rather than counting up.

An optional **“Pause motion”** control and support for reduced-motion preferences belong in the design from the beginning. With motion reduced, visitors see the same stages as static diagrams.

**On a phone**

Give mobile its own composition: text followed by a compact diagram for each chapter. Use simple 2D stage illustrations as the default, preserving the story without requiring a heavy 3D scene.

Keep the identity and headline in the first screen. Stack results vertically, turn the runbook into six readable steps, and keep contact links easy to tap. Avoid horizontal scrolling and long pinned sections. Nothing depends on hover, dragging, or rotating an object.

Desktop depth can be impressive; mobile clarity should be equally intentional.

**What else the site needs**

The homepage should lead into substantive material:

- **Two case studies:** the service migration and the database upgrade. Each needs the constraint, your role, key decisions, validation, rollback approach, and outcome. Publish only details you can share.
- **A useful ferry page or repository link:** what it does, who it helps, and a real usage example.
- **The talk:** verified video link, short summary, and slides if available.
- **An accessible HTML résumé**, plus a downloadable PDF.
- **Share previews and search metadata** that identify you and your work clearly.
- **Basic launch checks:** keyboard navigation, contrast, reduced motion, mobile layouts, loading performance, and a graceful fallback when 3D is unavailable.

For implementation later, I’d favour pre-rendered content with a separately loaded Three.js scene. The identity, text, and links should appear before the visual engine finishes loading. Keep geometry simple, stop rendering when the scene is offscreen, and provide a static fallback.

A contact form, blog, and elaborate loading sequence aren’t needed for the first release.

**The content still to resolve**

Your material establishes a strong direction, but it doesn’t contain the full case-study narratives or visual assets. Before building, the important gaps are:

- A few specific decisions and lessons from each major project, including your individual contribution.
- Confirmation of which employer details can be published.
- The actual GitHub, LinkedIn, and talk URLs; the supplied email and repository address appear to be placeholders.
- Your intended opportunity: a staff role, consulting work, speaking, or a combination. That determines the final invitation.
- Reconciliation of the résumé’s “zero downtime” wording with LinkedIn’s “99.98% availability.” Until clarified, use the precise availability figure for the overall migration and “no maintenance window” for the database upgrade.

The creative direction is clear: **let visitors watch a migration succeed, then show the judgment that made it uneventful.** That is a portfolio only your work could support. Nothing has been built or changed.
