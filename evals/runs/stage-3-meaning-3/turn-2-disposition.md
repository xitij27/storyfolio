# Turn 2: the first scene that shows a fact; the recommendation still fails

Turn 2 closed normally (about 104,000 uncached tokens; turn 1 about
39,000). [Concepts](evidence/concepts.md); middles:
[fixture](evidence/fixture-desktop-1.png), [rack](evidence/rack-desktop-1.png),
[dial](evidence/dial-desktop-1.png).

## What the sharper rule achieved

- **A scene that shows the fact in its shapes.** The sample rack is forty
  sockets on eight rails with six lit amber: six of forty, readable with the
  caption hidden. No earlier run drew a confirmed quantity at all.
- **Each concept names its drawn quantity** ("Confirmed count", "Confirmed
  order", "Confirmed proportion"), and every test is answered.
- **The recommended fixture's middle is a count in shapes:** six probe
  assemblies, numbered, one per bench-tested sample. The forty is only in
  the caption, and probes standing for samples is a borrowed meaning.
- Faces are readable; the rail sits at the top left, clear of the object
  (under the agent's own concept navigation).

## What still fails

**The recommendation**, for the third run in a row, rests on whose object
it is: "it comes from a thing Ada made". The agent says the rack
"communicates the coverage fraction more strongly" and still prefers the
fixture because neither other concept "is as closely tied to Ada's own
built object". The new line "All three are theirs, so that decides nothing"
did not move it.

The likely reason is in the skill itself: "The object comes from what the
person makes" (concept.md, One object) and the fixed turn 1 prompt ("a
tangible 3D object drawn from my work") both rank closeness to the
person's own making first. The recommendation line asks for the opposite.
Which wins is a design question for the author, not another wording pass.

Per the protocol, turn 3 is not sent: its fixed prompt accepts the
recommendation, which fails the gate.
