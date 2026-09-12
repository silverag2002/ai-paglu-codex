"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Article } from "../lib/content";

const filters = ["All", "Foundations", "Transformers", "Vision & motion", "Engineering"] as const;

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.25" /><path d="m12.5 12.5 4 4" /></svg>;
}

export default function LibraryExplorer({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articles.filter((article) => {
      const inTopic = filter === "All" || article.topic === filter;
      const inSearch = !needle || `${article.title} ${article.summary} ${article.topic} ${article.kind}`.toLowerCase().includes(needle);
      return inTopic && inSearch;
    });
  }, [articles, filter, query]);

  return (
    <>
      <div className="library-tools">
        <div className="filter-row" aria-label="Filter the library">
          {filters.map((item) => <button key={item} type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <label className="search-box"><SearchIcon /><span className="sr-only">Search the library</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, topic, or format" /></label>
      </div>

      <div className="library-results" aria-live="polite">
        <p>{results.length} {results.length === 1 ? "piece" : "pieces"}</p>
        {results.map((article, index) => (
          <article className={`library-row visual-${article.visual}`} key={article.slug}>
            <span className="library-order">{String(index + 1).padStart(2, "0")}</span>
            <div className="mini-visual" aria-hidden="true"><i /><i /><i /><i /></div>
            <div className="library-row-copy">
              <div><span>{article.kind}</span><span>{article.topic}</span><span>{article.readMinutes} min</span></div>
              <h2><Link href={`/articles/${article.slug}`}>{article.title}</Link></h2>
              <p>{article.summary}</p>
            </div>
            <Link className="round-link" href={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}><ArrowIcon /></Link>
          </article>
        ))}
        {results.length === 0 && <div className="library-empty"><b>No matching note yet.</b><p>Try a broader phrase or explore another topic.</p><button type="button" onClick={() => { setFilter("All"); setQuery(""); }}>Clear the search</button></div>}
      </div>
    </>
  );
}
