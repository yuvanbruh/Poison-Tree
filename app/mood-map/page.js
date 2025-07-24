
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useSession } from 'next-auth/react';
// // import {
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   CartesianGrid
// // } from 'recharts';
// // import { cn } from '@/lib/utils';

// // const moodLabels = ['Grouper', 'Radiohead', 'Nirvana', 'Hozier', 'Gorillaz'];

// // function formatDateLabel(dateStr) {
// //   const d = new Date(dateStr);
// //   return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
// // }

// // function formatTooltip(value) {
// //   const index = Math.round(value) - 1;
// //   const label = moodLabels[index] || 'Unknown';
// //   return [`${label} (${value.toFixed(2)})`, 'Mood'];
// // }

// // function getPoeticReflection(label) {
// //   switch (label) {
// //  case 'Grouper':
// //       return "Her ambient, haunting, emotionally weightless sound — isolation, dissociation.";
// //     case 'Radiohead':
// //       return "Paranoia, digital alienation, mental noise — OK Computer, Kid A energy.";
// //     case 'Nirvana':
// //       return "Grunge, inner pain meeting raw rebellion — In Utero, Nevermind vibes.";
// //     case 'Hozier':
// //       return "Gothic romance, earthly yearning — poetic ache.";
// //     case 'Gorillaz':
// //       return "Futuristic melancholy, detached groove, surreal dreaminess.";
// //     default:
// //       return "You're wandering uncharted moods.";
// //   }
// // }

// // function getSeasonalEcho(label) {
// //   switch (label) {
// //     case 'Grouper': return "This feels like a late November dusk.";
// //     case 'Radiohead': return "This mood reminds you of a rainy March midnight.";
// //     case 'Nirvana': return "Like a distorted summer afternoon.";
// //     case 'Hozier': return "You’re echoing an October ritual.";
// //     case 'Gorillaz': return "This mood belongs to surreal spring nights.";
// //     default: return "Time is blurred here.";
// //   }
// // }

// // export default function MoodInsights() {
// //   const { data: session } = useSession();
// //   const [data, setData] = useState([]);
// //   const [currentMood, setCurrentMood] = useState('Radiohead');

// //   useEffect(() => {
// //     const fetchMoodData = async () => {
// //       if (!session?.user?.email) return;

// //       try {
// //         const res = await fetch(`/api/mood-insights?userEmail=${session.user.email}`);
// //         const raw = await res.json();

// //         if (!Array.isArray(raw)) return;

// //         const moods = raw.map(d => d.mood);
// //         const minMood = Math.min(...moods);
// //         const maxMood = Math.max(...moods);

// //         const scaled = raw.map(entry => ({
// //           date: entry.date,
// //           mood:
// //             minMood === maxMood
// //               ? 3
// //               : 1 + ((entry.mood - minMood) / (maxMood - minMood + 0.001)) * 4
// //         }));

// //         setData(scaled);

// //         const latest = scaled[scaled.length - 1];
// //         setCurrentMood(moodLabels[Math.round(latest?.mood || 2) - 1]);
// //       } catch (err) {
// //         console.error('Error fetching mood data:', err);
// //       }
// //     };

// //     fetchMoodData();
// //   }, [session]);

// //   return (
// //     <div
// //       className={cn(
// //         'w-full max-w-5xl mx-auto p-6 rounded-3xl shadow-2xl transition-all duration-700',
// //         'bg-[#23374d]' // static background color
// //       )}
// //     >
// //       {/* Mood Atmosphere */}
// //       <div className="text-center text-white mb-6">
// //         <h2 className="text-2xl font-bold tracking-wide"></h2>
// //         <p className="italic text-sm opacity-80 mt-1">
// //           Try listening to <span className="font-semibold">{currentMood}</span>
// //         </p>
// //       </div>

// //       {/* Mood Reflections */}
// //       <div className=" p-4 rounded-xl mb-6 text-white text-center backdrop-blur">
// //         <p className="text-sm italic">{getPoeticReflection(currentMood)}</p>
// //       </div>

