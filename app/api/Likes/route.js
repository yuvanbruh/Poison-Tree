// // import connectMongoDB from "@/app/lib/mongodb";
// // import Likes from "@/app/models/Likes";
// // import Topic from "@/app/models/topic";
// // import Post from "@/app/models/Post";

// // export async function POST(req) {
// //   try {
// //     await connectMongoDB();
// //     const { email, postId } = await req.json();

// //     if (!email || !postId) {
// //       return new Response(
// //         JSON.stringify({ error: "Missing email or postId" }),
// //         { status: 400 }
// //       );
// //     }

// //     const user = await Topic.findOne({ email });
// //     if (!user)
// //       return new Response(
// //         JSON.stringify({ error: "User not found" }),
// //         { status: 404 }
// //       );

// //     const post = await Post.findById(postId);
// //     if (!post)
// //       return new Response(
// //         JSON.stringify({ error: "Post not found" }),
// //         { status: 404 }
// //       );

// //     const existingLike = await Likes.findOne({ post: postId, user: user._id });

// //     if (existingLike) {
// //       // Like exists —> Remove it (unlike)
// //       await Likes.deleteOne({ _id: existingLike._id });

// //       // Decrement likesCount in Post if you track it
// //       await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });

// //       return new Response(
// //         JSON.stringify({ success: true, liked: false }),
// //         { status: 200 }
// //       );
// //     } else {
// //       // Like doesn't exist —> Create it
// //       const newLike = new Likes({ post: postId, user: user._id });
// //       await newLike.save();

// //       // Increment likesCount in Post if you track it
// //       await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });

// //       return new Response(
// //         JSON.stringify({ success: true, liked: true }),
// //         { status: 201 }
// //       );
// //     }
// //   } catch (error) {
// //     console.error("likePOST error:", error);
// //     return new Response(
// //       JSON.stringify({ error: error.message || "Internal Server Error" }),
// //       { status: 500 }
// //     );
// //   }
// // }
// import connectMongoDB from "@/app/lib/mongodb";
// import Likes from "@/app/models/Likes";
// import Topic from "@/app/models/topic";
// import Post from "@/app/models/Post";
// import Interaction from "@/app/models/Interaction"; // ✅ For logging the interaction

// export async function POST(req) {
//   try {
//     await connectMongoDB();
//     const { email, postId } = await req.json();

//     if (!email || !postId) {
//       return new Response(
//         JSON.stringify({ error: "Missing email or postId" }),
//         { status: 400 }
//       );
//     }

//     const user = await Topic.findOne({ email });
//     if (!user)
//       return new Response(
//         JSON.stringify({ error: "User not found" }),
//         { status: 404 }
//       );

//     const post = await Post.findById(postId);
//     if (!post)
//       return new Response(
//         JSON.stringify({ error: "Post not found" }),
//         { status: 404 }
//       );

//     const existingLike = await Likes.findOne({ post: postId, user: user._id });

//     if (existingLike) {
//       // ❌ Unlike
//       await Likes.deleteOne({ _id: existingLike._id });

//       await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });

//       // ❌ Remove interaction record
//       await Interaction.deleteOne({
//         userEmail: email,
//         postId,
//         action: "like",
//       });

//       return new Response(
//         JSON.stringify({ success: true, liked: false }),
//         { status: 200 }
//       );
//     } else {
//       // ✅ Like
//       const newLike = new Likes({ post: postId, user: user._id });
//       await newLike.save();

//       await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });

//       // ✅ Log interaction
//       await Interaction.create({
//         userEmail: email,
//         postId,
//         action: "like",
//       });

//       return new Response(
//         JSON.stringify({ success: true, liked: true }),
//         { status: 201 }
//       );
//     }
//   } catch (error) {
//     console.error("likePOST error:", error);
//     return new Response(
//       JSON.stringify({ error: error.message || "Internal Server Error" }),
//       { status: 500 }
//     );
//   }
// }
import connectMongoDB from "@/app/lib/mongodb";
import Likes from "@/app/models/Likes";
import Topic from "@/app/models/topic";
import Post from "@/app/models/Post";
import Interaction from "@/app/models/Interaction"; // For logging the interaction

export async function POST(req) {
  try {
    await connectMongoDB();

    // Destructure vector along with email and postId
    const { email, postId, vector } = await req.json();

    if (!email || !postId) {
      return new Response(
        JSON.stringify({ error: "Missing email or postId" }),
        { status: 400 }
      );
    }

    const user = await Topic.findOne({ email });
    if (!user)
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );

    const post = await Post.findById(postId);
    if (!post)
      return new Response(
        JSON.stringify({ error: "Post not found" }),
        { status: 404 }
      );

    const existingLike = await Likes.findOne({ post: postId, user: user._id });

    if (existingLike) {
      // Unlike
      await Likes.deleteOne({ _id: existingLike._id });
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: -1 } });

      // Remove interaction record
      await Interaction.deleteOne({
        userEmail: email,
        postId,
        action: "like",
      });

      return new Response(
        JSON.stringify({ success: true, liked: false }),
        { status: 200 }
      );
    } else {
      // Like
      const newLike = new Likes({ post: postId, user: user._id });
      await newLike.save();
      await Post.findByIdAndUpdate(postId, { $inc: { likesCount: 1 } });

      // Log interaction, including vector if provided
      const interactionData = {
        userEmail: email,
        postId,
        action: "like",
      };

      if (vector && Array.isArray(vector)) {
        interactionData.vector = vector;
      }

      await Interaction.create(interactionData);

      return new Response(
        JSON.stringify({ success: true, liked: true }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("likePOST error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
