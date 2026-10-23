"use client";
import { useRef } from "react";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import { chapterPresence } from "@/lib/story/story";
import type { ExtraProps } from "@/components/story/types";
import { story } from "@/content/story";
import { Database, Route, WorkGrid } from "./geometry";
export function DatabaseSystem({frameRef,look,still,controls,chapter="database"}:ExtraProps & {chapter?:string}){
 const group=useRef<Group>(null),checks=useRef<Group>(null),split=useRef<Group>(null),read=useRef<Group>(null),old=useRef<Group>(null),newWrite=useRef<Group>(null),marker=useRef<Mesh>(null);
 useExtraFrame(()=>{
  const f=frameRef.current,p=chapterPresence(story,chapter,f.beat);
  const raw=chapter==="contact"?1:(controls.get("cutover")??f.dwell);
  const q=still?Math.round(raw*4)/4:raw;
  if(group.current){group.current.scale.setScalar(Math.max(.001,p));group.current.position.x=(1-p)*2.5;}
  if(split.current)split.current.scale.setScalar(Math.max(.001,Math.min(1,q*4)));
  if(checks.current)checks.current.scale.setScalar(Math.max(.001,Math.min(1,(q-.25)*4)));
  if(read.current)read.current.scale.x=Math.max(.001,Math.min(1,(q-.5)*4));
  if(newWrite.current)newWrite.current.scale.setScalar(Math.max(.001,Math.min(1,(q-.75)*4)));
  if(old.current)old.current.traverse(node=>{if(node instanceof Mesh && node.material instanceof MeshStandardMaterial){node.material.transparent=true;node.material.opacity=q>.9?.45:1;}});
  if(marker.current){marker.current.position.x=q<.75?-2.5:2.5;marker.current.position.y=1.43;}
 });
 return <group ref={group}>
  <group ref={old} position={[-2.5,0,0]}><Database look={look} backup/></group><group position={[2.5,0,0]}><Database look={look}/></group>
  <Route color={look.accent} points={[[0,2.5,0],[0,1.5,0]]}/>
  <Route color={look.accent} points={[[-2.5,.65,0],[-2.5,1.5,0],[-1,1.5,0],[0,1.5,0]]}/>
  <group ref={split}><Route color={look.accent} points={[[0,1.5,0],[1,1.5,0],[2.5,1.5,0],[2.5,.65,0]]}/></group>
  {[-.18,.18].map(z=><Route key={z} color={look.faint} radius={.018} points={[[-1.8,0,z],[0,-.14,z],[1.8,0,z]]}/>)}
  <group ref={checks}>{Array.from({length:5},(_,i)=><group key={i} position={[-.8+i*.4,-.65,0]}><mesh><boxGeometry args={[.19,.19,.14]}/><meshStandardMaterial color={look.accent}/></mesh><mesh position={[0,-.33,0]}><boxGeometry args={[.19,.19,.14]}/><meshStandardMaterial color={look.accent}/></mesh></group>)}</group>
  <group ref={read}><Route color={look.ink} radius={.022} points={[[-2.5,2.25,0],[0,2.25,0],[2.5,2.25,0],[2.5,.65,0]]}/></group>
  <group ref={newWrite}><mesh position={[2.5,1.8,0]} rotation={[0,0,Math.PI]}><coneGeometry args={[.1,.25,16]}/><meshStandardMaterial color={look.accent}/></mesh></group>
  <mesh ref={marker}><sphereGeometry args={[.085,16,16]}/><meshStandardMaterial color={look.ink}/></mesh>
  <WorkGrid look={look}/>
 </group>;
}
export default function DatabaseScene(props:ExtraProps){return <DatabaseSystem {...props}/>;}
