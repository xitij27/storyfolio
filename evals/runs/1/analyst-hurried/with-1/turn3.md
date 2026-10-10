Confirmed — **"The Map."** Here's the whole plan, in full.

---

## The idea

One question carries the page: **"What does it take before a number is trusted enough to act on?"** It holds across genomics, banking, and a civic rent map without claiming anything the material doesn't give me, and the page closes by answering it in your own words — *"I make dashboards people actually use."*

One object carries it: **8 simple extruded blocks** — abstracted city blocks, explicitly not a real map — one per employer and project: Atlantico Telecom, DataTugas, Helix Genomics Institute, Meridian Bank, FraudShield, AutoPilot, Lisbon Rent Map, the Health Data Hackathon win. The same 8 pieces, rearranged, carry every chapter. I chose this over a glowing-particles-into-a-chart (the emblem every data person's site reaches for) and over a generic KPI-report layout, because it's built from the one project of yours anyone can actually visit and check right now — the rent map — and that becomes the climax, not decoration.

---

## The page, in order

### 1. The Question — opening
**3D:** 8 blocks scattered on flat, dark, unlit ground. Nothing lit, nothing labelled — true of the craft before any work has touched it.
**Reads:** "Rafael Costa — Product Analyst, Lisbon." Then the question types on: "What does it take before a number is trusted enough to act on?"
**Click:** nothing yet — scroll only.

### 2. The Analyst — who
**3D:** same scattered blocks, ambient light rising from below.
**Reads:** your own line, verbatim — "I make dashboards people actually use. Genomics, banking, and a map of Lisbon rents." Then your toolkit appears as small monospace chips: SQL, Python, Tableau, Power BI, dbt, Statistics.
**Click:** scroll only.

### 3. The Data — where from
**3D:** the 4 career blocks (DataTugas, Atlantico, Helix, Meridian) lift off and slide into a line ordered by start date. Each block's height is set by its **real tenure in months** — a true number, not decoration. A thin timeline rule runs beneath the row.
**Reads, as each locks in:** "DataTugas — Founder, Oct 2018–Jun 2020 *[what DataTugas did: to confirm]*" / "Atlantico Telecom — Intern, Jun–Sep 2020. Churn analysis." / "Helix Genomics Institute — Data Analyst, Sep 2021–Jan 2024. Supported sequencing operations." / "Meridian Bank — Product Analyst, Feb 2024–present. Dashboards used by 200+ staff." Then education noted beneath the row: BSc Economics 2017–2020, MSc Data Science 2020– *[end year: to confirm]*.
**Click:** hover or tap any block for its dates.

### 4. The Model — how
**3D:** the 4 career blocks lift again and restack into three horizontal layers: SQL and Python at the base, dbt and Statistics mid-layer, Tableau and Power BI as the visible "roof." Thin lines connect the layers, like a build pipeline.
**Reads:** "Raw tables in, a model in the middle, a dashboard on top — the same shape whether the rows are genomic runs, bank transactions, or rent listings."
**Click:** scroll only.

### 5. The Map — what
**3D:** all 8 blocks settle into a loose, explicitly not-to-scale grid — an abstracted skyline, with a small "not to scale" mark so it never pretends to be a real map. Each project block carries its title and one confirmed line. Then the Lisbon Rent Map block lifts slightly and lights up in the accent colour; the rest dim a touch.
**Reads:** "FraudShield — real-time fraud detection system. Jan–Jun 2022. *[built where, for whom, ever in production: to confirm]*" / "AutoPilot — automation platform for analytics teams. Mar 2024–present. *[built at Meridian or independently: to confirm]*" / "Lisbon Rent Map — a map of what a room costs in every parish of Lisbon. Live at rentmap.example. Thousands of visitors a month." / "Winner, Health Data Hackathon 2023. *[what the project did: to confirm]*" Then: "The one piece of this anyone can go check right now."
**Click:** tap any block for its caption; one link — "Visit the live map →" — leaves the page for the real site.

### 6. The Readers — what came of it / what others say
**3D:** the Meridian and Helix blocks turn to face the viewer, like cards flipping.
**Reads:** "Dashboards used by 200+ staff at Meridian Bank. *[what the 35% efficiency figure measures, and whose result it is: to confirm]*" / "Contributed to a paper in the Journal of Genomic Methods. *[his part in it: to confirm]*" — and, **only if you say yes**, the Helix block flips once more to show Beatriz Lima's quote by name and title. If you don't, this beat is simply skipped and the chapter ends cleanly without it; nothing else depends on it.
**Click:** scroll only.

### 7. The Next Release — close
**3D:** all 8 blocks reassemble into one whole grid — same layout as Chapter 5, now every block fully lit. Camera pulls all the way back.
**Reads:** the opening question reappears, now answered: "What does it take before a number is trusted enough to act on? I make dashboards people actually use." Then a contact line: "Rafael Costa. *[email: to confirm]* · CV · Lisbon Rent Map · LinkedIn."
**Click:** email, CV download, the live map, LinkedIn.

**Thirty seconds:** screen one alone gives the name and role. A side rail jumps to any chapter by name, plus two shortcuts — "Proof" (straight to the lit rent-map block in Chapter 5) and "Contact" (straight to Chapter 7). The CV and live-map links work as plain links everywhere, not only inside the animated scene.

---

## The look

- **Ground:** near-black, `#0B0D10`.
- **Ink:** warm off-white, `#F3EFE8`.
- **Accent:** one terracotta/ochre, `#C9643B` — used *only* for what's live and checkable: the rent-map block, links, the question mark, contact buttons. Nowhere else, so it keeps its meaning.
- **Block surface:** matte dark resin with a thin backlit accent edge — like an architectural model standing on a lightbox. Chosen over blue-and-white azulejo tiling, which is the first thing anyone reaches for on a Lisbon site and reads as a postcard, not as you.
- **Type:** a geometric grotesk sans, slightly condensed, for all running text and headers — reads like it belongs on a dashboard. A monospace for everything printed on the blocks' own faces — names, dates, tool names — because that's the register your actual tools output in.

---

## On a phone, and without the 3D

| Where | What the visitor gets |
|---|---|
| **Phone** | Same seven chapters, same captions, same order. Camera locked — no drag-to-orbit fighting a thumb-scroll — but scroll still drives every transition. Chapters 4 and 5 render fewer blocks at once to hold frame rate. Captions stack below the scene. A block's face is read by tapping, not hovering. |
| **Reduced motion** | No camera movement, no blocks sliding or stacking. Each beat appears already in its resting state and cross-fades in on scroll. No easing, no parallax. |
| **No WebGL** | The 3D is replaced by a flat, static graphic of the same abstracted grid, one version per chapter where the arrangement changes. All text stays, same order. |
| **No JavaScript** | One plain HTML page. Every chapter's text runs top to bottom in script order. No animation. Email, CV, the live map, and LinkedIn are ordinary links that work. |

---

## Everything else the site needs

| | Build, later, or never |
|---|---|
| Nav: scroll + jump rail + "Proof"/"Contact" shortcuts | **Build** |
| Every project listed (FraudShield, AutoPilot, Lisbon Rent Map, hackathon, DataTugas) | **Build** |
| A standalone page per project | **Later** — no visual material yet to justify one |
| Contact + CV slot | **Build** the slot — the real email and CV file are waiting on you |
| "What others say" slot | **Build** the slot — whether Beatriz Lima's name/employer can show is waiting on you |
| Languages beyond English | **Never**, for now |
| Shared-link preview card + favicon | **Build** |
| 404 page | **Build** |
| Blog | **Never**, for now |
| Chat | **Never** |
| Privacy/cookie notice | **Build** — minimal, since the site's EU-reachable |

Everything above is written to `docs/story/storyboard.md`, with `decided-for-you.md` logging every call I made and `handover.md` holding the fifteen things still waiting on you — none of which block starting to build. Still nothing built. Say "build it" when you're ready, or tell me what to change first.
