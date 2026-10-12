import { createElement } from "react";
import type { ExtraProps } from "@/components/story/types";
import { story } from "./story";
export const extras = story.chapters.map((chapter,owner)=>({chapter:chapter.id,load:async()=>{
 const {default:Connections}=await import("./extras/connections");
 return {default:function Leads(props:ExtraProps){return createElement(Connections,{...props,owner});}};
}}));
