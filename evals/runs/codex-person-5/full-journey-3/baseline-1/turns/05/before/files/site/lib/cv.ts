import { cv, cvStyles } from "@/content/cv";

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

/** Fully self-contained HTML; no stylesheets, scripts, fonts or image requests. */
export function downloadableCV(): string {
  const e = escapeHtml;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${e(cv.name)} · CV</title><style>body{margin:0;box-sizing:border-box}*{box-sizing:inherit}${cvStyles}</style></head>
<body><main class="cv-page"><div class="cv-toolbar"><p>Use your browser’s Print command to print this CV or save it as a PDF.</p></div><article class="cv-document">
<header><h1>${e(cv.name)}</h1><p class="cv-focus">${e(cv.focus)}</p><p class="cv-contact">${e(cv.location)} · <a href="mailto:${e(cv.email)}">${e(cv.email)}</a></p><p>${e(cv.summary)}</p></header>
${cv.sections.map(section => `<section><h2>${e(section.title)}</h2>${section.entries.map(entry => `<div><h3>${e(entry.title)}</h3>${entry.meta ? `<p class="cv-meta">${e(entry.meta)}</p>` : ""}${entry.paragraphs.map(p => `<p>${e(p)}</p>`).join("")}</div>`).join("")}</section>`).join("\n")}
</article></main></body></html>`;
}
