import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectMongoDB from '@/app/lib/mongodb';
import Echo from '@/app/models/Echoes';
import Topic from '@/app/models/topic';
import Post from '@/app/models/Post';

export async function GET(req) {
  try {
    await connectMongoDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const user = await Topic.findOne({ email: session.user.email });
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const echoes = await Echo.find({ user: user._id })
      .populate({
        path: 'post',
        populate: { path: 'user' }, // ✅ Correct: Post.user → Topic
      })
      .sort({ createdAt: -1 });

    const echoedPosts = echoes
      .filter(e => e.post)
      .map(e => e.post);

    return new Response(JSON.stringify(echoedPosts), { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/echoes:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
