# Independent recovery-adapter review

Source-only review after the passing recovery audit and commit `0be9af2`.
No runtime, model, browser, test or repair was executed by this reviewer.
This record is not a launch approval, passed concept gate or new allowance.

## Initial source checkpoint

Read all of the following files, while the authors were still preparing
the remaining measurement wrappers and tests:

| File under `full-journey-recovery/` | SHA-256 |
| --- | --- |
| `runner/execution-core.mjs` | `07d42e0bc6a0ae88c45961561b11785cd0fd6aafa5da31f4204c036a612f193d` |
| `runner/cli.mjs` | `eb0551af3793ff0efe84d731263de1656f58676e32a3a7b289ad13a2a7eb86e4` |
| `measurement/amendment-lib.mjs` | `f811f2af72b4dfc2261756dc689ce0efb7b4697815173767feb661c875094fc8` |
| `measurement/app-root.mjs` | `fff1194049346cfbd061a12f5fd86494beebca75e717c9b9fa4c10acfb5952b7` |

No concrete blocker was identified in those source-binding and execution
seams. The common loader verifies the original 149-input freeze, original
implementation bytes, both historical actor results and outer recorders,
and the separately labelled recovery's exact original subset and additions.
The application-root helper keeps canonical `site/` execution and its
package/lock identity separate from the complete workspace inventory.

The runner retains original turns 1 and 2, stores only new turns 3 through
6 in a separate lineage, resumes the same session, and uses the original
fixed prompts and cumulative `planTurn` bounds. Recovery is the explicit
turn-3 checkpoint only. Later turns require their real predecessor's full
source snapshot; incomplete or duplicate turns block. Complete capture
compares the bounded policy with the full generated-tree-filtered source,
so another omitted nonempty tree is not silently treated as complete.
Original shared files and historical snapshots are not rewritten.

This checkpoint does not cover the still-pending measurement launch,
reconstruction, source-after/build-root plumbing, tests, final helper
inventory or actual amendment bytes. The authors were asked to retain
negative tests for original history/artifact drift, wrong source basis,
unsafe application roots, unchanged budgets and full before/after source.
Final source review and root-run verification remain required. Root alone
dispositions the changed apparatus and any genuine next gate.

## Stable runner checkpoint

Read the complete hardened execution core, CLI, all fake-invocation tests
and README. No concrete blocker was found. The additional checks reject
noncanonical continuation roots and cross-check saved result identity,
source basis and capture policy against the original started record.
Original histories remain pinned and actual future before/snapshot bytes
remain independently bound; the recovery cannot be reused for a later turn.

| Runner file | SHA-256 |
| --- | --- |
| `execution-core.mjs` | `c00fde0ffb84bae898d68ca9cd0b27fbd2f7166ca70afc5c71c50020cdcc0aa1` |
| `cli.mjs` | `eb0551af3793ff0efe84d731263de1656f58676e32a3a7b289ad13a2a7eb86e4` |
| `execution-core.test.mjs` | `88c0a7abb1d87124d1222f660a7c0123b6c9d49437ef996f59a9e01a360684c7` |
| `README.md` | `551f5f1e32db1a744b499026b32c28e791f539beb87a735626b14f710be513f7` |

Root separately ran 36 synthetic tests, closing code 0 at
`2026-10-12T15:59:09.382Z` in 6387 ms. The saved
[test result](recovery-runner-tests-1/result.json) is execution evidence
from root, not a test run by this reviewer or an actual continuation.

## Measurement source checkpoint

Read the recovered binding, reconstruction, runner, verifier, application
root helper, amended worker, choice-activation helper and their test source.
Also compared the complete worker diff against the immutable original.
No concrete binding, cwd or coverage blocker was identified at this
checkpoint. Both binding and worker explicitly restrict this derivative
to stop 2; the shared original's stop-4 support does not expand this scope.
Whole-workspace source identity is retained before and after, while the
package install, Next identity, production build and server use the
canonical `site/` application cwd.

The root-found initial chooser bug is corrected by navigating to the
declared `fromRoute` before locating the real choice, optionally executing
only its declared preparation control. Missing or renamed controls still
fail. The destination entry image remains separate. Original three-point
coverage, pointer/keyboard trials, response checks, error collection and
assessment functions are not weakened. Tests include cross-route choice,
real preparation, and missing/renamed-control negatives.

