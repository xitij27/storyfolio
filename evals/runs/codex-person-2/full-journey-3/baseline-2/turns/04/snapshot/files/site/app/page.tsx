import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { CutoverControl } from "@/content/cutover-control";
import { Diagram } from "@/content/fallback";
import Link from "next/link";

export default function Home(){
 return <main id="main"><a href="#contact" className="story-skip">Skip to contact</a><Experience>
 <header className="site-header"><a className="wordmark" href="#opening" aria-label="Dawit Bekele, back to introduction">DB<span> / Dawit Bekele</span></a><nav aria-label="Main navigation"><a href="#database">Work</a><a href="#contact">Contact</a><a href="/dawit-bekele-cv.html">CV ↗</a></nav></header>
 <div className="spine-notice">THE LIVE PATH <span> / Appearance study · opening, middle & ending</span></div>
 <Chapter id="opening">
  <Beat story={story} id="opening.hello" fallback={<Diagram kind="library"/>}>
   <Kicker number={1}>Dawit Bekele / migrations & reliability</Kicker>
   <Title as="h1" id="opening-title">Keep a way back.</Title>
   <Body>I plan migrations: moving running systems to a new home, with checks before the switch and a rollback plan.</Body>
   <div className="proof"><strong>40 teams</strong><span>use the migration runbook whose first version I wrote and still own.</span></div>
   <a className="primary-link" href="mailto:dawit@example.com">Talk about a migration <span aria-hidden>↗</span></a>
   <Note>For engineering leaders and conference organisers.</Note>
   <p className="scene-key"><span>Illustration</span> ↓ Follow the recovery path</p>
  </Beat>
  <Beat story={story} id="opening.library" fallback={<Diagram kind="library"/>}>
   <Kicker number={1}>Entoto Technical University Library / 2014</Kicker>
   <Title as="h2">The table I dropped.</Title>
   <Body>My first production outage was at the library. I ran a cleanup script against production instead of staging and dropped a table. The catalogue was down for six hours.</Body>
   <Note>The restore came from the night’s dump; a day of loans was re-entered from paper slips. That outage is why I care about rollbacks.</Note>
   <p className="scene-key"><span>Illustration</span> Catalogue records & nightly-dump recovery</p>
  </Beat>
 </Chapter>
 <Chapter id="database">
  <Beat story={story} id="database.cutover" fallback={<Diagram kind="database"/>}>
   <Kicker number={6}>Selected work / Kestrel Freight / 2022</Kicker>
   <Title as="h2" id="database-title">Two databases.<br/>One careful handover.</Title>
   <Body>I led the 4 TB orders database upgrade from Postgres 11 to 15 with one database engineer. We used logical replication, dual writes and hourly checksums before moving reads, then writes.</Body>
   <CutoverControl/>
   <a className="text-link" href="/work/orders-database">Read the approach ↗</a>
   <Note>No maintenance window. The old cluster stayed warm for a month as the way back.</Note>
   <p className="scene-key"><span>Illustration</span> Old target → new target · return loop: fallback</p>
  </Beat>
 </Chapter>
 <Chapter id="contact">
  <Beat story={story} id="contact.complete" fallback={<Diagram kind="complete"/>}>
   <Kicker number={7}>Rotterdam / get in touch</Kicker>
   <Title as="h2" id="contact-title">Let’s talk about your migration.</Title>
   <Body>I wrote and sequenced Kestrel Freight’s 310-service migration plan. I own the runbook used by 40 teams and maintain ferry.</Body>
   <a className="contact-address" href="mailto:dawit@example.com">dawit@example.com <span aria-hidden>↗</span></a>
   <Note>For migration conversations and speaking enquiries.<br/>Boring Migrations · SRE North 2024.</Note>
   <div className="cv-links"><a href="/dawit-bekele-cv.html">View printable CV ↗</a><a href="/dawit-bekele-cv.html" download="dawit-bekele-cv.html">Download HTML CV ↓</a></div>
   <p className="scene-key"><span>Illustration</span> Forward path & return route</p>
  </Beat>
 </Chapter>
 <footer className="site-footer"><span>Dawit Bekele / Rotterdam</span><a href="#opening">Back to the start ↑</a><Link href="/sketch/paths">Original concept ↗</Link></footer>
 </Experience></main>;
}
