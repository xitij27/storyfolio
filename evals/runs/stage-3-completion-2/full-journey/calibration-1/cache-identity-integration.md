# Prospective validated cache-promotion comparison

12 October 2026. Root requested this source-only implementation after the
desktop calibration's exact six-file delta was independently audited.
Original measurement bytes are preserved in `implementation-original/`.
The failed desktop result remains unchanged. No test, build, browser,
model, signal or cleanup was run by this preparer.

Only two new implementation files were added:

- [cache-identity.mjs](../../full-journey-measurement/cache-identity.mjs).
- [cache-identity.test.mjs](../../full-journey-measurement/cache-identity.test.mjs).

No existing helper, policy, actor source, skill or engine was changed.

## API and exact scope

`compareBuildInventories(before, after, metadataBytes)` is pure. It takes
the complete existing `buildInventory` records, plus a map from `.next`
relative metadata paths to exact Buffer bytes. Both inventory digests,
file shapes, paths and uniqueness must validate. Existing file rows may
not change, disappear or reorder; existing exclusions must be identical.
Every new row must belong to a fully validated cache promotion.

`compareBuildIdentity(workspace, before, after)` is the read-only filesystem
adapter. It checks canonical workspace identity, rejects symlink/non-directory
ancestors and symlink/non-regular files, rereads every current listed file
and verifies its size/hash, then supplies the metadata bytes to the pure
comparison. Its filesystem primitives are injectable for pure tests. The
caller must still obtain `after` from the complete, fresh `buildInventory`
walk; this adapter is not a substitute for that inventory or a filesystem
isolation boundary.

The only accepted extra groups are non-fallback, non-postponed APP_PAGE
responses whose existing immutable `server/app/` metadata owns the exact
cache namespace and key. HTML, RSC and every declared segment must exist
and match the corresponding original seed's size and hash. Promoted metadata
must be canonical Next JSON and equal the seed plus exactly one nonnegative
safe-integer `routeCacheLastModified`. Every cache file must be accounted
for. Unknown kinds, filenames, executable payloads, missing/extra segments,
changed metadata or payloads, and unowned groups fail. Already present
cache entries cannot change or disappear on later units.

The return record distinguishes `fullIdentityUnchanged` from
`immutableBuildUnchanged`. It retains before/after digests, the immutable
digest, every added cache row, the full secondary cache inventory and each
validated seed mapping. The original inventories are never filtered,
rewritten or replaced. A successful comparison is not a controls, rendered
response, semantic or visual pass.

## Root-owned integration points

The existing callsites were read before implementation. In the preserved
`final-worker.mjs`, line 384 compares a new mode's full starting inventory
with the completed same-source build proof; line 422 compares the mode's
full ending inventory with its full starting inventory.

1. Import the new read-only adapter into the prospective worker only.
   Keep the same `buildInventory` calls and all saved full inventories.
2. At the pre-browser comparison, retain the adapter result under a new
   explicit field such as `buildComparisonBefore`, comparing the build
   proof's full inventory with the mode's actual full starting inventory.
3. At final comparison, retain `buildComparisonAfter` for the mode's
   actual full starting and ending inventories. Set the existing success
   indicator only after validation succeeds, and document that it now means
   immutable build stability plus verified seed promotion. Always retain
   the explicit raw equality flag so changed full inventories are not
   reported as literally identical. A thrown comparison remains an error.
4. Include the new helper in the worker's `frozen` hashes, the coordinator
   `implementationPaths`, and the full-journey case's implementation freeze.
   Include its tests among frozen implementation evidence if the current
   case contract does so. Do not modify any earlier frozen input tree.
5. Keep the original artifact/proof hashes and source checks. Preserve
   all control and scope failures. The prospective comparison must not be
   run as a retroactive rerating of `calibration-1/desktop`.

The aggregate verifier currently trusts the frozen worker's result and
hash-bound manifest rather than separately reconstructing build comparison
semantics. If root adds separate comparison-field checks there, require
the recorded before/after digests to equal the corresponding retained full
inventories. Do not create an alternate path where an asserted success
field alone bypasses the worker's strict comparison.

## Unexecuted tests

