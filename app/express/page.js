
// // "use client";

// // import { useState } from "react";
// // import { useSession } from "next-auth/react";
// // import PostCard from "../components/PostCard";

// // export default function HomePage() {
// //   const { data: session, status } = useSession();
// //   const [text, setText] = useState("");
// //   const [media, setMedia] = useState(null);
// //   const [preview, setPreview] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [feed, setFeed] = useState([]);
// //   const [visibility, setVisibility] = useState("public");

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     setMedia(file);
// //     if (file) {
// //       setPreview(URL.createObjectURL(file));
// //     }
// //   };

// //   async function handleSubmit(e) {
// //     e.preventDefault();

// //     if (!session) {
// //       alert("You must be signed in to post.");
// //       return;
// //     }

// //     if (!text.trim()) {
// //       alert("Post text cannot be empty.");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const embedRes = await fetch("/api/embed", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ text }),
// //       });
// //       const embedData = await embedRes.json();
// //       if (!embedRes.ok) throw new Error(embedData.error || "Embedding failed");

// //       let uploadedMedia = [];

// //       if (media) {
// //         const formData = new FormData();
// //         formData.append("file", media);
// //         const sigRes = await fetch("/api/cloudinary", { method: "POST" });
// //         const { signature, paramsToSign } = await sigRes.json();

// //         formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
// //         formData.append("timestamp", paramsToSign.timestamp);
// //         formData.append("folder", paramsToSign.folder);
// //         formData.append("signature", signature);

// //         const uploadRes = await fetch(
// //           `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
// //           { method: "POST", body: formData }
// //         );

// //         const uploadResult = await uploadRes.json();
// //         if (uploadRes.ok) {
// //           uploadedMedia.push({
// //             url: uploadResult.secure_url,
// //             type: uploadResult.resource_type,
// //             altText: media.name || "Media",
// //           });
// //         } else {
// //           throw new Error("Cloudinary upload failed");
// //         }
// //       }

// //       const saveRes = await fetch("/api/post", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           email: session.user.email,
// //           text,
// //           type: "tweet",
// //           vector: embedData.vector,
// //           visibility,
// //           media: uploadedMedia,
// //           tags: [],
// //         }),
// //       });
// //       const savedPost = await saveRes.json();
// //       if (!saveRes.ok) throw new Error(savedPost.error || "Save post failed");

// //       const feedRes = await fetch("/api/feed", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ vector: embedData.vector }),
// //       });
// //       const feedPosts = await feedRes.json();
// //       if (!feedRes.ok) throw new Error(feedPosts.error || "Feed fetch failed");

// //       setFeed(feedPosts);
// //       setText("");
// //       setMedia(null);
// //       setPreview(null);
// //     } catch (error) {
// //       alert(error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <div
// //       className="min-h-screen bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-8"
// //       style={{
// //         backgroundImage: `url('https://theindianmusicdiaries.com/wp-content/smush-webp/2021/05/lifafa.jpg.webp')`,
// //       }}
// //     >
// //       <div className="max-w-3xl mx-auto backdrop-blur-md bg-black/50 rounded-xl p-6 text-white shadow-xl">
// //         <h1 className="text-4xl font-extrabold text-center mb-6 tracking-tight">
// //           Mood & Vibe Posts
// //         </h1>

// //         {status === "loading" ? (
// //           <p className="text-center text-gray-300">Loading session...</p>
// //         ) : !session ? (
// //           <p className="text-center text-red-200 font-semibold">
// //             Please sign in to post and view vibe matches.
// //           </p>
// //         ) : (
// //           <>
// //             <form onSubmit={handleSubmit} className="mb-8 space-y-5">
// //               <textarea
// //                 placeholder="Share your vibe, quote, or thought..."
// //                 value={text}
// //                 onChange={(e) => setText(e.target.value)}
// //                 required
// //                 rows={4}
// //                 className="w-full p-3 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:outline-none border border-gray-600"
// //               />

