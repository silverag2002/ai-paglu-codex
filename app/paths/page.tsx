import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning Paths | AI Paglu",
  description: "Ordered routes through AI foundations, transformers, and generative video.",
};

const learningPaths = [
  {
    id: "foundations",
    title: "Build the foundations",
    description: "Start with the mathematical ideas that appear everywhere, then connect them to training behavior.",
    color: "path-blue",
    duration: "About 45 minutes",
    steps: [
      ["Tokenization changes the problem", "See what the model actually receives.", "/articles/tokenization-hidden-interface"],
      ["Gradient descent, seen from above", "Understand how training moves.", "/articles/gradient-descent-field-notes"],
      ["Attention is learned retrieval", "Turn vectors into useful context.", "/articles/attention-as-retrieval"],
    ],
  },
  {
    id: "transformers",
    title: "Read a transformer",
    description: "Follow data through the model until the architecture stops looking like a diagram and starts feeling mechanical.",
    color: "path-orange",
    duration: "About 55 minutes",
    steps: [
      ["Attention is learned retrieval", "Start with the core communication step.", "/articles/attention-as-retrieval"],
      ["Build a tiny transformer", "Keep every shape visible in code.", "/articles/tiny-transformer-build"],
      ["Debug the tensor path", "Use invariants to find silent mistakes.", "/articles/tiny-transformer-build#tests"],
    ],
  },
  {
    id: "video",
    title: "Make images move",
    description: "Connect image diffusion to temporal modeling, then learn how to diagnose motion one layer at a time.",
    color: "path-green",
    duration: "About 50 minutes",
    steps: [
      ["From diffusion to believable motion", "See why time changes denoising.", "/articles/diffusion-to-video"],
      ["A map of temporal consistency", "Separate the layers of motion.", "/articles/temporal-consistency"],
      ["Evaluate frame relationships", "Judge what happens between frames.", "/articles/temporal-consistency#evaluate"],
    ],
  },
];

export default function PathsPage() {
  return (
    <main id="main-content" className="inner-page paths-page">
      <header className="page-intro paths-page-intro">
        <div><p>Learning paths</p><h1>Follow a thread, not a pile of tabs.</h1></div>
        <p>Each path orders the material so new ideas arrive with the right context. Read in sequence, pause at the checks, and return when the model in your head feels blurry.</p>
      </header>
      <div className="path-catalog">
        {learningPaths.map((path, pathIndex) => (
          <section className={`path-course ${path.color}`} id={path.id} key={path.id}>
            <header><span>Path {pathIndex + 1}</span><span>{path.duration}</span><h2>{path.title}</h2><p>{path.description}</p></header>
            <ol>
              {path.steps.map(([title, note, href], index) => (
                <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{note}</p></div><Link href={href} aria-label={`Open ${title}`}>→</Link></li>
              ))}
            </ol>
          </section>
        ))}
      </div>
      <section className="path-method"><div><p>A simple way to use these paths</p><h2>Read. Close. Rebuild.</h2></div><ol><li><span>1</span><b>Read for the mental model</b><p>Ignore memorization on the first pass. Find the one idea that organizes the rest.</p></li><li><span>2</span><b>Close the page</b><p>Explain the concept without looking. The missing parts are your real study plan.</p></li><li><span>3</span><b>Rebuild something small</b><p>Write the formula, trace the shapes, or reproduce the tiny example.</p></li></ol></section>
    </main>
  );
}
