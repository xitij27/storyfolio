# Independent pre-actor input audit

Read-only verification on 11 October 2026 after preparation commit
`ce7a481e8ce99e8dfcf8dde07116a293faca12d8`. No model, dependency installation
or runtime probe was invoked by this audit. Only this note was written.

No blocker was found in the frozen inputs or copied starting source.
The coordinator's actual-workspace capability probe now passes. Screenshot
review and the final saved readiness gate were still pending when this
audit checked the probe. Preparation success alone does not establish a
finished site or justify bypassing the runner's separate readiness gate.

| Check | Result |
| --- | --- |
| Frozen file set and hashes | All 208 files verify against [the manifest](../inputs/manifest.json), digest `d0e14ef568c0d136796be8434b86ae65c884ced13102d8cb83950cef13a0f824`. |
| Recomputed current inputs | `inspectBuildInputs()` produces the same digest using the frozen capabilities. Fixture, skill, engine, locks, prompts, rubric, protocol and implementation match. |
| Committed implementation | HEAD is `ce7a481`; no tracked changes were found in the checked skill, runner, checker, judge, prompts, continuation fixture or protocol. |
| CLI executable | Bytes match frozen SHA-256 `628e35487d888a28f0427fc37501da529dd3d81fcbad7a2c3421c1e8670d92e1`. Local version reads confirm Codex CLI 0.162.1 and Node 22.22.1. |
| Actor arguments | `buildCodexArgs()` reproduces the frozen argument array exactly. The current profile and ten disabled-skill path entries match their frozen records. |
| Unchanged supplied skill | All 86 skill files, including engine and scaffold, match the first cohort's frozen skill bytes. Installed workspace copies also match. |
| Existing-site seed | All 97 files, totalling 503,374 bytes, match both the original actor's final snapshot and the copied actor workspace. No engine scaffolding was applied. |
| Provenance verifier | The independent local fixture verifier passes: 97 included files, 88 exclusions and unchanged seven-beat requirements. The expectation identity alone changes from `embedded-1` to `embedded-completion-1`. |
| Folder inventory | The initial temporary directory was empty. Preparation explicitly records an existing-site fixture and skipped scaffolding. |
| Conversation scope | Requested stops are `[5, 6]`, with explicit refusal prompts `[1, 2]`. The first prompt selects Bench paper and supplies its own authorization to continue beyond the unchanged planning-only skill. |
| Frozen actor bounds | At most two turns, fifteen minutes per turn and twenty-five cumulative minutes. Between turns: twelve million total input-plus-output tokens or 350,000 uncached-input-plus-output tokens stops advancement. Missing reliable cached accounting also blocks advancement. |
| Judge bounds | At most one fresh Astra medium judgment, ten minutes and a two-MiB evidence prompt. Sol medium is the frozen actor. |
| Actor execution at audit | No turn directories exist. |

The frozen permission profile allows loopback networking through the proxy
and writable actor and temporary directories. User configuration and rules
are ignored for actor execution; plugins, apps, remote search and discovered
global skills are disabled. The supplied engine's project instructions are
deliberately available. Shell-based browser inspection is permitted while
the separate browser-use tool feature is disabled.

These configuration checks are not a filesystem read barrier or proof of
complete installed-dependency isolation. Actual reads still need auditing.
The seed includes inherited actor-authored checks and reports, which are
input evidence, not independent current acceptance. Token thresholds are
between-turn checks, not a hard limit on an in-flight turn or a dollar cap.

The coordinator's fresh [probe report](../embedded-completion-1/baseline-1/setup/capability/probe.json)
records local HTTP success, an external request denied with proxy 403,
a production build in 6.788 seconds and light-wide browser capture in
29.274 seconds. Its [process result](../embedded-completion-1/baseline-1/setup/capability-process.json)
records exit 0 and zero model calls. The [saved command](../embedded-completion-1/baseline-1/setup/capability-command.json)
uses exactly the frozen actor configuration entries and the actual workspace
`/tmp/storyfolio-evals/build-embedded-completion-1-HA9i68`. This establishes
the tested capabilities, not full-site acceptance or physical-phone proof.
This auditor did not inspect its nine screenshots. The separate screenshot
review and readiness record remain the coordinator's final gate.

The standalone sandbox probe cannot ignore user configuration, a recorded
limit; actor execution separately does so. A version-only subprocess wrapper
also reported an outer-sandbox `EPERM`; direct outside-sandbox version reads
then completed successfully without model or network calls. No capability
from the first cohort was assumed to pass for this new workspace.
