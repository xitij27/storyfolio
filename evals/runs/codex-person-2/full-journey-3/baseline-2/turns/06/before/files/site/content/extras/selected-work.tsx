"use client";
import type { ExtraProps } from "@/components/story/types";
import { Presence } from "./presence";
import { WaveSystem } from "./waves";
import { DatabaseSystem } from "./database";
import { RunbookSystem } from "./runbook";
import { OncallSystem } from "./oncall";
import { FerrySystem } from "./ferry";
import { Database, Route } from "./geometry";
export default function SelectedWork(props:ExtraProps){const {frameRef,look}=props;return <>
 <Presence frameRef={frameRef} chapter="work" beat="work.waves"><WaveSystem {...props}/></Presence>
 <Presence frameRef={frameRef} chapter="work" beat="work.database"><DatabaseSystem {...props} chapter="work"/></Presence>
 <Presence frameRef={frameRef} chapter="work" beat="work.runbook"><RunbookSystem {...props}/></Presence>
 <Presence frameRef={frameRef} chapter="work" beat="work.oncall"><OncallSystem {...props}/></Presence>
 <Presence frameRef={frameRef} chapter="work" beat="work.ferry"><FerrySystem {...props}/></Presence>
 <Presence frameRef={frameRef} chapter="work" beat="work.talk"><group position={[-1.8,0,0]} scale={.65}><Database look={look} backup/>{Array.from({length:8},(_,i)=><mesh key={i} position={[-.7+i%4*.45,1.2-Math.floor(i/4)*.32,0]}><boxGeometry args={[.35,.2,.1]}/><meshStandardMaterial color={i===5?"#b56a54":look.accent}/></mesh>)}<Route color={look.accent} points={[[-1.5,0,0],[-1.3,2,0],[1.5,2,0],[1.5,0,0]]}/></group><group position={[1.4,0,0]} scale={.48}><RunbookSystem {...props}/></group><Route color={look.faint} points={[[-1.1,0,0],[0,0,0],[1.1,0,0]]}/></Presence>
 </>;}
