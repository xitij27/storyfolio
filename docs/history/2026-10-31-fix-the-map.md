# Fix the map before the paid run, 31 October 2026

The author asked again, verbatim:

> what else is left to complete this skill

Root read the [next steps](../handover.md#next-steps) written on 28
October and found none of them started, and GitHub's `main` already at
`bf8580b0` (the README commit). It listed the steps in order and asked the
two questions still open: fix the three map problems before plan 3's paid
run (root recommended yes), and then launch plan 3. Found on the way: on
the WSL machine `/usr/bin/node` is Ubuntu's 22.22.1, built without
TypeScript support, so the 26 `.ts` test files cannot load there.

The author answered, verbatim:

> yes fix the map before the paid run.

So root takes up [step 1](../handover.md#1-fix-the-map-for-dawits-places-no-paid-run-recommended-first):
"where from" frames every place, close places neither collide nor hide
each other, and the tallest building and its name stay in the frame.
Plan 3 itself is not yet approved: it waits for the author's word after
the map is fixed.

To run the tests on this machine, root installed the official Node
24.14.0 (checked against nodejs.org's SHA-256 list) in
`~/.local/opt/node-v24.14.0-linux-x64`, outside the system packages. With
it first on `PATH`, all 415 tests pass.

## Done

Root fixed the three problems and three more the shots showed on the way,
and recorded how and what was checked in
[stitch-3](../../evals/engine/stitch-3/README.md). No run and no push.
Plan 3 still waits for the author's word.

## Steps 2 and 3, then plan 3

Root reported the fix and recommended the two wording fixes (step 2) and
the live gallery check (step 3) next, both small and free, and asked:
"Shall I do those, and then launch plan 3, the paid person test?" The
author answered, verbatim:

> yes

Root reads this as yes to steps 2 and 3, and then to plan 3: writing it,
and launching its paid run on person test 2's fixture as the handover's
step 4 describes.
