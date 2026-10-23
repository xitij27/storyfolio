"use client";
import type { ExtraProps } from "@/components/story/types";
import { Presence } from "./presence";
import { Database, Route, WorkGrid } from "./geometry";
export default function Practice(props:ExtraProps){const {look,frameRef}=props;return <>
 <Presence frameRef={frameRef} chapter="practice" beat="practice.plan">
 {[-1,0,1].map((y,i)=><group key={y}><Route color={look.faint} points={[[-2.7,y,0],[-1.7,y,0],[0,.1,0]]}/><mesh position={[-2.7,y,0]}><sphereGeometry args={[.16,20,20]}/><meshStandardMaterial color={look.surface.color}/></mesh><mesh position={[-1.4+i*.25,y*.6,0]}><sphereGeometry args={[.1,16,16]}/><meshStandardMaterial color={look.accent}/></mesh></group>)}
 <mesh position={[0,.1,0]}><torusGeometry args={[.45,.055,12,48]}/><meshStandardMaterial color={look.accent}/></mesh><Route color={look.accent} points={[[.5,.1,0],[1.2,.1,0],[2.5,.6,0]]}/><group position={[2.5,0,0]}><Database look={look}/></group><Route color={look.ink} points={[[2.5,.6,0],[2,1.7,0],[0,1.7,0],[-2.7,1.4,0]]}/><WorkGrid look={look}/>
 </Presence>
 <Presence frameRef={frameRef} chapter="practice" beat="practice.influences"><group position={[-2.5,0,0]}><Database look={look} backup/></group><group position={[2.5,0,0]}><Database look={look}/></group><Route color={look.accent} points={[[-2.5,.65,0],[-1,1.5,0],[1,1.5,0],[2.5,.65,0]]}/>{[-.25,0,.25].map(y=><Route key={y} color={look.faint} radius={.016} points={[[-1.8,y,0],[0,y,0],[1.8,y,0]]}/>)}<WorkGrid look={look}/></Presence>
 </>;}
