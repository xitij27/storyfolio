import type {Metadata} from 'next';
import {copy} from '@/content/copy';
import './globals.css';
export const metadata:Metadata={...copy.metadata,metadataBase:new URL("http://127.0.0.1:3000"),openGraph:{title:'Ada Mensah | Embedded firmware',description:copy.metadata.description,type:'website',locale:'en_US',images:[{url:'/share-preview.png',width:1200,height:630,alt:'Ada Mensah, embedded firmware, with an explanatory fixture illustration for Mosslink.'}]},twitter:{card:'summary_large_image',title:copy.metadata.title,description:copy.metadata.description,images:['/share-preview.png']}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang={copy.lang}><body>{children}</body></html>}
