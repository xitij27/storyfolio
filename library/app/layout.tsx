import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

// The gallery's two faces, served with the site itself, so nothing waits on a font service (OFL, see fonts/).
const serif = localFont({ src: "./fonts/source-serif-4-latin-wght-normal.woff2", variable: "--face-serif", weight: "200 900", display: "swap" });
const sans = localFont({ src: "./fonts/public-sans-latin-wght-normal.woff2", variable: "--face-sans", weight: "100 900", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Storyfolio: a portfolio told in 3D", template: "%s | Storyfolio" },
  description: "A made-up person's portfolio told on a sheet of paper, a map or a pop-up book: watch each one whole, or any chapter on its own.",
};

export const viewport: Viewport = { themeColor: "#1b2531", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
