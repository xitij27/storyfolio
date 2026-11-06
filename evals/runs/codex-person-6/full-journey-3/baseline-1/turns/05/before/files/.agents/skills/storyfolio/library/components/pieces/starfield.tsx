"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { rand } from "@/lib/rand";

/*
  A slowly turning field of twinkling stars behind a heading. The idea of
  React Bits' Galaxy, written here from scratch: points on a shell round the
  camera, each with its own colour and twinkle, drawn as soft discs.
*/

const vertex = /* glsl */ `
  attribute float phase;
  attribute vec3 tint;
  uniform float time;
  uniform float twinkle;
  uniform float size;
  varying vec3 vTint;
  varying float vGlow;
  void main() {
    vec4 view = modelViewMatrix * vec4(position, 1.0);
    vGlow = 1.0 - twinkle + twinkle * (0.5 + 0.5 * sin(time * 1.7 + phase));
    vTint = tint;
    gl_PointSize = size * vGlow * (60.0 / -view.z);
    gl_Position = projectionMatrix * view;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vTint;
  varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vTint, a * a * vGlow);
  }
`;

function Stars({
  count,
  hue,
  saturation,
  twinkle,
  speed,
  still,
}: {
  count: number;
  hue: number;
  saturation: number;
  twinkle: number;
  speed: number;
  still: boolean;
}) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const position = new Float32Array(count * 3);
    const tint = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    const colour = new THREE.Color();
    for (let i = 0; i < count; i++) {
      // A uniform direction, at a distance between 20 and 60.
      const z = rand(i, 1) * 2 - 1;
      const t = rand(i, 2) * Math.PI * 2;
      const r = 20 + rand(i, 3) * 40;
      const s = Math.sqrt(1 - z * z);
      position.set([r * s * Math.cos(t), r * s * Math.sin(t), r * z], i * 3);
      colour.setHSL(((hue + (rand(i, 4) - 0.5) * 60) / 360 + 1) % 1, saturation * rand(i, 5), 0.7 + rand(i, 6) * 0.3);
      tint.set([colour.r, colour.g, colour.b], i * 3);
      phase[i] = rand(i, 7) * Math.PI * 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(position, 3));
    g.setAttribute("tint", new THREE.BufferAttribute(tint, 3));
    g.setAttribute("phase", new THREE.BufferAttribute(phase, 1));
    return g;
  }, [count, hue, saturation]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: { time: { value: 0 }, twinkle: { value: twinkle }, size: { value: 2.4 } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [twinkle],
  );

  useFrame((_, delta) => {
    if (still || !points.current) return;
    material.uniforms.time.value += delta;
    points.current.rotation.y += delta * 0.02 * speed;
    points.current.rotation.x += delta * 0.006 * speed;
  });

  return <points ref={points} geometry={geometry} material={material} />;
}

/** Fills its parent. Decorative: put it behind content, hidden from assistive tech. */
export default function Starfield({
  count = 2400,
  hue = 240,
  saturation = 0.4,
  twinkle = 0.4,
  speed = 1,
  still = false,
}: {
  count?: number;
  /** Hue the stars gather round, in degrees. */
  hue?: number;
  saturation?: number;
  /** 0 is steady, 1 fades each star fully in and out. */
  twinkle?: number;
  speed?: number;
  /** Under reduced motion: one still frame. */
  still?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={still ? "demand" : "always"}
      camera={{ fov: 60, position: [0, 0, 0.01], near: 0.01, far: 200 }}
      gl={{ alpha: true, antialias: false }}
    >
      <Stars count={count} hue={hue} saturation={saturation} twinkle={twinkle} speed={speed} still={still} />
    </Canvas>
  );
}
