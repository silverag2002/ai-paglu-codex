import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Ankit Gupta | AI Paglu",
  description: "About the person behind AI Paglu and how to get in touch.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="inner-page about-page">
      <header className="about-hero">
        <div className="about-signal" aria-hidden="true"><span>A</span><i /><i /><i /><i /></div>
        <div><p>Behind the notes</p><h1>Hi, I’m Ankit Gupta.</h1><p className="about-lede">I learn by taking difficult systems apart, rebuilding the useful mental model, and writing down what finally made the idea click.</p></div>
      </header>

      <div className="about-grid">
        <section><h2>Why AI Paglu exists</h2><p>Technical material often jumps from analogy to notation too quickly. This site is my attempt to keep the important middle: what the system is trying to do, how the pieces cooperate, and which details matter when you build it.</p><p>The library will grow one carefully worked-through topic at a time. Some ideas need a long explanation. Others are better as a diagram, checklist, code trace, or revision card.</p></section>
        <aside><span>Current focus</span><ul><li>Transformer internals</li><li>Generative video systems</li><li>Training and evaluation</li><li>Clear technical visualization</li></ul></aside>
      </div>

      <section className="principles-panel">
        <div><p>How I write</p><h2>Useful before impressive.</h2></div>
        <ol><li><span>01</span><div><b>Begin with the job</b><p>Understand what a component solves before naming its machinery.</p></div></li><li><span>02</span><div><b>Make structure visible</b><p>Use diagrams and shapes when prose asks the reader to hold too much at once.</p></div></li><li><span>03</span><div><b>Leave a retrieval hook</b><p>End with a question, test, or compact model that makes revision easier.</p></div></li></ol>
      </section>

      <section className="contact-panel">
        <div><span>Say hello</span><h2>Questions, corrections, and interesting rabbit holes are welcome.</h2></div>
        <div className="contact-links"><a href="https://github.com/silverag2002" target="_blank" rel="noreferrer"><span>Code and experiments</span><b>GitHub · silverag2002</b><i>↗</i></a><a href="https://www.linkedin.com/in/ankit-gupta9/" target="_blank" rel="noreferrer"><span>Notes and conversations</span><b>Connect on LinkedIn</b><i>↗</i></a><Link href="/library"><span>Start reading</span><b>Browse the learning library</b><i>→</i></Link></div>
      </section>
    </main>
  );
}
