I'll read through all the material files to understand who you are and what you've done.

I read through all three files — this isn't a generic "developer portfolio" brief, it's for Aoife Brennan, a Clinical Nurse Manager and Nursing Informatics Lead on a cardiac step-down ward. That's a much better foundation for something that doesn't look templated, because the real material (a near-miss, a 71%→94% climb, a redesigned handover sheet now on 6 wards) is more compelling than almost anything a stock portfolio template could fake. Here's the plan.

## The idea

Most "award-winning" sites borrow 3D/scroll drama from agency work — particles, abstract shapes, cursor trails — and it reads as decoration bolted onto a CV. The hook here should come from her world instead: **a cardiac monitor trace as the spine of the page.**

A thin line draws itself continuously as you scroll, top to bottom — steady at rest, spiking at the near-miss, branching into six lines when the handover sheet rolls out ward-wide, climbing like a chart from 71 to 94 in the medication-safety section, and settling back to a calm steady rhythm at the end. It's literally "things that move as you scroll," it's legitimately 3D (rendered with depth/glow rather than a flat SVG line), and it's drawn from her actual job rather than from Awwwards' back catalogue. Night-shift / day-shift is the other thread running underneath: sections alternate between a dark, quiet register (incident, reflection) and a bright, clinical-paper register (process, data, teaching) — mirroring the two halves of ward life rather than a theme toggle for its own sake.

## The scroll journey

**1. Opening — the monitor at rest**
Dark. A slow, looping trace animates faintly behind her name and title. One line in her voice, lifted almost directly from the LinkedIn draft: *"Eleven years a nurse. The person who asks why the system makes the safe thing the slow thing."* No stats yet, no logos — just a held, confident beat before the scroll starts.

**2. The night it changed — the origin**
Still dark. Scroll pushes the trace into a spike — a brief red flash, like a monitor alarm. This is where the Bed 14 / warfarin story lives, told plainly, short sentences, documentary tone — not dramatized, because the gravity is already there. This section is the "why," and it's what makes the rest of the site feel earned rather than performative. *(Flagged below — this needs a privacy pass before it goes anywhere public.)*

**3. The role**
Light, paper register. CNM1, Cardiac Step-Down, 28 beds, six years running a shift. This is the "about" section but built from specifics — bed count, shift leadership, scope — not a biography paragraph.

**4. Case study: the handover sheet**
Old sheet vs. new sheet, shown as artifacts (recreated/stylized, not scans of real paperwork). ISBAR structure called out. The monitor line visibly forks into six lines as the copy explains the sheet spreading to six wards — scale shown structurally, not just stated.

**5. Case study: the scan**
The centerpiece. The poster's findings drive this: three workarounds, 40 hours of observation, 22 interviews, none of it laziness. Then the fix — scanners moved, wristband stock changed, printed sheets stopped. The 71%→94% figure climbs as a chart literally drawn by the scroll, synced to the same trace motif. One bespoke 3D object earns its place here: a wristband and scanner beam, modelled simply, scanning as the number climbs.

**6. Dashboards & research**
Falls/pressure-ulcer audit dashboards as a "control room" moment (stylised Power BI-style mock, placeholder numbers — never real patient data), then the conference poster itself as a credential — link out to the abstract/PDF. This is where SQL/Power BI/MSc start to read as a throughline rather than a skills list.

**7. Teaching, trajectory, and contact**
Preceptor to 14 new nurses — the human, not-metrics side of leadership. MSc Health Informatics (2024–26, in progress) positioned as her bridging bedside and systems work, forward-looking rather than a finished credential. The trace settles back to the calm rhythm from the opening — a deliberate bookend. Contact: email, LinkedIn, CV download.

## Colour and type

- **Backgrounds** alternate between a near-black ink (not pure black — something like a deep charcoal-navy, for the night/reflective sections) and a warm off-white paper tone (for the process/data sections) — the night-shift/day-shift duality doing real narrative work rather than being a style flourish.
- **Accent — alarm red**: a precise, slightly muted ECG red, used sparingly and only at moments that deserve it (the spike, the alarm flash). If it's everywhere it stops meaning anything.
- **Accent — monitor teal**: a desaturated cyan for data call-outs and the climbing percentage — evokes a monitor screen without tipping into clinical-stock cliché (no stethoscope green, no Red Cross red).
- **Type, three tiers**:
  - A quiet, humane serif for the story passages (the origin, the reflections) — needs to read like a written account, not marketing copy.
  - A grotesk mono for numbers, stats, and section labels (71%, 94%, bed counts) — evokes handover sheets and monitor read-outs.
  - A clean grotesk sans for UI chrome (nav, buttons, captions).

## On a phone

- The WebGL trace degrades to a lighter canvas/SVG version driven by scroll position rather than continuous rendering — same visual language, far less GPU/battery cost.
- Alternating light/dark sections, the one 3D object, and the chart-climb all still work stacked vertically; before/after artifacts (handover sheets) stack rather than sit side-by-side.
- `prefers-reduced-motion` gets a real fallback everywhere, not just on mobile — static final-state frames, no animation — since this audience plausibly includes people sensitive to motion, and it's the right thing to do regardless.
- A slim progress indicator (which "phase" of the shift/story you're in) collapses to a thin bar, thumb-reachable.

## What else the site needs

- **A privacy/clinical-governance pass before anything goes live.** The Bed 14/warfarin story and the hospital name are real-sounding identifiers attached to a real safety incident. Even anonymized, publishing this on a public site likely needs her employer's comms or clinical governance sign-off, and I'd genericize identifying details (ward size instead of hospital name, "a patient" instead of initials+bed number) unless she's explicitly cleared it. This is the one thing I'd resolve before we build anything else.
- **A downloadable, ATS-friendly PDF CV** alongside the narrative site — recruiters and academic reviewers will want something linear, not scroll-driven.
- **Accessibility**: proper heading structure, real alt text on the whiteboard/handover-sheet imagery, AA contrast even in the dark sections, full keyboard navigation independent of scroll animation.
- **SEO/sharing**: Person schema, and a static OG image for link previews (can't depend on WebGL rendering for that).
- **No CMS** — this is small enough to hand-code content directly; a CMS would be overhead she doesn't need.

## Before I build anything

Two things would shape this a lot — what's the site *for* (job search into informatics roles, academic/conference visibility, or general professional presence — it changes the contact CTA), and is she comfortable with the hospital name and the incident story being public, or should I treat those as placeholders to genericize?
