# Storyboard — Rafael Costa, "The Analysis Memo"

Question: **"What makes a dashboard something people actually use?"**
Object: eight identical report cards (plain rounded rectangles, card-stock surface, thin memo-header rule), closed in a stack at rest. The same eight cards, throughout.

## The chapters

| Chapter | Its name in the form | Role | What you read | What the pieces do | What you can touch |
|---|---|---|---|---|---|
| 1 | The Question | Opening | His name, role, self-description, the question | Stack lifts and the top card opens, printing the question | Scroll; the rail (jump to any chapter, skip to close) is already visible |
| 2 | The Data | Where from | Porto to Lisbon, Economics to Data Science, four roles | Four cards peel off and line up on a timeline rail | Hover/tap a card or a tick for a one-line fact |
| 3 | What I Did | How | The memo → dashboard → weekly report cycle | Three cards arrange into a triangle with arrows | Tap a card to hold the loop and read its one-liner |
| 4 | What I Found | What, what came of it, what others say | Helix, AutoPilot, Lisbon Rent Map; the numbers; Beatriz's line | Cards enlarge one at a time into exhibits, then flatten into number-tiles | Click the Lisbon Rent Map card to open the live site |
| 5 | What I'd Do | The close | His actual ask, and how to reach him | All eight cards restack, right way round | Email link, LinkedIn link, CV download, back-to-top |

Five chapters, not eight — there isn't padding material for more, and a shorter honest story is the better one.

## The beats

### Chapter 1 — The Question

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 1.1 Cover | 1 | Closed stack, dead centre, slightly tilted, at rest | Top card blank but for a thin header rule | A soft desk-shadow under the stack | "Rafael Costa — Product Analyst, Lisbon." |
| 1.2 Subject line | 1, scroll-linked | Stack fans open from the top-left corner as you scroll | Top card prints, letter by letter: "What makes a dashboard something people actually use?" | Nothing | Same line, as the page's own question — plus one proof line beneath: "Built the dashboard a genomics lab runs its week on. Built the one six people still use today." |

### Chapter 2 — The Data

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 2.1 Timeline | 2, scroll-linked | Four cards peel off in turn, settle in a row on a horizontal rail, left (earliest) to right (latest) | Card A: "BSc Economics — Universidade do Douro — 2017–2020 — Porto." Card B: "MSc Data Science — Universidade do Douro — 2020–2022 — Porto." Card C: "Data Analyst — Helix Genomics Institute — 2021–2024 — Porto." Card D: "Product Analyst — Meridian Bank — 2024–present — Lisbon." | A thin rail connecting the four, with two small unlabelled ticks between B and C | "Economics first, then data. Porto, then Lisbon." |

Tapping a tick shows a one-line label: "Churn analysis, Atlantico Telecom, summer 2020" and "A study group of twelve, DataTugas, 2018–2020 — which he started." Neither gets a full card; neither has a figure or an outcome to carry one.

### Chapter 3 — What I Did

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 3.1 The cycle | 1–2 | Three cards slide out and close into a triangle, linked by arrows running clockwise | Plain line-icons, redrawn, not real screenshots: a memo-header mark labelled "The memo," a tile-grid mark labelled "The dashboard," a calendar-sheet mark labelled "The weekly report" | The connecting arrows | "The memo asks the question. The dashboard answers it. The weekly report keeps answering it." |

### Chapter 4 — What I Found

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 4.1 Helix | 2 | One card detaches, enlarges, faces forward; the other two sit small and dimmed | A plain, redrawn schematic of a sample-tracking grid — stand-in art, since no real screenshot exists to show. A smaller card is pinned to its corner at an angle, like a handwritten note | The pin/shadow that makes the note look attached | "At Helix Genomics Institute, Rafael built the dashboard that tracked samples through the sequencing core, and the weekly report that ran it — not the science itself. The weekly report went from about five hours to about two." Pinned note: *"Rafael's dashboards changed how the core plans its week. He is the reason we stopped double-booking the sequencers." — Beatriz Lima, Head of the Sequencing Core.* |
| 4.2 AutoPilot | 1–2 | Next card enlarges; Helix's card shrinks back | A redrawn schematic: an arrow from a small "SQL" tag into a filled-in report sheet | Nothing | "AutoPilot is a script Rafael wrote that fills in his team's weekly report straight from SQL. Six people use it every week." |
| 4.3 Lisbon Rent Map | 1–2 | Third card enlarges — the one real picture on the whole site | An actual screenshot (or live embed) of Lisbon Rent Map | A small "visit the map" link beside the card | "Lisbon Rent Map shows what a room costs in every parish of the city. It's his, it's live, and about 3,000 people visit it a month." |
| 4.4 What came of it | 1 | All three cards flatten and turn edge-on, becoming four thin number-tiles in a row | "5 hrs → 2 hrs" / "3,000 visitors / month" / "6 teammates, every week" / "200+ staff use his dashboards" (small footnote: "per his own reporting — nothing further can be shown, by agreement with his employer") | Nothing | None beyond the tiles — the numbers are the sentence. |

