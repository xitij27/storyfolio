# Shared-controls correction review

Independent source review on 11 October 2026, starting from
`39ceeb70e2b50b483678db12bec95f8f61d38836`. This is an engineering review,
not a paid actor run, skill evaluation, visual acceptance or transport fix.

## Cause and proposed correction

The shipped `components/story/story.tsx` creates one control store for the
story and passes it explicitly to the scene. Its context provider encloses
only HTML children. Consequently, a custom piece or lazy extra that calls
`useControl` or `useControls` cannot see that provider. The existing
preparation probe preserves the observed missing-provider error.

Move that same provider around the existing story root. Keep the single
`useState(createControls)` store, `sceneOff={!on}`, explicit scene and
overlay props, root element/ref and all boundary positions unchanged.
The provider adds no DOM element. There is no need for an extra store, an
extra-specific provider, a new dependency or a controls API change.

The installed `@react-three/fiber` 9.6.1 Canvas calls `useBridge` and renders
its scene through that bridge. The bridge calls `its-fine` 2.1.1's
`useContextBridge`, which collects ancestor providers and their live values.
This supports the provider placement, but inspection of the dependency
implementation alone does not prove production browser integration.

## Regression boundaries

- Scene and HTML hooks must receive the identical store, including the
  explicit store passed to custom extras. Otherwise each side could work
  in isolation while failing to communicate.
- Independent Story instances must still have independent stores. A
  process-wide provider or shared singleton would violate the contract.
- Controls subscriptions and values should survive ordinary look changes.
  An additional wrapper must not reset the store when the scene rerenders.
- Initial server rendering, no WebGL, scene failure and context loss still
  require `sceneOff` to be true for HTML consumers. Reduced motion leaves a
  functioning scene on, so is not equivalent to scene failure.
- `useControl` keeps its existing null server snapshot and missing-provider
  error. `useSceneOff` keeps its existing true default outside Story.
- Moving the provider does not expand React error-boundary coverage to
  timers, asynchronous callbacks or unguarded frame/event callbacks.

Focused local tests should check shared identity, updates in both
directions, independent stories and fallback state. The real production
browser proof must also exercise the actual Canvas bridge and lazy extra;
a substituted dynamic scene is only a useful unit-level regression.

## Final source review

The working-tree patch changes only three lines in the shipped Story:
the provider opens before the existing root div, no longer encloses only
`story-content`, and closes after the existing root div. No engine hook,
store implementation, scene code, boundary placement or dependency changes.
There is no blocking correctness or regression finding in this patch.

`context.test.mjs` uses the actual Story, controls hooks and store after
TypeScript transpilation, with a substituted scene and browser-detection
hooks. Its six cases cover exact scene-prop/context/HTML identity, both
server and unavailable-WebGL states, separate Story isolation, rejection
of an enclosing foreign store, and the existing missing-provider error.
The scene stand-in writes the shared store during the diagnostic render;
the HTML consumer reads that same store. This proves identity and direct
read visibility, not live React subscriptions or Canvas integration.
The real browser fixture separately exercises a custom Piece, a lazy
extra, HTML selection changes and a scene-originated write-back.

An optional test-strengthening suggestion was sent to the implementer:
assert the already recorded null `useControl` server snapshots explicitly.
That preserves a pre-existing hydration contract; it is not a discovered
failure or a reason to alter the implementation.

The retained context TAP logs show three expected failures before the
patch and all six cases passing afterwards. Independent manifest
comparison finds only `components/story/story.tsx` differs between the
baseline and patched engine copies. Both copies use identical fixture
hashes, and the patched Story hash matches the current shipped file.
Both production build logs end with exit 0.

## Independent browser evidence review

Both production-browser reports were reviewed alongside the saved probe
source. The baseline desktop and phone cases successfully reproduce the
missing-provider exception and remove the scene. Their `pass` means the
negative control behaved as expected, not that the old engine worked.
The patched desktop, phone, short, reduced-motion, no-WebGL, no-JavaScript
and context-loss cases all pass, with no page errors or external requests.

The live cases record the same store in HTML, the custom Piece, the lazy
extra and the extra's explicit prop. Pointer and keyboard selection change
the mesh material and all consumers. The scene write-back changes the
shared value after an intervening amber selection. Look switching keeps
the store identity and current value. The sibling Story uses another
store and changes independently. Reduced motion preserves the measured
world matrix during the stationary pointer test. Actual
`WEBGL_lose_context.loseContext()` removes the affected canvas while HTML
selection and keyboard interaction continue, with the sibling scene on.

An independent hash check found no mismatch in all 27 original images,
both source manifests, or either saved browser-probe copy. Both probe
copies also match the current probe file. The previous source-manifest
comparison establishes identical fixtures and only the intended Story
change between engine variants.

The following original images were opened independently:

- `patched/capture-1/phone/pointer-amber.png`: visible amber object and
  matching readable HTML selection, with the controls beneath the story.
- `patched/capture-1/phone/keyboard-blue.png`: visible blue object and
  matching selection, plus a visible keyboard-focus outline.
- `baseline/capture-1/phone/pointer-amber.png`: scene absent, selected
  HTML and fallback explanation still present.
- `patched/capture-1/context-loss/context-loss-fallback.png`: selected
  HTML and fallback remain, the first scene is absent and the sibling
  scene is still visible.
- `patched/capture-1/no-js/static-alpha.png`: no scene or unusable
  controls, readable first explanation and the beginning of the second.

Three measurement limitations were reported to the implementer:

- A generic check label says pointer selection updates the live scene and
  lazy extra even for baseline/no-WebGL cases. The actual probe correctly
  uses `live=false` there and checks HTML only. The saved label is not
  evidence of an unavailable scene update.
- Scene and extra data attributes remain as last-observed values after
  unmount. Post-loss conclusions use current `htmlSceneOff`, canvas removal
  and HTML interactions, not those stale scene attributes.
- The two no-JavaScript captures are identical because the second heading
  was already visible. They are not two separate complete fallback visual
  inspections; the image shows the second explanation only partially.

These limitations do not invalidate the narrow shared-controls regression
proof or call for another run. There is no blocking review finding.
This establishes the tiny fixture's software-browser integration, not a
physical-phone review, a portfolio-quality score or a paid evaluation.
