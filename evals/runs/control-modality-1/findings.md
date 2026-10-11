# Focus-only bypass control measurement, local study

Date: 12 October 2026, Europe/Berlin. Browser records use UTC on 11 October.

Prospective checker repair under the [post-baseline attribution plan](../../../docs/superpowers/plans/2026-10-11-post-baseline-attribution.md) and the [baseline modality review](../codex-bench-depth-baseline-1/checker-modality-review.md). This is a small coordinator-authored fixture, not an actor build, paid run, portfolio acceptance or retrospective baseline reclassification. There were no model calls. Frozen baseline inputs, results and actor source were not changed. The shipped skill and engine were not changed.

## Result and contract

The frozen checker reproduces four pointer-only failures for a working keyboard-revealed skip link. The prospective checker accepts the explicitly authorized focus-only link in all seven browser conditions. It still rejects all 15 intentionally bad variants. The ordinary visible control passes both pointer and keyboard checks without a declaration.

The new optional schema-2 `focusOnlyControls` declaration contains exactly `selector`, `name`, `href` and a coordinator-written `reason`. Schema 1 rejects this field. Omitting it retains ordinary pointer and keyboard requirements. The declaration must exactly match one inventoried anchor and its fragment destination; the actor's classes or data attributes cannot authorize an exception. Missing, duplicate, malformed and mismatched declarations fail.

For an authorized link, pointer applicability is explicitly `not-applicable`, never successful activation. It requires an original unfocused screenshot and finite geometry showing an unfocused, enabled, non-hit-testable control genuinely hidden or outside the viewport. Merely covering a visible control does not qualify. The keyboard trial still uses sequential Tab, records the number of presses, requires a visible focused control wholly inside the viewport with a successful hit test, preserves original before/after screenshots, and activates Enter. Its declared target must exist uniquely, be visible and intersect the viewport in both dimensions after an actual scroll or location response. Hidden or disabled declared controls remain inventoried so they cannot disappear from the assessment.

## Retained executions

| Evidence | Cases | Originals | Outcome |
| --- | ---: | ---: | --- |
| [before-1](before-1/manifest.json), frozen checker | 1 | 3 | Expected four pointer failures; keyboard succeeds |
| [after-1](after-1/manifest.json), initial repair | 20 | 69 | Seven declared positives and one ordinary positive pass; twelve negative variants fail |
| [after-2](after-2/manifest.json), final repair | 10 | 40 | Seven declared positives pass again; three additional destination negatives fail |
| Total | 31 | 112 | All local regression expectations met |

The seven conditions are desktop 1440x900, phone 390x844, short viewport 1280x720, reduced motion, WebGL unavailable, JavaScript disabled, and actual WebGL context loss. Context loss was supported and the fixture recorded its off state. The local runner uses a fresh browser for each case and fresh document for each control trial. External requests are blocked. Its 500 ms action timeout only bounds intentionally bad local controls; production settlement waits were not relaxed.

The twelve first-stage negative variants are undeclared skip, offscreen button, hidden skip, covered skip, negative tabindex, disabled skip, blocked Tab, missing destination, wrong destination, covered ordinary control, actor-forged metadata, and mismatched declaration. Final negatives add hidden, horizontally offscreen and duplicate-ID destinations.

Self-review found an intermediate false pass: the original inherited target observation used vertical position alone and did not require target visibility. [target-visibility-before.json](target-visibility-before.json) retains a hidden-target mutation that the intermediate checker accepted. The final implementation adds target visibility, two-dimensional intersection and unique destination identity. The same mutation is rejected in [verification.json](verification.json), and the three actual-browser destination cases fail. The intermediate reports and source were preserved, not replaced or relabeled as final passes.

The [focused deterministic test result](focused-tests.json) records 36 passing tests, including strict schema compatibility, declaration authority, pointer applicability geometry, actual Tab/focused evidence, target response, missing and duplicate trials, and missing or duplicate inventory matches. Full repository tests are recorded separately by the coordinating agent.

## Original-image review

