# Prospective full-journey runner extension

Status: source and nine new deterministic tests are implemented. The focused
build suite passed 32 of 32 tests after the process-check race described below.
Root's required full checks subsequently passed 351 tests plus skill/person
validation. No paid full-journey execution is implied.
The coordinator released the hold after the matched entry candidate actor
actually launched at `2026-10-12T03:46:36Z`, with the legacy runner already
loaded and frozen. Freezing alone was insufficient because readiness and
launch rechecked current implementation bytes. No model, browser, build,
syntax check or test was launched for this extension during that actor
turn. Root owns post-closure execution and the final commit.

## Contract

The new case is schema 3, `taskKind: "full-journey"`, with explicit
`setupMode: "unscaffolded"`, six fixed prompts, exactly
`requestedStops: [1, 2, 3, 4, 5, 6]`, and `bounds.maxTurns: 6`.
The fixture author supplies refusal turns explicitly; the runner does not
inject instructions or synthesize author answers. Schema 1 keeps its
ordered subset of stops 4 to 6, and schema 2 remains the one-turn
`prototype-depth` diagnostic. Neither older schema accepts unscaffolded
setup or gains new journey semantics.

An unscaffolded workspace starts empty. It receives only declared fictional
material under `material/`, supplied assets under `public/assets/`, and the
unchanged skill under `.agents/skills/storyfolio/`. The original five
proposed fixture files fit this allowlist; the later seven-file fixture adds
explicit neutral material and remains within it. Root application files, approval/history
documents and coordinator evaluation files are not seeded. Installed engine
files inside the skill are not a root application. Preparation records a
distinct unscaffolded phase and `scaffolded: false`; it must never identify
this case as an existing site.

## Neutral readiness and source boundaries

The schema-3 `setup/probe.json` has a distinct
`scope: "unscaffolded-environment"` and `actorPreflight: false`, in addition
to `modelCalls: 0` and exact frozen input, capabilities and workspace
identity. Its evidence is hashed and binds the preparation snapshot.
Coordinator environment
proof remains outside the actor workspace. It does not assert that the
actor inventoried optional skills, selected or installed them, completed
its early preflight, or built a site. Those actions are observed in the
actual actor stream. First-turn readiness checks the initial source is
still unchanged; later turns may legitimately contain actor-created code.
Before each schema-3 continuation, the live source must instead match the
immediately preceding saved actor snapshot. A result-bound gate alone does
not establish that nobody edited the workspace after review. Source paths
are compared before reading file contents, so an unknown file blocks the
next turn without being exported as evidence. The unchanged source
classifier still reads bounded candidate Git markers/reference bytes to
recognize its already-supported bare metadata exclusion. That exception
is not an arbitrary runtime payload read or a broader Git exclusion.

`verifyBuildSetupProbe({source, manifest, setup, work})` retains the legacy
schema-1/2 identity-and-existing-evidence requirements. Schema 3 additionally
requires an exact `evidenceHashes` map of `{sha256, bytes}` records, no
duplicate evidence paths, `snapshot/manifest.json` plus at least one other
environment proof path, and retained snapshot copies with matching hashes.
Initial snapshot paths and hashes must equal the frozen fixture plus
installed skill, with no excluded or unexpected inputs. Later actor-created
site files do not invalidate this immutable initial environment proof;
`executeBuildTurn` separately binds the live source to the prior turn.

Before turn 1 the complete source-path comparison uses no generated-tree
exclusions: a coordinator cannot quietly preinstall a root application or
dependency tree. Later comparisons use the unchanged generated-tree policy.
Source-path or byte mismatches fail before the new turn directory, prompt,
started record or invocation is created. Known generated trees after actor
work remain excluded; non-bare `.git-local` metadata remains unrecognized
and blocks source equality. Missing source, symlinks and unrecognized
runtime files also fail. Empty directories alone do not add source bytes.

Any neutral capability facts intended for the actor must be declared and
frozen as material before preparation; readiness cannot add a new facts
file afterward. Operational probe logs remain coordinator-only evidence.

The existing default snapshot roots cover initial material, assets and
installed skill plus later app, content, component and story documents.
Unrecognized paths remain visible as unexpected inventory. No Git
exclusion changes, source-equality relaxation or old frozen input edits
are part of this work. A safe first-turn check must reject seeded or
changed source, not merely trust a positive probe label.

