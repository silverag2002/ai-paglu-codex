export type ArticleKind = "Visual explainer" | "Deep dive" | "Build lab" | "Revision note";

export type ContentSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  topic: "Foundations" | "Transformers" | "Vision & motion" | "Engineering";
  kind: ArticleKind;
  level: "Beginner" | "Working knowledge" | "Deep";
  readMinutes: number;
  published: string;
  visual: "attention" | "descent" | "diffusion" | "code" | "tokens" | "motion";
  lede: string;
  keyIdea: string;
  sections: ContentSection[];
  takeaways: string[];
  code?: string;
};

export const articles: Article[] = [
  {
    slug: "attention-as-retrieval",
    title: "Attention is learned retrieval",
    summary: "Understand queries, keys, and values by following one token as it searches for useful context.",
    topic: "Transformers",
    kind: "Visual explainer",
    level: "Beginner",
    readMinutes: 9,
    published: "12 Sep 2026",
    visual: "attention",
    lede: "Attention becomes much less mysterious when you stop treating it as a formula and start treating it as a retrieval step. A token asks a question, scores the available context, and mixes the useful answers.",
    keyIdea: "The attention output is a weighted mixture. The model learns both what to ask and what each token can contribute.",
    sections: [
      { id: "one-job", heading: "Start with the job, not the notation", paragraphs: ["Every token arrives with limited information. Before it can predict what follows, it needs to gather clues from the rest of the sequence.", "A plain average would give every token the same context. Attention fixes that by learning a different set of weights for every position."], bullets: ["Query: the information this token needs", "Key: the information another token advertises", "Value: the information that token passes along"] },
      { id: "scores", heading: "From similarity to a usable decision", paragraphs: ["A dot product measures how well a query and key align. Softmax converts all of those scores into a budget that sums to one.", "Large scores receive more of the budget. The final vector is built by mixing values according to that allocation."], bullets: ["Scale the scores so softmax does not become too sharp", "Mask future positions during next-token training", "Apply softmax over keys, not queries"] },
      { id: "heads", heading: "Why several heads help", paragraphs: ["One relationship is rarely enough. Different heads can specialize in syntax, repetition, nearby context, or long-distance references.", "The heads work in parallel, then their results are joined and projected back into the model width."] },
    ],
    takeaways: ["Attention is a learned weighted mixture.", "Queries choose, keys advertise, and values contribute.", "The square attention matrix is why long context is expensive."],
  },
  {
    slug: "gradient-descent-field-notes",
    title: "Gradient descent, seen from above",
    summary: "Read a loss surface like terrain and learn what step size, momentum, and noisy batches are doing.",
    topic: "Foundations",
    kind: "Revision note",
    level: "Beginner",
    readMinutes: 7,
    published: "9 Sep 2026",
    visual: "descent",
    lede: "Training is navigation. The loss tells you the height, the gradient tells you the steepest uphill direction, and the optimizer decides how to travel in the opposite direction.",
    keyIdea: "A gradient is local information. It does not point to the global solution, only toward the steepest nearby increase.",
    sections: [
      { id: "slope", heading: "The gradient is a slope report", paragraphs: ["For one parameter, the derivative reports how quickly loss changes. For millions of parameters, the gradient collects one slope for each direction.", "Negating that vector produces the locally steepest descent direction."], bullets: ["Positive gradient: move the parameter down", "Negative gradient: move the parameter up", "Near-zero gradient: the surface is locally flat"] },
      { id: "step-size", heading: "Learning rate controls trust", paragraphs: ["A small learning rate trusts the gradient cautiously and can take too long. A large one moves quickly but can cross the valley and oscillate.", "The useful range depends on scale, batch noise, normalization, and the optimizer."], bullets: ["Diverging loss usually means the step is too large", "A flat loss can mean the step is tiny or gradients are blocked", "Warmup protects early training when scales are unstable"] },
      { id: "momentum", heading: "Momentum remembers the route", paragraphs: ["Momentum keeps a moving average of recent gradients. Directions that agree accumulate speed; directions that alternate cancel out.", "This is why momentum travels smoothly through a long valley instead of bouncing across its walls."] },
    ],
    takeaways: ["Gradients describe the neighborhood, not the destination.", "Learning rate decides how much to trust that local signal.", "Momentum filters noisy changes in direction."],
  },
  {
    slug: "diffusion-to-video",
    title: "From diffusion to believable motion",
    summary: "Image diffusion explains one frame. Video generation adds the harder problem of keeping time coherent.",
    topic: "Vision & motion",
    kind: "Deep dive",
    level: "Working knowledge",
    readMinutes: 13,
    published: "5 Sep 2026",
    visual: "diffusion",
    lede: "An image model can make a convincing frame without knowing what happened before it. A video model cannot. Every new frame must be plausible on its own and consistent with a growing history.",
    keyIdea: "Video generation adds a temporal axis to denoising. The model must remove noise while preserving identity, geometry, and motion across frames.",
    sections: [
      { id: "extra-axis", heading: "Time changes the shape of the problem", paragraphs: ["A batch of images has height, width, and channels. Video introduces frames, so attention and convolution now have another dimension to coordinate.", "Treating every frame independently produces flicker because small denoising differences become visible jumps."], bullets: ["Objects must keep the same appearance", "Camera movement must agree with scene geometry", "Motion must remain smooth without freezing"] },
      { id: "conditioning", heading: "Motion needs constraints", paragraphs: ["Text describes what should exist but says little about how it should move. Video systems add image references, motion vectors, camera controls, or learned temporal features.", "These signals reduce ambiguity. They narrow the set of videos that satisfy the prompt."], bullets: ["First-frame conditioning anchors appearance", "Temporal attention shares information across frames", "Motion guidance separates camera movement from subject movement"] },
      { id: "failure", heading: "Why long clips drift", paragraphs: ["Small inconsistencies accumulate. A hand changes shape, a background object disappears, or the camera invents a new geometry.", "Longer context, stronger reference conditioning, and staged generation help, but each adds compute or reduces freedom."] },
    ],
    takeaways: ["Temporal consistency is the central video problem.", "More constraints usually improve identity and geometry.", "Longer clips amplify small errors."],
  },
  {
    slug: "tiny-transformer-build",
    title: "Build a tiny transformer you can inspect",
    summary: "A compact decoder block with every tensor shape exposed and each operation tied to one purpose.",
    topic: "Engineering",
    kind: "Build lab",
    level: "Working knowledge",
    readMinutes: 18,
    published: "1 Sep 2026",
    visual: "code",
    lede: "The fastest route from architecture diagram to intuition is a small implementation that you can print, break, and repair. Keep the model narrow enough that every tensor fits on the screen.",
    keyIdea: "A decoder block alternates communication across tokens with computation inside each token, then protects both steps with residual paths.",
    sections: [
      { id: "shapes", heading: "Name the shapes first", paragraphs: ["Use B for batch, T for sequence length, and C for model width. Most silent transformer bugs come from losing track of one of these axes.", "Split C across attention heads, compute a T by T score matrix, then merge the heads back to C."], bullets: ["Input ids: B × T", "Embeddings: B × T × C", "Attention weights: B × heads × T × T", "Logits: B × T × vocabulary"] },
      { id: "block", heading: "One block has two jobs", paragraphs: ["Attention moves information between token positions. The feed-forward network transforms the information at each position independently.", "Residual connections let both jobs make a correction without replacing the existing representation."], bullets: ["Normalize before the sublayer", "Add the attention result back", "Normalize again", "Add the feed-forward result back"] },
      { id: "tests", heading: "Test ideas, not only output", paragraphs: ["A model that runs can still be wrong. Add checks that attention rows sum to one, the causal mask blocks the future, and split-then-merge returns the original layout.", "Overfit one tiny batch before starting a real training run."] },
    ],
    takeaways: ["Tensor shapes are part of the algorithm.", "Attention communicates; the MLP computes.", "A tiny batch can reveal wiring bugs before training becomes expensive."],
    code: `def decoder_block(x):\n    x = x + attention(norm_1(x))\n    x = x + feed_forward(norm_2(x))\n    return x\n\n# communication, then computation\nlogits = language_head(final_norm(x))`,
  },
  {
    slug: "tokenization-hidden-interface",
    title: "The hidden interface between text and models",
    summary: "Tokenization quietly changes spelling, arithmetic, multilingual cost, and the meaning of context length.",
    topic: "Foundations",
    kind: "Revision note",
    level: "Beginner",
    readMinutes: 6,
    published: "28 Aug 2026",
    visual: "tokens",
    lede: "Language models never receive words or characters directly. They receive integer IDs produced by a compression system, and that boundary explains many otherwise strange failures.",
    keyIdea: "The tokenizer defines the units a model can see. If a useful structure is split poorly, the model has to reconstruct it indirectly.",
    sections: [
      { id: "units", heading: "A token is not a word", paragraphs: ["Frequent strings often become one token. Rare names, code, and many non-English scripts may be split into several pieces.", "The same visible word can also map differently when capitalization or leading whitespace changes."], bullets: ["Character counting is difficult when characters are hidden inside tokens", "Long numbers split inconsistently", "Whitespace and punctuation consume context"] },
      { id: "budget", heading: "Context is measured after encoding", paragraphs: ["A 2,000-word note does not have one universal token count. The count depends on the vocabulary and the kinds of text inside it.", "Code, JSON, and mixed-language passages often cost more than plain English prose."], bullets: ["Measure with the target model tokenizer", "Trim repeated markup before trimming meaning", "Compare prompts by token IDs when behavior differs"] },
      { id: "debug", heading: "Debug the boundary first", paragraphs: ["When a model mishandles spelling, rhyme, or precise formatting, inspect the token sequence before blaming reasoning.", "Making characters explicit or using a tool can solve problems that prompting alone cannot."] },
    ],
    takeaways: ["Tokens are learned text fragments, not linguistic truths.", "Token cost varies by format and language.", "Inspect encoding early when text behavior is surprising."],
  },
  {
    slug: "temporal-consistency",
    title: "A map of temporal consistency",
    summary: "Separate subject motion, camera motion, and scene persistence before debugging a generated clip.",
    topic: "Vision & motion",
    kind: "Visual explainer",
    level: "Deep",
    readMinutes: 11,
    published: "22 Aug 2026",
    visual: "motion",
    lede: "A clip can look wrong for several unrelated reasons. Separating motion into subject, camera, and environment makes failure analysis far more useful than calling everything flicker.",
    keyIdea: "Consistency is not stillness. A good model preserves identity while allowing intentional change through time.",
    sections: [
      { id: "layers", heading: "Decompose what is moving", paragraphs: ["Subject motion changes pose and position. Camera motion changes the viewpoint. Environmental motion changes everything else, from fabric to light.", "A useful prompt or control signal says which layer should move and which should remain stable."], bullets: ["Subject: action, pose, expression", "Camera: pan, tilt, orbit, dolly", "Environment: wind, particles, reflections, lighting"] },
      { id: "signals", heading: "Give the model a motion signal", paragraphs: ["Text is an imprecise motion controller. Reference frames, trajectories, depth maps, and optical flow communicate structure more directly.", "The strongest control depends on the shot. Character animation needs identity anchors; camera moves need geometry."], bullets: ["Use a clear first frame for appearance", "Describe one dominant motion before adding secondary motion", "Keep camera language physically consistent"] },
      { id: "evaluate", heading: "Evaluate frame relationships", paragraphs: ["A beautiful still frame can hide a poor video. Scrub through the clip, compare distant frames, and inspect edges around fast motion.", "Judge identity, geometry, pacing, and camera intent separately so the next iteration has a specific target."] },
    ],
    takeaways: ["Motion has distinct layers that should be controlled separately.", "Reference signals reduce ambiguity.", "Video quality lives between frames, not inside one frame."],
  },
];

export const topics = [
  { slug: "foundations", name: "Foundations", description: "Math, optimization, tokenization, and the mental models underneath modern AI.", count: 8, color: "topic-foundations" },
  { slug: "transformers", name: "Transformers", description: "Attention, embeddings, tensor shapes, inference, and the architecture around them.", count: 11, color: "topic-transformers" },
  { slug: "vision-motion", name: "Vision & motion", description: "Diffusion, temporal consistency, camera language, and controllable generation.", count: 7, color: "topic-vision" },
  { slug: "engineering", name: "Engineering", description: "Readable implementations, debugging checklists, evaluation, and build logs.", count: 6, color: "topic-engineering" },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
