// File: app/api/mood-insights/route.js
import { NextResponse } from 'next/server';
import connectMongoDB from '@/app/lib/mongodb';
import MoodHistory from '@/app/models/MoodHistory';

// Predefined mood anchor vectors (you'll need real embedding vectors here)
const moodAnchors = {
  happy: Array(768).fill(0.01),
  neutral: Array(768).fill(0),
  sad: Array(768).fill(-0.01),
};

// Cosine similarity between two vectors
function cosineSimilarity(vecA, vecB) {
  let dot = 0.0;
  let magA = 0.0;
  let magB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

function getMoodScore(vector) {
  const happyScore = cosineSimilarity(vector, moodAnchors.happy);
  const sadScore = cosineSimilarity(vector, moodAnchors.sad);
  const neutralScore = cosineSimilarity(vector, moodAnchors.neutral);
  
  // Normalize to a range, say 0 (sad) to 5 (happy)
  const score = ((happyScore - sadScore) + 1) * 2.5; // range: ~0–5
  return Math.max(0, Math.min(5, score));
}

export async function GET(request) {
  await connectMongoDB();

  const userEmail = request.nextUrl.searchParams.get('userEmail');
  if (!userEmail) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  const moodVectors = await MoodHistory.find({ userEmail }).sort({ createdAt: 1 });

  const formatted = moodVectors.map(entry => ({
    date: entry.createdAt.toISOString().split('T')[0],
    mood: parseFloat(getMoodScore(entry.vector).toFixed(2)),
  }));

  return NextResponse.json(formatted);
}