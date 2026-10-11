// React context regression tests with the real Story/controls modules.
// Scene is a stand-in here; browser.mjs separately tests the actual Canvas.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, join } from "node:path";

const dependencies = resolve(process.env.STORYFOLIO_TEST_DEPENDENCIES ?? "node_modules/storyfolio-build-dependencies-20261011/node_modules");
const require = createRequire(join(dependencies, "typescript/package.json"));
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const engine = resolve("skills/storyfolio/engine");
function load(relative, imports = {}) {
  const source = readFileSync(join(engine, relative), "utf8");
  const { outputText } = ts.transpileModule(source, { fileName: relative, compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX,
  } });
  const module = { exports: {} };
  const scopedRequire = name => {
    if (Object.hasOwn(imports, name)) return imports[name];
    if (["react", "react/jsx-runtime"].includes(name)) return require(name);
    throw new Error(`Unexpected regression-test import: ${name}`);
  };
  new Function("require", "module", "exports", outputText)(scopedRequire, module, module.exports);
  return module.exports;
}

function fixture({ webgl = true, scenes = [], html = [] } = {}) {
  const store = load("lib/story/controls.ts");
  const hooks = load("components/story/controls.tsx");
  const empty = () => null;
  function read(kind) {
    const controls = hooks.useControls();
    const record = { controls, sceneOff: hooks.useSceneOff(), value: hooks.useControl("inspection") };
    (kind === "scene" ? scenes : html).push(record);
    return record;
  }
  function Scene({ controls }) {
    const record = read("scene");
    assert.equal(record.controls, controls, "Scene props and hook must share one store");
    controls.set("inspection", 7);
    return React.createElement("span", null, "scene");
  }
  function Html() {
    const record = read("html");
    return React.createElement("span", null, `html:${record.controls.get("inspection")}`);
  }
  const { Story } = load("components/story/story.tsx", {
    "next/dynamic": { default: () => Scene }, "@/lib/story/controls": store,
    "@/lib/story/timeline": { playhead: empty },
    "./use-reduced-motion": { useReducedMotion: () => false },
    "./use-webgl-supported": { useWebGLSupported: () => webgl },
    "./use-look": { useLook: () => "plain" },
    "./webgl-boundary": { WebGLBoundary: ({ children }) => children },
    "./look-switch": { LookSwitch: empty }, "./rail": { ChapterRail: empty },
    "./overlay": { Overlay: empty }, "./meter": { Meter: empty },
    "./controls": hooks, "./validate": { checkBundle: () => [] },
  });
  const bundle = { story: { chapters: [] }, looks: [{ id: "plain" }], copy: {} };
  const element = () => React.createElement(Story, { bundle }, React.createElement(Html));
  return { element, hooks, store, scenes, html, Html };
}

test("scene hooks and HTML descendants share exactly the explicit scene store", () => {
  const f = fixture();
  assert.match(renderToStaticMarkup(f.element()), /html:7/);
  assert.equal(f.scenes.length, 1);
  assert.equal(f.html.length, 1);
  assert.equal(f.scenes[0].controls, f.html[0].controls);
  assert.equal(f.scenes[0].sceneOff, false);
  assert.equal(f.html[0].sceneOff, false);
});

for (const webgl of [false, null]) test(`HTML retains its store and sceneOff when WebGL is ${webgl}`, () => {
  const f = fixture({ webgl });
  assert.match(renderToStaticMarkup(f.element()), /data-scene="off"/);
  assert.equal(f.scenes.length, 0);
  assert.equal(f.html[0].sceneOff, true);
  f.html[0].controls.set("inspection", 3);
  assert.equal(f.html[0].controls.get("inspection"), 3);
});

test("separate Story instances never share their controls stores", () => {
  const f = fixture();
  renderToStaticMarkup(React.createElement(React.Fragment, null, f.element(), f.element()));
  assert.equal(f.scenes[0].controls, f.html[0].controls);
  assert.equal(f.scenes[1].controls, f.html[1].controls);
  assert.notEqual(f.scenes[0].controls, f.scenes[1].controls);
  f.scenes[0].controls.set("inspection", 12);
  assert.equal(f.html[0].controls.get("inspection"), 12);
  assert.equal(f.html[1].controls.get("inspection"), 7);
});

test("an outer provider cannot replace a Story's own store", () => {
  const f = fixture();
  const outer = f.store.createControls();
  outer.set("inspection", 99);
  renderToStaticMarkup(React.createElement(f.hooks.ControlsProvider, { controls: outer, sceneOff: true }, f.element()));
  assert.equal(f.scenes[0].controls, f.html[0].controls);
  assert.notEqual(f.scenes[0].controls, outer);
  assert.equal(outer.get("inspection"), 99);
});

test("a controls hook outside every provider still reports misuse", () => {
  const f = fixture();
  assert.throws(() => renderToStaticMarkup(React.createElement(f.Html)), /Story controls must be inside a Story/);
});
