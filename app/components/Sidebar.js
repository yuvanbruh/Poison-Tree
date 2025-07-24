
// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import {
//   House,
//   MapTrifold,
//   Heart,
//   BookOpen,
//   MusicNotes,
//   FilmSlate,
//   UsersThree,
//   PenNib,
//   Sparkle,
//   Smiley,
//   Gear,
//   UserCircle,
//   Palette,
//   Binoculars,
// } from 'phosphor-react';

// const core = [
//   { label: 'Home', icon: <House size={20} weight="duotone" />, href: '/home' },
//    { label: 'Explore', icon: <BookOpen size={20} weight="duotone" />, href: '/discover' },
//   { label: 'Mood Map', icon: <MapTrifold size={20} weight="duotone" />, href: '/mood-map' },
//   { label: 'Echoes', icon: <Heart size={20} weight="duotone" />, href: '/echoes' },
//   { label: 'Journals', icon: <BookOpen size={20} weight="duotone" />, href: '/journals' },
 
// ];

// const creative = [
//   { label: 'Music', icon: <MusicNotes size={20} weight="duotone" />, href: '/creative/music' },
//   { label: 'Movies', icon: <FilmSlate size={20} weight="duotone" />, href: '/creative/movies' },
//   { label: 'People', icon: <UsersThree size={20} weight="duotone" />, href: '/creative/people' },
//   { label: 'Writing', icon: <PenNib size={20} weight="duotone" />, href: '/creative/writing' },
//   { label: 'Highlights', icon: <Sparkle size={20} weight="duotone" />, href: '/creative/highlights' },
// ];

// const discover = [
//   { label: 'Featured Moods', icon: <Smiley size={20} weight="duotone" />, href: '/discover/moods' },
//   { label: 'Watchlist', icon: <FilmSlate size={20} weight="duotone" />, href: '/discover/watchlist' },
//   { label: 'Reading List', icon: <BookOpen size={20} weight="duotone" />, href: '/discover/reading-list' },
//   { label: 'Vibe With', icon: <UsersThree size={20} weight="duotone" />, href: '/discover/vibe' },
// ];

// function MenuSection({ title, items, isOpen, toggleOpen, id }) {
//   const pathname = usePathname();

//   return (
//     <div className="space-y-1">
//       <button
//         onClick={toggleOpen}
//         aria-expanded={isOpen}
//         aria-controls={id}
//         className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500 hover:text-indigo-300 transition focus:outline-none"
//       >
//         <span>{title}</span>
//         <span>{isOpen ? '−' : '+'}</span>
//       </button>
//       {isOpen && (
//         <nav id={id} className="ml-1 flex flex-col gap-1" role="menu" aria-label={title}>
//           {items.map(({ label, icon, href }) => {
//             const isActive = pathname === href;
//             return (
//               <Link
//                 key={label}
//                 href={href}
//                 className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition
//                   ${
//                     isActive
//                       ? 'bg-[#162233] text-indigo-300 ring-2 ring-indigo-400'
//                       : 'text-neutral-400 hover:bg-neutral-800 hover:text-indigo-300'
//                   }
//                   focus:outline-none focus:ring-2 focus:ring-indigo-400`}
//                 role="menuitem"
//               >
//                 {icon}
//                 <span>{label}</span>
//               </Link>
//             );
//           })}
//         </nav>
//       )}
//     </div>
//   );
// }

// export default function LeftSidebar() {
//   const [showCreative, setShowCreative] = useState(true);
//   const [showDiscover, setShowDiscover] = useState(true);
//   const pathname = usePathname();

//   return (
//     <aside className="fixed w-[272px] border-r border-blue-950
//  min-h-screen bg-[#101826] text-white px-4 py-6   flex flex-col gap-6 overflow-y-auto z-50 custom-scrollbar">
  
//       {/* Mood Snapshot */}
//   {/* Mood Snapshot */}
// {/* bg-[#101826]/80 backdrop-blur-sm p-5 rounded-2xl border border-[#1e293b] shadow-xl shadow-black/30 hover:scale-[1.01] transition-all duration-300 ease-in-out */}

//       {/* Core Navigation */}
//       <nav className="flex flex-col gap-1">
//         {core.map(({ label, icon, href }) => {
//           const isActive = pathname === href;
//           return (
//             <Link
//               key={label}
//               href={href}
//               className={`flex items-center gap-4 px-3 py-2 rounded transition
//                 ${
//                   isActive
//                     ? 'bg-[#162233] text-indigo-300 ring-2 ring-indigo-400'
//                     : 'hover:bg-neutral-800 text-neutral-400'
//                 }
//                 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
//             >
//               {icon}
//               <span>{label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       <MenuSection
//         title="Creative"
//         items={creative}
//         isOpen={showCreative}
//         toggleOpen={() => setShowCreative(!showCreative)}
//         id="creative-menu"
//       />

//       <MenuSection
//         title="Discover"
//         items={discover}
//         isOpen={showDiscover}
//         toggleOpen={() => setShowDiscover(!showDiscover)}
//         id="discover-menu"
//       />

//       {/* Footer Quick Links */}
//       <div className="border-t border-neutral-800 pt-4 mt-auto text-xs text-neutral-500 space-y-2">
//         <Link href="/profile" className="flex items-center gap-2 hover:underline">
//           <UserCircle size={16} weight="duotone" />
//           Profile
//         </Link>
//         <Link href="/settings" className="flex items-center gap-2 hover:underline">
//           <Gear size={16} weight="duotone" />
//           Settings
//         </Link>
//         <Link href="/themes" className="flex items-center gap-2 hover:underline">
//           <Palette size={16} />
//           Themes
//         </Link>
//         <Link href="/explore" className="flex items-center gap-2 hover:underline">
//           <Binoculars size={16} />
//           Explore
//         </Link>
//         <Link href="/about" className="hover:underline block">About</Link>
//         <Link href="/help" className="hover:underline block">Help</Link>
//       </div>
//     </aside>
//   );
// }
// this is the best code above one use this after starting to buld another pages . but for now use the current below one .
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  House,
  MapTrifold,
  Heart,
  BookOpen,
  MusicNotes,
  FilmSlate,
  UsersThree,
  PenNib,
  Sparkle,
  Smiley,
  Gear,
  UserCircle,
  Palette,
  Binoculars,
} from 'phosphor-react';

