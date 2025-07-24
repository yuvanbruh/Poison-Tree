// models/Share.js
import mongoose, { Schema } from "mongoose";

const shareSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Share || mongoose.model("Share", shareSchema);
