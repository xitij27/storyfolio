import { person } from "./person";
import { workSlugs, workFor } from "./work";
export const cvIntro = "Migrations, databases, reliability. Going independent in 2027; contact for planned migrations and conference talks.";
const periods = ["2013–2016", "March 2016 – July 2020", "August 2020 – present"];
export const cvSections = [
  {title:"Experience",items:[...person.work].map((job,i)=>({heading:`${job.role} · ${job.org}`,meta:`${job.place} · ${periods[i]}`,text:job.did})).reverse()},
  {title:"Selected work",items:workSlugs.map(slug=>{const work=workFor(slug)!;return {heading:work.title,meta:work.period,text:`${work.line} ${work.more}`};})},
  {title:"Education",items:[{heading:"BSc Electrical Engineering · Entoto Technical University",meta:"Addis Ababa · 2009–2013",text:"Final-year project: a microcontroller data logger for the campus substation, sampling feeder load every second to an SD card."}]},
  {title:"Tools and practices",items:person.skills.map(group=>({heading:group.group,meta:"",text:group.items.join(", ")}))},
  {title:"Learning influences",items:[{heading:"Google SRE book; Release It! by Michael Nygard",meta:"",text:"The library outage I caused in 2014 is why I care about rollbacks."}]},
];
export const cvPrintStyles = `*{box-sizing:border-box}body{margin:0;background:#fff;color:#162536;font:11pt/1.5 system-ui,sans-serif}main{max-width:820px;margin:auto;padding:44px 38px}h1{font:700 30pt Georgia,serif;margin:0 0 6px}h2{font:700 18pt Georgia,serif;margin:26px 0 12px;border-bottom:1px solid #ccd5df;padding-bottom:6px}h3{font-size:11pt;margin:12px 0 2px}p{margin:4px 0 9px}.meta{color:#495c6e;font-size:10pt}a{color:inherit}article{break-inside:avoid}@page{size:A4;margin:16mm}@media print{h2,h3{break-after:avoid}main{padding:0;max-width:none}a{text-decoration:none}}`;
const escape=(value:string)=>value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]!));
export function cvDownloadHtml(){return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dawit Bekele — CV</title><style>${cvPrintStyles}</style></head><body><main><h1>${escape(person.name)}</h1><p>${escape(person.role)} · Rotterdam</p><p><a href="mailto:${escape(person.contact.email)}">${escape(person.contact.email)}</a></p><p>${escape(cvIntro)}</p>${cvSections.map(section=>`<section><h2>${escape(section.title)}</h2>${section.items.map(item=>`<article><h3>${escape(item.heading)}</h3>${item.meta?`<p class="meta">${escape(item.meta)}</p>`:""}<p>${escape(item.text)}</p></article>`).join("")}</section>`).join("")}</main></body></html>`;}
