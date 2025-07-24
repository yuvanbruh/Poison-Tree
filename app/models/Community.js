import mongoose, { Schema } from "mongoose";

const communitySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  avatarUrl: String,
  tags: [String],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

export default mongoose.models.Community || mongoose.model("Community", communitySchema);
