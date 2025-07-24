// 'use client';

// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useSession } from "next-auth/react";
// import { useAuth } from "../context/page";

// export default function App() {
//   const { data: session } = useSession();
//   const { login } = useAuth();
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [userdoesntexist, setuserdoesntexist] = useState(false);
//   const [userexists, setuserexists] = useState(false);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm();

//   const onSubmit = async (data) => {
//     setuserdoesntexist(false);
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     let r = await fetch("/api/log", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     let res = await r.json();
//     console.log(res);
//     if (res.ok) {
//       console.log("Token in localStorage: ", localStorage.getItem("token"));
//       setuserexists(!userexists);
//       setTimeout(() => {
//         localStorage.setItem("token", res.token);
//         console.log(
//           "Token after timeout in localStorage: ",
//           localStorage.getItem("token")
//         );
//       }, 1000);

//       // Decode the JWT token (this assumes it's a valid JWT)
//       const user = JSON.parse(atob(res.token.split(".")[1]));
//       console.log("Logged in as:", user.email);
//       login(res.token, user);
//       // Optional: Redirect to another page after successful login
//       router.push("/counter");
//     } else {
//       setuserdoesntexist(!userdoesntexist);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center w-full h-screen bg-#050810">
//       <div className="w-full max-w-md p-8 bg-black border border-gray-800 rounded-xl shadow-xl">
//         {isSubmitting && (
//           <div className="bg-blue-500 text-white p-2 text-center">Loading...</div>
//         )}

//         {userdoesntexist && <div className="text-red-500 text-center">User doesn't exist</div>}

//         {/* Title */}
//         <h1 className="text-center text-gray-100 font-semibold text-3xl mb-6">Login</h1>

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Email Input */}
//           <div>
//             <input
//               {...register("email", { required: true })}
//               id="email"
//               name="email"
//               type="email"
//               placeholder="Email"
//               className="w-full p-4 rounded-lg border border-gray-600 text-white bg-[#2A2A2A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//             />
//             {errors.email && (
//               <span className="block text-red-500 text-sm mt-1">Email is required!</span>
//             )}
//           </div>

//           {/* Username Input */}
//           <div>
//             <input
//               {...register("name", { required: true })}
//               id="name"
//               name="name"
//               type="text"
//               placeholder="Username"
//               className="w-full p-4 rounded-lg border border-gray-600 text-white bg-[#2A2A2A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//             />
//             {errors.name && (
//               <span className="block text-red-500 text-sm mt-1">Pick a username, Nerd!</span>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
  
//               className="w-full mt-4 text-white font-bold py-3 rounded-full  hover:bg-blue-800 transition duration-200 border border-blue-600 text-center bg-#050810"
//               disabled={isSubmitting}
//             >
//               Login
//             </button>
//           </div>
//         </form>

//         {/* Google Login Button */}
//         <button
//           onClick={() => signIn("google", { callbackUrl: "/" })}
//           className="w-full mt-4 text-white font-bold py-3 rounded-full hover:bg-blue-800 transition duration-200 border border-blue-600 text-center bg-#0A0F1A"
//         >
//           <div className="flex justify-center gap-2">
//             <img src="/google.png" alt="" className="w-7 h-7" />
//             Login with Google
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// }
'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useAuth } from '../context/page';

export default function App() {
  const { data: session } = useSession();
  const { login } = useAuth();
  const [userdoesntexist, setuserdoesntexist] = useState(false);
  const [userexists, setuserexists] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setuserdoesntexist(false);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const res = await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((r) => r.json());

    if (res.ok) {
      setuserexists(true);
      setTimeout(() => {
        localStorage.setItem('token', res.token);
      }, 1000);

      const user = JSON.parse(atob(res.token.split('.')[1]));
      login(res.token, user);
      router.push('/counter');
    } else {
      setuserdoesntexist(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050810] px-4">
      <div className="w-full max-w-md p-6 sm:p-8 bg-black border border-gray-800 rounded-xl shadow-xl space-y-6">
        {/* Loading State */}
        {isSubmitting && (
          <div className="bg-blue-500 text-white p-2 text-center rounded">Loading...</div>
        )}

        {/* Error State */}
        {userdoesntexist && (
          <div className="text-red-500 text-center">User doesn't exist</div>
        )}

        {/* Title */}
        <h1 className="text-center text-white font-semibold text-3xl sm:text-4xl">Login</h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Email"
              className="w-full p-4 rounded-lg border border-gray-600 text-white bg-[#2A2A2A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required!</p>
            )}
          </div>

          {/* Username */}
          <div>
            <input
              {...register('name', { required: true })}
              type="text"
              placeholder="Username"
              className="w-full p-4 rounded-lg border border-gray-600 text-white bg-[#2A2A2A] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Pick a username, Nerd!</p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-full bg-[#050810] text-white font-bold border border-blue-600 hover:bg-blue-800 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-4">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full py-3 rounded-full bg-[#0A0F1A] text-white font-bold border border-blue-600 hover:bg-blue-800 transition duration-200 flex items-center justify-center gap-3"
          >
            <img src="/google.png" alt="Google logo" className="w-6 h-6" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
