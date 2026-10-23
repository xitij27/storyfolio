"use client";
import { useRef } from "react";
import type { Group } from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import type { ExtraProps } from "@/components/story/types";
import { Route, WorkGrid } from "./geometry";
export function OncallSystem({look,frameRef,still}:ExtraProps){
 const unneeded=useRef<Group>(null);
 useExtraFrame(()=>{const q=still?(frameRef.current.dwell<.5?0:1):frameRef.current.dwell;if(unneeded.current){unneeded.current.scale.setScalar(Math.max(.001,1-q));unneeded.current.position.x=-q*1.2;}});
 return <group>
 <group ref={unneeded}>{[-1.3,-.65,0,.65,1.3].map(y=><group key={y}><mesh position={[-2.8,y,0]}><boxGeometry args={[.22,.22,.2]}/><meshStandardMaterial color={look.faint}/></mesh><Route color={look.faint} radius={.016} points={[[-2.65,y,0],[-1.2,y,0],[.4,0,0]]}/></group>)}</group>
 {[-.55,.55].map(y=><group key={y}><mesh position={[-.7,y,0]}><sphereGeometry args={[.13,16,16]}/><meshStandardMaterial color={look.accent}/></mesh><Route color={look.accent} points={[[-.55,y,0],[.6,y,0],[1.5,0,0]]}/></group>)}
 <mesh position={[2,0,0]}><boxGeometry args={[.7,1.3,.25]}/><meshStandardMaterial color={look.surface.color}/></mesh><mesh position={[2,.15,.14]}><boxGeometry args={[.4,.5,.02]}/><meshStandardMaterial color={look.accent}/></mesh><WorkGrid look={look}/>
 </group>;
}
