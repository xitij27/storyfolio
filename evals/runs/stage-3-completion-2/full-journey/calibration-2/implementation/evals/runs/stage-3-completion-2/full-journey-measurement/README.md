# Independent full-journey measurement

Prospective coordinator-only measurement, not new actor instructions. Root
approved the [design and finite bounds](proposal.md). No paid actor, browser,
installer, source reconstruction or calibration was executed while writing
these helpers. Focused tests are supplied, not claimed passing until their
actual command and result are saved. Root owns every launch and decision.

## Freeze and scope

Use `policy.json` as the journey case's expectations. Add every path exported
by `binding-lib.mjs` as `implementationPaths` and `transitivePaths` to the
case's `implementationFiles` before cohort preparation. This includes the
shared recorder, bounded process helper, capture/command/source helpers and
their imports. Default runner freeze dependencies remain required. The
implementation verifies all of those exact bytes, not just filenames.
Neither shared checker schemas nor skill/engine source is changed here.

The gate worker is a small derivative of the prior narrow entry worker.
The final worker is a single-unit derivative of `evals/check-build.mjs`,
reusing trusted commands and the generic engine geometry, travel and control
functions. Its own journey target contract is not the historical five-ID
schema 2 contract, and historical results remain unchanged.

The first manual-prototype calibration exposed two apparatus limitations.
Its original 19 implementation files and complete failed evidence remain
in `../full-journey/calibration-1/`. The prospective second measurement
baseline adds `controls-lib.mjs` and `cache-identity.mjs` with focused tests.
Controls retain bounded pre/post-activation scroll trajectories, screenshot
drift checks and verified source-declared peer preparation. Unsettled or
unchanged responses still fail. Build comparison retains the full raw
inventories and raw `buildUnchanged` separately from validated
`immutableBuildUnchanged`. Only complete APP_PAGE promotions of byte-identical
immutable seeds, with exact owner/key and one numeric metadata timestamp,
are accepted. Unknown payloads and changed existing files still fail.
Neither change edits the shared checker, skill or application source.

| Stop | Required observations | Total child limit, including 5 s shutdown |
|---|---|---|
| 2 | Every advertised concept, its actual opening/middle/ending, desktop/phone, actual chooser trials | One 900000 ms unit |
| 4 | Every advertised look, its actual three-point spine, desktop/phone, switch trials | One 900000 ms unit |
| 6 | One trusted type/lint/build; every final beat and transition in seven modes; auxiliary pages/download | Build 300000 ms; each mode 480000 ms; auxiliary 300000 ms |

Stop 6 has nine distinct units, 66 minutes maximum summed child lifetimes.
It does not have an automatic continuation, retry or whole-orchestration
wall cap. A cleanly completed technical failure may leave later predeclared
units useful. Failed build, interruption, log failure, incomplete capture,
source change or broken evidence binding blocks subsequent units. Root must
check terminal ownership/process closure before continuing. Hard worker
termination cannot itself prove every detached descendant exited. Timer
scheduling jitter and unknown external signal senders stay explicit.

## Post-turn records, before measurement

Only closed successful full-journey stops 2, 4 and 6 are eligible. The exact
schema 3 case, unscaffolded setup, six requested stops, input freeze, result,
snapshot, supervisor command/lifecycle/streams/result and terminal tool
return are checked. The recorder must be the new `process-supervision`
recorder; no legacy or missing-result fallback is accepted. Its stdout must
bind the actual runner result path/session/stop. CLI file arguments should
be repository-relative and root should retain those original command files.

Root saves a binding JSON under `evals/runs/` with this shape. All references
are repository-relative paths plus actual SHA-256 values, not placeholders
in a real record:

```json
{
  "schemaVersion": 1,
  "turn": 2,
  "run": "evals/runs/COHORT/full-journey-1/baseline-1",
  "metaSha256": "HASH",
  "inputDigest": "HASH",
  "actorResultSha256": "HASH",
  "processRecord": { "path": "evals/runs/STUDY/actor-turn-2/result.json", "sha256": "HASH" },
  "terminalTool": { "path": "evals/runs/STUDY/actor-turn-2-terminal.json", "sha256": "HASH" },
  "originalSource": { "path": "evals/runs/STUDY/stop-2-source.json", "sha256": "HASH" },
  "extrasDisposition": { "path": "evals/runs/STUDY/stop-2-extras.json", "sha256": "HASH" },
  "targets": { "path": "evals/runs/STUDY/stop-2-targets.json", "sha256": "HASH" },
  "runtime": { "path": "evals/runs/STUDY/runtime.json", "sha256": "HASH" },
  "output": "evals/runs/STUDY/stop-2-measurement"
}
```

