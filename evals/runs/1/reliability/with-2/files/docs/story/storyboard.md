# Storyboard — Dawit Bekele

Concept A: the runbook, told in crates. Question: **How do you move something that is not allowed to stop?**

Object: **7 crates** — stylised steel shipping crates, closed and stacked at rest. Each crate keeps one identity for the whole page:

1. Entoto library (2014) — origin, stays mostly closed
2. Lumen Pay — route waypoint, stays closed (nothing of theirs to show)
3. Kestrel Freight: the 310-service migration
4. The Postgres 11→15 upgrade
5. `ferry`
6. The runbook
7. SRE North 2024 — the talk

## The chapters

| Chapter | Its name in the form | The role it holds | What you read | What the pieces do | What you can touch |
|---|---|---|---|---|---|
| Opening | — | The opening | His name, the question, where the work began | 7 crates arrive, dim, unarranged | Scroll to begin; rail nav appears |
| 1 | Preflight | Who / Where from | The route — three cities, three jobs, the years | Crates 1, 2, 3 line up as a route; 4–7 recede, dim | Click a crate on the route for its year/city/title |
| 2 | Shadow | How | Dual writes, shadow traffic, "boring on the day" | Crates 3 and 4 split apart, a bridge/second rail forms between them | Hover the bridge to see "old path" / "new path" labels |
| 3 | Dual Write | What | 310 services, the Postgres upgrade, ferry, the runbook — the work itself | Crates 3, 4, 5, 6 turn to face the viewer as a wall | Click any crate to open it: real artifact, short case text, a link out (ferry's GitHub, the runbook's stage list) |
| 4 | Cutover | What came of it | 99.98% (order API, 26 months, two incidents under ten minutes each), 85→22 weekly pages (the nine-person on-call team, "we"), the runbook at 40 teams | The four open crates show a number each on their inner face | Click a number to see what it measures and the honest caveat (the two incidents; "we," not "I") |
| 5 | Soak | Proof it held | The SRE North 2024 talk, public, slides linked | Crate 7 opens | Click to open the talk (video) and the slides |
| 6 | Decommission | The close | The answer to the question; going independent; how to reach him | All 7 crates close and restack into one block | Mailto link, copy-email button, link to the CV/resume |

## The beats

