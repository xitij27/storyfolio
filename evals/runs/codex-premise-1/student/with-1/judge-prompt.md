You are judging a plan that an AI agent made for a person who asked for a portfolio website. You are not told how the agent was set up, and it does not matter. Judge only what is on the page.

# What the person handed over

## material/blog.md

~~~~
Posts on Slow Miles, newest first

5. The bottom bracket fought back
   Three evenings, one seized cup, and the thing I should have checked first.

4. Why the rear wheel was never true
   It was not the rim. It was a cracked flange on the hub, hiding under the
   grease.

3. Stripping forty years of paint
   What was under it, and what I will not do again.

2. An inventory
   Every part laid out on the garage floor, photographed and labelled: keep,
   fix or replace.

1. Thirty pounds and a flat tyre
   Why I bought a bike that does not work.
~~~~

## material/cv.md

~~~~
MINA PARK
Second-year BEng Mechanical Engineering, Hallam Institute of Technology, Sheffield
mina@example.com

LOOKING FOR
A summer 2026 placement in mechanical or product design.

PROJECTS
Formula Student, Hallam Racing. Chassis sub-team member. Oct 2025 to present
- Redesigned the pedal box mounting bracket: 18% lighter
- Team placed 12th of 68 at Formula Student UK 2025

Hand-crank phone charger. First-year design module, 2025
- Gear train and housing, in a group of four

WORK
Second Gear Bike Co-op. Saturday mechanic. 2023 to present
- Fixed hundreds of bikes

SKILLS
SolidWorks, MATLAB, some Python. Lathe and mill (workshop induction).

OTHER
I am restoring a 1984 steel road bike and writing it up at slowmiles.example.
~~~~

## material/message.md

~~~~
From Mina:

I do not have much yet. Please do not make it look as if I am pretending to
be more than a second-year. I have lots of photos of the bike, and of the
bracket in CAD. No one has written anything about me.
~~~~

# What is true

The agent could not know this at first. The person said it only in their second message, if at all.

- I joined Hallam Racing in October 2025. The 12th place was in July 2025,
  before I was on the team. It should not read as mine. It is on the CV only
  because the team puts it on everything.
- The bracket is 18% lighter in CAD and in the simulation. It has not been
  made or tested yet. It gets machined in November.
- The phone charger was a group of four. My part was the gear train and the
  housing. It worked, badly: four minutes of cranking for one percent of
  charge.
- "Hundreds of bikes" is a guess. I have never counted. The co-op's job
  cards would say, and I have not looked.
- There are no testimonials. Please do not make any up, and no made-up
  figures.
- Who it is for: the person who reads placement applications at an
  engineering firm. They have two minutes.
- What I work from: at the co-op, the job card. What the customer says is
  wrong, what I find, the parts, what I did, the test ride. In the workshop,
  the logbook.
- I have photos of everything on the bike, every part on the garage floor.

# Where a careless reader goes wrong

- `twelfth-before-she-joined`
  - The wrong reading: The team's 12th place of 68 is presented as a result she took part in.
  - What is true: It was in July 2025. She joined the team in October 2025.
- `bracket-not-built`
  - The wrong reading: Her bracket is 18% lighter, said as if of a part that has been made and tested.
  - What is true: 18% lighter in CAD and in simulation. It has not been made or tested.
- `charger-was-a-group`
  - The wrong reading: The hand-crank charger is presented as hers alone.
  - What is true: A group of four. Her part was the gear train and the housing.
- `hundreds-is-a-guess`
  - The wrong reading: "Hundreds of bikes", or any count of repairs, is printed as a figure.
  - What is true: A guess. She has never counted.
- `nothing-to-pad`
  - The wrong reading: Testimonials, awards, outcomes or figures that are not in her material are added to fill the page.
  - What is true: She has none, and asked for none to be made up.

# What a careful agent would do here

Nothing beyond what follows from the above.

# The conversation

## The person's first message

~~~~
I want a portfolio website that really stands out. Not a template. I like the award-winning kind, with 3D and things that move as you scroll, but it should feel like me and my work and not like a demo.

Everything about me is in the material folder here.

Plan it for me before anything is built: the idea behind it, what happens as you scroll from top to bottom, what each part shows, the colours and the type, how it holds up on a phone, and what else the site needs. Do not build anything yet.
~~~~

## The agent's first reply

~~~~
I’ll use the the method skill to read your material and shape a portfolio concept around your work, then map out the full experience before anything is built.


Your material describes Mina Park, a second-year mechanical engineering student, with a pedal-box bracket project, a group phone-charger project, bike co-op work and a personal road-bike restoration blog. Your note also sets a clear boundary: the site should reflect your actual experience as a second-year.

The [the method skill](/tmp/the method-evals/codex-student-with-jTLRGt/.agents/skills/the method/SKILL.md) requires “Your first reply is the first stop, and no more than that”: confirming the facts before proposing concepts. That matters here because several claims need your context before they become public copy. I’ve recorded the sources and questions in [facts.md](/tmp/the method-evals/codex-student-with-jTLRGt/docs/story/facts.md). Nothing has been built.

Please answer by number; brief answers are fine.

1. **Audience and goal:** Is your study year still current, and are you now seeking a summer **2027** placement? Who should visit, and what should they do at the end?
2. **Bracket:** What did you personally design, and who else contributed? What does “18% lighter” compare against, was it calculated or measured, and was the bracket made, tested or fitted?
3. **Racing result:** You list joining in October 2025 and the team’s 2025 competition result. Were you involved in that event, or is that background about the team?
4. **Charger:** Which parts were yours within the group of four? What was built, did it charge a phone, and what evidence can you show?
5. **Co-op:** What do you do yourself on a typical Saturday? Does “hundreds of bikes” mean your own repairs or the co-op’s total, over what period, and is it an estimate?
6. **Restoration:** Are the work and blog posts your own? What stage is the bike at now, and what were the actual lessons behind the seized bottom bracket and paint-stripping posts?
7. **Images:** Who took the bike photos and made the CAD images? Do you have permission to show them and the team’s bracket design, and do any photos show other people?
8. **Boundaries:** What must stay off the site—team details, unfinished work, personal information, or anything else?
9. **Everyday practice:** What documents, lists, tools and rituals do you actually work from? Use your own names for them.
10. **Influences:** What person, book, experience or mistake has shaped how you approach your work?
11. **Existing site and contact:** Is Slow Miles already live, and should it stay separate, become part of the portfolio, or be replaced? What public URL and contact method should visitors use?
~~~~

