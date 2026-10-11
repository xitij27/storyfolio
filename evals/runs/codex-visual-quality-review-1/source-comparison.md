# Original V3 and completed demo: source comparison

11 October 2026. Read-only source review following the author's rejection of
the demo's visual quality and request to compare it with
`/home/kshitij/projects/portfolio-website`. This review explains specific
implementation differences. Browser observations and the resulting plan
decisions are separate work.

The criticism is supported by the source. The completed demo presents six
rigid, thin text strips with modest rearrangements. V3 gives its paper object
changing shapes, spatial compositions, detailed surfaces and interactive
exhibits tied to its subject. Rendering text strips through WebGL does not
recover that experience. The demo does contain 3D meshes, but their existence
does not establish the richness or object identity the author expected.

## Sources and scope

- Original V3: `/home/kshitij/projects/portfolio-website`, HEAD
  `163b8ceb302b7b4e5beeff8f1161f4cdc7663b15`. Read its `AGENTS.md` first and
  consulted its V3 handover. `git status --short` was empty for the reviewed
  `components/paper`, `lib/paper` and `app/[locale]/page.tsx` paths.
- Shipped engine: `skills/storyfolio/engine/`, Storyfolio HEAD
  `48fdf5ec4cc08886dbaf16ec45d5c8242209c362` at inspection.
- Demo: the saved final snapshot under
  `evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/`.
  This review did not use the mutable actor workspace.
- Original private resumes, PDFs and secrets were not opened. No dependency
  installation, model call, evaluation run or original-site change was made.
  Source inspection cannot establish frame rate, visual legibility at every
  viewport or the quality of a running transition.

In the evidence below, **O** means original V3, **E** means shipped engine,
and **D** means the saved demo. Links identify the precise file and starting
line. Original paths are external local references, not copied source or
public URLs.

## What produces the difference

| Aspect | Original V3 | Saved demo and consequence |
|---|---|---|
| Object geometry | Each page is a 12 by 24 segment grid. `writeSheet` bends its vertices with curl, twist and optional relief. The page renderer also wraps those same vertices onto the globe and recomputes normals. [grid and bend](/home/kshitij/projects/portfolio-website/lib/paper/sheet.ts:14), [vertex calculation](/home/kshitij/projects/portfolio-website/lib/paper/sheet.ts:108), [deformation in renderer](/home/kshitij/projects/portfolio-website/components/paper/pages.tsx:486). | D supplies no custom `Piece`, so it uses E's box of thickness `0.045` plus a printed flat plane. Position, rotation and width/height change, but the surface does not bend or become a different shape. [D bundle](/home/kshitij/projects/storyfolio/evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/index.ts:10), [E default geometry](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/components/story/pieces.tsx:19). |
| Spatial narrative | The paper starts closed, opens into an arc, wraps into a globe, becomes desk sheets with floating points, edge-on network layers, horizontal software tiers, a sound landscape, picture tiles, a maze floor and project/result displays. These are geometrically distinct uses of the same object. [O formations](/home/kshitij/projects/portfolio-website/lib/paper/formations.ts:262), [globe construction](/home/kshitij/projects/portfolio-website/lib/paper/globe.ts:5). | Four beats use the same six-row table family. The other arrangements are two columns, a slightly tilted bench variant and three pairs of labels. Individual rotations are zero except the bench's small `-0.06` pitch. This yields changes in layout, with little change in physical character. [D formations](/home/kshitij/projects/storyfolio/evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/formations.ts:8). |
| View and motion | O changes pitch, yaw, camera distance, floor height and composition across beats. Its desktop scenes can sit above the copy. The speech view moves from overhead towards the front; opening pages follow individual flights. [O sound view](/home/kshitij/projects/portfolio-website/lib/paper/formations.ts:412), [opening flights and flex](/home/kshitij/projects/portfolio-website/components/paper/pages.tsx:474). | Every D formation uses anchor `[.45,.02]`, `near:5` and `floor:-4`. It inherits zero drift, zero sway and `over:0`. Only the first and last beats provide a `within` formation, changing row depth by `0.045` per row. Automatic fitting still changes camera distance, and engine pointer tilt still exists, so the result is not literally motionless. [D formation helper](/home/kshitij/projects/storyfolio/evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/formations.ts:4), [E defaults](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/lib/story/formation.ts:79), [E camera and pointer](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/components/story/pieces.tsx:63). |
| Surface information | O has distinct cover, chapter, map gore, data, layer, tier, sound, tile, maze, project plate, result, statistic, quotation and reference renderers. Its cover includes typographic hierarchy, abstract, figure and contents. This creates subject-specific detail at several scales. [O print dispatch](/home/kshitij/projects/portfolio-website/components/paper/prints/store.ts:49), [cover composition](/home/kshitij/projects/portfolio-website/components/paper/prints/cover.ts:11). | All 42 D faces use one formula: background, vertical rule, bottom rule, row number and a single line of text. The labels change, but their graphic treatment does not. There is no face image source or chart renderer. [D faces](/home/kshitij/projects/storyfolio/evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/faces.ts:13). |
| Light, materials and grounding | O's paper/night looks have differing light balances, curl and visible rims. The optional glass look uses a physical clearcoat/emissive material, a locally constructed light environment and a reflecting floor. Its matte floor also has a softened disc edge; fog provides depth. These details support lighting and depth even without imported model files. [O looks](/home/kshitij/projects/portfolio-website/lib/paper/looks.ts:79), [material branch](/home/kshitij/projects/portfolio-website/components/paper/sheet-material.ts:33), [stage](/home/kshitij/projects/portfolio-website/components/paper/stage.tsx:66), [floor](/home/kshitij/projects/portfolio-website/components/paper/stage.tsx:181). | All three D appearances use roughness `1`, `glows:false`, identical light intensities and `floor:"none"`. Their principal differences are colors. Shadow casting is enabled, but there is no ground to catch shadows, and the rows are largely separate and near frontal. [D looks](/home/kshitij/projects/storyfolio/evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/looks.ts:2). |
| Working exhibits | O adds route arcs and markers, floating data points, network connections and stack indicators. Its speech exhibit changes vertex relief and textures with noise; its maze grows walls and animates the explored cells, route and robot. Its color exhibit changes an image seam. [O scene assembly](/home/kshitij/projects/portfolio-website/components/paper/scene.tsx:112), [speech](/home/kshitij/projects/portfolio-website/components/paper/extras/speech-exhibit.tsx:106), [maze](/home/kshitij/projects/portfolio-website/components/paper/extras/maze-exhibit.tsx:156), [color](/home/kshitij/projects/portfolio-website/components/paper/extras/colour-exhibit.tsx:36). | D has `extras=[]` and scene `links=[]`. Its teaching diagrams are static HTML images beside the copy. The transition beat rearranges words into a loop; it does not show an operating mechanism. [D extras](/home/kshitij/projects/storyfolio/evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/extras.ts:1), [links](/home/kshitij/projects/storyfolio/evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/content/links.ts:1), [diagram rendering](/home/kshitij/projects/storyfolio/evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/app/page.tsx:6). |
| Controls and content rhythm | O pairs chapter content with globe turning, noise adjustment, image comparison, maze replay, project links and flat figure alternatives. It includes project displays, results and review sections with different content treatments. [O background](/home/kshitij/projects/portfolio-website/components/paper/chapters/background.tsx:20), [experiments](/home/kshitij/projects/portfolio-website/components/paper/chapters/experiments.tsx:38), [page composition](/home/kshitij/projects/portfolio-website/app/[locale]/page.tsx:98). | D repeats a kicker/title/body/note template throughout six chapters and seven beats, with contact links and two diagrams as additions. It has navigation and appearance controls, but no subject-specific exhibit control. The diagrams are usually small: `6.5rem`, with an `11rem` prominent variant. [D page](/home/kshitij/projects/storyfolio/evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/app/page.tsx:19), [diagram sizes](/home/kshitij/projects/storyfolio/evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/app/globals.css:30). |

