'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function EchoTile({ post, onClick }) {
  if (!post.media || post.media.length === 0) return null;

  const imageUrl = post.media.find((m) => m.type === 'image' || m.type === 'gif')?.url;
  if (!imageUrl) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="overflow-hidden rounded-xl cursor-pointer"
      onClick={() => onClick(post)}
    >
      <img
        src={imageUrl}
        alt="Echoed post"
        className="w-full h-auto object-cover rounded-xl shadow-md hover:brightness-110 transition"
        loading="lazy"
      />
    </motion.div>
  );
}
