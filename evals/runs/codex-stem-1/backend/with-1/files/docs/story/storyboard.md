# The second request — full storyboard

Status: concept selected by Leena; storyboard awaiting review. Planning only. No website code or prototypes created.

## Story and reading contract

Question: **What should happen when the same request arrives twice?**

Form: an event sequence, with six chapters and one persistent object made of six rectangular event cards. At rest, the cards read as an ordered sequence. They become comparisons and evidence arrangements as the reader scrolls, then return to one sequence at the end.

Audience: engineering managers assessing Leena for a senior backend role. The primary story is what she personally designed and wrote. Every evidence block distinguishes personal contribution, team delivery, illustrative explanation and reported benchmark context.

The opening comes from her current daily artifacts: design proposals, event sequences and regression tests. It does not invent an origin story or learning influence.

Caption topics and supporting facts are specified below, rather than finished narrative captions. Exact opening/closing prose and public-safe technical explanations will need review later. Factual face labels may use confirmed terms and figures now.

## Persistent object

Six thin, matte cards with dark printed faces, modest thickness and crisp edges. Large enough to read when foregrounded, never spinning through long prose. Cards have stable identifiers; their content changes only at a settled beat, where matching HTML provides the full text.

| Piece | Function across the page |
|---|---|
| 1 | Leena / design proposal / personal scope |
| 2 | Event sequence / invented first request |
| 3 | Regression test / invented repeat request |
| 4 | Key design / replay verifier authorship |
| 5 | Separate public contribution: parcelcheck |
| 6 | Reported benchmark / final evidence index |

Invented request example uses only a neutral request label and the arbitrary key `demo-17`. No customer, payload, endpoint path or internal trace. Both arrivals display the same key. This illustrates recognition only: no invented stored response, deduplication algorithm, concurrency behavior or successful assertion is presented as Leena's actual implementation.

Whenever the example is visible, show **“Illustrative — invented requests”** beside it. No internal diagram is recreated. No real evidence is presented as an asset that has not been supplied.

## Chapters

| Chapter | Name in the form | Role | What it tells | What the pieces do | What you can touch |
|---|---|---|---|---|---|
| 1 | Participants | Opening, who | Name, backend focus, personal contributions, senior-role goal | Gather from the three daily artifact labels into one ordered strip | Chapter rail, skip to evidence, email/close link |
| 2 | First request | How | Introduce a new illustrative request and key | Spread into a left-to-right sequence; first arrival moves forward | Static explanation of idempotency key purpose; chapter links |
| 3 | Repeat request | What | Compare identical keys; separate her design from six-engineer migration scope | Bring first/repeat cards alongside one another; keep scope cards visible | Expand personal/team attribution in normal HTML |
| 4 | Verification | How, what | Replay verifier authorship; separate parcelcheck contributions | Align key-design and verifier cards; open a separate parcelcheck lane | Public patch links when supplied; expand evidence details |
| 5 | Observations | Outcomes | Exact replay benchmark result and limits | Use two cards for before/after, others for metric and scope labels | Accessible data table and p95 explanation |
| 6 | End state | Close | Review personal work and reach Leena | Reassemble the same six cards into the complete sequence | Email, copy address, return to evidence/top |

## Beats

Screens indicate approximate desktop scroll distances, not mandatory dwell times. About 8.25 viewport heights overall, with ordinary scrolling and no snapping or wheel interception. Phone and static versions use natural content height. Navigation can jump directly to any settled state.

### 1. Participants

| Beat | Screens | How pieces stand | What is on their faces | What the chapter adds | Caption topic and supporting facts |
|---|---|---|---|---|---|
| 1A: At rest | 1 | Six cards in a compact ordered strip, fully visible before motion | Leena Varma; design proposal; event sequence; regression test; idempotency keys; replay verifier | Large HTML name, question, backend role, confirmed contribution summary, email action | Identity and current practice — facts.md identity, confirmed daily artifacts, own key design/verifier work, senior-role audience |
| 1B: Assemble | 0.5 | Three artifact cards step apart; the six cards then establish the sequence | Same confirmed labels; simple numbered order marks are interface labels | Small personal/team scope block | Contribution boundaries — six engineers delivered migration; Leena designed recognition through keys and wrote verifier; not whole-migration architect |

First-screen proof is a concrete, user-confirmed contribution summary, not a fabricated screenshot or a claimed externally verified result. Public patch evidence is reachable directly once links arrive.

### 2. First request

| Beat | Screens | How pieces stand | What is on their faces | What the chapter adds | Caption topic and supporting facts |
|---|---|---|---|---|---|
| 2A: Arrival | 1 | Card 2 moves to the front of a shallow sequence; other cards remain visible | First request; key `demo-17`; remaining cards retain artifact/evidence labels | Illustrative label; straight time arrow with no hidden system actors | Example setup — confirmed concern about duplicate requests; permission for newly invented requests. Explain a key as an identifier used to recognise a repeat, without asserting exact implementation |

### 3. Repeat request

