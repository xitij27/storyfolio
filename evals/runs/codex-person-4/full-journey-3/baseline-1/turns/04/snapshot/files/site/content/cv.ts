import { person } from "./person";

const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);

export const cvStyles = `
*{box-sizing:border-box}body{margin:0;background:#e7e3da;color:#1c222a;font:16px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
a{color:inherit;text-underline-offset:3px}.cv-document{max-width:850px;margin:28px auto;padding:48px 60px;background:#fbf8f2;border:1px solid #cfc6b4}
h1{font:600 44px/1.1 Georgia,serif;margin:0 0 10px}h2{font:600 24px/1.2 Georgia,serif;margin:32px 0 14px;border-bottom:1px solid #cfc6b4;padding-bottom:8px}h3{font-size:17px;line-height:1.4;margin:20px 0 5px}p{margin:5px 0 12px}.cv-kicker{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#5f6872}.cv-meta{color:#5f6872;font-size:14px}.cv-item{margin-bottom:20px}ul{padding-left:20px}.cv-actions{max-width:850px;margin:0 auto;padding:20px 0 0;display:flex;flex-wrap:wrap;gap:12px;align-items:center}.cv-actions a,.cv-actions button{font:inherit;border:1px solid #b9b1a1;background:#fbf8f2;color:#1c222a;padding:10px 15px;border-radius:6px;text-decoration:none;cursor:pointer}a:focus-visible,button:focus-visible{outline:3px solid #c9741f;outline-offset:3px}
@media(max-width:720px){.cv-document{margin:12px;padding:28px 22px}h1{font-size:36px}.cv-actions{padding:14px 12px 0;font-size:14px}}
@page{size:A4;margin:17mm}
@media print{body{background:white;font-size:10.5pt;line-height:1.45}.cv-document{max-width:none;margin:0;padding:0;border:0;background:white}.cv-actions{display:none!important}h1{font-size:30pt}h2{font-size:17pt;margin-top:19pt;break-after:avoid}h3{font-size:11.5pt;break-after:avoid}.cv-meta{font-size:9.5pt}.cv-item{break-inside:avoid}a{text-decoration:none;color:#111}p{orphans:3;widows:3}}
`;

export function cvBody(): string {
  const text = escape;
  const dates = (from: number, to: number | null) => `${Math.floor(from)}–${to == null ? "present" : Math.floor(to)}`;
  return `<header><p class="cv-kicker">Migrations · databases · reliability</p><h1>${text(person.name)}</h1><p>Rotterdam · <a href="mailto:${text(person.contact.email)}">${text(person.contact.email)}</a></p><p>Going independent in 2027. Enquiries about migrations and conference talks.</p></header>
<section><h2>Migration experience</h2><p>Data-centre exit: 310 services, 14 waves, 26 months. I wrote and sequenced the plan; about 60 engineers across teams delivered it. Measured order API availability over those 26 months: 99.98%. Both data centres closed on schedule.</p><p>Daily working documents: the runbook, cutover checklist and rollback plan.</p></section>
<section><h2>Experience</h2>${[...person.work].reverse().map(work => `<div class="cv-item"><h3>${text(work.org)}</h3><p class="cv-meta">${text(work.role)} · ${text(work.place)} · ${dates(work.from, work.to)}</p><p>${text(work.did)}</p>${work.uses.length ? `<p class="cv-meta">${work.uses.map(text).join(" · ")}</p>` : ""}</div>`).join("")}</section>
<section><h2>Selected work and speaking</h2>${person.projects.map(project => `<div class="cv-item"><h3>${text(project.title)} <span class="cv-meta">· ${project.title === "Migration runbook" ? "2021–present" : project.title === "ferry" ? "maintainer since 2022" : project.year}</span></h3><p>${text(project.line)}</p><p>${text((project.more ?? "").replace(/ The scene is an illustration.*$/, "").replace(/ Illustration;.*$/, "").replace(/ Any drawing here.*$/, "").replace(/ This is our team's result\. Illustration;.*$/, " This is our team's result.").replace(/ No slides or video are embedded\.$/, ""))}</p></div>`).join("")}</section>
<section><h2>Education and learning</h2><div class="cv-item"><h3>BSc Electrical Engineering</h3><p>Entoto Technical University, Addis Ababa · 2009–2013.</p><p>My final-year project logged campus substation feeder load every second to an SD card. It taught me that data you cannot lose needs a second copy before it needs anything else.</p><p>Reading: Google SRE book; <em>Release It!</em> by Michael Nygard.</p></div></section>`;
}

export function cvHtml(): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Dawit Bekele — CV</title><style>${cvStyles}</style></head><body><main class="cv-document">${cvBody()}</main></body></html>`;
}