// //       {/* Mood Line Chart */}
// //       <div className="mb-8 bg-[#1c2c3e] rounded-2xl " >
// //         <h3 className="text-[#82ca9d] text-lg font-semibold mb-2 text-center">Mood Over Time</h3>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
// //             <CartesianGrid strokeDasharray="3 3" stroke="#444" />
// //             <XAxis dataKey="date" tickFormatter={formatDateLabel} stroke="#ccc" fontSize={12} />
// //             <YAxis
// //               domain={[1, 5]}
// //               ticks={[1, 2, 3, 4, 5]}
// //               tickFormatter={(value) => moodLabels[Math.round(value) - 1] || value}
// //               stroke="#ccc"
// //               fontSize={12}
// //             />
// //             <Tooltip
// //               formatter={formatTooltip}
// //               labelStyle={{ color: '#ccc' }}
// //               contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#444' }}
// //             />
// //             <Line
// //               type="monotone"
// //               dataKey="mood"
// //               stroke="#9df3c4"
// //               strokeWidth={2}
// //               dot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#82ca9d' }}
// //               activeDot={{ r: 8 }}
// //             />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </div>

// //       {/* Similar Users Map */}
// //       <div className="mt-6  bg-black/20 p-4 rounded-xl text-white backdrop-blur">
// //         <h3 className="text-lg  font-medium mb-2 ">Similar Users Map</h3>
// //         <p className="text-sm opacity-80">
// //           You’re emotionally aligned with other users in this phase. Explore mutuals with overlapping arcs soon.
// //         </p>
// //         <div className="mt-4 w-full h-48 bg-gradient-to-br from-[#3f3f57] to-[#2d2d3e] rounded-lg flex items-center justify-center text-xs text-white/60">
// //           🗺️ Interactive Map Coming Soon...
// //         </div>
// //       </div>

// //       {/* Seasonal Echo */}
// //       <div className="mt-6 text-center text-white italic text-sm opacity-80">
// //         {getSeasonalEcho(currentMood)}
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid
// } from 'recharts';
// import { cn } from '@/lib/utils';

// const moodLabels = ['Grouper', 'Radiohead', 'Nirvana', 'Hozier', 'Gorillaz'];

// const filmQuotes = [
//   {
//     quote: "We accept the love we think we deserve.",
//     source: 'The Perks of Being a Wallflower',
//     musicFact: "Curt Cobain’s poster is seen in Charlie’s room.",
//   },
//   {
//     quote: "It is happening again.",
//     source: 'Twin Peaks: Fire Walk with Me',
//     musicFact: "Badalamenti’s eerie jazz influenced Grouper’s dream tones.",
//   },
//   {
//     quote: "I don't know where I am. I don't know what's happening to me.",
//     source: 'Mulholland Drive',
//     musicFact: "Grouper’s 'Poison Tree' mirrors this dissociative spiral.",
//   },
//   {
//     quote: "I’m not afraid of dying. I’m afraid I haven’t been alive enough.",
//     source: 'Synecdoche, New York',
//     musicFact: "Radiohead’s existential ache echoes this film’s soul.",
//   },
//   {
//     quote: "This is a very morbid place.",
//     source: 'Persona (1966)',
//     musicFact: "Ingmar Bergman’s silence shaped ambient modernism.",
//   },
// ];

// function formatDateLabel(dateStr) {
//   const d = new Date(dateStr);
//   return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
// }

// function formatTooltip(value) {
//   const index = Math.round(value) - 1;
//   const label = moodLabels[index] || 'Unknown';
//   return [`${label} (${value.toFixed(2)})`, 'Mood'];
// }

// function getPoeticReflection(label) {
//   switch (label) {
//     case 'Grouper':
//       return "Her ambient, haunting, emotionally weightless sound — isolation, dissociation.";
//     case 'Radiohead':
//       return "Paranoia, digital alienation, mental noise — OK Computer, Kid A energy.";
//     case 'Nirvana':
//       return "Grunge, inner pain meeting raw rebellion — In Utero, Nevermind vibes.";
//     case 'Hozier':
//       return "Gothic romance, earthly yearning — poetic ache.";
//     case 'Gorillaz':
//       return "Futuristic melancholy, detached groove, surreal dreaminess.";
//     default:
//       return "You're wandering uncharted moods.";
//   }
// }

