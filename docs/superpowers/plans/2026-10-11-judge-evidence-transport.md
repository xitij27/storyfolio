# Lossless judge-evidence transport

11 October 2026. Authorized by the
[local-only correction approval](../../history/2026-10-11-judge-transport-approval.md).
Starting revision: `3e23cc9`. This is evaluator infrastructure, not an
instruction change or a paid evaluation protocol approval.

## Problem and chosen contract

The retained completion prompt is 2,560,105 UTF-8 bytes and 2,556,184 UTF-16
code units. It exceeds the existing 2 MiB allowance and the observed
1,048,576-character input ceiling. The runner already sends stdin, so a
different pipe does not establish a remedy. Minification is insufficient;
summaries or selected excerpts would discard evidence.

Keep inline delivery and both original bounds as the default. Add an
explicit `judgeTransport: "paged-v1"` case setting, frozen before the actor
for new cohorts. The pending five-beat diagnostic may select it before its
eventual freeze, without changing actor input, prompt or rubric. Historical
cohorts and exhausted attempts are not changed or reopened.

For paged delivery, preserve the exact complete logical prompt: original
template, rubric and selected packet text, with the same source paths and
selection notes. Split it into deterministic UTF-8-safe contiguous pages,
not summaries. Preserve original artifact and selected-text hashes
separately. Cap the full prompt at 8 MiB and 512 pages; target 32 KiB page
text and cap each serialized MCP result at 64 KiB. A small bootstrap passes
the existing inline bounds and tells the judge to read every numbered page.

The only new judge capability is a local STDIO MCP accessor accepting an
exact page ID. It accepts no paths, commands, URLs or searches and executes
no evidence. Keep shell, network, browser, plugins and inherited configuration
disabled. Configure the accessor as required and allowlist only `read_page`,
with an explicit 65,536-token output budget. Hash every response and record
delivery only after a successful server stdout flush. Reject any score with
missing, corrupt or foreign receipts, then apply the original citation and
judgement validation. A served page is not proof of model comprehension,
history retention, visual inspection or successful large-packet scoring.

One fresh judge process, the ten-minute deadline, forced termination,
immutable attempts, source binding and no retry remain unchanged. Tool
iterations within that one turn may consume additional inference requests
and tokens. Neither the page bound nor deadline is a provider spending cap
or a guarantee that the largest bundle fits model context or finishes.

## Local work and verification

1. Preserve the authorization and prior handover; independently review the
   transport design and isolate implementation-file ownership.
2. Implement pure lossless paging, strict bundle validation, a bounded MCP
   server, frozen case selection and judge delivery/citation gates.
3. Run unit and actual local-process protocol checks for Unicode, long
   lines, escaping, exact reconstruction, body/source hash differences,
   malformed requests, tampering, missing pages, no overwrite and shutdown.
4. Calibrate against the two full retained historical prompts, preserving
   every byte and old tree. Record hashes and bounded actual responses in a
   new study. This is transport testing, not rejudging either old run.
5. Verify argument isolation, forced termination, repository tests, fixture
   integrity and skill checks. Record actual CLI support separately from
   mocked invocation and never start a model to prove this local change.
6. Update navigation, current handover and runbook, then commit on main
   without pushing. Final input freeze, actor-workspace proof and explicit
   paid-run approval remain separate follow-up gates.

## Documentation basis

The OpenAI Docs skill prompted checking current official documentation.
[Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
documents stdin as prompt input; it does not promise removal of the observed
input ceiling. [MCP configuration](https://learn.chatgpt.com/docs/extend/mcp?surface=cli)
documents local STDIO commands, required startup, tool allowlists and
per-tool output limits. The [configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
documents the history output-token setting. These support configuration,
not proof of model uptake, context capacity or this frozen CLI's end-to-end
behavior. The study must state which parts were actually tested locally.

## Outcome

Implementation and local verification are complete. The
[engineering study](../../../evals/runs/judge-transport-1/findings.md)
records byte-exact delivery of both historical prompts, 305 passing tests,
actual local CLI configuration parsing and independent review. No paid
actor/judge, historical retry, final cohort preparation or push was made.
Live model/client behavior remains unobserved. Final common input freeze,
actor-workspace proof and explicit paid-run approval are separate next gates.
