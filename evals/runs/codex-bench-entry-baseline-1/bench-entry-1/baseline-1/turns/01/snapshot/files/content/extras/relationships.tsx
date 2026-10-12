"use client";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import type { ExtraProps } from "@/components/story/types";
import { atRest, blankFormation, mixFormation } from "@/lib/story/formation";
import { formations } from "../formations";
import { story } from "../story";
export default function Relationships({frameRef, look}: ExtraProps) {
  const lines=useRef<(THREE.Mesh|null)[]>([]);
  const tips=useRef<(THREE.Mesh|null)[]>([]);
  const frames=useMemo(()=>[blankFormation(5),blankFormation(5),blankFormation(5)],[]);
  const beats=story.chapters.map(c=>c.beats[0]);
  const a=useMemo(()=>new THREE.Vector3(),[]), b=useMemo(()=>new THREE.Vector3(),[]), d=useMemo(()=>new THREE.Vector3(),[]);
  const up=useMemo(()=>new THREE.Vector3(0,1,0),[]);
  const edges=[[2,1],[0,1],[1,3],[1,4]];
  useExtraFrame(()=>{
    const f=frameRef.current;
    atRest(frames[0],formations[beats[f.from].id],f.dwell);
    atRest(frames[1],formations[beats[f.to].id],0);
    const now=mixFormation(frames[2],frames[0],frames[1],f.t,f.each);
    edges.forEach(([src,dst],i)=>{
      const p=now.pieces[src],q=now.pieces[dst];
      a.set(...p.position); b.set(...q.position);
      const horizontal=Math.abs(b.x-a.x)>Math.abs(b.y-a.y);
      const sign=horizontal ? Math.sign(b.x-a.x) : Math.sign(b.y-a.y);
      if(horizontal) {a.x+=sign*p.size[0]*.52;b.x-=sign*q.size[0]*.52;}
      else {a.y+=sign*p.size[1]*.52;b.y-=sign*q.size[1]*.52;}
      a.z+=.08;b.z+=.08;d.subVectors(b,a);
      const line=lines.current[i],tip=tips.current[i];
      if(line&&tip) {
        const visible=d.length()>.05;
        line.visible=tip.visible=visible;
        line.position.copy(a).add(b).multiplyScalar(.5);line.scale.set(1,d.length(),1);line.quaternion.setFromUnitVectors(up,d.normalize());
        tip.position.copy(b);tip.quaternion.copy(line.quaternion);
      }
    });
  });
  return <group>{edges.map((_,i)=><group key={i}>
    <mesh ref={n=>{lines.current[i]=n;}}><cylinderGeometry args={[.025,.025,1,8]}/><meshStandardMaterial color={i===3 ? look.ink : look.accent} roughness={.65}/></mesh>
    <mesh ref={n=>{tips.current[i]=n;}}><coneGeometry args={[.085,.16,12]}/><meshStandardMaterial color={i===3 ? look.ink : look.accent}/></mesh>
  </group>)}</group>;
}
