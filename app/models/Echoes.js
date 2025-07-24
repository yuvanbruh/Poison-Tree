import mongoose, { Schema } from "mongoose";

const echoSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Echo || mongoose.model("Echo", echoSchema);
