# Failure-backed neutral-proof PATH correction

12 October 2026. Prospective measurement-only correction. Root authorized
one separately frozen `codex-full-journey-baseline-2` proof after review,
local checks and commit. Baseline 1 made no model call; baseline 2 is the
first prospective paid baseline. There is no retry or overwrite inside
baseline 1, no actor-capability/prompt/skill change, and no browser/model
execution in this implementation work.

## Preserved failure

The original [process record](../../../codex-full-journey-baseline-1/full-journey-1/baseline-1/setup/environment-proof/process.json)
closed normally with code 1 after 240 ms at 06:01:18.504 UTC. Timeout,
external signal, spawn error and log error were all absent. The frozen
worker required sandbox PATH to equal the outer capability PATH exactly.
Its [stderr](../../../codex-full-journey-baseline-1/full-journey-1/baseline-1/setup/environment-proof/stderr.log)
instead shows these two prefixes followed by the complete unchanged outer
PATH:

```text
/home/kshitij/.codex/tmp/arg0/codex-arg0c9kfLQ
/home/kshitij/.codex/packages/standalone/releases/0.162.1-x86_64-unknown-linux-musl/codex-path
```

The assertion happened before version checks, local HTTP or browser work.
It did not establish an unavailable browser or an actor preflight failure.
The original frozen helper, raw records and source remain unchanged. The
stderr SHA-256 observed in this read-only review is
`6b428dea1fa02d8838f31acf3e71a098a5c76aeda9c4ec5b207ceaa02993ca33`.

## Actual filesystem evidence used for the narrow contract

Read-only directory, link, metadata and SHA-256 inspection established:

- The arg0 path is a real directory. Its exact entries are a regular empty
  `.lock` and `apply_patch`, `applypatch`, `codex-execve-wrapper` and
  `codex-linux-sandbox`. Every alias is a symlink to the exact frozen CLI
  `/home/kshitij/.codex/packages/standalone/releases/0.162.1-x86_64-unknown-linux-musl/bin/codex`.
- The release `codex-path` directory contains only regular file `rg`,
  5408904 bytes, SHA-256
  `e62198eb19b136b88c330af83647b5a962cb99b6b1f066758568f12de1974849`.
- `codex-package.json` is 205 bytes, SHA-256
  `f05ebff6db98bd613dd5654461985090c6416b41ad67902243d83a53b305ac05`.
  It declares layout version 1, version `0.162.1`, target
  `x86_64-unknown-linux-musl`, variant `codex`, entrypoint `bin/codex`,
  resources directory `codex-resources` and PATH directory `codex-path`.
- The CLI SHA-256 is
  `628e35487d888a28f0427fc37501da529dd3d81fcbad7a2c3421c1e8670d92e1`,
  equal to the preserved capability identity.

The inspected host entries were owned by UID/GID 1000. This is retained
provenance, not a sandbox UID-mapping assumption or validation requirement.
The correction instead binds canonical filesystem identities, exact
directory contents, alias targets and executable bytes. It makes no claim
to establish a general Codex PATH guarantee across other versions.
The independent [read-only integrity audit](environment-failure-1/integrity-audit-result.json)
retains matching filesystem identities and the failed attempt's evidence.

## Prospective behavior and evidence

The command record remains the observed outer environment and is explicitly
labelled as such. The worker saves `expectedOuter` from frozen capabilities,
selected actual `sandbox` variables and launcher identity evidence. The
finalizer compares `expectedOuter` with the observed command environment,
validates all saved launcher evidence against frozen capabilities and the
new pinned contract, and retains outer/sandbox/launcher records separately
in its attestation. PATH is never modified by the proof.

Acceptance requires precisely two added components, their exact expected
order, the exact full original PATH suffix, an arg0 directory under the
Codex installation's real `tmp/arg0` with the observed six-character name
shape, and the metadata-declared PATH directory in the same frozen CLI
release. The CLI, metadata and rg must be regular canonical files; relevant
directories must be real canonical directories. Unknown entries, alias
shadowing, different link targets, altered rg bytes, changed suffixes or
changes to LANG, browser/library paths, TMPDIR or telemetry fail closed.
It does not accept a directory merely because its name looks plausible.

The report is now created before environment validation, retaining actual
selected variables and a failing outcome if this check fails again. Other
neutral-proof checks, bounds, source guards and image review are unchanged.
The twelve pure tests include the original six proof contracts and six
new environment/provenance tests, with unknown/missing/reordered prefixes,
extra or shadowing entries, wrong targets, wrong hashes, symlinked paths,
changed suffix/non-PATH variables and altered final evidence. They are
written but not executed by this preparer. Root owns tests and the new
single proof after review; no passing result is claimed here.

Changed prospective source is limited to `probe-environment.mjs`, its pure
tests, the wrapper's environment-scope label, finalizer validation/evidence
and preparation documentation. The existing case already freezes these
helper paths. A new input digest is required; old frozen bytes and outcomes
are not changed or accepted under the new rule.
