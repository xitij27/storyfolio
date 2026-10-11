# Five-beat baseline: final local preparation

11 October 2026. The author
[approved input freeze and workspace verification](../../../docs/history/2026-10-11-build-freeze-approval.md),
not a paid actor or judge. Common inputs were already committed at
`6d419ea49fcd9aed1da2913dc1e6650979d92d92`. This work changes no shipped
skill, engine, fixture, rubric, checker, runner or transport implementation.

## Outcome

`codex-bench-depth-baseline-1` is prepared and its actual actor workspace
passes the local capability gate. No actor turn or judge directory exists.
The [strict final audit](final-audit.json) verifies the frozen sources,
workspace, CLI/configuration, factual setup record and retained runtime proof.
The next step is an explicit paid-run decision, not another preparation
repair or a declaration that the skill reproduces the accepted prototype.

| Identity | Frozen value |
|---|---|
| Case | `bench-depth-1`, schema 2, `prototype-depth`, `paged-v1` |
| Input digest | `57b8614b2334d19a387829598e9978f7d5ecc0412bfd364448c1cb5643b77f7e` |
| Capability SHA-256 | `3b41c5b94fbd46487a8d936a4326701067cdfd5971287dde0b457b004bd33241` |
| Frozen inputs | 121 files, including seven actor fixture files and 86 skill files |
| Starter source | 172 source-bound files, no initial extras or scaffold conflicts |
| Actual workspace | `/var/tmp/storyfolio-freeze-runtime-20261011/storyfolio-evals/build-bench-depth-1-55RyeV` |
| Node / CLI | Native-TypeScript Node 22.22.1 / Codex 0.162.1, CLI binary hash and both executable paths retained |

The [cohort manifest](../codex-bench-depth-baseline-1/inputs/manifest.json)
is the authoritative input inventory. The [initial audit](initial-audit.json)
finds an empty external starting directory, only the declared fixture and
skill before scaffolding, and exact frozen starter bytes afterwards.
`git rev-parse --show-toplevel` from that directory exits 128 with
`fatal: not a git repository (or any of the parent directories): .git`.
It does not inherit this repository's project instructions via ancestry.

## Actual local verification

- A fresh offline `npm ci` installed 392 packages from the pinned lockfile
  and existing cache. The deprecation notice for the pinned ESLint version
  is retained; dependencies were not upgraded. Its zero-vulnerability npm
  summary is cached install output, not a fresh advisory review.
- The frozen command-only probe ran under the actual CLI with the exact
  actor `-c` configuration and `default_permissions` selector. Local HTTP
  returned the expected body. External HTTPS received an explicit proxy
  403, not merely a timeout or DNS error.
- Production build exited zero. The selected light-wide browser check
  exited zero with no report problems. All nine original 1440 by 900
  screenshots were individually opened and reviewed, showing the supplied
  starter's gather, fan and stack. The [visual review](../codex-bench-depth-baseline-1/bench-depth-1/baseline-1/setup/capability-visual-review.md)
  records each image and the entry-viewport clipping limits.
- [Repository tests](repository-tests.tap): 305 passing tests in 31 suites,
  no failures, skips or cancellations. Skill check: 687 words and four
  references. People check: 17. The diagnostic fixture verifier passes.
- Final source has exactly two additions: Next's generated `next-env.d.ts`
  and factual `docs/story/environment-setup.json`, byte-bound to its saved
  coordinator copy. All existing fixture, engine and skill bytes remain
  unchanged. The audit rejects other source additions or modifications.

The [saved setup gate](../codex-bench-depth-baseline-1/bench-depth-1/baseline-1/setup/probe.json)
binds the input digest, capability hash, workdir and evidence paths. It is
coordinator proof, not the actor checking its machine. The three-beat starter
still has its demonstration content; no five-beat site was implemented here.
No new phone, reduced-motion/failure matrix, visual-quality score or physical
device acceptance is claimed.

## Environment and evidence boundaries

