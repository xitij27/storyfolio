"use client";
/* eslint-disable @next/next/no-img-element -- supplied local SVGs need no optimization */
import Link from "next/link";
import type { PieceProps, StoryBundle } from "@/components/story/types";
import type { Formation, Pose } from "@/lib/story/formation";
import { blankFormation } from "@/lib/story/formation";
import { Story } from "@/components/story/story";
import { Chapter, Beat, Title, Body, Note, Kicker } from "@/components/story/chapter";

const definitions = {
 fixture: {
  name: "The bring-up fixture", question: "How does a firmware decision become something you can observe?",
  middle: "Schedule in code. Observe on the bench.",
  body: "I wrote Mosslink’s firmware, scheduled its power states and built the bring-up fixture. Sleep → Measure → Transmit is a teaching sequence here, not recovered firmware or measured timing.",
  close: "A firmware decision needs a physical observation.",
  end: "The fixture connects this story: code, access to the board, and an observation. My colleague designed the PCB and analogue front end.",
  labels: ["SLEEP", "TEACHING", "MEASURE", "TEACHING", "TRANSMIT", "TEACHING"],
  image: "power-states.svg", sections: ["Setup", "Exercise", "Observe"]
 },
 samples: {
  name: "The bench sample carrier", question: "What can six bench-tested samples actually tell you?",
  middle: "Six on the bench. Forty assembled.",
  body: "Forty Mosslink engineering samples were assembled. We tested six on the bench. None went to customers. Each of these six explanatory boards represents one bench-tested sample; their layout is not a test order.",
  close: "Make the scope of the evidence visible.",
  end: "Six bench-tested samples do not establish a field pilot. The full qualification programme remains unfinished; the emissions pass was one preliminary check.",
  labels: ["BENCH 1", "BENCH 2", "BENCH 3", "BENCH 4", "BENCH 5", "BENCH 6"],
  image: "bring-up-fixture.svg", sections: ["State", "Observation", "Scope"]
 },
 terminal: {
  name: "The fixture terminal", question: "Where does a battery estimate stop being an observation?",
  middle: "A projection and a run answer different questions.",
  body: "Two years is a projection from bench current readings and an assumed reporting cycle. The longest run was 72 hours. No field endurance or weather testing supports a two-year claim.",
  close: "Keep the estimate beside its evidence.",
  end: "I connect firmware work to physical observation—and keep the limits visible. The terminal returns to one assembly without merging a projection and an observed run.",
  labels: ["MODEL", "2 YEARS", "PROJECTED", "RUN", "72 HOURS", "OBSERVED"],
  image: "bring-up-fixture.svg", sections: ["Reference", "Compare", "Interpret"]
 }
};
type Kind = keyof typeof definitions;
function Geometry({kind, index, material}: PieceProps & {kind: Kind}) {
 const green = kind === "samples" ? "#20584c" : "#304147";
 return <group>
  <mesh castShadow receiveShadow><boxGeometry args={[1, 1, kind === "samples" ? .15 : .48]}/><meshStandardMaterial color={green} roughness={.72}/></mesh>
  {kind === "samples" ? <>
   <mesh position={[0,.1,.16]}><boxGeometry args={[.42,.34,.18]}/><meshStandardMaterial color="#171e21"/></mesh>
   {[-.36,.36].map(x => <mesh key={x} position={[x,.06,.12]}><boxGeometry args={[.09,.6,.08]}/><meshStandardMaterial color="#c4a460" metalness={.6} roughness={.3}/></mesh>)}
  </> : <>
   <mesh position={[0,.14,.32]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.14,.14,.22,24]}/><meshStandardMaterial color="#d0b071" metalness={.7} roughness={.28}/></mesh>
   <mesh position={[0,.14,.45]}><sphereGeometry args={[.095,16,12]}/><meshStandardMaterial color={kind === "terminal" ? "#374344" : "#e9d8ad"} metalness={.4} roughness={.35}/></mesh>
   {kind === "fixture" && <mesh position={[0,-.1,-.3]}><boxGeometry args={[.6,.18,.22]}/><meshStandardMaterial color="#9aaba9" metalness={.5} roughness={.4}/></mesh>}
  </>}
  <mesh material={material} position={[0,-.31,kind === "samples" ? .086 : .25]}><planeGeometry args={[.94,.26]}/></mesh>
  <mesh position={[-.38,.37,.26]}><sphereGeometry args={[.035,10,8]}/><meshStandardMaterial color={index % 2 ? "#a8b1ae" : "#daa761"}/></mesh>
 </group>;
}
function Fixture(p: PieceProps) {return <Geometry {...p} kind="fixture"/>;}
function Samples(p: PieceProps) {return <Geometry {...p} kind="samples"/>;}
function Terminal(p: PieceProps) {return <Geometry {...p} kind="terminal"/>;}
function bundleFor(kind: Kind): StoryBundle {
 const d = definitions[kind];
 const story = {pieces: 6, chapters: d.sections.map((name,i) => ({id:["opening","middle","close"][i],number:i+1,name,role:(["opening","how","close"] as const)[i],beats:[{id:["opening.setup","middle.evidence","close.answer"][i],height:1.45}]}))};
 function formation(phase: number): Formation {
  const pieces: Pose[] = Array.from({length:6}, (_, i) => {
   let x = (i%3-1)*1.04, y = (.5-Math.floor(i/3))*1.04;
   if(kind === "terminal") { x=(i-2.5)*1.01; y=0; }
   if(phase===1) {
    if(kind === "fixture") {x=(Math.floor(i/2)-1)*1.5; y=(.5-i%2)*1.3;}
    if(kind === "samples") {x=(i%3-1)*1.5; y=(.5-Math.floor(i/3))*1.6;}
    if(kind === "terminal") {x=(i<3?-1.8:1.8); y=(1-i%3)*1.15;}
   }
   return {position:[x,y,phase===0 ? (i%3)*.05 : 0],rotation:[0,0,0],size:[1,1]};
  });
  return {...blankFormation(6),pieces,span:kind==="terminal" && phase!==1?7.2:5.5,rise:4.5,anchor:[.48,.12],turn:phase===1?[.05,-.08]:[-.3,.35],near:6,floor:-3,drift:0};
 }
 return {story,formations:{"opening.setup":{rest:formation(0)},"middle.evidence":{rest:formation(1)},"close.answer":{rest:formation(2)}},
 looks:[{id:"bench",name:"Bench",ground:"#edf0e9",ink:"#203330",faint:"#52635e",accent:"#835226",surface:{color:"#e7e3cf",roughness:.8,glows:false},lights:{ambient:1.6,key:3,fill:1,rim:1},floor:"none",shadows:false}],
 faces:story.chapters.flatMap(c=>Array.from({length:6},(_,i)=>({id:`${c.id}-${i}`,beat:c.beats[0].id,piece:i,draw(ctx:CanvasRenderingContext2D,w:number,h:number){ctx.fillStyle="#e7e3cf";ctx.fillRect(0,0,w,h);ctx.fillStyle="#1c302b";ctx.textAlign="center";ctx.textBaseline="middle";ctx.scale(1,5);ctx.font=`bold ${w*.14}px monospace`;ctx.fillText(c.id==="middle"?d.labels[i]:kind==="samples"?`MOSSLINK ${i+1}`:`${kind==="fixture"?"FIXTURE":"TERMINAL"} ${i+1}`,w/2,h/10);}}))),
 Piece:{fixture:Fixture,samples:Samples,terminal:Terminal}[kind],copy:{railLabel:"Sketch stages",lookLabel:"Appearance"}};
}
const bundles = {fixture:bundleFor("fixture"),samples:bundleFor("samples"),terminal:bundleFor("terminal")};
function Sketch({kind}: {kind: Kind}) {
 const d=definitions[kind], b=bundles[kind];
 return <main><nav className="concept-nav" aria-label="Concepts"><Link href="/">All concepts</Link><span>{d.name} · concept sketch</span><a href="#close">Ending ↓</a></nav><Story bundle={b}>
 {b.story.chapters.map((c,i)=><Chapter id={c.id} key={c.id}><Beat story={b.story} id={c.beats[0].id} fallback={i===1 ? <figure><img src={`/assets/${d.image}`} width="720" height="620" alt="Supplied explanatory drawing; not actual wiring, firmware or measured evidence."/><figcaption>Teaching illustration, not original device evidence.</figcaption></figure>:undefined}>
 <Kicker number={c.number}>{c.name}</Kicker><Title as={i===0?"h1":"h2"} id={`${c.id}-title`}>{i===0?"Ada Mensah":i===1?d.middle:d.close}</Title>
 {i===0&&<p className="concept-question">{d.question}</p>}
 <Body>{i===0?"Firmware for physical devices. On Mosslink, I wrote the firmware, scheduled power states and built the bring-up fixture.":i===1?d.body:d.end}</Body>
 <Note>{kind==="samples"?"Six explanatory board models. Generic geometry; no original PCB layout shown.":"Explanatory fixture geometry. No actual fixture construction, circuit detail, timing or current values shown."}</Note>
 {i===0&&<p><a href="#middle">See the evidence ↓</a> · <a href="mailto:ada@example.com">Email Ada</a></p>}
 {i===2&&<p><a href="mailto:ada@example.com">ada@example.com</a> · <Link href="/">Compare concepts</Link></p>}
 </Beat></Chapter>)}
 </Story></main>;
}
export function FixtureSketch(){return <Sketch kind="fixture"/>;}
export function SamplesSketch(){return <Sketch kind="samples"/>;}
export function TerminalSketch(){return <Sketch kind="terminal"/>;}