## What is available but unused

The engine is more capable than this demo. Its formation contract exposes
piece positions and rotations, size, group rotation, composition anchor,
camera fitting, within-beat motion, drift, sway and above-caption placement.
Much of V3's variation in rigid spatial arrangements could be authored with
those existing fields. The demo barely exercises them.
[E formation contract](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/lib/story/formation.ts:9).

It also supports a custom React Three Fiber `Piece`, lazy chapter extras
with `frameRef`, `look`, `still` and `controls`, canvas-drawn or image-backed
faces, and projected HTML links. An extra can contain authored geometry,
materials and interactions. Custom geometry is therefore possible without
first adding a downloaded model loader or mandating another skill.
These are extension points requiring site implementation, not a library of
finished exhibits. [E bundle contract](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/components/story/types.ts:9),
[extra mounting](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/components/story/scene.tsx:47),
[control hooks](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/components/story/controls.tsx:8),
[image and canvas faces](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/components/story/faces.ts:18).

V3's examined effects are themselves built from vertex grids, procedural
coordinates and Three.js primitives. A search for `useGLTF`, `GLTFLoader`,
`gltf`, `glb` and `OBJLoader` in `components/paper` and `lib/paper` found no
matches. That scoped result is not a claim about every other page in the
original repository. It does establish that adding an external model file
is not the sole route to recovering these specific effects.

## Actual extraction gaps

These capabilities cannot be selected through the current formation/look
data alone. They would need custom extension code or an engine change:

1. **Surface deformation shared with the story timeline.** The extracted
   default is rigid geometry. Its `Pose` has position, rotation and a
   two-dimensional size; there is no curl, twist, wrap or per-vertex relief
   channel. `PieceProps` provides index/material/look but no frame or
   deformation state. `ExtraProps` does provide a frame, so complex geometry
   remains possible there, but the V3 mechanism for deforming the existing
   carrier was not preserved as a reusable contract.
   [E pose](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/lib/story/formation.ts:9),
   [E props](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/components/story/types.ts:18),
   [O relief and wrapping](/home/kshitij/projects/portfolio-website/components/paper/pages.tsx:499).
