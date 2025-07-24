
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import PostCard from "../components/PostCard";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]);
  const [visibility, setVisibility] = useState("public");

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
      alert("You must be signed in to post.");
      return;
    }

    if (!text.trim()) {
      alert("Post text cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      // 1. Get embedding vector
      const embedRes = await fetch("/api/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const embedData = await embedRes.json();
      if (!embedRes.ok) throw new Error(embedData.error || "Embedding failed");

      let uploadedMedia = [];

      // 2. Upload media to Cloudinary if present
      if (media) {
        const formData = new FormData();
        formData.append("file", media);

        // Get signature from your cloudinary route (use POST)
        const sigRes = await fetch("/api/cloudinary", { method: "POST" });
        const { signature, paramsToSign } = await sigRes.json();

        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        formData.append("timestamp", paramsToSign.timestamp);
        formData.append("folder", paramsToSign.folder);
        formData.append("signature", signature);

        // Remove upload_preset for signed uploads
        // formData.append("upload_preset", "your_unsigned_preset");

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadResult = await uploadRes.json();
        console.log("Cloudinary upload result:", uploadResult);

        if (uploadRes.ok) {
          uploadedMedia.push({
            url: uploadResult.secure_url,
            type: uploadResult.resource_type,
            altText: media.name || "Media",
          });
        } else {
          console.error("Cloudinary upload failed", uploadResult);
          throw new Error("Cloudinary upload failed");
        }
      }

      // 3. Save post
      const saveRes = await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          text,
          type: "tweet",
          vector: embedData.vector,
          visibility,
          media: uploadedMedia,
          tags: [],
        }),
      });
      const savedPost = await saveRes.json();
      if (!saveRes.ok) throw new Error(savedPost.error || "Save post failed");

      // 4. Get matched posts
      const feedRes = await fetch("/api/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vector: embedData.vector }),
      });
      const feedPosts = await feedRes.json();
      if (!feedRes.ok) throw new Error(feedPosts.error || "Feed fetch failed");

      setFeed(feedPosts);
      setText("");
      setMedia(null);
      setPreview(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-8 bg-gray-800 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Mood & Vibe Posts</h1>

      {status === "loading" ? (
        <p className="text-center">Loading session...</p>
      ) : !session ? (
        <p className="text-center">Please sign in to post and view matches.</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mb-8 space-y-4">
            <textarea
              placeholder="Write a tweet, quote, or mood expression..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={4}
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 resize-none"
            />

            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />

            {preview && (
              <div className="mt-2">
                <p className="text-sm mb-1">Preview:</p>
                {media?.type.startsWith("image") ? (
                  <img src={preview} alt="preview" className="max-h-64 rounded" />
                ) : (
                  <video controls src={preview} className="max-h-64 rounded" />
                )}
              </div>
            )}

            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="p-2 rounded bg-gray-700 border border-gray-600"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends</option>
              <option value="community">Community</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
            >
              {loading ? "Uploading..." : "Submit & Find Vibe Matches"}
            </button>
          </form>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Vibe-Matched Posts</h2>
            {feed.length === 0 && <p>No posts yet — add one!</p>}
            {feed.map((post) => (
              <PostCard key={post._id} post={post} userEmail={session.user.email} />
            ))}
          </section>
        </>
      )}
    </main>
  );
}
