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
I’ll use the the method skill to review your material and develop a concept rooted in your work, including the scroll sequence, visual direction, mobile experience, and site requirements. I’ll keep this entirely at the planning stage.


Mina, your material describes a second-year mechanical engineering student with work spanning Formula Student, a group charger project, Saturday bike repairs and a steel road bike restoration. You explicitly want the site to reflect your experience honestly. The restoration writing gives us personal material alongside the CV.

Before choosing the idea, scroll sequence or visual style, I need to confirm a few things that would shape them. The [the method skill](.agents/skills/the method/SKILL.md) requires the first step to be “facts to confirm and questions to answer,” so we don’t design around an assumed contribution or an overstated result. I’ve recorded the sources in [facts.md](/tmp/the method-evals/codex-student-with-QKKKMt/docs/story/facts.md); nothing has been built.

You can answer briefly by number.

1. **Who should the site reach, and what should they do at the end?** Your CV targets summer 2026 placements; is that now summer 2027, or something else? Are you still a second-year?

2. **What did you personally do on the pedal box bracket?** What does “18% lighter” compare against, was it calculated in CAD or measured, and was the bracket made or tested? Who else contributed?

3. **Were you involved in the team’s 2025 competition result?** The CV lists joining in October 2025 alongside the team placing 12th of 68. I need the timing and your role before connecting those facts.

4. **What was your part in the phone charger?** Which parts of the gear train or housing did you design, what did the others do, and did you build a working prototype?

5. **What do you do at the bike co-op?** Is “Saturday mechanic” your official title, are you still there, and does “hundreds of bikes” describe your own repairs or the co-op’s total? Roughly over what period?

6. **Where has the road bike restoration reached?** Which episode best represents you, and what actually happened or changed in that episode? I have the post summaries, but not the full stories.

7. **Who made the bike photos and bracket CAD images, and what may be shown?** Can the team’s work be displayed, are other people visible, and is anything private or off limits?

8. **What do you work from day to day?** For example, sketches, parts inventories, measurements, CAD versions or workshop notes—use the names you use yourself.

9. **What has shaped how you work?** A person, book, mistake or experience, and what you learned from it.

10. **Are the email and blog address placeholders?** Do you already have a portfolio, and if so, should this replace it?
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
I’ll record your corrections and use your permission to make the remaining planning decisions. I’ll leave the team result and uncounted repair total out, and clearly label the bracket as work awaiting manufacture and testing.


I’d choose **The Job Card**: a portfolio that unfolds like the records you use at the co-op. The 3D object is a set of six paper cards carrying your work—not a rotating bike or an engineering-themed backdrop.

A few things remain unconfirmed before publication:

1. Your current study year, placement season and public contact details.
2. Photo ownership and permission to show the team’s CAD.
3. The bracket’s comparison baseline and your exact contribution.
4. The real blog address and which project images are available.

The plan works without guessing those answers.

### The idea

The page answers one question: **“How does Mina work through a mechanical problem?”**

Its structure follows the five fields you named: what the customer reports, what you find, the parts, what you do, and the test ride. That gives the animation a purpose: the same cards reorganize to show evidence, contributions and outcomes.

The cards are newly designed portfolio records. They won’t imitate confidential customer job cards or invent workshop entries.

I considered three directions:

- **The Job Card:** six sheets move from an intake stack to an inspection spread and finally a review. This has the strongest foundation because you supplied its actual sequence.
- **The Workshop Logbook:** six leaves unfold into project records, observations and pending checks. It suits work in progress, but we don’t know your real logbook structure.
- **The Parts Inventory:** six photographic labels organize the bike through “keep, fix or replace.” It could be striking, but we would need your actual part decisions, and those categories fit the other projects less naturally.

I’ve selected the first under your instruction to use my judgment.

### From top to bottom

| Part | What the visitor sees | What happens in 3D |
|---|---|---|
| **1. Customer report** | Your name, mechanical engineering discipline, placement intent and the central question. A visible evidence strip identifies your charger contribution: gear train and housing, in a group of four. CV and contact are immediately accessible. | Six cards sit in an offset stack. The front card and project tabs are readable from the start. |
| **2. Findings** | Your confirmed working routine: customer report, findings, parts, work carried out, test ride. Workshop logbook use appears alongside it. This describes your co-op practice without pretending every project followed that process. | The stack fans into the five fields, making their order visible. |
| **3. Parts** | Three projects: the bike restoration, bracket and charger. Each has a visual, a short scope description and a status. The garage-floor inventory photograph anchors the bike material, subject to clearance. | The same cards flatten into three paired inspection spreads. |
| **4. Work carried out** | Individual contribution comes first. The charger shows your gear train and housing alongside group attribution. The bracket gets only supported details; the bike uses the supplied inventory and writing rather than an invented restoration story. | Each project pair comes forward in turn, then all three align for comparison. |
| **5. Test ride** | An honest review: the group charger worked badly, with your reported four minutes of cranking for one percent charge; the bracket awaits manufacture and testing. No finished-bike outcome is assumed. Contact and CV close the page. | The cards settle into a readable review and regroup into an open stack. |

“Test ride” stays recognizable as the co-op field. Charger observations and bracket status will be labelled as their own kinds of evidence.

The whole desktop story should occupy roughly **six screen lengths**, with brief transitions and settled reading states. Ordinary scrolling, direct chapter links and a shortcut to contact let the placement reader inspect it in two minutes—or skip straight to the evidence.

### Colours and type

My choice is **warm workshop paper**:

- Warm off-white ground: `#F2EFE7`
- Graphite text: `#242A2D`
- Deep green accent: `#285C4D`
- Pale paper cards, fine rules and restrained shadows

It should feel like a carefully kept working record, without fake grime, handwriting or decorative technical jargon. Photographs retain their real colours.

Use **Source Sans 3** for readable headings and prose, and **IBM Plex Mono** for document fields and status labels. Text stays selectable HTML; important information is never confined to a 3D texture.

