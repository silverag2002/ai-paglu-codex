"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";

type Palette = "canopy" | "mint" | "glacier" | "ember" | "circuit";
type Mode = "light" | "dark";
type Layout = "map" | "index";

const paletteOptions: { id: Palette; name: string; note: string }[] = [
  { id: "canopy", name: "Canopy lab", note: "Grounded · curious" },
  { id: "mint", name: "Midnight mint", note: "Fresh · focused" },
  { id: "glacier", name: "Glacier signal", note: "Clear · precise" },
  { id: "ember", name: "Ember studio", note: "Warm · energetic" },
  { id: "circuit", name: "Violet circuit", note: "Electric · technical" },
];

function SunIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.25" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M15.7 4.3l-1.4 1.4M5.7 14.3l-1.4 1.4" /></svg>;
}

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [palette, setPalette] = useState<Palette>("canopy");
  const [mode, setMode] = useState<Mode>("light");
  const [layout, setLayout] = useState<Layout>("map");
  const [studioOpen, setStudioOpen] = useState(false);
  const preferencesReady = useRef(false);

  function openStudio() {
    const root = document.documentElement;
    setPalette((root.dataset.palette as Palette) || "canopy");
    setMode((root.dataset.mode as Mode) || "light");
    setLayout((root.dataset.layout as Layout) || "map");
    preferencesReady.current = true;
    setStudioOpen(true);
  }

  useEffect(() => {
    if (!preferencesReady.current) return;
    const root = document.documentElement;
    root.dataset.palette = palette;
    root.dataset.mode = mode;
    root.dataset.layout = layout;
    localStorage.setItem("ap-palette", palette);
    localStorage.setItem("ap-mode", mode);
    localStorage.setItem("ap-layout", layout);
  }, [palette, mode, layout]);

  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="AI Paglu home">
          <span className="mark" aria-hidden="true"><i /><i /><i /></span><span>ai paglu</span><b>.</b>
        </Link>
        <nav aria-label="Primary navigation">
          <Link className={active("/library") ? "active" : ""} href="/library">Library</Link>
          <Link className={active("/paths") ? "active" : ""} href="/paths">Learning paths</Link>
          <Link className={active("/about") ? "active" : ""} href="/about">About</Link>
        </nav>
        <button className="studio-trigger" type="button" onClick={openStudio} aria-expanded={studioOpen}>
          <span className="theme-dot" />Tune the page
        </button>
      </header>

      {children}

      <footer className="site-footer">
        <div><Link className="wordmark" href="/"><span>ai paglu</span><b>.</b></Link><p>Hard ideas, patiently unpacked.</p></div>
        <div className="footer-links"><Link href="/library">Library</Link><Link href="/paths">Paths</Link><Link href="/about">About</Link></div>
        <div className="social-links"><a href="https://github.com/silverag2002" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/ankit-gupta9/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
      </footer>

      {studioOpen && <button className="studio-backdrop" aria-label="Close theme controls" onClick={() => setStudioOpen(false)} />}
      <aside className={`theme-studio ${studioOpen ? "open" : ""}`} aria-label="Theme controls" aria-hidden={!studioOpen} inert={!studioOpen}>
        <div className="studio-header"><div><span>Page tuner</span><p>Choose the atmosphere, keep the structure.</p></div><button type="button" onClick={() => setStudioOpen(false)} aria-label="Close theme controls">×</button></div>
        <fieldset><legend>Color character</legend><div className="palette-options">
          {paletteOptions.map((item) => (
            <button type="button" key={item.id} className={`${item.id} ${palette === item.id ? "selected" : ""}`} onClick={() => setPalette(item.id)} aria-pressed={palette === item.id}>
              <span><i /><i /><i /></span><b>{item.name}</b><small>{item.note}</small>
            </button>
          ))}
        </div></fieldset>
        <fieldset><legend>Light in the room</legend><div className="segmented-control"><button type="button" className={mode === "light" ? "selected" : ""} onClick={() => setMode("light")}><SunIcon /> Light</button><button type="button" className={mode === "dark" ? "selected" : ""} onClick={() => setMode("dark")}><span aria-hidden="true">◐</span> Dark</button></div></fieldset>
        <fieldset><legend>Library layout</legend><div className="segmented-control"><button type="button" className={layout === "map" ? "selected" : ""} onClick={() => setLayout("map")}>Visual map</button><button type="button" className={layout === "index" ? "selected" : ""} onClick={() => setLayout("index")}>Quiet index</button></div></fieldset>
        <p className="studio-note">Your choices follow you across every page on this device.</p>
      </aside>
    </div>
  );
}
