"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Palette = "glacier" | "ember" | "canopy";
type Mode = "light" | "dark";
type Layout = "map" | "index";

const categories = ["All", "Foundations", "Models", "Vision & motion", "Build notes"] as const;

const topics = [
  { title: "Why attention works", summary: "Build the intuition from weighted retrieval before touching the matrix notation.", category: "Models", format: "Visual guide", time: "9 min", level: "Start here", accent: "blue" },
  { title: "Gradient descent, seen from above", summary: "A geometric tour of loss surfaces, step size, momentum, and the reasons training can stall.", category: "Foundations", format: "Animated note", time: "7 min", level: "Foundational", accent: "orange" },
  { title: "Diffusion is controlled destruction", summary: "Follow an image into noise and learn how a model discovers the path back.", category: "Vision & motion", format: "Explainer", time: "12 min", level: "Intermediate", accent: "green" },
  { title: "A tiny transformer in 120 lines", summary: "A readable implementation that keeps every tensor shape visible and every shortcut explained.", category: "Build notes", format: "Code lab", time: "18 min", level: "Build it", accent: "violet" },
  { title: "Tokenization changes the problem", summary: "See how text becomes model input, why vocabulary choices matter, and where meaning gets split.", category: "Foundations", format: "Field note", time: "6 min", level: "Start here", accent: "red" },
  { title: "Motion without a camera", summary: "A practical map of temporal consistency, latent motion, and conditioning in video models.", category: "Vision & motion", format: "Concept map", time: "11 min", level: "Intermediate", accent: "cyan" },
];

const paths = [
  { name: "Understand neural networks", progress: "5 notes", status: "Start with the machinery", tone: "path-blue" },
  { name: "Read a transformer", progress: "7 notes", status: "From tokens to logits", tone: "path-orange" },
  { name: "Make images move", progress: "4 notes", status: "Diffusion to video", tone: "path-green" },
];

const recall = [
  ["What does a query vector represent?", "What the current token is looking for in the available context."],
  ["Why add positional information?", "Attention alone treats tokens like an unordered set, so position must be supplied."],
  ["What does temperature change?", "It reshapes the probability distribution, controlling how concentrated or varied sampling becomes."],
];

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.25" /><path d="m12.5 12.5 4 4" /></svg>;
}

function SunIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.25" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M15.7 4.3l-1.4 1.4M5.7 14.3l-1.4 1.4" /></svg>;
}

