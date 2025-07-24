// import { useState } from "react";

// export default function TumblrStyledPost({ post, userEmail }) {
//   const [echoesCount, setEchoesCount] = useState(post.echoesCount || 0);
//   const [echoing, setEchoing] = useState(false);

//   async function handleEcho() {
//     if (!userEmail) {
//       alert("Please log in to echo.");
//       return;
//     }

//     setEchoing(true);

//     try {
//       const res = await fetch("/api/echo", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: userEmail, postId: post._id }),
//       });

//       const data = await res.json();
//       if (res.ok && data.success) {
//         setEchoesCount((count) => count + 1);
//       } else {
//         alert(data.error || "Failed to echo.");
//       }
//     } catch (error) {
//       alert("Error echoing post.");
//     }

//     setEchoing(false);
//   }

//   // Then in your Echo button area (where <FaRetweet /> is rendered), update:

//   <motion.div
//     whileTap={{ scale: 0.9 }}
//     className="flex items-center gap-1 cursor-pointer hover:text-white transition"
//     onClick={handleEcho}
//   >
//     <FaRetweet />
//     <span className="text-sm">{echoesCount}</span>
//     {echoing && <span className="ml-1 text-xs text-yellow-300">...</span>}
//   </motion.div>

//   // rest of your component ...
// }
'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { FaRetweet } from "react-icons/fa";

export default function TumblrStyledPost({ post, userEmail }) {
  const [echoesCount, setEchoesCount] = useState(post.echoesCount || 0);
  const [echoing, setEchoing] = useState(false);

  async function handleEcho() {
    if (!userEmail) {
      alert("Please log in to echo.");
      return;
    }

    setEchoing(true);

    try {
      const res = await fetch("/api/echo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, postId: post._id }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setEchoesCount((count) => count + 1);
      } else {
        alert(data.error || "Failed to echo.");
      }
    } catch (error) {
      alert("Error echoing post.");
    }

    setEchoing(false);
  }

  return (
    <div className="p-4 bg-zinc-900 rounded-xl mb-4 shadow">
      <div className="text-lg font-semibold mb-2 text-white">{post.title}</div>
      <div className="text-sm text-zinc-300 mb-4 whitespace-pre-wrap">{post.content}</div>

      <motion.div
        whileTap={{ scale: 0.9 }}
        className="flex items-center gap-1 cursor-pointer hover:text-white text-zinc-400"
        onClick={handleEcho}
      >
        <FaRetweet />
        <span className="text-sm">{echoesCount}</span>
        {echoing && <span className="ml-1 text-xs text-yellow-300">...</span>}
      </motion.div>
    </div>
  );
}
