# Storyboard — Dawit Bekele, "The Runbook"

Question: **What makes a migration boring on the day?**
Form: his own runbook — preflight, shadow, dual write, cutover, soak, decommission.
Object: plain steel shipping containers, five to twelve of them, stencilled.

Not built yet. This is the script.

## The chapters

| Chapter | Its name in the form | The role it holds | What you read | What the pieces do | What you can touch |
|---|---|---|---|---|---|
| 0 | (before Preflight) | The opening | His name. The question. | One container, closed, alone, in an empty yard. | Scroll to begin. Nothing else yet. |
| 1 | Preflight | Who / Where from | The three jobs and their years, as the checks done before anything moves | The one container becomes three, stencilled with employer, years, oldest at the bottom | Tap a container for one more line on that job |
| 2 | Shadow | How | The documents he works from — the runbook, the cutover checklist, the rollback plan; the two books; the 2014 table | A faint outline mirrors each container without touching it. One container, apart from the row, tips and empties, then rights itself | Tap the tipping container for the 2014 story; tap the row for the three documents |
| 3 | Dual write | What | The Kestrel migration: 310 services, two data centres, 26 months; the Postgres 11→15 upgrade; ferry; the talk | Two full stacks, on-prem and cloud. Crates cross from one to the other as you scroll, a count climbing toward 310. One container relabels 11 → 15 mid-crossing. A smaller container, apart, carries ferry's stencil | Scroll scrubs the crossing count; tap ferry's container for its GitHub page; tap the talk's container for the video |
| 4 | Cutover | What came of it | 99.98% of the order API over 26 months, with two internal incidents under ten minutes each; on-call pages, 85 to 22 a week, said as "we" — the team of nine, over about a year; the runbook, used by 40 teams | The two stacks snap into one. Faces turn to stencilled numbers. Two short shakes mark the two incidents, each settling fast | Tap a number for the full sentence: what it measures, over what time, whose result it is |
| 5 | Soak | Proof that held | The runbook, still his, still used by 40 teams; ferry, maintained since 2022 | The stack holds still. Nothing moves for a few screens of scroll | Nothing new — the stillness is the point |
| 6 | Decommission | (the old, switched off) | The two original data centres; his old 2019 site | The emptied on-prem containers lift away and fade. The cloud stack stands alone | Nothing — a quiet beat |
| 7 | (after Decommission) | The close | The answer; how to reach him | The full set, whole, still, evenly lit | Email link, CV, ferry, the talk, the slides |

## The beats

### Chapter 0 — Opening

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 0.1 | 1 | One container, alone, centred, closed | Blank — no stencil yet | A low, still camera; a cold empty yard | "Dawit Bekele." / "What makes a migration boring on the day?" |

### Chapter 1 — Preflight

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 1.1 | 1 | The container splits into three, stacking oldest-first, bottom to top | Each stencilled: employer, role, years | — | "Before anything moves, you check what's already running." |
| 1.2 | 1 | Same stack, camera closer on the bottom container | "Entoto Technical University Library, Addis Ababa. Systems Administrator. 2013–2016." | — | No further line is shown here — the one thing this job holds is told in Shadow, not here. |
| 1.3 | 1 | Camera on the middle container | "Lumen Pay, Amsterdam. Site Reliability Engineer. 2016–2020. Card payment systems." | — | Nothing further is shown of Lumen Pay's own systems — by agreement, this line is as far as it goes. |
| 1.4 | 1 | Camera on the top container | "Kestrel Freight, Rotterdam. Staff Platform Engineer. 2020–present." | — | "Four years moving a freight company off two data centres, one service at a time." |

### Chapter 2 — Shadow

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 2.1 | 1 | The three containers dim; a faint outline mirrors each, offset, not touching | Outlines carry no stencil of their own yet | — | "A shadow copy runs beside the real thing before you trust it." |
| 2.2 | 1 | A fourth container, apart from the row, tips on one corner and spills, then rights itself | "2014." | — | "The first production outage he caused was in 2014, at the library. He dropped a table. He tells this story at the start of his talk — it's why he cares about rollbacks." |
| 2.3 | 1 | The outlines settle, each now labelled | "The runbook." / "The cutover checklist." / "The rollback plan." | — | "What he works from, day to day. A postmortem only when one of these has failed — which is the point." |
| 2.4 | 1 | The outlines fade to a corner, small, staying in view | "Site Reliability Engineering" (Google) / *Release It!*, Michael Nygard | — | "What he learned from." |

