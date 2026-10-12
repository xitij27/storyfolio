# Candidate actor: settled partial-evidence audit

12 October 2026. This audit made no model, browser, install or build call,
contacted no actor, and changed no actor source, frozen input or old cohort.
The root owns lifecycle, independent acceptance and the optional judge.

## Outcome and terminal boundary

The candidate did not complete its authorized turn. The root confirmed
execution session 81752 closed with exit 1. The retained
[outer recorder result](../stage-3-comparison-1/candidate-actor-command/result.json)
finished at `2026-10-11T23:49:32.350Z`, code 1, signal null. The
[actor process](bench-depth-2/baseline-1/turns/01/process.json) and
[result](bench-depth-2/baseline-1/turns/01/result.json) record code -1,
`complete: false`, `timedOut: true`, 900,055 ms, no external interruption,
spawn error or log error. The outer wrapper duration is 902,065 ms.
There is no retry or continuation.

The [complete saved stream](bench-depth-2/baseline-1/turns/01/stream.jsonl)
contains 145 events, 69 started commands, 65 completed commands and nine
agent progress messages. It has no `turn.completed` or terminal final
message. `reply.md` aggregates the nine progress messages, not a completed
handoff. Usage is null: actual tokens and cost are unknown, not zero.
The runner's generic `completionMeaning` sentence is not evidence of
completion when its actual completion flag and stream say otherwise.

Four command starts have no matching completion event:

| Event and raw line | Saved command scope |
|---|---|
| `item_30`, line 59 | `NEXT_TELEMETRY_DISABLED=1 npm run dev -- --hostname 127.0.0.1 --port 3000` |
| `item_74`, line 141 | Add `gl={{ preserveDrawingBuffer: still }}` in `components/story/scene.tsx`, then build/check reduced motion |
| `item_75`, line 142 | `npm run typecheck` |
| `item_76`, line 143 | `npm run lint` |

The source edit in `item_74` is present in the captured final source. Its
check directory's manifest remains incomplete with zero result entries.
The earlier successful actor matrix, tests, typecheck and lint therefore
do not establish validation of the exact final revision. `item_77`, line
145, is only a completed directory listing, not a completion signal.

## Integrity and source scope

[The read-only verifier](verify-actor-audit.mjs) passes and saves
[its derivative result](actor-audit-verification.json). It verifies all
124 frozen inputs, the exact set and hashes of all 367 saved turn artifacts,
both snapshot file sets and every source byte. Input digest:
`a127640464a9ba08a2beb62cdfa65941b2692c4d183ed71e9c397b7e34445353`.

The actual before-turn snapshot has 175 files; the final partial snapshot
has 184, with nine additions, 21 modifications and no deletions. The runner's
change list uses the earlier 174-file setup snapshot, so it additionally
lists inherited `docs/story/environment-setup.json`. That file was already
present before this actor and is unchanged, not actor-authored setup.

The live workspace, captured partial snapshot and frozen `captureSource`
inventory have identical file keys, sizes and SHA-256 hashes. Source digest:
`830d73920983268e04480dee830a5172a69a4077de80512a3d6e414d3439ecb7`.
This check is independent of the actor's local test claims. Independent
acceptance must separately verify the same source before and after capture.

Metadata-only checks find `.aws`, `.codex` and `.git` are nonsymlink empty
directories with zero entries. No credential contents were opened.
The first two remain unexpected-directory warnings without extra source
files. `.git` is the existing empty placeholder, not a valid actor commit;
the stream records failed Git status and no replacement metadata or push.
The standard generated exclusions are retained unchanged.

All copied `.agents/skills/storyfolio/` bytes, package/lock files, supplied
facts, confirmations, storyboard, environment facts and both supplied SVGs
remain unchanged. The neutral `scripts/review-sheets.mjs` remains unchanged,
SHA-256 `083a43dcefef6c6dec5aa20c9b3748671346898bf6122b9a9503ddfd130dcb51`.
The five changed core component files are explicitly included, not excluded
to manufacture equality. Unchanged core components and original `lib/`
files are individually verified; the new apparatus regression is an addition.

