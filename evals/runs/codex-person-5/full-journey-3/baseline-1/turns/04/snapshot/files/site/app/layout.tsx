import type { Metadata } from "next";
import { person } from "@/content/person";
import { site } from "@/content/site";
import "./globals.css";

const description = "Migration plans, cutover checklists and rollback plans. Work by Dawit Bekele, for engineering leaders planning a migration and conference organisers.";

export const metadata: Metadata = {
  // Local preview origin only; no public domain has been chosen.
  metadataBase: new URL("http://localhost:3000"),
  title: `${person.name} · Migrations`,
  description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: person.name,
    title: `${person.name} · Migrations`,
    description,
  },
  twitter: { card: "summary_large_image", title: `${person.name} · Migrations`, description },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang={site.lang ?? "en"}><body>{children}</body></html>;
}
