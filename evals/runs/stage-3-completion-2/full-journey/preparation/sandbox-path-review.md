# Independent sandbox PATH correction review

12 October 2026. Source-only review of the four helper/test changes,
README and [failure rationale](environment-path-correction.md), against the
original strict helpers, their callers and the preserved baseline-1 stderr.
No tests, syntax checks, sandbox/proof invocation, browser, build, model,
signal or cleanup were executed by this reviewer.

Disposition: no concrete source-level blocker found. This is not a passing
environment proof. Root must run the declared local checks, commit and freeze
new baseline-2 inputs, then perform its separately authorized single proof.

The changed contract is narrow:

- Exactly two new PATH components are required in the observed order. The
  entire outer suffix, including its existing duplicate entries, remains
  exact. All five selected non-PATH values remain exact. No PATH is rewritten.
- The release is derived from the frozen canonical CLI path and constrained
  to its pinned version/layout. Actual metadata, CLI and packaged `rg` bytes,
  canonical directories and complete directory inventories are checked.
  The arg0 directory must contain only the empty lock and four exact aliases
  to that CLI. Unrelated tools or altered aliases cannot be admitted merely
  by a plausible directory name.
- The report exists before environment validation and retains selected
  actual sandbox values even on failure. Successful finalization replays
  the saved environment/launcher contract and compares expected outer values
  with the recorded command. Existing runtime/copy equality and evidence
  hashes bind that report; final attestation separates outer and sandbox
  evidence.
- Baseline 2 is explicitly allowlisted. Existing initial-source, immutable
  input, one-shot output, deadline and image-review gates remain. The new
  current helper identity cannot validate the old frozen attempt in place.
  The original failure is not converted into readiness or an actor failure.

The new six pure test groups cover valid layout, missing/arbitrary/reordered
prefixes, exact suffix and non-PATH values, canonical/package identities,
entry/alias shadowing and altered final provenance. The original six proof
contracts remain. Source review does not substitute for root executing them.

Read-only inspection independently confirmed that the failed attempt's
`codex-arg0c9kfLQ` directory has the empty `.lock` and four symlinks to the
frozen standalone CLI, not the older VS Code launcher still present in the
unchanged outer PATH. Installed package metadata and `rg` hashes match the
constants recorded in the rationale. This review did not independently rerun
the complete historical-artifact audit; its separately saved result remains
the preservation evidence. No general claim about other CLI versions or
future directory stability is made.

Reviewed source identities:

| File in this directory | SHA-256 |
|---|---|
| `probe-environment.mjs` | `ee76125328f7e9613e6b6eefb100db34304bb12a03bf3bcb4837225320129ef8` |
| `probe-environment.test.mjs` | `61569a71899cfc4d26fdbd7d53f79c799a4f7e881316c289ad21e5168437f187` |
| `run-environment-proof.mjs` | `c3a3cef8c95ea267ded58b97d21d96b2636af8110c94d0efb2b09291c424643f` |
| `finalize-readiness.mjs` | `40f7bba036e05c24b65280f7ffa2755efe92a838c3f13432317629650234fb6d` |
| `environment-path-correction.md` | `032972d97021410d2f3fcca7734aa5602160a5167e9d775413f690b655224f83` |
| `README.md` | `4df0c79914eb7681668c08b39db35da4d07fa52d4b6511d82d8eaa39facdfb68` |
