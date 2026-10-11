# The fixture study object

11 October 2026. This is an authored illustrative apparatus for the fictional
embedded-engineering case, not a reconstruction of MOSSLink hardware.

Four persistent pieces have different physical identities: a firmware command
console, a generic board, an open bring-up fixture and a bench observation
instrument. Each has a machined edge, depth, inset printing and fittings that
remain recognizable as the formation changes. Sage cases, warm ivory grips,
graphite recesses and subdued brass contacts distinguish form from print.

The generic board deliberately contains no circuit traces or chip topology.
The printed arrows describe the supplied work relationship rather than an
electrical schematic. Contacts, screws, buttons, clamps and encoder grips are
illustrative affordances, not claims about the fictional person's actual
hardware. There are no synthetic traces, current readings or invented code.

All geometry is centered around a unit footprint with outward faces toward
positive z. The command console is 0.35 deep, the board includes standoffs, the
cradle has raised clamps, and the observation instrument is 0.375 deep.
Chamfers and small edge seams catch light during movement. Printing sits just
above its recess to avoid depth conflict. Canvas typography is drawn in each
physical panel's own aspect ratio, compensating for the engine's portrait
texture resolution. Parent formation scaling can still alter that ratio.

The middle prints one directed relationship: firmware command, board response,
fixture access and bench observation. The close observation display gives
separate typographic zones to 72h observed longest run and 2yr projected battery
life. This separation keeps the bounded evidence distinct from the projection.
Every surface calls the model illustrative; the HTML retains the full source
context and factual qualifications.

An HTML inspection control selects a piece through the existing controls
store. A small lens changes on that physical piece and four rust-colored
corner marks identify its full extent. The canvas stays passive; the control's
text supplies its accessible explanation.

Implementation uses the existing custom Piece and face-drawing hooks. The
prototype's local `components/story/story.tsx` moves the existing controls
provider around both the scene and the HTML. Originally the provider wrapped
only HTML, so a custom Piece calling `useControl` would throw and switch the
scene off. React Three Fiber's Canvas bridge now carries the same controls
store into the scene. This is a prototype-local integration correction; no
shared engine API, shipped engine or skill change, or paid evaluation is
introduced. The coordinator records integrated visual review and verification
separately.

Local implementation verification: `./node_modules/.bin/tsc --noEmit` and
`./node_modules/.bin/eslint content/piece.tsx content/faces.ts` both passed.
These checks do not establish visual acceptance.