Two alternatives are documented: cool white with slate and blue, or a charcoal ground with light paper and muted amber.

### On a phone

The phone version becomes a clean, single-column job card with static project spreads. It keeps the same story and evidence, without long pinned scenes or a moving camera.

Reduced-motion users also receive settled arrangements. Without WebGL or JavaScript, the complete text, images, project links, CV and contact still work. Keyboard navigation, visible focus, image descriptions and adequate contrast are requirements.

The useful page loads before optional 3D. There is no introductory loading sequence.

### What else it needs

Include chapter navigation, all three projects, concise expandable details, an accurate downloadable CV, direct contact, sharing metadata, a site icon and a useful 404 page. Separate project pages can wait until there is enough cleared evidence to justify them.

Link to your existing writing once its address is confirmed. Leave out chat and testimonials. No repair-volume figure or team placing appears as your achievement.

The bracket’s status must be maintained explicitly; November arriving must not automatically mark it manufactured or tested. I would also hold the **18%** headline until the comparison baseline is supplied, then label it clearly as a CAD/simulation result.

My main assumptions are the chosen concept, five-part order, paper palette, fonts, English-only launch and a static-first phone experience. I have assumed no ownership rights, missing outcomes or placement dates.

The full plan is saved in [storyboard.md](/tmp/the method-evals/codex-student-with-QKKKMt/docs/story/storyboard.md), with [three concepts](/tmp/the method-evals/codex-student-with-QKKKMt/docs/story/concepts.md) and [delegated decisions](/tmp/the method-evals/codex-student-with-QKKKMt/docs/story/decided-for-you.md). Nothing has been built.

Does this storyboard feel like yours, or what would you change?

The [the method skill](/tmp/the method-evals/codex-student-with-QKKKMt/.agents/skills/the method/SKILL.md) ends with “The script of the whole page” and your yes to it. This is approval of the plan only; building remains outside this task.
~~~~

## The person's third message

~~~~
Go with the direction you recommend. Give me the whole plan now, in full: every part of the page in order, what the 3D does in each, what a visitor can click, the look, how it works on a phone and without the 3D, and the list of everything else the site needs. Still no building.
~~~~

## The agent's third reply

~~~~
I’ll keep The Job Card as the chosen direction and give you the complete plan, including each scroll beat, clickable elements, mobile and non-3D versions, and everything needed for a future launch. This remains planning only.


**The Job Card is the chosen direction.** The page follows the five fields you use at the co-op, with six paper cards carrying your projects through one continuous 3D sequence.

It answers: **“How does Mina work through a mechanical problem?”**

The visitor should leave knowing what you personally contributed, what evidence exists, and what remains unfinished. That is the story for someone reviewing a placement application in two minutes.

The plan is complete below and saved in [storyboard.md](/tmp/the method-evals/codex-student-with-QKKKMt/docs/story/storyboard.md). Nothing has been built.

**Items still needed before publication**

1. Your current study year, placement season, public email and real blog address.
2. The actual photographs, their ownership, and permission to display team CAD.
3. The bracket’s comparison baseline and a precise description of your contribution.
4. Any additional charger evidence or restoration outcomes you want included.

These remain content requirements. The design does not depend on inventing their answers.

---

**The object and the page structure**

The 3D object is six thin paper cards with rounded corners, restrained shadows and small project identifiers. Their faces hold photographs, evidence labels and document fields. They are newly designed portfolio records, rather than copies of customer records.

The same six cards remain present throughout. Their arrangement explains the content:

- A stack introduces the work.
- A fan explains your working routine.
- An inspection spread reveals the projects.
- Paired records distinguish contribution from outcome.
- A final review brings the evidence together.

The page uses ordinary scrolling. Desktop has approximately six screen lengths across five chapters, with two beats inside “Work carried out.” Each movement ends in a settled arrangement so the visitor can read.

A compact navigation rail contains the five chapter names. **Projects, CV and Contact** remain easy to reach. Visitors can jump directly to any chapter; the animation never gates access.

**1. Customer report — the opening**

*Approximately one screen.*

The first view contains your name, mechanical engineering discipline, general placement intent and the central question. It also shows the three project names immediately:

- Steel road bike restoration
- Pedal box mounting bracket
- Hand-crank phone charger

A small evidence strip identifies your confirmed charger contribution: the gear train and housing in a four-person project. This gives the visitor something concrete before they scroll.

The six cards begin as an offset intake stack. The front card is readable, and project tabs show that there is work underneath. As scrolling starts, the cards separate just enough to reveal their contents.

The opening connects the object to your confirmed job-card practice. It does not introduce an invented childhood story, personal philosophy or formative moment.

**Clickable:** project shortcuts, downloadable CV, Contact, and “Review / contact” to skip to the end.

**2. Findings — how you work**

*Approximately one screen.*

This chapter shows the sequence you described:

1. What the customer says is wrong
2. What you find
3. The parts
4. What you did
5. The test ride

Your workshop logbook appears as the other confirmed working record. The co-op and workshop contexts stay clearly identified; the page does not claim every engineering project followed the job-card process.

The cards fan into an ordered diagram. Five expose the corresponding fields; the sixth remains a project index. Their placement makes the progression visible rather than simply illustrating it with floating paper.

A short HTML list beside the scene provides the same structure in readable text. Any experience dates shown later come from confirmed records.

**Clickable:** chapter-field links and the project index. A larger record example could be added later if you supply a cleared, anonymized example; the initial plan does not need one.

**3. Parts — inspect the work**

*Approximately one screen.*

The cards flatten into a low-angle inspection spread, arranged as three project pairs. Each project has a visual/evidence face and a scope/status face.

**Bike restoration**

The main visual is the garage-floor inventory photograph, once cleared for use. The supplied writing establishes the “keep, fix or replace” labels. Detail photographs can accompany it, but we will not assign particular parts to those categories without your actual decisions.