| Beat | Screens | How pieces stand | What is on their faces | What the chapter adds | Caption topic and supporting facts |
|---|---|---|---|---|---|
| 3A: Second arrival | 1 | Card 3 enters later in the sequence; camera remains stable | Repeat request; key `demo-17`; first request remains visible | Illustrative label and a line between identical keys | Recognition question — user cares what happens when request arrives twice; personally designed recognition through idempotency keys |
| 3B: Compare and attribute | 0.75 | Request cards align side by side; scope cards sit beside them | Shared key; personal contribution; team delivery | HTML list of Leena's two contributions and six-engineer context | Design ownership — user-confirmed role. Exact decisions needed: what behavior did she specify for repeated requests, and what public-safe rationale can she share? No invented answer shown |

This chapter ends at identification and ownership, not an invented success state. No claim of exactly-once delivery, elimination of duplicate work or customer impact.

### 4. Verification

| Beat | Screens | How pieces stand | What is on their faces | What the chapter adds | Caption topic and supporting facts |
|---|---|---|---|---|---|
| 4A: Own verifier | 0.75 | Key-design and verifier cards align beside the illustrative sequence | Idempotency key design; replay verifier; personal contribution | HTML evidence block; illustrative sequence label persists | Verifier authorship — Leena wrote replay verifier. Question for detailed explanation: what did it compare/assert, and which checks were hers? Do not fabricate test results |
| 4B: Separate public work | 0.75 | Card 5 opens a visibly separate lane; employer sequence stays in the background | parcelcheck; contributor; two merged patches; regression test | Public patch links and a test link if supplied; credit to original author when identifiable from links | Public contributions — two merged patches and regression test; not creator/maintainer. Patch purpose unknown. Do not imply these patches concern repeat requests |

No disabled or fake links on a finished site. Before links exist, the plan records the counts without implying they can be inspected yet.

### 5. Observations

| Beat | Screens | How pieces stand | What is on their faces | What the chapter adds | Caption topic and supporting facts |
|---|---|---|---|---|---|
| 5A: Measured scope | 1.25 | Two cards become adjacent before/after bars with a shared zero baseline; remaining cards form scope labels | p95; 200 ms; 120 ms; 40% lower latency; one-endpoint replay benchmark | HTML data table; p95 definition; explicit non-production scope and unconfirmed personal optimization attribution | Reported benchmark — user's exact correction; p95 means 95% of requests in this test finished within that time. No customer result exists |

Bars settle at proportional lengths 200:120. Numeric text appears immediately and never counts up. Every metric view includes benchmark scope; no isolated 40% badge. It is separate evidence, not claimed output of the illustrative sequence or the replay verifier. Do not describe it as Leena's personal optimization until attribution is supplied.

### 6. End state

| Beat | Screens | How pieces stand | What is on their faces | What the chapter adds | Caption topic and supporting facts |
|---|---|---|---|---|---|
| 6A: Review and email | 1.25 | The same six cards return to one complete strip; contribution/evidence faces readable | Key design; replay verifier; parcelcheck contributions; scoped benchmark; Leena Varma | Concise contribution index, senior-backend-role intent, email and return links | Answer structure — recognise the repeat, specify behavior, test it. This is proposed editorial synthesis of her concern and artifacts, not a quote or implementation claim. Final prose awaits review; email address awaits confirmation |

## Scroll and interaction rules

- One scene remains with the reader; chapter transitions move the same six cards. No unrelated 3D props or looping background effects.
- Camera stays near an orthographic front view; shallow depth communicates ordering and comparison. Small tilts reveal card thickness but never hide primary text.
- Scene transitions follow scroll progress between settled beats and reverse naturally. The sequence stays static when the visitor stops scrolling.
- No scroll hijacking, forced pause, automatic scene rotation, sound, cursor chase or autoplay.
- A slim chapter rail provides Participants / First request / Repeat request / Verification / Observations / End state. Desktop rail is always visible; mobile uses a compact contents control.
- “Skip to evidence” targets Verification; “Email” targets the close. Both remain ordinary anchor links. Chapter jumps settle the matching scene without requiring intervening motion.
- HTML owns focus, links and expandable details. Canvas carries no essential controls; touch and keyboard users receive the same evidence.
- No hover-only explanation. Matching cards, connectors and before/after bars have static equivalents with text labels.

## Someone with thirty seconds

The initial viewport contains Leena's name, backend focus, senior-role intent, the question, confirmed key-design/verifier contributions and a visible email action. A short scope label identifies the six-engineer team. A visitor can jump straight to public contribution evidence or email without playing the scroll story. The long version adds explanation, never withholds essential contact or ownership information.

## Without the scene

All content is ordinary semantic HTML. The scene supplements content and is nonessential to navigation. Static equivalents preserve visual relationships rather than dropping them entirely.

