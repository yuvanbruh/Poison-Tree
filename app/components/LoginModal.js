// 'use client';

// import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';
// import { useAuth } from '../context/page';
// import { useEffect, useState } from 'react';

// const quotes = [
//   "🧠 Conceptual Depth: A meditation on the toxic nature of repression and slow, poisonous emotional buildup.",
//   "🎙️ Vocal Manipulation: Grouper's voice sounds like it's being swallowed by the atmosphere—eerie and alienating.",
//   "🕰️ Track Length: At 1:57, its brevity leaves a lingering emotional weight, like a fleeting thought.",
//   "🧩 Memory Vibes: 'Poison Tree' feels like a fragmented memory—soft, distorted, almost lost to time.",
//   "📍 Grid of Points: Every song’s a snapshot—this one feels like a dark but unforgettable emotional point.",
//   "🔇 Silence Speaks: Sparse notes and long pauses make silence a part of the sound, adding tension.",
//   "🌫️ Atmosphere: Ambient textures and distant hums make it feel like you're hearing a moment on the edge of reality."
// ];

// export default function LoginModal({ isOpen, onClose }) {
//   const { login } = useAuth();
//   const router = useRouter();
//   const [quote, setQuote] = useState('');

//   useEffect(() => {
//     if (isOpen) {
//       const randomIndex = Math.floor(Math.random() * quotes.length);
//       setQuote(quotes[randomIndex]);
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
//       onClick={onClose} // Close on outside click
//     >
//       <div
//         className="bg-[#522da8]/90 w-full max-w-xl p-10 py-14 relative text-white text-center shadow-2xl max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 text-xl flex items-center justify-center"
//         >
//           ×
//         </button>

//         {/* Logo/Title */}
//         <h1 className="text-4xl font-extrabold mb-2">poison tree</h1>

//         {/* Dynamic Quote */}
//         <p className="mb-8 italic text-white/80 text-sm max-w-xl mx-auto">
//           {quote}
//         </p>

//         {/* Login Buttons */}
//         <div className="space-y-4">
//           {/* Google */}
//           <button
//             onClick={() => signIn('google', { callbackUrl: '/' })}
//             className="w-full flex items-center justify-center gap-3 py-3 rounded-full bg-white text-black hover:bg-gray-100 font-semibold text-sm"
//           >
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="Google"
//               className="w-6 h-6"
//             />
//             Continue with Google
//           </button>

//           {/* Apple */}
//           <button
//             className="w-full flex items-center justify-center gap-3 py-3 rounded-full bg-white text-black hover:bg-gray-100 font-semibold text-sm"
//           >
//             <img
//               src="https://www.svgrepo.com/show/452213/apple-white-logo.svg"
//               alt="Apple"
//               className="w-6 h-6"
//             />
//             Continue with Apple
//           </button>

//           {/* Email */}
//           <button
//             className="w-full flex items-center justify-center gap-3 py-3 rounded-full bg-white text-black hover:bg-gray-100 font-semibold text-sm"
//           >
//             <img
//               src="https://www.svgrepo.com/show/502693/email.svg"
//               alt="Email"
//               className="w-6 h-6"
//             />
//             Continue with Email
//           </button>
//         </div>

//         {/* Sign up link */}
//         <p className="mt-6 text-yellow-300 font-semibold text-sm">
//           Coming from Twitter/X?{' '}
//           <span
//             onClick={() => {
//               onClose();        // Close modal first
//               router.push('/Register'); // Then navigate
//             }}
//             className="underline cursor-pointer hover:text-yellow-400"
//           >
//             Sign up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }
'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuth } from '../context/page';
import { useEffect, useState } from 'react';

const quotes = [
  "🧠 Conceptual Depth: A meditation on the toxic nature of repression and slow, poisonous emotional buildup.",
  "🎙️ Vocal Manipulation: Grouper's voice sounds like it's being swallowed by the atmosphere—eerie and alienating.",
  "🕰️ Track Length: At 1:57, its brevity leaves a lingering emotional weight, like a fleeting thought.",
  "🧩 Memory Vibes: 'Poison Tree' feels like a fragmented memory—soft, distorted, almost lost to time.",
  "📍 Grid of Points: Every song’s a snapshot—this one feels like a dark but unforgettable emotional point.",
  "🔇 Silence Speaks: Sparse notes and long pauses make silence a part of the sound, adding tension.",
  "🌫️ Atmosphere: Ambient textures and distant hums make it feel like you're hearing a moment on the edge of reality."
];

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const router = useRouter();
  const [quote, setQuote] = useState('');

  useEffect(() => {
    if (isOpen) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 sm:px-8"
      onClick={onClose}
    >
      <div
        className="bg-[#522da8]/90 w-full max-w-xl p-6 sm:p-10 py-10 sm:py-14 relative text-white text-center shadow-2xl max-h-[90vh] overflow-y-auto rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 text-xl flex items-center justify-center"
        >
          ×
        </button>

        {/* Logo/Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">poison tree</h1>

        {/* Dynamic Quote */}
        <p className="mb-6 sm:mb-8 italic text-white/80 text-xs sm:text-sm max-w-xl mx-auto">
          {quote}
        </p>

        {/* Login Buttons */}
        <div className="space-y-3 sm:space-y-4">
          {/* Google */}
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-3 py-2.5 sm:py-3 rounded-full bg-white text-black hover:bg-gray-100 font-semibold text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            Continue with Google
          </button>

          {/* Apple */}
          <button
            className="w-full flex items-center justify-center gap-3 py-2.5 sm:py-3 rounded-full bg-white text-black hover:bg-gray-100 font-semibold text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/452213/apple-white-logo.svg"
              alt="Apple"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            Continue with Apple
          </button>

          {/* Email */}
          <button
            className="w-full flex items-center justify-center gap-3 py-2.5 sm:py-3 rounded-full bg-white text-black hover:bg-gray-100 font-semibold text-sm"
          >
            <img
              src="https://www.svgrepo.com/show/502693/email.svg"
              alt="Email"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            Continue with Email
          </button>
        </div>

        {/* Sign up link */}
        <p className="mt-6 text-yellow-300 font-semibold text-xs sm:text-sm">
          Coming from Twitter/X?{' '}
          <span
            onClick={() => {
              onClose();
              router.push('/Register');
            }}
            className="underline cursor-pointer hover:text-yellow-400"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
