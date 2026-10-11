import { writeFile } from "node:fs/promises";
const response = await fetch("http://127.0.0.1:3011");
const body = await response.text();
const expected = ["scope.opening", "responsibilities.split", "state.table", "transition.diagram", "observation.fixture", "observation.evidence", "review.close"];
const observed = [...body.matchAll(/data-beat="([^"]+)"/g)].map(match => match[1]);
const result = { url: "http://127.0.0.1:3011", checked: new Date().toISOString(),
  status: response.status, expected, observed, allSevenBeatIds: JSON.stringify(expected) === JSON.stringify(observed),
  containsAda: body.includes("Ada Mensah"),
  command: "PATH=/tmp/storyfolio-node-check-20261011/node_modules/.bin:$PATH npm run start -- --hostname 127.0.0.1 --port 3011",
  cwd: "/tmp/storyfolio-evals/build-embedded-completion-1-HA9i68",
  note: "Independent production preview. The earlier preview-check.json used the wrong data-beat-id attribute; the actual site contract is data-beat. That coordinator check failure is preserved. This check uses the real contract. Engine preview on port 3010 is separate. Server lifetime depends on the local session." };
await writeFile(new URL("preview-verified.json", import.meta.url), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (response.status !== 200 || !result.allSevenBeatIds || !result.containsAda) process.exitCode = 1;
