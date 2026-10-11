// Local deterministic probes, not a browser run, actor run or engine patch.
// Run from the repository root with the existing verification dependencies.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import path from "node:path";

const root = process.cwd();
const dependencies = path.resolve(process.argv[2] ?? "node_modules/storyfolio-build-dependencies-20261011/node_modules");
const require = createRequire(path.join(dependencies, "typescript/package.json"));
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const hashes = {};
function load(relative, imports = {}) {
  const source = readFileSync(path.join(root, relative), "utf8");
  hashes[relative] = createHash("sha256").update(source).digest("hex");
  const js = ts.transpileModule(source, { fileName: relative, compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX,
  } }).outputText;
  const module = { exports: {} };
  const scopedRequire = name => {
    if (Object.hasOwn(imports, name)) return imports[name];
    if (["react", "react/jsx-runtime", "three"].includes(name)) return require(name);
    throw new Error(`Unexpected diagnostic import: ${name}`);
  };
  new Function("require", "module", "exports", js)(scopedRequire, module, module.exports);
  return module.exports;
}
const engine = "skills/storyfolio/engine/";
const store = load(`${engine}lib/story/controls.ts`);
const controls = load(`${engine}components/story/controls.tsx`);
let webgl = true;
function SceneConsumer() {
  controls.useControl("inspection");
  return React.createElement("span", null, "scene consumer");
}
const empty = () => null;
const { Story } = load(`${engine}components/story/story.tsx`, {
  "next/dynamic": { default: () => SceneConsumer },
  "@/lib/story/controls": store,
  "@/lib/story/timeline": { playhead: empty },
  "./use-reduced-motion": { useReducedMotion: () => false },
  "./use-webgl-supported": { useWebGLSupported: () => webgl },
  "./use-look": { useLook: () => "probe" },
  "./webgl-boundary": { WebGLBoundary: ({ children }) => children },
  "./look-switch": { LookSwitch: empty }, "./rail": { ChapterRail: empty },
  "./overlay": { Overlay: empty }, "./meter": { Meter: empty },
  "./controls": controls, "./validate": { checkBundle: () => [] },
});
const bundle = { story: { chapters: [] }, looks: [{ id: "probe" }], copy: {} };
const story = () => React.createElement(Story, { bundle }, React.createElement(SceneConsumer));
let thrown;
try { renderToStaticMarkup(story()); } catch (error) { thrown = error.message; }
assert.equal(thrown, "Story controls must be inside a Story");
webgl = false;
assert.match(renderToStaticMarkup(story()), /scene consumer/);
webgl = true;
assert.match(renderToStaticMarkup(React.createElement(controls.ControlsProvider,
  { controls: store.createControls(), sceneOff: false }, story())), /scene consumer/);

const { createFaces } = load(`${engine}components/story/faces.ts`);
const originalDocument = globalThis.document;
const dimensions = [];
globalThis.document = {
  fonts: { ready: Promise.resolve() },
  createElement: () => ({ width: 0, height: 0, getContext: () => ({
    clearRect() {}, fillRect() {}, save() {}, restore() {},
  }) }),
};
try {
  for (const coarse of [false, true]) {
    const faces = createFaces([{ id: "probe", beat: "question", piece: 0,
      draw: (_context, width, height) => dimensions.push({ coarse, width, height }),
    }], { surface: { glows: false, color: "#fff" } }, coarse);
    faces.draw(); faces.dispose();
  }
} finally { globalThis.document = originalDocument; }
assert.deepEqual(dimensions, [{ coarse: false, width: 768, height: 1024 }, { coarse: true, width: 384, height: 512 }]);
const plane = { width: 3, height: 1 };
const aspectStretch = (plane.width / dimensions[0].width) / (plane.height / dimensions[0].height);
assert.equal(aspectStretch, 4);
console.log(JSON.stringify({
  schemaVersion: 1, kind: "deterministic-engine-risk-probe", node: process.version,
  dependencies, versions: { typescript: ts.version, react: React.version, three: require("three").REVISION },
  sourceSha256: hashes,
  controls: { sceneConsumerError: thrown, htmlConsumerPass: true, outerProviderControlPass: true,
    limitations: "Real Story and controls modules; dynamic scene is a context consumer stand-in. SSR propagation, not a WebGL/Canvas integration or failure-boundary browser proof." },
  faceAspect: { dimensions, plane, uncompensatedPixelCircleWidthHeightRatio: aspectStretch,
    limitations: "Real createFaces callback dimensions with a fake canvas. Geometry mapping predicts stretch; no rendered pixels or generalized quality score. Custom drawing can compensate." },
  result: "Both known risks reproduced; shipped engine unchanged.",
}, null, 2));
