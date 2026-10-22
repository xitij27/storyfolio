"use client";
import Link from "next/link";
import { Story } from '@/components/story/story';
import { Chapter, Beat, Kicker, Title, Body, Note } from '@/components/story/chapter';
import type { StoryBundle, PieceProps, FaceDef } from '@/components/story/types';
import { blankFormation, type Pose, type Formation } from '@/lib/story/formation';
import type { StoryDef } from '@/lib/story/story';
import { looks } from '../looks';

type Kind = 'fixture' | 'sensor' | 'harness';
const names = {fixture:'01 / The bring-up fixture',sensor:'02 / The sensor, opened',harness:'03 / The observation path'};
const questions = {fixture:'What does the bench let me claim?',sensor:'What does a battery-life estimate actually tell us?',harness:'How does a firmware decision meet a physical observation?'};
const mids = {fixture:'Six tested. Forty assembled.',sensor:'Six samples on the bench.',harness:'Sleep. Measure. Transmit.'};
const bodies = {
 fixture:['I’m Ada Mensah. I wrote Mosslink’s firmware, scheduled its power states and built its bring-up fixture.','Forty engineering samples were assembled. Six were tested on the bench. The six bright sockets count that subset; this is an explanatory layout, not the actual fixture.','A firmware decision needs a physical observation. A projection and an observed run support different claims.'],
 sensor:['I’m Ada Mensah. My work on Mosslink was firmware, power-state scheduling and a bring-up fixture. The PCB and analogue front end were designed by my colleague.','These six simplified bodies count the six engineering samples tested on the bench. Forty were assembled; none went to customers.','Two years is a projection from bench currents and an assumed reporting cycle. The longest run was 72 hours. There is no two-year field endurance evidence.'],
 harness:['I’m Ada Mensah. State tables, timing diagrams and current traces are my working documents. I wrote the firmware and built the bring-up fixture for Mosslink.','Three ordered pairs show a teaching sequence only. They do not show recovered firmware, wiring, durations or current values.','A current trace showed the radio awake after a failed transmission. The cause and later resolution are unconfirmed. An observation is where the next question begins.']
};
function Fixture({material}:PieceProps){return <group><mesh><boxGeometry args={[1,.92,.23]}/><meshStandardMaterial color="#334940" roughness={.65}/></mesh><mesh position={[0,0,.122]} material={material}><planeGeometry args={[1,.92]}/></mesh>{[-.43,.43].map(x=><mesh key={x} position={[x,0,.18]}><boxGeometry args={[.025,.8,.09]}/><meshStandardMaterial color="#b1bbb4" metalness={.6} roughness={.4}/></mesh>)}</group>}
function Sensor({material}:PieceProps){return <group><mesh><boxGeometry args={[.93,.94,.3]}/><meshStandardMaterial color="#334940" roughness={.65}/></mesh><mesh position={[0,0,.155]} material={material}><planeGeometry args={[.89,.89]}/></mesh>{[-.31,.31].map(x=><mesh key={x} position={[x,-.48,0]}><cylinderGeometry args={[.04,.04,.15,12]}/><meshStandardMaterial color="#b2a077" metalness={.7} roughness={.4}/></mesh>)}</group>}
function Harness({material}:PieceProps){return <group><mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.43,.43,.32,32]}/><meshStandardMaterial color="#334940" roughness={.65}/></mesh><mesh position={[0,0,.17]} material={material}><circleGeometry args={[.4,32]}/></mesh><mesh position={[0,-.43,-.02]}><boxGeometry args={[.22,.35,.2]}/><meshStandardMaterial color="#a19374" metalness={.65} roughness={.4}/></mesh></group>}
const pose=(x:number,y:number,z=0,w=1,h=1,rz=0):Pose=>({position:[x,y,z],rotation:[0,0,rz],size:[w,h]});
function form(pieces:Pose[], kind:Kind):Formation{return {...blankFormation(pieces.length),pieces,span:kind==='fixture'?5.3:4.6,rise:kind==='fixture'?5:4.4,anchor:[.48,.18],turn:[-.18,-.22],near:5,floor:-3.4};}
function make(kind:Kind):StoryBundle {
 const count=kind==='fixture'?8:6;
 const story:StoryDef={pieces:count,chapters:['opening','middle','close'].map((id,i)=>({id,number:i+1,name:['Set up','Observe','Conclude'][i],role:i===0?'opening':i===1?'what':'close',beats:[{id:id+'.pose',height:i===0?1.3:1.25}]}))};
 let opening:Pose[],middle:Pose[],close:Pose[];
 if(kind==='fixture'){
  opening=[pose(0,1.65,0,3.65,.4),pose(0,-1.65,0,3.65,.4),pose(-1.65,0,.03,3.65,.4,Math.PI/2),pose(1.65,0,.03,3.65,.4,Math.PI/2),pose(0,.92,.06,2.2,.34),pose(0,-.92,.06,2.2,.34),pose(-.92,0,.09,2.2,.34,Math.PI/2),pose(.92,0,.09,2.2,.34,Math.PI/2)];
  middle=Array.from({length:8},(_,i)=>pose(0,(i-3.5)*.57,0,3.5,.48));
  close=opening;
 } else if(kind==='sensor'){
  opening=Array.from({length:6},(_,i)=>pose(0,(i-2.5)*.46,0,2,.48));
  middle=Array.from({length:6},(_,i)=>pose((i%2-.5)*1.75,(1-Math.floor(i/2))*1.4,0,1.2,1.1));
  close=Array.from({length:6},(_,i)=>pose((i<3?-1:1)*1.15,(1-i%3)*.65,0,1.55,.55));
 }else{
  opening=Array.from({length:6},(_,i)=>pose(Math.sin(i*.8)*.7,(i-2.5)*.6,i*.04,.8,.8,(i-2.5)*.12));
  middle=Array.from({length:6},(_,i)=>pose((i%2-.5)*1.1,(1-Math.floor(i/2))*1.35,0,.9,.9));
  close=Array.from({length:6},(_,i)=>pose((i<3?-1:1)*1.2,(1-i%3)*.9,0,.85,.85));
 }
 const faces:FaceDef[]=story.chapters.flatMap((ch,beat)=>Array.from({length:count},(_,i)=>({id:ch.id+'-'+i,beat:ch.beats[0].id,piece:i,draw(ctx,w,h){
  ctx.fillStyle='#334940';ctx.fillRect(0,0,w,h);
  if(kind==='fixture')for(let j=0;j<5;j++){const on=beat===1&&i*5+j<6;ctx.beginPath();ctx.ellipse(w*(.15+j*.175),h*.5,w*.04,h*.29,0,0,Math.PI*2);ctx.fillStyle=on?'#e7b96a':'#122b24';ctx.fill();ctx.strokeStyle='#b7c6b8';ctx.lineWidth=h*.025;ctx.stroke();}
  else{ctx.strokeStyle='#9fae9c';ctx.lineWidth=w*.025;ctx.strokeRect(w*.17,h*.17,w*.66,h*.66);ctx.fillStyle='#e7b96a';ctx.beginPath();ctx.arc(w*.5,h*.5,w*.1,0,Math.PI*2);ctx.fill();if(kind==='harness'&&beat===1){ctx.fillStyle='#f8edd5';ctx.font=`bold ${w*.13}px system-ui`;ctx.textAlign='center';ctx.fillText(['SLEEP','MEASURE','TRANSMIT'][Math.floor(i/2)],w*.5,h*.78);}}
 }})));
 return {story,formations:{'opening.pose':{rest:form(opening,kind)},'middle.pose':{rest:form(middle,kind)},'close.pose':{rest:form(close,kind)}},faces,looks:[looks[0]],copy:{railLabel:'Sketch chapters',lookLabel:'Appearance'},Piece:kind==='fixture'?Fixture:kind==='sensor'?Sensor:Harness};
}
const bundles={fixture:make('fixture'),sensor:make('sensor'),harness:make('harness')};
function Concept({kind}:{kind:Kind}){const bundle=bundles[kind];return <main className="concept"><nav className="concept-nav" aria-label="Concepts"><Link prefetch={false} href="/concepts">Concepts</Link><Link prefetch={false} href="/sketch/fixture">Fixture</Link><Link prefetch={false} href="/sketch/sensor">Sensor</Link><Link prefetch={false} href="/sketch/harness">Harness</Link></nav><Story bundle={bundle}>{bundle.story.chapters.map((ch,i)=><Chapter key={ch.id} id={ch.id}><Beat story={bundle.story} id={ch.beats[0].id} fallback={<p>{kind==='fixture'?'● ● ● ● ● / ● ○ ○ ○ ○ / 30 further unlit sockets':kind==='sensor'?'● ● / ● ● / ● ●':'Sleep → Measure → Transmit (teaching sequence)'}</p>}><Kicker number={i+1}>{names[kind]} · {ch.name}</Kicker><Title as={i===0?'h1':'h2'} id={ch.id+'-title'}>{i===0?questions[kind]:i===1?mids[kind]:kind==='sensor'?'Projection ≠ observed run.':'Observe before claiming.'}</Title><Body>{bodies[kind][i]}</Body><Note>Concept sketch · Explanatory geometry; not actual hardware, wiring or measured data.</Note>{i===0&&<p className="sketch-links"><a href="#middle">See the evidence</a> · <a href="mailto:ada@example.com">Email Ada</a></p>}{i===2&&<p><a href="mailto:ada@example.com">ada@example.com</a> · <Link prefetch={false} href="/concepts">Compare concepts</Link></p>}</Beat></Chapter>)}</Story></main>}
export const FixtureSketch=()=> <Concept kind="fixture"/>;
export const SensorSketch=()=> <Concept kind="sensor"/>;
export const HarnessSketch=()=> <Concept kind="harness"/>;
