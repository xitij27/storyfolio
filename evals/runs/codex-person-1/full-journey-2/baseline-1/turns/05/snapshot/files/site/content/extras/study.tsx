"use client";
import { useRef } from "react";
import type { Group } from "three";
import type { ExtraProps } from "@/components/story/types";
import { useExtraFrame } from "@/components/story/extra-frame";
import { Catalogue } from "../geometry";
import { ReadingStand } from "../models";
import { indexOf } from "../story";
import { reveal } from "../scene-motion";
export default function Study({frameRef,look}:ExtraProps){const root=useRef<Group>(null);useExtraFrame(()=>reveal(root.current,frameRef.current,indexOf("study.degree")));return <group ref={root} position={[0,-.12,0]}><group position={[.6,.02,-.55]} scale={.48}><Catalogue accent={look.accent}/></group><group position={[-.35,0,.3]}><ReadingStand degree accent={look.accent}/></group></group>;}
