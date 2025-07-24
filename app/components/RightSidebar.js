
// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   MusicNotes,
//   Heart,
//   Notebook,
//   FilmSlate,
//   Book,
// } from 'phosphor-react';

// export default function RightSidebar({ mood = 'melancholy' }) {
//   const [movies, setMovies] = useState([]);
//   const [music, setMusic] = useState([]);
//   const [books, setBooks] = useState([]);

//   const [loadingMovies, setLoadingMovies] = useState(true);
//   const [loadingMusic, setLoadingMusic] = useState(true);
//   const [loadingBooks, setLoadingBooks] = useState(true);

//   const [errorMovies, setErrorMovies] = useState(null);
//   const [errorMusic, setErrorMusic] = useState(null);
//   const [errorBooks, setErrorBooks] = useState(null);

//   useEffect(() => {
//     async function fetchMovies() {
//       setLoadingMovies(true);
//       setErrorMovies(null);
//       try {
//         const res = await fetch(`/api/movies?mood=${encodeURIComponent(mood)}`);
//         if (!res.ok) throw new Error('Failed to fetch movies');
//         const data = await res.json();
//         setMovies(data.movies);
//       } catch (err) {
//         setErrorMovies(err.message);
//       } finally {
//         setLoadingMovies(false);
//       }
//     }

//     async function fetchMusic() {
//       setLoadingMusic(true);
//       setErrorMusic(null);
//       try {
//         const res = await fetch(`/api/music?mood=${encodeURIComponent(mood)}`);
//         if (!res.ok) throw new Error('Failed to fetch music');
//         const data = await res.json();
//         setMusic(data.tracks);
//       } catch (err) {
//         setErrorMusic(err.message);
//       } finally {
//         setLoadingMusic(false);
//       }
//     }

//     async function fetchBooks() {
//       setLoadingBooks(true);
//       setErrorBooks(null);
//       try {
//         const res = await fetch(`/api/books?mood=${encodeURIComponent(mood)}`);
//         if (!res.ok) throw new Error('Failed to fetch books');
//         const data = await res.json();
//         setBooks(data.books);
//       } catch (err) {
//         setErrorBooks(err.message);
//       } finally {
//         setLoadingBooks(false);
//       }
//     }

//     fetchMovies();
//     fetchMusic();
//     fetchBooks();
//   }, [mood]);

//   return (
//     <aside className="w-72 sticky top-20 self-start h-fit bg-[#23374d] text-[#E0E0E0] rounded-xl border border-[#1A1A1A] p-6 shadow-2xl">
//       <h2 className="text-xs text-neutral-400 uppercase font-semibold mb-6 tracking-widest">
//         Suggestions for You — Mood: <span className="capitalize">{mood}</span>
//       </h2>

//       <div className="space-y-8 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
//         {/* Trending Echoes */}
//         <section>
//           <h3 className="text-sm font-semibold text-red-400 flex items-center gap-2 mb-3">
//             <Heart size={18} /> Trending Echoes
//           </h3>
//           <ul className="text-sm text-[#B0B0B0] space-y-2">
//             <li>#midnightthoughts — 12.3K</li>
//             <li>#lonelycore — 9.7K</li>
//             <li>#softgrunge — 8.4K</li>
//             <li>#dreamjournal — 6.1K</li>
//             <li>#nostalgiawave — 5.2K</li>
//           </ul>
//         </section>

//         <hr className="border-[#333333] my-4" />

//         {/* Movies */}
//         <section>
//           <h3 className="text-sm font-semibold text-yellow-300 flex items-center gap-2 mb-3">
//             <FilmSlate size={18} /> Mood Movies
//           </h3>
//           {loadingMovies && <p className="text-sm text-[#666]">Loading movies...</p>}
//           {errorMovies && <p className="text-sm text-red-500">Error: {errorMovies}</p>}
//           {!loadingMovies && !errorMovies && movies.length === 0 && (
//             <p className="text-sm text-[#666]">No movies found for this mood.</p>
//           )}
//           <ul className="text-sm text-[#B0B0B0] space-y-3">
//             {movies.map(({ id, title, poster_path, release_date }) => (
//               <li key={id} className="flex items-center gap-3">
//                 {poster_path ? (
//                   <img
//                     src={poster_path}
//                     alt={title}
//                     className="w-12 h-18 rounded-md object-cover flex-shrink-0"
//                     loading="lazy"
//                   />
//                 ) : (
//                   <div className="w-12 h-18 bg-gray-700 rounded-md flex-shrink-0" />
//                 )}
//                 <div>
//                   <p className="font-semibold">{title}</p>
//                   <p className="text-xs text-[#999]">{release_date}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </section>

