"use client";
import Link from "next/link";
import { Story } from "@/components/story/story";
import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import type { StoryBundle, PieceProps, FaceDef } from "@/components/story/types";
import { blankFormation, type Formation, type Pose } from "@/lib/story/formation";
import type { StoryDef } from "@/lib/story/story";
import type { Look } from "@/lib/story/looks";

type Kind = "fixture" | "dial" | "rack";
const look: Look = { id:"bench", name:"Bench", ground:"#101c24", ink:"#f1eee3", faint:"#a6b7bc", accent:"#e6af63", surface:{color:"#31545b",roughness:0.75,glows:false}, lights:{ambient:2,key:3,fill:1,rim:1.5},floor:"none",shadows:false };
const data = {
 fixture:{label:"01 · Bring-up fixture",question:"What connects a firmware decision to a physical observation?",chapters:["Setup","Observe","Record"],titles:["Ada Mensah. Firmware meets the bench.","Six tested. Forty assembled.","Make the observation part of the decision."],bodies:["For Mosslink, I wrote the firmware, scheduled power states and built the bring-up fixture. Bring-up checks a new board’s basic operation.","Six of forty engineering samples were tested on the bench. The six probe assemblies separate into a count of the tested units; this is a visual tally, not a model of the actual fixture.","A firmware decision needs a physical observation. An estimate and an observed run support different claims."],notes:["A teaching fixture assembles from six probe units. Geometry is explanatory; actual fixture details are unavailable.","Each assembly represents one bench-tested sample here. No customer deployment or field pilot occurred.","The same probes reconnect as a fixture. Contact Ada about embedded firmware roles." ]},
 dial:{label:"02 · Power-state dial",question:"What can a power-state plan tell us—and what needs a bench observation?",chapters:["States","Transitions","Evidence"],titles:["Ada Mensah. Scheduling power states.","Sleep → Measure → Transmit.","A projection and a run answer different questions."],bodies:["I wrote Mosslink’s firmware and scheduled its power states. This mechanical teaching dial makes a state table tangible.","Three pairs of sectors show the supplied teaching sequence in order. Equal sectors are layout choices: they do not represent durations, current or recovered firmware.","Two years is a projection from bench current readings and an assumed reporting cycle. The longest observed run was 72 hours; it does not establish two-year field endurance."],notes:["Six solid sectors form a teaching dial. This is an explanatory invention, not hardware built for Mosslink.","The rotor opens into three separated state pairs. No cause, fix or resolution is asserted for the radio-awake note.","The dial closes around the distinction between planning and observation. No field endurance or weather testing supports a two-year claim."]},
 rack:{label:"03 · Engineering-sample rack",question:"How much does a bench result let us claim?",chapters:["Population","Coverage","Limits"],titles:["Ada Mensah. Know what was tested.","6 / 40 engineering samples.","Say what the evidence supports."],bodies:["Forty Mosslink engineering samples were assembled. I wrote the firmware, scheduled power states and built the bring-up fixture.","Six samples were bench tested. Six amber sockets out of forty show that coverage. None went to customers; this was not a field pilot or a product launch.","One preliminary emissions check passed. Full qualification is unfinished. The two-year battery figure is a projection; the longest run was 72 hours."],notes:["Eight solid carrier rails hold five sockets each: forty total. This rack is a visual explanation, not an actual supplied project artifact.","The rails separate so every socket can be counted. Amber means bench tested; dark means outside that confirmed set, not failed.","The rails return to one sample rack. Evidence has a scope; the ending keeps that scope visible."]}
};
function Fixture({material,look}:PieceProps){return <group>
 <mesh castShadow><boxGeometry args={[.95,.55,.33]}/><meshStandardMaterial color={look.surface.color} roughness={.7} metalness={.25}/></mesh>
 <mesh position={[0,.37,0]}><cylinderGeometry args={[.09,.14,.6,20]}/><meshStandardMaterial color="#d0ad68" metalness={.7} roughness={.28}/></mesh>
 <mesh position={[0,.72,0]}><sphereGeometry args={[.095,16,12]}/><meshStandardMaterial color="#efe2bb" metalness={.7} roughness={.3}/></mesh>
 <mesh position={[.32,0,.19]} material={material}><circleGeometry args={[.12,24]}/></mesh>
 <mesh position={[-.32,-.37,0]}><cylinderGeometry args={[.035,.035,.3,12]}/><meshStandardMaterial color="#e3b76d"/></mesh>
 </group>}
function Dial({material,look}:PieceProps){return <group>
 <mesh rotation={[-Math.PI/2,0,0]}><cylinderGeometry args={[1,1,.3,40,1,false,.04,Math.PI/3-.08]}/><meshStandardMaterial color={look.surface.color} metalness={.3} roughness={.65}/></mesh>
 <mesh position={[.46,.76,.17]} material={material}><circleGeometry args={[.15,24]}/></mesh>
 <mesh position={[.32,.56,.20]}><sphereGeometry args={[.045,16,12]}/><meshStandardMaterial color="#e6af63" metalness={.7} roughness={.3}/></mesh>
 </group>}
