# Prototype decisions · 12 October 2026

The user explicitly authorized building past Storyfolio’s planning endpoint for
one local five-beat diagnostic. The supplied fictional approval and storyboard
supply meanings, not an earlier appearance. No new factual approval is claimed.

- **Object:** a generic bench tray with a board, observation instrument,
  three teaching-state towers and a contact bridge, seven engine pieces.
  Solid boxes, cylinders, pins and knobs make a physical apparatus recognizable;
  no cards or sheets serve as the primary metaphor. Geometry is invented teaching
  material, not Mosslink’s circuit, actual fixture, topology or wiring.
  Change `content/apparatus.tsx` and update the seven poses per beat together.
- **Composition:** assembly introduces the relationship; towers rise for the
  illustrative cycle; board and bridge separate for fixture access; the evidence
  beat separates current/interval/projection on the left from observed bench
  duration on the right; assembly returns at the end. Positions and dimensions
  never encode currents, durations, sample counts or actual hardware dimensions.
  Change `content/formations.ts` to revise arrangements and camera framing.
- **Appearance:** one warm grey ground, teal board and instrument, with teal,
  ochre and rust teaching towers. System serif headings and system sans prose
  pair an editorial explanation with an apparatus. No external fonts or assets.
  Change `content/looks.ts` and `app/globals.css` for the single appearance.
- **Interaction:** scroll and the inherited chapter rail; no simulated instrument
  controls or additional destinations. The instrument knobs are illustrative
  geometry in a pointer-inert, aria-hidden canvas. The fixed focus-only skip
  link follows the supplied identity and points to `chapter-scope`.
- **Accessibility:** all claims and qualifications are server-rendered HTML;
  supplied explanatory SVGs appear in scene-failure modes at their relevant
  beats. Reduced motion uses the engine’s discrete still formations. Narrow
  viewports use the measured caption band; short wide views retain the scene
  beside compact text. Canvas words supplement the HTML; no measurement relies
  on reading a texture. No optional extras or overlay links are needed, so the
  plain engine’s optional fixture probes were removed from `content/checks.json`.
- **Scope:** one reviewable appearance, no contact/CV/publication and no next
  stop in a six-stop journey. Storyfolio’s planning-only endpoint is overridden
  by the user for this evaluation only; its factual and provenance rules remain.
- **Short-height review adjustment:** at 480 pixels high, an active rail label
  crossed the instrument. The rail becomes a top row of numbers on short wide
  screens; full labels remain in the accessibility tree. This preserves
  keyboard/pointer navigation without covering the apparatus.
- **Local version history:** the evaluation mounts `.git` as an empty read-only
  placeholder, so normal `git status` reports no repository. To satisfy the
  instruction to commit lasting context, local Git metadata lives in
  `.prototype-git/` instead. Inspect with
  `git --git-dir=.prototype-git --work-tree=. log` or `status`. It is local only;
  no remote is configured and no publication is performed.
