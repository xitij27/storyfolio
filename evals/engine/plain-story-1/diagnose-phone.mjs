import { chromium } from "/tmp/storyfolio-engine-acceptance-20261011/node_modules/playwright-core/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";

const noAntialias = process.argv.includes("--no-antialias");
const variants = (process.argv.find(value => value.startsWith("--variants="))?.slice(11) ?? "materials-refreshed,boxes-positive-offset,boxes-no-side-faces").split(",");
const output = new URL(noAntialias ? "./diagnostic-runtime-no-antialias/" : "./diagnostic-runtime/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ args: ["--no-sandbox", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
await context.addInitScript(noAntialias => {
  window.__diagnostic = { contexts: [], textures: [], stores: [], roots: [] };
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = { supportsFiber: true, inject: () => 1, onCommitFiberRoot: (_id, root) => window.__diagnostic.roots.push(root), onCommitFiberUnmount() {}, onPostCommitFiberRoot() {} };
  const getContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (...args) {
    if (noAntialias && args[0].startsWith("webgl")) args[1] = { ...args[1], antialias: false };
    const result = getContext.apply(this, args);
    if (result && args[0].startsWith("webgl") && !window.__diagnostic.contexts.includes(result)) window.__diagnostic.contexts.push(result);
    return result;
  };
  const sources = new Set();
  for (const proto of [WebGLRenderingContext.prototype, WebGL2RenderingContext.prototype]) {
    for (const method of ["texImage2D", "texSubImage2D"]) {
      const original = proto[method];
      proto[method] = function (...args) {
        const canvas = args.find(arg => arg instanceof HTMLCanvasElement);
        if (canvas && !sources.has(canvas)) { sources.add(canvas); window.__diagnostic.textures.push(canvas); }
        return original.apply(this, args);
      };
    }
  }
}, noAntialias);
const page = await context.newPage();
await page.goto("http://127.0.0.1:3010/?look=dark", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.evaluate(() => {
  const beat = document.querySelector('[data-beat="middle.fan"]');
  const rect = beat.getBoundingClientRect();
  scrollTo({ top: scrollY + rect.top + Math.max(0, rect.height - innerHeight), behavior: "instant" });
});
await page.waitForTimeout(5000);
await page.screenshot({ path: new URL("baseline.png", output).pathname });
const report = await page.evaluate(() => {
  const state = window.__diagnostic;
  const canvas = document.querySelector("canvas");
  const roots = [canvas, canvas.parentElement, document.querySelector(".story")].flatMap(element => Object.keys(element).filter(key => key.startsWith("__reactFiber")).map(key => element[key]));
  const queue = [...roots, ...state.roots.map(root => root.current)]; const seen = new Set(); const fibers = [];
  while (queue.length) {
    const fiber = queue.pop();
    if (!fiber || seen.has(fiber)) continue;
    seen.add(fiber);
    for (const value of Object.values(fiber.memoizedProps ?? {})) {
      if (value && typeof value.getState === "function") {
        try { const store = value.getState(); if (store?.scene && store?.gl && !state.stores.includes(value)) state.stores.push(value); } catch {}
      }
    }
    fibers.push({ tag: fiber.tag, type: typeof fiber.type === "string" ? fiber.type : fiber.type?.name, propKeys: Object.keys(fiber.memoizedProps ?? {}) });
    queue.push(fiber.child, fiber.sibling, fiber.return);
  }
  return {
    scrollY,
    contexts: state.contexts.map(gl => { const ext = gl.getExtension("WEBGL_debug_renderer_info"); const precision = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT); return { depthBits: gl.getParameter(gl.DEPTH_BITS), renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER), precision: precision && { rangeMin: precision.rangeMin, rangeMax: precision.rangeMax, precision: precision.precision }, attributes: gl.getContextAttributes() }; }),
    textures: state.textures.map(texture => ({ width: texture.width, height: texture.height, data: texture.toDataURL() })),
    stores: state.stores.length,
    scene: state.stores.map(store => { const { scene, camera, gl } = store.getState(); const meshes = []; scene.traverse(mesh => { if (mesh.isMesh) meshes.push({ uuid: mesh.uuid, geometry: mesh.geometry.type, geometryParameters: mesh.geometry.parameters, position: mesh.position.toArray(), parentPosition: mesh.parent.position.toArray(), parentRotation: mesh.parent.rotation.toArray(), matrixWorld: mesh.matrixWorld.elements, receiveShadow: mesh.receiveShadow, material: { type: mesh.material.type, precision: mesh.material.precision, polygonOffset: mesh.material.polygonOffset, offsetFactor: mesh.material.polygonOffsetFactor, offsetUnits: mesh.material.polygonOffsetUnits } }); }); return { camera: { near: camera.near, far: camera.far, position: camera.position.toArray() }, renderer: { precision: gl.capabilities.precision, pixelRatio: gl.getPixelRatio(), shadows: gl.shadowMap.enabled }, meshes }; }),
    fibers,
  };
});
for (const [i, texture] of report.textures.entries()) {
  await writeFile(new URL(`texture-${i}.png`, output), Buffer.from(texture.data.split(",")[1], "base64"));
  delete texture.data;
}
await writeFile(new URL("report.json", output), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify({ contexts: report.contexts, textures: report.textures, stores: report.stores, fiberCount: report.fibers.length }, null, 2));
if (report.stores) {
  const shaderProbe = await page.evaluate(async () => {
    const { scene, camera, raycaster, gl } = window.__diagnostic.stores[0].getState();
    raycaster.setFromCamera({ x: 266 / 390 * 2 - 1, y: 1 - 315 / 844 * 2 }, camera);
    const intersections = raycaster.intersectObjects(scene.children, true).slice(0, 12).map(hit => ({ distance: hit.distance, geometry: hit.object.geometry.type, position: hit.object.position.toArray(), parentPosition: hit.object.parent.position.toArray(), point: hit.point.toArray() }));
    const calls = []; const original = gl.renderBufferDirect;
    gl.renderBufferDirect = function (camera, scene, geometry, material, object, group) {
      const value = original.call(this, camera, scene, geometry, material, object, group);
      const properties = gl.properties.get(material); const program = properties.currentProgram;
      const gpu = gl.getContext();
      if (calls.length < 60 && geometry.type === "PlaneGeometry") calls.push({ object: object.uuid, material: material.uuid, receiveShadow: object.receiveShadow, program: program?.id, receiveShadowUniform: program ? gpu.getUniform(program.program, gpu.getUniformLocation(program.program, "receiveShadow")) : null, uniforms: program ? [...program.getUniforms().seq].map(uniform => ({ id: uniform.id, cache: uniform.cache })) : [] });
      return value;
    };
    await new Promise(resolve => setTimeout(resolve, 100));
    gl.renderBufferDirect = original;
    return { intersections, calls };
  });
  await writeFile(new URL("shader-probe.json", output), JSON.stringify(shaderProbe, null, 2) + "\n");
  for (const variant of variants) {
    await page.evaluate(variant => {
      const { scene, camera, gl } = window.__diagnostic.stores[0].getState();
      const boxes = []; const faces = [];
      scene.traverse(mesh => { if (mesh.isMesh && mesh.geometry.type === "BoxGeometry" && mesh.material.type === "MeshStandardMaterial") boxes.push(mesh); if (mesh.isMesh && mesh.geometry.type === "PlaneGeometry" && !mesh.receiveShadow) faces.push(mesh); });
      boxes.forEach(mesh => { mesh.visible = true; mesh.castShadow = true; mesh.material.depthWrite = true; mesh.material.polygonOffset = false; mesh.geometry.setDrawRange(0, Infinity); });
      faces.forEach(mesh => { mesh.position.z = .03; mesh.material.depthTest = true; mesh.renderOrder = 0; mesh.material.polygonOffsetFactor = -1; mesh.material.polygonOffsetUnits = -1; });
      camera.near = .1;
      if (variant === "without-boxes") boxes.forEach(mesh => mesh.visible = false);
      if (variant === "without-own-box") boxes.at(-1).visible = false;
      if (variant === "without-other-boxes") boxes.slice(0, -1).forEach(mesh => mesh.visible = false);
      if (variant === "without-box-shadows") boxes.forEach(mesh => mesh.castShadow = false);
      if (variant === "camera-near-one") camera.near = 1;
      if (variant === "offset-sixteen") faces.forEach(mesh => { mesh.material.polygonOffsetFactor = -16; mesh.material.polygonOffsetUnits = -16; });
      if (variant === "face-z-eight") faces.forEach(mesh => mesh.position.z = .08);
      if (variant === "without-face-depth-test") faces.forEach(mesh => { mesh.material.depthTest = false; mesh.renderOrder = 1000; });
      if (variant === "boxes-depth-write-off") boxes.forEach(mesh => mesh.material.depthWrite = false);
      if (variant === "faces-render-last") faces.forEach(mesh => mesh.renderOrder = 1000);
      if (variant === "no-shadows") { gl.shadowMap.enabled = false; scene.traverse(mesh => { if (mesh.material) mesh.material.needsUpdate = true; }); }
      if (variant === "face-z-one") faces.forEach(mesh => mesh.position.z = 1);
      if (variant === "only-first-box") boxes.forEach((mesh, i) => mesh.visible = i === 0);
      if (variant === "only-sixth-box") boxes.forEach((mesh, i) => mesh.visible = i === 5);
      if (variant === "standard-white-shader") {
        const material = faces.at(-1).material;
        const uniforms = gl.properties.get(material).uniforms;
        material.map = uniforms.storyFrom.value;
        material.onBeforeCompile = () => {};
        material.customProgramCacheKey = () => "diagnostic-standard-white";
        material.needsUpdate = true;
      }
      if (variant === "materials-refreshed") scene.traverse(mesh => { if (mesh.material) mesh.material.needsUpdate = true; });
      if (variant === "boxes-positive-offset") boxes.forEach(mesh => { mesh.material.polygonOffset = true; mesh.material.polygonOffsetFactor = 1; mesh.material.polygonOffsetUnits = 1; });
      if (variant === "boxes-no-side-faces") boxes.forEach(mesh => mesh.geometry.setDrawRange(24, 12));
      camera.updateProjectionMatrix();
      gl.shadowMap.needsUpdate = true;
    }, variant);
    await page.waitForTimeout(700);
    await page.screenshot({ path: new URL(`${variant}.png`, output).pathname });
    console.log(`Saved ${variant}`);
  }
}
await browser.close();