//         <hr className="border-[#333333] my-4" />

//         {/* Music */}
//         <section>
//           <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2 mb-3">
//             <MusicNotes size={18} /> Now Playing
//           </h3>
//           {loadingMusic && <p className="text-sm text-[#666]">Loading music...</p>}
//           {errorMusic && <p className="text-sm text-red-500">Error: {errorMusic}</p>}
//           {!loadingMusic && !errorMusic && music.length === 0 && (
//             <p className="text-sm text-[#666]">No music found for this mood.</p>
//           )}
//           <ul className="text-sm text-[#B0B0B0] space-y-2">
//             {music.map(({ id, name, artists, preview_url, external_urls }) => (
//               <li key={id} className="flex flex-col">
//                 <span className="font-semibold">{name}</span>
//                 <span className="text-xs text-[#999] italic">
//                   by {artists.map(artist => artist.name).join(', ')}
//                 </span>
//                 {preview_url ? (
//                   <audio controls src={preview_url} className="mt-1 rounded w-full">
//                     Your browser does not support the audio element.
//                   </audio>
//                 ) : (
//                   <a
//                     href={external_urls.spotify}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-indigo-400 hover:underline text-xs mt-1"
//                   >
//                     Listen on Spotify →
//                   </a>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </section>

//         <hr className="border-[#333333] my-4" />

//         {/* Books */}
//         <section>
//           <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2 mb-3">
//             <Book size={18} /> Mood Books & Sounds
//           </h3>
//           {loadingBooks && <p className="text-sm text-[#666]">Loading books...</p>}
//           {errorBooks && <p className="text-sm text-red-500">Error: {errorBooks}</p>}
//           {!loadingBooks && !errorBooks && books.length === 0 && (
//             <p className="text-sm text-[#666]">No books found for this mood.</p>
//           )}
//           <ul className="text-sm text-[#B0B0B0] space-y-3">
//             {books.map(({ id, title, authors, thumbnail, infoLink }) => (
//               <li key={id} className="flex items-center gap-3">
//                 {thumbnail ? (
//                   <img
//                     src={thumbnail}
//                     alt={title}
//                     className="w-12 h-18 rounded-md object-cover flex-shrink-0"
//                     loading="lazy"
//                   />
//                 ) : (
//                   <div className="w-12 h-18 bg-gray-700 rounded-md flex-shrink-0" />
//                 )}
//                 <div>
//                   <p className="font-semibold">{title}</p>
//                   <p className="text-xs text-[#999] italic">{authors}</p>
//                   <a
//                     href={infoLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-indigo-400 hover:underline text-xs"
//                   >
//                     More info →
//                   </a>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </section>

//         <hr className="border-[#333333] my-4" />

//         {/* Creative Highlights */}
//         <section>
//           <h3 className="text-sm font-semibold text-purple-400 flex items-center gap-2 mb-3">
//             <Notebook size={18} /> Creative Highlights
//           </h3>
//           <ul className="text-sm text-[#B0B0B0] space-y-2">
//             <li>📝 “Moonlight feels like velvet” — @aurorapoet</li>
//             <li>🎨 “Color palette: midnight blues & soft grays” — @artfuldreams</li>
//             <li>🎭 “Duet posts sparked my creativity!” — @duetlover</li>
//           </ul>
//         </section>
//       </div>

//       {/* Hidden scrollbar styling */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 0px;
//           background: transparent;
//         }
//         .custom-scrollbar {
//           scrollbar-width: none; /* Firefox */
//           -ms-overflow-style: none; /* IE 10+ */
//         }
//       `}</style>
//     </aside>
//   );
// }
// components/RightSidebar.jsx
'use client';

import React from 'react';

