"use client";
import { useRef, type ReactNode } from "react";
import type { Group } from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import { beatIndex, chapterPresence } from "@/lib/story/story";
import { weight } from "@/lib/story/timeline";
import { story } from "@/content/story";
import type { ExtraProps } from "@/components/story/types";
export function Presence({frameRef,chapter,beat,children}:{frameRef:ExtraProps["frameRef"];chapter:string;beat?:string;children:ReactNode}){
 const ref=useRef<Group>(null);const index=beat?beatIndex(story,beat):-1;
 useExtraFrame(()=>{const f=frameRef.current;const p=Math.min(chapterPresence(story,chapter,f.beat),index<0?1:weight(f.beat,index));if(ref.current){ref.current.scale.setScalar(Math.max(.001,p));ref.current.position.set((1-p)*2.5,(1-p)*-.3,0);}});
 return <group ref={ref}>{children}</group>;
}