`originalSource` is the complete unchanged `captureSource` inventory in its
original order. `runtime` supplies the separately recorded real `TMPDIR`.
Extras disposition has `reviewedByRoot: true`, a rationale, exact `extraFiles`
with path/sha256/bytes plus `classification: "git-metadata"` and rationale,
and exact snapshot `unexpected` entries plus classification/rationale.
Only positively identified Git metadata or empty unexpected directories
are eligible. Missing/changed snapshot files, omitted application source,
credentials, active hooks and unidentified extras block restoration. Empty
arrays are still required when nothing was omitted. No broad Git exclusion
or original-workspace cleanup is performed.

For missing/nonterminal actor, no authored output, stock starter, source
blocker or unresolved gate, root instead saves an explicit disposition with
the actual available evidence paths/hashes and `gateDisposition(state)`.
The state booleans are `actorSettled`, `actorComplete`, `hasSavedSnapshot`,
`authoredApplication`, `sourceIdentity`, `unresolvedGate`. Any missing or
negative precondition yields `eligible: false`, `passed: false`,
`status: "blocked-unobserved"`, `browserStarted: false`. Even positive
eligibility is only `eligible-unobserved`, never an automatic pass. Preserve
raw absence/interruption, do not invent an actor result or call a broken
authored application a no-output skip.

## Observed targets

All targets use schemaVersion 1, measurement `full-journey`, stage 2/4/6,
original full `sourceDigest`, `actorResultSha256`, exhaustive public-source
discovery with reviewer and every cited saved source path/hash, and authored
implementation eligibility/rationale. See `measurement.test.mjs` for small
complete structural examples. It is not a proposed actor answer.

Stops 2/4 have `alternatives`: unique observation ID, local route, advertised
boolean, source-semantic meaning, `beats` with opening/middle/ending actual
engine IDs (null for missing), and actual `control` or null. A control has
selector, source-matched label, fromRoute and optionally an actual alternate
prepareControl selector/name. Retain every public route and control alias
as additional observations, with `advertised: false` only for a documented
alias of an already counted material choice. Never drop excess/broken
choices. Source discovery and manual review, not the count flag, establish
that these are all distinct advertised concepts/looks. No chooser is
invented if public routes are the real navigation. No shared actor IDs are
prescribed. Name matching uses aria-label/text, not the full accessible-name
algorithm. Real Tab, native activation key, focus/hit geometry and before/
after originals are captured. Unchanged/idempotent response stays unobserved
and does not pass, even if the click itself succeeds.

Stop 6 has route; every actual beat `{id, headingLevel, meaning}`; every
approved storyboard meaning `{meaning, actualId}` (null for missing);
requiredText, selectedWording, links, assets, requiredFiles, auxiliaryPages.
Links use text/href and optional keyboardOnly; files are safe relative
paths; auxiliary pages use id/route/status/purpose and optional kind
`download`. Include project page, corrected CV, missing page and all actual
navigation/resources, not just source content that happens to exist.

`selectedWording` contains a root selection `record` path/hash and `versions`
of `{meaning, version, text}`. `requiredText` must equal every whole selected
version's complete text, never source-derived snippets. The bound record
has schemaVersion 1, source `coordinator-whole-version-selection`,
reviewedByRoot true, exact selectedVersions, and hashed conversation/decision
provenance. Each version maps to one unique approved meaning. The observer
matches the complete text in that actual beat, normalizing whitespace while
preserving word boundaries,
then records positional character ranges visible across the existing
start/mid/end/rest samples. All characters must be covered. Partial text,
another beat, repeated ambiguous copies and out-of-range coverage do not
pass. Explicit BRs and block boundaries remain word separators, while inline
emphasis preserves its actual textual whitespace. The same serialized browser
observer has deterministic DOM-fixture tests. A wrapped word counts visible only when all its range rectangles fit
the viewport. This supports legitimate viewport splitting without unordered word
union. Three scroll positions can still miss very long text, producing
unobserved coverage, not permission to replace text assertions with source
presence. Geometry does not establish pixel occlusion or readability.

An optional focusOnlyControls declaration is limited to one source-bound
document-start skip to the main story, with root-reviewed source attestation.
Ordinary hidden/disabled controls have no exemption: the raw census retains
them at every rest for manual source/intent review alongside the actionable
inventory. Visible ordinary controls retain both pointer/keyboard trials.
Actual context loss is induced; unsupported loss cannot pass. Reduced
motion requires all still pairs and independent readable geometry review,
not matching blank image hashes. Moving frames cover every adjacent final
interval both ways in desktop/phone/short modes. Unexpected HTTP and request
failures are retained and fail technical assessment; navigation aborts stay
distinguishable but are not silently waived.

## Root-only execution and review

Use the frozen native Node and capability PATH/browser/library/LANG values.
The runtime record supplies TMPDIR; the measurement subprocess sets
NEXT_TELEMETRY_DISABLED to 1. From repository root:

