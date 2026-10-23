import type { Metadata } from "next";
import { copy } from "@/content/copy";
import "./globals.css";

export const metadata: Metadata = copy.metadata;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang={copy.lang}><body>{children}</body></html>;
}
