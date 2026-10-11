# Independent transport review

11 October 2026. Read-only code and design review of the new transport
against the repository at `3e23cc9` and the pending changes. No model was
invoked, no old study was changed, and no paid retry was requested. This
file is the only reviewer-authored artifact.

## Design assessment

An explicit `judgeTransport: "paged-v1"` in the frozen case is a suitable
narrow correction. Inline remains the default. The new path must not
silently replace an already frozen protocol or revive a spent attempt.

Paging the exact complete logical prompt is simpler to audit than selecting
or summarizing evidence again. The original template, rubric, packet
metadata, document bodies, failed commands and chronology can all be
reconstructed byte for byte. Original source hashes and selected-text
hashes are different fields, which matters for filtered actor JSONL.
Binary pixels remain absent, as they were before this transport change.

The implementation retains one fresh Astra judging turn, medium reasoning,
the ten-minute deadline, the existing citation validator, atomic refusal
of an existing judge directory and no automatic retry. The accessor is
closed-world: only deterministic page IDs are accepted, not arbitrary
paths, commands or ranges. Shell, browser, network and actor-workspace
access are not needed to read the supplied packet.

The eight-MiB logical-prompt and 512-page limits make the new envelope
explicit. They do not establish model context capacity, completion within
ten minutes, comprehension or scoring quality. Coverage receipts prove
that the accessor emitted the labelled page responses, not that the model
retained, read or understood them. Incomplete coverage must fail closed,
including a final-response/receipt-write race during shutdown.

## Findings sent during implementation

1. The original page bound counted only `JSON.stringify(result)`, whereas
   the server sends a JSON-RPC envelope and newline. A legal 128-character
   request ID made a 65,534-byte result become a 65,698-byte wire response,
   above the declared 65,536-byte cap. Reserve envelope/ID headroom and
   test the actual serialized wire response.
2. `pageResponse` initially reverified and reconstructed the whole bundle
   on every read, despite startup verification. A local eight-MiB ASCII
   packet with 256 pages took 36,530 milliseconds to generate all
   responses. Caching verified responses at startup avoids this repeated
   cost while preserving validation of the frozen bundle.
3. The MCP protocol permits reserved request metadata such as `_meta`.
   Rejecting every parameter beyond `name` and `arguments` could reject a
   real client's progress metadata. Permit protocol metadata separately
   while keeping `read_page.arguments` strictly limited to `page_id`.
4. A blank working directory is nested under the repository, so do not
   infer absence of ancestor/project MCP configuration from that alone.
   The new `mcp_servers` override and `--ignore-user-config` need a local
   configuration check demonstrating the resulting server set. If actual
   client negotiation remains untested, state that limitation explicitly.

These are implementation review findings, not security vulnerability
findings or a review of skill behavior.

All four were addressed in the reviewed patch:

- The page result reserves 1,024 bytes for the RPC envelope and a maximally
  escaped legal request ID. The server also checks the entire wire line.
- `createPageReader` validates once, privately caches serialized responses
  and returns fresh objects. The server uses this reader.
- Reserved `_meta` parameter objects are inert. Tool arguments still
  accept only `page_id`.
- The [configuration probe](probe-cli.mjs) checks the installed CLI's
  parsed configuration, including replacement of an earlier fake server
  table with exactly `storyfolio_evidence`. This is configuration evidence,
  not a model session or proof of client handshake/history retention.

## Local probe

The following non-mutating command used the locally available native
TypeScript Node binary. It generated synthetic strings in memory and
printed measurements only:

```sh
/tmp/storyfolio-node-check-20261011/node_modules/.bin/node --input-type=module -e 'import { createPagedEvidence, pageResponse, MAX_PAGE_RESPONSE_BYTES } from "./evals/lib/judge-transport.mjs"; const bundle = createPagedEvidence("\u0000".repeat(40000)); const lengths = bundle.pages.map(p => { const result = pageResponse(bundle,p.id); return { id:p.id, resultBytes:Buffer.byteLength(JSON.stringify(result)), wireBytes:Buffer.byteLength(JSON.stringify({jsonrpc:"2.0",id:"x".repeat(128),result})+"\n") }; }); console.log(JSON.stringify({cap:MAX_PAGE_RESPONSE_BYTES,lengths})); const big = createPagedEvidence("x".repeat(8*1024*1024)); const started=performance.now(); for (const p of big.pages) pageResponse(big,p.id); console.log(JSON.stringify({pages:big.pages.length,allResponsesMs:performance.now()-started}));'
```

Original output:

