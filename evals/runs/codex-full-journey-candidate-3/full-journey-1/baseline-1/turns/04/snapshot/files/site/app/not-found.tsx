import Link from 'next/link';
import {SiteNav} from '@/components/site/nav';
export default function NotFound(){return <><SiteNav/><main className="document"><p className="eyebrow">404 / MISSING ADDRESS</p><h1>This page isn’t here.</h1><p>The address may be incomplete or the page may have moved. These links will take you to Ada’s work and contact details.</p><div className="actions"><Link href="/">Go to the story</Link><Link href="/projects/mosslink">Explore Mosslink</Link><Link href="/cv">Read the CV</Link><a href="mailto:ada@example.com">Email Ada</a></div></main></>}