`/tmp` had only 71 MB free. After explicit execution approval, a new empty
disk-backed `/var/tmp/storyfolio-freeze-runtime-20261011` was created, with
931 GB free on that filesystem at the check. No old workspace or preview
was removed. Use this path as `TMPDIR`; it is recorded separately in
[runtime-environment.json](../codex-bench-depth-baseline-1/bench-depth-1/baseline-1/setup/runtime-environment.json).
The existing runner digest binds PATH, browser cache, library path and LANG,
but not TMPDIR. The final audit enforces both the four frozen values and
this separate setting, plus the exact Node executable/version.

The initial in-sandbox dry inspection returned `spawnSync codex EPERM`
despite printing the CLI version, with a read-only PATH-alias warning.
Approved outer execution allowed the same no-model inspection. Preparation,
offline installation and the nested sandbox probe needed approved outer
access to the new storage. The inner actor-style permission profile stayed
restricted throughout; no unsandboxed actor was launched. A tool-output
collector rejected an undefined exit-code value while the test process was
still running; its session was polled to completion, and the complete passing
TAP was preserved. Whitespace-only TAP lines are normalized for Git checks.
The staged whitespace check flags eleven final blank lines in exact frozen
source copies and two original command logs. Those bytes are preserved to
keep the input and evidence hashes valid; the authored-document/tooling
subset passes its separate whitespace check.

Standalone `codex sandbox` inherits user configuration; future actor `exec`
separately uses `--ignore-user-config` and disables apps/plugins/other skills.
The profile allows root filesystem reads and temporary-directory writes,
so it is not a read jail. Generated probe stack traces retain the frozen
implementation's repository path. They contain no held-out solution source
or images, but can aid discovery. They are preserved, not silently scrubbed.
Only the factual story setup JSON is sanitized. A future actor's raw commands
still need a contamination audit; absent logged reads do not prove isolation.
Generated dependency, build and check trees are listed but not recursively
claimed as verified source.

The OpenAI Docs skill informed the restricted-profile test design. The
[plan](plan.md#storage-and-source-basis) links the official permissions and
sandbox documentation. Those sources establish configuration semantics;
the saved [runtime probe](../codex-bench-depth-baseline-1/bench-depth-1/baseline-1/setup/capability/probe.json)
establishes these narrower observed results. Actual actor/model access,
judging context fit, comprehension, latency, cost and output quality remain
unobserved.

## Exact checks and prospective launch

From the repository root, the reusable no-model recheck restores the frozen
environment before running the strict audit and runner `--dry`:

```sh
node evals/runs/build-workflow-freeze-1/check-ready.mjs
```

It refuses all arguments and cannot launch a paid turn. The actual initial
`--prepare` command and output are in [prepare-result.json](prepare-result.json).
Do not repeat setup, overwrite a failed artifact or create another baseline
to resolve a mismatch. Preserve changes and seek a new decision instead.

The [prospective launch specification](launch-command.json) records the
exact executable, working directory, arguments and frozen environment for
one actor turn. It is not executed or authorized here. It differs from the
validated runner inspection by selecting `--turn 1` instead of `--dry`.
Before any later launch, rerun the unpaid check and obtain cost approval.
The runner does not enforce human approval itself; the saved local setup
gate is not permission to spend a turn.

Proposed allowance: one fresh `gpt-6.1-sol` medium actor turn, 900,000 ms plus
the existing 2,000 ms force-kill grace; at most one `gpt-6-astra` medium text
judge, 600,000 ms, only after unpaid validation of the actual complete packet.
No continuation, retry, second baseline or candidate. The 1,500,000 legacy
token field only gates later turns and cannot cap this one turn. Invocation
counts and deadlines are not a hard token/dollar cap; tool iterations can
add inference requests. No dollar estimate is established.

Local [independent review](review.md), [final audit](final-audit.json) and
[verification record](verification.json) retain the evidence and limits.
Earlier studies, accepted prototype and negative probes remain unchanged.
