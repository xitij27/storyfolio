import type { Look } from "../lib/story/looks.ts";
export const looks = [
  { id:"dark",name:"Night operations",ground:"#0b1917",ink:"#e8eee6",faint:"#acbeb2",accent:"#acec9d",surface:{color:"#34564b",roughness:.8,glows:false},lights:{ambient:1.8,key:2,fill:.6,rim:.6},floor:"none",shadows:false },
  { id:"light",name:"Day inspection",ground:"#f0eee6",ink:"#18372f",faint:"#4d675b",accent:"#176758",surface:{color:"#c5cec3",roughness:.9,glows:false},lights:{ambient:1.7,key:2,fill:.7,rim:.4},floor:"none",shadows:false },
  { id:"warm",name:"Warm console",ground:"#211b17",ink:"#f2e9d9",faint:"#c4b6a0",accent:"#f2bc79",surface:{color:"#6b5744",roughness:.85,glows:false},lights:{ambient:1.8,key:2,fill:.6,rim:.5},floor:"none",shadows:false },
] as const satisfies readonly Look[];