// function getSeasonalEcho(label) {
//   switch (label) {
//     case 'Grouper': return "This feels like a late November dusk.";
//     case 'Radiohead': return "This mood reminds you of a rainy March midnight.";
//     case 'Nirvana': return "Like a distorted summer afternoon.";
//     case 'Hozier': return "You’re echoing an October ritual.";
//     case 'Gorillaz': return "This mood belongs to surreal spring nights.";
//     default: return "Time is blurred here.";
//   }
// }

// export default function MoodInsights() {
//   const { data: session } = useSession();
//   const [data, setData] = useState([]);
//   const [currentMood, setCurrentMood] = useState('Radiohead');
//   const [quote, setQuote] = useState(null);

//   useEffect(() => {
//     const random = Math.floor(Math.random() * filmQuotes.length);
//     setQuote(filmQuotes[random]);
//   }, []);

//   useEffect(() => {
//     const fetchMoodData = async () => {
//       if (!session?.user?.email) return;

//       try {
//         const res = await fetch(`/api/mood-insights?userEmail=${session.user.email}`);
//         const raw = await res.json();

//         if (!Array.isArray(raw)) return;

//         const moods = raw.map(d => d.mood);
//         const minMood = Math.min(...moods);
//         const maxMood = Math.max(...moods);

//         const scaled = raw.map(entry => ({
//           date: entry.date,
//           mood:
//             minMood === maxMood
//               ? 3
//               : 1 + ((entry.mood - minMood) / (maxMood - minMood + 0.001)) * 4
//         }));

//         setData(scaled);

//         const latest = scaled[scaled.length - 1];
//         setCurrentMood(moodLabels[Math.round(latest?.mood || 2) - 1]);
//       } catch (err) {
//         console.error('Error fetching mood data:', err);
//       }
//     };

//     fetchMoodData();
//   }, [session]);

//   if (!session?.user) {
//     return (
//       <div className="bg-[#0f1a27] p-6 rounded-2xl text-white text-center max-w-xl mx-auto shadow-xl">
//         {/* <h2 className="text-2xl font-semibold mb-2">🎧 Mood Listening Station</h2>
//         <p className="text-sm mb-6 italic">Preview the sound of your mood</p> */}

//         {quote && (
//           <>
//             <blockquote className="text-lg font-medium leading-snug mb-3">
//               “{quote.quote}”
//             </blockquote>
//             <p className="text-sm text-[#aaaaaa] mb-2">— <em>{quote.source}</em></p>
//             <p className="text-sm text-[#7e9cbb] mb-6 italic">{quote.musicFact}</p>
//           </>
//         )}

//         <div className="bg-[#1c293a] px-4 py-3 rounded-xl text-sm text-[#cbd5e1]">
//           🎶 <em>Preview player coming soon...</em>
//         </div>

//         <div className="mt-6 text-xs text-[#888]">
//           Want your <strong>personalized Mood Map</strong>?{' '}
//           Log in to explore deeper.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={cn(
//       'w-full max-w-5xl mx-auto p-6 rounded-3xl shadow-2xl transition-all duration-700',
//       'bg-[#23374d]'
//     )}>
//       {/* Mood Atmosphere */}
//       <div className="text-center text-white mb-6">
//         <h2 className="text-2xl font-bold tracking-wide">Your Mood Landscape</h2>
//         <p className="italic text-sm opacity-80 mt-1">
//           Try listening to <span className="font-semibold">{currentMood}</span>
//         </p>
//       </div>

//       {/* Mood Reflections */}
//       <div className="p-4 rounded-xl mb-6 text-white text-center backdrop-blur">
//         <p className="text-sm italic">{getPoeticReflection(currentMood)}</p>
//       </div>

