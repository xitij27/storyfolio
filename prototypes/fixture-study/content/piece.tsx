"use client";

import { useMemo } from "react";
import { Shape } from "three";
import type { PieceProps } from "@/components/story/types";
import { useControl } from "@/components/story/controls";

const ink = "#26352f";
const metal = "#a7aea0";
const gold = "#b79d64";
const cream = "#e2dfd0";
const sage = "#8a9a86";

/** A machined edge, with the full bevel included in the stated dimensions. */
function Case({ width, height, depth, radius = 0.04, color, position = [0, 0, 0], roughness = 0.55 }: {
  width: number; height: number; depth: number; radius?: number; color: string;
  position?: [number, number, number]; roughness?: number;
}) {
  const bevel = Math.min(0.014, depth / 5, radius / 2);
  const shape = useMemo(() => {
    const x = width / 2 - bevel;
    const y = height / 2 - bevel;
    const r = radius - bevel;
    const path = new Shape();
    path.moveTo(-x + r, -y);
    path.lineTo(x - r, -y);
    path.quadraticCurveTo(x, -y, x, -y + r);
    path.lineTo(x, y - r);
    path.quadraticCurveTo(x, y, x - r, y);
    path.lineTo(-x + r, y);
    path.quadraticCurveTo(-x, y, -x, y - r);
    path.lineTo(-x, -y + r);
    path.quadraticCurveTo(-x, -y, -x + r, -y);
    return path;
  }, [width, height, radius, bevel]);
  return <group position={position}>
    <mesh position={[0, 0, -depth / 2 + bevel]} castShadow receiveShadow>
      <extrudeGeometry args={[shape, { depth: depth - bevel * 2, steps: 1, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 6 }]} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={0.12} />
    </mesh>
  </group>;
}

function Screw({ x, y, z, dark = false }: { x: number; y: number; z: number; dark?: boolean }) {
  return <group position={[x, y, z]}>
    <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.021, 0.023, 0.012, 16]} />
      <meshStandardMaterial color={dark ? "#4b584d" : metal} metalness={0.6} roughness={0.4} />
    </mesh>
    <mesh position={[0, 0, 0.007]} rotation={[0, 0, Math.PI / 5]}>
      <boxGeometry args={[0.026, 0.0045, 0.002]} />
      <meshStandardMaterial color={ink} roughness={0.9} />
    </mesh>
  </group>;
}

function Lens({ x, y, z, selected }: { x: number; y: number; z: number; selected: boolean }) {
  return <group position={[x, y, z]}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.017, 0.021, 0.009, 20]} />
      <meshStandardMaterial color={ink} roughness={0.35} metalness={0.5} />
    </mesh>
    <mesh position={[0, 0, 0.009]}>
      <sphereGeometry args={[0.011, 12, 8]} />
      <meshStandardMaterial color={selected ? "#c9d89c" : "#899270"} emissive={selected ? "#bbd184" : "#000000"} emissiveIntensity={selected ? 0.65 : 0} roughness={0.2} />
    </mesh>
  </group>;
}

function Dial({ x, y, z, radius = 0.055 }: { x: number; y: number; z: number; radius?: number }) {
  return <group position={[x, y, z]}>
    <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow castShadow>
      <cylinderGeometry args={[radius, radius * 1.12, 0.059, 32]} />
      <meshStandardMaterial color={ink} roughness={0.48} metalness={0.25} />
    </mesh>
    {Array.from({ length: 18 }, (_, i) => {
      const a = i / 18 * Math.PI * 2;
      return <mesh key={i} position={[Math.sin(a) * radius, Math.cos(a) * radius, 0]} rotation={[0, 0, -a]}>
        <boxGeometry args={[0.005, 0.01, 0.05]} />
        <meshStandardMaterial color="#536050" roughness={0.6} />
      </mesh>;
    })}
    <mesh position={[0, radius * 0.55, 0.031]}>
      <boxGeometry args={[0.007, radius * 0.45, 0.003]} />
      <meshStandardMaterial color={cream} roughness={0.8} />
    </mesh>
  </group>;
}

function PrintedFace({ material, width, height, y, z }: {
  material: PieceProps["material"]; width: number; height: number; y: number; z: number;
}) {
  return <mesh material={material} position={[0, y, z]} receiveShadow>
    <planeGeometry args={[width, height]} />
  </mesh>;
}

function CommandConsole({ material, selected }: { material: PieceProps["material"]; selected: boolean }) {
  return <>
    <Case width={0.96} height={0.98} depth={0.35} radius={0.055} color={sage} />
    <Case width={0.968} height={0.982} depth={0.035} radius={0.05} color={ink} position={[0, 0, -0.065]} />
    <Case width={0.82} height={0.635} depth={0.025} color={ink} position={[0, 0.12, 0.18]} />
    <PrintedFace material={material} width={0.75} height={0.565} y={0.12} z={0.198} />
    {[-0.414, 0.414].flatMap(x => [-0.424, 0.424].map(y => <Screw key={`${x}-${y}`} x={x} y={y} z={0.18} dark />))}
    {[-0.3, -0.17, -0.04].map((x, i) => <group key={x}>
      <Case width={0.112} height={0.105} depth={0.029} radius={0.018} color={ink} position={[x, -0.293, 0.191]} />
      <Case width={0.09} height={0.071} depth={0.027} radius={0.01} color={i === 2 ? "#b7805a" : cream} position={[x, -0.28, 0.213]} />
    </group>)}
    <Dial x={0.25} y={-0.294} z={0.213} radius={0.073} />
    <Lens x={0.382} y={-0.284} z={0.182} selected={selected} />
    {[-0.12, -0.055, 0.01, 0.075, 0.14].map(y => <Case key={y} width={0.015} height={0.028} depth={0.13} radius={0.007} color={ink} position={[-0.477, y, -0.015]} />)}
  </>;
}

