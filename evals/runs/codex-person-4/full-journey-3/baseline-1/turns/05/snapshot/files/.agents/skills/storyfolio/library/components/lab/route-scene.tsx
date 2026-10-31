"use client";

import { useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { Globe, type GlobeColours } from "@/components/pieces/dot-globe";
import { facing, type Place } from "@/lib/globe";

/*
  "Route", from the author's Lab sketches. The globe stays on screen and
  turns to each place as the page scrolls, with the work done there in the
  caption. Drawn with the library's own dot globe at radius 100, the scale
  the sketch was made at.
*/

const COLOURS: GlobeColours = { globe: "#141b2b", land: "#e3ecff", arc: "#f2b84b", glow: "#8fa6ff" };

const smoothstep = (x: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function World({ progress, stops, still }: { progress: RefObject<number>; stops: Place[]; still: boolean }) {
  const pitch = useRef<THREE.Group>(null);
  const yaw = useRef<THREE.Group>(null);
  const eased = useRef(0);
  const turns = stops.map(facing);

  useFrame((state, delta) => {
    eased.current = THREE.MathUtils.damp(eased.current, progress.current ?? 0, 4, delta);
    const at = eased.current * (turns.length - 1);
    const k = Math.max(0, Math.min(Math.floor(at), turns.length - 2));
    const t = turns.length > 1 ? smoothstep(at - k, 0.2, 0.8) : 0;
    const next = turns[k + 1] ?? turns[k];

    if (pitch.current && yaw.current) {
      pitch.current.rotation.x = THREE.MathUtils.lerp(turns[k][0], next[0], t) * 0.85;
      // Take the short way round between two longitudes.
      let turn = next[1] - turns[k][1];
      if (turn > Math.PI) turn -= 2 * Math.PI;
      if (turn < -Math.PI) turn += 2 * Math.PI;
      yaw.current.rotation.y = turns[k][1] + turn * t;
    }

    const aspect = state.size.width / state.size.height;
    state.camera.position.z = 330 / Math.min(1, aspect / 1.2);
  });

  return (
    // Off to the right, so the caption has the left of the screen.
    <group position={[42, 8, 0]}>
      <group ref={pitch}>
        <group ref={yaw}>
          <group scale={100}>
            <Globe places={stops} colours={COLOURS} still={still} />
          </group>
        </group>
      </group>
    </group>
  );
}

export default function RouteScene({
  progress,
  stops,
  still = false,
}: {
  progress: RefObject<number>;
  /** The places in order; the scroll turns the globe from each to the next. */
  stops: Place[];
  still?: boolean;
}) {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ fov: 42, position: [0, 0, 330], near: 1, far: 2000 }}>
      <ambientLight intensity={1.4} color="#c7d3ff" />
      <directionalLight position={[-300, 300, 400]} intensity={2.2} />
      <World progress={progress} stops={stops} still={still} />
    </Canvas>
  );
}
