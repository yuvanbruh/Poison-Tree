"use client";
import { useEffect, useState } from "react";

export default function ProfileStats({ user }) {
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
        if (post.mood) {
          moods[post.mood] = (moods[post.mood] || 0) + 1;
        }
      });

      const sortedMoods = Object.entries(moods)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

      setPostCount(publicPosts.length);
      setPrivateCount(privatePosts.length);
      setEchoCount(echoes.length);
      setTopMoods(sortedMoods);
    }

    if (user?.watchlist) setWatchCount(user.watchlist.length);
    if (user?.readingList) setReadCount(user.readingList.length);
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Social Stats */}
      <StatGroup title="👥 Social">
        <Stat label="Followers" value={user.followers.length} />
        <Stat label="Following" value={user.following.length} />
      </StatGroup>

      {/* Creative Stats */}
      <StatGroup title="🖋️ Creative">
        <Stat label="Posts (Public)" value={postCount} />
        <Stat label="Private Posts" value={privateCount} />
        <Stat label="Echoes" value={echoCount} />
      </StatGroup>

      {/* Collection Stats */}
      <StatGroup title="📚 Collections">
        <Stat label="Watchlist" value={watchCount} />
        <Stat label="Reading List" value={readCount} />
      </StatGroup>

      {/* Top Moods */}
      {topMoods.length > 0 && (
        <div className="mt-2">
          <h4 className="text-md text-white font-semibold mb-2">💫 Top Moods</h4>
          <div className="flex flex-wrap gap-2">
            {topMoods.map(([mood, count], i) => (
              <span
                key={i}
                className="bg-gradient-to-br from-purple-700 to-indigo-700 px-3 py-1 rounded-full text-sm text-white"
              >
                {mood} × {count}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mood Sparkline Placeholder */}
      <div className="mt-6">
        <p className="text-sm text-gray-400 mb-1">📈 Mood Sparkline</p>
        <div className="h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl flex items-center justify-center text-xs text-gray-500 italic">
          coming soon...
        </div>
      </div>
    </div>
  );
}

function StatGroup({ title, children }) {
  return (
    <div>
      <h4 className="text-md text-white font-semibold mb-2">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-400">
        {children}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  );
}
