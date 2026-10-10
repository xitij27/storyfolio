# The site, start to finish

## 1. Hero

**What's shown**: Full-bleed canvas of loose, drifting points — a few hundred, soft-lit, slow drift with gentle parallax on mouse/scroll. Over it: "Rafael Costa" in large serif, then your line in sans beneath it — *"I make dashboards people actually use."* A small scroll-down cue at the bottom (arrow or "scroll" label, fades after first scroll).

**3D**: This is a true WebGL particle field (Three.js/R3F) — ambient, unresolved, representing raw/untrusted data. No labels, no chart-like structure yet — it should read as noise, not as "a chart in disguise."

**Clickable**: Nothing but the scroll cue (click-to-scroll shortcut) and a minimal top-corner nav (name/logo mark that jumps back to hero, plus a direct link to "Work" and "Contact" — three items, no more).

## 2. Resolve / thesis

**What's shown**: Same particle field, now scroll-scrubbed — as the user scrolls through this section, the points visibly organize: drift slows, points align into rows/columns, and by the end of the section they've settled into a simple, clean dashboard-like shape (a few bars/lines, nothing literal). Short paragraph scrolls in alongside: who you are, the Economics → Data Science path in one line, and what you actually do (banking, a genomics-adjacent ops tool, a civic side project) — framed around decisions getting easier, not tools being built.

**3D**: This is the one scroll-scrubbed 3D centerpiece — particle positions interpolated against scroll progress (not time), so it only plays while the user is actively scrolling and never auto-animates.

**Clickable**: Nothing. This section is read-only by design — it's the one place the user should just watch and read.

## 3. Case study — Helix Genomics Institute (sample-tracking dashboard + weekly scheduling report)

**What's shown**: Two-beat layout.
- Beat A — "The question": one line on what the sequencing core needed (samples kept getting lost/double-booked across the week), set large.
- Beat B — "What I built / what changed": the resolved dashboard shape from Section 2 reappears here, now rendered with real(istic) labels — sample counts, a weekly schedule grid — built from your actual memo structure (question → data → what you did → what you found → what you'd do next), shown as a simple scrollable panel, not a screenshot (none exists to use, and it keeps this section visually consistent).
- The stat: 5h → 2h per week on the weekly report, called out large (60% reduction) — plain, checkable number, no spin.
- Pull quote: Beatriz Lima's testimonial, full-width, set in the serif, her name/title beneath it.
- Footnote line: thanked in the acknowledgements of the paper for the tracking dashboard (not listed as an author) — small, factual, not buried but not oversold either.

**3D**: Faint, slowed background drift of the same particle motif at low opacity — texture only, no scroll-scrubbing here. Keeps continuity with Section 2 without repeating the "wow" moment.

**Clickable**: A toggle or tab between "the dashboard" and "the weekly report" views within the same panel (two small labeled tabs) — lets a visitor see both halves of the work without lengthening the scroll. No external link (nothing public to send people to).

## 4. Case study — Lisbon Rent Map

**What's shown**: Tonal shift — this is your public, visitable product, so it gets a live embed (iframe or screen-recorded loop as fallback) of the actual map, parish-level rent data. Short memo-style copy: the question (what does a room actually cost near me), the data (listings by parish), what you found/built, and the real stat — ~3,000 visitors/month.

**3D**: None needed — the live map itself is the visual interest here. A good deliberate contrast after two sections of particle motion: this section should feel like "an actual thing you can open," not an effect.

**Clickable**: A direct "Open the Rent Map →" link to the live site (primary CTA of this section), plus — if the embed supports it — a live, interactive mini-version right on the page (hover a parish, see the price).

## 5. Meridian Bank

**What's shown**: Short, deliberately restrained beat — role and dates (Product Analyst, Meridian Bank, Feb 2024–present), one line: dashboards used by 200+ staff, daily. No specifics on what the dashboards track, no screenshot, no secondary figures. A line that's honest about the constraint rather than hiding it, e.g. "Under a confidentiality agreement — here's what's public" (shows integrity rather than reading as a gap).

**3D**: An abstracted, generic panel shape (rectangles/bars with no real labels) fading in from the particle field — intentionally less detailed than the Helix visual, so the restraint reads as a choice, not an oversight.

**Clickable**: Nothing — no screenshot to expand, no external link.

## 6. Also built

**What's shown**: A single compact strip, not full sections — AutoPilot only (one line: a script that pulls your team's weekly report from SQL, six people use it; plus a small code-like visual motif — e.g. a terminal/query snippet graphic, not a live demo).

**3D**: None — flat, quiet, deliberately low-key compared to the case studies above it.

**Clickable**: Nothing required; optionally a hover reveal of a one-line code snippet for texture.

