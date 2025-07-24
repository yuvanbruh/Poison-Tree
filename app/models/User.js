import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  bio: { type: String, default: "" },
  mood: { type: String }, // current mood (e.g., emoji or string)
  preferences: {
    moods: [String],
    genres: [String],
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  savedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  watchlist: [{ type: Schema.Types.ObjectId, ref: "MediaItem" }],
  readingList: [{ type: Schema.Types.ObjectId, ref: "MediaItem" }],
  listeningList: [{ type: Schema.Types.ObjectId, ref: "MediaItem" }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
