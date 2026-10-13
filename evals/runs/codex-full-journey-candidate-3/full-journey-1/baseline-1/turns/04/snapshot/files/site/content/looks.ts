import type {Look} from '../lib/story/looks.ts';
export const looks=[
 {id:'warm',name:'Warm bench',ground:'#f2f0e9',ink:'#202932',faint:'#58636c',accent:'#8d471e',surface:{color:'#f9f5e9',roughness:.85,glows:false},lights:{ambient:1.5,key:2,fill:.7,rim:.7},floor:'none',shadows:false},
 {id:'dark',name:'Instrument dark',ground:'#111c22',ink:'#f3eee2',faint:'#b5c0c5',accent:'#efb475',surface:{color:'#25363e',roughness:.75,glows:false},lights:{ambient:1.5,key:2,fill:.8,rim:1.2},floor:'none',shadows:false},
 {id:'lab',name:'Clean lab',ground:'#e8eeed',ink:'#163831',faint:'#49635d',accent:'#a35d38',surface:{color:'#d8e3df',roughness:.7,glows:false},lights:{ambient:1.7,key:2,fill:.7,rim:.6},floor:'none',shadows:false}
] as const satisfies readonly Look[];
