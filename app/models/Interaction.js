// models/Interaction.js
import mongoose from "mongoose";

const InteractionSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },      // who performed the action
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },  // post related to this interaction
    action: { type: String, enum: ["like", "echo", "comment"], required: true },   // type of interaction
    
  // vector: { type: [Number], required: true },
  // // optional: for mood analytics, vector embeddings etc.
  vector: {
  type: [Number],
  default: [], // now it's optional
},

    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.Interaction || mongoose.model("Interaction", InteractionSchema);
