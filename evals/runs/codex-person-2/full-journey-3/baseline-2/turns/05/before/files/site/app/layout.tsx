import type { Metadata } from "next";
import { copy } from "@/content/copy";
import "./globals.css";

export const metadata: Metadata = {
  ...copy.metadata,
  metadataBase: new URL("http://localhost:3000"),
  icons: {icon:"/icon.svg"},
  openGraph: {title:copy.metadata.title,description:copy.metadata.description,type:"website",locale:"en_GB",images:[{url:"/share-preview.png",width:1200,height:630,alt:"Dawit Bekele — migrations, reliability and a way back; original split-path illustration."}]},
  twitter:{card:"summary_large_image",title:copy.metadata.title,description:copy.metadata.description,images:["/share-preview.png"]},
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang={copy.lang}><body>{children}</body></html>;
}
