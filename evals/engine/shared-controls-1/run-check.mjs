// Runs already installed tools and retains complete logs; never invokes a model.
import { spawn } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const study = path.dirname(fileURLToPath(import.meta.url));
const [variant, check] = process.argv.slice(2);
if (!["baseline", "patched"].includes(variant) || !["build", "typecheck", "lint"].includes(check)) throw new Error("Use baseline|patched build|typecheck|lint");
const destination = path.join(study, variant, `${check}.log`);
if (existsSync(destination)) throw new Error(`Will not overwrite ${destination}`);
const started = new Date().toISOString();
const child = spawn("npm", ["run", check, ...(check === "build" ? ["--", "--webpack"] : [])], {
  cwd: path.join(study, "runtime", variant), env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  stdio: ["ignore", "pipe", "pipe"],
});
let output = "";
for (const stream of [child.stdout, child.stderr]) stream.on("data", chunk => { output += chunk; process.stdout.write(chunk); });
child.on("close", code => {
  writeFileSync(destination, `Started ${started}\nNode ${process.version}\nCommand npm run ${check}${check === "build" ? " -- --webpack" : ""}\n${output}\nExit ${code}\n`);
  process.exitCode = code ?? 1;
});
