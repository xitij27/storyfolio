"use client";

import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import "./concepts.css";

type Kind = "paths" | "bench" | "logs";
const data = {
  paths: { number: "01", name: "The live path", accent: "#a9f598", intro: "Keep a way back.", middle: "Two databases. One careful handover.", lead: "In 2014, I dropped a table in the university library’s production database. That outage is why I care about rollbacks.", detail: "In 2022, I led the 4 TB orders database upgrade with one database engineer. Logical replication, dual writes and hourly checksums came before moving reads, then writes. The old cluster stayed warm for a month.", end: "Let’s talk about your migration.", scene: "Scroll to move the write path. The previous target remains available.", world: "Request paths bend through a continuous system. Recovery is visible beside the forward route." },
  bench: { number: "02", name: "The cutover bench", accent: "#ffb87b", intro: "A rollback is part of the plan.", middle: "Six stages. A check at every gate.", lead: "My first production outage was at the library in 2014. I dropped a table. I now work from the runbook, the cutover checklist and the rollback plan.", detail: "I wrote the runbook’s first version and still own it. Forty teams use it: preflight, shadow, dual write, cutover, soak, decommission. Each stage has an exit check.", end: "Bring the migration you’re worried about.", scene: "Scroll to move a service through the six gates. This is an explanatory model of the runbook.", world: "A sectional working bench reveals checks, parallel routes and a return loop." },
  logs: { number: "03", name: "The recovery line", accent: "#8dd8ff", intro: "Start with the second copy.", middle: "310 services. Fourteen waves.", lead: "My electrical engineering project logged the campus substation’s feeder load every second to an SD card. It taught me that data you cannot lose needs a second copy.", detail: "I wrote and sequenced the data-centre exit plan. About 60 engineers delivered 14 waves over 26 months. Measured Order API availability over those 26 months: 99.98%.", end: "Plan the move. Keep the way back.", scene: "Scroll to transfer illustrative service streams from two sites into one destination. Stream count does not represent service count.", world: "Transaction ribbons unspool, branch into migration waves and keep a recovery strand." },
};

