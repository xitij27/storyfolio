"use client";
import { DoubleSide } from "three";
import { Block, Stroke, type V3 } from "./geometry";
export function Document({ position = [0,0,0], accent, checklist = false, rotation = [0,0,0] }: { position?: V3; accent: string; checklist?: boolean; rotation?: V3 }) {
  return <group position={position} rotation={rotation}><Block size={[1.15,.035,1.5]} color="#f7f0df" />
    <Block position={[-.17,.04,-.49]} size={[.62,.015,.04]} color={accent}/>
    {[-.18,.06,.3,.51].map(z=><group key={z}><Stroke from={[-.34,.035,z]} to={[.4,.035,z]} color="#78816d" radius={.007}/>{checklist&&<group position={[-.42,.04,z]}><Stroke from={[-.04,0,0]} to={[0,0,.035]} color={accent} radius={.01}/><Stroke from={[0,0,.035]} to={[.06,0,-.04]} color={accent} radius={.01}/></group>}</group>)}
  </group>;
}
export function Documents({accent}:{accent:string}) {return <group><Document position={[-1.25,.06,0]} accent={accent} rotation={[0,-.18,0]}/><Document position={[0,.1,-.28]} accent={accent} checklist/><Document position={[1.25,.06,.16]} accent={accent} rotation={[0,.18,0]}/><Stroke from={[.85,.13,.5]} to={[1.6,.13,.5]} color={accent}/><Stroke from={[.85,.13,.5]} to={[1.02,.13,.38]} color={accent}/></group>;}
export function ReadingStand({accent,degree=false}:{accent:string;degree?:boolean}) {return <group position={[0,.05,0]}>
  <Block position={[0,.2,0]} size={[2.7,.1,1.6]} color="#a9926e" rotation={[.25,0,0]}/>
  <Block position={[-1,.12,-.3]} size={[.1,.4,.6]} color="#a9926e"/><Block position={[1,.12,-.3]} size={[.1,.4,.6]} color="#a9926e"/>
  {degree?<group rotation={[.25,0,0]} position={[0,.31,0]}><Document accent={accent}/><mesh position={[.23,.055,.36]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.11,24]}/><meshStandardMaterial color={accent} roughness={.9}/></mesh></group>:<group position={[0,.31,0]} rotation={[.25,0,0]}><SmallBook position={[-.7,0,0]} accent={accent}/><SmallBook position={[.65,0,0]} accent="#526f62"/></group>}
</group>;}
export function SmallBook({accent,position=[0,0,0]}:{accent:string;position?:V3}) {return <group position={position}><Block size={[1.02,.12,1.42]} color={accent}/><Block position={[.015,.13,0]} size={[.94,.12,1.3]} color="#eee3c8"/><Block position={[0,.25,0]} size={[1.02,.04,1.42]} color={accent}/><Block position={[-.05,.28,-.25]} size={[.58,.015,.04]} color="#f7f0df"/></group>;}
function DatabaseBody({x,accent,cutaway=false}:{x:number;accent:string;cutaway?:boolean}) {return <group position={[x,.06,0]}>
  {[0,1,2].map(i=><group key={i} position={[0,.18+i*.4,0]}><mesh castShadow receiveShadow rotation={[0,cutaway?-.6:0,0]}><cylinderGeometry args={[.62,.62,.32,40,1,false,0,cutaway?Math.PI*1.55:Math.PI*2]}/><meshStandardMaterial color={i===2?accent:"#b6c1ab"} side={DoubleSide} roughness={.9}/></mesh>{cutaway&&<Block position={[.1,0,.08]} size={[.65,.08,.65]} color="#eee3c8"/>}</group>)}
</group>;}
export function Database({accent}:{accent:string}) {return <group><DatabaseBody x={-.95} accent={accent} cutaway/><DatabaseBody x={.95} accent="#6c8375"/></group>;}
export function Terminal({accent}:{accent:string}) {return <group position={[0,.07,0]}>
  <group rotation={[-.18,0,0]}><Block position={[-.2,.75,-.15]} size={[2.15,1.45,.09]} color="#354d42"/><Block position={[-.2,.75,-.088]} size={[1.94,1.23,.022]} color="#21362c"/>
    <Stroke from={[-.86,1.03,-.065]} to={[-.66,.9,-.065]} color={accent} radius={.025}/><Stroke from={[-.66,.9,-.065]} to={[-.86,.77,-.065]} color={accent} radius={.025}/><Block position={[-.39,.79,-.06]} size={[.25,.04,.025]} color="#f7f0df"/>
  </group><Block position={[-.2,.03,.55]} size={[2.3,.07,1.05]} color="#d6cbae"/>
  <Block position={[1.45,.09,.2]} size={[.5,.08,.7]} color="#78816d"/><Stroke from={[1.45,.15,.2]} to={[1.45,.65,.2]} color={accent} radius={.04}/><Block position={[1.45,.68,.2]} size={[.28,.09,.15]} color={accent}/>
</group>;}
export function Lectern({accent}:{accent:string}) {return <group position={[0,.02,0]}>
  <Block position={[0,.05,.05]} size={[1.25,.12,1]} color={accent}/><Block position={[0,.7,0]} size={[.7,1.2,.48]} color="#b6a17e"/>
  <Block position={[0,1.38,0]} size={[1.6,.1,1.05]} rotation={[.23,0,0]} color={accent}/><Document position={[0,1.46,0]} rotation={[.23,0,0]} accent={accent}/>
  <Stroke from={[.63,1.4,-.28]} to={[.63,1.95,-.32]} color="#354d42" radius={.025}/><Stroke from={[.63,1.95,-.32]} to={[.3,2.07,-.08]} color="#354d42" radius={.035}/>
</group>;}
export function Bell({accent}:{accent:string}) {return <group position={[.55,.75,-.25]}>
  <mesh castShadow receiveShadow><cylinderGeometry args={[.27,.57,.75,32,1,true]}/><meshStandardMaterial color={accent} side={DoubleSide} roughness={.9}/></mesh>
  <mesh position={[0,.42,0]} castShadow><sphereGeometry args={[.22,20,12]}/><meshStandardMaterial color={accent} roughness={.9}/></mesh>
  <mesh position={[0,-.42,0]} rotation={[Math.PI/2,0,0]} castShadow><torusGeometry args={[.55,.045,8,32]}/><meshStandardMaterial color={accent} roughness={.9}/></mesh>
  <Stroke from={[0,-.2,0]} to={[0,-.55,0]} color="#354d42" radius={.045}/>
</group>;}
