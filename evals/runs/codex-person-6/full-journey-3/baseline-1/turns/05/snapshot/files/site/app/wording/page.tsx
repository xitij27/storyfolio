import type { Metadata } from "next";
import Link from "next/link";
import { wording } from "@/content/wording";
import styles from "./wording.module.css";
export const metadata: Metadata = { title:"Dawit Bekele — Wording review",robots:{index:false,follow:false} };
export default function Wording() {
  return <main className={styles.page}>
    <nav className={styles.top} aria-label="Wording review"><Link href="/">Dawit Bekele</Link><span>Local wording review</span></nav>
    <header className={styles.intro}><p>Blueprint + Slide · whole sheet story</p><h1>The first words.<br />And the invitation.</h1><p>Three versions of each complete opening and closing beat. I recommend A for both. You can mix them, change a line or write your own. The main site keeps its draft words until you choose.</p></header>
    {Object.entries(wording).map(([id,v])=><section key={id} className={styles.version}>
      <header><p className={styles.label}>Version {id.toUpperCase()}</p><h2>{v.name}</h2><p>{v.note}</p></header>
      <div className={styles.beats}>
        {(["hello","contact"] as const).map((key,i)=><article key={key}>
          <div className={styles.context}>Dawit Bekele · Work · Contact · CV</div>
          <div className={styles.scene}><span>Same sheet illustration in every version</span><strong>{key==="hello"?"Dawit Bekele":"Write to Dawit"}</strong><p>{key==="hello"?"Platform engineer · Migration plans, cutover checklists and a way back.":"dawit@example.com · Migration and conference enquiries"}</p></div>
          <p className={styles.label}>{i===0?"01 · Hello":"07 · Get in touch"}</p>
          <h3>{i===0?"Hello":"Get in touch"}</h3><p>{v[key]}</p>
          <p className={styles.fixed}>{key==="hello"?"Original scene graphics are illustrations. Navigation: Work · Contact · CV.":"Actions: Email Dawit · CV. The CV page offers Print CV and Download HTML CV."}</p>
          <a className={styles.preview} href={`/preview?look=blueprint&move=slide&wording=${id}#${key}`}>Scroll version {id.toUpperCase()} from {key==="hello"?"the opening":"the close"} ↗</a>
        </article>)}
      </div>
    </section>)}
    <footer className={styles.footer}>Tell me your opening and closing choice in our conversation. Previewing a version does not settle the wording.</footer>
  </main>;
}