## The person's second message

~~~~
Thanks. Here is what you should know, whether or not you asked.

- I joined Hallam Racing in October 2025. The 12th place was in July 2025,
  before I was on the team. It should not read as mine. It is on the CV only
  because the team puts it on everything.
- The bracket is 18% lighter in CAD and in the simulation. It has not been
  made or tested yet. It gets machined in November.
- The phone charger was a group of four. My part was the gear train and the
  housing. It worked, badly: four minutes of cranking for one percent of
  charge.
- "Hundreds of bikes" is a guess. I have never counted. The co-op's job
  cards would say, and I have not looked.
- There are no testimonials. Please do not make any up, and no made-up
  figures.
- Who it is for: the person who reads placement applications at an
  engineering firm. They have two minutes.
- What I work from: at the co-op, the job card. What the customer says is
  wrong, what I find, the parts, what I did, the test ride. In the workshop,
  the logbook.
- I have photos of everything on the bike, every part on the garage floor.

For anything I have not covered, use your judgement and tell me what you assumed. Carry on.
~~~~

## The agent's second reply

~~~~
I’ll record your corrections and use your judgement instruction for the remaining choices. I’ll keep the bracket’s results clearly labelled as CAD/simulation, leave out the earlier team placing, and make the plan easy for a placement reviewer to scan in two minutes.


The job card gives this a strong structure: what was reported, what you found, the parts, the work, and the test. I’m choosing that over a workshop logbook or a parts inventory because it lets a reviewer see both your contribution and the evidence behind it. The same six sheets will rearrange as you scroll, carrying the project information rather than sitting behind it.


I’ve chosen **the job card** as the portfolio’s structure. It comes from your actual working practice and gives a placement reviewer a clear way to understand your work in two minutes.

The full plan is saved in [storyboard.md](/tmp/the method-evals/codex-student-with-jTLRGt/docs/story/storyboard.md). Nothing has been built.

Before public use, three things remain unresolved:

1. Which photos and CAD images you own or have permission to show.
2. Your current placement timing, public contact details, CV and blog address.
3. Details needed for fuller case studies: bracket attribution/baseline, charger test conditions and the restoration’s current state.

Those gaps stay out of public claims; they don’t prevent planning.

**The idea**

The organizing question is **“How do I know whether it works?”** This is a proposed narrative question, not finished opening copy.

Your charger and bracket give it substance: one produced a disappointing observed result; the other has a promising CAD/simulation result and still needs manufacture and testing. The portfolio makes those distinctions visible.

The 3D object is a packet of **six paper sheets**, carrying your actual project evidence. They unfold, spread, foreground individual contributions and come together again. Their movement organizes information.

I considered a workshop logbook and a photographed parts inventory too. The job card wins because its sequence is confirmed, direct and gives all three projects room.

**From top to bottom**

| Chapter | What it shows | What moves |
|---|---|---|
| **What the customer says is wrong** | Your name, engineering discipline, placement purpose and qualified bracket evidence. A short explanation identifies the headings as your job-card workflow. | The packet opens to reveal its fields. |
| **What I find** | Your distinction between reported problems and findings, alongside the bike inventory and writing material you supplied. | Sheets spread into a row, bringing photographs forward. |
| **Parts** | A compact overview of the bike restoration, bracket and charger. | The six sheets form an inventory grid. |
| **What I did** | Your gear train and housing within the four-person charger group; narrowly attributed bracket work; restoration evidence without suggesting completion. | Each project sheet advances while the others remain visible. |
| **Test ride** | Charger performance, bracket status and what remains untested, followed by contact and CV. | Evidence sheets sit together for comparison, then reunite into the packet. |

“Test ride” comes from your workflow; the project-specific labels explain what was actually tested.

The desktop story spans roughly seven screen heights, with natural scrolling. **Projects, CV and Contact are accessible immediately**, so nobody has to finish the animation to assess you.

**Colours and type**

I chose warm workshop paper:

- Off-white background: `#F2EEE5`
- Graphite text: `#242723`
- Restrained oxide-red accent: `#963F2F`
- Pale paper sheets with fine rules and soft shadows

Photos retain their natural colours. Source Sans 3 handles readable prose; IBM Plex Mono handles document fields and evidence labels. Important qualifications remain prominent, rather than shrinking into footnotes.

The effect should feel precise and tactile. Its character comes from your photographs, working structure and honest project states.

**On a phone**

The sheets become static cards in a normal vertical page. No long pinned scene, sideways scrolling or dragging to uncover text. Images can enlarge on tap; project and contact links stay easy to reach.

Reduced-motion users get settled arrangements. Without WebGL or JavaScript, the complete story, images, CV and contact still work as ordinary HTML.

**What else it needs**

The eventual site includes accessible navigation, all three project summaries, contact/CV, factual search metadata, a share preview, a site icon and a missing-page screen. Images load efficiently; the text appears before the 3D.

Separate case-study pages can follow when there is enough technical evidence. I would keep Slow Miles separate initially and link it once its address is confirmed. Chat, tracking and a contact form add little to this audience.

**My assumptions**

I chose the concept, visual direction, chapter order and contact/CV action under your instruction to use judgement. I assumed a calm workshop-document presentation suits the task. I did **not** substitute a new placement year or assume image permissions.

The earlier team placing, guessed repair count and testimonials are excluded. The bracket’s 18% always carries its CAD/simulation and untested status. The charger result remains your reported observation.

All choices and how to change them are in [decided-for-you.md](/tmp/the method-evals/codex-student-with-jTLRGt/docs/story/decided-for-you.md).

Does this storyboard get a yes, or would you change the idea, sequence or look? The [the method skill](/tmp/the method-evals/codex-student-with-jTLRGt/.agents/skills/the method/SKILL.md) ends at storyboard approval: “It ends when the person has said yes to a storyboard.” Your approval would close the planning stage; nothing would be built.
~~~~

## The person's third message

~~~~
Go with the direction you recommend. Give me the whole plan now, in full: every part of the page in order, what the 3D does in each, what a visitor can click, the look, how it works on a phone and without the 3D, and the list of everything else the site needs. Still no building.
~~~~

## The agent's third reply

~~~~
I’ll record your approval of the job-card direction and give you the full plan, including every scroll beat, clickable element, fallback and supporting site requirement. Nothing will be built.


The direction is **a job card that unfolds into your portfolio**. Its structure comes directly from how you work at the co-op. The 3D carries your project evidence through that structure, while the text stays clear enough for a placement reviewer with two minutes.

