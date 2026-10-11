import { createServer } from "node:http";
import { inspect } from "node:util";
const report = { modelCalls: 0, local: false, externalBlocked: false };
const server = createServer((request, response) => response.end("default-selector-local"));
try {
  await new Promise((yes, no) => { server.once("error", no); server.listen(0, "127.0.0.1", yes); });
  const response = await fetch(`http://127.0.0.1:${server.address().port}/`, { signal: AbortSignal.timeout(3000) });
  report.local = await response.text() === "default-selector-local";
} catch (error) { report.localError = inspect(error, { depth: 5 }); }
finally { await new Promise(done => server.close(done)); }
try {
  const response = await fetch("https://example.com/", { signal: AbortSignal.timeout(5000) });
  report.externalStatus = response.status;
} catch (error) {
  report.externalError = inspect(error, { depth: 5 });
  report.externalBlocked = report.externalError.includes("Proxy response (403)");
}
report.passed = report.local && report.externalBlocked;
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
