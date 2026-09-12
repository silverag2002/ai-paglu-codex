import type { Article } from "../lib/content";

export default function ConceptVisual({ type }: { type: Article["visual"] }) {
  if (type === "attention") {
    return <div className="article-visual attention-visual" role="img" aria-label="Attention weights between four tokens"><div className="visual-caption"><span>token relationship</span><b>attention / head 3</b></div><div className="matrix"><span>.04</span><span>.18</span><span>.67</span><span>.11</span><span>.36</span><span>.22</span><span>.31</span><span>.11</span><span>.08</span><span>.14</span><span>.21</span><span>.57</span><span>.42</span><span>.09</span><span>.38</span><span>.11</span></div><div className="matrix-labels"><span>the</span><span>model</span><span>finds</span><span>context</span></div></div>;
  }
  if (type === "descent") {
    return <div className="article-visual descent-visual" role="img" aria-label="A loss curve descending toward a minimum"><div className="visual-caption"><span>optimization path</span><b>step 08 / 12</b></div><svg viewBox="0 0 800 300"><path className="contour" d="M33 214C136 36 232 25 327 190s222 126 440-74"/><path className="contour secondary" d="M25 261C177 84 234 93 337 239s239 77 439-58"/><path className="descent-path" d="M93 78c52 30 76 92 131 95 64 4 58-84 116-87 65-4 63 126 135 130 52 4 73-63 124-68 51-4 67 38 104 49"/><circle cx="93" cy="78" r="9"/><circle cx="703" cy="197" r="11"/></svg><div className="visual-axis"><span>high loss</span><span>lower loss</span></div></div>;
  }
  if (type === "diffusion") {
    return <div className="article-visual diffusion-visual" role="img" aria-label="Four stages from noise to a coherent video frame"><div className="visual-caption"><span>denoising through time</span><b>24 frames</b></div><div className="frame-strip"><span><i /></span><span><i /></span><span><i /></span><span><i /></span></div><div className="visual-axis"><span>noise + prompt</span><span>motion + detail</span></div></div>;
  }
  if (type === "code") {
    return <div className="article-visual code-visual" role="img" aria-label="Tensor shapes moving through a transformer block"><div className="visual-caption"><span>decoder block</span><b>shape trace</b></div><div className="shape-flow"><span>(B,T)</span><i>→</i><span>(B,T,C)</span><i>→</i><span>(B,h,T,d)</span><i>→</i><span>(B,T,V)</span></div><div className="block-flow"><b>embed</b><b>attend</b><b>compute</b><b>predict</b></div></div>;
  }
  if (type === "tokens") {
    return <div className="article-visual tokens-visual" role="img" aria-label="A sentence split into uneven token pieces"><div className="visual-caption"><span>tokenizer output</span><b>8 pieces</b></div><div className="token-line"><span>Under</span><span>stand</span><span>ing</span><span> token</span><span>ization</span><span> changes</span><span> everything</span><span>.</span></div><div className="visual-axis"><span>text</span><span>→ 391 · 1145.openg · 287</span></div></div>;
  }
  return <div className="article-visual motion-visual" role="img" aria-label="Subject, camera, and environment motion tracks"><div className="visual-caption"><span>motion decomposition</span><b>frame 01 → 48</b></div><div className="motion-tracks"><div><b>subject</b><i /><i /><i /></div><div><b>camera</b><i /><i /></div><div><b>environment</b><i /><i /><i /><i /></div></div><div className="visual-axis"><span>start pose</span><span>end pose</span></div></div>;
}