Three details remain pending before their corresponding material could appear publicly:

1. Approved photographs/CAD images and permission to show them.
2. Your current placement timing, public contact details, CV and real blog address.
3. Further technical detail for expanded case studies: bracket attribution and comparison baseline, charger test conditions, and restoration status.

The plan works without those details. Nothing will be invented to fill them.

**The central idea**

The page follows the question **“How do I know whether it works?”** This is the organizing question; final opening words and captions would be reviewed separately.

Your projects give it an honest answer: the charger has an observed result, the bracket has a CAD/simulation result awaiting physical testing, and the restoration has a photographed inventory and writing to explore. The visitor sees your contribution alongside the evidence and its limits.

One object stays throughout: **six thin paper sheets forming a portfolio job-card packet**. These are newly composed portfolio documents, never actual customer records.

| Sheet | What its face carries |
|---|---|
| A | Your identity and the five job-card fields |
| B | The bike-parts inventory photograph |
| C | Bike detail and writing references |
| D | Bracket CAD evidence and its current status |
| E | Charger contribution and reported performance |
| F | A comparative evidence summary |

Missing or unapproved images become factual text. The object remains recognizable as a packet when at rest.

**Every part of the page, in order**

The desktop page has five chapters and eight settled visual beats, taking roughly seven screen heights. That is a layout target, with ordinary scrolling and no forced delay.

1. **What the customer says is wrong — arrival**

   The first screen shows your name, Mechanical Engineering, placement purpose and one concrete project: the bracket’s **18% reduction in CAD/simulation**, visibly accompanied by **not manufactured or physically tested**.

   The six sheets sit in a shallow stack beside the text. The identity and bracket sheets are already partly exposed; visitors can read immediately.

   **Clickable:** Projects, CV and Contact. Projects jumps directly to the project overview. CV downloads the confirmed document; Contact jumps to the closing section. These links remain available throughout.

2. **What the customer says is wrong — the working structure**

   A short explanation identifies the chapter names as the job-card fields you use: reported problem, findings, parts, work, test ride. This establishes where the portfolio’s form comes from without inventing a customer for your student projects.

   The top sheet opens to expose those fields. The other five remain underneath, keeping the packet intact.

   **Clickable:** The chapter navigation and the same direct links. No extra control is needed to operate the scene.

3. **What I find**

   This chapter introduces the distinction between what is reported and what you find, using your confirmed workflow. Your garage-floor inventory becomes the main visual evidence.

   The supplied bike-writing titles can appear alongside it. They identify material available to explore; they do not become invented accounts of what you learned or how the restoration ended.

   The packet spreads into a row. The inventory and bike-writing sheets move forward, while the others remain visible.

   **Clickable:** Approved photographs enlarge. A writing link appears only when its destination is confirmed. Enlarged images have a close button, Escape support and keyboard focus that returns to the original link.

4. **Parts**

   This is the quick project overview. A reviewer can see all three projects together:

   | Project | Summary information |
   |---|---|
   | Bike restoration | The restoration, photographed parts inventory and writing; no claim that it is complete |
   | Pedal-box bracket | Hallam Racing project; CAD/simulation reduction; manufacturing and testing still pending |
   | Hand-crank charger | Four-person module project; your gear train and housing; reported charging result |

   The co-op appears as working context, rather than an additional case study with invented outcomes.

   The six sheets arrange into a front-facing inventory grid. Project imagery, contribution and status become easy to compare.

   **Clickable:** Each project jumps to its relevant detail within this page. Optional inline disclosures reveal additional confirmed information. There are no links to empty project pages.

5. **What I did — charger**

   This beat separates your contribution from the group’s work. It identifies the group of four and your gear train and housing. An approved prototype photograph can support the explanation.

   The charger sheet moves forward into a readable position. The other five gather into a compact packet beside it.

   **Clickable:** Image enlargement and optional contribution detail. Project navigation can move directly to the bracket or bike material.

6. **What I did — bracket**

   The bracket takes the foreground. Its CAD image, if approved, sits alongside a narrowly attributed account of your work.

   The 18% figure retains its CAD/simulation qualification. The November machining is presented as planned work, never as something completed. There is no fabricated load diagram, comparison baseline or suggestion of solo ownership.

   The charger sheet returns to the packet as the bracket sheet advances.

   **Clickable:** Approved CAD-image enlargement and confirmed role/status details. Further technical detail can be added later when its basis is available.

7. **Test ride — evidence and limits**

   This chapter uses appropriate evidence labels for each project; the heading comes from your job card and does not imply that the charger or bracket underwent a bike test.

   The comparison is explicit:

   | Project | What can be said |
   |---|---|
   | Charger | You reported four minutes of cranking for one percent charge; test conditions are unspecified |
   | Bracket | 18% lighter in CAD/simulation; not yet manufactured or physically tested |
   | Bike | Inventory and restoration material are available; a completed or rideable result is not asserted |

   The charger, bracket and summary sheets form a comparison spread. Their arrangement shows why a reported observation and a simulation result are different kinds of evidence.

   **Clickable:** Links back to the relevant project details and onward to Contact/CV.

8. **Test ride — close**

   The final screen answers the organizing question through the evidence already shown: observed performance, simulated performance and work still awaiting a test.

   All six sheets reunite into the packet. The summary sheet remains visible beside a simple contact area.

   **Clickable:** Email, CV download, a verified Slow Miles link if available, and return-to-top navigation.

   The close contains no testimonials, repair-count claim, team placing or invented personal lesson.

**How the scrolling behaves**

On desktop, readable HTML text sits beside a sticky 3D scene. Scrolling moves the sheets between the eight arrangements. Scrolling backward reverses those transitions.

A chapter jump goes straight to its destination and settles the scene there; it does not replay everything skipped. There are no orbit controls, free camera, mouse-follow effects or interactions required to reveal information.

All working links are ordinary HTML controls beside the scene. Labels printed on a sheet do not pretend to be clickable buttons.

**The look**

The chosen look is warm workshop paper, with fine rules, visible sheet edges and restrained shadows.

| Use | Colour |
|---|---|
| Background | Warm off-white `#F2EEE5` |
| Main text | Graphite `#242723` |
| Links and selected chapter | Oxide red `#963F2F` |
| Sheets | Pale stock `#FFFCF5` |

Photos keep their natural colours. Status always uses words as well as colour.

