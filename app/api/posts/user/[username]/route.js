import { NextResponse } from 'next/server';
import connectMongoDB from '@/app/lib/mongodb';
import Post from '@/app/models/Post';
export async function GET(request, context) {
  const { params } = context;
  const username = params.username;

  await connectMongoDB();
  const posts = await Post.find({ username }).sort({ createdAt: -1 });
  return NextResponse.json(posts);
}
