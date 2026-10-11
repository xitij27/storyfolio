# Baseline judge preflight

12 October 2026. The read-only preflight passed once with exit 0, zero model
calls and no judge-directory write. The audit waited for the acceptance
agent's completed capture: process exit 0, all seven modes passed,
`sourceUnchanged: true`, and the exact 260-file actor/source-before/source-after
match. The independent capture finished at `2026-10-11T23:13:01.591Z`.

The [retained script](baseline-judge-preflight.mjs) records the
[exact invocation and environment](baseline-judge-preflight/command.json),
[complete stdout](baseline-judge-preflight/stdout.log),
[complete stderr](baseline-judge-preflight/stderr.log),
[process outcome](baseline-judge-preflight/process.json),
[packet audit](baseline-judge-preflight/packet-audit.json) and
[result](baseline-judge-preflight/result.json). It was run with:

```sh
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node evals/runs/stage-3-comparison-1/baseline-judge-preflight.mjs
```

Its only evaluator invocation was:

```sh
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node evals/codex-build-judge.mjs --run evals/runs/codex-bench-depth-baseline-2/bench-depth-2/baseline-1 --acceptance acceptance/manifest.json --dry
```

The script also assembled the same packet through the frozen preparation
helper to independently verify reconstruction and selection. Neither path
invokes a model. It refuses existing output, does not retry a failed dry
run, and makes no actor, checker, skill or frozen-input change.

## Verified identity and bounds

- Input digest:
  `40fea471970e15abbded1a2f4a51ca40917711e109aab189cc7fcf078257cf6a`.
- Acceptance manifest SHA-256:
  `c8076eca259639a450f2cd6c01645f8a1b048b2ebeeecc407eea003981ac0d94`.
- Complete source inventory digest:
  `0fb5e82558d01bda9cf828bb073087138333219b0019d64566747cc08d6ff025`.
- Logical prompt: 2,723,998 UTF-8 bytes, 2,720,969 code units, SHA-256
  `718cc4d8c1244a2aa87be771d4cb4e4ad7f1d34a0024b0e6e6e894e3885374d1`.
- `paged-v1`: 84 pages, below the frozen 512-page/8,388,608-byte limits.
  Maximum page body is 32,768 bytes. Largest serialized result is 41,929
  bytes, below 64,512; largest worst-case wire envelope is 42,733 bytes,
  below 65,536. Every contiguous byte range and hash verifies and reconstructs
  the exact unmodified logical prompt and rubric.
- Bootstrap: 1,420 bytes, SHA-256
  `b2472a2da67260a65c27fa091500ba393a6fff6d16d370574ced07fad521c855`.
  Serialized bundle SHA-256:
  `db15b34c14bb9110217e9ca8a2ce697d41748d5301299f76676ef0e1c27971e0`.
  Canonical bundle digest:
  `a71f0692d1ff88c7d2eb22a20c41e995bf75aa38e1e024448e15ab2e0191ad13`.

Current evaluator implementation still matches the complete frozen
implementation inventory, including source-scope and transport helpers.
The CLI binary also matches its frozen hash. The exact artifact sets and
hashes, stream-derived actor summaries, source manifests, checker identity
and criterion eligibility pass the frozen preflight.

## Selection is unchanged, not an all-pixels claim

The packet accounts for 916 original artifact records, 92 text documents
and 315 explicitly declared binary omissions. All nine fixture files,
all 101 actual changed-source files and all 282 independent acceptance
artifacts were individually checked against disk. Text bodies are complete;
binary records retain their sizes/hashes and the existing no-pixels reason.
The full acceptance manifest is attached, including all seven results.

The selected actor stream exactly retains the frozen tool/lifecycle/error
selection. Complete actor messages are supplied in `reply.md`; raw reasoning
is excluded by the frozen selection. Unchanged non-fixture engine/source
bodies remain hash-only. No further truncation, summarization, deduplication,
acceptance omission or bound relaxation was used. No actor-audit narrative
or coordinator visual review was inserted into the packet.

This establishes preparation, not delivered-page coverage, comprehension,
pixel-quality approval or a valid judgement. The fixed prototype-depth
eligibility and its natural-entry/early-gate limits remain unchanged. The
root coordinator retains the one paid judge allowance and owns its launch
and lifecycle. A later terminal audit must separately verify process
settlement, all 84 delivered pages, final-message JSON, evidence citations
and eligibility. Any paid result remains distinct from independent original
image review and author approval.
