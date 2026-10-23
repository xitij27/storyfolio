"use client";
import { useMemo } from "react";
import { CatmullRomCurve3, Vector3 } from "three";
import type { PieceProps } from "@/components/story/types";
// One continuous return path persists while each chapter's own system unfolds above it.
export function ReturnPath({look}: PieceProps) {
  const curve=useMemo(()=>new CatmullRomCurve3([new Vector3(-2.5,-.65,0),new Vector3(-2.5,-1.8,0),new Vector3(0,-2,0),new Vector3(2.5,-1.8,0),new Vector3(2.5,-.65,0)]),[]);
  return <mesh><tubeGeometry args={[curve,72,.027,8,false]}/><meshStandardMaterial color={look.id==="light"?"#9b532b":look.id==="warm"?"#9cbfc2":"#ddba7a"} roughness={.7}/></mesh>;
}
