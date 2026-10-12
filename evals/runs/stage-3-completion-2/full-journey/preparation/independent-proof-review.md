# Independent neutral-proof source review

12 October 2026, during the wording actor's live turn. Read all three
helpers, the six pure guard test groups and README, including the final
`assertInitialSnapshot` addition. No helper, test, build, model, browser or
process signal was executed by this review. No concrete readiness blocker
was found in the reviewed source. This is not actual environment success.

The wrapper requires explicit schema-3 full-journey/unscaffolded identity,
seven declared fixture files, a fresh pre-actor run, exact current/frozen
inputs and exact initial fixture-plus-skill source. The initial snapshot's
paths and hashes are checked against the freeze before invocation. The
finalizer independently checks copied snapshot bytes and live/before/after
source. Generated application or dependency trees are not tolerated before
actor preflight. No new general Git exclusion is introduced.

The worker writes only to a newly allocated external runtime, serves a
neutral in-memory page, checks local HTTP and explicit proxy denial, and
uses the pinned trusted Playwright entrypoint and frozen browser cache.
It neither installs nor builds an actor application. The wrapper invokes
the frozen worker with the recorded sandbox configuration and has a
120000-ms work deadline plus bounded 5000-ms shutdown grace. Signals target
only its owned sandbox process group; failures, signals, timeouts and
over-budget process duration cannot become passing readiness.

Finalization requires exact runtime/copied file equality, the new original
image's bytes and root's saved review, recorded process and observation
success, exact dry-run capabilities, helper freeze identity and unchanged
source. The resulting exclusive probe binds these records and the initial
snapshot with `actorPreflight:false` and `modelCalls:0`. The provided tests
cover positive contracts and source, scope, signal, timeout, proxy and
browser-identity rejection paths, but were only read here.

Limits remain important: cache-directory existence is not an offline
installation test, the trusted entrypoint hash is not an exhaustive audit
of dependency bytes, and sandbox configuration is not filesystem read
isolation. A passed process record does not independently prove absence of
detached descendants. Root must retain actual closure and perform a scoped
post-process check before later runtime work. Image viewing is a human
attestation, not inferred from hashes. Source copy/finalization time is
outside the sandbox process allowance. Actual setup and site-quality
acceptance remain unperformed at this review.

Reviewed SHA-256 identities:

- `probe-environment.mjs`: `c5ee528bea9045c0d5dd846850dc88394c202f01444ab582800e164ad434851a`.
- `run-environment-proof.mjs`: `a077ea603f6a6f83d523d263b8e1d565c673e27c2c262e008128998011473e9f`.
- `finalize-readiness.mjs`: `849527a5f69bbd2d4239e54eea582d7ea25f1769c6284b5103443e1e9a90fbda`.
- `probe-environment.test.mjs`: `b7e9199e208fe9112f4b472332ffeb8bdbb6dbb6176d5540989061cda84be8e6`.
- `README.md`: `73b7e7ee5b9b477032bf590af5ce09340ff823847afd82a1d446950740041dc4`.
