import Link from "next/link";
import { Chapter,Beat,Kicker,Title,Body,Note } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { MigrationControls } from "@/content/spine-controls";
import { story } from "@/content/story";
import { copy } from "@/content/copy";
function Picture({name,alt}:{name:string;alt:string}){
  // Locally drawn static equivalent, also available without JavaScript/WebGL.
  // eslint-disable-next-line @next/next/no-img-element
  return <figure><img src={`/illustrations/${name}.svg`} width="720" height="500" alt={alt}/><figcaption>Illustration · own geometry</figcaption></figure>;
}
export default function Home(){return <main><a className="story-skip" href="#contact">Skip to contact</a><Experience>
  <Chapter id="hello"><Beat story={story} id="hello.intro" fallback={<Picture name="library" alt="A library catalogue and table diagram on an open runbook."/>}>
    <Kicker number={1}>MIGRATION WORK</Kicker><Title as="h1" id="hello-title">{copy.beats["hello.intro"].title}</Title>
    <Body>{copy.beats["hello.intro"].body}</Body><div className="runbook-proof"><strong>40 teams</strong><span>use the runbook whose first version I wrote and which I still own.</span></div>
    <Note>{copy.beats["hello.intro"].note}</Note><a className="text-link" href="#contact">Planning a migration? Get in touch ↗</a>
    <Note sceneOnly>Illustration · library catalogue on a runbook<br/>Scroll to open the story ↓</Note>
  </Beat><Beat story={story} id="hello.origin" fallback={<Picture name="library" alt="An illustrative catalogue and a whole table diagram, representing the library origin."/>}>
    <Kicker number={1}>THE LIBRARY / 2014</Kicker><Title as="h2" id="origin-title">{copy.beats["hello.origin"].title}</Title><Body>{copy.beats["hello.origin"].body}</Body><Note>{copy.beats["hello.origin"].note}</Note><Note sceneOnly>Illustration · a whole table disappears.<br/>No actual data or recovery is depicted.</Note>
  </Beat></Chapter>
  <Chapter id="projects"><Beat story={story} id="projects.migration" fallback={<Picture name="migration" alt="Two generic gateways linked by a crossing and a return path on an open book."/>}>
    <Kicker number={6}>SELECTED WORK / MIGRATION</Kicker><Title as="h2" id="projects-title">{copy.beats["projects.migration"].title}</Title><p className="availability">99.98%</p><Body>Measured availability of the order API over the 26-month migration.</Body>
    <MigrationControls/><Link className="text-link" href="/work/migration">More about the migration ↗</Link><Note>{copy.beats["projects.migration"].note}</Note>
  </Beat></Chapter>
  <Chapter id="contact"><Beat story={story} id="contact.close" fallback={<Picture name="contact" alt="An invitation and CV leaf rest beside a complete bound runbook."/>}>
    <Kicker number={7}>GET IN TOUCH</Kicker><Title as="h2" id="contact-title">{copy.beats["contact.close"].title}</Title><Body>{copy.beats["contact.close"].body}</Body>
    <a className="contact-address" href="mailto:dawit@example.com">dawit@example.com ↗</a>
    <div className="cv-links"><Link href="/cv">View / print CV ↗</Link><a href="/dawit-bekele-cv.html" download>Download HTML CV ↓</a></div>
    <Note>{copy.beats["contact.close"].note}</Note><Note sceneOnly>Illustration · a complete runbook, invitation and CV</Note><a className="back-top" href="#hello">Back to the beginning ↑</a>
  </Beat></Chapter>
</Experience></main>;}
