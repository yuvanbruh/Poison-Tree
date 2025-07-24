
// import connectMongoDB from "@/app/lib/mongodb";
// import Echo from "@/app/models/Echoes";
// import Topic from "@/app/models/topic";
// import Post from "@/app/models/Post";

// export async function POST(req) {
//   try {
//     await connectMongoDB();
//     const { email, postId } = await req.json();

//     if (!email || !postId) {
//       return new Response(JSON.stringify({ error: "Missing email or postId" }), { status: 400 });
//     }

//     const user = await Topic.findOne({ email });
//     if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

//     const post = await Post.findById(postId);
//     if (!post) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });

//     const existingEcho = await Echo.findOne({ post: postId, user: user._id });

//     if (existingEcho) {
//       // Echo exists —> Remove it (un-echo)
//       await Echo.deleteOne({ _id: existingEcho._id });

//       // Optional: Decrement count if you’re using echoesCount field in Post model
//       await Post.findByIdAndUpdate(postId, { $inc: { echoesCount: -1 } });

//       return new Response(JSON.stringify({ success: true, echoed: false }), { status: 200 });
//     } else {
//       // Echo doesn't exist —> Create it
//       const newEcho = new Echo({ post: postId, user: user._id });
//       await newEcho.save();

//       await Post.findByIdAndUpdate(postId, { $inc: { echoesCount: 1 } });

//       return new Response(JSON.stringify({ success: true, echoed: true }), { status: 201 });
//     }
//   } catch (error) {
//     console.error("echoPOST error:", error);
//     return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
//   }
// }
import connectMongoDB from "@/app/lib/mongodb";
import Echo from "@/app/models/Echoes";
import Topic from "@/app/models/topic";
import Post from "@/app/models/Post";
import Interaction from "@/app/models/Interaction"; // Import Interaction schema

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, postId, vector } = await req.json(); // Accept vector too

    if (!email || !postId) {
      return new Response(JSON.stringify({ error: "Missing email or postId" }), { status: 400 });
    }

    const user = await Topic.findOne({ email });
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    const post = await Post.findById(postId);
    if (!post) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });

    const existingEcho = await Echo.findOne({ post: postId, user: user._id });

    if (existingEcho) {
      // Un-echo
      await Echo.deleteOne({ _id: existingEcho._id });
      await Post.findByIdAndUpdate(postId, { $inc: { echoesCount: -1 } });

      // Delete corresponding interaction
      await Interaction.deleteOne({
        userEmail: email,
        postId,
        action: "echo",
      });

      return new Response(JSON.stringify({ success: true, echoed: false }), { status: 200 });
    } else {
      // Create echo
      const newEcho = new Echo({ post: postId, user: user._id });
      await newEcho.save();

      await Post.findByIdAndUpdate(postId, { $inc: { echoesCount: 1 } });

      // Log interaction
      const interactionData = {
        userEmail: email,
        postId,
        action: "echo",
      };

      if (vector && Array.isArray(vector)) {
        interactionData.vector = vector;
      }

      await Interaction.create(interactionData);

      return new Response(JSON.stringify({ success: true, echoed: true }), { status: 201 });
    }
  } catch (error) {
    console.error("echoPOST error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
  }
}
