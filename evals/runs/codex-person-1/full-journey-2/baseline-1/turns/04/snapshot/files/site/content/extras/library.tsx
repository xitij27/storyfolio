"use client";
import { useRef } from "react";
import type { Group } from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import type { ExtraProps } from "@/components/story/types";
import { weight } from "@/lib/story/timeline";
import { Block, Catalogue, Stroke } from "../geometry";
export default function Library({ frameRef,look,still }: ExtraProps) {
  const root=useRef<Group>(null),table=useRef<Group>(null);
  useExtraFrame(()=>{
    const f=frameRef.current, w=Math.max(weight(f.beat,0),weight(f.beat,1));
    if(root.current){root.current.visible=w>.001;root.current.scale.y=Math.max(.001,w);}
    const dwell=f.from===1?f.dwell:0;
    const gone=still?(dwell>=.5?1:0):Math.max(0,Math.min(1,(dwell-.15)/.7));
    if(table.current) {table.current.scale.setScalar(Math.max(.001,1-gone));table.current.visible=gone<.999;}
  });
  return <group ref={root} position={[0,-.24,0]}>
    <Catalogue accent={look.accent}/>
    <group ref={table} position={[-.85,.19,.95]} rotation={[0,-.08,0]}>
      <Block size={[1.45,.045,.85]} color={look.surface.color}/>
      {[-.7,-.23,.23,.7].map(x=><Stroke key={x} from={[x,.03,-.4]} to={[x,.03,.4]} color={look.accent} radius={.008}/>)}
      {[-.4,-.13,.13,.4].map(z=><Stroke key={z} from={[-.7,.03,z]} to={[.7,.03,z]} color={look.accent} radius={.008}/>)}
    </group>
  </group>;
}
