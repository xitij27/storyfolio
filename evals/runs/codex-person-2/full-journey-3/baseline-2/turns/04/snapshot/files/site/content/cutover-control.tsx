"use client";
import { useControl, useControls } from "@/components/story/controls";
import { cutoverStages } from "./cutover";
export function CutoverControl(){
 const controls=useControls(),value=useControl("cutover");
 const index=value===null?null:Math.min(4,Math.round(value*4));
 return <div className="cutover-control story-control"><div className="control-label"><span>Explore the cutover</span><button onClick={()=>controls.set("cutover",null)} type="button">Follow scroll ↺</button></div>
 <div className="cutover-steps" aria-label="Cutover stages">{cutoverStages.map((stage,i)=><button type="button" key={stage.name} aria-pressed={index===i} onClick={()=>controls.set("cutover",i/4)}><span>{i+1}</span>{stage.name}</button>)}</div>
 <p className="step-description" aria-live="polite">{index===null?"Scroll through the five steps, or select a stage. The return path stays open.":cutoverStages[index].detail}</p></div>;
}
