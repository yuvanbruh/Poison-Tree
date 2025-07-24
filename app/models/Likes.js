import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Like || mongoose.model("Like", likeSchema);
