
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  Search,
  Bell,
  MessageCircle,
  Book,
  Star,
  Menu,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const LoginModal = dynamic(() => import('./LoginModal'), { ssr: false });

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="w-full sticky top-0 z-50 bg-[#0f1a27] border-b border-[#14161f] backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3">
          {/* Top: Logo + Menu */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-extrabold text-gray-300 tracking-wide"
            >
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden text-white"
              >
                <Menu size={22} />
              </button>
              Poison Tree
            </Link>

            {!session && (
              <div className="sm:hidden flex items-center gap-2">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-indigo-900 hover:bg-indigo-950 text-white text-xs px-4 py-1.5 rounded-full font-semibold"
                >
                  Log In
                </button>
              </div>
            )}
          </div>

          {/* Middle: Search bar */}
          <div className="w-full sm:max-w-md md:max-w-lg flex items-center bg-[#14161f] px-4 py-2 rounded-full ring-1 ring-indigo-600/40">
            <Search className="w-5 h-5 text-indigo-400 mr-2" />
            <input
              type="text"
              placeholder="Search Poisons"
              className="bg-transparent outline-none text-sm text-white flex-grow placeholder-indigo-400"
            />
          </div>

          {/* Right: User or Auth Buttons */}
          <div className="flex items-center justify-end gap-3">
            {session ? (
              <div className="flex items-center gap-2" ref={dropdownRef}>
                <button className="p-2 rounded-full hover:bg-[#1a2735]/50">
                  <MessageCircle className="w-5 h-5 text-indigo-300" />
                </button>
                <button className="p-2 rounded-full hover:bg-[#1a2735]/50">
                  <Book className="w-5 h-5 text-indigo-300" />
                </button>

                {/* ✅ Express Button - animated with glow */}
                <motion.button
                  onClick={() => router.push('/express')}
                  className="flex items-center gap-1 px-3 py-2 bg-[#121620] border border-[#1a2735] text-yellow-300 rounded-full cursor-pointer"
                  style={{ '--glow-color': 'rgba(253,224,71,0.8)' }}
                  initial="rest"
                  whileHover="hover"
                  whileFocus="focus"
                  variants={{
                    rest: { scale: 1, boxShadow: 'none' },
                    hover: {
                      scale: 1.08,
                      boxShadow:
                        '0 0 14px 4px var(--glow-color), inset 0 0 14px 4px var(--glow-color)',
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    },
                    focus: {
                      scale: 1.08,
                      boxShadow:
                        '0 0 14px 4px var(--glow-color), inset 0 0 14px 4px var(--glow-color)',
                      transition: { duration: 0.3, ease: 'easeInOut' },
                    },
                  }}
                >
                  <Star className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Express</span>
                </motion.button>

                <button className="p-2 rounded-full hover:bg-[#1a2735]/50">
                  <Bell className="w-5 h-5 text-indigo-300" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="relative rounded-full focus:outline-none"
                  >
                    <Image
                      src={session.user.image}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                  </button>
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-64 bg-[#121620] rounded-xl shadow-lg border border-[#1a2735] z-50 overflow-hidden"
                      >
                        <div className="p-4 border-b border-[#1a2735] flex gap-3 items-center">
                          <Image
                            src={session.user.image}
                            alt="User avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="text-sm">
                            <div className="font-semibold text-white">View Profile</div>
                            <div className="text-zinc-400 text-xs truncate">
                              {session.user.name || session.user.email}
                            </div>
                          </div>
                        </div>
                        <div className="p-2 text-sm text-white space-y-1">
                          <button className="hover:bg-[#1a2735]/60 w-full text-left px-3 py-2 rounded-md">
                            Edit Avatar
                          </button>
                          <button className="hover:bg-[#1a2735]/60 w-full text-left px-3 py-2 rounded-md">
                            Achievements
                          </button>
                          <button className="hover:bg-[#1a2735]/60 w-full text-left px-3 py-2 rounded-md">
                            Contributor Program
                          </button>
                          <button
                            onClick={() => signOut()}
                            className="hover:bg-[#1a2735]/60 w-full text-left px-3 py-2 rounded-md"
                          >
                            Log Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex gap-3">
                <button className="bg-[#121620] hover:bg-[#1a2735]/80 text-white text-sm px-5 py-2 rounded-full font-semibold">
                  Get App
                </button>
                <button
                  className="bg-indigo-900 hover:bg-indigo-950 text-white text-sm px-5 py-2 rounded-full font-semibold"
                  onClick={() => setIsLoginOpen(true)}
                >
                  Log In
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-[60] w-[270px] bg-[#101826] border-r border-blue-950 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="text-white"
          >
            <X size={24} />
          </button>
        </div>
        <Sidebar />
      </div>

      {/* Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
