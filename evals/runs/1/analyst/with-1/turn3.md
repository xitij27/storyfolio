Here's the full script for **The Memo** — saved to `docs/story/storyboard.md`, alongside the fact sheet, the three concepts, and my own judgment calls in `decided-for-you.md`.

## The object

Seven memo cards, one per real piece of work: Atlantico Telecom, the Helix sample tracker, the Helix weekly scheduling report, the Lisbon Rent Map, FraudShield, the Health Data Hackathon, AutoPilot. Flat rectangles with a clipped corner, like a real index card. Same seven cards, start to finish — they just take a new shape in each chapter.

## The six chapters

| # | Name | Role | What you read | What the cards do | What you can touch |
|---|---|---|---|---|---|
| 1 | The question | Opening | Your name, "I make dashboards people actually use," the site's question | One blank card tilts into place; its "?" resolves into the real question | Scroll — rail and "Get in touch" already visible, waiting |
| 2 | Who's asking | Who | Lisbon, product analyst, economics into data science, banking → wants a product company | The lead card gains a header; the other six sit stacked, face down | Nothing new yet |
| 3 | The data | Where from | The path: Atlantico (2020) → Helix (2021–24) → DataTugas (2018–20, mentioned not shown) → Meridian (2024–) | Cards unstack into a line, oldest to newest, headers only | Scroll-scrub the line; hover a card for its label |
| 4 | What I did | How | Your method, worked through on one real example | The Helix scheduling-report card detaches and unfolds into five faces | Step through the five faces |
| 5 | What I found | What / outcomes | The real work, shown | All seven fan into a wall, each turning to its true face | Click any card to read it in full |
| 6 | What I'd do | Close | The question, answered; the ask | Cards gather back into one, filed | Email, LinkedIn, CV download if supplied |

## Beat by beat

**1 — The question** (1.5 screens). Opens on one card, dead centre, blank but for a large "?", your name beneath it in plain type: *"Rafael Costa — I make dashboards people actually use."* As you start scrolling it tilts up, the "?" dissolves and types out the real question: *"What makes a dashboard something people actually open?"*

**2 — Who's asking** (1 screen). The lead card gains a "Prepared by" line and your title; six more sit face-down, stacked beside it. *"Lisbon. Economics first, then data science at Universidade do Douro — 2017 to 2022."*

**3 — The data** (1.5 screens, horizontal scrub tied to vertical scroll). All seven cards unstack into one line, oldest to newest, header only — employer or project, and year. DataTugas gets a text callout beside the line, since it has no card of its own: *"Atlantico Telecom, intern, 2020. Helix Genomics Institute, 2021 to 2024. A study group of twelve he started at university, DataTugas, 2018 to 2020. Meridian Bank, 2024 to now."*

**4 — What I did** (2 screens). The Helix scheduling-report card leaves the line, fans open into its five faces. A quiet, static row of tool chips (SQL, dbt, Python, Tableau, Power BI, Statistics) sits beside it — nothing animated, just named. Caption, worked through live: *"Question: why do the sequencers keep getting double-booked? Data: the core's own weekly schedule. What I did: rebuilt the report around it. What I found: it was taking five hours to produce, every week. What I'd do: cut it to two — and the clashes stopped."*

**5 — What I found** (2 screens). All seven cards fan into a wall at slightly different depths, each turning face-up:
- *Atlantico* — text only, no image exists: "Churn analysis, as an intern, 2020."
- *Helix sample tracker* — a plain, stylised recreation of the panel layout, no real data (needs your yes before build — see below): "Tracked samples through the sequencing core."
- *Helix scheduling report* — shown as the stat from Chapter 4, with Beatriz Lima's line pinned beside it like a clipped note: *"Rafael's dashboards changed how the core plans its week. He is the reason we stopped double-booking the sequencers."*
- *Lisbon Rent Map* — your own screenshot: "About 3,000 visits a month, his own."
- *FraudShield* — your own notebook/chart image: "An MSc capstone. A notebook, against a public dataset of card transactions. Never ran anywhere."
- *Health Data Hackathon* — your chart, if you have it, else text only: "A team of five — he made the charts."
- *AutoPilot* — text only, Meridian's, nothing more to show: "A script that fills in his team's weekly report, from SQL. Six people use it."