**Bracket**

The visual is a cleared CAD image. Its status is explicitly **not yet manufactured or physically tested**. The confirmed CAD/simulation reduction can be added with its comparison baseline; until that baseline is supplied, the 18% figure does not become a headline.

**Charger**

The record identifies the first-year group project and your gear train/housing contribution. A real photograph or drawing is preferable. If none is available, the text record is sufficient; there will be no fabricated render presented as project evidence.

The spread keeps all three projects visible together, giving the recruiter a quick overview.

**Clickable:** each project’s detail anchor and image enlargement where a real image exists. Images also have ordinary accessible controls; information is never available only on hover.

**4. Work carried out — contribution and limits**

*Approximately two screens, in two beats.*

**First beat: charger contribution**

The charger pair moves forward while the other cards remain visibly indexed.

The accompanying detail identifies:

- The four-person group
- Your gear train and housing work
- The prototype’s reported operation
- Any real visual evidence available

This is the clearest confirmed individual contribution, so it receives the first detailed inspection. The plan does not invent gear ratios, design iterations, material choices or calculations.

**Clickable:** expand the short project record and enlarge cleared images.

**Second beat: bracket and bike evidence**

The cards align into a comparison row, bringing the bracket and bike records alongside the charger.

The bracket record distinguishes design/simulation from manufacture and physical testing. Your exact role and collaborators will be added when clarified. Machining is a pending step; the site will not automatically mark it complete when November arrives.

The bike record uses the inventory and supplied writing. It can feature the rear-wheel post’s reported cracked hub flange, with the diagnosis clearly attributed to that writing. It does not claim that the wheel was successfully repaired or the restoration finished.

A compact skills line can sit here, preserving the limits of the supplied CV: SolidWorks, MATLAB, some Python, and lathe/mill workshop induction. It is a supporting reference rather than a large skills-rating section.

**Clickable:** bracket and bike detail disclosures, relevant writing links once the real blog address is confirmed, image enlargement, and CV.

**5. Test ride — review and contact**

*Approximately one screen.*

The chapter keeps the name of the co-op field while clearly labelling the different project outcomes.

The review contains:

| Project | What the record can establish |
|---|---|
| Charger | The group prototype worked badly: your reported observation was four minutes of cranking for one percent charge. Test conditions are unspecified, so this is not presented as a standardized benchmark. |
| Bracket | CAD/simulation work; manufacture and physical testing still pending. |
| Bike | Inventory and restoration writing are available; a completed restoration or successful final ride is not established. |

The six cards settle into a readable results spread, then regroup into an open stack. Evidence remains visible through the closing movement.

The ending answers the opening question through your confirmed working routine and specific contributions. Final wording will be written from those facts; this plan does not manufacture a polished personal slogan.

Contact and CV occupy the final clear block.

**Clickable:** email, CV, confirmed blog link and links back to any project or chapter.

---

**The look**

The selected palette is **warm workshop paper**:

| Use | Colour |
|---|---|
| Page ground | Warm off-white `#F2EFE7` |
| Main text | Graphite `#242A2D` |
| Accent | Deep green `#285C4D` |
| Cards | Pale paper `#FFFDF7` |

Fine rules, modest margins and small field labels give the page a working-record character. Photographs provide the material detail. There is no fake dirt, invented handwriting or decorative engineering notation.

Use **Source Sans 3** for headings and body text, and **IBM Plex Mono** for document fields, indices and status labels. Headings are distinctive but leave room for evidence on the first screen.

The layout pairs readable HTML text with the card scene on desktop. Important writing is not confined to tiny text on angled surfaces.

Two alternative palettes are documented for future visual review: cool white/slate/blue, and charcoal/light paper/amber. Warm paper remains the chosen default.

**Motion and interaction**

Movement uses shallow depth, gentle changes of angle and short transitions. Cards stop moving during reading states. Their arrangement communicates something in every chapter.

There is no forced scrolling, automatic audio, introductory loading sequence or requirement to drag an object to discover content. Back navigation, browser search, keyboard controls and direct section links work normally.

Project identifiers remain consistent so the visitor can follow the same records through the transformations.

**Phone and fallback experience**

| Situation | Experience |
|---|---|
| **Phone** | A single-column job card with static project spreads, the same five chapters and full evidence. A compact index replaces the desktop rail. Contact remains easy to reach. |
| **Reduced motion** | Settled card arrangements, immediate section navigation and no parallax or camera interpolation. |
| **No WebGL or failed 3D loading** | Static spreads replace the scene. Text, project status, images and links remain complete. |
| **No JavaScript** | The full HTML page remains readable, with ordinary anchors, images, CV and email links. Optional details use native expandable controls. |
| **Screen reader** | Logical headings, lists, project attribution and status text carry the story. Decorative canvas is hidden from assistive technology. |

Phones do not receive long pinned scenes or horizontal scrolling. Body text starts at a comfortable 16px, controls have generous touch areas, and images remain large enough to inspect.

The useful page loads first; optional desktop 3D loads afterward. This preserves the portfolio if the animation is slow or unavailable.

**Everything else the site needs**

Here, “include” means part of a future implementation. It does not authorize building now.

