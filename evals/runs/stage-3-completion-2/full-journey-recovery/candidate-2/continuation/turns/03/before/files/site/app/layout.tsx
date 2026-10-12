import type { Metadata } from "next";
import { copy } from "@/content/copy";
import "./globals.css";

export const metadata: Metadata = {title:"Ada Mensah — local firmware portfolio concepts",description:"Local concept sketches connecting firmware decisions to physical observations."};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang={copy.lang}><body>{children}</body></html>;
}
