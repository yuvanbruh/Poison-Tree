
import connectMongoDB from "@/app/lib/mongodb";
import Post from "@/app/models/Post";
import Topic from "@/app/models/topic";
import Echo from "@/app/models/Echoes";
import Like from "@/app/models/Likes";
import Comment from "@/app/models/Comment";
import Share from "@/app/models/Share";

// POST: Create a new post (supports media URLs)
export async function POST(req) {
  try {
    await connectMongoDB();

    const {
      email,
      text,
      type,
      vector,
      mood,
      tags,
      visibility,
      media, // media URLs array expected here
    } = await req.json();

    if (
      !email ||
      !type ||
      !Array.isArray(vector) ||
      vector.length === 0 ||
      (text === undefined && (!Array.isArray(media) || media.length === 0))
      // Accept posts with either text or media or both
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields (email, type, vector, text/media)" }),
        { status: 400 }
      );
    }

    const user = await Topic.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    const newPost = new Post({
      user: user._id,
      username: user.username,
      avatarUrl: user.userImage,
      text: text || "",
      type,
      vector,
      mood: mood || "",
      visibility: visibility || "public",
      tags: Array.isArray(tags) ? tags : [],
      media: Array.isArray(media) ? media : [], // save media URLs
    });

    const savedPost = await newPost.save();
    console.log("Saved post for user:", user.username);

    return new Response(JSON.stringify(savedPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("POST error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}

// GET: Fetch all posts with counts
export async function GET(req) {
  try {
    await connectMongoDB();

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("user", "username avatarUrl");

    const postsWithCounts = await Promise.all(
      posts.map(async (post) => {
        const [echoCount, commentCount, shareCount, likeCount] = await Promise.all([
          Echo.countDocuments({ post: post._id }),
          Comment.countDocuments({ post: post._id }),
          Share.countDocuments({ post: post._id }),
          Like.countDocuments({ post: post._id }),
        ]);

        return {
          ...post.toObject(),
          echoesCount: echoCount,
          commentsCount: commentCount,
          sharesCount: shareCount,
          likesCount: likeCount,
        };
      })
    );

    return new Response(JSON.stringify(postsWithCounts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch posts" }),
      { status: 500 }
    );
  }
}

// POST: Add Echo to a post
export async function echoPOST(req) {
  try {
    await connectMongoDB();
    const { email, postId } = await req.json();

    if (!email || !postId) {
      return new Response(
        JSON.stringify({ error: "Missing email or postId" }),
        { status: 400 }
      );
    }

    const user = await Topic.findOne({ email });
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    const post = await Post.findById(postId);
    if (!post) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });

    const newEcho = new Echo({
      post: post._id,
      user: user._id,
    });

    await newEcho.save();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error("echoPOST error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}

// POST: Add Comment to a post
export async function commentPOST(req) {
  try {
    await connectMongoDB();
    const { email, postId, text } = await req.json();

    if (!email || !postId || !text) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const user = await Topic.findOne({ email });
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    const post = await Post.findById(postId);
    if (!post) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });

    const newComment = new Comment({
      post: post._id,
      user: user._id,
      text,
    });

    await newComment.save();

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    console.error("commentPOST error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}

// GET: Get comments for a post
export async function commentsGET(req) {
  try {
    await connectMongoDB();

    const url = new URL(req.url);
    const postId = url.searchParams.get("postId");

    if (!postId) {
      return new Response(
        JSON.stringify({ error: "Missing postId" }),
        { status: 400 }
      );
    }

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: 1 })
      .populate("user", "username userImage");

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("commentsGET error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch comments" }),
      { status: 500 }
    );
  }
}

// POST: Add Share to a post
export async function sharePOST(req) {
  try {
    await connectMongoDB();
    const { email, postId } = await req.json();

    if (!email || !postId) {
      return new Response(
        JSON.stringify({ error: "Missing email or postId" }),
        { status: 400 }
      );
    }

    const user = await Topic.findOne({ email });
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    const post = await Post.findById(postId);
    if (!post) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });

    const newShare = new Share({
      post: post._id,
      user: user._id,
    });

    await newShare.save();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error("sharePOST error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}

// POST: Add Like to a post
export async function likePOST(req) {
  try {
    await connectMongoDB();
    const { email, postId } = await req.json();

    if (!email || !postId) {
      return new Response(
        JSON.stringify({ error: "Missing email or postId" }),
        { status: 400 }
      );
    }

    const user = await Topic.findOne({ email });
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    const post = await Post.findById(postId);
    if (!post) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });

    const existingLike = await Like.findOne({ post: post._id, user: user._id });
    if (existingLike) {
      return new Response(
        JSON.stringify({ error: "Post already liked by user" }),
        { status: 400 }
      );
    }

    const newLike = new Like({
      post: post._id,
      user: user._id,
    });

    await newLike.save();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error("likePOST error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
