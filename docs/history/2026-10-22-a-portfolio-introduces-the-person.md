# A portfolio introduces the person, 22 October 2026

After the scene amendment ([direction](2026-10-22-change-the-design-direction.md)),
the author wrote, verbatim:

> The thing is that I have an issue with the general way in which things are done in this skill. Like, if you create a portfolio website for an embedded engineer, I would think of stuff like, I don't know, their area of work, their past experience, their education, right? All of these things, and the and maybe also their past places where they have lived in. Like, all of this tells me more about the person, right? But what you make over here is just some specific thing from some specific part of work which they did. Like, is that how you introduce a person?  Is that how you make the portfolio website of a person? It's absolutely terrible

## What root found

The test person behind every Stage 3 run, Ada Mensah
(`evals/builds/full-journey-1/workspace/material/cv.md`), has a nine-line
CV: one employer, one project, no education, no places, no earlier work.
The fixed turn 2 reply also removes the employer and dates. Every Stage 3
site could only ever be about one project. The skill itself lets this
pass: its chapters come from one question and one document of the
person's trade, and "Leave out a role that has nothing to hold" lets the
Who and Where from roles drop without asking. Fuller test people exist
(nurse, chef, architect, reliability engineer have education and
multi-year histories) but were not used for Stage 3.

## Framing question

Root proposed making the site an introduction of the person (field,
places, education, experience, expertise and several works, others' words,
contact), with background asked for at stop 1 and a fuller test person, and
asked through the question tool: "Your own site used a research question
and a paper's chapters. Should the skill keep that kind of framing, now on
top of a whole-person structure, or drop it?"

Answer: **"Talk it through first"**. The option read: "Don't change the
skill yet; discuss what a good portfolio structure is before anything is
written."

The skill is not changed until that discussion settles the structure.

## Discussion, first round

Root proposed a draft order for an embedded engineer with a fuller
background: Hello (name, field, what they want; their bench), Where I'm
from (map or globe of places lived), What I studied, Where I've worked (a
timeline of roles), What I'm good at (the things of their field), What
I've made (several projects briefly, one in depth), What others say, Get
in touch. Root asked about order, personal versus professional, breadth
versus depth, the author's own site, and a through-line. The author
replied, verbatim:

> Yes, that order is perfect. How much life, how much professional stuff? That really depends on how much information we get from the user. When they try to use this skill, I mean, everything can be shown in brief and the user can get more information by clicking on the project or stuff like that. Yeah, so as far as my project goes, like my own portfolio website, I made it the way I wanted to, and see how creative I have been with the 3D designs. The ones you make are terrible. Terrible for introduction. A single idea tying it together sounds cool, but honestly, your generated ideas are terrible. You need to do better over there. I mean, a simple introduction also is okay, but it feels like it's missing something.

## The bar for ideas, and approval

Root wrote the structure into
[the portfolio structure spec](../superpowers/specs/2026-10-22-portfolio-structure.md)
and offered one example at V3's bar for an embedded engineer: a circuit
board as the through-line (datasheets laminate into a board with the name
in the silkscreen; the board flexes into a globe with traces routed between
cities lived in; a breadboard with the thesis circuit; a line of boards per
employer; the board running its power states with a live current trace and
the bug to flip on; a shelf of devices, one running, each opening on a
click; notes on the bench; the finished board boxed with the email on the
shipping label). Root asked whether that is the bar. The author replied,
verbatim:

> yes this looks right

Root rewrites the skill to that structure and bar. No run is made without
the author's word.

## Test it

After the skill change (commit `f107a2e`), the author wrote, verbatim:

> okay then let us test it. Remember to delete pointless examples

## Continue in another session

During the person test, after turn 5 closed, the author wrote, verbatim:

> I want to continue this in another session

Root stopped before turn 6 and wrote the state into `docs/handover.md` and
`evals/runs/stage-3-person-1/README.md`. Nothing was pushed.
