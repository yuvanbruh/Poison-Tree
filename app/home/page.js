
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { usePathname } from 'next/navigation';
// import RightSidebar from '../components/RightSidebar';
// import TumblrStyledPost from '../components/PostCard';

// export default function DiscoverFeed() {
//   const { data: session } = useSession();
//   const pathname = usePathname();
//   const isModal = pathname.includes('/users/');

//   const [feed, setFeed] = useState([]);
//   const [mood, setMood] = useState('🌀');
//   const [loading, setLoading] = useState(true);
//   const [selectedLore, setSelectedLore] = useState(null);

//   const rabbitHoles = [
//   {
//     title: "The Anti-Algorithm",
//     content:
//       "Some believe *In Rainbows* was a ritual. The pay-what-you-want release wasn’t rebellion—it was a mirror. A reflection of how much you value art when no system tells you its worth. The band tuned their frequencies to human guilt, generosity, and attention. A sociological echo chamber wrapped in reverb.",
//   },
//   {
//     title: "The OK Computer Curse",
//     content:
//       "*OK Computer* wasn’t just predictive—it’s rumored to be cursed. Engineers involved in early mastering reported sleeplessness and paranoia. The band stopped performing 'Climbing Up the Walls' live for years—not due to complexity, but because of recurring dreams. Thom once called it 'a broadcast from the near collapse.'",
//   },
//   {
//     title: "The Hidden Tape",
//     content:
//       "Rumors circulate of a cassette labeled ‘Ziggurat’—an unreleased Radiohead sound collage, supposedly recorded in one sitting during the Kid A/Amnesiac sessions. It was buried, not scrapped. Whispers say it only plays backwards, and only on machines made before 1989. Some claim it weeps if left running alone.",
//   },
//   {
//     title: "Yorke’s Number 14",
//     content:
//       "In multiple interviews, Thom Yorke repeats the number 14. There are 14 tracks on *Hail to the Thief*. Fans uncovered 14-second intervals in the white noise on ‘Treefingers’. A theory suggests 14 is a timing frequency he aligns to. 'We’re all just pulses anyway,' he said once. What beat are you walking to?",
//   },
//   {
//     title: "The Eraser Sync Theory",
//     content:
//       "Try this: play *The Eraser* and *Amnesiac* at the same time, one in each ear. The atmospheres don’t clash—they converge. Some say they were designed that way, that The Eraser is a personal decryptor for Amnesiac’s political anxiety. Two voices in split hemispheres. One memory, distorted.",
//   },
//   {
//     title: "The Burned Notebook",
//     content:
//       "A fan once claimed to have found pages of Thom Yorke’s handwritten lyrics near a forest in Oxford—charred but legible. When photographed, the ink rearranged itself subtly between exposures. One line read: *'Erase the face, keep the feeling.'* The images vanished from the internet days later.",
//   },
//   {
//     title: "The Lotus Flower Loop",
//     content:
//       "If you loop the ‘Lotus Flower’ video exactly 23 times, Thom’s dance syncs unnaturally with the beat. Some claim it becomes a glyph, a movement-based code. Dancers have tried to replicate it and report dissociative states. It's not a performance—it's a sigil. He’s trying to wake something up.",
//   },
//   {
//     title: "Greenwood’s Detuning",
//     content:
//       "Jonny Greenwood reportedly never tunes his guitar fully on studio recordings. He uses micro-detunings that shift by a few cents each track. Audio engineers say it creates an unconscious sense of decay. One producer called it 'tuning to anxiety,' as if the guitars breathe—but not in sync with you.",
//   },
//   {
//     title: "The Spectrogram Ghost",
//     content:
//       "Open the spectrogram of ‘Pulk/Pull Revolving Doors’—some say it hides a face. Not pareidolia, but structured. A warped childlike figure in the noise floor. A producer admitted to ‘visual compression artifacts’ being left in deliberately. Radiohead once said: 'We don’t hide messages. We embed memories.'",
//   },
//   {
//     title: "The Email That Wasn't Sent",
//     content:
//       "In 2014, an intern at XL Recordings claimed to find a draft email from Thom, unsent. It simply read: *'They’re not songs. They’re warnings.'* The message timestamp was 10:00:00 PM. On *Kid A*, the tenth minute falls during ‘How to Disappear Completely.’ That track was never supposed to exist.",
//   },
// ];


