# The turn-1 browser-check folder is moved out

As in rerun 3, the turn-1 agent's browser check left `.local-checks/` (10
files: a browser log and font caches) outside the snapshot roots, with no
process remaining. Root moved it intact to
`/var/tmp/storyfolio-entry-runtime-20261012/storyfolio-evals/meaning-4-local-checks-relocated/.local-checks`;
the hashes taken before the move ([sha256](local-checks-relocation.sha256))
all verify there, and the workspace inventory equals the turn 1 snapshot.
No model call was made.
