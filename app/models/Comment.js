import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  likesCount: { type: Number, default: 0 },
  parentCommentId: { type: Schema.Types.ObjectId, ref: "Comment" }, // threaded replies
}, { timestamps: true });

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);