export default function HomeExperience() {
  const [palette, setPalette] = useState<Palette>("glacier");
  const [mode, setMode] = useState<Mode>("light");
  const [layout, setLayout] = useState<Layout>("map");
  const [studioOpen, setStudioOpen] = useState(false);
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const preferencesReady = useRef(false);

  function openStudio() {
    const root = document.documentElement;
    setPalette((root.dataset.palette as Palette) || "glacier");
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

  const visibleTopics = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return topics.filter((topic) => {
      const matchesCategory = category === "All" || topic.category === category;
      const matchesQuery = !needle || `${topic.title} ${topic.summary} ${topic.category}`.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="AI Paglu home">
          <span className="mark" aria-hidden="true"><i /><i /><i /></span>
          <span>ai paglu</span><b>.</b>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#library">Library</a><a href="#paths">Learning paths</a><a href="#recall">Quick recall</a>
        </nav>
        <button className="studio-trigger" type="button" onClick={openStudio} aria-expanded={studioOpen}>
          <span className="theme-dot" />Tune the page
        </button>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="hero-kicker"><span /> A field guide for curious minds</p>
            <h1>Make difficult ideas <strong>click.</strong></h1>
            <p className="hero-intro">Clear notes on models, motion, math, and the machinery between them. Built to understand today and remember next month.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#library">Explore the library <ArrowIcon /></a>
              <a className="text-action" href="#paths">Pick a learning path</a>
            </div>
          </div>

          <div className="attention-board" aria-label="A visual explanation of attention weights" role="img">
            <div className="board-head"><span>One idea, made visible</span><span className="live-label"><i /> Attention map</span></div>
            <div className="sentence-row"><span>The</span><span>model</span><span className="active-token">learns</span><span>context</span></div>
            <div className="attention-grid">
              <div className="axis-label">looks at</div>
              <div className="heat h1">.08</div><div className="heat h2">.21</div><div className="heat h4">.53</div><div className="heat h3">.18</div>
              <div className="connection-copy"><b>“learns” attends most to “learns”</b><span>Each token gathers the context it needs, one weighted connection at a time.</span></div>
            </div>
            <div className="board-foot"><span>query</span><span>×</span><span>keys</span><span>→</span><b>useful context</b></div>
          </div>
        </section>

        <section className="featured-story" aria-labelledby="featured-title">
          <div className="feature-meta"><span>Featured explainer</span><span>14 min read</span></div>
          <div className="feature-body">
            <div><h2 id="featured-title">Transformers, from a single question</h2><p>Instead of memorizing the architecture, follow one token as it asks, finds, mixes, and passes information forward.</p></div>
            <a href="#recall" aria-label="Read Transformers, from a single question"><ArrowIcon /></a>
          </div>
          <div className="feature-sequence" aria-label="Transformer concept sequence"><span>tokens</span><i /><span>attention</span><i /><span>context</span><i /><span>prediction</span></div>
        </section>

        <section className="library-section" id="library" aria-labelledby="library-title">
          <div className="section-heading">
            <div><p>Browse the library</p><h2 id="library-title">Notes worth returning to.</h2></div>
            <label className="search-box"><SearchIcon /><span className="sr-only">Search notes</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a concept" /><kbd>⌘ K</kbd></label>
          </div>
          <div className="filter-row" aria-label="Filter notes by topic">
            {categories.map((item) => <button key={item} type="button" className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className="topic-grid">
            {visibleTopics.map((topic, index) => (
              <article className={`topic-item accent-${topic.accent}`} key={topic.title}>
                <div className="topic-topline"><span>{topic.format}</span><span>{topic.time}</span></div>
                <div className="topic-glyph" aria-hidden="true"><span>{index + 1}</span><i /><i /><i /></div>
                <div className="topic-copy"><p>{topic.category} · {topic.level}</p><h3>{topic.title}</h3><p>{topic.summary}</p></div>
                <a href="#recall" aria-label={`Open ${topic.title}`}><ArrowIcon /></a>
              </article>
            ))}
          </div>
          {visibleTopics.length === 0 && <p className="empty-state">No note matches that search yet. Try a broader concept.</p>}
        </section>

        <section className="paths-section" id="paths" aria-labelledby="paths-title">
          <div className="paths-intro"><p>Learning paths</p><h2 id="paths-title">When a list is not enough, follow the thread.</h2><p>Each path orders the ideas so the next explanation has somewhere solid to land.</p></div>
          <div className="path-list">
            {paths.map((path, index) => (
              <a href="#library" className={`path-row ${path.tone}`} key={path.name}>
                <span className="path-index">0{index + 1}</span><span className="path-name">{path.name}<small>{path.status}</small></span><span className="path-progress">{path.progress}</span><ArrowIcon />
              </a>
            ))}
          </div>
        </section>

        <section className="recall-section" id="recall" aria-labelledby="recall-title">
          <div className="recall-copy"><p>Quick recall</p><h2 id="recall-title">Can you explain it without your notes?</h2><p>Open a prompt, answer it in your own words, then compare. Retrieval makes the idea easier to find later.</p><span className="recall-count">03 prompts in this set</span></div>
          <div className="recall-list">
            {recall.map(([question, answer], index) => (
              <details key={question} open={index === 0}><summary><span>{question}</span><i aria-hidden="true">+</i></summary><p>{answer}</p></details>
            ))}
          </div>
        </section>

        <section className="newsletter" aria-labelledby="newsletter-title">
          <div><span className="newsletter-symbol" aria-hidden="true">↳</span><h2 id="newsletter-title">One useful idea when it is ready.</h2><p>New explainers, visual notes, and practical experiments. No fixed schedule and no filler.</p></div>
          {subscribed ? (
            <p className="success-message" role="status"><b>You are on the list.</b><span>The next useful note will find you.</span></p>
          ) : (
            <form onSubmit={subscribe}><label htmlFor="email">Email address</label><div><input id="email" type="email" required placeholder="you@example.com" /><button type="submit">Join the notes <ArrowIcon /></button></div></form>
          )}
        </section>
      </main>

      <footer><a className="wordmark" href="#top"><span>ai paglu</span><b>.</b></a><p>Keep asking better questions.</p><div><a href="#library">Library</a><a href="#paths">Paths</a><a href="#top">Back to top ↑</a></div></footer>

      {studioOpen && <button className="studio-backdrop" aria-label="Close theme controls" onClick={() => setStudioOpen(false)} />}
      <aside className={`theme-studio ${studioOpen ? "open" : ""}`} aria-label="Theme controls" aria-hidden={!studioOpen} inert={!studioOpen}>
        <div className="studio-header"><div><span>Page tuner</span><p>Make this version feel like yours.</p></div><button type="button" onClick={() => setStudioOpen(false)} aria-label="Close theme controls">×</button></div>
        <fieldset><legend>Color character</legend><div className="palette-options">
          {(["glacier", "ember", "canopy"] as Palette[]).map((item) => (
            <button type="button" key={item} className={`${item} ${palette === item ? "selected" : ""}`} onClick={() => setPalette(item)} aria-pressed={palette === item}>
              <span><i /><i /><i /></span><b>{item === "glacier" ? "Glacier signal" : item === "ember" ? "Ember studio" : "Canopy lab"}</b><small>{item === "glacier" ? "Clear · precise" : item === "ember" ? "Warm · energetic" : "Grounded · curious"}</small>
            </button>
          ))}
        </div></fieldset>
        <fieldset><legend>Light in the room</legend><div className="segmented-control"><button type="button" className={mode === "light" ? "selected" : ""} onClick={() => setMode("light")}><SunIcon /> Light</button><button type="button" className={mode === "dark" ? "selected" : ""} onClick={() => setMode("dark")}><span aria-hidden="true">◐</span> Dark</button></div></fieldset>
        <fieldset><legend>Library layout</legend><div className="segmented-control"><button type="button" className={layout === "map" ? "selected" : ""} onClick={() => setLayout("map")}>Visual map</button><button type="button" className={layout === "index" ? "selected" : ""} onClick={() => setLayout("index")}>Quiet index</button></div></fieldset>
        <p className="studio-note">Your choices are saved on this device.</p>
      </aside>
    </div>
  );
}
