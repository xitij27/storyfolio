# Calibration build closure audit

Read-only audit on 12 October 2026. No browser, build, tests, signals or
cleanup were launched by this reviewer.

The separate build calibration closed normally. The bounded worker ran
from 04:34:22.931Z to 04:34:32.952Z (10,021 ms), returned code 0 and retained
no timeout, external signal or spawn error. Its lifecycle is exactly
spawn-request, spawned, exit and closed. The outer recorder closed at
04:34:32.992Z after 10,157 ms, also code 0. The tool terminal record agrees.
Type generation, type checking, lint and build each returned code 0.

At 04:37:56.328Z, a same-UID `/proc` metadata scan examined 77 processes and
2,034 readable descriptor links. There were no cwd or fd ties to the exact
workspace `/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/journey-calibration-5yt94U`
or this study's `build/` and `build-command/` directories. PID 372's cwd and
45 fd links, and PID 374's cwd and fd directory, were inaccessible with
EACCES. No process arguments, environment or descriptor contents were read.
The bounded wrapper PID 226601 and worker PID 226619 were both absent
(ENOENT) at 04:38:21.846Z. This is a scoped observation, not proof that an
escaped descendant with a different cwd and no scoped descriptors cannot
exist. The no-ties observation was sent to root before its next unit launch.

The manifest records complete, passed, source unchanged and build unchanged.
Its before/after source inventories each retain 86 files, digest
`1c499ad1346aa437d5701993b7b71f1b60cc35670e9afe0b7c76d48a1c18a060`.
All eight artifact hashes and both outer raw-log hashes verified; the outer
tool result was checked against the saved recorder result plus its expected
output-directory field. This is local no-model calibration, not an actor
run, final browser pass, journey gate or Stage 3 completion.

The preceding [gate audit](gate-process-audit.md) separately establishes its
normal closure and intended count-negative result. This build began at
04:34:22.835Z, after that gate's no-ties check at 04:33:43.311Z. It was not
evidence of a leaked gate process.

Evidence: `build/review/{result.json,lifecycle.jsonl}`,
`build/artifacts/manifest.json`, `build-command/result.json` and
`build-tool-poll-1.json`. Read-only inspection tool chunks were `d25c2b`
(metadata scan and retained records) and `feeb8b` (hash/result verification
and known-PID check).

SHA-256 checkpoint:

- Manifest: `ef024afde05ac2d9d44709cc1771e6bd39e090fc93c0d35e3df5634e0defcea3`.
- Worker result: `9055f4092c2bb7a7de3d85094773cf52e9d4e14093101690f40c6fbd69e05f23`.
- Worker lifecycle: `b45ae0e40e6cad59b98eff3cfb15891ddb6fa3dbbec691be33021a8f13e65be9`.
- Outer result: `16236e2780ddf6199defa453d2ca1aebbaa5304a522fbefebe08c5afd7a6cced`.
