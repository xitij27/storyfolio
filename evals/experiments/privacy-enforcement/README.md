# Private-file read controls

This opt-in experiment uses the installed Codex CLI to execute deterministic
shell reads inside an explicit permission profile. It does not invoke a
model, modify the ordinary evaluation harness or change user configuration.
The complete fictional PhD material is copied before the profile starts,
including the private export. Source and copy hashes are recorded again
after the probes. Existing result labels cannot be overwritten.

```bash
node evals/experiments/privacy-enforcement/run.mjs <new-label> public-only
```

`public-only` grants the two public documents and a public symlink, plus
minimal system/runtime paths. It denies the private file explicitly. The
profile also leaves the original repository fixture outside its readable
mounts. Twelve probes include startup and public controls, inventory,
private `head`, batched and broad `cat`, symlinks, a pre-existing hardlink
and absolute paths. A startup failure stops the probe; it never counts as
privacy protection.

For reproducing the rejected comparison, explicitly choose `deny-private`
instead. Its broad workspace read grant and exact private-path denial let
the pre-existing hardlink expose the fictional private data. It is retained
to show why that simpler profile is insufficient.

Running a nested sandbox can require permission to execute outside the
parent sandbox. The script does not retry unsandboxed, change permissions,
install packages or invoke a model. Use the normal approval mechanism;
each invocation still applies its own read-restricted, network-disabled
Codex profile.

Results are [saved separately](../../runs/codex-privacy-enforcement-1/findings.md).
Verify those artifacts without launching anything:

```bash
node evals/runs/codex-privacy-enforcement-1/verify.mjs
```

This proves specific shell read outcomes on the tested Linux/CLI setup.
It is not yet a model-harness integration or a portable security guarantee.
The skill cannot activate the profile. Trusted input selection, a separate
writable output directory, skill access, fresh session setup and disabling
alternative read-capable tools must be handled by a future runner before
testing portfolio conversations under it. Do not replace the old failing
privacy benchmark with these deterministic checks.
