import type {Look} from '../lib/story/looks.ts';
export const looks=[
 {id:'light',name:'Workbench',ground:'#f2f0e9',ink:'#202932',faint:'#58636c',accent:'#8d471e',surface:{color:'#334940',roughness:.68,glows:false},lights:{ambient:1.8,key:2.6,fill:1,rim:1.2},floor:'none',shadows:true},
 {id:'dark',name:'Instrument bench',ground:'#151e27',ink:'#f3eee2',faint:'#abb9c4',accent:'#efb475',surface:{color:'#293e3a',roughness:.65,glows:false},lights:{ambient:2,key:3.1,fill:1.4,rim:2.4},floor:'none',shadows:true},
] as const satisfies readonly Look[];
