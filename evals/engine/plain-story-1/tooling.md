# Tooling implementation and local checks

Implemented on 11 October 2026 as part of the stage 2 engine extraction.
The screenshot script is adapted from the source revision recorded by the
engine provenance. No model evaluation conversation was made.

The scaffold preflights every output path before writing, allows existing
`docs/story/` notes, excludes generated dependency/build/check directories,
and rejects symbolic-link ancestors. Its four local cases cover an empty
destination, existing story notes, a conflict that prevents every write,
and a symbolic-link ancestor that must not be followed.

The screenshot checker retains V3's options and adds genuine request-failure
events, explicit expected beat IDs, look assertions, start/middle/end
captures, stationary reduced-motion canvas comparisons, WebGL context loss,
keyboard overlay access and a blocked lazy-chunk probe. Empty ignore values
mean no exception. Three local checks cover that regression, bounded
intentional request exceptions and independent story-contract expectations.

The production coordinator builds and starts Next.js on an available local
port, saves child logs and per-case reports, records partial case selection
explicitly, and stops child process groups without a broad process-name
kill. Its browser matrix is runtime evidence only when actually executed;
the script's existence is not a passing engine result.

Checks run from the repository root:

```text
node --test skills/storyfolio/scripts/scaffold.test.mjs skills/storyfolio/engine/scripts/check-lib.test.mjs
node --check skills/storyfolio/engine/scripts/shoot.mjs
node --check skills/storyfolio/engine/scripts/check.mjs
node evals/check-skill.mjs
```

All passed at this checkpoint. The test runner reported two passing test
files, containing the seven named cases above, and no failures. The skill
checker reported the unchanged 687-word skill and four references. Engine
installation, lint/type checking, production build, browser observations
and the author's scrolling review are recorded separately in this folder's
final findings when performed.

## Scaffold help correction

During the same work, this command unexpectedly copied the engine into a
literal repository-root directory named `--help`:

```text
node skills/storyfolio/scripts/scaffold.mjs --help
```

The CLI had treated every single argument as a destination. It now handles
`--help` and `-h` as successful help requests, prints usage and writes
nothing. Unknown leading-dash arguments and invalid argument counts print
usage and exit with status 2 without writes. A real destination whose name
starts with a dash can be specified with an explicit `./` prefix.

Before cleanup, `diff -qr -- ./--help ./skills/storyfolio/engine` returned
status 0 with no differences. Its 76 files were therefore confirmed as the
accidental engine copy. Only that root `--help` directory was removed;
the engine source was unchanged by this correction.

Two CLI regression cases now check both help spellings and unknown flags,
missing arguments, and extra arguments. They assert exit status, usage
output, and an unchanged destination directory listing. The existing four
scaffold cases remain in place.

The initial sandbox run could not capture child Node processes:
`spawnSync /usr/bin/node EPERM`. This was an environment restriction, not
an accepted test result. After approved execution outside the sandbox,
`node --test skills/storyfolio/scripts/scaffold.test.mjs` passed all six
named tests. Running `node skills/storyfolio/scripts/scaffold.mjs --help`
directly also printed usage and exited successfully without recreating the
directory. No model conversation, engine change or commit was part of this
CLI correction.
