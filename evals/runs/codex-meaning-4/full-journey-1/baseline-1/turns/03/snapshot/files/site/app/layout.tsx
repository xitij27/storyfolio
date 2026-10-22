import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Ada Mensah — local concept sketches',description:'Mosslink firmware portfolio: local concept studies.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
