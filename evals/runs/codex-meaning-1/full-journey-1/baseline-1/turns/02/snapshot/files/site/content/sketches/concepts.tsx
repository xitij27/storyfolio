"use client";
/* eslint-disable @next/next/no-img-element -- Supplied local explanatory SVG fallback. */
import Link from "next/link";
import { Story } from "@/components/story/story";
import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { blankFormation, type Formation, type Pose } from "@/lib/story/formation";
import type { StoryBundle, PieceProps } from "@/components/story/types";
import { looks } from "../looks";

type Kind = "fixture" | "harness" | "enclosure";
const concepts = {
 fixture: {name:"The bring-up fixture",question:"How do you know what your firmware is doing?",form:["Check the setup","Observe the board","Record the limits"],middle:"Make the observation accessible.",body:"I wrote the Mosslink firmware, scheduled its power states and built the bring-up fixture. A current trace showed the radio staying awake after a failed transmission. The cause and resolution are not confirmed here.",close:"A firmware decision needs a physical observation.",end:"My work connects code to a signal on the bench. A projection, a bench observation and a completed qualification support different claims.",note:"Six generic fixture modules open into two aligned rows: command and observation. They are illustrative parts, not the six tested samples."},
 harness: {name:"Follow the connection",question:"What connects a firmware decision to a physical signal?",form:["Name the states","Follow the transition","Return to observation"],middle:"A transition has a physical consequence.",body:"Sleep, Measure and Transmit form an illustrative teaching sequence. On Mosslink, a current trace showed the radio remaining awake after a failed transmission. No trace, cause or fix is available to publish.",close:"Follow the code. Check the signal.",end:"I use state tables, timing diagrams and current traces. I wrote the Mosslink firmware and built its bring-up fixture; the PCB and analogue front end were designed by a colleague.",note:"Six generic probe leads unfold into a teaching loop. This is explanatory geometry, not actual wiring, firmware states or a measured waveform."},
 enclosure: {name:"Inside the estimate",question:"What does a battery-life estimate actually establish?",form:["Define the cycle","Separate the evidence","State the claim"],middle:"Two years projected. 72 hours observed.",body:"The battery-life projection uses bench current readings and an assumed reporting cycle. The longest continuous run was 72 hours. No field endurance or weather testing supports a two-year claim.",close:"An estimate and a run answer different questions.",end:"Mosslink had forty engineering samples assembled and six bench-tested by the team. None went to customers. One preliminary emissions check passed; the full qualification programme is unfinished.",note:"Six generic enclosure ribs separate into two equal groups for estimate and observation. Their size and number represent no duration, current or sample count."},
};
function Fixture({index,material}:PieceProps){return <group>
 <mesh castShadow receiveShadow><boxGeometry args={[.9,.65,.65]}/><meshStandardMaterial color="#204a46" roughness={.78}/></mesh>
 <mesh position={[0,.08,.331]} material={material}><planeGeometry args={[.76,.35]}/></mesh>
 <mesh position={[0,.67,0]} castShadow><cylinderGeometry args={[.075,.1,.7,16]}/><meshStandardMaterial color="#be985d" metalness={.75} roughness={.3}/></mesh>
 <mesh position={[0,1.06,0]}><sphereGeometry args={[.11,16,12]}/><meshStandardMaterial color={index%2?"#c48a49":"#cce6b0"} metalness={.5}/></mesh>
 <mesh position={[0,-.42,0]}><boxGeometry args={[.5,.2,.4]}/><meshStandardMaterial color="#89918a" metalness={.6}/></mesh>
 </group>}
function Harness({index,material}:PieceProps){return <group>
 <mesh castShadow rotation={[0,0,-Math.PI/2]}><torusGeometry args={[.53,.065,12,40,Math.PI*1.55]}/><meshStandardMaterial color={index%2?"#c58c4a":"#305f59"} roughness={.7}/></mesh>
 <mesh position={[0,-.54,0]} material={material}><boxGeometry args={[.32,.38,.26]}/></mesh>
 <mesh position={[0,-.82,0]}><cylinderGeometry args={[.035,.035,.25,12]}/><meshStandardMaterial color="#b3b6aa" metalness={.8} roughness={.25}/></mesh>
 </group>}
function Enclosure({material}:PieceProps){return <group>
 <mesh castShadow receiveShadow><boxGeometry args={[.36,1.55,.52]}/><meshStandardMaterial color="#315951" roughness={.68}/></mesh>
 <mesh position={[0,0,.27]} material={material}><boxGeometry args={[.29,.5,.04]}/></mesh>
 {[-.55,.55].map(y=><mesh key={y} position={[0,y,.28]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.065,.065,.035,16]}/><meshStandardMaterial color="#c4ad7e" metalness={.6}/></mesh>)}
 </group>}
