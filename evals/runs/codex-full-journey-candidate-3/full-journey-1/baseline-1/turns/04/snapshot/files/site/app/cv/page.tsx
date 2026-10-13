import type {Metadata} from 'next';
import {SiteNav} from '@/components/site/nav';
import {cvMarkup} from '@/content/cv';
export const metadata:Metadata={title:'CV | Ada Mensah',description:'Printable CV: Mosslink firmware, bring-up fixture, working documents and evidence limits.'};
export default function CV(){return <><SiteNav/><main className="document"><div dangerouslySetInnerHTML={{__html:cvMarkup}}/><div className="download-actions"><h2>Read, print or save</h2><p>Use your browser’s Print command for a paper copy. The download is a complete HTML document you can read and print offline.</p><a href="/downloads/ada-mensah-cv.html" download>Download printable HTML CV ↧</a></div></main></>}
