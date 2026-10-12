"use client";
import type { PieceProps } from "@/components/story/types";
function Box({ color, size, position = [0,0,0] }: { color: string; size: [number,number,number]; position?: [number,number,number] }) {
  return <mesh position={position} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={0.72} metalness={0.25}/></mesh>;
}
export function Apparatus({ index, material, look }: PieceProps) {
  const board = index === 1;
  const color = board ? "#28574c" : index === 0 ? "#786754" : look.surface.color;
  const depth = board ? 0.12 : index === 0 ? 0.32 : 0.3;
  return <group>
    <Box color={color} size={[1,1,depth]}/>
    <mesh position={[0,0,depth/2 + 0.006]} material={material}><planeGeometry args={[0.91,0.84]}/></mesh>
    {[-1,1].flatMap(x => [-1,1].map(y => <mesh key={`${x}-${y}`} position={[x*0.455,y*0.445,depth/2+0.01]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.018,0.018,0.018,12]}/><meshStandardMaterial color="#bca987" metalness={0.75} roughness={0.4}/></mesh>))}
    {board && <>
      <Box color="#1c2427" size={[0.22,0.11,0.06]} position={[0,0,-0.1]}/>
      {Array.from({length:8},(_,i)=><Box key={i} color="#ccac6c" size={[0.027,0.07,0.025]} position={[-0.31+i*0.088,-0.49,0.075]}/>)}
    </>}
    {index === 0 && [-0.36,0.36].map(x=><group key={x}>
      <Box color="#c8ad77" size={[0.045,0.045,0.6]} position={[x,0.22,0.3]}/>
      <Box color="#332e28" size={[0.18,0.16,0.2]} position={[x,-0.5,-0.05]}/>
    </group>)}
    {index >= 2 && <>
      <mesh position={[-0.3,-0.38,0.22]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[0.06,0.06,0.13,24]}/><meshStandardMaterial color="#434a47" metalness={0.35} roughness={0.55}/></mesh>
      <Box color="#bd8658" size={[0.13,0.025,0.045]} position={[0.3,-0.39,0.18]}/>
      <Box color="#454541" size={[0.8,0.11,0.3]} position={[0,-0.54,-0.01]}/>
    </>}
  </group>;
}
