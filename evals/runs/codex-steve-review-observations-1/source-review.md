# Steve portfolio: independent source review

Date: 11 October 2026, Europe/Berlin.

This is a product and source review by a collaborating agent. It is not a
security audit, an independent skill evaluation, a fictional fixture, or a
browser test. No target file was changed. No install, build, server or
deployment was run by this reviewer.

## Scope and provenance

Target: `/home/kshitij/projects/portfolio-website-steve`.
HEAD: `9a5603d51463eb2564f8b5a117b2242678c660b1`.
The initial and final working-tree checks both report modified
`package-lock.json` and untracked `Profile.pdf`. Neither file was opened.
Credentials and private files were not read. The target belongs to a real
project; this review does not establish who owns it or independently verify
the person, qualifications or employers described by its text.

No target or applicable parent `AGENTS.md` was found at the checked paths
under `/home`, `/home/kshitij`, `/home/kshitij/projects`, or the target root.
The reviewer inventoried filenames, then read README and package metadata
before examining implementation. Inspected source: `index.html`,
`src/main.js`, `src/style.css`, relevant animation setup and state handling
in `src/scan-figure.js`, and `docs/medical-ai-design-plan.md`.
The old `outputs/medical-ai-direction.html` mockup was not treated as the
running site. Portrait image bytes were not inspected.

The working audience comes from the repository's design plan, line 7:
healthcare AI employers and research teams, with collaborators secondary.
That is documented design intent, not fresh owner confirmation. The desired
journey there is to understand the focus, inspect work and contribution, and
make contact. Findings below use that stated purpose.

All line references below are within the target checkout. They support
static observations only. Deployment equivalence, exact viewport appearance,
keyboard execution, animation execution, external link availability and
performance remain untested by this reviewer.

## Preserve

1. **The person's status is explicit.** `index.html:100` introduces a
   Computer Science master's student, and `index.html:357` through line 358
   labels the master's degree current. The body gives concrete duties for
   the software, IT and teaching roles at lines 310 through 328 rather than
   treating an employer's field as the person's contribution. Retain those
   distinctions. This is a judgement about presentation, not verification
   of the biography.
2. **The illustration discloses what it is.** The figure status at
   `index.html:108` is "Illustrative"; the note at line 257 says it is a
   stylized scene, not patient data or model output. The method names at
   lines 250 through 255 are explicitly examples. A review should preserve
   these labels and should not present the figure as Steve's deployed AI
   system or as evidence of model performance.
3. **The figure explains a sequence.** `index.html:241` through line 255
   follows frames, features, segmentation, tracking, phase and review, with
   a description of each. The SVG alternative at line 110 describes the
   full sequence. This is explanatory content, even though it does not
   prove the person's own contribution.
4. **The source takes interaction alternatives seriously.** The menu is
   initially hidden as a control while navigation remains in HTML
   (`index.html:81`, `src/main.js:23`, `src/style.css:343`). Its code updates
   labels/state, handles Escape and restores focus (`src/main.js:12`
   through line 68). Pause, reduced-motion stills and offscreen stopping
   exist in the figure code (`src/scan-figure.js:629` through line 708).
   Preserve and test these mechanisms rather than recommending ones the
   source already implements. Their existence does not establish a complete
   accessibility pass.
5. **There is a direct contact route.** The header links to contact at
   `index.html:89`, a matching destination exists at line 389, and email
   and LinkedIn anchors are present at line 393. No form or account is
   required by the markup. External delivery/availability was not tested.

## Fix first: make the primary work route deliver evidence

**Observed content.** The primary hero action says "Explore my work"
(`index.html:103`), and the next section promises a closer look at problems,
methods and lessons (line 276). Its only entry is a "Coming soon" placeholder
(lines 278 through 296). The current README explicitly says project details
are unavailable. There are no project case studies, project repository links,
paper links or demonstrations in that work section. The animated tutorial
is clearly labelled an illustration, not a replacement for personal work.

**Impact.** The primary route for the documented hiring/research audience
does not yet let a visitor assess a concrete contribution. This is the
largest content gap; changing the visual format would not supply evidence.
The honest placeholder is better than invented work, but its destination
does not fulfill the action's current promise.

**Recommendation.** Obtain one shareable piece of work with the person's
specific role, problem, decision, result or limitation, and inspectable
evidence. Publish only confirmed details and permitted material. Until such
material is available, make the primary action point to useful existing
experience or describe the upcoming-project destination accurately. There
is no need to invent metrics or fill several project cards.

**Verification.** Follow the primary action and check whether the destination
contains at least one concrete contribution and supporting material, or
whether its wording accurately states the limited destination. Have an
outside reader distinguish the tutorial from the person's own work.

## Improve next: keep mobile stage navigation understandable

**Observed implementation.** Below 480px, `src/style.css:414` through line
416 visually hides every stage name. The six buttons retain their numbers;
the accessible names still include the visually hidden text. The current
stage description names that stage (`index.html:250` through line 255).

