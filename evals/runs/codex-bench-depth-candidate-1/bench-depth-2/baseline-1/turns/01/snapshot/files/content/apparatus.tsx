"use client";
import type { PieceProps } from "@/components/story/types";
export function Apparatus({index,material}:PieceProps) {
 const board=index===1, base=index===0;
 const color=board ? "#255c50" : base ? "#526660" : "#b8c3b7";
 return <group>
 <mesh castShadow receiveShadow><boxGeometry args={[1,1,base?0.5:0.6]}/><meshStandardMaterial color={color} roughness={0.65} metalness={0.25}/></mesh>
 <mesh position={[0,0,base?0.26:0.31]} material={material}><planeGeometry args={[0.9,0.86]}/></mesh>
 {[-1,1].flatMap(x=>[-1,1].map(y=><mesh key={`${x}${y}`} position={[x*0.46,y*0.45,base?0.27:0.33]}><cylinderGeometry args={[0.017,0.017,0.02,8]} /><meshStandardMaterial color="#73817c" metalness={0.7} roughness={0.3}/></mesh>))}
 {board && [-0.3,-0.15,0,0.15,0.3].map(x=><mesh key={x} position={[x,-0.53,0.1]}><boxGeometry args={[0.045,0.12,0.06]}/><meshStandardMaterial color="#c7a665" metalness={0.6}/></mesh>)}
 {!board && !base && [0,1].map(i=><mesh key={i} position={[-0.32+i*0.64,-0.4,0.35]}><cylinderGeometry args={[0.05,0.05,0.06,16]} /><meshStandardMaterial color={i?"#a85530":"#274e48"}/></mesh>)}
 {base && [-0.42,0.42].map(x=><mesh key={x} position={[x,-0.59,-0.05]}><boxGeometry args={[0.09,0.18,0.35]}/><meshStandardMaterial color="#203c38"/></mesh>)}
 </group>;
}
