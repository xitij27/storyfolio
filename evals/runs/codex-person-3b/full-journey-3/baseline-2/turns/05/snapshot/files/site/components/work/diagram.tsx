import type { ReactNode } from "react";
import type { WorkSlug } from "@/content/work";
const box = (x:number,y:number,w:number,h:number,head:string,sub?:string) => <g><rect x={x} y={y} width={w} height={h} rx="6"/><text x={x+16} y={y+31}>{head}</text>{sub&&<text className="diagram-sub" x={x+16} y={y+57}>{sub}</text>}</g>;
const arrow = (x:number,y:number,x2:number,y2:number,accent=false) => <g className={accent?"diagram-accent":""}><path d={`M${x} ${y} L${x2} ${y2}`}/><path d="M-9 -7 L0 0 L-9 7" transform={`translate(${x2} ${y2}) rotate(${Math.atan2(y2-y,x2-x)*180/Math.PI})`}/></g>;
function Figure({ title, children, mobile, note, height=350, mobileHeight=height }: {title:string;children:ReactNode;mobile:ReactNode;note:string;height?:number;mobileHeight?:number}) {
  return <figure className="work-figure"><div className="figure-scroll">
    <svg className="diagram-wide" viewBox={`0 0 900 ${height}`} role="img" aria-label={title}><title>{title}</title>{children}</svg>
    <svg className="diagram-mobile" viewBox={`0 0 420 ${mobileHeight}`} role="img" aria-label={title}><title>{title}</title>{mobile}</svg>
  </div><figcaption>Illustration · {note}</figcaption></figure>;
}
export function WorkDiagram({ slug }: {slug:WorkSlug}) {
  if(slug==="data-centre-exit")return <><Figure title="Fourteen migration waves from two data centres to managed Kubernetes" note="Schematic sequence; wave sizes are not service counts." mobileHeight={490} mobile={<>
    {box(20,20,180,70,"Data centre 1")}{box(220,20,180,70,"Data centre 2")}<path d="M110 90 V115 H310 V90 M210 115 V145"/><text className="diagram-sub" x="48" y="167">14 dependency-grouped waves</text>
    {Array.from({length:14},(_,i)=><g key={i}><rect className="wave" x={49+(i%7)*46} y={190+Math.floor(i/7)*70} width="36" height="50"/><text className="wave-number" x={67+(i%7)*46} y={222+Math.floor(i/7)*70} textAnchor="middle">{i+1}</text></g>)}
    {arrow(210,320,210,363,true)}{box(80,377,260,82,"Managed Kubernetes")}
  </>}>
    {box(24,30,210,76,"Data centre 1")}{box(24,236,210,76,"Data centre 2")}<path d="M234 68 H265 V172 H295 M234 274 H265 V172"/>
    {Array.from({length:14},(_,i)=><g key={i}><rect className="wave" x={300+(i%7)*46} y={98+Math.floor(i/7)*88} width="36" height="54"/><text className="wave-number" x={318+(i%7)*46} y={130+Math.floor(i/7)*88} textAnchor="middle">{i+1}</text></g>)}
    <text className="diagram-sub" x="300" y="70">14 dependency-grouped waves</text>{arrow(630,172,674,172,true)}{box(686,130,190,86,"Managed","Kubernetes")}
  </Figure><Figure title="Weighted routing advances through 1, 10, 50 and 100 per cent" note="Confirmed routing steps, not a measured traffic trace." height={170} mobileHeight={420} mobile={<>
    {["1%","10%","50%","100%"].map((label,i)=><g key={label}>{box(100,20+i*100,220,65,label)}{i<3&&arrow(210,85+i*100,210,111+i*100,true)}</g>)}
  </>}>
    {["1%","10%","50%","100%"].map((label,i)=><g key={label}>{box(24+i*223,45,170,75,label)}{i<3&&arrow(194+i*223,83,235+i*223,83,true)}</g>)}
  </Figure></>;
  if(slug==="orders-database")return <Figure title="Logical replication and dual writes feed Postgres 15 before reads and writes move" note="The old cluster remains warm for one month after cutover." height={400} mobileHeight={440} mobile={<>
    {box(100,20,220,82,"Order service","Dual writes via ferry")}<path className="diagram-accent" d="M210 102 V145 M110 200 V145 H310 V200"/>
    {arrow(110,175,110,200,true)}{arrow(310,175,310,200,true)}{box(20,200,180,82,"Postgres 11","Old cluster")}{box(220,200,180,82,"Postgres 15","New cluster")}<path d="M110 282 V328 H310 V282" strokeDasharray="7 7"/>
    {arrow(310,305,310,282)}<text className="diagram-sub" x="90" y="361">Logical replication</text><text className="diagram-sub" x="30" y="400">Hourly checksums · three weeks</text>
  </>}>
    {box(24,144,206,82,"Order service","Dual writes")}{box(345,30,230,82,"Postgres 11","Old cluster")}{box(345,236,230,82,"Postgres 15","New cluster")}
    <path className="diagram-accent" d="M230 185 H280 V71 H345 M280 185 V277 H345"/>{arrow(315,71,345,71,true)}{arrow(315,277,345,277,true)}<path d="M575 71 H620 V277 H575" strokeDasharray="7 7"/>{arrow(600,277,575,277)}<text className="diagram-sub" x="638" y="154">Logical</text><text className="diagram-sub" x="638" y="181">replication</text><text className="diagram-sub" x="345" y="358">Hourly checksum comparison for three weeks</text>
  </Figure>;
  if(slug==="runbook")return <Figure title="Six runbook stages, each requiring the previous exit check" note="Stage order and gating rule; no invented acceptance thresholds." height={550} mobileHeight={640} mobile={<>
    {["Preflight","Shadow","Dual write","Cutover","Soak","Decommission"].map((name,i)=><g key={name}>{box(20,16+i*104,380,62,`${i+1}. ${name}`)}<path className="diagram-accent" d={`M345 ${42+i*104} l10 10 19 -22`}/><text className="diagram-sub" x="36" y={100+i*104}>{i===5?"Exit check":"Exit check before advancing"}</text></g>)}
  </>}>
    {["Preflight","Shadow","Dual write","Cutover","Soak","Decommission"].map((name,i)=><g key={name}>{box(80,20+i*85,330,65,`${i+1}. ${name}`)}<path className="diagram-accent" d={`M435 ${40+i*85} l12 12 22 -25`}/><text className="diagram-sub" x="492" y={60+i*85}>{i===5?"Exit check":"Exit check before advancing"}</text>{i<5&&<path d={`M245 ${85+i*85} V${105+i*85}`}/>}</g>)}
  </Figure>;
  if(slug==="on-call")return <Figure title="Weekly pages fell from 85 to 22 for the nine-person on-call team" note="Two supplied weekly counts, at the same scale; about one year apart." height={280} mobileHeight={310} mobile={<>
    <text x="25" y="40">Before</text><rect className="comparison-bar" x="25" y="60" width="330" height="42"/><text x="370" y="91">85</text>
    <text x="25" y="160">After</text><rect className="comparison-bar accent-fill" x="25" y="180" width={330*22/85} height="42"/><text x="126" y="211">22</text><text className="diagram-sub" x="25" y="278">Pages per week · team of nine</text>
  </>}>
    <text x="24" y="62">Before</text><rect className="comparison-bar" x="160" y="30" width="595" height="48"/><text x="778" y="62">85</text>
    <text x="24" y="164">After</text><rect className="comparison-bar accent-fill" x="160" y="132" width="154" height="48"/><text x="338" y="164">22</text><text className="diagram-sub" x="160" y="231">Pages per week · team of nine</text>
  </Figure>;
  return <Figure title="Library outage recovery from nightly dump and paper loan slips" note="Sequence from Dawit's account of the 2014 incident; no original records." height={360} mobileHeight={520} mobile={<>
    {[["Dropped table","Cleanup script"],["Catalogue down","Six hours"],["Restore","Nightly dump"],["Re-enter loans","From paper slips"]].map(([head,sub],i)=><g key={head}>{box(50,20+i*130,320,82,head,sub)}{i<3&&arrow(210,102+i*130,210,140+i*130,true)}</g>)}
  </>}>
    {box(24,34,245,80,"Dropped table","Cleanup script")}{arrow(269,74,313,74,true)}{box(325,34,245,80,"Catalogue down","Six hours")}<path d="M570 74 H636 V222 H570"/>{box(325,182,245,84,"Restore","Nightly dump")}{arrow(325,224,281,224)}{box(24,182,245,84,"Re-enter loans","From paper slips")}
  </Figure>;
}
