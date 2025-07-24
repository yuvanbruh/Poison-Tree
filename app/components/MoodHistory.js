// components/MoodHistory.js
export default function MoodHistory({ user }) {
    const moodHistory = user.moodHistory || []; // assuming moodHistory is an array
  
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white">Mood History</h3>
        <div className="mt-2">
          {moodHistory.length > 0 ? (
            <div>
              {moodHistory.map((mood, index) => (
                <div key={index} className="text-sm text-gray-400 mb-2">
                  {format(new Date(mood.date), "MMMM dd, yyyy")} -{" "}
                  <span
                    style={{ color: mood.color || "#4f46e5" }}
                  >
                    {mood.emoji}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No mood history available.</p>
          )}
        </div>
      </div>
    );
  }
  