**Usability inference.** A sighted phone visitor cannot identify a different
stage by its button label until choosing a number or remembering the order.
This is an intentional responsive tradeoff in the source, not a confirmed
screen-reader naming defect or a claim that the controls fail to work.

**Recommendation.** Try a compact labelled arrangement, such as two rows of
three stage controls, or another treatment that preserves stage names.
Retain the accessible text and current-state indication.

**Verification.** Inspect 320px and 390px renders and ask a reader to find
tracking or review directly. Confirm labels fit without overlap, all six
buttons can be reached and activated, and stage descriptions still match.

## Improve next: make the motion control easier to target

**Observed implementation.** The pause button is 32 by 32 CSS pixels at
`src/style.css:124` and 28 by 28 below 390px at line 433. The repository's
own design plan sets a deliberate 44 by 44 target for primary controls
(`docs/medical-ai-design-plan.md:141`). This review does not assert a WCAG
failure from those dimensions alone.

**Usability inference.** A visitor who needs to stop a continuously moving
figure has a comparatively small target, especially on a narrow phone.
The source already has a working-intent pause control; the recommendation
is to improve its target area, not to add a duplicate control.

**Recommendation.** Provide at least the project's chosen 44 by 44 hit area
while retaining the compact icon, state label and keyboard focus styling.
Check its separation from adjacent figure labels and content.

**Verification.** Measure the computed hit area on mobile and desktop,
activate it with pointer and keyboard, and confirm the animation stops and
the state label changes. These interactions have not been executed here.

## Secondary observations to test, not confirmed defects

- **Reading pace after manual selection.** Selecting a stage keeps autoplay
  running (`src/scan-figure.js:685` through line 697). Stages last 4.5 to
  6.5 seconds (lines 26 through 28), while each description also includes
  model or tool examples. Test whether manual selection should pause until
  resumed. The pause mechanism already exists, so do not claim it is absent.
- **No-JavaScript detail coverage.** Only the segmentation detail has
  `is-active` in the initial HTML; other details are visually hidden by
  `src/style.css:143` through line 145, and all step buttons begin disabled
  (`index.html:242` through line 247). The SVG alternative describes the
  whole sequence. Check whether the production no-JavaScript experience
  should expose all six descriptions as static text. Essential biographical
  and contact content remains in HTML, so this is not evidence that the
  entire site is unusable without JavaScript.
- **Intermediate header width.** Desktop navigation persists from 768px
  upward, while the container uses 96px total gutters and the header and
  navigation use non-wrapping flex layout (`src/style.css:42`, lines 49
  through 58, lines 308 through 311, and line 338). Inspect 768px/800px
  before claiming overflow. Source alone does not establish its rendered
  width with the actual fonts.
- **Specificity and next action.** The large hero slogan, general guiding
  principles and contact invitation (`index.html:99`, lines 369 through
  374, and line 391) are broader than the concrete role descriptions.
  Connecting one confirmed decision to those principles could make them
  more distinctive. Confirm the person's current intent before claiming
  they seek a particular job, internship or collaboration.

## Storyfolio suitability, assessed separately

The current sectioned portfolio and SVG pipeline are not defective because
they lack a persistent 3D object, trade-document chapters or a question with
a closing answer. The existing figure already has an explanatory sequence;
there is no evidence here that adding depth would explain it better.

The main constraint is missing personal work evidence, not missing motion.
Retaining this conventional structure while adding a supported case study
is a reasonable next step. A Storyfolio transformation can be evaluated
later if the person's actual materials support a coherent story and a
spatial relationship worth showing. Do not prescribe an object or attribute
the illustrative surgical workflow to the person to manufacture that fit.

## Source hashes

These hashes identify the reviewed working-tree files. The animation file
was hashed in full although review attention was on the documented timing,
stage, pause, reduced-motion and observer code.

| File | SHA-256 |
| --- | --- |
| `README.md` | `e1f2e41728d7c894473c13eda5e9d257dc8597b78b7f95505961f5f24c297f76` |
| `package.json` | `3b45009407c39fc69f4b8c0e7c74e383540d8fecc4dc7968c3736d36b27c2f64` |
| `index.html` | `034c1f6249293825a7a280c8d2aec77f444770969dff2ab0553d934edbbe055e` |
| `src/main.js` | `44ee490184cec8857cb8f6c95121610a57a7a66f53cefcec1af99333b0e2716a` |
| `src/style.css` | `c482983df363b64a4873267e625f6b608a539481b30fbb6682fa760f5c6102be` |
| `src/scan-figure.js` | `61f1d662b4f05a4ef8fee8010f43b717528c9c6c736bb0f9cbcfbb01e7f90af2` |
| `docs/medical-ai-design-plan.md` | `7c708f23156e90354ec6c32747bbb9a650d3d55fa57c5e5f84fee1d3b59f2694` |
