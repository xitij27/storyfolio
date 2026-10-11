# Independent review of the prepared comparison

12 October 2026. Read-only review of the new `bench-depth-2` case, fixture,
expectations, protocol, source manifests, verification script, neutral
screenshot helper and tests, plus the source-helper identity changes in
the checker and judge. Initially only this review file was written. At the
coordinator's subsequent request, this reviewer added the local helper
smoke wrapper and separately labelled evidence directories described below.
No model call, paid retry, skill change or site build was performed.

## Findings and dispositions

### 1. Judge rubric omitted from the implementation freeze, corrected

The new case points `rubric` at
`evals/builds/bench-depth-1/criteria.md`, but initially omitted that path from
`implementationFiles`. `inspectBuildInputs` therefore supplies `rubric.md`
without `implementation/evals/builds/bench-depth-1/criteria.md`.
`prepareBuildJudge` requires both and would reject this otherwise valid
future actor packet before invoking its optional judge.

Read-only reproduction compares resolved `JUDGE_IMPLEMENTATION_FILES`
against `inspectBuildInputs(...).hashes` for the new case. Actual output:

```json
{"missing":["evals/builds/bench-depth-1/criteria.md"]}
```

Case hash at that observation:
`126c5baf93cf89a9e26f9df2c1edda18fac0c1c742c68cd058a2dc052ebea26c`.
Add the inherited rubric to the new case's implementation freeze and make
the fixture verifier assert complete resolved judge-dependency coverage.
The initial verifier passed without detecting this defect. This is a
pre-freeze blocker, not a reason for an actor run or a historical rewrite.

The coordinator added the missing entry and complete required-dependency
assertions. Repeating the read-only coverage check returns `{"missing":[]}`;
the final fixture verifier passes. Reviewed new case hash:
`f00ac1dbabfe7d7a5755fce8ad97ba2dec78d58e15128273a4924e8b32b94515`.

### 2. Symlink input promise exceeded the helper check, corrected locally

The original neutral helper rejected symlink directory entries, but followed
a symlink supplied as the input directory or in an ancestor component. Its
README said it refused symlink input. The initial helper hash was
`0c757b0e339732bf2dd98f3ea38bbe55cb231cb2e8e53d40d4ce714239cc89e2`.

This read-only probe uses the existing `/proc/self/cwd` symlink and creates
no file or link:

```js
import { collectImages } from "./evals/builds/bench-depth-2/workspace/scripts/review-sheets.mjs";
import { lstat } from "node:fs/promises";
const path = "/proc/self/cwd/evals/builds/bench-depth-2/workspace/public/assets";
console.log(JSON.stringify({
  ancestorIsSymlink: (await lstat("/proc/self/cwd")).isSymbolicLink(),
  result: await collectImages(path),
}));
```

Before correction, exact output was:

```json
{"ancestorIsSymlink":true,"result":[]}
```

The SVG-only directory legitimately has no PNG/JPEG files; acceptance of
the symlinked path, not image selection, demonstrates the mismatch. The
coordinator added checks of the input-root path components plus regressions
for a symlink root and ancestor. Repeating the same call, with a catch to
record the error, now gives:

```json
{"rejected":true,"message":"Symlink screenshot input path is not supported"}
```

Reviewed corrected helper hash:
`533b9ac57d601a2b1f1202345048f7137626588ab735ac48eb42aecd867a06b7`.
The corrected helper's three tests pass, including the new root/ancestor
cases. The manifest and workspace inventory were refreshed and the fixture
verifier passes. This check is local evidence, not a read jail against a
concurrent filesystem race or arbitrary actor filesystem access.

### 3. Rubric verification claim, corrected in the verifier

The initial verifier reported `promptAndRubricInherited: true` while only
explicitly asserting the original prompt identity. The coordinator added
the exact inherited rubric path and byte-hash assertions and included
`verify-fixture.mjs` in the new case's implementation list. This addresses
that claim. It is distinct from finding 1, which concerns the judge's
required `implementation/` entry, not `rubric.md` alone.

### 4. Single pointer-modality exception, clarified

