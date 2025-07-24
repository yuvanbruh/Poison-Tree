import mongoose, { Schema } from "mongoose";

const saveSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  savedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Save || mongoose.model("Save", saveSchema);
