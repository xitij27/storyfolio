"use client";
import { useRef } from "react";
import type { Group } from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import type { ExtraProps } from "@/components/story/types";
import { Database, Route, WorkGrid } from "./geometry";
export function FerrySystem({look,frameRef,still}:ExtraProps){const arm=useRef<Group>(null);useExtraFrame(()=>{const q=still?(frameRef.current.dwell<.5?0:1):frameRef.current.dwell;if(arm.current)arm.current.rotation.z=-.65+q*1.3;});return <group><group position={[-2.5,0,0]}><Database look={look} backup/></group><group position={[2.5,0,0]}><Database look={look}/></group><group ref={arm} position={[0,1.2,0]}><Route color={look.accent} radius={.05} points={[[0,1,0],[0,0,0],[0,-1,0]]}/><mesh><sphereGeometry args={[.15,20,20]}/><meshStandardMaterial color={look.ink}/></mesh></group><Route color={look.faint} points={[[-2.5,.6,0],[-1.5,1,0],[-.6,1,0]]}/><Route color={look.accent} points={[[.6,1,0],[1.5,1,0],[2.5,.6,0]]}/>{[-.3,.3].map(y=><Route key={y} radius={.016} color={look.faint} points={[[-1.8,y,0],[0,y,0],[1.8,y,0]]}/>)}<WorkGrid look={look}/></group>;}