The preserved storyboard says every implemented control works through
pointer and keyboard. The new environment document intentionally supplies
one keyboard-focus-only bypass anchor and the exact corresponding
expectation. Make the new supplement explicitly name this as the sole
exception to that inherited general sentence; keep all ordinary controls
under both methods. This avoids an actor making the skip permanently
pointer-visible to obey the older universal wording. Do not modify the
old storyboard or frozen results to resolve the ambiguity.

The coordinator has now added the explicit single-exception wording to the
new environment supplement, retained the ordinary two-method requirement,
and refreshed its manifests. The inherited storyboard bytes remain intact.

### 5. Real helper CLI could not load Chromium, corrected and rerun locally

The first actual smoke invoked the helper from the trusted dependency site,
not through the mocked `renderSheets` unit-test interface. It failed before
launching Chromium: dynamic import of the resolved CommonJS Playwright
entrypoint provided no named `chromium`. The process exited 1 with
`TypeError: Cannot read properties of undefined (reading 'launch')`.
The failed source, wrapper, command, process and unchanged-original hashes
remain in [helper-browser-smoke](helper-browser-smoke/). The output directory
was not reused or overwritten.

The coordinator changed the CLI to use `require("playwright-core")`, added
an actual child-CLI/CommonJS-resolution regression and refreshed fixture
hashes. The four helper tests pass. The final helper hash is
`083a43dcefef6c6dec5aa20c9b3748671346898bf6122b9a9503ddfd130dcb51`.
The separate [second smoke](helper-browser-smoke-2/result.json) then exited
0 and rendered all 51 originals into five sheets. All originals and the
helper source were unchanged across that run.

## Checks that agree

- The case has nine supplied files: six unchanged inherited files, the
  original handover with an appended environment pointer, a new environment
  record and the neutral helper. The verifier confirms original hashes and
  the append-only handover relationship. Factual meanings and supplied SVGs
  remain the same.
- Five expected beat IDs, one appearance, animated desktop/phone/short
  modes and complete fallback meanings match the supplied storyboard.
  `#story-skip`, its label and `#chapter-scope` are explicit new equal-arm
  fixture requirements, not exemptions inferred from the future actor.
  The control assessor requires exactly one matching inventoried anchor,
  evidenced pointer non-applicability and actual keyboard response.
- Both arms retain the same external build permission and explicitly do
  not test ordinary activation or any full six-stop gate. The protocol
  keeps technical, text, visual and author judgments separate and reserves
  a candidate only after baseline review. There is no hidden continuation.
- The helper contains no accepted implementation or earlier actor paths.
  It resolves `playwright-core` from the current site's package location,
  embeds local PNG/JPEG bytes, escapes labels, batches twelve images and
  records source hashes. Output must be a new directory. Its scan covers
  the input directory and one nested level, not arbitrary recursive trees.
  Initial tests mocked rendering; the later real-CLI smoke below exercises
  actual Chromium. No cross-platform execution is claimed.
- The source-scope helper is frozen in actor implementation inputs, in the
  checker manifest and in the judge's required implementation set. The
  added judge regression rejects an acceptance manifest missing that
  helper. Existing source-set equality checks remain in force.
- `git diff --name-only` and `git diff --numstat` for
  `evals/builds/bench-depth-1`, `evals/runs/codex-bench-depth-baseline-1` and
  `skills/storyfolio` returned no changes. This is tracked working-tree
  preservation evidence, not a new complete audit of every historical
  untracked artifact.
- The approved design says two or three looks. Future six-stop work should
  use that wording; the present one-appearance diagnostic changes neither
  the design nor the historical documents that said three.

## Verification performed

| Command/check | Result |
|---|---|
| `node evals/builds/bench-depth-2/verify-fixture.mjs` | Pass before and after the symlink/verifier correction; finding 1 remained outside its initial coverage |
| `node --test evals/lib/review-sheets.test.mjs evals/lib/build-score.test.mjs` | 37/37 pass, exit 0; mocked judge/helper tests, no model call |
| `node --test evals/lib/review-sheets.test.mjs` after correction | 3/3 pass, exit 0, including root/ancestor symlink rejection |
| Read-only `/proc/self/cwd` probe | Accepted before; rejected after, exact outputs above |
| Resolved required judge-implementation coverage | Missing inherited rubric, finding 1 |

