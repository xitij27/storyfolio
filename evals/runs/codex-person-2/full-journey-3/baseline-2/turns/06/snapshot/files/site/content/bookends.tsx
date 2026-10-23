import { Kicker, Title, Body, Note } from "@/components/story/chapter";
import { fixedWords as f, wording, type WordingId } from "./wording";
export function OpeningWords({version="a",review=false}:{version?:WordingId;review?:boolean}){const w=wording[version].opening;return <>
 <Kicker number={1}>{f.openingKicker}</Kicker><Title as={review?"h3":"h1"} id={review?undefined:"opening-title"}>{w.title}</Title><Body>{w.body}</Body>
 <div className="proof"><strong>{f.proofNumber}</strong><span>{f.proof}</span></div><a className="primary-link" href={`mailto:${f.email}`}>{w.action} <span aria-hidden>↗</span></a><Note>{f.audience}</Note><p className="scene-key"><span>Illustration</span> {f.openingScene}</p>
 </>;}
export function ClosingWords({version="a",review=false}:{version?:WordingId;review?:boolean}){const w=wording[version].closing;return <>
 <Kicker number={7}>{f.closingKicker}</Kicker><Title as={review?"h3":"h2"} id={review?undefined:"contact-title"}>{w.title}</Title><Body>{w.body}</Body><a className="contact-address" href={`mailto:${f.email}`}>{f.email} <span aria-hidden>↗</span></a><Note>{f.speaking}<br/>{f.talk}</Note><div className="cv-links"><a href="/cv">{f.cvView}</a><a href="/dawit-bekele-cv.html" download="dawit-bekele-cv.html">{f.cvDownload}</a></div><p className="scene-key"><span>Illustration</span> {f.closingScene}</p>
 </>;}