**6 — What I'd do** (1 screen). The seven cards gather back into one, filed and complete — the finished memo, with its five lines restated, closing on: *"What I'd do: this, somewhere people are building a product, not just a bank. Get in touch."* Email, LinkedIn, CV download (if you give me the file).

## Someone with thirty seconds

The first screen already carries your name and the line "I make dashboards people actually use." A rail, visible from screen one, jumps to any chapter. A "Get in touch" link, also visible immediately, skips straight to Chapter 6 — so reaching you is one click away without reading anything. The one thing the opening doesn't carry alone is a proof figure; that's deliberately what the rail's "What I found" label promises, since the wall in Chapter 5 is where the real numbers live.

## Without the 3D

| Where | What you get |
|---|---|
| **Phone** | Same six chapters, same captions, one column. The Ch.3 horizontal scrub becomes a plain vertical list. Ch.4's fan becomes a five-step tap-through. Ch.5's wall becomes a single-column list, same order, full width. Hover labels become tap labels. |
| **Reduced motion** | Every beat still happens, but as a cut, not a move — cards appear already in their end state, no tilt, unfold, slide, or parallax. |
| **No WebGL** | The canvas never loads. Each beat becomes one flat, static image of that card face, with its caption beside it — same six chapters, same order, just calmer. |
| **No JavaScript** | One plain long HTML document: headings for the six chapters, the same captions in order, the Chapter 5 text as a plain list with real alt text on any images, and a plain list of ways to reach you at the bottom. The scene was always decoration over this document — never the document itself. |

## Look and type

Three readings of "a memo" as a material — you'd scroll through a built version of each before picking:

- **A — Office memo** (my lean): warm off-white paper ground, near-black ink, one stamped clay-red accent on the question mark, the live figures, and links. Matte card surface with a real drop shadow — it should look liftable.
- **B — Dashboard dark**: near-black slate ground, off-white ink, a cool teal accent on numbers and the active rail dot. Dark-glass cards with a thin glowing edge — closer to the BI tools you actually sit in all day.
- **C — Clean report**: plain white, graphite ink, a single banking-blue accent on links and the final call to action. Flat cards, hairline border, no shadow — most minimal, least forgiving if the 3D ever reads thin.

Two typefaces: a humanist sans for all the surrounding prose (captions, nav, long-form text), and a monospace, typewriter-styled face for anything printed on a card's own face — the five memo labels, headers, figures — because that belongs to the form, not the page around it.

## Everything else the site needs

| | Build / later / never | Decided by |
|---|---|---|
| Navigation (rail + "Get in touch" link) | Build | Me — yours to veto |
| A page per project | Never — one scroll, Chapter 5 is each project's full showing | Me, by the form |
| Every project listed | Build — folded into Chapter 5 | Me |
| Email + LinkedIn | Build | Me |
| A downloadable CV | Build, only if you give me the file | Yours |
| Testimonial | Build — Beatriz's line, pinned to the Helix card (one quote isn't enough for its own chapter) | Me |
| Languages | **Not decided — English only, or English and Portuguese?** | Yours |
| Shared-link preview image + site icon | Build, but **needs you to pick the image** — the Rent Map screenshot, or the opening question-mark card? | Yours to pick |
| 404 page | Build — a blank card captioned "No ticket here" | Me |
| A blog | Never, unless you want one | Me, default |
| A chat widget | Never | Me |
| Legal/privacy notice | Build — you're in Portugal/EU, this is a legal floor, not taste | Me |

## What I decided without asking (full detail in `decided-for-you.md`)

- No "what I learned from" line — you didn't answer, so the site won't claim one.
- Helix's dashboard is shown as a stylised, no-real-data recreation, not a screenshot — **needs your yes**, since it's still an employer's screen even without an NDA.
- Meridian/AutoPilot: only the sentence above, nothing visual, ever.
- Hackathon credited as a team win with your part named, not the whole build.
- DataTugas described as what it was — a study group you started — not a company.
- Contact action is a placeholder until you give me the real email/method you want public.

## Still needed from you before build

1. A yes to this script, or what to change.
2. A screenshot of the Rent Map, and a chart or screenshot from FraudShield.
3. Your yes (or no) on the stylised Helix recreation.
4. A photo of yourself, if you want one — optional.
5. Pick a look: A, B, or C.
6. Languages: English only, or English + Portuguese?
7. Real contact details, and a CV file if you want one downloadable.
8. Which image for the shared-link preview.

This is still the plan stage — nothing gets built until you say go.