Final follow-up: fixture verification passes, required judge dependency
coverage is empty of omissions, and the four helper tests pass after the
CommonJS correction. Earlier successful mocked tests are not relabelled as
having caught the real CLI failure.

## Actual helper browser smoke and sheet review

Saved reproducible command:

```sh
node evals/runs/stage-3-integration-1/helper-browser-smoke.mjs helper-browser-smoke-2
```

The wrapper saves the exact helper command, trusted working directory,
environment, source and wrapper copies/hashes, original-image inventory,
process result and sheet/manifest hashes. It refuses an existing output
directory. Source images are the previously retained `acceptance-2/reduced-motion`
originals; no actor site was rerendered. The first failure used the wrapper's
default `helper-browser-smoke` label; its original wrapper bytes are retained.

Node was `v22.22.1`, Playwright `1.64.0`, and the separate actual-browser
inspection reports Chromium `156.0.8078.4`. Browser cache and library paths
are the same recorded local paths used by the control-modality study, not
new downloads. [Browser inspection](helper-browser-smoke-2/browser-inspection.json)
records the executable path, versions and layout observations. It loaded
the helper's generated HTML for each of the same five batches, awaited
image decoding and checked document width, image bounds and caption overflow.
All five documents were 1600 pixels wide, with zero out-of-figure images
or overflowing captions and `object-fit: contain` for every image.

Every following generated PNG was opened with `view_image` at original
resolution, not inferred from the manifest:

| Viewed path under `helper-browser-smoke-2/sheets/` | SHA-256 | Original images |
|---|---|---:|
| `sheet-001.png` | `1ce0d6a0b17f36cf7bf1716c930ab58414dfe0838d181b70544d12910c9cd3c8` | 12 |
| `sheet-002.png` | `bbe020ece434df1b23f6bab830d49fef70b29a90972118dd075e159caf2bc9f0` | 12 |
| `sheet-003.png` | `a5ee3c813c5acb7db3f8dae2583a7660b38d64001ecdbcb9d7557b9887b84b19` | 12 |
| `sheet-004.png` | `f788c86509bef412e1a75ed197be14ded1f2e111850e5b61a26901dcc063ae03` | 12 |
| `sheet-005.png` | `f4aedb7a01d3f832e7c463242e35aa9cd5ef20841a66c7b21e9b7cd34cf79096` | 3 |

All five show decoded thumbnails and filename labels in the intended
four-column grid. The final incomplete row is expected. The source-to-sheet
manifest accounts for all 51 input paths/hashes exactly once; duplicates
in source content remain separate filenames. One original,
`control-728113beee30b313-keyboard-after.png`, was also opened to compare
thumbnail framing. This is a tooling-only rendering check. Thumbnail copy
is small by design, and contact sheets do not replace full-original review.
No new visual acceptance or changed finding about the old site follows.

## Candidate placement recommendation, no skill edit

The saved actor read the main `SKILL.md` and the supplied storyboard, not
the storyboard reference. Placing the supported visual draft only in that
unopened reference risks an unobserved intervention. Prefer a conditional
main-skill section, selected only after the refreshed baseline confirms the
miss, rather than adding behavioral advice to engine technical docs.

The heading is `For a separately authorized build`, with the guard
`This does not grant permission to build.` and whichever exact draft
paragraphs the baseline supports. Under `check-skill.mjs`'s body-only word
count, the current skill is 687 words. The heading plus both drafts adds
105, and the guard adds seven, totaling 799. Whitespace counting the
frontmatter would give a different number; it is not the checker limit.

Keep both planning-only endpoint statements and the three stops unchanged.
The section applies review advice under the same separately supplied
diagnostic exception in both arms, not normal build activation. A planning
regression remains required before a shipped capability claim. This is
placement advice and a counted draft, not a present skill modification.

No remaining blocker was found in this reviewed scope after the fixes and
helper smoke. This does not establish exact future actor-workspace
capability, final freeze, spending authorization, visual acceptance or
Stage 3 completion.
