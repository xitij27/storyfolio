"use client";
import type { PieceProps } from "@/components/story/types";
function Box({ size, position = [0,0,0], color }: { size: [number,number,number]; position?: [number,number,number]; color: string }) {
 return <mesh position={position} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={.65} metalness={.15}/></mesh>;
}
export function Apparatus({ index, material }: PieceProps) {
 if (index === 0) return <>
   <Box size={[1,1,1.65]} color="#abb8b3"/>
   {[-.42,.42].map(x => <Box key={x} size={[.055,.35,1.65]} position={[x,.65,0]} color="#536d6b"/>)}
   {[-.38,.38].flatMap(x => [-.6,.6].map(z => <Box key={`${x}${z}`} size={[.12,.45,.2]} position={[x,-.65,z]} color="#263e40"/>))}
 </>;
 if (index === 1) return <>
   <Box size={[1,1,.12]} color="#245e55"/>
   <mesh position={[0,0,.065]} material={material}><planeGeometry args={[1,1]}/></mesh>
   <Box size={[.23,.23,.15]} position={[-.23,-.18,.17]} color="#172f31"/>
   <Box size={[.12,.25,.13]} position={[.28,-.15,.15]} color="#bfc9ba"/>
   {Array.from({length:8},(_,i) => <Box key={i} size={[.045,.09,.12]} position={[-.4+i*.11,-.48,.13]} color="#d8b167"/>)}
 </>;
 if (index === 6) return <>
   <Box size={[1,.25,.25]} color="#c5ccbd"/>
   {[-.42,-.25,0,.25,.42].map(x => <Box key={x} size={[.025,.8,.025]} position={[x,-.36,0]} color="#b39153"/>)}
   {[-.46,.46].map(x => <Box key={x} size={[.09,1,.18]} position={[x,-.32,-.08]} color="#536b69"/>)}
 </>;
 if (index === 2) return <>
   <Box size={[1,1,.7]} color="#bfc8bd"/>
   <mesh position={[0,.13,.36]} material={material}><planeGeometry args={[.88,.68]}/></mesh>
   {[-.3,0,.3].map(x => <mesh key={x} position={[x,-.36,.39]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.065,.065,.1,16]}/><meshStandardMaterial color="#233f40"/></mesh>)}
   <Box size={[1.12,.09,.8]} position={[0,-.56,0]} color="#536b69"/>
 </>;
 const color = ["#547e81","#b57937","#b9573f"][index-3];
 return <>
   <mesh castShadow><cylinderGeometry args={[.38,.44,1,24]}/><meshStandardMaterial color={color} roughness={.45}/></mesh>
   <mesh position={[0,.5,0]}><sphereGeometry args={[.32,24,16]}/><meshStandardMaterial color={color} roughness={.28}/></mesh>
   <mesh position={[0,-.05,.44]} material={material}><planeGeometry args={[.95,.5]}/></mesh>
   <Box size={[1,.1,1]} position={[0,-.55,0]} color="#536b69"/>
 </>;
}
