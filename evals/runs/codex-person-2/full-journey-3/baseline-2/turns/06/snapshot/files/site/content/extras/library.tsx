"use client";
import { useRef } from "react";
import { Group, Mesh } from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import { chapterPresence } from "@/lib/story/story";
import type { ExtraProps } from "@/components/story/types";
import { story } from "@/content/story";
import { Database, Route, WorkGrid } from "./geometry";
export default function Library({frameRef,look,still}:ExtraProps){
 const group=useRef<Group>(null), record=useRef<Mesh>(null);
 useExtraFrame(()=>{
  const f=frameRef.current,p=chapterPresence(story,"opening",f.beat);
  if(group.current){group.current.scale.setScalar(Math.max(.001,p));group.current.position.x=(1-p)*-2.5;}
  const progress=f.beat<.5?0:f.beat<1?f.beat: .5+f.dwell*.5;
  const q=still?(progress<.75?0:1):Math.min(1,progress);
  if(record.current){record.current.position.set(2.45-q*3.05,.8+Math.sin(q*Math.PI)*.6,.12);record.current.scale.setScalar(.65+q*.35);}
 });
 return <group ref={group}>
  <group position={[-2.5,0,0]}><Database look={look}/></group><group position={[2.5,0,0]} scale={.76}><Database look={look} backup/></group>
  <group position={[-.4,1.05,0]} rotation={[0,0,.025]}>{Array.from({length:12},(_,i)=>i===5?null:<mesh key={i} position={[(i%4)*.4-.6,-Math.floor(i/4)*.29,0]}><boxGeometry args={[.33,.18,.1]}/><meshStandardMaterial color={look.accent} roughness={.9}/></mesh>)}
   <mesh position={[-.2,-.29,-.035]}><boxGeometry args={[.33,.18,.04]}/><meshStandardMaterial color={look.id==="light"?"#a44931":"#b56a54"}/></mesh>
  </group>
  <mesh ref={record} position={[2.45,.8,.12]}><boxGeometry args={[.33,.18,.12]}/><meshStandardMaterial color={look.ink}/></mesh>
  <Route points={[[2.5,.6,0],[1.6,1.8,0],[-.4,1.8,0],[-.6,.77,0]]} color={look.accent}/>
  <Route points={[[-.4,.35,0],[-1.5,.2,0],[-2.5,.6,0]]} color={look.accent}/>
  <WorkGrid look={look}/>
 </group>;
}
