# Completion judge evidence allowance

The bounded completion protocol originally allowed one Astra judgement,
with a ten-minute deadline and a two-MiB evidence prompt. Both actor turns
completed and independent acceptance passed before this adjustment.

Judge preparation stopped before a model call because the complete packet
was 2,560,105 bytes, larger than 2,097,152 bytes. Nothing was truncated and
no frozen input, rubric or implementation was changed. Repeating the same
unpaid preparation preserved the exact error. The coordinator prepared the
complete packet as a reviewable proposal with a three-MiB allowance.

The exact question was:

> The finished build’s complete judge packet is 2,560,105 bytes, above the 2 MiB limit in your approved completion protocol. I’ve prepared the exact packet without truncation. May I raise only that limit to 3 MiB for the one unused Astra judgement, keeping the 10-minute deadline and no further build turns?

The author selected:

> Approve one judge at 3 MiB (Recommended)

This authorizes only the previously unused judgement with a 3,145,728-byte
maximum. Its model, reasoning effort, evidence, rubric and ten-minute
deadline remain unchanged. No additional actor turn, retry or broader study
is authorized. The original frozen protocol and failed preparation remain
intact; this is a separate, explicit exposure adjustment.

The [proposal and exact packet](../../evals/runs/codex-build-completion-1/audits/judge-size-proposal/proposal.json),
[approval](../../evals/runs/codex-build-completion-1/audits/judge-size-proposal/approval.json)
and [preparation error](../../evals/runs/codex-build-completion-1/audits/judge-dry-error.log)
are retained. The prompt SHA-256 is
`fda25f8c89713adccd38fd8dcc885908f5369fc0485ff76b1bdbbb8000ec0ae8`.
The [study findings](../../evals/runs/codex-build-completion-1/findings.md)
record the eventual result and actual usage.
