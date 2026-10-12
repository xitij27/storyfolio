# Independent journey measurement source review

12 October 2026. This review began while the wording actor was live. It
executes no model, build, browser, subprocess test, signal or cleanup.
Implementation remains owned by the measurement preparer. No actual
journey measurement or pass is inferred.

Initial source read covered `binding-lib.mjs`, `prepare-source.mjs`,
`run-unit.mjs`, `verify.mjs`, `measurement-lib.mjs`, `gate-worker.mjs`,
`final-worker.mjs`, `policy.json`, the existing bounded-process helper and
the new prospective process recorder. Source changes were still underway;
this is a review record, not a final frozen-byte attestation.

Concrete findings sent to the preparer and root:

1. The initial actor binding expected the historical recorder's top-level
   stdout/stderr hashes. Future actor launches use the new supervisor's
   `rawArtifacts` map and explicit spawn/close/interruption state. Bind its
   exact prospective lifecycle schema and all raw artifacts, not a loose
   fallback from one format to another.
2. Aggregate `technicalPassed` initially trusted `manifest.passed` without
   also requiring process exit zero. Complete failing observations can
   remain complete, but a nonzero process cannot become a technical pass.
3. Concept/look coverage initially checked three rests but not the entry
   image or the two declared pointer/keyboard trial records and images.
   An empty control array could evade the assessor. Require exact declared
   trial coverage and keep idempotent or unobserved response distinct from
   a successful switch.
4. Require explicit full-journey schema, task, setup and stop identities in
   the binding, in addition to hashes. An arbitrary run path should not be
   accepted solely because it carries the helper list.
5. Root additionally required stream log errors to block later units.
   The historical bounded helper has no such result field, so the new
   wrapper must actually observe and retain stream failures, not merely
   check a field no code sets. Root separately identified gate HTTP/error
   response coverage and unchanged-switch response handling.
6. A later whole-version observer removed all whitespace before matching,
   accepting changed word boundaries such as `power states` versus
   `powerstates`. Its per-word visibility also marked the entire word
   visible if any wrapped range rectangle was in view. Require preserved
   ordered word boundaries and conservative visible coverage. This was
   sent for correction before freeze, not accepted as a whole-copy pass.

The source-isolation design is otherwise appropriate: preserve original
work and settled snapshot; use a fresh reconstruction with exact retained
source bytes; require an explicit root-reviewed, hash-bound disposition
for narrowly named Git metadata extras; reject omitted unknown application
paths; never relax the shared source policy or overwrite old evidence.
Metadata-looking paths still need the promised actual root review. They
are not inherently harmless merely because their names match Git files.

The wrappers distinguish complete observation coverage from technical,
semantic, visual and real-author acceptance. Full original-image review
and source/conversation gates remain required. Process closure alone does
not prove absence of detached descendants. No automatic retry or omitted
mode exemption is authorized by these helpers.

The follow-up source recheck confirmed findings 1-5 were addressed: exact
new-supervisor schema and raw evidence, schema-3 identities, zero-exit
technical pass, declared gate/trial/original coverage, HTTP failures and
idempotent-response failures, plus real stream error handlers that stop
only the owned worker and retain a distinct log-error result. Final
coverage also binds each travel, still and control image and raw control
census. The test fixture was updated for the new wording evidence field.
The optional direct calibration entry was read and is explicitly separate
from settled-actor journey eligibility, not a way to recover an incomplete
actor as a journey pass.

The final stable observer recheck confirms normalized single whitespace
boundaries instead of deleting whitespace, and requires every rectangle of
a wrapped word to be visible before marking that word covered. Positional
coverage remains tied to the one complete selected version in its approved
beat. The preparer was also notified of the narrower residual substring
boundary case, where a selected phrase could begin within a longer token;
that is not a substitute for mandatory source/semantic review.

No remaining blocker from findings 1-6 was found at this checkpoint.
Root-owned deterministic tests, calibration if chosen, actual frozen-case
readiness and full image/semantic assessment remain separate. No runtime
or test was executed by this reviewer.

Stable source SHA-256 checkpoint:

- `binding-lib.mjs`: `b988cd10837ca75be8b34e0a7c7ea1e9d366a9d70b1c49af3528c41ec3303031`.
- `prepare-source.mjs`: `b9c79b65a3364fb45727b68872703e5f96a2480ce226066d38c4aca93b5ce4c3`.
- `run-unit.mjs`: `8be4a6e188b8f913544c4d5281b199375973c069c54242cac16c79ff911e51a3`.
- `verify.mjs`: `9f1345e2ca368e78d319bd37818d2f97357218e15effdc3aff7174e9968bd163`.
- `gate-worker.mjs`: `53e28abcbabc9c08252043e9f5b6d51e5c25e5184af690fd4bcead6e4f2a2c31`.
- `final-worker.mjs`: `b837e4c69501861877fb34996974a2bdb4d99b56b4575325fa106a660d983565`.
- `measurement-lib.mjs`: `b23eadd07e51538e2441f4fa22c7ebe53cc34005da657f7a269dd1332ee73f11`.
- `measurement.test.mjs`: `56b0f59833846cfc39b61587401e15b97c3dec5b531a2156d25ac92f1f17d8bf`.
- `calibrate.mjs`: `416256cd564da69aeaa6968a32eedda8a8e49f7da5d4a801ede793397e2bd419`.
- `policy.json`: `0f3e9afd3aab1370df72bcf1deb9089227292de1421231bece0af5e06ecaddb7`.
- `README.md`: `b01602cb62dfb9c1a89d37433b3c19f5fbc688da6126a55e709e3d88b3f07173`.

## Later observer correction review

The source-only follow-up read confirmed the browser now serializes the
same exported `observeWording` function exercised by the direct mock-DOM
tests. Explicit BR nodes and block boundaries preserve separators; inline
elements do not invent missing spaces. Exact normalized token boundaries
reject a selected phrase embedded in a longer token. Every rectangle of a
wrapped word must remain inside the viewport. The worker now reserves each
image name before writing, rejecting duplicate names rather than replacing
an earlier original. The direct tests cover the prototype's BR plus inline
emphasis, missing word boundaries, prefix/suffix mismatches, clipped wrapped
words and duplicate screenshot names. No remaining blocker from the earlier
observer findings was found. These were static reads during root's separate
desktop calibration, not test execution or original-image review by this
reviewer.

Later reviewed hashes, superseding only the three corresponding source
hashes above:

- `measurement-lib.mjs`: `fdeb9a86308af6974faa2a6a184ad7024420e8762a8b959c3cb78df4cba79da7`.
- `final-worker.mjs`: `fe1ea1ff7c9e9af9084f5e7ad310ab4d619544eee2b5878ac45fe3938afac93c`.
- `measurement.test.mjs`: `496ff3de6b185206a7f61ca6ee1645d646e71e8d5f2438fd0348a15b2ad34175`.
