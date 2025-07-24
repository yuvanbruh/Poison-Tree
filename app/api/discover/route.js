import connectMongoDB from "@/app/lib/mongodb";
import Post from "@/app/models/Post";

export async function GET() {
  try {
    await connectMongoDB();

    const posts = await Post.find().sort({ createdAt: -1 }).lean();

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });    
  }
}
