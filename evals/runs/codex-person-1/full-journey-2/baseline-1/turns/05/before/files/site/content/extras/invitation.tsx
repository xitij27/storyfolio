"use client";
import { useRef } from "react";
import { DoubleSide, Shape, type Group } from "three";
import { useExtraFrame } from "@/components/story/extra-frame";
import type { ExtraProps } from "@/components/story/types";
import { weight } from "@/lib/story/timeline";
import { Block,Stroke } from "../geometry";
const flap=new Shape();flap.moveTo(-.85,-.42);flap.lineTo(0,.2);flap.lineTo(.85,-.42);flap.closePath();
export default function Invitation({frameRef,look}:ExtraProps){
  const root=useRef<Group>(null);
  useExtraFrame(()=>{const w=weight(frameRef.current.beat,3);if(root.current){root.current.visible=w>.001;root.current.scale.setScalar(Math.max(.001,w));}});
  return <group ref={root} position={[.05,.5,0]}>
    <group rotation={[0,-.13,0]} position={[-.35,0,.28]}>
      <Block size={[1.7,.035,1.1]} color={look.surface.color}/>
      <mesh position={[0,.025,0]} rotation={[-Math.PI/2,0,0]}><shapeGeometry args={[flap]}/><meshStandardMaterial color="#faf2df" side={DoubleSide} roughness={.9}/></mesh>
      <Block position={[0,.055,0]} size={[.24,.025,.24]} rotation={[0,Math.PI/4,0]} color={look.accent}/>
    </group>
    <group position={[.7,-.12,-.6]} rotation={[.12,.22,.05]}>
      <Block size={[1.05,.035,1.45]} color={look.surface.color}/>
      {[-.48,-.27,-.1,.07,.24,.4].map((z,i)=><Stroke key={z} from={[-.37,.026,z]} to={[i===0?.1:.37,.026,z]} color={i===0?look.accent:"#75806b"} radius={i===0?.02:.008}/>)}
    </group>
  </group>;
}