function Rack({index,material,look}:PieceProps){return <group>
 <mesh><boxGeometry args={[3.6,.48,.4]}/><meshStandardMaterial color={look.surface.color} metalness={.3} roughness={.65}/></mesh>
 {Array.from({length:5},(_,j)=><group key={j} position={[(j-2)*.65,0,.22]}><mesh><torusGeometry args={[.18,.055,12,24]}/><meshStandardMaterial color="#9aadb0" metalness={.65} roughness={.3}/></mesh><mesh position={[0,0,.01]}><circleGeometry args={[.16,24]}/><meshStandardMaterial color={index*5+j<6?"#e6af63":"#12252b"}/></mesh></group>)}
 <mesh position={[1.66,0,.23]} material={material}><planeGeometry args={[.13,.2]}/></mesh>
 </group>}
const shapes={fixture:Fixture,dial:Dial,rack:Rack};
function createBundle(kind:Kind):StoryBundle{
 const count=kind==="rack"?8:6;
 const story:StoryDef={pieces:count,chapters:data[kind].chapters.map((name,i)=>({id:["setup","middle","close"][i],number:i+1,name,role:i===0?"opening":i===2?"close":"how",beats:[{id:["setup.start","middle.show","close.end"][i],height:i===0?1.25:1.4}]}))};
 function form(stage:number):Formation{
 const poses:Pose[]=Array.from({length:count},(_,i)=>{
 if(kind==="rack")return{position:[stage===1?(i%2===0?-.35:.35):0,(i-3.5)*(stage===1?.72:.52),stage===1?(i%2)*.25:0],rotation:[0,stage===1?(i%2===0?-.14:.14):0,0],size:[1,1]};
 if(kind==="dial")return{position:stage===1?[(Math.floor(i/2)-1)*2.15,(i%2)*.12,0]:[0,0,0],rotation:[0,0,stage===1?-(i%2)*Math.PI/3+Math.PI/6:-i*Math.PI/3],size:[stage===1?.9:1.7,stage===1?.9:1.7]};
 return{position:stage===1?[(i%3-1)*1.65,(Math.floor(i/3)-.5)*1.85,0]:[(i%3-1)*1.02,(Math.floor(i/3)-.5)*.62,0],rotation:[stage===1?0:-.12,0,0],size:[1,1]};
 });
 return{...blankFormation(count),pieces:poses,turn:kind==="rack"?[-.22,-.22]:kind==="fixture"?[.15,-.3]:[.12,-.2],span:kind==="rack"?5:kind==="dial"&&stage===1?7:5.2,rise:kind==="rack"?7:4.3,near:5,anchor:[.53,.12],floor:-5};
 }
 const faces:FaceDef[]=story.chapters.flatMap(c=>c.beats.flatMap(b=>Array.from({length:count},(_,i)=>({id:`${b.id}-${i}`,beat:b.id,piece:i,draw(ctx:CanvasRenderingContext2D,w:number,h:number){ctx.fillStyle="#e6af63";ctx.fillRect(0,0,w,h);ctx.fillStyle="#101c24";ctx.font=`bold ${w*.46}px system-ui`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(kind==="dial"?["S","S","M","M","T","T"][i]:String(i+1),w/2,h/2);}}))));
 return{story,formations:{"setup.start":{rest:form(0)},"middle.show":{rest:form(1)},"close.end":{rest:form(2)}},faces,looks:[look],copy:{railLabel:"Sketch chapters",lookLabel:"Appearance"},Piece:shapes[kind]};
}
const bundles={fixture:createBundle("fixture"),dial:createBundle("dial"),rack:createBundle("rack")};
export function Concept({kind}:{kind:Kind}){const d=data[kind];const bundle=bundles[kind];return <main className="concept">
 <nav className="concept-nav" aria-label="Concepts"><Link href="/">Compare concepts</Link><Link href="/sketch/fixture">Fixture</Link><Link href="/sketch/dial">Dial</Link><Link href="/sketch/rack">Rack</Link></nav>
 <Story bundle={bundle}>{bundle.story.chapters.map((chapter,i)=><Chapter key={chapter.id} id={chapter.id}><Beat story={bundle.story} id={chapter.beats[0].id} fallback={<p>Explanatory 3D: {d.notes[i]}</p>}><Kicker number={i+1}>{d.label} / {chapter.name}</Kicker><Title id={`${chapter.id}-title`} as={i===0?"h1":"h2"}>{d.titles[i]}</Title><Body>{d.bodies[i]}</Body><Note>{d.notes[i]}</Note>{i===0&&<><p className="concept-question">{d.question}</p><p className="concept-links"><a href="mailto:ada@example.com">Email Ada</a><a href="#middle">See the evidence ↓</a></p></>}{i===2&&<p className="concept-links"><a href="mailto:ada@example.com">ada@example.com</a><Link href="/">Compare concepts</Link></p>}</Beat></Chapter>)}</Story>
 </main>}
export function FixtureSketch(){return <Concept kind="fixture"/>}
export function DialSketch(){return <Concept kind="dial"/>}
export function RackSketch(){return <Concept kind="rack"/>}