//       {/* Mood Line Chart */}
//       <div className="mb-8 bg-[#1c2c3e] rounded-2xl">
//         <h3 className="text-[#82ca9d] text-lg font-semibold mb-2 text-center">Mood Over Time</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//             <XAxis dataKey="date" tickFormatter={formatDateLabel} stroke="#ccc" fontSize={12} />
//             <YAxis
//               domain={[1, 5]}
//               ticks={[1, 2, 3, 4, 5]}
//               tickFormatter={(value) => moodLabels[Math.round(value) - 1] || value}
//               stroke="#ccc"
//               fontSize={12}
//             />
//             <Tooltip
//               formatter={formatTooltip}
//               labelStyle={{ color: '#ccc' }}
//               contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#444' }}
//             />
//             <Line
//               type="monotone"
//               dataKey="mood"
//               stroke="#9df3c4"
//               strokeWidth={2}
//               dot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#82ca9d' }}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Similar Users Map */}
//       <div className="mt-6 bg-black/20 p-4 rounded-xl text-white backdrop-blur">
//         <h3 className="text-lg font-medium mb-2">Similar Users Map</h3>
//         <p className="text-sm opacity-80">
//           You’re emotionally aligned with other users in this phase. Explore mutuals with overlapping arcs soon.
//         </p>
//         <div className="mt-4 w-full h-48 bg-gradient-to-br from-[#3f3f57] to-[#2d2d3e] rounded-lg flex items-center justify-center text-xs text-white/60">
//           🗺️ Interactive Map Coming Soon...
//         </div>
//       </div>

//       {/* Seasonal Echo */}
//       <div className="mt-6 text-center text-white italic text-sm opacity-80">
//         {getSeasonalEcho(currentMood)}
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { cn } from '@/lib/utils';

const moodLabels = ['Grouper', 'Radiohead', 'Nirvana', 'Hozier', 'Gorillaz'];

const filmQuotes = [
  {
    quote: "We accept the love we think we deserve.",
    source: 'The Perks of Being a Wallflower',
    musicFact: "Curt Cobain’s poster is seen in Charlie’s room.",
  },
  {
    quote: "It is happening again.",
    source: 'Twin Peaks: Fire Walk with Me',
    musicFact: "Badalamenti’s eerie jazz influenced Grouper’s dream tones.",
  },
  {
    quote: "I don't know where I am. I don't know what's happening to me.",
    source: 'Mulholland Drive',
    musicFact: "Grouper’s 'Poison Tree' mirrors this dissociative spiral.",
  },
  {
    quote: "I’m not afraid of dying. I’m afraid I haven’t been alive enough.",
    source: 'Synecdoche, New York',
    musicFact: "Radiohead’s existential ache echoes this film’s soul.",
  },
  {
    quote: "This is a very morbid place.",
    source: 'Persona (1966)',
    musicFact: "Ingmar Bergman’s silence shaped ambient modernism.",
  },
];

function formatDateLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

function formatTooltip(value) {
  const index = Math.round(value) - 1;
  const label = moodLabels[index] || 'Unknown';
  return [`${label} (${value.toFixed(2)})`, 'Mood'];
}

function getPoeticReflection(label) {
  switch (label) {
    case 'Grouper':
      return "Her ambient, haunting, emotionally weightless sound — isolation, dissociation.";
    case 'Radiohead':
      return "Paranoia, digital alienation, mental noise — OK Computer, Kid A energy.";
    case 'Nirvana':
      return "Grunge, inner pain meeting raw rebellion — In Utero, Nevermind vibes.";
    case 'Hozier':
      return "Gothic romance, earthly yearning — poetic ache.";
    case 'Gorillaz':
      return "Futuristic melancholy, detached groove, surreal dreaminess.";
    default:
      return "You're wandering uncharted moods.";
  }
}

function getSeasonalEcho(label) {
  switch (label) {
    case 'Grouper': return "This feels like a late November dusk.";
    case 'Radiohead': return "This mood reminds you of a rainy March midnight.";
    case 'Nirvana': return "Like a distorted summer afternoon.";
    case 'Hozier': return "You’re echoing an October ritual.";
    case 'Gorillaz': return "This mood belongs to surreal spring nights.";
    default: return "Time is blurred here.";
  }
}