function Pipe({ points, color, radius = .025 }: {points: number[][]; color: string; radius?: number}) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), [points]);
  return <mesh><tubeGeometry args={[curve, 60, radius, 7, false]} /><meshStandardMaterial color={color} roughness={.5} /></mesh>;
}
function Drum({ x, color, scale = 1 }: {x: number; color: string; scale?: number}) {
  return <group position={[x,0,0]} scale={scale}>{[0,1,2].map(i => <mesh key={i} position={[0,i*.32-.32,0]}><cylinderGeometry args={[.63,.63,.24,48]} /><meshStandardMaterial color={color} metalness={.45} roughness={.34} /></mesh>)}<mesh position={[0,.49,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.27,.3,40]} /><meshBasicMaterial color="#d6ffe9" side={THREE.DoubleSide} /></mesh></group>;
}
function World({ kind, progress, reduced }: {kind: Kind; progress: React.RefObject<number>; reduced: boolean}) {
  const group = useRef<THREE.Group>(null);
  const moving = useRef<THREE.Mesh>(null);
  const origin = useRef<THREE.Group>(null);
  const system = useRef<THREE.Group>(null);
  const branch = useRef<THREE.Group>(null);
  const color = data[kind].accent;
  useFrame(() => {
    const p = reduced ? Math.round(progress.current*2)/2 : progress.current;
    const unfold = Math.min(1,p*3.2);
    if(origin.current) { origin.current.scale.setScalar(Math.max(.001,1-unfold)); origin.current.position.x = -unfold*2; }
    if(system.current) system.current.scale.setScalar(.001+unfold*.999);
    if(group.current) { group.current.rotation.y = -.24 + p*.4; group.current.rotation.x = .14; }
    if(moving.current) { moving.current.position.x = -2.6 + Math.min(1,p*1.6)*5.2; moving.current.position.y = kind === "bench" ? .25 : .8 + Math.sin(p*Math.PI)*.6; }
    if(branch.current) branch.current.scale.setScalar(.3 + Math.min(1,p*2)*.7);
  });
  return <group ref={group}>
    <group ref={origin}>
      {kind === "logs" ? <>
        <mesh position={[1,0,0]}><boxGeometry args={[1.5,2,.16]}/><meshStandardMaterial color="#456d80" roughness={.45}/></mesh>
        {[0,1,2,3,4].map(i=><mesh key={i} position={[.52+i*.23,.65,.1]}><boxGeometry args={[.12,.35,.03]}/><meshStandardMaterial color="#dfc27e"/></mesh>)}
        <Pipe color={color} points={[[-2,-.5,0],[-1.7,-.5,0],[-1.7,.35,0],[-1.4,.35,0],[-1.4,-.5,0],[-1.1,-.5,0],[-1.1,.35,0],[-.8,.35,0],[-.8,-.5,0],[.25,-.5,0]]}/>
      </> : <>
        <Drum x={-1.6} color="#587d71"/><Drum x={1.6} color="#d8ba7c" scale={.7}/>
        {Array.from({length:8},(_,i)=><mesh key={i} position={[-.8+(i%4)*.5,1.1-Math.floor(i/4)*.35,.1]}><boxGeometry args={[.4,.2,.16]}/><meshStandardMaterial color={i===5?"#dd846e":color}/></mesh>)}
        <Pipe color="#e7bb7c" points={[[1.6,-.5,0],[1.3,-1.4,0],[-1.3,-1.4,0],[-1.6,-.6,0]]}/>
      </>}
    </group>
    <group ref={system}>
    {kind === "paths" && <>
      <Drum x={-1.7} color="#52766d" /><Drum x={1.7} color={color} />
      <Pipe color={color} radius={.045} points={[[-3,1.8,0],[-1.7,1.7,0],[-1.7,.8,0]]} />
      <Pipe color={color} radius={.045} points={[[-3,1.8,0],[0,2,0],[1.7,1.5,0],[1.7,.8,0]]} />
      {[-.25,0,.25].map(z => <Pipe key={z} color="#79a798" points={[[-1.1,0,z],[0,-.15,z],[1.1,0,z]]} />)}
      <Pipe color="#e7bb7c" points={[[1.7,-.6,0],[1.4,-1.5,0],[-1.5,-1.5,0],[-1.7,-.6,0]]} />
      <group ref={branch}>{[0,1,2,3,4].map(i => <mesh key={i} position={[-.6+i*.3,-.6,0]}><boxGeometry args={[.15,.15,.15]} /><meshStandardMaterial color={color} /></mesh>)}</group>
    </>}
    {kind === "bench" && <>
      <Pipe color="#839492" radius={.1} points={[[-3,.25,0],[-1,.25,0],[1,.25,0],[3,.25,0]]} />
      {Array.from({length:6},(_,i) => <group key={i} position={[-2.6+i*1.04,.25,0]}>
        <mesh rotation={[0,Math.PI/2,0]}><torusGeometry args={[.58,.065,12,48]} /><meshStandardMaterial color={color} metalness={.45} roughness={.3} /></mesh>
        <mesh position={[0,-.8,0]}><boxGeometry args={[.35,.35,.7]} /><meshStandardMaterial color="#66716f" /></mesh>
        <mesh position={[0,.85,0]}><sphereGeometry args={[.075,12,12]} /><meshBasicMaterial color={color} /></mesh>
      </group>)}
      <Pipe color={color} points={[[2.9,.25,0],[3,-1.4,0],[0,-1.6,0],[-3,-1.4,0],[-2.9,.25,0]]} />
      <group ref={branch}><Pipe color="#dbe9e1" points={[[-1.5,.25,0],[-1,1.7,0],[1,1.7,0],[1.5,.25,0]]} /></group>
    </>}
    {kind === "logs" && <>
      <group position={[-2.2,.4,0]}><Drum x={0} color="#54798e" scale={.75}/></group>
      <group position={[-2.2,-.9,0]}><Drum x={0} color="#54798e" scale={.65}/></group>
      <Drum x={2.2} color={color}/>
      <group ref={branch}>{Array.from({length:14},(_,i) => <Pipe key={i} color={i%2?color:"#5b879c"} radius={.016} points={[[-2.2,i%2?.8:-.8,-.4],[-.8,(i-6.5)*.25,.3],[.7,(i-6.5)*.25,.3],[2.2,.4,-.4]]} />)}</group>
      <Pipe color="#e7bb7c" points={[[2.2,-.6,0],[1.8,-2,0],[-1.8,-2,0],[-2.2,-.6,0]]}/>
    </>}
    <mesh ref={moving} position={[-2.6,.8,.2]}><sphereGeometry args={[.12,24,24]} /><meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={.8} /></mesh>
    </group>
    <gridHelper args={[12,24,"#263e3a","#162b28"]} position={[0,-2.3,0]} />
  </group>;
}