### Chapter 5 — What I'd Do

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 5.1 The recommendation | 1–2 | All eight cards gather and restack, closing exactly as they opened, now facing the right way to read | Top card: "What I'd Do — I make dashboards people actually use. I'm looking for a product analyst role at a product company." Beneath: email, LinkedIn, CV download | Nothing | His own line, unchanged from what he gave — nothing added for the close |

## Someone with thirty seconds

Beat 1.1 + 1.2, without scrolling past them, carries: his name and role (1.1), the question and his self-description (1.2's first line), and one proof ("built the dashboard a genomics lab runs its week on..."). The rail is visible from the first screen, so a jump to any chapter or a skip straight to the close (email, LinkedIn, CV) is always one click away — the fourth thing a thirty-second visitor needs.

## Without the scene

| Where | What the visitor gets |
|---|---|
| On a phone | Same five chapters, same order, same captions. Each beat becomes one full-width card with its caption beneath it; instead of 3D rearranging, cards simply slide/fade in as they're reached. Tooltips (the timeline ticks) become plain inline text, already expanded, not hidden behind a tap. |
| With reduced motion | No camera movement, no auto-looping arrows. Every beat appears already in its settled end-state (the row already laid out, the triangle already closed) and cross-fades in, rather than animating into place. Same content, same order. |
| With no WebGL | The 3D cards are replaced by flat styled cards built in HTML/CSS/SVG, laid out exactly as each beat describes (stack, row, triangle, enlarged exhibit, number-tiles, restacked close). Same captions, same links, same order — this is the same as the reduced-motion view, just always on. |
| With no JavaScript | The memo is plain stacked HTML, top to bottom: a heading (name, role, question), a timeline as a list, the cycle as a three-item list, the three projects as short write-ups with Beatriz's line as a `<blockquote>`, the numbers as a definition list, and the close as an ordinary section with a real `mailto:` link, a real LinkedIn link, and a real CV download link. The rail becomes plain anchor links. Nothing is lost, nothing moves. |

## The look and the type

Three options, each the memo's own material — ground, ink, one accent, the surface of the cards. You pick by feel once a build exists to scroll through; this is a starting shortlist, not a final call.

1. **Office memo** — ground: warm off-white paper (`#F4F1EA`); ink: warm near-black (`#1E1C19`); accent: a stamped red-orange (`#C0462B`), used only for the question and the numbers; cards: matte card-stock texture, faint paper grain, a thin printed header rule.
2. **Night shift** — ground: deep charcoal-blue-black (`#15181C`); ink: warm paper-white (`#F2EDE3`); accent: a desk-lamp amber (`#D9A64B`); cards: the same card stock, lit as if by a single lamp, a soft highlight along one edge.
3. **Ledger** — ground: pale graph-paper blue-grey (`#EDF1F0`); ink: ink-blue (`#1F3A3D`); accent: a rubber-stamp green (`#3C6E55`); cards: faint ledger ruling printed across the surface.

My pick, to start from: **Office memo** — it's the most literally "his," and the red accent gives the one question and the handful of real numbers something to stand on without touching anything else.

Two typefaces:
- **Text** (UI, captions, body): a plain humanist sans — something like IBM Plex Sans or Inter. Reads as a normal page, not a prop.
- **On the pieces** (what's printed on the cards — the memo's own voice): a typewriter/mono face — something like IBM Plex Mono. A memo is typed; the cards should look typed.

## Everything else the site needs

| | Build, later or never | Who decided |
|---|---|---|
| The way round the page (nav) | Build — the rail (jump to any chapter + skip to close), live from the first screen | Me — flagging for your yes |
| A page for each project | Never — each project is a chapter beat; Lisbon Rent Map already has its own live site, so the outbound link covers it | Me |
| Every project listed | Build — Helix, AutoPilot, Lisbon Rent Map each get a beat; Atlantico and DataTugas appear only as the two small ticks | You, in your last answer |
| How to reach them, and a CV | Build — email (`mailto:`), LinkedIn, CV download. **I still need an actual CV/résumé file from you** — nothing to link to yet | You asked for this; file itself is outstanding |
| What others say | Build — Beatriz's line only; nothing else in the material | You confirmed this is fine to use |
| Languages | Later — building English-only for now, since that matches the product-company job search. Say if you want a Portuguese version too | Me, flagging for your yes |
| What a shared link shows, and the site's icon | Build — needs an OG preview image (a static render of the closed memo cover) and a small favicon (a simplified corner-of-a-memo mark) | Me — exact image needs your eventual look at it |
| The page for an address that is not there (404) | Build — minimal, styled as a torn/missing page: "This page isn't in the file," with a link back to the top | Me |
| A blog | Never — nothing in the material supports it, and it's not what this site is for | Me |
| A chat | Never — adds nothing for a job search, nobody asked for it | Me |
| A legal notice | Later, pending whether analytics or any form gets added — if the site stays to a `mailto:` link, a CV download and an outbound link, Portugal/EU likely doesn't require one; worth a real check if that changes | Me — flagging, not a legal opinion |

## What I'm asking you for

A yes to this script, or what to change in it. Two things I need from you either way before anything is built:

1. **A CV/résumé file** to link from the close.
2. Confirmation you're all right with **Office memo** as the starting look, or a steer toward Night shift or Ledger instead.

Everything I decided without asking is listed above and in `docs/story/decided-for-you.md`, with why, and how to change it.
