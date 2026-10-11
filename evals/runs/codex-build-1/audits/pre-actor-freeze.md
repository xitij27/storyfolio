# Independent pre-actor input audit

Read-only verification performed on 11 October 2026 after preparation from
commit `2f36b7e01ad2e075a3a4292bd9fa81af6916e603`. This note is outside the
immutable inputs. No model was called, no actor workspace or implementation
was changed, and no new capability probe was run by this audit.

**No blocker found in the frozen inputs or copied starting state.**

| Check | Result |
|---|---|
| Frozen input integrity using `verifyInputs()` | All 126 files and the exact file set match [the manifest](../inputs/manifest.json). |
| Recomputed current-source manifest using `inspectBuildInputs()` with the frozen capabilities | Digest matches: `f3c2d770753136495701ed7ba73952709116a825d2b70fdbec119aaf859d31ba`. This covers the fixture, skill, engine, dependency lock, prompts, rubric, protocol and listed implementations. |
| Current profile and current disabled-skill inventory through `buildCodexArgs()` | Exact argument array matches frozen `capabilities.json`, including TOML inline tables and `default_permissions="storyfolio-build"`. |
| Current disabled-skill inventory | Matches the frozen inventory. |
| CLI executable bytes | SHA-256 matches frozen `628e35487d888a28f0427fc37501da529dd3d81fcbad7a2c3421c1e8670d92e1`. |
| Git diff from preparation commit | No changes in the skill, fixture, runner, checker, judge, prompts, capability profile or protocol checked. The cohort itself was untracked evidence in progress. |
| Planning skill and references compared with `da3c202` | No changes. |
| Installed skill and fixture in `/tmp/storyfolio-evals/build-embedded-1-GoHJ5r` | All 100 checked files match their frozen bytes. |
| Scaffolded engine files in that workspace | All 79 files match the frozen engine bytes. |
| Pre-scaffold inventory | Initial workspace is empty, 14 fixture files are recorded, and no root `package.json` exists before scaffolding. |
| Actor turns at time of audit | No turn directories exist. |

The coordinator's already-completed
[capability probe](../embedded-1/baseline-1/setup/capability/probe.json)
reports success for local HTTP, an external request denied by a proxy 403,
production build, and wide browser capture in the actual actor workspace.
The [saved command](../embedded-1/baseline-1/setup/capability-command.json)
uses the frozen capability configuration and default permission selector.
The [process result](../embedded-1/baseline-1/setup/capability-process.json)
records exit 0 and zero model calls. Its Node version is `v22.22.1`, matching
the frozen runtime version.

The standalone sandbox's inability to ignore user configuration is recorded
in the command evidence; actor execution separately ignores it. This audit
does not upgrade the profile to a filesystem read barrier, establish full
installed-dependency tamper detection, or judge any actor behavior. The
runner's separate saved-probe gate remains responsible for deciding whether
paid execution is ready.
