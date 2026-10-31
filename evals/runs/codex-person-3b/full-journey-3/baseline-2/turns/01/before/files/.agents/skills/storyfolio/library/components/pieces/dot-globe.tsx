"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

import { LAND } from "@/content/land";
import { arcPoints, facing, landDots, toVector, type Place } from "@/lib/globe";

/*
  A globe drawn as dots of land, with arcs from each place to the next and
  rings that pulse where they are. The idea of Aceternity's GitHub Globe,
  written here from scratch: the land is a 2 KB mask (content/land.ts), not a
  map file, and there is no globe library.
*/

export type GlobeColours = { globe: string; land: string; arc: string; glow: string };
export const NIGHT: GlobeColours = { globe: "#1d1442", land: "#e9e4ff", arc: "#f2b84b", glow: "#a78bfa" };

const DOTS = landDots(LAND);

const glowVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const glowFragment = /* glsl */ `
  uniform vec3 colour;
  varying vec3 vNormal;
  void main() {
    float rim = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(colour, 1.0) * rim;
  }
`;

/** The globe itself, radius 1, for use inside any canvas. Turn it by turning a group round it. */
export function Globe({ places, colours = NIGHT, still = false }: { places: Place[]; colours?: GlobeColours; still?: boolean }) {
  const land = useRef<THREE.InstancedMesh>(null);
  const arcs = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    const mesh = land.current;
    if (!mesh) return;
    const dot = new THREE.Object3D();
    DOTS.forEach((place, i) => {
      dot.position.set(...toVector(place, 1.003));
      dot.lookAt(dot.position.clone().multiplyScalar(2));
      dot.updateMatrix();
      mesh.setMatrixAt(i, dot.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  const lines = useMemo(
    () => places.slice(1).map((to, i) => arcPoints(places[i], to, 1.003, 0.12 + 0.05 * i)),
    [places],
  );
  const glow = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: glowVertex,
        fragmentShader: glowFragment,
        uniforms: { colour: { value: new THREE.Color(colours.glow) } },
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    [colours.glow],
  );

  useFrame((state, delta) => {
    if (still) return;
    arcs.current?.children.forEach((line) => {
      const material = (line as unknown as { material: { dashOffset: number } }).material;
      material.dashOffset -= delta * 0.25;
    });
    rings.current?.children.forEach((ring, i) => {
      // Each ring grows and fades over 1.6 s, the places a little out of step.
      const t = ((state.clock.elapsedTime + i * 0.4) % 1.6) / 1.6;
      ring.scale.setScalar(0.01 + t * 0.09);
      ((ring as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 1 - t;
    });
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial color={colours.globe} emissive={colours.globe} emissiveIntensity={0.35} shininess={8} />
      </mesh>
      <mesh material={glow} scale={1.16}>
        <sphereGeometry args={[1, 48, 48]} />
      </mesh>
      <instancedMesh ref={land} args={[undefined, undefined, DOTS.length]}>
        <circleGeometry args={[0.0085, 6]} />
        <meshBasicMaterial color={colours.land} toneMapped={false} />
      </instancedMesh>
      <group ref={arcs}>
        {lines.map((points, i) => (
          <Line key={i} points={points} color={colours.arc} lineWidth={1.6} dashed dashSize={0.06} gapSize={0.04} toneMapped={false} />
        ))}
      </group>
      <group ref={rings}>
        {places.map((place) => {
          const at = new THREE.Vector3(...toVector(place, 1.004));
          return (
            <mesh key={`${place.lat},${place.lng}`} position={at} onUpdate={(m) => m.lookAt(at.clone().multiplyScalar(2))}>
              <ringGeometry args={[0.8, 1, 32]} />
              <meshBasicMaterial color={colours.arc} transparent toneMapped={false} side={THREE.DoubleSide} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function Turning({ places, colours, still, tilt }: { places: Place[]; colours?: GlobeColours; still: boolean; tilt: number }) {
  const yaw = useRef<THREE.Group>(null);
  const start = facing(places[0] ?? { lat: 0, lng: 0 })[1];
  useFrame((_, delta) => {
    if (yaw.current && !still) yaw.current.rotation.y += delta * 0.12;
  });
  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={yaw} rotation={[0, start, 0]}>
        <Globe places={places} colours={colours} still={still} />
      </group>
    </group>
  );
}

/** The globe in its own canvas, turning slowly. Fills its parent. Decorative. */
export default function DotGlobe({
  places,
  colours,
  still = false,
  tilt = 25,
}: {
  /** In the order travelled; an arc joins each to the next. */
  places: Place[];
  colours?: GlobeColours;
  still?: boolean;
  /** Degrees the north pole leans towards the viewer. */
  tilt?: number;
}) {
  return (
    <Canvas dpr={[1, 1.75]} frameloop={still ? "demand" : "always"} camera={{ fov: 40, position: [0, 0, 3.6] }} gl={{ alpha: true }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[-3, 3, 4]} intensity={1.6} />
      <Turning places={places} colours={colours} still={still} tilt={(tilt * Math.PI) / 180} />
    </Canvas>
  );
}
