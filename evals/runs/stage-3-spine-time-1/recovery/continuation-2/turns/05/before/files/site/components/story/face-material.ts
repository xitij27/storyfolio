import * as THREE from "three";
import type { Look } from "@/lib/story/looks";

export type FaceMaterial = { material: THREE.MeshStandardMaterial; set: (from: THREE.Texture, to: THREE.Texture, amount: number) => void };
export function faceMaterial(look: Look, blank: THREE.Texture): FaceMaterial {
  const first = { value: blank };
  const second = { value: blank };
  const amount = { value: 0 };
  const material = new THREE.MeshStandardMaterial({
    color: look.surface.glows ? look.surface.color : "#ffffff",
    roughness: look.surface.roughness,
    metalness: 0,
    side: THREE.DoubleSide,
    map: blank,
    emissive: look.surface.glows ? "#ffffff" : "#000000",
    emissiveIntensity: look.surface.glows ? 1 : 0,
    emissiveMap: look.surface.glows ? blank : null,
    toneMapped: look.surface.glows,
  });
  material.onBeforeCompile = shader => {
    shader.uniforms.storyFrom = first;
    shader.uniforms.storyTo = second;
    shader.uniforms.storyAmount = amount;
    shader.fragmentShader = `uniform sampler2D storyFrom;\nuniform sampler2D storyTo;\nuniform float storyAmount;\n${shader.fragmentShader}`;
    const sample = "(storyAmount < 0.5 ? texture2D(storyFrom, vMapUv) : texture2D(storyTo, vMapUv))";
    shader.fragmentShader = shader.fragmentShader.replace("#include <map_fragment>", look.surface.glows ? "" : `diffuseColor *= ${sample};`);
    if (look.surface.glows) shader.fragmentShader = shader.fragmentShader.replace("#include <emissivemap_fragment>", `totalEmissiveRadiance *= ${sample}.rgb;`);
  };
  material.customProgramCacheKey = () => `story-face-v1-${look.surface.glows}`;
  return { material, set(from, to, mix) { first.value = from; second.value = to; amount.value = mix; } };
}
