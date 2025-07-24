'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaRegComment,
  FaRetweet,
  FaUserCircle,
  FaLock,
  FaShare,
} from 'react-icons/fa';
import { PiHeartStraightFill } from 'react-icons/pi';
// import PostModal from './PostModal'; // optional

const bgColors = ['#202f45', '#1e2a3e', '#2a1e34', '#1b2e2d', '#2b2538'];

export default function Explore({ post, userEmail }) {
  const ref = useRef();
  const [viewed, setViewed] = useState(false);
  const [echoesCount, setEchoesCount] = useState(post.echoesCount || 0);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [hasEchoed, setHasEchoed] = useState(post.hasEchoed || false);
  const [hasLiked, setHasLiked] = useState(post.hasLiked || false);
  const [isEchoing, setIsEchoing] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  // const [showModal, setShowModal] = useState(false); // optional modal

  const isPrivate = post.visibility === 'Private' || post.private;
  const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

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
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [viewed]);

  async function handleEcho() {
    if (isEchoing) return;
    setIsEchoing(true);
    try {
      const res = await fetch('/api/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, postId: post._id }),
      });
      if (res.ok) {
        setHasEchoed(!hasEchoed);
        setEchoesCount((prev) => prev + (hasEchoed ? -1 : 1));
      }
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
        body: JSON.stringify({ email: userEmail, postId: post._id }),
      });
      if (res.ok) {
        setHasLiked(!hasLiked);
        setLikesCount((prev) => prev + (hasLiked ? -1 : 1));
      }
    } finally {
      setIsLiking(false);
    }
  }

  return (
    <>
      <motion.div
        ref={ref}
        // onClick={() => setShowModal(true)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="break-inside-avoid rounded-2xl shadow-md hover:shadow-lg transition-all border border-white/10 cursor-pointer transform hover:scale-[1.02] hover:brightness-110 duration-200 ease-in-out relative"
        style={{ backgroundColor: bgColor }}
      >
        {/* First media image if present */}
        {post.media?.[0]?.url && (
          <img
            src={post.media[0].url}
            alt="Post media"
            className="w-full rounded-t-2xl object-cover max-h-[280px]"
          />
        )}

        <div className="p-5 space-y-4 text-[#cdd6e0]">
          {/* Avatar + Username */}
          <div className="flex items-center gap-3">
            {post.avatarUrl ? (
              <img
                src={post.avatarUrl}
                className="w-8 h-8 rounded-full border border-gray-600"
                alt="avatar"
              />
            ) : (
              <FaUserCircle className="text-2xl text-gray-300" />
            )}
            <Link
              href={`/users/${post.username}/${post._id}`}
              className="text-sm text-[#B0B6C3] hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              @{post.username}
            </Link>
          </div>

          {/* Title */}
          {post.title && (
            <h2 className="text-lg font-semibold text-white leading-snug">
              {post.title}
            </h2>
          )}

          {/* Text */}
          {post.text && (
            <p className="text-sm text-white whitespace-pre-wrap leading-relaxed tracking-wide">
              {post.text.length > 300 ? post.text.slice(0, 300) + '…' : post.text}
            </p>
          )}

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs text-gray-300">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="bg-white/10 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around items-center px-4 py-3 border-t border-white/10 text-[#7C8493] text-sm">
          <button className="flex items-center gap-1 hover:text-white">
            <FaRegComment />
            {post.commentsCount || 0}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEcho();
            }}
            className={`flex items-center gap-1 ${
              hasEchoed ? 'text-blue-300' : 'hover:text-blue-200'
            }`}
          >
            <FaRetweet />
            {echoesCount}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className={`flex items-center gap-1 ${
              hasLiked ? 'text-pink-400' : 'hover:text-pink-300'
            }`}
          >
            <PiHeartStraightFill />
            {likesCount}
          </button>
          <button className="hover:text-white">
            <FaShare />
          </button>
        </div>

        {isPrivate && (
          <div className="absolute bottom-3 right-3 text-yellow-500">
            <FaLock title="Private Post" />
          </div>
        )}
      </motion.div>

      {/* {showModal && <PostModal post={post} onClose={() => setShowModal(false)} />} */}
    </>
  );
}
