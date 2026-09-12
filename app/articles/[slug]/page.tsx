import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConceptVisual from "../../ui/concept-visual";
import { articles, getArticle } from "../../lib/content";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: `${article.title} | AI Paglu`, description: article.summary };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const articleIndex = articles.findIndex((item) => item.slug === article.slug);
  const nextArticle = articles[(articleIndex + 1) % articles.length];

  return (
    <main id="main-content" className={`inner-page article-page article-${article.visual}`}>
      <header className="article-header">
        <p className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/library">Library</Link><span>/</span>{article.topic}</p>
        <div className="article-meta"><span>{article.kind}</span><span>{article.level}</span><span>{article.readMinutes} min read</span><span>{article.published}</span></div>
        <h1>{article.title}</h1>
        <p>{article.summary}</p>
      </header>

      <ConceptVisual type={article.visual} />

      <div className="article-layout">
        <aside className="article-toc" aria-label="On this page">
          <b>On this page</b>
          {article.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.heading}</a>)}
          <a href="#takeaways">Keep these ideas</a>
        </aside>

        <article className="article-prose">
          <p className="article-lede">{article.lede}</p>
          <div className="key-idea"><span>The useful mental model</span><p>{article.keyIdea}</p></div>
          {article.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </section>
          ))}
          {article.code && <figure className="code-sample"><figcaption>Small enough to keep in your head</figcaption><pre><code>{article.code}</code></pre></figure>}
          <section className="takeaways" id="takeaways">
            <h2>Keep these ideas</h2>
            <ol>{article.takeaways.map((item, index) => <li key={item}><span>0{index + 1}</span>{item}</li>)}</ol>
          </section>
        </article>
      </div>

      <section className="article-next" aria-labelledby="next-title">
        <p>Continue the thread</p>
        <div><span>{nextArticle.kind} · {nextArticle.readMinutes} min</span><h2 id="next-title">{nextArticle.title}</h2><p>{nextArticle.summary}</p><Link className="primary-action" href={`/articles/${nextArticle.slug}`}>Read the next piece <span>→</span></Link></div>
      </section>
    </main>
  );
}
