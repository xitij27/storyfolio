# Prospective workspace setup review

12 October 2026. The coordinator authorized the new bounded comparison and delegated unpaid setup verification only. Root owns every paid launch. This review did not change fixture/protocol, frozen production inputs, old cohorts, shipped skill or engine. No commit or push was made by this reviewer.

## Completed baseline setup

The new `codex-bench-depth-baseline-2` workspace is `/var/tmp/storyfolio-comparison-runtime-20261012/storyfolio-evals/build-bench-depth-2-tpXd60`. Its input digest is `40fea471970e15abbded1a2f4a51ca40917711e109aab189cc7fcf078257cf6a`. The frozen manifest contains 124 files. The initial actor workspace contains exactly nine fixture files, 86 unchanged skill files and 79 scaffold files, 174 retained source files total.

Root prepared this workspace and installed 392 packages with `npm ci --offline --cache=/tmp/storyfolio-npm-cache`. The installation result, stdout and stderr are preserved in the cohort's `setup/dependency-install/`. The cached npm audit summary is not a current advisory review. This reviewer then ran one command-only capability probe under the exact frozen actor `-c` configuration. It passed local HTTP, explicit proxy 403 for external HTTPS, production build and the starter's `light-wide` browser check. No actor or judge was invoked by these helpers.

All nine original 1440x900 PNGs were opened individually at original detail. The starter visibly progresses from scattered cards to gathered stack, fan and resolved stack. Entry-position crops truncate some lower prose, so this is capability proof, not full text-at-every-position or visual acceptance. Exact findings and original hashes are in the cohort's `setup/capability-visual-review.md` and `setup/original-images.json`.

The source inventories before and after the probe match all 174 retained files. Next-generated declarations and build/check/dependency trees follow the shared prospective source scope. The only later retained addition is factual `docs/story/environment-setup.json`, byte-identical to its coordinator copy and containing no repository or held-out paths. The [read-only readiness result](prelaunch-readiness.json) records exit 0 and `verified: true`; its [helper](check-ready.mjs) validates exact source sets, original hashes and nine-image coverage, command/environment identity, installer logs, 26 retained evidence files and both coordinator helper hashes.

The probe's external-request error stack exposes the new cohort's frozen implementation repository path. The raw bytes remain intact. Root accepted and separately disclosed this configuration-isolation limitation. No held-out solution contents or images were copied by setup; later actor access still requires an independent audit. The neutral actor-facing setup record does not disclose that repository path.

## Minimal procedure for an eligible later arm

Do not run the historical `build-workflow-freeze-1` helpers unchanged. Their probe and readiness scripts hardcode the spent old cohort and runtime path; their audit also assumes `bench-depth-1`, seven fixture files and the former generated-declaration scope. Use this study's two narrowly allowlisted helpers. Both accept only `codex-bench-depth-baseline-2` or `codex-bench-depth-candidate-1`; neither prepares workspaces or launches paid models. `check-ready.mjs` refuses an already spent workspace.

Before any new preparation, use the same frozen common environment. Native Node is `/tmp/storyfolio-node-check-20261011/node_modules/node/bin/node`, v22.22.1. Put its `bin` directory first on PATH so npm child processes also use it. The baseline's exact full PATH, browser cache, library path and LANG are in its frozen `inputs/capabilities.json`. Match those values, do not reconstruct the historical PATH. Browser/cache resources are `/tmp/storyfolio-browser-cache`, `/tmp/storyfolio-browser-libs/root/usr/lib/x86_64-linux-gnu`, and `/tmp/storyfolio-npm-cache`.

Use `TMPDIR=/var/tmp/storyfolio-comparison-runtime-20261012` throughout dry inspection, preparation, installation, capability proof and eventual launch. `/tmp` had only 38 MB free when reviewed, while `/var/tmp` had about 930 GB. No old cache, workspace or preview was removed. TMPDIR is not part of the runner input digest; the setup runtime record and readiness helper bind it separately.

With that environment, root's no-model runner commands are:

```sh
node evals/builds/bench-depth-2/verify-fixture.mjs
node evals/codex-build-run.mjs --case evals/builds/bench-depth-2/case.json --cohort codex-bench-depth-baseline-2 --capabilities evals/builds/local-capabilities.json --dry
node evals/codex-build-run.mjs --case evals/builds/bench-depth-2/case.json --cohort codex-bench-depth-baseline-2 --capabilities evals/builds/local-capabilities.json --prepare
```

The baseline is already prepared, so these are procedural references, not a request to repeat it. A candidate requires its supported miss and separately committed skill diff, with the same other inputs and capabilities. Resolve the new workspace from `meta.json`; never reuse the old actor's work tree or copy its dependencies. In the new workspace, perform the single pinned offline `npm ci` and preserve full command/result/logs. Do not upgrade packages, retry a failed paid turn, install optional skills, or download browsers to make setup pass.

After successful installation, launch [run-capability-probe.mjs](run-capability-probe.mjs) with the frozen Node and restored frozen environment:

```sh
node evals/runs/stage-3-comparison-1/run-capability-probe.mjs --cohort codex-bench-depth-baseline-2
```

This has already completed for the baseline. It preserves a new runtime record, exact command, full process stdout/stderr, timeout result and copied raw capability directory. It refuses overwrite. Its seven-minute outer process-group bound is local setup protection, distinct from the approved paid build/judge deadlines. The exact execution-tool launch and polling returns, including session 41850, are retained in `capability-tool-launch.json` and `capability-tool-poll-01.json` / `-02.json`.

Review all nine original images, preserve source before/after inventories, then write the neutral setup facts, original inventory/review and bound `setup/probe.json`. Only after these exist does this read-only command pass:

```sh
node evals/runs/stage-3-comparison-1/check-ready.mjs --cohort codex-bench-depth-baseline-2
```

The helper restores the four frozen environment values and TMPDIR for its only child command, runner `--dry`. Its success is setup readiness, not a model call or approval to change the paid envelope. Root separately handles the one-turn launch, complete-packet judge preflight, time limits, no-retry rule and usage record.

## Documentation and limitations

The OpenAI Docs skill was used for the Codex configuration portion. Official documentation confirms that legacy sandbox settings can take precedence over named permission profiles, and that loopback needs explicit network allowance. The actual prepared probe, not documentation, supplies evidence for this installed CLI. The current local capabilities deliberately remove legacy settings, enable the network proxy, allow only loopback hosts, disable unrelated plugins/skills and retain root filesystem reads. [Official permissions reference](https://learn.chatgpt.com/docs/permissions), [official CLI reference](https://learn.chatgpt.com/docs/cli/reference).

Standalone command-only sandbox testing still inherits user configuration; the future actor separately uses `--ignore-user-config`. Neither configuration isolation nor a starter capability pass establishes held-out filesystem isolation, actor uptake, model output quality, phone behavior, full prototype acceptance, author approval or cost. Record those independently rather than expanding this setup verdict.
