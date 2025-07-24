import mongoose from 'mongoose';

const MoodHistorySchema = new mongoose.Schema({
  userEmail: { type: String, required: true, index: true },
  vector: { type: [Number], required: true },  // The mood vector array
  createdAt: { type: Date, default: Date.now, index: true },
});

const MoodHistory = mongoose.models.MoodHistory || mongoose.model('MoodHistory', MoodHistorySchema);
export default MoodHistory;
