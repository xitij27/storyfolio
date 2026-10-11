# Stage 3 preparation checkpoint, 11 October 2026

The author approved the engine after desktop and physical-phone review,
recorded verbatim in the [approval history](../../../docs/history/2026-10-11-engine-approval.md).
The [first baseline protocol](../../../docs/superpowers/plans/2026-10-11-build-baseline.md)
authorizes one bounded conversation and one independent judge, followed by
review of actual usage before further conversations. No paid model call or
shipped skill edit is part of this preparation checkpoint.

## Prepared inputs and tools

- [Fixture validation](../embedded-1/validation.md): 19 unchanged historical
  files, 14 supplied workspace files, seven beats in six chapters, eleven
  site decisions and five local public assets. Missing historical assets
  have explicit fictional replacements and recorded provenance.
- [Capability probe](../environment-probe-1/findings.md): production build,
  browser capture, local HTTP and explicit external-network denial pass.
  Nine screenshots were individually reviewed. The original offline
  policy could not bind a server; the tested localhost profile resolves it.
- [Independent checker smoke](../acceptance-smoke-1/findings.md): final
  exact-source attempt 7 passes type generation, typecheck, lint, production
  build and all six browser conditions. All 27 final screenshots were
  individually reviewed; all 53 artifact hashes match after copying.
  Earlier failed/intermediate attempts remain separate and retained.
- The build runner freezes inputs, prepares outside Git, captures bounded
  source snapshots and invokes one gated actor turn at a time. It retains
  failures and interrupts whole child process groups at its deadline.
- The independent judge validates frozen sources and raw evidence, makes
  one fresh bounded call, and retains invalid results without retry.
  Screenshot pixels are not sent to this text judge.

The preliminary [dry inspection](dry-pre-freeze.json) recorded 126 input
files and made no model calls. The first sandboxed attempt failed at
`spawnSync codex` with `EPERM`; the required approved outer retry passed.
This dry digest predates the final CLI correction and is not the cohort's
frozen identity. The actual cohort receives its own manifest after commit.

The checker deliberately ignores actor-editable package scripts, but its
separate temporary dependency tree is not a filesystem security boundary.
The sandbox is also not a read jail. Audit actual commands for repository,
global-skill and other-run reads. Static phone fallback and reduced motion
in embedded-1 differ deliberately from the plain-engine smoke fixture.

## Validation

Mandatory repository checks and final runner validation are recorded below
before the checkpoint commit. Engineering probes make no paid evaluation
calls and do not supply evidence for a new skill instruction.

`node evals/check-skill.mjs` passes: 687 words, four references, unchanged.
`node evals/check-people.mjs` passes: seventeen fictional cases.
`git diff --check` passes. A changed/new Markdown link scan found only this
then-not-yet-written findings file; no new em dash was found.
The fixture verifier was repeated without `--refresh`; the sandboxed Git
subprocess again returned `EPERM`, and the required approved outer retry
passed. [Its log](fixture-verification.log) confirms unchanged provenance.

The first full `npm test` attempt under the outer sandbox failed three test
files that need subprocess capabilities. Its [raw log](repository-tests-initial.log)
is retained. The required approved outer retry passed all 227 tests before
the final CLI-selector correction. The final check after that correction is
recorded separately below.

Final `npm test` passes **228 tests**, including fourteen build-runner,
thirteen acceptance-helper and twelve judge tests. The
[final raw log](repository-tests-final.log) retains the counts and timings.

The pre-freeze audit found that `-P` is accepted by `codex sandbox` but
rejected by both `codex exec` and `codex exec resume`. The runner now uses
`-c default_permissions="storyfolio-build"`, rejecting conflicting legacy
sandbox settings. Both exact fresh/resume argument lists pass a real CLI
`--help` parse test without a model call. The
[default-selector runtime proof](default-permissions-proof.json) uses the
same generated configuration with no `-P` or `-C`: local HTTP succeeds and
an external request receives explicit proxy denial (403). Its source
[driver](check-default-permissions.mjs) and
[child](default-permissions-child.mjs) are retained. The standalone sandbox
command cannot ignore user configuration; that limitation is recorded in
the proof. Actor execution does use `--ignore-user-config`.

The official [permission documentation](https://learn.chatgpt.com/docs/permissions)
and [CLI reference](https://learn.chatgpt.com/docs/cli/reference) were read
on 11 October 2026 to verify the selector, alongside installed CLI help.
The actual prepared actor workspace still requires the full non-model
build/browser probe before the first paid turn.
