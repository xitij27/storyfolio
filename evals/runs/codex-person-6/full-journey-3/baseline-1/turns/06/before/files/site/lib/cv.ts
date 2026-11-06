import { person } from "@/content/person";

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]!));
const date = (n: number) => Number.isInteger(n) ? String(n) : `${new Intl.DateTimeFormat("en", {month:"short",timeZone:"UTC"}).format(new Date(Date.UTC(Math.floor(n), Math.round((n % 1) * 12), 1)))} ${Math.floor(n)}`;
export const cvStyles = `
.cv { max-width:820px; margin:auto; padding:48px; background:#eaf0f5; color:#13202c; font:15px/1.6 system-ui,sans-serif; }
.cv h1 { font:48px/1.1 Georgia,serif; margin:0 0 12px; }
.cv h2 { font:26px/1.2 Georgia,serif; margin:30px 0 12px; padding-top:18px; border-top:1px solid #b9c6d2; }
.cv h3 { font-size:17px; line-height:1.35; margin:20px 0 6px; }
.cv p { margin:6px 0 12px; }
.cv .meta { color:#435565; font-size:14px; }
.cv a { color:inherit; text-underline-offset:3px; overflow-wrap:anywhere; }
.cv article { break-inside:avoid; }
.cv .cv-role { color:#435565; font-size:18px; }
@page { size:A4; margin:16mm; }
@media(max-width:600px) { .cv { padding:28px 22px; } .cv h1 { font-size:36px; } }
@media print { body { background:white!important; margin:0; } .cv { max-width:none; padding:0; font-size:10pt; line-height:1.4; background:white; color:black; } .cv h1 { font-size:28pt; } .cv h2 { font-size:16pt; margin-top:18px; } .cv h3 { font-size:11pt; } .cv .meta { font-size:9pt; } .cv-actions { display:none!important; } .cv a { text-decoration:none; } }
`;
export function cvBody() {
  return `<header><h1>${esc(person.name)}</h1><p class="cv-role">${esc(person.role)} · Rotterdam</p><p>Migration planning, database cutovers and reliability.</p><p><a href="mailto:${esc(person.contact.email)}">${esc(person.contact.email)}</a></p></header>
<section><h2>Experience</h2>${[...person.work].reverse().map(w => `<article><h3>${esc(w.org)} — ${esc(w.role)}</h3><p class="meta">${esc(w.place)} · ${date(w.from)}–${w.to === null ? "present" : date(w.to)}</p><p>${esc(w.did)}</p></article>`).join("")}</section>
<section><h2>Selected work and speaking</h2>${person.projects.map(p=>`<article><h3>${esc(p.title)}</h3><p class="meta">${esc(p.tags.filter(t=>t!=="Illustration").join(" · "))}</p><p>${esc(p.line)}</p><p>${esc(p.more??"")}</p></article>`).join("")}</section>
<section><h2>Education</h2>${person.study.map(s=>`<article><h3>${esc(s.degree)} in ${esc(s.field)}</h3><p>${esc(s.place)}, ${esc(s.city??"")} · ${s.from}–${s.to}</p><p>${esc(s.note??"")}</p></article>`).join("")}</section>
<section><h2>Working practice</h2><p>The runbook, the cutover checklist and the rollback plan. A postmortem when something has gone wrong.</p><p>Influences: the Google SRE book and <em>Release It!</em> by Michael Nygard.</p></section>`;
}
export function cvDocument() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(person.name)} — CV</title><style>body{margin:0;background:#eaf0f5}${cvStyles}</style></head><body><main class="cv">${cvBody()}</main></body></html>`;
}