| Requirement | Decision |
|---|---|
| Chapter navigation | Include five anchors, project shortcuts and a direct review/contact link. |
| Project coverage | Include all three projects with scope, personal contribution, attribution, evidence and current status. |
| Separate project pages | Later, when enough cleared material supports deeper case studies. Start with in-page details. |
| Contact | A confirmed public email. A contact form is unnecessary initially. |
| Downloadable CV | Include an accessible, updated version. Correct team-result attribution and remove the uncounted repair-volume claim. |
| Testimonials | Omit, as you requested. |
| Languages | English initially. Add another language only for an actual need. |
| Blog | Link to your existing writing after confirming the address. An integrated blog can wait. |
| Chat | Omit from this version. |
| Shared-link preview | Your name, discipline, factual summary and a cleared static image from the card/evidence layout. |
| Site icon | A small document-field motif consistent with the chosen design. |
| Search basics | Accurate title and description, semantic headings, sitemap, indexing settings and confirmed canonical URL. |
| Missing-page handling | A useful 404 with return-to-portfolio and contact links. |
| Domain and hosting | Choose before publication; HTTPS and secure static hosting. |
| Legal/privacy information | Determine applicable requirements before publication. Avoid unnecessary data collection. |
| Analytics | Optional later; no third-party tracking by default. |
| Accessibility | Contrast, keyboard access, visible focus, meaningful image descriptions, zoom support and motion preferences. |
| Performance | Compressed responsive images, lightweight geometry, optional delayed 3D and rendering paused when offscreen. |
| Maintenance | Editable project status and credits; explicit review after bracket manufacture/testing. |
| Launch verification | Check phone, keyboard, reduced motion, missing WebGL and disabled JavaScript; confirm all claims and image permissions. |

**Assumptions and boundaries**

I chose the five-part sequence, six cards, restrained animation, warm-paper look, fonts, English-first launch and static phone presentation. Those are design decisions made under your delegation.

The plan assumes general placement intent without choosing a year. It does not assume photo ownership, a completed restoration, a tested bracket or additional personal lessons. The team’s July placing and the guessed bike count stay out of your achievements.

Final captions and opening copy remain a separate factual writing pass; this storyboard specifies what they must communicate and what evidence supports them.

To finish the planning record, reply **“yes” to this storyboard** or name any changes. That records approval of the plan only.

The [the method storyboard instructions](/tmp/the method-evals/codex-student-with-QKKKMt/.agents/skills/the method/references/storyboard.md) require “A yes to the script, or what to change.” That is why this final review remains; no building or publication follows from it.
~~~~

# Files the agent wrote

## docs/story/concepts.md

~~~~
# Three concepts and delegated selection

Mina authorized choosing uncovered matters of taste and then explicitly approved the recommended direction. Selected concept: **The Job Card**, for the reasons below. Facts are governed by `facts.md`, including its answers and unresolved items.

Trade forms considered: repair job card, workshop logbook, parts inventory, engineering drawing pack, test report, bill of materials. Mina explicitly uses the first two; her supplied writing describes a parts inventory. These are candidate forms, not claims that she personally uses all six.

## 1. The Job Card — selected

- Question: **How does Mina work through a mechanical problem?**
- Form: the five fields she named, in order: Customer report (opening/who), Findings (how/where from), Parts (what), Work carried out (personal contribution), Test ride (outcomes/close). The labels describe the co-op form; charger/bracket evidence is explicitly different from bike test rides.
- Object: six thin job-card sheets with subtly rounded corners, built as flat rectangular meshes. These are newly authored portfolio cards, not facsimiles of private customer records. Card faces carry identity/working-method information, bike inventory, selected bike evidence, bracket evidence, charger evidence and outcomes/contact information. Exact display faces depend on cleared assets; no fictitious job numbers or customer details.
- Three transformations: the cards begin as a legible overlapping intake stack; fan into the five confirmed job-card fields for Findings; become a flat inspection spread for Parts; stand as side-by-side contribution records during Work; regroup into an open, readable completed review at Test ride.
- Opening: the first card identifies Mina and the question, with a small adjacent index to her confirmed charger contribution. Its connection to her co-op routine is stated using confirmed information. No invented formative episode.
- Close: an evidence review distinguishes what worked, what is still awaiting manufacture/test, and what remains unknown, followed by contact/CV access. The answer is expressed through her working routine and bounded contributions; no claim of a tested bracket or finished restoration.
- Stands on: confirmed job-card sequence/logbook use; charger gear train/housing contribution and group result; supplied bracket project with confirmed unbuilt status; bike inventory writing and available photographs; audience and anti-inflation preference.
- Needs: cleared bike photographs; bracket display permission and contribution detail for deeper coverage; public contact/CV. Not blocked for planning: use labelled asset slots and omit unsupported claims.
- Why hers: the exact intake-to-test sequence comes from her co-op routine, and the evidence combines her bike inventory, imperfect charger result and unfinished bracket work.

## 2. The Workshop Logbook

- Question: **What can a placement reader learn from Mina's work so far?**
- Form: Entry (opening/who), Context (where from), Work recorded (how/what), Observation (outcomes), Next entry (close). This is a proposed portfolio logbook structure; her actual workshop headings have not been supplied.
- Object: six loose logbook leaves with a ruled edge, depicting her actual project evidence. No invented handwriting, dates or workshop entries.
- Three transformations: leaves align into a ledger at Entry; unfold into facing spreads for Work recorded; observations and pending checks appear as an open final spread before leaves return to a compact book.
- Opening: shows the source of the form—her confirmed use of a workshop logbook—with her name and project index.
- Close: brings documented work and pending checks together, then links to CV/contact.
- Stands on: confirmed logbook use; charger contribution/result; bracket status; supplied restoration writing.
- Needs: a description or cleared example of an actual logbook page if the design is to resemble her real pages; cleared project visuals and contact.
- Why hers: its evidence includes the reported charger limitation and bracket manufacturing status, rather than a fictional catalogue of successful projects.
- Tradeoff: weaker than the job card because its real section order is unknown, and a book tends to make the reader spend longer on chronology.

## 3. The Parts Inventory

