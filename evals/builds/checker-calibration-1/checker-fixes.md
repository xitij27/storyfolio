# Acceptance checker corrections

Recorded 11 October 2026, after the original actor and judge completed.
The `codex-build-1` cohort retains its frozen checker from `2f36b7e`, raw
results and original judgments. These corrections change the current
measurement tool, not Storyfolio or the actor's site.

## Next runtime identity

The original independent partial-spine check used the trusted project's
Next executable while generated application code loaded the actor
workspace's copy. Build failed during global-error prerendering with
`Expected workStore to be initialized`. The controlled diagnostic using
workspace dependencies completed the build. The [saved diagnosis](../../runs/codex-build-1/audits/acceptance-dependency-location.md)
records exact paths, equal file hashes, the separate async-storage
instances and the limits of that causal inference.

The current checker requires an explicit trusted `--dependencies` project
outside the actor workspace. It resolves Next from the workspace, compares
the package name/version and CLI SHA-256 with the trusted copy, and uses
that workspace executable for type generation, build and server startup.
A mismatch fails before commands execute. Both identities and hashes are
retained in the acceptance manifest. TypeScript, ESLint and Playwright
continue to resolve from the trusted project.

This verifies only the Next package name/version and entrypoint bytes.
It does not establish the integrity of every installed or transitive
dependency. Existing lockfile and dependency-mutation review still apply.

## Link labels

The [saved desktop report](../../runs/codex-build-1/embedded-1/baseline-1/spine-acceptance/local-deps-result/desktop/report.json)
contains visible, focusable, in-view pointer targets with correct
destinations named `Email Ada ↗`, `Download CV HTML ↓`,
`View power-state schematic ↗` and `View fixture schematic ↗`.
Exact text equality incorrectly marked those links unusable.

The matcher now accepts the approved text followed by decorative arrows,
or a separated HTML, PDF or SVG format label matching the destination's
extension, with optional brackets and trailing arrows. It rejects added
prose, misleading prefixes, attached words and inaccurate format labels.
Destination equality, visibility, viewport position, pointer reachability,
tab order and actual keyboard focus requirements are unchanged.

The partial report also lacks wording assigned to the unimplemented
fixture beat. That scope issue is separate from these checker bugs and
does not justify weakening the complete-site expectations.

## Verification before the new runtime check

`node evals/lib/build-check.test.mjs` passed 18 tests. The
[full local test log](unit-tests.log) includes regressions for selecting
the workspace Next copy despite identical bytes, changed versions/bytes,
invalid or actor-owned trust identities, the four observed link labels,
misleading text, wrong destinations and unusable decorated links.

`node --check evals/check-build.mjs` and the scoped `git diff --check`
passed. [Source hashes](checker-source-hashes.json) identify this tested
implementation. No build, server, browser or paid model run was started
while making these corrections. A new coordinator runtime check must
retain its own inputs and evidence; these unit results alone do not
establish runtime acceptance.
