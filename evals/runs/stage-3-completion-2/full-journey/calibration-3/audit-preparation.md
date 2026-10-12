# Prospective terminal integrity audit

Prepared while the sole calibration-3 capture is live. The
[audit helper](desktop-integrity.mjs) has not been executed or syntax-tested.
Root must first confirm actual terminal closure and finish the retained
original-image review. An interrupted attempt requires a separately
labelled partial audit; this completed-case helper must not be used to
reconstruct missing closure.

The prospective command is one read-only invocation, not an execution
record:

```sh
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node \
  evals/runs/stage-3-completion-2/full-journey/calibration-3/desktop-integrity.mjs \
  --terminal=desktop-tool-poll-N.json \
  --review=desktop-originals-review.json \
  --root-confirmed-closed --root-confirmed-review
```

Root supplies the actual terminal filename, not the placeholder. The review
must record `schemaVersion:1`, `allAvailableOriginalsReviewed:true`, actual
`captureComplete`, and `images` with repository-relative `path`, `sha256`,
`bytes`, and `viewMethod:"view_image original"` for every retained original.

The helper checks all 23 archived/current launch identities, preparation
references and exact launch binding; durable outer command, raw stream,
lifecycle and terminal-result hashes; actual inner live-log bytes and
normal lifecycle; unchanged 86-file source; raw build inventories and the
qualified cache comparison; every artifact hash; source-driven sample,
rest, travel and control coverage; exact original-review file equality;
and preservation of both old failed/partial calibrations. Image counts
come from the actual complete report and file set, not a fixed assertion
that there must be 102 images.

The raw mode pass/code is preserved, whether zero or nonzero. The unchanged
five-beat scope finding is separately required and reported, since the
worker does not incorporate that finding into its raw mode pass formula.
A normally closed capture can honestly report failures. Neither raw mode
success nor integrity success establishes full-site scope, visual quality,
author acceptance or Stage 3 completion.

The helper performs no process mutation or browser/model/test launch.
Root's pixel review and a separate scoped post-terminal ownership scan
remain required. Full returned tool output, including any failed audit
attempt, must be retained without overwriting earlier evidence.
