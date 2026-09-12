import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import SiteChrome from "./ui/site-chrome";

const bodyFont = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Paglu | Difficult ideas, made clear",
  description:
    "Visual notes, practical explanations, and revision guides for AI, machine learning, transformers, and generative video.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable}`}
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var r=document.documentElement;r.dataset.palette=localStorage.getItem('ap-palette')||'canopy';r.dataset.mode=localStorage.getItem('ap-mode')||((matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');r.dataset.layout=localStorage.getItem('ap-layout')||'map'}catch(e){}})()`,
          }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