const story={pieces:6,chapters:[{id:"opening",number:1,name:"Setup",role:"opening",beats:[{id:"opening.setup",height:1.3}]},{id:"middle",number:2,name:"Observation",role:"how",beats:[{id:"middle.observe",height:1.3}]},{id:"close",number:3,name:"Limits",role:"close",beats:[{id:"close.claim",height:1.1}]}]} as const;
function pose(x:number,y:number,z=0,rz=0):Pose{return {position:[x,y,z],rotation:[0,0,rz],size:[1,1]};}
function formation(pieces:Pose[],kind:Kind):Formation{return {...blankFormation(6),pieces,span:kind==="harness"?5.6:5.1,rise:4.2,anchor:[.53,.12],turn:[.2,-.38],near:6,floor:-3,sway:[0,0,0]};}
function makeBundle(kind:Kind):StoryBundle {
 const opening=Array.from({length:6},(_,i)=>kind==="fixture"?pose((i%3-1)*.95,Math.floor(i/3)*.7-.8,Math.floor(i/3)*-.6):kind==="harness"?pose((i%3-1)*.68,Math.floor(i/3)*.28-.2,i*.08):pose(Math.cos(i*Math.PI/3)*.85,0,Math.sin(i*Math.PI/3)*.85));
 const middle=Array.from({length:6},(_,i)=>kind==="fixture"?pose((i%3-1)*1.35,Math.floor(i/3)*2.1-1.5):kind==="harness"?pose(Math.cos(i*Math.PI/3)*1.65,Math.sin(i*Math.PI/3)*1.65,0,i*Math.PI/3):pose((i<3?-1.4:1.4)+(i%3-1)*.42,i<3?.3:-.3,0));
 const c=concepts[kind];
 const words=kind==="fixture"?["CODE","STATE","CYCLE","BENCH","SIGNAL","LIMIT"]:kind==="harness"?["SLEEP","MEASURE","TRANSMIT","CODE","BENCH","SIGNAL"]:["MODEL","MODEL","MODEL","RUN","RUN","RUN"];
 return {story,formations:{"opening.setup":{rest:formation(opening,kind)},"middle.observe":{rest:formation(middle,kind)},"close.claim":{rest:formation(opening,kind)}},faces:story.chapters.flatMap(ch=>words.map((word,piece)=>({id:`${ch.id}-${piece}`,beat:ch.beats[0].id,piece,draw:(ctx:CanvasRenderingContext2D,w:number,h:number)=>{ctx.fillStyle="#d6dfcc";ctx.fillRect(0,0,w,h);ctx.fillStyle="#173a35";ctx.font=`600 ${w*.13}px monospace`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(word,w/2,h/2,w*.9);}}))),looks:[looks[0]],copy:{railLabel:c.name,lookLabel:"Sketch appearance"},Piece:kind==="fixture"?Fixture:kind==="harness"?Harness:Enclosure};
}
const bundles={fixture:makeBundle("fixture"),harness:makeBundle("harness"),enclosure:makeBundle("enclosure")};
function Concept({kind}:{kind:Kind}){const c=concepts[kind];return <main className="concept"><a className="story-skip" href="#close">Skip to contact</a><nav className="concept-nav" aria-label="Concept sketches"><Link href="/">All concepts</Link><span>{c.name} · sketch</span></nav><Story bundle={bundles[kind]}>
 <Chapter id="opening"><Beat story={story} id="opening.setup"><Kicker number={1}>{c.form[0]}</Kicker><p className="ada-name">ADA MENSAH / EMBEDDED FIRMWARE</p><Title as="h1" id="opening-title">{c.question}</Title><Body>I wrote firmware, scheduled power states and built the bring-up fixture for Mosslink, an environmental sensor.</Body><Note>Concept sketch · generic explanatory geometry. Scroll to see the object change.</Note><p><a href="#middle">Explore the observation ↓</a> · <a href="mailto:ada@example.com">Email Ada</a></p></Beat></Chapter>
 <Chapter id="middle"><Beat story={story} id="middle.observe" fallback={<img src={kind==="enclosure"?"/assets/power-states.svg":"/assets/bring-up-fixture.svg"} width="640" height="360" alt="Supplied teaching diagram; explanatory only, not original wiring or a measured trace."/>}><Kicker number={2}>{c.form[1]}</Kicker><Title as="h2" id="middle-title">{c.middle}</Title><Body>{c.body}</Body><Note>{c.note}</Note></Beat></Chapter>
 <Chapter id="close"><Beat story={story} id="close.claim"><Kicker number={3}>{c.form[2]}</Kicker><Title as="h2" id="close-title">{c.close}</Title><Body>{c.end}</Body><p className="concept-contact"><a href="mailto:ada@example.com">ada@example.com ↗</a></p><Note>Looking for embedded firmware roles involving physical devices. Project page and printable HTML CV follow after concept and storyboard approval.</Note><p><Link href="/">Compare the three concepts</Link></p></Beat></Chapter>
 </Story></main>}
export function FixtureConcept(){return <Concept kind="fixture"/>}
export function HarnessConcept(){return <Concept kind="harness"/>}
export function EnclosureConcept(){return <Concept kind="enclosure"/>}
