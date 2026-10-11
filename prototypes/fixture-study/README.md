# Between code and the bench

A five-beat visual recovery prototype for Storyfolio, using the fictional
embedded engineer Ada Mensah and environmental sensor Mosslink. This is a
manually authored design study, not an output from a new skill evaluation or
an approved finished portfolio.

The study follows the [story-depth revision](../../docs/superpowers/specs/2026-10-11-fixture-story-depth.md)
of the [first prototype](../../docs/superpowers/specs/2026-10-11-fixture-prototype.md)
and the [visual recovery plan](../../docs/superpowers/plans/2026-10-11-visual-quality-recovery.md).
Read the [local handover](docs/story/handover.md) before editing. The
[object design record](content/object-design.md) explains the geometry and
the one local controls-provider adaptation.

## Run locally

Use Node 22.18 or later with native TypeScript support. From this directory:

```bash
npm ci
npm run dev -- --port 3012
```

Open `http://localhost:3012/`. This development session reuses an existing
local dependency installation through an ignored `node_modules` symlink.
The symlink is not packaged or required: a fresh checkout uses `npm ci`.

The prototype has one appearance. Append `?fps` for the frame meter. Browser
automation uses Chromium installed with `npm run browsers` or an existing
cache selected by `PLAYWRIGHT_BROWSERS_PATH`.

## What to review

1. **The question:** four parts form one bring-up assembly around a cradle.
   The opening asks how a firmware decision becomes observable on the bench.
2. **The schedule:** command and board come forward. An explicitly illustrative
   Sleep, Measure, Transmit loop explains scheduling; working documents add
   context without pretending to reproduce actual firmware or records.
3. **The bench:** those same parts separate into a directed relationship:
   command, board, fixture, observation. Four HTML buttons highlight each
   part and explain its role and ownership. Try the buttons with a keyboard.
4. **The evidence:** the observation instrument comes forward. Two separate
   paths explain the measured inputs and assumed interval behind the
   two-year projection, distinct from the 72-hour continuous bench run.
5. **The scope:** the assembly returns beside forty assembled, six bench-tested
   and zero customer units, with unfinished qualification made explicit.

Scroll both ways to inspect the transformations. Phone layouts retain a
compact scene. Reduced motion uses still poses; no WebGL, context loss and
no JavaScript retain HTML and authored vector explanations. These modes
need visual review as well as functional checks.

## Evidence and boundaries

The [frozen facts](../../evals/builds/embedded-1/workspace/docs/story/facts.md)
and [permitted fixture drawing](../../evals/builds/embedded-1/workspace/public/assets/bring-up-fixture.svg)
support the relationship. Ada wrote firmware, scheduled power states and
built the bring-up fixture. A colleague designed the PCB and analogue front
end. The equipment shapes, fittings and connectors are illustrative, not
actual circuitry, wiring or hardware reconstruction.

The longest run was 72 hours. Two years is a projection from bench current
readings and an assumed reporting cycle. Six of forty engineering samples
were tested on the bench, none went to customers, one preliminary emissions
check passed and full qualification is unfinished. The page keeps these
qualifications visible. No waveform, measured current value or successful
fix for the radio-awake incident is invented.

Study captures and their conditions belong in
[the depth study](../../evals/runs/visual-recovery-depth-1/). The first
three-beat source is preserved at `71ae3ea`, with its
[original evidence](../../evals/runs/visual-recovery-prototype-1/) unchanged.
Local checks include `npm test`, `npm run typecheck` and `npm run lint`;
the study's capture script records its targeted browser conditions. The
inherited `npm run check` runner remains available, but its stock matrix is
not the study's visual acceptance record.

The shipped Storyfolio skill and engine remain unchanged. This prototype
does not establish skill improvement, a complete portfolio workflow or
Stage 3 acceptance. The author's visual approval is still required before
expanding the remaining site.
