# A gallery of transitions, and a recommended mix shown moving

27 October 2026. Settled in conversation with the author
([record](../../history/2026-10-27-transition-examples-request.md)), after
[transitions 1](../../../evals/engine/transitions-1/README.md) (one seam,
four ways) and [transitions 2](../../../evals/engine/transitions-2/README.md)
(three whole-site examples). Amends the second stop of
[the portfolio structure](2026-10-22-portfolio-structure.md) and of the skill.
Not yet built or tested.

## Why

On 23 October the author moved the work from components to transitions:
"How do we transition from one section to another? How one 3D component
morphs into another?" Today the engine joins two chapters only by fading or
scaling each chapter's own scene (`chapterPresence`), and in
[person test 2](../../../evals/runs/stage-3-person-2/final-review/README.md)
an agent that had planned real carry-overs built "a cross-handover, not one
shape morphing into the next". The author also judged agents' own ideas
weak ("your generated ideas are terrible") and holds tokens dear.

On 27 October root showed three examples that run through all eight
chapters (one sheet, one map, a pop-up book), each drawn only from a
person's data. The author liked all three ("the animations are amazing";
the book, once remade, "looks much better") and wanted them slower. Then,
in the author's words:

- "The person can get their ideas from the GitHub pages website with all of
  these transitions. And provide us with details about how they would like
  to stitch together various scenes."
- "If we pick one and then finish it by ourselves, then it would lead to a
  lot of token wastage. Alternatively, the user can also suggest their own
  design and we could try to make that."
- "the agent can also recommend ... different components and transitions
  from different examples and stitch that up. According to whatever is
  suitable to the person's profile. and then suggest that the user can also
  look at the GitHub pages and suggest any better ideas or components from
  there, or give their own."
- "it needs to show the preview. Because a normal person cannot know just a
  written plan with gallery pieces. Like, they can't visualize it."
- "One recommended mix and then suggest them to look through the gallery so
  that they can add more customizations or suggest newer components"

## What the author decided

1. **A gallery on the GitHub Pages site holds every transition,** running,
   for anyone to look through.
2. **The agent recommends one mix** for the person: scenes and transitions
   taken from different examples and stitched together, chosen to suit the
   person's profile.
3. **The person sees that mix moving** before the site is built. A written
   plan with links is not enough.
4. **Then the agent invites more:** look through the gallery and swap in
   other pieces, add customizations, suggest new components, or describe a
   design of their own, which the agent then builds.
5. **The examples are used as they are,** with only the person's words and
   places changed. We do not pick one and finish it ourselves.
6. **Moves are slow enough to follow.** Round 2's pace is the measure: about
   two screens of scrolling per chapter, and at most 0.55 chapters a second
   however fast the reader scrolls.

## Goals

- **Pieces.** Every chapter scene of the three examples (24 in all: eight
  each from the sheet, the map and the book) is a piece that can stand in its
  chapter of any person's site, filled from that person's data.
- **Joins.** Two neighbouring pieces from the same example join by that
  example's own move: the sheet bends, the camera flies over the map, the
  page turns. Two pieces from different examples also join with one picture
  visibly becoming or holding the next, never a swap.
- **A recommended mix is cheap to make.** The agent writes the person's data
  and a short mix (which piece in each chapter) and does not write scene
  code. Code is written new only for a component or design the person asks
  for.
- **One source.** The gallery and a person's site run the same pieces, so
  what the person liked in the gallery is what they get.
- **Phones.** Every piece and join works at phone size and is checked
  there; the author approved the engine on a physical phone.

## Non-goals

- Finishing one example ourselves into a house style.
- New worlds beyond the three examples and the four seam ways of
  transitions 1. The gallery grows later from what people ask for.
- Changing the component library's static sections, beyond linking to the
  gallery.

## Anti-goals: a failure even if it works

- Pieces that rearrange, split or glow; a chart in place of a scene
  (the author, 22 October).
- A scene that appears or vanishes at a chapter's edge.
- Moves too fast to see.
- A preview the person has to imagine from words.
- An agent inventing transitions by default and spending tokens on them.
- Crude finish: round 2's book is the bar for all three examples (lit,
  shadowed, die-cut, layered, a camera that leans in).

## Constraints