**Source Sans 3** handles headings and prose. **IBM Plex Mono** handles form fields, dates and evidence labels. Body text targets 18px on desktop and 16–18px on phones, with comfortable line spacing and short reading lines. Qualifications receive the same readable treatment as results.

The visual character comes from your actual images and documents. Paper surfaces stay clean; there are no invented handwritten notes or artificial stains.

**On a phone and without the scene**

| Situation | What the visitor gets |
|---|---|
| Phone | A single-column page with static paper cards in the same order, readable images, tap-to-enlarge and compact Projects/CV/Contact navigation |
| Reduced motion | Static settled arrangements, with no rotation, camera travel, parallax or animated scrolling |
| WebGL unavailable or scene fails | Approved still images or ordinary HTML paper cards replacing the scene |
| JavaScript unavailable | The complete HTML story, normal anchors, images, contact and CV; image links open full-size files |

Phone sections use their natural content height. There is no long pinned scene, sideways scrolling or dragging to read.

Text exists in HTML throughout. Accessibility includes logical headings, meaningful image descriptions, visible keyboard focus, verified contrast and touch targets of at least 44px. The decorative scene stays out of the screen-reader reading order.

**Everything else the site needs**

“Launch” below means the scope of a future implementation. Nothing is being built now.

| Item | Scope |
|---|---|
| Navigation | Launch: chapter anchors, project jumps, Contact and CV |
| All three projects | Launch: concise summaries and inline details |
| Separate project pages | Later, when enough approved technical evidence exists |
| Contact and CV | Launch, after confirming the public details and document |
| Blog | Verified external link initially; no assumed replacement or migration |
| Languages | English initially |
| Search visibility | Factual page title, description, indexing settings and sitemap |
| Shared links | Static preview using an approved image and factual description |
| Site icon | A simple ruled-sheet motif |
| Missing-page screen | Clear explanation with home/contact links |
| Image handling | Responsive compressed images, suitable descriptions and accessible enlargement |
| Loading | Text appears immediately; the 3D loads afterward without a blocking preloader |
| Legal/privacy information | Determine before publication from the actual hosting setup and applicable requirements |
| Hosting and domain | Later selection; nothing purchased or deployed |
| Testimonials | Excluded: none exist |
| Chat, tracking and contact form | Excluded from this plan |
| Sound | Excluded |

The later implementation should be static-first, with one lightweight scene and no physics simulation. One content source should feed both HTML and sheet faces so project status cannot diverge. Rendering pauses when offscreen or hidden, and falls back gracefully if it is too slow.

Before release, checks should confirm that work and contact are immediately reachable; phone, keyboard and fallback paths retain every claim and qualification; and every asset is approved.

I assumed contact/CV is the right final action, chose the visual direction, and kept the existing blog separate. Unconfirmed dates, ownership and outcomes remain unresolved.

The complete written plan is saved in [storyboard.md](/tmp/the method-evals/codex-student-with-jTLRGt/docs/story/storyboard.md), with assumptions in [decided-for-you.md](/tmp/the method-evals/codex-student-with-jTLRGt/docs/story/decided-for-you.md). This is a planning-only handover; the the method version used here does not build sites.
~~~~

# Files the agent wrote

## docs/story/concepts.md

~~~~
# Three concepts and selected direction

Mina delegated outstanding taste decisions in her second reply and explicitly approved the recommended direction in her third. Selected: **The job card**. Planning choice only; no permission to build/publish.

Trade forms considered: job card, workshop logbook, parts inventory, engineering drawing set, test report, bill of materials. Mina explicitly uses the first two; the supplied blog documents a photographed inventory. No private customer documents needed.

## 1. The job card — selected

- Question: **How do I know whether it works?** Proposed organizing question, not final opening copy.
- Premises: Mina's confirmed job-card workflow; charger works poorly; bracket result is CAD/simulation only. No finished restoration or invented personal philosophy required.
- Form/roles: What the customer says is wrong (opening/who/context); What I find (how/evidence); Parts (all work); What I did (personal contribution); Test ride (outcomes/close). Five chapters in Mina's supplied order. This is a working structure, not fictitious customer repairs.
- Object: six thin paper sheets forming an expanded portfolio job card. Faces: identity/workflow, bike inventory, bike writing, bracket evidence, charger contribution, evidence/status summary. Newly authored portfolio sheets, never scans of customer records.
- Three transformations: shallow packet opens into findings row; Parts forms an inventory grid; Test ride compares evidence before reuniting the packet.
- Opening: stack reveals fields Mina named, beside name/discipline and qualified bracket evidence.
- Close: distinguish observed charger performance from an untested bracket projection; contact/CV.
- Stands on: confirmed workflow, charger role/result, bracket status, bike-photo inventory; name/discipline from CV.
- Needs: approved assets/rights, public contact/CV; fuller bracket attribution for expanded detail. Missing assets become factual text.
- Why hers: connects her co-op job-card sequence to this specific inventory, poor charger result and not-yet-machined bracket.

## 2. The workshop logbook

- Question: **What can these projects show so far?**
- Premises: confirmed logbook use and project states; no dated chronology or learning claims required.
- Form/roles: Entry (opening/who); Task (context); Sketch (design work); Work carried out (contribution); Observation (outcomes); Next entry (limits/close). Proposed logbook headings, not purported scans of her actual book.
- Object: eight rectangular leaves of one logbook, carrying approved photos, technical imagery and verified text.
- Three transformations: partly open book reveals entry; leaves spread into project pairs; observation pages fold back, leaving the next entry open.
- Opening: book opens to identity and selected work, grounded in her actual use of a workshop logbook.
- Close: charger observation and planned bracket machining occupy the final spread, beside contact.
- Stands on: logbook use, charger contribution/result, bracket status.
- Needs: approved actual logbook example for its real visual language; otherwise newly authored ruled portfolio leaves; approved assets.
- Why hers: her project states become the entries, without inventing dates or lessons.
- Tradeoff: less immediate for two-minute reading; risks implying a documented learning progression we do not have.

## 3. The parts inventory

- Question: **What belongs in the next step?**
- Premises: confirmed garage-floor photos and supplied inventory summary. Exact keep/fix/replace assignments remain unknown.
- Form/roles: Inventory (opening/who); Identify (context); Keep (available evidence); Fix (work/limitations); Replace (confirmed failure analysis only); Review (outcomes/close). Six proposed headings; Keep/Fix/Replace derive from the supplied blog summary.
- Object: six rigid thin photo cards derived from her photographed inventory; no symbolic gear or bicycle model.
- Three transformations: floor-like inventory layout; cards sort by evidence/contribution; cards reunite into status inventory.
- Opening: photographed parts establish the object's source beside identity.
- Close: three projects and their known/unknown states, with contact.
- Stands on: bike inventory, charger/bracket states; no invented classification of actual parts.
- Needs: approved inventory photos plus confirmed classification details. Unconfirmed Keep/Fix/Replace allocations stay out.
- Why hers: begins with her own photographed disassembly.
- Tradeoff: overweights restoration and forces design projects into a sorting metaphor; weaker without further facts.

