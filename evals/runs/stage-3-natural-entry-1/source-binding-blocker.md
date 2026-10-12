# Browser precondition blocked, no capture launched

The authored application exists and is eligible in principle. It is not a
no-output skip. The frozen launcher's exact source inventory gate fails:

- Current frozen-policy capture: 198 files, digest
  `92a06e202ec4267481e2a353ccbc85a92f316dec3f85fbf6bc467141a0ae33c9`.
- Retained actor snapshot: 180 files, every saved hash and size matches the
  current application. There are no missing or modified retained files.
- Derived retained-source digest in frozen capture order:
  `fea7a2ef704fa6c30e3d6d1477a39b911fa06961b54560f8f0bca90f3c1403c3`.
  The runner snapshot has no native digest field; this derived digest is
  explicitly not a claim of whole-current-workspace identity.
- Eighteen extra `.git-local` files are included by the frozen capture but
  not the runner snapshot. [The blocker record](source-binding-blocker.json)
  lists every path, size and SHA-256. [The full discovery inventory](source-discovery.json)
  retains all 198 entries and each source/reply binding.

The actor's completed `item_47` command initializes
`git --git-dir=.git-local --work-tree=. init`, following its ordinary Git
initialization attempt and explanation that `.git` was read-only. Its source
handover records the same workaround. This supports actor provenance for the
metadata but does not authorize changing the frozen exclusion policy.
`.aws` and `.codex` are unexpected directories with no files in this capture.
This reviewer did not open or print credential contents; the independent
metadata/access audit retains its own detailed findings.

The original source gate is preserved as blocked. No browser was launched,
no output failed browser check was manufactured, and no frozen file,
application byte, snapshot or workspace metadata was changed. The actor still
timed out without a completed final delivery.

## Prospective remedy, requires separate approval

A distinct measurement-only baseline could reconstruct the saved 180-file
application snapshot in a new disposable workspace, preserve those exact
bytes, and verify them before and after one bounded capture. Its new
coordinator binding would explicitly name the restored-source scope and
the omitted, unretained actor-created metadata. It would reuse the frozen
narrow worker/expectations and trusted environment where supported, not
patch the original frozen launcher or pretend the original gate passed.

This needs explicit approval for the separate setup and capture, a fresh
recorded envelope, no actor continuation, no paid judge and no retry. No such
restoration or capture has been performed. Any resulting evidence would
describe the saved application only and would not erase the actor timeout,
missing final look-choice handoff or original exact-inventory blocker.
