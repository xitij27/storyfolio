from pathlib import Path

def put(path, text): Path(path).write_text(text)
put('content/story.ts', '''import type { StoryDef, BeatIdOf } from "../lib/story/story.ts";
// Stop 4: the three approved spine beats. The remaining four join after look review.
export const story = {
  pieces: 6,
  chapters: [
    { id: "scope", number: 1, name: "Scope", role: "opening", beats: [{ id: "scope.opening", height: 1 }] },
    { id: "transition", number: 4, name: "Transition", role: "how", beats: [{ id: "transition.diagram", height: 1.5 }] },
    { id: "review", number: 6, name: "Review", role: "close", beats: [{ id: "review.close", height: 1 }] },
  ],
} as const satisfies StoryDef;
export type BeatId = BeatIdOf<typeof story>;
''')
put('content/copy.ts', '''export const copy = {
  lang: "en",
  metadata: {
    title: "Ada Mensah — Firmware and the bench",
    description: "Firmware, power-state scheduling and the bring-up fixture: Ada Mensah's contribution to Mosslink, with the evidence limits visible.",
    openGraph: { title: "Ada Mensah — Firmware and the bench", description: "How does a firmware decision become a measurable signal?", images: ["/assets/share-card.svg"] },
  },
  railLabel: "Chapters", lookLabel: "Appearance", fpsLabel: "Frames per second",
  beats: {
    "scope.opening": { title: "Ada Mensah", body: "Firmware is code that controls a physical device.", note: "I wrote the firmware, scheduled the power states and built the bring-up fixture." },
    "transition.diagram": { title: "Reading transitions", body: "Sleep → Measure → Transmit → Sleep. This teaching loop explains a transition between states.", note: "Explanatory schematic, not a measured trace or a firmware specification." },
    "review.close": { title: "Code beside evidence", body: "I connect firmware decisions to bench observations through power-state scheduling and the bring-up fixture, while keeping the evidence limits visible.", note: "Two years is a projection from bench current readings and an assumed reporting cycle." },
  },
};
''')
put('content/looks.ts', '''import type { Look } from "../lib/story/looks.ts";
export const looks = [
  { id: "light", name: "Bench paper", ground: "#f2efe6", ink: "#282b29", faint: "#62635c", accent: "#87551c", surface: { color: "#fffaf0", roughness: 1, glows: false }, lights: { ambient: 1.5, key: 2, fill: .5, rim: .6 }, floor: "none", shadows: true },
  { id: "dark", name: "Instrument paper", ground: "#202523", ink: "#f4f0e5", faint: "#bbbeb4", accent: "#e5b875", surface: { color: "#353c38", roughness: 1, glows: false }, lights: { ambient: 1.5, key: 2, fill: .5, rim: .6 }, floor: "none", shadows: true },
  { id: "review", name: "Review sheet", ground: "#e9edf0", ink: "#25313a", faint: "#566773", accent: "#305d83", surface: { color: "#f7f9fa", roughness: 1, glows: false }, lights: { ambient: 1.5, key: 2, fill: .5, rim: .6 }, floor: "none", shadows: true },
] as const satisfies readonly Look[];
''')
put('content/formations.ts', '''import { blankFormation, type BeatFormation, type Formation, type Pose } from "../lib/story/formation.ts";
import { measure } from "../lib/story/layouts.ts";
import { story, type BeatId } from "./story.ts";
function formation(pieces: Pose[], turn: [number, number] = [-.08, -.16]): Formation {
  const bounds = measure(pieces);
  return { ...blankFormation(story.pieces), pieces, span: bounds.span * 1.05, rise: bounds.rise * 1.05, anchor: [.48, .02], turn, near: 5, floor: -4 };
}
function table(depth: number): Pose[] {
  return Array.from({ length: 6 }, (_, i) => ({ position: [0, (2.5-i)*.53, i*depth], rotation: [0,0,0], size: [3.65,.46] }));
}
const loop: Pose[] = Array.from({ length: 6 }, (_, i) => {
  const p = [[-1.15,1.15],[1.15,1.15],[0,-1.05]][Math.floor(i/2)];
  return { position: [p[0],p[1]-(i%2)*.48,0], rotation: [0,0,0], size: [2,.42] };
});
export const formations = {
  "scope.opening": { rest: formation(table(0)), within: formation(table(.045)) },
  "transition.diagram": { rest: formation(loop, [0,-.08]) },
  "review.close": { rest: formation(table(.045)), within: formation(table(0)) },
} satisfies Record<BeatId, BeatFormation>;
''')
put('content/faces.ts', '''import type { FaceDef } from "@/components/story/types";
import { story } from "./story";
const table = ["Scope / Firmware", "Responsibilities / Ada + colleague", "State / Power scheduling", "Transition / Teaching diagram", "Observation / Bench evidence", "Review / Evidence limits"];
const transition = ["Sleep", "→ Measure", "Measure", "→ Transmit", "Transmit", "→ Sleep"];
export const faces: FaceDef[] = story.chapters.flatMap(chapter => chapter.beats.flatMap(beat => Array.from({ length: 6 }, (_, piece) => ({
  id: `${beat.id}-${piece}`, beat: beat.id, piece,
  draw(ctx, width, height, look) {
    ctx.fillStyle = look.surface.color; ctx.fillRect(0,0,width,height);
    ctx.strokeStyle = look.faint; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(width*.13,0); ctx.lineTo(width*.13,height); ctx.moveTo(0,height*.93); ctx.lineTo(width,height*.93); ctx.stroke();
    ctx.fillStyle = look.accent; ctx.font = `${height*.24}px monospace`; ctx.fillText(String(piece+1).padStart(2,"0"),width*.035,height*.58);
    ctx.fillStyle = look.ink; ctx.font = `${height*.27}px system-ui`; ctx.fillText(beat.id === "transition.diagram" ? transition[piece] : table[piece],width*.17,height*.58);
  },
}))));
''')
put('content/extras.ts','export const extras = [];\n')
put('content/links.ts','export const links = [];\n')
put('content/checks.json','{ "staticPhone": true, "staticReduced": true }\n')
put('app/page.tsx', '''import { Chapter, Beat, Kicker, Title, Body, Note } from "@/components/story/chapter";
import { Experience } from "@/content/experience";
import { story } from "@/content/story";
import { copy } from "@/content/copy";
const contact = <div className="contact-links"><a href="mailto:ada@example.com">Email Ada <span aria-hidden="true">↗</span></a><a href="/ada-mensah-cv.html" download>Download CV <span className="file-type">HTML ↓</span></a></div>;
function Diagram({ fixture = false }: { fixture?: boolean }) {
  return <figure className="diagram-preview">
    {/* Supplied local drawings have intrinsic dimensions and need no optimizer. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={fixture ? "/assets/bring-up-fixture.svg" : "/assets/power-states.svg"} width="720" height="620" alt={fixture ? "Explanatory bring-up diagram linking firmware command, a generic board, the fixture and a bench observation. It contains no circuit detail." : "Explanatory diagram: Sleep leads to Measure, then Transmit, then back to Sleep. No durations or measured current values are shown."} />
    <figcaption>{fixture ? "Explanatory schematic, not a photograph or a circuit diagram." : "Explanatory schematic, not a measured trace or a firmware specification."}</figcaption>
    <a href={fixture ? "/assets/bring-up-fixture.svg" : "/assets/power-states.svg"}>{fixture ? "View fixture schematic" : "View power-state schematic"} <span aria-hidden="true">↗</span></a>
  </figure>;
}
export default function Home() {
  return <main id="content"><a className="story-skip" href="#scope">Skip to content</a><Experience>
    <header className="site-header"><a className="wordmark" href="#scope">AM<span> / STATE BY STATE</span></a><div className="header-contact">{contact}<a href="#review">Skip to contact</a></div></header>
    <nav className="spine-nav" aria-label="Spine chapters"><a href="#scope">01 Scope</a><a href="#transition">04 Transition</a><a href="#review">06 Review</a><span>Spine study · 3 of 7 beats</span></nav>
    {story.chapters.map((chapter, index) => <Chapter key={chapter.id} id={chapter.id}>
      {chapter.beats.map(beat => { const words = copy.beats[beat.id]; return <Beat key={beat.id} story={story} id={beat.id}>
        <Kicker number={chapter.number}>{chapter.name}</Kicker>
        <Title id={`${chapter.id}-title`} as={index === 0 ? "h1" : "h2"}>{words.title}</Title>
        {index === 0 && <p className="opening-question">How does a firmware decision become a measurable signal?</p>}
        <Body>{words.body}</Body><Note>{words.note}</Note>
        {index === 0 && <><p className="project-label">Mosslink / Environmental sensor</p>{contact}<Diagram fixture /></>}
        {index === 1 && <Diagram />}
        {index === 2 && <><Note>The longest run was 72 hours.</Note><Note>One preliminary emissions check passed. Full qualification is unfinished.</Note>{contact}<a className="back-link" href="#scope">Back to Scope ↑</a></>}
      </Beat>; })}
    </Chapter>)}
    <footer className="site-footer">Ada Mensah · Firmware and the bench <span>Local spine review / Choose an appearance above</span></footer>
  </Experience></main>;
}
''')
put('app/not-found.tsx','''export default function NotFound() { return <main className="missing-page"><p>404 / Missing address</p><h1>This page is not here.</h1><a href="/">Home</a> · <a href="mailto:ada@example.com">Email Ada</a></main>; }
''')
# Narrow / reduced detection before Scene is rendered or imported.
p=Path('components/story/story.tsx'); s=p.read_text().replace('useState, type CSSProperties','useState, useSyncExternalStore, type CSSProperties')
s=s.replace('export function Story(','''const staticQuery = "(max-width: 767px), (prefers-reduced-motion: reduce)";
function subscribeStatic(notify: () => void) {
  const media = window.matchMedia(staticQuery);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}
export function Story(''')
s=s.replace('const webgl = useWebGLSupported();','const staticMode = useSyncExternalStore(subscribeStatic, () => window.matchMedia(staticQuery).matches, () => true);\n  const webgl = useWebGLSupported();').replace('const on = webgl === true && !failed;', 'const on = !staticMode && webgl === true && !failed;')
p.write_text(s)
p=Path('scripts/check-lib.mjs'); s=p.read_text().replace('"--touch", "--expect-scene=on"','"--touch", probes.staticPhone ? "--expect-scene=off" : "--expect-scene=on", ...(probes.staticPhone ? ["--hidden=canvas"] : [])').replace('"--reduced-motion", "--expect-scene=on", "--positions=start,mid,end", "--assert-still=300"','"--reduced-motion", probes.staticReduced ? "--expect-scene=off" : "--expect-scene=on", "--positions=start,mid,end", ...(probes.staticReduced ? ["--hidden=canvas"] : ["--assert-still=300"])'); p.write_text(s)
