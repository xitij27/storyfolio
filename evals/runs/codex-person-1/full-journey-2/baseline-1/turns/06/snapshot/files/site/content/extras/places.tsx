"use client";
import { useRef } from "react";
import type { Group } from "three";
import type { ExtraProps } from "@/components/story/types";
import { useExtraFrame } from "@/components/story/extra-frame";
import { Block,Stroke } from "../geometry";
import { indexOf } from "../story";
import { reveal,progress } from "../scene-motion";
export default function Places({frameRef,look,still}:ExtraProps){
  const root=useRef<Group>(null),traveller=useRef<Group>(null);const index=indexOf("places.route");
  useExtraFrame(()=>{reveal(root.current,frameRef.current,index);if(traveller.current)traveller.current.position.x=-1.65+3.3*progress(frameRef.current,index,still);});
  return <group ref={root} position={[0,-.16,0]}>
    {[-1,0,1].map((v,i)=><group key={v} position={[v*1.3,.16+i*.11,0]} rotation={[0,0,i===1?-.12:.12]}><Block size={[1.38,.035,1.5]} color="#f7f0df"/>
      <Stroke from={[-.68,.04,0]} to={[.68,.04,0]} color={look.accent} radius={.025}/>
      <Stroke from={[0,.05,-.25]} to={[0,.85,-.25]} color="#526f62" radius={.025}/>
      <Block position={[.2,.78,-.25]} size={[.42,.23,.035]} color={look.accent}/>
      {[0,1,2].map(j=><Block key={j} position={[-.33+j*.3,.08,.52]} size={[.18,.15+(.06*(j%2)),.18]} color="#c6b997"/>)}
    </group>)}
    <group ref={traveller} position={[-1.65,.75,.3]}><mesh castShadow><sphereGeometry args={[.09,16,12]}/><meshStandardMaterial color={look.accent} roughness={.9}/></mesh></group>
  </group>;
}
