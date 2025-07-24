
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaBolt,
  FaRegComment,
  FaRetweet,
  FaUserCircle,
  FaLock,
  FaShare,
} from 'react-icons/fa';
import { PiHeartStraightFill } from 'react-icons/pi';
import { BsThreeDots } from 'react-icons/bs';

export default function TumblrStyledPost({ post, userEmail }) {
  const ref = useRef();
  const [viewed, setViewed] = useState(false);
  const [echoesCount, setEchoesCount] = useState(post.echoesCount || 0);
  const [isEchoing, setIsEchoing] = useState(false);
  const [hasEchoed, setHasEchoed] = useState(post.hasEchoed || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(post.hasLiked || false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isPrivate = post.visibility === 'Private' || post.private;

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !viewed) {
          setViewed(true);
          await fetch('/api/interaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userEmail,
              postId: post._id,
              action: 'view',
              vector: post.vector,
            }),
          });
          await fetch('/api/mood-feed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail }),
          });
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [viewed, userEmail, post._id, post.vector]);

  async function handleEcho() {
    if (isEchoing) return;
    setIsEchoing(true);
    try {
      const res = await fetch('/api/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          postId: post._id,
          vector: post.vector,
        }),
      });
      if (res.ok) {
        setHasEchoed((prev) => !prev);
        setEchoesCount((count) => (hasEchoed ? count - 1 : count + 1));
      }
    } catch (error) {
      console.error('Echo fetch error:', error);
    } finally {
      setIsEchoing(false);
    }
  }

  async function handleLike() {
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetch('/api/Likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          postId: post._id,
          vector: post.vector,
        }),
      });
      if (res.ok) {
        setHasLiked((prev) => !prev);
        setLikesCount((count) => (hasLiked ? count - 1 : count + 1));
      }
      await fetch('/api/interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail,
          postId: post._id,
          action: 'like',
          vector: post.vector,
        }),
      });
    } catch (error) {
      console.error('Like fetch error:', error);
    } finally {
      setIsLiking(false);
    }
  }

  const renderMedia = () => {
    if (!Array.isArray(post.media) || post.media.length === 0) return null;

    return (
      <div className="mt-4 space-y-4">
        {post.media.map((mediaItem, idx) => {
          if (!mediaItem?.url) return null;
          const { url, type, altText } = mediaItem;

          if (type === 'image' || type === 'gif') {
            return (
              <img
                key={idx}
                src={url}
                alt={altText || 'post media'}
                className="w-full max-h-[600px] object-cover rounded-md"
              />
            );
          } else if (type === 'video') {
            return (
              <video
                key={idx}
                controls
                className="w-full object-cover rounded-md border-y border-[#475569]"
              >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            );
          }
        })}
      </div>
    );
  };

  function formatPostTime(dateString) {
    const postDate = new Date(dateString);
    const now = new Date();
    const isToday =
      postDate.getDate() === now.getDate() &&
      postDate.getMonth() === now.getMonth() &&
      postDate.getFullYear() === now.getFullYear();

    return isToday
      ? postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : postDate.toLocaleString([], {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
      whileHover={{ scale: 1.01 }}
      className={`max-w-2xl mx-auto mb-6 bg-[#101826]/80 backdrop-blur-sm p-5 rounded-2xl border border-[#1e293b] shadow-xl shadow-black/30 hover:scale-[1.01] transition-all duration-300 ease-in-out break-inside-avoid w-full sm:w-auto
        ${isPrivate ? 'opacity-60 blur-sm hover:blur-none hover:opacity-100' : ''}`}
    >
      {/* Header */}
      <div className="relative flex flex-wrap sm:flex-nowrap items-center justify-between px-2 sm:px-5 pt-2 pb-2 hover:bg-[#33465e] transition-colors duration-300">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          {post.avatarUrl ? (
            <img
              src={post.avatarUrl}
              alt={`${post.username}'s avatar`}
              className="w-10 h-10 rounded-full border border-[#475569] ring-2 ring-[#475569]/40 hover:ring-[#c084fc]/50 transition"
            />
          ) : (
            <FaUserCircle className="text-3xl text-[#f1f5f9]" />
          )}
          <Link
            href={`/users/${post.username}/${post._id}`}
            scroll={false}
            className="font-semibold text-sm sm:text-base text-blue-400 hover:underline"
          >
            @{post.username}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-[#2f4a68] text-xs sm:text-sm text-[#e2e8f0] px-3 sm:px-4 py-1 rounded-md hover:bg-[#334155] transition">
            Follow
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-[#e2e8f0] hover:text-white"
          >
            <BsThreeDots />
          </button>

          {menuOpen && (
            <div className="absolute right-4 top-12 w-64 z-50 bg-[#1e293b] text-[#e2e8f0] shadow-xl rounded-lg border border-[#334155]">
              <div className="px-4 py-2 text-xs text-gray-400">
                {formatPostTime(post.createdAt)}
              </div>
              <ul className="flex flex-col text-sm">
                <li className="px-4 py-2 hover:bg-[#334155] cursor-pointer">Copy link</li>
                <li className="px-4 py-2 hover:bg-[#334155] cursor-pointer">Not interested in this post</li>
                <li className="px-4 py-2 hover:bg-[#334155] cursor-pointer">Not interested in this blog</li>
                <li className="px-4 py-2 hover:bg-[#334155] cursor-pointer">Follow post</li>
                <li className="px-4 py-2 hover:bg-[#334155] cursor-pointer">Suggest content label</li>
                <li className="px-4 py-2 text-red-400 hover:bg-[#334155] cursor-pointer">Report post</li>
                <li className="px-4 py-2 text-red-400 hover:bg-[#334155] cursor-pointer">Block @{post.username || 'user'}</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[#334155]" />

      {/* Content */}
      <div className="p-3 sm:p-5 text-[#e2e8f0]">
        {post.title && (
          <h2 className="text-base sm:text-lg font-semibold mb-2 leading-snug whitespace-pre-wrap">
            {post.title}
          </h2>
        )}

        {post.text && (
          <p className="mb-4 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
            {post.text}
          </p>
        )}

        {renderMedia()}

        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 text-sm text-[#94a3b8]">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-[#334155] px-2 py-1 rounded-full hover:bg-[#475569] transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-wrap justify-around items-center px-2 sm:px-5 py-3 text-lg border-t border-[#334155] text-[#e2e8f0] gap-4">
        <motion.div whileTap={{ scale: 0.9 }} className="flex items-center gap-1 cursor-pointer hover:text-white transition">
          <FaRegComment />
          <span className="text-sm">{post.commentsCount || 0}</span>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-1 cursor-pointer transition ${isEchoing ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-400'} ${hasEchoed ? 'text-blue-500' : ''}`}
          onClick={handleEcho}
        >
          <FaRetweet />
          <span className="text-sm">{echoesCount}</span>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-1 cursor-pointer transition ${isLiking ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-400'} ${hasLiked ? 'text-blue-500' : ''}`}
          onClick={handleLike}
        >
          <PiHeartStraightFill />
          <span className="text-sm">{likesCount}</span>
        </motion.div>

        <motion.div whileTap={{ scale: 0.9 }} className="flex items-center gap-1 cursor-pointer hover:text-white transition">
          <FaShare />
          <span className="text-sm">Share</span>
        </motion.div>

        {isPrivate && <FaLock className="text-[#facc15] text-sm ml-1" title="Private Post" />}
      </div>
    </motion.div>
  );
}
