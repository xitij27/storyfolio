import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { prepareBuildJudge, runBuildJudge } from "../../../codex-build-judge.mjs";
import { disabledSkills } from "../../../lib/codex.mjs";
import { hash, json } from "../../../lib/build.mjs";

// Coordinator proposal only. No frozen input or implementation is changed.
// Execution requires a separately saved, explicit author approval.
const folder = dirname(fileURLToPath(import.meta.url));
const proposal = join(folder, "judge-size-proposal");
const maximum = 3 * 1024 * 1024;
const run = "evals/runs/codex-build-completion-1/embedded-completion-1/baseline-1";
const mode = process.argv[2];
if (!["--prepare", "--execute"].includes(mode)) throw new Error("Use --prepare or --execute");
const prepared = await prepareBuildJudge({ run, acceptance: "acceptance/result/manifest.json", maxPromptBytes: maximum });
if (mode === "--prepare") {
  await mkdir(proposal);
  await writeFile(join(proposal, "prompt.md"), prepared.prompt, { flag: "wx" });
  const record = { status: "Proposed, not approved", modelCalls: 0, originalMaximumBytes: 2097152,
    proposedMaximumBytes: maximum, actualPromptBytes: prepared.promptBytes,
    promptSha256: prepared.promptSha256, inputDigest: prepared.frozen.digest,
    model: "gpt-6-astra", reasoningEffort: "medium", timeoutMs: 600000,
    scope: "One previously unused judge, unchanged complete evidence and rubric. No actor turn, retry, truncation or frozen-file edit. Only the prompt-size allowance would change." };
  await writeFile(join(proposal, "proposal.json"), json(record), { flag: "wx" });
  console.log(json(record));
} else {
  const approval = JSON.parse(await readFile(join(proposal, "approval.json"), "utf8"));
  const record = JSON.parse(await readFile(join(proposal, "proposal.json"), "utf8"));
  if (approval.authorized !== true || approval.maximumPromptBytes !== maximum || !approval.exactAuthorReply?.trim()) throw new Error("Explicit author approval of the proposed size limit is required");
  if (record.promptSha256 !== prepared.promptSha256 || hash(await readFile(join(proposal, "prompt.md"))) !== prepared.promptSha256) throw new Error("Evidence differs from the reviewable proposal");
  const capabilities = JSON.parse(await readFile(join(prepared.inputs, "capabilities.json"), "utf8"));
  if (hash(await readFile(capabilities.cliExecutable)) !== capabilities.cliSha256) throw new Error("Frozen CLI changed");
  const disabled = await disabledSkills();
  const result = await runBuildJudge(prepared, { disabled, cli: { executable: capabilities.cliExecutable, sha256: capabilities.cliSha256, version: capabilities.cliVersion } });
  console.log(json({ run, ...result }));
  if (!result.complete) process.exitCode = 1;
}
