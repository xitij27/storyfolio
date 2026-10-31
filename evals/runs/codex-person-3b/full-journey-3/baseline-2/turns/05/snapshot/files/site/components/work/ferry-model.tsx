"use client";
import { useState } from "react";
const steps = [
  {title:"Old target active",text:"The write path starts at the old target."},
  {title:"Check lag and parity",text:"The command checks replication lag and checksum parity. The checks pass in this illustration."},
  {title:"Switch the write target",text:"The write path moves to the new target."},
  {title:"Keep the way back",text:"The old target remains ready as a fallback for a set window. No duration is assumed here."},
];
export function FerryModel(){const [step,setStep]=useState(0);return <section className="ferry-model" aria-labelledby="ferry-heading">
  <h2 id="ferry-heading">Step through the cutover</h2>
  <figure className="work-figure"><div className="figure-scroll"><svg className="diagram-wide" viewBox="0 0 900 350" role="img" aria-label={steps[step].title}><title>{steps[step].title}</title>
    <rect x="24" y="125" width="210" height="80" rx="6"/><text x="46" y="172">Write path</text>
    <path className={step<2?"diagram-accent":"diagram-muted"} d="M234 165 H290 V70 H500 M490 63 L500 70 L490 77"/><path className={step>=2?"diagram-accent":"diagram-muted"} d="M290 165 V275 H500 M490 268 L500 275 L490 282"/>
    <rect x="500" y="30" width="340" height="80" rx="6"/><text x="520" y="65">Old target</text><text className="diagram-sub" x="520" y="93">{step<2?"Current write target":"Ready as fallback"}</text>
    <rect x="500" y="235" width="340" height="80" rx="6"/><text x="520" y="270">New target</text><text className="diagram-sub" x="520" y="298">{step>=2?"Current write target":"Next write target"}</text>
    <text className="diagram-sub" x="335" y="174">{step===1?"Lag + parity checks":"ferry cutover"}</text>
  </svg><svg className="diagram-mobile" viewBox="0 0 420 370" role="img" aria-label={steps[step].title}><title>{steps[step].title}</title>
    <rect x="100" y="20" width="220" height="65" rx="6"/><text x="120" y="59">Write path</text>
    <path className={step<2?"diagram-accent":"diagram-muted"} d="M210 85 V125 H110 V240 M103 231 L110 240 L117 231"/>
    <path className={step>=2?"diagram-accent":"diagram-muted"} d="M210 125 H310 V240 M303 231 L310 240 L317 231"/>
    <text className="diagram-sub" x="105" y="180">{step===1?"Lag + parity checks":"ferry cutover"}</text>
    <rect x="20" y="240" width="180" height="85" rx="6"/><text x="36" y="273">Old target</text><text className="diagram-sub" x="36" y="305">{step<2?"Writes here":"Fallback ready"}</text>
    <rect x="220" y="240" width="180" height="85" rx="6"/><text x="236" y="273">New target</text><text className="diagram-sub" x="236" y="305">{step>=2?"Writes here":"Next target"}</text>
  </svg></div><figcaption>Illustration · no live systems. The complete sequence is described below.</figcaption></figure>
  <div className="ferry-state" aria-live="polite"><span>Step {step+1} of {steps.length}</span><h3>{steps[step].title}</h3><p>{steps[step].text}</p></div>
  <div className="ferry-controls"><button onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0}>Back</button><button onClick={()=>setStep(Math.min(3,step+1))} disabled={step===3}>Next step</button><button onClick={()=>setStep(0)}>Restart</button></div>
  <ol>{steps.map(s=><li key={s.title}><b>{s.title}.</b> {s.text}</li>)}</ol>
</section>}