2. **An exposed live face repaint channel.** O gives exhibits
   `printsRef.paint()` and `setSeam()`. E queues faces and redraws after
   font/image readiness, but its face store is private to `Pieces` and is
   not passed to extras. A dynamic noise display or image comparison across
   the carrier cannot use the original shared mechanism directly. It needs
   a new connection or custom textures owned by an extension.
   [O paint contract](/home/kshitij/projects/portfolio-website/components/paper/prints/store.ts:25),
   [E store ownership](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/components/story/pieces.tsx:43),
   [E draw queue](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/components/story/faces.ts:27).
3. **Material and stage detail as stock options.** E uses
   `MeshStandardMaterial` with metalness zero and optional emissive print.
   Its look contract only offers a matte floor or none. The original
   clearcoat branch, reflective floor, lightformers, fog and edge treatment
   have no equivalent stock switches. Custom extensions can supply some of
   this, but changing a look ID alone cannot.
   [E material](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/components/story/face-material.ts:9),
   [E look](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/lib/story/looks.ts:2),
   [E stage](/home/kshitij/projects/storyfolio/skills/storyfolio/engine/components/story/stage.tsx:7).
4. **Reusable authored detail and exhibits.** The engine exposes hooks but
   does not ship V3's print families, flurry choreography or live exhibits as
   reusable content. Copying the engine is sufficient for a functioning
   scroll scene, not for the visual finish of the original. This is a
   capability/authoring gap, not evidence that every site's story should
   copy V3's globe, maze or research-paper imagery.

The demo's copied `pieces.tsx`, `stage.tsx`, `scene.tsx`, `face-material.ts`,
`formation.ts` and `looks.ts` are byte-identical to the shipped engine at
inspection. Its `faces.ts` and `types.ts` differ, reflecting the saved
face-aspect adaptation. That adaptation improves text texture proportions;
it does not provide the missing spatial or material richness.

## Implications for interpreting this result

The fixture intentionally narrowed the implementation before the actor
started: six narrative row cards, an offline system-font palette, authored
schematics instead of a photograph, no separate project page, and a static
mobile/reduced-motion mode. Those choices are recorded in
[the fixture README](/home/kshitij/projects/storyfolio/evals/builds/embedded-1/README.md:49).
At widths of 767 CSS pixels or less, the completed demo deliberately does
not mount its 3D scene. This is a fixture decision rather than an engine
inability to animate on a phone.
[D static query](/home/kshitij/projects/storyfolio/evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1/turns/02/snapshot/files/components/story/story.tsx:20).

Consequently, the result establishes a functioning, factual row-card
regression site. It cannot establish that the skill or extracted engine
produces work comparable in visual ambition to V3. The fixture itself
explicitly excludes non-sheet proof and distinguishes the author's earlier
engine approval from approval of this site.
[Fixture scope and approval limit](/home/kshitij/projects/storyfolio/evals/builds/embedded-1/README.md:3).
Passing browser conditions and reviewing screenshots for omissions or
clipping do not supersede the author's assessment of visual quality.

The smallest useful next design question is which meaningful physical
transformation, detailed surface and subject-specific interaction should
carry a representative story, then whether existing extension points can
deliver it to the author's standard. More labels, more beats or a model file
alone would not resolve this finding. A richer firmware schematic must
remain explicitly illustrative where source facts are absent; inventing
measurements, circuit details or ownership would weaken the existing factual
contract. No skill instruction, benchmark or engine repair is prescribed or
applied by this source review.

## Source identity checks

Selected SHA-256 values retained to identify the inspected implementations:

| File | SHA-256 |
|---|---|
| O `lib/paper/sheet.ts` | `2fec4f9fc0141c156a6ae1df704ca2405dec49e9c1450849604b69d9ccf7eb58` |
| O `lib/paper/formations.ts` | `99cf849f207ade0949aff84b78ed30818164e0c3dadd7b4c938dc44e2e045fbc` |
| O `components/paper/pages.tsx` | `cad281f458e6fda6de3cad02787f88aac6cfb8919735508f1f27a5078e96f7c4` |
| O `components/paper/stage.tsx` | `6e97dd2724cf60632f2bb4e3a62cfec9b6d5263c66008d03e1053af39bd759f0` |
| E `components/story/pieces.tsx` | `717d12c311c085d3b3a9298149187882e7b14f67b998f4a5bc4a357043968b7f` |
| E `components/story/types.ts` | `19944265264214c484697f4b0744b0830b11bc6913734745a132b9919be93e4b` |
| D `content/formations.ts` | `79c1dedace0dd297aca6aa044249eacd62c0ffd5cde7123c47ee27679579f90f` |
| D `content/faces.ts` | `f6a2e566867c7d2f8f9a670a62b5307e4dac59adc6b73c1729a19c02b8f3db0a` |
| D `content/looks.ts` | `2999cc2ade2a5f7905d645d890d58e22fb435128ac40a27705e5d94fae50834c` |
| D `content/index.ts` | `a4901be3f3a3eaa8c386da2ed98c35cf0c9a8ec8f9aab33a991a38b9668c53ba` |

Documentation validation: all 50 linked local source targets exist and their
referenced starting lines are within the files. The review contains no em
dashes. No application test was warranted for this source-only analysis.
