"use client";
import { useMemo } from "react";
import { Shape, DoubleSide } from "three";
import type { ExtraProps } from "@/components/story/types";
import type { Look } from "@/lib/story/looks";
import { Presence } from "./presence";
import { Route } from "./geometry";
function Land({points,look}:{points:number[][];look:Look}){
 const shape=useMemo(()=>{const s=new Shape();points.forEach((p,i)=>i?s.lineTo(p[0],p[1]):s.moveTo(p[0],p[1]));s.closePath();return s;},[points]);
 return <mesh position={[0,0,-.18]}><extrudeGeometry args={[shape,{depth:.1,bevelEnabled:false}]}/><meshStandardMaterial color={look.surface.color} roughness={.95}/></mesh>;
}
export function PlaceMap({look,amsterdamOnly=false}:{look:Look;amsterdamOnly?:boolean}){
 return <group>
 <Land look={look} points={[[-2.8,.8],[-1.7,1],[-.4,.8],[.3,.2],[.9,-.4],[.3,-1.3],[-.4,-2],[-1,-1.5],[-1.3,-.5],[-2.2,-.2],[-2.8,.8]]}/>
 <Land look={look} points={[[-2.3,1.4],[-2.6,1.9],[-1.7,2.1],[-1.3,2.5],[-.7,2.8],[-.8,1.9],[.2,1.9],[1.5,1.5],[.5,1.2],[-.3,1.3],[-.1,.9],[-.5,1.2],[-1.1,1],[-1.4,1.5]]}/>
 <Route color={look.accent} points={[[.35,-.3,.05],[-.2,.5,.35],[-1.55,1.7,.05]]}/>
 <mesh position={[-1.55,1.7,.12]}><sphereGeometry args={[.095,20,20]}/><meshStandardMaterial color={look.ink}/></mesh>
 {!amsterdamOnly&&<><mesh position={[.35,-.3,.12]}><sphereGeometry args={[.095,20,20]}/><meshStandardMaterial color={look.accent}/></mesh><Route color={look.faint} radius={.015} points={[[-1.55,1.7,.12],[1,1.7,.15],[1.7,1.3,.15]]}/><mesh position={[2,1.1,0]}><ringGeometry args={[.85,.87,64]}/><meshBasicMaterial color={look.faint} side={DoubleSide}/></mesh><Route color={look.accent} points={[[1.7,1.45,.1],[2.2,1.1,.2],[1.8,.7,.1]]}/>{[[1.7,1.45],[1.8,.7]].map(([x,y],i)=><mesh key={i} position={[x,y,.12]}><sphereGeometry args={[.1,20,20]}/><meshStandardMaterial color={i?look.accent:look.ink}/></mesh>)}</>}
 </group>;
}
export default function Places(props:ExtraProps){return <Presence frameRef={props.frameRef} chapter="places"><PlaceMap look={props.look}/></Presence>;}
