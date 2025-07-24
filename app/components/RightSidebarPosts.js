"use client";

import { useState, useEffect } from "react";
import PostCard from "./PostCard"; // adjust path if needed

export default function RightSidebarPosts({ userEmail }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) return <p className="p-4 text-gray-400">Loading posts...</p>;
  if (!posts.length) return <p className="p-4 text-gray-400">No posts found.</p>;

  return (
    <aside className="w-[580px] p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-[#1e293b] rounded-md border border-[#334155]">
      <h2 className="text-xl font-semibold mb-4 text-[#94a3b8]">Popular Echoes</h2>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} userEmail={userEmail} />
        ))}
      </div>
    </aside>
  );
}