const core = [
  { label: 'Home', icon: <House size={20} weight="duotone" />, href: '/home' },
  { label: 'Explore', icon: <BookOpen size={20} weight="duotone" />, href: '/' },
  { label: 'Mood Map', icon: <MapTrifold size={20} weight="duotone" />, href: '/mood-map' },
  { label: 'Echoes', icon: <Heart size={20} weight="duotone" />, href: '/echoes' },
  { label: 'Journals', icon: <BookOpen size={20} weight="duotone" />, href: '/progress' },
];

const creative = [
  { label: 'Music', icon: <MusicNotes size={20} weight="duotone" />, href: '/progress' },
  { label: 'Movies', icon: <FilmSlate size={20} weight="duotone" />, href: '/progress' },
  { label: 'People', icon: <UsersThree size={20} weight="duotone" />, href: '/progress' },
  { label: 'Writing', icon: <PenNib size={20} weight="duotone" />, href: '/progress' },
  { label: 'Highlights', icon: <Sparkle size={20} weight="duotone" />, href: '/progress' },
];

const discover = [
  { label: 'Featured Moods', icon: <Smiley size={20} weight="duotone" />, href: '/progress' },
  { label: 'Watchlist', icon: <FilmSlate size={20} weight="duotone" />, href: '/progress' },
  { label: 'Reading List', icon: <BookOpen size={20} weight="duotone" />, href: '/progress' },
  { label: 'Vibe With', icon: <UsersThree size={20} weight="duotone" />, href: '/progress' },
];

function MenuSection({ title, items, isOpen, toggleOpen, id, activeProgressLabel, setActiveProgressLabel }) {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      <button
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={id}
        className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500 hover:text-indigo-300 transition focus:outline-none"
      >
        <span>{title}</span>
        <span>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <nav id={id} className="ml-1 flex flex-col gap-1" role="menu" aria-label={title}>
          {items.map(({ label, icon, href }) => {
            const isProgress = href === '/progress';
            const isActive = isProgress ? activeProgressLabel === label : pathname === href;

            return (
              <Link
                key={label}
                href={href}
                onClick={() => {
                  if (isProgress) setActiveProgressLabel(label);
                }}
                className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition
                  ${
                    isActive
                      ? 'bg-[#162233] text-indigo-300 ring-2 ring-indigo-400'
                      : 'text-neutral-400 hover:bg-neutral-800 hover:text-indigo-300'
                  }
                  focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                role="menuitem"
              >
                {icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export default function LeftSidebar() {
  const [showCreative, setShowCreative] = useState(true);
  const [showDiscover, setShowDiscover] = useState(true);
  const [activeProgressLabel, setActiveProgressLabel] = useState('');
  const pathname = usePathname();

  return (
    <aside className="fixed w-[272px] border-r border-blue-950 min-h-screen bg-[#101826] text-white px-4 py-6 flex flex-col gap-6 overflow-y-auto z-50 custom-scrollbar">
      {/* Core Navigation */}
      <nav className="flex flex-col gap-1">
        {core.map(({ label, icon, href }) => {
          const isProgress = href === '/progress';
          const isActive = isProgress
            ? activeProgressLabel === label
            : pathname === href;

          return (
            <Link
              key={label}
              href={href}
              onClick={() => {
                if (isProgress) setActiveProgressLabel(label);
              }}
              className={`flex items-center gap-4 px-3 py-2 rounded transition
                ${
                  isActive
                    ? 'bg-[#162233] text-indigo-300 ring-2 ring-indigo-400'
                    : 'hover:bg-neutral-800 text-neutral-400'
                }
                focus:outline-none focus:ring-2 focus:ring-indigo-400`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Expandable Sections */}
      <MenuSection
        title="Creative"
        items={creative}
        isOpen={showCreative}
        toggleOpen={() => setShowCreative(!showCreative)}
        id="creative-menu"
        activeProgressLabel={activeProgressLabel}
        setActiveProgressLabel={setActiveProgressLabel}
      />

      <MenuSection
        title="Discover"
        items={discover}
        isOpen={showDiscover}
        toggleOpen={() => setShowDiscover(!showDiscover)}
        id="discover-menu"
        activeProgressLabel={activeProgressLabel}
        setActiveProgressLabel={setActiveProgressLabel}
      />

      {/* Footer Quick Links */}
      <div className="border-t border-neutral-800 pt-4 mt-auto text-xs text-neutral-500 space-y-2">
        <Link href="/profile" className="flex items-center gap-2 hover:underline">
          <UserCircle size={16} weight="duotone" />
          Profile
        </Link>
        <Link href="/settings" className="flex items-center gap-2 hover:underline">
          <Gear size={16} weight="duotone" />
          Settings
        </Link>
        <Link href="/themes" className="flex items-center gap-2 hover:underline">
          <Palette size={16} />
          Themes
        </Link>
        <Link href="/explore" className="flex items-center gap-2 hover:underline">
          <Binoculars size={16} />
          Explore
        </Link>
        <Link href="/about" className="hover:underline block">About</Link>
        <Link href="/help" className="hover:underline block">Help</Link>
      </div>
    </aside>
  );
}