### Chapter 3 — Dual write

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 3.1 | 1 | Two full stacks appear, on-prem on the left, cloud on the right | Left stack stencilled "on-prem," right "cloud" | A counter reads "0 / 310" | "310 services, two data centres, 26 months." |
| 3.2 | 2 (scroll scrubs the crossing) | Small crates cross from left stack to right, one at a time, as the page scrolls | The counter climbs with the scroll | — | "Moved one service at a time, in shadow and then for real, while the trucks kept running." |
| 3.3 | 1 | One container in the middle of the right stack turns in place | Stencil changes from "11" to "15" | — | "The orders database, 4 terabytes, upgraded two major Postgres versions with dual writes — no maintenance window." |
| 3.4 | 1 | A smaller, separate container drifts into frame beside the stacks | "ferry — a former colleague's tool. His since 2022. The cutover command is his." | A small GitHub mark on its face | "ferry. A command-line tool for dual-write cutovers. 1.2k stars." |
| 3.5 | 1 | Same container, camera pulls back slightly | "Boring Migrations — SRE North 2024" | A small play mark on its face | "The talk, and its slides, are public." |

### Chapter 4 — Cutover

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 4.1 | 1 | The two stacks snap together into one | — | A brief, sharp light change marks the moment | "The moment the switch is thrown." |
| 4.2 | 1 | Faces of three containers flip to numbers | "99.98%" | — | "Availability of the order API, measured over the 26 months of the migration. Two internal incidents happened, each under ten minutes." |
| 4.3 | 1 | Next face flips | "85 → 22 pages a week" | — | "On-call pages, for the team of nine, over about a year. He calls it 'we' — half the drop was deleting alerts nobody needed." |
| 4.4 | 1 | Next face flips | "40 teams" | — | "Teams now using the runbook he wrote and still owns." |

### Chapter 5 — Soak

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 5.1 | 2 (a held, quiet scroll) | The stack stands still. No new arrangement | Faces already set from Cutover, unchanged | A long, slow held shot | "Soak is the stage where you watch, and nothing is supposed to happen. For 40 teams, and for ferry's maintainers since 2022, it hasn't." |

### Chapter 6 — Decommission

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 6.1 | 1 | The emptied on-prem containers lift up and out of frame, fading | "on-prem" fading on their faces as they go | — | "Two data centres, decommissioned." |
| 6.2 | 1 | The cloud stack stands alone | — | A smaller, separate, dim container fades out entirely at the edge of frame | "His old site, from 2019. It's retired too — nothing that matters links to it." |

### Chapter 7 — Close

| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 7.1 | 1 | The full set — opening container plus every stage's containers — stand together, whole, evenly lit | Each keeps the one stencil that matters most from its chapter | — | "What makes a migration boring on the day? Checking what's running before you touch it. Running it twice before you trust it. Always having a way back." |
| 7.2 | 1 | Same shot, still | — | Contact block appears over the scene | "Going independent in 2027. Looking for a company about to run a migration it's afraid of, or a conference that wants the talk. Write to him: [email]. CV. ferry. The talk. The slides." |

## Someone with thirty seconds

The opening screen (0.1) carries the name and the question. A fixed rail, visible from the first scroll onward, lists all seven chapters by name and jumps to any of them; one of its items is always "Close," which jumps straight to beat 7.2 — the answer and every way to reach him. Someone who reads only the opening and taps "Close" gets: his name, the one line of what he does (the question itself, plus the answer in 7.1), one proof (whichever number is already visible behind the contact block, e.g. "99.98%"), and the email/CV. That is the three-part minimum in under thirty seconds, no scrolling required.

## Without the scene

The text in every beat's caption is ordinary HTML laid over the 3D, never only inside it, so all of it is present in every row below regardless of what renders.

