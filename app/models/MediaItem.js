import mongoose, { Schema } from "mongoose";

const mediaItemSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["movie", "song", "book"], required: true },
  description: String,
  coverImage: String,
  genres: [String],
  year: Number,
  externalLink: String,
}, { timestamps: true });

export default mongoose.models.MediaItem || mongoose.model("MediaItem", mediaItemSchema);
