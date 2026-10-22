"use client";
import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import type { Look } from "@/lib/story/looks";
import type { Formation } from "@/lib/story/formation";
export function Lighting({ look }: { look: Look }) {
  return <><color attach="background" args={[look.ground]} /><ambientLight intensity={look.lights.ambient} /><directionalLight castShadow position={[3, 6, 6]} intensity={look.lights.key} shadow-mapSize={[1024, 1024]} shadow-camera-left={-10} shadow-camera-right={10} shadow-camera-top={10} shadow-camera-bottom={-10} shadow-normalBias={0.02} /><directionalLight position={[-5, 2, 3]} intensity={look.lights.fill} /><directionalLight position={[1, 4, -5]} intensity={look.lights.rim} /></>;
}
export function Floor({ look, formationRef }: { look: Look; formationRef: RefObject<Formation> }) {
  const mesh = useRef<Mesh>(null);
  useFrame(() => { if (mesh.current) mesh.current.position.y = formationRef.current.floor; });
  return look.floor === "matte" ? <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[100, 100]} /><meshStandardMaterial color={look.ground} roughness={1} /></mesh> : null;
}
