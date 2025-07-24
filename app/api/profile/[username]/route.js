import { NextResponse } from 'next/server';
import connectMongoDB from '@/app/lib/mongodb';
import Topic from '@/app/models/topic';

export async function GET(request, context) {
  const { username } = context.params;
  await connectMongoDB();

  const user = await Topic.findOne({ username });
  return NextResponse.json(user);
}
