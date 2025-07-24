// components/EditProfileButton.js
"use client"
import { useRouter } from "next/navigation";

export default function EditProfileButton({ user }) {
  const router = useRouter();

  const handleEditProfile = () => {
    router.push(`/profile/edit`);
  };

  return (
    <button
      onClick={handleEditProfile}
      className="mt-6 bg-indigo-500 text-white px-4 py-2 rounded-lg"
    >
      Edit Profile
    </button>
  );
}