### Opening
| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 0.1 | 1 | Scattered, dim, drifting slightly, as if just unloaded | Faint, unreadable stencil marks — nothing legible yet | Dim ground, no light source fixed | "Dawit Bekele. How do you move something that is not allowed to stop?" |
| 0.2 | 1 | Same scatter, one crate (#1, the library) catches light first | Crate 1's face: "2014" stencilled, nothing else | A single light picks out crate 1 | "In 2014, at a university library in Addis Ababa, I dropped a table. I've cared about rollbacks since." |

### 1 — Preflight
| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 1.1 | 1 | Crates 1–3 settle into a line (a route); 4–7 drift back and dim | Crate 1: "Entoto Technical University Library, Addis Ababa, 2013–2016." Crate 2: "Lumen Pay, Amsterdam, 2016–2020. Card payment systems." Crate 3: "Kestrel Freight, Rotterdam, 2020–present. Staff Platform Engineer." | A faint line connects the three, like a shipping route on a map | "Three stops. The third one is where the runbook got written." |

### 2 — Shadow
| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 2.1 | 1 | Crate 3 steps forward; crate 4 (Postgres) appears beside it; a second rail/bridge forms between them | No text yet — the bridge itself is the image | Two parallel paths, lit differently (old = dim, new = bright) | "A migration that's boring on the day is one where the old system and the new one run side by side first, and nobody has to believe you before you cut over." |
| 2.2 | 1 | Bridge holds; a small label appears at each end on hover/tap | "Old path" / "New path" | — | "Shadow traffic, then dual writes. The runbook calls these by name: preflight, shadow, dual write, cutover, soak, decommission." |

### 3 — Dual Write
| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 3.1 | 1.5 (scroll opens the wall) | Crates 3, 4, 5, 6 turn to face the viewer, side by side, closed | Closed faces show a title each: "310 services." "4 TB, Postgres 11→15." "ferry." "The runbook." | Wall lit evenly, like a loading dock | "Four things to show. Click any of them." |
| 3.2a (crate 3 opened) | — | Crate 3 open | Real artifact needed: a clean diagram of the 26-month migration (not Kestrel's internal one) or a simple timeline Dawit redraws | — | "310 services, out of two data centres, in 26 months." |
| 3.2b (crate 4 opened) | — | Crate 4 open | Needs: a redrawn diagram of the dual-write path, or none — text can stand alone | — | "A 4 TB Postgres database, version 11 to 15, with dual writes and no maintenance window." |
| 3.2c (crate 5 opened) | — | Crate 5 open | Real artifact: a terminal screenshot of `ferry`'s cutover command; link to github.com/example/ferry | — | "A former colleague started ferry. I've maintained it since 2022, and I wrote its cutover command." |
| 3.2d (crate 6 opened) | — | Crate 6 open | The runbook's six stage names, laid out as its own small diagram | — | "I wrote the first version of the runbook. I still own it. Forty teams use it." |

### 4 — Cutover
| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 4.1 | 1 | The same four open crates, now showing their inner face — a number each | "99.98%" / "85 → 22 / week" / "40 teams" / (Postgres crate holds no outcome number — see note) | — | "What came of the four things above." |
| 4.2 | — (click/tap to reveal) | Same | On click, each number's caveat appears beside it | — | "99.98% availability on the order API, over 26 months — including two internal incidents, each under ten minutes. 85 to 22 pages a week, for the on-call team of nine, over about a year — half of that was deleting alerts nobody needed. Forty teams now use the runbook I wrote." |

Note: the Postgres crate (4) has a process outcome ("no maintenance window") but no standalone figure of its own — its number face can either repeat "no maintenance window" as text or this crate can sit out beat 4.1 silently. Decided for you: it sits out, silent, rather than inventing a number. **Flag to Dawit:** confirm this is fine, or supply one.

### 5 — Soak
| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 5.1 | 1 | Crate 7 steps forward and opens | Needs: the talk's title slide or thumbnail, as a real image; link to the video and to the slides | — | "'Boring Migrations,' SRE North 2024. The talk opens with 2014." |

### 6 — Decommission
| Beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Its caption |
|---|---|---|---|---|---|
| 6.1 | 1 | All 7 crates turn, close, and draw together into one stacked block | The block's single visible face: his name again | Light dims toward the one block, evenly | "I'm going independent next year." |
| 6.2 | 1 | Block stays, settled; a mailto line and a copy-email button sit beside it | Email address; link to CV/resume (corrected, no "zero downtime" line); link to the talk again | — | "If you're a company about to run a migration you're afraid of, or you're organising a conference — write to me." |

## Someone with thirty seconds

The first screen (beat 0.1) carries the name and the question. Beat 0.2, one scroll further, gives the first proof (the 2014 story, which is also the hook). A rail (left or right edge, numbered 1–6) jumps straight to any chapter; one "skip to contact" link in the rail jumps straight to Decommission (beat 6.2) and its mailto. So: name, what he does, one proof, and how to reach him are all reachable within two scrolls or one click.

## Without the scene

| Where | What the visitor gets |
|---|---|
| On a phone | Same chapters, same order, same captions, full text. The crate wall (3.1) becomes a vertical stack the visitor taps through one at a time instead of a side-by-side wall; the Shadow bridge (2.1–2.2) becomes a single before/after pair stacked vertically instead of side by side. Interactions become tap instead of hover (the bridge labels, the number caveats in 4.2 both show on tap). 3D is simplified to fewer, larger pieces per screen to keep it smooth. |
| With reduced motion | No drifting, no turning, no restacking animation. Each beat's arrangement appears already settled — a still render of that beat's layout, swapped (not animated) as the visitor scrolls past its threshold. Click/tap interactions (opening a crate, revealing a caveat) still work, just without a transition. |
| With no WebGL | The 3D is replaced by a flat illustration or photo of each beat's arrangement — the crates drawn in 2D, same identities, same order, same captions. All clicks (opening a crate, revealing a number's caveat) work as plain show/hide. |
| With no JavaScript | A single static HTML page, the six chapters stacked top to bottom as ordinary sections, each with a still image standing in for that chapter's crate arrangement and its full caption text already visible (nothing hidden behind a click). The runbook's six stage names, the figures with their caveats, the ferry link, the talk link, and the mailto are all present and crawlable, since none of them is 3D-only content. |

## The look and the type

Three looks — pick by scrolling the built page, not from this description:

1. **Freight yard at dusk.** Ground: near-black blue-grey. Ink: warm off-white. Accent: safety yellow/orange, used only for stencil marks and the one call-to-action. Crate surface: brushed steel with rivets and faint rust streaks.
2. **Cold warehouse daylight.** Ground: pale concrete grey. Ink: near-black. Accent: international orange. Crate surface: painted steel in a muted teal or green, worn at the edges, like a real intermodal container.
3. **Night shift, terminal green.** Ground: true black. Ink: warm white. Accent: a single CRT/monitor green, used for stencilled numbers and the cursor-like accent on links. Crate surface: dark matte steel, lit like a status board.

Two typefaces: a plain grotesk sans for all running text and captions (something like Inter or IBM Plex Sans); a true stencil face for whatever is "printed" on a crate — the stage names, the figures, the route labels (something like a genuine shipping-stencil or military stencil type, not a decorative one). The stencil face belongs to the crates only; body text never uses it.

## Everything else the site needs

| | Build, later or never | Who decided |
|---|---|---|
| The way round the page (rail nav + skip-to-contact) | Build | Decided for you — needed to pass "thirty seconds" |
| A page for each project | Later | Decided for you — revisit once there's more material (screenshots, case detail) for 310-migration, Postgres, ferry, or the runbook |
| Every project listed | Build, limited to the four confirmed ones (310-migration, Postgres, ferry, runbook) | Dawit, via the limits on Lumen Pay and the library |
| How to reach them, and a CV | Build | Dawit — explicitly the site's purpose |
| What others say | Never, for now | Decided for you — no quotes exist or were offered; see `decided-for-you.md` |
| Languages | Build, English only | Decided for you — **ask Dawit** if Dutch matters, given Rotterdam |
| What a shared link shows, and the site's icon | Build | Decided for you — preview: his name, the question, and the 99.98% figure; icon: a small crate mark |
| The page for an address that is not there (404) | Build | Decided for you — on-brand, a crate gone missing, with a way back to the top and to contact |
| A blog | Never | Decided for you — **flag to Dawit**, nothing in the material suggests regular writing beyond the one talk; reconsider if that changes |
| A chat | Never | Decided for you — "write to me" means email, not live chat |
| A legal notice | **Ask Dawit** | His call (and his accountant's) once independent — Netherlands may require an imprint/privacy notice depending on how he operates |

## Still needed before build

- One real picture of Dawit.
- At least one real artifact for the Dual Write wall: a terminal screenshot of `ferry`'s cutover command, and/or a clean, non-Kestrel-internal diagram or timeline for the 310-service migration and the Postgres upgrade. Without these, those two crates open onto text alone.
- The talk's title slide or a thumbnail, and the links to the video and slides.
- A decision on the Postgres crate's silent outcome face (noted above).
- Dawit's answer on Dutch, and on the legal notice.

## What I'm asking

A yes to this script, or what to change in it. What I decided for you, in full, is in `decided-for-you.md` alongside this file.
