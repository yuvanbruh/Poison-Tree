
'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Echoes from '@/app/components/Echoes';
import Masonry from 'react-masonry-css';

// Mood emojis to filter by
const moodOptions = ['🌀', '😔', '😃', '😶‍🌫️', '💀', '✨', '🧃', '🔥', '💭'];

const rabbitHoles = [
  {
    title: 'Cicada 3301',
    content:
      'An anonymous cryptographic puzzle that appeared online in 2012, calling for “intelligent individuals.” It led through layers of the dark web, ancient texts, and steganography. No one knows who made it—or why.',
  },
  {
    title: 'The Voynich Manuscript',
    content:
      'An illustrated codex from the 15th century written in an unknown language no one has been able to decode. Every page feels purposeful. Every attempt to understand it leads to more mystery.',
  },
  {
    title: 'The Montauk Project',
    content:
      'An alleged series of U.S. government experiments at Camp Hero on mind control, time travel, and interdimensional travel. The project supposedly inspired *Stranger Things*, but the deeper you go, the stranger it gets.',
  },
  {
    title: 'Numbers Stations',
    content:
      'Shortwave radio broadcasts that transmit eerie voices reading sequences of numbers, sometimes for decades. No one knows for sure who is sending them, or why.',
  },
  {
    title: 'The Max Headroom Incident',
    content:
      'In 1987, a Chicago TV broadcast was hijacked by someone in a Max Headroom mask. The footage was bizarre and never explained. The hacker was never caught.',
  },
  {
    title: 'Roko’s Basilisk',
    content:
      'A thought experiment suggesting that a future AI might punish anyone who didn’t help it come into being. Just learning about it is said to “doom” you. Many forums banned its discussion.',
  },
  {
    title: 'Lake City Quiet Pills',
    content:
      'A Reddit user named “ReligionOfPeace” died, and people found strange code in their profile linking to a mysterious website hosting what looked like hitman job postings. Was it real? Nobody knows.',
  },
  {
    title: 'The Hum',
   content:
      'In certain towns around the world—like Taos, New Mexico—people report hearing a low-frequency hum. No physical source has been found. Some hear it constantly. Some never do.',
  },
  {
    title: 'The Dylatov Pass Incident',
    content:
      'In 1959, nine experienced hikers died under bizarre circumstances in the Ural Mountains—missing eyes, radiation burns, and tents slashed from the inside. Theories range from military testing to aliens.',
  },
  {
    title: 'Dreams of the Same Man',
    content:
      'Thousands around the world claim to have seen the same man in their dreams—one they don’t know. Artists sketch his face from memory. The phenomenon has no clear origin.',
  },
];


export default function EchoedPostsFeed() {
  const { data: session, status } = useSession();
  const [echoedPosts, setEchoedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedLore, setSelectedLore] = useState(null);

  useEffect(() => {
    const index = Math.floor(Math.random() * rabbitHoles.length);
    setSelectedLore(rabbitHoles[index]);
  }, []);

  useEffect(() => {
    if (status !== 'authenticated') return;

    async function fetchEchoedPosts() {
      try {
        const res = await fetch('/api/echoes');
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setEchoedPosts(data);
      } catch (err) {
        console.error('Failed to load echoed posts:', err);
        setEchoedPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEchoedPosts();
  }, [status]);

  const filteredPosts = selectedMood
    ? echoedPosts.filter((post) => post.mood === selectedMood)
    : echoedPosts;

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const renderLore = () =>
    selectedLore && (
      <div className="mt-6 p-5 sm:p-6 rounded-xl bg-[#1e293b]/60 text-slate-300 shadow-lg shadow-black/20 max-w-2xl mx-auto backdrop-blur-sm">
        <h2 className="text-lg sm:text-xl font-bold mb-2 text-white">{selectedLore.title}</h2>
        <p className="text-sm leading-relaxed tracking-wide">{selectedLore.content}</p>
      </div>
    );

  if (!session?.user) {
    return (
      <main className="min-h-screen px-4 sm:px-6 pt-10 pb-20 text-[#cbd5e1] font-serif relative bg-[#0f1a27]">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="w-full h-full bg-[url('/grain.gif')] mix-blend-soft-light opacity-20" />
          <div className="w-full h-full bg-black/30 rounded-xl shadow-inner" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Please log in to continue</h1>
          <p className="text-slate-400 italic text-sm">This realm is only accessible to dreamers who’ve signed in.</p>
          {renderLore()}
        </div>
      </main>
    );
  }

  if (status === 'loading' || loading) {
    return (
      <div className="text-white p-6 text-center bg-[#0f1a27] min-h-screen">
        Loading echoed posts...
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <main className="min-h-screen px-4 sm:px-6 pt-10 pb-20 text-[#cbd5e1] font-serif relative bg-[#0f1a27]">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="w-full h-full bg-[url('/grain.gif')] mix-blend-soft-light opacity-20" />
          <div className="w-full h-full bg-black/30 rounded-xl shadow-inner" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto text-center">
          <h1 className="text-xl font-semibold text-white mb-2">No echoed posts {selectedMood ? `for ${selectedMood}` : 'yet'}.</h1>
          <p className="text-slate-400 italic text-sm">Once someone resonates with a post, you’ll see it here.</p>
          {renderLore()}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 pt-4 pb-16 text-[#cbd5e1] font-serif relative overflow-hidden bg-[#0f1a27]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[url('/grain.gif')] mix-blend-soft-light opacity-20" />
        <div className="w-full h-full bg-black/30 rounded-xl shadow-inner" />
      </div>

      {/* Mood Filter Bar */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 mb-8">
        {moodOptions.map((emoji) => (
          <button
            key={emoji}
            onClick={() => setSelectedMood(selectedMood === emoji ? null : emoji)}
            className={`text-2xl transition-all duration-300 hover:scale-125 ${
              selectedMood === emoji ? 'scale-125 grayscale-0' : 'grayscale opacity-70'
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-6"
          columnClassName="space-y-6"
        >
          {filteredPosts.map((post) => (
            <Echoes key={post._id} post={post} userEmail={session?.user?.email} />
          ))}
        </Masonry>
      </div>
    </main>
  );
}