// //               <input
// //                 type="file"
// //                 accept="image/*,video/*"
// //                 onChange={handleFileChange}
// //                 className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-indigo-700 file:text-white hover:file:bg-indigo-800"
// //               />

// //               {preview && (
// //                 <div>
// //                   <p className="text-sm mb-2 text-gray-300">Preview:</p>
// //                   {media?.type.startsWith("image") ? (
// //                     <img
// //                       src={preview}
// //                       alt="preview"
// //                       className="max-h-64 rounded-lg border border-gray-600"
// //                     />
// //                   ) : (
// //                     <video
// //                       controls
// //                       src={preview}
// //                       className="max-h-64 rounded-lg border border-gray-600"
// //                     />
// //                   )}
// //                 </div>
// //               )}

// //               <select
// //                 value={visibility}
// //                 onChange={(e) => setVisibility(e.target.value)}
// //                 className="w-full p-2 bg-black/40 text-white rounded-lg border border-gray-600"
// //               >
// //                 <option value="public">🌐 Public</option>
// //                 <option value="private">🔒 Private</option>
// //                 <option value="friends">👥 Friends</option>
// //                 <option value="community">🏡 Community</option>
// //               </select>

// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="w-full py-3 bg-indigo-700 hover:bg-indigo-800 rounded-lg font-semibold text-white transition duration-300"
// //               >
// //                 {loading ? "Uploading..." : "Submit & Find Vibe Matches"}
// //               </button>
// //             </form>

// //             <section>
// //               <h2 className="text-2xl font-bold mb-4">Vibe-Matched Posts</h2>
// //               {feed.length === 0 ? (
// //                 <p className="text-gray-300">No posts yet — add one!</p>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {feed.map((post) => (
// //                     <PostCard
// //                       key={post._id}
// //                       post={post}
// //                       userEmail={session.user.email}
// //                     />
// //                   ))}
// //                 </div>
// //               )}
// //             </section>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState } from 'react';
// import { useSession } from 'next-auth/react';
// import PostCard from '../components/PostCard';

// export default function HomePage() {
//   const { data: session, status } = useSession();
//   const [text, setText] = useState('');
//   const [media, setMedia] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [feed, setFeed] = useState([]);
//   const [visibility, setVisibility] = useState('public');

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setMedia(file);
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();

//     if (!session) {
//       alert('You must be signed in to post.');
//       return;
//     }

//     if (!text.trim()) {
//       alert('Post text cannot be empty.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const embedRes = await fetch('/api/embed', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text }),
//       });
//       const embedData = await embedRes.json();
//       if (!embedRes.ok) throw new Error(embedData.error || 'Embedding failed');

//       let uploadedMedia = [];

//       if (media) {
//         const formData = new FormData();
//         formData.append('file', media);
//         const sigRes = await fetch('/api/cloudinary', { method: 'POST' });
//         const { signature, paramsToSign } = await sigRes.json();

//         formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
//         formData.append('timestamp', paramsToSign.timestamp);
//         formData.append('folder', paramsToSign.folder);
//         formData.append('signature', signature);

//         const uploadRes = await fetch(
//           `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
//           { method: 'POST', body: formData }
//         );

//         const uploadResult = await uploadRes.json();
//         if (uploadRes.ok) {
//           uploadedMedia.push({
//             url: uploadResult.secure_url,
//             type: uploadResult.resource_type,
//             altText: media.name || 'Media',
//           });
//         } else {
//           throw new Error('Cloudinary upload failed');
//         }
//       }

//       const saveRes = await fetch('/api/post', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: session.user.email,
//           text,
//           type: 'tweet',
//           vector: embedData.vector,
//           visibility,
//           media: uploadedMedia,
//           tags: [],
//         }),
//       });
//       const savedPost = await saveRes.json();
//       if (!saveRes.ok) throw new Error(savedPost.error || 'Save post failed');