export default function RightSidebar() {
  return (
    <aside className="space-y-6 hidden lg:block sticky top-10 h-fit">
      {/* Reading List */}
      <div className="relative bg-[#101826]/80 backdrop-blur-sm p-5 rounded-2xl border border-[#1e293b] shadow-xl shadow-black/30 hover:scale-[1.01] transition-all duration-300 ease-in-out group">
        <div className="absolute -inset-[2px] rounded-[18px] bg-gradient-to-tr from-[#0f172a] via-[#334155] to-[#1e293b] opacity-20 blur-sm group-hover:opacity-30 transition-all duration-500"></div>
        <h3 className="text-lg font-semibold mb-3 text-slate-200">Reading List</h3>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>
            <span className="block leading-snug">Hard Boiled Wonderland and the End of the World</span>
            <span className="text-xs text-slate-500">May 2026</span>
          </li>
          <li className="pt-2">
            <span className="block leading-snug">Ways of Seeing</span>
            <span className="text-xs text-slate-500">Feb 2023</span>
          </li>
        </ul>
      </div>

      {/* Featured Moods */}
      <div className="relative bg-[#101826]/80 backdrop-blur-sm p-5 rounded-2xl border border-[#1e293b] shadow-xl shadow-black/30 hover:scale-[1.01] transition-all duration-300 ease-in-out group">
        <div className="absolute -inset-[2px] rounded-[18px] bg-gradient-to-tr from-[#0f172a] via-[#334155] to-[#1e293b] opacity-20 blur-sm group-hover:opacity-30 transition-all duration-500"></div>
        <h3 className="text-lg font-semibold mb-3 text-slate-200">Featured Moods</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 text-sm rounded-full bg-[#2e3b4e] text-[#cbd5e1] hover:bg-[#475569] transition">surreal</span>
          <span className="px-3 py-1 text-sm rounded-full bg-[#2e3b4e] text-[#cbd5e1] hover:bg-[#475569] transition">introspective</span>
          <span className="px-3 py-1 text-sm rounded-full bg-[#2e3b4e] text-[#cbd5e1] hover:bg-[#475569] transition">nostalgic</span>
        </div>
      </div>

      {/* Watchlist */}
      <div className="relative bg-[#101826]/80 backdrop-blur-sm p-5 rounded-2xl border border-[#1e293b] shadow-xl shadow-black/30 hover:scale-[1.01] transition-all duration-300 ease-in-out group">
        <div className="absolute -inset-[2px] rounded-[18px] bg-gradient-to-tr from-[#0f172a] via-[#334155] to-[#1e293b] opacity-20 blur-sm group-hover:opacity-30 transition-all duration-500"></div>
        <h3 className="relative z-10 text-lg font-semibold mb-4 text-slate-200 flex items-center gap-2">
          Watchlist
        </h3>
        <div className="relative z-10 space-y-4">
          <div className="flex gap-3 items-start">
            <img
              src="https://prod-images.tcm.com/Master-Profile-Images/bluevelvet1986.69242.jpg"
              alt="Blue Velvet"
              className="w-16 h-24 rounded object-cover shadow-md"
            />
            <div>
              <p className="text-slate-300 font-medium">Blue Velvet</p>
              <p className="text-xs italic text-slate-500">Lynch’s suburban surrealism and menace</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <img
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQnz3CDUS1ZnLyYYHA-pr8Cj9xNTMob0BE0YX3ram83CTn9Gew_12Cg5M3EgcFH7jhSZVokzw"
              alt="Vanilla Sky"
              className="w-16 h-24 rounded object-cover shadow-md"
            />
            <div>
              <p className="text-slate-300 font-medium">Vanilla Sky</p>
              <p className="text-xs italic text-slate-500">Reality-bending dreams, heartbreak, memory</p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ61_AyP0XLwhgPOaHOmEfrSnhFUJTVO7jR7J4mH_GktvNsmo6J0ooRZ5LhNxATNJblwRGPPbxvSEUlXFNgZCqbquqAoqhWxWtN_wjCR-Y"
              alt="Mulholland Drive"
              className="w-16 h-24 rounded object-cover shadow-md"
            />
            <div>
              <p className="text-slate-300 font-medium">Mulholland Drive</p>
              <p className="text-xs italic text-slate-500">Dream logic, identity collapse, Los Angeles noir</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
