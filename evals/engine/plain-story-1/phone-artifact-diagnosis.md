# Phone face artifact diagnosis, 11 October 2026

The dark phone fan showed dotted strokes through its white picture face.
The controlled browser probes isolate the defect to multisample
antialiasing interacting with thin support-box side faces in this
SwiftShader renderer. A positive polygon offset on the support boxes
removes the artifact while retaining smooth edges. The precise driver
rasterization mechanism is an inference; the controlled visual and pixel
results below are observed.

No engine or scaffold source was changed by this diagnostic. It changed
Three objects only in a disposable browser session. The parent agent
owns the implementation and subsequent acceptance run.

## Measured state and rejected explanations

[The live report](diagnostic-runtime/report.json) records camera near 0.1,
far 1000 and z 16.658810778174214; renderer precision highp; 24 depth bits;
pixel ratio 1; shadows enabled; antialiasing enabled. The renderer identifies
itself as ANGLE Vulkan, SwiftShader Device (Subzero). The first recorded
context is the discarded feature probe; its null properties are not the
live scene's properties.

The initial 16-bit-depth hypothesis was rejected by that measurement.
The earlier change from a nearly coincident face to a 0.0075 gap also
failed, as the matrix-2 phone screenshot and this baseline preserve.
Increasing near to 1, increasing negative face polygon offset to -16/-16,
and refreshing all materials did not remove the artifact. The
[raycast and shader probe](diagnostic-runtime/shader-probe.json) places the
white face first at pixel (266,315), distance 16.51696, with its own box
behind at 16.52448 and the previous face behind at 16.55706. Actual poses
match the declared fan. The white face's live receiveShadow uniform is
false; its storyFrom, storyTo and directionalShadowMap samplers use distinct
units 0, 1 and 2. Replacing its custom blend shader with the standard
material shader also retains the artifact.

The component-audit agent independently checked formation copying,
transforms, Three's sampler allocation and receiveShadow refresh. It found
no pose aliasing or allocator defect, viewed the relevant screenshots and
independently confirmed the shadow-off, standard-shader and MSAA-off pixel
comparisons. It made no runtime or source changes for that review.

The [first white canvas](diagnostic-runtime/texture-6.png) and
[second white canvas](diagnostic-runtime/texture-13.png) were viewed and
contain only the intended 07 and Pieces text on a clean background.

An intermediate visual reading incorrectly reported that disabling shadows
removed the speckles. A second reviewer challenged that reading. Pixel
inspection confirmed that disabling shadows retains all 12 dark pixels in
the measured white interior, and the shadow explanation was explicitly
retracted before selecting a fix. Disabling box shadow casting has the
same failed result. The small color change from shadow removal does not
remove the strokes.

## Controlled results

Every screenshot linked below was opened with view_image. The pixel
comparison counts red values below 230 inside the known blank white region
x 250 through 274, y 335 through 364. This is a focused artifact measurement,
not a whole-image quality score. The clean region has minimum red 241.
[Exact metrics](phone-pixel-comparison.json) and the
[read-only pixel script](diagnose-phone-pixels.mjs) preserve the check.

