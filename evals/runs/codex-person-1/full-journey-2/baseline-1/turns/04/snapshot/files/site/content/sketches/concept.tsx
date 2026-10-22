"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { BoxGeometry, Color, DoubleSide, Group, Shape, Vector3 } from "three";
import "./sketch.css";

type Kind = "runbook" | "checklist" | "rollback";
const concepts = {
  runbook: { number: "01", title: "The open runbook", object: "A bound runbook unfolds into places, working models and a way to get in touch.", middle: "A migration, in miniature", accent: "#bc542f", closing: "A runbook worth opening together.", label: "Bound runbook / pop-up scenes" },
  checklist: { number: "02", title: "Before the cutover", object: "A continuous cutover checklist folds into the places and work along the way.", middle: "Crossing the checklist", accent: "#26746b", closing: "The next checklist starts with a conversation.", label: "Continuous checklist / folded landscapes" },
  rollback: { number: "03", title: "A way back", object: "A rollback plan on tracing film opens into a set of reversible, layered scenes.", middle: "Two paths, held together", accent: "#5565ae", closing: "Make room for the way back.", label: "Tracing-film plan / hinged overlays" },
} as const;
const ink = "#283532";
function Box({ p = [0, 0, 0], s = [1, 1, 1], color = ink, rotation = [0, 0, 0], opacity = 1 }: { p?: [number, number, number]; s?: [number, number, number]; color?: string; rotation?: [number, number, number]; opacity?: number }) {
  return <mesh position={p} rotation={rotation} castShadow receiveShadow><boxGeometry args={s} /><meshStandardMaterial color={color} roughness={0.82} transparent={opacity < 1} opacity={opacity} /></mesh>;
}
function Line({ from, to, color = ink, width = .018 }: { from: [number, number, number]; to: [number, number, number]; color?: string; width?: number }) {
  const a = new Vector3(...from), b = new Vector3(...to), direction = b.clone().sub(a);
  return <mesh position={a.add(b).multiplyScalar(.5)} quaternion={new Group().quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize())}><cylinderGeometry args={[width, width, direction.length(), 8]} /><meshStandardMaterial color={color} /></mesh>;
}
function Page({ width = 2.25, height = 3, curl = 0, color = "#f6f0de", opacity = 1 }: { width?: number; height?: number; curl?: number; color?: string; opacity?: number }) {
  const geometry = useMemo(() => {
  const result = new BoxGeometry(width, .025, height, 28, 1, 16);
  const pos = result.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    pos.setY(i, pos.getY(i) + curl * Math.sin((x / width + .5) * Math.PI));
  }
  result.computeVertexNormals();
  return result;
  }, [width, height, curl]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh geometry={geometry} receiveShadow castShadow><meshStandardMaterial color={color} side={DoubleSide} transparent={opacity < 1} opacity={opacity} roughness={.9} /></mesh>;
}
function Book({ opening, accent }: { opening: number; accent: string }) {
  return <group>
    <Box p={[0, -.15, 0]} s={[4.65, .14, 3.2]} color={accent} />
    <Box p={[-.03, -.035, 0]} s={[.12, .2, 3.15]} color={accent} />
    {[-1, 1].map(side => <group key={side} position={[side * 1.16, 0, 0]} rotation={[0, 0, side * (.025 + (1 - opening) * .36)]}>
      {[0, 1, 2, 3].map(i => <group key={i} position={[0, i * .025, 0]}><Page curl={.06 + .03 * i} /></group>)}
    </group>)}
    <Line from={[0, .15, -1.5]} to={[0, .15, 1.5]} color={accent} width={.028} />
  </group>;
}
function Tape({ progress, accent }: { progress: number; accent: string }) {
  return <group rotation={[0, 0, -.12]}>
    {Array.from({ length: 5 }, (_, i) => <group key={i} position={[(i - 2) * .88, Math.abs(i - 2) * .16, 0]} rotation={[0, 0, (i % 2 ? -.14 : .14)]}>
      <Page width={.92} height={3.2} color={i % 2 ? "#e5ebdf" : "#f4f2df"} />
      {[-1.35, 1.35].map(z => <mesh key={z} position={[0, .04, z]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[.045, 12]} /><meshBasicMaterial color="#c8cebf" /></mesh>)}
      <Box p={[0, .04, 1]} s={[.5, .018, .028]} color={accent} />
      <Box p={[0, .04, .85]} s={[.5, .018, .018]} color="#b6bfaf" />
      {i <= progress * 4 && <group position={[0, .055, -.9]}><Line from={[-.15, 0, 0]} to={[-.025, 0, .12]} color={accent} /><Line from={[-.025, 0, .12]} to={[.2, 0, -.12]} color={accent} /></group>}
    </group>)}
  </group>;
}
function Overlays({ progress, accent }: { progress: number; accent: string }) {
  return <group>
    <Box p={[0, -.13, 0]} s={[4.7, .12, 3.2]} color="#d1d3cc" />
    {[0, 1, 2].map(i => <group key={i} position={[0, i * .09, -(i - 1) * .08]} rotation={[0, (i - 1) * progress * .12, (i - 1) * .045]}>
      <Page width={4.5} height={3} color={i === 2 ? "#e5e8f2" : "#f8f6e9"} opacity={.58} />
      {[-1.35, 1.35].map(x => <Line key={x} from={[x, .035, -1.2]} to={[x, .035, 1.2]} color={accent} width={.009} />)}
      <Line from={[-1.8, .035, 1]} to={[1.8, .035, 1]} color={accent} width={.009} />
    </group>)}
    {[-1, 0, 1].map(z => <mesh key={z} position={[-2.2, .12, z]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.12, .022, 8, 24]} /><meshStandardMaterial color={accent} /></mesh>)}
  </group>;
}
function Catalogue({ accent }: { accent: string }) {
  return <group position={[0, .1, 0]}>
    <Box p={[0, .62, -.2]} s={[2.7, 1.2, .9]} color="#bda57f" />
    {[-.9, 0, .9].flatMap(x => [0, 1, 2].map(row => <group key={`${x}-${row}`} position={[x, .23 + row * .36, .28]}>
      <Box s={[.78, .28, .045]} color="#e3d0a9" />
      <Box p={[0, 0, .04]} s={[.22, .06, .04]} color={ink} />
    </group>))}
    <Box p={[1.5, .48, -.65]} s={[.15, .88, .7]} color={accent} rotation={[0, 0, -.2]} />
    <Box p={[-1.55, .4, -.7]} s={[.17, .75, .7]} color="#596b63" rotation={[0, 0, .12]} />
    <group position={[0, .08, 1.02]} rotation={[0, -.1, 0]}>
      <Box s={[1.5, .1, .72]} color="#fbf8e9" />
      {[-.45, -.15, .15, .45].map(x => <Line key={x} from={[x, .06, -.25]} to={[x, .06, .25]} color={accent} width={.008} />)}
    </group>
  </group>;
}
function Arch({ x, accent }: { x: number; accent: string }) {
  return <group position={[x, .12, 0]}>
    <Box p={[-.42, .6, 0]} s={[.14, 1.2, .18]} color={accent} />
    <Box p={[.42, .6, 0]} s={[.14, 1.2, .18]} color={accent} />
    <Box p={[0, 1.22, 0]} s={[.98, .16, .18]} color={accent} />
    <Box p={[0, .08, 0]} s={[1, .12, .7]} color={accent} />
    <Box p={[0, .5, -.05]} s={[.5, .7, .025]} color={accent} opacity={.12} />
  </group>;
}
function Migration({ accent, amount }: { accent: string; amount: number }) {
  return <group position={[0, .2, 0]}>
    <Arch x={-1.4} accent="#7a847b" /><Arch x={1.4} accent={accent} />
    <Box p={[0, .13, 0]} s={[2.8, .09, .55]} color="#b6b9a8" />
    <Line from={[-1.4, .22, .23]} to={[1.4, .22, .23]} color={accent} />
    <Line from={[-1.4, .22, -.23]} to={[1.4, .22, -.23]} color={accent} />
    {[0, 1, 2, 3, 4].map(i => <Box key={i} p={[-1.35 + Math.min(1, Math.max(0, (amount - i * .11) / .56)) * 2.7, .42 + i * .075, (i % 3 - 1) * .11]} s={[.22, .09, .24]} color={accent} />)}
    <group position={[0, .2, .85]}>
      <Line from={[-1, 0, 0]} to={[1, 0, 0]} color={accent} width={.025} />
      <Line from={[amount > .5 ? .75 : -.75, 0, -.18]} to={[amount > .5 ? 1 : -1, 0, 0]} color={accent} width={.025} />
      <Line from={[amount > .5 ? .75 : -.75, 0, .18]} to={[amount > .5 ? 1 : -1, 0, 0]} color={accent} width={.025} />
    </group>
  </group>;
}
function FoldedEnvelope({ accent }: { accent: string }) {
  const shape = new Shape(); shape.moveTo(-1.5, -.7); shape.lineTo(0, .22); shape.lineTo(1.5, -.7); shape.closePath();
  return <group position={[0, .7, 0]} rotation={[-.2, 0, -.04]}>
    <Box s={[3, .065, 1.9]} color="#e0d6bd" />
    <mesh position={[0, .05, .1]} rotation={[-Math.PI / 2, 0, 0]}><shapeGeometry args={[shape]} /><meshStandardMaterial color="#faf5e8" side={DoubleSide} /></mesh>
    <Box p={[0, .09, 0]} s={[.4, .04, .4]} color={accent} rotation={[0, Math.PI / 4, 0]} />
    <Box p={[-.9, .09, -.55]} s={[.6, .02, .025]} color={ink} />
  </group>;
}
function World({ kind, progress, reverse, still }: { kind: Kind; progress: number; reverse: boolean; still: boolean }) {
  const ref = useRef<Group>(null), model = useRef<Group>(null);
  const smooth = useRef(0);
  const accent = concepts[kind].accent;
  const stage = progress < .84 ? 0 : progress < 1.84 ? 1 : 2;
  const amount = Math.min(1, Math.max(0, (progress - .86) / .82));
  useFrame((_, dt) => {
    if (!ref.current) return;
    smooth.current = still ? progress : smooth.current + (progress - smooth.current) * Math.min(1, dt * 7);
    ref.current.rotation.y = -.34 + smooth.current * .13;
    ref.current.rotation.x = .08;
    if (model.current) model.current.position.y = stage === 0 ? .04 : stage === 1 ? .16 : .1;
  });
  return <group ref={ref} position={[0, -.45, 0]}>
    {kind === "runbook" ? <Book opening={Math.min(1, progress + .2)} accent={accent} /> : kind === "checklist" ? <Tape progress={progress / 2.8} accent={accent} /> : <Overlays progress={progress / 2.8} accent={accent} />}
    <group ref={model}>
      {stage === 0 ? <Catalogue accent={accent} /> : stage === 1 ? <Migration accent={accent} amount={reverse ? 1 - amount : amount} /> : <FoldedEnvelope accent={accent} />}
    </group>
  </group>;
}
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="sk-no3d">The illustration is unavailable. The full story is below.</div> : this.props.children; }
}
export function ConceptSketch({ kind }: { kind: Kind }) {
  const data = concepts[kind];
  const [progress, setProgress] = useState(0), [reverse, setReverse] = useState(false), [still, setStill] = useState(false);
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setStill(media.matches);
    updateMotion(); media.addEventListener("change", updateMotion);
    const scroll = () => {
      const sections = main.current?.querySelectorAll<HTMLElement>(".sk-beat");
      if (!sections?.length) return;
      const height = sections[0].offsetHeight;
      const p = Math.max(0, (window.scrollY - main.current!.offsetTop) / height);
      setProgress(media.matches ? Math.min(2.8, Math.floor(p + .2) + .5) : Math.min(2.8, p));
    };
    scroll(); window.addEventListener("scroll", scroll, { passive: true }); window.addEventListener("resize", scroll);
    return () => { media.removeEventListener("change", updateMotion); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); };
  }, []);
  const stage = progress < .84 ? "Library catalogue" : progress < 1.84 ? "Migration model" : "An invitation";
  return <div className={`sketch sk-${kind}`} style={{ "--sk-accent": data.accent } as React.CSSProperties}>
    <header className="sk-header"><Link className="sk-wordmark" href="/">DB<span> / CONCEPT {data.number}</span></Link><nav aria-label="Concept navigation"><a href="#begin">Beginning</a><a href="#work">Work</a><a href="#contact">Contact</a><Link href="/concepts">All concepts ↗</Link></nav></header>
    <a href="#contact" className="sk-skip">Skip to contact</a>
    <aside className="sk-canvas" aria-label={`${data.label}. Illustrations, not actual work documents.`}>
      <SceneBoundary><Suspense fallback={<div className="sk-no3d">Loading local illustration…</div>}><Canvas shadows dpr={[1, 1.5]} camera={{ position: [5.5, 6.6, 8.5], fov: 36 }} gl={{ antialias: true, alpha: true }} onCreated={({ gl }) => { gl.setClearColor(new Color("#eee9dc"), 0); }}>
        <ambientLight intensity={1.6} /><directionalLight position={[-3, 8, 5]} intensity={3} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-7} shadow-camera-right={7} shadow-camera-top={7} shadow-camera-bottom={-7} />
        <World kind={kind} progress={progress} reverse={reverse} still={still} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.8, 0]} receiveShadow><planeGeometry args={[200, 200]} /><shadowMaterial opacity={.12} /></mesh>
      </Canvas></Suspense></SceneBoundary>
      <div className="sk-scene-note"><span className="sk-dot" />{stage}<span>Illustration / {data.label}</span></div>
    </aside>
    <main ref={main} className="sk-story">
      <section className="sk-beat" id="begin"><div className="sk-copy">
        <p className="sk-eyebrow">DAWIT BEKELE · MIGRATION WORK</p><h1>{data.title}<span className="sk-period">.</span></h1>
        <p className="sk-deck">I work from a runbook, a cutover checklist and a rollback plan.</p>
        <p>My first production outage was in 2014, at the university library. I dropped a table. It is why I care about rollbacks.</p>
        <div className="sk-proof"><strong>40 teams</strong><span>use the runbook whose first version I wrote and which I still own.</span></div>
        <a className="sk-inline" href="#contact">Planning a migration? Get in touch ↗</a>
        <div className="sk-footnote">{data.object}<br /><span>Local concept sketch · scroll to explore ↓</span></div>
      </div></section>
      <section className="sk-beat" id="work"><div className="sk-copy">
        <p className="sk-eyebrow">MIDDLE / WORKING ILLUSTRATION</p><h2>{data.middle}<span className="sk-period">.</span></h2>
        <p className="sk-deck">Scroll to move the model. Reverse it to see a way back.</p>
        <p>This is an illustration of moving between systems. It is not a diagram of Kestrel Freight’s systems or its migration method.</p>
        <button className="sk-button" onClick={() => setReverse(!reverse)} aria-pressed={reverse}>{reverse ? "Restore forward direction ↗" : "Reverse the illustration ↶"}</button>
        <div className="sk-proof"><strong>99.98%</strong><span>measured availability of the order API over the 26-month migration.</span></div>
        <details><summary>More about the migration</summary><p>There were two incidents during the migration, both internal and both under ten minutes. “Zero downtime” would overstate it.</p></details>
      </div></section>
      <section className="sk-beat" id="contact"><div className="sk-copy">
        <p className="sk-eyebrow">ENDING / THE NEXT CONVERSATION</p><h2>{data.closing}</h2>
        <p className="sk-deck">Planning to go independent in 2027.</p><p>If your company has a migration it is afraid of, write to me. Conference organisers are welcome too.</p>
        <a className="sk-contact" href="mailto:dawit@example.com">dawit@example.com ↗</a>
        <p className="sk-biography">Addis Ababa → Amsterdam, 2016 → Rotterdam, 2020.</p>
        <nav aria-label="Compare concepts" className="sk-compare">{Object.entries(concepts).map(([id, c]) => <a aria-current={id === kind ? "page" : undefined} key={id} href={`/sketch/${id}`}>{c.number} {c.title} ↗</a>)}</nav>
        <p className="sk-footnote">Concept sketch, not the finished site.<br />The full story, five work details and printable CV follow after the storyboard is agreed.</p>
      </div></section>
    </main>
    <footer className="sk-footer"><span>DAWIT BEKELE</span><span>LOCAL SKETCH / {data.number} — {Math.min(3, Math.floor(progress) + 1)} OF 3</span></footer>
  </div>;
}
export function RunbookSketch() { return <ConceptSketch kind="runbook" />; }
export function ChecklistSketch() { return <ConceptSketch kind="checklist" />; }
export function RollbackSketch() { return <ConceptSketch kind="rollback" />; }
