'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRegComment,
  FaRetweet,
  FaShare,
  FaUserCircle,
  FaLock,
} from 'react-icons/fa';
import { PiHeartStraightFill } from 'react-icons/pi';

export default function PostModal({ post, userEmail, onClose }) {
  const ref = useRef();
  const isPrivate = post.visibility === 'Private' || post.private;
  const [viewed, setViewed] = useState(false);

  const [echoesCount, setEchoesCount] = useState(post.echoesCount || 0);
  const [isEchoing, setIsEchoing] = useState(false);
  const [hasEchoed, setHasEchoed] = useState(post.hasEchoed || false);

  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [hasLiked, setHasLiked] = useState(post.hasLiked || false);

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
        body: JSON.stringify({ email: userEmail, postId: post._id, vector: post.vector }),
      });

      if (res.ok) {
        setHasEchoed((prev) => !prev);
        setEchoesCount((count) => (hasEchoed ? count - 1 : count + 1));
      }
    } catch (err) {
      console.error('Echo error:', err);
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
        body: JSON.stringify({ email: userEmail, postId: post._id, vector: post.vector }),
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
    } catch (err) {
      console.error('Like error:', err);
    } finally {
      setIsLiking(false);
    }
  }

  const renderMedia = () => {
    if (!Array.isArray(post.media) || post.media.length === 0) return null;

    return (
      <div className="mt-4">
        {post.media.map((mediaItem, idx) => {
          if (!mediaItem?.url) return null;
          const { url, type, altText } = mediaItem;

          if (type === 'image' || type === 'gif') {
            return (
              <img
                key={idx}
                src={url}
                alt={altText || 'media'}
                className="w-full max-h-[450px] object-cover rounded-lg mb-4"
              />
            );
          }

          if (type === 'video') {
            return (
              <video
                key={idx}
                controls
                className="w-full max-h-[450px] object-cover rounded-lg mb-4 border-y border-[#475569]"
              >
                <source src={url} type="video/mp4" />
              </video>
            );
          }

          return null;
        })}
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`bg-[#23374d] text-[#e2e8f0] rounded-xl max-w-2xl w-full p-5 overflow-y-auto max-h-[90vh] border border-[#2c3749] shadow-lg ${
            isPrivate ? 'opacity-60 blur-sm hover:blur-none hover:opacity-100' : ''
          }`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {post.avatarUrl ? (
                <img
                  src={post.avatarUrl}
                  className="w-10 h-10 rounded-full border border-[#475569] ring-2 ring-[#475569]/40"
                  alt="avatar"
                />
              ) : (
                <FaUserCircle className="text-3xl text-[#f1f5f9]" />
              )}
              <span className="text-blue-400 font-semibold text-sm">@{post.username}</span>
            </div>
            <button className="bg-[#2f4a68] text-sm text-[#e2e8f0] px-4 py-1 rounded-md hover:bg-[#334155] transition">
              Follow
            </button>
          </div>

          {/* Content */}
          {post.title && <h2 className="text-xl font-bold mb-2">{post.title}</h2>}
          {post.text && <p className="text-sm mb-4 whitespace-pre-wrap">{post.text}</p>}
          {renderMedia()}

          {/* Footer */}
          <div className="flex items-center justify-around text-xl mt-4 pt-4 border-t border-[#334155] text-[#e2e8f0]">
            <motion.div whileTap={{ scale: 0.9 }} className="flex items-center gap-1 hover:text-white cursor-pointer">
              <FaRegComment />
              <span className="text-sm">{post.commentsCount || 0}</span>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={handleEcho}
              className={`flex items-center gap-1 cursor-pointer transition ${
                isEchoing ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-400'
              } ${hasEchoed ? 'text-blue-500' : ''}`}
            >
              <FaRetweet />
              <span className="text-sm">{echoesCount}</span>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`flex items-center gap-1 cursor-pointer transition ${
                isLiking ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-400'
              } ${hasLiked ? 'text-blue-500' : ''}`}
            >
              <PiHeartStraightFill />
              <span className="text-sm">{likesCount}</span>
            </motion.div>

            <motion.div whileTap={{ scale: 0.9 }} className="flex items-center gap-1 hover:text-white cursor-pointer">
              <FaShare />
              <span className="text-sm">Share</span>
            </motion.div>

            {isPrivate && <FaLock className="text-[#facc15] text-sm ml-1" title="Private Post" />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