## 7. Origins

**What's shown**: Quietest section on the page, mostly static type, no particle motion.
- Education: BSc Economics (2017–2020) → MSc Data Science (2020–2022), Universidade do Douro.
- FraudShield: labeled clearly as your MSc capstone — a notebook/analysis on a public card-transactions dataset, never real-time, never deployed. Framed as "where I learned to model fraud risk," not as a shipped product.
- Health Data Hackathon 2023: "Won with a team of five — I built the charts." Specific, not inflated.
- DataTugas: "Started a 12-person study group at university" — plain, not "Founder."

**3D**: None.

**Clickable**: Nothing.

## 8. Contact / close

**What's shown**: The particle field returns one last time, already in its fully resolved, still state (no animation) — calm bookend to the hero. Your name again, a line to reach you, and three links: email, LinkedIn, the Rent Map.

**3D**: Static only — the resolved shape sits still; maybe a very slow, barely-perceptible breathing motion so it doesn't feel frozen, nothing more.

**Clickable**: mailto: link, LinkedIn, Rent Map — the three real ways to follow up. That's the entire exit surface of the site; no footer sprawl, no extra nav.

---

# The look

**Color**: Dark, warm near-black base (not pure black — something like a deep ink with a hint of brown/grey) with a warm off-white for text. One accent — a deep terracotta/ochre, used only for: the resolved-state particles, pull quotes, stat numbers, and link hovers. No blue, no gradient-heavy "SaaS" palette.

**Type**: A high-contrast serif for your name, section headers, and the pull quote (gives it an editorial, designed feel). A clean grotesk/neutral sans for body copy and labels. Stats (60%, 200+, 3,000) get tabular/monospace figures so they read as measured, not decorative.

**Motion restraint**: One real scrubbed-3D moment (Section 2). Everywhere else: fast, simple fades/reveals on scroll, no bounce/elastic easing, nothing moving just to move.

# On a phone, and without 3D

- **Hero**: particle field renders as a lighter 2D canvas (far fewer points) or, on lower-end devices, a static resolved illustration with a subtle CSS fade-in — never full WebGL by default on mobile.
- **Resolve section**: the scroll-scrubbed transformation becomes a short, simple reveal (start state → end state crossfade) rather than true scrubbed interpolation — avoids fighting the user's scroll gesture and avoids the jank of real-time 3D on a phone GPU.
- **Case studies**: lose any pinning; everything becomes straightforward single-column, stacked, scroll-reveal sections. The Helix dashboard/report tabs become a simple stacked toggle (tap instead of hover). The Rent Map embed falls back to a screen-recorded loop with the "Open the Rent Map" link as the primary way to actually interact with it.
- **Reduced motion (OS setting)**: every particle/scroll-scrub effect is swapped for a plain fade-in, site-wide, including on desktop. This isn't just an accessibility checkbox — the whole site needs to read clearly and make its case with motion off entirely, since a recruiter on a slow connection or with reduced-motion on shouldn't lose any content to a stalled animation.

# Everything else the site needs

- **Real contact details and links** — your actual email, LinkedIn URL, and the real Rent Map URL (resume currently has placeholders).
- **Helix and Rent Map memos** (redacted if needed) — to pull real language into the memo-structured case studies rather than reconstructed copy.
- **A way to show the Helix dashboard/weekly report visually** without a real screenshot — either you mock up a clean, anonymized recreation, or I build an abstracted illustrative version from the memo's structure (your call, no screenshots of actual employer/institute data either way given sensitivity).
- **Confirmation of exact wording** for the Meridian confidentiality line, since it's effectively a small piece of legal-adjacent copy — worth you eyeballing before it goes live.
- **Domain and hosting** — do you have a domain already, or should I plan for one.
- **Resume/CV file** — a downloadable PDF version visitors can grab, likely linked from the contact section (nice-to-have, not structural).
- **SEO basics** — page title/description, your name and "product analyst" in the meta tags, an Open Graph image (likely a still frame of the resolved particle shape).
- **Performance budget** — WebGL asset size kept small (no heavy textures/models — this is all procedural geometry, not imported 3D assets), lazy-load the Rent Map embed/recording so it doesn't block initial page load.
- **Accessibility pass beyond reduced-motion** — alt text for the Rent Map visual, sufficient contrast on the terracotta accent against the dark background (needs a contrast check, not just an eyeball), keyboard-reachable nav and links.
- **Analytics** — do you want basic visit tracking (e.g. to know if recruiters are actually reaching the contact section), or skip it entirely.

Once you confirm the Helix/Meridian visual approach and send through the real links, I'm ready to start building whenever you give the word.