- Question: **What does Mina notice when she takes a machine apart?**
- Form: Inventory brief (opening/who), Identification (where from/what), Keep (evidence to retain), Fix (work/contribution), Replace (choices/limits), Review (outcomes/close). These are proposed inventory headings around her confirmed keep/fix/replace labels, not a claim that every project followed them.
- Object: six rectangular inventory labels/part-photo boards, each a simple thin cuboid; actual part photographs make the pieces identifiable together as an inspection layout. No generic decorative bolts or invented machine assembly.
- Three transformations: labels start beside a cleared garage-floor photograph; form a catalogue grid at Identification; sort into keep/fix/replace lanes; gather into an indexed record at Review.
- Opening: shows the supplied blog inventory episode as the source; no claim that this bike began her interest in engineering.
- Close: highlights documented findings and unresolved checks, with placement contact.
- Stands on: blog inventory title/description and its exact keep/fix/replace categories; available bike photos; supplied rear-wheel diagnosis summary. Other projects are cross-referenced, not retroactively called bike repairs.
- Needs: rights-cleared inventory images; Mina's actual part-by-part classifications/decisions to populate the lanes accurately; contact/CV.
- Why hers: the garage-floor inventory and its three labels are her supplied material.
- Tradeoff: currently too many sorting decisions are unknown. Making bike categories encompass the charger and bracket would strain the form.

## Selection and tests

Choose **The Job Card** over the logbook and inventory because its real chapter order is confirmed, it supports quick inspection, and it connects a practical working routine to engineering evidence without inventing a history or repair decision.

- Swap: content and chapter order depend on Mina's supplied practice and projects.
- Backdrop: card position groups intake, findings, project identity, contribution and test status. Removing the 3D requires replacing those visual relationships with HTML lists/spreads.
- Depth: the same six cards progress from report through evidence and work to review.
- Emblem: the object is a working document, not a generic gear or rotating car.
- Honesty: no team placing, bike count, testimonial, successful restoration or physically tested bracket is asserted.
- Thirty seconds: name, discipline, confirmed charger contribution and contact/CV access are visible without completing the scroll.
~~~~

## docs/story/decided-for-you.md

~~~~
# Delegated decisions

Authority: Mina's instruction to use judgment on uncovered matters and disclose assumptions. These decisions concern design, not missing biographical facts.

| Decision | Why | How to change |
|---|---|---|
| Select The Job Card over Workshop Logbook and Parts Inventory | Its five-field order is confirmed; suits a two-minute reader | Choose either alternative in concepts.md |
| Five chapters, about six desktop viewport lengths total | Fits limited early-career material without padding | Shorten or expand after content review |
| Six simple document sheets as the persistent 3D object | Buildable, readable, related to actual working practice | Adjust count or sheet treatment without changing story |
| Lead evidence with her charger contribution | Personal role and prototype outcome are directly confirmed | Promote bracket after contribution/baseline evidence is confirmed |
| Default warm workshop-paper look; two restrained alternatives | Grounded in job-card material and photograph legibility | Switch the proposed palettes in storyboard.md |
| Source Sans 3 body and IBM Plex Mono document fields | Readable prose and distinct technical record labels | Substitute fonts after visual review |
| Normal scrolling, short transitions, no forced tour | Reader has two minutes and may skip | Adjust animation timing while preserving direct navigation |
| Mobile uses static document spreads by default | Maintains evidence on small screens and limits loading | Add lightweight 3D only if device testing supports it |
| No invented counts, testimonials or personal lessons; omit team placing and uncounted bike volume | Explicit user instruction and attribution correction | Add only new confirmed evidence |
| Do not headline the 18% reduction until baseline is supplied | Modelled status is known; comparison is not | Add baseline and preserve CAD/simulation qualifier |
| General placement intent without a year | Exact target year is unresolved | Replace after confirmation |
| No actual client job cards or employer images without clearance | Permission is unresolved | Use approved anonymized assets or own recreated portfolio records |
| Existing site disposition and real contact details remain unspecified | Source addresses may be placeholders | Confirm before publishing |
| Plan only, no prototype or website code | User expressly prohibited building | Requires a later explicit build request |

No assumption establishes photo ownership, a finished restoration, machining having happened, professional machining proficiency or current employment/study dates.
~~~~

## docs/story/facts.md

~~~~
# Mina Park — source facts and open questions

Status: source review and Mina's corrections recorded. Original source statements below are qualified or superseded by the authoritative user answers; remaining unknowns are listed at the end.

## Identity and intent

- Name: Mina Park. Source: `material/cv.md`.
- Describes herself as a second-year BEng Mechanical Engineering student at Hallam Institute of Technology, Sheffield. Source: `material/cv.md`; second-year framing also in `material/message.md`. Current year/status needs confirmation.
- Listed contact: mina@example.com. Source: `material/cv.md`. Confirm whether this is a publishable address or a placeholder.
- CV seeks a summer 2026 mechanical or product design placement. Source: `material/cv.md`. This date is past relative to the session date, 10 October 2026; current target needs confirmation.
- Wants the site to reflect being a second-year, without overstating experience. Says she does not have much yet. Source: `material/message.md`.
- Wants a distinctive portfolio with 3D and scroll movement, grounded in her work; planning only, no implementation. Source: user request in conversation.

## Experience and projects

- Formula Student, Hallam Racing: chassis sub-team member, October 2025 to present as written. Source: `material/cv.md`. Exact personal responsibilities and current status unconfirmed.
- CV says “Redesigned the pedal box mounting bracket: 18% lighter.” Source: `material/cv.md`. The object, personal contribution, collaborators, comparison baseline, calculation/measurement, and whether manufactured or used need confirmation. Do not turn this into an established performance claim yet.
- CV says team placed 12th of 68 at Formula Student UK 2025. Source: `material/cv.md`. This is a team result; event date and Mina's involvement are unconfirmed. The membership start makes participation uncertain; do not imply she contributed to that result.
- Hand-crank phone charger: first-year design module, 2025; gear train and housing, group of four. Source: `material/cv.md`. Exact personal work, collaborators' work, prototype status and outcome unconfirmed.
- Second Gear Bike Co-op: Saturday mechanic, 2023 to present as written. Source: `material/cv.md`. Formal/informal title, actual tasks and current status need confirmation.
- CV says “Fixed hundreds of bikes.” Source: `material/cv.md`. Count, timeframe, basis and whether personal or co-op total unconfirmed. Do not publish this quantity yet.
- Skills listed: SolidWorks, MATLAB, some Python; lathe and mill at workshop induction level. Source: `material/cv.md`. Keep the stated proficiency limits; no professional machining claim.
- Restoring a 1984 steel road bike and writing at slowmiles.example. Source: `material/cv.md`. Current restoration state and whether URL is real/publishable unconfirmed.

