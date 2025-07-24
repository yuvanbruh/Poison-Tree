
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Masonry from 'react-masonry-css';
import Explore from './components/Explore';

const surrealQuotes = [
  // Dexter
  "“Tonight’s the night.” — Dexter Morgan",
  "“I just want to be normal… whatever that means.” — Dexter",
  "“I hope Rita is watching.” — Dexter",
  "“If I had a heart, it might be breaking right now.” — Dexter Morgan",
  "“Fake it until you make it — that's what normal people do, right?” — Dexter",
  "“I'm not the monster. I'm just ahead of the curve.” — Dexter Morgan",
  "“Monsters don’t get to live happily ever after.” — Dexter",
  "“Some people fake being good. I fake being human.” — Dexter",
  "“The mask is slipping.” — Dexter Morgan",
  "“This is my code. My darkness. My design.” — Dexter",

  // Fincher & Mindhunter vibes
  "“People are perverts.” — David Fincher",
  "“The past is not my concern.” — Mindhunter",
  "“We’re all living someone else’s narrative.” — David Fincher",
  "“He who opens the door must be ready for what walks through.” — Mindhunter",
  "“This chaos is carefully choreographed.” — Fincher-esque",
  "“People don’t break, they unravel.” — Mindhunter-inspired",
  "“Beneath every calm face is a sea of noise.” — Fincher-esque",

  // Radiohead, Cobain, etc.
  "“We are accidents waiting to happen.” — Radiohead",
  "“I miss the comfort in being sad.” — Kurt Cobain",
  "“Every song is a ghost.” — Radiohead",
  "“Wanting to be someone else is a waste of the person you are.” — Kurt Cobain",
  "“Nothing ever really ends.” — Thom Yorke",
  "“Hallelujah isn’t about God, it’s about grief.” — Jeff Buckley",

  // Misc. surrealism
  "“What is dead may never die.” — Game of Thrones",
  "“No one escapes alone.” — Prison Break",
];

export default function DreamFeedApp() {
  const { data: session } = useSession();
  const postsCache = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mood, setMood] = useState('🌀');
  const [clientReady, setClientReady] = useState(false);
  const [topQuote, setTopQuote] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setClientReady(true);

    const random = Math.floor(Math.random() * surrealQuotes.length);
    setTopQuote(surrealQuotes[random]);

    const updateScreenSize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

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
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  if (loading) return <div className="text-center text-slate-400 p-6">Loading dream feed...</div>;
  if (posts.length === 0) return <div className="text-center text-slate-500 p-6">No posts yet.</div>;

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const interspersedContent = [];

  posts.forEach((post, idx) => {
    interspersedContent.push(
      <Explore key={post._id} post={post} userEmail={session?.user?.email || ''} />
    );

    // Insert quote only if mobile
    if (isMobile) {
      const shouldInsert = Math.random() < 0.4;
      if (shouldInsert) {
        const quote = surrealQuotes[Math.floor(Math.random() * surrealQuotes.length)];
        interspersedContent.push(
          <div
            key={`quote-${idx}`}
            className="text-center text-xs italic text-slate-500 px-4 py-2 border-t border-slate-700/30"
          >
            {quote}
          </div>
        );
      }
    }
  });

  return (
    <main className="min-h-screen px-4 sm:px-6 pt-6 pb-10 bg-[#0f1a27] text-[#cbd5e1] font-serif relative overflow-hidden">
      {/* Background grain & vignette */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[url('/grain.gif')] mix-blend-soft-light opacity-20" />
        <div className="w-full h-full bg-black/30 rounded-xl shadow-inner" />
      </div>

      {/* Mood badge */}
      {clientReady && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-[#1e293b]/80 px-4 py-1.5 rounded-full text-xs tracking-wide text-slate-400 shadow shadow-black/20 z-20">
          Current Mood: {mood}
        </div>
      )}

      {/* Surreal Quote at top */}
      {clientReady && (
        <div className="z-10 relative max-w-4xl mx-auto text-center text-base text-slate-400 italic mb-8 pt-4 sm:pt-2 px-4">
          {topQuote}
        </div>
      )}

      {/* Masonry Grid */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-6"
          columnClassName="space-y-6"
        >
          {interspersedContent}
        </Masonry>
      </div>
    </main>
  );
}
