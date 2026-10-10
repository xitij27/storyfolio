# Storyboard — The open job card

Status: direction approved by Mina in her third message: “Go with the direction you recommend.” Full storyboard supplied for review. No implementation or final captions. Her direction approval is not recorded as approval of every detailed beat.

## Waiting on Mina before public copy or release

1. Current study year, institution name, target placement dates and real contact/CV/blog links.
2. Permission and authorship for each selected bike photo, bracket CAD image and charger image. Until cleared, the script uses named conditional asset slots; it relies on no right to publish them.
3. The bracket's weight-comparison baseline if the 18% figure is to appear; collaborators if their work is shown or discussed. Figure currently omitted.

Other unanswered facts stay off the page. They do not stop this planning proposal.

## Idea

Question: How does Mina approach a mechanical problem?

One job-card packet follows the process she named: report, findings, parts, work, test ride. It has six thin leaves, each a surface for real evidence. It opens, separates to show connections, becomes a compact evidence wall, then reassembles for handover. These are representations of records, not invented models of her machinery or genuine customer job cards.

The page shows care and contribution through the supplied evidence. It does not claim a finished restoration, a proven bracket, a personal competition result or a lesson Mina has not described.

## Chapters

| Chapter | Name in the form | Role | What it tells | What the pieces do | What you can touch |
|---|---|---|---|---|---|
| 1 | Job received | Opening / who | Name, engineering discipline, placement purpose once confirmed; gear train/housing contribution | Packet rests with first leaf lifted; inventory visible | Jump to projects, contact, CV when supplied |
| 2 | Reported fault | Context | Bike restoration and the blog's reported wheel issue | Packet opens into paired report/evidence leaves | Open available source post; inspect approved photo |
| 3 | Findings | How | Job-card sequence; cracked hub flange described in blog | Same leaves form report → finding → action relationships | Select readable evidence details |
| 4 | Parts | All work | Bike restoration, bracket design, group charger | Six leaves form three paired project records | Jump to each project record |
| 5 | Work carried out | Contributions | Bracket design stage; charger gear train and housing; skills with limits | Pairs come forward in sequence with contribution/status fields | Expand images and concise evidence notes |
| 6 | Test ride / handover | Outcomes / close | Charger observation, bracket awaiting physical verification, restoration state unspecified; contact | Leaves reunite with status index visible | Email, CV, return to projects |

The last chapter uses the job-card field name, but does not claim a test ride or bike completion occurred. It explicitly distinguishes physical observation from pending verification.

## Beats

One beat per chapter keeps the page short. Screens are approximate viewport heights including transitions, not timed gates. About 5.5–6 screens on desktop; content determines mobile length. No scroll capture or enforced delays.

| Beat | Screens | Arrangement | Faces | Added elements | Working title and factual basis |
|---|---|---|---|---|---|
| 1 | 1 | Shallow six-leaf packet, one corner raised | Conditional garage-floor inventory photo; gear train/housing contribution record | HTML name, discipline and persistent contact shortcut | Introduction: F01; F02 provisional; A03, A06, A08 |
| 2 | 0.75 | Two leaves open beside the packet | Conditional wheel/hub photo; report from the rear-wheel blog description | Simple report/finding labels | Reported wheel problem: F13, F14, F18; no invented customer or repair outcome |
| 3 | 0.75 | Leaves step into a short connected sequence | Conditional hub detail; job-card fields from Mina's description | Fine lines connecting report and finding, not a simulated mechanism | Inspection and records: F18, A07; no claim of a completed repair |
| 4 | 1 | Three pairs in a compact evidence wall | Bike inventory; bracket CAD slot; charger photo or a factual text-only record | Project labels and status fields | Work index: F09, F13, A01–A03, A08 |
| 5 | 1.25 | Bracket pair then charger pair advances; others remain visible | CAD/design record; gear train/housing contribution; prototype observation | Text names personal contribution and group scope | Contribution: A02, A03; F12 for tools, with induction explicitly limited |
| 6 | 1 | Reassembled packet with result leaves offset | Charger observation; bracket not made/tested; project index | HTML contact and CV; brief answer through the documented process | Verification / handover: A02, A03, A06, A07; public contact to confirm |

No captions are finalized at this stage. Titles above identify subject matter and sources. Photograph labels must describe what the chosen image actually shows. Missing CAD/charger images get a clear text record, never fabricated evidence. If bike-photo permission remains unavailable, use a typographic record packet and omit visual claims until approved images exist.

## Interaction and movement

- Native scrolling maps gently to leaf positions. Sheets rotate only enough to reveal faces, then settle so images can be inspected. Text remains steady in HTML beside the scene.
- A desktop sticky scene accompanies the chapter content; it does not lock the visitor into animation. A small persistent rail uses chapter names, with direct Projects and Contact links.
- Image expansion is optional, keyboard operable and dismissible. No drag, hover or gesture is required to understand a project.
- On chapter jumps, settle immediately at the requested state. Keep all proof accessible while assets load. No opening loading screen or custom cursor.

## Thirty seconds and two minutes

