# First fresh environment proof: preserved setup failure

This is a failed no-model setup proof, not an actor failure, browser result or
readiness pass. Keep `codex-full-journey-baseline-1` immutable. Any corrected
proof belongs to a separately frozen fresh cohort after prospective review,
tests and commit. No rerun, cleanup, frozen-helper edit or model call was made
by this audit.

## Closure and process observation

The [outer terminal tool record](../baseline-environment-tool-poll-1.json)
reports exit 1. The [durable recorder](../baseline-environment-command/result.json)
started at 06:01:17.486Z and closed at 06:01:18.695Z on 12 October 2026,
duration 1,209 ms. Recorder PID 323103 observed child PID 323114 exit and
close normally with code 1. No external signal, forwarding, force or child
error is recorded. Its `complete:false` means child-exited-unsuccessfully,
not lost closure.

The frozen proof wrapper records CLI PID 323163 closing normally with code 1
at 06:01:18.504Z, duration 240 ms, no timeout, external signal, spawn error
or log error. This differs from the earlier unexplained interruptions.

[Process observation](process-audit-result.json) at
06:06:47.773Z to 06:06:48.005Z found all three known PIDs absent. Across 76
same-UID process records and 2,025 readable fd links there were no observed
descendant, cwd or fd ties to the exact actor workspace, neutral runtime
directory or proof outputs. Inaccessible metadata for PIDs 372 and 374 is
retained. Detached/reparented processes without readable scoped ties are
outside this limited observation. No broad repository-process absence is
claimed, and no signal was sent.

## Exact failed boundary

The retained stderr points to frozen `probe-environment.mjs:99:79`: strict
PATH equality failed. The actual PATH is exactly these two entries followed
by the entire unchanged frozen PATH:

- `/home/kshitij/.codex/tmp/arg0/codex-arg0c9kfLQ`
- `/home/kshitij/.codex/packages/standalone/releases/0.162.1-x86_64-unknown-linux-musl/codex-path`

Frozen source ordering places this assertion before report creation,
git/npm version subprocesses, the neutral HTTP server and browser. The
output directory had been created but is empty both in the retained runtime
and copied cohort evidence. No neutral original exists to inspect. The
warning about experimental EnvHttpProxyAgent is retained separately and
does not explain away the explicit assertion failure.

The post-closure filesystem provenance is retained in the
[integrity result](integrity-audit-result.json). Both prefix directories are
real, owned by UID/GID 1000 and mode 755. The arg0 directory contains only a
zero-byte regular `.lock` and four owned symlinks: `apply_patch`, `applypatch`,
`codex-execve-wrapper`, and `codex-linux-sandbox`, each targeting the exact
frozen CLI executable. The release PATH directory contains only regular
executable `rg`, 5,408,904 bytes, SHA-256
`e62198eb19b136b88c330af83647b5a962cb99b6b1f066758568f12de1974849`.
Release metadata declares layout 1, version 0.162.1, target
`x86_64-unknown-linux-musl`, variant `codex`, and `pathDir:codex-path`.
The actual CLI SHA-256 matches frozen capabilities. Ancestor types,
ownership and modes are recorded. This identifies the observed installed
layout; it is not cryptographic release authenticity or a filesystem read
jail. No credential/configuration contents were read.

The prospective correction should verify the unchanged suffix and only
these narrowly validated launcher prefixes. It must not accept arbitrary
prepends, extra executable entries, redirected aliases or a changed CLI.
The original strict failure remains the historical result.

## Integrity and absent readiness

The [read-only integrity command and full returned tool output](integrity-audit-tool-1.json)
closed 0 at 06:09:07.082Z. Its verification result is about preservation,
not success of the failed proof:

- All 149 frozen input hashes and their manifest digest verify:
  `8fbd93c6432e5a8972401959c1a326a8417eca77f47690bbde4bf5244f08a7ad`.
- Exactly 94 source files, seven fixture files and 87 installed skill files,
  match frozen inputs, saved initial snapshot, before/after records and live
  workspace bytes. No application root or invented approval history was
  seeded. Initial `setup/result.json complete:true` describes unscaffolded
  material preparation only, not environment proof.
- The complete 257-file cohort inventory and five outer recorder files are
  hashed in the result. All declared outer raw-artifact hashes and terminal
  tool/result bindings verify.
- No `setup/probe.json`, `readiness-dry`, original-image list or visual
  review exists. Run-root entries are only `meta.json` and `setup`; there is
  no actor turn or actor result. Model calls are zero and no browser started.

The source files for both audit commands, their exact commands, full returned
tool outputs and results are retained here. Their execution only read files
and process metadata. An initial exploratory display exceeded its output
budget; the retained verifier subsequently checked every input and source
byte, so that display is not relied on as complete evidence.

OpenAI Docs was consulted for the CLI-specific troubleshooting scope. The
[official security page](https://learn.chatgpt.com/docs/security) does not
establish this exact release's prefix bytes. The concrete failure attribution
and proposed narrow validation above therefore rest on the frozen stderr,
source ordering and installed local release evidence, not a generalized
documentation claim. No helper or run behavior was changed by this audit.