```json
{"cap":65536,"lengths":[{"id":"page-0001","resultBytes":65534,"wireBytes":65698},{"id":"page-0002","resultBytes":65532,"wireBytes":65696},{"id":"page-0003","resultBytes":65532,"wireBytes":65696},{"id":"page-0004","resultBytes":44718,"wireBytes":44882}]}
{"pages":256,"allResponsesMs":36530.287417}
```

After the corrections, this separate non-mutating probe checks maximally
escaped request IDs and the cached production path:

```sh
/tmp/storyfolio-node-check-20261011/node_modules/.bin/node --input-type=module -e 'import { createPagedEvidence, createPageReader, MAX_PAGE_RESPONSE_BYTES } from "./evals/lib/judge-transport.mjs"; const bundle=createPagedEvidence("\u0000".repeat(40000)); const reader=createPageReader(bundle); const lengths=bundle.pages.map(p=>({id:p.id,wireBytes:Buffer.byteLength(JSON.stringify({jsonrpc:"2.0",id:"\u0000".repeat(128),result:reader.get(p.id)})+"\n")})); console.log(JSON.stringify({cap:MAX_PAGE_RESPONSE_BYTES,lengths})); const big=createPagedEvidence("x".repeat(8*1024*1024)); const started=performance.now(); const cached=createPageReader(big); for(const p of big.pages) cached.get(p.id); console.log(JSON.stringify({pages:big.pages.length,verifyAndAllCachedResponsesMs:performance.now()-started}));'
```

Output:

```json
{"cap":65536,"lengths":[{"id":"page-0001","wireBytes":65312},{"id":"page-0002","wireBytes":65316},{"id":"page-0003","wireBytes":65316},{"id":"page-0004","wireBytes":48588}]}
{"pages":256,"verifyAndAllCachedResponsesMs":211.09339500000002}
```

These timings measure local synthetic transport processing only. They do
not forecast a model's tool-call latency or ability to complete judging.

## Required verification contract

- Exact reconstruction of complete historical packets, including the
  oversized completion packet, without writing into their old studies.
- Exact UTF-8 byte and escaped-response bounds, astral and combining
  characters, lone-surrogate refusal, empty content, duplicate body paths,
  long single lines, whitespace and line-ending preservation.
- Missing, changed, reordered or noncanonical bundle-page refusal; original
  and selected text hashes remain distinct.
- Full, duplicate and out-of-order page receipts, plus missing, partial,
  forged or corrupt receipt refusal. Duplicate reads cannot replace an
  unread page.
- Strict tool arguments, no arbitrary-path access, no inherited server
  access, and correct MCP initialization and reserved-metadata handling.
- Valid output JSON cannot bypass incomplete delivery or false citations.
- Pre-invocation evidence/implementation/transport drift refusal, no
  second attempt after failure, and forced deadline termination of the
  judge and an accessor-like descendant.

## Final review status

No blocking issue found in the revised transport, server or integration
code. The final [repository test log](repository-tests.tap) records 305
passing tests across 31 suites, with no failures, skips or cancellations.
Its SHA-256 at review was
`db2d0088f34f53534194bf95bc9a9800841f6e766d96b5e1ebbbe8f7ccbe1c48`.

The real-accessor descendant regression passed. A local stand-in judge
started the actual evidence server and completed initialization before
the forced deadline. Process-group termination stopped the accessor;
the saved diagnostic reports its final state as `gone`. This tests the
local lifecycle, not a Codex model session.

The [retained calibration](capture-1/result.json) uses the real local MCP
server with a synthetic client. Both old prompt files reconstruct byte
for byte: 26 pages for the spine and 79 for the completion. The previously
oversized completion prompt remains 2,560,105 bytes, while its bootstrap
is 1,420 bytes and largest actual wire response is 39,196 bytes. Complete
coverage is recorded for both, without changing their historical evidence
selection or retrying either judge.

An independent read-only SHA-256 check confirmed that all five source
hashes in that calibration match the current implementation and calibration
script. Both original prompt hashes and both saved delivery-ledger hashes
also match. The installed CLI executable still matches the hash in
[the configuration result](cli-result.json), which records Codex 0.162.1,
one enabled accessor server, and replacement of the earlier fake server
table. These checks returned exit code zero.

The remaining limits are explicit: no actual model/client tool loop was
run, so history retention, comprehension, model token cost and ten-minute
completion feasibility are unproven. The future actor's complete packet
still needs its own frozen-input and transport preflight. Local serving
of an old packet is not a behavioral score, visual assessment or permission
to spend another model attempt. The no-retry rule and separate paid-run
authorization remain in force.
