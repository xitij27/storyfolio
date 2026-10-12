# Replay operations

The committed helper README names `setup/runtime-environment.json`, but the
reconstruction writes its environment in `setup/reconstruction.json`.
Root used that actual record and the original frozen capabilities, with
`NEXT_TELEMETRY_DISABLED` explicitly unset for installation. The six-field
install environment is independently checked against the historical install
by the capture helper. No bound helper was changed after reconstruction.

Two read-only display commands initially requested nonexistent paths:
`reconstruction-command/stdout.txt` (the recorder uses `stdout.log`) and
`setup/runtime-environment.json`. Both returned exit 2, changed no file and
launched no build or browser. Reading the actual reconstruction record
resolved the naming mismatch. This is not an install or capture retry.
