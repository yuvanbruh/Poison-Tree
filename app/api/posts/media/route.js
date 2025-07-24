import connectMongoDB from '@/app/lib/mongodb';
import Post from '@/app/models/Post';

export async function GET(req) {
  try {
    await connectMongoDB();

    const mediaPosts = await Post.find({
      $or: [
        { 'media.0': { $exists: true } },
        { type: { $in: ['movie', 'song', 'book'] } }
      ],
      visibility: 'public',
    })
      .sort({ createdAt: -1 })
      .limit(12)
      .select('text media type');

    return new Response(JSON.stringify(mediaPosts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Media fetch error:', err);
    return new Response(JSON.stringify({ message: 'Error fetching media posts' }), { status: 500 });
  }
}
