# Recorded control failures, without rescore

Read-only examination after normal terminal closure. The actual report
retains 12 problems across eight trials, with zero request failures,
warnings or browser errors. There are 16 control identities and 32 trials.
No source, expectation, checker or score was changed. No runtime was
launched. Root owns separate original-pixel review.

The [raw report](desktop/artifacts/desktop/report.json) is authoritative.
The [read-only extractor](read-control-report.mjs) produces
[compact recorded observations](control-report-observations.json), with
its [full successful tool result](control-report-observations-tool.json).
It summarizes each settlement's last point and sample count; complete
trajectories remain in the unchanged original report.

## Two navigation trials, six conservative findings

| Actual trial | Last settlement scroll Y | Response observation Y | Screenshot-time Y | Actual target after activation |
| --- | --- | --- | --- | --- |
| `control-56e7c6a74afccc18`, evidence rail pointer | 4318 | 4360 | 4360 | `proof`, exists, visible and in view |
| `control-7c30f7cd27b3b32b`, scope rail keyboard | 5948 | 5948 | 5980 | `close`, exists, visible and in view |

Both trials were reached and activated. The pointer started at scroll 450;
the keyboard trial reached the scope rail after nine Tabs and started at
scroll zero. The local settlement observer returned `settled:true` after
approximately 1,135 ms and 1,328 ms respectively, but later geometry no
longer matched its last sampled point within the frozen 0.5 px tolerance.
The preserved screenshot-time check therefore correctly refused a stable
response assertion under that contract.

Each trial emits three related diagnostics: settlement mismatch, no
declared target response, and no observable response. These are not six
independent broken controls. The latter two follow from gating `changed`
on the failed settlement comparison. They must not be described as proof
that the page failed to navigate: both recorded targets were visible and
in view afterward, and root separately reported readable destination
originals. Keep the conservative raw failures; do not convert a visually
observed destination into a timing-contract pass.

## Six keyboard trials, real focus but unusable recorded geometry

The generic text `control was not reached and activated` comes from
[the frozen assessor](implementation/evals/lib/build-capture.mjs:84), which
tests `!activated || !reached || !hitTarget`. In all six affected trials,
`reached`, `activated` and `changed` are true. The actual triggering field
is `hitTarget:false`, not an absent Tab or Enter event.

| Control | Actual Tabs | Before scroll Y | Before control Y | Recorded visibility / in view |
| --- | --- | --- | --- | --- |
| Command | 11 | 710 | 2407.84 | false / false |
| Board | 12 | 710 | 2407.84 | false / false |
| Fixture | 13 | 710 | 2407.84 | false / false |
| Observe | 14 | 710 | 2407.84 | false / false |
| Read the source and limits | 15 | 3618 | 3057.70 | false / false |
| Back to the question | 16 | 6920 | 1088.31 | true / false |

The viewport is 1440 by 900. All six have actual focus before activation,
but their recorded hit geometry is outside the visible viewport. The four
inspection buttons each change `aria-pressed` from false to true. The two
links reach their declared destinations with recorded changed targets.
Those state changes do not establish usable keyboard presentation while
the focused controls are invisible or offscreen.

The [frozen control helper](implementation/evals/runs/stage-3-completion-2/full-journey-measurement/controls-lib.mjs:117)
resets body focus with `preventScroll:true`, then uses sequential native
Tab presses and native activation, not direct target focus. It waits for
scroll settlement after finding the target. The raw evidence supports a
visibility/hit-geometry failure under this tested sequence, not a claim
that these controls can never receive keyboard focus.

## Source context and attribution limits

The inspected workspace files exactly match their repository prototype
counterparts and the retained source identities:

- [Story CSS](../../../../../prototypes/fixture-study/components/story/story.css)
  uses sticky captions and opacity/translation view-timeline animations,
  without a focus-specific caption reveal rule. SHA-256
  `6757ae89fb89b2cdd57b0b1aa18031fb7f3f4d97858d71ae6e3545971b0e9a23`.
- [Beat markup](../../../../../prototypes/fixture-study/components/story/chapter.tsx)
  wraps children inside those captions, without `inert` or focus-management
  logic. SHA-256
  `e867c0da89bc4ea96e4e40908d3d2ea63ffe0504c1f2d292279bb8e428b5cab9`.
- [Global CSS](../../../../../prototypes/fixture-study/app/globals.css:9)
  sets smooth scrolling and 95 px scroll padding. SHA-256
  `34936c6da9bd6b8bd58c46e111b70fcff972e56c6e172a945bfb4ffd77f0a0db`.
- [Inspection buttons](../../../../../prototypes/fixture-study/content/inspect.tsx)
  are native buttons with state changes, not a separate keyboard transport.
  SHA-256
  `3b77b6317c57f3c195fbc663db3021faaa45831facbeb9f4f1f30477fd4eb3e2`.
- [Page links](../../../../../prototypes/fixture-study/app/page.tsx)
  retain actual fragment anchors. SHA-256
  `f08a38dd07db2d655d1f6b7abd0624d495185c322348799d2977989121bc0dad`.

These sources are consistent with the observed smooth-scroll and
sticky/animated-caption interaction. This read-only review does not
isolate how timing, sequential Tab speed and layout contribute, or prove
the same outcome for every human-paced sequence. It proposes no repair
or rerun. A completed apparatus calibration is allowed to report genuine
remaining prototype failures; all-green output is not its prerequisite.

Extraction notes: an initial inline read query had an extra closing brace
and failed before reading; the first full-trajectory extraction then
exceeded the tool's return budget. Neither modified evidence. The retained
compact extraction avoids truncation while leaving the full raw report
untouched. These read-query issues are not capture failures.
