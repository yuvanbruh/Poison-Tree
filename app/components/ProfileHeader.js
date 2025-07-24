// export default function ProfileHeader({ user }) {
//     return (
//       <div className="flex items-center gap-4 mb-6">
//         <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-4xl">
//           {user?.pfp || user?.moodEmoji || '😶'}
//         </div>
//         <div>
//           <h1 className="text-2xl font-semibold">{user.DisplayName}</h1>
//           <p className="text-sm text-gray-400">@{user.name}</p>
//           <p className="text-sm mt-1">{user.bio}</p>
//           <span className="inline-block mt-2 bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full">
//             {user.currentMood ? `Current Mood: ${user.currentMood}` : 'No mood set'}
//           </span>
//         </div>
//       </div>
//     );
//   }-
import { format } from "date-fns";

export default function ProfileHeader({ user }) {
  const joinedDate = user.createdAt ? format(new Date(user.createdAt), "MMMM yyyy") : null;

  return (
    <div className="flex items-center gap-6 mb-6">
        
      <img
        src={user?.userImage || "/default-avatar.png"}
   
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h1 className="text-2xl font-bold text-white">{user.displayName || user.name}</h1>
        <p className="text-gray-400 text-sm">@{user.name}</p>
        {user.bio && <p className="text-sm mt-1">{user.bio}</p>}
        <div className="text-sm text-gray-300 mt-2">
          {user.city && user.country && (
            <div>📍 {user.city}, {user.country}</div>
          )}
          {joinedDate && (
            <div className="text-xs text-gray-500">Joined {joinedDate}</div>
          )}
        </div>
        {user.currentMood?.emoji && (
          <span
            className="inline-block mt-2 bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full"
            style={{ backgroundColor: user.currentMood.color || "#4f46e5" }}
          >
            {`Mood: ${user.currentMood.emoji}`}
          </span>
        )}
      </div>
    </div>
  );
}
