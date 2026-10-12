# Frozen natural-entry measurement

This is one ordinary build-entry baseline, not the five-beat depth fixture.
The single actor prompt approves the saved storyboard and asks for a build.
The coordinator evaluates entry into work, a runnable opening/middle/ending
spine, and two or three genuinely reviewable looks with an honest choice
request. No instruction to the actor is added by this protocol. No paid judge,
actor continuation, correction or retry is authorized.

## Predeclared observations

1. Ordinary continuation: did the agent build from the approval, restart
   planning, stop at the inherited skill endpoint, ask a genuine unresolved
   question, or run out of time? Preserve the entire reply and lifecycle.
2. Runnable spine: the opening means the approved question, the ending means
   approved scope, and the middle means scheduling, bench or evidence. The
   actor chooses actual IDs and which approved middle. The three points need
   not implement all five meanings. Original pixels, source and narrative
   must agree; build success alone is insufficient.
3. Real look gate: two or three advertised, accessible alternatives have
   material visual differences and preserve the same story. Labels, query
   strings, data attributes, palette token changes and image hash differences
   alone do not establish material appearance. Capture every advertised look,
   including an excess or broken look, never only a passing subset. Review
   whether the final reply actually asks the author to choose. No author
   choice is made by the coordinator.
4. Honest handover: readiness and remaining work are consistent with the
   actual implementation, checks, limits and requested choice.
5. Integrity: frozen inputs, final actor snapshot, current source, measurement
   source-before/source-after and all original artifacts agree exactly under
   the existing generated-source exclusion policy. Source or artifact drift
   invalidates attribution. A timeout remains a timeout even if pixels look
   promising.

The [existing six visual criteria](../../../docs/superpowers/plans/2026-10-11-build-workflow-reproduction.md#prospective-assessment)
provide diagnostic context: Backdrop, Depth, Swap, Detail and hierarchy,
Spatial quality, and Phone and still modes. Their original full-site scope
is not silently reduced into a pass here. Only desktop and phone resting
views of the opening, one middle and ending are sampled. Full five-beat Depth,
motion continuity, reduced motion, no-WebGL, no-JavaScript, context loss,
physical-phone performance and a finished five-beat site are not established.
This observation cannot alone close Stage 3.

## Post-turn discovery, not new expectations

After the actor process is settled, a coordinator reads the public application
source and complete actor reply. Save `observed-targets.json` outside the actor
workspace before starting the one browser measurement. It records observed
facts, not a new passing rubric:

```json
{
  "schemaVersion": 1,
  "measurement": "natural-entry-spine",
  "sourceDigest": "64 hexadecimal characters",
  "actorResultSha256": "64 hexadecimal characters",
  "discovery": {
    "reviewer": "coordinator identity",
    "allAdvertisedLooksRecorded": true,
    "sources": [{"path": "content/looks.ts", "sha256": "64 hexadecimal characters"}],
    "notes": "Record reply links, every public look declaration, route and switch. Explain omissions, aliases, missing targets and discovery uncertainty."
  },
  "eligibility": {"disposition": "implemented-output", "authoredApplication": true, "rationale": "Evidence-based source/reply observation"},
  "looks": [
    {"id": "actor-chosen-id", "route": "/?look=actor-chosen-id", "advertised": true,
     "control": {"selector": "actual unique CSS selector", "name": "actual aria-label or trimmed text", "fromRoute": "/?look=other-actual-id"}}
  ],
  "beats": {"opening": "actual-data-beat-value", "middle": "actual-data-beat-value", "ending": "actual-data-beat-value"},
  "middleMeaning": "bench"
}
```

Use null for a missing observed beat, unestablished middle meaning, or absent
switch control. Record a default-only route as `advertised:false`, not a
fabricated choice. Record all advertised routes even when source suggests
they do not work. Map aliases explicitly in discovery notes. `fromRoute`
must represent an actual different starting look when available, so a selected
button does not masquerade as a tested switch. For state-only looks sharing
one route, an optional `control.prepareControl` records one real alternate
`selector` and `name` to activate before each trial. No invented controls or
source edits are allowed. If a different starting state cannot be established,
the idempotent trial remains unobserved, not a switch pass. Resting captures use the
existing engine's `[data-beat]` boxes, not fixed beat names or headings. If an
authored app departs from that contract, missing targets remain reported and
entry screenshots are retained; do not retrofit DOM or claim a spine pass.
All public choices are required in discovery, including source-defined looks
not mentioned in the reply. Source inspection is manual and its completeness
attestation is reviewable, not proven by a CSS inventory.

## Eligibility and one bounded capture

Any authored application implementation is eligible, even apparently broken
code. The production build is attempted once. Do not use `no-runnable-output`
to avoid testing a broken implementation. Browser omission is allowed only
for `refusal-no-output`, `planning-only`, `unchanged-starter`,
`no-runnable-output` (source absent), or `genuine-unresolved-question` with no
authored implementation. Save source/reply evidence and an explicit skipped,
not-demonstrated result. An unchanged stock starter with two built-in themes
is not a successful build-entry or look gate.
The `authoredApplication` attestation must be false for any skip and true for
an attempted implementation. It is a reviewable coordinator observation, not
an automatic source-diff classifier.

The frozen launcher uses trusted dependencies outside the actor workspace,
the recorded native Node and capability environment, a fixed Next production
build and loopback server. It invokes no actor-authored check script. Build
configuration still executes application code. One child lifetime is bounded
by 895,000 ms work plus up to 5,000 ms orderly shutdown, with escalation at
900,000 ms (scheduler jitter is recorded). Only owned processes are signaled.
Hard termination cannot itself prove detached descendants exited; the root
performs read-only post-run process review. No automatic retry exists.
The trusted root, Next version/CLI hash and Playwright entrypoint hash are
frozen in expectations before the actor. These bind entrypoints only, not the
full transitive dependency tree; the setup audit retains its own scope.

For each observed look, desktop 1440x900 and phone 390x844 capture the actual
entry view, opening, chosen middle and ending. Real declared switches get
separate pointer and sequential-Tab trials, with focus/visibility/hit
geometry, before/after page state and original screenshots. Missing,
ambiguous, covered or inaccessible controls are recorded, never exempted.
Absent switches are unobserved, not automatic failure when real alternatives
are discoverable through supplied routes. The full gate is judged manually.
Look identity and screenshots before and after activation support that review;
neither token nor pixel change is a material-look pass.
Activation uses Space for checkbox/radio/switch semantics and Enter for
buttons/links, recording the key. Source-matched names use `aria-label` or
trimmed text, not a complete accessible-name computation. Other custom
interaction semantics remain visible in evidence but are not automatically
certified by this narrow helper.

All observations and errors are retained. A failed build, deadline, external
signal, missing source, incomplete capture or inaccessible choice is not
converted to success. `complete` means the scheduled measurement finished,
not that the actor satisfied the entry, spine or gate. Every original image
actually emitted must be individually reviewed at original detail with exact
path/hash/bytes recorded. Missing captures remain unobserved. No contact sheet
or old attempt substitutes for the originals.
