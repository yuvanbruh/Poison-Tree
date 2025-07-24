
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import TumblrStyledPost from '../components/PostCard';
import Masonry from 'react-masonry-css';
import Explore from '../components/Explore';
export default function DreamFeedApp() {
  const { data: session } = useSession();
  const postsCache = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mood, setMood] = useState('🌀');

  useEffect(() => {
    if (postsCache.current) {
      setPosts(postsCache.current);
      setLoading(false);
    } else {
      fetch('/api/post')
        .then((res) => res.json())
        .then((data) => {
          postsCache.current = data;
          setPosts(data);
          setLoading(false);
        });
    }

    const timeout = setTimeout(() => setMood('🌘 Drowsy Vibes'), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <div className="text-center text-slate-400 p-6">Loading dream feed...</div>;
  if (posts.length === 0) return <div className="text-center text-slate-500 p-6">No posts yet.</div>;

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <main className="min-h-screen px-4 sm:px-6 pt-6 pb-10 bg-[#0f1a27] text-[#cbd5e1] font-serif relative overflow-hidden">
      {/* Background grain & vignette */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[url('/grain.gif')] mix-blend-soft-light opacity-20" />
        <div className="w-full h-full bg-black/30 rounded-xl shadow-inner" />
      </div>

      {/* Mood badge */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-[#1e293b]/80 px-4 py-1.5 rounded-full text-xs tracking-wide text-slate-400 shadow shadow-black/20 z-20">
        Current Mood: {mood}
      </div>

      {/* Masonry Grid */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-6"
          columnClassName="space-y-6"
        >
          {posts.map((post) => (
            <Explore
              key={post._id}
              post={post}
              userEmail={session?.user?.email || ''}
            />
          ))}
        </Masonry>
      </div>
    </main>
  );
}
