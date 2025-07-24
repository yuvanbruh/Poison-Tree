
import connectMongoDB from '@/app/lib/mongodb';
import Interaction from '@/app/models/Interaction';
import Post from '@/app/models/Post';
import Topic from '@/app/models/topic';  // User schema
import MoodHistory from '@/app/models/MoodHistory';  // Mood history schema
import { averageVectors, cosineSimilarity } from '@/app/lib/utils';
import { getVibeEmbeddings } from '@/app/lib/vibeVectors';
import { blendVectors } from '@/app/lib/blendVectors';

export async function POST(req) {
  try {
    await connectMongoDB();

    const { userEmail } = await req.json();
    if (!userEmail) {
      console.log('❌ Missing userEmail');
      return new Response(JSON.stringify({ error: "Missing userEmail" }), { status: 400 });
    }

    // Get user document and userId for filtering own posts later
    const userDoc = await Topic.findOne({ email: userEmail });
    if (!userDoc) {
      return new Response(
        JSON.stringify({ feed: [], mood: '🌀 Unknown', message: 'User not found' }),
        { status: 404 }
      );
    }
    const userId = userDoc._id;

    // Fetch recent interactions
    const recentInteractions = await Interaction.find({ userEmail })
      .sort({ createdAt: -1 })
      .limit(50);

    console.log(`🧠 Found ${recentInteractions.length} recent interactions`);

    if (recentInteractions.length === 0) {
      return new Response(
        JSON.stringify({ feed: [], mood: '🌀 Unknown', message: 'No recent interactions' }),
        { status: 200 }
      );
    }

    const computeWeight = (interaction) => {
      const baseWeights = {
        comment: 1.5,
        echo: 1.2,
        like: 0.6,
      };

      const base = baseWeights[interaction.action] || 0.5;

      const ageInDays = (Date.now() - new Date(interaction.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      let recencyMultiplier = 1;

      if (ageInDays < 1) recencyMultiplier = 1.5;
      else if (ageInDays < 2) recencyMultiplier = 1.3;
      else if (ageInDays < 3) recencyMultiplier = 1.1;

      return base * recencyMultiplier;
    };

    // Collect weighted interaction vectors
    const weightedVectors = [];
    for (const i of recentInteractions) {
      const weight = computeWeight(i);
      console.log(`➡️ Interaction: ${i.action}, Weight: ${weight.toFixed(2)}, PostID: ${i.postId}`);

      if (!i.vector || !Array.isArray(i.vector) || i.vector.length === 0) {
        console.warn('⚠️ Skipping interaction due to missing/invalid vector:', i);
        continue;
      }

      const scaled = i.vector.map((v) => v * weight);
      weightedVectors.push(scaled);
    }

    console.log(`✅ Collected ${weightedVectors.length} weighted vectors`);

    if (weightedVectors.length === 0) {
      return new Response(
        JSON.stringify({ feed: [], mood: '🌀 Unknown', message: 'No weighted vectors' }),
        { status: 200 }
      );
    }

    // Average vector from recent interactions
    const moodVectorCurrent = averageVectors(weightedVectors);
    console.log('🌈 Current mood vector sample:', moodVectorCurrent.slice(0, 5));

    // Fetch mood history vectors (last 10 moods)
    const moodHistoryEntries = await MoodHistory.find({ userEmail })
      .sort({ createdAt: -1 })
      .limit(10);

    let moodVectorHistory = null;
    if (moodHistoryEntries.length > 0) {
      const vectors = moodHistoryEntries.map(entry => entry.vector);
      moodVectorHistory = averageVectors(vectors);
      console.log('🕰️ Averaged mood history vector sample:', moodVectorHistory.slice(0, 5));
    }

    // Blend current mood with history mood vector for temporal continuity
    const moodVector = moodVectorHistory
      ? blendVectors(moodVectorCurrent, moodVectorHistory, 0.7)
      : moodVectorCurrent;

    if (!Array.isArray(moodVector) || moodVector.length === 0) {
      return new Response(
        JSON.stringify({ feed: [], mood: '🌀 Unknown', message: 'Mood vector invalid' }),
        { status: 200 }
      );
    }

    // Save mood vector to MoodHistory collection for future temporal continuity
    await MoodHistory.create({ userEmail, vector: moodVector });

    // Update user mood vector in Topic schema (for soul-to-soul matching)
    await Topic.findOneAndUpdate(
      { email: userEmail },
      { moodVector },
      { upsert: true }
    );

    // Fetch all posts excluding user's own posts
    const allPosts = await Post.find({ user: { $ne: userId } });
    console.log(`📦 Total posts fetched excluding user's own: ${allPosts.length}`);

    // Filter posts with valid vectors
    const postsWithVector = allPosts.filter(p => Array.isArray(p.vector) && p.vector.length > 0);
    console.log(`📊 Posts with valid vectors: ${postsWithVector.length}`);

    // Score posts by cosine similarity to mood vector
    const scored = postsWithVector
      .map(post => {
        const score = cosineSimilarity(moodVector, post.vector);
        return { post, score };
      })
      .filter(item => item.score > 0.5)  // slightly relaxed threshold for more soul flow
      .sort((a, b) => b.score - a.score);

    console.log(`🎯 Posts matching mood (score > 0.5): ${scored.length}`);

    // Load mood anchors and find best matching mood label
    const moodAnchors = await getVibeEmbeddings();
    let bestMatch = { label: '🌀 Unknown', score: 0 };

    for (const mood of moodAnchors) {
      const score = cosineSimilarity(moodVector, mood.vector);
      if (score > bestMatch.score) {
        bestMatch = { label: mood.label, score };
      }
    }

    // Prepare feed with vibe label and reason
    const feed = scored.slice(0, 20).map(({ post, score }) => ({
      ...post.toObject(),
      vibe: bestMatch.label,
      reason: 'Because you interacted with similar soul-vibe posts',
      score: score.toFixed(3),
    }));

    return new Response(
      JSON.stringify({
        feed,
        mood: bestMatch.label,
        debug: {
          interactionCount: recentInteractions.length,
          moodHistoryCount: moodHistoryEntries.length,
          postCount: allPosts.length,
          matchedCount: scored.length,
          moodVectorSize: moodVector.length,
        },
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Mood feed error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