The inherited identity-change response check still needs manual
destination/material interpretation; technical completion is not semantic
choice acceptance. Measurement README, lineage and the final helper maps
were still being finished at this checkpoint. Root must review those
bindings and run the focused measurement tests before freezing or launching.

## Final measurement source disposition

Read the completed README and lineage, and rechecked the final common
loader changes: original artifact inventories must be exactly 199 and
204, recovery must be 182 files with the exact 98-file subset and 84-file
addition, and source exclusions must equal the unchanged shared contract.
All seven original helper/policy hashes listed in the lineage match their
current bytes. No concrete source-review blocker remains in these files.

| Measurement file | SHA-256 |
| --- | --- |
| `app-root.mjs` | `fff1194049346cfbd061a12f5fd86494beebca75e717c9b9fa4c10acfb5952b7` |
| `amendment-lib.mjs` | `1ab4aaec7c0b9a42bef1f927639e36aa495ae6dea41094fb93da2a6260f0ae93` |
| `binding-lib.mjs` | `fec69bd990f99dd67a5f855dc2346476bd0432126aa23186389a4ee03ab53384` |
| `prepare-source.mjs` | `39b4cc2196a5620bb4b745fb2b5ea4e7228c5f7533969f126f0d362e72a150b0` |
| `run-unit.mjs` | `33183fa18dc4e80d793a21f7b152afa0009f08468cb6718188ccdb6620eb95a1` |
| `gate-worker.mjs` | `7388109d7420c7a9167b2dd8c0c23671258643f4eed7e4e18b49a7f33c4e1128` |
| `choice-activation.mjs` | `4c29f2786c1de2679633ecf747661f5ee2f5a49c3dc0120a31b060b87d23db01` |
| `verify.mjs` | `5105e451107666728e1734e745130119c23a2557571f9e8b7e81b2efc4175936` |
| `recovery.test.mjs` | `1ff9ff2b7185c3fc6296b26bc659a323aee26b6b1abab9efc57a8380a7ccebd0` |
| `README.md` | `f21819a81072c4126603bfb762974b47772e7c9dead276e2a09672b7f4fbd17e` |
| `lineage.json` | `b4fb304875efde81499d86661bec645c87c0b45e9e0d30bedea9eb878f4d796d` |

The final documentation correctly separates old inputs from additive
helper identities, historical snapshots from recovery, and one stop-2
capture from any later measurement or actor gate. This source disposition
does not execute the focused measurement suite, create or validate the
actual root-supplied amendment/binding, reconstruct source, or authorize a
launch. Root must retain those separate checks and dispositions before use.

## Concrete binding checkpoint

Independent read-only checks at `2026-10-12T16:18:19.065Z` and
`2026-10-12T16:18:44.780Z` found no concrete binding blocker. The actual
[amendment](../../full-journey-recovery/candidate-2/amendment.json) is
`17ec3ed49281be699d525513d075c46ebc37706bf020281ca528e23f4e4f8180`;
the [binding](../../full-journey-recovery/candidate-2/binding.json) is
`088469b9438b0649a106bae89feb88dd8aa4b7045041cf9a1a079aaa9ad090b8`.
Their schema, candidate/session identity, stop-2-only measurement output,
remaining turns 3 through 6, original bounds and explicit post-closure
source limitation match the reviewed adapters.

Direct hashing matched all 42 current helper entries (38 measurement and
4 runner), all 17 direct evidence references and the original meta. Both
derived terminal objects exactly equal the `result` objects in their
named original terminal-tool polls. All 182 declared recovery source rows
matched size and hash in both archive and current workspace, including
the 84 `site/` rows; all 17 target discovery source references matched the
manifest. This was a declared-row check, not a new full-tree enumeration.
No evaluated helper, test, model, browser or application runtime was run.

Root's separate [actual-data preflight](recovery-binding-preflight-1/result.json)
closed code 0 at `2026-10-12T16:14:30.104Z` in 1817 ms. Its retained stdout
and stderr hashes also matched. Its result reports the 149 original inputs,
199 and 204 original artifacts, 182 recovered source files and carried
totals of 773060 ms, 1898573 reported tokens and 184269 uncached-plus-output
tokens. Those complete inventory and accounting validations were root's
preflight, not a repeated invocation by this reviewer.

This checkpoint does not convert the later recovery into an original
closure-time snapshot, pass the concept gate or authorize continuation.
The amendment explicitly forbids a new paid attempt, retry, judge, prompt
change or budget reset; each remaining turn still needs its actual gate.
