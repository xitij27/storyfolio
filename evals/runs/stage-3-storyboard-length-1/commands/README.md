# Measurement command records

The first tool launch failed at the recorder's parent-directory check,
before an operation directory or child process was created. Its exact
failure remains in `../operation-00-tool-launch.json`.

Root checked that `commands`, `control` and `concepts-1` were absent and
read the recorder's source: the failing realpath precedes exclusive mkdir,
the start timestamp, logs and spawn. This file creates only the missing
log parent. Starting operation 00 after that setup repair starts the single
previously unstarted measurement. It is not a retry of a build, browser,
install or model call. No frozen helper or limit changes. The initial
launcher failure is not counted as passing measurement evidence.

Each operation directory remains exclusive. Actual outer closure and
terminal evidence are required before any following operation.
