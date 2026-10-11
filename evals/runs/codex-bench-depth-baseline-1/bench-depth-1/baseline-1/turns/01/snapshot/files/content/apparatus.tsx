"use client";
import type { PieceProps } from "@/components/story/types";
function Box({ position = [0,0,0], size, color }: { position?: [number,number,number]; size:[number,number,number]; color:string }) {
  return <mesh position={position} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={.65} metalness={.22}/></mesh>;
}
/** Original illustrative geometry; no actual circuit or apparatus is depicted. */
export function Apparatus({index, material}: PieceProps) {
  if (index === 2) return <>
    <Box position={[-.45,0,0]} size={[.1,1,.22]} color="#748b85"/>
    <Box position={[.45,0,0]} size={[.1,1,.22]} color="#748b85"/>
    <Box position={[0,.43,0]} size={[1,.14,.28]} color="#b7c2b8"/>
    {[-.25,0,.25].map(x=><Box key={x} position={[x,.16,.08]} size={[.035,.4,.08]} color="#c79b51"/>)}
    <mesh position={[0,.43,.15]} material={material}><planeGeometry args={[.78,.12]}/></mesh>
  </>;
  const board = index === 1;
  return <>
    <Box size={[1,1,index === 0 ? .8 : board ? .12 : .42]} color={board ? "#275d4a" : index === 0 ? "#697d76" : "#b9c3b6"}/>
    <mesh position={[0,0,index === 0 ? .405 : board ? .065 : .215]} material={material}><planeGeometry args={[.86,.78]}/></mesh>
    {index !== 0 && [-1,1].flatMap(x=>[-1,1].map(y=><mesh key={`${x}-${y}`} position={[x*.45,y*.43,board ? .07 : .22]}><cylinderGeometry args={[.025,.025,.025,8]} /><meshStandardMaterial color="#4a5e59" metalness={.7} roughness={.4}/></mesh>))}
    {board && [-.36,-.12,.12,.36].map(x=><Box key={x} position={[x,-.52,.02]} size={[.06,.1,.08]} color="#d5b16a"/>)}
    {index === 3 && <mesh position={[.29,-.33,.26]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.085,.085,.1,20]}/><meshStandardMaterial color="#bd774a" roughness={.5}/></mesh>}
    {index === 0 && [-.4,.4].map(x=><Box key={x} position={[x,-.6,0]} size={[.08,.2,.5]} color="#344c45"/>)}
  </>;
}
