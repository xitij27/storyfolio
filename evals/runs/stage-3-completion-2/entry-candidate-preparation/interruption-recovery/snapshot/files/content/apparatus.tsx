"use client";
import { useMemo } from "react";
import { CatmullRomCurve3, TubeGeometry, Vector3 } from "three";
import type { PieceProps } from "@/components/story/types";

// Illustrative apparatus, built locally. It is not a Mosslink wiring plan.
export function Apparatus({ index, material, look }: PieceProps) {
  const cables = useMemo(() => [
    [[-0.32, 0.04, 0.2], [-0.29, -0.18, 0.2], [-0.02, -0.18, 0.2], [-0.02, 0.06, 0.2]],
    [[0.13, 0.06, 0.2], [0.22, -0.18, 0.2], [0.28, -0.3, 0.2]],
  ].map(points => new TubeGeometry(new CatmullRomCurve3(points.map(p => new Vector3(...p))), 24, 0.007, 6, false)), []);
  const dark = look.id === "dark";
  const metal = dark ? "#627778" : "#a6a797";
  const green = dark ? "#316853" : "#265f48";
  const gold = "#c59a52";
  const shell = index === 1 ? green : index === 0 ? look.surface.color : dark ? "#23363c" : "#c7c4b4";
  const depth = index === 0 ? 0.22 : index === 1 ? 0.065 : 0.24;
  return <group>
    <mesh castShadow receiveShadow><boxGeometry args={[1, 1, depth]} /><meshStandardMaterial color={shell} roughness={0.65} metalness={index === 0 ? 0.3 : 0.1} /></mesh>
    <mesh position={[0, 0, depth / 2 + 0.003]} material={material}><planeGeometry args={[0.94, 0.94]} /></mesh>
    {index === 0 && <>
      {cables.map((geometry, i) => <mesh key={i} geometry={geometry}><meshStandardMaterial color={i ? "#b18b47" : "#384e49"} roughness={0.65} /></mesh>)}
      {[-0.4, 0.4].flatMap(x => [-0.4, 0.4].map(y => <group key={`${x}-${y}`} position={[x, y, 0.16]}>
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.035, 0.035, 0.15, 12]} /><meshStandardMaterial color={metal} metalness={0.6} roughness={0.35} /></mesh>
        <mesh position={[0, 0, 0.08]}><sphereGeometry args={[0.022, 12, 8]} /><meshStandardMaterial color={gold} metalness={0.6} roughness={0.35} /></mesh>
      </group>))}
      {[-0.31, -0.2, -0.09, 0.02, 0.13, 0.24].map(x => <mesh key={x} position={[x, 0.06, 0.18]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.009, 0.009, 0.18, 8]} /><meshStandardMaterial color={gold} metalness={0.6} roughness={0.3} /></mesh>)}
      <mesh position={[-0.47, 0, 0.02]}><boxGeometry args={[0.04, 0.62, 0.35]} /><meshStandardMaterial color={metal} /></mesh>
      <mesh position={[0.47, 0, 0.02]}><boxGeometry args={[0.04, 0.62, 0.35]} /><meshStandardMaterial color={metal} /></mesh>
    </>}
    {index === 1 && <>
      <mesh position={[-0.05, 0.1, 0.1]} castShadow><boxGeometry args={[0.22, 0.2, 0.12]} /><meshStandardMaterial color="#172523" roughness={0.75} /></mesh>
      {Array.from({ length: 8 }, (_, i) => <mesh key={i} position={[-0.36 + i * 0.1, 0.38, 0.066]}><boxGeometry args={[0.038, 0.055, 0.015]} /><meshStandardMaterial color={gold} metalness={0.6} roughness={0.4} /></mesh>)}
      {[[-0.34, -0.1], [0.31, 0.1], [0.29, -0.08]].map(([x, y], i) => <mesh key={i} position={[x, y, 0.075]}><boxGeometry args={[0.09, 0.12, 0.075]} /><meshStandardMaterial color={i ? metal : "#162522"} roughness={0.5} /></mesh>)}
      {[-0.4, 0.4].flatMap(x => [-0.4, 0.4].map(y => <mesh key={`${x}-${y}`} position={[x, y, 0.038]}><ringGeometry args={[0.017, 0.028, 12]} /><meshStandardMaterial color={gold} /></mesh>))}
    </>}
    {index > 1 && <>
      <mesh position={[-0.36, -0.34, 0.18]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.065, 0.065, 0.12, 20]} /><meshStandardMaterial color={metal} metalness={0.6} roughness={0.35} /></mesh>
      <mesh position={[0.34, -0.34, 0.145]}><sphereGeometry args={[0.035, 12, 8]} /><meshStandardMaterial color={look.accent} /></mesh>
    </>}
  </group>;
}
