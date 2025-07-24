import { pipeline } from "@xenova/transformers";

let embedder = null;

const vibePrompts = [
  { label: "💫 Dreamlike", prompt: "surreal dreamy poetic eerie calm" },
  { label: "🌊 Melancholy", prompt: "soft sadness nostalgia slow wave" },
  { label: "🌘 Drowsy Vibes", prompt: "late night blurry tired haze" },
  { label: "🖤 Heartbreak", prompt: "pain isolation yearning poetic loss" },
  { label: "🌌 2011 Tumblr", prompt: "purple glitch ambient vapor soft" },
  { label: "🌀 Lynchian", prompt: "mystery surreal confusion dual identity" },
];

export async function getVibeEmbeddings() {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/paraphrase-mpnet-base-v2");
  }

  const results = [];
  for (const vibe of vibePrompts) {
    const output = await embedder(vibe.prompt, { pooling: "mean", normalize: true });
    results.push({
      label: vibe.label,
      vector: Array.from(output.data),
    });
  }

  return results;
}
