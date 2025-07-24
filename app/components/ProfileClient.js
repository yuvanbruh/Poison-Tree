"use client";

import { useEffect, useState } from "react";
import EditProfileButton from "./EditProfileButton";
import ProfileTabs from "./Tabs/ProfileTabs";
import MoodHistory from "./MoodHistory";
import UserLinks from "./UserLinks";
import Badges from "./Badges";

export default function ProfileClient({ user, session }) {
  const [open, setOpen] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [privateCount, setPrivateCount] = useState(0);
  const [echoCount, setEchoCount] = useState(0);
  const [watchCount, setWatchCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [topMoods, setTopMoods] = useState([]);

  useEffect(() => {
    if (user?.posts) {
      const publicPosts = user.posts.filter((p) => p.visibility !== "Private");
      const privatePosts = user.posts.filter((p) => p.visibility === "Private");
      const echoes = user.posts.filter((p) => p.isEcho);
      const moods = {};
      user.posts.forEach((post) => {
        if (post.mood) moods[post.mood] = (moods[post.mood] || 0) + 1;
      });
      const sortedMoods = Object.entries(moods).sort((a, b) => b[1] - a[1]).slice(0, 3);

      setPostCount(publicPosts.length);
      setPrivateCount(privatePosts.length);
      setEchoCount(echoes.length);
      setTopMoods(sortedMoods);
    }

    if (user?.watchlist) setWatchCount(user.watchlist.length);
    if (user?.readingList) setReadCount(user.readingList.length);
  }, [user]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Moodful Banner */}
      <div
        className="h-[400px] w-full rounded-b-3xl relative overflow-hidden"
        style={{ background: user.currentMood?.color || "#3b0764" }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <span className="text-6xl">{user.currentMood?.emoji || "🌙"}</span>
          <p className="text-lg mt-2 italic text-gray-200">
            {user.currentMood?.description || "mood drifting..."}
          </p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-10">
        <div className="flex items-center gap-4">
          <img
            src={user.userImage}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-black shadow-xl object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.displayName}</h1>
            <p className="text-gray-400 mt-1 text-sm italic">{user.bio}</p>
            <div className="mt-2">
              <EditProfileButton session={session} user={user} />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2 text-sm text-gray-300">
          {(user.tags || ["#soft", "#emo", "#latenight"]).map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-gray-800 rounded-full hover:bg-gray-700 transition">
              {tag}
            </span>
          ))}
        </div>

        {/* Reveal Stats */}
        <div className="mt-8">
          <button
            onClick={() => setOpen(!open)}
            className="text-white text-sm bg-gray-800 px-4 py-2 rounded-full hover:bg-gray-700 transition"
          >
            {open ? "Hide Stats" : "Reveal Creative Footprint"}
          </button>

          {open && (
            <div className="mt-4 space-y-3 bg-gray-900 p-4 rounded-2xl shadow-inner text-sm text-gray-300">
              <p>Public Posts: {postCount}</p>
              <p>Private Musings: {privateCount}</p>
              <p>Echoes: {echoCount}</p>
              <p>Watchlist: {watchCount}</p>
              <p>Reading List: {readCount}</p>
              <p className="mt-2 font-semibold text-white">Top Moods:</p>
              <div className="flex flex-wrap gap-2">
                {topMoods.map(([mood, count], i) => (
                  <span key={i} className="bg-gradient-to-br from-purple-700 to-indigo-700 px-3 py-1 rounded-full text-sm text-white">
                    {mood} × {count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-md">
            <Badges user={user} />
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 shadow-md">
            <MoodHistory user={user} />
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 shadow-md">
            <UserLinks user={user} />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 bg-gray-900 rounded-2xl p-6 shadow-md">
          <ProfileTabs user={user} />
        </div>

        {/* Posts Feed */}
        <div className="mt-10 columns-1 md:columns-2 gap-6 space-y-6">
          {user.posts.map((post) => (
            <div key={post._id} className="break-inside-avoid bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-2xl shadow-md hover:scale-[1.01] transition">
              <div className="text-xs uppercase text-gray-400 mb-2 tracking-wider">{post.moodTag}</div>
              <p className="text-white whitespace-pre-wrap">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