//       const feedRes = await fetch('/api/feed', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ vector: embedData.vector }),
//       });
//       const feedPosts = await feedRes.json();
//       if (!feedRes.ok) throw new Error(feedPosts.error || 'Feed fetch failed');

//       setFeed(feedPosts);
//       setText('');
//       setMedia(null);
//       setPreview(null);
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const isLoggedIn = session && status === 'authenticated';

//   return (
//     <div
//       className={`min-h-screen px-4 py-8 sm:px-8 ${
//         !isLoggedIn ? 'bg-cover bg-center bg-no-repeat' : 'bg-[#0e0f11]'
//       }`}
//       style={{
//         backgroundImage: !isLoggedIn
//           ? `url('https://theindianmusicdiaries.com/wp-content/smush-webp/2021/05/lifafa.jpg.webp')`
//           : 'none',
//       }}
//     >
//       <div
//         className={`max-w-3xl mx-auto ${
//           !isLoggedIn
//             ? 'backdrop-blur-md bg-black/50 text-white shadow-xl rounded-xl p-6'
//             : 'text-white'
//         }`}
//       >
//         <h1 className="text-4xl font-extrabold text-center mb-6 tracking-tight">
//           Mood & Vibe Posts
//         </h1>

//         {status === 'loading' ? (
//           <p className="text-center text-gray-300">Loading session...</p>
//         ) : !isLoggedIn ? (
//           <p className="text-center text-red-200 font-semibold text-lg">
//             Please log in to post and view vibe matches.
//           </p>
//         ) : (
//           <>
//             <form onSubmit={handleSubmit} className="mb-8 space-y-5">
//               <textarea
//                 placeholder="Share your vibe, quote, or thought..."
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 required
//                 rows={4}
//                 className="w-full p-3 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:outline-none border border-gray-600"
//               />

//               <input
//                 type="file"
//                 accept="image/*,video/*"
//                 onChange={handleFileChange}
//                 className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-indigo-700 file:text-white hover:file:bg-indigo-800"
//               />

//               {preview && (
//                 <div>
//                   <p className="text-sm mb-2 text-gray-300">Preview:</p>
//                   {media?.type.startsWith('image') ? (
//                     <img
//                       src={preview}
//                       alt="preview"
//                       className="max-h-64 rounded-lg border border-gray-600"
//                     />
//                   ) : (
//                     <video
//                       controls
//                       src={preview}
//                       className="max-h-64 rounded-lg border border-gray-600"
//                     />
//                   )}
//                 </div>
//               )}

//               <select
//                 value={visibility}
//                 onChange={(e) => setVisibility(e.target.value)}
//                 className="w-full p-2 bg-black/40 text-white rounded-lg border border-gray-600"
//               >
//                 <option value="public">🌐 Public</option>
//                 <option value="private">🔒 Private</option>
//                 <option value="friends">👥 Friends</option>
//                 <option value="community">🏡 Community</option>
//               </select>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 bg-indigo-700 hover:bg-indigo-800 rounded-lg font-semibold text-white transition duration-300"
//               >
//                 {loading ? 'Uploading...' : 'Submit & Find Vibe Matches'}
//               </button>
//             </form>

//             <section>
//               <h2 className="text-2xl font-bold mb-4">Vibe-Matched Posts</h2>
//               {feed.length === 0 ? (
//                 <p className="text-gray-300">No posts yet — add one!</p>
//               ) : (
//                 <div className="space-y-4">
//                   {feed.map((post) => (
//                     <PostCard
//                       key={post._id}
//                       post={post}
//                       userEmail={session.user.email}
//                     />
//                   ))}
//                 </div>
//               )}
//             </section>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import PostCard from '../components/PostCard';

