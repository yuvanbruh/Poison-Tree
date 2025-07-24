import mongoose, { Schema } from "mongoose";

const readingListItemSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String },
    link: { type: String },
    notes: { type: String },
    status: { type: String, enum: ["Reading", "Completed", "Plan to Read"], default: "Plan to Read" },
  },
  {
    timestamps: true,
  }
);

const ReadingListItem = mongoose.models.ReadingListItem || mongoose.model("ReadingListItem", readingListItemSchema);
export default ReadingListItem;
