"use client";
import type { ExtraProps } from "@/components/story/types";
import { Presence } from "./presence";
import { Replica, WaveSystem } from "./waves";
import { PlaceMap } from "./places";
export default function Career(props:ExtraProps){return <>
 <Presence frameRef={props.frameRef} chapter="career" beat="career.library"><Replica look={props.look}/></Presence>
 <Presence frameRef={props.frameRef} chapter="career" beat="career.lumen"><PlaceMap look={props.look} amsterdamOnly/></Presence>
 <Presence frameRef={props.frameRef} chapter="career" beat="career.kestrel"><WaveSystem {...props}/></Presence>
 </>;}
