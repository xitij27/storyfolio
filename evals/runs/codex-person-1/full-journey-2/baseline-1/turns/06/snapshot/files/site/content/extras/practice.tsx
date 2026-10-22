"use client";
import { useRef } from "react";
import type { Group } from "three";
import type { ExtraProps } from "@/components/story/types";
import { useExtraFrame } from "@/components/story/extra-frame";
import { Block } from "../geometry";
import { Bell,Document,Documents,ReadingStand } from "../models";
import { indexOf } from "../story";
import { reveal,progress } from "../scene-motion";
export default function Practice({frameRef,look,still}:ExtraProps){
 const docs=useRef<Group>(null),oncall=useRef<Group>(null),reading=useRef<Group>(null),tags=useRef<(Group|null)[]>([]);const alert=indexOf("practice.oncall");
 useExtraFrame(()=>{reveal(docs.current,frameRef.current,indexOf("practice.documents"));reveal(oncall.current,frameRef.current,alert);reveal(reading.current,frameRef.current,indexOf("practice.reading"));const p=progress(frameRef.current,alert,still);tags.current.forEach((tag,i)=>{if(tag){tag.scale.setScalar(Math.max(.001,i<2?1:1-p));tag.visible=i<2||p<.999;}});});
 return <><group ref={docs} position={[0,-.1,0]}><Documents accent={look.accent}/></group><group ref={oncall} position={[0,-.1,0]}><Bell accent={look.accent}/><Document position={[-1,.05,.35]} accent={look.accent} checklist/>{[0,1,2,3].map(i=><group ref={g=>{tags.current[i]=g;}} key={i} position={[.3+(i%2)*.55,.05,-.9+Math.floor(i/2)*1.65]}><Block size={[.42,.025,.32]} color={look.accent}/><Block position={[0,.025,0]} size={[.24,.01,.02]} color="#f7f0df"/></group>)}</group><group ref={reading} position={[0,-.1,0]}><ReadingStand accent={look.accent}/></group></>;
}