export default function HomePage() {
  const { data: session, status } = useSession();
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]);
  const [visibility, setVisibility] = useState('public');

  const isLoggedIn = session && status === 'authenticated';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!session) {
      alert('You must be signed in to post.');
      return;
    }

    if (!text.trim()) {
      alert('Post text cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      const embedRes = await fetch('/api/embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const embedData = await embedRes.json();
      if (!embedRes.ok) throw new Error(embedData.error || 'Embedding failed');

      let uploadedMedia = [];

      if (media) {
        const formData = new FormData();
        formData.append('file', media);
        const sigRes = await fetch('/api/cloudinary', { method: 'POST' });
        const { signature, paramsToSign } = await sigRes.json();

        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        formData.append('timestamp', paramsToSign.timestamp);
        formData.append('folder', paramsToSign.folder);
        formData.append('signature', signature);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          { method: 'POST', body: formData }
        );

        const uploadResult = await uploadRes.json();
        if (uploadRes.ok) {
          uploadedMedia.push({
            url: uploadResult.secure_url,
            type: uploadResult.resource_type,
            altText: media.name || 'Media',
          });
        } else {
          throw new Error('Cloudinary upload failed');
        }
      }

      const saveRes = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          text,
          type: 'tweet',
          vector: embedData.vector,
          visibility,
          media: uploadedMedia,
          tags: [],
        }),
      });
      const savedPost = await saveRes.json();
      if (!saveRes.ok) throw new Error(savedPost.error || 'Save post failed');

      const feedRes = await fetch('/api/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vector: embedData.vector }),
      });
      const feedPosts = await feedRes.json();
      if (!feedRes.ok) throw new Error(feedPosts.error || 'Feed fetch failed');

      setFeed(feedPosts);
      setText('');
      setMedia(null);
      setPreview(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen px-4 py-8 sm:px-8 ${
        !isLoggedIn ? 'bg-cover bg-center bg-no-repeat' : 'bg-[##0f1a27]'
      }`}
      style={{
        backgroundImage: !isLoggedIn
          ? `url('https://theindianmusicdiaries.com/wp-content/smush-webp/2021/05/lifafa.jpg.webp')`
          : 'none',
      }}
    >
      {!isLoggedIn ? (
        <div className="flex items-center justify-center h-full min-h-[60vh] text-white text-xl font-semibold">
          Please log in to post.
        </div>
      ) : (
        <div className="max-w-3xl mx-auto text-white">
          <h1 className="text-4xl fonts-bold text-center mb-6 tracking-tight">
            Posts
          </h1>

          <form onSubmit={handleSubmit} className="mb-8 space-y-5">
            <textarea
              placeholder="Share your vibe, quote, or thought..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={4}
              className="w-full p-3 rounded-lg bg-black/40 text-white placeholder-gray-400 focus:outline-none border border-gray-600"
            />

            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-indigo-700 file:text-white hover:file:bg-indigo-800"
            />

            {preview && (
              <div>
                <p className="text-sm mb-2 text-gray-300">Preview:</p>
                {media?.type.startsWith('image') ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="max-h-64 rounded-lg border border-gray-600"
                  />
                ) : (
                  <video
                    controls
                    src={preview}
                    className="max-h-64 rounded-lg border border-gray-600"
                  />
                )}
              </div>
            )}

            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="w-full p-2 bg-black/40 text-white rounded-lg border border-gray-600"
            >
              <option value="public">🌐 Public</option>
              <option value="private">🔒 Private</option>
              <option value="friends">👥 Friends</option>
              <option value="community">🏡 Community</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-700 hover:bg-indigo-800 rounded-lg font-semibold text-white transition duration-300"
            >
              {loading ? 'Uploading...' : 'Submit & Find Vibe Matches'}
            </button>
          </form>

          <section>
            <h2 className="text-2xl font-bold mb-4">Vibe-Matched Posts</h2>
            {feed.length === 0 ? (
              <p className="text-gray-300">No posts yet — add one!</p>
            ) : (
              <div className="space-y-4">
                {feed.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    userEmail={session.user.email}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
