import assert from "node:assert/strict";
import test from "node:test";
import { beatRestSamples, checkMatrix, expectedRequestReason, optionalPattern, requestProblem, storyContract } from "./check-lib.mjs";
import { playhead } from "../lib/story/timeline.ts";

test("later tall beats sample their whole dwell from arrival, not just their block top", () => {
  const boxes = [{ top: 0, height: 2000 }, { top: 2000, height: 2000 }, { top: 4000, height: 1000 }];
  const samples = beatRestSamples(boxes, 1000, ["start", "mid", "end"]);
  assert.deepEqual(samples[1].map(sample => sample.top), [1400, 2200, 3000]);
  for (let i = 0; i < samples.length; i++) {
    for (const [position, sample] of samples[i].entries()) {
      const head = playhead(sample.top, 1000, boxes);
      assert.equal(head.beat, i);
      assert.equal(head.dwell, position / 2);
    }
  }
});

test("empty request ignore does not suppress HTTP errors or failures without responses", () => {
  const ignore = optionalPattern("");
  assert.equal(ignore, null);
  assert.match(requestProblem({ url: "http://localhost/chunk.js", status: 404 }, { ignore }), /HTTP 404/);
  assert.match(requestProblem({ url: "http://localhost/chunk.js", failure: "net::ERR_CONNECTION_REFUSED" }, { ignore }), /ERR_CONNECTION_REFUSED/);
  assert.equal(requestProblem({ url: "http://localhost/image.svg", status: 200 }), null);
});

test("only explicitly blocked or ignored requests are omitted", () => {
  const block = optionalPattern("/extra\\.js$");
  assert.equal(requestProblem({ url: "http://localhost/extra.js", failure: "net::ERR_FAILED" }, { block }), null);
  assert.match(requestProblem({ url: "http://localhost/other.js", failure: "net::ERR_FAILED" }, { block }), /other\.js/);
});

test("only disabled-JavaScript CSP failures for same-origin Next scripts are expected", () => {
  const options = { noJavaScript: true, pageUrl: "http://localhost:3000/?look=light" };
  const script = { url: "http://localhost:3000/_next/static/chunks/app.js", resourceType: "script", failure: "csp" };
  for (const failure of ["csp", "net::ERR_BLOCKED_BY_CSP"]) {
    assert.equal(requestProblem({ ...script, failure }, options), null);
    assert.match(expectedRequestReason({ ...script, failure }, options), /JavaScript-disabled CSP/);
  }
  const unexpected = [
    { ...script, resourceType: "image" },
    { ...script, resourceType: "stylesheet" },
    { ...script, url: "http://other.test/_next/static/chunks/app.js" },
    { ...script, url: "http://localhost:3000/custom.js" },
    { ...script, failure: "net::ERR_CONNECTION_REFUSED" },
    { ...script, failure: "net::ERR_ABORTED" },
    { ...script, failure: undefined, status: 404 },
  ];
  for (const request of unexpected) assert.ok(requestProblem(request, options), JSON.stringify(request));
  assert.ok(requestProblem(script, { ...options, noJavaScript: false }));
});

test("every matrix case expects the declared IDs, including a beat missing from every rendering", () => {
  const contract = storyContract({ chapters: [{ beats: [{ id: "opening" }, { id: "missing" }, { id: "close" }] }] }, [{ id: "light" }, { id: "dark" }]);
  for (const entry of checkMatrix(contract)) {
    assert.ok(entry.flags.includes("--expect-beats=3"));
    assert.ok(entry.flags.includes("--expect-ids=opening,missing,close"));
  }
  assert.throws(() => storyContract({ chapters: [{ beats: [{ id: "same" }, { id: "same" }] }] }, [{ id: "light" }]), /unique/);
});

test("fixture-specific probes require explicit content contracts", () => {
  const contract = { ids: ["opening", "close"], lookIds: ["light"] };
  assert.ok(checkMatrix(contract).every(entry => !["failed-extra", "keyboard-overlay"].includes(entry.name)));
  const matrix = checkMatrix(contract, { overlay: { beat: "close", selector: ".link" }, lazyExtra: true });
  assert.ok(matrix.some(entry => entry.name === "failed-extra"));
  assert.ok(matrix.find(entry => entry.name === "keyboard-overlay").flags.includes("--keyboard-at=close"));
  assert.throws(() => checkMatrix(contract, { overlay: { beat: "missing", selector: ".link" } }), /declared beat/);
});

test("static fixture modes require no scene while the default engine retains it", () => {
  const contract = { ids: ["opening"], lookIds: ["light"] };
  const defaultMatrix = checkMatrix(contract);
  const staticMatrix = checkMatrix(contract, { staticPhone: true, staticReduced: true });
  for (const mode of ["phone", "reduced"]) {
    assert.ok(defaultMatrix.find(entry => entry.name === `light-${mode}`).flags.includes("--expect-scene=on"));
    const flags = staticMatrix.find(entry => entry.name === `light-${mode}`).flags;
    assert.ok(flags.includes("--expect-scene=off"));
    assert.ok(flags.includes("--hidden=canvas"));
    assert.ok(!flags.includes("--assert-still=300"));
  }
});
