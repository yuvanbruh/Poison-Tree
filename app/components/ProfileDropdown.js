'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfileDropdown({ user }) {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 z-50">
      <div className="p-4 border-b border-zinc-800 flex gap-3 items-center">
        <Image
          src={user.image}
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="text-sm">
          <div className="font-medium text-white">View Profile</div>
          <div className="text-zinc-400 text-xs">{user.name || user.email}</div>
        </div>
      </div>
      <div className="p-2 text-sm text-white space-y-1">
        <button className="hover:bg-zinc-800 w-full text-left px-3 py-2 rounded-md">
          Edit Avatar
        </button>
        <button className="hover:bg-zinc-800 w-full text-left px-3 py-2 rounded-md">
          Achievements
        </button>
        <button className="hover:bg-zinc-800 w-full text-left px-3 py-2 rounded-md">
          Contributor Program
        </button>
        <button className="hover:bg-zinc-800 w-full text-left px-3 py-2 rounded-md">
          Dark Mode
        </button>
        <button
          onClick={() => signOut()}
          className="hover:bg-zinc-800 w-full text-left px-3 py-2 rounded-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
