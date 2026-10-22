"use client";
import { useRef } from "react";
import type { Group } from "three";
import type { ExtraProps } from "@/components/story/types";
import { useExtraFrame } from "@/components/story/extra-frame";
import { Catalogue } from "../geometry";
import { Documents } from "../models";
import { indexOf } from "../story";
import { reveal,progress } from "../scene-motion";
export default function Career({frameRef,look,still}:ExtraProps){
 const library=useRef<Group>(null),kestrel=useRef<Group>(null);const lib=indexOf("career.library-lumen");
 useExtraFrame(()=>{reveal(library.current,frameRef.current,lib);const p=progress(frameRef.current,lib,still);if(library.current){library.current.scale.y*=Math.max(.001,1-Math.min(1,p*2));library.current.visible=library.current.visible&&p<.5;}reveal(kestrel.current,frameRef.current,indexOf("career.kestrel"));});
 return <><group ref={library} position={[0,-.2,0]}><Catalogue accent={look.accent}/></group><group ref={kestrel} position={[0,-.1,0]}><Documents accent={look.accent}/></group></>;
}
