
import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  username: String,     
  avatarUrl: String,

  text: { type: String, required: true },
  type: { type: String, enum: ["tweet", "movie", "song", "book", "text"], required: true },

  vector: { type: [Number], required: true }, // for semantic search

  media: [
    {
      url: String,
      type: { type: String, enum: ["image", "video", "audio", "gif"] },
      altText: String,
    }
  ],

  mood: String,
  tags: [String], // hashtags, topics, moods

  echoesCount: { type: Number, default: 0 },
  savesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  likesCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },

  visibility: { type: String, enum: ["public", "private", "friends", "community"], default: "public" },
  private: { type: Boolean, default: false },

  location: {
    city: String,
    country: String,
    coordinates: { type: [Number], index: "2dsphere" },
  },

  source: { type: String, default: "web" },
  community: { type: Schema.Types.ObjectId, ref: "Community" },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", postSchema);