//   useEffect(() => {
//     if (isModal || !session?.user?.email) return;

//     fetch('/api/mood-feed', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ userEmail: session.user.email }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setFeed(data.feed);
//         setMood(data.mood || '🌀');
//         setLoading(false);
//       });
//   }, [session, isModal]);

//   useEffect(() => {
//     const index = Math.floor(Math.random() * rabbitHoles.length);
//     setSelectedLore(rabbitHoles[index]);
//   }, []);

//   const renderLore = () =>
//     selectedLore && (
//       <div className="mt-6 p-5 sm:p-6 rounded-xl bg-[#1e293b]/60 text-slate-300 shadow-lg shadow-black/20 max-w-2xl mx-auto backdrop-blur-sm">
//         <h2 className="text-lg sm:text-xl font-bold mb-2 text-white">{selectedLore.title}</h2>
//         <p className="text-sm leading-relaxed tracking-wide">{selectedLore.content}</p>
//       </div>
//     );

//   if (!session?.user) {
//     return (
//       <main className="min-h-screen px-4 sm:px-6 pt-10 pb-20 text-[#cbd5e1] font-serif relative bg-[#0f1a27]">
//         <div className="absolute inset-0 pointer-events-none z-0">
//           <div className="w-full h-full bg-[url('/grain.gif')] mix-blend-soft-light opacity-20" />
//           <div className="w-full h-full bg-black/30 rounded-xl shadow-inner" />
//         </div>

//         <div className="relative z-10 max-w-xl mx-auto text-center">
//           <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Please log in to continue</h1>
//           <p className="text-slate-400 italic text-sm">This realm is only accessible to dreamers who’ve signed in.</p>
//           {renderLore()}
//         </div>
//       </main>
//     );
//   }

//   if (loading) {
//     return <div className="text-white p-6 text-center">Loading mood feed...</div>;
//   }

//   return (
//     <main className="min-h-screen px-4 sm:px-6 pt-4 pb-16 text-[#cbd5e1] font-serif relative overflow-hidden bg-[#0f1a27]">
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="w-full h-full bg-[url('/grain.gif')] mix-blend-soft-light opacity-20" />
//         <div className="w-full h-full bg-black/30 rounded-xl shadow-inner" />
//       </div>

//       <div className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-[#1e293b]/80 px-4 py-1.5 rounded-full text-xs tracking-wide text-slate-400 shadow shadow-black/20 z-20">
//         Current Mood: {mood}
//       </div>

//       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 sm:gap-10 max-w-6xl mx-auto">
//         <section className="space-y-6 sm:px-1">
//           {feed.length === 0 ? (
//             <p className="text-slate-400 italic">No vibe-matched posts yet.</p>
//           ) : (
//             feed.map((post) => (
//               <TumblrStyledPost
//                 key={post._id}
//                 post={post}
//                 userEmail={session?.user?.email || ''}
//               />
//             ))
//           )}
//         </section>

//         <aside className="hidden lg:block">
//           <RightSidebar />
//         </aside>
//       </div>
//     </main>
//   );
// }



'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import RightSidebar from '../components/RightSidebar';
import TumblrStyledPost from '../components/PostCard';

// Surreal quotes array
const surrealQuotes = [
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
  "“People are perverts.” — David Fincher",
  "“The past is not my concern.” — Mindhunter",
  "“We’re all living someone else’s narrative.” — David Fincher",
  "“He who opens the door must be ready for what walks through.” — Mindhunter",
  "“This chaos is carefully choreographed.” — Fincher-esque",
  "“People don’t break, they unravel.” — Mindhunter-inspired",
  "“Beneath every calm face is a sea of noise.” — Fincher-esque",
  "“We are accidents waiting to happen.” — Radiohead",
  "“I miss the comfort in being sad.” — Kurt Cobain",
  "“Every song is a ghost.” — Radiohead",
  "“Wanting to be someone else is a waste of the person you are.” — Kurt Cobain",
  "“Nothing ever really ends.” — Thom Yorke",
  "“Hallelujah isn’t about God, it’s about grief.” — Jeff Buckley",
  "“What is dead may never die.” — Game of Thrones",
  "“No one escapes alone.” — Prison Break",
];

