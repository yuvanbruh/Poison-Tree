// app/api/profile/suggestions/route.js

import connectMongoDB from '@/app/lib/mongodb';
import Topic from '@/app/models/topic';

export async function GET(req) {
  try {
    await connectMongoDB();
    const users = await Topic.find({})
      .limit(5)
      .select('username userImage displayName');
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
