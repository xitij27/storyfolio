"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
  "Exhibit", from the author's Lab sketches.

  One interactive piece: speech detection in noisy audio. Sound runs past as a spectrogram raised into a terrain; the amber
  strip marks where a detector hears speech and the pale strip where speech
  actually is. Scrolling tips the camera from a flat spectrogram into the
  terrain.

  Schematic on purpose: the audio is synthesised and the detector is a simple
  spectral-peak rule standing in for the trained LSTM. The caption says so.
*/

const W = 128; // columns of time
const H = 44; // frequency bins
const WIDTH = 8;
const DEPTH = 3.2;
const COLUMNS_PER_SECOND = 30;

const DEEP = new THREE.Color("#101829");
const MID = new THREE.Color("#3f5f95");
const PEAK = new THREE.Color("#e3ecff");
const ACCENT = new THREE.Color("#f2b84b");
const OFF = new THREE.Color("#1a2233");

const gauss = (x: number, mu: number, sigma: number) =>
  Math.exp(-((x - mu) * (x - mu)) / (2 * sigma * sigma));

/** The running audio: a ring buffer of spectra plus the two verdicts per column. */
function createSim() {
  const values = new Float32Array(W * H);
  const actual = new Uint8Array(W);
  const heard = new Uint8Array(W);
  let head = 0;
  let clock = 0;
  let pending = 0;
  let speaking = false;
  let until = 0.6;
  let envelope = 0;
  let score = 0;
  let hang = 0;

  const column = new Float32Array(H);

  function push(noise: number) {
    clock += 1 / COLUMNS_PER_SECOND;
    if (clock > until) {
      speaking = !speaking;
      until = clock + (speaking ? 0.7 + Math.random() * 1.1 : 0.45 + Math.random() * 0.9);
    }
    envelope += ((speaking ? 1 : 0) - envelope) * 0.35;
    const syllable = 0.62 + 0.38 * Math.sin(clock * 2 * Math.PI * 4.6);
    const f1 = 0.13 + 0.04 * Math.sin(clock * 1.3);
    const f2 = 0.34 + 0.07 * Math.sin(clock * 0.9 + 1);
    const f3 = 0.6 + 0.05 * Math.sin(clock * 0.7 + 2);

    for (let b = 0; b < H; b++) {
      const x = b / (H - 1);
      const voice =
        envelope *
        syllable *
        (gauss(x, f1, 0.035) + 0.75 * gauss(x, f2, 0.045) + 0.45 * gauss(x, f3, 0.05)) *
        (0.72 + 0.28 * Math.sin(x * 62));
      const hiss = (0.03 + noise * (0.5 + 0.5 / (1 + 6 * x))) * (0.35 + Math.random());
      column[b] = voice + hiss;
    }

    // The stand-in detector: speech has spectral peaks, noise is flat, so
    // compare the tallest part of the smoothed spectrum with its average.
    let peak = 0;
    let mean = 0;
    for (let b = 1; b < H - 1; b++) {
      const smooth = (column[b - 1] + column[b] + column[b + 1]) / 3;
      if (smooth > peak) peak = smooth;
      mean += smooth;
    }
    mean /= H - 2;
    score += (peak / (mean + 1e-4) - score) * 0.5;
    if (score > 2.3 && peak > 0.2) hang = 7;
    else hang = Math.max(0, hang - 1);

    values.set(column, head * H);
    actual[head] = envelope > 0.5 ? 1 : 0;
    heard[head] = hang > 0 ? 1 : 0;
    head = (head + 1) % W;
  }

  // Start with a full screen of sound instead of an empty floor.
  for (let i = 0; i < W; i++) push(0.15);

  return {
    /** Advances the audio; returns whether anything new arrived. */
    step(delta: number, noise: number) {
      pending += Math.min(delta, 0.1) * COLUMNS_PER_SECOND;
      let moved = false;
      while (pending >= 1) {
        push(noise);
        pending -= 1;
        moved = true;
      }
      return moved;
    },
    /** Oldest column first, so new sound enters on the right. */
    at: (ix: number) => (head + ix) % W,
    values,
    actual,
    heard,
  };
}

type Sim = ReturnType<typeof createSim>;

