import Link from "next/link";
import "./concepts.css";
export default function Home() {
  return <main className="concept-home"><header><span>DAWIT BEKELE</span><span>LOCAL DESIGN STUDY / 01</span></header>
    <p className="concept-eyebrow">THREE OBJECTS. ONE PERSON.</p><h1>A story built from<br />what you work with.</h1>
    <p className="concept-intro">Three scroll-driven 3D sketches, each with a beginning, a working migration illustration and an ending. All geometry is made locally. These are concepts for review.</p>
    <div className="concept-grid">{[
      ["01", "runbook", "The open runbook", "A bound runbook opens into pop-up scenes. Library catalogue, working model, invitation.", "Recommended · the clearest scene at a glance"],
      ["02", "checklist", "Before the cutover", "A continuous checklist folds into a landscape beneath the story. Its checks follow the scroll.", "A continuous path through the story"],
      ["03", "rollback", "A way back", "A tracing-film rollback plan holds layered scenes together. Hinged overlays keep two paths visible.", "The most technical and abstract direction"],
    ].map(([n,id,title,body,note]) => <Link key={id} href={`/sketch/${id}`} className={`concept-card card-${id}`}><span className="concept-number">{n} / OPEN SKETCH ↗</span><div className="concept-object" aria-hidden="true"><i /><i /><i /></div><h2>{title}</h2><p>{body}</p><small>{note}</small></Link>)}</div>
    <footer>Own geometry · System fonts · No external assets · Local only</footer>
  </main>;
}
