'use client';

import { useState, useEffect } from 'react';

const previewMoods = [
  {
    artist: 'Grouper',
    description: 'Her ambient, haunting, emotionally weightless sound — isolation, dissociation.',
    bg: 'from-[#2a2f45] to-[#1c1e2e]',
  },
  {
    artist: 'Radiohead',
    description: 'Paranoia, digital alienation, mental noise — OK Computer, Kid A energy.',
    bg: 'from-[#2f2a45] to-[#1e1c2e]',
  },
  {
    artist: 'Nirvana',
    description: 'Grunge, inner pain meeting raw rebellion — In Utero, Nevermind vibes.',
    bg: 'from-[#3c2b2b] to-[#1f1b1b]',
  },
  {
    artist: 'Hozier',
    description: 'Gothic romance, earthly yearning — poetic ache.',
    bg: 'from-[#2e2b3c] to-[#1e1b2f]',
  },
  {
    artist: 'Gorillaz',
    description: 'Futuristic melancholy, detached groove, surreal dreaminess.',
    bg: 'from-[#2a2e3f] to-[#1b1e2c]',
  },
];

export default function UnauthenticatedMoodPreview() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % previewMoods.length);
    }, 5000); // rotate every 5s
    return () => clearInterval(interval);
  }, []);

  const { artist, description, bg } = previewMoods[index];

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${bg} p-6 transition-all duration-1000`}>
      <div className="max-w-md w-full bg-[#1a1f2b] p-6 rounded-3xl text-center text-white shadow-xl border border-white/10">
        <h2 className="text-2xl font-bold mb-3">What does your mood sound like?</h2>
        <p className="italic text-sm mb-4">
          Try: <span className="text-[#82ca9d] font-medium">{artist}</span>
        </p>
        <p className="text-sm opacity-80">{description}</p>
        <div className="mt-6">
          <div className="w-full h-12 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/60">
            🎶 <em className="ml-1">Preview player coming soon...</em>
          </div>
        </div>
        <div className="mt-6">
          <a
            href="/login"
            className="inline-block bg-[#82ca9d] text-[#1a1f2b] font-semibold px-6 py-2 rounded-full hover:bg-[#6fbd8f] transition"
          >
            Begin My Mood Journey
          </a>
        </div>
      </div>
    </div>
  );
}
