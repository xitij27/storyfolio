# Candidate 2 stop 1 evidence review

The root-executed [common integrity audit](candidate-2-stop-1-integrity-command/stdout.log)
verified at `2026-10-12T15:12:46.557Z`: 149 frozen inputs, 199 turn artifacts,
94 initial source files and 97 saved/live files, with no excluded or
unexpected entries. The auditor is a mechanical derivative of the baseline
stop-1 audit, changing the cohort, actual outer directory
`candidate-2-turn-1` and terminal tool record only. Actor duration was
151729 ms; normal outer closure was at `15:10:07.333Z`, after 153444 ms.
Usage was 211422 input, 150656 cached-input and 3310 output tokens. These
are common integrity/lifecycle gates, not semantic approval to advance.

## Actor-owned external neutral check

The CLI stream records script creation at `item_11`, a failed initial
module import at `item_12`, correction at `item_14`, and successful execution
at `item_15`. The successful command reports the neutral page title and
heading, with overflow false. Root separately retained the final script and
PNG in [actor-owned checks](candidate-2-actor-owned-checks/manifest.json),
without changing the actor snapshot or its artifact manifest. These are
actor-owned checks, not independent site acceptance.

The CLI stream omits the image-view event, but the exact native session
transcript corroborates it. Only this actor's session was read:

`/home/kshitij/.codex/sessions/2026/10/12/rollout-2026-10-12T17-07-37-01a130a7-a4ce-7eb2-bc48-2015a0dab0be.jsonl`

Its session identity matches `01a130a7-a4ce-7eb2-bc48-2015a0dab0be`.
Observed source length is 243245 bytes, SHA-256
`d3b6ee9e6797666fc2890ed03806b0162528db6877510dd28030ec7341c1eccf`.
One-based raw lines provide the narrow evidence:

- Line 63, `15:09:45.707Z`: custom `exec` call
  `call_jcaBcymugNcSJNAPWwS8UyxK` begins with
  `image((await tools.view_image({path:"/tmp/storyfolio-neutral-check.png"})).image_url);`.
- Line 64, `15:09:45.722Z`: completed `ImageView`, ID
  `exec-b3584dcf-61a7-48d3-bc40-ce9086acf092`, for that exact file.
- Line 67, `15:09:45.987Z`: matching call output contains the PNG as an
  `input_image`, detail `high`.

The embedded PNG decodes to 9754 bytes, SHA-256
`76449ae132b88fff45fbcfcb8d3788647dcd51a10fdb315c76622d57e963f745`,
byte-identical to the external file and root's preserved PNG. This confirms
image delivery to the actor, not the correctness of every interpretation.
Root owns exclusive preservation of only these raw tool/image events; no
other session, private configuration or reasoning records are needed.

The three raw line hashes, including each trailing newline, are respectively
`82cb2c9afefa80f79a19fb5ddaf446e4f1f511cf3fecd2fe899334bc542d91a2`,
`5f2e08d4e1e0552b85eb5388413385b44abaa5439b3a297a99cf331058420cd2`,
and `1b5e8f5e77afe8b0f46dbc72a96588b8816b2ecb576c590a905b08d64d86585f`.

## Access limits

`item_9` enumerated ambient filenames under the shared temporary root,
including older workspace package paths; `item_13` listed a prior CLI stub
directory and the shared trusted dependency directory. The initial import
of the stub's missing `index.mjs` failed. The successful neutral script uses
the existing shared Playwright dependency. These observations do not
establish a held-out solution-content read, and do not establish a read
jail either. No runtime, browser, model, test or process-cleanup operation
was launched by this read-only review.
