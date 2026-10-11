# Lossless judge transport: local correction

11 October 2026. Starting revision `3e23cc9`. The author
[approved the size-blocker repair with local testing only](../../../docs/history/2026-10-11-judge-transport-approval.md).
No paid actor, judge, historical retry, behavioral skill change or push was
made. The reserved five-beat cohort remains unprepared.

## Outcome

The saved oversized completion packet can now be served byte for byte by
a bounded local evidence accessor. All 154 selected document bodies and
the original instructions, rubric, ordering, paths, whitespace and selection
notes survive. This fixes the direct-input delivery obstacle without
claiming that a live judge has consumed or successfully scored the packet.

| Retained input | Full bytes | Pages | Entry prompt bytes | Largest actual response |
|---|---:|---:|---:|---:|
| Spine, 55 documents | 841,035 | 26 | 1,419 | 39,166 bytes |
| Completion, 154 documents | 2,560,105 | 79 | 1,420 | 39,196 bytes |

The [real local-process calibration](capture-1/result.json) checks every
response and reconstructs each exact original SHA-256. Its receipts are
retained beside that result. These are a synthetic client talking to the
actual Node MCP server, not a Codex/model tool loop or new scores. Original
packets retain their original evidence-selection scope; they are not
silently upgraded with newer acceptance HTML or logs.

## Delivery and safety contract

Inline remains the default, with the original 2 MiB byte and 1,048,576
UTF-16 code-unit guards. An explicit `judgeTransport: "paged-v1"` must be
frozen in a new case before its actor. The pending `bench-depth-1` case and
evaluator-only protocol now select it. Its seven actor files, fixed prompt,
rubric, assets and expectations are unchanged; no baseline was frozen.

Paged delivery preserves the complete logical prompt within 8 MiB and 512
pages. Each page is a contiguous UTF-8-safe slice targeting 32 KiB, including
long single lines. A 1,024-byte envelope reserve keeps the entire JSON-RPC
response and newline below 64 KiB, including a maximally escaped legal
request ID. Original source hashes and selected text-body hashes are
distinct, especially for filtered `stream.jsonl` evidence.

The only additional capability is the required local `read_page` MCP tool.
It takes an exact page ID, no paths, ranges, URLs, commands or search terms.
It reads a verified immutable startup snapshot and never executes evidence.
Shell, browser, plugins and network remain disabled; the entire MCP table
is explicitly supplied. A 65,536-token per-tool and history limit provides
conservative response headroom. This is a configured bound, not a measured
tokenizer/context guarantee for an actual model.

Each successful response flush produces a hash-bound receipt. Every page
must have a valid receipt before the original judgement schema and citation
checks can accept a score. Missing delivery, changed bundle, bad excerpts,
corrupt evidence or an incomplete turn yields no score and no retry. A
receipt establishes that the server emitted the response, not that a model
retained, understood or faithfully used it.

The accessor has bounded file, request, response and read-count limits;
rejects symlinks, non-files, invalid UTF-8 and existing ledgers; and accepts
reserved MCP metadata without treating it as file access or tool arguments.
The same fresh judge process and ten-minute deadline remain. Its process
group includes the accessor; the timeout regression observes that actual
descendant terminated, with final state `gone`.

One fresh judge invocation is not one HTTP inference request. Tool
iterations may generate additional model requests and tokens inside that
turn. The runner's legacy `modelCalls` field counts judge invocations, not
those internal requests. No provider-side spending cap or claim that 8 MiB
fits the model context is made. Context exhaustion or deadline expiry
remains a preserved failure, not a reason to resume or reduce the evidence.

## Verification and review

- [Complete repository TAP](repository-tests.tap): 305 tests, 31 suites,
  all passing. This includes 14 pure paging tests, 17 real-process/server
  tests, the new integration gates and all earlier regressions.
- Skill check: 687 words, four references. People check: 17 cases. The
  fixture verifier preserves its seven actor files, four historical source
  hashes, two SVGs, five beat IDs and exact actor request.
- [CLI probe](cli-result.json): installed Codex 0.162.1 accepts the argument
  syntax; actual `mcp list` parsing replaces a deliberately injected earlier
  MCP table with exactly the intended server and interpreter/arguments.
  Neither command starts the accessor or a model. Session startup,
  client handshake and output-history retention remain unobserved.
- [Independent review](review.md) records the initial wire-envelope and
  repeated-verification issues, their corrections, metadata compatibility,
  configuration proof and final tests. An 8 MiB/256-page fake-client test
  passes; its software throughput is not an inference latency forecast.
- [Verification record](verification.json) binds current code, test logs,
  receipts and historical inputs, and records preservation checks.

An initial focused checkpoint passed 67 tests and is preserved in
[focused-initial.tap](focused-initial.tap). The later complete suite is the
final result. Sandbox subprocess restrictions produced `spawnSync codex
EPERM` for the CLI probe and terse file-level worker failures for specialist
tests; approved execution with the existing standard Node 22.22.1 resolved
those environment failures. One early specialist test-file syntax typo was
corrected before its passing runs. No dependency download was needed.
Retained TAP whitespace-only lines are normalized for Git whitespace checks.

## Sources, reproduction and remaining gate

The OpenAI Docs skill informed the choice of a documented STDIO MCP tool
and its output controls. The [plan's documentation basis](../../../docs/superpowers/plans/2026-10-11-judge-evidence-transport.md#documentation-basis)
links the fetched official pages. Documentation supports the configuration;
the local tests establish the narrower observed implementation behavior.

From the repository root, use the existing native-TypeScript Node on PATH:

```sh
PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH npm test
node evals/check-skill.mjs
node evals/check-people.mjs
node evals/builds/bench-depth-1/verify-fixture.mjs
node evals/runs/judge-transport-1/probe-cli.mjs
node evals/runs/judge-transport-1/calibrate.mjs capture-new
```

The calibration refuses an existing output name. Derived bundles stay in
this study's ignored `runtime/` directory; their exact source prompts,
generation code, hashes, receipts and observations are retained here or
in the unchanged linked original study. No historical source is overwritten.

Next complete the final common input freeze and actual actor-workspace
capability proof. Then obtain explicit approval for the proposed paid
envelope. The real future complete packet must pass its own dry validation;
these historical and synthetic packets do not predict its size, model
context behavior, cost or quality. Keep this transport fixed across any
matched skill comparison and preserve original old transport failures.
