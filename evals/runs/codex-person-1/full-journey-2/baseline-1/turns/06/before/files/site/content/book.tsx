"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { PieceProps } from "@/components/story/types";
import { Block, Leaf, Stroke } from "./geometry";
import { indexOf } from "./story";
const closingIndex=indexOf("contact.close"), beforeClose=closingIndex-1;
export function Runbook({ look, frameRef, still }: PieceProps) {
  const root=useRef<Group>(null), left=useRef<Group>(null);
  useFrame(()=>{
    const f=frameRef.current;
    const end=f.beat>beforeClose ? Math.min(1,(f.beat-beforeClose)*.9+(f.from===closingIndex?f.dwell*.1:0)) : 0;
    const opening=f.from===0&&f.to===0 ? (still?1:f.dwell) : 1;
    const closing=still?(f.from===closingIndex?1:0):end;
    if(left.current) left.current.rotation.z = -Math.PI*closing - (1-opening)*1.25;
    if(root.current) root.current.position.x=-1.12*closing;
  });
  const cover=look.id==="dark"?"#34463d":"#b34e2c";
  return <group ref={root} position={[0,-.3,0]}>
    <group ref={left} position={[0,.03,0]}>
      <Block position={[-1.15,-.12,0]} size={[2.3,.12,3.17]} color={cover} />
      {[0,1,2,3].map(i=><group key={i} position={[-1.1,i*.028,0]}><Leaf color={look.surface.color} curl={.06+i*.025}/></group>)}
    </group>
    <Block position={[1.15,-.09,0]} size={[2.3,.12,3.17]} color={cover} />
    {[0,1,2,3].map(i=><group key={i} position={[1.1,i*.028,0]}><Leaf color={look.surface.color} curl={.15-i*.028}/></group>)}
    <Stroke from={[0,.12,-1.5]} to={[0,.12,1.5]} color={cover} radius={.035}/>
    <Block position={[.15,-.04,1.78]} size={[.16,.025,.7]} color={look.accent}/>
  </group>;
}