## Writing

Only post titles and short descriptions were supplied, not full articles. Source for all five: `material/blog.md` (newest first).

- “The bottom bracket fought back”: three evenings, a seized cup, and something she should have checked first. No further lesson or diagnosis established.
- “Why the rear wheel was never true”: description identifies a cracked hub flange hidden under grease, rather than the rim. Her specific repair and outcome not supplied.
- “Stripping forty years of paint”: description promises what was beneath and what she would not do again; those details are not supplied.
- “An inventory”: every part laid out on the garage floor, photographed and labelled “keep, fix or replace.” Author and usage rights of photographs unconfirmed.
- “Thirty pounds and a flat tyre”: description concerns buying a bike that does not work. Do not infer £30 was the purchase price from the title alone.

## Available assets and other people's material

- Mina says she has lots of photos of the bike and of the bracket in CAD. Source: `material/message.md`. Actual image files were not supplied; authorship, subjects visible, rights and employer/team restrictions unconfirmed.
- No one has written anything about her, according to Mina. Source: `material/message.md`. No testimonials supplied; do not invent them.
- No CAD model files, finished project photographs, full blog posts or employer/team display permissions supplied.

## Gaps

- Current audience, opportunity/date and desired visitor action.
- Exact personal contribution and evidence for each project/job.
- Meaning and ownership of numerical claims.
- Project status, outcomes and usable visual assets.
- Everyday working documents/tools/rituals, formative influences and specific lessons.
- Publishable contact details and blog URL; existing portfolio status.
- Restrictions on third-party, team and co-op content.

## Disagreements and timing issues

- Team's 2025 competition result versus listed October 2025 membership start: participation unclear, not a proven contradiction.
- Summer 2026 placement target versus October 2026 session date: target may be outdated.
- No direct disagreement between supplied sources otherwise identified.

## To confirm

1. Current study year/status, placement target, audience and desired action at the end of the site.
2. Bracket: personal role and collaborators; what 18% measures, baseline, measured/modelled basis; manufactured/tested/used status.
3. Team competition: event date, membership timing, whether involved in that result and in what capacity.
4. Charger: exact personal work, group attribution, whether built/ran, outcome and available evidence.
5. Co-op: role/title/current status, typical personal tasks, meaning/timeframe/basis/ownership of “hundreds.”
6. Bike: current state, which supplied stories she wants represented, any lesson she can explain in her own words.
7. Assets: who made photos/CAD, people visible, rights to display and team/co-op permission; what must stay private.
8. Day-to-day work materials, lists, routines and tools, in her own terminology.
9. Formative person, book, mistake or experience and what she learned.
10. Real/publishable contact and blog URL; any existing portfolio and what should happen to it.

## User answers

Mina answered in the conversation and authorized judgment on uncovered planning choices. This does not establish missing personal facts or third-party usage rights.

### Answers beside their subjects (authoritative over the source wording)

- Audience/identity: audience is the person reading placement applications at an engineering firm; they have two minutes. Exact placement season and current year were not reconfirmed. Use general placement intent; do not infer summer 2027.
- Hallam Racing: joined October 2025. The 12th-place result was July 2025, before she joined. It is on her CV because the team uses it broadly. Exclude it from her portfolio achievements.
- Bracket: 18% lighter in CAD and simulation; not manufactured or tested yet. Machining scheduled for November (year not independently specified). The comparison baseline, constraints, collaborators and exact personal tasks remain unanswered. The percentage is confirmed as modelled, but withhold prominent publication until its baseline is specified; any internal discussion must retain the modelled/unbuilt status. Do not treat simulation as a physical test.
- Charger: four-person group. Mina's part was the gear train and housing. Prototype worked, badly: four minutes of cranking for one percent of charge. This is her reported observation, not a standardized benchmark or her sole achievement; device, battery state and test conditions unspecified.
- Co-op: “hundreds” is a guess, never counted; job cards might provide a count but she has not checked. Exclude repair volume claims. Formal title, detailed tasks, dates/current status still not reconfirmed.
- Working practice: at the co-op, uses a job card with what the customer says is wrong, what she finds, parts, what she did, and the test ride. In the workshop, uses a logbook. These are directly confirmed; do not attribute this entire routine to every project.
- Assets: has photos of everything on the bike, every part on the garage floor. Photographer, identifiable people, ownership and display rights still not answered. Availability is confirmed, permission is not.
- Testimonials and figures: confirms there are no testimonials; explicitly prohibits invented testimonials and numbers.
- Delegation: “For anything I have not covered, use your judgement and tell me what you assumed. Carry on.” Choose concept, look and structure without a further concept-selection stop; list assumptions. Missing facts stay unconfirmed.
- Concept approval: Mina subsequently said “Go with the direction you recommend” and requested the complete plan in full, while again prohibiting building. The Job Card direction is expressly selected; final storyboard approval is distinct.

### Remaining unresolved items

Current year and placement dates; public email/blog address; existing portfolio; bracket baseline and personal/collaborator roles; charger test conditions; co-op title/current status; restoration state and specific lessons; formative influences; actual supplied image files, authorship and permissions. No unresolved item may silently become an on-page claim.
~~~~

## docs/story/handover.md

~~~~
# Planning handover

Read all supplied material: `message.md`, `cv.md`, `blog.md`. Recorded source facts and unresolved questions in `facts.md`.

User authorized planning only and explicitly prohibited building. No website implementation created.

Mina supplied corrections and delegated uncovered planning choices. Answers recorded in facts.md; remaining missing facts and rights stay unresolved.

