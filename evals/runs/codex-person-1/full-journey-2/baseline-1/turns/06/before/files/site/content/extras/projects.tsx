"use client";
import { useRef } from "react";
import type { Group } from "three";
import type { ExtraProps } from "@/components/story/types";
import { useExtraFrame } from "@/components/story/extra-frame";
import Migration from "./migration";
import { Database,SmallBook,Terminal,Lectern,Document } from "../models";
import { indexOf } from "../story";
import { reveal } from "../scene-motion";
export default function Projects(props:ExtraProps){
 const db=useRef<Group>(null),book=useRef<Group>(null),ferry=useRef<Group>(null),talk=useRef<Group>(null);
 useExtraFrame(()=>{const f=props.frameRef.current;reveal(db.current,f,indexOf("projects.database"));reveal(book.current,f,indexOf("projects.runbook"));reveal(ferry.current,f,indexOf("projects.ferry"));reveal(talk.current,f,indexOf("projects.talk"));});
 return <><Migration {...props}/><group ref={db} position={[0,-.08,0]}><Database accent={props.look.accent}/></group><group ref={book} position={[0,-.1,0]}><group position={[-.55,.07,0]} scale={1.4}><SmallBook accent={props.look.accent}/></group><Document position={[1,.12,.2]} accent={props.look.accent} checklist/></group><group ref={ferry} position={[0,-.1,0]}><Terminal accent={props.look.accent}/></group><group ref={talk} position={[0,-.15,0]}><Lectern accent={props.look.accent}/></group></>;
}
