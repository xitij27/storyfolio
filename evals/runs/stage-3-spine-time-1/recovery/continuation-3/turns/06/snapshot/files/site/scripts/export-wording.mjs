import ts from 'typescript';
import {readFile,writeFile} from 'node:fs/promises';
// Export the same review data the local page renders; no prose retyping.
async function compile(path,imports={}){
 const source=await readFile(path,'utf8');
 const result=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}});
 const output={};new Function('exports','require',result.outputText)(output,name=>{if(name in imports)return imports[name];throw new Error(`Unexpected import: ${name}`)});return output;
}
const copy=await compile('content/copy.ts');
const {wordingVersions,wordingContext:c}=await compile('content/wording.ts',{'./copy':copy});
let doc=`# Whole-beat wording review\n\nStatus: **Opening A and Closing A selected by the user**. Aluminium is selected. The chosen whole beats are applied word for word. Actual final experiential review remains pending, including real-phone scrolling. Generated from the same data as the local /wording page.\n\nRecommend **Opening A + Closing A**: concrete firmware/fixture contribution first; the stated lesson answers the question at the end. The user may mix versions or supply their own wording. Keep confirmed facts and limits. After choice, apply the chosen whole beat word for word and align share-preview wording if the opening title changes.\n\nEach opening below includes its heading, body, fixed question, actions and explanatory note. Each closing includes its heading, body, fixed observation caveat and actions. Global fixed context is Main navigation: Ada Mensah / Embedded firmware; Story; Mosslink; CV; Email. Chapter navigation: 1 Prepare, 2 Command, 3 Access, 4 Observe, 5 Record. Footer: Ada Mensah · Embedded firmware; Mosslink; Download CV; Email. Geometry is explanatory and its seven conceptual role labels stay present.\n`;
for(const v of wordingVersions){doc+=`\n## Version ${v.id} — ${v.name}${v.recommended?' (recommended)':''}\n\n### Complete opening ${v.id}\n\n1 / Prepare\n\n${c.person}\n\n**${v.opening.title}**\n\n${v.opening.body}\n\n${c.question}\n\nActions: [Inspect the fixture ↓](/#access) · [Evidence & contact](/#record) · [Download HTML CV](/cv.html)\n\n${c.openingNote}\n\n### Complete closing ${v.id}\n\n5 / Record\n\n**${v.closing.title}**\n\n${v.closing.body}\n\n${c.closingNote}\n\nActions: [ada@example.com ↗](mailto:ada@example.com) · [View / print CV](/cv.html) · [Download HTML CV ↓](/cv.html) · [Read the Mosslink project](/projects/mosslink) · [Back to the start ↑](/#prepare)\n`;}
doc+='\n## Choice\n\nOpening: **A**. Closing: **A**. Explicit user instruction: “Use the recommended wording you showed for each of those choices.” This selects the recommended A/A, not an actual final site review. Contact links are links only; no mail was sent. Everything remains local.\n';
await writeFile('../docs/story/wording.md',doc);
console.log('Exported six complete beats to docs/story/wording.md');