Every one of the 112 original PNG paths was opened individually at original detail, including identical-image hashes at different paths. The implementation owner reviewed 76 originals: all three before images, the 33 after-1 positive images and all 40 after-2 images. The independent reviewer opened all 36 after-1 negative originals. [main-viewed-originals.json](main-viewed-originals.json) and [independent-negative-review.json](independent-negative-review.json) retain these exact inventories; [verification.json](verification.json) binds each path, byte count, hash and reviewer to its capture report and rejects duplicate or omitted paths.

The positive originals show the link absent before focus, then a readable top-left skip link with a contrasting outline after Tab, then the answer target in view after Enter. This holds across all seven conditions. The phone and short-viewport versions remain readable. The ordinary control also works through both modalities. These are observations about this minimal fixture, not the project's visual quality.

The negative review confirms that visible navigation alone is insufficient. Covered controls can still navigate with Enter but correctly fail the focused hit test. Disabled semantics require the saved DOM state, because pictures alone can look successful. Wrong-destination images visibly show the other destination. Missing-target images remain at entry. The final hidden-target after image is blank, the horizontally offscreen target leaves the entry visible, and the duplicate-ID case visibly reaches an answer but correctly fails unique target identity. Sample originals: [hidden destination](after-2/desktop-hidden-target/control-4b845ac9b1e72978-keyboard-after.png), [offscreen destination](after-2/desktop-offscreen-target/control-4b845ac9b1e72978-keyboard-after.png), [duplicate destination](after-2/desktop-duplicate-target/control-4b845ac9b1e72978-keyboard-after.png).

The independent reviewer also reviewed coordinator authority, exact selector/name/href and anchor matching, hidden/disabled inventory retention, ordinary-control nonexemption, N/A versus pass, original hashes, actual Tab and focused geometry. They concurred with the target visibility correction and found no remaining blocker in the reviewed patch. They authored the separate source-inventory helper, not this modality repair.

## Reproduction and integrity

Run the read-only audit from the repository root:

```sh
node evals/runs/control-modality-1/verify.mjs
```

It checks manifests, report hashes, exact original PNG sets and hashes, screenshot references, original-review coverage, actual context-loss state, retained source hashes, final current-source identity, all 23 applicable final assessment replays, and the hidden-target mutation. The saved output is [verification.json](verification.json). It launches no browser and writes nothing. Source snapshots for the intermediate state are under [after-1-source](after-1-source/); the final launch saved its sources under [after-2/source](after-2/source/). Before-1 and after-1 used the same fixture and runner bytes, verified against the retained intermediate snapshots.

Browser launch and polling returns, including tool session IDs and exit codes, are retained as `before-launch.json`, `before-finish.json`, `after-launch.json`, `after-poll-01.json` through `after-poll-04.json`, `after-2-launch.json`, and `after-2-poll-01.json`. All three browser processes completed with exit code 0, where exit 0 means the expected good and bad outcomes were reproduced, not that the negative fixtures were accepted.

The host Node cannot run the repository TypeScript tests directly. This study used `/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node` v22.22.1, browser cache `/tmp/storyfolio-browser-cache`, and library path `/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu`. The existing trusted Playwright dependency is under `node_modules/storyfolio-build-dependencies-20261011/node_modules/playwright-core`. Chromium reported 156.0.8078.4. No dependency installation was required.

For a fresh local browser reproduction, use those environment settings and run `browser-check.mjs` with a fresh output label. `--baseline` selects the frozen old checker; `--target-followup` runs the seven good conditions and three destination negatives; omitting either runs all current fixture cases. Existing output directories are refused. Do not rerun into retained evidence directories.

## Limits and disposition

This study establishes the narrower measurement repair and its local regression defenses. It does not establish screen-reader behavior, comprehensive accessibility, performance, all browser engines, target-content legibility under arbitrary overlays, or whole-prototype visual correctness. The recorded CSS visibility, geometry and response are measurement evidence, not a substitute for original-image review. The frozen baseline remains failed under its frozen contract. New declarations and checker bytes must be frozen prospectively before any later comparison; the actor cannot nominate its own exemption.
