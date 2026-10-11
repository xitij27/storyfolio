# Install-environment difference: explicit disposition

12 October 2026. Coordinator decision before any candidate actor call.
The candidate may proceed once every other prelaunch assertion passes.
This accepts one disclosed, non-material setup-provenance deviation. It
does not assert that the two installation command environments were equal,
relax frozen inputs, or authorize another installation, probe or paid turn.

## What differed

The baseline coordinator's `npm ci --offline` command set
`NEXT_TELEMETRY_DISABLED=1`; the candidate coordinator's command left it
unset. The stricter audit correctly failed that exact equality assertion.
Its original failure and verifier remain evidence. The readiness helper
passes because it binds the four frozen environment values plus TMPDIR,
not this extra installer-only flag. Neither result is rewritten.

The deviation arose when the candidate setup restored the four frozen
environment values and TMPDIR but omitted the extra installation flag.
It is a coordinator setup difference, not an actor failure or a new skill
instruction. Raw command records, setup outputs and generated stack-path
exposure remain unchanged.

## Why this does not block the intended comparison

Read-only evidence bounds the difference:

- Both commands use the same executable, offline command/cache and exact
  dependency lock, install 392 packages and exit 0. Their retained stderr
  is identical (137 bytes), and stdout differs only in elapsed seconds.
- The recorded candidate install executes one lifecycle hook,
  `unrs-resolver@1.12.2` postinstall, `node postinstall.js`, successfully.
  The root package has no installation lifecycle hooks. Inspection of
  that hook and its loaded `napi-postinstall` path finds no use of
  `NEXT_TELEMETRY_DISABLED` and no Next invocation.
- The full current dependency trees match by path, type, file bytes/hash,
  permissions and symlink target: 24,083 regular files, 617,616,341 bytes,
  2,355 directories and 24 symlinks, with zero differences. The
  [inventory](candidate-dependency-inventory.json) has digest
  `2964d62cdcedb14dfb1ba85b8cad2d909671f641eac0116e3070ae44bc3a7ca3`.
  The baseline actor later reinstalled dependencies, so this is current
  package equivalence, not a historical inventory of its first install.
- The frozen probe explicitly sets `NEXT_TELEMETRY_DISABLED=1` for both
  actual production-build and starter-browser child processes. Thus their
  measured environment does not depend on this omitted install flag.
- All 124 frozen inputs compare, with only the intended main skill change.
  Retained starter source is unchanged. The factual setup differs only
  by its new input digest, not by new instructions or hints. The recorded
  baseline actor environment leaves the flag unset, as will the candidate
  launch; the four frozen values and TMPDIR match exactly.

No observed package, source, capability or actor-input difference follows
from this installer flag. This is sufficient to proceed with the already
approved bounded question, without spending a replacement setup/model run.
It is not proof that no telemetry event occurred, a complete process trace
of installation, or an assertion of perfect experimental isolation.

## Reporting and enforcement

Keep the failed exact-environment comparison alongside a new explicitly
qualified audit. Require precisely this difference, not a broad ignored
environment field. Every remaining source, input, runtime, capability and
image assertion must pass. Do not edit the original frozen protocol,
checker, expectations, setup proof or failed-audit evidence.

Report the final comparison as matching frozen actor inputs except the
candidate skill, with this disclosed installer-provenance deviation and
its bounded impact evidence. Do not call the complete installation
environments identical. The two-paragraph test still does not isolate each
paragraph's effect or establish a general success rate, ordinary build
entry, planning regression, physical-phone acceptance or Stage 3 completion.
