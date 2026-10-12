# Independent entry-candidate setup audit

At `2026-10-12T03:45:07.363Z`, the read-only audit passed. No setup,
test, build, browser or model was launched by this reviewer. Shared runner
source remains unchanged and held until the actor actually launches.

The candidate has 133 verified frozen inputs, digest
`5cb0491da31d429b09082c298f475546c1ec10ccc003cafa1bb037aea5e309e9`.
The independently recomputed complete delta agrees exactly with
[frozen-delta-tool.json](frozen-delta-tool.json): three coordinator helper
paths replaced, `skill/references/building.md` added, and four common paths
changed (`capabilities.json`, `case.json`, `skill/SKILL.md`,
`skill/references/concept.md`). All other frozen hashes match the 132-input
baseline, including fixture, prompt, engine/lock, measurements, shared
runner, rubric and protocol. Every candidate frozen implementation still
matches its current source file.

The case differs only in the three helper paths. Earlier independent
four-file diff review, preserved in [README.md](README.md), found those
helpers mechanically equivalent except cohort names, path depth, bindings
and comments. No broad runner/schema change is in this comparison.

Capabilities match apart from the disclosed additional disabling of both
path forms of `meeting-notes-and-actions` and the corresponding
`skills.config` argument. All other arguments, model, CLI, Node, permission
settings and four environment fields match. The actual install command's
recorded environment, including unset `NEXT_TELEMETRY_DISABLED`, also
matches the baseline. The prior strict comparison failure and root's
qualified disposition remain in
[capability-drift-disposition.md](capability-drift-disposition.md).
This is not an entirely byte-identical control.

The workspace is exactly
`/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/build-bench-entry-1-Ivff90`.
All 177 preparation snapshot files and their retained copies match their
hashes/sizes, both before and after capability capture. The live source has
those same 177 files plus only `docs/story/environment-setup.json`, for 178
files and no unexpected inventory entries. That extra file is byte-equal
to retained neutral setup facts, explicitly says `actorPreflight: false`,
and contains no repository path. The run directory still contained only
`meta.json` and `setup` at this audit, with no actor turn.

All 26 probe evidence paths, byte counts and hashes match; all three
coordinator helper hashes match current and frozen copies. All nine unique
original PNG paths match the setup copies, live generated originals,
inventory and retained review attestation. Root's actual original-detail
viewing is attested in `setup/capability-visual-review.md`; this reviewer
verified its binding and did not repeat or claim that visual review.
Repeated image hashes at two stationary end samples are retained, not
misreported as nine distinct image contents.

Dependency installation and capability capture both closed with code 0;
the capability process did not time out. The saved readiness command
closed with code 0 and its stdout says `verified: true`. Root owns outer
tool settlement, final commit and the single paid actor launch. Setup
success is not actor preflight, reached appearance handoff or Stage 3
acceptance. The raw generated external-request stack still exposes its
frozen implementation path, so this is configuration isolation, not a
filesystem read jail; actual actor reads remain to be audited.

## Binding checkpoint

| Artifact | SHA-256 |
|---|---|
| `setup/probe.json` | `b409303ab1c612359b84797840e91e98ceb154147e9d059ea5d4c243ffcff692` |
| `setup/snapshot/manifest.json` | `1210b010d003d6cdd546e1e847dc8940cd119c1d77c795802a6266beb9a934a3` |
| `setup/capability-visual-review.md` | `e9d908117f44b4f5ea815ea44b81b4601e4336390ec1e7aac72b40556925a14f` |
| `readiness/stdout.log` | `b7e2370233459eb6dfad1a4d112ee9d9368ab48b60030209b594a9ced72b3290` |

Audit execution used native Node v22.22.1 with read-only filesystem/hash
assertions and no child processes. Tool chunk `30545f` exited 0. An earlier
attempt, chunk `a0e6f5`, exited 1 because the reviewer's literal expected
order of the two added disabled-skill paths was reversed. It observed the
same two exact paths, wrote nothing and did not reveal input drift. The
successful assertion compares this explicitly unordered path set in
sorted order; no setup/frozen bytes or acceptance guard were changed.