export default function MoodInsights() {
  const { data: session } = useSession();
  const [data, setData] = useState([]);
  const [currentMood, setCurrentMood] = useState('Radiohead');
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const random = Math.floor(Math.random() * filmQuotes.length);
    setQuote(filmQuotes[random]);
  }, []);

  useEffect(() => {
    const fetchMoodData = async () => {
      if (!session?.user?.email) return;

      try {
        const res = await fetch(`/api/mood-insights?userEmail=${session.user.email}`);
        const raw = await res.json();

        if (!Array.isArray(raw)) return;

        const moods = raw.map(d => d.mood);
        const minMood = Math.min(...moods);
        const maxMood = Math.max(...moods);

        const scaled = raw.map(entry => ({
          date: entry.date,
          mood:
            minMood === maxMood
              ? 3
              : 1 + ((entry.mood - minMood) / (maxMood - minMood + 0.001)) * 4
        }));

        setData(scaled);

        const latest = scaled[scaled.length - 1];
        setCurrentMood(moodLabels[Math.round(latest?.mood || 2) - 1]);
      } catch (err) {
        console.error('Error fetching mood data:', err);
      }
    };

    fetchMoodData();
  }, [session]);

  if (!session?.user) {
    return (
      <div className="bg-[#0f1a27] p-6 sm:p-8 rounded-2xl text-white text-center max-w-xl mx-auto shadow-xl">
        {quote && (
          <>
            <blockquote className="text-lg sm:text-xl font-medium leading-snug mb-3">
              “{quote.quote}”
            </blockquote>
            <p className="text-sm text-[#aaaaaa] mb-2">— <em>{quote.source}</em></p>
            <p className="text-sm text-[#7e9cbb] mb-6 italic">{quote.musicFact}</p>
          </>
        )}

        <div className="bg-[#1c293a] px-4 py-3 rounded-xl text-sm text-[#cbd5e1]">
          🎶 <em>Preview player coming soon...</em>
        </div>

        <div className="mt-6 text-xs text-[#888] px-2">
          Want your <strong>personalized Mood Map</strong>?{' '}
          <span className="underline">Log in to explore deeper.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl transition-all duration-700',
      'bg-[#23374d]'
    )}>
      <div className="text-center text-white mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-wide">Your Mood Landscape</h2>
        <p className="italic text-sm opacity-80 mt-1">
          Try listening to <span className="font-semibold">{currentMood}</span>
        </p>
      </div>

      <div className="p-4 rounded-xl mb-6 text-white text-center backdrop-blur">
        <p className="text-sm italic">{getPoeticReflection(currentMood)}</p>
      </div>

      <div className="mb-8 bg-[#1c2c3e] rounded-2xl p-2 sm:p-4">
        <h3 className="text-[#82ca9d] text-md sm:text-lg font-semibold mb-2 text-center">
          Mood Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" tickFormatter={formatDateLabel} stroke="#ccc" fontSize={10} />
            <YAxis
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(value) => moodLabels[Math.round(value) - 1] || value}
              stroke="#ccc"
              fontSize={10}
            />
            <Tooltip
              formatter={formatTooltip}
              labelStyle={{ color: '#ccc' }}
              contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#444' }}
            />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#9df3c4"
              strokeWidth={2}
              dot={{ r: 4, stroke: '#fff', strokeWidth: 2, fill: '#82ca9d' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-black/20 p-4 sm:p-6 rounded-xl text-white backdrop-blur">
        <h3 className="text-md sm:text-lg font-medium mb-2">Similar Users Map</h3>
        <p className="text-sm opacity-80">
          You’re emotionally aligned with other users in this phase. Explore mutuals with overlapping arcs soon.
        </p>
        <div className="mt-4 w-full h-48 bg-gradient-to-br from-[#3f3f57] to-[#2d2d3e] rounded-lg flex items-center justify-center text-xs text-white/60">
          🗺️ Interactive Map Coming Soon...
        </div>
      </div>

      <div className="mt-6 text-center text-white italic text-sm opacity-80">
        {getSeasonalEcho(currentMood)}
      </div>
    </div>
  );
}
