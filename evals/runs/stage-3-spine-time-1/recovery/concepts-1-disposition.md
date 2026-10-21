# Concept unit 1: stopped at startup on missing tooling

21 October 2026. The single recovered concept unit closed normally with
code 1 after 44 ms of worker time (recorder 1459 ms). No build, server,
browser or screenshot ran. The worker's first check, `realpath` on the
policy's trusted dependency root `/tmp/storyfolio-build-capability-20261011`,
failed with `ENOENT`: the 15 October host restart erased that folder too,
and [the tooling restore](../environment-restore-1.md) had missed it.
This is a coordinator setup omission, not actor or skill evidence.

Retained unchanged: [setup](concepts-1/setup), the unit's
[review records](concepts-1/units/concepts/review) (closure: source
unchanged, original preserved, no artifacts),
[recorder evidence](concepts-command) and the
[terminal record](concepts-tool-terminal.json). No signal, timeout or log
error. Reconstruction (189 files) and the offline install (392 packages)
both closed normally first.

## Repair

The folder was rebuilt with its recorded recipe
(`scaffold.mjs /tmp/storyfolio-build-capability-20261011`, then
`npm ci --offline --cache=/tmp/storyfolio-npm-cache`, 392 packages). Both
identities the frozen policy pins now match exactly: the Playwright
entrypoint `a58fb2cec4293e7dcf73c58a179898a4f3986666451a19da4e731fa3af63265b`
and the Next 16.3.8 CLI `e4c6cfdeac3c9e4e260d2a622d6af9565c49d8017c3d55e8dade07ed58fbe9de`.
A search of the frozen inputs, measurement helpers, runner and libraries
for every `/tmp/` path finds all real ones present; the rest are test
fixtures or the `/tmp` inside `/var/tmp` paths.

## One replacement

Root runs one replacement unit, `concepts-2`, with a separately hashed
binding and fresh output, and the same targets, adapter, bounds and
helpers. The no-retry rule prevents repeating a measurement until it
gives a preferred result. This unit produced no measurement at all, it
is no-model and local, and the author's 21 October answer ("Claude
implements now") covers running the browser check. Root records that
reasoning here rather than asking again; the author can overrule it.
If the replacement fails for any reason, it stays failed and root asks.
