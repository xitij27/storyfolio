"use client";
import { useMemo, useRef } from "react";
import { Shape, Group } from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import type { ExtraProps } from "@/components/story/types";
import { Presence } from "./presence";
import { Route, WorkGrid } from "./geometry";
export default function Logger(props:ExtraProps){
 const {look,frameRef,still}=props;const samples=useRef<Group>(null);
 const card=useMemo(()=>{const s=new Shape();s.moveTo(-.65,-1);s.lineTo(.65,-1);s.lineTo(.65,.65);s.lineTo(.35,1);s.lineTo(-.65,1);s.closePath();return s;},[]);
 useExtraFrame(()=>{if(samples.current){const q=still?Math.round(frameRef.current.dwell*4)/4:frameRef.current.dwell;samples.current.position.x=-.8+q*.8;}});
 return <Presence frameRef={frameRef} chapter="study"><group position={[1.5,.1,0]}><mesh><extrudeGeometry args={[card,{depth:.14,bevelEnabled:true,bevelSize:.035,bevelThickness:.035,bevelSegments:1}]}/><meshStandardMaterial color={look.surface.color} roughness={.85}/></mesh>{[0,1,2,3,4].map(i=><mesh key={i} position={[-.47+i*.21,.57,.18]}><boxGeometry args={[.12,.35,.02]}/><meshStandardMaterial color="#ddba7a"/></mesh>)}</group>
 <group position={[-2,.2,0]}><mesh><boxGeometry args={[1.1,.8,.55]}/><meshStandardMaterial color={look.surface.color}/></mesh><mesh position={[0,.1,.3]}><boxGeometry args={[.65,.22,.02]}/><meshStandardMaterial color={look.accent}/></mesh></group>
 <Route color={look.faint} points={[[-3.2,.2,0],[-2.6,.2,0]]}/><Route color={look.accent} points={[[-1.4,.2,0],[-1,.2,0],[-1,.8,0],[-.6,.8,0],[-.6,.2,0],[-.2,.2,0],[-.2,.8,0],[.2,.8,0],[.2,.2,0],[.8,.2,0]]}/>
 <group ref={samples}>{[0,1,2].map(i=><mesh key={i} position={[-.8+i*.4,-.6,.12]}><sphereGeometry args={[.065,16,16]}/><meshStandardMaterial color={look.ink}/></mesh>)}</group><WorkGrid look={look}/></Presence>;
}