Created three concepts and selected The Job Card under that delegation. Created the full proposed storyboard and recorded delegated decisions. No website code, assets, prototype or deployment created.

Mina explicitly approved the recommended direction and requested the whole plan, including ordered page parts, 3D, clicks, look, phone/non-3D behavior and supporting requirements. The full storyboard is supplied in the response and saved in storyboard.md.

Current stage: complete storyboard supplied for review. Direction approved; final storyboard approval not yet recorded. Next: record that approval or requested edits and update this handover. Missing factual/asset/contact items are pre-publication requirements, not reasons to withhold the plan. The the method version used here is planning only; building requires a separate task.
~~~~

## docs/story/storyboard.md

~~~~
# The Job Card — proposed full storyboard

Status: full plan for Mina's review; not approved for implementation. No website has been built. Mina explicitly selected the recommended Job Card direction and requested this full storyboard.

## Still awaiting facts/assets

1. Public contact, real blog URL, current study year and target season. Planning uses name, mechanical engineering discipline and general placement intent; no assumed dates or publishable placeholder addresses.
2. Bike-photo authorship/clearance and actual selected files; bracket/team display permission. Photo slots below are conditional, not permission to publish.
3. Bracket comparison baseline, exact personal role and collaborators. Keep the 18% figure out of planned public text until baseline is supplied. CAD/simulation and unbuilt/untested status are mandatory qualifiers if it is later used.
4. Optional deeper evidence: charger test conditions/images, restoration state, actual repair lessons. Exclude absent facts rather than inventing copy.

## Through-line

Question: **How does Mina work through a mechanical problem?**

The reader follows her confirmed co-op job-card order. Six newly designed portfolio record sheets persist through the whole desktop page. Their faces carry actual project evidence and HTML-equivalent field text. They are not private client records and not a claim that all projects followed the co-op workflow. The closing answer is the confirmed routine plus clearly attributed engineering contributions and honest test status.

No final captions or opening marketing line are written at this stage. The question, field labels and working titles below define content slots; final copy needs factual review.

## Chapters

| Chapter | Name in the form | Role | What it tells | What the pieces do | What can be touched |
|---|---|---|---|---|---|
| 1 | Customer report | Opening/who | Mina's identity, discipline, placement intent; question; preview of charger contribution | Six sheets form an offset intake stack; front identity sheet and charger tab remain legible | CV/contact links, project index, skip to review |
| 2 | Findings | How/where from | Her co-op job-card fields and workshop logbook; supplied contexts kept separate from unconfirmed dates | Stack fans into an ordered five-field diagram with sixth sheet as index | Field navigation and optional larger evidence view |
| 3 | Parts | What | Bike inventory, bracket and charger, each clearly identified | Same sheets flatten into a three-project inspection spread; paired faces show visual/evidence and scope/status | Three direct project anchors; accessible image enlargement if assets cleared |
| 4 | Work carried out | Contribution | Charger gear train/housing is Mina's work in a group of four; bracket limits; supplied bike writing | Cards stand in aligned pairs separating project, her contribution and current evidence | In-page detail disclosures, optional real writing link |
| 5 | Test ride | Outcomes/close | Co-op field remains named; charger observation, bracket not yet made/tested, unresolved bike outcome; contact/CV | Six cards settle into one readable review, then a compact open stack | Email/CV, back to any chapter |

## Beats

Desktop target: six viewport lengths total, approximately 60–100 seconds at a deliberate pace; this is a design estimate, not forced timing. Transitions take a small part of each beat; each text block gets a settled readable state. No scroll hijacking or animation that gates contact.

| Chapter/beat | Screens | How the pieces stand | What is on their faces | What the chapter adds | Caption working title and supporting facts |
|---|---|---|---|---|---|
| 1 / Intake | 1 | Offset stack, readable front; charger evidence tab visible | Name/discipline; three-project index; gear train/housing contribution slot | Ordinary HTML introduction and quick evidence strip | Identity and contribution: CV identity; confirmed charger role; confirmed placement-reader audience. No assumed year or formative origin |
| 2 / Find | 1 | Five sheets fan in the confirmed field order; sixth indexes the projects | Customer report, findings, parts, work, test ride labels; logbook reference | Accessible ordered field list | Working records: Mina's confirmed job-card sequence and workshop logbook. No invented client repair |
| 3 / Inventory | 1 | Low-angle inspection grid, all six cards as three pairs | Garage-floor parts photo slot; bracket CAD image slot; charger gear/housing image or text slot | Project names and evidence/status legend | Three projects: blog inventory; bracket source and confirmed unbuilt status; confirmed charger contribution. Images conditional on clearance |
| 4 / Contribution | 1 | Charger pair moves forward; others stay indexed and visible | Charger role and four-person group attribution; optional cleared gear-train/housing evidence | Detail panel with individual versus group work | Gear train and housing: Mina's direct answer. Do not invent gearing, specifications or design reasoning |
| 4 / Boundaries | 1 | Bracket and bike pairs align with charger as a comparison row | Bracket awaiting manufacture/testing; bike inventory labels as quoted in writing | Short project disclosures | Evidence boundaries: bracket unbuilt/untested answer; blog keep/fix/replace inventory. Exact bracket contribution and restoration completion remain questions, not claims |
| 5 / Review | 1 | Readable results spread returns to compact open stack; faces do not spin away | Charger reported observation; bracket pending manufacture/testing; identity/contact record | HTML status list and final links | Reported outcomes: group charger, four minutes cranking for one percent charge, test conditions unspecified; bracket pending; confirmed routine. No finished-bike result or testimonial |

The closing answer must connect the confirmed inspection/recording routine to bounded contributions, not promise expertise or claim a universal design method. “Test ride” is identified as the bike job-card field; bracket and charger outcomes are not presented as literal rides.

## Reader with thirty seconds

