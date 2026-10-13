"use client";
import type {PieceProps} from '@/components/story/types';
export function Fixture({material,look}:PieceProps){
 const body=look.id==='dark'?'#27383f':look.id==='lab'?'#69877c':'#263c3a';
 const metal=look.id==='warm'?'#cba95d':look.id==='lab'?'#c8d1cd':'#a2a9a6';
 return <group>
  <mesh castShadow receiveShadow position={[0,-.13,0]}><boxGeometry args={[1,.7,.62]}/><meshStandardMaterial color={body} roughness={.7}/></mesh>
  <mesh material={material} position={[0,-.13,.318]}><planeGeometry args={[.91,.57]}/></mesh>
  {[-.28,.28].map(x=><group key={x} position={[x,.34,0]}><mesh><cylinderGeometry args={[.07,.085,.24,16]}/><meshStandardMaterial color={metal} roughness={.35} metalness={.7}/></mesh><mesh position={[0,.16,0]}><cylinderGeometry args={[.035,.035,.1,12]}/><meshStandardMaterial color="#d2d8d5" roughness={.3} metalness={.8}/></mesh></group>)}
  <mesh position={[0,-.49,0]}><boxGeometry args={[.77,.04,.48]}/><meshStandardMaterial color={metal} metalness={.4} roughness={.6}/></mesh>
 </group>;
}