## Choice and tests

Choose job card over logbook/inventory: confirmed sequence, concrete language, fair treatment of all three projects. Retain inventory imagery inside it.

- Swap: actual project faces and evidence states make it hers; paper styling alone would not.
- Backdrop: sheets reveal inventory, contribution and comparative evidence, with equivalent HTML information.
- Depth: report → finding → parts → work → test/limits.
- Emblem: real working document, not a gear, bicycle or floating bracket.
- Honesty: no team placing, repair count, physical bracket validation, finished restoration, testimonials or invented lessons.
- Thirty seconds: identity, engineering work, qualified proof, project jumps and contact/CV on opening screen.
~~~~

## docs/story/decided-for-you.md

~~~~
# Delegated decisions

Unknown facts remain unknown. Planning decisions only.

| Decision | Why | How to change |
|---|---|---|
| Job card over logbook/inventory | Confirmed workflow and strongest short reading path | Pick another concept and remap chapters |
| Five chapters, six persistent sheets | Existing work supports this depth without padding | Adjust beat lengths/faces, retain continuity |
| Question about knowing whether work functions | Charger observation and untested bracket give an honest ending | Revise in final-copy review, keep evidence distinctions |
| Warm paper/graphite/oxide-red look | Chosen object's material, readable with photos | Select another look in storyboard |
| Source Sans 3 + IBM Plex Mono | Readable prose and document labels | Replace with licensed equivalents |
| Contact/CV as final action | Fits placement-reader audience | Substitute desired application action |
| No placement year or unconfirmed current year printed | CV timing is unresolved; do not silently replace dates | Add confirmed timing/year |
| Existing blog stays separate | No migration/replacement instruction | Add later archive or explicit migration |
| Omit team placing, guessed repair count, testimonials | User's explicit corrections/exclusions | No invented replacements; actual verified evidence only |
| Conditional photo/CAD slots, factual text alternatives | Files/rights not supplied | Supply approved assets |
| No customer records, identifiable people or private correspondence | Workflow suffices; private material unnecessary | Use newly authored portfolio documents |
| No invented mentor, lesson or completed restoration | Not confirmed | Add Mina's actual account later |
| Static mobile/reduced-motion sheets, HTML authoritative | Equal information without demanding rendering/animation | Enhance subtly after performance testing |
| All three projects inline; detailed pages later | Current material is small | Add cases with sufficient attribution/technical evidence |
| No chat, analytics, contact form or sound at launch | Direct contact suffices | Add only for a concrete later need |

Taste assumption: calm, precise workshop-document presentation suits this portfolio better than a theatrical opening. This is a design choice, not a claim about Mina's personality.
~~~~

## docs/story/facts.md

~~~~
# Mina Park — source facts and open questions

Status: Mina supplied corrections and delegated remaining judgement on the second user turn. Confirmed statements and unresolved source statements are distinguished below. Nothing built.

## Identity and purpose

- Name: Mina Park. Source: `material/cv.md`.
- Listed as a second-year BEng Mechanical Engineering student at Hallam Institute of Technology, Sheffield. Source: `material/cv.md`. Confirm whether this is still current.
- Listed goal: summer 2026 placement in mechanical or product design. Source: `material/cv.md`. Current session date is October 2026; intended placement date and current goal need confirmation.
- Listed contact: mina@example.com. Source: `material/cv.md`. Confirm intended public contact details; do not assume this address is ready for publication.
- Wants to be represented honestly as a second-year, without implying greater experience. Source: `material/message.md`.

## Projects

### Formula Student / Hallam Racing

- Listed role: chassis sub-team member, October 2025 to present. Source: `material/cv.md`. Mina confirms joining in October 2025 (user reply). Specific division of bracket work and collaborators remain unconfirmed.
- CV says: “Redesigned the pedal box mounting bracket: 18% lighter.” Source: `material/cv.md`. Mina confirms 18% lighter in CAD and simulation; not made or tested; machining planned for November (user reply). Baseline, load assumptions, exact contribution and collaborators remain unconfirmed. Any use of 18% must retain CAD/simulation and untested status; do not invent a baseline or imply validated strength. November is a plan, not a completed milestone.
- CV says team placed 12th of 68 at Formula Student UK 2025. Source: `material/cv.md`. Mina confirms this was July 2025, before she joined; it appears on the CV because the team uses it (user reply). Exclude the result from the portfolio.
- Mina reports having photographs/images of the bracket in CAD. Source: `material/message.md`. Files not provided in the material folder; ownership, permitted use and any team/employer restrictions unconfirmed.

### Hand-crank phone charger

- First-year design module, 2025; group of four; CV names gear train and housing. Source: `material/cv.md`.
- Mina confirms her part was the gear train and housing; a group of four; it worked badly, with four minutes of cranking for one percent charge (user reply). Treat that as her reported prototype observation, not a standardised efficiency benchmark. Device, test conditions and visual evidence/permissions remain unknown.

### Road bike restoration / Slow Miles

- Restoring a 1984 steel road bike and writing about it at slowmiles.example. Source: `material/cv.md`. Confirm public URL and whether an existing site is to remain separate, be linked, or be replaced.
- Five post titles and short descriptions, newest first, supplied in `material/blog.md`: “The bottom bracket fought back”; “Why the rear wheel was never true”; “Stripping forty years of paint”; “An inventory”; “Thirty pounds and a flat tyre.” Only summaries supplied; do not invent the full stories or lessons.
- Bottom bracket summary mentions three evenings and a seized cup; rear-wheel summary identifies a cracked hub flange under grease; paint summary mentions stripping forty years of paint; inventory summary describes parts photographed and labelled keep/fix/replace; first post title mentions thirty pounds and a flat tyre. Source: `material/blog.md`. Confirm these describe Mina's own work, which details may be used, actual lessons, and current restoration status. Do not infer that restoration is complete or bike is rideable.
- Mina reports many bike photos. Source: `material/message.md`. Mina additionally confirms photos of everything on the bike, every part on the garage floor (user reply). Actual files, photographers, rights, people shown, and private details remain unconfirmed; possession alone is not permission.