First screen contains name, mechanical engineering discipline, general placement intent and confirmed contribution evidence (gear train and housing in a four-person charger project). Contact and CV controls remain visible; before real destinations are supplied, they are marked as planning requirements, not active placeholder links. A five-item rail jumps to native section anchors. “Review / contact” skips to the final chapter. All three project names are immediately discoverable. No intro loading screen, automatic audio or requirement to finish animation.

## Scroll and interaction

- Ordinary browser scrolling; optional desktop canvas stays behind/beside DOM text while section boundaries drive short movements.
- The six sheets remain identifiable from opening to closing; images do not serve as unreadable miniature text.
- Card grouping communicates fields, project boundaries and attribution. DOM headings/status lists carry the same relationships.
- Navigation, browser find, links and keyboard access work without interacting with 3D. No drag-to-discover content or hover-only information.
- Use shallow depth, controlled camera tilt, no spinning objects and no motion during settled reading. No gratuitous sparks or floating mechanical emblems.

## Without the scene

| Where | What the visitor gets |
|---|---|
| Phone | One-column HTML job card; static project images/document spreads; five-field chapter order; compact index and reachable contact. No pinned multiviewport scenes, horizontal scrolling or scroll-controlled camera. Images at usable size, body text at least 16px, controls at least 44px |
| Reduced motion | Static card arrangements per section; immediate anchor navigation; no parallax, spatial interpolation or smooth-scrolling requirement. Same evidence and links |
| No WebGL | Static section-specific card spreads plus complete HTML headings, descriptions, attribution and status |
| No JavaScript | Complete server-rendered/static HTML page, ordinary anchors, images, CV and contact links. Native details elements may carry optional detail |

Static arrangements are structural equivalents of the scene, not a message telling the reader to upgrade their browser. Assistive technology reads the DOM; decorative canvas is hidden from it. Every meaningful photo gets factual alt text; diagrams get textual equivalents. Verify contrast, focus order, zoom and keyboard access.

## Look and type

Select **Workshop paper** as the default under delegated judgment. These are design choices, not claims about Mina's actual stationery or garage. Real photographs retain truthful colour; no fake dirt or manufactured handwritten notes.

| Look | Ground | Ink | Accent | Sheet surface |
|---|---|---|---|---|
| Workshop paper — selected | Warm off-white #F2EFE7 | Graphite #242A2D | Deep green #285C4D | Pale uncoated paper #FFFDF7, fine rules and soft shallow shadows |
| Clean drawing record | Cool white #F5F7F8 | Slate #202B35 | Blue #235A89 | Crisp white cards with thin grey drafting lines |
| After-hours bench | Charcoal #202624 | Warm white #F1EFE6 | Muted amber #E0AE59 | Light paper sheets against a dark ground, no glowing controls |

One accent guides navigation/status emphasis; written labels convey status without relying on colour. Check all final text/background combinations for WCAG AA contrast. Photographs add material variety; avoid colour-coded success theatre.

Two self-hosted families: **Source Sans 3** for headings and body text; **IBM Plex Mono** for job-card fields, model/test qualifiers and small indices. Body is comfortable and compact; headings are moderately large, not screen-filling. Serif/italic branding and pseudo-technical filler are unnecessary. DOM text remains selectable; critical copy is never baked only into card textures. Fallbacks: system sans and monospace.

## Everything else the site needs

“Build” means include in a future implementation, not authorization to start building now. All choices below made by assistant under Mina's delegation, with her explicit prohibitions noted.

| Requirement | Build, later or never | Who decided / details |
|---|---|---|
| Way round the page | Build | Assistant: chapter anchors, project index, review/contact shortcut |
| Page for each project | Later | Assistant: in-page detail first; separate cases only when cleared evidence supports depth |
| Every project listed | Build | Assistant: bike restoration, bracket, group charger; clear scopes/status, no padded gallery |
| Contact and CV | Build | Assistant: confirmed public email, downloadable accurate accessible CV; revise team-result attribution and uncounted bike claim before linking |
| What others say | Never for this version | Mina: no testimonials; no fabricated substitutes |
| Languages | Build English; others later | Assistant: all supplied material in English; no assumed translation need |
| Shared link and icon | Build | Assistant: title/name/discipline and factual summary; static cleared card/evidence image; small card-field icon. Avoid placeholder URLs in metadata |
| Missing address page | Build | Assistant: clear 404 with return-to-portfolio/contact links |
| Blog | Later as on-site feature | Assistant: link to existing writing only after real URL confirmed; no fabricated full posts |
| Chat | Never for this version | Assistant: adds friction and maintenance to a two-minute portfolio |
| Legal notice where applicable | Later, before publishing | Assistant: determine actual hosting/operator requirements then; collect no unnecessary visitor data |
| Analytics/contact form | Later | Assistant: direct email is sufficient initially; no third-party tracking by default |
| Hosting/domain and security | Later, before publishing | Assistant: confirm domain; HTTPS; secure static hosting; no publishing now |
| Search/social basics | Build | Assistant: semantic headings, accurate metadata, canonical URL after domain confirmation, sitemap, robots rules |
| Performance | Build | Assistant: lazy-load optional 3D after useful HTML; compressed images, lightweight geometry, stop rendering offscreen; no 3D required on phones |
| Content maintenance | Build | Assistant: store project status/credits separately; review bracket after manufacture/test; never auto-mark it complete in November |

## Acceptance checks for a future build

Verify a placement reader can find identity, individual contribution, evidence status and contact within thirty seconds; verify the entire page works on a phone, with keyboard, reduced motion and JavaScript/WebGL disabled. Target good Core Web Vitals on a midrange phone (LCP at most 2.5s, INP at most 200ms, CLS at most 0.1); these are performance goals, not project results. Check that no unconfirmed fact or uncleared asset entered captions, textures, metadata, alt text or CV.

## Review

Mina should approve this script or identify changes before any implementation is considered. Final public wording, asset clearance and missing destinations still require resolution. Planning scope only.
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