export default function DiscoverFeed() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isModal = pathname.includes('/users/');

  const [feed, setFeed] = useState([]);
  const [mood, setMood] = useState('🌀');
  const [loading, setLoading] = useState(true);
  const [selectedLore, setSelectedLore] = useState(null);
  const [quote, setQuote] = useState(null);

  const rabbitHoles = [
    {
      title: "The Anti-Algorithm",
      content:
        "Some believe *In Rainbows* was a ritual. The pay-what-you-want release wasn’t rebellion—it was a mirror. A reflection of how much you value art when no system tells you its worth.",
    },
    {
      title: "The OK Computer Curse",
      content:
        "*OK Computer* wasn’t just predictive—it’s rumored to be cursed. Engineers involved in early mastering reported sleeplessness and paranoia.",
    },
    {
      title: "The Hidden Tape",
      content:
        "Rumors circulate of a cassette labeled ‘Ziggurat’—an unreleased Radiohead sound collage. It only plays backwards, and only on machines made before 1989.",
    },
    {
      title: "Yorke’s Number 14",
      content:
        "Thom Yorke repeats the number 14 often. A theory suggests it’s a timing frequency he aligns to. 'We’re all just pulses anyway,' he said.",
    },
    {
      title: "The Eraser Sync Theory",
      content:
        "*The Eraser* and *Amnesiac* sync together perfectly when played in opposite ears. A personal decoder. A split-memory artifact.",
    },
    {
      title: "The Burned Notebook",
      content:
        "Charred lyrics found in Oxford were said to rearrange themselves in photos. One line read: *'Erase the face, keep the feeling.'*",
    },
    {
      title: "The Lotus Flower Loop",
      content:
        "Loop the ‘Lotus Flower’ video 23 times—Thom’s dance becomes a glyph. Dancers claim dissociation. Not a performance—a sigil.",
    },
    {
      title: "Greenwood’s Detuning",
      content:
        "Jonny Greenwood never fully tunes. Slight micro-detunings shift each track, tuning guitars to subconscious unease.",
    },
    {
      title: "The Spectrogram Ghost",
      content:
        "Spectrogram analysis of ‘Pulk/Pull’ reveals a childlike face in the noise floor. Not hidden—embedded memory.",
    },
    {
      title: "The Email That Wasn't Sent",
      content:
        "An intern found an unsent email from Thom: *'They’re not songs. They’re warnings.'* Sent at the moment ‘How to Disappear’ plays.",
    },
  ];

  useEffect(() => {
    const q = surrealQuotes[Math.floor(Math.random() * surrealQuotes.length)];
    setQuote(q);

    const index = Math.floor(Math.random() * rabbitHoles.length);
    setSelectedLore(rabbitHoles[index]);
  }, []);

  useEffect(() => {
    if (isModal || !session?.user?.email) return;

    fetch('/api/mood-feed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail: session.user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFeed(data.feed);
        setMood(data.mood || '🌀');
        setLoading(false);
      });
  }, [session, isModal]);

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

  if (loading) {
    return <div className="text-white p-6 text-center">Loading mood feed...</div>;
  }

  return (
    <main className="min-h-screen px-4 sm:px-6 pt-4 pb-16 text-[#cbd5e1] font-serif relative overflow-hidden bg-[#0f1a27]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[url('/grain.gif')] mix-blend-soft-light opacity-20" />
        <div className="w-full h-full bg-black/30 rounded-xl shadow-inner" />
      </div>

      {/* Mood badge */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-[#1e293b]/80 px-4 py-1.5 rounded-full text-xs tracking-wide text-slate-400 shadow shadow-black/20 z-20">
        Current Mood: {mood}
      </div>

      {/* Feed Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 sm:gap-10 max-w-6xl mx-auto">
        <section className="space-y-6 sm:px-1">
          {/* ✨ Surreal Quote Block */}
          {quote && (
            <div className="text-slate-400 text-sm italic px-4 py-3 rounded-md sm:text-base leading-relaxed tracking-wide">
              {quote}
            </div>
          )}

          {/* Feed posts */}
          {feed.length === 0 ? (
            <p className="text-slate-400 italic">No vibe-matched posts yet.</p>
          ) : (
            feed.map((post) => (
              <TumblrStyledPost
                key={post._id}
                post={post}
                userEmail={session?.user?.email || ''}
              />
            ))
          )}
        </section>

        <aside className="hidden lg:block">
          <RightSidebar />
        </aside>
      </div>
    </main>
  );
}
