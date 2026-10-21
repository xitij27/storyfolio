"use client";
import Link from "next/link";
import { Story } from "@/components/story/story";
import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import type { PieceProps, StoryBundle } from "@/components/story/types";
import type { StoryDef } from "@/lib/story/story";
import { blankFormation, type Formation, type Pose } from "@/lib/story/formation";
import { measure } from "@/lib/story/layouts";
import { looks } from "@/content/looks";

type Kind = "fixture" | "sensor" | "loom";
const words = {
 fixture: ["Firmware", "States", "Command", "Fixture", "Observe", "Estimate", "Run"],
 sensor: ["Firmware", "Sleep", "Measure", "Transmit", "Observe", "Estimate", "Run"],
 loom: ["Command", "States", "Fixture", "Observe", "Problem", "Estimate", "Run"],
};
const descriptions = {
 fixture: {
  name: "The bring-up fixture", question: "How does a firmware decision become something you can check?",
  chapters: ["Prepare", "Observe", "Record"],
  titles: ["Ada Mensah. Code meets the bench.", "A signal can expose a problem.", "An observation gives a claim its limits."],
  bodies: ["For embedded firmware roles. On Mosslink, I wrote the firmware, scheduled power states and built the bring-up fixture. My lesson: a firmware decision needs a physical observation.", "A current trace showed the radio staying awake after a failed transmission. No cause, fix or later resolution is confirmed. The fixture separates command, access and observation; it does not stand in for a measured trace.", "Two years is a battery projection from bench current readings and an assumed reporting cycle. The longest run was 72 hours. No field endurance or weather testing supports a two-year claim."],
  notes: ["Seven solid fixture segments assemble into a generic bench fixture. Explanatory geometry, not a reconstruction of my wiring or hardware.", "The same fixture segments open into command, fixture and observation groups. This is an explanation of the work, not a recorded test sequence.", "The Estimate and Run segments separate, then return to the fixture: different evidence supports different claims."],
 },
 sensor: {
  name: "The power-state assembly", question: "What can a power-state plan tell you—and what needs an observation?",
  chapters: ["State", "Observation", "Evidence"],
  titles: ["Ada Mensah. Firmware for a physical device.", "Planning a state is not observing it.", "Keep the projection beside the run."],
  bodies: ["For embedded firmware roles. I wrote Mosslink’s firmware and scheduled its power states. My colleague designed the PCB and analogue front end. The assembly makes that division visible.", "Sleep, Measure, Transmit is a teaching sequence, with no claimed durations or current values. A current trace showed the radio awake after a failed transmission; no cause or resolution is confirmed.", "The battery projection is two years, based on bench current readings and an assumed reporting cycle. The longest run was 72 hours. These support different claims; full qualification remains unfinished."],
  notes: ["Seven solid modules form a generic sensor assembly. This is explanatory geometry, not the actual PCB, enclosure or circuit.", "Modules separate into a teaching loop and an observation branch. Their positions do not depict recovered firmware or timing.", "Estimate and Run remain distinct when the sensor assembly comes back together."],
 },
 loom: {
  name: "The observation loom", question: "What does a physical observation add to a firmware decision?",
  chapters: ["Command", "Observation", "Interpretation"],
  titles: ["Ada Mensah. Follow code toward the bench.", "The observation leaves a question open.", "Describe only what the evidence supports."],
  bodies: ["For embedded firmware roles. My working documents are a state table, a timing diagram and a current trace. I wrote Mosslink’s firmware and built its bring-up fixture.", "After a failed transmission, a current trace showed the radio staying awake. No cause, fix, timing or later resolution is confirmed. This sequence is conceptual: there is no trace available to publish.", "Forty engineering samples were assembled; six were tested on the bench. None went to customers. A two-year battery projection and a 72-hour longest run are different kinds of evidence."],
  notes: ["Seven probe connectors form an explanatory measurement loom, derived from fixture access and bench observation. Not actual cabling or wiring.", "Connectors open into ordered command, observation and question positions. Spacing is not elapsed time, and no waveform is drawn.", "The loom rejoins while Estimate and Run retain separate labels: connecting evidence does not erase its limits."],
 },
};
function Fixture({material,look,index}: PieceProps) {
 return <group>
  <mesh position={[0,-.26,0]} castShadow receiveShadow><boxGeometry args={[.98,.32,1.2]}/><meshStandardMaterial color={look.surface.color} roughness={.5} metalness={.5}/></mesh>
  {[-.35,.35].map(x=><group key={x}><mesh position={[x,.18,-.3]} castShadow><cylinderGeometry args={[.065,.065,.65,12]}/><meshStandardMaterial color="#9aa9ae" metalness={.85} roughness={.3}/></mesh><mesh position={[x,.58,-.3]}><cylinderGeometry args={[.025,.055,.18,12]}/><meshStandardMaterial color={look.accent} metalness={.65} roughness={.3}/></mesh></group>)}
  <mesh position={[0,.12,.25]} castShadow><boxGeometry args={[.65,.4,.3]}/><meshStandardMaterial color={look.accent} metalness={.35} roughness={.45}/></mesh>
  <mesh position={[0,-.26,.61]} material={material}><planeGeometry args={[.83,.25]}/></mesh>
  <mesh position={[0,.36,.25]}><sphereGeometry args={[.05,12,8]}/><meshStandardMaterial color={index<5?look.ink:look.accent}/></mesh>
 </group>;
}
function Sensor({material,look,index}: PieceProps) {
 return <group>
  <mesh castShadow receiveShadow><boxGeometry args={[.98,.92,.7]}/><meshStandardMaterial color={look.surface.color} roughness={.75}/></mesh>
  <mesh position={[0,0,.365]} material={material}><planeGeometry args={[.8,.6]}/></mesh>
  {[-.28,0,.28].map(x=><mesh key={x} position={[x,-.5,0]}><boxGeometry args={[.065,.12,.18]}/><meshStandardMaterial color={look.accent} metalness={.7} roughness={.3}/></mesh>)}
  <mesh position={[.35,.35,.39]}><sphereGeometry args={[.045,12,8]}/><meshStandardMaterial color={index===1?look.faint:look.accent}/></mesh>
 </group>;
}
function Connector({material,look}: PieceProps) {
 return <group>
  <mesh rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[.44,.44,.7,24]}/><meshStandardMaterial color={look.surface.color} metalness={.5} roughness={.5}/></mesh>
  <mesh position={[0,0,.39]} ><torusGeometry args={[.35,.045,8,24]}/><meshStandardMaterial color={look.accent} metalness={.7} roughness={.3}/></mesh>
  <mesh position={[0,-.23,.36]} material={material}><planeGeometry args={[.52,.16]}/></mesh>
  {[-.15,0,.15].map(x=><mesh key={x} position={[x,.09,.46]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.035,.035,.22,8]}/><meshStandardMaterial color={look.accent} metalness={.8} roughness={.3}/></mesh>)}
  <mesh position={[0,-.57,-.1]}><cylinderGeometry args={[.12,.1,.65,12]}/><meshStandardMaterial color={look.ink} roughness={.8}/></mesh>
  <mesh position={[.24,-.89,-.1]} rotation={[0,0,Math.PI]}><torusGeometry args={[.24,.065,8,20,Math.PI]}/><meshStandardMaterial color={look.ink} roughness={.8}/></mesh>
 </group>;
}
function pose(x:number,y:number,z=0,size: [number,number]=[1,1]): Pose {return {position:[x,y,z],rotation:[0,0,0],size};}
function form(pieces:Pose[],turn: [number,number]=[.4,-.45]): Formation {
 const bounds=measure(pieces);
 return {...blankFormation(7),pieces,span:Math.max(bounds.span*1.3,4.8),rise:Math.max(bounds.rise*1.4,3.8),near:7,anchor:[.52,.12],turn,floor:-3.3};
}
function build(kind:Kind): StoryBundle {
 const d=descriptions[kind];
 const story: StoryDef={pieces:7,chapters:d.chapters.map((name,i)=>({id:["opening","middle","close"][i],number:i+1,name,role:i===0?"opening":i===1?"how":"close",beats:[{id:["opening.object","middle.observe","close.evidence"][i],height:i===0?1.35:1.25}]}))};
 const whole = kind==="fixture"?Array.from({length:7},(_,i)=>pose((i-3)*.83,0,(i%2)*.06,[.83,1])):
  kind==="sensor"?Array.from({length:7},(_,i)=>i<6?pose((i%3-1)*1.04,(Math.floor(i/3)-.5)*1.02):pose(0,0,-1.05,[2.9,1.9])):
  Array.from({length:7},(_,i)=>pose((i%4-1.5)*.98,(Math.floor(i/4)-.5)*1.25));
 const open = kind==="fixture"?Array.from({length:7},(_,i)=>pose((i-3)*.9,0,Math.abs(i-3)*.3,[.83,1])):
  kind==="sensor"?Array.from({length:7},(_,i)=>pose((i%3-1)*1.22,(Math.floor(i/3)-1)*1.12, i*.16)):
  Array.from({length:7},(_,i)=>pose((i%4-1.5)*1.2,(Math.floor(i/4)-.5)*1.5,(i%2)*.3));
 const middle=kind==="sensor"? [pose(-1.5,1),pose(0,1.3),pose(1.4,.4),pose(.3,-.8),pose(-1.6,-.5),pose(-1.4,-2),pose(1.3,-2)]:
  kind==="loom"?Array.from({length:7},(_,i)=>pose((i%3-1)*1.65,1.4-Math.floor(i/3)*1.7)):
  [pose(-1.8,1),pose(-1.8,-.25),pose(-1.8,-1.5),pose(0,0,0,[1.2,1.3]),pose(1.8,1),pose(1.8,-.3),pose(1.8,-1.6)];
 const closing=whole.map((p,i)=>i>=5?pose(i===5?-1.8:1.8,-2.2,.6):p);
 const beats=story.chapters.flatMap(c=>c.beats);
 return {story,looks:[looks[0]],copy:{railLabel:"Sketch chapters",lookLabel:"Appearance"},Piece:kind==="fixture"?Fixture:kind==="sensor"?Sensor:Connector,
 formations:{"opening.object":{rest:form(open),within:form(whole)},"middle.observe":{rest:form(middle,[.2,-.3])},"close.evidence":{rest:form(closing),within:form(whole)}},
 faces:beats.flatMap(b=>words[kind].map((label,piece)=>({id:`${b.id}-${piece}`,beat:b.id,piece,draw(ctx,w,h,look){ctx.fillStyle=look.surface.color;ctx.fillRect(0,0,w,h);ctx.fillStyle=look.ink;ctx.font=`600 ${w*.12}px system-ui`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(label,w/2,h/2,w*.9);}})))};
}
const bundles={fixture:build("fixture"),sensor:build("sensor"),loom:build("loom")};
function Concept({kind}:{kind:Kind}) {
 const d=descriptions[kind], bundle=bundles[kind];
 return <main className="concept-sketch"><nav className="local-nav" aria-label="Local sketch navigation"><Link href="/concepts">All concepts</Link><span>{d.name} · concept sketch</span><a href="mailto:ada@example.com">Email</a></nav><Story bundle={bundle}>
 {bundle.story.chapters.map((chapter,i)=><Chapter key={chapter.id} id={chapter.id}><Beat story={bundle.story} id={chapter.beats[0].id} fallback={
 // eslint-disable-next-line @next/next/no-img-element
 <img src={kind==="sensor"?"/assets/power-states.svg":"/assets/bring-up-fixture.svg"} width="900" height="500" alt="Supplied teaching schematic; explanatory only, not original hardware, firmware or measured results."/>
 }><Kicker number={chapter.number}>{chapter.name}</Kicker><Title as={i===0?"h1":"h2"} id={`${chapter.id}-title`}>{d.titles[i]}</Title><Body>{d.bodies[i]}</Body>{i===0&&<p className="concept-question">{d.question}</p>}<Note>{d.notes[i]}</Note>{i===0&&<p className="sketch-shortcuts"><a href="#middle">See the middle</a> · <a href="#close">Evidence & contact</a></p>}{i===2&&<p><a href="mailto:ada@example.com">ada@example.com</a> · <a href="/cv.html" download="Ada-Mensah-CV.html">Download HTML CV</a> · <Link href="/concepts">Compare concepts</Link></p>}</Beat></Chapter>)}
 </Story></main>;
}
export function FixtureSketch(){return <Concept kind="fixture"/>;}
export function SensorSketch(){return <Concept kind="sensor"/>;}
export function LoomSketch(){return <Concept kind="loom"/>;}
