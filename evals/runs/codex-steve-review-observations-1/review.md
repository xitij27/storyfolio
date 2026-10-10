# Steve portfolio review

The existing site has a coherent visual identity and a relevant explanatory
figure. Its first improvement should be evidence of Steve's own work. The
main action currently leads to a project placeholder, so visitors can learn
about an illustrative AI pipeline but cannot inspect a personal project.
The current structure can support that evidence without a rebuild.

## Scope

Reviewed the local checkout at HEAD
`9a5603d51463eb2564f8b5a117b2242678c660b1`, including its modified lockfile.
The frozen source is in [the case material](../../reviews/steve-source/material/repo/).
An isolated copy passed its production build and was inspected in Chromium
at widths 320, 390, 768, 800 and 1440. These are local-source and local-browser
findings; no deployed version or personal claim was independently verified.
The source checkout was preserved and `Profile.pdf` remained unopened.

## Priorities

| Order | Finding and evidence | Recommended change |
|---|---|---|
| 1 | “Explore my work” and Projects lead to a “Coming soon” project placeholder. `index.html:103,272-296`. | Point the primary action to substantive Experience content until a real project is ready. Then publish one accurate example with the problem, Steve's responsibility, method, artifact, outcome context and limitations. Keep team credit and project status explicit. |
| 2 | The main headline and broad role descriptions give less information than the supporting student and employment details. `index.html:98-104,307-329`. | Make the opening more specific to Steve and add one attributable contribution for each relevant role. Obtain the missing facts from him; the illustration and employer names do not establish medical AI project achievements. |
| 3 | Mobile stage choices show numbers without names. Pause is 32px square at 390 and 28px at 320. Manually selecting a playing stage advances after about 4.55 to 6.54 seconds in the two sampled stages. | Keep short stage names visible, enlarge the pause target, and consider holding a manually chosen stage until Play is pressed. These are usability recommendations, not a conformance verdict. |
| 4 | The figure's frame-timing and training descriptions need more conditional wording, and contact copy does not identify a particular opportunity. `index.html:250,255,391-393`. | Clarify the illustrative explanation without implying a real deployed system. Add the desired contact purpose only after Steve confirms it. Update the design plan where it still describes contact links as future work. |

The [source-only agent review](../codex-steve-review-before-1/steve-source/natural-1/files/docs/story/review.md)
contains detailed reasoning, source references and completion checks for
each recommendation. The [runtime review](runtime-review.md) adds measured
control behavior, screenshots, reproduction steps and inspection limits.

## Preserve

Keep the navy/teal visual system, simple page structure, clear contact
anchors, and explicit distinction between illustration and real model
output. The project placeholder is honest about missing evidence; replace
it with real material rather than invented results. The tested mobile menu
supports keyboard opening, Escape and destination focus. Reduced motion
retains selectable stills, and JavaScript disabled retains navigation and
the segmentation still. No horizontal overflow was measured at the five
sampled widths. The suspected tablet navigation problem was not reproduced.

Desktop and mobile screenshots support these observations. Some initial
figure captures caught a 200ms text transition; settled captures are
readable. Do not report that transient capture as a persistent layout bug.
This was not a screen-reader audit, physical-phone test, cross-browser test,
zoom test, performance benchmark or external-link check.

## Storyfolio suitability

General portfolio quality is the immediate issue: useful evidence must
follow the promise to show work. A one-object 3D transformation is optional
and currently lacks a supplied personal case study to carry its story.
The existing educational figure already relates to the stated field.
Consider Storyfolio's format only after the owner supplies a concrete work
example whose explanation would benefit from it. This review does not
justify a redesign or a judgment that conventional portfolios are weaker.

## Effect on the skill

The fixed source-only experiment successfully used the existing skill and
produced a scoped, prioritised review. These browser checks were independent
and were not hidden expectations for that source-only agent. The pilot adds
review tooling and evidence; it does not justify a new skill instruction.
One real example does not establish broad review quality. See the
[experiment findings](../codex-steve-review-before-1/findings.md).
