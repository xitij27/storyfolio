## 0. Persistent shell (present on every section, not a stop itself)

**Look:** thin fixed header — your name/initials as a small mark top-left, a slim vertical **dot-nav** on the right edge with 9 dots (one per stop below), filled teal when active. On desktop this also doubles as a scroll-progress indicator.

**Clickable:** each dot jumps straight to that section (smooth-scrolled, not instant, so the camera move still plays). Name mark click returns to the very top. Mobile swaps this for a simple hamburger that opens a full-screen link list (no 3D in the menu itself — it's an overlay, not a scene).

**Footer** (after stop 9): repeats the same links, adds social icons (LinkedIn), a "back to top" arrow, and a one-line credit/copyright.

---

## 1. Hero — the noise

**On screen:** your name, then the line *"I make dashboards people actually use."* Nothing else — no subtitle, no button row. A small down-arrow or "scroll" hint at the bottom, animated with a slow pulse so it reads as an invitation, not a UI element.

**3D:** a dense field of small unlabeled points, digits, and fragments of chart axes drifting slowly in 3D space, no visible pattern. As the visitor starts scrolling, the camera moves forward into the field — it doesn't fade, it travels.

**Clickable:** the scroll hint (click = scroll down one stop). Nothing else — the hero's job is tone, not navigation.

**Phone:** the same field, rendered as a static or lightly-looping canvas (points drift gently in place, no camera travel) with far fewer points — maybe 10–15% of the desktop count. Tap-and-hold or scroll still advances normally.

**No 3D / reduced motion:** a single static dark gradient background with a handful of faint dots placed via CSS, no animation loop running at all. Name and line render immediately, fully readable, no layout shift.

---

## 2. The thesis

**On screen:** a short paragraph — the "walks into chaos, leaves structure" idea in your voice, 2-3 sentences — next to a stat strip: **3 industries · 200+ staff using what I built · 40% faster reporting**.

**3D:** the noise field, now filling less of the frame, starts showing the first hint of a grid underneath it — like structure trying to surface but not resolved yet. This is the "setup" beat before the first real payoff.

**Clickable:** nothing new here — pure read beat.

**Phone:** grid-hint effect replaced by a simple CSS fade-in of a faint grid line pattern behind the text — same idea, no WebGL needed for this stop at all on mobile.

**No 3D:** plain background, text and stat strip appear with a basic fade/slide-up on scroll (CSS only).

---

## 3. Case study — Meridian Bank

**On screen:** headline ("Meridian Bank"), problem line (no shared visibility across 200+ staff), what you built, the outcome — **35% improvement in efficiency**. A "read the full story" toggle reveals 3-4 extra sentences inline (accordion-style, not a modal — keeps the scroll flow intact).

**3D:** this is the first real payoff — the noise locally resolves into a dashboard panel: axis lines snap straight, a bar chart draws itself from scattered points, filter chips click into a row. Camera holds here (pinned) while this assembles, then releases as you keep scrolling.

**Clickable:** the "read the full story" accordion toggle. No external link — Meridian Bank's dashboard isn't public, so there's nothing to link out to.

**Phone:** the pin-and-assemble sequence becomes a short pre-baked animation (same assembling-dashboard idea, lower fidelity, plays once on scroll-into-view rather than scrubbing with the scroll position).

**No 3D:** a static illustrated/flat version of the "assembled dashboard" as a single image or simple SVG, shown already-complete — no animation, just the end state next to the text.

---

## 4. Case study — Helix Genomics

**On screen:** headline, problem (sequencer double-booking, slow reporting), what you built, outcome — **40% faster reporting**. Beatriz Lima's quote as a pull-quote in the display serif, set apart visually (slightly larger, maybe in the terracotta accent for this one section only to mark it as a voice other than yours).

**3D:** tangled strand shapes (a genomics-literal motif — think combed sequencing reads) straighten into parallel ordered tracks as you scroll through this pinned stop.

**Clickable:** "read the full story" accordion, same pattern as Meridian Bank. No external link (internal tool, no public URL).

**Phone:** pre-baked straightening animation, plays once on entry.

**No 3D:** static image of the "already straightened" strand motif, pull-quote and text render immediately.

---

## 5. Case study — Lisbon Rent Map (flagship)

**On screen:** headline, problem (nobody could see what a room actually costs across Lisbon), what you built, outcome — **3,000 visitors/month**, plus a clear **"View the live map →"** link out to the real site.

**3D:** the single most elaborate stop — flat scattered rent-listing points lift and extrude into a 3D map of Lisbon's parishes, height and colour mapped to price (terracotta = expensive, teal = affordable), camera slowly orbiting as it rises. This is the section built to actually get screenshotted and shared.

**Clickable:** the "View the live map" link (opens the real project in a new tab) — this is the one case study with a real external link, so it should look more like a button than the other two.

**Phone:** the extrusion plays once as a shorter pre-baked sequence (map already mostly risen, a light bit of final lift) rather than a scrubbed orbit — orbiting cameras are the most expensive thing to run well on mobile GPUs. Link button unchanged.

**No 3D:** a static top-down image of the finished extruded map (rendered once and exported as an image, not a live 3D canvas) — still visually the best screenshot on the page, just not interactive. Link still works.

---

## 6. Other work — lighter pass

**On screen:** a 2x2-ish grid: FraudShield, AutoPilot, DataTugas, Atlantico churn work — title, one line, outcome where there is one. No accordions here, no deep dives — this section is intentionally quieter than 3–5.

**3D:** small, fast — a handful of points near each card snap into a tiny ordered cluster as the card scrolls into view. No pinning, no camera hold, this section should feel brisk after three heavier stops.

**Clickable:** currently **none of these four have a public URL** in your material, so the cards render as plain text, not links, until you've got somewhere to point them. (If DataTugas or FraudShield ever get a live URL or writeup, that's a one-line addition later, not a redesign.)

