import { Chapter, Beat } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { Inspect } from "@/content/inspect";
import { Diagram } from "@/content/diagram";

export default function Home() {
  return <main>
    <a className="story-skip" href="#close">Skip to the evidence</a>
    <header className="site-header"><a className="identity" href="#opening"><span className="identity-mark" aria-hidden="true">am</span><span>Ada Mensah<span className="identity-role">Embedded firmware</span></span></a><nav aria-label="Quick links"><a href="#middle">Explore the work <span aria-hidden="true">↗</span></a><a href="#close">Evidence <span aria-hidden="true">↗</span></a></nav></header>
    <div className="study-label">Mosslink / a fictional portfolio study</div>
    <Experience>
      <Chapter id="opening"><Beat story={story} id="opening.assembly" fallback={<Diagram mode="assembly"/>}>
        <p className="eyebrow"><span>01 / THE QUESTION</span><span className="small-rule"/></p>
        <h1 id="opening-title">Between code<br/>and <em>the bench.</em></h1>
        <p className="lead">How do you connect a firmware decision to something you can actually observe?</p>
        <p className="body-copy">I wrote the firmware, scheduled the power states and built the bring-up fixture for Mosslink, an environmental sensor.</p>
        <div className="opening-foot"><span>Firmware is code that controls a physical device.</span><a className="scroll-prompt" href="#middle"><span aria-hidden="true">↓</span> Follow the connection</a></div>
      </Beat></Chapter>
      <Chapter id="middle"><Beat story={story} id="middle.relationship" fallback={<Diagram mode="relationship"/>}>
        <p className="eyebrow"><span>02 / THE CONNECTION</span><span className="small-rule"/></p>
        <h2 id="middle-title">Make the response<br/><em>observable.</em></h2>
        <p className="lead">The fixture connects a board response to a bench observation.</p>
        <Inspect/>
        <p className="body-copy middle-definition">Bring-up means checking a new board&apos;s basic operation. A colleague designed the PCB and analogue front end.</p>
        <p className="micro">Follow the arrows: command → board → fixture → observation.<br/>Connections explain relationships, not electrical wiring.</p>
      </Beat></Chapter>
      <Chapter id="close"><Beat story={story} id="close.evidence" fallback={<Diagram mode="evidence"/>}>
        <p className="eyebrow"><span>03 / THE EVIDENCE</span><span className="small-rule"/></p>
        <h2 id="close-title">A connection.<br/><em>Not a leap.</em></h2>
        <p className="lead">I connect firmware decisions to bench observations through power-state scheduling and the bring-up fixture, while keeping the evidence limits visible.</p>
        <div className="evidence-pair"><div><span className="evidence-label">LONGEST RUN</span><strong>72<span> hours</span></strong><p>Observed on the bench.</p></div><div><span className="evidence-label">BATTERY PROJECTION</span><strong>2<span> years</span></strong><p>From bench current readings and an assumed reporting cycle.</p></div></div>
        <a className="text-link" href="#scope">Read the scope of the evidence <span aria-hidden="true">↘</span></a>
      </Beat></Chapter>
    </Experience>
    <footer id="scope" className="scope-footer">
      <div><p className="eyebrow">THE SCOPE MATTERS</p><h2>What the bench<br/>can tell us.</h2><a className="text-link" href="#opening">Back to the question ↑</a></div>
      <div className="scope-facts"><p>The longest run was 72 hours. Two years is a projection from bench current readings and an assumed reporting cycle.</p><p>Forty engineering samples were assembled. Six were tested on the bench. None went to customers.</p><p>One preliminary emissions check passed. Full qualification is unfinished.</p><p>Ada wrote the firmware, scheduled the power states and built the bring-up fixture. A colleague designed the PCB and analogue front end.</p></div>
      <p className="scope-note">Ada and Mosslink are fictional. Illustrative bench model: shapes and connections are explanatory, not a photograph, circuit diagram, wiring plan or measured signal.</p>
    </footer>
    <div className="model-note"><span className="model-dot"/>Illustrative bench model<span className="model-note-detail"> / shapes and connections are explanatory</span></div>
  </main>;
}
