# A skill that makes sites like V3

> **Amended 22 October 2026:** each chapter's scene pictures its section, in place of one object whose pieces carry every chapter. See [Each scene pictures its section](2026-10-22-scenes-picture-their-section.md). Where this file says otherwise below, the amendment holds.

This is the copy that is kept current. It was written in the author's
portfolio, a private repository named `portfolio-website`, in a folder beside
this one. Where it names `docs/project-notes.md`, `docs/v3-handover.md` or
`docs/design-directions.md`, or a path that begins `lib/paper/`,
`components/`, `app/` or `scripts/`, that file is in the portfolio. "V3" is
the portfolio's home page.

Date: 10 October 2026. Status: approved by the author that day. The design
was put to them in three parts, and each had their yes. This file is that
design written out, and it had their yes too: "Approved, plan stage 1". That
yes was given on a list of what the writing-out had added to the three parts.
Whether they have read the file itself is not known.

Nothing is built. The working name is `storyfolio`, which is a default and
theirs to change.

What the author asked for, word for word, is in `docs/project-notes.md` under
"A skill for making sites like this one".

## Why

V3 was reached by a route that cost days. Three restyled layouts were "all
cliche". Three single 3D scenes were "not deep enough". What worked was one
long scroll that tells one story, carried by one object in 3D that is the
subject itself: a research paper, and its pages.

The author planned that themselves: what the story is, what gathers in the
first screen, what each scene shows. They want other people to be able to hand
an agent their profile and get a site of that kind, with the agent doing the
planning, and with the story, the 3D and the look fitted to work that is not
research and software.

## Decisions

The author's, each made on 10 October 2026 from choices shown to them:

| # | Decision | Turned down |
|---|---|---|
| 1 | The skill carries a method and a starter engine | A method with no code. A template of finished themes |
| 2 | It lives in a repository of its own | A folder in this repository, which is private |
| 3 | The 3D is built in code, with a model file allowed as one chapter's extra | Code alone. Sites built on modelled objects |
| 4 | The journey has six stops, with the rule for asking and the method of three (part 1) | Fewer stops |
| 5 | The engine as described, on V3's stack, with rigid pieces in its first version (part 2) | The bending sheet in the first version. Another stack |
| 6 | The packaging, the testing and the order of work (part 3) | Another order |

Defaults that came with part 3. The author did not change them, and they stay
theirs to change:

- The name, `storyfolio`. On 10 October it was free on npm, two small
  repositories on GitHub shared it, and a search found no product of that
  name.
- The licence, MIT. Everything the engine is built on is MIT, except
  TypeScript, which is Apache-2.0.
- V3 is named in the README as the site the skill came from.

## What it makes

One kind of site, the kind V3 is:

