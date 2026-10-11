# Stage 3 first build baseline

Protocol for the first bounded build baseline. Execution status and results
belong in the cohort findings, not in changes to these frozen inputs. This follows
the [governing review](2026-10-11-stage-review.md) and the author's
[desktop and phone engine approval](../../history/2026-10-11-engine-approval.md).
It changes no shipped skill instructions.

## Question and scope

With the approved engine, the unchanged planning skill and an explicit
external request permitting building, what does an agent get wrong while
turning a complete approved storyboard into the spine, chapters and finished
local site? This is one derivative embedded-engineer case, `embedded-1`,
using row cards. It tests stops 4 to 6 and build-start environment checks.
It does not test concept sketches, before-stop-1 timing or non-sheet-object
generality. Those require separately frozen questions and approval after
this cost probe, not additional runs inferred from this protocol.

The [fixture](../../../evals/builds/embedded-1/README.md) freezes all
fictional facts, disclosure decisions, derived assets and source hashes.
The missing photo is explicitly replaced by an authored explanatory
schematic, not a purported photograph or bench measurement. The public
contact and accessible corrected CV are explicit fictional confirmations.
Static phone and reduced-motion behavior follows the derivative storyboard.
The original saved planning conversation remains unchanged.

## Fixed inputs and conversation

The case manifest freezes fixture files and expectations, the skill and
engine, dependency lock, three prompts, rubric, this protocol, runner,
acceptance checker, judge implementation and capability configuration.
The prepared cohort also records the CLI version/binary, Node, relevant
environment and disabled-skill inventory. Freeze and commit implementation
before the first paid call. No skill or source edit while a check runs.

The external continuation contract is in
[turn 1](../../../evals/prompts/build-turn1.md), unchanged for a future
matched rerun. It overrides the shipped skill's planning-only scope for
this experiment without changing the skill itself. Engine README and
AGENTS instructions are deliberately available; their technical guidance
is part of both arms. The actor does not receive the judge rubric.

Each actor turn is invoked separately. The coordinator saves the actual
stopping-point evidence and a gate tied to that turn's artifact digest
before sending the next fixed prompt. Turn 2 chooses the first look; turn 3
chooses the first recommended wording. If the preceding choice was not
offered or the required working artifact is absent, stop the experiment
and preserve that miss. Do not improvise a corrective prompt or claim the
next stop was tested. The final prompt explicitly leaves real phone
approval pending.

Turns 2 and 3 decline optional skills. Installation restraint before this
explicit refusal and after it are separate observations. If no skill was
recommended, refusal handling remains unobserved; absence of a recommendation
is assessed separately for relevance. This fixed refusal cues optionality
and does not prove that the agent independently knows that policy.

## Scoring and source limits

Use [the build criteria](../../../evals/prompts/build-criteria.md), with
`pass`, `fail` or `unobserved` and artifact evidence for every criterion.
Record each machine-check item separately. Only stops actually reached can
be judged. Automatic build/browser results remain distinct from an
independent judge's behavioral assessment and the coordinator's screenshot
review. No screenshot-only result proves physical-phone performance.

No complementary skill is enabled for the actor. This first probe has no
frozen external installation-source packet. Correctly naming a useful
candidate and its purpose can be observed, but a current installation
command cannot be verified online by the restricted actor. Mark unavailable
verification unobserved, preserve any guessed command as unsupported, and
do not attribute a network limit to missing skill instructions. Any later
source packet changes the experimental inputs and needs a newly frozen
cohort; it must be identical across the arms being compared.

Only a saved miss can justify a new instruction. Write the smallest change
against the specific observation, then repeat that same question. No
`other-skills.md`, early-stop machine-check instruction or sketch reference
is owed merely because the design names it.

## Capability and integrity checks

Prepare outside this repository, then install the frozen lock using the
coordinator's cache or separately authorized network. The actor receives
the setup result and pre-scaffold folder inventory as data; those do not
count as the actor inspecting its environment. Capture failures before
model execution too.

Probe the actual CLI sandbox without a model call before allowing turn 1.
The old network-disabled policy fails a loopback bind with `EPERM` on this
host. The explicit [local capability profile](../../../evals/builds/local-capabilities.json)
uses a restricted network proxy with only loopback targets allowed. Verify
local HTTP, a blocked external request, a production build and a browser
capture. Do not substitute unrestricted external network or an unsandboxed
actor if these fail. Save the profile, exact probe command, logs and report.

Use the coordinator-owned checker and frozen expected beat IDs, text,
links and fallback policies. Its commands invoke known tool entry points
instead of trusting actor-editable package scripts. A separate coordinator
dependency tree prevents ordinary actor edits to its own dependencies
from silently replacing the check command. Installed dependency trees are
excluded from source snapshots, so complete dependency-tampering detection
is not established. The sandbox is not a read jail; inspect actual reads
for repository, earlier-run and disabled-skill contamination.

Snapshot allowlisted source as bytes, with additions, changes and deletions,
and inventory unexpected files. Exclude dependencies, build output, browser
caches and duplicate generated screenshots. Save coordinator reports and
screenshots separately. Preserve incomplete attempts; no automatic retry,
overwrite or selective rejudging.

## Bounds and next decision

This approval covers **one baseline conversation**, at most three actor
turns on `gpt-6.1-sol` at medium reasoning, followed by at most one independent
`gpt-6-astra` medium judgement. No stronger-model substitution is automatic.
Each actor turn has a 15-minute deadline and the conversation has a
40-minute cumulative model-call wall-time ceiling. Between turns, stop if
reported input plus output exceeds 1.5 million tokens. This token check is
not a hard per-turn token cap; resumed counters can be cumulative, so the
record must explain the aggregation used. The judge gets at most ten
minutes. Time limits do not impose a fixed dollar charge or provider token
quota; retain raw usage and report actual observed exposure.

After this conversation, preserve findings, all failures, source snapshots,
checks and screenshots, and report usage and model-call time. Review that
cost with the author before any second baseline, candidate rerun, early-stop
study, planning regression or whole-site proof. The original 11 to 13 run
estimate is not blanket authorization. A failure, timeout or incomplete
result consumes this probe allowance; retry requires a new explicit decision.

## CLI sources checked on 11 October 2026

Local `codex-cli 0.162.1` help was inspected. Official
[CLI reference](https://learn.chatgpt.com/docs/developer-commands?surface=cli)
documents JSON execution, user-config isolation, resume and sandbox flags.
The [configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
documents permission profiles and network-proxy domain controls. The
[security documentation](https://learn.chatgpt.com/docs/security) provides
the policy context. Runtime probes, not documentation alone, establish
what works in this environment. The OpenAI Docs skill was used for this
bounded CLI check; no model choice or pricing claim was inferred from it.
