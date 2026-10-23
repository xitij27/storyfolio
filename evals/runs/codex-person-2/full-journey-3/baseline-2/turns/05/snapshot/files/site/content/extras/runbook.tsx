"use client";
import { useRef } from "react";
import { Mesh, MeshStandardMaterial, Group } from "three";
import type { ExtraProps } from "@/components/story/types";
import { useExtraFrame } from "@/components/story/extra-frame";
import { Route, WorkGrid } from "./geometry";
export function RunbookSystem({look,frameRef,still}:ExtraProps){
 const service=useRef<Mesh>(null),checks=useRef<Group>(null);
 useExtraFrame(()=>{const raw=frameRef.current.dwell,q=still?Math.round(raw*6)/6:raw;if(service.current)service.current.position.x=-2.6+5.2*q;checks.current?.children.forEach((item,i)=>{const m=item as Mesh;if(m.material instanceof MeshStandardMaterial)m.material.color.set(i<q*6?look.accent:look.surface.color);});});
 return <group><Route color={look.faint} radius={.045} points={[[-3,0,0],[0,0,0],[3,0,0]]}/>{Array.from({length:6},(_,i)=><group key={i} position={[-2.6+i*1.04,0,0]}><mesh rotation={[0,Math.PI/2,0]}><torusGeometry args={[.48,.045,12,48]}/><meshStandardMaterial color={look.accent}/></mesh><mesh position={[0,-.7,0]}><boxGeometry args={[.25,.25,.5]}/><meshStandardMaterial color={look.surface.color}/></mesh></group>)}<group ref={checks}>{Array.from({length:6},(_,i)=><mesh key={i} position={[-2.6+i*1.04,.8,0]}><sphereGeometry args={[.07,16,16]}/><meshStandardMaterial color={look.surface.color}/></mesh>)}</group><mesh ref={service}><boxGeometry args={[.22,.22,.22]}/><meshStandardMaterial color={look.ink}/></mesh><WorkGrid look={look}/></group>;
}
