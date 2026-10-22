"use client";
import { useControl, useControls, useSceneOff } from "@/components/story/controls";
export function MigrationControls(){
  const controls=useControls(),value=useControl("migration.position"),off=useSceneOff();
  return <div className="migration-controls story-control"><p className="control-label">Try the illustrated model</p><div role="group" aria-label="Migration illustration">
    <button type="button" aria-pressed={value===1} onClick={()=>controls.set("migration.position",1)}>Forward →</button>
    <button type="button" aria-pressed={value===0} onClick={()=>controls.set("migration.position",0)}>← Return</button>
    <button type="button" aria-pressed={value===null} onClick={()=>controls.set("migration.position",null)}>Follow scroll</button>
  </div><p className="control-status" role="status">{off?"Static illustration. The two gateways show a move and a return path.":value===1?"Model at the destination.":value===0?"Model at the starting point.":"Scroll moves the model between the two gateways."}</p></div>;
}
