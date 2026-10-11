# Judge packet size diagnosis

11 October 2026. Read-only analysis of the exact saved judge prompt, frozen
assembly code and failed process artifacts. No evidence, runtime, source,
frozen file or bound was changed. No model call or retry was made for this
audit. The one approved judgement attempt has been used; this document is
a proposal for future study tooling, not authorization to run it again.

## Two distinct limits

The exact [saved prompt](../judge/prompt.md) is 2,560,105 UTF-8 bytes and
2,556,184 characters. Its SHA-256 is
`fda25f8c89713adccd38fd8dcc885908f5369fc0485ff76b1bdbbb8000ec0ae8`.
Both the local string count and the service error agree on the character
count for this packet.

The original local bound was 2 MiB, or 2,097,152 bytes. Unpaid preparation
correctly stopped when the packet exceeded that bound by 462,953 bytes.
The separate [author-approved size adjustment](../../../audits/judge-size-proposal/approval.json)
raised only the local allowance to 3 MiB, or 3,145,728 bytes. It did not
raise the CLI/service limit.

The actual [stderr](../judge/stderr.log) reports `turn/start` rejecting
`actual_chars: 2556184` against `max_chars: 1048576`, with
`input_error_code: input_too_large`. The packet exceeds that character
limit by 1,507,608. The [stream](../judge/stream.jsonl) contains a thread
start, but no judge answer. The [process](../judge/process.json) exited 1
after 4,361 ms; the [result](../judge/result.json) is incomplete, with one
attempt recorded and null usage, charge and scores. There is no basis to
infer a dollar charge, zero cost or a completed behavioural judgement.

The original 2-MiB guard was itself insufficient to guarantee CLI delivery:
an ASCII prompt between 1,048,577 and 2,097,152 characters could pass the
byte check and still fail the observed character limit. Raising it to
3 MiB exposed this second boundary rather than solving it.

## What occupies the packet

The frozen [assembler](../../../inputs/implementation/evals/codex-build-judge.mjs)
includes all starting fixture text, selected raw tool/lifecycle events,
changed source bodies, five source manifests and independent acceptance
reports. The frozen [renderer](../../../inputs/implementation/evals/lib/build-score.mjs)
pretty-prints this packet as JSON, storing each document body as an escaped
string. The saved prompt round-trips exactly through that construction.

| Document category | Documents | Raw body characters | Serialized document characters |
|---|---:|---:|---:|
| Independent acceptance manifest and six reports | 7 | 777,940 | 863,995 |
| All starting fixture files | 97 | 503,331 | 551,534 |
| Selected actor tool/lifecycle streams | 2 | 492,396 | 517,743 |
| Setup and before/after snapshot manifests | 5 | 327,645 | 363,710 |
| Changed after-turn source bodies | 27 | 161,127 | 171,869 |
| Other documents, including prompts, replies and process records | 16 | 42,974 | 48,328 |
| Total | 154 | 2,305,413 | 2,517,179 |

The final column serializes each document object independently with the
same JSON indentation. Array indentation, packet metadata, separators and
the 13,871-character instruction/rubric prefix account for the remaining
39,005 characters in the full prompt. Raw body counts exclude JSON escaping.

Notable contributors and repetition:

- The initial `package-lock.json` body is 233,717 characters, serialized as
  a 256,634-character document. It is included because it is starting site
  source, even though dependency entries dominate it.
- Turn 1 and turn 2 tool bodies are 291,619 and 200,777 characters.
  There are 47 started versus 46 completed command events in turn 1, and
  31 started versus 30 completed events in turn 2. A future normalization
  must retain the unmatched started attempts, not keep only completed work.
- Repeated command strings account for 67,484 raw characters across those
  streams, principally the same command attached to start and completion.
  Repeated aggregate output bodies account for only 2,121 raw characters.
  The outputs are not mostly disposable duplication.
- Each acceptance report contains 22 samples. Sample objects dominate the
  reports through repeated visible text, links, headings and state fields.
  In particular the no-WebGL, reduced-motion and context-loss reports each
  have the same 70,275-character minified `samples` value, even though their
  mode/setup metadata differs. Preserve that distinction if values are
  represented once and referenced by multiple reports.
- Five exact whole-document duplicate bodies total 43,265 repeated raw
  characters. They are inherited/archived check results, handovers and
  reviews. All paths and their chronology still matter even where bytes
  match. There are 149 unique bodies among 154 documents.

## Small formatting changes cannot deliver this packet

Removing only outer JSON indentation leaves 2,543,731 characters, still
1,495,155 above the observed limit. Exact whole-document deduplication alone
is likewise insufficient. Even fixture, tool and changed-source bodies
alone total 1,156,854 raw characters before instructions, escaping or any
automatic evidence. A claim that a minor format change makes the full
packet fit would need a measured, reconstructable result.

Do not remove lockfiles, failed commands, source bodies or acceptance
observations silently to fit. Do not split the evidence into independently
scored judgements or additional user turns under the existing one-attempt
allowance. Compressed opaque bytes are not readable evidence for a judge
that has no decoding or file-reading tool.

## Smallest reliable future correction

First add a transport-character guard as well as the existing byte guard
before reserving an attempt or launching a CLI process. Test the exact
character boundary, multibyte text and both sides of each limit without a
model call. Record the local allowance and tested transport limit as
separate values. The no-retry rule still applies after launch.

For packets above the character boundary, the smallest reliable change
that preserves this evidence is to change delivery, not the evidence set:
use a short instruction/rubric/index prompt plus a narrowly scoped,
read-only, paged evidence accessor over the frozen documents. This would
be a new explicitly designed capability; the current judge has no such
accessor and cannot read omitted content merely because a path is named.

The accessor should expose only the fixed allowlist, bind each body to its
original path/hash, and use deterministic bounded text pages, for example
64 Ki characters. Page metadata must record sequence and offsets; complete
read coverage must be checked before scores are accepted. Repeated exact
bodies can be served once with all path aliases retained. Raw streams and
source stay intact; started attempts, failures and chronology remain
available. Page reconstruction must match every original body and hash.
The judge still needs one fresh conversation, the declared deadline and
unchanged scoring evidence. Shell, network and actor-workspace access need
not be enabled by an evidence-specific accessor.

This delivery proposal needs no-model transport, coverage, reconstruction
and citation tests before any future paid study. It also needs its own
explicit protocol because it changes the present no-file-reading judge
interface. It is not implemented or validated here, and the current failed
attempt remains the result. No new paid approval is requested by this audit.
