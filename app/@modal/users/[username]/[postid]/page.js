
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ProfileModal() {
  const router = useRouter();
  const params = useParams();
  const username = params?.username;

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [mediaPosts, setMediaPosts] = useState([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await fetch(`/api/profile/${username}`);
        if (!resUser.ok) throw new Error("User fetch failed");
        const dataUser = await resUser.json();
        setUser(dataUser);

        const resPosts = await fetch(`/api/posts/user/${username}`);
        if (!resPosts.ok) throw new Error("Posts fetch failed");
        const dataPosts = await resPosts.json();
        setPosts(dataPosts);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    if (username) fetchData();
  }, [username]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/api/profile/suggestions`);
        if (!res.ok) throw new Error("Suggestions fetch failed");
        const data = await res.json();
        setSuggestions(data || []);
      } catch (err) {
        console.error("Suggestions fetch error:", err);
      }
    };
    fetchSuggestions();
  }, []);

  useEffect(() => {
    const fetchMediaPosts = async () => {
      try {
        const res = await fetch('/api/posts/media');
        const data = await res.json();
        setMediaPosts(data);
      } catch (err) {
        console.error('Media fetch error:', err);
      }
    };
    fetchMediaPosts();
  }, []);

  if (!user) return null;

  return (
    <>
      <style jsx global>{`
        /* Hide scrollbars but keep scrollable */
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ and Edge */
          overflow-y: scroll; /* keep scroll enabled */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center  bg-black/60 backdrop-blur-sm"
        style={{ backgroundColor: '' }}
        onClick={() => router.back()}
      >
        <div
          className="w-[960px] max-h-[90vh] text-white rounded-md shadow-xl flex overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{ backgroundColor: '#444444' }}
        >
          {/* Left Sidebar */}
          <div className="w-[420px] border-r border-neutral-800 hide-scrollbar relative" style={{ backgroundColor: '#444444' }}>
            {/* Banner */}
            <div className="h-[160px] w-full relative">
              <Image
                src={user.bannerImage || '/banner-default.jpg'}
                alt="banner"
                fill
                className="object-cover"
              />
            </div>

            {/* Avatar */}
            <div className="absolute top-[100px] left-[50%] -translate-x-1/2 z-10">
              <Image
                src={user.userImage || '/default-avatar.png'}
                alt="Avatar"
                width={80}
                height={80}
                className="rounded-full border-4 border-[#444444] object-cover"
              />
            </div>

            {/* Username + Actions */}
            <div className="mt-[60px] text-center px-4 pb-4">
              <p className="text-sm font-semibold">@{user.username}</p>

              <div className="flex justify-center gap-2 mt-3">
                {['📩', '📋', '🎁', '➕', '⋯'].map((icon, i) => (
                  <button
                    key={i}
                    className="p-2 rounded-full hover:bg-[#575757] transition"
                    style={{ backgroundColor: '#444444' }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2" style={{ backgroundColor: '#444444' }}>
              <p className="text-xs uppercase font-semibold text-neutral-400 mb-3">
                Check these out
              </p>
              <div className="space-y-3">
                {suggestions.map((sug) => (
                  <div
                    key={sug._id}
                    className="flex justify-between items-center gap-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={sug.userImage || '/default-avatar.png'}
                        alt="user"
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium leading-none">{sug.username}</p>
                        <p className="text-xs text-neutral-400 truncate w-[120px]">
                          {sug.displayName || ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="text-blue-400 text-sm hover:underline">
                        Follow
                      </button>
                      <button className="text-neutral-400 hover:text-red-400">
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* More Like This */}
            <div className="w-full p-4 border-t border-neutral-800 mt-4" style={{ backgroundColor: '#444444' }}>
              <p className="text-sm font-semibold text-neutral-300 mb-3">More like this</p>
              <div className="grid grid-cols-3 gap-2">
                {mediaPosts.map((post, i) => (
                  <div key={i} className="aspect-[3/4] rounded-md overflow-hidden p-1 text-sm" style={{ backgroundColor: '#444444' }}>
                    {post.media?.[0]?.type === 'image' ? (
                      <Image
                        src={post.media[0].url}
                        alt={post.media[0].altText || 'media'}
                        width={300}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    ) : post.media?.[0]?.type === 'video' ? (
                      <video className="w-full h-full object-cover" muted loop autoPlay>
                        <source src={post.media[0].url} type="video/mp4" />
                      </video>
                    ) : post.type === 'song' ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-violet-700 text-white">
                        <p className="text-xs text-center px-2">{post.text}</p>
                        <span className="text-2xl mt-2">▶</span>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-center px-2" style={{ backgroundColor: '#444444' }}>
                        <p className="text-xs line-clamp-6">{post.text}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Posts */}
          <div className="w-[540px] p-6 hide-scrollbar overflow-y-scroll" style={{ backgroundColor: '#444444' }}>
            {posts.length === 0 && (
              <p className="text-neutral-500 text-sm">No posts yet.</p>
            )}
            {posts.map((post) => (
              <div
                key={post._id}
                className="mb-6 border-b border-neutral-800 pb-4"
                style={{ backgroundColor: '#444444' }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src={post.avatarUrl || '/default-avatar.png'}
                    alt="avatar"
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">{post.username}</p>
                    <p className="text-xs text-neutral-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{post.text}</p>
                {post.media?.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {post.media.map((m, idx) =>
                      m.type === 'image' ? (
                        <Image
                          key={idx}
                          src={m.url}
                          alt={m.altText || 'media'}
                          width={500}
                          height={280}
                          className="rounded-md object-cover"
                        />
                      ) : (
                        <video
                          key={idx}
                          controls
                          className="rounded-md w-full mt-2"
                        >
                          <source src={m.url} type="video/mp4" />
                        </video>
                      )
                    )}
                  </div>
                )}
                <div className="flex gap-4 text-xs mt-2 text-neutral-500">
                  <span>❤️ {post.likesCount}</span>
                  <span>💬 {post.commentsCount}</span>
                  <span>🔁 {post.echoesCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
