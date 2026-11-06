import type { Metadata } from "next";
import { person } from "@/content/person";
import { site } from "@/content/site";
import "./globals.css";

// Every page is titled with the person's name and described by what they do,
// unless it gives a title of its own (a project's page, the CV).
export const metadata: Metadata = {
  title: person.name,
  description: "Platform engineer. Migration planning, database cutovers and reliability. Author and owner of a runbook used by 40 teams.",
  openGraph: { title: person.name, description: "Migration planning, database cutovers and reliability.", type: "website", locale: "en_GB", images: [{url: "/share.png", width:1200, height:630, alt:"Dawit Bekele, platform engineer. Migration runbook: first version, ongoing ownership, 40 teams using it."}] },
  twitter: { card:"summary_large_image", title:person.name, description:"Migration planning, database cutovers and reliability.", images:["/share.png"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang={site.lang ?? "en"}><body>{children}</body></html>;
}
