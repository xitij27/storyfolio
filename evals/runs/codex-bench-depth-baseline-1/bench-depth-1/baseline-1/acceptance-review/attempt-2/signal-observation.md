# Signal observed during the second attempt

The wrapper's `interrupted.json` records `SIGTERM` at
`2026-10-11T20:28:17.071Z`, wrapper PID 3941222, parent PID 2843635.
The installed handler recorded the signal and kept waiting for the unchanged
frozen checker. This was not an uninterrupted process attempt. The earlier
coordinator conversation update saying there was no signal record was stale
and incorrect; the parent coordinator noticed the saved record at about
20:39 UTC, and the acceptance reviewer then confirmed it directly.

The sender and reason are unknown. The retained process observation at
20:41 UTC shows wrapper PID 3941222, checker PID 3941237 and owned preview
PID 3941837 still alive. Case files and original images continued to grow.
This does not prove how the first attempt ended, and the later repository
test suite beginning around 20:31 cannot explain this 20:28 signal.
No actor source, checker, expectations or generated measurement output
was modified to obtain continued progress. No third attempt was launched.
