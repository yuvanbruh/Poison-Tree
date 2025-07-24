// import ProfileHeader from "../components/ProfileHeader";
// import ProfileTabs from "../components/Tabs/ProfileTabs";
// import EditProfileButton from "../components/EditProfileButton";
// import MoodHistory from "../components/MoodHistory";
// import UserLinks from "../components/UserLinks";
// import Badges from "../components/Badges";
// import ProfileStats from "../components/ProfileStats";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import Topic from "../models/topic";
// import Post from "../models/Post";
// import WatchlistItem from "../models/WatchlistItem";
// import ReadingListItem from "../models/ReadingListItem";
// import connectMongoDB from "../lib/mongodb";

// export default async function ProfilePage() {
//   await connectMongoDB();
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return (
//       <div className="flex justify-center items-center h-screen text-white">
//         Please log in to view your profile.
//       </div>
//     );
//   }

//   const user = await Topic.findOne({ email: session.user.email }).lean();

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen text-white">
//         User not found.
//       </div>
//     );
//   }

//   // Fetch related data: posts, watchlist, readingList
//   const [posts, watchlist, readingList] = await Promise.all([
//     Post.find({ authorEmail: session.user.email }).lean(),
//     WatchlistItem.find({ userEmail: session.user.email }).lean(),
//     ReadingListItem.find({ userEmail: session.user.email }).lean(),
//   ]);

//   // Serialize everything
//   const serializedUser = {
//     ...user,
//     _id: user._id.toString(),
//     createdAt: user.createdAt?.toISOString(),
//     updatedAt: user.updatedAt?.toISOString(),
//     followers: user.followers || [],
//     following: user.following || [],
//     badges: user.badges || [],
//     posts: posts || [],
//     watchlist: watchlist || [],
//     readingList: readingList || [],
//   };

//   return (
//     <main className="min-h-screen bg-black text-white px-4 py-8">
//       <div className="max-w-5xl mx-auto space-y-8">
//         {/* Profile Header */}
//         <section className="bg-gray-900 p-6 rounded-2xl shadow-md">
//           <ProfileHeader user={serializedUser} />
//           <div className="mt-4">
//             <EditProfileButton session={session} user={serializedUser} />
//           </div>
//         </section>

//         {/* Stats & Badges */}
//         <section className="grid md:grid-cols-2 gap-6">
//           <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
//             <ProfileStats user={serializedUser} />
//           </div>
//           <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
//             <Badges user={serializedUser} />
//           </div>
//         </section>

//         {/* Tabs */}
//         <section className="bg-gray-900 p-6 rounded-2xl shadow-md">
//           <ProfileTabs user={serializedUser} />
//         </section>

//         {/* Mood & Links */}
//         <section className="grid md:grid-cols-2 gap-6">
//           <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
//             <MoodHistory user={serializedUser} />
//           </div>
//           <div className="bg-gray-900 p-6 rounded-2xl shadow-md">
//             <UserLinks user={serializedUser} />
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import connectMongoDB from "../lib/mongodb";
import Topic from "../models/topic";
import Post from "../models/Post";
import WatchlistItem from "../models/WatchlistItem";
import ReadingListItem from "../models/ReadingListItem";
// import ProfileClient from "../../components/ProfileClient";
import ProfileClient from "../components/ProfileClient";

export default async function ProfilePage() {
  await connectMongoDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Please log in to view your profile.
      </div>
    );
  }

  const user = await Topic.findOne({ email: session.user.email }).lean();
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        User not found.
      </div>
    );
  }

  const [posts, watchlist, readingList] = await Promise.all([
    Post.find({ authorEmail: session.user.email }).lean(),
    WatchlistItem.find({ userEmail: session.user.email }).lean(),
    ReadingListItem.find({ userEmail: session.user.email }).lean(),
  ]);

  const serializedUser = {
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt?.toISOString(),
    updatedAt: user.updatedAt?.toISOString(),
    followers: user.followers || [],
    following: user.following || [],
    badges: user.badges || [],
    posts: posts || [],
    watchlist: watchlist || [],
    readingList: readingList || [],
  };

  return <ProfileClient user={serializedUser} session={session} />;
}
