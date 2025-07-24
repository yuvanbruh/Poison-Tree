// components/UserLinks.js
export default function UserLinks({ user }) {
    return (
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white">Links</h3>
        <div className="mt-2">
          {user.socialLinks && user.socialLinks.length > 0 ? (
            <div>
              {user.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:underline"
                >
                  {link.name}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No links available.</p>
          )}
        </div>
      </div>
    );
  }
  