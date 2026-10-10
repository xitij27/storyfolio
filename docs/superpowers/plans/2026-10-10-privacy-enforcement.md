# Private-file enforcement experiment

On 10 October 2026 the author accepted the recommendations and asked to
implement them. This is the separate integration investigation requested
after `evals/runs/codex-privacy-1/` demonstrated two actual private reads.

## Question

Can an explicit Codex permission profile keep the unchanged private PhD
fixture present but unreadable to shell commands while public material stays
usable? This does not add another instruction to the skill and does not
change the original benchmark, runner or rubric.

## Procedure

1. Inspect the installed CLI and existing runner. Check the current official
   permission documentation because a prompt is not an access boundary.
2. Build a separate opt-in, no-model experiment using `codex sandbox` and a
   profile supplied on its command line. Keep all source, copied fixtures,
   commands and results inside this repository. Do not change user or system
   configuration.
3. Copy the complete fictional PhD material, preserving the private export.
   Record hashes before and after. Add public and private symlink probes.
4. Record public-read and inventory controls, direct `head` and batched
   `cat` attempts resembling the observed failures, broad reads, symlink
   reads, absolute private paths and access to the original fixture outside
   the experiment workspace. A blocked startup is not a successful denial.
5. Preserve errors. Use the normal outer approval mechanism if nested
   sandbox restrictions prevent testing. No workaround may weaken the
   parent environment silently.
6. Report the precise coverage and remaining integration work. No paid
   conversation is needed to test a filesystem denial. A later model test
   needs an explicit question and its own labelled comparison.

## Initial inspection

The existing `evals/lib/codex.mjs` uses `workspace-write` with approvals set
to `never`; it sets no private-file read restrictions. Installed CLI version:
`codex-cli 0.162.1`. `codex sandbox --help` supports `-P` for a named profile,
configuration overrides and a command without a model call.

Official documentation supports exact `deny` paths within a readable
workspace and separate minimal runtime grants. These profiles are distinct
from legacy `sandbox_mode`; the two configuration styles must not be mixed.
Sources reviewed with the OpenAI Docs skill:
[permission profiles](https://learn.chatgpt.com/docs/permissions),
[configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
and [sandboxing](https://learn.chatgpt.com/docs/sandboxing).

Two initial `/bin/true` checks are evidence of setup limits, not file-denial
passes. Inside the parent sandbox, startup failed because the app-server
socket directory was not accepted as a user-owned directory with mode 0700.
The approved retry reached bubblewrap but could not start the installed
Codex binary because the minimal runtime grant did not include its path.
The experiment must explicitly grant read access to that runtime directory.

## Outcome

Implemented the opt-in experiment at
`evals/experiments/privacy-enforcement/run.mjs`. Results are in
`evals/runs/codex-privacy-enforcement-1/`, with an offline verifier and a
complete [finding record](../../../evals/runs/codex-privacy-enforcement-1/findings.md).
The exact-path denial candidate failed a pre-existing hardlink check; its
failure is preserved. The public-file allowlist passed all twelve probes.
The complete private fixture remains present and unchanged, and original
repository paths are excluded from the readable mounts. No model was
called, no old score changed, and the ordinary harness is untouched.

This is a tested local shell boundary prototype. The future runner must
apply it to all shell tools, trust only selected immutable public inputs,
provide separate output and skill access, disable alternative reading
surfaces and run the probes before paid conversations. The skill's privacy
issue remains open until such integration is implemented and evaluated.

Independent read-only review checked the script, all four result files, the
verifier and findings. It confirmed the hardlink exposure, successful
public/startup controls, EACCES and ENOENT denial evidence, unchanged private
hashes and the documented limits. No blocker was found within this prototype
scope. Local verification passed: offline artifact verification, Node syntax,
whitespace and no-em-dash checks. The review launched no model or probe.