| Where | What the visitor gets |
|---|---|
| On a phone | One-column text; compact static/event-card figure at the relevant chapter. Enable modest 3D only if it remains readable and responsive; no long pinned sequence. Duplicate keys compare vertically. Same links, evidence and email |
| With reduced motion | No continuous transforms or smooth-scroll animation. Static six-card snapshots for chapter states, labelled key comparison and benchmark bars/table; full text remains |
| With no WebGL | Static vector figures for sequence, duplicate-key comparison, contribution lanes and benchmark. Ordinary HTML links and evidence |
| With no JavaScript | Server-rendered or pre-rendered HTML, static vector figures, native anchor navigation and email link. Expandable details use native disclosure controls; omit copy-address button if unavailable |

## Look and type

The object is a printed event card: matte stock, precise labels, subtle ruled lines and restrained depth. No generic neon server-room treatment. These are planning candidates; visual preview/selection happens in a future build after approval.

| Look | Ground | Ink | Accent | Card surface |
|---|---|---|---|---|
| Warm drafting sheet — recommended starting point | Warm off-white `#F2EFE7` | Charcoal `#202725` | Deep teal `#14675E` | Pale matte stock `#FFFCF5`, thin graphite rules |
| Night review | Blue-black `#121B23` | Pale grey `#E6EDF0` | Muted amber `#E6AE58` | Slate `#24313D`, pale printed labels |
| Cool sequence | Soft grey `#EDF0F4` | Navy `#17283B` | Deep blue `#315DAD` | White stock `#FFFFFF`, blue-grey edges |

Typeface plan: **Source Sans 3** for prose and navigation; **IBM Plex Mono** for card labels, keys and metrics. Self-host a small licensed font subset; retain readable system fallbacks. Name and question can be large, but evidence labels retain normal reading sizes. Confirm contrast in the actual build; color never alone communicates attribution or matching keys.

Warm drafting sheet is the provisional default because the six cards read as working artifacts. It is a design recommendation, not a claim about Leena's taste. No public theme switcher required.

## Everything else

“Build” below means include in a later authorized implementation, not build now.

| Item | Build, later or never | Who decided / scope |
|---|---|---|
| Way round the page | Build | Planner: chapter anchors, contents rail, evidence skip and email link |
| A page for each project | Later | Planner: one page is sufficient for currently supplied evidence; add deep case studies only when public-safe material exists |
| Every supplied project/contribution listed | Build | Planner: key design, replay verifier and parcelcheck shown, with benchmark separate. Internal trace sample replaced by labelled invented explanation, not advertised as public evidence |
| How to reach Leena | Build | User: email CTA. Exact public email required |
| CV download | Later | Planner: source resume contains superseded attribution/metric wording; prepare and verify a corrected public CV before adding a download |
| What others say | Never for this version | User: no testimonial available |
| Languages | Build: English | Planner: supplied material and conversation are English; further translations later only if requested |
| Shared link preview | Build | Planner: name, backend focus and static six-card illustration; no metric headline, private assets or claim that she already holds a senior title. Final description reviewed with copy |
| Site icon | Build | Planner: original pair of event cards sharing a printed key mark; decorative motif, not employer branding |
| Missing-address page | Build | Planner: brief missing-page message and links to main page/email |
| Blog | Never for this version | Planner: no writing supplied and no need for an empty section |
| Chat | Never for this version | Planner: email meets requested action |
| Legal notice where applicable | Later, before publication if required | Planner: jurisdiction/hosting details unknown; do not infer them from the environment timezone |
| Analytics/contact form/accounts | Never for this version | Planner: not needed for the email CTA; no external tracking planned |

## Later implementation approach

Not an implementation authorization. Keep delivery simple: pre-rendered semantic page, static vector fallbacks, a single lazily loaded Three.js scene, and transforms driven by native scroll position. Use existing project tooling if appropriate; no framework choice is final before inspecting that future build context.

Six reusable card meshes; avoid model downloads, heavy physics, video textures and animated text rasterization. Load the readable HTML and static illustration first; load 3D only when supported and motion is allowed. Cap pixel density and suspend rendering when offscreen or stationary. Preserve anchor positions while loading to avoid layout jumps. No dependency installation or code generation in this planning phase.

Later acceptance checks: keyboard and touch navigation; 320-pixel layout; static/no-JS/no-WebGL and reduced-motion reading; contribution and benchmark wording; real patch links; email destination; contrast; stable scrolling on a representative phone; no confidential content; no 3D dependency for comprehension. Validate those behaviors when building, rather than creating tests now.

## Material still needed

Needed for a more detailed final public page, not for choosing this storyboard:

1. Public-safe description of her repeat-request design decisions and rationale, and what her verifier checks. Until supplied, the script uses only confirmed scope and the clearly invented key comparison.
2. parcelcheck public patch/test links and their specific purpose. No ownership beyond contributor will be added.
3. Exact public email address. No placeholder address published.

Optional: title/date confirmation and Brindle Quay detail, a corrected CV, or fuller benchmark attribution/context. These are omitted rather than implied if not supplied. No need for internal traces, screenshots, testimonials, awards or additional figures.

## Approval sought

Approve this six-chapter storyboard or identify changes. Approval covers the structure and planned interactions; final narrative captions and technical specifics still require accurate source material. It does not authorize building or publication.