## Continuation and measurement

Each invocation still executes exactly one fixed prompt. Existing
`planTurn` requires contiguous completed results, a session, reliable
duration and usage counters, remaining wall/token budgets, and an explicit
gate bound to the previous result digest. The six-stop identity is carried
in preparation, started and result records. The coordinator must inspect
the actual gate before advancing; the adapter does not turn a missing
artifact or a simulated phone review into an approval. Missing usage or a
timed-out/incomplete turn still prevents continuation.
Schema 3 also requires prior history records to carry the actual sequential
stop numbers and one session identity. No prompt text is appended or
rewritten by the adapter.

This adapter is not a full-journey result, an acceptance checker, a paid
launch authorization, or a replacement for the fixture's independent
criteria. The fixture owner is preparing the separate six-stop prompts and
contract under `evals/builds/full-journey-1/`.

## Local tests

- Accept only the exact schema-3/task/setup/stop/prompt combination;
  reject missing or cross-schema identities, skipped stops, reordered or
  duplicate stops, invalid bounds and seeded application paths.
- Prove fresh material-and-skill copying performs no engine scaffolding,
  leaves root application files absent, preserves binary asset bytes,
  rejects nonempty workspaces, and preserves existing conflict behavior.
- Prove the neutral readiness record binds evidence and snapshot hashes,
  rejects unsupported or changed source before the first turn, and does
  not misclassify a valid later actor-created application as preseeded.
- Exercise all six identities and gated transitions with synthetic saved
  events only, including refusal of missing gates, timeout continuation,
  overwritten turns and exhausted accounting.
- Retain and run the complete legacy build tests, then the repository
  checks, only when the coordinator permits execution and no actor or
  browser capture is active.

Implementation ownership: `evals/lib/build.mjs`,
`evals/codex-build-run.mjs`, their unit tests and this note. The coordinator
owns freezes, environment execution, paid launches, review and commits.

The fixture author independently reviewed this design and reported no
blocker against the five declared files, six prompts and explicit refusal
turns. Any later optional-source catalog remains separately declared
neutral data, not enabled skill instructions or a seeded approval. The
coordinator's hold lasts until the entry candidate actor is actually
launched, because its readiness and launch still compare current shared
implementation bytes to frozen inputs. No shared source edit occurred
before that hold was released.

The coordinator's post-closure commands used native Node's
`--test evals/lib/build.test.mjs`, followed by the repository-required
`node evals/check-skill.mjs` and `npm test` under the recorded native Node
environment. Command, stdout, stderr, lifecycle and results are retained.
Existing `IMPLEMENTATION_FILES` already
freezes both changed runtime modules, so no helper-path addition is needed.
The new fixture still needs its own supported case, neutral source/capability
packet, bounds, measurement and setup proof before any paid full journey.

After root confirmed interrupted-actor recovery and permitted local tests,
the first focused native invocation started at `03:58:21.042Z`. It passed
31 of 32 tests, including all nine new cases. The existing descendant-cleanup
test failed because `/proc/<pid>/stat` disappeared during its read, returning
`ESRCH` instead of the already-handled `ENOENT`. Both mean the process is
gone; the test now handles both while retaining the bounded rejection of
any still-running descendant. No production signal or timeout code changed.
The failed [attempt 1](runner-tests-1/) and outer tool launch/finish records
are preserved. Fresh [attempt 2](runner-tests-2/) ran from
`03:59:00.225Z` to `03:59:05.595Z`, code 0, 32 passed, zero failed/skipped.
Root's [full-check record](journey-runner-tests/) closed at
`2026-10-12T04:00:05.313Z`, code 0 after 14.236 seconds:
351 tests passed, along with skill and fictional-person validation. The
fixture author independently reviewed the full runtime diff and new
tests and reported no schema-3, backward-compatibility or seven-file fixture
blocker. It did not execute tests or change these runtime files.
Its review covers `build.mjs`, `codex-build-run.mjs` and the new tests through
incomplete-turn preservation. Hash-bound probe records do not establish
semantic capability success by themselves, and a structurally valid gate
does not prove that the intended handoff was reached. Coordinator evidence
review remains required. Later source checks retain known generated-tree
exclusions, with no new Git exception.