- The people in examples are made up. No em dashes. No outside component
  code copied (React Bits and Aceternity UI licences).
- The engine and library are Next.js 16, React 19, three 0.180 and React
  Three Fiber 9. The examples are plain three.js 0.160 modules and must be
  brought into that stack.
- `SKILL.md` is at its 800-word limit (`evals/check-skill.mjs`); the skill's
  description says when to use it and nothing of how.
- Publishing the gallery needs a push, which needs the author's word at the
  time. A paid run needs the author's word.
- No line goes into the skill without a run that needed it. The runs behind
  this change: person tests 1 and 2 (`evals/runs/stage-3-person-1`, `-2`),
  whose concepts the author found weak and whose built seams swapped, and the
  meaning reruns before them. After the change, person test 2's fixture is
  run again, on the author's word.

## The person's journey, as it changes

Only the second stop changes.

| Stop | Today | After |
|---|---|---|
| 1. Read | Facts to confirm | Unchanged |
| 2. Concept | Three concepts, built as rough sketches, and a recommendation | One recommended mix, assembled from gallery pieces with the person's confirmed facts and shown moving, with the reason for each choice; then the gallery address and an invitation to swap pieces, customize, suggest new components or describe their own design |
| 3 to 6 | Storyboard, spine in looks, chapters, finish | Unchanged in what the person decides; built from the same pieces |

The agent goes on from stop 2 when the person has accepted the mix or said
what to change, and `docs/story/concepts.md` records the mix and their
answer.

## Root's calls, for the author to check

- **The moving preview replaces today's three concept sketches.** One mix,
  as the author said, instead of three.
- **The preview runs all eight chapters** with the person's confirmed facts,
  brief: no project pages or CV yet.
- **The gallery shows three levels:** the three whole examples, each
  chapter's pieces side by side, and the joins; with the switch between two
  made-up people kept on every page. Transitions 1's four seam ways stay in
  it; its swap is shown only as the thing not to do.
- **The general join between different examples is the camera dive or the
  hand-off** from transitions 1: the next scene is held inside an element of
  the last, or one shared point carries over. The builder may find a better
  one; the anti-goals hold.
- **Stops 3 to 6 stay,** so the person still approves a storyboard and a
  look; the look becomes colourings of the chosen pieces.
- **The pieces live once,** used by both the gallery and the engine a site
  is scaffolded from. How (a package inside the skill, or the library
  importing the engine's components) is the builder's.
- **A piece brings its world with it.** A book spread in the third chapter
  of a mixed site is the book, open at that chapter; a map piece stands on
  the map. A join between two worlds carries the camera from one into the
  other.
- **The preview is the start of the person's own site,** scaffolded from
  the engine at stop 2 as concept sketches are today, so nothing is thrown
  away when they accept it.
- **The person's data follows the shape of the examples'**
  ([people.js](../../../evals/engine/transitions-2/examples/people.js)),
  extended where a piece needs more.
- **The gallery replaces the transitions page** of the existing site,
  https://xitij27.github.io/storyfolio/transitions/, and the component
  library's index links to it.

## Left to the builder

- How a piece is written in the engine's stack: its inputs (the person's
  data, the scroll's state, the look), and how a join between two pieces
  from different examples is carried out.
- How the engine's beats, formations and `chapterPresence` change or give
  way.
- How a piece copes with the amounts a person has: one place or six, no
  quotes or five, three projects or twelve. A chapter with nothing is left
  out, as the structure says.
- What guides the agent's recommendation from the profile: the concept
  reference already says paper is for people whose work is paper and the
  world should look like the person's field to a colleague.
- The order of the work. Root's suggestion: the pieces and joins in the
  engine and library first, with their tests; then the gallery on Pages;
  then the second stop of the skill; then the person test.

## How it is judged

- The gallery and a preview made from it, at desktop and phone size, every
  move followed with the captions hidden.
- A rerun of person test 2's fixture (`evals/builds/full-journey-3`) with
  the changed skill, on the author's word: the agent recommends one mix,
  shows it moving, points to the gallery, and builds the site from the
  pieces; tokens compared with person test 2's 1.25 million uncached. The
  fixture's fixed answer at stop 2 swaps one piece for another from the
  gallery, so that path is tried (root's call).
- The author's review, on desktop and a phone, decides.
