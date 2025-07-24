// import connectMongoDB from "@/lib/mongodb";
import connectMongoDB from "@/app/lib/mongodb";
// import Post from "@/models/Post";
import Post from "@/app/models/Post";

function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  if (magA === 0 || magB === 0) return 0;
  return dotProduct / (magA * magB);
}

export async function POST(req) {
  try {
    await connectMongoDB();

    const { vector } = await req.json();

    if (!vector || !Array.isArray(vector)) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing vector" }),
        { status: 400 }
      );
    }

    const allPosts = await Post.find({});

    const scored = allPosts
      .map((post) => ({
        post,
        score: cosineSimilarity(vector, post.vector),
      }))
      .filter((item) => item.score > 0.75)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);

    return new Response(
      JSON.stringify(scored.map((item) => item.post)),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
