
// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import { BsStars } from 'react-icons/bs';
// // import { useSession } from 'next-auth/react';
// // import { usePathname } from 'next/navigation';
// // import RightSidebar from './components/RightSidebar';
// // import TumblrStyledPost from './components/PostCard';

// // export default function DiscoverFeed() {
// //   const { data: session } = useSession();
// //   const pathname = usePathname();
// //   const isModal = pathname.includes('/users/');

// //   const [feed, setFeed] = useState([]);
// //   const [mood, setMood] = useState('🌀');
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (isModal || !session?.user?.email) return;

// //     fetch('/api/mood-feed', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ userEmail: session.user.email }),
// //     })
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setFeed(data.feed);
// //         setMood(data.mood || '🌀');
// //         setLoading(false);
// //       });
// //   }, [session, isModal]);

// //   if (loading) return <div className="text-white p-6">Loading mood feed...</div>;

// //   return (
// //     <main className="min-h-screen px-4 sm:px-6 pt-4 pb-10 text-[#cbd5e1] font-serif relative overflow-hidden bg-[#0f1a27]">
// //       {/* Background grain and vignette */}
// //       <div className="absolute inset-0 pointer-events-none z-0">
// //         <div className="w-full h-full bg-[url('/grain.gif')] mix-blend-soft-light opacity-20" />
// //         <div className="w-full h-full bg-black/30 rounded-xl shadow-inner" />
// //       </div>

// //       {/* Mood Badge */}
// //       <div className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-[#1e293b]/80 px-4 py-1.5 rounded-full text-xs tracking-wide text-slate-400 shadow shadow-black/20 z-20">
// //         Current Mood: {mood}
// //       </div>

// //       {/* Grid Layout */}
// //       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 lg:gap-12 max-w-6xl mx-auto">
// //         {/* Feed Section */}
// //         <section className="space-y-6">
// //           {feed.length === 0 ? (
// //             <p className="text-slate-400 italic">No vibe-matched posts yet.</p>
// //           ) : (
// //             feed.map((post) => (
// //               <TumblrStyledPost
// //                 key={post._id}
// //                 post={post}
// //                 userEmail={session?.user?.email || ''}
// //               />
// //             ))
// //           )}
// //         </section>

// //         {/* Right Sidebar: hidden on small screens */}
// //         <aside className="hidden lg:block">
// //           <RightSidebar />
// //         </aside>
// //       </div>
// //     </main>
// //   );
// // }


// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { useSession } from 'next-auth/react';
// import TumblrStyledPost from './components/PostCard';
// import Masonry from 'react-masonry-css';
// import Explore from './components/Explore';
// export default function DreamFeedApp() {
//   const { data: session } = useSession();
//   const postsCache = useRef(null);
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [mood, setMood] = useState('🌀');

//   useEffect(() => {
//     if (postsCache.current) {
//       setPosts(postsCache.current);
//       setLoading(false);
//     } else {
//       fetch('/api/post')
//         .then((res) => res.json())
//         .then((data) => {
//           postsCache.current = data;
//           setPosts(data);
//           setLoading(false);
//         });
//     }

//     const timeout = setTimeout(() => setMood('🌘 Drowsy Vibes'), 3000);
//     return () => clearTimeout(timeout);
//   }, []);

//   if (loading) return <div className="text-center text-slate-400 p-6">Loading dream feed...</div>;
//   if (posts.length === 0) return <div className="text-center text-slate-500 p-6">No posts yet.</div>;

//   const breakpointColumnsObj = {
//     default: 3,
//     1100: 2,
//     700: 1,
//   };

//   return (
//     <main className="min-h-screen px-4 sm:px-6 pt-6 pb-10 bg-[#0f1a27] text-[#cbd5e1] font-serif relative overflow-hidden">
//       {/* Background grain & vignette */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="w-full h-full bg-[url('/grain.gif')] mix-blend-soft-light opacity-20" />
//         <div className="w-full h-full bg-black/30 rounded-xl shadow-inner" />
//       </div>

//       {/* Mood badge */}
//       <div className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-[#1e293b]/80 px-4 py-1.5 rounded-full text-xs tracking-wide text-slate-400 shadow shadow-black/20 z-20">
//         Current Mood: {mood}
//       </div>

//       {/* Masonry Grid */}
//       <div className="relative z-10 max-w-6xl mx-auto w-full">
//         <Masonry
//           breakpointCols={breakpointColumnsObj}
//           className="flex gap-6"
//           columnClassName="space-y-6"
//         >
//           {posts.map((post) => (
//             <Explore
//               key={post._id}
//               post={post}
//               userEmail={session?.user?.email || ''}
//             />
//           ))}
//         </Masonry>
//       </div>
//     </main>
//   );
// }
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Masonry from 'react-masonry-css';
import Explore from './components/Explore';

export default function DreamFeedApp() {
  const { data: session } = useSession();
  const postsCache = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mood, setMood] = useState('🌀');
  const [clientReady, setClientReady] = useState(false); // hydration-safe render

  useEffect(() => {
    setClientReady(true); // Wait until client to render anything risky

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

      {/* Mood badge – only show on client to avoid mismatch */}
      {clientReady && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-[#1e293b]/80 px-4 py-1.5 rounded-full text-xs tracking-wide text-slate-400 shadow shadow-black/20 z-20">
          Current Mood: {mood}
        </div>
      )}

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
