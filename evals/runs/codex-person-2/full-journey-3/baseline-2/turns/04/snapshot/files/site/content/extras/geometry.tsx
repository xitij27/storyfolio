"use client";
import { useMemo } from "react";
import { CatmullRomCurve3, Vector3 } from "three";
import type { Look } from "@/lib/story/looks";
export function Route({points,color,radius=.03}:{points:number[][];color:string;radius?:number}){
  const curve=useMemo(()=>new CatmullRomCurve3(points.map(p=>new Vector3(...p))),[points]);
  return <mesh><tubeGeometry args={[curve,56,radius,8,false]}/><meshStandardMaterial color={color} roughness={.65}/></mesh>;
}
export function Database({look,backup=false}:{look:Look;backup?:boolean}){
  const color=backup ? look.surface.color:look.accent;
  return <group>{[0,1,2].map(i=><mesh key={i} position={[0,(i-1)*.34,0]}><cylinderGeometry args={[.65,.65,.28,48]}/><meshStandardMaterial color={color} transparent opacity={1} metalness={.15} roughness={look.surface.roughness}/></mesh>)}<mesh position={[0,.486,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.28,.3,48]}/><meshBasicMaterial color={look.ink}/></mesh></group>;
}
export function WorkGrid({look}:{look:Look}){
 return <gridHelper args={[8,16,look.surface.color,look.surface.color]} position={[0,-2.13,0]} />;
}
