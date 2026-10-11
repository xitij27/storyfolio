# Independent review of the parser repair

11 October 2026. Read-only review of the working changes to
`evals/lib/codex.mjs`, `evals/codex-build-judge.mjs`,
`evals/lib/codex.test.mjs` and `evals/lib/build-score.test.mjs`.
No blocking issue was found.

The repair adds exact terminal-message extraction for future build judges
while leaving `summariseCodex` and its historical commentary aggregate
unchanged. It requires an identified successful single turn and terminal
agent message, preserves that message separately, and passes its exact text
to JSON parsing. It does not search backwards for convenient valid JSON or
strip wrappers. Missing, partial, corrupt, failed and interrupted histories
remain failures. Existing rubric, eligibility, evidence and delivery checks
remain in place. The helper is included in future frozen judge implementation
inputs. No historical actor/judge outputs are migrated or rewritten.

Tests cover commentary followed by final JSON, malformed terminal output
after earlier valid JSON, absent terminal messages, corrupt/ambiguous streams,
process interruption, preserved raw aggregation, and no automatic retry.
The reviewer did not duplicate the coordinator's complete test run.

A separate read-only compatibility check enumerated retained `stream.jsonl`
and `judge.jsonl` files under `evals/runs/`. Of 115 files, the historical
summary helper classified 114 as completed when given its default exit
status. The new extractor accepted all 114, with zero rejection. This checks
event-shape compatibility only: it does not rejudge the outputs, infer the
actual process exit where absent, or approve every saved score.

Exact compatibility command:

```sh
node --input-type=module -e 'import {readFile,readdir} from "node:fs/promises";import {finalCodexMessage,summariseCodex} from "./evals/lib/codex.mjs";const paths=(await readdir("evals/runs",{recursive:true})).filter(p=>p.endsWith("stream.jsonl")||p.endsWith("judge.jsonl"));let eligible=0,good=0;const bad=[];for(const p of paths){const s=await readFile("evals/runs/"+p,"utf8");if(summariseCodex(s).failed)continue;eligible++;try{finalCodexMessage(s);good++;}catch(e){bad.push({path:p,error:String(e)})}}console.log(JSON.stringify({streams:paths.length,completedByOldHelper:eligible,accepted:good,rejected:bad},null,2));'
```

Result:

```json
{
  "streams": 115,
  "completedByOldHelper": 114,
  "accepted": 114,
  "rejected": []
}
```