| Screenshot | Dark pixels | Verdict |
| --- | ---: | --- |
| [Baseline](diagnostic-runtime/baseline.png) | 12 | Dotted strokes present. |
| [Own white support box hidden](diagnostic-runtime/without-own-box.png) | 12 | Artifact persists. |
| [Other six support boxes hidden](diagnostic-runtime/without-other-boxes.png) | 0 | White face clean. |
| [All support boxes hidden](diagnostic-runtime/without-boxes.png) | 0 | White face clean. |
| [Only first support box](diagnostic-runtime/only-first-box.png) | 0 | White face clean. |
| [Only sixth support box](diagnostic-runtime/only-sixth-box.png) | 6 | A subset of the strokes remains. |
| [Box shadow casting disabled](diagnostic-runtime/without-box-shadows.png) | 12 | Artifact persists. |
| [Global shadows disabled and materials refreshed](diagnostic-runtime/no-shadows.png) | 12 | Artifact persists; earlier visual claim retracted. |
| [Camera near 1](diagnostic-runtime/camera-near-one.png) | 12 | Artifact persists. |
| [Face offset -16/-16](diagnostic-runtime/offset-sixteen.png) | 12 | Artifact persists. |
| [Face local z 0.08](diagnostic-runtime/face-z-eight.png) | 10 | Artifact remains. |
| [Face local z 1](diagnostic-runtime/face-z-one.png) | 0 | Clean, but the geometry separates visibly; unsuitable fix. |
| [Box material depthWrite false](diagnostic-runtime/boxes-depth-write-off.png) | 12 | Artifact persists. |
| [Faces rendered last, depth test retained](diagnostic-runtime/faces-render-last.png) | 12 | Artifact persists. |
| [Faces rendered last with depth test disabled](diagnostic-runtime/without-face-depth-test.png) | 0 | Clean diagnostic; invalid general occlusion behavior. |
| [Standard white shader](diagnostic-runtime/standard-white-shader.png) | 12 | Artifact persists. |
| [All materials refreshed only](diagnostic-runtime/materials-refreshed.png) | 12 | Artifact persists. |
| [MSAA disabled at context creation](diagnostic-runtime-no-antialias/baseline.png) | 0 | Clean interior, jagged outer edges. |
| [MSAA off, materials refreshed](diagnostic-runtime-no-antialias/materials-refreshed.png) | 0 | Same clean result. |
| [MSAA off, standard white shader](diagnostic-runtime-no-antialias/standard-white-shader.png) | 0 | Same clean result. |
| [Box material polygon offset +1/+1, MSAA retained](diagnostic-runtime/boxes-positive-offset.png) | 0 | Clean face and smooth outer edges; recommended candidate. |
| [Box side triangles omitted, MSAA retained](diagnostic-runtime/boxes-no-side-faces.png) | 0 | Clean control identifying the thin side geometry. |

The only-first-box, only-sixth-box and face-z-one screenshots followed the
global-shadow-off probe in the same session, so shadows were still off in
those three controls. Since the shadow-off baseline retains the same
12 strokes, the listed comparisons remain informative. The recommended
positive box offset and side-removal controls ran in a fresh session with
shadows and MSAA enabled, as their live report confirms.

The bounded candidate is polygonOffset true, factor 1, units 1 on the
default Card support-box material. It biases the steep side surfaces;
the failed negative offset on the nearly flat printed face does not.
[Three's material documentation](https://threejs.org/docs/pages/Material.html)
describes the factor as a depth-slope scale and units as a constant depth
offset. Applying that documented behavior to the observed thin-edge/MSAA
interaction explains why the support-box change is useful. This is a
local candidate verified on the phone fan; the subsequent production
matrix must establish that other views remain correct.
The runtime candidate retained the earlier ineffective negative face
offset. The parent removed that face offset while applying the positive
box offset; matrix-3 verifies that exact final source combination.

## Reproduction and scope

The source diagnostic is [diagnose-phone.mjs](diagnose-phone.mjs). It uses
the acceptance scaffold's pinned Playwright and Chromium, a 390 by 844
touch viewport, the production app at http://127.0.0.1:3010/?look=dark and
the settled end of middle.fan. It records uploaded canvases, the R3F store,
actual matrices, raw receiveShadow values after each plane draw and a
raycast. The harness was extended as hypotheses were tested; saved
screenshots from preceding variants remain beside the final probe.

The production server was started by the parent agent from
/tmp/storyfolio-engine-acceptance-20261011. Commands used for the browser
probes, with --variants selecting the named runtime branches, were:

```sh
LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache /tmp/storyfolio-node-check-20261011/node_modules/.bin/node evals/engine/plain-story-1/diagnose-phone.mjs
LD_LIBRARY_PATH=/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu PLAYWRIGHT_BROWSERS_PATH=/tmp/storyfolio-browser-cache /tmp/storyfolio-node-check-20261011/node_modules/.bin/node evals/engine/plain-story-1/diagnose-phone.mjs --no-antialias --variants=materials-refreshed,standard-white-shader
node evals/engine/plain-story-1/diagnose-phone-pixels.mjs
```

The browser required approved execution outside the sandbox after its
first launch failed with a sandbox shutdown permission error. There were
no model evaluation conversations, package installs or engine changes in
this diagnostic. The recommendation preserves normal face depth testing,
shadows, textures and antialiasing.