function Terrain({
  progress,
  noise,
  still,
}: {
  progress: RefObject<number>;
  noise: RefObject<number>;
  still: boolean;
}) {
  const terrain = useRef<THREE.Mesh>(null);
  const heardStrip = useRef<THREE.Mesh>(null);
  const actualStrip = useRef<THREE.Mesh>(null);
  const sim = useRef<Sim | null>(null);
  const eased = useRef(0);
  const scratch = useRef(new THREE.Color());

  useEffect(() => {
    const surface = new THREE.PlaneGeometry(WIDTH, DEPTH, W - 1, H - 1);
    surface.rotateX(-Math.PI / 2);
    surface.setAttribute("color", new THREE.BufferAttribute(new Float32Array(W * H * 3), 3));

    const strip = () => {
      const g = new THREE.PlaneGeometry(WIDTH, 0.14, W - 1, 1);
      g.rotateX(-Math.PI / 2);
      g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(W * 2 * 3), 3));
      return g;
    };
    const heard = strip();
    const actual = strip();

    if (terrain.current) terrain.current.geometry = surface;
    if (heardStrip.current) heardStrip.current.geometry = heard;
    if (actualStrip.current) actualStrip.current.geometry = actual;
    sim.current = createSim();
    paint(sim.current, surface, heard, actual, scratch.current);

    return () => {
      surface.dispose();
      heard.dispose();
      actual.dispose();
    };
  }, []);

  useFrame((state, delta) => {
    eased.current = THREE.MathUtils.damp(eased.current, progress.current ?? 0, 4, delta);
    const t = eased.current * eased.current * (3 - 2 * eased.current);

    // From almost overhead, where it reads as a flat spectrogram, down to eye
    // level, where the same data is a landscape.
    const aspect = state.size.width / state.size.height;
    const back = 1 / Math.min(1, aspect / 1.35);
    state.camera.position.set(0, (10.5 - 7.6 * t) * back, (1.4 + 5.4 * t) * back);
    // Aim past the terrain so it sits in the upper part of the screen, clear
    // of the caption.
    state.camera.lookAt(0, -0.7 * t, 1.0 - 0.65 * t);

    const s = sim.current;
    if (!s || still) return;
    if (
      s.step(delta, noise.current ?? 0) &&
      terrain.current &&
      heardStrip.current &&
      actualStrip.current
    ) {
      paint(
        s,
        terrain.current.geometry,
        heardStrip.current.geometry,
        actualStrip.current.geometry,
        scratch.current,
      );
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={terrain}>
        <meshStandardMaterial vertexColors roughness={0.7} metalness={0.05} />
      </mesh>
      <mesh ref={heardStrip} position={[0, 0.01, DEPTH / 2 + 0.22]}>
        <meshBasicMaterial vertexColors toneMapped={false} />
      </mesh>
      <mesh ref={actualStrip} position={[0, 0.01, DEPTH / 2 + 0.42]}>
        <meshBasicMaterial vertexColors toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Writes the current audio into the terrain's heights and colours. */
function paint(
  sim: Sim,
  surface: THREE.BufferGeometry,
  heard: THREE.BufferGeometry,
  actual: THREE.BufferGeometry,
  colour: THREE.Color,
) {
  const position = surface.getAttribute("position") as THREE.BufferAttribute;
  const tint = surface.getAttribute("color") as THREE.BufferAttribute;
  const heardTint = heard.getAttribute("color") as THREE.BufferAttribute;
  const actualTint = actual.getAttribute("color") as THREE.BufferAttribute;

  for (let ix = 0; ix < W; ix++) {
    const col = sim.at(ix);
    const isHeard = sim.heard[col] === 1;
    for (let iy = 0; iy < H; iy++) {
      // Row 0 of the plane is the far edge; low frequencies sit nearest.
      const v = sim.values[col * H + (H - 1 - iy)];
      const index = iy * W + ix;
      position.setY(index, v * 0.95);

      const level = Math.min(1, v / 1.1);
      if (level < 0.5) colour.copy(DEEP).lerp(MID, level * 2);
      else colour.copy(MID).lerp(PEAK, (level - 0.5) * 2);
      if (isHeard) colour.lerp(ACCENT, 0.18 + 0.5 * level);
      tint.setXYZ(index, colour.r, colour.g, colour.b);
    }

    const h = isHeard ? ACCENT : OFF;
    const a = sim.actual[col] === 1 ? PEAK : OFF;
    for (const row of [0, 1]) {
      heardTint.setXYZ(row * W + ix, h.r, h.g, h.b);
      actualTint.setXYZ(row * W + ix, a.r, a.g, a.b);
    }
  }

  position.needsUpdate = true;
  tint.needsUpdate = true;
  heardTint.needsUpdate = true;
  actualTint.needsUpdate = true;
  surface.computeVertexNormals();
}

export default function SpectrogramScene({
  progress,
  noise,
  still,
}: {
  progress: RefObject<number>;
  noise: RefObject<number>;
  still: boolean;
}) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 38, position: [0, 10.5, 1.4] }}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[-4, 6, 3]} intensity={1.7} />
      <directionalLight position={[5, 3, -4]} intensity={0.5} color="#8fa6ff" />
      <Terrain progress={progress} noise={noise} still={still} />
    </Canvas>
  );
}