```text
NATIVE_NODE evals/runs/stage-3-completion-2/full-journey-measurement/prepare-source.mjs --binding=REPO_RELATIVE_BINDING.json
NATIVE_NODE evals/runs/stage-3-completion-2/full-journey-measurement/run-unit.mjs --binding=REPO_RELATIVE_BINDING.json --unit=concepts
NATIVE_NODE evals/runs/stage-3-completion-2/full-journey-measurement/verify.mjs --binding=REPO_RELATIVE_BINDING.json --review=REPO_RELATIVE_VIEWED_IMAGES.json
```

Between prepare-source and run-unit, root records exactly one fresh
`npm ci --offline --cache=/tmp/storyfolio-npm-cache` in the returned clean
workspace using `evals/runs/stage-3-comparison-1/record-command.mjs`, output
`OUTPUT/setup/dependency-install/`. Executable is `npm`; frozen four
environment values and runtime TMPDIR match; telemetry is explicitly unset.
This is a declared measurement install contract, not an assertion that an
actor's earlier install environment matched. No install retry is built in.
The actor/source snapshots and original full inventory stay unchanged.

Use unit `looks` at stop 4. At stop 6 invoke exactly `build`, `desktop`,
`mobile`, `short`, `reduced-motion`, `no-webgl`, `no-javascript`, `context-loss`,
`auxiliary`, one root decision and terminal closure at a time. The generated
build is hashed and reused without rebuilding. Only predefined `.next`
cache/trace/diagnostic/dev exclusions are omitted from build identity, never
from source policy. Runtime APP_PAGE responses are not omitted: every byte
and path stays in the raw inventory and validated cache inventory described
above. Node/Next/Playwright entrypoint identities are checked;
this does not claim full transitive dependency byte integrity.

Save exact outer tool launch/session/poll/terminal results. Never overwrite
unit directories. Each unit retains command, PIDs, deadlines, streams,
lifecycle, source before/after, complete raw artifacts and closure. A log
failure triggers shutdown of the owned worker PID and blocks further units;
it is not misattributed as an unknown external signal. If storage itself
fails, result preservation can fail too and remains incomplete.

Individually view every emitted PNG/JPG/JPEG original. Save schemaVersion 1,
complete true only for exhaustive available-original review, and images
with repository-relative path, bytes, sha256, viewMethod `view_image original`.
The verifier requires exact unit and original sets, no duplicate paths,
every rest/travel/still/control/census record, source closure and artifact
hashes. Completed failed observations remain technically failed, including
a nonzero process exit. Partial captures are preserved, but this strict
complete-stage verifier must fail rather than waive missing scope. The six
visual criteria, actual workflow/selection gates and physical-phone/author
acceptance remain separate human assessments, never supplied by this code.
Arbitrary IDs are escaped for filenames; any duplicate generated screenshot
name fails before overwriting an earlier original.

## No-model checks and separately labelled calibration

Pure deterministic suite, after root clears all live runtime work:

```text
/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node --test evals/runs/stage-3-completion-2/full-journey-measurement/measurement.test.mjs
```

Tests import only coordinator functions, read the policy and use in-memory
fixtures. They do not spawn subprocesses, touch actor workspaces, build,
install, browse or call a model. Root should record syntax checks as well.

For root's approved local calibration before freeze, first copy the manual
`prototypes/fixture-study` source into a new `journey-calibration-RANDOM`
workspace and install its locked dependencies. Do not use evaluated actor
source or change any original/replay/prototype workspace. Save a source
snapshot manifest and synthetic targets with an explicit calibration label.
The real single Bench look remains one look, and its actual five beat IDs
remain opening.assembly, power.cycle, middle.relationship, proof.boundaries,
close.evidence. Do not invent extra alternatives/beats to pass count rules.
The following gate calibration is bounded to 15 minutes and has no retry:

```text
NATIVE_NODE evals/runs/stage-3-completion-2/full-journey-measurement/calibrate.mjs --workspace=FRESH_CALIBRATION_COPY --snapshot=REPO_SNAPSHOT_MANIFEST --targets=REPO_CALIBRATION_TARGETS --out=NEW_REPO_CALIBRATION_OUTPUT
```

Use synthetic stage 4 targets for that single look. Expected count failure
must remain recorded. For the same clean copy's five-beat final targets,
run the same entry once with `--unit=build` and a fresh output, then once
with `--unit=desktop --build-proof=BUILD_OUTPUT/artifacts/manifest.json`
and another fresh output. The limits are the frozen 5-minute build and
8-minute desktop bounds. These are positive renderer/coverage checks with
negative journey counts, not a full journey or a replacement actor run.

This direct-worker calibration has no actor lifecycle eligibility and
cannot create a real gate binding or pass the journey verifier. It exists
only to test the prospective worker on known source. Its final output
contains source/streams/lifecycle/process records; an uncatchable wrapper
termination may prevent their final write, so root retains outer tool
evidence too. Review all its original images separately, not as journey
evidence. Root has not launched this calibration at this source checkpoint.
