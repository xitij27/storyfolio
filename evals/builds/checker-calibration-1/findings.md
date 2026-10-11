# Build checker calibration, 11 October 2026

The corrected independent checker passes all six browser conditions on
the unchanged three-beat source from the first build actor. This is an
unpaid measurement calibration, not another model run, a changed actor
result, or acceptance of the complete seven-beat site.

## Inputs and corrections

The [original study](../../runs/codex-build-1/findings.md) retains its raw
failed diagnostics and original judge verdict. The [checker corrections](checker-fixes.md)
address mixed physical Next.js runtimes and strict link-text matching.
The [judge correction](visual-observability.md) explains image events that
the CLI omitted. No shipped skill or engine file changed.

[Expectations](expectations.json) project only Scope, Transition and Review
from the frozen full-site contract. The original partial diagnostic also
required the bring-up definition, which its frozen storyboard assigns to
the unvisited Observation chapter. This projection removes that one
requirement; the full-site expectations and original failed result stay
unchanged.

[Input provenance](input-provenance.json) binds the original cohort digest,
workspace, checker hashes and corrected projection. [Before](source-before.json)
and [after](source-after.json) source manifests match the original actor
source. Their [comparison](source-comparison.json) records zero source
changes and unchanged checker implementation during the run. Excluded
generated output and installed dependencies are not covered by this source
comparison. Next package/version and CLI identity are checked, not every
transitive dependency file.

## Runtime result

The [script](run.mjs) and [exact command](command.json) use the first
cohort's local-only capability configuration. The command invokes a local
sandbox, build tools and Chromium, with no model call. Standalone sandbox
execution retains the earlier documented user-configuration limitation.
[Process output](process.json) records exit code 0.

[The manifest](runtime/manifest.json) records successful type generation,
typecheck, lint, production build and all six conditions: desktop, mobile,
reduced motion, no WebGL, no JavaScript and WebGL context loss. Required
files and served assets pass. There are 21 screenshots and 47 hashed
artifacts. Repository copies were verified against both the manifest and
the original output directory.

[Image comparison](image-comparison.json) shows fifteen identical static
PNGs, inheriting the exact prior individual observations for
[mobile](../../runs/codex-build-1/embedded-1/baseline-1/spine-acceptance/visual-spine-desktop-mobile.md),
[reduced motion](../../runs/codex-build-1/embedded-1/baseline-1/spine-acceptance/visual-reduced-motion.md)
and [fallbacks](../../runs/codex-build-1/embedded-1/baseline-1/spine-acceptance/visual-fallback.md).
The six changed desktop originals were [individually opened again](visual-desktop.md).
No blocking layout defect was observed. Texture labels remain softer than
HTML text, and the small schematic previews rely on their expansion links
for detailed reading. Screenshots do not establish animation quality,
physical-phone performance or every intermediate scroll position.

## Repository verification

The [repository test log](repository-tests.log) records 233 passing tests,
including the eighteen focused checker tests. `node evals/check-skill.mjs`
passes with 687 words and four references; `node evals/check-people.mjs`
passes all seventeen fixtures. The [final evidence audit](evidence-audit.json) verifies the
126 frozen cohort files, 367 retained actor artifacts, separate Git bundle,
calibration copies and verbatim handover archive. The
[frozen-input audit](frozen-input-audit.json) records the unchanged cohort
digest. No additional paid
evaluation was made. Further build work remains subject to the recorded
cost review and [completion proposal](../../../docs/superpowers/plans/2026-10-11-build-completion-proposal.md).

[Repository verification](repository-verification.json) distinguishes the
passing current-code/documentation whitespace check from the full staged
check: the latter reports only extra final blank lines in retained raw
logs and frozen source copies. Those bytes remain intact for provenance.
