# Supplied local capabilities

This is coordinator setup information, not an actor preflight result.

- Storyfolio is the only enabled skill, at `.agents/skills/storyfolio/`.
  Other discovered global skills and plugins are disabled for this run.
- The local engine is scaffolded from that skill. Dependency setup uses its
  committed lockfile. The separate environment setup record states what
  the coordinator actually verified.
- The evaluation network permits loopback only. External asset retrieval
  and optional-skill installation are not included in this task.
- `scripts/review-sheets.mjs` is a supplied neutral screenshot utility.
  Run it from the site root with an existing screenshot directory and a
  new output directory. It resolves the site's own Playwright dependency,
  combines local PNG/JPEG files and records their hashes. It contains no
  portfolio implementation, expected visual solution or scoring rubric.
  Contact sheets are navigation aids; original captures remain available.
- No earlier site's source, screenshots, helper paths or design solution
  are part of the supplied material. Configuration isolation is not a
  filesystem read barrier; the coordinator separately audits actual access.

## Fixed accessibility element for this comparison

The inherited focus-only skip link is neutral page navigation, not part of
the apparatus design. Keep one such anchor with `id="story-skip"`, the text
`Skip to the answer`, and `href="#chapter-scope"`, pointing to the actual
final chapter with that ID. Its inherited styling reveals it on keyboard
focus. All other headings, prose, geometry and composition remain open
within the approved storyboard. This exact identity lets independent checks
distinguish the intended focus-only link from inaccessible ordinary controls.
This is the single intentional exception to the inherited storyboard's
generic pointer-and-keyboard sentence: its unfocused pointer route is not
applicable, while actual keyboard access remains required. Every ordinary
interactive control still needs both pointer and keyboard operation.
