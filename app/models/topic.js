
import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    streetAdress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    admin: { type: Boolean, default: false },
    userImage: String,
    displayName: String,
    bio: String,
    currentMood: {
      emoji: String,
      color: String,
    },
    moodVector: { type: [Number], default: [] },  // <-- Add this line
    preferences: {
      moods: [String],
      genres: [String],
    },
    isPrivate: { type: Boolean, default: false },
    followers: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
    following: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
    watchlist: [{ type: Schema.Types.ObjectId, ref: "MediaItem" }],
    readingList: [{ type: Schema.Types.ObjectId, ref: "MediaItem" }],
    listeningList: [{ type: Schema.Types.ObjectId, ref: "MediaItem" }],
    badges: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);
export default Topic;