- One long scroll that tells one story, from a beginning to an end.
- One object in 3D, made of a few pieces, on screen the whole way. It becomes
  what each chapter needs and closes at the end. (Amended 22 October: each
  chapter's scene pictures its section; see the amendment.)
- The text is ordinary HTML over one pinned canvas, and the page reads top to
  bottom with the canvas missing.
- The scroll works everything. Nothing plays by itself.

It is not a template with themes, not a way to put 3D on a site of any kind,
and not a builder of many pages. What a site has besides its story (a
project's own page, a blog) is decided with the person from a checklist.

## Who it is for

Someone with a coding agent on their own machine. Claude Code first, and any
agent that reads a `SKILL.md`. They are not sure to be a developer, so the
agent's questions are in plain words and the agent does the setup. The machine
needs git and Node 20.9 or later, which is what Next.js 16 asks for.

## The journey: six stops

The agent works by itself between stops. At each stop the person decides one
thing.

| | The agent does, by itself | Then the person |
|---|---|---|
| 1. Read | Reads what they give it and writes a fact sheet: every fact with its source, the gaps, the places two sources disagree, and what could be read as more than it was | Confirms the facts, settles the disagreements, says who the site is for and what must not be shown |
| 2. Concept | Works out three concepts that differ in kind, and builds each as a rough sketch of three beats | Picks one by scrolling |
| 3. Storyboard | Writes the script, chapter by chapter and beat by beat, and goes through the checklist of everything else a site needs | Says yes to the script |
| 4. Spine | Builds the opening, one chapter from the middle and the ending, in two or three looks | Scrolls it and picks the look |
| 5. Chapters | Builds the rest, and drafts the copy from confirmed facts only | Chooses the words that matter most from sentences shown to them |
| 6. Finish | Tunes it for a phone, for reduced motion and for no 3D, makes what a shared link shows, and runs the checks | Scrolls it on their own phone. Publishing is theirs |

Before the first stop the agent looks at the machine and the folder: Node, git,
whether there is a site already, which other skills are installed, and whether
it can open a browser to look at its own work.

A site the person already has is read as a source of facts and pictures.
Whether it is kept, and where, is asked.

**Everything is kept in the person's repository,** which is the author's own
rule made the skill's. A later session can go on from the files alone:

| File | Holds |
|---|---|
| `docs/story/facts.md` | The fact sheet, with sources |
| `docs/story/concepts.md` | The three concepts, and which was picked and why |
| `docs/story/storyboard.md` | The script, and the checklist with each row's decision |
| `docs/story/decided-for-you.md` | What the agent decided without asking |
| `docs/story/assets.md` | Every picture, logo and model file, where it came from and under what terms |
| `docs/story/handover.md` | What exists, what the person has said, what is next |

The engine comes with an `AGENTS.md` that tells every later session to read
the handover first and keep it current.

## Ask or decide

The agent asks when a thing is:

1. a fact only the person knows,
2. a claim that could embarrass them if it were wrong,
3. taste on what a visitor sees first: the concept, the look, the opening
   words,
4. anything that publishes, costs money, or shows another person or an
   employer's work.

Everything else it decides, and writes down in `decided-for-you.md`: what was
decided, why, and how to change it. This is how nothing is left unattended.
Every part of the site was either asked about or is on that list.

How it asks:

- One question at a time, in plain words, with choices where there can be,
  and the one it would choose first.
- For anything that is seen, it builds the thing and lets them scroll it. The
  author's words on this are the reason: "It's hard to decide by just looking
  at text."
- Wording is the exception. For words it shows the sentences themselves:
  three, each as the whole beat would read, with room for the person to
  write their own. What they pick goes on the page word for word.

## Reading a profile

**What it reads.** A resume, a GitHub profile and its pinned repositories, an
existing site, writing, talks, and LinkedIn.

**LinkedIn is not scraped.** It turns away anything that is not signed in.
The skill takes a profile in one of four ways, whichever the person has:

- the PDF LinkedIn makes of a profile, "Save to PDF" on the profile's own
  page,
- the copy of their data that LinkedIn sends on request, a ZIP of CSV files,
- the profile's text, pasted,
- a browser tool on the person's own signed-in browser, where they have one
  and say yes.

The first two were found on 10 October in LinkedIn's help pages and in guides
written by others. The steps are checked again, and dated, when the reference
is written.

That copy of their data can also hold the person's messages and everyone
they are connected to. The skill tells them how to ask LinkedIn for the
parts about the profile alone, reads only those, and puts nothing of it in
the repository but the facts.

**The fact sheet.** Every fact has its source beside it. It has who they are,
the places and the years, each job and what was done in it, each project
(what it was, what it did, what the person did in it, and what there is to
show of it), outcomes with what each number measures, what others have said
of them, what they learned from, and the pictures and logos there are.

Then three lists:

- **Gaps:** what a site needs and the material lacks. A project with no
  picture. A job with no outcome.
- **Disagreements:** where two sources say different things. They are asked
  about and never settled by the agent.
- **What invites a wrong reading:** an employer or a lab whose name suggests
  work the person did not do. A project whose name suggests more than it
  was. A title. A number with nothing said of what it measures. A team's
  result read as the person's own.

The two worst mistakes made on this site were of the third kind, and both
were an assistant's guess from a name: "a cryptography lab", where the job
was a web application, and a "maze-solving robot" that never met a maze.

**Rules that hold from here on:**

- Nothing is invented. No number, no employer, no outcome, no quote.
- A number is on the site only as the person confirmed it, with what it
  measures.
- Copy claims no more than the fact sheet does.
- Where an employer's work is not the person's to show, the employer is
  named as where the work was done, and nothing of theirs is drawn.
- Another person's face or words are on the site only on the person's say.
- Other people's work is named and linked. It is drawn, and never copied.

## The planning method

This is the part the author did for V3 and wants the agent to do.

**What does not work.** The first three were tried on the way to V3. The
fourth the author ruled out before it could be: "not just copy these
websites".

- A new coat of paint on the same sections.
- 3D as a backdrop behind the text.
- One 3D scene, however good.
- Another site's idea with the names changed.

**Three things to find.**

1. **One question.** It is found where two sides of the person's work meet
   (for the author, research and engineering), or in the way from one thing
   to another, or in what all their projects circle. It is worded as someone
   in HR would say it and as a colleague would respect. It is something that
   interests them now, and not a claim for life. It is checked against the
   fact sheet for what can honestly be said. It is a question and not a
   statement, so that the ending has something to answer.
2. **One form.** A document or a ritual from the person's own field that
   already runs from a beginning to an end, with section names a colleague
   would know: a paper, a tasting menu, an incident review, a set of
   drawings, a shift handover. The agent lists at least five forms the field
   has before choosing, and asks the person at stop 1 which they use. The
   form is structure and not costume: its names and its order are used, and
   no jokes are made in its voice. A chapter holds what its name says.
3. **One object** (amended 22 October: one world, see the amendment). The thing that form is physically made of. It is five to
   twelve similar pieces. They can carry the person's real work on their
   faces. They are recognisable when they stand together at rest. They can
   be built in code from simple shapes. And the object comes from what the
   person makes, and is not a tool or an emblem of the trade.

**What every form has to hold.** A form's sections are mapped onto these
roles. A role with nothing to hold is left out. A story has five to eight
chapters. Someone with little to show yet gets a shorter story, and not a
padded one.

| Role | In V3 |
|---|---|
| The opening: the name and the question | Abstract |
| Who | Introduction |
| Where from | Background |
| How | Method |
| What: some of the work shown working, then all of it | Experiments |
| What came of it | Results |
| What others say | Peer review |
| The close: the answer, and how to reach them | Conclusion |

**What the object becomes** (amended 22 October: what each scene shows, see the amendment). For each chapter, one new form of the same
pieces that shows what the chapter is about: the way they came as a map or a
line, how they work as a diagram, a piece of work as an exhibit, every
project as a wall whose faces carry real pictures, outcomes as cards, quotes
one at a time, and the object closed at the end.

**The opening shows where the object comes from.** In V3 the papers the
author learned from gather into the paper. The answer is the person's own:
what they learned from, or what they began with. It is not always a
gathering. An object can be put together, unfolded, drawn, developed or
switched on, and the reference names these so that every site does not open
alike. Whatever in it is another person's work is a real link to that work.

**Three concepts that differ in kind.** Their form or their object differs,
and not only their colour. Each is written as its question, its form with
the chapters mapped to the roles, its object and pieces, what the object
becomes in three of the chapters, its opening and its ending, which facts it
stands on, and what it would need from the person.

**Every concept is tested before it is shown.** One that fails is reworked or
dropped.

| Test | The question |
|---|---|
| Swap | Could it sit unchanged on a colleague's site? Then it is not theirs yet |
| Backdrop | With the 3D deleted, is meaning lost, or only decoration? |
| Depth | Has it a beginning, a middle and an end, or is it one scene? |
| Clip-art | Is the object only the picture that stands for the job? |
| Honesty | Does anything in it claim more than the fact sheet? |
| Thirty seconds | Can someone skimming get the name, what they do, proof, and how to reach them? |
| Plain reader | Would someone in HR follow it, and a colleague respect it? |

**Examples in the reference.** V3 as the whole case, with what was turned
down on the way. And two made-up people worked through, whose objects are not
sheets: a pastry chef (a tasting menu, and a stack of plates) and a
reliability engineer (an incident review, and the tiles of a status page).
An example shows how to reason. A concept is never taken from one, and the
tests look for that.

## The storyboard

The script the person says yes to at stop 3 has a row to a chapter: its name
in the form, its role, what you read, what the pieces do, and what you can
touch. Under each chapter it has a row to a beat: its id, its height in
screens, its formation, what is on the pieces' faces, any extra, and its
caption.

**The storyboard is the data the engine runs,** so the plan and the build
cannot drift apart. A beat's row becomes its entries in `content/` (see "The
engine").

**Content rules,** which are V3's own with what is only V3's taken out:

- The text is complete in the HTML with the canvas missing. A beat's body is
  about the person's work, and its note is about what is on the screen.
- An exhibit is schematic, and says so.
- Words on the pieces are words the page already has. Nothing is written
  only for the 3D. The opening is the one exception: it may carry the facts
  of other people's work, a title, a name and a year, and never their text.
- Outcomes that measure different things stand on cards of one size, so that
  no comparison is implied.
- What a visitor reads first says the plain thing about the person, in the
  first person and with names. It does not say again what the screen before
  said, and it makes no general claim that a plain counter-example defeats.
- A beat says what the work taught the person, and not only what they did.
  What it taught them is theirs to say.
- Every project has a place, and opens on a page of its own. A project may
  have no picture and no link.

**Length.** A beat is at least a screen. A beat whose scroll works something
is longer, up to about two and a half. A story is twelve to twenty-two beats.
The agent adds up the screens, says the total, and trims it. V3 is
twenty-one beats, and its blocks are twenty-five and a half screens tall
together.

**The checklist.** With the script, every row marked build, later or never,
with who decided:

- the way round the page: the chapter rail, and a link that skips to the end
- a project's own page, on the object's own material
- every project listed
- contact, and a CV to download
- what others say
- languages
- what a shared link shows, and the site's icon
- the page for an address that is not there
- a blog
- a chat
- a legal notice, where the person's country asks for one

## The engine

A small project that the skill copies into the person's folder with one
command. It is theirs from then on. No package depends on the skill.

It is copied in at stop 2, since the sketches run on it. It comes with a plain
story of three beats, in which the pieces are scattered, gather into a stack,
fan out and close. That story is what the engine's own checks run against.

**Stack.** V3's, at the versions V3 runs on 10 October 2026: Next.js 16.2,
React 19.2, three.js 0.180, React Three Fiber 9.6, drei 10.7, Tailwind CSS 4,
TypeScript. The tests use Node's own test runner. It has no library for
motion, none for smooth scrolling and none for languages: the page scrolls
natively.

**Two halves.** `lib/story/` and `components/story/` are the engine, the same
for everyone. `content/` is this person's story, and is what the agent writes.

| In `content/` | Holds |
|---|---|
| `story.ts` | The chapters and their beats: ids and heights |
| `formations.ts` | A formation for every beat. TypeScript will not build while one is missing |
| `faces.ts` | What each piece shows at each beat |
| `copy.ts` | Every word a visitor reads |
| `looks.ts` | The looks |

**The units.** Those in `lib/story/` have no React and no browser in them and
are tested.

| Unit | Taken from | Does |
|---|---|---|
| `lib/story/timeline.ts` | `lib/paper/timeline.ts`, as it is | The scroll to "which beat, and how far through it". Cuts between beats under reduced motion |
| `lib/story/formation.ts` | `lib/paper/poses.ts`, with what is the paper's taken out | A pose for every piece, the blend of two formations, and each piece setting off after the last |
| `lib/story/layouts.ts` | new | A stack, a fan, a ring, a grid, a row, a scatter. Works out how wide and how tall a formation is, which V3 set by hand |
| `lib/story/camera.ts` | `lib/paper/camera.ts`, as it is | How far back the camera stands. The scene beside the caption on a wide screen and above it on a phone |
| `lib/story/story.ts` | `lib/paper/chapters.ts`, its helpers | The types of the story, and a check that it holds together: ids once each, heights of a screen or more, as many poses as pieces |
| `lib/story/quality.ts` | new | When to step the sharpness down, and when to drop the shadows, from how long frames take |
| `lib/story/overlay.ts` | `pageOnScreen` in `lib/paper/flurry.ts` | Where a piece is on the screen, so that a real link can lie over it |
| `lib/story/controls.ts` | `lib/paper/controls.ts`, as it is | What the reader set with a control, read by the scene every frame |
| `lib/story/looks.ts` | `lib/paper/looks.ts`, its types | What a look is, and which one the address names |
| `lib/story/typeset.ts` | `lib/paper/typeset.ts` | Fits words to a line, and to a face |
| `components/story/story.tsx` | `components/paper/paper.tsx` | The shell: measures the beats, turns the scroll into a playhead, finds out whether there is WebGL |
| `components/story/chapter.tsx` | `components/paper/chapter.tsx` | A chapter and a beat as plain HTML |
| `components/story/conductor.tsx` | `components/paper/conductor.tsx` | Where the scene is in this frame, eased |
| `components/story/scene.tsx` | `components/paper/scene.tsx` | The one canvas. A chapter's extras, fetched only when near |
| `components/story/pieces.tsx` | new, on `pages.tsx`'s framing | Places every piece each frame, and frames the whole |
| `components/story/stage.tsx` | `components/paper/stage.tsx` | The light and the floor, from the look |
| `components/story/rail.tsx` | `components/paper/chapter-rail.tsx` | The chapters, as a way round the page |
| `components/story/faces.ts` | `components/paper/prints/`, what is not the paper's | Draws what a piece shows on a canvas, two faces to a frame |
| `components/story/overlay.tsx` | `components/paper/controls/reference-links.tsx` | Real links, laid over the pieces they belong to |
| `components/story/meter.tsx` | new | The frame meter |
| `components/story/use-webgl-supported.ts`, `webgl-boundary.tsx` | the two files of those names in `components/` | Whether there is a scene, and what happens when it fails |
| `components/story/story.css` | the rules for `.paper-beat` and `.paper-caption` | The tall blocks, the pinned caption, and the ordinary page that is left with no scene |
| `scripts/shoot.mjs` | `scripts/shoot.mjs` | A screenshot of every beat, and a list of faults |

**Pieces.** A story has one number of pieces, from its first beat to its last.
V3 has nine. A piece is a group that the agent fills with a shape and a
surface. The piece the engine comes with is a card with a face. The engine
gives each group its place, its turn and its size every frame. Since each
piece has a place of its own, three.js sorts them by depth itself, which V3's
sheets could not have.

**Faces.** What a piece shows at a beat is a picture, or a canvas the story
draws on. A face fades into the next as the piece moves. Faces are drawn two
to a frame, so that the page does not stop while they are made.

**A beat can move within itself.** A beat may have a second formation that it
blends to as it is scrolled through. This is what works an opening, and
anything else that the scroll works within one screen.

**Extras.** What one chapter adds to the scene: a diagram, an exhibit, a model
file. Each is fetched and mounted only while the scroll is near its chapter,
behind a guard of its own, so that losing one loses nothing else. A model
file is an extra, and is listed with its source and its terms in
`docs/story/assets.md`.

**The canvas takes no pointer.** What can be clicked is real HTML: a control
in a caption, or a link laid over a piece. A control is there only where it
does what the scroll does not.

**Phone and desktop.**

- Sharpness is capped by the device: lower on a touch screen. It steps down
  by itself where frames run slow, and the shadows go after it. It does not
  step back up, so it cannot flicker between two settings.
- The scene stops drawing while it is off the screen.
- On a narrow screen the scene is fitted into the band between the top of
  the page and the caption, and is drawn smaller where a caption leaves
  little room.
- A surface has its picture from the first frame, and what an extra adds is
  unlit where that will do, so that the page does not stop to build a shader
  halfway down.
- A headless browser cannot measure frame rate. The engine has a small meter,
  shown by adding `?fps` to the address, for the person to read on their own
  phone.

**Without the scene.**

| Where | What the visitor gets |
|---|---|
| Reduced motion | The scene cuts from beat to beat, and nothing plays by itself |
| No WebGL, or the scene fails | An ordinary page of text, with a flat picture where a beat gives one |
| No JavaScript | The text alone |

**The checks.** `scripts/shoot.mjs` takes a screenshot of every beat and
fails on a console error, a request that failed, a missing or second `h1`, an
id used twice, a page that scrolls sideways, something outside the box it was
told to keep to, and a large shader built after the page has settled. It runs
on a wide screen (1440 by 900), a short one (1280 by 720) and a phone (390 by
844), and under reduced motion, without WebGL and without JavaScript. Then the
screenshots are looked at. In V3 several real faults passed every check and
were caught only by eye, and the reference lists what to look for.

**Left out of the first version:**

- The sheet that bows and flexes in flight. It is tangled with the globe and
  the opening in `pages.tsx`. Pieces start rigid, with print, light, shadow,
  and each setting off after the last.
- The globe, and any map.
- The floor that reflects, which builds every shader a second time.
- More than one language. All the copy is in one file from the start, so
  that a second language is a second file. The reference says what else it
  takes.

## Look and type

Both come from the object. Plates are ceramic on linen. A status page is dark
glass. A paper is white, with dark ink and a serif.

- **A look is one row of data:** the ground, the ink, a quieter ink, one
  accent, the piece's surface, the light, the floor and the shadows. Two or
  three are built at stop 4 for the person to pick by scrolling, each named
  in the address, as the author picked Paper.
- **One accent.** In the first attempt at a new home page for this site,
  before V3, bringing a gradient of two colours down to one made every
  variant look more deliberate.
- **Captions hold over the scene.** A caption stands on a fade of the ground,
  and its text is checked for contrast against that ground.
- **Two typefaces, and a monospace if one is needed.** One for the text. One
  for what is printed on the pieces, which belongs to the form.
- **The scene never waits on a font.**

## The rules V3 paid for

One reference, read before building: "Learned the hard way" and "Rules that
hold throughout" from `docs/v3-handover.md`, with what is only about this site
taken out. Each rule says what goes wrong and what to do. Four groups:

- **The scene:** where React Three Fiber aims a camera, why the page stops
  when a shader is built, a picture used as light, what the first frame
  needs, a guard round everything that is fetched.
- **The framing:** a short screen is tighter than a tall one, a caption grows
  with the data and with the language, what stands at the right edge.
- **The page:** a link laid over the scene, the browser's tap highlight, a
  link that is hidden but keeps its box, easing that never arrives.
- **The work:** do not edit while a check runs, a stylesheet that the dev
  server goes on serving after it has changed, stop a server by its port,
  and look at the screenshots.

## Recommending other skills

The agent reads its own list of skills. At each stop it names what would help
and is missing: what it is for, where it comes from, and how it is installed.

- **The person installs.** A skill is instructions the agent will follow, so
  the agent does not add another's by itself.
- **None is required.** The skill works alone, and carries on if the person
  says no.

The first list is what was on the author's machine on 10 October 2026:

| For | Skill | From |
|---|---|---|
| A direction that does not read as templated | `frontend-design` | `anthropics/claude-plugins-official` |
| The same, and auditing for generic defaults | `ui-design` | `mblode/agent-skills` |
| 3D and scroll | `react-three-fiber`, `threejs-webgl`, `web3d-integration-patterns` | `freshtechbro/claudedesignskills` |
| Type | `typography-audit` | `mblode/agent-skills` |
| Looking at the result in a browser | `ui-verification` | `mblode/agent-skills` |
| React and Next.js | `vercel-react-best-practices` | `vercel-labs/agent-skills` |
| Model files | `blender-web-pipeline` | `freshtechbro/claudedesignskills` |
| Finding others | `find-skills` | `vercel-labs/skills` |

Each command to install is checked against its repository when the reference
is written, and dated. `web-animation-design` is on the machine too, and is
left off until where it came from is found.

## How it is laid out

A new repository, a folder beside this one.

```
storyfolio/
  README.md
  AGENTS.md              the rule: all context is kept in this repository
  LICENSE
  .claude-plugin/        so that Claude Code installs it as a plugin
  skills/storyfolio/     so that `npx skills add` finds it
    SKILL.md             the six stops, the rule for asking, which reference to open when
    references/
      reading-a-profile.md
      concept.md
      storyboard.md
      asking.md
      engine.md
      look-and-type.md
      rules.md
      checks.md
      other-skills.md
      finishing.md
    scripts/scaffold.mjs  copies the engine into a folder
    engine/               the project that is copied
  evals/
    people/               the made-up people
    runs/                 what agents planned for them, without the skill and with it
  docs/                   this design, the plans, a handover
```

`SKILL.md` stays short. It holds the stops and their gates, and names the
reference for each. The agent opens a reference only when it reaches that
stop.

Its description says when to use it, and says nothing of how it works: an
agent given a summary of the steps follows the summary and does not read on.
A first wording, to be tested:

> Use when someone wants a personal portfolio site made from their profile,
> resume, LinkedIn or GitHub, especially one with 3D, scroll-driven animation
> or a story, or says their portfolio looks generic, templated or AI-made.

Both ways of installing were read from the author's machine on 10 October: a
plugin has `.claude-plugin/plugin.json` beside a `skills/` folder, and the
skills installer finds `skills/<name>/SKILL.md` in a repository. The exact
fields of the manifests are checked against Claude Code's documentation in
stage 4.

## Testing

Nothing is called done before these.

1. **Without the skill first.** A fresh agent is asked to plan a portfolio for
   each of six made-up people: a chef, a reliability engineer, a nurse, an
   architect, a student with little to show, and one whose material is full
   of things that invite a wrong reading. Each is written as what a real
   person would hand over. Each is run at least twice, since one run says
   little. What the agent gets wrong is what the skill is written against,
   and what it already does well is left out of the skill.
2. **With the skill.** The same six, the same number of times. Another fresh
   agent judges each plan without being told which it is, against the tests
   of the method and against these: are there three concepts, do they differ
   in kind, was every trap asked about, is anything invented, and are the
   phone, reduced motion and the fallbacks in the plan? The chef and the
   reliability engineer are among the six on purpose. The reference works
   through a chef and a reliability engineer of its own, whose work is
   different, and a plan that hands either of the six the example's concept
   has failed.
3. **The author reads both.** Whether a concept is worth building is for
   their eye, and no rubric stands in for it. The method has passed when
   every plan made with the skill has three concepts that differ in kind
   and pass the method's tests as the judge reads them, every trap was
   asked about, nothing is invented, and the author would sooner build from
   those plans than from the ones made without it.
4. **The engine.** Its unit tests, `tsc`, lint and a build. Its plain story,
   checked at the three sizes and in the three ways of going without the
   scene.
5. **The proof.** A fresh agent with the skill builds a whole site for one
   made-up person who is not a researcher and whose object is not sheets. It
   passes the same checks, every beat is looked at, and the author scrolls
   it.

## Stages

Each stage has a plan of its own, as V3's had. Stage 1's is written next.

| Stage | What is built | What the author gets to look at |
|---|---|---|
| 1. The method | The new repository. `SKILL.md`, and the references for reading a profile, the concept, the storyboard and asking. The six made-up people, and the runs without the skill and with it | What an agent planned for the six, before and after |
| 2. The engine | Taken from V3, made general, tested. Its plain story | The plain story, scrolling |
| 3. The build | The other references. The sketches of stop 2, which need the engine. The whole made-up site | The site |
| 4. Packaging | The plugin's manifest, the README, the licence | Publishing is the author's |

After stage 1 the skill plans and does not build. Its three concepts are
shown in words, since there is no engine yet to sketch them on, and it ends
at a storyboard that has its yes.

The new repository is made at the start of stage 1. This file is copied into
it and kept current there. The copy here is left as approved, with a line at
its top saying where the current one is.

Nothing in this site changes. The engine is copied out of V3, and V3 keeps
its own.

## What it will not do

- **It raises the floor. It does not replace the person's eye.** V3 took nine
  days, the sixty-six numbered points of what the author said, and about
  fourteen thousand lines with its tests. It is what it is because they
  looked and said what was wrong. The six stops are that loop, built in.
- **The agent proposes the plan, and the person still picks.** "By itself" is
  true of the planning: the question, the form, the object and the scenes
  are the agent's to work out.
- **Sites made with it share a grammar:** a pinned scene, captions, a rail.
  The author's four references share one too. The story, the object and the
  look are what differ.
- **The engine is tied to its versions,** and Next.js moves. It needs keeping
  up.

## Not in this work

- Publishing the repository, or listing it anywhere. The author's.
- Putting anyone's site online. The skill says how, and the person does it.
- Themes to choose from.
- The bending sheet, a globe, a map.
- A second language, a blog or a chat built in.
- Any change to this site.

## Open, each settled in the stage that needs it

- Whether LinkedIn's PDF and its copy of a person's data are still where the
  guides say. Stage 1.
- How the check script finds a browser on someone else's machine. V3's is
  pointed at a Playwright that happens to be on this one. Stage 2.
- The command that installs each recommended skill. Stage 3.
- The fields of the plugin's manifest. And a last look for a product named
  `storyfolio`, before the name is public. Stage 4.

## 11 October engine implementation decisions

The [stage review](../plans/2026-10-11-stage-review.md) controls corrections
to the stage 2 and 3 implementation proposal. Node 22.18 or later with
native TypeScript support replaces the earlier Node 20.9 prerequisite.
The engine uses system fonts and local browser tooling; version pins and
reproducibility evidence are recorded with the [plain-story proof](../../../evals/engine/plain-story-1/findings.md).
The public planning skill remains unchanged until saved runs justify build
instructions. The README and MIT license already exist; packaging must
verify and update them after the complete-site proof.

The browser-discovery item is now settled for the verified engine: the
scaffold pins `playwright-core`, `npm run browsers` installs its Chromium,
and the checker resolves that local package. Optional environment overrides
are documented, not required source paths. Linux system-library setup is
recorded in the proof; other host platforms and physical phone performance
remain separate checks. The tooling choice was settled at the checkpoint;
the author subsequently approved desktop and physical-phone scrolling,
closing Stage 2. The [approval record](../../history/2026-10-11-engine-approval.md)
preserves their words; no numerical phone frame-rate result was supplied.