Audit identities:

- Raw stream: `557925f03775b30d13a10cf3bed4cda208cd1c5252a81f5742c191fca1b03e5d`.
- Actor result: `8dd3a7ae4b61df512ae02ae2817aa84fb5fc78a89d229208701fa59a8fe08d50`.
- Stderr: `4018d6c410bc99c4de6aa8060113f91d4f44eba19173a06145ad77925a822fda`.

The verifier's first attempt incorrectly expected only the three late
unmatched starts. It failed before writing a result, revealing the earlier
dev-server start too. The [original failure output](actor-audit-verifier-initial-error.json)
is preserved. Correcting this derivative expectation did not relax source,
artifact, timeout or completion checks or change raw evidence.

## Access and provenance

All saved started/completed command bodies and outputs were reviewed,
including inline programs, not merely search hits. No held-out solution,
accepted prototype, prior-run implementation, coordinator rubric or external
helper content read is observed in this record.

`item_2`, line 7, prints the entire 4,790-byte candidate
`.agents/skills/storyfolio/SKILL.md`, byte-equal to its frozen input. Both
new conditional build-review paragraphs are encountered before source
implementation. `item_3`, line 9, prints the supplied handover. `item_4`,
line 11, prints the full facts, confirmations, storyboard, assets,
evaluation-environment and README, also byte-verified. No routed skill
reference read is observed. This is an approved-storyboard build diagnostic,
not a fresh planning journey or a before-stop-1 test.

The supplied environment inventory explicitly says no complementary skill
is enabled and optional installation is refused. The actor reads it;
there is no observed optional-skill install, enable or fetch attempt.
An actual recommendation-followed-by-refusal branch remains untested.

The actor reads the supplied neutral screenshot helper at `item_21`, line
42; no invocation of that helper appears. Its supplemental review program
is locally authored in `item_43`, line 82, importing the current installed
Playwright and supplied `scripts/check-lib.mjs`. Inputs are captures of its
own runtime, not files from another cohort. `item_38`, line 74, reads the
first 65 lines of installed
`node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`.
The same event lists processes; the output exposes sandbox arguments and
its own shell/process names, not held-out source content.

The raw generated setup probe's coordinator stack-path exposure remains
the [prelaunch qualification](../stage-3-comparison-1/candidate-prelaunch-audit.md).
It was not removed, and no read of that raw probe appears in the actor
stream. Configuration isolation is not a filesystem read jail or proof of
impossible access. The saved stream also contains no image-open telemetry.
Image inspection claims cannot be independently proved from this format,
but absent image events do not establish that inspection was skipped.

`item_8`, line 19, attempts the prescribed `npm ci` and receives a registry
deny. `item_11`, line 24, shows missing local binaries after that attempt.
`item_13`, line 30, succeeds with the offline cache, installing 392 packages;
`item_15`, line 32, completes Chromium setup. `item_29`, line 58, reaches
Next dev readiness but its telemetry request is blocked. Stderr records the
registry and telemetry denials. No successful external asset fetch,
publication, message or live-mail action is observed. Both arms' actual
actor launchers record `NEXT_TELEMETRY_DISABLED` unset; this does not erase
the separately disclosed initial-installer variance.

## Actor-local adapters and final-revision limits

The input engine was matched and frozen, but the candidate's resulting
application is not the unchanged engine. These are actor-owned adaptations,
not coordinator fixes or changes to the shipped Storyfolio engine:

