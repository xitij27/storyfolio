Here's the whole plan, in order. Full detail is also saved in `docs/story/storyboard.md`.

## The idea

The form is **the analysis memo** — the exact document you said you work from: Question, Data, What I Did, What I Found, What I'd Do. The object is **eight identical report cards**, card-stock surface, sitting closed in a stack at rest like a memo left on a desk. Same eight cards throughout — they never disappear, just rearrange. The question the whole page answers: **"What makes a dashboard something people actually use?"** — which is true of Helix (adopted by a lab), AutoPilot (six people use it weekly), and Lisbon Rent Map (3,000 visitors a month with no mandate to exist at all).

## The scroll, top to bottom

**1. The Question (opening)** — The stack sits closed, centred, slightly tilted, under a soft desk-shadow. Your name and role appear over it: "Rafael Costa — Product Analyst, Lisbon." As you scroll, the stack fans open and the top card prints, letter by letter, the page's question, plus one proof line beneath it: *"Built the dashboard a genomics lab runs its week on. Built the one six people still use today."* A thin rail is visible already, letting anyone jump to any section or skip straight to the end.

**2. The Data (where you've been)** — Four cards peel off the stack and settle into a row on a timeline rail: BSc Economics (2017–2020, Porto) → MSc Data Science (2020–2022, Porto) → Data Analyst, Helix Genomics Institute (2021–2024, Porto) → Product Analyst, Meridian Bank (2024–present, Lisbon). Two small, unlabelled ticks sit between the MSc and Helix cards for the Atlantico internship and DataTugas — real, but too thin to earn full cards. Caption: "Economics first, then data. Porto, then Lisbon." Tapping a card or tick shows a one-line fact.

**3. What I Did (how you work)** — The three remaining cards close into a triangle linked by arrows: a memo icon, a dashboard-tile icon, a weekly-report icon — plain redrawn marks, not screenshots. Caption: "The memo asks the question. The dashboard answers it. The weekly report keeps answering it."

**4. What I Found (the work, proven)** — One card at a time enlarges into an exhibit:
- **Helix:** a redrawn, generic sample-tracking schematic (no real screenshot exists, so nothing claims to be one), captioned with what you actually did — built the tracking dashboard and weekly report, not the science — and the 5-hours-to-2-hours figure. Beatriz's line is pinned to its corner like a handwritten note, with her name and title.
- **AutoPilot:** a redrawn schematic, an arrow from "SQL" into a filled report. Caption: six people use it every week.
- **Lisbon Rent Map:** the one *real* picture on the site — an actual screenshot or live embed, with a "visit the map" link. 3,000 visitors/month.
- Then all three flatten into four number-tiles: 5h→2h, 3,000/mo, 6 teammates, and "200+ staff use his dashboards" with a small footnote that nothing further can be shown under your Meridian agreement.

**5. What I'd Do (the close)** — All eight cards restack, closed again, facing the right way to read. The top card: *"What I'd Do — I make dashboards people actually use. I'm looking for a product analyst role at a product company."* Below it: email, LinkedIn, CV download, back-to-top.

## Someone with thirty seconds

The first screen alone gives name, role, the question, one proof line, and — because the rail is visible immediately — a one-click way to skip straight to your contact details.

## What's clickable

Hover/tap on timeline cards and ticks for one-line facts; tap a "What I Did" card to hold the loop and read its description; click the Lisbon Rent Map card to open the live site; email, LinkedIn, and CV links in the close; a rail, present throughout, that jumps to any chapter or skips to the end.

## The look and type

Three options, same material (card-stock, memo header) in different light — pick by feel once something exists to scroll through:
1. **Office memo** (my starting pick) — warm paper ground, near-black ink, a stamped red-orange accent used only for the question and the numbers.
2. **Night shift** — charcoal-black ground, warm white ink, desk-lamp amber accent.
3. **Ledger** — pale graph-paper ground, ink-blue, rubber-stamp green accent.

Two typefaces: a plain humanist sans for the page text (e.g. IBM Plex Sans), and a typewriter/mono face for whatever's printed on the cards (e.g. IBM Plex Mono) — a memo is typed.

## On a phone, and without the 3D

- **Phone:** same five chapters, same order, same captions — each beat becomes one full-width card that slides/fades in rather than rearranging in 3D. Tooltips become plain visible text, not something hidden behind a tap.
- **Reduced motion:** no camera moves, no looping arrows — every beat appears already settled (row already laid out, triangle already closed) and cross-fades in.
- **No WebGL:** the cards render as flat HTML/CSS/SVG in the same arrangements, same captions, same links.
- **No JavaScript:** a plain stacked page — heading, timeline as a list, the cycle as a three-item list, the three projects as short write-ups with Beatriz's line as a blockquote, the numbers as a list, and an ordinary contact section with real `mailto:`, LinkedIn, and CV links. Nothing is lost.

## Everything else the site needs

- **Nav rail** — build.
- **A page per project** — never; each lives as a chapter beat, and Lisbon Rent Map already has its own live site to link out to.
- **Every project listed** — build (Helix, AutoPilot, Lisbon Rent Map as full beats; Atlantico/DataTugas as the two minor ticks).
- **Contact + CV** — build, but **I need an actual CV file from you** — there's nothing to link to yet.
- **What others say** — build, Beatriz's line only.
- **Languages** — English only for now (say if you want Portuguese too).
- **Shared-link preview + favicon** — build (a static render of the closed memo cover, plus a small corner-of-a-memo mark).
- **404 page** — build, minimal: "This page isn't in the file."
- **Blog, chat** — never; nothing supports either, and neither serves the job search.
- **Legal notice** — later, only if analytics or a form ever get added; a `mailto:` link, a CV download and one outbound link likely don't require one in Portugal/EU, but that's not a legal opinion.

Two things I need from you before any building starts: **a CV/résumé file**, and a **yes on the look** (Office memo, or a steer toward Night shift/Ledger). Once you say yes to the script itself, this plan is done — building is a different session.
