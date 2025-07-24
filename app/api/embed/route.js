import { pipeline } from "@xenova/transformers";

let embedder = null;

export async function POST(req) {
  const { text } = await req.json();

  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/paraphrase-mpnet-base-v2");
  }

  const output = await embedder(text, { pooling: "mean", normalize: true });

  const vector = Array.from(output.data);
  return new Response(JSON.stringify({ vector }), { status: 200 });
}
