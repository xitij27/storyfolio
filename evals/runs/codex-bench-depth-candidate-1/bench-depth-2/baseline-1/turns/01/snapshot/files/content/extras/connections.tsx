"use client";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import { blankFormation, atRest, mixFormation } from "@/lib/story/formation";
import type { ExtraProps } from "@/components/story/types";
import { formations } from "../formations";
import { story } from "../story";
// Flexible leads connect command → board → observation and board → fixture.
// Evidence leads separate model inputs from the observed run, without joining the claims.
export default function Connections({frameRef,owner}:ExtraProps & {owner:number}){
 const group=useRef<THREE.Group>(null);
 const paths=useMemo(()=>Array.from({length:5},()=>new THREE.BufferGeometry().setFromPoints(Array.from({length:25},()=>new THREE.Vector3()))),[]);
 const scratch=useMemo(()=>({a:blankFormation(6),b:blankFormation(6),now:blankFormation(6)}),[]);
 useExtraFrame(()=>{
 const fr=frameRef.current;
 if(!group.current)return;
 // One lazy instance owns connections at each settled/transition region.
 group.current.visible=owner===fr.from;
 atRest(scratch.a,formations[story.chapters[fr.from].beats[0].id],fr.dwell);
 atRest(scratch.b,formations[story.chapters[fr.to].beats[0].id],0);
 const f=mixFormation(scratch.now,scratch.a,scratch.b,fr.t,fr.each);
 const links=[[2,1],[1,3],[1,0],[1,4],[3,5]];
 paths.forEach((geo,i)=>{const [a,b]=links[i];const pa=f.pieces[a],pb=f.pieces[b];
 const start=[...pa.position],end=[...pb.position];
 if(i<2){start[0]+=pa.size[0]/2;end[0]-=pb.size[0]/2;}
 else if(i===2){start[1]-=pa.size[1]/2;end[1]+=pb.size[1]/2;}
 else {start[1]+=pa.size[1]/2;end[1]-=pb.size[1]/2;}

 const arr=geo.attributes.position as THREE.BufferAttribute;
 for(let k=0;k<25;k++){const t=k/24; arr.setXYZ(k,start[0]+(end[0]-start[0])*t,start[1]+(end[1]-start[1])*t-Math.sin(t*Math.PI)*0.25,Math.max(start[2],end[2])+0.4);}
 arr.needsUpdate=true;geo.computeBoundingSphere();});
 });
 return <group ref={group}>{paths.map((geo,i)=><primitive key={i} object={new THREE.Line(geo,new THREE.LineBasicMaterial({color:i===3?'#ad602d':i===4?'#367778':'#48695e'}))}/>)}</group>;
}