export function Concept({kind}: {kind: Kind}) {
  const d = data[kind];
  const progress = useRef(0);
  const [ready,setReady] = useState(false);
  const [reduced,setReduced] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(query.matches);
    const motionFrame = requestAnimationFrame(updateMotion); query.addEventListener("change", updateMotion);
    const scroll = () => { progress.current = Math.max(0, Math.min(1, scrollY/(document.documentElement.scrollHeight-innerHeight))); };
    scroll(); addEventListener("scroll",scroll,{passive:true});
    const canvas = document.createElement("canvas");
    const readyFrame = requestAnimationFrame(() => setReady(Boolean(canvas.getContext("webgl2"))));
    return () => { cancelAnimationFrame(motionFrame); cancelAnimationFrame(readyFrame); removeEventListener("scroll",scroll); query.removeEventListener("change",updateMotion); };
  },[]);
  return <main className={`concept concept-${kind}`} style={{"--accent": d.accent} as React.CSSProperties}>
    <header className="concept-header"><Link href="/">DB<span> / Concept studies</span></Link><nav aria-label="Concept navigation"><a href="#work">Work</a><a href="#contact">Contact</a><Link href="/">All concepts ↗</Link></nav></header>
    <aside className="concept-scene" aria-label={`${d.name}: original 3D illustration`}>
      {ready ? <Canvas camera={{position:[0,3.5,9],fov:43}} dpr={[1,1.5]} gl={{antialias:true}}><ambientLight intensity={1.7}/><directionalLight position={[2,5,4]} intensity={3}/><World kind={kind} progress={progress} reduced={reduced}/></Canvas> : <div className="scene-fallback">SOURCE ⇄ CHECK ⇄ TARGET<br/><small>Rollback path kept open · illustration</small></div>}
      <span className="illustration">ILLUSTRATION / {d.number} — {d.name}</span>
    </aside>
    <section id="hello" className="concept-beat"><div><p className="eyebrow">Dawit Bekele / migrations & reliability</p><h1>{d.intro}</h1><p className="lede">{d.lead}</p><p className="fine">For engineering leaders planning a migration, and conference organisers.</p><a className="text-link" href="mailto:dawit@example.com">Write to Dawit ↗</a><p className="scroll-cue">↓ Scroll to explore the working model</p></div></section>
    <section id="work" className="concept-beat"><div><p className="eyebrow">{kind === "bench" ? "The runbook / 2021–now" : kind === "logs" ? "The data-centre exit / 2020–2022" : "The orders database / 2022"}</p><h2>{d.middle}</h2><p className="lede">{d.detail}</p><details><summary>Read the approach <span>+</span></summary><p>{kind === "bench" ? "A service cannot enter a stage until the previous stage’s check has passed. The runbook begins with a dependency map and a rehearsed rollback." : kind === "logs" ? "Services were grouped by dependency. Each wave used preflight, shadow traffic, dual writes where stateful, weighted routing, a soak period and decommissioning. Both data centres closed on schedule." : "A new Postgres 15 cluster followed Postgres 11 through logical replication. The order service wrote to both through ferry. An hourly checksum job compared them for three weeks before the move. The upgrade had no maintenance window."}</p></details><p className="fine">{d.scene}</p></div></section>
    <section id="contact" className="concept-beat"><div><p className="eyebrow">Rotterdam / Get in touch</p><h2>{d.end}</h2><p className="lede">I wrote and sequenced the 310-service migration plan at Kestrel Freight, own the runbook used by 40 teams, and maintain ferry.</p><a className="contact-link" href="mailto:dawit@example.com">dawit@example.com ↗</a><p className="fine">Speaking: Boring Migrations, SRE North 2024.</p><Link className="text-link" href="/">Compare all three concepts ↗</Link></div></section>
    <footer className="concept-footer"><span>Local concept sketch · Dawit Bekele</span><span>Original geometry / system fonts</span></footer>
  </main>;
}
export function Paths(){return <Concept kind="paths"/>;}
export function Bench(){return <Concept kind="bench"/>;}
export function Logs(){return <Concept kind="logs"/>;}
