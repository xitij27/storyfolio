# Minimal missing runner contract

The legacy schema-1 build case accepts only ordered stops 4, 5 and 6 and
setup modes scaffold/existing-site. Neither is an honest label for this
before-stop-1 case. This fixture therefore supplies `journey.json`, not a
launchable legacy `case.json`. A separate schema-3 extension is under review;
this fixture update neither validates it nor promotes a launchable case.
No shared runner was edited here.

Root's smallest adapter/extension needs:

1. Explicit actual requested stops `[1,2,3,4,5,6]`, the six fixed prompt paths,
   one conversation/session across those turns and at most six 900000-ms
   actor turns. Do not call stops 1 to 3 stop 4, and do not describe this as
   a one-turn diagnostic.
2. A fixture-only initial root: original material, diagrams and provenance,
   plus the selected skill/engine under its installed skill path. Do not
   prebuild a root application or name an empty project an existing-site
   fixture. Preserve the exact pre-scaffold inventory. The actor owns setup
   after its own inspection; trusted offline dependencies/browser resources
   may be supplied with truthful capability facts.
3. A source-bound coordinator gate before each next fixed prompt. It binds
   the prior closed, completed turn and actual reached handoff, not merely
   the expected stop number. Timeouts or missing prerequisites do not get
   automatic continuation. Record simulated choices and refusals exactly.
4. Before-turn and after-turn snapshots, generated-file policy, raw commands,
   usage, lifecycle and skill/source access evidence equivalent to existing
   build runs. Preserve initial `material/` and later actor-authored site
   files; bind filesystem scope changes and Git metadata honestly.
5. Frozen gate-specific and final measurements whose coverage reflects the
   actual actor-selected routes, beats and controls. A legacy full-site
   rubric cannot be used to pass early concepts, nor can the three-point
   entry checker pass a finished whole site.

These are recorder/lifecycle needs, not new instructions for the actor.
The fixture does not request a broad runner rewrite or prescribe its schema
number. Root must freeze the actual supported adapter before launch, add
deterministic contract tests in its own scope and preserve all old-case
behavior. No validation/test command was run by this preparation task.

The dated reviewed optional-skill catalog and supplied runtime resource
locations are now explicit initial manifest entries, outside skill-loading
paths. Both arms receive identical catalog bytes. Actual runtime proof and
the equal-arm freeze remain pending; supplied locations are not evidence of
actor inspection. Commands are source-checked but not run, and no external
skill is enabled by these fixture files. Launch-time token/cost
controls and browser-work bounds are root-owned and must be recorded before
execution; six per-turn wall limits are not a hard token or dollar cap.
