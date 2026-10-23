"use client";
import { useRef } from "react";
import type { Group } from "three";
import type { ExtraProps } from "@/components/story/types";
import type { Look } from "@/lib/story/looks";
import { useExtraFrame } from "@/components/story/extra-frame";
import { Route, WorkGrid } from "./geometry";
export function WaveSystem({look,frameRef,still}:Pick<ExtraProps,"look"|"frameRef"|"still">){
 const packets=useRef<Group>(null);
 useExtraFrame(()=>{const q=still?Math.round(frameRef.current.dwell*4)/4:frameRef.current.dwell;packets.current?.children.forEach((child,i)=>{const t=Math.min(1,Math.max(0,(q*1.4-i*.03)));child.position.x=-2.65+t*5.15;child.position.y=(1-t)*((i%2)?.8:-.8)+Math.sin(t*Math.PI)*(i-6.5)*.12;});});
 return <group>
 {[-.8,.8].map(y=><group key={y} position={[-2.65,y,0]}><mesh><boxGeometry args={[.8,.65,.14]}/><meshStandardMaterial color={look.surface.color}/></mesh>{[0,1,2].map(i=><mesh key={i} position={[-.2+i*.2,0,.15]}><sphereGeometry args={[.05,12,12]}/><meshStandardMaterial color={look.faint}/></mesh>)}</group>)}
 <group position={[2.5,0,0]}><mesh><cylinderGeometry args={[.72,.72,.18,6]}/><meshStandardMaterial color={look.accent}/></mesh>{[0,1,2].map(i=><mesh key={i} position={[Math.cos(i*2.094)*.32,.27,Math.sin(i*2.094)*.32]}><cylinderGeometry args={[.13,.13,.35,12]}/><meshStandardMaterial color={look.surface.color}/></mesh>)}</group>
 {Array.from({length:14},(_,i)=><Route key={i} radius={.014} color={i%2?look.accent:look.faint} points={[[-2.65,i%2?.8:-.8,0],[-.8,(i-6.5)*.2,.1],[.8,(i-6.5)*.2,.1],[2.5,0,0]]}/>)}
 <group ref={packets}>{Array.from({length:14},(_,i)=><mesh key={i}><sphereGeometry args={[.055,12,12]}/><meshStandardMaterial color={look.ink}/></mesh>)}</group><WorkGrid look={look}/>
 </group>;
}
export function Replica({look}:{look:Look}){return <group>{[-2.5,0,2.5].map((x,i)=><group key={x} position={[x,0,0]}><mesh><cylinderGeometry args={[i===1?.47:.65,i===1?.47:.65,.8,48]}/><meshStandardMaterial color={i===2?look.accent:look.surface.color}/></mesh><mesh position={[0,.41,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.2,.23,40]}/><meshBasicMaterial color={look.ink}/></mesh></group>)}<Route color={look.accent} points={[[-2.5,.5,0],[-1,1.1,0],[1,1.1,0],[2.5,.5,0]]}/><Route color={look.faint} points={[[0,.5,0],[0,1.1,0],[2.5,.5,0]]}/><WorkGrid look={look}/></group>;}
