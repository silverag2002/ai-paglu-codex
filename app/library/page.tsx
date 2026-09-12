import type { Metadata } from "next";
import LibraryExplorer from "../ui/library-explorer";
import { articles, topics } from "../lib/content";

export const metadata: Metadata = {
  title: "Learning Library | AI Paglu",
  description: "Browse visual explainers, deep dives, revision notes, and build labs about modern AI.",
};

export default function LibraryPage() {
  return (
    <main id="main-content" className="inner-page library-page">
      <header className="page-intro library-intro">
        <div><p>Learning library</p><h1>Find the shape of explanation you need.</h1></div>
        <p>Start with intuition, inspect the machinery, or grab a compact note for revision. Every piece tells you its depth and format before you open it.</p>
      </header>

      <section className="topic-ribbon" aria-label="Topics in the library">
        {topics.map((topic) => <div className={topic.color} key={topic.slug}><span>{topic.count} notes</span><h2>{topic.name}</h2><p>{topic.description}</p></div>)}
      </section>

      <section className="library-browser" aria-labelledby="all-pieces-title">
        <div className="browser-heading"><h2 id="all-pieces-title">All published pieces</h2><p>Choose a topic or search by the question in your head.</p></div>
        <LibraryExplorer articles={articles} />
      </section>
    </main>
  );
}
