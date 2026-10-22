"use client";
import { useRef } from "react";
import type { Group } from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import type { ExtraProps } from "@/components/story/types";
import { weight } from "@/lib/story/timeline";
import { Block,Stroke } from "../geometry";
function Gateway({ x,color }: {x:number;color:string}) {
  return <group position={[x,0,-.1]}>
    <Block position={[-.42,.55,0]} size={[.14,1.1,.18]} color={color}/><Block position={[.42,.55,0]} size={[.14,1.1,.18]} color={color}/>
    <Block position={[0,1.13,0]} size={[.98,.17,.18]} color={color}/><Block position={[0,.06,0]} size={[1,.1,.68]} color={color}/>
  </group>;
}
export default function Migration({frameRef,look,still,controls}:ExtraProps){
  const root=useRef<Group>(null),tokens=useRef<(Group|null)[]>([]),arrow=useRef<Group>(null);
  useExtraFrame(()=>{
    const f=frameRef.current,w=weight(f.beat,2);
    if(root.current){root.current.visible=w>.001;root.current.scale.y=Math.max(.001,w);}
    const scroll=still?(f.dwell<.5?0:1):f.dwell;
    const progress=controls.get("migration.position")??scroll;
    for(let i=0;i<tokens.current.length;i++){const token=tokens.current[i];if(token) token.position.x=-1.4+Math.max(0,Math.min(1,(progress-i*.07)/.72))*2.8;}
    if(arrow.current) arrow.current.rotation.y=progress>.5?0:Math.PI;
  });
  return <group ref={root} position={[0,-.12,0]}>
    <Gateway x={-1.4} color={look.id==="dark"?"#849886":"#738376"}/><Gateway x={1.4} color={look.accent}/>
    <Block position={[0,.1,-.1]} size={[2.8,.08,.5]} color="#a3ac94"/>
    <Stroke from={[-1.4,.17,.13]} to={[1.4,.17,.13]} color={look.accent}/><Stroke from={[-1.4,.17,-.33]} to={[1.4,.17,-.33]} color={look.accent}/>
    {[0,1,2,3,4].map(i=><group ref={g=>{tokens.current[i]=g;}} key={i} position={[-1.4,.32+i*.07,(i%3-1)*.09-.1]}><Block size={[.22,.08,.2]} color={look.accent}/></group>)}
    <Stroke from={[-1.1,.17,.9]} to={[1.1,.17,.9]} color={look.accent} radius={.025}/>
    <group ref={arrow} position={[0,.17,.9]}><Stroke from={[.86,0,-.18]} to={[1.1,0,0]} color={look.accent} radius={.025}/><Stroke from={[.86,0,.18]} to={[1.1,0,0]} color={look.accent} radius={.025}/></group>
  </group>;
}
