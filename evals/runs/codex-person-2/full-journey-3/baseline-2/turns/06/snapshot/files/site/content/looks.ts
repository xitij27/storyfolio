import type { Look } from "../lib/story/looks.ts";
export const looks = [
  { id:"dark",name:"Night operations",ground:"#0b1917",ink:"#e8eee6",faint:"#acbeb2",accent:"#acec9d",surface:{color:"#34564b",roughness:.8,glows:false},lights:{ambient:1.8,key:2,fill:.6,rim:.6},floor:"none",shadows:false },
] as const satisfies readonly Look[];