Twelve deterministic test groups use synthetic inventories and injected
filesystem metadata, without real files, subprocesses or signals. They
cover the six observed promotions; no-change identity; unchanged prior
cache entries; changed HTML/RSC/segment/compiled bytes; deleted originals;
partial groups and missing seeds; changed metadata, timestamps and writer
form; wrong owner/key/namespace and unsupported fallback/PPR; unsafe or
duplicate segments; unknown/executable/cache-lookalike paths; stale metadata
and inventory hashes; symlink ancestors/files; non-regular files; and
current-byte drift after inventory capture.

Root's prospective test command, not executed by this preparer:

```sh
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node --test evals/runs/stage-3-completion-2/full-journey-measurement/cache-identity.test.mjs
```

Initial source checkpoint:

- Helper: `110e73ee34e8c6715404e7cffad9162619c82bd70e8753726da9a2f564a06878`.
- Tests: `24d6c10d91873382aec2b5f8a0f2b2d5a522cbb2922fc089c73ff31142797b15`.

Static independent review was requested from the separate planning/proof
agent. Actual tests and integration remain root-owned and pending here.

## Root integration source review

Root subsequently integrated the two new helpers prospectively. A read-only
recheck found no concrete integration blocker. The worker retains the
complete `buildIdentity` and `buildAfter` inventories, records the pre-server
`buildProofComparison` and final `buildComparison`, and keeps raw
`buildUnchanged` as literal digest equality. The separate
`immutableBuildUnchanged` field records validated seed-promotion stability.
A comparison error remains a manifest error and cannot become a passed
measurement. This separation is clearer than overloading the old flag.

Both new helper/test pairs appear in `binding-lib.mjs`'s implementation
list and `full-journey-1/case.json`. The worker's own frozen hash list
includes both imported helpers. No historical freeze was changed.

The independent read also covered the entire new controls derivative and
its 13 pure tests. Pre-activation and post-activation scroll settlement,
screenshot-time scroll agreement and source-declared peer preparation are
required rather than inferred. The preparatory peer must actually deselect
the target, and the target must still produce its own response. Failed
settlement and unchanged state remain failures. Scroll stability does not
prove settled visual geometry, the intended object response or good pixels;
root's complete original-image review remains separate.

No code or test execution was performed by this reviewer. Root owns actual
tests, preservation of the corrected 23-file implementation and any newly
labelled calibration. Exact integration checkpoint:

- `cache-identity.mjs`: `110e73ee34e8c6715404e7cffad9162619c82bd70e8753726da9a2f564a06878`.
- `cache-identity.test.mjs`: `24d6c10d91873382aec2b5f8a0f2b2d5a522cbb2922fc089c73ff31142797b15`.
- `final-worker.mjs`: `10b44ad590dbdac76650cc1e5b9576819e5984f7d8926fb22f3613a5a072acb5`.
- `binding-lib.mjs`: `731556522fe1c482196700f13c090d4d0e2e2e600d84d938d5725a8bb002368b`.
- `controls-lib.mjs`: `6687e8bf0fb31d10b84b6b96f9f1ca567a5bb9a30069a3641e84f731bd629f11`.
- `controls.test.mjs`: `2e18fc9b9a69ec9fdfb0c347c2ddf4bb7e4b6544e2bada0d0aed061a75e396c0`.
- `evals/builds/full-journey-1/case.json`: `fe27bea6c16d25d186f1f5f9f24877ef5228e817d6d8a1c268941e3bd074fbcd`.

Root subsequently read both helper/test files completely. The independent
acceptance reviewer also found no blocker and confirmed that reuse of the
original successful build requires the new strict comparison at both
pre-server and closure guards. Root's retained `local-tests-3` command passed
all 51 focused checks, including these 12, plus 351 repository tests. No
pending source-review or pure-test gate remains at that checkpoint. The
original calibration failure is unchanged; actual corrected capture remains
the next separate observation.

Pre-commit whitespace checking reported trailing empty lines in raw logs,
the exact preserved controls helper and the review-list writer. These bytes
were kept intact. With only the blank-at-EOF warning disabled for that
check, the staged whitespace check passes; no test assertion was disabled.
