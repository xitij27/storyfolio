# Independent build acceptance

The coordinator runs [check-build.mjs](../check-build.mjs) after the actor
has stopped. Its implementation, [pure helpers](../lib/build-check.mjs),
fixed fixture expectations and their hashes are frozen before the first
actor turn. They stay outside the writable actor workspace. This is a
measurement tool, not an instruction added to Storyfolio.

```sh
node evals/check-build.mjs \
  --workspace=/absolute/actor/workspace \
  --expectations=/absolute/coordinator/expectations.json \
  --out=/absolute/coordinator/check-output
```

The workspace already needs the engine's pinned dependencies and Chromium.
This command installs nothing. `PLAYWRIGHT_BROWSERS_PATH` selects an existing
browser cache. `--browser-executable=/absolute/chromium` selects an existing
browser executable. Optional `--dependencies=/absolute/dependency-project`
resolves the known tools from another project; otherwise the workspace's
installed dependencies supply them. The output directory must be new;
earlier passed and failed measurements are never overwritten. Node must satisfy the engine's native
TypeScript requirement. The run harness records the environment and browser
version alongside preparation evidence.

## Expected facts and observed facts

Version 1 expectations contain `id`, local `route`, ordered `beats` with
fixed `id` and `heading`, exact `requiredText`, `links` with `text` and
`href`, workspace-relative `assets`, optional `requiredFiles`, desktop and
mobile `viewports`, and five declared `modes`: desktop, mobile,
reducedMotion, noWebGL and noJavaScript. Modes are `animated` or `static`;
the last two must be static. Links which are intentionally hidden until
keyboard focus use `keyboardOnly: true`. Metadata may also record chapters,
checklist, contentConstraints and provenance. These metadata fields inform
the judge; they are not silently promoted into automated assertions.

The checker never imports the actor's story definition, checker or package
scripts as expected truth. It checks actual `[data-beat]` order, readable
headings and wording, `.story[data-scene]`, visible canvases, duplicate IDs,
document language, one h1, horizontal overflow, anchor destinations and
usable links. Every required link must be visible, within the viewport,
focusable and reachable by a pointer at a sampled location, or actually
focused during the keyboard pass for a keyboard-only link. Merely placing
an invisible anchor or hidden approved text in the DOM does not pass.

The six cases are desktop, mobile, reduced motion, no WebGL, no JavaScript
and loss of a running desktop WebGL context. The last case is applicable
only when desktop mode is animated. Each beat is sampled at its start,
middle and end. Animated positions follow the frozen engine's 0.4-viewport
travel contract using observed block geometry; the checker does not import
the actor's timeline helper. Images retain the middle and animated arrival states.
Static cases demonstrate the independently declared fixture mode; they do
not claim every story must use the engine's default reduced-motion mode.
If reduced motion retains a canvas, stationary image hashes must match.

Raw response HTML, rendered HTML, actual observations, screenshots, console
warnings, page/console errors and failed requests are saved per case.
After the server stops, the final manifest hashes every evidence file,
including binary screenshots, without trying to hash itself. The judge
verifies these hashes before consuming the reports.
External resource requests fail rather than quietly escaping the local
probe. The only expected failed request is Chromium blocking a same-origin
Next script preload by CSP with JavaScript deliberately disabled. The
exception checks resource type, error, origin and exact path shape.
Required public assets and local URL links must return HTTP 200. External
email/web destinations are recorded, not contacted.

## Build diagnostics and trust boundary

The command runs fixed dependency entrypoints for `next typegen`, TypeScript
with a coordinator-generated strict configuration, ESLint with a
coordinator-generated Next configuration and `--no-config-lookup`, and
`next build`. Build, typecheck and lint stay separate from content/visual
judgment. Replacing `npm run check` or a package script with `exit 0` cannot
make these commands pass. The checker starts and stops its own production
server and does not accept a pre-existing actor-selected server.

Next executes application configuration while building. Tool entrypoint
hashes are recorded, but those files import other installed files. The
harness must preserve the original lockfile and detect dependency mutations
across turns; entrypoint hashes alone cannot prove dependency integrity.
Outside-workspace checks reject obvious nesting and resolved symlinks, but
filesystem containment is enforced by the actor sandbox, not these path
checks. The actor is stopped before acceptance because application code is
being executed in the coordinator's local build/browser environment.

This tool does not prove the 3D formations are faithful, the custom object
is convincing, every unsupported claim is absent, or captions are good.
The independent judge receives the frozen facts, approved storyboard,
source changes, conversation and these observations. A person reviews the
saved images. Chromium viewport emulation is not a physical phone or a
performance measurement. The run's manifest retains these limits.

## Local regression checks

`node --test evals/lib/build-check.test.mjs` exercises malformed expectations,
missing/reordered beats, hidden/occluded/unfocusable links, keyboard-only
links, wrong static-mobile behavior, invisible wording, failed context-loss
probes, request failures, precise CSP exceptions and tampered actor scripts.
A local plain-story smoke run separately checks the executable integration;
it is a checker test and is not an embedded baseline or paid conversation.