function Board({ material, selected }: { material: PieceProps["material"]; selected: boolean }) {
  return <>
    <Case width={0.92} height={0.9} depth={0.095} radius={0.035} color="#546d5c" />
    <Case width={0.91} height={0.89} depth={0.02} radius={0.03} color="#c0b98d" position={[0, 0, -0.043]} />
    <Case width={0.764} height={0.68} depth={0.016} radius={0.014} color="#7f9381" position={[0, 0.023, 0.052]} />
    <PrintedFace material={material} width={0.73} height={0.635} y={0.025} z={0.063} />
    {[-0.4, 0.4].flatMap(x => [-0.39, 0.39].map(y => <group key={`${x}-${y}`}>
      <mesh position={[x, y, 0.014]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.036, 0.036, 0.15, 20]} />
        <meshStandardMaterial color={gold} roughness={0.5} metalness={0.55} />
      </mesh>
      <Screw x={x} y={y} z={0.093} />
    </group>))}
    {Array.from({ length: 10 }, (_, i) => <mesh key={i} position={[-0.3 + i / 15, -0.39, 0.058]} castShadow>
      <boxGeometry args={[0.027, 0.095, 0.018]} />
      <meshStandardMaterial color={gold} metalness={0.6} roughness={0.45} />
    </mesh>)}
    <Case width={0.092} height={0.28} depth={0.11} radius={0.012} color={ink} position={[-0.431, 0, 0.091]} />
    <Case width={0.092} height={0.28} depth={0.11} radius={0.012} color={ink} position={[0.431, 0, 0.091]} />
    <Lens x={0.27} y={0.382} z={0.06} selected={selected} />
  </>;
}

function Cradle({ material, selected }: { material: PieceProps["material"]; selected: boolean }) {
  return <>
    <Case width={0.98} height={0.97} depth={0.125} radius={0.045} color="#b7b09a" position={[0, 0, -0.035]} />
    <Case width={0.735} height={0.8} depth={0.04} radius={0.025} color={ink} position={[0, 0, 0.046]} />
    <PrintedFace material={material} width={0.65} height={0.69} y={0} z={0.074} />
    {[-1, 1].map(side => <group key={side}>
      <Case width={0.125} height={0.72} depth={0.235} radius={0.032} color={cream} position={[side * 0.411, 0.018, 0.126]} />
      {[-0.27, 0.30].map(y => <group key={y}>
        <Case width={0.205} height={0.14} depth={0.106} radius={0.027} color={sage} position={[side * 0.364, y, 0.261]} />
        <Screw x={side * 0.425} y={y} z={0.32} dark />
      </group>)}
      <Case width={0.014} height={0.37} depth={0.014} radius={0.007} color={ink} position={[side * 0.411, 0.018, 0.249]} />
    </group>)}
    {Array.from({ length: 7 }, (_, i) => <group key={i} position={[-0.21 + i * 0.07, -0.415, 0.084]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.013, 0.018, 0.08, 12]} />
        <meshStandardMaterial color={gold} metalness={0.55} roughness={0.4} />
      </mesh>
    </group>)}
    <Lens x={0} y={0.433} z={0.04} selected={selected} />
  </>;
}

function Observation({ material, selected }: { material: PieceProps["material"]; selected: boolean }) {
  return <>
    <Case width={0.96} height={0.985} depth={0.375} radius={0.06} color={cream} />
    <Case width={0.968} height={0.988} depth={0.035} radius={0.058} color="#767e6d" position={[0, 0, -0.096]} />
    <Case width={0.826} height={0.744} depth={0.033} radius={0.035} color={ink} position={[0, 0.049, 0.188]} />
    <PrintedFace material={material} width={0.75} height={0.67} y={0.049} z={0.21} />
    <Dial x={-0.25} y={-0.385} z={0.214} radius={0.047} />
    <Dial x={0.25} y={-0.385} z={0.214} radius={0.047} />
    <Lens x={0} y={-0.382} z={0.193} selected={selected} />
    {[-0.424, 0.424].map(x => <Screw key={x} x={x} y={0.426} z={0.19} />)}
    {[-1, 1].map(side => <group key={side}>
      <Case width={0.038} height={0.56} depth={0.145} radius={0.018} color={sage} position={[side * 0.48, 0.01, -0.028]} />
      {Array.from({ length: 8 }, (_, i) => <Case key={i} width={0.044} height={0.012} depth={0.158} radius={0.005} color="#65765e" position={[side * 0.48, -0.206 + i * 0.062, -0.028]} />)}
    </group>)}
    {[-0.3, 0.3].map(x => <Case key={x} width={0.17} height={0.056} depth={0.23} radius={0.015} color={ink} position={[x, -0.49, -0.024]} />)}
  </>;
}

export function Piece({ index, material }: PieceProps) {
  const inspected = useControl("inspect");
  const selected = inspected === index;
  const Object = [CommandConsole, Board, Cradle, Observation][index] ?? Observation;
  return <>
    <Object material={material} selected={selected} />
    <group visible={selected}>
      {[-1, 1].flatMap(x => [-1, 1].map(y => <group key={`${x}-${y}`}>
        <mesh position={[x * 0.512, y * 0.46, 0.35]}>
          <boxGeometry args={[0.015, 0.13, 0.008]} />
          <meshBasicMaterial color="#a84c2d" toneMapped={false} />
        </mesh>
        <mesh position={[x * 0.454, y * 0.518, 0.35]}>
          <boxGeometry args={[0.13, 0.015, 0.008]} />
          <meshBasicMaterial color="#a84c2d" toneMapped={false} />
        </mesh>
      </group>))}
    </group>
  </>;
}
