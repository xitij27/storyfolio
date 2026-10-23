'use client';
import Link from 'next/link';
import {Story} from '@/components/story/story';
import {Chapter,Beat,Title,Body,Note} from '@/components/story/chapter';
import {useControl,useControls} from '@/components/story/controls';
import type {StoryBundle} from '@/components/story/types';
import {concepts,sketchStory,sketchFormations,type Concept} from './definition';
import './sketch.css';
function HiddenPiece(){return null;}
function Cutover(){const controls=useControls();const target=useControl('cutover')??0;return <div className="cutover-control"><span>Illustration · write target: {target?'Postgres 15':'Postgres 11'}</span><button onClick={()=>controls.set('cutover',target?0:1)}>{target?'Rehearse rollback':'Run cutover'}</button><small>Both copies remain connected. This is an illustration, not a live database.</small></div>;}
function Fallback(){return <svg className="concept-fallback" viewBox="0 0 400 130" role="img" aria-label="Illustration: writes split to old and new database; the old target remains available for rollback"><path d="M20 65H110L210 25H350M110 65L210 105H350" fill="none" stroke="currentColor" strokeWidth="3"/><text x="15" y="50">write</text><text x="235" y="20">Postgres 11</text><text x="235" y="95">Postgres 15</text></svg>;}
function makeBundle(id:Concept):StoryBundle{
 const c=concepts[id];return {story:sketchStory,formations:sketchFormations,faces:[],looks:[{id:'concept',name:c.name,ground:c.ground,ink:c.ink,faint:c.faint,accent:c.accent,surface:{color:c.ground,roughness:.8,glows:false},lights:{ambient:2,key:3,fill:1,rim:2},floor:'none',shadows:false}],copy:{railLabel:'Sketch chapters',lookLabel:'Appearance'},Piece:HiddenPiece,extras:[
 {chapter:'opening',load:()=>import('./worlds').then(m=>({default:m.makeWorld(id,'opening')}))},
 {chapter:'middle',load:()=>import('./worlds').then(m=>({default:m.makeWorld(id,'middle')}))},
 {chapter:'close',load:()=>import('./worlds').then(m=>({default:m.makeWorld(id,'close')}))}
 ]};}
const bundles={route:makeBundle('route'),bench:makeBundle('bench'),runbook:makeBundle('runbook')};
export function Sketch({id}:{id:Concept}){const c=concepts[id];return <main className={`concept concept-${id}`}><header className="concept-header"><Link href="/">DB / CONCEPTS</Link><span>{c.number} — {c.name}</span><a href="#close">Contact ↗</a></header><Story bundle={bundles[id]}>
<Chapter id="opening"><Beat story={sketchStory} id="opening.one" fallback={<Fallback/>}><p className="concept-eyebrow">Dawit Bekele / Staff Platform Engineer</p><Title as="h1" id="opening-title">{c.opening}</Title><Body>In 2014, I dropped a table in the university library’s production catalogue. The outage lasted six hours. It is why I care about rollbacks.</Body><Note>Addis Ababa → Amsterdam → Rotterdam</Note><p className="concept-proof">310 services · 14 waves · 26 months<br/>99.98% Order API availability over the programme</p><a href="#middle">Scroll to the working illustration ↓</a><Note>Concept sketch · original illustration</Note></Beat></Chapter>
<Chapter id="middle"><Beat story={sketchStory} id="middle.one" fallback={<Fallback/>}><p className="concept-eyebrow">Kestrel Freight / Orders database / 2022</p><Title as="h2" id="middle-title">{c.middle}</Title><Body>A 4 TB orders database. Postgres 11 to 15. Logical replication, dual writes and hourly checksum comparisons for three weeks. I led the upgrade with one database engineer.</Body><Cutover/><details><summary>Read the approach</summary><p>Reads moved first, then writes. We kept the old cluster warm for a month as the way back. The upgrade needed no maintenance window. I maintain ferry and wrote its cutover command; a former colleague created it.</p></details></Beat></Chapter>
<Chapter id="close"><Beat story={sketchStory} id="close.one" fallback={<Fallback/>}><p className="concept-eyebrow">Migration work / Conference talks</p><Title as="h2" id="close-title">{c.ending}</Title><Body>I’m going independent in 2027. If you’re planning a migration, or organising a conference, write to me.</Body><a className="concept-contact" href="mailto:dawit@example.com">dawit@example.com ↗</a><Note>Illustration · a connected system, with its return path intact.</Note><nav className="concept-options" aria-label="Other concepts">{(Object.keys(concepts) as Concept[]).map(k=><a key={k} href={`/sketch/${k}`} aria-current={k===id?'page':undefined}>{concepts[k].number} {concepts[k].name}</a>)}</nav></Beat></Chapter>
</Story></main>;}
export function RouteSketch(){return <Sketch id="route"/>;} export function BenchSketch(){return <Sketch id="bench"/>;} export function RunbookSketch(){return <Sketch id="runbook"/>;}