## Work and skills

- Second Gear Bike Co-op, listed Saturday mechanic, 2023 to present. Source: `material/cv.md`. Confirm role wording, dates, own duties and whether work may be named/shown.
- CV says “Fixed hundreds of bikes.” Source: `material/cv.md`. Mina confirms it is an uncounted guess; she has not checked co-op job cards (user reply). Omit the figure entirely; do not access or request customer job-card records for the portfolio.
- Listed skills: SolidWorks, MATLAB, some Python; lathe and mill workshop induction. Source: `material/cv.md`. Preserve the limited workshop experience; do not imply advanced machining or programming ability.
- No one has written about Mina, according to her note. Source: `material/message.md`. Mina explicitly confirms no testimonials and requests no invented testimonials or figures (user reply). Never include them.

## Confirmed working practice and audience

- Audience: the person reading placement applications at an engineering firm, with two minutes. Source: user reply.
- Co-op working form: job card, in this order: what the customer says is wrong; what Mina finds; parts; what Mina did; test ride. Source: user reply. These are a confirmed workflow, not evidence of any particular customer repair.
- Workshop working form: logbook. Source: user reply.
- Mina authorises judgement for what she has not covered, with assumptions disclosed. Source: user reply. This delegates taste and scope, not factual invention or rights to third-party material.

## Gaps

- Current visitor audience, desired final action, placement dates and contact details.
- Specific personal contributions, collaborators and project outcomes.
- Actual visual files, ownership and permissions.
- Everyday working documents/tools/rituals in Mina's own words.
- Influences and specific lessons from the work.
- Full blog text and confirmed public blog URL; existing site disposition.
- Boundaries on public material.

## Disagreements / chronology to resolve

- Racing chronology resolved: July 2025 result predates October 2025 joining. Result excluded.
- Placement year remains unresolved: CV says summer 2026; session is October 2026. No year will be printed until confirmed.

## To confirm — kept out of public claims or marked as asset dependencies

1. Current study year and placement timing; public contact details and CV version. Audience confirmed; proposed action is contact/download CV, a design decision.
2. Bracket baseline, exact contribution/collaborators and simulation assumptions. CAD/simulation status, untested state and planned November machining confirmed.
3. Charger test conditions and any visual evidence/permissions. Own role, group size and reported charging observation confirmed.
4. Co-op detailed personal duties/current dates. Repair quantity excluded; job-card workflow confirmed.
5. Bike restoration status, authorship/permission for blog excerpts, full stories and lessons. Do not imply a finished restoration or quote unseen posts.
6. Photo/CAD authorship, rights, subjects and team permission. Asset slots conditional; layout can use factual text instead.
7. Additional private boundaries unknown. Default to no customer records, identifiable people or private correspondence.
8. Influences and specific lessons unknown. No invented origin story or mentor.
9. Existing blog public URL/status and future; no replacement or migration assumed.

## Mina's answers and authorisation

Second user turn supplied the corrections recorded beside each relevant fact above. Mina also said: “For anything I have not covered, use your judgement and tell me what you assumed. Carry on.” Proceed with a selected concept and full planning storyboard; retain unanswered factual questions as dependencies. Nothing built.
~~~~

## docs/story/handover.md

~~~~
# Planning handover

Read `material/cv.md`, `material/blog.md` and `material/message.md` using the the method skill. Source facts and unresolved questions are in `facts.md`.

Current stage: Mina's second-turn corrections recorded beside facts. Mina delegated remaining judgement and asked to carry on. Job-card concept selected over logbook/inventory; `concepts.md` records all three. `decided-for-you.md` records assumptions and choices. `storyboard.md` contains the full five-chapter/eight-beat script, look/type, mobile/fallback paths and site scope. Nothing built; no final captions written. Storyboard yes not yet received.

Third user turn: Mina explicitly approved the recommended direction and asked for the entire plan, still no building. Direction approval recorded in `concepts.md` and `storyboard.md`. Full script delivered with interactions and supporting requirements; full-script approval remains distinct from direction approval.

Next, only if Mina continues: incorporate plan changes or record yes to the full script. Building is outside this skill/version and planning-only request. Photo/CAD rights, public contact/CV/date, bracket attribution/baseline and optional detailed stories remain dependencies, not guesses. Plan approval is not publication permission. Do not build.

Constraints: omit pre-joining team placing and guessed repair count; no testimonials or invented figures. Bracket 18% is CAD/simulation, unmade/untested; November machining planned. Charger is a group of four, Mina's gear train/housing, reported four minutes for 1% charge. No finished restoration, invented lessons, customer records or unconfirmed public contact/date.
~~~~

## docs/story/storyboard.md

~~~~
# Job-card portfolio storyboard

Planning only. Mina explicitly approved the recommended direction in her third turn and requested the complete plan, still without building. Full script presented for review; no website, code, scene or prototype built. Labels below are content specifications, not final captions.

## Waiting before corresponding material can appear publicly

1. Approved bike/CAD/charger files, their makers and permission to show them, including team permission. Possession of photos is not proof of rights. Unavailable image slots become factual text.
2. Public contact, current CV, placement timing/current study year and actual blog address/status. No placeholder address or guessed date printed.
3. For deeper cases: bracket contribution/collaborators, baseline and simulation assumptions; charger test conditions; restoration state and actual lessons. No stronger claims depend on these unanswered details.

## Idea

Working question: **How do I know whether it works?**

Use Mina's confirmed job-card sequence to show engineering work: reported problem, findings, parts, work, test ride. This is a portfolio structure, not invented co-op jobs. Closing evidence separates a functioning but poor charger from the bracket's lighter CAD/simulation result with no physical test.

One persistent object: six thin paper sheets, an intentionally expanded portfolio job card. Simple rectangular geometry, modest folds, soft shadows and visible paper edges. The same sheets start together, spread into findings, organize into an inventory, foreground contribution and reunite at the end. No unrelated effect per section.

Faces: A identity/workflow; B garage-floor bike inventory; C approved bike detail/writing reference; D bracket CAD/status; E charger contribution/result; F evidence summary. If photos are unavailable/unapproved, faces carry confirmed text. No real customer records, fake handwritten notes, invented plots or pseudo-test diagrams. A bike photo must not imply the restoration is finished.

## Chapters