| Where | What the visitor gets |
|---|---|
| On a phone | The same beats and captions, in the same order. The live WebGL scene is replaced by the same arrangements pre-rendered as a short sequence of still frames (one per beat), advanced by scroll position rather than by a live camera — same stencils, same numbers, same order. Tap replaces hover for the container detail cards. The rail collapses to a single "chapters" button. |
| With reduced motion | Every beat still renders, but transitions between beats become instant cuts or simple fades — no camera movement, no crate-crossing animation, no tipping container. The counter in 3.2 appears already at its final value rather than climbing. All text, numbers and order are unchanged. |
| With no WebGL | The containers appear as flat, stencilled illustrations — the same look's ink and accent colour, drawn as simple shipping-container icons — one static image per beat, laid out in the chapters' order. Every caption, number, and link still appears, in the same order, beside its image. |
| With no JavaScript | A single plain HTML page: the chapters in order, each as a heading (its form name, e.g. "Preflight") followed by its captions as ordinary paragraphs, in beat order, with no images. All links — CV, ferry, the talk, the slides, email — work as plain anchors. Nothing about the story's order or wording changes; only the pieces are gone. |

## The look and the type

The object's material is painted steel, stencilled in yard paint — so the ground, ink and surface all come from a shipping yard, not from a generic "dark developer portfolio" palette. Three looks, built the same way, for Dawit to scroll through once there's something to scroll:

**1. Dockyard overcast.** Ground: cool slate grey. Ink: near-white. Accent: stencil orange (the colour freight stencilling actually uses). Surface: brushed, slightly weathered steel — visible weld lines, faint rust at the corners, nothing shiny. Reads as daylight, Rotterdam-grey, matter-of-fact.

**2. Night yard.** Ground: near-black navy. Ink: pale cyan-white. Accent: sodium-vapour amber, the colour of dock floodlights. Surface: dark painted steel, higher contrast, longer shadows. Reads as after-hours, the hour an on-call page actually comes in.

**3. Manifest paper.** Ground: warm off-white, close to kraft paper. Ink: dark ink-blue. Accent: stencil red. Surface: flatter, drawn rather than photoreal — closer to a technical illustration of a container than a render of one. Reads lighter and more approachable; the option if the other two feel too heavy for a site meant to invite a nervous client to write in.

Two typefaces: a plain humanist sans for all body text and captions, chosen for long reading comfort, not character; and a stencil face — the kind actually cut into shipping-container lettering — used only on the pieces themselves, for every stencilled word and number on a container's face. The two are never mixed within one block of text.

## Everything else the site needs

| | Build, later or never | Who decided |
|---|---|---|
| The way round the page | Build — one scroll, plus the fixed chapter rail described above | Me (follows from the concept) |
| A page for each project | Never — ferry and the migration are the only two projects with enough material; a separate page each would thin out, not add | Me — flag if he later wants ferry to have its own page |
| Every project listed | Later — a short "more" list (ferry, the talk, the runbook) could sit near the close if he gets more to add | Me, pending him |
| How to reach them, and a CV | Build — email link and a downloadable CV in the close | Dawit said the site is for people to write to him; **ask him:** does a CV PDF exist to link, or should the site be the CV? |
| What others say | Never, for now — nothing in the material, and not pursued | Me, per the fact sheet's gap |
| Languages | Build — English only | Me; **ask him:** Dutch too, given Rotterdam? |
| What a shared link shows, and the site's icon | Build — an Open Graph image (one container, stencilled with his name) and a plain favicon (a single container mark) | Me — swap for something of his if he'd rather |
| The page for an address that is not there | Build — a single empty, fully decommissioned container, with "nothing here" stencilled on it and a link back to the opening | Me |
| A blog | Never, for now | Me; **ask him:** he may want one once independent |
| A chat | Never | Me — the close's email link is the one way in, matching "write to him" |
| A legal notice | Build, if needed — depends on whether the site adds analytics or a contact form that stores data; a plain email link needs none | **Ask him:** does he want visit analytics, or should the email link be the only way to reach him with nothing logged? |

## What you ask for

A yes to this script, or what to change in it. The decisions made without asking are kept in `docs/story/decided-for-you.md`, with how to change each.