**Phone:** same cards, grid becomes a single column, the snap-to-cluster effect becomes a simple CSS fade/scale-in.

**No 3D:** cards with no accompanying animation at all, just the grid.

---

## 7. Toolkit

**On screen:** SQL, Python, Tableau, Power BI, dbt, Statistics — six labels, nothing more.

**3D:** the last loose particles from the hero drift in and snap into a small, tight cluster around the six labels — a visual "and this is what's in the toolbox" beat, deliberately small-scale after the bigger case study effects.

**Clickable:** nothing — this section is a glance, not a destination.

**Phone:** labels fade in in sequence, no particle effect at all (this is the first section I'd cut entirely on low-power devices, since it adds the least).

**No 3D:** plain list, fades in once.

---

## 8. Credibility

**On screen:** Health Data Hackathon win (2023), MSc Data Science (2020–2022) + BSc Economics (2017–2020), both at Universidade do Douro. Text-forward, no motion gimmick — this is the "trust me" beat and shouldn't compete for attention.

**3D:** background noise field is now almost entirely settled — just a faint, calm scatter, signaling we're near the end of the arc.

**Clickable:** nothing.

**Phone / no 3D:** identical in both cases — this section was never meant to lean on 3D.

---

## 9. Contact — full stillness

**On screen:** "Let's talk" or similar, a contact form (name, email, message, submit), a **resume download button**, and your LinkedIn icon.

**3D:** the noise field is now a completely still, clean grid — the chaos-to-order arc closes here. No motion at all once settled, which is the point.

**Clickable:** form submit, resume download, LinkedIn icon, and the footer links repeated below (back-to-top, nav links again).

**Phone:** identical — this section was always going to be static-feeling by design, so it needs no special mobile treatment.

**No 3D:** same still grid, just rendered as a static CSS background instead of a settled canvas.

---

## The look, overall

- **Base:** near-black ink background, off-white text.
- **Accent 1 — terracotta/amber:** Rent Map section, Helix Genomics pull-quote, key highlights.
- **Accent 2 — signal teal:** the "resolved" colour — triggered the instant noise snaps into structure, active nav dot, the Rent Map link button.
- **Type:** neutral grotesk (Inter/Söhne territory) for body and UI; higher-personality display serif for big scroll-triggered headlines and the pull-quote; **a monospace with tabular numerals** for every stat callout (35%, 40%, 3,000/mo, 200+) so numbers read as data, not copywriting — a small, specific touch that reinforces who you are.

## How the whole thing degrades

Two tiers, built as progressive enhancement rather than two separate sites:

1. **Full experience** — WebGL/3D scene with a scroll-driven timeline, pinned camera stops at sections 3–5, real content underneath in normal semantic HTML (so screen readers and search crawlers see the real text regardless of whether the canvas loads).
2. **Fallback** — triggered automatically by `prefers-reduced-motion`, no-WebGL browsers, or low device-capability detection (checked once on load, no guessing per-frame): every "3D moment" described above has a named static or pre-baked equivalent, listed section by section above. Nothing is ever gated behind the 3D — worst case, a visitor gets a calm, still, well-typeset page with no motion at all.

**Phone specifics across the board:** 3D bundle lazy-loads after the hero is already interactive; particle counts capped hard; pinned/scrubbed camera moves replaced by play-once pre-baked animations everywhere; tested on a real mid-range Android, not just an iPhone.

---

## Everything else the site needs

**Content**
- Resume PDF to link from the contact section
- Real forwarding address or form backend behind the contact form (Formspree or a small serverless function — no inbox needed from you beyond that)
- 3–4 extra sentences per case study for the accordions (can ship with the current one-liners and extend later without touching layout)
- Decision on whether FraudShield / AutoPilot / DataTugas ever get public links — fine to launch without them

**Technical**
- Hosting + domain (static hosting fits this — Vercel/Netlify)
- Lightweight, cookie-free analytics (Plausible/Fathom-style) — fitting, given who you are, and avoids needing a cookie banner
- Favicon, OG/social preview image, page title + meta description for link previews
- Performance budget: 3D code-split and lazy-loaded, pixel ratio capped, target a clean Lighthouse score on the no-3D fallback path at minimum

**Accessibility**
- `prefers-reduced-motion` respected everywhere, not just on mobile
- Keyboard-navigable dot-nav and accordions
- Contrast-checked teal/terracotta against the near-black base
- Alt text on the one real image asset (Rent Map static render)

**Maintenance**
- Stats and case-study copy kept in a simple config/data file separate from the 3D/scroll code, so correcting a number later never means touching animation logic

Still nothing built — say go and I'll start with the hero and the noise system everything else inherits from.