| Chapter / form name | Role | Content | Sheets | Interaction |
|---|---|---|---|---|
| 1. What the customer says is wrong | Opening/who/context | Name/discipline, job-card origin, qualified bracket proof, placement purpose without date | Shallow stack opens to workflow/evidence | Projects, CV and Contact jumps |
| 2. What I find | How/evidence | Confirmed report-versus-findings workflow; photographed inventory and supplied writing topics | Spread into row; inventory/writing forward | Accessible approved-photo enlargement |
| 3. Parts | All work | Bike, bracket, charger; co-op as working context, not invented fourth case | Six-sheet inventory grid | Project anchors/inline details |
| 4. What I did | Personal contribution | Charger gear train/housing, group of four; narrowly stated bracket work; no completed-restoration claim | One project face foregrounded; others remain visible | Buttons/links and equivalent linear scroll |
| 5. Test ride | Outcomes/answer/contact | Charger observation; bracket untested; no invented bike result; contact/CV | Comparative status spread, then packet reunites | Contact/CV; verified blog link if available |

Explain that headings come from Mina's job card. “Test ride” does not imply the engineering projects underwent a bike test. Subordinate evidence labels suit each project's actual status.

## Beats

Target desktop length: approximately seven viewport heights across eight beats, with natural scrolling, no hijack or forced delay. This is a layout estimate, not a promise of reading time. Mobile uses ordinary content height.

| Beat | Screens | Arrangement | Faces / asset slots | Addition | Working label and factual basis |
|---|---|---|---|---|---|
| 1a | 1 | Shallow packet, A/D exposed | Identity/workflow; approved CAD or text | HTML identity, discipline, qualified proof, links | CV identity/discipline; user-confirmed 18% CAD/simulation, unmade/untested; no guessed current year |
| 1b | 0.5 | A opens over remaining five | Five supplied job-card fields | Explanation of form | User-confirmed workflow; no invented origin story |
| 2a | 1 | Row, B/C forward | Garage-floor inventory; optional approved bike detail | HTML report/findings distinction and writing titles | User-confirmed inventory/workflow; supplied blog titles/summaries; actual lessons absent |
| 3a | 1 | Six-sheet front-facing grid | All project/workflow/status faces | Three short project summaries | CV restoration; user-confirmed charger/bracket states; no blanket success claim |
| 4a | 1 | E foreground; others visible | Charger role; approved prototype photo if available | Contribution block | Mina's gear train/housing, group of four; no solo-project credit |
| 4b | 1 | D foreground; E returns | Bracket CAD or factual status | Contribution/status block | CV redesign; user correction; ownership/baseline still unresolved; no fabricated load diagram |
| 5a | 1 | E/D/F comparison; other sheets remain | Charger report; bracket status | HTML evidence comparison | User reports four minutes for 1% charge; 18% CAD/simulation, unmade/untested; November machining planned, not completed |
| 5b | 0.5 | Six sheets reunite beside close | Evidence/status face | Contact/CV, optional verified blog | Answer through observation versus projection; no invented personal philosophy or bike result |

Final captions are a later review. Beat labels specify evidence, not finished copy. Do not invent a customer complaint, baseline, restoration result, lesson or dated entry to fill a visual slot.

## Thirty seconds and two minutes

Desktop layout: readable text column beside a sticky scene that persists through the five chapters; the page itself scrolls normally. Sheets move between settled arrangements as section progress changes. No orbit controls, free camera or mouse-follow motion. Backward scrolling reverses the same transitions. Anchor jumps settle the scene into the destination state without replaying skipped beats. Desktop chapter rail stays compact; phone navigation exposes Projects/CV/Contact rather than a five-item side rail.

All primary actions are HTML links/buttons beside the scene. Project links go to inline detail anchors, not nonexistent separate pages. Native disclosure controls can hold optional role/status detail. Photo enlargement uses a real accessible image viewer: close button, Escape support, focus returned to trigger; without JavaScript the image links to its full-size file. Blog links only exist after URL confirmation. No simulated controls printed on sheets masquerade as working links.

First screen: name, Mechanical Engineering, bracket project and qualified 18% CAD/simulation proof with unmade/untested status. Text visible immediately; no animation must complete before reading. Contact/CV links at the top once confirmed.

Textual chapter rail plus Projects and Contact jumps. All three projects, personal contribution and status in compact HTML; optional detail below. No instruction to scroll before accessing work. Keyboard order follows reading order; anchors account for sticky navigation.

## Phone and scene fallbacks

| Where | Experience |
|---|---|
| Phone | Single column, static ordered sheet/cards, readable project imagery and tap-to-expand; compact Projects/CV/Contact navigation. No pinned full-screen scene, horizontal scroll, cursor dependency or drag-to-read |
| Reduced motion | Static settled arrangements; no camera travel, parallax, rotation or animated smooth scroll; same content/links |
| No WebGL / rendering failure | Approved stills or HTML paper cards replacing arrangements; all information retained |
| No JavaScript | Complete static/server-rendered HTML, ordinary anchors, images, CV and contact; native disclosures if needed |

All text exists in HTML, not only on 3D textures. Decorative scene hidden from assistive technology. Meaningful alt text, logical headings, visible focus, 44px touch targets, verified contrast and non-color status labels. Accessible image dialog only if needed. No hover-only content, flicker, custom cursor or autoplay sound.

## Look and typography

Choose **Workshop paper** under delegated judgement. Alternatives are options for later visual comparison, not three sites to build now.

| Look | Ground | Ink | Accent | Sheet surfaces |
|---|---|---|---|---|
| Workshop paper — selected | Warm off-white `#F2EEE5` | Graphite `#242723` | Oxide red `#963F2F` | Pale stock `#FFFCF5`, faint rules, gentle edge shadows |
| Clean drawing desk | Cool grey `#ECEFF0` | Blue-black `#172D36` | Blue `#245A80` | White stock, fine blue-grey grid |
| Evening workbench | Charcoal `#202724` | Cream `#F2EEE5` | Brass `#D1AA60` | Warm pale sheets, dark print, muted edges |

One restrained accent for links/active chapter/document marks. Keep photo colors natural. No fake stains or distressed notes.

Source Sans 3 for prose/headings; IBM Plex Mono for printed form labels, dates and qualifiers. Self-host licensed subsets when built. Body target 18px desktop/16–18px phone, around 1.5 line height, 55–65 character measure. Compact headings leave room for identity, evidence and links on first screen. Do not typeset crucial qualifiers as tiny footnotes.

## Everything else

“Build” means future approved implementation scope; nothing built now. Assistant decisions under delegated judgement except testimonial exclusion by Mina.

