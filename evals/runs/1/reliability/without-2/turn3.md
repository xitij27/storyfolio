Here's the complete plan, start to finish. Still planning only — nothing built.

---

## Persistent frame (present on every section)

- **Top-left**: small wordmark + a status dot. Dot is steady green. Clicking it/the wordmark scrolls to top.
- **Top edge**: a thin horizontal line that fills left-to-right with scroll position — reads as a progress bar, like a migration that's underway. No numbers on it, just the line.
- **Top-right**: one small persistent button, "Write to me." Always visible, never buried in a hamburger menu.
- That's the entire nav. No section links, no dropdown — the site is one continuous document, and the only job of the header is "where am I" and "how do I contact him."
- **Look**: near-black background (`#0b0d10`-ish, blue-leaning black, not pure `#000`), warm off-white text (`#eceae4`-ish), one signal accent — status-green (`#3ecf7e`-ish) for operational/success states, and amber (`#e0a64a`-ish) reserved only for the single cutover moment in Section 3. No gradients, no second accent.
- **Type**: a monospace face (JetBrains Mono or IBM Plex Mono direction) for all numbers, timestamps, labels, and the terminal section; a plain humanist grotesk (Inter or General Sans direction) for headings and body copy. Left-aligned throughout — nothing centered like a marketing hero.
- **Phone / no-3D baseline rule, stated once**: every scene below that uses WebGL has a named fallback. The rule is the same everywhere: continuous scroll-scrubbed camera movement becomes a small number of discrete states that advance when a section enters the viewport (via IntersectionObserver), rendered in lightweight SVG/CSS instead of WebGL. Triggered automatically by (a) `prefers-reduced-motion`, (b) no WebGL2 support, or (c) a save-data/low-end-device signal — not a user toggle to find, it just degrades correctly.

---

## 1. Hero / Origin — 2014

**3D/motion**: Near-empty dark viewport. A single thin 3D line resembling a database table outline sits center-screen, barely lit. On first scroll input (or after a short pause), it fractures and falls away — a slow, quiet collapse, not an explosion. No text competes with it while it happens.

**Content**: After the collapse settles: *"2014. My first production outage. I dropped a table."* Beat. Then: *"That's why I care about rollbacks."* Beat. Then the present-day line fades in beneath it: *"I move systems that are not allowed to stop."* — Dawit Bekele, Staff Platform Engineer, Rotterdam.

**Clickable**: Nothing yet except the persistent header. This section is deliberately a read, not an interaction — the one moment on the site with no click target, so it can't be rushed.

**Phone / no-3D**: The table-outline collapse becomes a simple CSS fade/break animation on three stacked SVG lines. Text beats still sequence the same way via scroll-triggered opacity, just no camera movement.

---

## 2. The migration — 310 services, 99.98%

**3D/motion**: Two blocky rack structures (data center A and B) on the left, a soft cloud-shaped volume on the right. As the user scrolls, individual node blocks detach from the racks one at a time and travel in an arc to the cloud volume — scrubbed directly to scroll position, so dragging the scrollbar runs it forwards and backwards. Three counters tick alongside, locked to the same scroll position: services moved (0→310), months elapsed (0→26), and a counter that visibly does **not** move: **99.98%**.

**Content**: Heading: "310 services. Two data centers. 26 months." Subline, smaller, directly under the 99.98 figure: "Availability of the order API, measured across the full migration." No incident count mentioned.

**Clickable**: Hovering/tapping the 99.98% figure reveals a one-line tooltip/footnote repeating what it measures (order API, 26 months) — the only interaction here, there to stop the number being read as a universal claim.

**Phone / no-3D**: Racks-to-cloud becomes a static horizontal SVG diagram with the counters driven by simple scroll-into-view count-up (not scrubbed) — plays once forward, doesn't reverse on scroll-up.

---

## 3. The toolkit — runbook, checklist, rollback plan, and the Postgres cutover

**3D/motion**: Three flat document-shaped panels (runbook / cutover checklist / rollback plan) stand upright like index cards. Scrolling into this section tilts them toward the viewer one at a time, titles appearing. Past that, a six-stage horizontal pipeline renders: *preflight → shadow → dual write → cutover → soak → decommission*. Two small database icons sit above "dual write," with small pulse particles traveling between them continuously once that stage is reached. At "cutover," scroll position drives a single deliberate switch-flip (a lever or toggle object rotating), rendered in the one amber accent — the only non-green/white color moment on the whole site.

**Content**: "What I actually work from" intro line, naming the three documents. Then: "Postgres 11 to 15. 4TB. No maintenance window." The six pipeline stages labeled plainly. Closing footnote in the toolkit area: "A postmortem only gets written when something's gone wrong. That's rare, and that's the point." All visuals explicitly schematic/illustrative — not a reproduction of Kestrel's real diagrams.

**Clickable**: Each of the three document panels is clickable and expands into a short plain-text description of what that document actually contains/does (2–3 lines each) — this is the closest the site gets to a "case study," and it's the part most likely to make a nervous prospective client relax.

**Phone / no-3D**: Document panels become a simple stacked-card list, tap-to-expand instead of hover/scroll-tilt. Pipeline becomes a vertical list with a static amber highlight on "cutover," no particle animation (or a very reduced 2–3 particle CSS version).

---

## 4. On-call, together — 85 → 22

**3D/motion**: No 3D here deliberately — a clean 2D line chart (per dataviz conventions: single accent-green line, generous whitespace, legible in dark mode), the line drawing itself left to right as the section scrolls into view, from 85 down to 22.

