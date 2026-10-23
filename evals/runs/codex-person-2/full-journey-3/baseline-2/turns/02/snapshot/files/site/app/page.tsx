export default function Home() {
  return <main style={{minHeight:"100vh",background:"#0b1917",color:"#e5ede6",padding:"9vh 7vw",fontFamily:"system-ui"}}>
    <p style={{fontFamily:"monospace",color:"#a9f598",fontSize:12,letterSpacing:2}}>DAWIT BEKELE / CONCEPT STUDIES</p>
    <h1 style={{fontSize:"clamp(40px,7vw,96px)",fontWeight:450,letterSpacing:"-.06em",maxWidth:850,lineHeight:1.05}}>Three ways to tell the story.</h1>
    <p style={{maxWidth:620,lineHeight:1.8,color:"#b8c9bf"}}>These are local, scroll-driven 3D sketches. Each has an opening, a working middle and an ending. Choose the world first; we’ll agree the full page script next.</p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(245px,1fr))",gap:24,marginTop:55}}>{[
      ["paths","01","The live path","Recommended","A request splits between two databases. Checksums meet; the write path changes; the way back remains visible."],
      ["bench","02","The cutover bench","Gated stages","A service moves through six physical gates. A parallel route and return loop make checks and rollback tangible."],
      ["logs","03","The recovery line","Migration waves","Data ribbons fan out from two source sites. Fourteen streams gather into a destination, with a recovery strand underneath."],
    ].map(([id,n,title,tag,body])=><a key={id} href={`/sketch/${id}`} style={{border:"1px solid #385048",padding:28,textDecoration:"none",display:"block"}}><p style={{color:"#a9f598",fontFamily:"monospace",fontSize:11}}>{n} / {tag}</p><h2 style={{fontSize:28,fontWeight:450}}>{title}</h2><p style={{fontSize:14,lineHeight:1.8,color:"#b8c9bf"}}>{body}</p><p style={{fontSize:13,marginTop:35}}>Explore the sketch ↗</p></a>)}</div>
    <p style={{fontSize:12,color:"#95aba0",marginTop:40}}>Original illustrations · local system fonts · no downloaded assets · nothing published</p>
  </main>;
}