| Command evidence | Final source adaptation |
|---|---|
| `item_15`, line 32 | `components/story/face-material.ts` replaces texture interpolation with `step(0.5, storyAmount)` and changes its shader cache key. This changes label switching for this copied engine globally, not only a single content face. |
| `item_41`, line 89 | `components/story/types.ts` adds optional face aspect; `components/story/faces.ts` changes canvas dimensions and anisotropy. Defaults retain a fallback aspect but not the old texture resolution. |
| `item_58`, line 112 | `types.ts`, `conductor.tsx` and `scene.tsx` add a spread override; `content/index.ts` selects `stagger: 0`. Other stories' stagger default remains `SPREAD`. Content CSS disables caption fades. |
| `item_74`, line 141 | `scene.tsx` requests preserved drawing buffers in still mode. This is the last uncompleted source-edit/check command. |

The actor also changes local `scripts/check.mjs` to optional concurrency
up to three, defaulting to sequential, in `item_50`, line 109. The diff
retains the existing case execution/assertion path and changes scheduling
and save timing. `scripts/check-lib.mjs` and `scripts/shoot.mjs` are unchanged.
The starter's optional `content/checks.json` probes are cleared for the new
content, so a seven-case local matrix is not evidence that all optional
overlay/lazy-extra checks ran. The independent frozen checker is separate
and must not inherit an actor-local change or interpret these as its passes.

The added `lib/story/apparatus.test.ts` samples 21 synchronized positions
per adjacent transition. Its saved log reports 130 tests passing, zero
failures. This source-geometry check is not pixel review, general engine
regression coverage, or verification of the last rendering edit.

At `item_67`, line 129, the actor reports its earlier seven-case and
supplemental successes. At `item_71`, line 136, it explicitly says several
reduced-motion screenshots showed an empty scene despite automated
stillness passing, and withholds a visual-pass claim while investigating.
The focused diagnostic and later single reduced-only check are distinct
actor-owned observations. A stillness test can pass on empty pixels; none
of these reports resolves the final revision's visual quality by itself.

The handover written in `item_73`, line 139, preserves failures and the
reduced-motion concern. It predates the final drawing-buffer edit and
refers to a sequential diagnostic being recorded below without that update
arriving. Its phrase "focused independent" means another actor-owned
capture, not independent coordinator acceptance. Its final-pass wording
describes earlier commands, not successful completion of this timed-out turn.

## Factual boundary and archived checks

Source review finds the main copy and face labels preserve Ada's firmware,
scheduling and fixture versus the colleague's circuitry; measured-current
plus assumed-interval projection versus the observed 72-hour run; six of
forty samples and no customers; and preliminary emissions versus unfinished
qualification. The loop and apparatus are labelled illustrative. No new
numerical measurement, deployment, incident or recovered laboratory record
is found. This is a source finding, not a new factual score, pixel-legibility
verdict or author approval.

[The retained archival script](archive-actor-checks.mjs) first inventoried,
then copied 358 existing files, 55,326,634 bytes, into
[actor-checks](actor-checks/manifest.json), refusing symlinks and overwrites.
It also records four empty directories, including one nested unfinished
case. Each of the 16 selected tree/file roots maps to exact stream events.
Inherited `checks/setup-capability` is excluded because it is already saved
as coordinator setup evidence, not actor work. No generated dependency or
Next output tree was imported.

The archive preserves three interrupted sequential matrices, two complete
parallel matrices, the completed reduced-only diagnostic, the last partial
reduced-only attempt, supplemental captures and failed empty directories,
the focused reduced-motion captures, and both unit-test logs. Hashes bind
archival-time originals; ignored originals were not hashed by the runner's
source snapshot. The two reports copied by the actor into
`docs/story/review/` match their archived originals exactly. Unlike the
baseline, this actor did not copy the original PNG sets into source.

No failed artifact is replaced or reclassified as success. The timed-out
artifact remains assessable under the frozen rubric, which explicitly
allows partial turns, but is not a completed prototype handoff, evidence
of a general reusable build workflow, or Stage 3 acceptance. Independent
capture, complete judge preflight, text judgement and actual original-image
review retain their separate scope and lifecycle.
