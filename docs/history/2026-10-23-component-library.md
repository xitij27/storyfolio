# A library of components, 23 October 2026

Following [the crude-diagrams point](2026-10-23-crude-diagrams.md), the
author wrote, verbatim:

> I think it will be nice to create a library of pretty components which can give user the idea of how they could use them in their website. We can also use ideas from other providers like React Bits or Aceternity UI
> You should also pick up components from my portfolio website as a ready to use template

Root put four questions. The author's answers, verbatim:

| Question | Answer |
|---|---|
| Where should the component library live, and how does the person see it? | Standalone showcase |
| React Bits and Aceternity licences forbid copying their source into this public MIT repo. How should we use them? | Own versions + links (Recommended) |
| Which parts of your portfolio should become ready-to-use template pieces? | V3 paper pieces, V2 sections, Project figures, Lab scenes |
| The repo rule says no line enters the skill without a run that needed it. Should the skill point the agent at the library now? | Yes, marked untested (Recommended) |

## What root found before building

- **Licences.** React Bits is MIT with the Commons Clause, and says "do not
  sell, sublicense, or redistribute the components themselves-whether alone,
  in a bundle, or as a ported version". Aceternity's licence says "You cannot
  re-distribute the Item as a stock image or its source files, regardless of
  modifications". Their code cannot be copied into this repository. Ideas
  can be used, and a person can install the originals into their own site,
  which both licences allow.
- **The portfolio** (`../portfolio-website` at `163b8ce`) is the author's
  own code, except `components/aceternity/` and `components/react-bits/`,
  which are those providers' code and are not copied.
- **The globe data** there is Natural Earth country outlines (public
  domain), 534 KB. The library's globe draws land as dots, which needs only
  a 2 KB mask made from that file, so the library carries the mask. (The
  engine separately ships Natural Earth 1:50m land for drawn maps, 1 MB,
  approved in the drawing-kit work the same day.)

## What this direction means

- The showcase is its own small app, separate from the engine. It ships
  inside the skill folder (`skills/storyfolio/library/`) so that an agent
  using the skill has it; like the engine, it is copied out before
  anything is installed.
- Pieces from the providers are our own code written from the idea, and
  each names the original and how the person installs it.
- The skill names the library at the look stop, marked untested. No paid
  run is made under this direction; a run needs the author's word.

## Published as GitHub Pages

While the library was being built, the author wrote, verbatim:

> I want to have this component as GitHub pages

Root made the library a static export with the repository's base path and
added `.github/workflows/library-pages.yml`, which builds it and deploys it
to https://xitij27.github.io/storyfolio/ on a push to `main` that changes
the library. Going live needs a push and Pages turned on (source: GitHub
Actions) in the repository's settings. The repository rules ask for the
author's word before a push, so root asked for it.

Asked whether to push `main` and turn Pages on (the push also carrying
the other session's unpushed `c298b336` and `e924ad1c`), the author
answered, verbatim: "Push and turn on Pages (Recommended)". This is the
author's word for that day's push under the repository rules.