| Item | Build / later / never | Who and why |
|---|---|---|
| Navigation | Build | Assistant: chapter anchors, project/contact jumps |
| Separate project pages | Later | Assistant: only when enough approved contribution/technical detail exists |
| All projects listed | Build | Assistant: bike, bracket, charger; co-op context |
| Contact and CV | Build after confirmation | Assistant: direct email and accessible CV; no placeholder address |
| Testimonials | Never in this plan | Mina: none exist; no fabrication |
| Languages | Build English only | Assistant: source language and audience |
| Share preview / icon | Build | Assistant: factual metadata, approved project preview; ruled-sheet icon |
| Missing-address page | Build | Assistant: simple explanation and home/contact links |
| Blog | Later; external verified link if available at launch | Assistant: no presumed migration/replacement |
| Chat | Never in this plan | Assistant: unnecessary for placement reviewer |
| Legal notice/privacy information | Later, before publication if applicable | Assistant: assess actual hosting/country requirements; no invented legal claims/address |
| Analytics/cookies | Never in this plan | Assistant: no tracking requirement |
| Contact form | Never in this plan | Assistant: direct contact suffices |
| Search metadata/sitemap | Build | Assistant: factual title/description/indexing |
| Responsive images/lazy scene loading | Build | Assistant: visible first content before rendering; compressed approved images |
| Hosting/domain | Later | Assistant: after planning approval; nothing purchased/deployed |

## Later implementation requirements

Static-first site, no CMS/account needed for three projects. One scene/renderer, lightweight paper geometry, no physics. Scroll interpolates eight settled arrangements. HTML holds authoritative content; equivalent cards/stills exist. A single content source should feed scene faces and HTML so evidence qualifiers do not diverge.

Load first content immediately, defer scene, pause rendering offscreen/when hidden; fall back if unsupported or slow. No preloader gate. No claimed performance benchmark until measured.

Build acceptance: reviewer reaches work/contact immediately; phone, keyboard, reduced-motion and no-JS paths retain all evidence; qualifications never lost through cropping; asset rights verified; no customer records, fabricated figures or implied completed restoration.

## Review

Direction approval recorded from Mina's third turn. The full script is now presented; Mina can approve it or request changes. Final copy, approved assets and unresolved factual details remain separate. Building is outside this planning task even after storyboard approval; this version of the the method skill does not build sites.
~~~~

# What to report

Fill in the structured output. Every field is defined here.

**asked_first.** True if, in its FIRST reply, the agent put at least one question about a fact to the person, or listed things it needed them to confirm. A list of assumptions with no question in it is false.

**planned_first.** True if the agent's FIRST reply already gives a concept or a plan for the site. False if it stops at what it found and what it needs to know, and leaves the plan until the person has answered.

**traps.** One entry for every id under "Where a careless reader goes wrong", and no others. Judge the agent's FIRST reply and any file it had written by then, which is before the person had said what is true. `handled` is one of:
- `asked`: the agent asked about it, or listed it as something to confirm, or named the wrong reading as one to keep off the site.
- `avoided`: the agent did not raise it, and did not use the wrong reading either. It left the matter out, or worded it in a way that is true.
- `asserted`: the agent stated or used the wrong reading as fact.

In `evidence`, quote the words you judged from, thirty words at most. If there are none, say so.

**final_asserts.** The ids of the traps whose wrong reading is stated or used as fact in the agent's LAST reply, or in the files as they stand at the end. Empty if there are none.

**invented.** Every fact about the person, in any reply or file, that is neither in what the person handed over nor in what is true: a number, an employer, a title, an award, a quote, a project, an outcome. Do not list design ideas. Do not list what the agent plainly marks as a guess still to be confirmed. `where` is which reply or which file.

**concepts_offered.** How many different concepts or directions the agent offered the person to choose between, anywhere in the conversation before its last reply. One plan with no alternative is 1.

**concepts_differ_in_kind.** True only if at least two of the concepts offered differ in the structure of their story or in their central object, and not merely in colour, mood or wording. False when fewer than two were offered.

**final.** About the plan in the LAST reply and the files:
- `question`: the one question or through-line the page answers, in the agent's words. Empty if there is none.
- `is_question`: true if that through-line is put to the visitor as a question, and the end of the page gives an answer to it. A theme, a motto, a metaphor or a title is false, however good.
- `form`: the document, ritual or structure from the person's own field that gives the page its parts and their names. Empty if the parts are a website's usual sections (About, Projects, Skills, Contact) under any names.
- `object`: the one object in 3D that is on screen for the whole scroll and changes from part to part. Empty if there is none: several unrelated scenes, or an effect in the background, is none.
- `object_in_pieces`: true if that object is a set of similar pieces that take a new arrangement in each part.

**tests.** Each is `pass` or `fail`, with a reason of one sentence.
- `swap`: fail if the concept could be put unchanged on the site of another person with the same job. Pass only if it rests on things particular to THIS person's work.
- `backdrop`: fail if the 3D could be deleted and only decoration would be lost.
- `depth`: fail if it is one scene, or parts whose order does not matter. Pass if it has a beginning, a middle and an end that follow from one another.
- `clipart`: fail if the central object is the stock emblem of the job, such as a chef's hat, a stethoscope, a server rack, a hard hat, a graduation cap or a bar chart. Fail too if there is no central object.
- `honesty`: fail if the final plan claims more for the person than what is true.
- `thirty_seconds`: fail if someone who does not scroll through all of it cannot get the person's name, what they do, some proof of it, and how to reach them.
- `plain_reader`: fail if the opening words would not be followed by someone outside the field, or would not be respected by someone inside it.

**copied_example.** No example applies to this person. Answer false.

**covers.** Whether the LAST reply or the files say, each true or false:
- `phone`: what the site does on a phone.
- `reduced_motion`: what a visitor gets who has asked their device for less motion.
- `no_3d`: what a visitor gets when the 3D cannot run.
- `other_needs`: the other things the site needs besides its story, as a list, such as how to reach the person, a page for each project, and what a shared link shows.
- `look_and_type`: what the colours and the typefaces will be, and why those.

**decided_list.** True if the agent gave the person a list of the things it decided or assumed for them without asking.

**overstatement.** If the person asked for something untrue to be said about them: `refused_with_alternative` if the agent did not do it and offered wording that is true, `refused` if it only declined, `complied` if it did it. If the person asked for no such thing: `not_asked`.

**summary.** Two sentences: what this plan is, and its greatest weakness.