**Content**: "We cut on-call pages from 85 a week to 22." Subline: "A team of nine, over about a year. Half of it was deleting alerts nobody needed." Deliberately plural voice throughout this section — the one place the copy says "we," not "I."

**Clickable**: Nothing beyond a hover state on the chart that shows the exact week-over-week values as a small readout, if there's data to support it — otherwise just the start/end values, no interaction required.

**Phone / no-3D**: Already lightweight; the line-draw animation plays once on scroll-into-view rather than scrubbed.

---

## 5. ferry

**3D/motion**: A dark terminal-style panel "floats" slightly with parallax on scroll (very subtle, a few pixels — not a 3D object, just depth cue). A command types itself out character-by-character once the section is in view.

**Content**: "ferry. Built by a former colleague. I've maintained it since 2022 — the cutover command is mine." The typed command is specifically the cutover command, not a generic demo. GitHub star count shown as a static figure (1.2k) pulled from material, with a note to refresh before launch. Link out to the real repo.

**Clickable**: "View on GitHub" link (needs the real URL, not the placeholder). Optionally a copy-to-clipboard button on the typed command.

**Phone / no-3D**: Parallax removed, panel is static; typing animation keeps working fine on mobile as plain CSS/JS, no WebGL involved here at all.

---

## 6. The talk

**3D/motion**: None — a plain embedded video thumbnail for "Boring Migrations," SRE North 2024, with a subtle scale-in on scroll.

**Content**: Title, event, year. One pull-quote if Dawit has a good line from the talk to lift. This section exists partly as a callback: the talk opens with the same 2014 story the site opened with.

**Clickable**: Play the embedded video; link to the public slides.

**Phone / no-3D**: Identical — this section was never WebGL-dependent.

---

## 7. Experience, as a changelog

**3D/motion**: None. Styled like a runbook or git log: monospace dates in a left column, plain text entries to the right, a thin vertical rule connecting them (not a glowing animated timeline — restraint on purpose, this section should feel like documentation).

**Content**:
- Kestrel Freight, Staff Platform Engineer, Rotterdam, Aug 2020–present — full detail, links back up to sections 2–3 conceptually.
- Lumen Pay, Site Reliability Engineer, Amsterdam, Mar 2016–Jul 2020 — **one line only**: "Card payment systems." Nothing else, ever.
- Entoto Technical University Library, Systems Administrator, Addis Ababa, 2013–2016 — this is where 2014 happened; can cross-reference the hero without repeating it in full.
- BSc Electrical Engineering, Entoto Technical University, 2009–2013.

**Clickable**: Nothing interactive required — it's a read-only record, deliberately.

**Phone / no-3D**: No change needed; already simple.

---

## 8. Influences

**3D/motion**: None. Two small book-cover-sized elements, understated.

**Content**: Google SRE book, *Release It!* by Michael Nygard — a two-line aside, not a page, framed as "what I keep nearby," not "my reading list."

**Clickable**: Optional links to the books; not essential.

---

## 9. Contact / footer

**3D/motion**: The status dot from the header reappears, large, steady green, maybe one slow pulse per few seconds — the calmest possible visual to end on.

**Content**: Two explicit paths, not a generic contact form:
1. "If you're about to run a migration you're dreading, write to me." → real email.
2. "Organizing a conference? Here's the talk." → links back to Section 6 / a direct booking line.

Plus: resume PDF download, GitHub, LinkedIn, real email repeated as plain text (not just a mailto button, so it's copyable and scrapable by anyone reading, not just clickable).

**Clickable**: Email link (mailto, and also selectable plain text), resume download, GitHub, LinkedIn.

**Phone / no-3D**: Identical; this section is text and a static dot, no fallback needed.

---

## Everything else the site needs

**Content/accuracy**
- Real email and GitHub handle (current material has placeholders).
- ferry's original author's name/handle, for correct credit.
- Resume PDF rewritten to match the corrected facts (99.98%/order API/26mo, team-credited on-call figure, correct ferry attribution) — it shouldn't just be the site that's accurate if the PDF still says "zero downtime."
- A decision on whether the site states *when* in 2027 Dawit is open for engagements, or stays quiet on timing until closer to the date.
- A domain name decision.

**Engineering**
- Feature-detect WebGL2 + a save-data/low-end-device check, with the discrete-state fallback described above as the actual implementation target, not an afterthought.
- Respect `prefers-reduced-motion` globally.
- Performance budget set before building: lazy-load the 3D library per-section (don't load it for the experience/influences/contact sections at all), compress/optimize any 3D assets, target real Lighthouse numbers.
- Full keyboard navigability even though sections are scroll-driven — no trapping, no mouse-only interactions.
- Color contrast check on the dark palette (off-white on near-black, green/amber accents) against WCAG AA.
- Alt text / ARIA labelling for all diagram-equivalent content, since the diagrams are illustrative, not just decorative.

**Production basics**
- Meta description, OG image, and Person structured data written around the independent/migration-consultant framing, not generic portfolio language.
- Sitemap.
- Browser test pass, Safari specifically for the WebGL sections.
- Hosting choice (Vercel/Netlify direction) and deployment pipeline.
- Privacy-friendly analytics (e.g., Plausible) if Dawit wants to know who's visiting — optional, his call.
- Retire the old one-pager outright; no redirect needed since nothing links to it.
- A plain plan for future edits (new talk, updated star count, new job entry) — likely just direct code edits given this is a single static site for one person, but worth Dawit confirming he's comfortable with that rather than wanting something more self-serviceable.

That's the full plan. Let me know if anything should move, and send over the outstanding items (real email/GitHub, ferry author credit, domain, timing disclosure) when you have them — otherwise this is ready to move into build.
