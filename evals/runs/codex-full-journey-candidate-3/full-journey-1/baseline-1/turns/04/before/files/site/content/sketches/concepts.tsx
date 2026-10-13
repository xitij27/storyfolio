"use client";
import Link from "next/link";
import { Story } from "@/components/story/story";
import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import type { PieceProps, StoryBundle, FaceDef } from "@/components/story/types";
import { blankFormation, type Pose, type Formation } from "@/lib/story/formation";
import { looks } from "../looks";

type Kind = "fixture" | "enclosure" | "probe";
const labels = ["CODE", "STATE", "BOARD", "ACCESS", "SIGNAL", "CLAIM"];
function Fixture({ material, look }: PieceProps) {
  return <group>
    <mesh castShadow receiveShadow position={[0, -.22, 0]}><boxGeometry args={[1, .56, .65]}/><meshStandardMaterial color="#263c3a" roughness={.65}/></mesh>
    <mesh material={material} position={[0,-.22,.331]}><planeGeometry args={[.86,.4]}/></mesh>
    {[-.27,.27].map(x=><group key={x} position={[x,.15,0]}><mesh castShadow><cylinderGeometry args={[.07,.09,.36,16]}/><meshStandardMaterial color="#cba95d" metalness={.75} roughness={.28}/></mesh><mesh position={[0,.23,0]}><cylinderGeometry args={[.035,.035,.16,12]}/><meshStandardMaterial color="#dde0d8" metalness={.8} roughness={.3}/></mesh></group>)}
    <mesh position={[.37,-.22,.345]}><sphereGeometry args={[.03,12,12]}/><meshStandardMaterial color={look.accent}/></mesh>
  </group>;
}
function Enclosure({material}:PieceProps) {
  return <group>
    <mesh castShadow receiveShadow><cylinderGeometry args={[.48,.48,.5,40]}/><meshStandardMaterial color="#e2e0d3" roughness={.65}/></mesh>
    <mesh material={material} rotation={[-Math.PI/2,0,0]} position={[0,.256,0]}><circleGeometry args={[.37,40]}/></mesh>
    <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[.48,.045,12,40]}/><meshStandardMaterial color="#cba95d" metalness={.55} roughness={.4}/></mesh>
    {[0,1,2,3].map(i=><mesh key={i} position={[Math.cos(i*Math.PI/2)*.38,.27,Math.sin(i*Math.PI/2)*.38]}><sphereGeometry args={[.025,8,8]}/><meshStandardMaterial color="#304541"/></mesh>)}
  </group>;
}
function Probe({material}:PieceProps) {
  return <group>
    <mesh castShadow receiveShadow rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.22,.26,.8,24]}/><meshStandardMaterial color="#304541" roughness={.5}/></mesh>
    <mesh castShadow rotation={[0,0,Math.PI/2]} position={[.48,0,0]}><cylinderGeometry args={[.05,.12,.25,16]}/><meshStandardMaterial color="#cba95d" metalness={.7} roughness={.3}/></mesh>
    <mesh material={material} position={[0,0,.24]}><planeGeometry args={[.65,.24]}/></mesh>
    <mesh rotation={[0,0,Math.PI/2]} position={[-.41,0,0]}><torusGeometry args={[.22,.035,10,24]}/><meshStandardMaterial color="#191f21" roughness={.8}/></mesh>
  </group>;
}
function poses(kind:Kind, stage:number): Pose[] {
  return Array.from({length:6},(_,i)=> {
    if(kind==="fixture") return {position:stage===1 ? [(i%3-1)*1.4, (i<3?.85:-.85),i===4?.35:0] : [(i%3-1)*1.02,(i<3?.36:-.36),0],rotation:[.25,stage===1?.12:0,0],size:[1,1]};
    if(kind==="enclosure") return {position:stage===1?[Math.cos(i*Math.PI/3)*1.55,Math.sin(i*Math.PI/3)*1.55,0]:[0,(i-2.5)*.51,0],rotation:stage===1?[1.2,0,0]:[.2,0,0],size:[1,1]};
    return {position:stage===1?[(i-2.5)*.9,(i<3?.85:-.85),0]:[(i-2.5)*.83,0,0],rotation:[0,0,stage===1?(i<3?.25:-.25):0],size:[1,1]};
  });
}
function formation(kind:Kind,stage:number):Formation {
  return {...blankFormation(6),pieces:poses(kind,stage),span:kind==="probe"?6.4:4.8,rise:kind==="enclosure"?4.8:3.4,anchor:[.48,.15],turn:[.16,-.28],near:5,floor:-3,sway:[.06,.16,0]};
}
const descriptions = {
 fixture: {name:"The bring-up fixture",question:"How do you connect firmware to a physical observation?",form:"Bench checklist",titles:["Ada Mensah. Firmware at the bench.","A command needs an observation.","A claim needs its limits."],body:["For Mosslink, I wrote the firmware, scheduled the power states and built the bring-up fixture. Bring-up means checking a new board’s basic operation.","A current trace showed the radio remaining awake after a failed transmission. The cause, fix and later outcome are not confirmed. The fixture opens here to separate code, access and observation.","Two years is a projection from bench current readings and an assumed reporting cycle. The longest observed run was 72 hours. An estimate and an observed run support different claims."],note:"Six contact modules form an explanatory fixture. This geometry shows relationships, not actual wiring or the real device."},
 enclosure: {name:"Inside the power cycle",question:"What supports a battery-life claim?",form:"State table",titles:["Ada Mensah. Open the estimate.","A teaching cycle, an unresolved observation.","Projection and run: different evidence."],body:["I wrote Mosslink’s firmware and scheduled its power states. The two-year battery figure is a projection; there is no field endurance or weather testing to support it.","Sleep, Measure and Transmit are a teaching sequence, with no actual firmware state names, durations or current values claimed. Separately, a current trace showed the radio staying awake after a failed transmission.","The longest run was 72 hours. I want to make the basis of a claim visible: measured bench current supports the estimate, while an observed run supports a different statement."],note:"Six machined sections make a symbolic sensor enclosure. They are explanatory geometry, not a reconstruction of Mosslink."},
 probe: {name:"Follow the observation",question:"What can a physical signal tell you about firmware?",form:"Timing diagram",titles:["Ada Mensah. Follow code to the bench.","An observation, without an invented ending.","Make the claim match the observation."],body:["My working documents are a state table, timing diagram and current trace. For Mosslink, I wrote firmware, scheduled power states and built a bring-up fixture.","After a failed transmission, a current trace showed the radio remaining awake. This sketch separates a conceptual command path from its observation. No actual trace, timing, cause or resolution is shown.","Forty engineering samples were assembled; six were bench tested. None went to customers. The preliminary emissions check passed, while the full qualification programme remains unfinished."],note:"Six connector sleeves form a symbolic probe assembly. Position indicates conceptual order, not duration, wiring or a measured signal."}
};
function Concept({kind}:{kind:Kind}) {
  const d=descriptions[kind];
  const story={pieces:6,chapters:[{id:"opening",number:1,name:kind==="fixture"?"Purpose":kind==="enclosure"?"State":"Command",role:"opening" as const,beats:[{id:"opening.start",height:1.5}]},{id:"middle",number:2,name:kind==="fixture"?"Observe":kind==="enclosure"?"Transition":"Observation",role:"how" as const,beats:[{id:"middle.open",height:1.5}]},{id:"close",number:3,name:"Claim",role:"close" as const,beats:[{id:"close.end",height:1.5}]}]};
  const faces:FaceDef[]=story.chapters.flatMap(c=>Array.from({length:6},(_,piece)=>({id:`${c.id}-${piece}`,beat:c.beats[0].id,piece,draw(ctx,w,h,look){ctx.fillStyle="#263c3a";ctx.fillRect(0,0,w,h);ctx.strokeStyle="#cba95d";ctx.lineWidth=w*.014;ctx.strokeRect(w*.04,h*.08,w*.92,h*.84);ctx.fillStyle="#faf7ec";ctx.font=`600 ${w*.14}px ui-monospace,monospace`;ctx.textAlign="center";ctx.fillText(labels[piece],w*.5,h*.58);ctx.fillStyle=look.accent;}})));
  const bundle:StoryBundle={story,formations:{"opening.start":{rest:formation(kind,0)},"middle.open":{rest:formation(kind,1)},"close.end":{rest:formation(kind,2)}},faces,looks,copy:{railLabel:"Sketch chapters",lookLabel:"Appearance"},Piece:kind==="fixture"?Fixture:kind==="enclosure"?Enclosure:Probe};
  return <main><nav className="concept-nav" aria-label="Concept navigation"><Link href="/">All concepts</Link><span>{d.name}</span></nav><Story bundle={bundle}>{story.chapters.map((c,i)=><Chapter key={c.id} id={c.id}><Beat story={story} id={c.beats[0].id} fallback={<p>{d.note}</p>}><Kicker number={i+1}>{d.form} · {c.name}</Kicker><Title as={i===0?"h1":"h2"} id={`${c.id}-title`}>{d.titles[i]}</Title>{i===0&&<p className="concept-question">{d.question}</p>}<Body>{d.body[i]}</Body><Note>{d.note}</Note>{i===0&&<p className="concept-contact"><a href="mailto:ada@example.com">Email Ada</a> · <a href="#close">Read the conclusion</a></p>}{i===2&&<p><a href="mailto:ada@example.com">ada@example.com</a> · <Link href="/">Compare concepts</Link></p>}</Beat></Chapter>)}</Story></main>;
}
export function FixtureSketch(){return <Concept kind="fixture"/>;}
export function EnclosureSketch(){return <Concept kind="enclosure"/>;}
export function ProbeSketch(){return <Concept kind="probe"/>;}
