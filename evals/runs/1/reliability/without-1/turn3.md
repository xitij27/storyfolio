# The full plan — Dawit Bekele, portfolio site

**One line:** the site is a migration. Scrolling moves a visible system from broken/legacy (red) to stable (cyan), and it runs on the same six phases you use at work — because that's not a device, it's just what's true.

---

## The page, in order

### 0. Cold open — the outage
A single dark screen. One node sits alone, slightly unstable — a soft, irregular flicker, nothing explosive. Text, small and plain:

> *2014. Entoto Technical University Library. I dropped a table. It's the first thing I tell people when I give a talk, because it's why I care about rollbacks more than almost anything else.*

**3D:** one node, one failure, one visual beat. The node goes dark and stays dark — it doesn't recover here. That unresolved failure is the tension the rest of the page answers.
**Click:** nothing. This section has one job — set the stakes — and a button would undercut it.

### 1. Hero — the thesis
The failed node from the cold open is now one of hundreds, massed into a jittery red cluster — the on-prem estate. Headline, large, confident:

> **I move systems that are not allowed to stop.**

Sub-line: Staff Platform Engineer. Rotterdam. Independent from 2027.

**3D:** the full node graph — several hundred points, red/amber, loosely connected, restless motion (not chaotic — more like a held breath). This is the "before" state the whole scroll resolves.
**Click:** a small corner HUD appears here and persists for the rest of the page — a status readout, monospace, reading `STATUS: PREFLIGHT · 0/310`. It's clickable: each word is a jump-link to that phase's section. On mobile this collapses to a thin progress bar, no text.

### 2. Preflight — who you are, what the numbers mean
Short bio, close to your About, trimmed to essentials. Then a stat strip, each number counting up as it scrolls into view:

- **310** services moved, two data centres → cloud, 26 months
- **4 TB** Postgres, major-version upgrade, no maintenance window
- **99.98%** order API availability over those 26 months
- **2** incidents, both under ten minutes, both internal

That last stat sits deliberately next to the others, same size, same weight — not a footnote, not an apology. Hovering (desktop) or tapping (mobile) any stat reveals one line of "what this measures."

**3D:** no new motion here — the red cluster from the hero keeps idling behind the text, slightly dimmed so copy stays legible.
**Click:** tap/hover on stats for the measurement detail. No other interaction.

### 3. Shadow — the Kestrel migration
The case study. 26 months, two data centres, service by service. As the visitor scrolls through this section, nodes detach from the red cluster one at a time and arc across to a forming cyan cluster on the other side — tied directly to scroll position, so scrolling slower shows the migration happening more slowly. The HUD counter ticks up with it: `STATUS: SHADOW · 118/310`, etc.

**3D:** the centerpiece scroll-driven animation of the whole site. Abstract, generative — not a real architecture diagram, since Kestrel's internal diagrams aren't public. The shapes are deliberately not literal; the number next to them is what carries the truth.
**Click:** a "the talk and slides" link appears quietly at the end of this section — the *Boring Migrations* talk opens with the same table-drop story as this page does, which is worth one line pointing that out.

### 4. Dual Write — the Postgres upgrade
Tighter, more technical. Two cylinders, labelled plainly (v11, v15), with a thin stream of data flowing into both at once, then one stream fading as the cutover completes. Copy explains the 4TB, no-maintenance-window mechanics — this is the section for readers who want to know you actually know how, not just that you did it.

**3D:** small, contained, not spanning the full viewport — this section should feel like a close-up, a deliberate change of pace from Shadow's wide shot.
**Click:** none. Dense section, no distractions.

### 5. Cutover — on-call, in "we"
> *We were nine people. Pages went from 85 a week to 22, over about a year — half of that was just deleting alerts nobody needed anymore.*

The runbook gets its own line here: you wrote the first version, still own it, 40 teams run on it now.

**3D:** a live-feeling sparkline, pages-per-week dropping as you scroll, drawn in the same red→cyan gradient as the node graph. The HUD reads `STATUS: CUTOVER · 310/310`.
**Click:** none required; the sparkline itself isn't interactive, just animated.

### 6. Soak — ferry and the talk
> *ferry was built by a former colleague. I've maintained it since 2022 and wrote its cutover command.*

A simple card: ferry, GitHub link, star count, credit to the original author by name/handle if you want it included. Below it, the *Boring Migrations* talk gets a proper home here (not just the earlier mention) — title, venue, year, link to video and slides.

**3D:** motion eases off noticeably — slower, fewer particles, the cluster now mostly cyan and settled. This section should *feel* calmer than Shadow and Cutover.
**Click:** GitHub link (ferry), video link, slides link — all external, all open in new tabs.

### 7. What I work from
> *A runbook, a cutover checklist, a rollback plan. A postmortem only when something's gone wrong — which is the point.*

