// components/Badges.js
export default function Badges({ user }) {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white">Badges</h3>
        <div className="mt-2">
          {user.badges.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, index) => (
                <span
                  key={index}
                  className="bg-indigo-500 text-white px-3 py-1 rounded-full text-xs"
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No badges yet.</p>
          )}
        </div>
      </div>
    );
  }
  