import mongoose, { Schema } from "mongoose";

const watchlistItemSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ["Movie", "TV", "Anime", "Other"], default: "Other" },
    link: { type: String },
    notes: { type: String },
    status: { type: String, enum: ["Watching", "Completed", "Plan to Watch"], default: "Plan to Watch" },
  },
  {
    timestamps: true,
  }
);

const WatchlistItem = mongoose.models.WatchlistItem || mongoose.model("WatchlistItem", watchlistItemSchema);
export default WatchlistItem;
