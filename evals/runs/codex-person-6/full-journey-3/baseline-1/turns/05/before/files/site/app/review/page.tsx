import type { Metadata } from "next";
import Link from "next/link";
import { LOOKS } from "@/stitch/look";
import styles from "./review.module.css";

export const metadata: Metadata = {
  title: "Dawit Bekele — Choose the look",
  robots: { index: false, follow: false },
};

const looks = [
  { id: "night", name: "Night", note: "Warm paper against charcoal. The look you have seen so far." },
  { id: "daylight", name: "Daylight", note: "Pale paper against warm grey. The lightest setting." },
  { id: "blueprint", name: "Blueprint", note: "Cool paper against navy, with an amber accent." },
] as const;
const moves = [
  { id: "slide", name: "Slide", note: "The sheet changes shape with a smaller camera move." },
  { id: "fold", name: "Fold", note: "The sheet folds into a packet, turns and opens into the next picture." },
  { id: "swing", name: "Swing", note: "The camera sweeps around the changing sheet." },
] as const;

export default function Review() {
  return <main className={styles.page}>
    <nav className={styles.nav} aria-label="Review"><Link href="/">Dawit Bekele</Link><span>Local design review</span></nav>
    <header className={styles.header}>
      <p className={styles.eyebrow}>One sheet · seven chapters</p>
      <h1>Choose the look.<br />Then the way it moves.</h1>
      <p>Each link opens your whole story. Compare the same chapter in each look, then scroll between chapters to compare movement. Use your browser’s Back button to return here.</p>
      <p>My recommendation: <a href="/preview?look=blueprint&move=slide">Blueprint + Slide</a>. The navy and cool paper suit the technical material, with less camera travel than Swing.</p>
      <p className={styles.note}>These previews use the same draft words. Tell me your look and movement choice in our conversation; opening a preview does not select it.</p>
    </header>
    <section className={styles.looks} aria-label="Looks">
      {looks.map(look => {
        const palette = LOOKS[look.id];
        return <article key={look.id} className={styles.card}>
          <div className={styles.swatch} style={{background: palette.bg}} aria-hidden="true">
            <div className={styles.paper} style={{background: palette.paper, color: palette.ink}}>
              <span style={{color: palette.amber}}>DAWIT BEKELE</span>
              <strong>A way back.</strong>
              <i style={{background: palette.amber}} />
            </div>
          </div>
          <h2>{look.name}</h2><p>{look.note}</p>
          <div className={styles.links} aria-label={`${look.name} movement previews`}>
            {moves.map(move => <a key={move.id} href={`/preview?look=${look.id}&move=${move.id}`}>{look.name} + {move.name}<span aria-hidden="true"> ↗</span></a>)}
          </div>
        </article>;
      })}
    </section>
    <section className={styles.moves} aria-label="Movement explained">
      {moves.map(move => <article key={move.id}><h2>{move.name}</h2><p>{move.note}</p></article>)}
    </section>
    <footer className={styles.footer}>Your choice applies to the whole sheet story. Reduced-motion preferences keep the previews at fixed poses.</footer>
  </main>;
}
