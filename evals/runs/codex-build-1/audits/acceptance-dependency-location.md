# Acceptance dependency-location diagnostic

11 October 2026. This is a coordinator integration diagnostic, not a paid
conversation, actor source change or new Storyfolio instruction.

The first independent stop-4 spine check used tool dependencies from
`/tmp/storyfolio-build-capability-20261011`, while building the actor project
at `/tmp/storyfolio-evals/build-embedded-1-GoHJ5r`. Its fixed type generation,
typecheck and lint passed, but Next prerendering failed on `/_global-error`
with `Invariant: Expected workStore to be initialized`.
The [original build log](../embedded-1/baseline-1/spine-acceptance/result/build.log)
and [manifest](../embedded-1/baseline-1/spine-acceptance/result/manifest.json)
are preserved unchanged. The actor had already reported a successful local
build using its own installed Next CLI.

## Read-only source evidence

Both installed Next copies report version 16.3.8. Their package metadata,
CLI entrypoint and storage-module files have identical bytes but different
absolute paths and inodes. Relevant SHA256 values, equal in both roots:

| File beneath `node_modules/next/` | SHA256 |
|---|---|
| `dist/bin/next` | `e4c6cfdeac3c9e4e260d2a622d6af9565c49d8017c3d55e8dade07ed58fbe9de` |
| `dist/server/app-render/work-async-storage-instance.js` | `3f75d13327ea5b38716db2e4ed8b920a12813b7443d706352a28be4e3e25857c` |
| `dist/server/app-render/work-async-storage.external.js` | `ffadd3c957815dfb9a6dec2e5cb85b203659d0b8886f155b2e3c221dcb877455` |
| `dist/server/app-render/async-local-storage.js` | `e7fec2a3a92aab8b4e2b894aca4c04a7cf749d4f1b608c9f29e4840ecce25e76` |

The following locations were inspected in the installed primary source:

- `dist/server/app-render/work-async-storage-instance.js:11-12` imports the
  storage factory and constructs `workAsyncStorageInstance` when this
  module loads. It is a module instance, not a shared global store.
- `dist/server/app-render/work-async-storage.external.js:5-11` exports the
  storage instance from that physical copy's sibling module.
- `dist/export/worker.js:17` requires its own `../server/load-components`.
- `dist/server/app-render/app-render.js:1853` initializes rendering with
  that renderer copy's `workAsyncStorage.run(workStore, ...)`.
- The actor-generated SSR chunk
  `.next/server/chunks/ssr/[root-of-the-server]__11adyvz._.js:1` and its
  sibling chunks explicitly require
  `next/dist/server/app-render/work-async-storage.external.js`. Normal
  resolution from those files selects the actor project's Next copy.
- The generated `.next/server/chunks/ssr/[root-of-the-server]__0rj-c_c._.js`
  contains the failing guard: it obtains the current work store and throws
  this invariant if the result is absent. Generated chunk names describe
  the inspected failed build, not a stable public interface.

The actor's `next.config.ts` is the ordinary empty Next configuration;
`app/layout.tsx` supplies metadata, language and body content. This inspection
found no application customization that explains the cross-root behavior.

## Inference and controlled follow-up

The probable cause is two physical Next module identities: the external
build worker initializes one storage instance while the generated actor
code reads another. Identical file hashes do not make two loaded module
instances share async-local state. This is a source-backed explanation,
not a traced assertion about every internal stack frame.

The root coordinator started the same unchanged checker and same partial
spine expectations using `--dependencies` set to the actor workspace, with
tool entrypoint integrity checked separately. This changes the physical
dependency location; it does not substitute the actor's package scripts or
checker for the independent implementation. The new diagnostic output is
`/tmp/storyfolio-spine-local-deps-codex-build-1`, to be copied into the saved
spine-acceptance evidence when complete.

The local-dependency diagnostic's production build passed at
`2026-10-11T02:05:55.202Z`, after starting at `02:05:52.542Z`. Browser cases
were still running at the first inspection. They subsequently completed;
the [preserved local-dependency result](../embedded-1/baseline-1/spine-acceptance/local-deps-result/manifest.json)
records all six cases and keeps their raw failures. The
[desktop/mobile review](../embedded-1/baseline-1/spine-acceptance/visual-spine-desktop-mobile.md)
distinguishes strict link-name matching and an unvisited-beat expectation
from actual actor failures. The successful build supports
the dependency-location explanation, but is not a blanket browser or
full-site acceptance pass. The normal metadataBase warning remains a
separate deployment-related limitation.

The failed external-dependency check must remain in the record and must
not be counted as an actor skill failure. The current cohort's checker
source and frozen inputs are unchanged. Any durable change to how future
acceptance resolves dependencies belongs in a separately tested harness
revision. Path identity and matching entrypoint hashes still do not prove
the integrity of every installed dependency; the coordinator's source and
dependency provenance checks remain necessary.
