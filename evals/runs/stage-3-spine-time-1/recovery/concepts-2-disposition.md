# Concept unit 2: complete capture, one checker false negative

21 October 2026. The replacement unit closed normally: no signal, timeout
or log error; worker code 1 after 146516 ms; source unchanged before and
after; artifact binding and capture complete; 46 original images. All
three concepts built, served and scrolled on desktop (1440 x 900) and phone.

## Technical result

Five of six cases pass every check, including real pointer and keyboard
choice trials with visible focus. `02-desktop` (the power-state assembly
chooser on the index page) failed both trials before activation:
"Switch is hidden, covered, out of view or disabled".

The recorded geometry says otherwise. The chooser card spans y 683.297 to
900.078 in a 900-px viewport, so it overruns the bottom edge by 0.078 px.
[hit-target.mjs](../../stage-3-storyboard-length-1/measurement-2/hit-target.mjs)
line 10 requires `rect.bottom <= viewport.height` with no sub-pixel
allowance, so `inView` was false. The same record has `visible: true`,
`disabled: false` and a centre hit on the card's own heading, and the
case's real initial activation from `/` reached `/sketch/sensor` on
desktop. The `keyboard-before.png` image shows the focus ring reaching
exactly the screen edge with the whole card readable. Root attributes
this to a checker false negative, not a page or skill defect.

The [verifier](concepts-2-verify-command) therefore refuses complete
coverage (no trial images for that case), and the
[supplemental audit](concepts-2-supplemental-command) refuses the code-1
outer closure. Both are correct behaviour and stay recorded. The formal
concept gate has not passed.

## Root's review of all 46 originals

Recorded in [concepts-2-images.json](concepts-2-images.json), each whole
original viewed at native resolution with the Claude Code Read tool.

- All three concepts differ in kind: a seven-segment bench fixture
  (bring-up checklist), seven sensor modules (state table) and seven probe
  connectors (timing-diagram reading). None is sheets or cards. The
  recommendation (the fixture) is the strongest visually.
- The fixture's middle beat regroups 3/1/3 and does show command, fixture
  and observation as spatial groups on both sizes.
- Face words are missing or illegible: the fixture and loom faces show no
  readable words; the sensor shows small, soft labels that are barely
  legible on desktop and illegible on phone.
- On desktop the chapter rail overlaps the right-most piece in every
  concept. The sensor's ending reassembles with modules intersecting, and
  on phone its object crowds the "1 / State" kicker.
- Text: every number and claim checked (for example, concept 3's forty
  samples, six bench-tested, none to customers) matches confirmed fact F5
  and F4. Pages read top to bottom without the canvas.

These are concept-stage concerns for the storyboard and later looks, the
same family the candidate-3 review recorded. They do not block choosing a
concept.

## Pending author decision

Root asks the author whether to (a) correct only the checker, by adding a
1-px sub-pixel allowance to the in-view rule in a new copy of the helper,
and run one more unit (about 2.5 minutes, no model); or (b) accept this
evidence with the false negative as an explicit, recorded exception. No
turn 3 has launched. The continuation runner is drafted, not committed.
