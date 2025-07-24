'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import TumblrStyledPost from '@/app/components/PostCard';

export default function DiscoverFeed() {
  const { data: session } = useSession();
  const [feed, setFeed] = useState([]);
  const [mood, setMood] = useState('🌀');

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch('/api/mood-feed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail: session.user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFeed(data.feed);
        setMood(data.mood);
      });
  }, [session]);

  return (
    <main className="text-white p-6">
      <div className="fixed top-4 right-4 bg-gray-700 px-3 py-1 rounded-full text-sm">
        Current Mood: {mood}
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {feed.length === 0 ? (
          <p>No vibe-matched posts yet.</p>
        ) : (
          feed.map((post) => (
            <TumblrStyledPost key={post._id} post={post} userEmail={session?.user?.email || ''} />
          ))
        )}
      </div>
    </main>
  );
}