Three short items, described rather than downloadable (no sanitized templates exist yet). Below them, a small, quiet shelf: the Google SRE book, *Release It!* by Michael Nygard — two titles, no commentary needed.

**3D:** none. First fully static section on the page — deliberate, matches the content (these are the boring, reliable tools, not the dramatic migration).
**Click:** optional external links on the two book titles (to publisher or author page) — small, not emphasized.

### 8. Earlier roles
A plain, short list, no case-study treatment:

- Site Reliability Engineer, Lumen Pay (2016–2020) — card authorisation path. One line. Nothing else shown.
- Systems Administrator, Entoto Technical University Library (2013–2016) — the same place as the cold open; worth a one-line callback.
- BSc Electrical Engineering, Entoto Technical University.

**3D:** none.
**Click:** none.

### 9. Decommission — the close
The node graph reaches its final state: fully cyan, settled, `STATUS: STABLE · 310/310` in the HUD, which now stops being clickable and just sits still.

> *Going independent in 2027. If you've got a migration you're afraid of, or a conference that needs a talk about one — write to me.*

**3D:** stillness, deliberately. The whole page has been building to this frame being calm.
**Click:** mailto link, LinkedIn link, résumé PDF download. No contact form — direct and personal fits the "write to me" tone better than a form.

---

## Look

**Colour:** near-black charcoal base (not pure black). One accent pair carries all meaning — warm amber/red for "legacy/unstable," cool cyan/teal for "migrated/stable" — interpolating across the page as the story resolves. No third accent colour competes with that gradient anywhere on the site.

**Type:** a monospace face (IBM Plex Mono or JetBrains Mono) for every number, stat, and the HUD — it should read like terminal output. A clean grotesk (Inter or Neue Montreal) for headlines and body copy. Two fonts, strict roles, nothing decorative.

**Density:** narrative sections (cold open, hero, Shadow) get generous whitespace and large type — this is where the "award-winning" feel lives. Data sections (Preflight stats, Cutover sparkline, HUD) get tighter, denser dashboard treatment. The contrast between the two is intentional — it's the difference between telling the story and showing the receipts.

---

## On a phone

- The full WebGL node graph is replaced by a lighter 2D canvas animation, same red→cyan logic, far fewer points — no reason to spend battery/frame-rate budget on physics nobody will see clearly on a small screen.
- The HUD collapses to a thin progress bar at the very top, no clickable phase names — mobile nav happens by scrolling, not jumping.
- Stat strip in Preflight stacks vertically; "what this measures" detail is tap-to-reveal instead of hover.
- Shadow's node-arcing animation becomes a simpler before/after swap at two or three scroll checkpoints rather than continuous physics.
- Dual Write's cylinders and Cutover's sparkline still run — these are cheap and work well small.
- Copy throughout gets a trim pass — mobile keeps the stat and the sentence that matters, not the full paragraph.

## Without the 3D (reduced motion / low-power)

- Cold open: the one node simply appears already dark/failed — no flicker.
- Hero and Shadow: the red cluster and the migration are shown as two static illustrations (before/after), not an animation — the HUD counter still updates on scroll, just without motion tied to it.
- Dual Write and Cutover: static versions of the cylinders and the sparkline, final state only.
- A manual override sits in the HUD itself — a small pause icon that lets any visitor kill the motion regardless of their OS setting. Given the site's whole ethos is "boring and under control," forcing motion on someone who doesn't want it would be the wrong note.

---

## Everything else the site needs

**Content to confirm/provide before build:**
- Real contact email and LinkedIn URL (resume currently has a placeholder)
- *Boring Migrations* video and slides URLs
- ferry GitHub URL and the original author's name/handle for credit
- Résumé as a PDF for the download link
- Confirm whether "available from 2027" needs a specific month

**Technical:**
- Stack: Next.js, react-three-fiber (or a lighter custom canvas for mobile) for the node graph, scroll-driven animation via native scroll-timeline/Framer Motion. Vercel for hosting. Flag now if you'd rather use something else.
- Performance budget: 3D only loaded on desktop/capable devices; mobile gets the lightweight canvas; lazy-load the 3D library so first paint isn't blocked by it.
- Accessibility: reduced-motion fallback (above), colour contrast checked on amber/cyan-on-charcoal text, alt text for anything the graph communicates, keyboard-reachable HUD links.
- SEO/social: real `<title>`/description, Open Graph image (likely a frame of the stable cyan cluster), favicon.
- Analytics: none assumed unless you want it — flag if you want basic visit tracking, since that affects whether a cookie/privacy notice is needed.
- Testing: once built, I'll run it in a real browser at desktop and phone widths, including a reduced-motion pass, before calling it done.

That's the whole site, start to finish. Confirm the content items above (or tell me to use placeholders and swap later) and I'll start building with the cold open and hero.