The first screen presents Mina's name, mechanical engineering focus, confirmed charger contribution and contact shortcut. Current study year and placement period are inserted only after confirmation. A Projects link immediately reaches the three project records; the CV link is available from the top when a current file exists.

A reviewer can spend roughly half a minute on the opening and index, a minute on bracket/charger contributions and the remaining time on evidence or contact. These are design targets, not measured user behavior. The full scroll is optional.

## Without the scene

| Where | What the visitor gets |
|---|---|
| Phone | One column of readable document cards, images before notes, compact jump menu and top contact link. No sticky full-screen canvas, parallax or miniature desktop layout. Optional subtle card reveal only on capable devices with motion enabled. |
| Reduced motion | Fixed card arrangements and instant chapter jumps; no rotations, smooth scrolling, parallax or animated assembly. Same images, contributions and statuses. |
| No WebGL / context loss | Static HTML project cards with approved images. No error overlay replacing content. |
| No JavaScript | All chapters, project evidence, real links and contact present in server-rendered HTML. Images link to full-size files instead of a scripted viewer. |

Keyboard focus stays in document order. Chapter anchors accommodate the header. Use semantic headings, descriptive alternative text, generous touch targets and AA contrast. No essential wording is embedded only in a 3D texture.

## Colour, material and type

Choose look 1 for the first implementation. The alternatives are palette options for review, not additional animated worlds.

| Look | Ground | Ink | Accent | Leaves |
|---|---|---|---|---|
| 1. Workshop paper — selected | Warm off-white `#F3F0E8` | Charcoal `#222821` | Technical blue `#245A81` | Pale paper, fine grey rules, very restrained shadows |
| 2. Inspection sheet | Cool white `#F5F7F8` | Slate `#202C36` | Deep rust `#9A432C` | White sheets, precise grey edges |
| 3. Evening bench | Deep grey `#19211F` | Warm white `#EEEDE4` | Muted mint `#9FC9B6` | Dark grey cards with light rules; no metallic glow |

Source Sans 3 for readable headings and body text; IBM Plex Mono for short field labels, statuses and labels printed on the leaves. Self-host licensed font files. Body type about 18px desktop and at least 16px mobile; restrained headings, not oversized words that push proof below the fold. Monospace is not used for long paragraphs. Confirm contrast for the actual text states during build.

Use documentary photos with their real wear, tools and grease visible. Do not invent handwriting, customer records, CAD measurements or a physical bracket render implying manufacture. Rules and borders provide the document character; avoid distressed-paper filters that make evidence hard to read.

## Everything else

“Build” below means scope for a later implementation, not permission to implement now.

| Requirement | Build, later or never | Who decided / scope |
|---|---|---|
| Way round the page | Build | Planner: six anchors, Projects and Contact shortcuts, native browser scrolling |
| Page for each project | Later | Planner: inline records are sufficient initially; add pages when deeper evidence exists |
| Every project listed | Build | Planner: bike restoration, bracket, charger; no padded empty cards |
| Contact and CV | Build | Planner: verified email and current accessible PDF; public addresses and document await Mina |
| What others say | Never for this version | Mina: no testimonials; never fabricate them |
| Languages | Build English; later others | Planner: supplied material is English |
| Shared link and icon | Build | Planner: descriptive title, truthful summary, static approved evidence image or typographic alternative; simple MP document-style icon |
| Missing-address page | Build | Planner: plain return-to-work/contact links, no extra 3D scene |
| Blog | Later integration | Planner: link to verified Slow Miles address initially; do not recreate full posts from an index |
| Chat | Never for this version | Planner: no purpose for a two-minute reviewer |
| Legal notice | Build if legally applicable | Planner: establish deployment jurisdiction before release; no blanket claim that one is required |
| Privacy | Build proportionate notice if applicable | Planner: default no tracking, forms or third-party embeds; describe any actual collection |
| Analytics | Later | Planner: only if Mina identifies a useful question and privacy requirements are met |
| Loading and performance | Build | Planner: render HTML first, defer scene, lazy-load lower images, cap canvas resolution and pause offscreen work |
| Accessibility and validation | Build | Planner: keyboard, screen reader, reduced motion, no-JS/WebGL and real phone checks; review asset rights and factual copy before release |
| Hosting, domain and existing-site migration | Later | Mina must authorize deployment; planner supplies a deployable site only in a future build task |

## Future build approach and acceptance

A server-rendered/static page with a small Three.js enhancement is sufficient; no backend or customer-data system is needed. Scroll state controls only the six-leaf transforms. Use compressed approved image textures and modest geometry. Initial target: readable proof immediately on a midrange phone, minimal layout shifts, no large scene payload blocking content. Measure actual load and interaction performance once assets exist; do not promise unmeasured scores.

Review against four questions: can a reviewer identify Mina's contribution within thirty seconds, are design and tested outcomes distinct, is everything usable without animation, and can every public factual sentence be traced to facts.md? Final writing and release must pass all four.

## Approval

Mina has authorized choosing unspecified planning details, but has not yet approved this storyboard. Ask for a yes to the script or requested changes. No building is included in this planning version.
